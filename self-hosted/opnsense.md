---
layout: detail-page
back_url: /self-hosted
back_text: Back to Self-Hosted Apps
breadcrumb_url: /self-hosted
breadcrumb_text: Self-Hosted
title: OPNsense
subtitle: Open Source Firewall
description: Enterprise-grade open-source firewall and routing platform.
image: self-hosted/opnsense.webp
github: https://github.com/opnsense
official: https://opnsense.org
---

OPNsense is an open-source, easy-to-use, and easy-to-build FreeBSD-based firewall and routing platform with enterprise-grade features.

## Key Features

- Firewall and routing
- VPN support (OpenVPN, WireGuard)
- Intrusion detection and prevention
- Traffic shaping
- Web filtering
- High availability

## Why I Use It

OPNsense is the firewall and router at the edge of my network, and it is one of the pieces of infrastructure I would never want to go back from. The level of visibility and control it provides — granular firewall rules, VLAN segmentation, intrusion detection and prevention, built-in VPN support, DNS filtering with Unbound — would cost significantly more with commercial alternatives. I use it to segment my network into VLANs that keep IoT devices, lab environments, and trusted devices appropriately separated from each other. The IDS/IPS integration with CrowdSec adds community threat intelligence to block known bad actors automatically. I wrote a full walkthrough of my setup if you want to dig into the specifics: [OPNsense](/opnsense/).

## My Blog Post

- [OPNsense](/opnsense/) - Comprehensive guide covering Unbound DNS, IDS/IPS, VLANs, Tailscale integration, Crowdsec, and more
