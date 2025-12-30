// Self-hosted service data
const selfHostedServices = {
  beszel: {
    id: "beszel",
    title: "Beszel",
    subtitle: "Lightweight Server Monitoring Dashboard",
    image: "images/self-hosted/beszel.webp",
    description: "Server monitoring software.",
    fullDescription: `
      <p>Beszel is a lightweight server monitoring solution that provides real-time insights into your server's performance and health.</p>

      <h3>Key Features</h3>
      <ul>
        <li>Real-time server monitoring</li>
        <li>Resource usage tracking (CPU, RAM, Disk)</li>
        <li>Clean and intuitive dashboard</li>
        <li>Lightweight and efficient</li>
      </ul>

      <h3>Why I Use It</h3>
      <p>Beszel provides a simple way to keep track of all my servers in one place. The lightweight nature means it doesn't consume resources while monitoring them.</p>

      <h3>Installation Notes</h3>
      <p>I run Beszel in a Docker container on my Proxmox environment. It's incredibly easy to set up and requires minimal configuration.</p>
    `,
    tags: [
      { text: "Monitoring", color: "bg-primary" },
      { text: "Dashboard", color: "bg-info text-dark" },
      { text: "Docker", color: "bg-secondary" }
    ],
    links: {
      github: "https://github.com/henrygd/beszel",
      official: "https://beszel.dev"
    }
  },

  booklore: {
    id: "booklore",
    title: "Booklore",
    subtitle: "Self-Hosted Ebook Management",
    image: "images/self-hosted/booklore.webp",
    description: "Managing and Reading Ebooks and PDFs.",
    fullDescription: `
      <p>Booklore is a modern ebook management system that allows you to organize, manage, and read your digital library from anywhere.</p>

      <h3>Key Features</h3>
      <ul>
        <li>Ebook library management</li>
        <li>PDF reader integration</li>
        <li>Metadata organization</li>
        <li>Web-based reading interface</li>
        <li>Support for multiple formats</li>
      </ul>

      <h3>Why I Use It</h3>
      <p>Having a centralized location for all my technical documentation and ebooks makes it easy to access reference materials from any device in my home lab.</p>
    `,
    tags: [
      { text: "Ebook", color: "bg-success" },
      { text: "Library", color: "bg-info text-dark" },
      { text: "Docker", color: "bg-secondary" }
    ],
    links: {
      github: "https://github.com/booklore-app/booklore"
    }
  },

  forgejo: {
    id: "forgejo",
    title: "Forgejo",
    subtitle: "Self-Hosted Git Service",
    image: "images/self-hosted/forgejo.webp",
    description: "GitHub Alternative",
    fullDescription: `
      <p>Forgejo is a self-hosted, lightweight software forge focused on scaling, federation, and privacy.</p>

      <h3>Key Features</h3>
      <ul>
        <li>Git repository hosting</li>
        <li>Issue tracking</li>
        <li>Pull requests and code review</li>
        <li>Wiki and documentation</li>
        <li>CI/CD integration</li>
      </ul>

      <h3>Why I Use It</h3>
      <p>Forgejo gives me complete control over my code repositories. It's perfect for keeping private projects secure while still having all the features of platforms like GitHub.</p>
    `,
    tags: [
      { text: "Git", color: "bg-danger" },
      { text: "Code Hosting", color: "bg-warning text-dark" },
      { text: "Self-Hosted", color: "bg-secondary" }
    ],
    links: {
      official: "https://codeberg.org/forgejo"
    }
  },

  grafana: {
    id: "grafana",
    title: "Grafana",
    subtitle: "Data Visualization Platform",
    image: "images/self-hosted/grafana.webp",
    description: "Data visualization and monitoring.",
    fullDescription: `
      <p>Grafana is an open-source analytics and interactive visualization platform that transforms metrics into meaningful insights.</p>

      <h3>Key Features</h3>
      <ul>
        <li>Beautiful dashboards</li>
        <li>Multiple data source support</li>
        <li>Alerting capabilities</li>
        <li>Customizable visualizations</li>
        <li>Plugin ecosystem</li>
      </ul>

      <h3>Why I Use It</h3>
      <p>Grafana is essential for visualizing data from my various monitoring systems. It creates beautiful, informative dashboards that help me understand what's happening in my infrastructure.</p>
    `,
    tags: [
      { text: "Monitoring", color: "bg-primary" },
      { text: "Visualization", color: "bg-info text-dark" },
      { text: "Analytics", color: "bg-success" }
    ],
    links: {
      github: "https://github.com/grafana/grafana",
      official: "https://grafana.com"
    }
  },

  karakeep: {
    id: "karakeep",
    title: "Karakeep",
    subtitle: "Bookmark and Note Manager",
    image: "images/self-hosted/karakeep.webp",
    description: "Self-hosted bookmark and note management tool.",
    fullDescription: `
      <p>Karakeep is a self-hosted solution for managing bookmarks and notes in one centralized location.</p>

      <h3>Key Features</h3>
      <ul>
        <li>Bookmark management</li>
        <li>Note-taking capabilities</li>
        <li>Tag organization</li>
        <li>Search functionality</li>
        <li>Privacy-focused</li>
      </ul>

      <h3>Why I Use It</h3>
      <p>Instead of relying on browser bookmarks or proprietary note-taking services, Karakeep gives me full control over my data while providing excellent organization tools.</p>
    `,
    tags: [
      { text: "Bookmarks", color: "bg-warning text-dark" },
      { text: "Notes", color: "bg-info text-dark" },
      { text: "Productivity", color: "bg-primary" }
    ],
    links: {
      github: "https://github.com/karakeep-app/karakeep"
    }
  },

  pairdrop: {
    id: "pairdrop",
    title: "Pairdrop",
    subtitle: "Local File Sharing",
    image: "images/self-hosted/pairdrop.webp",
    description: "Cross-platform local file sharing in your browser.",
    fullDescription: `
      <p>Pairdrop enables instant file sharing between devices on your local network through a simple web interface.</p>

      <h3>Key Features</h3>
      <ul>
        <li>No account required</li>
        <li>Browser-based file sharing</li>
        <li>Works across all platforms</li>
        <li>Local network transfer</li>
        <li>End-to-end encryption</li>
      </ul>

      <h3>Why I Use It</h3>
      <p>Pairdrop makes it incredibly easy to share files between my devices without using cloud services or USB drives. Perfect for quickly moving files between my laptop, phone, and workstation.</p>
    `,
    tags: [
      { text: "File Sharing", color: "bg-success" },
      { text: "P2P", color: "bg-primary" },
      { text: "Privacy", color: "bg-info text-dark" }
    ],
    links: {
      github: "https://github.com/schlagmichdoch/PairDrop"
    }
  },

  proxmox: {
    id: "proxmox",
    title: "Proxmox Virtual Environment",
    subtitle: "Enterprise Virtualization Platform",
    image: "images/self-hosted/proxmox.webp",
    description: "Open-source server virtualization management.",
    fullDescription: `
      <p>Proxmox VE is a complete open-source platform for enterprise virtualization that integrates KVM hypervisor and LXC containers.</p>

      <h3>Key Features</h3>
      <ul>
        <li>KVM and LXC support</li>
        <li>Web-based management interface</li>
        <li>High availability clustering</li>
        <li>Built-in backup solutions</li>
        <li>Software-defined storage</li>
        <li>Network virtualization</li>
      </ul>

      <h3>Why I Use It</h3>
      <p>This wasn't the first virtualization platform that I tried, but it is the one that I will continue to use. It is open-source, feature-rich, and free for personal and business use. Proxmox is the foundation of my entire home lab infrastructure.</p>
    `,
    tags: [
      { text: "Hypervisor", color: "bg-danger" },
      { text: "Virtualization", color: "bg-primary" },
      { text: "Infrastructure", color: "bg-secondary" }
    ],
    links: {
      github: "https://github.com/proxmox",
      official: "https://www.proxmox.com"
    }
  },

  trillium: {
    id: "trillium",
    title: "Trillium",
    subtitle: "Hierarchical Note-Taking",
    image: "images/self-hosted/trillium.webp",
    description: "Hierarchical note-taking application.",
    fullDescription: `
      <p>Trillium is a hierarchical note-taking application focused on building large personal knowledge bases.</p>

      <h3>Key Features</h3>
      <ul>
        <li>Hierarchical note organization</li>
        <li>Note linking and relationships</li>
        <li>Full-text search</li>
        <li>Note versioning</li>
        <li>Encryption support</li>
        <li>Scripting and automation</li>
      </ul>

      <h3>Why I Use It</h3>
      <p>Trillium helps me organize my technical notes and documentation in a structured way. The hierarchical system makes it easy to create a personal wiki of everything I learn.</p>
    `,
    tags: [
      { text: "Notes", color: "bg-info text-dark" },
      { text: "Knowledge Base", color: "bg-success" },
      { text: "Productivity", color: "bg-primary" }
    ],
    links: {
      github: "https://github.com/TriliumNext/Trilium"
    }
  },

  webcheck: {
    id: "webcheck",
    title: "Web-check",
    subtitle: "Website Analysis Tool",
    image: "images/self-hosted/web-check.webp",
    description: "OSINT tool for analyzing websites.",
    fullDescription: `
      <p>Web-check is an all-in-one OSINT tool for analyzing websites, providing detailed information about security, performance, and infrastructure.</p>

      <h3>Key Features</h3>
      <ul>
        <li>DNS and WHOIS lookup</li>
        <li>SSL/TLS analysis</li>
        <li>Security headers check</li>
        <li>Performance metrics</li>
        <li>Technology detection</li>
        <li>Server information</li>
      </ul>

      <h3>Why I Use It</h3>
      <p>Web-check is an excellent tool for reconnaissance and security analysis. It helps me understand website infrastructure and identify potential security issues.</p>
    `,
    tags: [
      { text: "OSINT", color: "bg-danger" },
      { text: "Security", color: "bg-warning text-dark" },
      { text: "Analysis", color: "bg-info text-dark" }
    ],
    links: {
      github: "https://github.com/Lissy93/web-check"
    }
  },

  traefik: {
    id: "traefik",
    title: "Traefik",
    subtitle: "Modern Reverse Proxy",
    image: "images/self-hosted/traefik.webp",
    description: "Modern Cloud Native Reverse Proxy.",
    fullDescription: `
      <p>Traefik is a modern HTTP reverse proxy and load balancer designed to deploy microservices with ease.</p>

      <h3>Key Features</h3>
      <ul>
        <li>Automatic service discovery</li>
        <li>Let's Encrypt integration</li>
        <li>Load balancing</li>
        <li>Multiple backend support</li>
        <li>Metrics and monitoring</li>
        <li>WebSocket support</li>
      </ul>

      <h3>Why I Use It</h3>
      <p>Traefik automatically manages routing and SSL certificates for all my self-hosted services. The automatic service discovery makes adding new services incredibly simple.</p>
    `,
    tags: [
      { text: "Reverse Proxy", color: "bg-primary" },
      { text: "Load Balancer", color: "bg-success" },
      { text: "Docker", color: "bg-secondary" }
    ],
    links: {
      github: "https://github.com/traefik/traefik",
      official: "https://traefik.io"
    }
  }
};
