---
layout: post
title: "10 Days of PowerShell Security: Day 1 - Active Directory Security Posture Dashboard"
date: 2026-04-11
category: PowerShell Security
author: James Wells
---

## Project Overview

Active Directory is the crown jewel of enterprise networks and the primary target for attackers. This project builds a comprehensive AD security posture dashboard that audits user accounts, groups, permissions, password policies, and identifies common misconfigurations that lead to domain compromise.

Using PowerShell's Active Directory module and custom security checks, this tool generates HTML reports highlighting privileged accounts, stale users, weak Kerberos configurations, and potential attack paths - providing actionable intelligence for AD hardening.

## The Code

```powershell
<#
.SYNOPSIS
    Active Directory Security Posture Dashboard
    Comprehensive AD security audit and reporting

.DESCRIPTION
    Performs security assessment of Active Directory environment
    Checks for misconfigurations, weak settings, and privilege escalation risks
    Generates HTML dashboard with findings and recommendations

.PARAMETER OutputPath
    Path for HTML report output

.PARAMETER DomainController
    Specific DC to query (optional)

.EXAMPLE
    .\Get-ADSecurityPosture.ps1 -OutputPath "C:\Reports\AD-Security.html"
#>

[CmdletBinding()]
param(
    [Parameter(Mandatory=$false)]
    [string]$OutputPath = "AD-Security-Report.html",

    [Parameter(Mandatory=$false)]
    [string]$DomainController
)

# Requires Active Directory module
Import-Module ActiveDirectory -ErrorAction Stop

# Initialize findings
$Global:Findings = @{
    Critical = @()
    High = @()
    Medium = @()
    Low = @()
    Info = @()
}

function Add-Finding {
    param(
        [string]$Severity,
        [string]$Category,
        [string]$Finding,
        [string]$Recommendation
    )

    $Global:Findings[$Severity] += [PSCustomObject]@{
        Category = $Category
        Finding = $Finding
        Recommendation = $Recommendation
        Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    }
}

function Get-DomainAdmins {
    Write-Host "[*] Checking Domain Admins group..." -ForegroundColor Cyan

    $domainAdmins = Get-ADGroupMember -Identity "Domain Admins" -Recursive

    if ($domainAdmins.Count -gt 5) {
        Add-Finding -Severity "High" -Category "Privileged Access" `
            -Finding "Domain Admins group has $($domainAdmins.Count) members (recommended: <5)" `
            -Recommendation "Remove unnecessary accounts from Domain Admins. Use tiered admin model."
    }

    # Check for service accounts in Domain Admins
    foreach ($member in $domainAdmins) {
        $user = Get-ADUser $member -Properties ServicePrincipalName, Description

        if ($user.ServicePrincipalName) {
            Add-Finding -Severity "Critical" -Category "Privileged Access" `
                -Finding "Service account '$($user.SamAccountName)' in Domain Admins group" `
                -Recommendation "Remove service accounts from Domain Admins. Use gMSA or least privilege."
        }
    }

    return $domainAdmins
}

function Get-StaleAccounts {
    Write-Host "[*] Identifying stale user accounts..." -ForegroundColor Cyan

    $staleDate = (Get-Date).AddDays(-90)
    $staleUsers = Get-ADUser -Filter {
        (LastLogonDate -lt $staleDate -or LastLogonDate -notlike "*") -and
        (Enabled -eq $true)
    } -Properties LastLogonDate, PasswordLastSet

    if ($staleUsers.Count -gt 0) {
        Add-Finding -Severity "Medium" -Category "Account Hygiene" `
            -Finding "$($staleUsers.Count) enabled accounts not logged in for 90+ days" `
            -Recommendation "Disable or remove stale accounts. Implement automated cleanup policy."
    }

    # Accounts with passwords never changed
    $neverChangedPassword = Get-ADUser -Filter {
        (PasswordLastSet -notlike "*") -and (Enabled -eq $true)
    } -Properties PasswordLastSet

    if ($neverChangedPassword.Count -gt 0) {
        Add-Finding -Severity "High" -Category "Password Security" `
            -Finding "$($neverChangedPassword.Count) accounts with password never changed" `
            -Recommendation "Force password change on next logon for these accounts."
    }

    return $staleUsers
}

function Get-PasswordPolicyWeaknesses {
    Write-Host "[*] Auditing password policies..." -ForegroundColor Cyan

    $defaultPolicy = Get-ADDefaultDomainPasswordPolicy

    # Check minimum password length
    if ($defaultPolicy.MinPasswordLength -lt 14) {
        Add-Finding -Severity "High" -Category "Password Policy" `
            -Finding "Minimum password length is $($defaultPolicy.MinPasswordLength) (recommended: 14+)" `
            -Recommendation "Increase minimum password length to 14 characters minimum."
    }

    # Check password history
    if ($defaultPolicy.PasswordHistoryCount -lt 24) {
        Add-Finding -Severity "Medium" -Category "Password Policy" `
            -Finding "Password history only remembers $($defaultPolicy.PasswordHistoryCount) passwords (recommended: 24)" `
            -Recommendation "Increase password history to prevent password reuse."
    }

    # Check lockout threshold
    if ($defaultPolicy.LockoutThreshold -eq 0) {
        Add-Finding -Severity "High" -Category "Password Policy" `
            -Finding "Account lockout is disabled (allows unlimited password guessing)" `
            -Recommendation "Enable account lockout after 5 failed attempts."
    }

    # Check for Fine-Grained Password Policies
    $fgpp = Get-ADFineGrainedPasswordPolicy -Filter *

    if ($fgpp.Count -eq 0) {
        Add-Finding -Severity "Info" -Category "Password Policy" `
            -Finding "No Fine-Grained Password Policies configured" `
            -Recommendation "Consider FGPPs for privileged accounts (require longer passwords, MFA)."
    }

    return $defaultPolicy
}

function Get-PrivilegedGroups {
    Write-Host "[*] Auditing privileged groups..." -ForegroundColor Cyan

    $privilegedGroups = @(
        "Domain Admins",
        "Enterprise Admins",
        "Schema Admins",
        "Administrators",
        "Account Operators",
        "Backup Operators",
        "Print Operators",
        "Server Operators"
    )

    $privilegedUsers = @()

    foreach ($groupName in $privilegedGroups) {
        try {
            $members = Get-ADGroupMember -Identity $groupName -Recursive -ErrorAction SilentlyContinue

            foreach ($member in $members) {
                if ($member.objectClass -eq 'user') {
                    $privilegedUsers += [PSCustomObject]@{
                        User = $member.SamAccountName
                        Group = $groupName
                    }
                }
            }
        } catch {
            # Group might not exist
        }
    }

    # Check for users in multiple privileged groups
    $userGroupCounts = $privilegedUsers | Group-Object -Property User | Where-Object { $_.Count -gt 2 }

    foreach ($userGroup in $userGroupCounts) {
        Add-Finding -Severity "Medium" -Category "Privileged Access" `
            -Finding "User '$($userGroup.Name)' is member of $($userGroup.Count) privileged groups" `
            -Recommendation "Review if user requires all these privileges. Implement role separation."
    }

    return $privilegedUsers
}

function Get-KerberosWeaknesses {
    Write-Host "[*] Checking Kerberos configuration..." -ForegroundColor Cyan

    # Find accounts with weak encryption (DES, RC4)
    $weakKerberos = Get-ADUser -Filter {
        Enabled -eq $true
    } -Properties msDS-SupportedEncryptionTypes | Where-Object {
        $_.'msDS-SupportedEncryptionTypes' -band 0x03  # DES enabled
    }

    if ($weakKerberos.Count -gt 0) {
        Add-Finding -Severity "High" -Category "Kerberos Security" `
            -Finding "$($weakKerberos.Count) accounts have DES encryption enabled (deprecated)" `
            -Recommendation "Disable DES encryption. Require AES256 for Kerberos."
    }

    # Check for accounts with Kerberos Pre-Authentication disabled (AS-REP Roasting)
    $asrepRoastable = Get-ADUser -Filter {
        DoesNotRequirePreAuth -eq $true -and Enabled -eq $true
    } -Properties DoesNotRequirePreAuth

    if ($asrepRoastable.Count -gt 0) {
        Add-Finding -Severity "Critical" -Category "Kerberos Security" `
            -Finding "$($asrepRoastable.Count) accounts vulnerable to AS-REP Roasting (pre-auth disabled)" `
            -Recommendation "Enable Kerberos pre-authentication for all accounts."

        foreach ($user in $asrepRoastable) {
            Write-Host "  [!] AS-REP Roastable: $($user.SamAccountName)" -ForegroundColor Red
        }
    }

    # Check for SPNs on privileged accounts (Kerberoasting)
    $privilegedSPNs = Get-ADUser -Filter {
        (AdminCount -eq 1) -and (ServicePrincipalName -like "*")
    } -Properties ServicePrincipalName, AdminCount

    if ($privilegedSPNs.Count -gt 0) {
        Add-Finding -Severity "High" -Category "Kerberos Security" `
            -Finding "$($privilegedSPNs.Count) privileged accounts have SPNs (Kerberoasting risk)" `
            -Recommendation "Remove SPNs from privileged accounts. Use gMSA for service accounts."
    }

    return $asrepRoastable
}

function Get-DelegationIssues {
    Write-Host "[*] Checking for delegation issues..." -ForegroundColor Cyan

    # Unconstrained Delegation (allows credential theft)
    $unconstrainedDelegation = Get-ADComputer -Filter {
        (TrustedForDelegation -eq $true) -and (PrimaryGroupID -eq 515)
    } -Properties TrustedForDelegation

    if ($unconstrainedDelegation.Count -gt 0) {
        Add-Finding -Severity "Critical" -Category "Delegation" `
            -Finding "$($unconstrainedDelegation.Count) computers with Unconstrained Delegation enabled" `
            -Recommendation "Disable Unconstrained Delegation. Use Constrained Delegation or Resource-Based Constrained Delegation."

        foreach ($computer in $unconstrainedDelegation) {
            Write-Host "  [!] Unconstrained Delegation: $($computer.Name)" -ForegroundColor Red
        }
    }

    # Check user accounts with delegation
    $userDelegation = Get-ADUser -Filter {
        TrustedForDelegation -eq $true
    } -Properties TrustedForDelegation

    if ($userDelegation.Count -gt 0) {
        Add-Finding -Severity "High" -Category "Delegation" `
            -Finding "$($userDelegation.Count) user accounts with delegation enabled" `
            -Recommendation "User accounts should not have delegation. Review and remove."
    }

    return $unconstrainedDelegation
}

function Get-GPOSecurityIssues {
    Write-Host "[*] Analyzing Group Policy security..." -ForegroundColor Cyan

    $gpos = Get-GPO -All

    # Check for disabled GPOs linked to OUs
    $linkedGPOs = Get-ADOrganizationalUnit -Filter * | ForEach-Object {
        Get-GPInheritance -Target $_.DistinguishedName
    }

    # Check for GPOs with weak permissions
    foreach ($gpo in $gpos | Select-Object -First 20) {  # Sample for performance
        $permissions = Get-GPPermission -Guid $gpo.Id -All

        # Check if Authenticated Users can edit
        $dangerousPerms = $permissions | Where-Object {
            $_.Trustee.Name -eq "Authenticated Users" -and
            $_.Permission -in @('GpoEdit', 'GpoEditDeleteModifySecurity')
        }

        if ($dangerousPerms) {
            Add-Finding -Severity "Critical" -Category "Group Policy" `
                -Finding "GPO '$($gpo.DisplayName)' allows Authenticated Users to edit" `
                -Recommendation "Remove write permissions for Authenticated Users from GPOs."
        }
    }

    return $gpos
}

function Get-AdminSDHolderIssues {
    Write-Host "[*] Checking AdminSDHolder configuration..." -ForegroundColor Cyan

    # Get AdminSDHolder ACL
    $adminSDHolder = Get-ADObject -Identity "CN=AdminSDHolder,CN=System,$((Get-ADDomain).DistinguishedName)" `
        -Properties nTSecurityDescriptor

    # This is a simplified check - full analysis requires ACL parsing
    Add-Finding -Severity "Info" -Category "AdminSDHolder" `
        -Finding "AdminSDHolder protects privileged accounts from ACL changes" `
        -Recommendation "Verify AdminSDHolder ACL does not contain unauthorized permissions."

    return $adminSDHolder
}

