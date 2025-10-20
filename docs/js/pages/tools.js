// Tools page - data and rendering logic
const toolsData = [
  {
    icon: "images/icons/wireshark.webp",
    title: "Wireshark",
    description: "Network protocol analyzer for packet inspection and troubleshooting. Essential for understanding network traffic.",
    category: "Network Analysis",
    blogLink: "https://www.blog.wellslabs.org/wireshark"
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
          <div class="tool-icon"><img src="${tool.icon}" alt="${tool.title}"></div>
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
