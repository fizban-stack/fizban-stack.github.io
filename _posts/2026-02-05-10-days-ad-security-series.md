---
layout: post
title: "10 Days of Active Directory Security: Complete Series"
date: 2026-02-05
category: Active Directory Security
author: James Wells
---

## Series Overview

This 10-part series provides comprehensive coverage of the essential tools and techniques used in Active Directory penetration testing and security assessments. Each post explores a critical tool in the offensive security toolkit, covering its history, installation, practical usage, and real-world application in lab environments like Game of Active Directory (GOAD).

Perfect for penetration testers, red teamers, security researchers, and anyone conducting authorized Active Directory security assessments in 2026.

## What You'll Learn

Master the complete Active Directory offensive security toolkit:
- **Graph-based attack path analysis** with BloodHound
- **Protocol-level AD exploitation** using Impacket
- **Kerberos attack techniques** with Rubeus
- **Credential extraction mastery** via Mimikatz
- **Network-wide code execution** with NetExec
- **ADCS certificate exploitation** using Certipy
- **Command and control operations** with Sliver C2
- **LLMNR/NBT-NS poisoning** via Responder
- **Post-exploitation techniques** using Evil-WinRM
- **Authentication coercion attacks** with Coercer

## The Complete Series

### Day 1: BloodHound - AD Attack Path Visualization
**Published:** February 5, 2026
**Focus:** Graph-based Active Directory relationship mapping and attack path discovery

Revolutionize AD security assessment with BloodHound's graph theory approach. Map complex AD environments, identify privilege escalation paths, understand trust relationships, and visualize the shortest path from compromised accounts to Domain Admin.

**Technologies:** Neo4j, SharpHound, Cypher queries
**Use Cases:** Attack path analysis, privilege escalation, security posture assessment
**Key Techniques:** DCSync paths, Kerberoastable user chains, local admin mapping

[Read Day 1 →](2026-02-05-day1-bloodhound-ad-attack-path-visualization.md)

---

### Day 2: Impacket - Python AD Protocol Toolkit
**Published:** February 6, 2026
**Focus:** Low-level protocol access for Windows/AD exploitation from Linux

Master the foundational Python library for AD penetration testing. Perform DCSync attacks, Kerberoasting, NTLM relay, and remote code execution entirely from Linux platforms using protocol-level implementations.

**Technologies:** Python, SMB, MSRPC, Kerberos, LDAP
**Use Cases:** Credential dumping, lateral movement, Linux-based AD attacks
**Key Scripts:** secretsdump.py, GetUserSPNs.py, ntlmrelayx.py, psexec.py

[Read Day 2 →](2026-02-06-day2-impacket-python-ad-protocol-toolkit.md)

---

### Day 3: Rubeus - Kerberos Attack Toolkit
**Published:** February 7, 2026
**Focus:** Advanced Kerberos exploitation and ticket manipulation

Execute sophisticated Kerberos attacks with the premier .NET toolkit. Perform AS-REP Roasting, Kerberoasting, ticket extraction, Pass-the-Ticket, Golden Ticket creation, and Overpass-the-Hash attacks with surgical precision.

**Technologies:** .NET, Kerberos protocol, ticket manipulation
**Use Cases:** Kerberos exploitation, credential theft, persistence
**Key Techniques:** AS-REP Roasting, Kerberoasting, Golden/Silver Tickets, S4U2Self abuse

[Read Day 3 →](2026-02-07-day3-rubeus-kerberos-attack-toolkit.md)

---

### Day 4: Mimikatz - Credential Extraction Legend
**Published:** February 8, 2026
**Focus:** Memory-based credential extraction and Windows authentication attacks

Master the legendary tool that changed Windows security forever. Extract plaintext passwords, NTLM hashes, and Kerberos tickets from memory. Perform Pass-the-Hash, Pass-the-Ticket, Golden Ticket attacks, and DCSync operations.

**Technologies:** LSASS memory access, Windows authentication protocols
**Use Cases:** Credential harvesting, privilege escalation, persistence
**Key Techniques:** sekurlsa::logonpasswords, lsadump::dcsync, kerberos::golden

