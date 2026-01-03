// Training page - data and rendering logic
const trainingData = [
  {
    image: "images/training/tryhackme.webp",
    alt: "TryHackMe",
    title: "TryHackMe",
    description: "Interactive cybersecurity training platform with hands-on labs covering penetration testing, security operations, and more.",    links: {
      website: "https://tryhackme.com"
    }
  },
  {
    image: "images/training/htb.webp",
    alt: "Hack The Box",
    title: "Hack The Box",
    description: "Platform for penetration testing training with realistic vulnerable machines and capture the flag challenges.",    links: {
      website: "https://www.hackthebox.com"
    }
  },
  {
    image: "images/training/overthewire.webp",
    alt: "OverTheWire",
    title: "OverTheWire",
    description: "Wargames that help you learn and practice security concepts through fun challenges and games.",    links: {
      website: "https://overthewire.org/wargames/"
    }
  },
    {
    image: "images/training/underthewire.webp",
    alt: "UnderTheWire",
    title: "UnderTheWire",
    description: "Wargames that help you learn and practice PowerShell and security concepts through fun challenges and games.",    links: {
      website: "https://underthewire.tech/wargames/"
    }
  },
  {
    image: "images/training/picoctf.webp",
    alt: "picoCTF",
    title: "picoCTF",
    description: "Free computer security education program with year-round practice challenges for students and beginners.",    links: {
      website: "https://picoctf.org"
    }
  },
  {
    image: "images/training/cybrary.webp",
    alt: "Cybrary",
    title: "Cybrary",
    description: "Offers free cybersecurity courses covering various topics from beginner to advanced levels.",    links: {
      website: "https://www.cybrary.it"
    }
  },
  {
    image: "images/training/letsdefend.webp",
    alt: "LetsDefend",
    title: "LetsDefend",
    description: "Blue team training platform with hands-on SOC analyst experience and incident response scenarios.",    links: {
      website: "https://letsdefend.io"
    }
  },
  {
    image: "images/training/portswigger.webp",
    alt: "PortSwigger Web Security Academy",
    title: "PortSwigger Web Security Academy",
    description: "Free online training from the creators of Burp Suite, covering web security vulnerabilities and exploitation.",    links: {
      website: "https://portswigger.net/web-security"
    }
  },
  {
    image: "images/training/owasp.webp",
    alt: "OWASP",
    title: "OWASP",
    description: "Open Web Application Security Project with free resources, tools, and documentation for application security.",    links: {
      website: "https://owasp.org"
    }
  },
  {
    image: "images/training/hackerone.webp",
    alt: "HackerOne",
    title: "HackerOne",
    description: "Bug bounty platform with a training site where you can practice vulnerability research on real programs and earn rewards.",    links: {
      website: "https://www.hacker101.com"
    }
  },
  {
    image: "images/training/bugcrowd.webp",
    alt: "Bugcrowd",
    title: "Bugcrowd",
    description: "Crowdsourced security platform offering bug bounty programs and security testing opportunities. Has a training site as well.",    links: {
      website: "https://www.bugcrowd.com/resources/levelup/introduction-to-bugcrowd-university/"
    }
  },
  {
    image: "images/training/intigriti.webp",
    alt: "Intigriti",
    title: "Intigriti",
    description: "European bug bounty and security platform connecting ethical hackers with companies and providing training for people trying to get into bug bounty.",    links: {
      website: "https://www.intigriti.com/researchers/hackademy"
    }
  },
  {
    image: "images/training/yeswehack.webp",
    alt: "YesWeHack",
    title: "YesWeHack",
    description: "European bug bounty platform and vulnerability coordination platform for ethical hackers. YesWeHack Dojo provides training opportunities for bug hunters.",    links: {
      website: "https://www.dojo-yeswehack.com"
    }
  },
  {
    image: "images/training/hacktricks.webp",
    alt: "HackTricks",
    title: "HackTricks",
    description: "Comprehensive wiki with penetration testing techniques, methodologies, and security knowledge.",    links: {
      website: "https://book.hacktricks.xyz"
    }
  },
  {
    image: "images/training/0xdf.webp",
    alt: "0xdf Hacks Stuff",
    title: "0xdf Hacks Stuff",
    description: "Detailed walkthroughs and write-ups for HackTheBox machines and CTF challenges.",    links: {
      website: "https://0xdf.gitlab.io"
    }
  },
  {
    image: "images/training/cisco.webp",
    alt: "Cisco Networking Academy",
    title: "Cisco Networking Academy",
    description: "Free networking and cybersecurity courses from Cisco, including cybersecurity essentials.",    links: {
      website: "https://www.netacad.com"
    }
  },
  {
    image: "images/training/microsoft.webp",
    alt: "Microsoft Learn",
    title: "Microsoft Learn",
    description: "Free learning platform with cybersecurity training paths and Azure security content.",    links: {
      website: "https://learn.microsoft.com"
    }
  },
  {
    image: "images/training/antisyphon.webp",
    alt: "Antisyphon Training",
    title: "Antisyphon Training",
    description: "Pay-What-You-Can security training with live instruction from industry professionals.",    links: {
      website: "https://www.antisyphontraining.com"
    }
  },
  {
    image: "images/training/tcmsecurity.webp",
    alt: "TCM Security Academy",
    title: "TCM Security Academy",
    description: "Practical penetration testing and security training with hands-on courses that is affordable.",    links: {
      website: "https://academy.tcm-sec.com"
    }
  },
  {
    image: "images/training/simplycyber.webp",
    alt: "Simply Cyber",
    title: "Simply Cyber",
    description: "Cybersecurity career guidance, training resources, and community support for beginners.",    links: {
      website: "https://www.simplycyber.io"
    }
  },
  {
    image: "images/training/buildcyber.webp",
    alt: "Build Cyber",
    title: "Build Cyber",
    description: "Resources and guidance for building a career in cybersecurity with practical advice. Includes vouchers for individuals in need to receive free training courses including, Hack the Box certifications, the Offsec OSCP, and many more.",    links: {
      website: "https://www.buildcyber.com"
    }
  },
  {
    image: "images/training/hacksmarter.webp",
    alt: "Hack Smarter",
    title: "Hack Smarter",
    description: "Security training and resources focused on practical hacking skills and career development.",    links: {
      website: "https://www.hacksmarter.org"
    }
  },
  {
    image: "images/training/executiveoffense.webp",
    alt: "Executive Offense",
    title: "Executive Offense",
    description: "Advanced offensive security training and resources for security professionals.",    links: {
      website: "https://executiveoffense.beehiiv.com/"
    }
  },
  {
    image: "images/training/redteamleaders.webp",
    alt: "Red Team Leaders",
    title: "Red Team Leaders",
    description: "Resources for red team professionals and offensive security practitioners. Contains detailed, technical content and most of the courses are free. Certifications are offered as well and most cost under $20.",    links: {
      website: "https://courses.redteamleaders.com"
    }
  },
  {
    image: "images/training/hackinghub.webp",
    alt: "Hacking Hub",
    title: "Hacking Hub",
    description: "Security training platform with hands-on labs and cybersecurity challenges.",    links: {
      website: "https://www.hackinghub.io"
    }
  },
  {
    image: "images/training/pentest-ground.webp",
    alt: "Pentest-Ground",
    title: "Pentest-Ground",
    description: "A free playground with deployed vulnerable web applications and network services.",    links: {
      website: "https://www.pentest-ground.com"
    }
  },
  {
    image: "images/training/websploit.webp",
    alt: "Websploit Labs",
    title: "Websploit Labs",
    description: "A collection of vulnerable docker containers assembled by Omar Santos containing several labs including, OWASP Juice Shop and DVWA(Damn Vulnerable Web App).",    links: {
      website: "https://github.com/The-Art-of-Hacking/websploit"
    }
  }
];

// Build training grid
function buildTraining() {
  const trainingContainer = document.getElementById('training-grid-placeholder');
  if (!trainingContainer) return;

  let trainingHTML = '';
  trainingData.forEach(training => {
    // Build the links (only if they exist)
    let websiteLink = training.links.website ?
      `<a href="${training.links.website}" target="_blank" class="btn btn-dark">Visit Website</a>` : '';
    let blogLink = training.links.blog ?
      `<a href="${training.links.blog}" target="_blank" class="btn btn-outline-secondary ms-2">Read Blog Post</a>` : '';

    // Create the final card HTML
    trainingHTML += `
      <div class="col-md-6 col-lg-4" data-aos="fade-up">
          <div class="card project-card h-100 d-flex flex-column">
              <img src="${training.image}" class="card-img-top" alt="${training.alt}">
              <div class="card-body d-flex flex-column">
                  <h5 class="card-title">${training.title}</h5>
                  <p class="card-text">${training.description}</p>                  <div class="mt-auto">
                      ${websiteLink}
                      ${blogLink}
                  </div>
              </div>
          </div>
      </div>
    `;
  });

  trainingContainer.innerHTML = trainingHTML;
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", function() {
  buildTraining();
});
