const request = require("postman-request");
const config = require("../config");

const geocode = (address, callback) => {
  // GANTI DENGAN API KEY MAPBOX ANDA YANG BARU
  const accessToken =
    config.mapboxToken ||
    "pk.eyJ1IjoiZmF6YTAzOCIsImEiOiJjbWg2Y242ZWowaHBhMmtvZTIxNjNzam5oIn0.5fORGcDa-HiRK0MV9GUrrQ";

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${accessToken}&limit=1`;

  console.log("Geocode URL:", url); // DEBUG

  request({ url, json: true }, (error, response, body) => {
    // Handle connection errors
    if (error) {
      console.log("Connection error:", error);
      callback(
        "Tidak dapat terkoneksi ke layanan geocoding: " + error.message,
        undefined
      );
      return;
    }

    // Handle HTTP errors
    if (response && response.statusCode >= 400) {
      console.log("HTTP Error:", response.statusCode, body);

      if (response.statusCode === 401) {
        callback(
          "API Key tidak valid atau expired. Silakan cek MapBox account Anda.",
          undefined
        );
      } else if (response.statusCode === 403) {
        callback("Akses ditolak. Mungkin quota API habis.", undefined);
      } else {
        callback(
          `Error ${response.statusCode}: ${
            body.message || "Terjadi kesalahan"
          }`,
          undefined
        );
      }
      return;
    }

    // Handle API response errors
    if (body.message) {
      console.log("API Error:", body.message);
      callback("Error API: " + body.message, undefined);
      return;
    }

    // Handle no results
    if (!body.features || body.features.length === 0) {
      console.log("No features found:", body);
      callback(
        "Tidak dapat menemukan lokasi '" + address + "'. Coba lokasi lain.",
        undefined
      );
      return;
    }

    // Success case
    console.log("Geocode success - Features:", body.features.length);
    console.log("First feature:", body.features[0]);

    callback(undefined, {
      latitude: body.features[0].center[1],
      longitude: body.features[0].center[0],
      location: body.features[0].place_name,
    });
  });
};

module.exports = geocode;
