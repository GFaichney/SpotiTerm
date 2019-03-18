'use strict';

let previous = () => {
  return {
    method: 'POST',
    path: '/v1/me/player/previous',
    scopes: ['user-modify-playback-state']
  };
};

module.exports = previous;

