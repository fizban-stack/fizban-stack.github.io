---
layout: detail-page
back_url: /self-hosted
back_text: Back to Self-Hosted Apps
breadcrumb_url: /self-hosted
breadcrumb_text: Self-Hosted
title: CyberChef
subtitle: The Cyber Swiss Army Knife
description: Web app for encryption, encoding, compression, and data analysis.
image: self-hosted/cyberchef.webp
github: https://github.com/gchq/CyberChef
official: https://gchq.github.io/CyberChef
---

CyberChef is a web application for encryption, encoding, compression, and data analysis developed by GCHQ. It's like a Swiss Army knife for data transformations.

## Key Features

- 300+ operations
- Drag-and-drop recipe builder
- Base64, hex, binary encoding
- Encryption and hashing
- Data format conversion
- Network analysis tools

## Why I Use It

CyberChef is one of those tools that shows up constantly once you know it exists. In CTFs it's indispensable — chaining together base64 decodes, XOR operations, hex conversions, and hash lookups into a single recipe is exactly the kind of thing that turns a frustrating challenge into a solved one. Outside of CTFs I reach for it whenever I need to quickly inspect or manipulate data: decoding a JWT, analyzing a suspicious string, converting between formats, or just checking what an encoded blob actually says. The recipe system is what makes it so powerful — you can build up multi-step transformations visually and reuse them. Having it self-hosted means I'm not pasting anything sensitive into a public instance.
