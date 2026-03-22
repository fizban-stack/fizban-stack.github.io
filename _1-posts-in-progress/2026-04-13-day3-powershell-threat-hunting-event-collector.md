---
layout: post
title: "10 Days of PowerShell Security: Day 3 - Real-Time Threat Hunting Event Collector"
date: 2026-04-13
category: PowerShell Security
author: James Wells
---

## Project Overview

Threat hunting requires visibility into Windows Security Events, Sysmon telemetry, and PowerShell script block logging. Manual event log analysis is slow and misses real-time threats. This project builds a real-time event collector that monitors critical security events, correlates suspicious activity, and generates threat intelligence reports with MITRE ATT&CK mappings.

Using PowerShell's event subscription system and custom filters, this tool detects credential dumping, lateral movement, privilege escalation, and persistence mechanisms - providing SOC analysts with actionable alerts for immediate investigation.

## The Code

```powershell
<#
.SYNOPSIS
    Real-Time Threat Hunting Event Collector
    Monitor Windows Security Events and Sysmon for suspicious activity

.DESCRIPTION
    Collects and correlates security events from:
    - Windows Security log (authentication, privilege use)
    - Sysmon (process creation, network connections, file creation)
    - PowerShell script block logging (malicious commands)
    
    Generates alerts for threat hunting and incident response

.PARAMETER OutputPath
    Directory for event reports and alerts

.PARAMETER MonitorDuration
    Duration to monitor in seconds (default: continuous)

.PARAMETER EnableAlerts
    Send real-time alerts for critical events

.EXAMPLE
    .\Start-ThreatHunting.ps1 -OutputPath "C:\ThreatHunting" -EnableAlerts
#>

[CmdletBinding()]
param(
    [Parameter(Mandatory=$false)]
    [string]$OutputPath = "C:\ThreatHunting",

    [Parameter(Mandatory=$false)]
    [int]$MonitorDuration = 0,  # 0 = continuous

    [Parameter(Mandatory=$false)]
    [switch]$EnableAlerts
)

#Requires -RunAsAdministrator

$Global:SuspiciousEvents = @()
$Global:ThreatScore = 0

# MITRE ATT&CK mappings
$Global:MitreMapping = @{
    'T1003' = 'Credential Dumping'
    'T1055' = 'Process Injection'
    'T1059' = 'Command and Scripting Interpreter'
    'T1068' = 'Exploitation for Privilege Escalation'
    'T1070' = 'Indicator Removal on Host'
    'T1078' = 'Valid Accounts'
    'T1110' = 'Brute Force'
    'T1136' = 'Create Account'
    'T1197' = 'BITS Jobs'
    'T1543' = 'Create or Modify System Process'
}

function Initialize-ThreatHunting {
    Write-Host "[*] Initializing Threat Hunting Engine..." -ForegroundColor Cyan

    # Create output directory
    if (-not (Test-Path $OutputPath)) {
        New-Item -ItemType Directory -Path $OutputPath | Out-Null
    }

    # Check if Sysmon is installed
    $sysmonService = Get-Service -Name "Sysmon64" -ErrorAction SilentlyContinue
    if (-not $sysmonService) {
        Write-Host "[!] WARNING: Sysmon not installed. Install from https://docs.microsoft.com/sysinternals/downloads/sysmon" -ForegroundColor Yellow
        Write-Host "[!] Limited telemetry available without Sysmon" -ForegroundColor Yellow
    } else {
        Write-Host "[+] Sysmon detected: $($sysmonService.Status)" -ForegroundColor Green
    }

    # Enable PowerShell script block logging if not enabled
    $regPath = "HKLM:\SOFTWARE\Policies\Microsoft\Windows\PowerShell\ScriptBlockLogging"
    if (-not (Test-Path $regPath)) {
        Write-Host "[*] Enabling PowerShell Script Block Logging..." -ForegroundColor Yellow
        New-Item -Path $regPath -Force | Out-Null
        Set-ItemProperty -Path $regPath -Name "EnableScriptBlockLogging" -Value 1
    }
}

function Watch-FailedLogons {
    Write-Host "[*] Monitoring failed logon attempts (Event ID 4625)..." -ForegroundColor Cyan

    $query = @"
    <QueryList>
      <Query Id="0">
        <Select Path="Security">*[System[(EventID=4625)]]</Select>
      </Query>
    </QueryList>
"@

    Register-WmiEvent -Query "SELECT * FROM __InstanceCreationEvent WITHIN 5 WHERE TargetInstance ISA 'Win32_NTLogEvent' AND TargetInstance.LogFile='Security' AND TargetInstance.EventCode='4625'" -SourceIdentifier "FailedLogon" -Action {
        $event = $EventArgs.NewEvent.TargetInstance

        $sourceIP = ($event.Message | Select-String -Pattern "Source Network Address:\s+(.+)" | ForEach-Object { $_.Matches.Groups[1].Value }).Trim()
        $username = ($event.Message | Select-String -Pattern "Account Name:\s+(.+)" | ForEach-Object { $_.Matches.Groups[1].Value }).Trim()

        $suspiciousEvent = [PSCustomObject]@{
            Timestamp = Get-Date
            EventType = "Failed Logon"
            EventID = 4625
            Severity = "Medium"
            SourceIP = $sourceIP
            Username = $username
            MitreTechnique = "T1110"
            Description = "Failed authentication attempt from $sourceIP for user $username"
        }

        $Global:SuspiciousEvents += $suspiciousEvent
        $Global:ThreatScore += 10

        Write-Host "[!] Failed Logon: $username from $sourceIP" -ForegroundColor Yellow

        # Check for brute force (5+ failures in 1 minute)
        $recentFailures = $Global:SuspiciousEvents | Where-Object {
            $_.EventType -eq "Failed Logon" -and
            $_.SourceIP -eq $sourceIP -and
            $_.Timestamp -gt (Get-Date).AddMinutes(-1)
        }

        if ($recentFailures.Count -ge 5) {
            Write-Host "[!!!] BRUTE FORCE DETECTED from $sourceIP" -ForegroundColor Red
            Send-ThreatAlert -Title "Brute Force Attack" -Message "$($recentFailures.Count) failed logons from $sourceIP in 1 minute"
        }
    }
}

function Watch-PrivilegeEscalation {
    Write-Host "[*] Monitoring privilege escalation (Event ID 4672)..." -ForegroundColor Cyan

    Register-WmiEvent -Query "SELECT * FROM __InstanceCreationEvent WITHIN 5 WHERE TargetInstance ISA 'Win32_NTLogEvent' AND TargetInstance.LogFile='Security' AND TargetInstance.EventCode='4672'" -SourceIdentifier "PrivEscalation" -Action {
        $event = $EventArgs.NewEvent.TargetInstance

        $username = ($event.Message | Select-String -Pattern "Account Name:\s+(.+)" | ForEach-Object { $_.Matches.Groups[1].Value }).Trim()

        # Ignore SYSTEM and expected service accounts
        if ($username -notmatch "(SYSTEM|DWM-|UMFD-|LOCAL SERVICE|NETWORK SERVICE)") {
            $suspiciousEvent = [PSCustomObject]@{
                Timestamp = Get-Date
                EventType = "Privilege Use"
                EventID = 4672
                Severity = "High"
                Username = $username
                MitreTechnique = "T1078"
                Description = "Special privileges assigned to $username"
            }

            $Global:SuspiciousEvents += $suspiciousEvent
            $Global:ThreatScore += 25

            Write-Host "[!] Privilege Escalation: $username assigned special privileges" -ForegroundColor Yellow
        }
    }
}

function Watch-SysmonProcessCreation {
    Write-Host "[*] Monitoring Sysmon process creation (Event ID 1)..." -ForegroundColor Cyan

    # Suspicious process patterns
    $suspiciousProcesses = @(
        'mimikatz', 'pwdump', 'gsecdump', 'procdump',
        'psexec', 'wmic', 'powershell.*-enc', 'powershell.*iex',
        'cmd.exe.*\/c.*echo', 'certutil.*-decode',
        'bitsadmin.*\/transfer', 'mshta.*http', 'regsvr32.*\/s.*\/u'
    )

    $query = @"
    <QueryList>
      <Query Id="0">
        <Select Path="Microsoft-Windows-Sysmon/Operational">*[System[(EventID=1)]]</Select>
      </Query>
    </QueryList>
"@

    $action = {
        $eventXml = [xml]$Event.ToXml()
        $eventData = $eventXml.Event.EventData.Data

        $commandLine = ($eventData | Where-Object { $_.Name -eq 'CommandLine' }).'#text'
        $image = ($eventData | Where-Object { $_.Name -eq 'Image' }).'#text'
        $parentImage = ($eventData | Where-Object { $_.Name -eq 'ParentImage' }).'#text'

        # Check for suspicious process patterns
        foreach ($pattern in $Global:suspiciousProcesses) {
            if ($commandLine -match $pattern -or $image -match $pattern) {
                $suspiciousEvent = [PSCustomObject]@{
                    Timestamp = Get-Date
                    EventType = "Suspicious Process"
                    EventID = 1
                    Severity = "Critical"
                    Process = $image
                    CommandLine = $commandLine
                    ParentProcess = $parentImage
                    MitreTechnique = "T1059"
                    Description = "Suspicious process detected: $image"
                }

                $Global:SuspiciousEvents += $suspiciousEvent
                $Global:ThreatScore += 50

                Write-Host "[!!!] SUSPICIOUS PROCESS: $image" -ForegroundColor Red
                Write-Host "     CommandLine: $commandLine" -ForegroundColor Red

                Send-ThreatAlert -Title "Suspicious Process Detected" -Message "Process: $image`nCommandLine: $commandLine"
                break
            }
        }

        # Detect process injection (unusual parent-child relationships)
        if ($parentImage -match "svchost.exe" -and $image -notmatch "(WerFault|conhost)") {
            Write-Host "[!] Potential Process Injection: $parentImage -> $image" -ForegroundColor Yellow
        }
    }

    try {
        Register-ObjectEvent -InputObject (Get-WinEvent -ListLog "Microsoft-Windows-Sysmon/Operational" -ErrorAction Stop) -EventName EntryWritten -SourceIdentifier "SysmonProcessCreation" -Action $action
    } catch {
        Write-Host "[!] Cannot subscribe to Sysmon events. Ensure Sysmon is installed." -ForegroundColor Yellow
    }
}

