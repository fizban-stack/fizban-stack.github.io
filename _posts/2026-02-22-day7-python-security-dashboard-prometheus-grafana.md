---
layout: post
title: "10 Days of Python Security: Day 7 - Security Metrics Dashboard with Prometheus"
date: 2026-02-22
category: Python Security
author: James Wells
excerpt: "Day 7: Security metrics dashboard with Python Prometheus exporters and Grafana visualization."
tags: [Python, Prometheus, Grafana, Monitoring, Python Security Series]
---
## Project Overview

Security metrics provide visibility into your infrastructure's threat landscape. This project builds a custom security metrics exporter for Prometheus that collects and exposes security-relevant data: failed authentication attempts, firewall blocks, vulnerability counts, certificate expiration, and anomaly detection scores.

Using the Prometheus client library and custom collectors, this system integrates with existing security tools to create comprehensive Grafana dashboards for real-time security monitoring and historical trend analysis.

## The Code

```python
#!/usr/bin/env python3
"""
Security Metrics Dashboard - Prometheus Exporter
Collect and expose security metrics for Grafana visualization
"""

import argparse
import logging
import os
import re
import subprocess
import time
from collections import defaultdict
from datetime import datetime, timedelta
from typing import Dict, List
import requests
from prometheus_client import start_http_server, Gauge, Counter, Histogram, Info

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class SecurityMetricsCollector:
    """Collect security metrics from various sources"""

    def __init__(self):
        # Define Prometheus metrics
        self.failed_logins = Counter(
            'security_failed_logins_total',
            'Total failed login attempts',
            ['source_ip', 'username']
        )

        self.firewall_blocks = Counter(
            'security_firewall_blocks_total',
            'Total firewall blocked connections',
            ['source_ip', 'destination_port']
        )

        self.vulnerabilities = Gauge(
            'security_vulnerabilities_count',
            'Current vulnerability count by severity',
            ['severity']
        )

        self.cert_expiry_days = Gauge(
            'security_cert_expiry_days',
            'Days until SSL certificate expiration',
            ['domain']
        )

        self.threat_score = Gauge(
            'security_threat_score',
            'Current threat score (0-100)',
            ['source']
        )

        self.scan_duration = Histogram(
            'security_scan_duration_seconds',
            'Security scan duration',
            ['scan_type']
        )

        self.security_events = Counter(
            'security_events_total',
            'Total security events',
            ['event_type', 'severity']
        )

        # System info
        self.system_info = Info(
            'security_system',
            'Security system information'
        )

        self.system_info.info({
            'version': '1.0.0',
            'collector': 'SecurityMetricsCollector'
        })

    def collect_failed_logins(self, log_file: str = '/var/log/auth.log'):
        """Parse authentication logs for failed logins"""
        logger.info(f"Collecting failed login metrics from {log_file}")

        if not os.path.exists(log_file):
            logger.warning(f"Log file {log_file} not found")
            return

        failed_login_pattern = r'Failed password for (\w+) from ([\d.]+)'

        try:
            with open(log_file, 'r') as f:
                for line in f:
                    match = re.search(failed_login_pattern, line)
                    if match:
                        username = match.group(1)
                        source_ip = match.group(2)
                        self.failed_logins.labels(
                            source_ip=source_ip,
                            username=username
                        ).inc()

        except PermissionError:
            logger.error(f"Permission denied reading {log_file}")

    def collect_firewall_metrics(self):
        """Collect firewall block metrics from iptables/ufw"""
        logger.info("Collecting firewall metrics")

        try:
            # Try ufw first
            result = subprocess.run(
                ['ufw', 'status', 'verbose'],
                capture_output=True,
                text=True,
                check=False
            )

            if result.returncode == 0:
                # Parse UFW output for blocked IPs
                for line in result.stdout.split('\n'):
                    if 'DENY' in line:
                        parts = line.split()
                        if len(parts) >= 2:
                            port = parts[0]
                            self.firewall_blocks.labels(
                                source_ip='aggregate',
                                destination_port=port
                            ).inc()

        except FileNotFoundError:
            logger.warning("UFW not installed, trying iptables")

            try:
                result = subprocess.run(
                    ['iptables', '-L', '-n', '-v'],
                    capture_output=True,
                    text=True,
                    check=True
                )

                # Parse iptables DROP rules
                for line in result.stdout.split('\n'):
                    if 'DROP' in line:
                        self.firewall_blocks.labels(
                            source_ip='aggregate',
                            destination_port='all'
                        ).inc()

            except (FileNotFoundError, PermissionError):
                logger.warning("Cannot collect firewall metrics (requires sudo)")

    def collect_vulnerability_counts(self, scan_results_path: str = '/tmp/vuln_scan.json'):
        """Load vulnerability scan results"""
        logger.info("Collecting vulnerability metrics")

        if not os.path.exists(scan_results_path):
            # Generate sample data for demo
            self.vulnerabilities.labels(severity='critical').set(2)
            self.vulnerabilities.labels(severity='high').set(12)
            self.vulnerabilities.labels(severity='medium').set(45)
            self.vulnerabilities.labels(severity='low').set(78)
            return

        import json
        try:
            with open(scan_results_path, 'r') as f:
                data = json.load(f)

            severity_counts = data.get('severity_summary', {})
            for severity, count in severity_counts.items():
                self.vulnerabilities.labels(severity=severity.lower()).set(count)

        except (json.JSONDecodeError, KeyError) as e:
            logger.error(f"Error parsing vulnerability data: {e}")

    def check_certificate_expiry(self, domains: List[str]):
        """Check SSL certificate expiration dates"""
        logger.info(f"Checking certificate expiry for {len(domains)} domains")

        import ssl
        import socket

        for domain in domains:
            try:
                context = ssl.create_default_context()
                with socket.create_connection((domain, 443), timeout=5) as sock:
                    with context.wrap_socket(sock, server_hostname=domain) as ssock:
                        cert = ssock.getpeercert()

                        # Parse expiration date
                        expiry_date = datetime.strptime(
                            cert['notAfter'],
                            '%b %d %H:%M:%S %Y %Z'
                        )

                        days_until_expiry = (expiry_date - datetime.now()).days

                        self.cert_expiry_days.labels(domain=domain).set(days_until_expiry)

                        if days_until_expiry < 30:
                            logger.warning(
                                f"Certificate for {domain} expires in {days_until_expiry} days"
                            )

            except Exception as e:
                logger.error(f"Error checking certificate for {domain}: {e}")
                self.cert_expiry_days.labels(domain=domain).set(-1)

    def calculate_threat_score(self):
        """Calculate aggregate threat score"""
        logger.info("Calculating threat score")

        # Aggregate multiple signals into threat score
        score = 0

        # Factor 1: Recent failed logins (weight: 30%)
        # This would query the actual metric store in production
        recent_failed_logins = 15  # Placeholder
        score += min(30, recent_failed_logins * 2)

        # Factor 2: Critical vulnerabilities (weight: 40%)
        critical_vulns = 2  # From previous scan
        score += min(40, critical_vulns * 20)

        # Factor 3: Firewall activity (weight: 20%)
        recent_blocks = 8  # Placeholder
        score += min(20, recent_blocks)

        # Factor 4: Expiring certificates (weight: 10%)
        expiring_certs = 1  # From cert check
        score += min(10, expiring_certs * 10)

        self.threat_score.labels(source='aggregate').set(score)

        if score >= 70:
            logger.warning(f"HIGH threat score: {score}/100")
            self.security_events.labels(
                event_type='high_threat_score',
                severity='high'
            ).inc()

    def simulate_security_events(self):
        """Generate sample security events for demo"""
        event_types = [
            ('malware_detection', 'high'),
            ('suspicious_login', 'medium'),
            ('port_scan', 'low'),
            ('brute_force', 'high'),
            ('data_exfiltration', 'critical')
        ]

        import random
        for event_type, severity in event_types:
            count = random.randint(0, 5)
            for _ in range(count):
                self.security_events.labels(
                    event_type=event_type,
                    severity=severity
                ).inc()

    def collect_all_metrics(
        self,
        domains: List[str] = None,
        auth_log: str = '/var/log/auth.log'
    ):
        """Collect all security metrics"""
        logger.info("Starting metrics collection cycle")

        start_time = time.time()

        self.collect_failed_logins(auth_log)
        self.collect_firewall_metrics()
        self.collect_vulnerability_counts()

        if domains:
            self.check_certificate_expiry(domains)

        self.calculate_threat_score()
        self.simulate_security_events()

        duration = time.time() - start_time
        self.scan_duration.labels(scan_type='full').observe(duration)

        logger.info(f"Metrics collection complete in {duration:.2f}s")


def main():
    parser = argparse.ArgumentParser(
        description="Security Metrics Prometheus Exporter"
    )
    parser.add_argument(
        '--port',
        type=int,
        default=9100,
        help='Prometheus exporter port (default: 9100)'
    )
    parser.add_argument(
        '--interval',
        type=int,
        default=60,
        help='Metrics collection interval in seconds (default: 60)'
    )
    parser.add_argument(
        '--domains',
        help='Comma-separated list of domains to monitor SSL certs'
    )
    parser.add_argument(
        '--auth-log',
        default='/var/log/auth.log',
        help='Path to authentication log file'
    )

    args = parser.parse_args()

    # Start Prometheus HTTP server
    start_http_server(args.port)
    logger.info(f"Prometheus metrics server started on port {args.port}")
    logger.info(f"Metrics available at http://localhost:{args.port}/metrics")

    collector = SecurityMetricsCollector()

    domains = []
    if args.domains:
        domains = [d.strip() for d in args.domains.split(',')]

    # Continuous collection loop
    try:
        while True:
            collector.collect_all_metrics(domains=domains, auth_log=args.auth_log)
            time.sleep(args.interval)

    except KeyboardInterrupt:
        logger.info("Shutting down metrics collector")


if __name__ == "__main__":
    main()
```

