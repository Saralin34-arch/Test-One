// 2d-drawing.js
// 2D Drawing Sketch - p5.js Instance Mode
// Author: Sara Lin
// Description: Draws a grid and geometric primitives in a dedicated canvas container.

// --- Configuration ---
var sketch1 = function(p) {
  // All variables are scoped to this instance
  var canvasWidth = 800;
  var canvasHeight = 400;
  var gridSpacing = 40;
  var canvas;

  // --- Setup ---
  p.setup = function() {
    canvas = p.createCanvas(canvasWidth, canvasHeight);
    canvas.parent('canvas-container-1');
  };

  // --- Main Draw Loop ---
  p.draw = function() {
    p.background(250);
    drawGrid();
    drawPrimitives();
  };

  // --- Helper Functions ---
  function drawGrid() {
    p.stroke(200);
    p.strokeWeight(1);
    for (var x = 0; x <= p.width; x += gridSpacing) {
      p.line(x, 0, x, p.height);
    }
    for (var y = 0; y <= p.height; y += gridSpacing) {
      p.line(0, y, p.width, y);
    }
  }

  function drawPrimitives() {
    // Rectangle
    p.fill(255, 100, 100);
    p.rect(120, 80, 100, 60);
    // Ellipse
    p.fill(100, 180, 255);
    p.ellipse(350, 200, 90, 90);
    // Line
    p.stroke(80, 200, 120);
    p.strokeWeight(4);
    p.line(500, 100, 700, 300);
    // Triangle
    p.noStroke();
    p.fill(255, 220, 80);
    p.triangle(600, 80, 750, 60, 700, 200);
  }
};

// --- Create the p5 Instance ---
var myp5_1 = new p5(sketch1, 'canvas-container-1'); 