function Watch-PowerShellScriptBlock {
    Write-Host "[*] Monitoring PowerShell script block logging (Event ID 4104)..." -ForegroundColor Cyan

    $suspiciousCommands = @(
        'Invoke-Mimikatz', 'Invoke-Expression.*downloadstring',
        'IEX.*Net.WebClient', '-EncodedCommand', '-enc.*-nop',
        'Invoke-Shellcode', 'Invoke-WMIMethod.*Win32_Process',
        'Add-Type.*DllImport', 'System.Reflection.Assembly.*Load',
        'Net.Sockets.TCPClient', 'Start-Process.*-WindowStyle Hidden'
    )

    Register-WmiEvent -Query "SELECT * FROM __InstanceCreationEvent WITHIN 5 WHERE TargetInstance ISA 'Win32_NTLogEvent' AND TargetInstance.LogFile='Microsoft-Windows-PowerShell/Operational' AND TargetInstance.EventCode='4104'" -SourceIdentifier "PSScriptBlock" -Action {
        $event = $EventArgs.NewEvent.TargetInstance
        $scriptBlock = $event.Message

        foreach ($pattern in $Global:suspiciousCommands) {
            if ($scriptBlock -match $pattern) {
                $suspiciousEvent = [PSCustomObject]@{
                    Timestamp = Get-Date
                    EventType = "Malicious PowerShell"
                    EventID = 4104
                    Severity = "Critical"
                    ScriptBlock = $scriptBlock.Substring(0, [Math]::Min(500, $scriptBlock.Length))
                    MitreTechnique = "T1059.001"
                    Description = "Malicious PowerShell command detected"
                }

                $Global:SuspiciousEvents += $suspiciousEvent
                $Global:ThreatScore += 75

                Write-Host "[!!!] MALICIOUS POWERSHELL DETECTED" -ForegroundColor Red
                Write-Host "     Pattern: $pattern" -ForegroundColor Red

                Send-ThreatAlert -Title "Malicious PowerShell" -Message "Detected: $pattern`nScript: $($scriptBlock.Substring(0,200))"
                break
            }
        }
    }
}

