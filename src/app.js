let { EventLoop, screen, events } = require('./terminal');
let { doApiCall } = require('./spotify/doApiCall');
let api = require('./spotify/api');
let { getRequiredAuths } = require('./spotify/getRequiredAuths.js');
let ui = require('./ui');
let { trackInfo } = require('./spotify/mapper');

let uiUpdate = async () => {
  try{
    let playState = await doApiCall(api.currentlyPlaying());
    screen.printAt(1,1, ui.trackInfo(100,trackInfo(playState)));
    screen.printAt(2,1, ui.progressBar(100,playState.item.duration_ms, playState.progress_ms));
    setTimeout(uiUpdate, 1000);
  } catch(err){
    console.error(`uiUpdate: ${err}`);
  }
};

let keyListener = async event => {
  if(event.key === 'q'){
    screen.showCursor();
    screen.normalScreen();
    process.exit(0);
  }
  if(event.key === 'p'){
    let playState = await doApiCall(api.currentlyPlaying());
    let res = {};
    if(playState && playState.is_playing){
      res = await doApiCall(api.pause());
    } else {
      res = await doApiCall(api.play());
    }
  }
};

let startTerminalApp = () => {
  let el = new EventLoop();
  el.start();
  screen.alternateScreen();
  screen.hideCursor();
  el.register(events.KEY, keyListener);
  uiUpdate();
}

let startup = async () => {
  try{
    let playing = await doApiCall(api.currentlyPlaying());
    startTerminalApp();
  }catch(err){
    console.error(`startup: ${err}`);
  }
};

startup();
