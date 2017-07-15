const express = require("express");
const mustache = require("mustache-express");
const bodyParser = require("body-parser");
const session = require('express-session');
const app = express();
const mongoose = require('mongoose');

app.engine('mustache', mustache());
app.set("view engine", 'mustache');
app.set('layout', 'layout')
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
mongoose.Promise = require('bluebird');

const nodeEnv = process.env.NODE_ENV || "development";
const config = require("./config")[nodeEnv]
console.log("We are using config.mongoUrl", config.mongoUrl)
mongoose.connect(config.mongoUrl)


const indexRoutes = require("./routes/indexRoutes");
const loginRoutes = require("./routes/loginRoutes");
const cardRoutes = require("./routes/cardRoutes")
const user = require("./models/user")


app.use(session({secret: 'puppers', resave: false, saveUninitialized: false}));


app.use(indexRoutes)
app.use(loginRoutes)
app.use(function(req, res, next) {
  if (req.session.user) {
    next()
  } else {
    res.redirect('/login')
  }
});
app.use(cardRoutes)


app.listen(3000, function(){
  console.log('Learning how to spell with flashcards');
})
