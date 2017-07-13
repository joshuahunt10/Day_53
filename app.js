const express = require("express");
const mustache = require("mustache-express");
const bodyParser = require("body-parser");
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const app = express();
const mongoose = require('mongoose');

app.engine('mustache', mustache());
app.set("view engine", 'mustache');
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/flipCardsDB')

const indexRoutes = require("./routes/indexRoutes");



passport.use(new BasicStrategy(
  function(username, password, done) {

    Profile.findOne({username: username, password: password})
    .then( function(account){
      if(account){
        done(null, account)
      } else {
        done(null, false)
      }
    })
  }
));

app.use(indexRoutes)

app.listen(3000, function(){
  console.log('Learning how to spell with flashcards');
})
