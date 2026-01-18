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

## Technical Depth
- **Windows Kernel**: Exploiting pool overflows and understanding internal structures.
- **Mitigation Bypasses**: Analyzing CET (Control-flow Enforcement Technology) and XFG.
- **Shellcode Development**: Writing custom, PIC (Position Independent Code) for advanced exploitation.

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
- **Kernel CFI**: Kernel control-flow integrity research

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

## Research Methodology

### Rigorous Analysis
Connor's approach includes:
- Deep Windows internals research
- Source code and binary analysis
- Mitigation effectiveness evaluation
- Detailed documentation

### Educational Focus
Content designed to:
- Explain complex concepts clearly
- Provide reproducible examples
- Build from fundamentals
- Enable independent research

## Notable Research Areas

### Modern Windows Exploitation
Comprehensive coverage of:
- Current mitigation landscape
- Bypass technique evolution
- Kernel exploitation patterns
- Real-world applicability

### Exploit Reliability
Focus on:
- Stable exploitation techniques
- Cross-version compatibility
- Error handling in exploits
- Production-grade development

## Who Should Follow

### Exploit Developers
Essential for Windows exploitation techniques.

### Vulnerability Researchers
Deep understanding of Windows internals.

### Red Team Operators
Advanced techniques for assessments.

### Security Engineers
Understanding exploits for better defense.

### Malware Analysts
Insight into advanced malware techniques.

## Best Practices for Following

### Build Foundations
- Study Windows internals fundamentals
- Learn assembly language
- Understand memory management

### Hands-On Practice
- Set up Windows kernel debugging
- Reproduce techniques in labs
- Build your own exploits

### Track Evolution
- Follow Windows security updates
- Monitor mitigation changes
- Study new bypass techniques

## Recommended Posts

### Must-Read Research
1. **"Windows Kernel Pool Exploitation"** - Comprehensive guide to pool corruption on modern Windows
2. **"Bypassing Control Flow Guard (CFG)"** - Techniques for defeating Microsoft's CFI implementation
3. **"Introduction to Windows Kernel Exploitation"** - Foundation for kernel security research
4. **"Writing Custom Shellcode"** - Developing position-independent code for exploitation
5. **"CET and Shadow Stacks Analysis"** - Understanding Intel's hardware security features

### For Beginners
Start with the introductory kernel exploitation posts before tackling mitigation bypasses.

### For Intermediate Practitioners
Focus on the CFG/XFG bypass research for current-gen exploitation.

### For Advanced Researchers
Study the CET analysis for cutting-edge mitigation bypass techniques.

Connor McGarr's blog represents essential reading for anyone serious about Windows exploitation, providing the technical depth needed to develop reliable, modern exploits.