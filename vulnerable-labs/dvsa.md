---
layout: vulnerable-lab
title: DVSA
focus: AWS Lambda and serverless security
type: Serverless
category: Cloud & Infrastructure
description: Damn Vulnerable Serverless Application demonstrating serverless-specific vulnerabilities in AWS Lambda, API Gateway, DynamoDB, and other serverless services.
image: vulnerable-labs/dvsa.webp
github: https://github.com/OWASP/DVSA
website: https://github.com/OWASP/DVSA
---

DVSA (Damn Vulnerable Serverless Application) is an OWASP project demonstrating security vulnerabilities specific to serverless architectures on AWS.

## Overview

DVSA showcases common security issues found in serverless applications, helping developers and security professionals understand serverless-specific attack vectors.

## AWS Services Used

- AWS Lambda
- API Gateway
- DynamoDB
- S3
- IAM
- CloudWatch

## Vulnerability Categories

### Function-Level Issues
- Injection in Lambda functions
- Excessive permissions
- Insecure dependencies
- Secrets in environment variables

### API Gateway Issues
- Broken authentication
- Missing rate limiting
- Insecure endpoints
- CORS misconfigurations

### Data Storage
- Unencrypted DynamoDB tables
- Public S3 buckets
- Excessive IAM permissions
- Data exposure

### Event-Driven Vulnerabilities
- Event injection
- Asynchronous security issues
- Trigger misconfigurations

## Deployment

```bash
git clone https://github.com/OWASP/DVSA
cd DVSA
serverless deploy
```

## Learning Objectives

- Understand serverless security model
- Identify serverless-specific vulnerabilities
- Learn secure serverless patterns
- Practice AWS security
- Master function security

## Use Cases

- Serverless security training
- AWS Lambda security testing
- Security tool development
- Cloud security research
- Certification preparation

Essential for anyone working with serverless architectures and cloud-native applications.
