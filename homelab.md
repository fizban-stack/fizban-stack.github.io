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

| Host | Role | Hardware |
|------|------|----------|
| **Proxmox Node 1** | Primary hypervisor | See homelab posts for specs |
| **Proxmox Node 2** | Secondary hypervisor / lab node | See homelab posts for specs |
| **Synology NAS** | Network storage, backups | Synology DSM |
| **Raspberry Pi 5** | Edge / IoT experiments | Raspberry Pi 5 |
| **NVIDIA Jetson Orin** | ML / network analysis | Jetson Orin NX |
| **OPNsense Firewall** | Network gateway, IDS/IPS | Dedicated hardware |

*See individual blog posts below for detailed build documentation.*

---

## Network Topology

| Segment | Purpose |
|---------|---------|
| **Management VLAN** | Hypervisors, switches, AP management |
| **Server VLAN** | Docker stacks, VMs, self-hosted services |
| **Cyber Lab VLAN** | Isolated attack/defense lab (Proxmox) |
| **IoT VLAN** | Smart home, Raspberry Pi devices |
| **Guest VLAN** | Internet-only guest access |

**Key infrastructure:** OPNsense firewall with Suricata IDS/IPS, Technitium DNS, Traefik reverse proxy, UniFi network management, Proxmox SDN for lab isolation.

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
