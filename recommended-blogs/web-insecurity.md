---
layout: detail-page
back_url: /recommended-blogs
back_text: Back to Recommended Blogs
breadcrumb_url: /recommended-blogs
breadcrumb_text: Recommended Blogs
title: Lauritz Holtmann (web-insecurity)
focus: Web application security, browser-based attacks, and SSO exploitation
category: Web Security Research
description: Expert-level deep dives into complex web vulnerabilities, Single Sign-On (SSO) flaws, and modern browser security mechanisms.
image: recommended-blogs/lauritz-holtmann.webp
website: https://security.lauritz-holtmann.de/
rss_feed: https://security.lauritz-holtmann.de/index.xml
---

## Subscribe
**RSS Feed:** [{{ page.rss_feed }}]({{ page.rss_feed }})

---

Lauritz Holtmann's blog is a go-to resource for high-quality, technical write-ups on modern web security. His research often focuses on the intersection of identity protocols and complex web architectures.

---

## Recommended Posts

- [Sign-in with World ID: XSS and ATO via OIDC Form Post Response Mode](https://security.lauritz-holtmann.de/advisories/tfh-form_post-xss-ato/): Account takeover via OpenID Connect vulnerabilities.

- [Personal Access Token Disclosure in Asana Desktop Application](https://security.lauritz-holtmann.de/advisories/asana-desktop-credential-disclosure/): Credential disclosure vulnerability in Asana.

- [Flickr Account Takeover](https://security.lauritz-holtmann.de/advisories/flickr-account-takeover/): OAuth implementation flaw leading to full account compromise.

- [Android App Links Hijacking Authentication](https://security.lauritz-holtmann.de/post/sso-android-autoverify/): Deep dive into bypassing SSO flows on mobile platforms.

- [POST to XSS: Leveraging Pseudo Protocols (2024)](https://security.lauritz-holtmann.de/post/sso-security-redirect-uri-iii/): Cross-protocol vulnerabilities in SAML and OAuth (CVE-2024-21637).

---

## Why Follow This Blog

Lauritz provides exceptionally clear documentation of sophisticated bugs. His work on SSO and OAuth is foundational for hunters looking to understand how authentication flows can be manipulated in enterprise environments.

## Key Topics Covered

### Identity & Authentication
- **OAuth 2.0 & OpenID Connect**: Analyzing misconfigurations in authorization flows
- **SAML Exploitation**: Deep dives into XML-based authentication vulnerabilities
- **SSO Bypasses**: Practical techniques for circumventing centralized login systems
- **Mobile SSO**: Android App Links and deep link hijacking

### Client-Side Security
- **Cross-Site Scripting (XSS)**: Advanced bypasses for modern sanitizers and CSP
- **Browser Security Headers**: Research into the efficacy of HSTS, CSP, and SOP
- **Client-Side Request Forgery**: Exploiting internal browser-to-server communications
- **Pseudo Protocol Abuse**: Cross-protocol attack vectors

### Cloud & API Security
- **API Misconfigurations**: Research into REST and GraphQL security flaws
- **Server-Side Request Forgery (SSRF)**: Chaining web flaws to access cloud metadata services
- **Credential Disclosure**: Desktop and mobile application token leakage
- **Enterprise Platforms**: Vulnerabilities in widely-deployed SaaS products
