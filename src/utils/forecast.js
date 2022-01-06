const request = require("request");

//VIDEO 37 CHALLENGE////////////////////////////////////////////////

// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=0af1d15aec8039375b72f94e1be7b32a&query=" +
    latitude +
    "," +
    longitude +
    "&units=m";

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("Cant find this location you are after!", undefined);
    } else {
      console.log(body.current);
      callback(
        undefined,
        `
        You are in ${body.location.region}\n
        it's ${body.current.weather_descriptions[0]}\n
        and the temperture is ${body.current.temperature} degrees celcius and the\n
        winds are ${body.current.wind_speed} kmh\n
        coming from ${body.current.wind_dir}
        `
      );
    }
  });
};

module.exports = forecast;
