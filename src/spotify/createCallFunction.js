'use strict';

let request = require('request');

let createCallFunction = (data) => {
  return () => {
    return new Promise((resolve, reject) => {
      request.get(data, (err, res, body) => {
        if(err){
          return reject(err);
        } else {
          return resolve(body);
        }
      });
    });
  }
};


module.exports = { createCallFunction };
