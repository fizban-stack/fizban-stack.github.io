---
layout: vulnerable-lab
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

- **10 Hands-On Lessons**: Structured learning modules
- **Real AWS Services**: Actual serverless components
- **Documented & Hidden Vulnerabilities**: Multiple difficulty levels
- **AWS Serverless Application Repository**: One-click deployment
- **Educational Focus**: Classroom and self-study ready
- **Tool Testing**: Validate serverless security tools

## AWS Services Used

### Compute
- **AWS Lambda**: Serverless functions with vulnerabilities
- **Lambda Layers**: Dependency management issues

### API Layer
- **API Gateway**: HTTP and REST APIs with security flaws
- **WebSocket APIs**: Real-time communication vulnerabilities

### Data Storage
- **DynamoDB**: NoSQL database with access control issues
- **S3**: Object storage with permission problems
- **Parameter Store**: Secrets management vulnerabilities

### Security & Identity
- **IAM**: Overly permissive roles and policies
- **Cognito**: Authentication and authorization flaws

### Monitoring
- **CloudWatch**: Logging and monitoring gaps
- **X-Ray**: Distributed tracing issues

## Covered Vulnerabilities

### Serverless-Specific Vulnerabilities

#### Event Injection
- **API Gateway Event Injection**: Malicious event data manipulation
- **Lambda Event Manipulation**: Trigger payload exploitation
- **SNS/SQS Message Injection**: Queue poisoning attacks
- **S3 Event Injection**: Object notification exploitation

#### Function-Level Issues

##### Injection Attacks
- **Command Injection**: OS command execution in Lambda
  - File parsing vulnerabilities
  - Filename manipulation
  - Process execution exploitation
- **Code Injection**: Dynamic code evaluation
- **NoSQL Injection**: DynamoDB query manipulation
- **Template Injection**: Server-side template vulnerabilities

##### Excessive Permissions
- **Overly Permissive IAM Roles**: Lambda functions with admin access
- **Cross-Account Access**: Unintended external access
- **Resource-Based Policies**: Misconfigured function policies
- **Wildcard Permissions**: Unrestricted service access

##### Insecure Dependencies
- **Vulnerable NPM Packages**: Outdated dependencies
- **Supply Chain Attacks**: Compromised packages
  - Malicious npm package insertion
  - Secret environment variable extraction
  - API key and credential theft
- **Lambda Layer Vulnerabilities**: Shared code issues

##### Secrets Management
- **Environment Variables**: Hard-coded credentials
- **Plaintext Secrets**: Unencrypted sensitive data
- **CloudWatch Logs Exposure**: Leaked secrets in logs
- **Function Code Exposure**: Credentials in deployment packages

### API Gateway Vulnerabilities

#### Authentication & Authorization
- **Broken Authentication**: Weak or missing auth
- **Missing Authorization**: Unprotected endpoints
- **JWT Vulnerabilities**: Token manipulation
- **API Key Leakage**: Exposed API keys
- **Cognito Misconfigurations**: Identity pool issues

#### Access Control
- **CORS Misconfiguration**: Overly permissive origins
- **Resource Policy Bypass**: Unrestricted access
- **Stage Variable Exploitation**: Configuration manipulation
- **Path Traversal**: Endpoint enumeration

#### Rate Limiting & Throttling
- **Missing Rate Limits**: Unlimited API calls
- **DoS Vulnerabilities**: Resource exhaustion
- **Cost Exploitation**: Budget attacks

### Data Storage Vulnerabilities

#### DynamoDB Security
- **Unencrypted Tables**: Data at rest not encrypted
- **Overly Permissive Access**: Unrestricted read/write
- **NoSQL Injection**: Query manipulation
- **Missing Encryption**: Unprotected sensitive data
- **IAM Policy Issues**: Excessive table permissions

#### S3 Security
- **Public Buckets**: Unrestricted access
- **File Upload Vulnerabilities**: Malicious file uploads
  - Feedback form file upload exploitation
  - Filename parsing vulnerabilities
  - Content-type bypass
- **Presigned URL Abuse**: URL expiration issues
- **Object ACL Problems**: Misconfigured permissions

### Asynchronous Security Issues

#### Event-Driven Vulnerabilities
- **Trigger Misconfigurations**: Unvalidated event sources
- **Message Queue Poisoning**: SNS/SQS exploitation
- **Stream Processing Issues**: Kinesis/DynamoDB Streams
- **Race Conditions**: Concurrent execution problems

#### Cold Start Exploitation
- **Initialization Vulnerabilities**: First-run issues
- **Global Variable Persistence**: State management flaws
- **Connection Reuse**: Security context leakage

### Infrastructure Vulnerabilities

#### Deployment Security
- **Insecure Deployment Packages**: Code exposure
- **Version Control Leakage**: Git secrets
- **Template Injection**: SAM/CloudFormation issues
- **Build Pipeline Vulnerabilities**: CI/CD security

#### Monitoring & Logging
- **Insufficient Logging**: Missing security events
- **CloudWatch Log Injection**: Log poisoning
- **X-Ray Data Leakage**: Sensitive data in traces
- **Metrics Manipulation**: Monitoring bypass

## Deployment

### AWS Serverless Application Repository (Recommended)

