---
layout: post
title: "My Pwnagotchi aka Bobby"
date: 2025-10-18
category: Cybersecurity
author: James Wells
---

I recently set up a Pwnagotchi, an AI-powered Wi-Fi security research tool that runs on a Raspberry Pi Zero W. Built by Simone Margaritelli (evilsocket), Pwnagotchi uses deep reinforcement learning to learn from its Wi-Fi environment and autonomously capture WPA handshakes from nearby networks. Think of it as a Tamagotchi, but instead of feeding it, you're training an AI to become better at WiFi reconnaissance. The project displays adorable ASCII faces that change based on its mood and success rate, making security research surprisingly endearing.

My configuration leverages several community plugins from repositories by jayofelony, Sniffleupagus, and others. I've enabled the grid plugin for sharing statistics with the Pwnagotchi community, along with auto-tune to optimize the AI's learning parameters automatically. The session-stats plugin tracks my device's performance over time, helping me see how well my Pwnagotchi is learning. I'm running it with the web interface enabled for remote management, which makes it easy to check in on its progress and download captured handshakes.

One interesting aspect of my setup is the memory filesystem optimization, which uses zram to reduce SD card wear by keeping logs and data in compressed RAM. This is crucial for long-term reliability since Raspberry Pi SD cards can wear out quickly with constant writes. I've also configured it to whitelist certain networks and disabled the display output, opting instead to access everything through the web interface. The result is a portable, autonomous security research device that continues learning and improving its Wi-Fi reconnaissance skills wherever I take it.

The first thing I did once I had a working version on Pwnagotchi was show it to my children. They thought it was the cutest thing ever until I told them that it was the reason they were getting kicked off the internet. I plugged it back into the computer and made some changes to the config file. I changed it's hostname to bobby and whitelisted my home Wi-Fi. This stopped it from attacking my Wifi network. I was living in an apartment at the time and thought about turning it loose on the 30 Wi-Fi networks within range. I was pretty sure that nobody living near me was technical enough to trace it back, but since it is a crime I created a VLAN and set it up to only attack that VLAN by modifying bettercap to specify a specific SSID.

I really enjoyed this project but the only downside is that I can't ever take bobby outside to play without breaking the law.
