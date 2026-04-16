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
|------|------|----------|
| **ASUS Desktop (Proxmox Node 1)** | Primary hypervisor | i7-14700KF 20-core, 96 GB DDR5, 2x 1 TB NVMe, RTX 4070 Super |
| **Minisforum MS-A1 (Proxmox Node 2)** | Secondary hypervisor / lab | Ryzen 5 8700, 64 GB DDR5 |
| **Beelink SER5 Pro** | Services / Docker host | Ryzen 5 5600U, 16 GB DDR4 |
| **Intel NUC 10 (NUC10iFNHN)** | Lightweight services | i5-10210U, 16 GB DDR4 |
| **Intel NUC 6i5SYH** | Utility node | i5-6260U |
| **Intel NUC6CAY** | Utility node | Celeron J3455, 8 GB DDR3 |
| **ATOPNUC MA91** | Utility node | AMD A9-9400, 16 GB DDR4 |
| **Minisforum TH50** | Utility node | i5-11320H |

### Storage

| Device | Specs |
|--------|-------|
| **Synology DS224+** | Celeron J4125, 8 GB DDR4, dual-bay NAS |
| **WD My Cloud EX2 Ultra** | 8 TB dual-bay NAS |

### Networking

| Device | Role |
|--------|------|
| **OPNsense** | Primary firewall / IDS/IPS (Sophos XG 230 hardware) |
| **Ubiquiti UniFi Dream Machine Pro Max** | Network controller / secondary gateway |
| **Ubiquiti USW-PRO-HD-24-PoE** | Core switch — 24x 2.5G PoE++ / 4x 10G SFP+ |
| **HP Aruba 2530-24G-PoEP** | PoE switch |
| **Cisco CBS220-24T-4G** | Managed switch |
| **Tenda TEM2010F** | 2.5G switch |
| **TP-Link TL-SG608P** | 8-port PoE switch |
| **Netgear GS108Ev3** | 8-port managed switch |
| **Netgear GS108v4** | 8-port unmanaged switch |
| **Ubiquiti U7 Pro** | Wi-Fi 7 access point |

### Single-Board Computers & Edge Devices

| Device | Role |
|--------|------|
| **NVIDIA Jetson Orin Nano Super** | ML / network flow analysis |
| **Raspberry Pi 5** (x3) | Edge services, IoT, experimentation |
| **Raspberry Pi Zero 2W** (x2) | Lightweight agents / sensors |
| **Raspberry Pi Pico W** (x2) | Microcontroller projects |
| **Orange Pi 4 Pro** (x2) | SBC projects |
| **Orange Pi Zero 1GB** | Lightweight edge node |
| **Libre Computer ROC-RK3328-CC** | ARM test node — 4-core, 4 GB DDR4 |
| **Flipper Zero** | Wireless security research / pentesting |

### IoT & Microcontrollers

| Device | Notes |
|--------|-------|
| **Waveshare ESP32-S3 (1.69" Touch LCD)** | 240x280 display, accelerometer / gyroscope |
| **Waveshare ESP32-S3 (1.47" Display)** | 172x320 display, RGB LED, WiFi / BLE 5 |
| **ESP-WROOM-32 Dev Boards** (x5) | Dual-core WiFi + BT, Arduino-compatible |
| **Seeed Studio XIAO ESP32 S3 Sense** | OV2640 camera, mic, 8 MB PSRAM, BLE 5 |
| **Heltec LoRa 32** (x2) | Meshtastic long-range radio nodes |
| **Philips Hue Bridge** | Smart home hub |

### GPUs (Standalone)

| GPU | Use |
|-----|-----|
| **NVIDIA RTX 4070 Super** | Primary — in ASUS Desktop (Proxmox Node 1) |
| **AMD Radeon Instinct Mi50** | ML / compute experimentation |
| **NVIDIA Quadro M6000** | Secondary compute / passthrough |
| **Minisforum DEG1 eGPU Dock** | External GPU dock for NUC / laptop use |

### Laptops & Workstations

| Device | Specs |
|--------|-------|
| **Microsoft Surface Pro (Copilot+ PC)** | 13" OLED, Snapdragon X Elite, 16 GB, 512 GB SSD |
| **Gigabyte Aorus 17 YE5** | i9-12700H, 64 GB DDR5, RTX 3080 Ti |
| **ASUS ROG Zephyrus 14"** | Ryzen 9 5900HS, 16 GB DDR4, RTX 3060 |
| **Lenovo Yoga 7 16IML9** | 2-in-1 laptop |
| **HP Envy 14" 2-in-1** | General use |
| **Microsoft Surface Pro 11th Ed** | Tablet / laptop |

*Full asset inventory tracked in [Snipe-IT](https://snipeit.wellslabs.org). See individual blog posts below for detailed build documentation.*

---

## Network Topology

| Segment | Purpose |
|---------|---------|
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
