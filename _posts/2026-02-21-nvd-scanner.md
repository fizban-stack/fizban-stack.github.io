---
layout: post
title: "NVD Scanner"
date: 2026-02-21
category: Cyber Security
author: James Wells
---

For my final project in a JavaScript course at Champlain College, I create a dynamic webpage that can perform a keyword search on the [NVD website](https://nvd.nist.gov/vuln/detail).  It will return the CVE name with a link to that NVD page. It also returns a description, severity, PoCs if linked on NVD page, and CWE with a link to that CWE's description on [Mitre's website](https://cwe.mitre.org/data/index.html). 

In the future, I would like to add a pipeline for Nmap results, but I need to figure out how to filter out some of the more broad searches. I don't need it to return every result about FTP or SSH. I am thinking about making the results into a downloadable file. I was also thinking about creating my own PoC entries anytime I have to create one or find one from a different site. I might also add in other API queries to help enrich data. The scanner can be found [here](/scanner/index.html).