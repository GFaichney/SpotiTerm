const colours = {
  red: '31',
  black: '30',
  green: '32',
  yellow: '33',
  blue: '34',
  magenta: '35',
  cyan: '36',
  white: '37'
};

const reset = '0';

const backgrounds = {
  red: '41',
  black: '40',
  green: '42',
  yellow: '43',
  blue: '44',
  magenta: '55',
  cyan: '46',
  white: '47'
};

const escapeCode = `\u001b`;

const column = col => { process.stdout.write(`${escapeCode}[${col}G`); };

const _escape = code => `${escapeCode}[${code}m`;

const bright = colour => `${colour};1`;

const extColour = index => `38;5;${index}`;

const print = (text, escapes) => {
  if(escapes){
    for(escape of escapes){
      process.stdout.write(_escape(escape));
    }
  }

  process.stdout.write(text);

  if(escapes){
    process.stdout.write(_escape(reset));
  }
};

const println = (text, colour) => {
  print(text, colour);
  process.stdout.write("\n");
};

const printAt = (x,y,text,colour) => {
  process.stdout.write(`${escapeCode}[${x};${y}H`);
  print(text, colour);
};

const clear = () => {
  process.stdout.write(`${escapeCode}[2J`);
};

const size = () => {
  return {
    cols: process.stdout.columns,
    rows: process.stdout.rows
  };
};

const normalScreen = () => {
  process.stdout.write(`${escapeCode}[?47l${escapeCode}8`);
};

const alternateScreen = () => {
  process.stdout.write(`${escapeCode}7${escapeCode}[?47h`);
};

const hideCursor = () => {
  process.stdout.write(`${escapeCode}[?25l`);
};

const showCursor = () => {
  process.stdout.write(`${escapeCode}[?25h`);
};

let EventLoop = require('./eventLoop.js');
let loop = new EventLoop();

module.exports = { 
  showCursor, 
  hideCursor, 
  alternateScreen, 
  normalScreen, 
  size, 
  clear, 
  print, 
  printAt, 
  println, 
  column, 
  bright, 
  extColour, 
  colours, 
  backgrounds 
};

