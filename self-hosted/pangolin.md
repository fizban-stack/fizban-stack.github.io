---
layout: detail-page
back_url: /self-hosted
back_text: Back to Self-Hosted Apps
breadcrumb_url: /self-hosted
breadcrumb_text: Self-Hosted
title: Pangolin
subtitle: Reverse Proxy & Remote Access
description: A security-focused self-hosted reverse proxy with built-in WireGuard support.
image: self-hosted/pangolin.webp
official: https://pangolin.net
---

Pangolin is a modern, security-first remote access platform. Unlike traditional reverse proxies, it combines the power of Traefik with the security of WireGuard to create a seamless, encrypted tunnel for accessing internal services without exposing them directly to the public internet.

## Key Features

- **Automated SSL/TLS:** Integrated Let's Encrypt support via Traefik for automatic certificate management.
- **WireGuard Integration:** Provides a built-in VPN capability, allowing for secure "on-the-go" access to the home lab.
- **Access Control Lists (ACLs):** Granular control over which users or devices can access specific internal applications.
- **Single Sign-On (SSO):** Supports modern authentication providers to add an extra layer of security before reaching the backend.
- **Intuitive Dashboard:** A clean UI for managing hosts, certificates, and tunnels without manually editing YAML files.
- **Docker-Native:** Built to run as a container, making it easy to deploy and scale within a Proxmox or Docker environment.

## Why I Use It

I use Pangolin as the primary gateway to my home lab because it prioritizes the "Principle of Least Privilege." By leveraging WireGuard tunnels rather than just opening ports, I can ensure that my self-hosted services—like Wazuh or Nextcloud—are accessible to me from anywhere in the world without being visible to malicious scanners on the open web.

It serves as a critical component of my "Defense in Depth" strategy, providing both encryption in transit and robust identity verification.