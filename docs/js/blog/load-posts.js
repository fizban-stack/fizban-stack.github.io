// Centralized post loader - manages loading all blog post files
// Add new posts to the registry below and they'll automatically load on all pages

const postRegistry = {
  personalGrowth: [
    'first-post',
    'first-comptia-certifications',
    'first-frustration',
    'securityx-and-beyond'
  ],
  cybersecurity: [
    'nethunter'
  ],
  homelab: [
    'snipe-it'
  ],
  hardware: []
};

// Dynamically load all post files synchronously
(function loadAllPosts() {
  for (const [category, postIds] of Object.entries(postRegistry)) {
    for (const postId of postIds) {
      document.write(`<script src="js/blog/posts/${category}/${postId}.js"><\/script>`);
    }
  }
})();
