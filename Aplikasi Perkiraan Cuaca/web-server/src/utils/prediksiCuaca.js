const request = require("postman-request");
const config = require("../config");

const forecast = (latitude, longitude, callback) => {
  // GANTI DENGAN API KEY WEATHERSTACK ANDA
  const accessKey =
    config.weatherstackKey || "f3db5b460b02d6fa253d06400e404d9f";
  const url = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${latitude},${longitude}&units=m`;

  console.log("Forecast URL:", url); // DEBUG

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Tidak dapat terkoneksi ke layanan cuaca", undefined);
    } else if (body.error) {
      callback("Error cuaca: " + body.error.info, undefined);
    } else {
      callback(
        undefined,
        `Info Cuaca: ${body.current.weather_descriptions[0]}. ` +
          `Suhu: ${body.current.temperature}°C. ` +
          `Terasa seperti: ${body.current.feelslike}°C. ` +
          `Kelembaban: ${body.current.humidity}%. ` +
          `Angin: ${body.current.wind_speed} km/jam`
      );
    }
  });
};

module.exports = forecast;
