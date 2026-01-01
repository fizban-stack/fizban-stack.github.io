// Podcasts page - data and rendering logic
const podcastData = [
  {
    image: "images/podcasts/critical-thinking.webp",
    alt: "Critical Thinking",
    title: "Critical Thinking",
    description: "A podcast focused on the technical details of bug bounty.",    links: {
      website: "https://www.criticalthinkingpodcast.io/"
    }
  },
  {
    image: "images/podcasts/darknet-diaries.webp",
    alt: "Darknet Diaries",
    title: "Darknet Diaries",
    description: "True stories from the dark side of the Internet.",    links: {
      website: "https://darknetdiaries.com"
    }
  },
  {
    image: "images/podcasts/behind-the-binary.webp",
    alt: "Behind the Binary",
    title: "Behind the Binary",
    description: "Exploring technology and Reverse Engineering.",    links: {
      // website: "#"
    }
  },
  {
    image: "images/podcasts/pauls-security-weekly.webp",
    alt: "Paul's Security Weekly",
    title: "Paul's Security Weekly",
    description: "Weekly discussion on the latest security news and tools.",    links: {
      website: "https://www.scworld.com/podcast-show/pauls-security-weekly"
    }
  },
  {
    image: "images/podcasts/david-bombal.webp",
    alt: "David Bombal",
    title: "David Bombal",
    description: "Networking, cybersecurity, and IT career advice.",    links: {
      website: "https://davidbombal.com"
    }
  },
  {
    image: "images/podcasts/insecure-agents.webp",
    alt: "Insecure Agents",
    title: "Insecure Agents",
    description: "A podcast about security, privacy, and technology.",    links: {
      website: "https://insecureagents.com/"
    }
  },
  {
    image: "images/podcasts/security-noise.webp",
    alt: "Security Noise",
    title: "Security Noise",
    description: "Cutting through the noise in cybersecurity with TrustedSec.",    links: {
      website: "https://trustedsec.com/resources"
    }
  },
  {
    image: "images/podcasts/linux-unplugged.webp",
    alt: "LINUX Unplugged",
    title: "LINUX Unplugged",
    description: "The Linux Action Show for the community, by the community.",    links: {
      website: "https://linuxunplugged.com"
    }
  },
  {
    image: "images/podcasts/what-the-hack.webp",
    alt: "What the Hack?",
    title: "What the Hack?",
    description: "A podcast exploring hacking and cybersecurity topics.",    links: {
      website: "https://whatthehack.show/"
    }
  },
  {
    image: "images/podcasts/across-the-pondcast.webp",
    alt: "Across the Pondcast",
    title: "Across the Pondcast",
    description: "UK-based cybersecurity podcast covering news and trends.",    links: {
      website: "https://www.acrossthepondcast.net/"
    }
  },
  {
    image: "images/podcasts/blue-security-podcast.webp",
    alt: "Blue Security",
    title: "Blue Security",
    description: "Defensive security strategies and blue team tactics.",    links: {
      website: "https://bluesecuritypod.com"
    }
  },
  {
    image: "images/podcasts/hacker-valley-studio.webp",
    alt: "Hacker Valley Studio",
    title: "Hacker Valley Studio",
    description: "Stories from the cybersecurity community.",    links: {
      website: "https://hackervalley.com/podcast"
    }
  },
  {
    image: "images/podcasts/the-hackers-cache.webp",
    alt: "The Hacker's Cache",
    title: "The Hacker's Cache",
    description: "A podcast about hacking, security, and technology.",    links: {
      website: "https://podcast.kyserclark.com/"
    }
  },
  {
    image: "images/podcasts/bug-bounty-reports-explained.webp",
    alt: "Bug Bounty Reports Explained",
    title: "Bug Bounty Reports Explained",
    description: "Breaking down real bug bounty reports and vulnerabilities.",    links: {
      website: "https://www.bugbountyexplained.com/"
    }
  },
  {
    image: "images/podcasts/cyber-work.webp",
    alt: "Cyber Work",
    title: "Cyber Work",
    description: "Career advice and insights for cybersecurity professionals.",    links: {
      website: "https://www.infosecinstitute.com/podcast/"
    }
  },
  {
    image: "images/podcasts/hacked.webp",
    alt: "Hacked",
    title: "Hacked",
    description: "Stories of hacking incidents and security breaches.",    links: {
      website: "https://linktr.ee/hackedpodcast"
    }
  },
  {
    image: "images/podcasts/offsec-podcast.webp",
    alt: "OffSec Podcast",
    title: "OffSec Podcast",
    description: "Offensive Security's podcast covering penetration testing and security. This podcast has not produced any new episodes in a few years, but I found that the content is still applicable.",    links: {
      website: "https://www.offsec.com/podcast/"
    }
  },
  {
    image: "images/podcasts/self-hosted.webp",
    alt: "Self-Hosted",
    title: "Self-Hosted",
    description: "A podcast about self-hosting, privacy, and taking control of your data. This podcast has stopped producing episodes, but I have always found it had great content and it was one of the things that inspired me to create my own homelab.",    links: {
      website: "https://selfhosted.show"
    }
  },
  {
    image: "images/podcasts/simply-offensive.webp",
    alt: "Simply Offensive",
    title: "Simply Offensive",
    description: "Offensive security topics made simple.",    links: {
      website: "https://thehackermaker.com/simply-offensive/"
    }
  },
  {
    image: "images/podcasts/the-homelab-show.webp",
    alt: "The Homelab Show",
    title: "The Homelab Show",
    description: "Everything about building and maintaining your homelab. This podcast has also stopped producing new episodes, but much like the Self-Hosted Podcast this show help to inspire my homelab journey.",    links: {
      website: "https://thehomelab.show"
    }
  },
  {
    image: "images/podcasts/unsupervised-learning.webp",
    alt: "Unsupervised Learning",
    title: "Unsupervised Learning",
    description: "Security, technology, and artificial intelligence.",    links: {
      website: "https://danielmiessler.com/"
    }
  }
];

// Build podcasts grid
function buildPodcasts() {
  const podcastContainer = document.getElementById('podcast-grid-placeholder');
  if (!podcastContainer) return;

  let podcastsHTML = '';
  podcastData.forEach(podcast => {
    // Build the links (only if they exist)
    let websiteLink = podcast.links.website ?
      `<a href="${podcast.links.website}" target="_blank" class="btn btn-dark">Visit Website</a>` : '';

    // Create the final card HTML
    podcastsHTML += `
      <div class="col-md-6 col-lg-4" data-aos="fade-up">
          <div class="card project-card h-100 d-flex flex-column">
              <img src="${podcast.image}" class="card-img-top" alt="${podcast.alt}">
              <div class="card-body d-flex flex-column">
                  <h5 class="card-title">${podcast.title}</h5>
                  <p class="card-text">${podcast.description}</p>                  <div class="mt-auto">
                      ${websiteLink}
                  </div>
              </div>
          </div>
      </div>
    `;
  });

  podcastContainer.innerHTML = podcastsHTML;
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", function() {
  buildPodcasts();
});
