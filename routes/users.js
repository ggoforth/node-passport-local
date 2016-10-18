'use strict';

var express = require('express');
var router = express.Router(); 
let mongoose = require('mongoose'),
  User = mongoose.model('User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', (req, res, next) => {
  res.render('login'); 
});

router.post('/login', (req, res, next) => {
  res.json(req.body);   
});

router.get('/register', (req, res, next) => {
  res.render('register'); 
});

router.post('/register', (req, res, next) => {
  let user = new User(req.body);
  
  user.save()
    .then(() => res.redirect('/users/login'));
});

module.exports = router;
