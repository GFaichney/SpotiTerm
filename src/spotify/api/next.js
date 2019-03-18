'use strict';

let next = () => {
  return {
    method: 'POST',
    path: '/v1/me/player/next',
    scopes: ['user-modify-playback-state']
  };
};

module.exports = next;

