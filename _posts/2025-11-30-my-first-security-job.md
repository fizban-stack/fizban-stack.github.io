---
layout: post
title: "My First Security Job"
date: 2025-11-30
category: Personal Growth
author: James Wells
---

## Firewall
After a recent cyber incident, my employer realized that cybersecurity should be more important and have more resources that they had budgeted for it. They did not have a cybersecurity position before, but they created the IT Security Administrator position. As a new cybersecurity position, it's responsibilities are just being created. My first task was to replace end-of-life Cisco ASAs with newer Cisco Meraki devices. This was a fairly easy conversion, just transferring rules and assigning ports. It had some new features including inline IDS/IPS and a layer 7 firewall. The first thing that I did was to add Geo-Blocking rules to the firewall and turn on IPS. 

## Microsoft 365
The second thing that I did was to implement conditional access rules for our Microsoft 365 tenant. We were in the process of implementing company wide multi-factor authentication before the incident, but afterwards we forced the MFA. It took us a few long hours to walk the non-technical side of the company through downloading the Microsoft Authenticator app and setting up MFA. The second conditional access rule prevents anyone from accessing our tenant unless they are coming from a trusted network.  The third conditional access policy prevents login using legacy authentication methods. We have a different tenant for a company we support, but their license does not support conditional access rules. The only option I had was to turn on Microsoft security defaults. This enables MFA based off of risk that Microsoft attributes to the login. This has caused MFA for that tenant to be a long drawn out process in which we are adding people one at a time, sometimes with weeks in between. To solve this issue, I create a PowerShell script that enables MFA for all users in that tenant. We have to turn it on for new users in the admin console, but this script prevented us from having to manually change it for each employee.

## Backups
We are also implementing a more comprehensive backup solution in which we ensure SQL databases are backed up and test their recover on a quarterly basis. Before the incident, we were testing to ensure that files were recoverable, but since we have sensitive data, we tried to stay away from that. 

## Syslog Server
During the incident, the logs were wiped from several devices, including the Cisco ASA and Active Directory Domain Controller. This led us to adding a syslog server to store those logs in case of another incident. I chose to implement Graylog for this solution. It was the most comprehensive, free syslog server that did not require massive amounts of resources. I set up a headless Ubuntu 25.10 virtual machine and then locked it down using firewall rules. The only ports exposed are the three needed for Graylog and the SSH port. SSH was locked down to prevent access with a password and require key-based authentication. I also implemented fail2ban to ban sources that failed to connect after a three attempts. Graylog was configured in a Docker container to be easily deployed or redeployed. The only ports exposed on the container are:
- 5140/UDP for Syslog
- 5044/TCP for Beats (Active Directory)
- 9001/TCP for WebUI