'use strict';

const express = require('express'),
  mongoose = require('mongoose'),
  Widget = mongoose.model('Widget'),
  router = express.Router();

//show widgets 
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

//show widget form
router.get('/create', function(req, res, next) {
  res.render('widgets/form', {});
});

//create widget
router.post('/', function(req, res, next) {
  //handle posting of a widget
  let widget = new Widget(req.body);
  widget.save()
    .then(() => {
      res.redirect('/widgets'); 
    });
});


//edit widget

//delete widget

module.exports = router;
