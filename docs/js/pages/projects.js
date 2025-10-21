// Projects page - data and rendering logic
const projectData = [
  {
    image: "images/projects/raspberry-pi5.webp",
    alt: "Raspberry Pi 5",
    title: "Raspberry Pi 5: Tools",
    description: "A Raspberry Pi 5 that I setup with various tools and a remote connection.  It allows me to plug into any network and have access to installed tools.",
    tags: [
      { text: "Single Board Computer", color: "bg-primary" },
      { text: "Cybersecurity", color: "bg-info text-dark" },
      { text: "Hardware", color: "bg-secondary" }
    ],
    links: {
      blog: "https://www.blog.wellslabs.org/raspberry-pi-5/",
     // github: "#"
    }
  },
  {
    image: "images/projects/pwnagotchi.webp",
    alt: "Pwnagotchi",
    title: "Pwnagotchi aka Bobby",
    description: "Pwnagotchi is a wifi hacking tool created with a Raspberry Pi Zero 2W.  My Children came up with the name Bobby.",
    tags: [
      { text: "Single Board Computer", color: "bg-success" },
      { text: "Cybersecurity", color: "bg-warning text-dark" },
      { text: "Hardware", color: "bg-info text-dark" }
    ],
    links: {
      blog: "https://www.blog.wellslabs.org/bobby",
      github: "https://github.com/evilsocket/pwnagotchi"
    }
  },
  {
    image: "images/projects/meshtastic.webp",
    alt: "Meshtastic Radios",
    title: "Meshtastic Radios",
    description: "These radios use long range wireless communication (LoRa) to send messages between devices without any other connections.",
    tags: [
      { text: "Single Board Computer", color: "bg-success" },
      { text: "Communication", color: "bg-warning text-dark" },
      { text: "Hardware", color: "bg-info text-dark" }
    ],
    links: {
      blog: "https://www.blog.wellslabs.org/meshtastic",
      github: "https://github.com/meshtastic"
    }
  },
  {
    image: "images/projects/nethunter.webp",
    alt: "Kali Nethunter",
    title: "Kali Nethunter",
    description: "This is a old phone that I rooted and installed Kali Nethunter on.",
    tags: [
      { text: "Cell Phone", color: "bg-success" },
      { text: "Cybersecurity", color: "bg-warning text-dark" },
      { text: "Hardware", color: "bg-info text-dark" }
    ],
    links: {
      blog: "https://www.blog.wellslabs.org/nethunter",
    }
  },
  {
    image: "images/projects/nvidia-jetson-orin-nano.webp",
    alt: "Nvidia Jetson Orin Nano Super",
    title: "Nvidia Jetson Orin Nano Super",
    description: "This is a Jetson Orin Nano developer kit that I purchased to mess around with machine learning.",
    tags: [
      { text: "Single Board Computer", color: "bg-success" },
      { text: "Machine Learning", color: "bg-warning text-dark" },
      { text: "Hardware", color: "bg-info text-dark" }
    ],
    links: {
      //blog: "https://www.blog.wellslabs.org/meshtastic",
      //github: "https://github.com/meshtastic"
    }
  },
  {
    image: "images/projects/omg-cable.webp",
    alt: "OMG Cable",
    title: "OMG Cable",
    description: "This is an OMG cable that I purchase to practice penetration testing.  It allows me to run D",
    tags: [
      { text: "Single Board Computer", color: "bg-success" },
      { text: "Communication", color: "bg-warning text-dark" },
      { text: "Hardware", color: "bg-info text-dark" }
    ],
    links: {
      //blog: "https://www.blog.wellslabs.org/meshtastic",
      //github: "https://github.com/meshtastic"
    }
  },
  {
    image: "images/projects/raspberry-pi-zero2w.webp",
    alt: "Raspberry Pi Zero 2W",
    title: "Raspberry Pi Zero 2W",
    description: "This is Raspberry Pi Zero 2W that I bought to for a web server.",
    tags: [
      { text: "Single Board Computer", color: "bg-success" },
      { text: "Home Lab", color: "bg-warning text-dark" },
      { text: "Hardware", color: "bg-info text-dark" }
    ],
    links: {
      //blog: "https://www.blog.wellslabs.org/meshtastic",
      //github: "https://github.com/meshtastic"
    }
  },
  {
    image: "images/projects/proxmox.webp",
    alt: "Proxmox",
    title: "Proxmox Virtual Environment",
    description: "This wasn't the first virtualization platform that I tried, but it is the one that I will continue to you.  It is open-source, feature-rich, and free for personal and business use.",
    tags: [
      { text: "Type 1 Hypervisor", color: "bg-success" },
      { text: "Home Lab", color: "bg-warning text-dark" },
      { text: "Virtualization", color: "bg-info text-dark" }
    ],
    links: {
      blog: "https://www.blog.wellslabs.org/proxmox-virtual-environment/",
      github: "https://github.com/proxmox"
    }
  },
];

// Build projects grid
function buildProjects() {
  const projectContainer = document.getElementById('project-grid-placeholder');
  if (!projectContainer) return;

  let projectsHTML = '';
  projectData.forEach(project => {
    // Build the tags
    let tagsHTML = project.tags.map(tag =>
      `<span class="badge ${tag.color} me-1 mb-1">${tag.text}</span>`
    ).join('');

    // Build the links (only if they exist)
    let blogLink = project.links.blog ?
      `<a href="${project.links.blog}" target="_blank" class="btn btn-dark">Read Blog Post</a>` : '';
    let githubLink = project.links.github ?
      `<a href="${project.links.github}" target="_blank" class="btn btn-outline-secondary ms-2">View on GitHub</a>` : '';

    // Create the final card HTML
    projectsHTML += `
      <div class="col-md-6 col-lg-4" data-aos="fade-up">
          <div class="card project-card h-100 d-flex flex-column">
              <img src="${project.image}" class="card-img-top" alt="${project.alt}">
              <div class="card-body d-flex flex-column">
                  <h5 class="card-title">${project.title}</h5>
                  <p class="card-text">${project.description}</p>
                  <div class="card-tags mb-3">
                      ${tagsHTML}
                  </div>
                  <div class="mt-auto">
                      ${blogLink}
                      ${githubLink}
                  </div>
              </div>
          </div>
      </div>
    `;
  });

  projectContainer.innerHTML = projectsHTML;
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", function() {
  buildProjects();
});
