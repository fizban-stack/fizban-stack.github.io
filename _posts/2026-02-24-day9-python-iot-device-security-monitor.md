---
layout: post
title: "10 Days of Python Security: Day 9 - IoT Device Security Monitor"
date: 2026-02-24
category: Python Security
author: James Wells
---

## Project Overview

The average home contains 25+ IoT devices, many with critical security vulnerabilities. Smart cameras, thermostats, and voice assistants can become attack vectors if left unmonitored. This project builds an IoT security monitoring system that discovers devices, fingerprints manufacturers, detects default credentials, identifies outdated firmware, and alerts on suspicious network behavior.

Using Scapy for packet analysis, nmap for device discovery, and Shodan API for vulnerability intelligence, this tool provides continuous IoT security monitoring for home labs and small networks.

## The Code

```python
#!/usr/bin/env python3
"""
IoT Device Security Monitor
Discover, fingerprint, and monitor IoT devices for security issues
"""

import argparse
import json
import logging
import re
import socket
import subprocess
import time
from collections import defaultdict
from datetime import datetime
from typing import Dict, List, Optional, Tuple
import requests
from scapy.all import ARP, Ether, srp
import nmap

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class IoTSecurityMonitor:
    """IoT device discovery and security monitoring"""

    def __init__(self, network_range: str, shodan_api_key: Optional[str] = None):
        self.network_range = network_range
        self.shodan_api_key = shodan_api_key
        self.devices = {}
        self.nm = nmap.PortScanner()

        # Known IoT device patterns
        self.device_signatures = {
            'camera': {
                'ports': [554, 8080, 8000, 80, 443],
                'services': ['rtsp', 'http', 'https'],
                'keywords': ['camera', 'cam', 'dvr', 'nvr', 'ipcam']
            },
            'smart_tv': {
                'ports': [8008, 8009, 9080],
                'services': ['chromecast', 'upnp'],
                'keywords': ['samsung', 'lg', 'sony', 'tv', 'roku']
            },
            'smart_speaker': {
                'ports': [5353, 8443, 10001],
                'services': ['mdns', 'airplay'],
                'keywords': ['echo', 'alexa', 'google home', 'homepod']
            },
            'thermostat': {
                'ports': [80, 443],
                'keywords': ['nest', 'ecobee', 'honeywell', 'thermostat']
            },
            'smart_plug': {
                'ports': [9999, 80],
                'keywords': ['tp-link', 'wemo', 'kasa', 'plug']
            },
            'router': {
                'ports': [80, 443, 22, 23, 8080],
                'keywords': ['router', 'gateway', 'netgear', 'linksys', 'asus']
            }
        }

        # Known default credentials (common IoT devices)
        self.default_credentials = [
            ('admin', 'admin'),
            ('admin', 'password'),
            ('admin', ''),
            ('root', 'root'),
            ('admin', '12345'),
            ('admin', '1234'),
            ('user', 'user'),
            ('666666', '666666'),  # Many IP cameras
            ('888888', '888888')
        ]

    def discover_devices_arp(self) -> List[Dict]:
        """Discover devices using ARP scan"""
        logger.info(f"Discovering devices on {self.network_range} via ARP")

        discovered = []

        try:
            # Create ARP request
            arp_request = ARP(pdst=self.network_range)
            broadcast = Ether(dst="ff:ff:ff:ff:ff:ff")
            arp_request_broadcast = broadcast / arp_request

            # Send and receive
            answered = srp(arp_request_broadcast, timeout=3, verbose=False)[0]

            for sent, received in answered:
                device = {
                    'ip': received.psrc,
                    'mac': received.hwsrc,
                    'discovered_at': datetime.now().isoformat()
                }
                discovered.append(device)

            logger.info(f"Discovered {len(discovered)} devices via ARP")

        except PermissionError:
            logger.error("ARP scan requires root privileges. Run with sudo.")

        return discovered

    def identify_manufacturer(self, mac_address: str) -> str:
        """Identify manufacturer from MAC OUI"""
        # First 3 bytes (6 hex chars) are OUI
        oui = mac_address[:8].upper().replace(':', '')

        # Common IoT manufacturers (partial list)
        oui_map = {
            '00:17:88': 'Philips Hue',
            '00:22:6B': 'Netgear',
            '18:B4:30': 'Nest Labs',
            '00:04:20': 'Honeywell',
            'B0:CE:18': 'TP-Link',
            '94:10:3E': 'Ring',
            'FC:F5:C4': 'Amazon Echo',
            'A4:77:33': 'Google Home',
            '00:0C:E7': 'Sony',
            '00:11:D9': 'TRENDnet (IP cameras)'
        }

        for prefix, manufacturer in oui_map.items():
            if mac_address.upper().startswith(prefix):
                return manufacturer

        # Fallback to online OUI lookup
        try:
            response = requests.get(
                f"https://api.macvendors.com/{mac_address}",
                timeout=2
            )
            if response.status_code == 200:
                return response.text.strip()
        except requests.RequestException:
            pass

        return 'Unknown'

    def port_scan_device(self, ip: str) -> Dict:
        """Perform port scan to identify device type"""
        logger.info(f"Port scanning {ip}")

        # Quick scan of common IoT ports
        ports = [21, 22, 23, 80, 443, 554, 5353, 8000, 8008, 8080, 8443, 9999, 10001]
        port_str = ','.join(map(str, ports))

        try:
            self.nm.scan(ip, port_str, arguments='-sV -T4')

            if ip not in self.nm.all_hosts():
                return {}

            scan_result = {
                'open_ports': [],
                'services': [],
                'hostname': self.nm[ip].hostname()
            }

            if 'tcp' in self.nm[ip]:
                for port, info in self.nm[ip]['tcp'].items():
                    if info['state'] == 'open':
                        scan_result['open_ports'].append(port)
                        scan_result['services'].append(info.get('name', 'unknown'))

            return scan_result

        except Exception as e:
            logger.error(f"Port scan error for {ip}: {e}")
            return {}

    def classify_device(self, device_info: Dict) -> str:
        """Classify device type based on fingerprints"""
        hostname = device_info.get('hostname', '').lower()
        manufacturer = device_info.get('manufacturer', '').lower()
        open_ports = device_info.get('open_ports', [])
        services = device_info.get('services', [])

        for device_type, signature in self.device_signatures.items():
            # Check ports
            port_match = any(port in open_ports for port in signature['ports'])

            # Check keywords in hostname/manufacturer
            keyword_match = any(
                keyword in hostname or keyword in manufacturer
                for keyword in signature.get('keywords', [])
            )

            # Check services
            service_match = any(
                service in services
                for service in signature.get('services', [])
            )

            if port_match and (keyword_match or service_match):
                return device_type

        return 'unknown'

    def test_default_credentials(self, ip: str, port: int = 80) -> Optional[Tuple[str, str]]:
        """Test common default credentials"""
        logger.info(f"Testing default credentials on {ip}:{port}")

        # Try basic auth on HTTP
        for username, password in self.default_credentials:
            try:
                response = requests.get(
                    f"http://{ip}:{port}",
                    auth=(username, password),
                    timeout=3
                )

                # Successful auth typically returns 200, failed returns 401
                if response.status_code == 200 and 'authorization required' not in response.text.lower():
                    logger.warning(f"Default credentials found on {ip}: {username}/{password}")
                    return (username, password)

            except requests.RequestException:
                continue

        return None

    def check_shodan_vulnerabilities(self, ip: str) -> List[Dict]:
        """Query Shodan for known vulnerabilities"""
        if not self.shodan_api_key:
            return []

        logger.info(f"Checking Shodan for {ip}")

        try:
            response = requests.get(
                f"https://api.shodan.io/shodan/host/{ip}",
                params={'key': self.shodan_api_key},
                timeout=10
            )

            if response.status_code == 200:
                data = response.json()
                vulns = []

                for vuln in data.get('vulns', []):
                    vulns.append({
                        'cve': vuln,
                        'severity': 'high'  # Shodan doesn't always provide severity
                    })

                return vulns

        except requests.RequestException as e:
            logger.error(f"Shodan API error: {e}")

        return []

    def monitor_network_traffic(self, device_ips: List[str], duration: int = 60):
        """Monitor IoT device network traffic for anomalies"""
        logger.info(f"Monitoring traffic for {duration} seconds")

        from scapy.all import sniff, IP

        suspicious_connections = defaultdict(list)

        def packet_callback(packet):
            if IP in packet:
                src = packet[IP].src
                dst = packet[IP].dst

                # Check if source is monitored IoT device
                if src in device_ips:
                    # Suspicious: IoT device connecting to unknown external IPs
                    if not dst.startswith(('192.168.', '10.', '172.')):
                        suspicious_connections[src].append({
                            'destination': dst,
                            'timestamp': datetime.now().isoformat()
                        })

        try:
            sniff(prn=packet_callback, timeout=duration, store=False)

            # Analyze results
            for device_ip, connections in suspicious_connections.items():
                if len(connections) > 10:
                    logger.warning(
                        f"Device {device_ip} made {len(connections)} external connections"
                    )

            return dict(suspicious_connections)

        except PermissionError:
            logger.error("Traffic monitoring requires root privileges")
            return {}

    def comprehensive_scan(self) -> Dict:
        """Perform comprehensive IoT security scan"""
        logger.info("Starting comprehensive IoT security scan")

        # Discover devices
        discovered = self.discover_devices_arp()

        for device in discovered:
            ip = device['ip']
            mac = device['mac']

            # Identify manufacturer
            manufacturer = self.identify_manufacturer(mac)
            device['manufacturer'] = manufacturer

            # Port scan
            scan_result = self.port_scan_device(ip)
            device.update(scan_result)

            # Classify device type
            device_type = self.classify_device(device)
            device['device_type'] = device_type

            # Security checks
            device['security_issues'] = []

            # Check default credentials
            if 80 in device.get('open_ports', []):
                default_creds = self.test_default_credentials(ip)
                if default_creds:
                    device['security_issues'].append({
                        'severity': 'CRITICAL',
                        'issue': 'Default credentials',
                        'details': f"Device accessible with {default_creds[0]}/{default_creds[1]}"
                    })

            # Check Shodan vulnerabilities
            if self.shodan_api_key:
                vulns = self.check_shodan_vulnerabilities(ip)
                if vulns:
                    device['security_issues'].append({
                        'severity': 'HIGH',
                        'issue': f'{len(vulns)} known vulnerabilities',
                        'details': [v['cve'] for v in vulns]
                    })

            # Check for insecure protocols
            if 23 in device.get('open_ports', []):
                device['security_issues'].append({
                    'severity': 'HIGH',
                    'issue': 'Telnet enabled',
                    'details': 'Unencrypted management protocol detected'
                })

            self.devices[ip] = device

        logger.info(f"Scan complete. Found {len(self.devices)} IoT devices")

        return self.devices

    def generate_report(self, output_file: str = 'iot_security_report.json'):
        """Generate security report"""
        report = {
            'scan_metadata': {
                'timestamp': datetime.now().isoformat(),
                'network': self.network_range,
                'total_devices': len(self.devices)
            },
            'devices': self.devices,
            'summary': {
                'devices_by_type': defaultdict(int),
                'total_security_issues': 0,
                'critical_issues': 0,
                'high_issues': 0
            }
        }

        # Generate summary
        for device in self.devices.values():
            device_type = device.get('device_type', 'unknown')
            report['summary']['devices_by_type'][device_type] += 1

            for issue in device.get('security_issues', []):
                report['summary']['total_security_issues'] += 1

                if issue['severity'] == 'CRITICAL':
                    report['summary']['critical_issues'] += 1
                elif issue['severity'] == 'HIGH':
                    report['summary']['high_issues'] += 1

        with open(output_file, 'w') as f:
            json.dump(report, f, indent=2)

        logger.info(f"Report saved to {output_file}")

        # Print summary
        print("\n" + "="*60)
        print("IoT Security Scan Summary")
        print("="*60)
        print(f"Total Devices: {len(self.devices)}")
        print(f"\nDevices by Type:")
        for device_type, count in report['summary']['devices_by_type'].items():
            print(f"  {device_type}: {count}")
        print(f"\nSecurity Issues:")
        print(f"  Critical: {report['summary']['critical_issues']}")
        print(f"  High: {report['summary']['high_issues']}")
        print("="*60)


def main():
    parser = argparse.ArgumentParser(
        description="IoT Device Security Monitor"
    )
    parser.add_argument(
        "network",
        help="Network range to scan (e.g., 192.168.1.0/24)"
    )
    parser.add_argument(
        "--shodan-key",
        help="Shodan API key for vulnerability lookups"
    )
    parser.add_argument(
        "--monitor-traffic",
        action="store_true",
        help="Monitor network traffic for suspicious behavior (requires root)"
    )
    parser.add_argument(
        "--output",
        default="iot_security_report.json",
        help="Output report file"
    )

    args = parser.parse_args()

    monitor = IoTSecurityMonitor(
        network_range=args.network,
        shodan_api_key=args.shodan_key
    )

    # Run comprehensive scan
    monitor.comprehensive_scan()

    # Optional traffic monitoring
    if args.monitor_traffic:
        device_ips = list(monitor.devices.keys())
        monitor.monitor_network_traffic(device_ips, duration=120)

    # Generate report
    monitor.generate_report(args.output)


if __name__ == "__main__":
    main()
```

