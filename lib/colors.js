/*============================================================================
 * Copyright(c) 2012 Mario L Gutierrez <mario@mgutz.com>
 * MIT Licensed
 *==========================================================================*/

/* Whether to disable colors. */
exports.plain = false;


/**
 * Colorizes string. To disable colors, set `colors.plain = true`
 *
 * @param {String} style Style format.
 *
 * format:
 *   color+attributes:bgColor+attributes
 *
 * color:
 *   black
 *   red
 *   green
 *   yellow
 *   blue
 *   magenta
 *   cyan
 *   white
 *
 * attributes:
 *   b = bold
 *   h = high intensity
 *   u = underline
 *
 * @example
 *   color("...", "red")            -> red
 *   color("...", "red+b")          -> red bold
 *   color("...", "red+u")          -> red underline
 *   color("...", "red+bh")         -> red bold high-intensity
 *   color("...", "red:white")      -> red on white
 *   color("...", "red+b:white+h")  -> red bold on white high-intensity
 *
 */
var color = exports.color = function(s, style) {
  if (exports.plain || !style || style.length === 0) return s;

  var colors = {
    black: 0,
    red: 1,
    green: 2,
    yellow: 3,
    blue: 4,
    magenta: 5,
    cyan: 6,
    white: 7
  };

  var fgIntensity = {
    normal: 30,
    high: 90
  }

  var bgIntensity = {
    normal: 40,
    high: 100
  };

  var decoration = {
    bold: '1;',
    underline: '4;'
  };

  var foreground_background = style.split(':');
  var foreground = foreground_background[0].split('+');
  var fg = foreground[0];
  var fgStyle = foreground[1];

  var background = 0, bg = 0, bgStyle = '';
  if (foreground_background[1]) {
    background = foreground_background[1].split('+');
    bg = background[0];
    bgStyle = background[1];
  }

  var colored = '\033[';
  var base = fgIntensity.normal;

  if (fgStyle) {
    if (fgStyle.indexOf('b') >= 0) colored += decoration.bold;
    if (fgStyle.indexOf('u') >= 0) colored += decoration.underline;
    base = fgStyle.indexOf('h') >= 0 ? fgIntensity.high : fgIntensity.normal;
  }
  colored += (base + colors[fg]).toString() + ';';

  var base = 0;
  if (bg) {
    base = (bgStyle && bgStyle === 'h') ? bgIntensity.high : bgIntensity.normal;
    colored += (base + colors[bg]).toString() + ';';
  }

  colored = colored.slice(0, -1); // remove last ';'
  colored += 'm' + s
  colored += "\033[0m"; // reset colors

  return colored;
}


/**
 * Define a color function.
 *
 * @param {String} style The style format.
 */
exports.fn = function(style) {
  return function(s) {
    return color(s, style);
  }
}
