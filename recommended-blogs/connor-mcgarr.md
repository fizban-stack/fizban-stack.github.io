---
layout: detail-page
back_url: /recommended-blogs
back_text: Back to Recommended Blogs
breadcrumb_url: /recommended-blogs
breadcrumb_text: Recommended Blogs
title: Connor McGarr's Blog
focus: Exploit development and Windows internals
category: Offensive Engineering
description: A masterclass in exploit engineering, focusing on the rigorous technical aspects of memory corruption on modern Windows.
image: recommended-blogs/connor-mcgarr.webp
website: https://connormcgarr.github.io/
rss_feed: https://connormcgarr.github.io/feed.xml
---

## Subscribe
**RSS Feed:** [{{ page.rss_feed }}]({{ page.rss_feed }})

---

Connor McGarr specializes in the "art of the exploit." His blog is essential reading for those looking to move beyond simple PoCs to stable, production-grade exploit chains.

---

## Recommended Posts

- [Windows ARM64 Internals](https://connormcgarr.github.io/arm64-windows-internals-basics/): Interrupt Handling: Deep dive into the mechanics of interrupts on Windows for ARM.

- [Kernel Mode Shadow Stacks: Intel CET](https://connormcgarr.github.io/km-shadow-stacks/): Technical analysis of hardware-enforced control flow protection on Windows.

- [Windows ARM64 PAC: Exploit Development](https://connormcgarr.github.io/windows-pac-arm64/): Research into Pointer Authentication and its impact on exploit reliability.

- [Exploit Development: Modern Browser Internals](https://connormcgarr.github.io/browser1/): A look at mitigations and attack surfaces of Chromium-based browsers.

---

## Why Follow This Blog

Connor McGarr provides some of the most detailed exploit development content available. His methodical approach to explaining complex Windows internals and modern mitigation bypasses makes advanced exploitation accessible to dedicated learners willing to invest the time.

## Key Topics Covered

### Windows Kernel Exploitation
- **Pool Exploitation**: Heap and pool corruption techniques
- **Kernel Objects**: Windows kernel structure manipulation
- **Driver Vulnerabilities**: Third-party driver exploitation
- **Privilege Escalation**: Kernel-level privilege elevation
- **Token Manipulation**: Windows token stealing and manipulation

### Mitigation Bypass
- **CFG/XFG**: Control Flow Guard bypass techniques
- **CET**: Control-flow Enforcement Technology analysis
- **ASLR**: Address Space Layout Randomization defeat
- **SMEP/SMAP**: Supervisor mode protection bypass

### Shellcode Engineering
- **Position Independence**: Writing relocatable shellcode
- **Syscall Invocation**: Direct system call techniques
- **Evasion Techniques**: Avoiding detection mechanisms
- **Payload Development**: Custom implant creation

### Memory Corruption
- **Use-After-Free**: Object lifetime exploitation
- **Type Confusion**: Object type manipulation
- **Buffer Overflows**: Stack and heap overflow techniques
- **Integer Overflows**: Arithmetic vulnerability exploitation
