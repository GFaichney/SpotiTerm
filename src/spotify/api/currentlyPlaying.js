'use strict';

let currentlyPlaying = () => {
  return {
    method: 'GET',
    path: '/v1/me/player/currently-playing',
    scopes: ['user-read-playback-state']
  };
};

module.exports = currentlyPlaying;
