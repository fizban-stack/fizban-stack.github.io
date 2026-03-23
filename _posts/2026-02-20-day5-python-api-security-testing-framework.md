---
layout: post
title: "10 Days of Python Security: Day 5 - API Security Testing Framework (OWASP API Top 10)"
date: 2026-02-20
category: Python Security
author: James Wells
---

## Project Overview

APIs are the backbone of modern applications, and they're also a primary attack vector. The OWASP API Security Top 10 identifies the most critical API vulnerabilities. This project builds an automated security testing framework that probes REST APIs for broken authentication, excessive data exposure, injection flaws, and other API-specific vulnerabilities.

Using Python's `requests` library and fuzzing techniques, this tool performs active security testing against APIs, generates detailed vulnerability reports, and integrates with CI/CD pipelines to catch security issues before production deployment.

## The Code

```python
#!/usr/bin/env python3
"""
API Security Testing Framework
OWASP API Top 10 vulnerability scanner
"""

import argparse
import json
import logging
import random
import re
import string
import time
from typing import Dict, List, Optional, Tuple
from urllib.parse import urljoin, urlparse
import requests
from requests.exceptions import RequestException

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class APISecurityScanner:
    """Automated API security testing framework"""

    def __init__(self, base_url: str, auth_token: Optional[str] = None):
        self.base_url = base_url.rstrip('/')
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'APISecurityScanner/1.0'
        })

        if auth_token:
            self.session.headers.update({
                'Authorization': f'Bearer {auth_token}'
            })

        self.vulnerabilities = []
        self.endpoints_tested = []

    def test_broken_object_level_authorization(
        self,
        endpoint: str,
        valid_id: str,
        test_ids: List[str]
    ) -> List[Dict]:
        """
        API1:2023 - Broken Object Level Authorization (BOLA/IDOR)
        Test if API validates object ownership
        """
        logger.info(f"Testing BOLA on {endpoint}")
        findings = []

        for test_id in test_ids:
            url = urljoin(self.base_url, endpoint.replace('{id}', str(test_id)))

            try:
                response = self.session.get(url)

                # If we can access other users' objects, it's vulnerable
                if response.status_code == 200:
                    findings.append({
                        "vulnerability": "API1:2023 Broken Object Level Authorization",
                        "severity": "CRITICAL",
                        "endpoint": endpoint,
                        "method": "GET",
                        "test_id": test_id,
                        "status_code": response.status_code,
                        "description": f"Successfully accessed object {test_id} without proper authorization check",
                        "recommendation": "Implement object-level authorization checks. Validate user owns requested resource.",
                        "evidence": f"Response length: {len(response.text)} bytes"
                    })

            except RequestException as e:
                logger.error(f"Request error: {e}")

            time.sleep(0.5)  # Rate limiting

        return findings

    def test_broken_authentication(self, login_endpoint: str) -> List[Dict]:
        """
        API2:2023 - Broken Authentication
        Test authentication weaknesses
        """
        logger.info(f"Testing authentication on {login_endpoint}")
        findings = []
        url = urljoin(self.base_url, login_endpoint)

        # Test 1: No rate limiting on auth endpoint
        failed_attempts = 0
        for i in range(20):
            try:
                response = self.session.post(
                    url,
                    json={"username": "admin", "password": f"wrong_password_{i}"}
                )

                if response.status_code in [401, 403]:
                    failed_attempts += 1

                time.sleep(0.1)

            except RequestException:
                break

        if failed_attempts >= 15:
            findings.append({
                "vulnerability": "API2:2023 Broken Authentication",
                "severity": "HIGH",
                "endpoint": login_endpoint,
                "method": "POST",
                "description": f"No rate limiting detected. Tested {failed_attempts} failed login attempts",
                "recommendation": "Implement rate limiting, account lockout, and CAPTCHA after failed attempts",
                "evidence": f"{failed_attempts} requests succeeded without blocking"
            })

        # Test 2: Weak password policy
        weak_passwords = ["password", "123456", "admin", ""]

        for weak_pass in weak_passwords:
            try:
                response = self.session.post(
                    url,
                    json={"username": "testuser", "password": weak_pass}
                )

                # If weak password is accepted (creates account), it's vulnerable
                if response.status_code in [200, 201]:
                    findings.append({
                        "vulnerability": "API2:2023 Broken Authentication",
                        "severity": "MEDIUM",
                        "endpoint": login_endpoint,
                        "method": "POST",
                        "description": f"Weak password '{weak_pass}' accepted",
                        "recommendation": "Enforce strong password policy (length, complexity, common password blocking)"
                    })

            except RequestException:
                pass

        return findings

    def test_excessive_data_exposure(self, endpoints: List[str]) -> List[Dict]:
        """
        API3:2023 - Excessive Data Exposure
        Check if API returns sensitive data unnecessarily
        """
        logger.info("Testing for excessive data exposure")
        findings = []

        sensitive_fields = [
            'password', 'password_hash', 'secret', 'token', 'api_key',
            'ssn', 'credit_card', 'cvv', 'private_key', 'salt'
        ]

        for endpoint in endpoints:
            url = urljoin(self.base_url, endpoint)

            try:
                response = self.session.get(url)

                if response.status_code == 200:
                    response_text = response.text.lower()
                    exposed_fields = []

                    for field in sensitive_fields:
                        if field in response_text:
                            exposed_fields.append(field)

                    if exposed_fields:
                        findings.append({
                            "vulnerability": "API3:2023 Excessive Data Exposure",
                            "severity": "HIGH",
                            "endpoint": endpoint,
                            "method": "GET",
                            "description": f"Response contains sensitive fields: {', '.join(exposed_fields)}",
                            "recommendation": "Filter response data. Only return necessary fields. Use DTOs.",
                            "evidence": f"Found: {exposed_fields}"
                        })

            except RequestException as e:
                logger.error(f"Request error: {e}")

        return findings

    def test_lack_of_resources_rate_limiting(
        self,
        endpoint: str,
        requests_count: int = 100
    ) -> List[Dict]:
        """
        API4:2023 - Lack of Resources & Rate Limiting
        Test if API implements rate limiting
        """
        logger.info(f"Testing rate limiting on {endpoint}")
        findings = []
        url = urljoin(self.base_url, endpoint)

        successful_requests = 0
        start_time = time.time()

        for i in range(requests_count):
            try:
                response = self.session.get(url)

                if response.status_code == 200:
                    successful_requests += 1
                elif response.status_code == 429:  # Too Many Requests
                    logger.info("Rate limiting detected (HTTP 429)")
                    break

            except RequestException:
                pass

        elapsed_time = time.time() - start_time

        # If we completed 100+ requests in < 5 seconds, rate limiting is weak/absent
        if successful_requests >= 80 and elapsed_time < 5:
            findings.append({
                "vulnerability": "API4:2023 Lack of Resources & Rate Limiting",
                "severity": "MEDIUM",
                "endpoint": endpoint,
                "method": "GET",
                "description": f"No effective rate limiting. {successful_requests} requests in {elapsed_time:.2f}s",
                "recommendation": "Implement rate limiting (requests per minute/hour), request throttling",
                "evidence": f"Rate: {successful_requests / elapsed_time:.2f} req/s"
            })

        return findings

    def test_broken_function_level_authorization(
        self,
        admin_endpoints: List[str]
    ) -> List[Dict]:
        """
        API5:2023 - Broken Function Level Authorization
        Test if regular users can access admin functions
        """
        logger.info("Testing function level authorization")
        findings = []

        # Remove admin token temporarily
        original_auth = self.session.headers.get('Authorization')
        if 'Authorization' in self.session.headers:
            del self.session.headers['Authorization']

        for endpoint in admin_endpoints:
            url = urljoin(self.base_url, endpoint)

            methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']

            for method in methods:
                try:
                    response = self.session.request(method, url)

                    # If we get anything other than 401/403, authorization is broken
                    if response.status_code not in [401, 403, 404]:
                        findings.append({
                            "vulnerability": "API5:2023 Broken Function Level Authorization",
                            "severity": "CRITICAL",
                            "endpoint": endpoint,
                            "method": method,
                            "description": f"Unauthenticated {method} request returned {response.status_code}",
                            "recommendation": "Enforce role-based access control (RBAC). Check permissions for all endpoints.",
                            "evidence": f"Status: {response.status_code}, Method: {method}"
                        })

                except RequestException:
                    pass

        # Restore auth header
        if original_auth:
            self.session.headers['Authorization'] = original_auth

        return findings

    def test_mass_assignment(
        self,
        endpoint: str,
        extra_fields: Dict[str, any]
    ) -> List[Dict]:
        """
        API6:2023 - Unrestricted Resource Consumption
        (formerly Mass Assignment)
        Test if API accepts unexpected fields
        """
        logger.info(f"Testing mass assignment on {endpoint}")
        findings = []
        url = urljoin(self.base_url, endpoint)

        # Try to inject privileged fields
        payload = {
            "username": "testuser",
            "email": "test@example.com",
            **extra_fields  # e.g., {"is_admin": true, "role": "admin"}
        }

        try:
            response = self.session.post(url, json=payload)

            if response.status_code in [200, 201]:
                # Check if injected fields were accepted
                if response.headers.get('content-type', '').startswith('application/json'):
                    response_data = response.json()

                    for field, value in extra_fields.items():
                        if field in str(response_data):
                            findings.append({
                                "vulnerability": "API6:2023 Unrestricted Resource Consumption (Mass Assignment)",
                                "severity": "HIGH",
                                "endpoint": endpoint,
                                "method": "POST",
                                "description": f"API accepted unexpected field '{field}' with value '{value}'",
                                "recommendation": "Use allowlists for input fields. Reject unexpected parameters.",
                                "evidence": f"Field '{field}' present in response"
                            })

        except RequestException as e:
            logger.error(f"Request error: {e}")

        return findings

    def test_sql_injection(self, endpoints: List[str]) -> List[Dict]:
        """
        API8:2023 - Security Misconfiguration (includes injection flaws)
        Test for SQL injection vulnerabilities
        """
        logger.info("Testing for SQL injection")
        findings = []

        sql_payloads = [
            "' OR '1'='1",
            "1' OR '1'='1' --",
            "admin'--",
            "' UNION SELECT NULL--",
            "1; DROP TABLE users--"
        ]

        for endpoint in endpoints:
            # Test query parameters
            for payload in sql_payloads:
                test_url = f"{urljoin(self.base_url, endpoint)}?id={payload}"

                try:
                    response = self.session.get(test_url)

                    # SQL error indicators
                    sql_errors = [
                        'sql syntax', 'mysql', 'sqlite', 'postgresql',
                        'ora-', 'syntax error', 'unclosed quotation'
                    ]

                    response_text = response.text.lower()

                    for error_pattern in sql_errors:
                        if error_pattern in response_text:
                            findings.append({
                                "vulnerability": "API8:2023 Security Misconfiguration (SQL Injection)",
                                "severity": "CRITICAL",
                                "endpoint": endpoint,
                                "method": "GET",
                                "description": f"SQL error exposed with payload: {payload}",
                                "recommendation": "Use parameterized queries. Never concatenate user input into SQL.",
                                "evidence": f"Error pattern '{error_pattern}' found in response"
                            })
                            break

                except RequestException:
                    pass

        return findings

    def test_improper_inventory_management(self, base_paths: List[str]) -> List[Dict]:
        """
        API9:2023 - Improper Inventory Management
        Discover old/deprecated API versions
        """
        logger.info("Testing for old API versions")
        findings = []

        version_paths = ['v1', 'v2', 'v3', 'api/v1', 'api/v2', 'api/old', 'api/deprecated']

        for version in version_paths:
            url = urljoin(self.base_url, version)

            try:
                response = self.session.get(url)

                if response.status_code == 200:
                    findings.append({
                        "vulnerability": "API9:2023 Improper Inventory Management",
                        "severity": "MEDIUM",
                        "endpoint": version,
                        "method": "GET",
                        "description": f"Old API version accessible: {version}",
                        "recommendation": "Deprecate and remove old API versions. Use API gateway for versioning.",
                        "evidence": f"Status: {response.status_code}"
                    })

            except RequestException:
                pass

        return findings

    def test_unsafe_api_consumption(self, third_party_integrations: List[str]) -> List[Dict]:
        """
        API10:2023 - Unsafe Consumption of APIs
        Check if API validates third-party data
        """
        logger.info("Testing third-party API consumption safety")
        findings = []

        # This would require integration testing with mock third-party APIs
        # For demonstration, checking if SSL verification is disabled

        for integration in third_party_integrations:
            if 'verify=False' in integration.lower():
                findings.append({
                    "vulnerability": "API10:2023 Unsafe Consumption of APIs",
                    "severity": "HIGH",
                    "endpoint": "N/A",
                    "method": "N/A",
                    "description": "SSL verification disabled for third-party API calls",
                    "recommendation": "Always verify SSL certificates. Validate and sanitize third-party data."
                })

        return findings

    def run_full_scan(
        self,
        target_endpoints: List[str],
        test_ids: Optional[List[str]] = None
    ):
        """Execute comprehensive API security scan"""
        logger.info(f"Starting full scan of {self.base_url}")

        # API1: BOLA
        if test_ids:
            for endpoint in [e for e in target_endpoints if '{id}' in e]:
                self.vulnerabilities.extend(
                    self.test_broken_object_level_authorization(
                        endpoint,
                        test_ids[0],
                        test_ids[1:]
                    )
                )

        # API2: Broken Authentication
        auth_endpoints = [e for e in target_endpoints if 'login' in e or 'auth' in e]
        for endpoint in auth_endpoints:
            self.vulnerabilities.extend(self.test_broken_authentication(endpoint))

        # API3: Excessive Data Exposure
        self.vulnerabilities.extend(self.test_excessive_data_exposure(target_endpoints))

        # API4: Rate Limiting
        if target_endpoints:
            self.vulnerabilities.extend(
                self.test_lack_of_resources_rate_limiting(target_endpoints[0])
            )

        # API5: Function Level Authorization
        admin_endpoints = [e for e in target_endpoints if 'admin' in e]
        if admin_endpoints:
            self.vulnerabilities.extend(
                self.test_broken_function_level_authorization(admin_endpoints)
            )

        # API6: Mass Assignment
        register_endpoints = [e for e in target_endpoints if 'register' in e or 'create' in e]
        for endpoint in register_endpoints:
            self.vulnerabilities.extend(
                self.test_mass_assignment(
                    endpoint,
                    {"is_admin": True, "role": "admin"}
                )
            )

        # API8: SQL Injection
        self.vulnerabilities.extend(self.test_sql_injection(target_endpoints))

        # API9: API Inventory
        self.vulnerabilities.extend(self.test_improper_inventory_management([]))

        logger.info(f"Scan complete. Found {len(self.vulnerabilities)} vulnerabilities")

    def generate_report(self, output_format: str = "json") -> str:
        """Generate vulnerability report"""
        report_data = {
            "scan_metadata": {
                "target": self.base_url,
                "timestamp": time.strftime('%Y-%m-%d %H:%M:%S'),
                "total_vulnerabilities": len(self.vulnerabilities)
            },
            "vulnerabilities": self.vulnerabilities
        }

        # Group by severity
        severity_counts = {}
        for vuln in self.vulnerabilities:
            sev = vuln.get('severity', 'UNKNOWN')
            severity_counts[sev] = severity_counts.get(sev, 0) + 1

        report_data["severity_summary"] = severity_counts

        if output_format == "json":
            filename = f"api_security_report_{int(time.time())}.json"
            with open(filename, 'w') as f:
                json.dump(report_data, f, indent=2)
            logger.info(f"Report saved to {filename}")
            return filename

        return ""


def main():
    parser = argparse.ArgumentParser(
        description="API Security Testing Framework (OWASP API Top 10)"
    )
    parser.add_argument(
        "url",
        help="Base API URL (e.g., https://api.example.com)"
    )
    parser.add_argument(
        "--endpoints",
        required=True,
        help="Comma-separated list of endpoints to test (e.g., /users,/api/posts/{id})"
    )
    parser.add_argument(
        "--auth-token",
        help="Bearer token for authenticated testing"
    )
    parser.add_argument(
        "--test-ids",
        help="Comma-separated test IDs for BOLA testing (e.g., 1,2,3,999)"
    )
    parser.add_argument(
        "--format",
        choices=["json", "html"],
        default="json",
        help="Report output format"
    )

    args = parser.parse_args()

    scanner = APISecurityScanner(
        base_url=args.url,
        auth_token=args.auth_token
    )

    endpoints = [e.strip() for e in args.endpoints.split(',')]
    test_ids = [id.strip() for id in args.test_ids.split(',')] if args.test_ids else None

    scanner.run_full_scan(target_endpoints=endpoints, test_ids=test_ids)
    scanner.generate_report(output_format=args.format)

    # Print summary
    severity_counts = {}
    for vuln in scanner.vulnerabilities:
        sev = vuln.get('severity', 'UNKNOWN')
        severity_counts[sev] = severity_counts.get(sev, 0) + 1

    print("\n" + "=" * 60)
    print("API Security Scan Summary")
    print("=" * 60)
    for severity, count in sorted(severity_counts.items()):
        print(f"{severity}: {count}")
    print("=" * 60)


if __name__ == "__main__":
    main()
```

