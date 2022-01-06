const path = require("path");
const express = require("express");
const hbs = require("hbs");
//const request = require("request");
const { registerPartial } = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// console.log(__dirname);
// console.log(__filename);

//console.log(path.join(__dirname, "../public"));

//app.com is the root route
//app.com/help
//app.com/about

//app.use(express.static(path.join(__dirname, "../public")));
//OR
//DEFINE PATHS FOR EXPRESS CONFIG
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//video 47, 48. Dynamic Pages with Templating
//SETUP HANDLEBARS ENGINE AND VIEWS LOCATION
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//SETUP STATIC DIRECTORY TO SERVE
app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Antonio Spathis",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about page",
    name: "Antonio Spathis",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    helpText: "Please HELP this is too much",
    name: "created by Antonio Spathis",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Antonio Spathis",
    errorMessage: "HELP ARTICLE not found coming from app.js",
  });
});

// app.get("*", (req, res) => {
//   res.render("404", {
//     title: "404",
//     name: "Andrew Mead",
//     errorMessage: "Page not found coming from app.js",
//   });
// });

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "There is no address",
    });
  }
  //here we have to destructure the object and give values so the properties-program wont crash
  //Video 56
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          latitude,
          address: req.query.address,
        });
      });
    }
  );
  // res.send({
  //   forecast: "The Weather is bad",
  //   location: "Philadelphia",
  //   address: req.query.address,
  // });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

// app.get("", (req, res) => {
//   res.send("<h1>My page</h1>");
// });

// app.get("/help", (req, res) => {
//   res.send({
//     name: "Andrew",
//     age: 27,
//   });
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>THIS IS MY ABOUT PAGE</h1>");
// });

// app.get("/weather", (req, res) => {
//   res.send([
//     {
//       forecast: "THE WEATHER IS BAD",
//     },
//     {
//       location: "Athens",
//     },
//   ]);
// });

app.listen(port, () => {
  console.log("THE SERVER IS UP ON PORT OR 3000.");
});
