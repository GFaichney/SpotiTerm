'use strict';

let play = () => {
  return {
    method: 'PUT',
    path: '/v1/me/player/play',
    scopes: ['user-modify-playback-state']
  };
};

module.exports = play;

