---
layout: detail-page
back_url: /recommended-blogs
back_text: Back to Recommended Blogs
breadcrumb_url: /recommended-blogs
breadcrumb_text: Recommended Blogs
title: PortSwigger Research
focus: Novel web attack classes and HTTP protocol exploitation
category: Web Security Research
description: The definitive source for groundbreaking web vulnerability research, led by industry pioneers like James Kettle.
image: recommended-blogs/portswigger.webp
website: https://portswigger.net/research
rss_feed: https://portswigger.net/blog/rss
---

## Subscribe
**RSS Feed:** [{{ page.rss_feed }}]({{ page.rss_feed }})

---

PortSwigger Research doesn't just find bugs; they define new classes of vulnerabilities. Their work fundamentally changes how the industry understands the relationship between web servers, proxies, and browsers.

---

## Recommended Posts

- [Functional PoCs in less than a minute? Julen Garrido Estevez puts Burp AI to the test](https://portswigger.net/blog/functional-pocs-in-less-than-a-minute) - Methodology for using Burp AI's free-form prompts to generate functional Proofs of Concept (PoCs) for vulnerabilities like SSTI and IDOR in under a minute

- [How to detect React2Shell with Burp Suite](https://portswigger.net/blog/how-to-detect-react2shell-with-burp-suite) - Guidance on detecting the critical React2Shell vulnerabilities (CVE-2025-55182/CVE-2025-66478) using Burp Suite's ActiveScan++ and custom Bambda scripts

- [How to join the desync endgame: Practical tips from pentester Tom Stacey](https://portswigger.net/blog/how-to-join-the-desync-endgame-practical-tips-from-pentester-tom-stacey) - Technical guide on identifying parser discrepancies to find HTTP request smuggling vulnerabilities

- [HTTP/1.1 must die: Dafydd Stuttard on what this means for enterprise security](https://portswigger.net/blog/http-1-1-must-die-dafydd-stuttard-on-what-this-means-for-enterprise-security) - Analysis of the systemic risks of HTTP/1.1, arguing for a strategic shift to HTTP/2

- [Hacking smarter with Burp AI: NahamSec puts Burp AI to the test](https://portswigger.net/blog/hacking-smarter-with-burp-ai-nahamsec-puts-burp-ai-to-the-test) - Demonstration of using Burp AI's agentic capabilities to accelerate vulnerability validation

- [The Fragile Lock: Novel Bypasses For SAML Authentication](https://portswigger.net/research/the-fragile-lock): Groundbreaking SAML authentication bypass research.

- [Introducing the URL validation bypass cheat sheet](https://portswigger.net/research/introducing-the-url-validation-bypass-cheat-sheet): Comprehensive URL validation bypass techniques.

- [Splitting the email atom: exploiting parsers to bypass access controls](https://portswigger.net/research/splitting-the-email-atom): Email parser exploitation techniques.

- [Introducing HTTP Anomaly Rank](https://portswigger.net/research/introducing-http-anomaly-rank): Novel HTTP analysis methodology.

- [WebSocket Turbo Intruder: Unearthing the WebSocket Goldmine](https://portswigger.net/research/websocket-turbo-intruder-unearthing-the-websocket-goldmine): Advanced WebSocket security testing techniques.

- [Cookie Chaos: Bypassing __Host and __Secure (2025)](https://portswigger.net/research/cookie-chaos-how-to-bypass-host-and-secure-cookie-prefixes): A masterclass in bypassing modern cookie security prefixes using browser-specific quirks.

- [Drag and Pwnd](https://portswigger.net/research/drag-and-pwnd-leverage-ascii-characters-to-exploit-vs-code): Exploiting VS Code (2025): How ASCII character discrepancies can lead to remote code execution through the VS Code UI.

- [Listen to the Whispers](https://portswigger.net/research/listen-to-the-whispers-web-timing-attacks-that-actually-work): Web Timing Attacks (2024): James Kettle's research into making web-based timing side-channels practical and repeatable.

---

## Why Follow This Blog

PortSwigger Research doesn't follow trends--they create them. When James Kettle publishes research on a new vulnerability class, it becomes required reading for the entire web security community. Their methodical approach to discovering architectural flaws in the web's foundational protocols provides a masterclass in creative security thinking.

## Key Topics Covered

### HTTP Desynchronization
- **Request Smuggling**: CL.TE, TE.CL, and TE.TE variants
- **HTTP/2 Downgrade Attacks**: Exploiting protocol translation
- **Browser-Powered Smuggling**: Client-side desync techniques
- **Response Queue Poisoning**: Corrupting server response handling

### Web Cache Attacks
- **Cache Poisoning**: Unkeyed input exploitation
- **Cache Deception**: Tricking caches into storing sensitive data
- **CDN Vulnerabilities**: Attacking global content delivery infrastructure
- **Cache Key Normalization**: Exploiting URL parsing differences

### Server-Side Attacks
- **SSRF Techniques**: Advanced server-side request forgery
- **Template Injection**: RCE through template engines
- **Prototype Pollution**: JavaScript object manipulation
- **Parameter Pollution**: Exploiting parser inconsistencies

### Client-Side Research
- **DOM Vulnerabilities**: Advanced DOM-based attack vectors
- **Postmessage Exploitation**: Cross-origin communication attacks
- **Browser Parsing Quirks**: Exploiting browser-specific behaviors
