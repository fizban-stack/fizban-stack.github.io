---
layout: detail-page
back_url: /vulnerable-labs
back_text: Back to Vulnerable Labs
breadcrumb_url: /vulnerable-labs
breadcrumb_text: Vulnerable Labs
title: DVSA - Damn Vulnerable Serverless Application
focus: AWS serverless security and Lambda exploitation
type: Serverless
category: Cloud & Infrastructure
description: OWASP project demonstrating serverless-specific vulnerabilities in AWS Lambda, API Gateway, DynamoDB, and S3 with 10 hands-on lessons.
image: vulnerable-labs/dvsa.webp
github: https://github.com/OWASP/DVSA
website: https://owasp.org/www-project-dvsa/
---

DVSA (Damn Vulnerable Serverless Application) is an OWASP project created to demonstrate security vulnerabilities specific to serverless architectures on AWS, providing hands-on experience with serverless security testing.

## Overview

DVSA is a deliberately vulnerable application designed to help security professionals test their skills and tools in a legal environment, help developers better understand the processes of securing serverless applications, and aid students and teachers in learning about serverless application security in a controlled classroom environment.

The application includes both documented and undocumented vulnerabilities, encouraging users to discover as many security issues as possible while learning about the unique attack surface of serverless architectures.

## Key Features

- **10 Hands-On Lessons**: Structured learning modules covering event injection through monitoring evasion
- **Real AWS Services**: Actual Lambda, API Gateway, DynamoDB, S3, and Cognito components
- **Documented & Hidden Vulnerabilities**: Multiple difficulty levels
- **One-Click Deployment**: Available via AWS Serverless Application Repository
- **Educational Focus**: Classroom and self-study ready
- **Tool Testing**: Validate serverless security scanners

## Technology Stack

- **Compute**: AWS Lambda, Lambda Layers
- **API**: API Gateway (HTTP, REST, WebSocket)
- **Storage**: DynamoDB, S3, Parameter Store
- **Identity**: IAM, Cognito
- **Monitoring**: CloudWatch, X-Ray

## Getting Started

```bash
# Via Serverless Framework
git clone https://github.com/OWASP/DVSA.git
cd DVSA
npm install -g serverless
npm install
serverless deploy

# Or deploy via AWS Serverless Application Repository
# Search for "OWASP-DVSA" in the AWS Console
```

## Vulnerability Categories

- Event Injection (API Gateway, Lambda, SNS/SQS, S3)
- Command Injection and Code Injection in Lambda
- NoSQL Injection (DynamoDB)
- Overly Permissive IAM Roles and Wildcard Permissions
- Insecure Dependencies and Supply Chain Attacks
- Hard-coded Credentials and Plaintext Secrets
- Broken Authentication and JWT Vulnerabilities
- CORS Misconfiguration and Resource Policy Bypass
- Missing Rate Limits and DoS Vulnerabilities
- Public S3 Buckets and File Upload Exploitation
- Unencrypted DynamoDB Tables
- Trigger Misconfigurations and Race Conditions
- Insecure Deployment Packages and CI/CD Issues
- CloudWatch Log Injection and Monitoring Bypass

## Use Cases

- **Serverless Security Training**: Hands-on labs for AWS serverless security
- **Penetration Testing Practice**: Practice serverless assessment methodology
- **Tool Validation**: Test and evaluate serverless security scanners
- **Developer Training**: Learn secure serverless development patterns
- **Certification Preparation**: AWS security certification prep
