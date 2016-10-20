'use strict';

const _ = require('lodash'),
  Promise = require('bluebird'),
  async = require('async'),
  request = require('request-promise');

//NORMAL MAPPING
const numbers = [1, 2, 3];
const numbersTimes2 = _.map(numbers, number => number * 2);
const numbersTimes3 = _.map(numbers, number => number * 3);

console.log(numbers, numbersTimes2, numbersTimes3);

//ASYNC MAPPING
const prices = [9.32, 2.55, 123.34];
function mapPricesToTax(prices) {
  return new Promise((resolve, reject) => {
    async.map(prices, (price, callback) => {
      request(`http://geekwise-node.shift3sandbox.com:3000/tax/${price}`)
        .then(resp => {
          callback(null, resp);
        })
        .catch(reject);
    }, (err, results) => {
      resolve(results);
    });
  });
}

mapPricesToTax(prices)
  .then(results => {
    console.log(results);
  });

//REDUCE
const widgets = [
  {
    price: 12.50,
    name: 'Widget 1'
  },
  {
    price: 3.50,
    name: 'Widget 2'
  },
  {
    price: 10.50,
    name: 'Widget 3'
  }
];

const total = _.reduce(widgets, (accumulator, widget) => accumulator + widget.price, 0);
console.log(total);

//async.series
const pricingFuncs = _.map(prices, (price) => (callback) => {
  request(`http://geekwise-node.shift3sandbox.com:3000/tax/${price}`)
    .then(res => {
      callback(null, res);
    });
});
async.series(pricingFuncs, (err, res) => {
  console.log(res);
});