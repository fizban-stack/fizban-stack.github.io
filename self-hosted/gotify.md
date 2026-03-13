---
layout: detail-page
back_url: /self-hosted
back_text: Back to Self-Hosted Apps
breadcrumb_url: /self-hosted
breadcrumb_text: Self-Hosted
title: Gotify
subtitle: Simple Notification Server
description: Self-hosted push notification service.
image: self-hosted/gotify.webp
github: https://github.com/gotify/server
official: https://gotify.net
---

Gotify is a simple server for sending and receiving push notifications, allowing you to get notifications from your scripts and applications directly on your phone.

## Key Features

- REST API for sending messages
- WebSocket real-time delivery
- Android app support
- Message priorities
- Application tokens
- Plugin support

## Why I Use It

Gotify was the first notification service I set up in my homelab, and it became the central hub for alerts across everything. Proxmox supports it natively, so backup results, node alerts, and other system events flow straight in. For services that don't have built-in Gotify support, I route them through Apprise, which acts as a bridge — it speaks whatever notification format a service uses and forwards it to Gotify. That combination means pretty much anything can send me a notification, regardless of whether it knows what Gotify is. There is even a app available on the Google Play store.
