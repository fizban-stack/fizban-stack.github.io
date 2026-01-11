---
layout: detail-page
back_url: /vulnerable-labs
back_text: Back to Vulnerable Labs
breadcrumb_url: /vulnerable-labs
breadcrumb_text: Vulnerable Labs
title: AzureGoat
focus: Azure cloud security and penetration testing
type: Cloud
category: Cloud & Infrastructure
description: INE Labs' vulnerable-by-design Azure infrastructure featuring OWASP Top 10 web vulnerabilities, serverless security issues, and Azure-specific attack paths deployed via Terraform.
image: vulnerable-labs/azuregoat.webp
github: https://github.com/ine-labs/AzureGoat
website: https://github.com/ine-labs/AzureGoat
---

AzureGoat is INE Labs' vulnerable-by-design Azure infrastructure created for practicing Azure cloud security, penetration testing, and learning Azure-specific attack techniques in a controlled environment.

## Overview

Similar to CloudGoat for AWS, AzureGoat provides intentionally misconfigured Azure environments deployed through Infrastructure-as-Code (Terraform). It combines OWASP Top 10 web application vulnerabilities with Azure-specific security misconfigurations, offering a comprehensive platform for cloud security training.

The project features a serverless blog application with multiple escalation paths, designed for black-box attack simulation across various Azure components.

## Key Features

- **Infrastructure-as-Code**: Terraform deployment for reproducibility
- **OWASP Top 10 (2021)**: Latest web application vulnerabilities
- **Azure-Specific Scenarios**: Real Azure service misconfigurations
- **Multiple Attack Paths**: Various privilege escalation routes
- **Black-Box Approach**: Realistic penetration testing scenarios
- **Complete Control**: Deploy in your own Azure account
- **Serverless Focus**: Azure Functions exploitation

## Module Structure

### Module 1: Serverless Blog Application

A vulnerable blogging platform demonstrating:
- Web application security flaws
- Serverless function exploitation
- Azure service misconfigurations
- Identity and access management issues
- Multiple privilege escalation paths

## Technology Stack

### Azure Services Used

#### Compute & Serverless
- **Azure Functions**: Serverless computing with vulnerabilities
  - HTTP trigger functions
  - Function app misconfigurations
  - SSRF exploitation
- **Azure App Services**: Web application hosting
- **Azure Automation**: Runbook security issues

#### Storage & Database
- **Storage Accounts**: Blob storage misconfigurations
  - Public access issues
  - SAS token vulnerabilities
  - Storage key exposure
- **CosmosDB**: NoSQL database with access control flaws
- **Azure SQL Database**: Relational database security

#### Identity & Access
- **Azure AD / Entra ID**: Identity misconfigurations
- **Managed Identities**: System and user-assigned identities
- **Service Principals**: Application authentication
- **RBAC**: Role-based access control flaws

#### Security & Secrets
- **Azure Key Vault**: Secrets management issues
- **Application Insights**: Monitoring and logging gaps

### Infrastructure
- **Terraform**: IaC deployment and configuration
- **Azure Resource Manager (ARM)**: Resource management

## Covered Vulnerabilities

### OWASP Top 10 (2021) Coverage

#### 1. Broken Access Control
- **Insecure Direct Object References (IDOR)**: Access unauthorized resources
- **Missing Function-Level Access Control**: Unrestricted admin functions
- **Horizontal Privilege Escalation**: Access other users' data
- **Vertical Privilege Escalation**: Gain higher privileges

#### 2. Cryptographic Failures
- **Sensitive Data Exposure**: Unencrypted data in storage
- **Weak Encryption**: Inadequate cryptographic protection
- **Storage Account Encryption Issues**: Misconfigured encryption
- **Password Storage**: Weak hashing algorithms

#### 3. Injection
- **SQL Injection**: Database query manipulation
- **XSS (Cross-Site Scripting)**: Script injection vulnerabilities
- **Command Injection**: OS command execution
- **LDAP Injection**: Directory service attacks

#### 4. Insecure Design
- **Password Reset Vulnerabilities**: Flawed reset logic
- **Business Logic Flaws**: Workflow exploitation
- **Missing Security Controls**: Absent protective measures

