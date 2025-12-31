// Podcasts page - data and rendering logic
const podcastData = [
  {
    image: "images/podcasts/critical-thinking.webp",
    alt: "Critical Thinking",
    title: "Critical Thinking",
    description: "A podcast focused on the technical details of bug bounty.",    links: {
      // website: "#"
    }
  },
  {
    image: "images/podcasts/darknet-diaries.webp",
    alt: "Darknet Diaries",
    title: "Darknet Diaries",
    description: "True stories from the dark side of the Internet.",    links: {
      // website: "#"
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
      // website: "#"
    }
  },
  {
    image: "images/podcasts/david-bombal.webp",
    alt: "David Bombal",
    title: "David Bombal",
    description: "Networking, cybersecurity, and IT career advice.",    links: {
      // website: "#"
    }
  },
  {
    image: "images/podcasts/insecure-agents.webp",
    alt: "Insecure Agents",
    title: "Insecure Agents",
    description: "A podcast about security, privacy, and technology.",    links: {
      // website: "#"
    }
  },
  {
    image: "images/podcasts/security-noise.webp",
    alt: "Security Noise",
    title: "Security Noise",
    description: "Cutting through the noise in cybersecurity with TrustedSec.",    links: {
      // website: "#"
    }
  },
  {
    image: "images/podcasts/linux-unplugged.webp",
    alt: "LINUX Unplugged",
    title: "LINUX Unplugged",
    description: "The Linux Action Show for the community, by the community.",    links: {
      // website: "#"
    }
  },
  {
    image: "images/podcasts/what-the-hack.webp",
    alt: "What the Hack?",
    title: "What the Hack?",
    description: "A podcast exploring hacking and cybersecurity topics.",    links: {
      // website: "#"
    }
  },
  {
    image: "images/podcasts/across-the-pondcast.webp",
    alt: "Across the Pondcast",
    title: "Across the Pondcast",
    description: "UK-based cybersecurity podcast covering news and trends.",    links: {
      // website: "#"
    }
  },
  {
    image: "images/podcasts/blue-security-podcast.webp",
    alt: "Blue Security",
    title: "Blue Security",
    description: "Defensive security strategies and blue team tactics.",    links: {
      // website: "#"
    }
  },
  {
    image: "images/podcasts/hacker-valley-studio.webp",
    alt: "Hacker Valley Studio",
    title: "Hacker Valley Studio",
    description: "Stories from the cybersecurity community.",    links: {
      // website: "#"
    }
  },
  {
    image: "images/podcasts/the-hackers-cache.webp",
    alt: "The Hacker's Cache",
    title: "The Hacker's Cache",
    description: "A podcast about hacking, security, and technology.",    links: {
      // website: "#"
    }
  },
  {
    image: "images/podcasts/bug-bounty-reports-explained.webp",
    alt: "Bug Bounty Reports Explained",
    title: "Bug Bounty Reports Explained",
    description: "Breaking down real bug bounty reports and vulnerabilities.",    links: {
      // website: "#"
    }
  },
  {
    image: "images/podcasts/cyber-work.webp",
    alt: "Cyber Work",
    title: "Cyber Work",
    description: "Career advice and insights for cybersecurity professionals.",    links: {
      // website: "#"
    }
  },
  {
    image: "images/podcasts/hacked.webp",
    alt: "Hacked",
    title: "Hacked",
    description: "Stories of hacking incidents and security breaches.",    links: {
      // website: "#"
    }
  },
  {
    image: "images/podcasts/offsec-podcast.webp",
    alt: "OffSec Podcast",
    title: "OffSec Podcast",
    description: "Offensive Security's podcast covering penetration testing and security.",    links: {
      // website: "#"
    }
  },
  {
    image: "images/podcasts/self-hosted.webp",
    alt: "Self-Hosted",
    title: "Self-Hosted",
    description: "A podcast about self-hosting, privacy, and taking control of your data.",    links: {
      // website: "#"
    }
  },
  {
    image: "images/podcasts/simply-offensive.webp",
    alt: "Simply Offensive",
    title: "Simply Offensive",
    description: "Offensive security topics made simple.",    links: {
      // website: "#"
    }
  },
  {
    image: "images/podcasts/the-homelab-show.webp",
    alt: "The Homelab Show",
    title: "The Homelab Show",
    description: "Everything about building and maintaining your homelab.",    links: {
      // website: "#"
    }
  },
  {
    image: "images/podcasts/unsupervised-learning.webp",
    alt: "Unsupervised Learning",
    title: "Unsupervised Learning",
    description: "Security, technology, and artificial intelligence.",    links: {
      // website: "#"
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
