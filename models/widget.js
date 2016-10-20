'use strict';

const mongoose = require('mongoose');

const WidgetSchema = new mongoose.Schema({
  name: String,
  price: {type: Number, min: 5, max: 50},
  prongs: Number,
  created_at: {type: Date, default: Date.now}
});

mongoose.model('Widget', WidgetSchema);

