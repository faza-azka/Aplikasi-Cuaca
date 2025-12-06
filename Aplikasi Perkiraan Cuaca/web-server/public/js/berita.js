// Client-side JavaScript untuk halaman berita
console.log("🚀 Berita.js loaded");

// Ambil elemen DOM
const newsFilterForm = document.getElementById("newsFilterForm");
const categorySelect = document.getElementById("categorySelect");
const countrySelect = document.getElementById("countrySelect");
const loadingMessage = document.getElementById("loadingMessage");
const newsResults = document.getElementById("newsResults");
const errorMessage = document.getElementById("errorMessage");

// Load berita saat halaman pertama kali dibuka
document.addEventListener("DOMContentLoaded", () => {
  console.log("📄 DOM loaded, fetching initial news...");
  loadNews("", "id");
});

// Handle form submit untuk filter
newsFilterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const category = categorySelect.value;
  const country = countrySelect.value;
  console.log("🔍 Filtering news:", { category, country });
  loadNews(category, country);
});

// Fungsi untuk load berita dari server
async function loadNews(category = "", country = "id") {
  try {
    console.log("🔄 Loading news with params:", { category, country });

    // Show loading, hide results & errors
    if (loadingMessage) loadingMessage.style.display = "block";
    if (newsResults) {
      newsResults.style.display = "none";
      newsResults.innerHTML = "";
    }
    if (errorMessage) errorMessage.style.display = "none";

    // Build URL with query params
    const params = new URLSearchParams();
    if (category) params.append("category", category);
    if (country) params.append("country", country);

    const url = `/berita/api?${params.toString()}`;
    console.log("📡 Fetching from:", url);

    // Fetch dari server
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    console.log("📦 Response received:", data);
    console.log("📦 Data array:", data.data);
    console.log("📦 Data length:", data.data ? data.data.length : 0);

    // Hide loading
    if (loadingMessage) loadingMessage.style.display = "none";

    if (!data.success || !data.data || data.data.length === 0) {
      // Tidak ada berita
      if (newsResults) {
        newsResults.innerHTML =
          '<p class="no-news">📭 Tidak ada berita ditemukan untuk kategori ini.</p>';
        newsResults.style.display = "block";
      }
      return;
    }

    // Render berita
    renderNews(data.data);
    if (newsResults) newsResults.style.display = "block";

    console.log("✅ News loaded successfully!");
  } catch (error) {
    console.error("❌ Error loading news:", error);
    if (loadingMessage) loadingMessage.style.display = "none";
    if (errorMessage) errorMessage.style.display = "block";
    if (newsResults) newsResults.style.display = "none";
  }
}

// Fungsi untuk render berita ke DOM
function renderNews(articles) {
  newsResults.innerHTML = ""; // Clear previous results

  articles.forEach((article) => {
    const articleCard = createArticleCard(article);
    newsResults.appendChild(articleCard);
  });

  console.log(`✅ Rendered ${articles.length} articles`);
}

// Fungsi untuk membuat card artikel
function createArticleCard(article) {
  const card = document.createElement("div");
  card.className = "news-card";

  // Format tanggal
  const publishedDate = new Date(article.published_at).toLocaleDateString(
    "id-ID",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  // Image section (jika ada)
  const imageHTML = article.image
    ? `<div class="news-image">
         <img src="${article.image}" alt="${article.title}" onerror="this.parentElement.style.display='none'">
       </div>`
    : "";

  card.innerHTML = `
    ${imageHTML}
    <div class="news-content">
      <h3 class="news-title">${article.title}</h3>
      <p class="news-meta">
        <span class="news-source">📰 ${article.source}</span>
        <span class="news-date">📅 ${publishedDate}</span>
      </p>
      <p class="news-description">${article.description}</p>
      <a href="${article.url}" target="_blank" class="news-link" ${
    article.url === "#" ? 'onclick="return false;"' : ""
  }>
        Baca Selengkapnya →
      </a>
    </div>
  `;

  return card;
}
