/**
 * Accordion Counter Module
 * Counts and displays the number of items in each accordion section
 */

export function initAccordionCounter() {
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const certLinksCount = item.querySelectorAll('.list-group-item').length;
    const countSpan = item.querySelector('.cert-count');

    if (countSpan && certLinksCount > 0) {
      countSpan.textContent = certLinksCount;
    }
  });
}