[Read Day 4 →](2026-02-08-day4-mimikatz-credential-extraction-legend.md)

---

### Day 5: NetExec (formerly CrackMapExec) - Network Execution Toolkit
**Published:** February 9, 2026
**Focus:** Post-exploitation automation across Windows networks

Automate lateral movement and post-exploitation with the Swiss Army knife of network penetration testing. Execute commands across hundreds of systems, dump credentials at scale, enumerate shares, and identify privilege escalation opportunities.

**Technologies:** SMB, WMI, WinRM, MSSQL protocols
**Use Cases:** Network enumeration, mass credential dumping, lateral movement
**Key Features:** Password spraying, SMB relay integration, SOCKS proxy pivoting

[Read Day 5 →](2026-02-09-day5-netexec-network-execution-toolkit.md)

---

### Day 6: Certipy - Active Directory Certificate Services (ADCS) Exploitation
**Published:** February 10, 2026
**Focus:** Certificate-based attacks and ADCS misconfigurations

Exploit Active Directory Certificate Services vulnerabilities to achieve privilege escalation and persistence. Identify misconfigured certificate templates (ESC1-ESC8), request certificates as privileged users, and establish certificate-based persistence.

**Technologies:** ADCS, certificate templates, PKINIT authentication
**Use Cases:** Privilege escalation via certificates, long-term persistence
**Key Vulnerabilities:** ESC1-ESC8 template misconfigurations, certificate theft

[Read Day 6 →](2026-02-10-day6-certipy-adcs-exploitation-toolkit.md)

---

### Day 7: Sliver - Modern Command and Control Framework
**Published:** February 11, 2026
**Focus:** Post-exploitation C2 with modern evasion techniques

Deploy a professional-grade C2 framework with advanced evasion, encrypted communications, and cross-platform support. Generate custom implants, establish persistent access, and conduct stealthy post-exploitation operations.

**Technologies:** Go-based implants, mTLS/DNS/HTTP(S) C2 channels
**Use Cases:** Long-term access, stealthy post-exploitation, red team operations
**Key Features:** In-memory execution, process injection, SOCKS proxying, credential harvesting

[Read Day 7 →](2026-02-11-day7-sliver-c2-framework.md)

---

### Day 8: Responder - LLMNR/NBT-NS/MDNS Credential Capture
**Published:** February 12, 2026
**Focus:** Network protocol poisoning for credential interception

Exploit Windows name resolution protocols to capture NTLMv2 hashes. Poison LLMNR, NBT-NS, and MDNS requests to impersonate network services and harvest credentials from authenticated users attempting to access nonexistent shares.

**Technologies:** LLMNR, NBT-NS, MDNS, WPAD poisoning
**Use Cases:** Initial access, credential harvesting, NTLM relay setup
**Key Techniques:** LLMNR poisoning, WPAD injection, SMB authentication capture

[Read Day 8 →](2026-02-12-day8-responder-credential-capture.md)

---

### Day 9: Evil-WinRM - PowerShell Remoting Post-Exploitation
**Published:** February 13, 2026
**Focus:** Advanced Windows Remote Management exploitation

Leverage WinRM for stealthy post-exploitation and lateral movement. Upload/download files, execute PowerShell scripts, load .NET assemblies, bypass AMSI, and conduct reconnaissance entirely within legitimate administrative protocols.

**Technologies:** WinRM, PowerShell Remoting, Kerberos authentication
**Use Cases:** Post-exploitation, lateral movement, living-off-the-land techniques
**Key Features:** Pass-the-Hash via WinRM, DLL injection, AMSI bypass, in-memory execution

[Read Day 9 →](2026-02-13-day9-evil-winrm-post-exploitation-shell.md)

---

### Day 10: Coercer - Authentication Coercion Toolkit
**Published:** February 14, 2026
**Focus:** Forced authentication attacks for NTLM relay and credential capture