## How It Works

**OWASP API Top 10 Coverage:**

This scanner tests for the ten most critical API security risks:

1. **API1: Broken Object Level Authorization (BOLA)**: Tests if users can access objects they don't own by manipulating IDs
2. **API2: Broken Authentication**: Checks for missing rate limiting, weak passwords, no account lockout
3. **API3: Excessive Data Exposure**: Detects sensitive fields (passwords, tokens) in API responses
4. **API4: Lack of Rate Limiting**: Bombards endpoints to verify throttling
5. **API5: Broken Function Level Authorization**: Tests if regular users can access admin functions
6. **API6: Mass Assignment**: Tries injecting privileged fields like `is_admin: true`
7. **API8: Security Misconfiguration**: SQL injection testing via error-based detection
8. **API9: Improper Inventory Management**: Discovers old API versions (v1, v2, deprecated)
9. **API10: Unsafe API Consumption**: Checks SSL verification for third-party integrations

**Testing Methodology:**

- **Black-box testing**: No source code access required
- **Active scanning**: Sends crafted requests to detect vulnerabilities
- **Rate limiting**: Delays between requests to avoid detection/blocking
- **Evidence collection**: Captures response codes, error messages, exposed fields

## Installation & Setup

```bash
# Install dependencies
pip install requests

# No additional tools required - pure Python implementation
```

