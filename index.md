---
layout: default
title: Home
description: The personal portfolio of James Wells, an aspiring cybersecurity practitioner and home lab enthusiast.
---

<div class="container home_2col">
  <div class="row align-items-center">
    <div class="col-md-6">
      <img src="{{ '/assets/images/resume.webp' | relative_url }}" class="rounded img-fluid d-block dibley" alt="Headshot of James Wells" loading="lazy">
    </div>
    <div class="col-md-6">
      <h1>James Wells</h1>
      <p class="hero-tagline">IT Security Professional &nbsp;·&nbsp; Homelab Enthusiast &nbsp;·&nbsp; Lifelong Learner</p>
      <p class="hero-bio">I build and break things in my homelab, earn certifications, and document the journey. My goal is to grow as a cybersecurity practitioner and help build a stronger security community.</p>
      <div class="hero-ctas">
        <a href="{{ '/projects' | relative_url }}" class="btn btn-dark">View Projects →</a>
        <a href="{{ '/blog' | relative_url }}" class="btn btn-outline-secondary ms-2">Read the Blog →</a>
        <a href="{{ '/assets/documents/resume.pdf' | relative_url }}" class="btn btn-outline-secondary ms-2" target="_blank" rel="noopener noreferrer">Resume ↓</a>
      </div>
    </div>
  </div>
</div>

<div class="skills-strip">
  <span class="skill-badge">OPNsense</span>
  <span class="skill-badge">Proxmox</span>
  <span class="skill-badge">Graylog</span>
  <span class="skill-badge">Wazuh</span>
  <span class="skill-badge">Velociraptor</span>
  <span class="skill-badge">BloodHound</span>
  <span class="skill-badge">Wireshark</span>
  <span class="skill-badge">Nmap</span>
  <span class="skill-badge">Docker</span>
  <span class="skill-badge">Linux</span>
  <span class="skill-badge">Active Directory</span>
  <span class="skill-badge">Microsoft 365</span>
</div>

---

<article>
<h2>Homelab Video Tour</h2>
<p>A short tour of the homelab services I'm currently running — about 100 Docker containers spanning security tools, monitoring, self-hosted productivity apps, and more. Visit the <a href="{{ '/homelab' | relative_url }}">Homelab Hub</a> for a full breakdown of hardware, network topology, and individual service write-ups.</p>

<div class="video-container">
  <video autoplay loop muted playsinline preload="none" poster="{{ '/assets/images/resume.webp' | relative_url }}">
    <source src="{{ '/assets/videos/homepage.mp4' | relative_url }}" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>
</article>

<section class="featured-projects-section">
<h2>Featured Projects</h2>
<div class="row g-4">
  <div class="col-md-4">
    <div class="card h-100">
      <div class="card-body">
        <h5 class="card-title">Graylog SIEM</h5>
        <p class="card-text">Centralized log management and SIEM with custom extractors for OPNsense and network syslog parsing. Deployed at home and at work.</p>
        <a href="{{ '/cybersecurity/2025/12/25/graylog/' | relative_url }}" class="btn btn-dark btn-sm">Read Write-up →</a>
      </div>
    </div>
  </div>
  <div class="col-md-4">
    <div class="card h-100">
      <div class="card-body">
        <h5 class="card-title">BloodHound AD Analysis</h5>
        <p class="card-text">Active Directory attack path mapping using BloodHound on a simulated enterprise environment built with Ludus.</p>
        <a href="{{ '/cybersecurity/2026/02/11/bloodhound/' | relative_url }}" class="btn btn-dark btn-sm">Read Write-up →</a>
      </div>
    </div>
  </div>
  <div class="col-md-4">
    <div class="card h-100">
      <div class="card-body">
        <h5 class="card-title">NVD CVE Scanner</h5>
        <p class="card-text">A dynamic webpage that queries the NVD API by keyword — returns CVE details, severity, PoCs, and CWE references.</p>
        <a href="{{ '/scanner' | relative_url }}" class="btn btn-dark btn-sm">Try the Tool →</a>
      </div>
    </div>
  </div>
</div>
<div class="mt-3">
  <a href="{{ '/projects' | relative_url }}" class="btn btn-outline-secondary">All Projects →</a>
</div>
</section>

<article>
<h2>Community Resources</h2>
<p>I've curated resources to help people getting into cybersecurity — especially those in areas without a strong technical community. Browse the <a href="{{ '/resources' | relative_url }}">Resources</a> section for free training platforms, vulnerable labs, recommended podcasts, YouTube channels, and other security blogs.</p>
</article>
