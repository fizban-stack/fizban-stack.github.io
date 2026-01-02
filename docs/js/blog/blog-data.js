// Blog post registry - Simple list of post IDs by category
// When you add a new post, just add its ID to the appropriate category array

const blogPostRegistry = {
  personalGrowth: [
    'first-post',
    'first-comptia-certifications',
    'first-frustration'
  ],
  cybersecurity: [],
  homelab: [],
  hardware: []
};

// This object will be populated by individual post files
const blogPosts = {};

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