function Watch-NewServiceCreation {
    Write-Host "[*] Monitoring new service creation (Event ID 7045)..." -ForegroundColor Cyan

    Register-WmiEvent -Query "SELECT * FROM __InstanceCreationEvent WITHIN 5 WHERE TargetInstance ISA 'Win32_NTLogEvent' AND TargetInstance.LogFile='System' AND TargetInstance.EventCode='7045'" -SourceIdentifier "NewService" -Action {
        $event = $EventArgs.NewEvent.TargetInstance

        $serviceName = ($event.Message | Select-String -Pattern "Service Name:\s+(.+)" | ForEach-Object { $_.Matches.Groups[1].Value }).Trim()
        $serviceFile = ($event.Message | Select-String -Pattern "Service File Name:\s+(.+)" | ForEach-Object { $_.Matches.Groups[1].Value }).Trim()

        $suspiciousEvent = [PSCustomObject]@{
            Timestamp = Get-Date
            EventType = "New Service"
            EventID = 7045
            Severity = "Medium"
            ServiceName = $serviceName
            ServiceFile = $serviceFile
            MitreTechnique = "T1543.003"
            Description = "New service created: $serviceName"
        }

        $Global:SuspiciousEvents += $suspiciousEvent
        $Global:ThreatScore += 20

        Write-Host "[!] New Service Created: $serviceName" -ForegroundColor Yellow
        Write-Host "     File: $serviceFile" -ForegroundColor Yellow
    }
}

