// setting requires 
const path = require("path");
const express = require("express");
const session = require("express-session");
// handlebars setup/requires
const exphbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const hbs = exphbs.create({});
const sequelize = require("./config/connection.js");

const app = express();
const PORT = process.env.PORT || 3001;

// handlebars setup
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// session setup 
const sess = {
  secret: "tummyache", // maybe change later
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Creating express app and configuring middleware needed for authentication
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Requiring passport as we've configured it
var passport = require("./config/passport");

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "make this secret different for each project", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// requiring models for syncing
var db = require("./models");

// route for 404 requests
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
});

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});


<<<<<<< HEAD
=======
// require("dotenv").config();
// var path = require('path');

// // Requiring necessary npm packages
// var express = require("express");
// var session = require("express-session");
// const exphbs = require('express-handlebars');

// // Requiring passport as we've configured it
// var passport = require("./config/passport");

// // setting view engine 
// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');

// // Setting up port and requiring models for syncing
// var PORT = process.env.PORT || 8080;
// var db = require("./models");

// // Creating express app and configuring middleware needed for authentication
// var app = express();
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.static("public"));

// // We need to use sessions to keep track of our user's login status
// app.use(session({ secret: "make this secret different for each project", resave: true, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// // Requiring our routes
// require("./routes/html-routes.js")(app);
// require("./routes/api-routes.js")(app);

// // Syncing our database and logging a message to the user upon success
// db.sequelize.sync().then(function() {
//   app.listen(PORT, function() {
//     console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
//   });
// });

// //example for myself
// app.get('/', (req, res) =>{ 
//   res.render('day.handlebars', {name: christian})
// })
>>>>>>> 572e2c2e98b972860c5e12817846294f6512c9bb
