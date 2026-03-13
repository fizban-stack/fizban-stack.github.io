---
layout: detail-page
back_url: /self-hosted
back_text: Back to Self-Hosted Apps
breadcrumb_url: /self-hosted
breadcrumb_text: Self-Hosted
title: Apache Guacamole
subtitle: Clientless Remote Desktop
description: Clientless remote desktop gateway supporting VNC, RDP, and SSH.
image: self-hosted/guacamole.webp
github: https://github.com/apache/guacamole-server
official: https://guacamole.apache.org
---

Apache Guacamole is a clientless remote desktop gateway that supports standard protocols like VNC, RDP, and SSH through your web browser.

## Key Features

- Browser-based access
- VNC, RDP, SSH, and Telnet support
- Multi-factor authentication
- Session recording
- File transfer capabilities
- Connection sharing

## Why I Use It

Before Guacamole, I was adding the same RDP settings to every machine I owned — tedious to maintain and worse every time an IP changed. Now everything is in one place: all my servers and endpoints accessible through a single web UI, without remembering passwords or IP addresses. I don't expose it to the internet, but with my VPN it's available from anywhere. The user and group permissions mean I can control exactly who can access what, which matters when sharing access. One of the standout features is session recording — RDP and VNC sessions are captured as video with optional keylogging, and SSH sessions get typescript recordings, giving a complete audit trail of every session. The most creative use I've found is connecting to my Flare VM malware analysis machine, which has no network adapters at all. By pointing Guacamole at the Proxmox VNC Unix socket directly, I get full graphical access to a completely air-gapped VM through the browser — no network stack on the guest required. For a full walkthrough including drive mapping, recording, and the air-gapped VM setup, see my blog post: [Apache Guacamole](/2026/01/22/guacamole).
