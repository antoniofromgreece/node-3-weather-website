const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYW50c3BhdGhpcyIsImEiOiJja3d5NTdqeW4waHZpMnVtdHo2Z3YyM2FtIn0.mkAV6so87HVZAXrtGweZ6w";

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Sorry unable to connect to location services");
    } else if (body.features.length === 0) {
      callback("Cant find this location you are after!");
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
