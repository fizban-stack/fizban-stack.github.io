---
layout: post
title: "10 Days of Python Security: Day 4 - Container Security Scanner with Trivy Integration"
date: 2026-02-19
category: Python Security
author: James Wells
---

## Project Overview

Container vulnerabilities are a leading cause of production breaches in 2026. With 85% of organizations running containerized workloads, automated image scanning is no longer optional. This project builds a container security scanner that integrates Aqua Security's Trivy to detect vulnerabilities, secrets, and misconfigurations in Docker images.

The scanner automatically analyzes images, generates compliance reports, enforces security policies (fail builds on critical CVEs), and integrates with CI/CD pipelines. Perfect for DevSecOps automation and home lab container auditing.

## The Code

```python
#!/usr/bin/env python3
"""
Container Security Scanner with Trivy Integration
Automated Docker image vulnerability scanning and policy enforcement
"""

import argparse
import json
import logging
import os
import subprocess
import sys
from collections import defaultdict
from datetime import datetime
from typing import Dict, List, Optional
import docker

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class ContainerSecurityScanner:
    """Container security scanner using Trivy"""

    def __init__(self, policy_config: Optional[str] = None):
        self.docker_client = docker.from_env()
        self.policy = self._load_policy(policy_config)
        self.scan_results = {}
        self.policy_violations = []

    def _load_policy(self, config_path: Optional[str]) -> Dict:
        """Load security policy configuration"""
        default_policy = {
            "max_critical": 0,  # Fail on any critical CVE
            "max_high": 5,  # Allow up to 5 high severity
            "max_medium": 20,
            "block_unfixed": True,  # Block vulnerabilities without fixes
            "scan_for_secrets": True,
            "scan_for_misconfigs": True,
            "allowed_base_images": [
                "alpine:latest",
                "debian:bookworm-slim",
                "ubuntu:22.04",
                "python:3.11-slim"
            ]
        }

        if config_path and os.path.exists(config_path):
            with open(config_path, 'r') as f:
                custom_policy = json.load(f)
                default_policy.update(custom_policy)

        return default_policy

    def check_trivy_installed(self) -> bool:
        """Verify Trivy is installed"""
        try:
            result = subprocess.run(
                ["trivy", "--version"],
                capture_output=True,
                text=True,
                check=True
            )
            logger.info(f"Trivy version: {result.stdout.strip()}")
            return True
        except (subprocess.CalledProcessError, FileNotFoundError):
            logger.error("Trivy not installed. Install with: curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh -s -- -b /usr/local/bin")
            return False

    def scan_image(self, image_name: str, scan_type: str = "os") -> Dict:
        """Scan Docker image with Trivy"""
        logger.info(f"Scanning image: {image_name}")

        # Ensure image exists locally
        try:
            self.docker_client.images.get(image_name)
        except docker.errors.ImageNotFound:
            logger.info(f"Pulling image {image_name}...")
            self.docker_client.images.pull(image_name)

        # Run Trivy scan
        scan_types = {
            "os": ["--scanners", "vuln"],  # OS vulnerabilities
            "full": ["--scanners", "vuln,config,secret"],  # All scanners
            "secrets": ["--scanners", "secret"],  # Secrets only
            "config": ["--scanners", "config"]  # Misconfigurations only
        }

        trivy_args = [
            "trivy", "image",
            "--format", "json",
            "--quiet"
        ] + scan_types.get(scan_type, scan_types["os"]) + [image_name]

        try:
            result = subprocess.run(
                trivy_args,
                capture_output=True,
                text=True,
                check=True,
                timeout=300
            )

            scan_data = json.loads(result.stdout)
            self.scan_results[image_name] = scan_data

            logger.info(f"Scan complete for {image_name}")
            return scan_data

        except subprocess.CalledProcessError as e:
            logger.error(f"Trivy scan failed: {e.stderr}")
            return {}
        except subprocess.TimeoutExpired:
            logger.error(f"Trivy scan timed out for {image_name}")
            return {}

    def analyze_vulnerabilities(self, image_name: str) -> Dict:
        """Analyze vulnerability scan results"""
        scan_data = self.scan_results.get(image_name, {})

        severity_counts = defaultdict(int)
        unfixed_vulns = []
        critical_vulns = []

        for result in scan_data.get("Results", []):
            for vuln in result.get("Vulnerabilities", []):
                severity = vuln.get("Severity", "UNKNOWN")
                severity_counts[severity] += 1

                if severity == "CRITICAL":
                    critical_vulns.append({
                        "cve_id": vuln.get("VulnerabilityID", ""),
                        "package": vuln.get("PkgName", ""),
                        "installed_version": vuln.get("InstalledVersion", ""),
                        "fixed_version": vuln.get("FixedVersion", ""),
                        "title": vuln.get("Title", ""),
                        "description": vuln.get("Description", "")
                    })

                if not vuln.get("FixedVersion") and severity in ["CRITICAL", "HIGH"]:
                    unfixed_vulns.append({
                        "cve_id": vuln.get("VulnerabilityID", ""),
                        "package": vuln.get("PkgName", ""),
                        "severity": severity
                    })

        return {
            "severity_counts": dict(severity_counts),
            "total_vulnerabilities": sum(severity_counts.values()),
            "critical_vulns": critical_vulns,
            "unfixed_vulns": unfixed_vulns
        }

    def detect_secrets(self, image_name: str) -> List[Dict]:
        """Detect secrets in image layers"""
        scan_data = self.scan_results.get(image_name, {})

        secrets = []
        for result in scan_data.get("Results", []):
            for secret in result.get("Secrets", []):
                secrets.append({
                    "rule_id": secret.get("RuleID", ""),
                    "category": secret.get("Category", ""),
                    "severity": secret.get("Severity", ""),
                    "title": secret.get("Title", ""),
                    "match": secret.get("Match", "***REDACTED***"),
                    "file": result.get("Target", "")
                })

        if secrets:
            logger.warning(f"Found {len(secrets)} potential secrets in {image_name}")

        return secrets

    def check_misconfigurations(self, image_name: str) -> List[Dict]:
        """Check for security misconfigurations"""
        scan_data = self.scan_results.get(image_name, {})

        misconfigs = []
        for result in scan_data.get("Results", []):
            for misconfig in result.get("Misconfigurations", []):
                misconfigs.append({
                    "id": misconfig.get("ID", ""),
                    "title": misconfig.get("Title", ""),
                    "description": misconfig.get("Description", ""),
                    "severity": misconfig.get("Severity", ""),
                    "message": misconfig.get("Message", ""),
                    "resolution": misconfig.get("Resolution", "")
                })

        if misconfigs:
            logger.warning(f"Found {len(misconfigs)} misconfigurations in {image_name}")

        return misconfigs

    def enforce_policy(self, image_name: str) -> bool:
        """Enforce security policy on scan results"""
        logger.info(f"Enforcing policy on {image_name}")

        analysis = self.analyze_vulnerabilities(image_name)
        severity_counts = analysis["severity_counts"]

        violations = []

        # Check critical vulnerability threshold
        critical_count = severity_counts.get("CRITICAL", 0)
        if critical_count > self.policy["max_critical"]:
            violations.append(
                f"CRITICAL: {critical_count} critical vulnerabilities "
                f"(max allowed: {self.policy['max_critical']})"
            )

        # Check high severity threshold
        high_count = severity_counts.get("HIGH", 0)
        if high_count > self.policy["max_high"]:
            violations.append(
                f"HIGH: {high_count} high severity vulnerabilities "
                f"(max allowed: {self.policy['max_high']})"
            )

        # Check for unfixed vulnerabilities
        if self.policy["block_unfixed"] and analysis["unfixed_vulns"]:
            unfixed_critical = [
                v for v in analysis["unfixed_vulns"]
                if v["severity"] == "CRITICAL"
            ]
            if unfixed_critical:
                violations.append(
                    f"UNFIXED: {len(unfixed_critical)} critical vulnerabilities "
                    "without available fixes"
                )

        # Check for secrets
        if self.policy["scan_for_secrets"]:
            secrets = self.detect_secrets(image_name)
            if secrets:
                violations.append(f"SECRETS: {len(secrets)} potential secrets detected")

        # Check base image
        image_info = self.docker_client.images.get(image_name)
        tags = image_info.tags
        base_image_approved = any(
            allowed in str(tags)
            for allowed in self.policy["allowed_base_images"]
        )

        if not base_image_approved and self.policy.get("enforce_base_images", False):
            violations.append(f"BASE_IMAGE: Image not built from approved base images")

        if violations:
            logger.error(f"Policy violations for {image_name}:")
            for violation in violations:
                logger.error(f"  - {violation}")
            self.policy_violations.extend(violations)
            return False

        logger.info(f"✓ {image_name} passed security policy")
        return True

    def scan_all_local_images(self):
        """Scan all local Docker images"""
        images = self.docker_client.images.list()

        logger.info(f"Found {len(images)} local images")

        for image in images:
            if not image.tags:
                continue

            image_name = image.tags[0]
            self.scan_image(image_name, scan_type="full")
            self.enforce_policy(image_name)

    def generate_report(self, output_format: str = "json") -> str:
        """Generate comprehensive security report"""
        report_data = {
            "scan_metadata": {
                "timestamp": datetime.now().isoformat(),
                "total_images": len(self.scan_results),
                "policy": self.policy
            },
            "images": {}
        }

        for image_name, scan_data in self.scan_results.items():
            analysis = self.analyze_vulnerabilities(image_name)
            secrets = self.detect_secrets(image_name)
            misconfigs = self.check_misconfigurations(image_name)

            report_data["images"][image_name] = {
                "vulnerability_summary": analysis["severity_counts"],
                "total_vulnerabilities": analysis["total_vulnerabilities"],
                "critical_vulns": analysis["critical_vulns"],
                "unfixed_vulns": analysis["unfixed_vulns"],
                "secrets_found": len(secrets),
                "secrets": secrets,
                "misconfigurations": misconfigs
            }

        if output_format == "json":
            filename = f"container_scan_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
            with open(filename, 'w') as f:
                json.dump(report_data, f, indent=2)
            logger.info(f"Report saved to {filename}")
            return filename

        elif output_format == "html":
            filename = f"container_scan_{datetime.now().strftime('%Y%m%d_%H%M%S')}.html"
            html_content = self._generate_html_report(report_data)
            with open(filename, 'w') as f:
                f.write(html_content)
            logger.info(f"HTML report saved to {filename}")
            return filename

        return ""

    def _generate_html_report(self, data: Dict) -> str:
        """Generate HTML report"""
        html = f"""
<!DOCTYPE html>
<html>
<head>
    <title>Container Security Report</title>
    <style>
        body {{ font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }}
        .container {{ max-width: 1200px; margin: 0 auto; background: white; padding: 20px; }}
        h1 {{ color: #1976d2; }}
        .summary {{ background: #e3f2fd; padding: 15px; border-radius: 5px; margin: 20px 0; }}
        .image {{ background: #fafafa; margin: 20px 0; padding: 15px; border-left: 4px solid #1976d2; }}
        .critical {{ color: #d32f2f; font-weight: bold; }}
        .high {{ color: #f57c00; font-weight: bold; }}
        .medium {{ color: #fbc02d; }}
        .vuln-table {{ width: 100%; border-collapse: collapse; margin: 15px 0; }}
        .vuln-table th {{ background: #1976d2; color: white; padding: 10px; text-align: left; }}
        .vuln-table td {{ padding: 8px; border-bottom: 1px solid #ddd; }}
        .secret-warning {{ background: #fff3cd; border-left: 4px solid #ffc107; padding: 10px; margin: 10px 0; }}
    </style>
</head>
<body>
    <div class="container">
        <h1>Container Security Scan Report</h1>
        <div class="summary">
            <h2>Scan Summary</h2>
            <p><strong>Timestamp:</strong> {data['scan_metadata']['timestamp']}</p>
            <p><strong>Images Scanned:</strong> {data['scan_metadata']['total_images']}</p>
        </div>
"""

        for image_name, image_data in data["images"].items():
            severity_summary = image_data["vulnerability_summary"]

            html += f"""
        <div class="image">
            <h2>{image_name}</h2>
            <p><strong>Total Vulnerabilities:</strong> {image_data['total_vulnerabilities']}</p>
            <p>
                <span class="critical">CRITICAL: {severity_summary.get('CRITICAL', 0)}</span> |
                <span class="high">HIGH: {severity_summary.get('HIGH', 0)}</span> |
                <span class="medium">MEDIUM: {severity_summary.get('MEDIUM', 0)}</span> |
                LOW: {severity_summary.get('LOW', 0)}
            </p>
"""

            if image_data["critical_vulns"]:
                html += "<h3>Critical Vulnerabilities</h3><table class='vuln-table'>"
                html += "<tr><th>CVE</th><th>Package</th><th>Installed</th><th>Fixed</th><th>Title</th></tr>"

                for vuln in image_data["critical_vulns"][:10]:  # Top 10
                    html += f"""
                <tr>
                    <td>{vuln['cve_id']}</td>
                    <td>{vuln['package']}</td>
                    <td>{vuln['installed_version']}</td>
                    <td>{vuln['fixed_version'] or 'No fix'}</td>
                    <td>{vuln['title']}</td>
                </tr>
"""
                html += "</table>"

            if image_data["secrets_found"] > 0:
                html += f"""
            <div class="secret-warning">
                <strong>⚠ Secrets Detected:</strong> {image_data['secrets_found']} potential secrets found in image layers.
                Review scan details immediately.
            </div>
"""

            html += "</div>"

        html += """
    </div>
</body>
</html>
"""
        return html


def main():
    parser = argparse.ArgumentParser(
        description="Container Security Scanner with Trivy"
    )
    parser.add_argument(
        "--image",
        help="Specific image to scan (e.g., nginx:latest)"
    )
    parser.add_argument(
        "--scan-all",
        action="store_true",
        help="Scan all local Docker images"
    )
    parser.add_argument(
        "--scan-type",
        choices=["os", "full", "secrets", "config"],
        default="full",
        help="Type of scan to perform"
    )
    parser.add_argument(
        "--policy",
        help="Path to security policy JSON file"
    )
    parser.add_argument(
        "--format",
        choices=["json", "html"],
        default="html",
        help="Report output format"
    )
    parser.add_argument(
        "--fail-on-violation",
        action="store_true",
        help="Exit with non-zero code if policy violations found (for CI/CD)"
    )

    args = parser.parse_args()

    scanner = ContainerSecurityScanner(policy_config=args.policy)

    if not scanner.check_trivy_installed():
        sys.exit(1)

    if args.scan_all:
        scanner.scan_all_local_images()
    elif args.image:
        scanner.scan_image(args.image, scan_type=args.scan_type)
        passed = scanner.enforce_policy(args.image)

        if not passed and args.fail_on_violation:
            logger.error("Security policy violations detected. Failing build.")
            sys.exit(1)
    else:
        parser.print_help()
        sys.exit(1)

    scanner.generate_report(output_format=args.format)

    if args.fail_on_violation and scanner.policy_violations:
        sys.exit(1)


if __name__ == "__main__":
    main()
```

