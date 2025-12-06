const request = require("postman-request");
const config = require("../config");

const getNews = (category = "", country = "id") => {
  return new Promise((resolve, reject) => {
    const accessKey =
      config.mediastackKey || "7322c33f23cca9425c1e6163e9f29b41";

    // GUNAKAN HTTPS, BUKAN HTTP
    // Catatan: Free plan tidak support parameter 'languages'
    let url = `https://api.mediastack.com/v1/news?access_key=${accessKey}&countries=${country}`;

    if (category) {
      url += `&categories=${category}`;
    }

    url += "&limit=10";

    console.log("Mediastack API URL:", url);

    request(
      {
        url,
        json: true,
        timeout: 10000, // 10 second timeout
      },
      (error, response, body) => {
        console.log("API Response:", {
          error,
          statusCode: response?.statusCode,
          body,
        });

        if (error) {
          console.error("Network error:", error);
          reject("Tidak dapat terkoneksi ke layanan berita: " + error.message);
        } else if (response.statusCode !== 200) {
          reject(
            `Error HTTP ${response.statusCode}: ${
              body?.error?.message || "Unknown error"
            }`
          );
        } else if (body.error) {
          reject("Error API: " + body.error.message);
        } else if (!body.data || body.data.length === 0) {
          reject("Tidak ada berita ditemukan untuk kriteria ini");
        } else {
          console.log(
            "Berita berhasil diambil:",
            body.data.length + " artikel"
          );
          resolve(body);
        }
      }
    );
  });
};

// Fallback ke mock data jika API gagal
const getNewsWithFallback = async (category = "", country = "id") => {
  try {
    console.log("Mencoba mengambil berita dari Mediastack...");
    const news = await getNews(category, country);
    return news;
  } catch (error) {
    console.log("Mediastack gagal, menggunakan mock data:", error);
    return getMockNews(category, country);
  }
};

// Mock data untuk fallback
function getMockNews(category = "", country = "id") {
  const mockNews = {
    general: [
      {
        title: "Pembangunan Infrastruktur Digital Dipercepat di Indonesia",
        description:
          "Pemerintah mengalokasikan dana besar untuk mempercepat pembangunan infrastruktur digital di seluruh Indonesia guna mendukung transformasi digital.",
        source: "Kompas",
        published_at: new Date().toISOString(),
        category: "general",
        url: "#",
        image: "https://via.placeholder.com/300x200?text=Berita+Umum",
      },
      {
        title: "Inovasi Teknologi di Sektor Pendidikan Nasional",
        description:
          "Sekolah-sekolah mulai menerapkan teknologi AI dan machine learning untuk meningkatkan kualitas pembelajaran daring di masa pandemi.",
        source: "Kompas",
        published_at: new Date().toISOString(),
        category: "general",
        url: "#",
        image: "https://via.placeholder.com/300x200?text=Education+Tech",
      },
      {
        title: "Program Kesehatan Masyarakat Diperluas",
        description:
          "Pemerintah memperluas program kesehatan masyarakat dengan fokus pada pencegahan penyakit dan peningkatan akses layanan kesehatan.",
        source: "Detik Health",
        published_at: new Date().toISOString(),
        category: "general",
        url: "#",
        image: null,
      },
    ],
    technology: [
      {
        title: "Pengembangan Aplikasi Web dengan Node.js Makin Populer",
        description:
          "Node.js semakin populer dalam pengembangan aplikasi web modern dengan performa tinggi dan skalabilitas yang baik untuk startup.",
        source: "Tech News",
        published_at: new Date().toISOString(),
        category: "technology",
        url: "#",
        image: "https://via.placeholder.com/300x200?text=Node.js",
      },
      {
        title: "Trend AI dan Machine Learning di Tahun 2024",
        description:
          "Artificial Intelligence dan Machine Learning menjadi teknologi paling dicari di industri software development global.",
        source: "Developer Journal",
        published_at: new Date().toISOString(),
        category: "technology",
        url: "#",
        image: "https://via.placeholder.com/300x200?text=AI+ML",
      },
      {
        title: "Cloud Computing Transformasi Bisnis Digital",
        description:
          "Perusahaan beralih ke cloud computing untuk efisiensi operasional dan skalabilitas infrastruktur IT yang lebih baik.",
        source: "Cloud Insider",
        published_at: new Date().toISOString(),
        category: "technology",
        url: "#",
        image: null,
      },
    ],
    business: [
      {
        title: "Pertumbuhan Ekonomi Digital Indonesia Capai 15%",
        description:
          "Ekonomi digital Indonesia menunjukkan pertumbuhan signifikan dengan banyak startup baru bermunculan di berbagai sektor.",
        source: "Bisnis Indonesia",
        published_at: new Date().toISOString(),
        category: "business",
        url: "#",
        image: "https://via.placeholder.com/300x200?text=Business",
      },
      {
        title: "E-Commerce Indonesia Tumbuh Pesat",
        description:
          "Industri e-commerce Indonesia mengalami pertumbuhan signifikan dengan nilai transaksi mencapai triliunan rupiah.",
        source: "Economic Review",
        published_at: new Date().toISOString(),
        category: "business",
        url: "#",
        image: null,
      },
    ],
    sports: [
      {
        title: "Persiapan Timnas Indonesia Menuju Piala Dunia",
        description:
          "Timnas Indonesia melakukan persiapan intensif menyambut kompetisi internasional mendatang dengan pelatihan khusus.",
        source: "Sport News",
        published_at: new Date().toISOString(),
        category: "sports",
        url: "#",
        image: "https://via.placeholder.com/300x200?text=Sports",
      },
      {
        title: "Atlet Indonesia Raih Medali Emas di Kejuaraan Asia",
        description:
          "Prestasi membanggakan atlet Indonesia yang berhasil meraih medali emas dalam kompetisi tingkat Asia.",
        source: "Sports Daily",
        published_at: new Date().toISOString(),
        category: "sports",
        url: "#",
        image: null,
      },
    ],
    health: [
      {
        title: "Tips Hidup Sehat di Era Digital",
        description:
          "Para ahli kesehatan memberikan tips untuk menjaga kesehatan fisik dan mental di tengah gaya hidup digital modern.",
        source: "Health Magazine",
        published_at: new Date().toISOString(),
        category: "health",
        url: "#",
        image: null,
      },
      {
        title: "Vaksinasi COVID-19 Booster Dibuka untuk Umum",
        description:
          "Program vaksinasi booster COVID-19 kini tersedia untuk masyarakat umum di berbagai fasilitas kesehatan.",
        source: "Medical News",
        published_at: new Date().toISOString(),
        category: "health",
        url: "#",
        image: null,
      },
    ],
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      const news = mockNews[category] || mockNews.general;
      console.log("Menggunakan mock data:", news.length + " articles");
      resolve({ data: news });
    }, 500); // Reduced timeout to 500ms for faster response
  });
}

// Export function dengan fallback
module.exports = getNewsWithFallback;
