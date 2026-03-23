---
layout: post
title: "10 Days of Python Security: Day 8 - Phishing Simulation Platform"
date: 2026-02-23
category: Python Security
author: James Wells
---

## Project Overview

Phishing remains the #1 initial access vector in cyber attacks. Security awareness training is ineffective without realistic testing. This project builds a phishing simulation platform that sends crafted emails, hosts convincing landing pages, tracks user interactions, and generates detailed reports on organizational susceptibility.

Using Flask for web serving, smtplib for email delivery, and Jinja2 for template rendering, this system creates ethical phishing campaigns to identify high-risk users and measure training effectiveness over time.

## The Code

```python
#!/usr/bin/env python3
"""
Phishing Simulation Platform
Ethical phishing campaigns for security awareness training
"""

import argparse
import hashlib
import logging
import os
import smtplib
import sqlite3
from datetime import datetime
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, List
from flask import Flask, request, render_template_string, redirect
from jinja2 import Template

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = Flask(__name__)


class PhishingSimulator:
    """Phishing campaign simulator"""

    def __init__(self, db_path: str = 'phishing_sim.db'):
        self.db_path = db_path
        self._init_database()

    def _init_database(self):
        """Initialize SQLite database"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()

        cursor.execute('''
            CREATE TABLE IF NOT EXISTS campaigns (
                campaign_id TEXT PRIMARY KEY,
                name TEXT,
                template TEXT,
                created_at TIMESTAMP,
                status TEXT
            )
        ''')

        cursor.execute('''
            CREATE TABLE IF NOT EXISTS targets (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                campaign_id TEXT,
                email TEXT,
                name TEXT,
                token TEXT UNIQUE,
                FOREIGN KEY (campaign_id) REFERENCES campaigns (campaign_id)
            )
        ''')

        cursor.execute('''
            CREATE TABLE IF NOT EXISTS interactions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                token TEXT,
                event_type TEXT,
                timestamp TIMESTAMP,
                ip_address TEXT,
                user_agent TEXT,
                FOREIGN KEY (token) REFERENCES targets (token)
            )
        ''')

        conn.commit()
        conn.close()

    def generate_token(self, email: str, campaign_id: str) -> str:
        """Generate unique tracking token"""
        data = f"{email}{campaign_id}{datetime.now().isoformat()}"
        return hashlib.sha256(data.encode()).hexdigest()[:16]

    def create_campaign(
        self,
        campaign_id: str,
        name: str,
        template: str
    ):
        """Create new phishing campaign"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()

        cursor.execute('''
            INSERT INTO campaigns (campaign_id, name, template, created_at, status)
            VALUES (?, ?, ?, ?, ?)
        ''', (campaign_id, name, template, datetime.now(), 'active'))

        conn.commit()
        conn.close()

        logger.info(f"Created campaign: {name} ({campaign_id})")

    def add_target(
        self,
        campaign_id: str,
        email: str,
        name: str
    ):
        """Add target to campaign"""
        token = self.generate_token(email, campaign_id)

        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()

        cursor.execute('''
            INSERT INTO targets (campaign_id, email, name, token)
            VALUES (?, ?, ?, ?)
        ''', (campaign_id, email, name, token))

        conn.commit()
        conn.close()

        return token

    def log_interaction(
        self,
        token: str,
        event_type: str,
        ip_address: str = '',
        user_agent: str = ''
    ):
        """Log user interaction"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()

        cursor.execute('''
            INSERT INTO interactions (token, event_type, timestamp, ip_address, user_agent)
            VALUES (?, ?, ?, ?, ?)
        ''', (token, event_type, datetime.now(), ip_address, user_agent))

        conn.commit()
        conn.close()

        logger.info(f"Logged {event_type} for token {token}")

    def send_phishing_email(
        self,
        target_email: str,
        target_name: str,
        token: str,
        template: str,
        smtp_config: Dict,
        landing_url: str
    ):
        """Send phishing email to target"""

        # Render email template
        email_template = Template(template)
        tracking_link = f"{landing_url}?t={token}"

        email_body = email_template.render(
            name=target_name,
            link=tracking_link
        )

        # Create email message
        msg = MIMEMultipart('alternative')
        msg['Subject'] = self._extract_subject(template)
        msg['From'] = smtp_config['from_address']
        msg['To'] = target_email

        html_part = MIMEText(email_body, 'html')
        msg.attach(html_part)

        # Send email
        try:
            with smtplib.SMTP(smtp_config['server'], smtp_config['port']) as server:
                if smtp_config.get('use_tls'):
                    server.starttls()

                if smtp_config.get('username'):
                    server.login(
                        smtp_config['username'],
                        smtp_config['password']
                    )

                server.send_message(msg)

            logger.info(f"Sent phishing email to {target_email}")
            self.log_interaction(token, 'email_sent')

        except Exception as e:
            logger.error(f"Failed to send email to {target_email}: {e}")

    def _extract_subject(self, template: str) -> str:
        """Extract subject line from template"""
        # Simple extraction - in production use structured templates
        if '<title>' in template:
            start = template.find('<title>') + 7
            end = template.find('</title>')
            return template[start:end]
        return "Important Security Update"

    def launch_campaign(
        self,
        campaign_id: str,
        targets: List[Dict],
        smtp_config: Dict,
        landing_url: str
    ):
        """Launch full phishing campaign"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()

        cursor.execute(
            'SELECT template FROM campaigns WHERE campaign_id = ?',
            (campaign_id,)
        )
        result = cursor.fetchone()
        conn.close()

        if not result:
            logger.error(f"Campaign {campaign_id} not found")
            return

        template = result[0]

        for target in targets:
            token = self.add_target(
                campaign_id,
                target['email'],
                target['name']
            )

            self.send_phishing_email(
                target['email'],
                target['name'],
                token,
                template,
                smtp_config,
                landing_url
            )

        logger.info(f"Launched campaign {campaign_id} to {len(targets)} targets")

    def generate_report(self, campaign_id: str) -> Dict:
        """Generate campaign statistics report"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()

        # Total targets
        cursor.execute(
            'SELECT COUNT(*) FROM targets WHERE campaign_id = ?',
            (campaign_id,)
        )
        total_targets = cursor.fetchone()[0]

        # Interaction stats
        stats = {
            'total_targets': total_targets,
            'emails_sent': 0,
            'emails_opened': 0,
            'links_clicked': 0,
            'credentials_submitted': 0,
            'click_rate': 0.0,
            'submission_rate': 0.0
        }

        for event_type in ['email_sent', 'email_opened', 'link_clicked', 'credentials_submitted']:
            cursor.execute('''
                SELECT COUNT(DISTINCT token)
                FROM interactions
                WHERE event_type = ?
                AND token IN (SELECT token FROM targets WHERE campaign_id = ?)
            ''', (event_type, campaign_id))

            count = cursor.fetchone()[0]
            stats[event_type] = count

        # Calculate rates
        if stats['emails_sent'] > 0:
            stats['click_rate'] = (stats['links_clicked'] / stats['emails_sent']) * 100
            stats['submission_rate'] = (stats['credentials_submitted'] / stats['emails_sent']) * 100

        # High-risk users (clicked and submitted)
        cursor.execute('''
            SELECT DISTINCT t.email, t.name
            FROM targets t
            JOIN interactions i ON t.token = i.token
            WHERE t.campaign_id = ?
            AND i.event_type = 'credentials_submitted'
        ''', (campaign_id,))

        stats['high_risk_users'] = [
            {'email': row[0], 'name': row[1]}
            for row in cursor.fetchall()
        ]

        conn.close()

        return stats


# Flask routes for landing pages
simulator = PhishingSimulator()


@app.route('/track')
def track_pixel():
    """Invisible tracking pixel for email opens"""
    token = request.args.get('t')

    if token:
        simulator.log_interaction(
            token,
            'email_opened',
            request.remote_addr,
            request.headers.get('User-Agent', '')
        )

    # Return 1x1 transparent GIF
    from flask import Response
    gif = b'GIF89a\x01\x00\x01\x00\x80\x00\x00\x00\x00\x00\xff\xff\xff!\xf9\x04\x01\x00\x00\x00\x00,\x00\x00\x00\x00\x01\x00\x01\x00\x00\x02\x02D\x01\x00;'
    return Response(gif, mimetype='image/gif')


@app.route('/landing')
def landing_page():
    """Phishing landing page"""
    token = request.args.get('t')

    if token:
        simulator.log_interaction(
            token,
            'link_clicked',
            request.remote_addr,
            request.headers.get('User-Agent', '')
        )

    # Realistic Office 365 login page
    page_html = '''
<!DOCTYPE html>
<html>
<head>
    <title>Microsoft Office 365 - Sign In</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f3f2f1;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .login-box {
            background: white;
            padding: 40px;
            border-radius: 2px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.2);
            width: 400px;
        }
        .logo {
            text-align: center;
            margin-bottom: 30px;
        }
        h1 {
            font-size: 24px;
            font-weight: 400;
            margin-bottom: 10px;
        }
        input {
            width: 100%;
            padding: 12px;
            margin: 10px 0;
            border: 1px solid #8a8886;
            box-sizing: border-box;
            font-size: 14px;
        }
        button {
            width: 100%;
            padding: 12px;
            background-color: #0078d4;
            color: white;
            border: none;
            font-size: 15px;
            cursor: pointer;
        }
        button:hover {
            background-color: #106ebe;
        }
    </style>
</head>
<body>
    <div class="login-box">
        <div class="logo">
            <svg width="108" height="24" viewBox="0 0 108 24"><path fill="#f25022" d="M0 0h11.377v11.372H0z"/><path fill="#00a4ef" d="M12.623 0H24v11.372H12.623z"/><path fill="#7fba00" d="M0 12.623h11.377V24H0z"/><path fill="#ffb900" d="M12.623 12.623H24V24H12.623z"/></svg>
        </div>
        <h1>Sign in</h1>
        <p>to continue to Outlook</p>
        <form action="/submit" method="post">
            <input type="hidden" name="token" value="{{ token }}">
            <input type="email" name="username" placeholder="Email, phone, or Skype" required>
            <input type="password" name="password" placeholder="Password" required>
            <button type="submit">Sign in</button>
        </form>
        <p style="font-size: 12px; color: #605e5c; margin-top: 20px;">
            This is a security awareness training exercise. No credentials are stored.
        </p>
    </div>
</body>
</html>
    '''

    return render_template_string(page_html, token=token)


@app.route('/submit', methods=['POST'])
def submit_credentials():
    """Handle credential submission"""
    token = request.form.get('token')
    username = request.form.get('username')

    if token:
        simulator.log_interaction(
            token,
            'credentials_submitted',
            request.remote_addr,
            request.headers.get('User-Agent', '')
        )

    # Redirect to education page
    return redirect('/awareness')


@app.route('/awareness')
def awareness_page():
    """Security awareness education page"""
    html = '''
<!DOCTYPE html>
<html>
<head>
    <title>Security Awareness Alert</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            background-color: #fff3cd;
            border: 2px solid #ffc107;
            border-radius: 5px;
        }
        h1 { color: #856404; }
        .warning { color: #d32f2f; font-weight: bold; }
    </style>
</head>
<body>
    <h1>⚠️ You Just Fell for a Phishing Simulation</h1>
    <p class="warning">This was a security awareness training exercise.</p>

    <h2>What Happened?</h2>
    <p>You clicked a link in an email and entered credentials on a fake login page. In a real phishing attack, attackers would now have access to your account.</p>

    <h2>How to Identify Phishing:</h2>
    <ul>
        <li>Check sender email address carefully</li>
        <li>Hover over links before clicking (don't match domain?)</li>
        <li>Look for urgency/pressure tactics</li>
        <li>Verify unexpected requests via separate channel</li>
        <li>Check for spelling/grammar errors</li>
    </ul>

    <h2>What to Do If You Suspect Phishing:</h2>
    <ol>
        <li>Do not click links or download attachments</li>
        <li>Report to IT security team immediately</li>
        <li>If you already clicked, change your password now</li>
    </ol>

    <p><strong>Remember:</strong> IT will never ask for your password via email.</p>
</body>
</html>
    '''
    return html


def main():
    parser = argparse.ArgumentParser(
        description="Phishing Simulation Platform"
    )

    subparsers = parser.add_subparsers(dest='command', help='Commands')

    # Create campaign
    create_parser = subparsers.add_parser('create', help='Create new campaign')
    create_parser.add_argument('--name', required=True)
    create_parser.add_argument('--template-file', required=True)

    # Launch campaign
    launch_parser = subparsers.add_parser('launch', help='Launch campaign')
    launch_parser.add_argument('--campaign-id', required=True)
    launch_parser.add_argument('--targets-file', required=True, help='JSON file with targets')
    launch_parser.add_argument('--smtp-server', required=True)
    launch_parser.add_argument('--smtp-port', type=int, default=587)
    launch_parser.add_argument('--smtp-user', required=True)
    launch_parser.add_argument('--smtp-password', required=True)
    launch_parser.add_argument('--from-address', required=True)
    launch_parser.add_argument('--landing-url', required=True)

    # Generate report
    report_parser = subparsers.add_parser('report', help='Generate campaign report')
    report_parser.add_argument('--campaign-id', required=True)

    # Start web server
    server_parser = subparsers.add_parser('server', help='Start landing page server')
    server_parser.add_argument('--port', type=int, default=8080)

    args = parser.parse_args()

    sim = PhishingSimulator()

    if args.command == 'create':
        with open(args.template_file, 'r') as f:
            template = f.read()

        campaign_id = hashlib.md5(args.name.encode()).hexdigest()[:8]
        sim.create_campaign(campaign_id, args.name, template)
        print(f"Campaign created: {campaign_id}")

    elif args.command == 'launch':
        import json
        with open(args.targets_file, 'r') as f:
            targets = json.load(f)

        smtp_config = {
            'server': args.smtp_server,
            'port': args.smtp_port,
            'username': args.smtp_user,
            'password': args.smtp_password,
            'from_address': args.from_address,
            'use_tls': True
        }

        sim.launch_campaign(
            args.campaign_id,
            targets,
            smtp_config,
            args.landing_url
        )

    elif args.command == 'report':
        stats = sim.generate_report(args.campaign_id)

        print("\n=== Campaign Report ===")
        print(f"Total Targets: {stats['total_targets']}")
        print(f"Emails Sent: {stats['emails_sent']}")
        print(f"Emails Opened: {stats['emails_opened']}")
        print(f"Links Clicked: {stats['links_clicked']}")
        print(f"Credentials Submitted: {stats['credentials_submitted']}")
        print(f"\nClick Rate: {stats['click_rate']:.1f}%")
        print(f"Submission Rate: {stats['submission_rate']:.1f}%")
        print(f"\nHigh-Risk Users: {len(stats['high_risk_users'])}")

        for user in stats['high_risk_users']:
            print(f"  - {user['name']} ({user['email']})")

    elif args.command == 'server':
        logger.info(f"Starting landing page server on port {args.port}")
        app.run(host='0.0.0.0', port=args.port, debug=False)


if __name__ == "__main__":
    main()
```

