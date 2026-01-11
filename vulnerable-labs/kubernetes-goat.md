---
layout: detail-page
back_url: /vulnerable-labs
back_text: Back to Vulnerable Labs
breadcrumb_url: /vulnerable-labs
breadcrumb_text: Vulnerable Labs
title: Kubernetes Goat
focus: Kubernetes security scenarios and vulnerabilities
type: Container
category: Cloud & Infrastructure
description: An interactive Kubernetes security learning playground with 25+ scenarios covering container security, cluster misconfigurations, RBAC issues, and cloud-native attack vectors.
image: vulnerable-labs/kubernetes-goat.webp
github: https://github.com/madhuakula/kubernetes-goat
website: https://madhuakula.com/kubernetes-goat/
---

Kubernetes Goat is an interactive Kubernetes security learning playground designed by Madhu Akula. It provides a hands-on approach to understanding and exploiting Kubernetes cluster vulnerabilities in a safe, controlled environment.

## Overview

This project features 25+ real-world scenarios that cover a wide range of Kubernetes security topics, making it an excellent resource for security professionals, developers, and anyone interested in cloud-native security.

## Key Features

- **25+ Security Scenarios**: Comprehensive coverage of Kubernetes attack vectors
- **Container Escape Techniques**: Learn how attackers break out of containers
- **RBAC Misconfigurations**: Understand role-based access control vulnerabilities
- **Cluster Misconfiguration**: Exploit common Kubernetes setup errors
- **Secret Management Issues**: Discover how secrets can be exposed
- **Network Policy Bypasses**: Learn about pod-to-pod communication vulnerabilities
- **Privilege Escalation**: Practice elevating privileges within clusters
- **Supply Chain Attacks**: Understand container image vulnerabilities

## Deployment Options

Kubernetes Goat can be deployed in multiple ways:

- **Local Deployment**: Using Kind (Kubernetes in Docker)
- **Cloud Deployment**: AWS EKS, Azure AKS, Google GKE
- **Existing Clusters**: Deploy to your own Kubernetes cluster

## Getting Started

```bash
# Clone the repository
git clone https://github.com/madhuakula/kubernetes-goat

# Navigate to the directory
cd kubernetes-goat

# Deploy using bash script (for local Kind cluster)
bash setup-kubernetes-goat.sh
```

## Learning Path

The scenarios are organized to provide a progressive learning experience:

1. **Beginner**: Basic container and pod vulnerabilities
2. **Intermediate**: RBAC, secrets, and network policies
3. **Advanced**: Multi-stage attacks and privilege escalation
4. **Expert**: Complex cluster compromise scenarios

## Use Cases

- **Security Training**: Hands-on labs for security teams
- **CTF Preparation**: Practice for capture-the-flag competitions
- **Penetration Testing**: Understand Kubernetes attack techniques
- **Defensive Security**: Learn to identify and prevent attacks
- **DevSecOps**: Integrate security into development workflows

## Why This Lab Matters

As Kubernetes adoption grows rapidly, understanding its security model is crucial. Kubernetes Goat provides a risk-free environment to:

- Test security tools and scanners
- Validate security policies
- Train incident response teams
- Develop secure deployment practices

## Community and Support

The project has an active community with regular updates, detailed documentation, and walkthrough guides for each scenario. It's maintained by security researchers and receives contributions from the cloud-native security community.
