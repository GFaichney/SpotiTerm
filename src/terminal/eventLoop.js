'use strict';

let events = require('./events.js');
let eventCreators = require('./eventCreators.js');
let tty = require('tty');

const _events = ['SIGINT', 'SIGTERM', 'SIGWINCH'];


let EventLoop = class {
  constructor() {
    // Todo

    this.listeners = {};
    
    this.register = (event,listener) => {
      if(this.listeners[event]){
        this.listeners[event].push(listener);
      } else {
        this.listeners[event] = [listener];
      }
    }

    this.deregister = (event, listener) => {
      if(this.listeners[event]){
        let index = this.listeners[event].indexOf(listener);
        if(index > -1){
          this.listeners[event].splice(index, 1);
        }
      }
    }

    this._eventPropogator = event => {
      let listeners = this.listeners[event.name];
      if(listeners){
        for(let listener of listeners){
          listener(event);
        }
      }
    }

    this._handleSysEvent = signal => {
      if(signal === 'SIGWINCH'){
        let event = eventCreators.generateSigwinch();

      }
    }

    this.start = () => {
      process.stdin.resume();
      process.stdin.setRawMode(true);  // Read one key at a time
      process.stdin.setEncoding('utf8');

      process.stdin.on('data', (chunk) => {
        let event = eventCreators.generateKeypress(chunk);
        this._eventPropogator(event);
      });

      for(let event of _events){
        process.on(event, this._handleSysEvent);
      }
    }
  }
}

module.exports = EventLoop;
