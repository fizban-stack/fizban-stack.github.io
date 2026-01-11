---
layout: detail-page
back_url: /vulnerable-labs
back_text: Back to Vulnerable Labs
breadcrumb_url: /vulnerable-labs
breadcrumb_text: Vulnerable Labs
title: OWASP WrongSecrets
focus: Secret management anti-patterns
type: Container
category: Cloud & Infrastructure
description: A vulnerable app demonstrating how NOT to store secrets, covering Kubernetes, Docker, AWS, Azure, and GCP with 40+ challenges on proper secret management.
image: vulnerable-labs/wrongsecrets.webp
github: https://github.com/OWASP/wrongsecrets
website: https://owasp.org/www-project-wrongsecrets/
---

OWASP WrongSecrets is a vulnerable application that demonstrates various ways secrets can be stored insecurely and how to fix them. It covers multiple platforms including Kubernetes, Docker, AWS, Azure, and GCP.

## Overview

WrongSecrets teaches secret management through 40+ challenges showing common mistakes developers make when handling sensitive information. Each challenge demonstrates a vulnerability and teaches the secure alternative.

## Key Features

- **40+ Challenges**: Comprehensive secret management scenarios
- **Multi-Platform**: Kubernetes, Docker, cloud providers
- **Hands-On Learning**: Interactive challenge-based approach
- **Real-World Examples**: Based on actual security incidents
- **Solution Guides**: Detailed explanations for each challenge
- **Cloud Native**: Focus on modern infrastructure

## Challenge Categories

### Basic Secrets Anti-Patterns
- Hard-coded secrets in code
- Secrets in configuration files
- Secrets in environment variables
- Base64 "encoding" of secrets
- Secrets in version control
- Secrets in container images

### Cloud-Specific Issues
- AWS Secrets Manager misuse
- Azure Key Vault configuration errors
- GCP Secret Manager mistakes
- IAM/RBAC misconfigurations
- Cloud metadata service abuse

### Kubernetes Secrets
- ConfigMaps for secrets
- Unencrypted etcd storage
- Secrets in pod specifications
- Volume mount issues
- RBAC secret access control

### Advanced Scenarios
- Secret rotation failures
- Encryption key management
- Certificate handling
- Database credentials
- API keys and tokens

## Deployment Options

### Docker
```bash
docker run -p 8080:8080 jeroenwillemsen/wrongsecrets:latest
```

### Kubernetes
```bash
kubectl apply -f https://raw.githubusercontent.com/OWASP/wrongsecrets/master/k8s-vault-minkube.yml
```

### Cloud Platforms
- AWS with EKS
- Azure with AKS
- GCP with GKE

## Learning Path

1. **Start Local**: Docker challenges for basics
2. **Move to Kubernetes**: Platform-specific issues
3. **Cloud Integration**: Provider secret services
4. **Advanced Patterns**: Rotation and lifecycle

## What You'll Learn

- Proper secret storage techniques
- Secret rotation strategies
- Least privilege access
- Encryption best practices
- Audit and monitoring
- Compliance requirements

## Use Cases

- **Developer Training**: Teach secure coding practices
- **Security Audits**: Identify secret management issues
- **Tool Testing**: Validate secret scanning tools
- **Compliance**: Understand regulatory requirements
- **CTF Events**: Security competition scenarios

## Best Practices Taught

- Use dedicated secret management tools
- Never commit secrets to version control
- Implement secret rotation
- Apply least privilege access
- Encrypt secrets at rest and in transit
- Monitor secret access
- Use short-lived credentials where possible

## Tools and Integrations

Compatible with secret scanning tools:
- GitLeaks
- TruffleHog
- detect-secrets
- Checkov
- Cloud provider security scanners

WrongSecrets is essential for anyone working with modern cloud-native applications who needs to understand secret management security.
