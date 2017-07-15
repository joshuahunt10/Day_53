const express = require('express');
const router = express.Router();
const User = require('../models/user')

router.get('/login', function(req, res){
  res.render('login')
})

router.post('/auth', function(req, res){
  let user = false;
  let username = req.body.username
  let password = req.body.password
  User.findOne({username: username})
  .then(function(userQuery){
    if(password === userQuery.password){
      console.log('login success');
      user = userQuery.username;
    }
    if(user){
      req.session.user = userQuery.username
      req.session.userID = userQuery._id
      res.redirect('/cards')
    }else{
      res.render('login')
    }
  })
})

router.get('/register', function(req, res){
  res.render('register')
})

router.post('/register', function(req, res){
  var u = new User()
  u.username = req.body.username
  u.password = req.body.password
  u.save()
  .then(function(user){
    res.redirect('/')
  })
})

router.post('/logout', function (req, res){
  req.session.destroy();
  res.redirect('/')
});

module.exports = router;
