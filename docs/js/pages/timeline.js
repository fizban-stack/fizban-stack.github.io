// Timeline page - data and rendering logic
const timelineEvents = [
  {
    date: "Summer 2022",
    title: "Changes",
    link: "https://www.blog.wellslabs.org/you-either-evolve-or-die/",
    description: "This was the point in my life that I realized I was never going to be happy unless I followed my dreams."
  },
  {
    date: "Spring 2023",
    title: "Self-Studying",
    link: "https://www.blog.wellslabs.org/the-plan/",
    description: "After giving it some thought, I had the framework of a plan."
  },
  {
    date: "Summer 2023",
    title: "First Comptia Certifications",
    link: "https://www.blog.wellslabs.org/first-comptia-certifications/",
    description: "This was the beginning of me purchasing my own certification vouchers and my home lab obsession."
  },
    {
    date: "Fall 2023",
    title: "The First Frustration",
    link: "https://www.blog.wellslabs.org/first-frustration/",
    description: "This was the first bump in the road that shook my confidence."
  },
    {
    date: "Spring 2024",
    title: "My First IT Job.",
    link: "https://www.blog.wellslabs.org/first-it-job/",
    description: "After close to a year of looking for an IT job, I finally got one."
  },
    {
    date: "Summer 2025",
    title: "The Certification Sprint",
    link: "https://www.blog.wellslabs.org/certification-sprint/",
    description: "This was the summer that I went overboard on certifications."
  },
    {
    date: "Fall 2025",
    title: "My First Incident",
    link: "https://www.blog.wellslabs.org/my-first-incident/",
    description: "This was the first time I experience a cyber attack in real-time."
    }
];

// Build timeline
function buildTimeline() {
  const timelineContainer = document.getElementById('my-timeline');
  if (!timelineContainer) return;

  let timelineHTML = '';
  timelineEvents.forEach(event => {
    timelineHTML += `
      <div class="timeline-item" data-aos="fade-up">
          <div class="timeline-dot"></div>
          <div class="timeline-date">${event.date}</div>
          <div class="timeline-content">
              <h3><a href="${event.link}" target="_blank">${event.title}</a></h3>
              <p>${event.description}</p>
          </div>
      </div>
    `;
  });

  timelineContainer.innerHTML = timelineHTML;
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", function() {
  buildTimeline();
});
