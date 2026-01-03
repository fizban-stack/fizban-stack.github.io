# James Wells - Cybersecurity Portfolio

Personal GitHub Pages site showcasing my cybersecurity projects, certifications, and professional journey.

## About

This is a Jekyll-based portfolio site featuring:

- **Projects**: Cybersecurity and homelab projects
- **Certifications**: Professional certifications and achievements
- **Training Resources**: Curated list of free cybersecurity training platforms
- **Podcasts**: Recommended security and technology podcasts
- **Timeline**: My learning and career journey
- **Blog**: Links to my technical blog at [blog.wellslabs.org](https://blog.wellslabs.org)

## Technology Stack

- **Static Site Generator**: Jekyll 4.x
- **Hosting**: GitHub Pages
- **Theme**: Custom ethical hacker portfolio theme
- **CSS Framework**: Bootstrap 5.3 + Custom CSS
- **Fonts**: Inter, Fira Code (monospace)

## Local Development

To run this site locally:

```bash
# Install dependencies
bundle install

# Run Jekyll server
bundle exec jekyll serve

# View at http://localhost:4000
```

## Site Structure

```
.
├── _config.yml           # Jekyll configuration
├── _layouts/             # Page layouts
│   └── default.html
├── _includes/            # Reusable components
│   ├── navbar.html
│   └── footer.html
├── _data/                # Data files (YAML)
│   ├── projects.yml
│   ├── training.yml
│   ├── podcasts.yml
│   └── timeline.yml
├── assets/
│   ├── css/              # Stylesheets
│   ├── images/           # Images and icons
│   └── js/               # JavaScript files
├── *.md                  # Page content (Markdown)
└── index.md              # Homepage
```

## Deployment

This site automatically deploys to GitHub Pages via GitHub Actions when changes are pushed to the `main` or `jekyll` branch.

## License

Content © 2024 James Wells. All rights reserved.

## Contact

- Email: james@wellslabs.org
- LinkedIn: [james-wells-122170164](https://www.linkedin.com/in/james-wells-122170164/)
- GitHub: [fizban-stack](https://github.com/fizban-stack/)
- Blog: [blog.wellslabs.org](https://blog.wellslabs.org)
