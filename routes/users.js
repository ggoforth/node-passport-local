'use strict';

var express = require('express');
var router = express.Router(); 
let mongoose = require('mongoose'),
  User = mongoose.model('User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', (req, res, next) => {
  res.json(req.body);   
});

router.get('/register', (req, res, next) => {
  res.render('register'); 
});

router.post('/register', (req, res, next) => {
  //create a new instance of a user model
  let user = new User(req.body);
  
  user.save()
    .then(() => {
      res.json(user); 
    });
});

module.exports = router;
