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

//show a widget form for updating
router.get('/:widgetId/edit', (req, res, next) => {
  Widget.findById(req.params.widgetId) 
    .then(widget => {
      res.render('widgets/edit', {widget}); 
    });
});

//edit widget
router.put('/:widgetId', (req, res, next) => {
  Widget.findById(req.params.widgetId)
    .then(widget => {
      if (!widget) {
        return next(new Error('Widget not found')); 
      }
      
      Object.assign(widget, req.body);
      widget.save()
        .then(() => {
          res.redirect('/widgets'); 
        })
        .catch(next);
    })
    .catch(next);
});

//delete widget
router.delete('/:widgetId', (req, res, next) => {
  Widget.remove({_id: req.params.widgetId})
    .then(() => {
      res.redirect('/widgets'); 
    });
});

module.exports = router;
