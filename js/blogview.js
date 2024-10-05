document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');

    // Fetch the article data (in a real app, this would be an API call)
    fetchArticleData(articleId).then(data => {
        displayArticle(data);
        displayRelatedArticles(data.relatedArticles);
    });
});

function fetchArticleData(id) {
    // In a real app, this would be an API call
    // For now, we'll use a mock data object
    return new Promise((resolve) => {
        const mockData = {
            1: {
                title: "Discovering a New Super-Earth",
                author: "Dr. Jane Smith",
                date: "May 15, 2023",
                content: `<p>Recent observations have led to the exciting discovery of a potentially habitable super-Earth orbiting a nearby star...</p>
                          <h2>The Discovery</h2>
                          <p>Using advanced telescopes and data analysis techniques, astronomers have identified a planet approximately 1.5 times the size of Earth, orbiting within the habitable zone of its star...</p>`,
                image: "./contents/blog/post1.jpg",
                relatedArticles: [2, 3]
            },

            featured: {
                title: "The Hunt for Exomoons: A New Frontier in Planetary Science",
                author: "Dr. Emily Johnson",
                date: "June 1, 2023",
                content: `<p>In this study, we investigate the feasibility of detecting exomoons—natural satellites orbiting extrasolar planets—using radial velocity (RV) measurements. These measurements involve detecting the small gravitational influence that orbiting moons exert on their host planets, causing a detectable "wobble." This approach, although challenging, is becoming increasingly viable thanks to advancements in high-resolution spectroscopy and high-contrast imaging technologies.</p>

                <h2>Current Capabilities</h2>
                <p>Our research demonstrates that existing instruments, like the Keck Planet Imager and Characterizer (KPIC), have already achieved the capability to detect large moons. Specifically, we found sensitivity to moons with mass ratios of 1-4% relative to their host planet or brown dwarf, at orbital separations similar to those of Jupiter's Galilean moons.</p>

                <h2>Future Prospects</h2>
                <p>Looking forward, we project that future instruments like the Multi-Object Diffraction-limited High-resolution Infrared Spectrograph (MODHIS) on the Thirty Meter Telescope (TMT) will significantly enhance our ability to detect smaller moons. Our simulations indicate that MODHIS could detect moons with mass ratios as small as 10^-4, similar to the mass ratio of moons that form in circumplanetary disks.</p>

                <h2>Implications and Potential</h2>
                <p>The detection of exomoons through RV monitoring offers exciting prospects for advancing our understanding of planet formation. Detecting moons will allow precise measurements of the mass of substellar companions and could help constrain models of moon formation. Moreover, exomoons could potentially host conditions suitable for life, especially those orbiting gas giants in the habitable zones of their parent stars.</p>

                <h2>Additional Detection Methods</h2>
                <p>In addition to RV measurements, we also explore the possibility of detecting exomoons using the Rossiter-McLaughlin (RM) effect. This method relies on measuring the distortion in the radial velocity signal during a moon's transit across the face of its host planet.</p>

                <h2>Conclusion</h2>
                <p>Overall, this work outlines both the current capabilities and future potential of RV detection methods for exomoons. With further improvements in observational techniques and instrumentation, we anticipate significant progress in the detection of smaller moons and a deeper understanding of their role in planetary systems.</p>`,
                image: "./contents/blogs/blog-1.png",
                relatedArticles: [2, 3]
            },
            // Add more mock articles here
        };
        setTimeout(() => resolve(mockData[id]), 100); // Simulate network delay
    });
}

function displayArticle(data) {
    // Update hero section
    const heroImage = document.querySelector('.exo-blog-hero-image');
    const heroTitle = document.querySelector('.exo-blog-hero-title');
    const heroMeta = document.querySelector('.exo-blog-hero-meta');
    
    heroImage.src = data.image;
    heroImage.alt = data.title;
    heroTitle.textContent = data.title;
    heroMeta.innerHTML = `<span>By ${data.author}</span> | <span>${data.date}</span>`;

    // Update article content
    const articleContent = document.getElementById('blog-content');
    articleContent.innerHTML = `
        <div class="exo-article-content" data-aos="fade-up" data-aos-delay="300">
            ${data.content}
        </div>
    `;
}

function displayRelatedArticles(relatedIds) {
    const relatedArticlesContainer = document.getElementById('related-articles');
    relatedArticlesContainer.innerHTML = ''; // Clear existing content

    relatedIds.forEach(id => {
        fetchArticleData(id).then(data => {
            const articleCard = document.createElement('div');
            articleCard.className = 'exo-related-card';
            articleCard.innerHTML = `
                <img src="${data.image}" alt="${data.title}">
                <h3>${data.title}</h3>
                <a href="blogview.html?id=${id}" class="exo-read-more">Read More</a>
            `;
            relatedArticlesContainer.appendChild(articleCard);
        });
    });
}
