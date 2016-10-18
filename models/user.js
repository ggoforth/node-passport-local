'use strict';

const mongoose = require('mongoose'),
  Promise = require('bluebird'),
  bcrypt = Promise.promisifyAll(require('bcrypt')),
  _ = require('lodash');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    next();
  } else {
    //generate a salt
    bcrypt.genSaltAsync(10)
      .then(salt => {
        //generate a hashed password
        bcrypt.hashAsync(this.password, salt)
          .then(hash => {
            this.password = hash;
            next();
          })
          .catch(next);
      })
      .catch(next);
  }
});

UserSchema.methods.toJSON = function() {
  let user = _.omit(this.toObject(), ['password', '__v']);
  return user;
};

mongoose.model('User', UserSchema);