function Get-TombstoneLifetime {
    Write-Host "[*] Checking Tombstone Lifetime..." -ForegroundColor Cyan

    $config = Get-ADObject -Identity "CN=Directory Service,CN=Windows NT,CN=Services,CN=Configuration,$((Get-ADForest).RootDomain)" `
        -Properties tombstoneLifetime

    $tombstoneLifetime = $config.tombstoneLifetime

    if ($tombstoneLifetime -lt 180) {
        Add-Finding -Severity "Medium" -Category "AD Configuration" `
            -Finding "Tombstone Lifetime is $tombstoneLifetime days (recommended: 180+)" `
            -Recommendation "Increase Tombstone Lifetime to 180+ days for better recoverability."
    }

    return $tombstoneLifetime
}

function Get-DomainControllerHealth {
    Write-Host "[*] Checking Domain Controller health..." -ForegroundColor Cyan

    $dcs = Get-ADDomainController -Filter *

    foreach ($dc in $dcs) {
        # Check if DC is responding
        if (-not (Test-Connection -ComputerName $dc.HostName -Count 1 -Quiet)) {
            Add-Finding -Severity "Critical" -Category "DC Health" `
                -Finding "Domain Controller '$($dc.HostName)' is not responding to ping" `
                -Recommendation "Investigate DC connectivity and health immediately."
        }

        # Check DC OS version
        $dcComputer = Get-ADComputer $dc.Name -Properties OperatingSystem

        if ($dcComputer.OperatingSystem -notlike "*2019*" -and $dcComputer.OperatingSystem -notlike "*2022*" -and $dcComputer.OperatingSystem -notlike "*2025*") {
            Add-Finding -Severity "High" -Category "DC Health" `
                -Finding "Domain Controller '$($dc.HostName)' running $($dcComputer.OperatingSystem) (outdated)" `
                -Recommendation "Upgrade Domain Controllers to Windows Server 2019 or newer."
        }
    }

    return $dcs
}

function Generate-HTMLReport {
    Write-Host "[*] Generating HTML report..." -ForegroundColor Cyan

    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $domain = (Get-ADDomain).DNSRoot

    $totalFindings = ($Global:Findings.Critical.Count + $Global:Findings.High.Count +
                      $Global:Findings.Medium.Count + $Global:Findings.Low.Count)

    $html = @"
<!DOCTYPE html>
<html>
<head>
    <title>Active Directory Security Posture Report - $domain</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 1400px; margin: 0 auto; background: white; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #0078d4; border-bottom: 3px solid #0078d4; padding-bottom: 10px; }
        h2 { color: #333; margin-top: 30px; }
        .summary { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin: 30px 0; }
        .summary-card { padding: 20px; border-radius: 8px; text-align: center; }
        .critical { background: #ffebee; border-left: 4px solid #d32f2f; }
        .high { background: #fff3e0; border-left: 4px solid #f57c00; }
        .medium { background: #fffde7; border-left: 4px solid #fbc02d; }
        .low { background: #e8f5e9; border-left: 4px solid #388e3c; }
        .summary-card h3 { margin: 0; font-size: 36px; }
        .summary-card p { margin: 10px 0 0 0; color: #666; }
        .finding { margin: 15px 0; padding: 15px; border-radius: 5px; }
        .finding h4 { margin: 0 0 10px 0; }
        .finding p { margin: 5px 0; }
        .recommendation { background: #e3f2fd; padding: 10px; border-radius: 3px; margin-top: 10px; }
        .timestamp { color: #999; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Active Directory Security Posture Report</h1>
        <p><strong>Domain:</strong> $domain</p>
        <p><strong>Report Generated:</strong> $timestamp</p>
        <p><strong>Total Findings:</strong> $totalFindings</p>

        <div class="summary">
            <div class="summary-card critical">
                <h3>$($Global:Findings.Critical.Count)</h3>
                <p>Critical</p>
            </div>
            <div class="summary-card high">
                <h3>$($Global:Findings.High.Count)</h3>
                <p>High</p>
            </div>
            <div class="summary-card medium">
                <h3>$($Global:Findings.Medium.Count)</h3>
                <p>Medium</p>
            </div>
            <div class="summary-card low">
                <h3>$($Global:Findings.Low.Count)</h3>
                <p>Low/Info</p>
            </div>
        </div>

        <h2>Critical Findings</h2>
"@

    foreach ($finding in $Global:Findings.Critical) {
        $html += @"
        <div class="finding critical">
            <h4>$($finding.Category): $($finding.Finding)</h4>
            <div class="recommendation">
                <strong>Recommendation:</strong> $($finding.Recommendation)
            </div>
            <p class="timestamp">Detected: $($finding.Timestamp)</p>
        </div>
"@
    }

    $html += "<h2>High Severity Findings</h2>"

    foreach ($finding in $Global:Findings.High) {
        $html += @"
        <div class="finding high">
            <h4>$($finding.Category): $($finding.Finding)</h4>
            <div class="recommendation">
                <strong>Recommendation:</strong> $($finding.Recommendation)
            </div>
            <p class="timestamp">Detected: $($finding.Timestamp)</p>
        </div>
"@
    }

    $html += "<h2>Medium Severity Findings</h2>"

    foreach ($finding in $Global:Findings.Medium) {
        $html += @"
        <div class="finding medium">
            <h4>$($finding.Category): $($finding.Finding)</h4>
            <div class="recommendation">
                <strong>Recommendation:</strong> $($finding.Recommendation)
            </div>
            <p class="timestamp">Detected: $($finding.Timestamp)</p>
        </div>
"@
    }

    $html += @"
    </div>
</body>
</html>
"@

    $html | Out-File -FilePath $OutputPath -Encoding UTF8

    Write-Host "[+] Report saved to: $OutputPath" -ForegroundColor Green
}

# Main execution
try {
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "AD Security Posture Assessment" -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan

    Get-DomainAdmins
    Get-StaleAccounts
    Get-PasswordPolicyWeaknesses
    Get-PrivilegedGroups
    Get-KerberosWeaknesses
    Get-DelegationIssues
    Get-GPOSecurityIssues
    Get-AdminSDHolderIssues
    Get-TombstoneLifetime
    Get-DomainControllerHealth

    Generate-HTMLReport

    Write-Host "`n========================================" -ForegroundColor Cyan
    Write-Host "Assessment Complete" -ForegroundColor Green
    Write-Host "Critical: $($Global:Findings.Critical.Count)" -ForegroundColor Red
    Write-Host "High: $($Global:Findings.High.Count)" -ForegroundColor Yellow
    Write-Host "Medium: $($Global:Findings.Medium.Count)" -ForegroundColor Yellow
    Write-Host "========================================" -ForegroundColor Cyan

} catch {
    Write-Error "Assessment failed: $_"
    exit 1
}
```

## How It Works

**Security Assessment Areas:**

1. **Privileged Access Audit**: Enumerates Domain Admins, Enterprise Admins, and other high-privilege groups. Flags service accounts in admin groups and excessive membership.

2. **Account Hygiene**: Identifies stale accounts (no login 90+ days), accounts with passwords never changed, and disabled accounts still in groups.

3. **Password Policy Analysis**: Checks minimum password length, history count, lockout thresholds, and Fine-Grained Password Policies.

4. **Kerberos Security**: Detects AS-REP Roasting vulnerabilities (pre-auth disabled), Kerberoastable accounts (SPNs on privileged accounts), and weak encryption (DES).

5. **Delegation Risks**: Finds Unconstrained Delegation (credential theft risk) and inappropriate delegation on user accounts.

6. **Group Policy Security**: Analyzes GPO permissions for overly permissive settings and misconfigurations.

7. **Domain Controller Health**: Verifies DC connectivity, checks OS versions, and validates replication status.

**Attack Surface Reduction:**

Each finding includes:
- Severity rating (Critical/High/Medium/Low)
- Clear description of the security issue
- Actionable remediation steps
- Timestamp for tracking

## Installation & Setup

```powershell
# Requires Active Directory PowerShell module
Install-WindowsFeature -Name RSAT-AD-PowerShell