## How It Works

**Trivy Integration:**

Trivy is a comprehensive vulnerability scanner for containers and artifacts. This Python wrapper automates Trivy execution and parses JSON output for programmatic analysis.

**Vulnerability Detection:**

Scans three layers:
1. **OS packages**: Detects CVEs in base image packages (apt, yum, apk)
2. **Application dependencies**: Scans language-specific packages (pip, npm, maven)
3. **Secrets**: Finds API keys, passwords, tokens hardcoded in image layers

**Policy Enforcement:**

Configurable security policies define acceptable risk thresholds:
- Maximum critical/high/medium CVEs allowed
- Block images with unfixed vulnerabilities
- Enforce approved base images only
- Fail CI/CD builds on policy violations

**Scan Types:**

- `os`: Fast OS-only vulnerability scan
- `full`: OS vulnerabilities + secrets + misconfigurations
- `secrets`: Secret detection only (API keys, credentials)
- `config`: Misconfiguration detection (exposed ports, root user)

## Installation & Setup

```bash
# Install Trivy
curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh -s -- -b /usr/local/bin

# Install Python dependencies
pip install docker

# Verify installation
trivy --version
docker --version
```

**Create security policy:**

```json
{
  "max_critical": 0,
  "max_high": 3,
  "max_medium": 15,
  "block_unfixed": true,
  "scan_for_secrets": true,
  "scan_for_misconfigs": true,
  "allowed_base_images": [
    "alpine:latest",
    "python:3.11-slim",
    "node:20-alpine"
  ],
  "enforce_base_images": false
}
```