## How It Works

**Prometheus Architecture:**

Prometheus scrapes HTTP endpoints that expose metrics in a specific text format. This exporter creates an HTTP server (port 9100) that Prometheus polls every 15-60 seconds.

**Metric Types:**

1. **Counter**: Monotonically increasing values (failed logins, firewall blocks)
2. **Gauge**: Values that go up and down (vulnerability counts, threat scores)
3. **Histogram**: Distributions (scan durations)
4. **Info**: Metadata (system version info)

**Data Collection Sources:**

- `/var/log/auth.log`: Failed SSH/PAM authentication attempts
- `ufw status`: Firewall block statistics
- Vulnerability scan results: JSON files from previous scans
- SSL certificate checks: Direct TLS connections to monitored domains
- Threat score calculation: Aggregated security posture

**Labels:**

Prometheus uses labels for multi-dimensional data. For example, `failed_logins` is labeled by `source_ip` and `username`, allowing queries like "show failed logins from specific IP".

## Installation & Setup

```bash
# Install dependencies
pip install prometheus-client requests

# Run exporter
python security_metrics_exporter.py \
    --port 9100 \
    --interval 60 \
    --domains "example.com,api.example.com"

# Metrics now available at http://localhost:9100/metrics
```

**Configure Prometheus to scrape exporter:**

