'use strict';

var express = require('express');
var router = express.Router();

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

module.exports = router;
