'use strict';

let pause = () => {
  return {
    method: 'PUT',
    path: '/v1/me/player/pause',
    scopes: ['user-modify-playback-state']
  };
};

module.exports = pause;