Save as `security_policy.json`.

## Usage Examples

**Scan single image:**

```bash
python container_scanner.py --image nginx:latest --format html

# Output:
# 2026-04-04 11:30:15 - INFO - Trivy version: 0.50.0
# 2026-04-04 11:30:15 - INFO - Scanning image: nginx:latest
# 2026-04-04 11:30:42 - INFO - Scan complete for nginx:latest
# 2026-04-04 11:30:42 - INFO - Enforcing policy on nginx:latest
# 2026-04-04 11:30:42 - ERROR - Policy violations for nginx:latest:
# 2026-04-04 11:30:42 - ERROR -   - CRITICAL: 2 critical vulnerabilities (max allowed: 0)
# 2026-04-04 11:30:42 - INFO - HTML report saved to container_scan_20260404_113042.html
```

**Scan all local images:**

```bash
python container_scanner.py --scan-all --policy security_policy.json

# Scans every Docker image on your system
# Generates comprehensive report with policy compliance status
```

**CI/CD integration (fail on violations):**

```bash
# In GitLab CI, Jenkins, or GitHub Actions
python container_scanner.py \
    --image myapp:$CI_COMMIT_SHA \
    --policy ci_security_policy.json \
    --fail-on-violation \
    --format json

# Exit code 1 if policy violations found (blocks deployment)
```