Force authentication from target systems using 20+ protocol coercion techniques. Trigger SMB authentication to attacker-controlled servers for NTLM relay attacks, credential capture, and privilege escalation via PetitPotam, PrinterBug, DFSCoerce, and other methods.

**Technologies:** MS-RPRN, MS-EFSRPC, MS-FSRVP protocol abuse
**Use Cases:** NTLM relay, forced authentication, credential theft
**Key Techniques:** PetitPotam, PrinterBug, ShadowCoerce, DFSCoerce

[Read Day 10 →](2026-02-14-day10-coercer-authentication-coercion.md)

---

## Technical Requirements

**Operating Systems:** Kali Linux (primary), Windows 10/11 (some tools), ParrotOS, Ubuntu
**Virtualization:** VMware, VirtualBox, Proxmox (for lab environments)

**Key Tools:**
- BloodHound + Neo4j (graph analysis)
- Impacket (Python 3.9+)
- Rubeus (.NET 4.5+)
- Mimikatz (Windows-native)
- NetExec (Python 3.9+)
- Certipy (Python 3.9+)
- Sliver C2 (Go-based)
- Responder (Python 2.7/3.x)
- Evil-WinRM (Ruby-based)
- Coercer (Python 3.9+)

**Recommended Lab Environments:**
- Game of Active Directory (GOAD) - Multi-forest AD lab
- Active Directory Security Lab (ADSL)
- DetectionLab - Security monitoring focused
- VulnLab - Vulnerable AD environments
- HackTheBox Pro Labs (Dante, RastaLabs, Offshore)

## Learning Path

### Week 1: Reconnaissance & Initial Access (Days 1-3)
Start with BloodHound for attack path mapping, Impacket for protocol-level exploitation, and Rubeus for Kerberos attacks. Build foundation in AD enumeration and initial compromise techniques.

### Week 2: Credential Access & Lateral Movement (Days 4-6)
Progress to Mimikatz for credential extraction, NetExec for network-wide automation, and Certipy for certificate-based attacks. Master credential theft and lateral movement across the domain.

### Week 3: Post-Exploitation & Persistence (Days 7-10)
Complete with Sliver C2 for persistent access, Responder for credential capture, Evil-WinRM for stealthy post-exploitation, and Coercer for forced authentication. Build comprehensive red team capabilities.

## Real-World Applications

**Penetration Testing Engagements:**
- Map attack paths in 5,000+ user enterprise domains
- Identify privilege escalation vulnerabilities in 90% of AD environments
- Demonstrate business risk of AD misconfigurations to executives
- Provide actionable remediation recommendations for Blue Team

**Red Team Operations:**
- Establish persistent C2 access in hardened environments
- Bypass EDR/AV using protocol-level tools (Impacket, Evil-WinRM)
- Simulate nation-state adversary TTPs (MITRE ATT&CK)
- Test detection capabilities of SOC/SIEM infrastructure

**Security Research:**
- Discover new ADCS exploitation techniques (ESC9-ESC13)
- Develop custom Coercer modules for new protocols
- Build automation frameworks combining multiple tools
- Contribute to open-source security tool development

**Purple Team Validation:**
- Validate EDR detection rules for Mimikatz, Rubeus, Sliver
- Test LLMNR/NBT-NS poisoning detection (Responder)
- Verify BloodHound ingestion prevention controls
- Measure SOC response times to Golden Ticket creation

## Ethical and Legal Considerations

**CRITICAL - Authorized Use Only:**

All tools and techniques in this series must **ONLY** be used in environments where you have explicit written authorization:
- Penetration testing contracts with clear scope
- Red team engagements with Rules of Engagement (RoE)
- Personal lab environments (GOAD, ADSL, HackTheBox)
- Authorized capture-the-flag competitions

**Illegal Activities (DO NOT DO):**
- Unauthorized access to systems or networks
- Credential theft from production systems without authorization
- Deploying C2 infrastructure on systems you don't own
- Using these tools for corporate espionage or data theft
- Attacking systems outside your authorized scope