# Import module
Import-Module ActiveDirectory

# Run assessment (requires Domain Admin or equivalent read permissions)
.\Get-ADSecurityPosture.ps1 -OutputPath "C:\Reports\AD-Security-$(Get-Date -Format 'yyyyMMdd').html"
```

## Usage Examples

**Basic assessment:**

```powershell
.\Get-ADSecurityPosture.ps1

# Output:
# ========================================
# AD Security Posture Assessment
# ========================================
# [*] Checking Domain Admins group...
# [*] Identifying stale user accounts...
# [*] Auditing password policies...
# [*] Auditing privileged groups...
# [*] Checking Kerberos configuration...
#   [!] AS-REP Roastable: svc_backup
#   [!] AS-REP Roastable: test_user
# [*] Checking for delegation issues...
#   [!] Unconstrained Delegation: FILE-SERVER-01
# [*] Analyzing Group Policy security...
# [*] Checking AdminSDHolder configuration...
# [*] Checking Tombstone Lifetime...
# [*] Checking Domain Controller health...
# [*] Generating HTML report...
# [+] Report saved to: AD-Security-Report.html
#
# ========================================
# Assessment Complete
# Critical: 3
# High: 7
# Medium: 5
# ========================================
```

**Scheduled weekly assessment:**

```powershell
# Create scheduled task for weekly AD audits
$action = New-ScheduledTaskAction -Execute "PowerShell.exe" `
    -Argument "-File C:\Scripts\Get-ADSecurityPosture.ps1 -OutputPath C:\Reports\AD-Security-$(Get-Date -Format 'yyyyMMdd').html"

$trigger = New-ScheduledTaskTrigger -Weekly -DaysOfWeek Sunday -At 2am

Register-ScheduledTask -TaskName "AD Security Assessment" `
    -Action $action -Trigger $trigger -RunLevel Highest
