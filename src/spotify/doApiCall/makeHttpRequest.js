'use strict';

let config = require('../config.js');

let buildOptions = (api, authToken) => {
  return {uri: `${config.base}${api.path}`, headers: { Authorization: `Bearer ${authToken}`}}
};

let makeHttpRequest = (method, api, authToken) => {
  return new Promise((resolve, reject) => {
    method(buildOptions(api, authToken), (err, res, body) => {
      let bodyObject = {};
      if(body) {
        bodyObject = JSON.parse(body);
      };
      if(err){
        return reject(err);
      } else if(bodyObject.error){
        return reject(bodyObject.error);
      } else {
        return resolve(bodyObject);
      }
    });
  });
}

module.exports = { buildOptions, makeHttpRequest };
