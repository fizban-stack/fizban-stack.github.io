---
layout: post
title: "My First Cyber Incident"
date: 2025-10-19
category: Cybersecurity
author: James Wells
---

## The Alerts
On the Sunday before Labor Day 2025, I woke up in the morning to several email alerts from Sophos EDR. They were all medium alerts that stated a server was trying to encrypt workstations, but the process was stopped by Sophos. The alarming thing was that the attempts were coming from a server and they were attacking every endpoint in that location. Once I arrived at the location, it became apparent quickly that all of our server had been encrypted.  Our hearts dropped when we saw the desktop and the ransom notes in every directory. 
![Desktop](/assets/images/blog/first-incident/ransom-desktop.webp)
![Ransom Note](/assets/images/blog/first-incident/ransom-note.webp)
![Directory with Encrypted Files](/assets/images/blog/first-incident/encrypted-folder.webp)
After reading the note, we came to the conclusion that it was a default note because most of the information did not apply to us. All of the encrypted files had an extension added to them that was our identifier from the threat actors. We immediately disconnected everything and began to determine how deep the damage went. The note identified the threat actor as the Qilin ransomware group. This did not help with attribution since they are a ransomware-as-a-service group and anyone could purchase their services.

## Reporting
We reported the attack to the local FBI office and to CISA, but never heard back from the FBI and CISA responded with a generic email. We quickly realized that they were not going to be able to help us retrieve our data. This my first experience with a cyber attack in real-time and I quickly realized that there was no way that all the preparation in the world would have prepared me for the pressure of ransomware. The entire company was looking to us to restore operation and we realized that there would not be any free assistance. My boss does cybersecurity for Kentucky National Guard and he reached out to some of his contacts, but we mostly only received information from them, including a threat report about Qilin.

## The Damage
After some investigation, we realized that our HR, Fiscal, and file servers were all encrypted. We had another file server that stored confidential data about families for the First Steps program and we were fortunate that it was not joined to the Active Directory environment. There was a site-to-site VPN from this location to another central location for a partner company. After investigation, it was determined that they were not affected either. Our backup system was implemented several years earlier and consisted of a patchwork of programs. To our horror, we realized that the system had failed to backup the actual SQL databases for our HR and Fiscal systems. We had a manual backup from 1 year prior when we switched to a new version of the Sage software, but a years worth of data would be hard to recreate, though not impossible. At this point, it was decided it would be best to hire an external company for the incident response. We hired PNG Cyber and began a months long process of recovery and negotiation with the threat actors.

## The Attack Path
I have been dedicating most of my free time to learning about cybersecurity and staying current. It was close to a week after the incident that I saw a story about massive internet scans for Cisco ASA devices. The stories reported that usually this led to zero-day vulnerabilities being disclosed, but at that time there were none reported yet.

As it turned out, our perimeter was the entry point. The threat actors exploited a critical vulnerability in our Cisco ASA (likely the chain of CVE-2025-20333 and CVE-2025-20362), which allowed for unauthenticated remote code execution. This gave them the initial foothold they needed to bypass our firewall protections and enter the internal network.

### Lateral Movement and Escalation
Once inside, the attackers moved with calculated precision. They identified an old, dormant Active Directory account that had been overlooked during previous audits. Using this account, they were able to perform privilege escalation, eventually gaining Domain Admin rights.

To spread the ransomware across our servers and workstations, they utilized PsExec, a legitimate Windows administrative tool that is frequently repurposed by Qilin for lateral movement. Before executing the final encryption payload, the actors were careful to clear the Windows Event Logs to mask their tracks and hinder our initial forensic efforts.

### Data Exfiltration
Before the first file was ever encrypted, the group focused on data theft. We discovered that they used rclone, an open-source command-line program, to sync and exfiltrate over 100GB of sensitive data—including HR records and financial statements—to their private cloud storage. This "double extortion" tactic meant that even if we could restore from backups, they still held our data hostage with the threat of public release.

## The Resolution
After exhausting all other options and consulting with PNG Cyber, our leadership made the difficult decision to negotiate. The ransom was paid, and in return, the Qilin group provided the decryption keys and a "security report" detailing their entry method.

The recovery process was grueling. Every server had to be wiped and rebuilt from scratch to ensure no persistence mechanisms remained. We spent weeks verifying the integrity of the restored SQL databases and cross-referencing records to ensure no data was corrupted during the decryption process. It took exactly two months of long nights and weekends, but by November 2025, our business was finally back to normal operations.

This incident was a painful wake-up call regarding the importance of "zombie" account cleanup and the critical need for a more robust, verified backup strategy.