## How It Works

**Campaign Workflow:**

1. **Create Campaign**: Load email template with placeholders for personalization
2. **Add Targets**: Import target list with names/emails, generate unique tracking tokens
3. **Send Emails**: SMTP delivery with embedded tracking pixel and personalized link
4. **Track Interactions**: Log email opens (pixel), link clicks (landing page), credential submissions
5. **Generate Reports**: Calculate susceptibility metrics and identify high-risk users

**Tracking Mechanisms:**

- **Email Opens**: Invisible 1x1 GIF image loaded when email viewed
- **Link Clicks**: Unique token in URL parameters
- **Credential Submission**: Form POST to `/submit` endpoint
- **User Data**: IP address and User-Agent logged for analysis

**Landing Page Design:**

Realistic Office 365 login page mimicking:
- Microsoft branding and color scheme
- Authentic input field styling
- "Sign in" workflow UX
- Immediate redirect to awareness education upon submission

## Installation & Setup

```bash
# Install dependencies
pip install flask

# Create email template
cat > phishing_template.html << 'EOF'
<html>
<head><title>Urgent: Account Security Alert</title></head>
<body>
    <p>Dear {{ name }},</p>

    <p>We've detected suspicious activity on your account. Please verify your identity immediately to prevent account suspension.</p>

    <p><a href="{{ link }}">Click here to verify your account</a></p>

    <p>This link expires in 24 hours.</p>

    <p>Thank you,<br>IT Security Team</p>

    <img src="http://your-server.com/track?t={{ link.split('=')[1] }}" width="1" height="1">
</body>
</html>
EOF

# Create targets file
cat > targets.json << 'EOF'
[
  {"name": "John Doe", "email": "john.doe@example.com"},
  {"name": "Jane Smith", "email": "jane.smith@example.com"}
]
EOF
```

