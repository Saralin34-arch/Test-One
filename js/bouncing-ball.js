// bouncing-ball.js
// Bouncing Ball Sketch - p5.js Instance Mode
// Author: Sara Lin
// Description: Two bouncing balls with different colors and routes.

// --- Configuration ---
var sketch2 = function(p) {
  // Ball 1 (orange)
  var x1, y1, dx1, dy1, radius1 = 30;
  // Ball 2 (blue)
  var x2, y2, dx2, dy2, radius2 = 24;

  // --- Setup ---
  p.setup = function() {
    // Create the canvas and attach it to the container
    var canvas = p.createCanvas(800, 400);
    canvas.parent('canvas-container-2');

    // Ball 1: orange, diagonal route
    x1 = p.width / 4;
    y1 = p.height / 3;
    dx1 = 5;
    dy1 = 3;

    // Ball 2: blue, different route
    x2 = (3 * p.width) / 4;
    y2 = (2 * p.height) / 3;
    dx2 = -4;
    dy2 = -2.5;
  };

  // --- Main Draw Loop ---
  p.draw = function() {
    // Clear the background
    p.background(240);

    // Ball 1: pink
    p.fill('#F7AFAF');
    p.noStroke();
    p.ellipse(x1, y1, radius1 * 2);
    x1 += dx1;
    y1 += dy1;
    if (x1 - radius1 < 0 || x1 + radius1 > p.width) dx1 *= -1;
    if (y1 - radius1 < 0 || y1 + radius1 > p.height) dy1 *= -1;

    // Ball 2: blue outline
    p.noFill();
    p.stroke('#8FB4D9');
    p.strokeWeight(4);
    p.ellipse(x2, y2, radius2 * 2);
    p.noStroke();
    x2 += dx2;
    y2 += dy2;
    if (x2 - radius2 < 0 || x2 + radius2 > p.width) dx2 *= -1;
    if (y2 - radius2 < 0 || y2 + radius2 > p.height) dy2 *= -1;
  };
};

// --- Create the p5 Instance ---
var myp5_2 = new p5(sketch2, 'canvas-container-2'); 