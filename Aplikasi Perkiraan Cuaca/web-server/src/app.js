const path = require("path");
const express = require("express");
const hbs = require("hbs");
const config = require("./config");

// Import utils - pastikan path benar
const geocode = require("./utils/geocode");
const forecast = require("./utils/prediksiCuaca");
const getNews = require("./utils/berita");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Debug middleware
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);
  next();
});

// Routes
app.get("/", (req, res) => {
  res.render("index", {
    judul: "Aplikasi Cek Cuaca",
    nama: "Faza Azka M.",
  });
});

app.get("/tentang", (req, res) => {
  res.render("tentang", {
    judul: "Tentang Saya",
    nama: "Faza Azka M.",
  });
});

app.get("/bantuan", (req, res) => {
  res.render("bantuan", {
    judul: "Bantuan",
    nama: "Faza Azka M.",
    helpText: "Halaman bantuan",
  });
});

app.get("/berita", (req, res) => {
  res.render("berita", {
    judul: "Berita Terkini",
    nama: "Faza Azka M.",
  });
});

// ✅ ROUTE INFOCUACA - INI YANG PENTING!
app.get("/infocuaca", (req, res) => {
  console.log("🌤️ /infocuaca ROUTE HIT!");
  console.log("Query:", req.query);

  if (!req.query.address) {
    return res.send({
      error: "Kamu harus memasukan lokasi yang ingin dicari",
    });
  }

  console.log("📍 Searching for:", req.query.address);

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        console.log("❌ Geocode error:", error);
        return res.send({ error });
      }

      console.log("✅ Geocode success - Lat:", latitude, "Lon:", longitude);

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          console.log("❌ Forecast error:", error);
          return res.send({ error });
        }

        console.log("✅ Forecast success");

        res.send({
          prediksiCuaca: forecastData,
          lokasi: location,
          address: req.query.address,
        });
      });
    }
  );
});

// ✅ ROUTE API BERITA
app.get("/berita/api", async (req, res) => {
  try {
    const category = req.query.category || "general";
    const country = req.query.country || "id";

    console.log("📰 Berita API Request:", { category, country });

    const newsResponse = await getNews(category, country);

    // Handle both formats: { data: [...] } or direct body with data property
    const articles = newsResponse.data || newsResponse;

    res.json({
      success: true,
      data: Array.isArray(articles) ? articles : [],
      category: category,
    });
  } catch (error) {
    console.log("❌ Berita API Error:", error);
    res.json({
      success: false,
      error: error.message || error,
      data: getFallbackNews(), // Fallback data
    });
  }
});

// Fallback data jika API error
function getFallbackNews() {
  return [
    {
      title: "Berita Teknologi Terkini",
      description:
        "Perkembangan terbaru dalam dunia teknologi dan inovasi digital.",
      url: "#",
      source: "Tech News",
      published_at: new Date().toISOString(),
      image: null,
      category: "technology",
    },
    {
      title: "Update Cuaca Hari Ini",
      description:
        "Informasi cuaca terkini untuk berbagai wilayah di Indonesia.",
      url: "#",
      source: "Weather Update",
      published_at: new Date().toISOString(),
      image: null,
      category: "general",
    },
    {
      title: "Tips Kesehatan Musim Hujan",
      description: "Menjaga kesehatan selama musim hujan dengan tips praktis.",
      url: "#",
      source: "Health Tips",
      published_at: new Date().toISOString(),
      image: null,
      category: "health",
    },
    {
      title: "Perkembangan Bisnis Digital",
      description:
        "Tren terbaru dalam bisnis digital dan e-commerce di Indonesia.",
      url: "#",
      source: "Business Update",
      published_at: new Date().toISOString(),
      image: null,
      category: "business",
    },
    {
      title: "Event Olahraga Mendatang",
      description: "Jadwal event olahraga yang akan datang di berbagai cabang.",
      url: "#",
      source: "Sports News",
      published_at: new Date().toISOString(),
      image: null,
      category: "sports",
    },
  ];
}

// Test route untuk memastikan server bekerja
app.get("/test", (req, res) => {
  console.log("✅ Test route hit");
  res.send({
    message: "Server bekerja!",
    timestamp: new Date().toISOString(),
  });
});

// Simple test cuaca tanpa API
app.get("/simple-cuaca", (req, res) => {
  console.log("✅ Simple cuaca route hit");
  res.send({
    prediksiCuaca: "Cuaca cerah - 28°C (TEST DATA)",
    lokasi: "Jakarta, Indonesia",
    address: req.query.address || "test",
  });
});

// Test route untuk berita
app.get("/test-berita", (req, res) => {
  console.log("✅ Test berita route hit");
  res.json({
    success: true,
    message: "Route berita bekerja!",
    data: getFallbackNews(),
  });
});

// ✅ PERBAIKAN: 404 handler yang benar untuk Express.js versi baru
app.use((req, res) => {
  console.log("❌ 404 - Route not found:", req.url);
  res.status(404).render("404", {
    judul: "404 - Halaman Tidak Ditemukan",
    nama: "Faza Azka M.",
    pesankesalahan: "Halaman tidak ditemukan: " + req.url,
  });
});

// Export app untuk testing atau serverless deployment
module.exports = app;

// Only start server if this file is run directly (not imported)
if (require.main === module) {
  const port = config.port;
  app.listen(port, () => {
    console.log("=".repeat(50));
    console.log("✅ SERVER BERJALAN PADA PORT", port);
    console.log("🌐 http://localhost:" + port);
    console.log("=".repeat(50));
    console.log("Available routes:");
    console.log("  GET /                 - Halaman utama");
    console.log("  GET /infocuaca        - API cuaca");
    console.log("  GET /berita           - Halaman berita");
    console.log("  GET /berita/api       - API berita");
    console.log("  GET /test             - Test route");
    console.log("  GET /test-berita      - Test berita");
    console.log("  GET /simple-cuaca     - Simple cuaca test");
    console.log("=".repeat(50));
  });
}