## Usage Examples

**Create phishing campaign:**

```bash
python phishing_simulator.py create \
    --name "Q1 2026 Security Awareness Test" \
    --template-file phishing_template.html

# Output: Campaign created: a3f5b2c1
```

**Start landing page server:**

```bash
python phishing_simulator.py server --port 8080

# Server running at http://localhost:8080
# Landing page: http://localhost:8080/landing?t=TOKEN
```

**Launch campaign:**

```bash
python phishing_simulator.py launch \
    --campaign-id a3f5b2c1 \
    --targets-file targets.json \
    --smtp-server smtp.gmail.com \
    --smtp-port 587 \
    --smtp-user your-email@gmail.com \
    --smtp-password "app-password" \
    --from-address "IT Security <security@yourcompany.com>" \
    --landing-url "http://your-server.com/landing"
```

**Generate campaign report:**

```bash
python phishing_simulator.py report --campaign-id a3f5b2c1

# Output:
# === Campaign Report ===
# Total Targets: 50
# Emails Sent: 50
# Emails Opened: 42
# Links Clicked: 18
# Credentials Submitted: 7
#
# Click Rate: 36.0%
# Submission Rate: 14.0%
#
# High-Risk Users: 7
#   - John Doe (john.doe@example.com)
#   - Jane Smith (jane.smith@example.com)
```

