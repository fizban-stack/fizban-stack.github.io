/**
 * Footer Module
 * Handles footer rendering with social links
 */

export function initFooter() {
  const footerHTML = `
    <footer class="footer mt-auto py-3">
      <div class="container">
        <div class="d-flex justify-content-between align-items-center">
            <div>
                <a href="https://www.blog.wellslabs.org" target="_blank" rel="noopener noreferrer" class="footer-link">My Blog</a>
            </div>
            <div>
                <a href="mailto:james@wellslabs.org" class="footer-icon-box" title="Email"><img src="images/icons/zoho-mail.svg" alt="Email" width="24" height="24"></a>
                <a href="https://www.linkedin.com/in/james-wells-122170164/" target="_blank" rel="noopener noreferrer" class="footer-icon-box" title="LinkedIn"><img src="images/icons/linkedin.svg" alt="LinkedIn" width="24" height="24"></a>
                <a href="https://twitter.com/fizbanstack" target="_blank" rel="noopener noreferrer" class="footer-icon-box" title="X"><img src="images/icons/x.svg" alt="X" width="24" height="24"></a>
                <a href="#" class="footer-icon-box" title="Discord: fizban_stack"><img src="images/icons/discord.svg" alt="Discord" width="24" height="24"></a>
                <a href="#" class="footer-icon-box" title="GitHub"><img src="images/icons/github.svg" alt="GitHub" width="24" height="24"></a>
            </div>
        </div>
      </div>
    </footer>
  `;

  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    footerPlaceholder.innerHTML = footerHTML;
  }
}
