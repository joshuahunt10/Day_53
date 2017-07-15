const express = require('express');
const router = express.Router();
const User = require('../models/user')
const Card = require('../models/cards')

router.get('/cards', function(req, res){
  User.findOne({'_id': req.session.userID})
  .then(function(user){
    res.render('cards', {
      user: req.session.user,
      decks:user.decks,
      decksLen: user.decks.length
    })
  })
})

router.post('/deck/new', function(req, res){
  var deck = new Card()
  deck.title = req.body.title
  deck.save()
  .then(function(deck){
    User.findOne({'_id': req.session.userID})
    .then(function(user){
      console.log(user)
      user.decks.push({
        id: deck._id,
        name: deck.title
      })
      user.save().then(function(user){
        res.redirect('/cards')
      })
    })
  })
})

router.post('/card/deck/new', function(req, res){
  Card.findOne({'_id': req.body.deck})
  .then(function(deck){
    deck.test.push({
      question: req.body.question,
      answer: req.body.answer
    })
    deck.save().then(function(){
      res.render('cards', {
        user: req.session.user,
        confirm: "Card Added to deck!"
      })
    })
  })
})

router.get('/card/deck/show/:deckID', function(req, res){
  deckID = req.params.deckID
  Card.findOne({'_id': deckID})
  .then(function(deck){
    res.render('cardslayout', {
      user: req.session.user,
      deck: deck
    })
  })
})

router.get('/:deckID/test', function(req, res){
  deckID = req.params.deckID
  Card.findOne({'_id': deckID})
  .then(function(deck){
    res.render('cardTest', {
      user: req.session.user,
      deck: deck
    })
  })
})


module.exports = router;
