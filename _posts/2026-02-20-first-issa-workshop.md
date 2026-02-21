---
layout: post
title: "My First ISSA Workshop"
date: 2026-02-20
category: Cyber Security
author: James Wells
---

I attended my first ISSA (Information Systems Security Association) workshop today. I joined the ISSA Kentuckiana chapter a few months ago, but I had not been to a meeting yet. I noticed that there was going to be a workshop about network pentesting. I have been trying to study for the CRTP and thought it would fight in perfectly.  I got a discount as a member and it only cost me $50. There were a lot more people at this workshop then I thought there would be, but it was a good time.  We didn't really go through any deep pentesting, but with a room full of knowledgeable people, it was still a great learning experience.

One of my biggest takeaways from this workshop was that searchsploit produces some decent results sometimes. We were copy and pasting the nmap results into the searchsploit command though. We were also talking about using help on the commands to learn syntax. I wasn't really familiar with searchsploit. I thought it basically just grepped for whatever you typed out, but then I saw the --nmap flag. This flag will read the nmap results from an XML file and search for the services automatically.  You have to use the nmap -sV flag for versions and save the output as an XML file.

Then I remembered a post that I read on LinkedIn by Jason Haddix. He was talking about piping naabu's output into nmap by using the --nmap-cli flag. Naabu is written in Go and focuses on solely on port enumeration. It scans the ports asynchronously, so the scans are quick. Then nmap does the service enumeration. Lastly the output from nmap is parsed by searchsploit and if you are lucky, you will have some valuable insights.

Below is the command that I ended up splicing together.
```sudo naabu -host 10.1.0.0/24 -nmap-cli "nmap -sV -oX scan.xml" && searchsploit --nmap scan.xml```

It worked but not as effectively as I thought it would have. It ended up parsing some generic terms as well including FTP, SSH, and HTTP. Then it ran searches for these terms and found many exploits, but there might have only been one or two applicable results.  I am currently in the process of trying to refine this command, but I now understand why it is easier to just copy the service and version name from the results and paste it into searchsploit. 

I did also learn how to take a basic shell and spawn a fully interactive python shell. I had been manually creating another connection back to my attacker machine to create an interactive shell, but if the target has python, there is an easy to remember one-line command to upgrade your shell. The command is:
```/usr/bin/python -c 'import pty; pty.spawn("/bin/bash");'```
This command only works if there is a python binary available though and that binary might be installed in a different location. I still thought it was a neat trick to add to my toolbelt.

I remember reading about how the /etc/shadow file contains passwords and the /etc/passwd file only contains username, but an attack vector we found in this class was to use the openssl command on our attack machine. 
```openssl passwd password```
This command creates a hash from the password entered in the same format of the shadow file hashes. Then, if the passwd file is writable by your user, you can paste the password over the x in the root user entry.
``` root:x:0:0:root:/root:/bin/bash ```
This effectively changes the root password for that Linux machine. Linux prioritizes the entry in the passwd file since it links to the shadow file. Then a simple ```su root``` and voila root access. 