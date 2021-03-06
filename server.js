// setting requires 
const path = require("path");
const express = require("express");
// handlebars setup/requires
const Sequelize = require("sequelize");
const session = require("express-session");
const exphbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sequelize = require("./config/connection");
const helpers = require('./utils/helpers');

const hbs = exphbs.create({ helpers });
const routes = require("./controllers");
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
app.use(express.static("./public"));

// Requiring passport as we've configured it
var passport = require("./config/passport");

// We need to use sessions to keep track of our user's login status
// app.use(session({ secret: "make this secret different for each project", resave: true, saveUninitialized: true }));
app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
// require("./routes/html-routes.js")(app);
// require("./routes/api-routes.js")(app);
app.use(routes);

// requiring models for syncing
var db = require("./models");

// route for 404 requests
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
});

// Syncing our database and logging a message to the user upon success


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, function () {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });

});
