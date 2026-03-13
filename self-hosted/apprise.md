---
layout: detail-page
back_url: /self-hosted
back_text: Back to Self-Hosted Apps
breadcrumb_url: /self-hosted
breadcrumb_text: Self-Hosted
title: Apprise
subtitle: Universal Notification System
description: Push notifications to multiple platforms simultaneously.
image: self-hosted/apprise.webp
github: https://github.com/caronc/apprise
---

Apprise is a universal notification service that allows you to send notifications to virtually any platform through a single, unified API.

## Key Features

- Support for 90+ notification services
- Unified notification interface
- Web API for easy integration
- CLI and Python library support
- Template customization
- Attachment support

## Why I Use It

Apprise acts as a universal notification translator in my homelab. Rather than configuring each application with its own notification settings — separate webhook URLs, SMTP configs, or API keys for every service — I point everything at Apprise and let it handle the routing. It supports over 90 notification services, so if I ever want to change where alerts land, I update one place rather than hunting through every service's settings. The main reason I set it up was to bridge the gap for services that do not natively support Gotify — Apprise accepts whatever format they send and forwards it through, which is how I get a unified notification stream regardless of what a service does or does not support natively.
