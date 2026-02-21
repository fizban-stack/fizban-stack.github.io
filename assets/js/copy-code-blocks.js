document.addEventListener('DOMContentLoaded', function () {
  // Only run on secure contexts - clipboard API requires HTTPS or localhost
  if (!navigator.clipboard) {
    console.warn('Clipboard API not available. Ensure site is served over HTTPS.');
    return;
  }

  document.querySelectorAll('pre').forEach(function (pre) {
    const button = document.createElement('button');
    button.textContent = 'Copy'; // textContent is safer than innerText/innerHTML
    button.className = 'copy-btn';
    button.setAttribute('aria-label', 'Copy code to clipboard');
    button.setAttribute('type', 'button'); // Prevent accidental form submission

    button.addEventListener('click', function () {
      const code = pre.querySelector('code');
      // textContent prevents any HTML from being copied
      const text = code ? code.textContent : pre.textContent;

      navigator.clipboard.writeText(text).then(function () {
        button.textContent = 'Copied!';
        button.setAttribute('aria-label', 'Code copied to clipboard');
        setTimeout(function () {
          button.textContent = 'Copy';
          button.setAttribute('aria-label', 'Copy code to clipboard');
        }, 2000);
      }).catch(function (err) {
        console.error('Failed to copy to clipboard:', err);
        button.textContent = 'Error';
        setTimeout(function () {
          button.textContent = 'Copy';
        }, 2000);
      });
    });

    pre.style.position = 'relative';
    pre.appendChild(button);
  });
});