// Error handler wrapper
process.on("uncaughtException", (err) => {
  console.error("❌ UNCAUGHT EXCEPTION:", err);
  console.error(err.stack);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ UNHANDLED REJECTION at:", promise, "reason:", reason);
});

// Load the main app
try {
  console.log("🔄 Loading app...");
  const app = require("./app");
  const config = require("./config");

  const port = config.port;

  app.listen(port, () => {
    console.log("=".repeat(50));
    console.log("✅ SERVER BERJALAN PADA PORT", port);
    console.log("🌐 http://localhost:" + port);
    console.log("🌍 Environment:", config.nodeEnv);
    console.log("=".repeat(50));
    console.log("Available routes:");
    console.log("  GET /                 - Halaman utama");
    console.log("  GET /infocuaca        - API cuaca");
    console.log("  GET /berita           - Halaman berita");
    console.log("  GET /berita/api       - API berita");
    console.log("  GET /tentang          - Halaman tentang");
    console.log("  GET /bantuan          - Halaman bantuan");
    console.log("=".repeat(50));
  });

  console.log("✅ App loaded successfully");
} catch (error) {
  console.error("❌ Error loading app:", error);
  console.error(error.stack);
  process.exit(1);
}
