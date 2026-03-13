---
layout: detail-page
back_url: /self-hosted
back_text: Back to Self-Hosted Apps
breadcrumb_url: /self-hosted
breadcrumb_text: Self-Hosted
title: Booklore
subtitle: Self-Hosted Ebook Management
description: Managing and Reading Ebooks and PDFs.
image: self-hosted/booklore.webp
github: https://github.com/booklore-app/booklore
---

Booklore is a modern ebook management system that allows you to organize, manage, and read your digital library from anywhere.

## Key Features

- Ebook library management
- PDF reader integration
- Metadata organization
- Web-based reading interface
- Support for multiple formats

## Why I Use It

Getting here took a few tries. I started with Calibre, moved to Calibre-Web, then Calibre-Web-Automated — which has a nice addon for downloading books directly from the web UI, but I realized I wanted to inspect what I was adding before it landed in my library rather than having it happen automatically. I briefly tried Kavita before landing on Booklore, and it was immediately clear this was the one I would stick with. The built-in reader is fast, remembers your position, and is genuinely pleasant to use. The book dropbox lets me bulk import and sort out metadata before anything hits the main library, which is exactly the kind of control I wanted. Magic shelves are a standout feature — I can define regex-based rules to automatically sort books onto shelves without manual intervention, and the metadata editor lets me pick exactly what to keep or change. Booklore also supports OIDC, so it integrates with my Authentik setup for single sign-on. The one area I have not fully solved is reading on my phone — I can pull books down to a Kobo app but I have not found an Android app that reads directly from Booklore and keeps progress synced the way I want.