#### 5. Security Misconfiguration
- **Default Credentials**: Unchanged default passwords
- **Unnecessary Features Enabled**: Excessive services
- **Verbose Error Messages**: Information disclosure
- **Missing Security Headers**: Lack of protective headers

#### 6. Vulnerable and Outdated Components
- **Outdated Libraries**: Known CVEs in dependencies
- **Unpatched Services**: Vulnerable Azure services
- **Third-Party Components**: Insecure dependencies

#### 7. Identification and Authentication Failures
- **Weak Password Policies**: Insufficient requirements
- **Session Management Flaws**: Insecure sessions
- **Credential Stuffing**: Brute force vulnerabilities
- **Azure AD Misconfigurations**: Identity issues

#### 8. Software and Data Integrity Failures
- **Insecure CI/CD**: Deployment pipeline vulnerabilities
- **Unsigned Code**: Missing integrity checks
- **Insecure Deserialization**: Object injection

#### 9. Security Logging and Monitoring Failures
- **Insufficient Logging**: Missing audit trails
- **Application Insights Gaps**: Monitoring weaknesses
- **No Alerting**: Lack of security notifications

#### 10. Server-Side Request Forgery (SSRF)
- **Azure Function SSRF**: Internal resource access
- **Metadata Service Access**: Instance metadata exploitation
- **Internal Service Enumeration**: Network mapping

### Azure-Specific Vulnerabilities

#### Identity & Access Management
- **Overly Permissive RBAC**: Excessive role assignments
  - Contributor roles on subscriptions
  - Owner permissions unnecessarily granted
  - Custom roles with wildcards
- **Service Principal Abuse**: Application identity exploitation
- **Managed Identity Exploitation**: System-assigned identity abuse
- **Azure AD Token Theft**: Access token extraction
- **Conditional Access Bypass**: Policy circumvention

#### Storage Account Vulnerabilities
- **Public Blob Containers**: Anonymous read access
- **SAS Token Leakage**: Shared access signature exposure
  - Over-permissive SAS tokens
  - Long-lived tokens
  - Tokens in code/logs
- **Storage Account Key Exposure**: Primary/secondary key leakage
- **Missing Encryption**: Unencrypted data at rest
- **CORS Misconfiguration**: Permissive cross-origin policies

#### Azure Functions Security
- **SSRF in Functions**: Server-side request forgery
- **Function App Authentication Bypass**: Missing authorization
- **Environment Variable Exposure**: Secrets in configuration
- **HTTP Trigger Misconfigurations**: Unprotected endpoints
- **Deployment Package Exposure**: Code disclosure

#### CosmosDB Vulnerabilities
- **Overly Permissive Access**: Unrestricted database access
- **Connection String Exposure**: Credential leakage
- **Missing Encryption**: Unencrypted data
- **NoSQL Injection**: Query manipulation

#### Automation & Runbooks
- **Automation Account Compromise**: Runbook exploitation
- **Credential Store Access**: Stored credential theft
- **Runbook Code Injection**: Malicious script execution
- **Excessive Permissions**: Over-privileged automation

## Deployment

### Prerequisites

```bash
# Azure CLI
az --version

# Terraform
terraform --version

# Active Azure subscription
az account show
```

### Installation Steps

```bash
# Clone repository
git clone https://github.com/ine-labs/AzureGoat.git
cd AzureGoat

# Login to Azure
az login

# Set target subscription
az account set --subscription "<subscription-id>"

# Navigate to module
cd modules/module-1

# Initialize Terraform
terraform init

# Review planned changes
terraform plan

# Deploy infrastructure
terraform apply

# Note outputs for targets and credentials
```

### Post-Deployment

```bash
# Retrieve application URL and credentials from output
terraform output

# Access the vulnerable blog application
# Begin security assessment
```

## Attack Scenarios

### Scenario 1: Initial Access
1. Discover public-facing web application
2. Identify OWASP Top 10 vulnerabilities
3. Exploit SQL injection or XSS
4. Gain initial foothold

### Scenario 2: Credential Discovery
1. Exploit SSRF in Azure Functions
2. Access Azure metadata service
3. Retrieve managed identity tokens
4. Extract sensitive credentials

