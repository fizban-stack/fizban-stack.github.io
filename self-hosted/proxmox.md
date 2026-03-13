---
layout: detail-page
back_url: /self-hosted
back_text: Back to Self-Hosted Apps
breadcrumb_url: /self-hosted
breadcrumb_text: Self-Hosted
title: Proxmox Virtual Environment
subtitle: Enterprise Virtualization Platform
description: Open-source server virtualization management.
image: self-hosted/proxmox.webp
github: https://github.com/proxmox
official: https://www.proxmox.com
---

Proxmox VE is a complete open-source platform for enterprise virtualization that integrates KVM hypervisor and LXC containers.

## Key Features

- KVM and LXC support
- Web-based management interface
- High availability clustering
- Built-in backup solutions
- Software-defined storage
- Network virtualization

## Why I Use It

Getting to Proxmox was not a straight line. I started out on TrueNAS Scale, then jumped to XCP-NG hoping it would suit me better, then switched back, then switched again — a couple of back-and-forth cycles before I finally landed on Proxmox and stayed. Now I genuinely cannot imagine running my lab on anything else. It is intuitive enough to get productive quickly but deep enough that there is always more to learn, and the fact that it delivers enterprise-grade features completely free is hard to overstate. Creating templates, spinning up new virtual machines and LXC containers, configuring backups, and managing storage all feel natural in the interface. More recently I have been learning how to deploy infrastructure as code on Proxmox, and it has been a genuine game changer in how I think about and architect lab environments. The ability to quickly build something, test it, and tear it down entirely has shifted my mindset away from obsessing over backups and worrying about the stability of individual lab systems. If something breaks, I just rebuild it — and that freedom has made experimentation a lot more enjoyable.

## My Blog Post

- [Proxmox Virtual Environment](/proxmox-virtual-environment/) - Deep dive into Proxmox VE features, Proxmox Backup Server, GPU passthrough, and metrics integration
- [Proxmox Cyber Lab](/proxmox-cyber-lab/) - Setting up an Active Directory lab on Proxmox with Tailscale VPN integration