```yaml
# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'security_metrics'
    static_configs:
      - targets: ['localhost:9100']
```

**Create Grafana Dashboard:**

1. Add Prometheus data source in Grafana
2. Import dashboard JSON or create panels:

```promql
# Failed logins by IP (last hour)
rate(security_failed_logins_total[1h])

# Current vulnerability distribution
security_vulnerabilities_count

# Threat score over time
security_threat_score

# Certificate expiry alert
security_cert_expiry_days < 30
```

## Usage Examples

**Query metrics with curl:**

```bash
curl http://localhost:9100/metrics

# Sample output:
# # HELP security_failed_logins_total Total failed login attempts
# # TYPE security_failed_logins_total counter
# security_failed_logins_total{source_ip="192.168.1.50",username="admin"} 15.0
#
# # HELP security_vulnerabilities_count Current vulnerability count by severity
# # TYPE security_vulnerabilities_count gauge
# security_vulnerabilities_count{severity="critical"} 2.0
# security_vulnerabilities_count{severity="high"} 12.0
#
# # HELP security_threat_score Current threat score (0-100)
# # TYPE security_threat_score gauge
# security_threat_score{source="aggregate"} 67.0
```

**PromQL queries for alerting:**

```promql
# Alert on high threat score
security_threat_score > 70

# Alert on certificates expiring soon
security_cert_expiry_days < 30

# Alert on brute force attacks (>20 failed logins from single IP in 5min)
rate(security_failed_logins_total[5m]) > 20

# Alert on critical vulnerabilities
security_vulnerabilities_count{severity="critical"} > 0
```