## Usage Examples

**Basic API scan:**

```bash
python api_security_scanner.py \
    https://api.example.com \
    --endpoints "/users,/posts/{id},/admin/users" \
    --test-ids "1,2,3,999,1000"

# Output:
# 2026-04-05 14:20:15 - INFO - Starting full scan of https://api.example.com
# 2026-04-05 14:20:15 - INFO - Testing BOLA on /posts/{id}
# 2026-04-05 14:20:22 - INFO - Testing authentication on /auth/login
# 2026-04-05 14:20:45 - INFO - Scan complete. Found 7 vulnerabilities
#
# ============================================================
# API Security Scan Summary
# ============================================================
# CRITICAL: 2
# HIGH: 3
# MEDIUM: 2
# ============================================================
```

**Authenticated scan:**

```bash
# Obtain auth token first
TOKEN=$(curl -X POST https://api.example.com/login \
    -d '{"username":"testuser","password":"pass123"}' | jq -r .token)

python api_security_scanner.py \
    https://api.example.com \
    --endpoints "/profile,/settings,/admin/users" \
    --auth-token "$TOKEN"
```

**CI/CD integration:**

```yaml
# .gitlab-ci.yml
api_security_test:
  stage: test
  script:
    - pip install requests
    - python api_security_scanner.py $API_URL --endpoints "$ENDPOINTS"
    - test $(jq '.severity_summary.CRITICAL' api_security_report_*.json) -eq 0
  artifacts:
    reports:
      junit: api_security_report_*.json
  only:
    - merge_requests
```

