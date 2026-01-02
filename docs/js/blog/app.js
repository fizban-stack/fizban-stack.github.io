let allPosts = []; // Global variable to store posts

async function loadBlog() {
    try {
        const response = await fetch('posts.json');
        allPosts = await response.json();
        renderPosts(allPosts);
    } catch (error) {
        console.error("Error loading blog posts:", error);
    }
}

function renderPosts(postsToDisplay) {
    // Clear existing posts first
    document.getElementById('cybersecurity-posts').innerHTML = '';
    document.getElementById('homelab-posts').innerHTML = '';
    document.getElementById('personal-posts').innerHTML = '';

    if (postsToDisplay.length === 0) {
        document.getElementById('main-view').innerHTML += `<p class="no-results">No posts found matching your search.</p>`;
        return;
    }

    // Remove "no results" message if it exists
    const existingNoResults = document.querySelector('.no-results');
    if (existingNoResults) existingNoResults.remove();

    postsToDisplay.forEach(post => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${post.title}</h3>
            <span class="date">📅 ${post.date}</span>
            <p>${post.excerpt}</p>
            <button class="btn-read" onclick="viewPost('${post.path}', '${post.title}')">Read More</button>
        `;
        document.getElementById(`${post.category}-posts`).appendChild(card);
    });
}

function filterPosts() {
    const searchTerm = document.getElementById('blog-search').value.toLowerCase();
    
    const filtered = allPosts.filter(post => {
        return (
            post.title.toLowerCase().includes(searchTerm) ||
            post.excerpt.toLowerCase().includes(searchTerm) ||
            post.category.toLowerCase().includes(searchTerm)
        );
    });

    renderPosts(filtered);
}

// Call loadBlog on startup
loadBlog();