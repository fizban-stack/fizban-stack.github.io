---
layout: detail-page
back_url: /vulnerable-labs
back_text: Back to Vulnerable Labs
breadcrumb_url: /vulnerable-labs
breadcrumb_text: Vulnerable Labs
title: TerraGoat
focus: Terraform security scanning and IaC vulnerabilities
type: Infrastructure as Code
category: Cloud & Infrastructure
description: Bridgecrew's vulnerable-by-design Terraform repository for testing IaC security scanners with AWS, Azure, and GCP misconfigurations.
image: vulnerable-labs/terragoat.webp
github: https://github.com/bridgecrewio/terragoat
website: https://bridgecrew.io/
---

TerraGoat is Bridgecrew's "Vulnerable by Design" Terraform repository, created to test and demonstrate Infrastructure as Code (IaC) security scanning capabilities across AWS, Azure, and GCP.

## Overview

This project contains intentionally misconfigured Terraform code representing real-world security issues found in cloud infrastructure deployments. It's ideal for testing IaC security scanners and learning about cloud infrastructure security.

## Key Features

- **Multi-Cloud Coverage**: AWS, Azure, and Google Cloud Platform
- **100+ Vulnerabilities**: Comprehensive misconfiguration examples
- **Real-World Scenarios**: Based on actual cloud security issues
- **Scanner Testing**: Validate IaC security tools
- **Learning Resource**: Understand cloud security best practices
- **CI/CD Integration**: Test security scanning in pipelines

## Covered Vulnerabilities

### AWS Misconfigurations
- Unencrypted S3 buckets
- Overly permissive IAM policies
- Unencrypted EBS volumes
- Public RDS instances
- Security group misconfigurations
- Unencrypted data stores
- Missing logging and monitoring

### Azure Issues
- Storage account public access
- Unencrypted databases
- Network security group issues
- Missing activity logs
- Weak authentication methods
- Key vault misconfigurations

### GCP Problems
- Public GCS buckets
- Overly permissive service accounts
- Unencrypted storage
- Network exposure
- Missing audit logs
- Weak encryption settings

## Usage

```bash
# Clone the repository
git clone https://github.com/bridgecrewio/terragoat.git
cd terragoat

# Scan with Checkov
pip3 install checkov
checkov -d .

# Scan with Terrascan
terrascan scan

# Scan with KICS
docker run -v $(pwd):/path checkmarx/kics scan -p /path
```

## Learning Objectives

- Understand common IaC misconfigurations
- Learn cloud security best practices
- Test and validate security scanners
- Implement secure Terraform patterns
- Integrate security into DevOps workflows

## Use Cases

- **Tool Testing**: Validate IaC security scanner accuracy
- **Training**: Learn about cloud infrastructure security
- **CI/CD Integration**: Test pipeline security checks
- **Benchmarking**: Compare different security tools
- **Policy Development**: Create custom security policies

## Best Practices

Never deploy TerraGoat to actual cloud environments. Use it only for:
- Local scanner testing
- CI/CD pipeline validation
- Security tool demonstrations
- Educational purposes

## Integration Examples

### GitHub Actions
```yaml
- uses: bridgecrewio/checkov-action@master
  with:
    directory: terraform/
```

### Jenkins Pipeline
```groovy
sh 'checkov -d terraform/ --output junitxml > results.xml'
```

This repository serves as an excellent baseline for testing Infrastructure as Code security tools and learning cloud security fundamentals.
