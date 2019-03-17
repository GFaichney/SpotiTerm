'use strict';

let dedupArray = array => {
  let deduped = {};
  array.forEach((elem) => {
    deduped[elem] = elem;
  });

  return Object.keys(deduped);
};

module.exports = dedupArray;
