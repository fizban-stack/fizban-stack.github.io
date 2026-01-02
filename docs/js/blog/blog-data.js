// Blog posts data organized by categories
const blogPosts = {
  "first-post": {
    id: "first-post",
    title: "1st Post",
    category: "personalGrowth",
    date: "2025-06-12",
    description: "My first blog post about stepping out of my comfort zone and pursuing my dreams.",
    fullContent: `
      <p>This is my first blog post and honestly I don't know how I feel about it. I am a more reserved person and have some social anxiety. I have a hard time being comfortable around anyone, but I need to put myself out into the world. I need to start living instead of just waking up, going through the motion, and going to sleep. I also need to show my children that there is a large world out there and if they are determined enough, they can do anything they want.</p>

      <p>I am a father of three children ages 11, 14, and 17. I am in my mid-30's and woke up one day to realize that my life was slipping by. I love my children and am proud of them, but I don't want them to be my only accomplishments. I spent most of my adult life working in construction or operating a CNC machine in a small factory. I dropped out of college to work full-time when my girlfriend was pregnant with our first child and I did work full-time. I would say that on average over 15 years, I worked over 50 hours/week. I think the constant work might have been what kept me from thinking about my dreams so much. It wasn't really until I was talking with my oldest daughter about college that I realized, I had my own aspirations. They had been quietly sitting back there all of this time, just waiting for me to get the "time" to pursue them.</p>

      <p>At that moment, I enrolled on college online at Champlain College and began the pursuit of my bachelor's degree in cyber security. I wasn't sure at the time if certifications or a degree were the smart bet, so I decided to get both. I have been getting all the certifications that I can afford and I absolutely love it. I forgot how much I enjoyed just learning. I realize that a lot of the certifications are not hands on and to help make up for that I began building a home lab. I also began doing modules on the Hack the Box Academy.</p>

      <p>I am just building out what I want this blog to be, but I think I am going to divide it into sections. I want one section that I use for home lab projects, one that details cyber security related home lab projects, one that talks about the different certifications processes, and possible one were I talking about being a father of three children while pursuing these projects. I am not sure how I feel about the last one, but I think it could be helpful for someone to hear that they are not the only one struggling to balance family, work, and life.</p>
    `
  },

  "first-comptia-certifications": {
    id: "first-comptia-certifications",
    title: "First CompTIA Certifications",
    category: "personalGrowth",
    date: "2025-10-15",
    description: "Passing Network+ and Security+ certifications and discovering my passion for cybersecurity.",
    fullContent: `
      <p>In June, I used my student email address to get a discount on the Network+ certification. I gave myself one month to study and prepare for the exam, but when it came time for my to take it, I was not overly confident. I had read the study guides a few time by this point and set up my own practice network at home.</p>

      <p>The first week of July, I took the Network+ test and passed it. I was so excited that I purchased the Security+ voucher and scheduled the exam for 10 days later. I wanted to build upon my success and was feeling confident. I took and passed the exam. At this point, I knew this was the career path that I wanted to take.</p>

      <p>I doubled down on investing in a cyber lab. I bought a used Sophos firewall and three mini pcs off eBay. Two of the mini pcs had ram that was soldered on the board, but the third did not, so I invested in 64 GB or RAM. This is when I discovered Pfsense and Proxmox. Then I deployed several Linux server and an Active Directory domain. I think this was the point in my journey that I became addicted to learning about new technologies and applications.</p>
    `
  },

  "first-frustration": {
    id: "first-frustration",
    title: "First Frustration",
    category: "personalGrowth",
    date: "2025-10-16",
    description: "Facing rejection in the job search and learning to persevere despite having no professional experience.",
    fullContent: `
      <p>I had just obtained the Network+ and Security+ from CompTIA and I thought that I would at least be able to obtain an entry-level job at local companies. I was in for a rude awakening though.</p>

      <p>At the time, I was only vaguely familiar with Linux and had a passing knowledge of Windows and Active Directory. I had a lab setup and was working in it at least an hour or two a night. I was enrolled at Champlain College and also had certifications from Microsoft, Cisco, and ISC2. I thought that even though I did not have any professional experience, I would be able to find some kind of IT opportunity.</p>

      <p>Then I hit the a wall. I applied to at least 5 jobs every week. I was motivated and knew that I had to succeed no matter what. Most of my applications did not receive any form of reply and half were met with the generic "We are not going to proceed with you at this time." The employers that I did get the first phone interview with ended the hiring process when they realized I had no professional experience, which was on my resume.</p>

      <p>I could have kept my job until I graduated and then started to look for a job, but I needed an entry-level IT job right away. My plan was to work a help desk style job while I was in school and then when I graduated I would have the certifications, degree, and experience. If I didn't have three children at this time, I might have given up here and stuck with my dead-end job that allowed me to just barely get by. How could I let my children see me give up, though? I had made a plan and wanted to show them that anything is possible if you are willing to sacrifice for it.</p>

      <p>I started applying for any job that was related to IT. I spent almost as much time during this period working on my resume as I did studying. I was determined to take my frustration from this experience and let it fuel me. From that point on, every interview I had I always made sure to ask for some form of feedback or advice. I printed a copy of the Michael Jordan quote "I've missed more than 9,000 shots in my career. I've lost almost 300 games. Twenty-six times I've been trusted to take the game-winning shot and missed. I've failed over and over and over again in my life. And that is why I succeed." and taped it to the inside of my bedroom door. It was my only real motivation on some days.</p>

      <p>These failures were my missed shots and I knew that eventually I would sink that buzzer beater.</p>
    `
  }
};

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
  },
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
