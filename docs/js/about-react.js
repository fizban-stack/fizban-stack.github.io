const user = {
    name: 'James Wells',
    imageUrl: './images/resume.webp',
    bio: `My name is James Wells. I am currently working at RBR Alliance in a sysadmin style job. My responsibilities include managing two Microsoft 365 tenants and three Active Directory domains. They also seem to include maintaining, troubleshooting, and fixing all manner of devices, from phones to servers.

    I am the father of three children. In the free time I have outside of work and family, I have become an home lab enthusiast or as my children refer to me "a tinkerer". I have brought down our network enough times that they always look at me as the culprit when there is an internet outage. A few years ago, I began my homelab with an outdated HP computer and TrueNAS scale. Since then I have spent more time and money than I like to admit on it. I found that eBay is a great place to buy testing equipment, but it is essential to buy at least hard drives new. When I started building my home lab, I had no Linux experience at all, but now I am as comfortable in Linux terminal as I am in the Windows GUI. Sometimes, I am working on a Windows computer and think I would already have this done by now if I was working in Linux terminal. Because of this I have been spending more time learning PowerShell, so that I am as proficient in Windows as I am in Linux. I never thought that I would find it easier to create and modify a file on a terminal than in a GUI.

    I also enjoy going on walks, basketball, and skateboarding, though I have found out that skateboarding hurts a lot worse than I remember.`
};

// Step one - Create a React element
const heading = <h1>{user.name}</h1>;
const image = <img src={user.imageUrl} alt="Headshot of James Wells" style={{ width: '200px', marginBottom: '24px', borderRadius: '8px' }} />;
const bio = user.bio.split('\n\n').map((paragraph, index) => (
<p key={index}>
    {paragraph}
</p>
));

// Step 2: Render the React element
ReactDOM.render(heading, document.getElementById('h1'));
ReactDOM.render(image, document.getElementById('img'));
ReactDOM.render(bio, document.getElementById('content'));
