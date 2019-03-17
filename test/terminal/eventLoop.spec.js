let expect = require('chai').expect;
let EventLoop = require('../../src/terminal/eventLoop.js');

describe('EventLoop', function() {
  describe('register', function() {
    
    it('registers a listener using the event as a key', () =>{
      let loop = new EventLoop();
      loop.register('event', ()=>'retval');

      expect(loop.listeners.event).to.not.be.null;
      expect(loop.listeners.event.length).to.equal(1);
    });
    
    it('adds 2 listeners under the same event',  () => {
      let loop = new EventLoop();
      loop.register('event', ()=>'retval');
      loop.register('event', ()=>'another retval');

      expect(loop.listeners.event).to.not.be.null;
      expect(loop.listeners.event.length).to.equal(2);
    });

  });

  describe('deregister', () => {
    it('empties the listener array for the event when the last listener is removed', () => {
      let loop = new EventLoop();
      let callback = ()=>'retval';
      loop.register('event', callback);

      loop.deregister('event', callback);
      
      expect(loop.listeners.event.length).to.equal(0); 
    });

    it('removes the matching listener for the event', () => {
      let loop = new EventLoop();
      let callback = ()=>'retval';
      let callback2 = () => 'retval2';
      loop.register('event', callback);
      loop.register('event', callback2);

      loop.deregister('event', callback);

      expect(loop.listeners.event.length).to.equal(1);
      expect(loop.listeners.event[0]()).to.equal('retval2');
    });
  });

  describe('_eventPropogator', () => {
    it('calls all the listeners for the event once', () => {
      let loop = new EventLoop();
      let called1 = 0;
      let called2 = 0;
      loop.listeners={'event':[()=>{called1 += 1;}, ()=>{called2 += 1;}]}

      loop._eventPropogator({name: 'event'});

      expect(called1).to.equal(1);
      expect(called2).to.equal(1);
    });

    it('doesn\'t call the listeners for other events', () => {
      let loop = new EventLoop();
      let called1 = 0;
      let called2 = 0;
      loop.listeners={'event':[()=>{called1 += 1;}], 'otherevent': [()=>{called2+=1;}]}

      loop._eventPropogator({name: 'event'});

      expect(called1).to.equal(1);
      expect(called2).to.equal(0);
    });

    it('doesn\'t error when there are no listeners for the event', () => {
      let loop = new EventLoop();

      loop._eventPropogator({name: 'event'});

      expect(true).to.be.true;
    });
  });
  
  //   describe('_handleEvent', () => {
  //     it('calls all of the handlers for the given event', () => {
  //       let loop = new EventLoop();
  //       let callback_called = false;
  //       let callback2_called = false;
  //       let callback = ()=>{callback_called = true;};
  //       let callback2 = () => {callback2_called = true;};
  //       loop.register('event', callback);
  //       loop.register('event', callback2);
  // 
  //       loop._handleEvent('event');
  // 
  //       expect(callback_called).to.be.true;
  //       expect(callback2_called).to.be.true;
  //     });
  //   });
});
