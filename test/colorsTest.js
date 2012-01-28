/*============================================================================
 * Copyright(c) 2010 Mario L Gutierrez <mario@mgutz.com>
 * MIT Licensed
 *==========================================================================*/

var Colors = require('../lib/colors');
var color = Colors.color;


var colors =
  ['black',  'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];
var bgColors =
  ['', ':black',  ':red', ':green', ':yellow', ':blue', ':magenta', ':cyan', ':white'];


function pad(s, length) {
  while (s.length < length) {
    s += ' ';
  }
  return s;
}


function padColor(s, styles) {
  var buffer = "";
  for (var i = 0; i < styles.length; i++) {
    buffer += color(pad(s + styles[i], 20), s + styles[i]);
  }
  return buffer;
}

function run() {
  var attr, s, s2, bg;
  for (var b = 0; b < bgColors.length; b++) {
    for (var c = 0; c < colors.length; c++) {
      fg = colors[c];
      bg = bgColors[b];
      console.log(padColor(fg, [''+bg, '+b'+bg, '+bh'+bg, '+u'+bg, '+uh'+bg]));
      console.log(padColor(fg, [''+bg+'+h', '+b'+bg+'+h', '+bh'+bg+'+h', '+u'+bg+'+h', '+uh'+bg+'+h']));
    }
    // only need 1 pass to see if plain option is working
    if (Colors.plain) return;
  }
}

console.log("Color.fn");
console.log("===============================================================================");
var redBold = Colors.fn('red+b:white');
console.log(redBold('testing color function, should be red bold on white'));

console.log("\nColors.plain == true");
console.log("===============================================================================");
Colors.plain = true;
run();

console.log("\nColors");
console.log("===============================================================================");
Colors.plain = false;
run();