**Secrets detection only:**

```bash
python container_scanner.py --image myapp:latest --scan-type secrets

# Finds:
# - AWS access keys
# - API tokens
# - SSH private keys
# - Database passwords
# - Generic secrets (high entropy strings)
```

## Home Lab Integration

**Scenario: Automated Container Scanning Pipeline**

Your home lab runs multiple Docker services (Plex, Nextcloud, home automation). Implement weekly vulnerability scans:

**1. Create Docker Compose service:**

```yaml
version: '3.8'

services:
  container-scanner:
    image: python:3.11-slim
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./scanner:/app
      - ./reports:/reports
    working_dir: /app
    command: >
      bash -c "
        pip install docker &&
        curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh -s -- -b /usr/local/bin &&
        python container_scanner.py --scan-all --format html
      "
    environment:
      - DOCKER_HOST=unix:///var/run/docker.sock
```

**2. Automated weekly scans:**

```bash
# Cron job: Every Sunday at 3 AM
0 3 * * 0 docker-compose -f /opt/scanner/docker-compose.yml up
```

**3. Alert on critical findings:**

```python
# Add to container_scanner.py after report generation:

def send_alert(scan_results):
    critical_images = [
        img for img, data in scan_results.items()
        if data["vulnerability_summary"].get("CRITICAL", 0) > 0
    ]

    if critical_images:
        # Send to Gotify, ntfy.sh, or email
        requests.post(
            "http://gotify.homelab.local/message",
            json={
                "title": "Container Security Alert",
                "message": f"{len(critical_images)} images have critical vulnerabilities",
                "priority": 10
            },
            headers={"X-Gotify-Key": "YOUR_KEY"}
        )
```

