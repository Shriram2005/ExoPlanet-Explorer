document.addEventListener("DOMContentLoaded", () => {
  const newsContainer = document.getElementById("news-container");
  const loadMoreButton = document.getElementById("load-more");

  let currentNewsPage = 1;
  const newsPerPage = 3;

  // Sample news data
  const newsData = [
    {
      title: "Breaking: Major Storm Hits Coast",
      content: "A powerful storm has made landfall...",
      image: "../contents/images/HD 189733 b.jpg",
    },
    {
      title: "Technology: AI Advancements",
      content: "The latest advancements in AI...",
      image: "../contents/images/HD 189733 b.jpg",
    },
    {
      title: "Economy: Market on the Rise",
      content: "Stock markets have seen a positive...",
      image: "../contents/images/HD 189733 b.jpg",
    },
    {
      title: "Sports: Local Team Wins Championship",
      content: "In a thrilling final match...",
      image: "../contents/images/HD 189733 b.jpg",
    },
    {
      title: "Health: New Vaccine Released",
      content: "A new vaccine has been approved...",
      image: "../contents/images/HD 189733 b.jpg",
    },
    {
      title: "Politics: Election Updates",
      content: "The latest results from the national election...",
      image: "../contents/images/HD 189733 b.jpg",
    },
    {
      title: "Science: New Discovery on Mars",
      content: "Scientists have uncovered...",
      image: "../contents/images/HD 189733 b.jpg",
    },
    {
      title: "Entertainment: Movie Premiere Tonight",
      content: "The highly anticipated movie...",
      image: "../contents/images/HD 189733 b.jpg",
    },
    {
      title: "Business: Company Reports Growth",
      content: "The quarterly report shows growth...",
      image: "../contents/images/HD 189733 b.jpg",
    },
  ];

  // Function to load news articles
  function loadNews(page) {
    const start = (page - 1) * newsPerPage;
    const end = start + newsPerPage;
    const newsToDisplay = newsData.slice(start, end);

    newsToDisplay.forEach((news) => {
      const newsItem = document.createElement("div");
      newsItem.classList.add("news-item");

      newsItem.innerHTML = `
                <img src="${news.image}" alt="News Image">
                <div class="news-content">
                    <h3>${news.title}</h3>
                    <p>${news.content}</p>
                </div>
            `;

      newsContainer.appendChild(newsItem);
    });
  }

  // Initial load of news articles
  loadNews(currentNewsPage);

  // Load more news on button click
  loadMoreButton.addEventListener("click", () => {
    currentNewsPage++;
    loadNews(currentNewsPage);

    // Hide the load more button if no more news to load
    if (currentNewsPage * newsPerPage >= newsData.length) {
      loadMoreButton.style.display = "none";
    }
  });
});