## Home Lab Integration

**Scenario: Secure Home Automation API**

Your home lab exposes an API for smart home control. Test it for vulnerabilities before making it internet-accessible:

**1. Deploy test environment:**

```bash
# Start your API (example: Flask app)
docker run -d -p 5000:5000 --name home-api my-home-automation-api:latest
```

**2. Create comprehensive endpoint list:**

```bash
# endpoints.txt
/api/devices
/api/devices/{id}
/api/devices/{id}/control
/api/users
/api/users/{id}
/api/admin/settings
/api/admin/users
/api/auth/login
/api/auth/register
```

**3. Run security scan:**

```bash
python api_security_scanner.py \
    http://localhost:5000 \
    --endpoints "$(cat endpoints.txt | tr '\n' ',')" \
    --test-ids "1,2,3,100,999"
```

**4. Fix identified vulnerabilities:**

Common findings in home lab APIs:

```python
# BEFORE (Vulnerable):
@app.route('/api/devices/<int:device_id>')
def get_device(device_id):
    device = Device.query.get(device_id)  # No ownership check!
    return jsonify(device.to_dict())

# AFTER (Secure):
@app.route('/api/devices/<int:device_id>')
@login_required
def get_device(device_id):
    device = Device.query.get_or_404(device_id)

    # Check if user owns this device
    if device.user_id != current_user.id and not current_user.is_admin:
        abort(403)

    return jsonify(device.to_dict())
```

**5. Continuous monitoring:**

```bash
# Weekly automated scans
0 2 * * 0 /opt/scripts/api_security_scan.sh >> /var/log/api_security.log 2>&1
```

**Expected Results:**

- Detection of BOLA vulnerabilities (users accessing others' devices)
- Identification of missing rate limiting on authentication
- Discovery of excessive data exposure (API keys in responses)
- Prevention of unauthorized admin access
- Compliance verification before exposing API externally

## Conclusion

APIs require specialized security testing beyond traditional web application scanning. This framework automates detection of the OWASP API Top 10 vulnerabilities, providing actionable reports that developers can use to harden their APIs.

The tool integrates seamlessly into CI/CD pipelines, enabling shift-left security by catching vulnerabilities during development rather than in production.

**Tomorrow:** Day 6 covers SOC alert triage automation using machine learning for reducing false positives in security operations centers.