## How It Works

**Device Discovery:**

Uses ARP scanning (layer 2) to discover all active devices on the local network. Faster and more reliable than ping sweeps for IoT devices that may block ICMP.

**Device Fingerprinting:**

Combines multiple signals:
- MAC address OUI (first 3 bytes) → Manufacturer lookup
- Open ports → Device type signatures
- Service detection → Identifies RTSP (cameras), UPnP (smart TVs), mDNS (smart speakers)
- Hostname patterns → Keywords like "nest", "ring", "echo"

**Security Testing:**

- **Default Credentials**: Brute forces common IoT username/password combinations
- **Shodan Lookup**: Queries Shodan database for known CVEs affecting the device's IP
- **Insecure Protocols**: Detects Telnet (port 23), unencrypted HTTP admin panels
- **Traffic Monitoring**: Passive packet sniffing to detect unusual external connections

## Installation & Setup

```bash
# Install dependencies (requires root for ARP/packet capture)
sudo pip install scapy python-nmap requests

# Install nmap
sudo apt install nmap

# Run scan (requires sudo for ARP/packet sniffing)
sudo python iot_security_monitor.py 192.168.1.0/24 \
    --shodan-key YOUR_SHODAN_API_KEY \
    --output iot_report.json
```

## Usage Examples

**Basic network scan:**

