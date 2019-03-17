'use strict';

let request = require('request');

let getMethod = api => {
  if(api.method === 'PUT'){
    return request.put;
  } else if (api.method === 'POST'){
    return request.post;
  } else {
    return request.get;
  }
};

module.exports = { getMethod }