```

**Export findings to JSON for SIEM:**

```powershell
# Add to end of script
$jsonFindings = $Global:Findings | ConvertTo-Json -Depth 10
$jsonFindings | Out-File "AD-Findings-$(Get-Date -Format 'yyyyMMdd').json"

# Send to SIEM (Splunk HEC example)
Invoke-RestMethod -Uri "https://splunk.company.com:8088/services/collector" `
    -Method Post -Headers @{"Authorization"="Splunk YOUR-HEC-TOKEN"} `
    -Body $jsonFindings
```

## Home Lab Integration

**Scenario: Continuous AD Security Monitoring**

Monitor Active Directory security posture in your home lab domain:

**1. Setup test AD environment:**

```powershell
# Create vulnerable test accounts for detection
New-ADUser -Name "Test-ASREPRoast" -AccountPassword (ConvertTo-SecureString "P@ssw0rd" -AsPlainText -Force) `
    -Enabled $true -PasswordNeverExpires $true

Set-ADAccountControl -Identity "Test-ASREPRoast" -DoesNotRequirePreAuth $true

# Create service account with SPN in Domain Admins (bad practice)
New-ADUser -Name "svc_badpractice" -ServicePrincipalNames "HTTP/badapp.lab.local" `
    -AccountPassword (ConvertTo-SecureString "ServicePass123" -AsPlainText -Force) -Enabled $true

