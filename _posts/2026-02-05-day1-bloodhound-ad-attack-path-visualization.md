---
layout: post
title: "10 Days of AD Security: Day 1 - BloodHound"
date: 2026-02-05
category: Active Directory Security
author: James Wells
---

## History and Overview

BloodHound revolutionized Active Directory security assessment when it was released by SpecterOps in 2016. Created by Andrew Robbins, Rohan Vazarkar, and Will Schroeder, BloodHound uses graph theory to reveal hidden and often unintended relationships within Active Directory environments. The tool works by collecting data about AD objects, relationships, and permissions using its companion tool SharpHound, then visualizes this data in a Neo4j graph database. This allows penetration testers and red teamers to identify complex attack paths that would be nearly impossible to discover manually. BloodHound has become so influential that it's now considered essential for any serious AD penetration test, with the Community Edition (CE) released in 2023 bringing modern improvements including support for Azure AD/Entra ID environments.

## Download and Installation

**Official Source:** [https://github.com/SpecterOps/BloodHound](https://github.com/SpecterOps/BloodHound)

**Installation:**
1. Download the latest BloodHound Community Edition release from GitHub
2. Install Neo4j database (required for graph storage):
   ```bash
   # On Kali Linux
   sudo apt update
   sudo apt install neo4j bloodhound
   ```
3. Start Neo4j service:
   ```bash
   sudo neo4j console
   ```
4. Access Neo4j at http://localhost:7474 and set initial password
5. Launch BloodHound and connect using Neo4j credentials

**SharpHound Data Collector:**
- Download from: [https://github.com/BloodHoundAD/SharpHound](https://github.com/BloodHoundAD/SharpHound)
- Pre-compiled binary available in releases
- Can also use PowerShell version (SharpHound.ps1)

## When to Use BloodHound

Use BloodHound when you need to:
- **Map complex AD environments**: Large organizations with thousands of users, groups, and nested permissions
- **Identify privilege escalation paths**: Find the shortest path from a compromised low-privilege account to Domain Admin
- **Understand trust relationships**: Visualize cross-domain and cross-forest trust configurations
- **Plan lateral movement**: Identify which systems a compromised account can access
- **Assess AD security posture**: During security audits to identify dangerous misconfigurations
- **Demonstrate risk to stakeholders**: Visual graphs are powerful tools for communicating security issues

BloodHound is typically used early in the post-exploitation phase, once you have credentials or a foothold in the domain.

## Walkthrough

**Step 1: Collect AD Data with SharpHound**

From a domain-joined Windows system with valid credentials:
```powershell
# Run SharpHound to collect all AD data
.\SharpHound.exe -c All

# Specify domain controller
.\SharpHound.exe -c All -d example.local

# Stealth collection (fewer queries, slower)
.\SharpHound.exe -c All --Stealth
```

SharpHound will create a ZIP file containing JSON data about:
- Users, groups, computers, domains
- Group memberships and nested groups
- Local admin rights
- Session information
- ACL/permissions
- Trust relationships

**Step 2: Import Data into BloodHound**

1. Start BloodHound and log into Neo4j database
2. Drag and drop the SharpHound ZIP file into BloodHound interface
3. Wait for data import to complete (may take several minutes for large environments)

**Step 3: Run Pre-built Queries**

BloodHound includes powerful pre-built queries:
- "Find Shortest Paths to Domain Admins"
- "Find Principals with DCSync Rights"
- "Find Computers where Domain Users are Local Admin"
- "Find All Paths from Kerberoastable Users"
- "Find Workstations where Domain Users can RDP"

**Step 4: Analyze Custom Paths**

Right-click any node to:
- Set as starting point or destination
- Find shortest path between two nodes
- Show all paths
- Mark node as "owned" to update attack paths

## Game of Active Directory Lab Example

In the GOAD (Game of Active Directory) lab environment, BloodHound reveals several interesting attack paths:

**Scenario: From Brandon Stark to Domain Admin**

1. **Initial Compromise**: We've compromised the brandon.stark account (vulnerable to AS-REP roasting in GOAD)

2. **Data Collection**:
   ```powershell
   # From Windows attack box in GOAD network
   .\SharpHound.exe -c All -d north.sevenkingdoms.local
   ```

3. **Import and Analysis**:
   - Import the ZIP into BloodHound
   - Set brandon.stark as "Owned" (right-click → Mark User as Owned)
   - Run query: "Shortest Paths to Domain Admins from Owned Principals"

4. **Attack Path Discovered**:
   BloodHound reveals that brandon.stark is a member of the "NIGHT WATCH" group, which has GenericAll permissions on jon.snow, who is a member of Domain Admins.

5. **Exploitation Path**:
   - Use brandon.stark's GenericAll rights to reset jon.snow's password
   - Authenticate as jon.snow who has Domain Admin privileges
   - Game over - domain compromised

**Key GOAD Lab Findings with BloodHound:**
- Identify kerberoastable users (jon.snow)
- Find AS-REP roastable users (brandon.stark)
- Discover delegation misconfigurations
- Map the complex trust relationships between the North, Essos, and Meereen domains
- Identify which users have local admin rights on which servers

## Conclusion

BloodHound transformed Active Directory penetration testing from a manual, time-consuming process into an efficient, graph-theory-driven analysis. Its ability to reveal hidden attack paths makes it indispensable for both red teams looking to compromise domains and blue teams seeking to understand and remediate AD security weaknesses. The tool's visualizations are powerful not just for technical analysis but for communicating risk to non-technical stakeholders.

In the GOAD lab, BloodHound quickly reveals the intentionally vulnerable configurations that would take hours to discover manually. For real-world engagements, it's often the difference between spending days searching for privilege escalation paths and finding them in minutes.

**Next in this series:** Day 2 will cover Impacket, the Python toolkit that provides the building blocks for AD protocol interaction and exploitation.
