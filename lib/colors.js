/*============================================================================
 * Copyright(c) 2012 Mario L Gutierrez <mario@mgutz.com>
 * MIT Licensed
 *==========================================================================*/

/* Whether to disable colors. */
exports.plain = false;

var reset = exports.reset = "\033[0m"; // reset colors

function ansiCode(style) {
  if (exports.plain) return '';

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

  var code = '\033[';
  var base = fgIntensity.normal;

  if (fgStyle) {
    if (fgStyle.indexOf('b') >= 0) code += decoration.bold;
    if (fgStyle.indexOf('u') >= 0) code += decoration.underline;
    base = fgStyle.indexOf('h') >= 0 ? fgIntensity.high : fgIntensity.normal;
  }
  code += (base + colors[fg]).toString() + ';';

  var base = 0;
  if (bg) {
    base = (bgStyle && bgStyle === 'h') ? bgIntensity.high : bgIntensity.normal;
    code += (base + colors[bg]).toString() + ';';
  }

  code = code.slice(0, -1) + 'm'; // remove last ';'


  return code;
}
exports.ansi = ansiCode;

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
  if (exports.plain || !style) return s;
  return ansiCode(style) + s + reset;
};


/**
  Define a color function.
 *
 * @param {String} style The style format.
 */
exports.fn = function(style) {
  var ansi = ansiCode(style);
  return function(s) {
    if (exports.plain || !s) return s;
    return ansi + s + reset;
  }
};

