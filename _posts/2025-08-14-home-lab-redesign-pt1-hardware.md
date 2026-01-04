---
layout: post
title: "Home Lab Redesign pt. 1 Hardware"
date: 2025-08-14
category: Homelab
author: James Wells
---

The first part of my home lab that I am going to map out is the hardware. I think that having a pre-defined plan for the hardware will help prevent me from sprawling apps across various machines. Most of my hardware was bought second hand off of eBay and most of it is consumer equipment. My home lab will feature the following hardware:

- APC UPS
- Sophos firewall (running Opnsense)
- HP Aruba PoE+ managed switch
- Cisco Business managed switch
- Unifi Ubiquiti Access Point
- Synology NAS
- Minisforum MS-A1
- Minisforum TH50
- Beelink SER5 Max
- Nvidia Jetson Orin Nano
- Raspberry Pi 5
- Hue Bridge
- 2 Reolink cameras

I have a few Intel NUCs and a couple of Raspberry Pi Zero2Ws, but I am not sure that I am going to be using them. I bought them before most of the other hardware while I was on a hardware buying spree. At first, I was only going to buy cheap hardware and use it for a cyber lab, but once I realized the potential I bought better hardware. Now I have a couple of shelves full of hardware that I might never use, but don't want to get rid of just in case I do find a use case for them. I also have an assortment of monitors, keyboards, mice, and more ethernet cable than I will probably ever use.

All of my network equipment is 1 Gbps, so what I have been doing for the core devices is using link aggregation and LACP. This allows me to give two ports the same IP address and lets the systems alternate between the two depending on the available bandwidth. It makes my network 2 Gbps between these devices, although it does not give a single data stream more bandwidth. Instead it distributes multiple data streams across the 2 Gbps connection. I have two links from my firewall to both switches and from the Cisco Switch to both Minisforum pcs and the Synology NAS.

In the past, I have separated my home internet from my home lab with two different switches. I experimented with VLANs at first, but switched to separating the networks on different hardware because it turns out my children don't like it when I bring the internet down. They have taken to calling me a tinkerer because of the number of times that I have made the internet unusable. I wasn't aware at first of all the ways that I could cripple our internet connection.

In the next post, I will document the Network Layout including ports and IP addresses. I will also discuss the various methods that I have used to keep track of this information.