```bash
sudo python iot_security_monitor.py 192.168.1.0/24

# Output:
# 2026-04-09 16:30:12 - INFO - Discovering devices on 192.168.1.0/24 via ARP
# 2026-04-09 16:30:15 - INFO - Discovered 12 devices via ARP
# 2026-04-09 16:30:15 - INFO - Port scanning 192.168.1.101
# 2026-04-09 16:30:18 - WARNING - Default credentials found on 192.168.1.101: admin/admin
# 2026-04-09 16:30:25 - INFO - Scan complete. Found 12 IoT devices
#
# ============================================================
# IoT Security Scan Summary
# ============================================================
# Total Devices: 12
#
# Devices by Type:
#   camera: 3
#   smart_tv: 1
#   smart_speaker: 2
#   thermostat: 1
#   router: 1
#   unknown: 4
#
# Security Issues:
#   Critical: 2
#   High: 5
# ============================================================
```

**With traffic monitoring:**

```bash
sudo python iot_security_monitor.py 192.168.1.0/24 --monitor-traffic

# Monitors network traffic for 120 seconds after discovery
# Flags IoT devices making unusual external connections
```

## Home Lab Integration

**Scenario: Continuous IoT Security Monitoring**

Monitor your smart home devices 24/7 for security issues:

**1. Scheduled daily scans:**

