// Load environment variables
require("dotenv").config();

module.exports = {
  port: process.env.PORT || 4000,
  nodeEnv: process.env.NODE_ENV || "development",

  // API Keys
  mediastackKey: process.env.MEDIASTACK_KEY || "",
  mapboxToken: process.env.MAPBOX_TOKEN || "",
  weatherstackKey: process.env.WEATHERSTACK_KEY || "",

  // API Endpoints
  mediastackUrl: "https://api.mediastack.com/v1/news",
  mapboxUrl: "https://api.mapbox.com/geocoding/v5/mapbox.places",
  weatherstackUrl: "http://api.weatherstack.com/current",

  // App Settings
  isDevelopment: process.env.NODE_ENV !== "production",
  isProduction: process.env.NODE_ENV === "production",
};
