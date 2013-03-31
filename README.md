## Install

    npm install mgutz-colors

## Using

General usage

    var color = require("mgutz-colors").color;
    console.log(color("red on black", "red:black"));

Style format is `color+attributes:backgroundColor+attributes`

    "red"            // red
    "red+b"          // red bold
    "red+u"          // red underline
    "red+bh"         // red bold high-intensity
    "red:white"      // red on white
    "red+b:white+h"  // red bold on white high-intensity

    colors: black, white, red, yellow, green, cyan, blue, magenta

    attributes: b=bold, h=high intensity, u=underline

Flexible way to require

    var colors = require("mgutz-colors"),
        color = colors.color;

Be lazy and define color functions

    var bc = colors.fn("black:cyan");
    console.log(bc("this is black text on cyan"));

Turn off colors easily

    colors.plain = true;
    console.log(bc("this is plain now"));

Get color code of high intensity red on black background

    // use ansi escape sequences directly for speed (like logging)
    var redOnBlack = colors.ansi('red+h:black')
    console.log(redOnBlack + message + colors.reset);


Output all color combinations in terminal

    npm test

## License

(The MIT License)

Copyright (c) 2012 Mario Gutierrez <mario@mgutz.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
