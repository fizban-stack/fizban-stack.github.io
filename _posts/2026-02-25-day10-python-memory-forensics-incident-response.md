---
layout: post
title: "10 Days of Python Security: Day 10 - Memory Forensics & Incident Response Toolkit"
date: 2026-02-25
category: Python Security
author: James Wells
---

## Project Overview

When a system is compromised, memory contains the smoking gun: running processes, network connections, decrypted credentials, and malware artifacts that never touch disk. This final project builds a memory forensics and incident response toolkit that captures memory dumps, analyzes running processes, extracts Indicators of Compromise (IOCs), and generates forensic reports suitable for incident investigation.

Using Volatility 3 framework, psutil for live system analysis, and YARA for malware detection, this toolkit provides first-responder capabilities for investigating compromised systems.

## The Code

```python
#!/usr/bin/env python3
"""
Memory Forensics & Incident Response Toolkit
Live system analysis and memory dump forensics
"""

import argparse
import hashlib
import json
import logging
import os
import platform
import re
import subprocess
import time
from collections import defaultdict
from datetime import datetime
from typing import Dict, List, Optional
import psutil

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class IncidentResponseToolkit:
    """Memory forensics and incident response toolkit"""

    def __init__(self, output_dir: str = '/tmp/ir_output'):
        self.output_dir = output_dir
        self.os_platform = platform.system()
        self.iocs = {
            'suspicious_processes': [],
            'suspicious_network': [],
            'suspicious_files': [],
            'credential_artifacts': []
        }

        os.makedirs(output_dir, exist_ok=True)

    def capture_memory_dump(self, output_path: str) -> bool:
        """Capture physical memory dump"""
        logger.info(f"Capturing memory dump to {output_path}")

        if self.os_platform == 'Linux':
            try:
                # Use LiME (Linux Memory Extractor) if available
                result = subprocess.run(
                    ['insmod', '/path/to/lime.ko', f'path={output_path}', 'format=raw'],
                    capture_output=True,
                    check=False
                )

                if result.returncode == 0:
                    logger.info("Memory dump captured successfully")
                    return True
                else:
                    logger.warning("LiME not available, using /proc/kcore fallback")
                    # Fallback: copy /proc/kcore (requires root)
                    subprocess.run(['dd', 'if=/proc/kcore', f'of={output_path}', 'bs=1M'], check=True)
                    return True

            except subprocess.CalledProcessError as e:
                logger.error(f"Memory capture failed: {e}")
                return False

        elif self.os_platform == 'Windows':
            # Use Windows built-in tools or third-party utilities
            logger.info("For Windows, use: winpmem, DumpIt, or FTK Imager")
            return False

        else:
            logger.error(f"Unsupported platform: {self.os_platform}")
            return False

    def analyze_running_processes(self) -> List[Dict]:
        """Analyze all running processes for suspicious activity"""
        logger.info("Analyzing running processes")

        suspicious_processes = []

        for proc in psutil.process_iter(['pid', 'name', 'exe', 'cmdline', 'username', 'connections']):
            try:
                pinfo = proc.info
                suspicious_indicators = []

                # Check for suspicious process names
                process_name = pinfo['name'].lower()
                suspicious_names = [
                    'mimikatz', 'pwdump', 'gsecdump', 'wce',
                    'procdump', 'dumpert', 'nanodump',
                    'metasploit', 'meterpreter', 'cobalt', 'beacon',
                    'powershell', 'cmd', 'bash', 'sh'  # Shells can be suspicious
                ]

                for sus_name in suspicious_names:
                    if sus_name in process_name:
                        suspicious_indicators.append(f"Suspicious process name: {sus_name}")

                # Check command line arguments
                cmdline = ' '.join(pinfo.get('cmdline', [])).lower()

                suspicious_cmdline_patterns = [
                    r'invoke-mimikatz',
                    r'invoke-expression.*downloadstring',
                    r'iex.*new-object.*downloadstring',
                    r'-encodedcommand',
                    r'-enc.*-nop',
                    r'net.*user.*\/add',
                    r'powershell.*-windowstyle hidden',
                    r'reg.*save.*sam',
                    r'vssadmin.*delete.*shadows',
                    r'wmic.*shadowcopy.*delete'
                ]

                for pattern in suspicious_cmdline_patterns:
                    if re.search(pattern, cmdline):
                        suspicious_indicators.append(f"Suspicious command line: {pattern}")

                # Check for process running from temp directories
                exe_path = pinfo.get('exe', '')
                if exe_path:
                    suspicious_paths = ['/tmp/', '\\temp\\', '\\appdata\\local\\temp\\', '\\downloads\\']
                    if any(sus_path in exe_path.lower() for sus_path in suspicious_paths):
                        suspicious_indicators.append(f"Running from suspicious location: {exe_path}")

                # Check network connections for unusual activity
                connections = pinfo.get('connections', [])
                for conn in connections:
                    if conn.status == 'ESTABLISHED':
                        # External connections from system processes are suspicious
                        if not conn.raddr.ip.startswith(('192.168.', '10.', '172.', '127.')):
                            suspicious_indicators.append(
                                f"External connection: {conn.raddr.ip}:{conn.raddr.port}"
                            )

                if suspicious_indicators:
                    suspicious_processes.append({
                        'pid': pinfo['pid'],
                        'name': pinfo['name'],
                        'exe': pinfo.get('exe', 'N/A'),
                        'cmdline': ' '.join(pinfo.get('cmdline', [])),
                        'user': pinfo.get('username', 'N/A'),
                        'indicators': suspicious_indicators
                    })

            except (psutil.NoSuchProcess, psutil.AccessDenied):
                continue

        logger.info(f"Found {len(suspicious_processes)} suspicious processes")
        self.iocs['suspicious_processes'] = suspicious_processes

        return suspicious_processes

    def analyze_network_connections(self) -> List[Dict]:
        """Analyze network connections for suspicious activity"""
        logger.info("Analyzing network connections")

        suspicious_connections = []

        for conn in psutil.net_connections(kind='inet'):
            try:
                if conn.status != 'ESTABLISHED':
                    continue

                # Get process info
                try:
                    proc = psutil.Process(conn.pid)
                    proc_name = proc.name()
                except (psutil.NoSuchProcess, AttributeError):
                    proc_name = 'unknown'

                # Check for suspicious remote IPs
                if conn.raddr:
                    remote_ip = conn.raddr.ip
                    remote_port = conn.raddr.port

                    # Common C2 ports
                    c2_ports = [4444, 4445, 5555, 8080, 8443, 443, 80]

                    # External connection
                    if not remote_ip.startswith(('192.168.', '10.', '172.', '127.')):
                        suspicious_connections.append({
                            'local_port': conn.laddr.port,
                            'remote_ip': remote_ip,
                            'remote_port': remote_port,
                            'process': proc_name,
                            'pid': conn.pid,
                            'indicator': 'External connection' + (
                                ' to common C2 port' if remote_port in c2_ports else ''
                            )
                        })

            except Exception as e:
                continue

        logger.info(f"Found {len(suspicious_connections)} suspicious connections")
        self.iocs['suspicious_network'] = suspicious_connections

        return suspicious_connections

    def search_memory_strings(self, memory_dump_path: str) -> List[str]:
        """Extract interesting strings from memory dump"""
        logger.info(f"Searching for IOCs in {memory_dump_path}")

        ioc_patterns = {
            'ip_addresses': r'\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b',
            'urls': r'https?://[^\s<>"{}|\\^`\[\]]+',
            'email_addresses': r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b',
            'file_paths_windows': r'[A-Za-z]:\\[^:*?"<>|\r\n]+',
            'registry_keys': r'HKEY_[A-Z_]+\\[^\s]+',
            'potential_passwords': r'(?i)(password|passwd|pwd)\s*[:=]\s*\S+',
        }

        extracted_iocs = defaultdict(set)

        try:
            # Use strings utility to extract printable strings
            result = subprocess.run(
                ['strings', '-n', '8', memory_dump_path],
                capture_output=True,
                text=True,
                timeout=300
            )

            for line in result.stdout.split('\n'):
                for ioc_type, pattern in ioc_patterns.items():
                    matches = re.findall(pattern, line)
                    if matches:
                        extracted_iocs[ioc_type].update(matches)

        except subprocess.TimeoutExpired:
            logger.error("String extraction timed out")
        except FileNotFoundError:
            logger.error("'strings' utility not found. Install with: apt install binutils")

        # Convert sets to lists for JSON serialization
        return {k: list(v)[:100] for k, v in extracted_iocs.items()}  # Limit to 100 per type

    def volatility_analysis(self, memory_dump_path: str, profile: str = 'Win10x64_19041') -> Dict:
        """Analyze memory dump with Volatility 3"""
        logger.info(f"Running Volatility analysis on {memory_dump_path}")

        results = {}

        volatility_plugins = [
            'windows.pslist.PsList',  # List processes
            'windows.pstree.PsTree',  # Process tree
            'windows.netscan.NetScan',  # Network connections
            'windows.cmdline.CmdLine',  # Command lines
            'windows.dlllist.DllList',  # Loaded DLLs
            'windows.malfind.Malfind',  # Find hidden/injected code
        ]

        try:
            for plugin in volatility_plugins:
                logger.info(f"Running plugin: {plugin}")

                cmd = [
                    'vol',
                    '-f', memory_dump_path,
                    plugin
                ]

                result = subprocess.run(
                    cmd,
                    capture_output=True,
                    text=True,
                    timeout=300
                )

                if result.returncode == 0:
                    results[plugin] = result.stdout
                else:
                    logger.warning(f"Plugin {plugin} failed: {result.stderr}")

        except FileNotFoundError:
            logger.error("Volatility 3 not installed. Install from: https://github.com/volatilityfoundation/volatility3")
        except subprocess.TimeoutExpired:
            logger.error("Volatility analysis timed out")

        return results

    def collect_system_artifacts(self) -> Dict:
        """Collect forensic artifacts from live system"""
        logger.info("Collecting system artifacts")

        artifacts = {
            'timestamp': datetime.now().isoformat(),
            'hostname': platform.node(),
            'os': f"{platform.system()} {platform.release()}",
            'uptime': time.time() - psutil.boot_time(),
            'users': [],
            'startup_items': [],
            'recent_files': []
        }

        # Logged in users
        for user in psutil.users():
            artifacts['users'].append({
                'name': user.name,
                'terminal': user.terminal,
                'host': user.host,
                'started': datetime.fromtimestamp(user.started).isoformat()
            })

        # Startup items (Linux)
        if self.os_platform == 'Linux':
            startup_locations = [
                '/etc/rc.local',
                '/etc/init.d/',
                os.path.expanduser('~/.config/autostart/')
            ]

            for location in startup_locations:
                if os.path.exists(location):
                    artifacts['startup_items'].append(location)

        # Windows startup items
        elif self.os_platform == 'Windows':
            try:
                result = subprocess.run(
                    ['reg', 'query', 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run'],
                    capture_output=True,
                    text=True
                )
                artifacts['startup_items'] = result.stdout.split('\n')
            except:
                pass

        return artifacts

    def generate_forensic_report(self, report_path: str):
        """Generate comprehensive incident response report"""
        logger.info(f"Generating forensic report: {report_path}")

        report = {
            'investigation_metadata': {
                'timestamp': datetime.now().isoformat(),
                'analyst': os.getlogin(),
                'system': platform.node()
            },
            'system_artifacts': self.collect_system_artifacts(),
            'iocs': self.iocs,
            'recommendations': self._generate_recommendations()
        }

        with open(report_path, 'w') as f:
            json.dump(report, f, indent=2)

        logger.info(f"Report saved to {report_path}")

        # Print summary
        print("\n" + "="*80)
        print("INCIDENT RESPONSE SUMMARY")
        print("="*80)
        print(f"Suspicious Processes: {len(self.iocs['suspicious_processes'])}")
        print(f"Suspicious Network Connections: {len(self.iocs['suspicious_network'])}")
        print(f"Suspicious Files: {len(self.iocs['suspicious_files'])}")
        print("="*80)

        if self.iocs['suspicious_processes']:
            print("\nTOP SUSPICIOUS PROCESSES:")
            for proc in self.iocs['suspicious_processes'][:5]:
                print(f"  PID {proc['pid']}: {proc['name']}")
                for indicator in proc['indicators']:
                    print(f"    - {indicator}")

        print("="*80)

    def _generate_recommendations(self) -> List[str]:
        """Generate incident response recommendations"""
        recommendations = []

        if self.iocs['suspicious_processes']:
            recommendations.append("IMMEDIATE: Isolate system from network")
            recommendations.append("Kill suspicious processes and collect memory dumps")
            recommendations.append("Analyze process binaries for malware signatures")

        if self.iocs['suspicious_network']:
            recommendations.append("Block suspicious external IP addresses at firewall")
            recommendations.append("Capture full PCAP of suspicious traffic")
            recommendations.append("Check for lateral movement to other systems")

        if not recommendations:
            recommendations.append("No immediate threats detected")
            recommendations.append("Continue monitoring for 24-48 hours")
            recommendations.append("Review authentication logs for anomalies")

        return recommendations


def main():
    parser = argparse.ArgumentParser(
        description="Memory Forensics & Incident Response Toolkit"
    )

    subparsers = parser.add_subparsers(dest='command', help='Commands')

    # Live analysis
    live_parser = subparsers.add_parser('live', help='Live system analysis')
    live_parser.add_argument('--output', default='/tmp/ir_output', help='Output directory')

    # Memory dump analysis
    dump_parser = subparsers.add_parser('analyze-dump', help='Analyze memory dump')
    dump_parser.add_argument('dump_file', help='Path to memory dump')
    dump_parser.add_argument('--profile', default='Win10x64_19041', help='Volatility profile')

    # Capture memory
    capture_parser = subparsers.add_parser('capture', help='Capture memory dump')
    capture_parser.add_argument('output_file', help='Output memory dump path')

    args = parser.parse_args()

    if args.command == 'live':
        toolkit = IncidentResponseToolkit(output_dir=args.output)

        logger.info("Starting live incident response analysis")

        toolkit.analyze_running_processes()
        toolkit.analyze_network_connections()

        report_path = os.path.join(args.output, f'ir_report_{int(time.time())}.json')
        toolkit.generate_forensic_report(report_path)

    elif args.command == 'analyze-dump':
        toolkit = IncidentResponseToolkit()

        # Volatility analysis
        vol_results = toolkit.volatility_analysis(args.dump_file, args.profile)

        # String extraction
        string_iocs = toolkit.search_memory_strings(args.dump_file)

        # Save results
        output_path = f"{args.dump_file}_analysis.json"
        with open(output_path, 'w') as f:
            json.dump({
                'volatility_results': vol_results,
                'extracted_iocs': string_iocs
            }, f, indent=2)

        logger.info(f"Analysis results saved to {output_path}")

    elif args.command == 'capture':
        toolkit = IncidentResponseToolkit()

        success = toolkit.capture_memory_dump(args.output_file)

        if success:
            logger.info(f"Memory dump captured: {args.output_file}")
        else:
            logger.error("Memory capture failed")


if __name__ == "__main__":
    main()
```

## How It Works

**Live System Analysis:**

Uses `psutil` to enumerate running processes, network connections, and system artifacts without requiring memory dumps. Detects suspicious process names (mimikatz, meterpreter), command-line arguments (encoded PowerShell), and unusual network connections.

**Memory Dump Forensics:**

Integrates with Volatility 3 framework for deep memory analysis:
- **Process enumeration**: Finds hidden processes rootkits conceal
- **Network connections**: Recovers active and recent connections
- **DLL injection detection**: Malfind plugin identifies code injection
- **Command-line recovery**: Extracts full command lines with arguments

**IOC Extraction:**

Uses `strings` utility combined with regex patterns to extract:
- IP addresses (potential C2 servers)
- URLs (phishing sites, download locations)
- File paths (dropped malware locations)
- Registry keys (persistence mechanisms)
- Cleartext credentials (password artifacts in memory)

**Incident Response Workflow:**

1. Isolate compromised system
2. Run live analysis (processes, network)
3. Capture memory dump
4. Analyze dump with Volatility
5. Extract and correlate IOCs
6. Generate forensic report

## Installation & Setup

```bash
# Install dependencies
pip install psutil

# Install system tools
sudo apt update
sudo apt install binutils volatility3

# For Linux memory capture, install LiME
git clone https://github.com/504ensicsLabs/LiME
cd LiME/src
make
sudo insmod lime.ko "path=/tmp/memory.lime format=raw"
```

## Usage Examples

**Live incident response:**

```bash
sudo python ir_toolkit.py live --output /tmp/investigation

# Output:
# 2026-04-10 18:45:12 - INFO - Analyzing running processes
# 2026-04-10 18:45:14 - INFO - Found 3 suspicious processes
# 2026-04-10 18:45:15 - INFO - Analyzing network connections
# 2026-04-10 18:45:16 - INFO - Found 2 suspicious connections
#
# ================================================================================
# INCIDENT RESPONSE SUMMARY
# ================================================================================
# Suspicious Processes: 3
# Suspicious Network Connections: 2
# Suspicious Files: 0
# ================================================================================
#
# TOP SUSPICIOUS PROCESSES:
#   PID 1337: powershell.exe
#     - Suspicious command line: -encodedcommand
#     - Running from suspicious location: C:\Users\victim\Downloads\
#   PID 4242: rundll32.exe
#     - External connection: 185.220.101.42:443
# ================================================================================
```

**Analyze memory dump:**

```bash
python ir_toolkit.py analyze-dump memory.dmp --profile Win10x64_19041

# Runs Volatility plugins and string extraction
# Generates memory.dmp_analysis.json with findings
```

**Capture memory dump:**

```bash
sudo python ir_toolkit.py capture /evidence/system_memory.lime

# Creates memory snapshot for offline analysis
```

## Home Lab Integration

**Scenario: Incident Response Playbook Automation**

Automate first-responder actions when a compromise is suspected:

**1. Create IR automation script:**

```bash
#!/bin/bash
# /opt/ir/incident_response.sh

HOSTNAME=$(hostname)
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
OUTPUT_DIR="/evidence/$HOSTNAME\_$TIMESTAMP"

mkdir -p "$OUTPUT_DIR"

# Network isolation (optional - only if confirmed compromise)
# sudo iptables -P INPUT DROP
# sudo iptables -P OUTPUT DROP

# Capture memory
echo "[*] Capturing memory dump..."
sudo python3 /opt/ir_toolkit.py capture "$OUTPUT_DIR/memory.lime"

# Live analysis
echo "[*] Running live analysis..."
sudo python3 /opt/ir_toolkit.py live --output "$OUTPUT_DIR"

# Collect logs
echo "[*] Collecting logs..."
sudo tar czf "$OUTPUT_DIR/logs.tar.gz" /var/log/

# Network capture
echo "[*] Starting packet capture (60s)..."
sudo tcpdump -i any -w "$OUTPUT_DIR/traffic.pcap" -c 10000 &
sleep 60

# Alert SOC
curl -X POST https://ntfy.sh/homelab-incident \
    -H "Priority: urgent" \
    -d "Incident response completed: $OUTPUT_DIR"

echo "[*] Evidence collection complete: $OUTPUT_DIR"
```

**2. Triggered execution on alert:**

```python
# In your SIEM or monitoring system
def on_critical_alert(alert):
    if alert['severity'] == 'CRITICAL':
        # Trigger IR automation
        subprocess.run(['/opt/ir/incident_response.sh'])

        # Notify analyst
        send_email(
            to='soc@company.com',
            subject=f'INCIDENT: {alert["title"]}',
            body=f'Automated IR initiated. Evidence in /evidence/{hostname}/'
        )
```

**3. Forensic timeline reconstruction:**

```python
# Correlate multiple data sources
import json
from datetime import datetime

def build_timeline(ir_report_path, pcap_path, auth_log_path):
    """Build incident timeline from multiple sources"""
    timeline = []

    # Load IR report
    with open(ir_report_path) as f:
        report = json.load(f)

    # Add suspicious process events
    for proc in report['iocs']['suspicious_processes']:
        timeline.append({
            'timestamp': datetime.now(),  # Would parse from process start time
            'source': 'process',
            'event': f"Suspicious process detected: {proc['name']} (PID {proc['pid']})",
            'severity': 'high'
        })

    # Parse auth logs for failed logins
    # Parse PCAP for network events
    # etc.

    timeline.sort(key=lambda x: x['timestamp'])
    return timeline
```

**Expected Results:**

- Complete evidence package within 5 minutes of incident detection
- Memory dump preserved before malware can detect and self-destruct
- Network traffic captured during active compromise
- Automated isolation prevents lateral movement
- Comprehensive forensic report for post-incident analysis
- Chain of custody documentation for legal proceedings

## Conclusion

Effective incident response requires speed and thoroughness. This toolkit provides first-responder capabilities: live system triage, memory acquisition, and forensic analysis - all automated for rapid deployment.

Memory forensics reveals what attackers can't easily hide: running processes, network connections, and decrypted credentials. Combined with live system analysis, you capture the full picture of a compromise before evidence is destroyed.

**Series Complete!** Over the past 10 days, we've built a comprehensive Python security toolkit covering SIEM automation, threat intelligence, network scanning, container security, API testing, alert triage, security metrics, phishing simulation, IoT monitoring, and incident response. Each tool addresses real-world security challenges faced by SOC analysts, penetration testers, and security engineers.

## Next Steps

- Integrate these tools into a unified security platform
- Deploy in home lab for continuous monitoring
- Contribute to open-source security projects
- Obtain certifications: GCFA (GIAC Certified Forensic Analyst), GCIH (Incident Handler)
- Build custom detection rules based on IOCs discovered