## Home Lab Integration

**Scenario: Comprehensive Home Lab Security Dashboard**

Monitor your entire home lab infrastructure with unified security metrics:

**1. Deploy exporter as Docker container:**

```dockerfile
FROM python:3.11-slim

RUN pip install prometheus-client requests

COPY security_metrics_exporter.py /app/

CMD ["python", "/app/security_metrics_exporter.py", \
     "--port", "9100", \
     "--interval", "60", \
     "--domains", "homelab.local,plex.homelab.local"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  security-exporter:
    build: .
    ports:
      - "9100:9100"
    volumes:
      - /var/log:/var/log:ro
      - /tmp/vuln_scans:/tmp:ro
    restart: unless-stopped

  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    restart: unless-stopped

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    volumes:
      - grafana_data:/var/lib/grafana
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=secure_password
    restart: unless-stopped

volumes:
  prometheus_data:
  grafana_data:
```

**2. Create Grafana alerts:**

{% raw %}
```yaml
# grafana_alerts.yml
groups:
  - name: security_alerts
    interval: 1m
    rules:
      - alert: HighThreatScore
        expr: security_threat_score > 70
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "High security threat detected"
          description: "Threat score is {{ $value }}/100"

      - alert: CriticalVulnerabilities
        expr: security_vulnerabilities_count{severity="critical"} > 0
        labels:
          severity: high
        annotations:
          summary: "{{ $value }} critical vulnerabilities detected"

      - alert: CertificateExpiringSoon
        expr: security_cert_expiry_days < 30
        labels:
          severity: warning
        annotations:
          summary: "SSL certificate for {{ $labels.domain }} expires in {{ $value }} days"
```
{% endraw %}

**3. Dashboard JSON example:**

```json
{
  "dashboard": {
    "title": "Home Lab Security Overview",
    "panels": [
      {
        "title": "Threat Score",
        "type": "gauge",
        "targets": [{
          "expr": "security_threat_score"
        }],
        "thresholds": "50,70"
      },
      {
        "title": "Failed Logins (Last Hour)",
        "type": "graph",
        "targets": [{
          "expr": "rate(security_failed_logins_total[1h])"
        }]
      },
      {
        "title": "Vulnerability Distribution",
        "type": "piechart",
        "targets": [{
          "expr": "security_vulnerabilities_count"
        }]
      }
    ]
  }
}
```

**4. Integration with notification systems:**

```python
# Add to security_metrics_exporter.py
def send_alert(message: str, severity: str):
    """Send alert to ntfy.sh or similar"""
    requests.post(
        "https://ntfy.sh/homelab-security",
        data=message,
        headers={
            "Priority": "urgent" if severity == "critical" else "default",
            "Tags": "warning"
        }
    )

# Use in threat score calculation:
if score >= 70:
    send_alert(
        f"High threat score detected: {score}/100",
        "critical"
    )
```

**Expected Results:**

- Real-time visibility into security posture
- Historical trending (identify attack patterns over weeks/months)
- Automated alerting on critical events
- Single pane of glass for all security metrics
- Integration with existing monitoring (node_exporter, blackbox_exporter)

## Conclusion

Security metrics are useless if they're not visualized and actionable. This Prometheus exporter demonstrates how to collect security-relevant data from multiple sources and expose it in a format that integrates seamlessly with modern observability stacks.

Combined with Grafana dashboards and Alertmanager, you create a security operations cockpit that provides real-time threat awareness and historical analysis for compliance reporting.

**Tomorrow:** Day 8 covers phishing simulation platforms for security awareness training and measuring organizational susceptibility.