**Legal Frameworks:**
- United States: Computer Fraud and Abuse Act (CFAA)
- European Union: Network and Information Systems Directive (NIS2)
- United Kingdom: Computer Misuse Act 1990
- Australia: Cybercrime Act 2001

Violating these laws can result in criminal prosecution, imprisonment, and significant fines. **Always obtain written authorization before testing.**

## Tool Detection and Blue Team Perspective

As offensive security professionals, understanding defensive detection is critical:

**High Detection Risk Tools:**
- **Mimikatz**: Heavily signatured by all EDR/AV platforms
- **Rubeus**: Detected by Windows Defender and modern EDR
- **Responder**: LLMNR poisoning triggers network IDS alerts

**Moderate Detection Risk:**
- **BloodHound**: SharpHound execution may trigger behavioral alerts
- **NetExec**: Mass SMB authentication attempts trigger alerts
- **Sliver**: Default configurations detected by EDR heuristics

**Lower Detection Risk (Protocol-Level):**
- **Impacket**: Pure Python, protocol-compliant, harder to detect
- **Evil-WinRM**: Uses legitimate WinRM protocol
- **Coercer**: Exploits legitimate Windows RPC protocols

**Evasion Techniques Covered:**
- AMSI bypass for PowerShell tools
- Process injection and in-memory execution
- Obfuscation and custom compilation
- Protocol-level attacks (harder to detect than binaries)
- Living-off-the-land techniques

## Lab Setup Recommendations

**Recommended: Game of Active Directory (GOAD)**

GOAD provides the most comprehensive AD attack surface:
- 5 domains across 2 forests
- 11+ vulnerable configurations
- ADCS, MSSQL, and trust relationships
- All tools in this series have been tested against GOAD

**Setup GOAD:**
```bash
git clone https://github.com/Orange-Cyberdefense/GOAD
cd GOAD/ad/GOAD/providers/virtualbox
vagrant up
```

**Alternative Labs:**
- **DetectionLab**: Focus on EDR/SIEM detection testing
- **VulnLab**: Cloud-hosted vulnerable AD environments
- **HackTheBox**: Academy modules and Pro Labs (Dante, RastaLabs)

## Tool Integration Workflows

**Common Attack Chain:**
1. **Initial Recon**: BloodHound (Day 1) + Impacket enumeration (Day 2)
2. **Credential Access**: Responder (Day 8) → Crack NTLMv2 → Pass-the-Hash with NetExec (Day 5)
3. **Privilege Escalation**: Kerberoasting with Rubeus (Day 3) → Crack TGS → Domain Admin
4. **Persistence**: Deploy Sliver C2 (Day 7) + Golden Ticket via Mimikatz (Day 4)
5. **Exfiltration**: Evil-WinRM (Day 9) for data staging and transfer

**Advanced Technique Combinations:**
- Coercer (Day 10) + ntlmrelayx (Day 2) → ADCS ESC8 exploitation (Day 6)
- Responder (Day 8) → NetExec password spraying (Day 5) → Lateral movement
- BloodHound (Day 1) → Identify Certipy targets (Day 6) → Certificate-based privilege escalation

## Code Quality Standards

All tools and walkthroughs in this series follow these principles:
- **Practical demonstrations**: Real-world lab examples using GOAD
- **Comprehensive coverage**: Tool history, installation, usage, detection
- **Ethical framing**: Constant reminders about legal and authorized use
- **Blue team perspective**: Detection methods and defensive recommendations
- **Up-to-date content**: 2025-2026 tool versions and techniques

## Community & Contributions

These tools are maintained by the security research community:
- Report bugs and issues to tool maintainers on GitHub
- Contribute detection signatures to open-source SIEM rules (Sigma, YARA)
- Share lab configurations and vulnerable environment setups
- Participate in responsible disclosure of new AD vulnerabilities

## Next Steps in Your Security Journey

After completing this series, expand your expertise with these pathways:

