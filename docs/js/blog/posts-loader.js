/**
 * Master Posts Loader
 *
 * This file imports all blog posts from their individual files.
 * To add a new post:
 *   1. Create your post file in js/blog/posts/{category}/{post-id}.js
 *   2. Add an import statement below
 *
 * That's it! The post will automatically appear on the blog.
 */

// Personal Growth Posts
import './posts/personalGrowth/first-post.js';
import './posts/personalGrowth/first-comptia-certifications.js';
import './posts/personalGrowth/first-frustration.js';
import './posts/personalGrowth/securityx-and-beyond.js';

// Cybersecurity Posts
import './posts/cybersecurity/nethunter.js';
import './posts/cybersecurity/graylog.js';

// Home Lab Posts
import './posts/homelab/snipe-it.js';

// To add a new post, just add an import statement above:
// import './posts/{category}/{post-id}.js';
