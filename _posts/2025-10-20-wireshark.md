---
layout: post
title: "Wireshark"
date: 2025-10-20
category: Cybersecurity
author: James Wells
---

I began using Wireshark at work a few months ago to help troubleshoot network issues. The first time I used it was to diagnose some DHCP issues. It took me about five minutes to figure out that someone had plugged in another Wi-Fi router thinking it would help with the internet speed in their group home.

Since then I have been playing around with it at home trying to learn all I can about the invisible part of networking. The first time I started it up at home, I thought something was terribly wrong. I have a Pangolin instance on a VPS and use it to route traffic to some internal services. It has a wildcard domain DNS entry so that I can spin up and down different service without making DNS changes. Once I stop experimenting with different self-hosted service, I am going to manually enter each host, but it is nice not to have to create and delete entries several times just to try a container or service out.

So I started Wireshark up and the first thing that jumped out at me were these entries:

![Wireshark WPAD Entries](/assets/images/blog/wireshark/capture1.webp)

I don't have a service that uses the hostname wpad, so the first thing that came to my mind was that something nefarious was going on. After a recent cyber incident at work, I have more of an understanding that cyber criminals don't care about the size of a target. For some criminals, it is all a numbers game.

Then after some research, I discovered that it was not anything nefarious. It is a feature that Windows enables by default called Web Proxy Auto-Discovery (wpad). Wpad is a method used by web browsers and other applications to find and automatically use web proxies. The host machine first asks the DHCP server for a wpad option, but since my DHCP server is not configured with this option, it falls back to DNS.

Since I have a wildcard domain, the DNS query comes back with the IP address for my Pangolin VPS. It is a valid DNS entry so the host machine tries to connect to it only to have the connection refused by Pangolin or specifically the Traefik proxy docker container on the VPS.

After discovering this, the first thing I did was the easiest. I turned off this setting on my computer. Then I thought about all the other computers on my home network and decided to make some more centralized changes. I did the secure thing that I should have done from the beginning and enter specific host names for any services exposed through Pangolin. I should have done this from the beginning, since I have an internal Traefik server as well, but I was trying to move away from having two Docker servers.

Now I will keep the internal one and use my DNS server to sinkhole this host so that I can still use an internal wildcard. I have already removed the wildcard entry that I had entered on my Cloudflare DNS and only exposed a few services with specific host names.

This was just the first rabbit hole that I went down using Wireshark. It is a useful tool for anything network related. There is so much information available that I can spend the next few months just diving into it. Once I get my network figured out, there are several sample pcap files available for download and analysis at [https://wiki.wireshark.org/samplecaptures](https://wiki.wireshark.org/samplecaptures) and eventually I plan on taking the certification offered by Wireshark, the Wireshark Certified Analyst (WCA). I don't feel that I am ready for it yet, but I do know that I am motivated achieve it. It would be a nice addition to my certifications and allow me to show competency in a universally known network tool with an endless amount of use cases.
