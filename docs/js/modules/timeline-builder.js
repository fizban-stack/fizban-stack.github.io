/**
 * Timeline Builder Module
 * Dynamically builds timeline from timelineEvents data
 */

export function buildTimeline() {
  const timelineContainer = document.getElementById('my-timeline');
  if (!timelineContainer || typeof timelineEvents === 'undefined') {
    return;
  }

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
