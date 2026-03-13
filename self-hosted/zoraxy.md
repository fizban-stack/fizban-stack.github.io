---
layout: detail-page
back_url: /self-hosted
back_text: Back to Self-Hosted Apps
breadcrumb_url: /self-hosted
breadcrumb_text: Self-Hosted
title: Zoraxy
subtitle: Reverse Proxy Manager
description: General purpose reverse proxy and forwarding tool.
image: self-hosted/zoraxy.webp
github: https://github.com/tobychui/zoraxy
---

Zoraxy is a general-purpose reverse proxy and forwarding tool with an intuitive web interface for managing your network traffic.

## Key Features

- Reverse proxy with GUI
- SSL certificate management
- Access control and authentication
- Load balancing
- WebSocket support
- Easy configuration

## Why I Use It

Zoraxy is what I reach for when I want a reverse proxy with a clean GUI and no config file overhead. While I use Traefik for most of my services, Zoraxy fills a different role — it is useful for quickly standing up a proxy for something simple without writing out routing rules by hand. The built-in SSL management and access controls are easy to configure through the web interface, which makes it a good fit for scenarios where I want something up fast or want to hand off management to someone who is not comfortable editing YAML.