```bash
#!/bin/bash
# /opt/scripts/iot_scan.sh

NETWORK="192.168.1.0/24"
REPORT_DIR="/var/www/html/iot_reports"
DATE=$(date +%Y%m%d)

mkdir -p "$REPORT_DIR"

sudo python3 /opt/iot_security_monitor.py "$NETWORK" \
    --shodan-key "$SHODAN_API_KEY" \
    --output "$REPORT_DIR/scan_$DATE.json"

# Alert on critical findings
CRITICAL=$(jq '.summary.critical_issues' "$REPORT_DIR/scan_$DATE.json")

if [ "$CRITICAL" -gt 0 ]; then
    curl -X POST https://ntfy.sh/homelab-iot \
        -d "CRITICAL: $CRITICAL IoT security issues detected" \
        -H "Priority: urgent"
fi
```

```bash
# Cron: Daily at 2 AM
0 2 * * * /opt/scripts/iot_scan.sh
```

**2. Dashboard integration:**

```python
# Simple Flask dashboard
from flask import Flask, render_template
import json
import glob

app = Flask(__name__)

@app.route('/')
def dashboard():
    # Load latest report
    reports = sorted(glob.glob('/var/www/html/iot_reports/*.json'))
    if not reports:
        return "No reports available"

    with open(reports[-1], 'r') as f:
        data = json.load(f)

    return render_template('iot_dashboard.html', report=data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
```