## Home Lab Integration

**Scenario: Internal Security Awareness Training**

Test your family members or team's phishing awareness:

**1. Setup local SMTP server (for testing):**

```bash
# Python debug SMTP server
python3 -m smtpd -n -c DebuggingServer localhost:1025
```

**2. Deploy with Docker:**

```dockerfile
FROM python:3.11-slim

RUN pip install flask

COPY phishing_simulator.py /app/
COPY phishing_template.html /app/

WORKDIR /app

CMD ["python", "phishing_simulator.py", "server", "--port", "8080"]
```

**3. Run quarterly campaigns:**

```bash
# Q1 2026 Campaign
./create_campaign.sh "Q1-2026" "targets_q1.json"

# Compare results over time to measure training effectiveness
```

**4. Integrate with awareness training:**

After each failed simulation, automatically enroll user in training module:

```python
# Add to awareness_page() route
def enroll_in_training(email):
    # Send training course link
    send_email(
        email,
        "Required: Security Awareness Training",
        "Please complete this 10-minute course: https://training.company.com/phishing-101"
    )
```

**Expected Results:**

- Baseline phishing susceptibility: 30-40% click rate, 10-15% credential submission
- After 3 quarterly campaigns with training: <10% click rate, <3% submission
- Identification of high-risk users requiring additional training
- Measurable ROI on security awareness programs
- Compliance evidence for audits (NIST, ISO 27001)

## Conclusion

Phishing simulations are essential for measuring and improving organizational security culture. This platform provides the core functionality needed for ethical phishing campaigns: realistic email templates, credential harvesting tracking, and comprehensive reporting.

**Important Ethics Note:** Only conduct phishing simulations with explicit authorization from organizational leadership. Always inform targets afterward and provide education. Never use these techniques for malicious purposes.

**Tomorrow:** Day 9 covers IoT device security monitoring for detecting vulnerable smart home devices and rogue IoT on your network.