### Advanced Active Directory Techniques
- **Kerberos Delegation Attacks**: Unconstrained, constrained, and resource-based constrained delegation (RBCD)
- **Cross-Forest Attacks**: SID History injection, trust key extraction, forest privilege escalation
- **Azure AD/Entra ID Integration**: Pass-the-PRT, Primary Refresh Token theft, device code phishing
- **Group Policy Exploitation**: GPO abuse, GPP passwords, SYSVOL mining
- **LAPS Credential Theft**: Local Administrator Password Solution extraction and abuse

### Specialized Tool Development
- **Custom Impacket Scripts**: Build protocol-level tools for specific engagements
- **BloodHound Custom Queries**: Develop Cypher queries for unique attack paths
- **Sliver C2 Modules**: Create custom BOFs (Beacon Object Files) and armory packages
- **ADCS Research**: Discover new certificate template escalation vectors (ESC9+)
- **Coercer Modules**: Develop new forced authentication protocol abuse techniques

### Defensive Security Skills
- **Detection Engineering**: Write Sigma rules, Yara signatures, EDR detection logic
- **Threat Hunting**: Hunt for AD compromise using Splunk, Elastic, Microsoft Sentinel
- **AD Hardening**: Implement Tier 0 isolation, ESAE forests, privileged access workstations
- **Monitoring Infrastructure**: Deploy Sysmon, configure advanced audit policies, SIEM integration
- **Incident Response**: Practice AD compromise recovery, Golden Ticket detection, credential rotation

### Professional Certifications
- **OSCP (Offensive Security Certified Professional)**: Entry-level penetration testing certification
- **OSEP (Offensive Security Experienced Penetration Tester)**: Advanced AD exploitation focus
- **CRTO (Certified Red Team Operator)**: Red team operations and C2 frameworks
- **CRTP (Certified Red Team Professional)**: AD-specific red teaming certification
- **GXPN (GIAC Exploit Researcher and Advanced Penetration Tester)**: Advanced exploitation

### Complementary Series to Study
- **10 Days of Python Security** (This blog): SOC automation, threat intel, API security
- **10 Days of PowerShell Security** (This blog): Windows hardening, Azure Defender, M365 security
- **MITRE ATT&CK for Enterprise**: Map all tools to MITRE techniques (TA0001-TA0011)
- **Certified Red Teaming Professional (CRTP)**: 30-hour AD security course by Altered Security

### Capture-the-Flag Competitions
- **HackTheBox Pro Labs**: Dante (hybrid), RastaLabs (AD-focused), Offshore (enterprise)
- **TryHackMe AD Paths**: Holo, Throwback, Wreath networks
- **Pentester Lab**: Active Directory badges and learning paths
- **VulnHub**: OSCP-like vulnerable AD machines
- **SANS NetWars**: Annual AD-focused capture-the-flag events

### Real-World Practice Environments
- **Home Lab Infrastructure**: Build multi-forest AD with VMware/Proxmox (10-15 VMs)
- **Game of Active Directory (GOAD)**: Most realistic vulnerable AD lab (recommended)
- **DetectionLab**: Combine offense with defensive monitoring practice
- **PurpleLab**: Purple team environment with pre-built detection scenarios

### Open-Source Contributions
- **Impacket**: Submit new protocol implementations or bug fixes
- **BloodHound**: Develop custom queries, contribute to Community Edition
- **Atomic Red Team**: Add new MITRE ATT&CK technique simulations
- **Sigma Rules**: Write detection signatures for tools in this series
- **Tool Forks**: Create modified versions with additional features or evasion

### Staying Current (2026 and Beyond)
- **Follow Security Researchers**: SpecterOps, Fortra, Carsten Sandker, Will Schroeder, Sean Metcalf
- **Monitor CVEs**: Subscribe to Microsoft security advisories, Zero Day Initiative
- **Attend Conferences**: DEF CON, Black Hat, BSides, Derbycon (Red Team Village)
- **Read Research Papers**: ADCS vulnerabilities, Kerberos exploitation, Azure AD attacks
- **Practice Continuously**: New AD attack techniques emerge every quarter

