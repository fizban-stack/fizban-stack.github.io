---
layout: default
title: Homelab
description: An overview of James Wells's homelab — hardware, network topology, running services, and documentation.
---

# Homelab Hub

<article>
<p>My homelab started a few years ago with an outdated HP computer and TrueNAS Scale, and has since grown into a multi-node environment running close to 100 Docker containers, several VMs, and a dedicated cyber security lab. It's been an obsession — and a very effective learning tool. Everything here is hands-on documentation of what I've built, broken, fixed, and learned.</p>
</article>

---

## Hardware Overview

### Compute

| Host | Role | Hardware |
|------|--------|----------|
| **ASUS Desktop** | Daily Driver | i7-14700KF 20-core, 96 GB DDR5, 2x 1 TB NVMe, RTX 4070 Super |
| **Minisforum MS-A1 (Proxmox Node 1)** | Primary hypervisor / lab | Ryzen 5 8700, 96 GB DDR5, NVIDIA Quadro M6000 |
| **Beelink SER5 Pro** | Windows jump box | Ryzen 5 5600U, 64 GB DDR4 |
| **Intel NUC 10 (Proxmox Node 2)** | Secondary Hypervisor | i5-10210U, 64 GB DDR4 |
| **Intel NUC 6i5SYH** | Docker host | i5-6260U, 32 GB DDR4|
| **Intel NUC6CAY** | Not in use | Celeron J3455, 8 GB DDR3 |
| **ATOPNUC MA91** | Not in use | AMD A9-9400, 16 GB DDR4 |
| **Minisforum TH50** | AD DC | i5-11320H, 16 GB DDR4 |

### Storage

| Device | Specs |
|---------|-------|
| **Synology DS224+** | Storage, Proxmox Backup Server VM | Celeron J4125, 8 GB DDR4, dual-bay NAS |
| **WD My Cloud EX2 Ultra** | Not in use | 8 TB dual-bay NAS |

### Networking

| Device | Role |
|----------|------|
| **OPNsense** | Not in use (Sophos XG 230 hardware) |
| **Ubiquiti UniFi Dream Machine Pro Max** | Primary Gateway/Network Controller |
| **Ubiquiti USW-PRO-HD-24-PoE** | Core switch — 24x 2.5G PoE++ / 4x 10G SFP+ |
| **HP Aruba 2530-24G-PoEP** | Not in use |
| **Cisco CBS220-24T-4G** | Not in use |
| **Tenda TEM2010F** | Entertainment Rack |
| **TP-Link TL-SG608P** | Not in use |
| **Netgear GS108Ev3** | Not in use |
| **Netgear GS108v4** | Not in use |
| **Ubiquiti U7 Pro** | Primary Access Point |

### Single-Board Computers & Edge Devices

| Device | Role |
|----------|------|
| **NVIDIA Jetson Orin Nano Super** | ML / network flow analysis |
| **Raspberry Pi 5** (x3) | Edge services, IoT, experimentation |
| **Raspberry Pi Zero 2W** (x2) | Portable Access Point (PoE hat) / Pwnagotchi |
| **Raspberry Pi Pico W** (x2) | Microcontroller projects |
| **Orange Pi 4 Pro** (x2) | OpenClaw experimentation / Development Box |
| **Orange Pi Zero 1GB** | Web Server / Family Dashboard |
| **Libre Computer ROC-RK3328-CC** | Not in use |
| **Flipper Zero** | Wireless security research |

### IoT & Microcontrollers

| Device | Notes |
|----------|-------|
| **Waveshare ESP32-S3 (1.69" Touch LCD)** | Testing Open-Source Smart Watch |
| **Waveshare ESP32-S3 (1.47" Display)** | BadUSB |
| **ESP-WROOM-32 Dev Boards** (x5) | Testing for understanding ESP32 Capabilities |
| **Seeed Studio XIAO ESP32 S3 Sense** | Portable Camera |
| **Heltec LoRa 32** (x2) | Meshtastic long-range radio nodes |
| **Philips Hue Bridge** | Smart home hub |

### Laptops & Workstations

| Device | Specs |
|----------|-------|
| **Microsoft Surface Pro (11th Gen)** | School/Travel Computer |
| **Gigabyte Aorus 17 YE5** | Gaming Computer |

---

## Network Topology

| Segment | Purpose |
|-----------|---------|
| **Management VLAN** | Hypervisors, switches, AP management |
| **Server VLAN** | Docker stacks, VMs, self-hosted services |
| **Cyber Lab VLAN** | Isolated attack/defense lab (Proxmox) |
| **IoT VLAN** | Smart home, Raspberry Pi devices |
| **Guest VLAN** | Internet-only guest access |

**Key infrastructure:** OPNsense firewall with Suricata IDS/IPS, Technitium DNS, Traefik reverse proxy, UniFi Dream Machine Pro Max, Proxmox SDN for lab isolation.

---

## Running Services

I'm currently running approximately 100 Docker containers and several VMs across two Proxmox nodes. Browse the full list on the [Self-Hosted Apps](/self-hosted) page, or filter by category:

<div class="homelab-service-links">
  <a href="{{ '/self-hosted' | relative_url }}#security" class="filter-pill">Security</a>
  <a href="{{ '/self-hosted' | relative_url }}#monitoring" class="filter-pill">Monitoring</a>
  <a href="{{ '/self-hosted' | relative_url }}#infrastructure" class="filter-pill">Infrastructure</a>
  <a href="{{ '/self-hosted' | relative_url }}#media" class="filter-pill">Media</a>
  <a href="{{ '/self-hosted' | relative_url }}#productivity" class="filter-pill">Productivity</a>
</div>

---

## Homelab Blog Posts

<div class="blog-index">
  {% assign homelab_posts = site.posts | where: "category", "Homelab" %}
  {% if homelab_posts.size > 0 %}
    <div class="row g-4">
      {% for post in homelab_posts %}
        <div class="col-md-6 col-lg-4">
          <div class="card h-100">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">
                <a href="{{ post.url | relative_url }}" style="color: var(--accent-cyan); text-decoration: none;">{{ post.title }}</a>
              </h5>
              <div style="font-size: 0.8rem; margin-bottom: 0.75rem; color: var(--text-secondary);">
                {{ post.date | date: "%B %d, %Y" }}
              </div>
              {% if post.excerpt %}
                <p class="card-text" style="flex-grow: 1;">{{ post.excerpt | strip_html | truncatewords: 25 }}</p>
              {% endif %}
              <div class="mt-auto">
                <a href="{{ post.url | relative_url }}" class="btn btn-dark btn-sm" style="width: 100%; text-align: center;">Read More</a>
              </div>
            </div>
          </div>
        </div>
      {% endfor %}
    </div>
  {% else %}
    <p class="no-posts">No homelab posts found.</p>
  {% endif %}
</div>

---

## Useful Resources

- [Awesome Self-Hosted](https://awesome-selfhosted.net/) — Comprehensive list of self-hostable applications
- [selfh.st](https://selfh.st) — Self-hosted app directory and newsletter
- [r/homelab](https://www.reddit.com/r/homelab/) — Homelab community
- [Linux Unplugged Podcast](https://linuxunplugged.com/) — Linux and self-hosting discussions
