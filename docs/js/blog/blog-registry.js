// Blog post registry - lists all post files by category
// When you add a new post, just add its filename to the appropriate category array

const blogPostRegistry = {
  personalGrowth: [
    'first-post',
    'first-comptia-certifications',
    'first-frustration'
  ],
  cybersecurity: [
    // Add cybersecurity post IDs here
  ],
  homelab: [
    // Add homelab post IDs here
  ],
  hardware: [
    // Add hardware post IDs here
  ]
};

// This will be populated with actual post data loaded from individual files
const blogPosts = {};

// Load all posts from the registry
async function loadBlogPosts() {
  for (const [category, postIds] of Object.entries(blogPostRegistry)) {
    for (const postId of postIds) {
      try {
        // Import the post module
        const module = await import(`./posts/${category}/${postId}.js`);
        // The module should export the post data with a variable name matching the postId in camelCase
        const postData = module[Object.keys(module)[0]];
        if (postData) {
          blogPosts[postId] = postData;
        }
      } catch (error) {
        console.error(`Failed to load post: ${category}/${postId}`, error);
      }
    }
  }
}

// Category definitions
const blogCategories = {
  cybersecurity: {
    name: "Cybersecurity"
  },
  homelab: {
    name: "Home Lab"
  },
  personalGrowth: {
    name: "Personal Growth"
  },
  hardware: {
    name: "Hardware"
  }
};

// Helper function to get posts by category
function getPostsByCategory(category) {
  return Object.values(blogPosts)
    .filter(post => post.category === category)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Helper function to get all posts sorted by date
function getAllPosts() {
  return Object.values(blogPosts)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Helper function to format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
