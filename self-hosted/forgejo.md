---
layout: detail-page
back_url: /self-hosted
back_text: Back to Self-Hosted Apps
breadcrumb_url: /self-hosted
breadcrumb_text: Self-Hosted
title: Forgejo
subtitle: Self-Hosted Git Service
description: GitHub Alternative
image: self-hosted/forgejo.webp
official: https://codeberg.org/forgejo
---

Forgejo is a self-hosted, lightweight software forge focused on scaling, federation, and privacy.

## Key Features

- Git repository hosting
- Issue tracking
- Pull requests and code review
- Wiki and documentation
- CI/CD integration

## Why I Use It

Forgejo gives me complete control over my code repositories. It's perfect for keeping private projects secure while still having all the features of platforms like GitHub. Forgejo is one of my core apps now. I can use it to store projects that I am working on, my notes, projects that I pull form Github and want to look at, and my docker compose files. I will never use a homelab without it now. I know that I can have the same experience from GitHub, but there is security in knowing that my files will never be stored somewhere that I don't control.

I started using it more when I stopped using Portainer for Docker management. I could store my compose files in Forgejo and use it a version control.

Forgejo took an even more central role when I connected it with my development container, Jenkins, and a web server container. Before this, I would make changes to my GitHub site, push those changes to GitHub, wait for my site to be deployed and then inspect it. I know that I could have just installed Ruby on my development computer and used it to view the site locally, but I want to keep separation between the web server and my development computer because I am a control freak. Once I connected these services, it became as easy as write code, push to Forgejo, Jenkins pulls from Forgejo, and then pushes the files to an agent on the web server that then builds the site. I gave myself a 12 hour testing window before my Forgejo repository is pushed to GitHub and my site is deployed on the internet.

Forgejo also supports OIDC allowing my to add this to the services that I can login to with one account and without logging in, if I have a cookie from Authentik.