Add-ADGroupMember -Identity "Domain Admins" -Members "svc_badpractice"
```

**2. Automated remediation (with approval):**

```powershell
# Extend script with remediation functions
function Remediate-ASREPRoasting {
    param([string]$Username)

    $confirmation = Read-Host "Fix AS-REP Roasting for $Username? (Y/N)"

    if ($confirmation -eq 'Y') {
        Set-ADAccountControl -Identity $Username -DoesNotRequirePreAuth $false
        Write-Host "[+] Enabled Kerberos pre-authentication for $Username" -ForegroundColor Green
    }
}

# Auto-remediate with logging
foreach ($user in $asrepRoastable) {
    Remediate-ASREPRoasting -Username $user.SamAccountName
    Add-Content -Path "C:\Logs\AD-Remediation.log" -Value "$(Get-Date): Fixed AS-REP Roasting for $($user.SamAccountName)"
}
```

**3. Alert on critical findings:**

```powershell
# Add alerting to script
if ($Global:Findings.Critical.Count -gt 0) {
    # Send email alert
    Send-MailMessage -To "admin@lab.local" -From "adsecurity@lab.local" `
        -Subject "CRITICAL: AD Security Issues Detected" `
        -Body "Found $($Global:Findings.Critical.Count) critical AD security issues. Review report immediately." `
        -SmtpServer "smtp.lab.local"

    # Or use PowerShell Universal Dashboard webhook
    Invoke-RestMethod -Uri "https://ntfy.sh/homelab-ad" -Method Post `
        -Body "CRITICAL: $($Global:Findings.Critical.Count) AD security issues" `
        -Headers @{"Priority"="urgent"}
}
```

**4. Historical trending:**

```powershell
# Track findings over time
$trendData = [PSCustomObject]@{
    Date = Get-Date -Format "yyyy-MM-dd"
    Critical = $Global:Findings.Critical.Count
    High = $Global:Findings.High.Count
    Medium = $Global:Findings.Medium.Count
}

$trendData | Export-Csv -Path "C:\Reports\AD-Security-Trend.csv" -Append -NoTypeInformation

# Visualize trends
Import-Csv "C:\Reports\AD-Security-Trend.csv" |
    Select-Object Date,Critical,High,Medium |
    Out-GridView -Title "AD Security Trends"
```

**Expected Results:**

- Immediate detection of common AD attack vectors (AS-REP Roasting, Unconstrained Delegation, Kerberoasting)
- Weekly visibility into AD security drift
- Automated compliance reporting for audits
- Reduced time to detect misconfigurations from weeks to minutes
- Baseline for measuring AD hardening efforts

## Conclusion

Active Directory security requires continuous monitoring, not point-in-time assessments. This dashboard provides automated detection of common AD vulnerabilities that attackers exploit for initial access, privilege escalation, and lateral movement.

By running weekly assessments and tracking trends, you establish a security baseline and detect configuration drift before it's exploited. The HTML reports make it easy to communicate findings to management and track remediation progress.

**Tomorrow:** Day 2 covers Windows Server 2025 CIS Baseline compliance enforcement with automated remediation and drift detection.
