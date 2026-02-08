---
layout: detail-page
back_url: /recommended-blogs
back_text: Back to Recommended Blogs
breadcrumb_url: /recommended-blogs
breadcrumb_text: Recommended Blogs
title: watchTowr Labs
focus: External attack surface management and zero-days
category: Offensive Research
description: Sophisticated research into enterprise software zero-days and the reality of modern attack surfaces.
image: recommended-blogs/watchtowr.webp
website: https://labs.watchtowr.com/
rss_feed: https://labs.watchtowr.com/rss/
---

## Subscribe
**RSS Feed:** [{{ page.rss_feed }}]({{ page.rss_feed }})

---

watchTowr Labs is known for its "no-nonsense" approach to security research, often revealing critical flaws in enterprise infrastructure software.

---

## Recommended Posts

- [SOAPwn: Pwning .NET Framework Applications Through HTTP Client Proxies And WSDL](https://labs.watchtowr.com/soapwn-pwning-net-framework-applications-through-http-client-proxies-and-wsdl/) - Exploiting .NET Framework's HTTP client proxy classes to achieve arbitrary file writes and RCE through malicious WSDL files

- [Stop Putting Your Passwords Into Random Websites](https://labs.watchtowr.com/stop-putting-your-passwords-into-random-websites-yes-seriously-you-are-the-problem/) - Discovering 80,000+ exposed secrets including AD credentials and API keys from online code formatting tools

- [8 Million Requests Later, We Made The SolarWinds Supply Chain Attack Look Amateur](https://labs.watchtowr.com/8-million-requests-later-we-made-the-solarwinds-supply-chain-attack-look-amateur/) - Registering 150 abandoned S3 buckets and receiving millions of requests from governments and Fortune 500s seeking software updates

- [We Spent $20 To Achieve RCE And Accidentally Became The Admins Of .MOBI](https://labs.watchtowr.com/we-spent-20-to-achieve-rce-and-accidentally-became-the-admins-of-mobi/) - Registering an expired WHOIS domain and discovering CAs still using it for certificate validation

- [Bypassing Authentication Like It's The '90s - Pre-Auth RCE Chain(s) in Kentico Xperience CMS](https://labs.watchtowr.com/bypassing-authentication-like-its-the-90s-pre-auth-rce-chain-s-in-kentico-xperience-cms/) - Multiple authentication bypasses and RCE via outdated WSE3 library in Kentico CMS

---

## Why Follow This Blog

watchTowr Labs cuts through security industry noise with direct, impactful research on the vulnerabilities that actually matter. Their focus on perimeter security appliances--the devices organizations trust to protect their networks--reveals uncomfortable truths about enterprise security posture.

## Key Topics Covered

### Network Appliance Security
- **VPN Appliances**: Pulse Secure, Fortinet, Cisco vulnerabilities
- **Firewalls**: Palo Alto, Check Point, Sophos exploitation
- **Email Gateways**: Microsoft Exchange, Zimbra, mail security appliances
- **Load Balancers**: F5 BIG-IP, Citrix ADC vulnerabilities

### Enterprise Software
- **Collaboration Platforms**: Atlassian, Microsoft 365, Slack
- **IT Management**: ServiceNow, SolarWinds, monitoring tools
- **File Transfer**: MOVEit, GoAnywhere, managed file transfer
- **Remote Access**: Citrix, VMware Horizon, remote desktop solutions

### Vulnerability Classes
- **Pre-Authentication RCE**: Exploits requiring no credentials
- **Authentication Bypass**: Circumventing login requirements
- **Command Injection**: OS command execution vulnerabilities
- **Deserialization**: Object deserialization attacks
- **Path Traversal**: File system access vulnerabilities

### Attack Surface Analysis
- **External Exposure**: Internet-facing service vulnerabilities
- **Default Configurations**: Insecure out-of-box settings
- **Legacy Systems**: Outdated software still in production
- **Patch Gap Analysis**: Time between disclosure and remediation
