'use strict';

let expect = require('chai').expect;

let eventCreators = require('../../src/terminal/eventCreators.js');
let events = require('../../src/terminal/events.js');

describe('event creators', () => {
  describe('generateSigwinch', () => {
    it('generates a structure with the right event name and a screen size', () => {
      let event = eventCreators.generateSigwinch();

      expect(event.name).to.equal(events.RESIZE);
      expect(event.rows).to.exist;
      expect(event.cols).to.exist;
    });
  });
  describe('generateKeypress', () => {
    it('generates a structure with the event name and the given key', () => {
      let event = eventCreators.generateKeypress('A');

      expect(event.name).to.equal(events.KEY);
      expect(event.key).to.equal('A');
    });
  });
});