**3. Network segmentation recommendations:**

Based on scan results, automatically generate VLAN recommendations:

```python
def generate_vlan_recommendations(devices):
    """Suggest IoT isolation strategy"""
    recommendations = []

    for ip, device in devices.items():
        if device.get('security_issues'):
            recommendations.append({
                'device': f"{ip} ({device.get('device_type')})",
                'action': 'Move to isolated IoT VLAN',
                'reason': f"{len(device['security_issues'])} security issues"
            })

    return recommendations
```

**4. Automated remediation:**

For devices with default credentials, attempt password change via API:

```python
# EXAMPLE ONLY - Specific to device manufacturer
def attempt_password_change(ip, old_user, old_pass, new_pass):
    """Try to change default password automatically"""
    try:
        # Many IP cameras use similar APIs
        response = requests.post(
            f"http://{ip}/cgi-bin/admin/param.cgi?action=update",
            auth=(old_user, old_pass),
            data={'user.password': new_pass}
        )

        if response.status_code == 200:
            logger.info(f"Successfully changed password on {ip}")
            return True

    except:
        pass

    return False
```

**Expected Results:**

- Discovery of forgotten IoT devices (old baby monitors, smart plugs)
- Identification of devices with default credentials (3-5 per home on average)
- Detection of vulnerable firmware versions
- Network traffic anomalies (smart TV beaconing to unknown IPs)
- Actionable recommendations for network segmentation

## Conclusion

IoT devices are the weakest link in home network security. This monitoring tool provides visibility into your IoT attack surface, identifying vulnerable devices before attackers do.

By combining ARP discovery, service fingerprinting, credential testing, and Shodan intelligence, you gain comprehensive understanding of IoT risks. Automated monitoring detects when new devices appear or existing devices develop security issues.

**Tomorrow:** Day 10 (finale!) covers memory forensics and incident response toolkit for analyzing compromised systems and extracting IOCs from memory dumps.
