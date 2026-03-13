---
layout: detail-page
back_url: /self-hosted
back_text: Back to Self-Hosted Apps
breadcrumb_url: /self-hosted
breadcrumb_text: Self-Hosted
title: Web-check
subtitle: Website Analysis Tool
description: OSINT tool for analyzing websites.
image: self-hosted/web-check.webp
github: https://github.com/Lissy93/web-check
---

Web-check is an all-in-one OSINT tool for analyzing websites, providing detailed information about security, performance, and infrastructure.

## Key Features

- DNS and WHOIS lookup
- SSL/TLS analysis
- Security headers check
- Performance metrics
- Technology detection
- Server information

## Why I Use It

Web-check is one of those tools that I reach for whenever I need a quick but thorough look at a website or domain. Rather than bouncing between a dozen different utilities, it pulls everything together in one interface. On the network side it shows IP addresses, server geolocation, associated hosts and subdomains, and the full redirect chain from a URL to its final destination. For DNS it queries all the major record types — A, AAAA, MX, NS, CNAME, and TXT — and surfaces security-relevant records like SPF and DKIM in a readable way. The SSL certificate chain view makes it easy to check validity, expiry, and the full certificate authority chain at a glance. Beyond that it inspects HTTP response headers, analyzes cookies to identify session and tracking behavior, and checks the robots.txt file which can sometimes reveal directories a site owner did not intend to advertise. On the performance side it integrates Lighthouse scores for performance, accessibility, and SEO, and even estimates the carbon footprint of a page. It also detects the technology stack powering a site, flags third-party trackers, and pulls social media metadata tags. For security research and general reconnaissance it is hard to beat the breadth of information it surfaces in a single run.
