'use strict';

const express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Widget = mongoose.model('Widget');

router.use(function(req, res, next) {
  if (!req.session || !req.session.passport || !req.session.passport.user) {
    //they are not logged in
    res.redirect('/users/login');  
  } else {
    next(); 
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  Widget.find({})
    .then(widgets => {
      res.render('index', {
        title: 'Express' , 
        widgets
      });
    })
    .catch(next);
});



module.exports = router;