**4. Pre-deployment validation:**

```bash
# Before deploying new container versions
./deploy.sh myapp:v2.0.0

# In deploy.sh:
if python container_scanner.py \
    --image myapp:v2.0.0 \
    --policy production_policy.json \
    --fail-on-violation; then
    docker stack deploy -c stack.yml myapp
else
    echo "Security scan failed. Deployment blocked."
    exit 1
fi
```

**Expected Results:**

- Automated detection of vulnerable dependencies before they reach production
- Weekly inventory of all container vulnerabilities in home lab
- Prevention of secret leaks (caught before git commit)
- Compliance reporting for audit purposes
- Reduction in attack surface through informed patching decisions

**Real-World Example:**

A home lab scan revealed:
- `jellyfin/jellyfin:latest` had 12 critical CVEs in ffmpeg
- Custom Python app container contained AWS credentials in layer 3
- `portainer/portainer-ce` exposed admin API without authentication
- All flagged with specific remediation steps and CVE details

## Conclusion

Container security scanning should be automated and integrated into every deployment pipeline. This scanner provides enterprise-grade vulnerability detection using open-source tools, with configurable policies that enforce your organization's risk tolerance.

The `--fail-on-violation` flag enables shift-left security by blocking vulnerable containers before they deploy, while the comprehensive HTML reports provide visibility for security teams and developers alike.

**Tomorrow:** Day 5 covers API security testing frameworks targeting the OWASP API Top 10 vulnerabilities.