### Scenario 3: Privilege Escalation
1. Enumerate Azure RBAC assignments
2. Identify overly permissive roles
3. Abuse service principal permissions
4. Escalate to subscription-level access

### Scenario 4: Lateral Movement
1. Access storage account via SAS tokens
2. Discover credentials in blob storage
3. Access CosmosDB with leaked connection string
4. Pivot to additional Azure services

### Scenario 5: Data Exfiltration
1. Access public blob containers
2. Download sensitive data
3. Extract data from CosmosDB
4. Retrieve secrets from Key Vault

## Learning Objectives

### Azure Security Fundamentals
- Understand Azure security architecture
- Learn Azure identity and access management
- Master Azure resource permissions
- Comprehend shared responsibility model

### Penetration Testing Skills
- Practice Azure penetration testing methodology
- Develop cloud-specific attack techniques
- Learn privilege escalation paths
- Master lateral movement in Azure

### Defensive Strategies
- Identify common Azure misconfigurations
- Implement secure Azure configurations
- Apply defense-in-depth principles
- Develop detection capabilities

### Tool Proficiency
- Use Azure CLI for reconnaissance
- Leverage Azure security tools
- Automate security assessments
- Perform IaC security audits

## Use Cases

### Security Training
- **Azure Security Courses**: Hands-on cloud security labs
- **Red Team Training**: Attack technique practice
- **Blue Team Training**: Detection and response
- **Purple Team Exercises**: Collaborative security testing

### Professional Development
- **Certification Preparation**: AZ-500, OSCP-Azure prep
- **Cloud Penetration Testing**: Build practical skills
- **Security Research**: Understand Azure attack vectors
- **Tool Development**: Test Azure security tools

### IaC Security
- **Terraform Auditing**: Review infrastructure code
- **Secure Coding**: Learn secure IaC patterns
- **Policy Development**: Create security baselines
- **Compliance Testing**: Validate configurations

## Security Tools Integration

### Azure Native Tools
- **Azure Security Center**: Vulnerability assessment
- **Azure Sentinel**: SIEM and threat detection
- **Azure Policy**: Compliance checking
- **Azure Defender**: Threat protection
- **Azure Monitor**: Logging and alerting

### Third-Party Tools
- **ScoutSuite**: Multi-cloud security auditing
- **Prowler**: Azure security assessment
- **Pacu**: Azure exploitation framework
- **ROADtools**: Azure AD reconnaissance
- **Stormspotter**: Azure environment mapping

## Best Practices Taught

### Identity & Access
- Implement least privilege RBAC
- Use managed identities properly
- Secure service principals
- Enable Azure AD MFA
- Review role assignments regularly

### Storage Security
- Disable public blob access
- Use short-lived SAS tokens
- Enable storage encryption
- Rotate storage keys
- Implement network restrictions

### Function Security
- Enable authentication on functions
- Validate all inputs
- Use Key Vault for secrets
- Implement CORS properly
- Enable monitoring and logging

### General Azure Security
- Apply defense-in-depth
- Enable security logging
- Use Azure Policy for compliance
- Regular security assessments
- Incident response planning

## Cleanup

```bash
# Destroy all resources
cd modules/module-1
terraform destroy

# Verify deletion
az resource list --resource-group <resource-group-name>

# Remove Terraform state
rm -rf .terraform terraform.tfstate*
```

## Important Security Warnings

⚠️ **Security Considerations**

- Use dedicated Azure subscription for testing
- Never deploy to production subscriptions
- Monitor Azure costs during deployment
- Delete resources after testing
- Review and understand all deployed resources
- Restrict network access appropriately

## What Makes AzureGoat Special

1. **Azure Focus**: Specifically designed for Microsoft Azure
2. **IaC Deployment**: Terraform for reproducible environments
3. **OWASP Integration**: Modern web vulnerabilities included
4. **Serverless Emphasis**: Azure Functions exploitation
5. **Multiple Paths**: Various escalation routes
6. **INE Quality**: Professional training company creation
7. **Realistic Scenarios**: Production-like configurations

AzureGoat provides an essential platform for learning Azure security, making it invaluable for security professionals, cloud engineers, and anyone working with Microsoft Azure environments.
