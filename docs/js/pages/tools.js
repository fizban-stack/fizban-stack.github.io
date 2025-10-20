// Tools page - data and rendering logic
const toolsData = [
  {
    icon: "🔒",
    title: "Hashcat",
    description: "Advanced password recovery utility supporting various hash algorithms. Essential for penetration testing and security audits.",
    category: "Password Cracking",
    blogLink: "https://www.blog.wellslabs.org/hashcat-basics"
  },
  {
    icon: "📡",
    title: "Aircrack-ng",
    description: "Complete suite of tools for assessing WiFi network security. Includes packet capture, WEP/WPA/WPA2 cracking capabilities.",
    category: "Wireless Security",
    blogLink: "https://www.blog.wellslabs.org/wifi-security"
  },
  {
    icon: "🔍",
    title: "Nmap",
    description: "Network exploration and security auditing tool. Discovers hosts, services, and potential vulnerabilities on networks.",
    category: "Network Scanning",
    blogLink: "https://www.blog.wellslabs.org/nmap-guide"
  },
  {
    icon: "🌐",
    title: "Burp Suite",
    description: "Integrated platform for web application security testing. Includes proxy, scanner, and various manual testing tools.",
    category: "Web Security",
    blogLink: "https://www.blog.wellslabs.org/burp-suite"
  },
  {
    icon: "💉",
    title: "Metasploit",
    description: "Framework for developing, testing, and executing exploits. Industry-standard penetration testing platform.",
    category: "Exploitation",
    blogLink: "https://www.blog.wellslabs.org/metasploit-intro"
  },
  {
    icon: "🔧",
    title: "Wireshark",
    description: "Network protocol analyzer for packet inspection and troubleshooting. Essential for understanding network traffic.",
    category: "Network Analysis",
    blogLink: "https://www.blog.wellslabs.org/wireshark-basics"
  }
];

// Build tools list in two-column grid
function buildTools() {
  const toolsContainer = document.getElementById('tools-list-placeholder');
  if (!toolsContainer) return;

  let toolsHTML = '';
  toolsData.forEach((tool) => {
    toolsHTML += `
      <div class="tool-item" data-aos="fade-up">
        <div class="tool-content">
          <div class="tool-icon">${tool.icon}</div>
          <div class="tool-details">
            <span class="tool-category">${tool.category}</span>
            <h3>${tool.title}</h3>
            <p>${tool.description}</p>
            <a href="${tool.blogLink}" target="_blank" class="btn btn-dark btn-sm">Read More</a>
          </div>
        </div>
      </div>
    `;
  });

  toolsContainer.innerHTML = toolsHTML;
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", function() {
  buildTools();
});