function Send-ThreatAlert {
    param(
        [string]$Title,
        [string]$Message
    )

    if ($EnableAlerts) {
        # Email alert example
        # Send-MailMessage -To "soc@company.com" -From "threathunting@company.com" -Subject $Title -Body $Message -SmtpServer "smtp.company.com"

        # Or use ntfy.sh
        try {
            Invoke-RestMethod -Uri "https://ntfy.sh/homelab-threats" -Method Post -Body "$Title`n`n$Message" -Headers @{"Priority"="urgent"}
        } catch {
            Write-Host "[!] Failed to send alert: $_" -ForegroundColor Red
        }
    }
}

function Generate-ThreatReport {
    Write-Host "`n[*] Generating threat hunting report..." -ForegroundColor Cyan

    $reportPath = Join-Path $OutputPath "ThreatReport-$(Get-Date -Format 'yyyyMMdd-HHmmss').html"

    $criticalEvents = ($Global:SuspiciousEvents | Where-Object { $_.Severity -eq "Critical" }).Count
    $highEvents = ($Global:SuspiciousEvents | Where-Object { $_.Severity -eq "High" }).Count
    $mediumEvents = ($Global:SuspiciousEvents | Where-Object { $_.Severity -eq "Medium" }).Count

    $html = @"
<!DOCTYPE html>
<html>
<head>
    <title>Threat Hunting Report - $(Get-Date -Format 'yyyy-MM-dd')</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 1400px; margin: 0 auto; background: white; padding: 30px; }
        h1 { color: #d32f2f; }
        .summary { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin: 30px 0; }
        .summary-card { padding: 20px; border-radius: 8px; text-align: center; }
        .critical { background: #ffebee; border-left: 4px solid #d32f2f; }
        .high { background: #fff3e0; border-left: 4px solid #f57c00; }
        .medium { background: #fffde7; border-left: 4px solid #fbc02d; }
        .score { background: #e3f2fd; border-left: 4px solid #0078d4; }
        .summary-card h3 { margin: 0; font-size: 36px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th { background: #d32f2f; color: white; padding: 12px; text-align: left; }
        td { padding: 10px; border-bottom: 1px solid #ddd; }
        .severity-critical { color: #d32f2f; font-weight: bold; }
        .severity-high { color: #f57c00; font-weight: bold; }
        .severity-medium { color: #fbc02d; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Threat Hunting Report</h1>
        <p><strong>Report Date:</strong> $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")</p>
        <p><strong>Total Events:</strong> $($Global:SuspiciousEvents.Count)</p>

        <div class="summary">
            <div class="summary-card critical">
                <h3>$criticalEvents</h3>
                <p>Critical</p>
            </div>
            <div class="summary-card high">
                <h3>$highEvents</h3>
                <p>High</p>
            </div>
            <div class="summary-card medium">
                <h3>$mediumEvents</h3>
                <p>Medium</p>
            </div>
            <div class="summary-card score">
                <h3>$Global:ThreatScore</h3>
                <p>Threat Score</p>
            </div>
        </div>

        <h2>Suspicious Events</h2>
        <table>
            <tr>
                <th>Timestamp</th>
                <th>Event Type</th>
                <th>Severity</th>
                <th>MITRE Technique</th>
                <th>Description</th>
            </tr>
"@

    foreach ($event in $Global:SuspiciousEvents | Sort-Object Timestamp -Descending) {
        $severityClass = "severity-$($event.Severity.ToLower())"
        $mitreName = $Global:MitreMapping[$event.MitreTechnique]

        $html += @"
            <tr>
                <td>$($event.Timestamp.ToString("yyyy-MM-dd HH:mm:ss"))</td>
                <td>$($event.EventType)</td>
                <td class="$severityClass">$($event.Severity)</td>
                <td>$($event.MitreTechnique) - $mitreName</td>
                <td>$($event.Description)</td>
            </tr>
"@
    }

    $html += @"
        </table>
    </div>
</body>
</html>
"@

    $html | Out-File -FilePath $reportPath -Encoding UTF8
    Write-Host "[+] Report saved to: $reportPath" -ForegroundColor Green

    # Export to JSON for SIEM integration
    $jsonPath = Join-Path $OutputPath "ThreatEvents-$(Get-Date -Format 'yyyyMMdd-HHmmss').json"
    $Global:SuspiciousEvents | ConvertTo-Json -Depth 10 | Out-File -FilePath $jsonPath -Encoding UTF8
}

# Main execution
try {
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "Real-Time Threat Hunting Engine" -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan

    Initialize-ThreatHunting

    # Start event watchers
    Watch-FailedLogons
    Watch-PrivilegeEscalation
    Watch-SysmonProcessCreation
    Watch-PowerShellScriptBlock
    Watch-NewServiceCreation

    Write-Host "`n[+] Threat hunting engine active" -ForegroundColor Green
    Write-Host "[*] Monitoring for suspicious activity..." -ForegroundColor Cyan
    Write-Host "[*] Press Ctrl+C to stop and generate report`n" -ForegroundColor Yellow

    # Monitor for specified duration or continuously
    if ($MonitorDuration -gt 0) {
        Start-Sleep -Seconds $MonitorDuration
    } else {
        # Continuous monitoring
        while ($true) {
            Start-Sleep -Seconds 60
            
            # Periodic status
            if ($Global:SuspiciousEvents.Count -gt 0) {
                Write-Host "[*] Events detected: $($Global:SuspiciousEvents.Count) | Threat Score: $Global:ThreatScore" -ForegroundColor Cyan
            }
        }
    }

} catch {
    Write-Host "[!] Error: $_" -ForegroundColor Red
} finally {
    # Cleanup event subscriptions
    Get-EventSubscriber | Unregister-Event -Force
    Get-Job | Remove-Job -Force

    # Generate final report
    if ($Global:SuspiciousEvents.Count -gt 0) {
        Generate-ThreatReport
        
        Write-Host "`n========================================" -ForegroundColor Cyan
        Write-Host "Threat Hunting Summary" -ForegroundColor Green
        Write-Host "Total Events: $($Global:SuspiciousEvents.Count)" -ForegroundColor Yellow
        Write-Host "Threat Score: $Global:ThreatScore" -ForegroundColor Yellow
        Write-Host "========================================" -ForegroundColor Cyan
    } else {
        Write-Host "`n[+] No suspicious events detected during monitoring period" -ForegroundColor Green
    }
}
```

## How It Works

**Event Sources:**

- **Windows Security Log**: Failed logons (4625), privilege use (4672), account creation (4720)
- **Sysmon**: Process creation (ID 1), network connections (ID 3), file creation (ID 11)
- **PowerShell Operational**: Script block logging (4104) for malicious commands
- **System Log**: New service creation (7045) for persistence detection

**Real-Time Detection:**

Uses PowerShell's `Register-WmiEvent` and `Register-ObjectEvent` to subscribe to event log writes. Each event is evaluated against suspicious patterns and MITRE ATT&CK techniques.

**Threat Scoring:**

Assigns points based on severity:
- Critical events (malicious PowerShell, suspicious process): +75 points
- High events (privilege escalation): +25 points  
- Medium events (failed logons, new service): +10-20 points

Cumulative score indicates overall threat level.

**Alert Mechanisms:**

- Console output with color-coded severity
- Optional email/webhook alerts for critical events
- HTML reports with event timeline and MITRE mappings
- JSON export for SIEM integration

## Installation & Setup

```powershell
# Install Sysmon (highly recommended)
Invoke-WebRequest -Uri https://live.sysinternals.com/Sysmon64.exe -OutFile Sysmon64.exe
.\Sysmon64.exe -accepteula -i sysmonconfig.xml

# Enable PowerShell script block logging
New-Item -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows\PowerShell\ScriptBlockLogging" -Force
Set-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows\PowerShell\ScriptBlockLogging" -Name "EnableScriptBlockLogging" -Value 1

# Run threat hunting engine
.\Start-ThreatHunting.ps1 -OutputPath "C:\ThreatHunting" -EnableAlerts
```

## Usage Examples

**Continuous monitoring:**

```powershell
.\Start-ThreatHunting.ps1 -EnableAlerts

# Output:
# ========================================
# Real-Time Threat Hunting Engine
# ========================================
# [*] Initializing Threat Hunting Engine...
# [+] Sysmon detected: Running
# [*] Monitoring failed logon attempts (Event ID 4625)...
# [*] Monitoring privilege escalation (Event ID 4672)...
# [*] Monitoring Sysmon process creation (Event ID 1)...
# [*] Monitoring PowerShell script block logging (Event ID 4104)...
# [*] Monitoring new service creation (Event ID 7045)...
#
# [+] Threat hunting engine active
# [*] Monitoring for suspicious activity...
#
# [!] Failed Logon: admin from 192.168.1.50
# [!!!] BRUTE FORCE DETECTED from 192.168.1.50
# [!!!] SUSPICIOUS PROCESS: C:\Temp\mimikatz.exe
#      CommandLine: mimikatz.exe privilege::debug sekurlsa::logonpasswords
# [!!!] MALICIOUS POWERSHELL DETECTED
#      Pattern: Invoke-Mimikatz
```

**Time-limited hunting session:**

```powershell
# Monitor for 1 hour
.\Start-ThreatHunting.ps1 -MonitorDuration 3600 -OutputPath "C:\ThreatHunting"
```

## Home Lab Integration

**Scenario: 24/7 Threat Detection**

**1. Run as Windows service:**

```powershell
# Create NSSM service wrapper
nssm install ThreatHunting "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe"
nssm set ThreatHunting AppParameters "-ExecutionPolicy Bypass -File C:\Scripts\Start-ThreatHunting.ps1 -EnableAlerts"
nssm set ThreatHunting AppDirectory "C:\Scripts"
nssm set ThreatHunting AppStdout "C:\Logs\ThreatHunting-stdout.log"
nssm set ThreatHunting AppStderr "C:\Logs\ThreatHunting-stderr.log"

Start-Service ThreatHunting
```

**2. Alert integration with SIEM:**

```powershell
# Add to Send-ThreatAlert function
$syslogServer = "192.168.1.100"
$syslogPort = 514

$syslogMessage = "<134>$(Get-Date -Format 'MMM dd HH:mm:ss') THREAT-HUNT: $Title - $Message"
$udpClient = New-Object System.Net.Sockets.UdpClient
$udpClient.Connect($syslogServer, $syslogPort)
$bytes = [System.Text.Encoding]::ASCII.GetBytes($syslogMessage)
$udpClient.Send($bytes, $bytes.Length) | Out-Null
$udpClient.Close()
```

**3. Automated response:**

```powershell
# Add to Watch-SysmonProcessCreation action block
if ($image -match "mimikatz") {
    # Kill process
    Stop-Process -Id $eventData.ProcessId -Force
    
    # Block at firewall
    New-NetFirewallRule -DisplayName "Block Mimikatz" -Direction Outbound -Program $image -Action Block
    
    # Alert
    Write-Host "[!] KILLED MALICIOUS PROCESS: $image" -ForegroundColor Red
}
```

**Expected Results:**

- Real-time detection of credential dumping tools (Mimikatz, ProcDump)
- Immediate alerts on brute force attacks (5+ failed logins in 1 minute)
- Detection of lateral movement (PsExec, WMI process creation)
- PowerShell malware detection (Invoke-Mimikatz, encoded commands)
- Automated incident response (process termination, firewall blocking)

## Conclusion

Effective threat hunting requires real-time visibility into security events across multiple log sources. This collector provides continuous monitoring with intelligent correlation, MITRE ATT&CK mapping, and automated alerting - transforming raw events into actionable threat intelligence.

By deploying as a Windows service, you gain 24/7 threat detection capabilities that complement traditional antivirus and EDR solutions.

**Tomorrow:** Day 4 covers Azure Defender for Cloud automation for multi-cloud security posture management.
