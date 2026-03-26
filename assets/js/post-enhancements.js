// Post enhancements: auto-TOC and related posts
document.addEventListener('DOMContentLoaded', function () {
  buildTOC();
  buildRelatedPosts();
});

function buildTOC() {
  const content = document.getElementById('post-content');
  if (!content) return;

  const headings = content.querySelectorAll('h2, h3');
  if (headings.length < 3) return; // Only show TOC for posts with 3+ headings

  const toc = document.getElementById('toc');
  const container = document.getElementById('toc-container');
  const ul = document.createElement('ul');

  headings.forEach(function (heading, i) {
    // Ensure heading has an id for anchor linking
    if (!heading.id) {
      heading.id = 'heading-' + i + '-' + heading.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }

    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#' + heading.id;
    a.textContent = heading.textContent;

    if (heading.tagName === 'H3') {
      li.style.paddingLeft = '1rem';
      li.style.fontSize = '0.9em';
    }

    li.appendChild(a);
    ul.appendChild(li);
  });

  toc.appendChild(ul);
  container.style.display = 'block';
}

function buildRelatedPosts() {
  const data = window.POST_DATA;
  if (!data || !data.relatedPosts || data.relatedPosts.length === 0) return;

  const container = document.getElementById('related-posts');
  const grid = document.getElementById('related-posts-grid');

  data.relatedPosts.forEach(function (post) {
    if (!post || !post.title) return;
    const col = document.createElement('div');
    col.className = 'col-md-4';
    col.innerHTML =
      '<div class="card h-100">' +
        '<div class="card-body">' +
          '<h5 class="card-title" style="font-size:0.95rem">' +
            '<a href="' + post.url + '" style="color:var(--accent-cyan);text-decoration:none">' + post.title + '</a>' +
          '</h5>' +
          '<div style="font-size:0.8rem;color:var(--text-secondary)">' + post.date + '</div>' +
        '</div>' +
      '</div>';
    grid.appendChild(col);
  });

  if (grid.children.length > 0) {
    container.style.display = 'block';
  }
}
