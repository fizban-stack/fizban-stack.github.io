---
layout: detail-page
back_url: /self-hosted
back_text: Back to Self-Hosted Apps
breadcrumb_url: /self-hosted
breadcrumb_text: Self-Hosted
title: Traefik
subtitle: Modern Reverse Proxy
description: Modern Cloud Native Reverse Proxy.
image: self-hosted/traefik.webp
github: https://github.com/traefik/traefik
official: https://traefik.io
---

Traefik is a modern HTTP reverse proxy and load balancer designed to deploy microservices with ease.

## Key Features

- Automatic service discovery
- Let's Encrypt integration
- Load balancing
- Multiple backend support
- Metrics and monitoring
- WebSocket support

## Why I Use It

Traefik wasn't something that clicked for me right away — I struggled with it for a while, bouncing between configs that almost worked and documentation that assumed more context than I had. Once it finally made sense, though, it became one of the most useful tools in my homelab. Now I use it as the front door for everything: whether it's a Docker container or a service running on a completely different host, exposing it through Traefik is straightforward and consistent. It also pairs exceptionally well with [Pangolin](/self-hosted/pangolin), and honestly, working through Traefik's concepts first made Pangolin's architecture much easier to reason about — a lot of what Pangolin does under the hood starts to feel familiar once you've spent time with Traefik's routing model. Beyond just proxying, Traefik gives you real visibility into what's happening with your traffic through its built-in metrics and tracing support, which you can pipe into tools like Grafana to get a clear picture of request flows and service health.
