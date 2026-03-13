---
layout: detail-page
back_url: /self-hosted
back_text: Back to Self-Hosted Apps
breadcrumb_url: /self-hosted
breadcrumb_text: Self-Hosted
title: Proxmox Backup Server
subtitle: Enterprise Backup Solution
description: Backup solution for VMs, containers, and physical hosts.
image: self-hosted/proxmox-backup-server.webp
github: https://github.com/proxmox/proxmox-backup
official: https://www.proxmox.com/en/proxmox-backup-server
---

Proxmox Backup Server is an enterprise-class backup solution designed to back up and restore VMs, containers, and physical hosts.

## Key Features

- Incremental and deduplication
- VM and container backups
- Encryption support
- Web-based management
- Verification and restore
- Tape backup support

## Why I Use It

Backups are the part of a homelab that nobody wants to think about until they need them. Proxmox Backup Server is a dedicated backup target that integrates natively with Proxmox VE, making scheduled VM and container backups essentially automatic. The deduplication is genuinely impressive — incremental backups with chunk-level dedup mean that even with a large number of VMs, the storage footprint stays manageable. Encryption is built in, and I can verify backups and do granular file-level restores without having to spin up the full VM. Having a separate machine dedicated to backups means I am not relying on the same storage that holds the VMs themselves.