### Books and Resources
- **"Attacking Active Directory"** by Adam Chester (xpn)
- **"Active Directory Security Best Practices"** by Sean Metcalf
- **"Pentesting Azure Applications"** by Matt Burrough
- **SpecterOps Blog**: In-depth AD security research articles
- **Microsoft Security Blog**: Defender team analysis of real-world attacks
- **MITRE ATT&CK Navigator**: Map your knowledge to adversary techniques

### Career Pathways
- **Penetration Tester**: Conduct authorized security assessments for clients
- **Red Team Operator**: Simulate adversaries for enterprise organizations
- **Security Researcher**: Discover and responsibly disclose new vulnerabilities
- **Detection Engineer**: Build detection logic and threat hunting queries
- **Incident Responder**: Investigate and remediate AD compromises
- **Security Architect**: Design resilient AD infrastructure and implement Zero Trust

---

## Series Statistics

- **Total Posts:** 10
- **Tools Covered:** 10+ industry-standard offensive tools
- **Techniques:** 50+ attack methods (Kerberoasting, DCSync, Golden Ticket, NTLM Relay, etc.)
- **Lab Focus:** Game of Active Directory (GOAD) vulnerable environment
- **Use Cases:** Penetration testing, red teaming, security research, detection engineering
- **Time to Complete:** 20-30 hours (reading + lab practice)

## About the Author

James Wells is a security engineer specializing in Active Directory security, penetration testing, and red team operations. This series represents practical knowledge gained from authorized security assessments, CTF competitions, and hands-on lab practice with vulnerable AD environments.

## Related Series

- **10 Days of Python Security** - Cross-platform security automation with ML/AI (February 15-25, 2026)
- **10 Days of PowerShell Security** - Windows defensive security and infrastructure hardening (February 26 - March 8, 2026)

---

**Start Learning:** [Begin with Day 1: BloodHound - AD Attack Path Visualization →](2026-02-05-day1-bloodhound-ad-attack-path-visualization.md)

---

## Quick Reference Guide

**By Attack Phase (MITRE ATT&CK):**
- **Reconnaissance**: BloodHound (Day 1), Impacket enumeration (Day 2)
- **Initial Access**: Responder (Day 8), Coercer + NTLM Relay (Day 10)
- **Credential Access**: Mimikatz (Day 4), Rubeus (Day 3), Impacket (Day 2)
- **Lateral Movement**: NetExec (Day 5), Evil-WinRM (Day 9), Sliver (Day 7)
- **Privilege Escalation**: Certipy (Day 6), Rubeus (Day 3), BloodHound paths (Day 1)
- **Persistence**: Sliver C2 (Day 7), Golden Tickets (Day 4), Certificate theft (Day 6)

**By Skill Level:**
- **Beginner**: Days 1, 8 (BloodHound, Responder - straightforward usage)
- **Intermediate**: Days 2, 3, 5, 9 (Impacket, Rubeus, NetExec, Evil-WinRM - protocol knowledge)
- **Advanced**: Days 4, 6, 7, 10 (Mimikatz, Certipy, Sliver, Coercer - complex techniques)

**By Time Investment:**
- **Quick Labs (< 2 hours)**: Days 1, 8, 9 (BloodHound, Responder, Evil-WinRM)
- **Standard (2-4 hours)**: Days 2, 3, 5, 10 (Impacket, Rubeus, NetExec, Coercer)
- **Deep Dive (4+ hours)**: Days 4, 6, 7 (Mimikatz, Certipy, Sliver - requires infrastructure)

---

**LEGAL DISCLAIMER**: All tools and techniques in this series are provided for educational purposes and authorized security testing only. Unauthorized access to computer systems is illegal. Always obtain explicit written permission before testing systems you do not own. The author and publisher assume no liability for misuse of information presented.

---

**Series Complete!** All 10 posts provide comprehensive coverage of Active Directory offensive security tools used in professional penetration testing and red team operations. Master the tools, understand the techniques, practice ethically, and become a skilled AD security professional.