```bash
# Deploy via AWS Console
# Navigate to: https://serverlessrepo.aws.amazon.com/applications
# Search for: OWASP-DVSA
# Click Deploy

# Or use AWS CLI
aws serverlessrepo create-cloud-formation-change-set \
  --application-id arn:aws:serverlessrepo:us-east-1:674087993380:applications/OWASP-DVSA \
  --stack-name dvsa-stack

aws cloudformation execute-change-set \
  --change-set-name <change-set-name>
```

### Serverless Framework

```bash
# Prerequisites: Node.js, AWS CLI configured

# Clone repository
git clone https://github.com/OWASP/DVSA.git
cd DVSA

# Install Serverless Framework
npm install -g serverless

# Install dependencies
npm install

# Deploy to AWS
serverless deploy

# Note the API Gateway endpoint from output
```

### Manual CloudFormation

```bash
# Use AWS CloudFormation console
# Upload the template.yaml file
# Configure stack parameters
# Create stack
```

## 10 Lessons Included

The application provides structured lessons covering:

1. **Event Injection Basics**: API Gateway manipulation
2. **Command Injection**: Lambda function exploitation
3. **IAM Privilege Escalation**: Role assumption attacks
4. **S3 Misconfigurations**: Bucket security issues
5. **DynamoDB Injection**: NoSQL query attacks
6. **Secrets Exposure**: Environment variable leakage
7. **Supply Chain Attacks**: Dependency vulnerabilities
8. **API Gateway Bypass**: Authentication circumvention
9. **File Upload Exploitation**: S3 upload vulnerabilities
10. **Monitoring Evasion**: Logging bypass techniques

## Security Tool Integration

### AWS Security Tools

#### Detection Tools
- **Amazon Inspector**: Identifies critical vulnerabilities
  - Package dependency scanning
  - Custom code analysis
  - Successfully detects DVSA issues
- **AWS GuardDuty**: Threat detection
- **AWS Config**: Compliance checking
- **CloudTrail**: Audit logging

#### Protection Tools
- **AWS WAF**: Web application firewall
  - Limited effectiveness with default rules
  - Cannot block all JavaScript injections
  - Requires custom rules for serverless
- **AWS Shield**: DDoS protection
- **AWS Secrets Manager**: Credential management

### Third-Party Tools
- **Serverless Security Scanners**: PureSec, Protego
- **SAST Tools**: Static code analysis
- **Container Security**: Lambda container scanning
- **IaC Scanners**: Checkov, Terrascan

## Learning Objectives

### Understanding Serverless Security
- Serverless architecture unique risks
- AWS Lambda security model
- Event-driven security concerns
- Shared responsibility model

### Vulnerability Identification
- Recognize serverless-specific flaws
- Identify misconfigured IAM policies
- Detect injection vulnerabilities
- Find data exposure issues

### Secure Development
- Implement least privilege IAM
- Secure secrets management
- Input validation for events
- Proper error handling

### Tool Proficiency
- Use AWS security services
- Evaluate serverless scanners
- Perform security assessments
- Automate security testing

## Use Cases

### Security Training
- **Serverless Security Courses**: Hands-on labs
- **AWS Security Workshops**: Practical exercises
- **Developer Training**: Secure serverless development
- **Security Awareness**: Demonstrate serverless risks

### Professional Development
- **Penetration Testing**: Practice serverless assessment
- **Cloud Security Certification**: AWS security prep
- **Bug Bounty**: Serverless vulnerability hunting
- **Security Research**: Understand attack vectors

### Tool Development & Testing
- **Scanner Validation**: Test serverless security tools
- **AWS WAF Rules**: Develop custom protections
- **Automated Testing**: CI/CD security integration
- **Policy Development**: Create security baselines

## Best Practices Taught

### IAM Security
- Principle of least privilege
- Function-specific roles
- Resource-based policies
- Cross-account access controls

### Secrets Management
- Use AWS Secrets Manager
- Encrypt environment variables
- Rotate credentials regularly
- Avoid logging secrets

### Input Validation
- Validate all event data
- Sanitize user inputs
- Implement allowlisting
- Use schema validation

### Monitoring & Logging
- Enable CloudTrail
- Use CloudWatch Logs
- Implement X-Ray tracing
- Set up security alerts

## Important Security Warnings

⚠️ **DO NOT deploy DVSA to production environments**

- Use dedicated AWS account for testing
- Never deploy to accounts with valuable resources
- Delete the resource stack after experimenting
- Monitor AWS costs during testing
- Restrict network access appropriately
- Use temporary AWS credentials

## Cleanup

```bash
# Serverless Framework
serverless remove

# CloudFormation
aws cloudformation delete-stack --stack-name dvsa-stack

# Verify deletion
aws cloudformation describe-stacks --stack-name dvsa-stack
```

## What Makes DVSA Special

1. **Serverless Focus**: Only AWS Lambda/serverless vulnerabilities
2. **OWASP Project**: Official OWASP backing
3. **Structured Learning**: 10 organized lessons
4. **Real AWS Services**: Production-like environment
5. **Easy Deployment**: AWS Serverless Application Repository
6. **Educational Design**: Classroom-ready format
7. **Tool Testing**: Validate security scanner effectiveness

DVSA provides an essential platform for understanding the unique security challenges of serverless architectures, making it invaluable for anyone working with AWS Lambda and serverless applications.
