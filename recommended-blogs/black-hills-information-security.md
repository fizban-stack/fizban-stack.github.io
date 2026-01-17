---
layout: detail-page
back_url: /recommended-blogs
back_text: Back to Recommended Blogs
breadcrumb_url: /recommended-blogs
breadcrumb_text: Recommended Blogs
title: Black Hills Information Security (BHIS)
focus: Practical offensive security and Kerberos abuse
category: Offensive Security & Advanced Research
description: Practical offensive security, "active defense," and Kerberos abuse content from the team behind many popular security tools and webcasts.
image: recommended-blogs/bhis.webp
website: https://www.blackhillsinfosec.com/blog/
rss_feed: https://www.blackhillsinfosec.com/feed/
---

## Subscribe
**RSS Feed:** [{{ page.rss_feed }}]({{ page.rss_feed }})

### Latest Stories
<ul>
  {% assign current_feed = site.data.rss_feeds | where: "url", page.rss_feed | first %}
  {% if current_feed %}
    {% for entry in current_feed.entries limit:5 %}
      <li>
        <a href="{{ entry.link }}" target="_blank">{{ entry.title }}</a>
        <br>
        <small>{{ entry.published | date: "%B %d, %Y" }}</small>
      </li>
    {% endfor %}
  {% else %}
    <li>Fetching latest stories... Check back soon.</li>
  {% endif %}
</ul>

---

Black Hills Information Security (BHIS) has become a cornerstone of the security community through their commitment to education, tool development, and accessible training. Founded by John Strand, BHIS is known for democratizing offensive security knowledge.

## Why Follow This Blog

BHIS stands out for making complex security topics accessible while maintaining technical depth. Their "pay what you can" training model and extensive free content have helped countless security professionals advance their careers.

## Key Topics Covered

### Kerberos Security
- **Kerberoasting**: Comprehensive guides to service account attacks
- **AS-REP Roasting**: Attacking accounts without pre-authentication
- **Delegation Attacks**: Constrained and unconstrained delegation abuse
- **Golden/Silver Tickets**: Persistence through Kerberos ticket forgery
- **Diamond Tickets**: Advanced ticket forging techniques

### Active Defense
BHIS pioneered the "active defense" concept:
- **Honeypots**: Deployment and monitoring strategies
- **Honeytokens**: Detecting unauthorized access
- **Deception Technologies**: Confusing and tracking attackers
- **DVWA (Deceptive Virtual Web Application)**: Web-based honeypots

### Penetration Testing
- **Methodology**: Structured approaches to engagements
- **Reporting**: Effective communication of findings
- **Scope Management**: Defining and managing test boundaries
- **Client Communication**: Professional engagement handling

### Blue Team Operations
- **Log Analysis**: Finding evil in security logs
- **Threat Hunting**: Proactive threat discovery
- **SIEM Optimization**: Getting value from security tools
- **Incident Response**: Handling security incidents

## Tool Development

### Bloodhound Related
- Attack path visualization contributions
- Custom queries and analysis techniques
- Integration with other tools

### DVWA and Deception
- Deceptive technologies
- Honeypot frameworks
- Attribution capabilities

### Community Tools
- Scripts and utilities for common tasks
- Automation tools for testing
- Detection rule sets

## Webcasts and Education

### Webcast Series
BHIS hosts regular free webcasts covering:
- Current attack techniques
- Tool demonstrations
- Career development
- Industry trends

### Antisyphon Training
Pay-what-you-can training covering:
- SOC Core Skills
- Active Defense and Cyber Deception
- Attack Emulation Tools
- Network Traffic Analysis
- And many more courses

### Hack-A-Thons
Regular events combining:
- Hands-on challenges
- Community building
- Prize opportunities
- Skill development

## Notable Research Areas

### Cloud Security
- Azure AD attacks and defenses
- AWS security assessments
- Multi-cloud environments
- Identity federation

### Endpoint Security
- EDR evasion and detection
- Antivirus bypass techniques
- Application whitelisting
- Memory forensics

### Network Security
- Traffic analysis
- Lateral movement detection
- Segmentation testing
- Protocol exploitation

## Content Characteristics

### Accessibility
Content designed for all skill levels:
- Beginner-friendly explanations
- Progressive complexity
- Hands-on examples
- Lab exercises

### Practicality
Focus on real-world application:
- Engagement-ready techniques
- Tested methodologies
- Current attack vectors
- Defense recommendations

### Community Focus
Strong emphasis on community:
- Free resources
- Pay-what-you-can model
- Open source contributions
- Mentorship programs

## Who Should Follow

### Entry-Level Professionals
Excellent starting point for career development with accessible content and training pathways.

### Penetration Testers
Practical techniques and methodologies directly applicable to engagements.

### SOC Analysts
Blue team content for detection and response improvement.

### Security Managers
Understanding of both offensive and defensive perspectives for better team leadership.

## Integration with Career Development

### Certification Preparation
Content aligns well with:
- OSCP preparation
- GPEN study
- GCIH material
- SANS certifications

### Skill Building
Progressive content supports:
- Hands-on lab practice
- Tool proficiency
- Methodology development
- Professional growth

## Community Impact

BHIS has significantly impacted the security community through:
- Free educational content
- Affordable training options
- Open source tool development
- Mentorship and support

## Best Practices for Following

1. **Subscribe to webcasts**: Free and highly educational
2. **Practice in labs**: Apply techniques in safe environments
3. **Engage with community**: Join Discord and discussions
4. **Consider training**: Antisyphon courses provide structured learning
5. **Contribute back**: Share knowledge and help others

Black Hills Information Security represents the best of the security community's commitment to education and accessibility while maintaining technical excellence.
