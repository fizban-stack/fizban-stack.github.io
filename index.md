---
layout: default
title: Home
description: The personal portfolio of James Wells, an aspiring cybersecurity practitioner and home lab enthusiast.
---

<div class="container home_2col">
  <div class="row align-items-center">
    <div class="col-md-6">
      <img src="{{ '/assets/images/resume.webp' | relative_url }}" class="rounded img-fluid d-block dibley" alt="Headshot of James Wells" loading="lazy">
    </div>
    <div class="col-md-6">
      <h1>Welcome to my site.</h1>
    </div>
  </div>
</div>

Hello, My name is James Wells. I am an aspiring cybersecurity practitioner, father of three, and home lab enthusiast. I have dedicated a large amount of time and money over the last five years to these projects and plan on using this space to present them. I want to do this not only to help my career, but also for my own learning documentation. I started a blog using Ghost a little while ago, but recently transitioned to hosting my posts on this site. I hope that you can gain something from this site. It might be a new training platform or podcast that really has nothing to do with my site, but I want to help build a better cybersecurity community, especially in my area where there is not any kind of technical community. A link to my resume can be found on my [contact](./contact.md) page.

---

<article>
<h2>Self-Hosted</h2>

I have recently added a Self-Hosted page that I have listed a few of my favorite self-hosted applications. This is by no means a comprehensive list, but does include most of the core applications that I use daily. I plan on adding more to this list when I have more time to go through my Docker stack and build pages for the applications. I will say that if I had to choose just one of these services to keep, it would be Proxmox. I have tried using Virtual Box, VMware Workstation Pro, and Hyper V, but I liked the idea of having a remote always on box that was not my daily driver. I used TrueNAS for a while and experimented with XCP-ng, but I also ended up coming back to Proxmox. It has a WebUI that can be as simple or as complex as you want it to be. You can only create and edit VMs or you can dive into Software-Defined Networking, VM Templates, and more complex topics. I have been using it for years and have used it in many different configurations, from high-availability clusters to a couple of standalone nodes.
</article>

<article>
<h2>Homelab Video Tour</h2>
<p>This video provides a short tour of the homelab services that I am currently running. It has been a kind of obsession of mine. There are so many things to learn and each project is a piece of the puzzle. I have tried many other projects I found on sites like <a href="https://selfh.st">selfh.st</a> and <a href="https://awesome-selfhosted.net/">Awesome Self-Hosted</a>. I was also introduced to several projects listening to the <a href="./podcasts/self-hosted.html">Self-Hosted Podcast</a> and the <a href="./podcasts/the-homelab-show.html">Homelab Show</a>. Both of these podcasts have stopped releasing episodes, but the hosts of Self-Hosted discuss homelab projects sometimes on the <a href="https://linuxunplugged.com/">Linux Unplugged</a> podcast. In my Docker Compose repository, I have over 200 yaml files. I am currently running about 100 docker containers, including databases. I have been thinking about trying to cut down on the number of database containers, but so many projects only work with a certain database or a certain version of that database.</p>
</article>

<video controls preload="auto">
  <source src="{{ '/assets/videos/homepage.mp4' | relative_url }}" type="video/mp4">
  Your browser does not support the video tag.
</video>



<article>
<h2>Free Cybersecurity Training</h2>

I added another page to my site in which I have listed some of the free places that you can receive cybersecurity or even just IT training. This is also not a comprehensive list and the services are not ordered in any specific way. I just wanted to put together a list for people that are just starting to learn about cybersecurity and are having a hard time finding the best resources out of the massive amount available online today.

</article>

<article>
<h2>Recommended Podcasts</h2>

This might be the last page that I add to my site. It is a list of some of my favorite podcasts related to IT or cybersecurity. They are also not ordered in any specific way. Most of them are technical and I have to admit that when I was just learning, I had no idea what they were talking about. As I continued to grow and learn, I would spend time learning a topic like cross-site request forgery and then I would remember hearing about it in the Critical Thinking Podcast, go back and listen to that episode, and it would help to build my understanding of more complex topics that textbooks don't often teach. Critical Thinking Podcast is one of my favorite because they full-time bug bounty hunters, some of the best in the world, and they don't just give you a quick breakdown of a topic, they dive into the technical details. Listening to these podcasts also helped me to become familiar with a lot of the industry language and terminology and find topics that I was interested in learning more about. I spend a lot of time driving around for my job and I like to listen to podcasts instead of music because I feel like my time is to valuable to not spend it learning and growing. This isn't to say that I don't like or listen to music. I have a massive music collection from almost every genre, but I prefer to listen to music when I am learning with my hands and eyes, while doing chores around the house, or when I am feeling some type of way.

</article>

<article>
<h2>Changes to Blog</h2>

I had been using the Ghost blogging platform to write some short blog posts, but I was not using any of the features except posting and publishing pages. For those reasons, I decided it would better fit my needs to add the blog functionality to my GitHub page. I have transitioned all of my published posts to this site now and am working on finishing the unpublished ones and transferring them. When this is complete, I will be shutting down my blog located at blog.wellslabs.org. I have been using various methods to put this blog on the internet including Tailscale Funnel, Pangolin hosted on a VPS, and Cloudflare tunnels. While each of these solutions worked for me, they all relied on my home internet being online. If my ISP had an outage, than all of my sites would become unavailable. This was fine for programs that I personally used or that my family used, but I thought it could be detrimental to my professional brand. If I link my blog in social media and then someone wants to take a look at it, it could potentially hurt my brand if it is offline.

</article>

<article>
<h2>Vulnerable Labs</h2>

I added a page with a list of vulnerable labs that can be hosted on your home computers. There are several sites like Hack the Box that host training platforms, but charge for access to them. I found that hosting the labs on my computers allows me to save money, but also the ability to customize the labs. I can add features or manipulate them in ways that allow me guide my own learning.

</article>
