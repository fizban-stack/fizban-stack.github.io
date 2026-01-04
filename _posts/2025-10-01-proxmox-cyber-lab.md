---
layout: post
title: "Proxmox Cyber Lab"
date: 2025-10-01
category: Cybersecurity
author: James Wells
---

I have been working on recreating my cyber lab and I found a solution that I believe I will stick with. I have several VMs on Proxmox that are all connected to an internal network. I was using a Kali VM on Proxmox for all of my testing, but I wanted to be able to reach the cyber lab from different machines. I had been using Tailscale for my VPN for a while, but had never thought of using it for my cyber lab until today.

The first step was to create a Windows 2019 Server with a desktop and then promote it to a domain controller. I took a backup snapshot at this point, so I could always go back to a known good configuration. Then I created a Windows 2022 Server without a desktop and promoted it to a domain controller for the same domain. I had never performed this without a GUI before so it was a learning experience for me. Using the console, it was trivial to change the computer name, setup the network, and add it to the domain. Afterwards, I used PowerShell to promote it to a domain controller using the following commands:

```powershell
$credential = Get-Credential
$safeModePassword = Get-Credential
Install-ADDSDomainController -DomainName "corp.lan" -Credential $credential -SafeModeAdministratorPassword $safeModePassword
```

I wanted to create a CLI domain controller to help me learn Active Directory Powershell commands. I used to think it was easier to manage a Domain Controller with the GUI, but using PowerShell-Remoting or Invoke-Command makes it faster and easier.

Then, I created a Windows 10 VM and added it to the domain. Afterwards, I created a Linux VM and installed Tailscale on it. I setup Tailscale to route traffic to the internal subnet. I went into the Tailscale console and configured the DNS server for the corp.lan domain to be the first domain controller. This allows me to use DNS names instead of IP address.

I wanted to add some services that I knew were vulnerable as well so, I downloaded the Metasploitable 2 VM. I then uploaded it to Proxmox, uncompressed the disk, and converted it to qemu. I wanted Metasploitable 3 as well, but it took a little more effort. I went through the steps of using Vagrant to create the VM and then uploaded it the same way.

Now I have a basic cyber lab that I can use for testing. Installing Tailscale not only allows me to test with other machines, but as to access my lab from anywhere. The next project for my lab is to create another domain in the Active Directory forest and build a trust relationship between them.
