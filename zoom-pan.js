// zoom-pan.js
// Zoom Pan Sketch - p5.js Instance Mode
// Author: Sara Lin
// Description: Interactive version of the 2D drawing demo with zoom and pan.

var sketchZoomPan = function(p) {
  var canvasWidth = 700;
  var canvasHeight = 700;
  var gridSpacing = 40;
  var zoom = 1;
  var offsetX = 0;
  var offsetY = 0;
  var isDragging = false;
  var lastMouseX, lastMouseY;
  var canvas;

  p.setup = function() {
    canvas = p.createCanvas(canvasWidth, canvasHeight);
    canvas.parent('canvas-container-3');
    p.angleMode(p.DEGREES);
  };

  p.draw = function() {
    p.background('#FFFFFF');
    // Apply pan and zoom
    p.translate(p.width / 2 + offsetX, p.height / 2 + offsetY);
    p.scale(zoom);
    p.translate(-p.width / 2, -p.height / 2);
    drawStraightGrid();
    drawOrganicComposition();
  };

  p.mouseWheel = function(event) {
    if (canvas && canvas.elt.matches(':hover')) {
      var zoomFactor = 1.05;
      if (event.delta > 0) {
        zoom /= zoomFactor;
      } else {
        zoom *= zoomFactor;
      }
      zoom = p.constrain(zoom, 0.2, 5);
      return false;
    }
  };

  p.mousePressed = function() {
    if (canvas && canvas.elt.matches(':hover') && p.mouseButton === p.LEFT && p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
      isDragging = true;
      lastMouseX = p.mouseX;
      lastMouseY = p.mouseY;
    }
  };

  p.mouseDragged = function() {
    if (isDragging && canvas && canvas.elt.matches(':hover')) {
      offsetX += p.mouseX - lastMouseX;
      offsetY += p.mouseY - lastMouseY;
      lastMouseX = p.mouseX;
      lastMouseY = p.mouseY;
    }
  };

  p.mouseReleased = function() {
    isDragging = false;
  };

  // --- Helper Functions ---
  function drawStraightGrid() {
    p.stroke(200);
    p.strokeWeight(1);
    for (let x = 0; x <= p.width; x += gridSpacing) {
      p.line(x, 0, x, p.height);
    }
    for (let y = 0; y <= p.height; y += gridSpacing) {
      p.line(0, y, p.width, y);
    }
  }

  function drawOrganicComposition() {
    p.noStroke();
    // Top left quarter-circle (peach)
    p.fill('#F4C7B6');
    p.arc(120, 120, 220, 220, 180, 270, p.PIE);
    // Top right quarter-circle (lavender)
    p.fill('#D6C5EB');
    p.arc(530, 100, 180, 180, 270, 0, p.PIE);
    // Large orange rounded drop
    p.fill('#F26B2B');
    drawBlobbyDrop(300, 200, 170);
    // Yellow pill
    p.fill('#F7D850');
    drawBlobbyPill(100, 400, 220);
    // Green almond-shaped leaf
    p.fill('#B7DDA8');
    drawBlobbyLeaf(330, 650, 180);
    // Clover
    p.fill('#F7AFAF');
    drawClover(200, 600, 120);
    // Arch
    p.fill('#FF6B1C');
    drawArch(600, 600, 80, 100);
    // Cloud
    p.fill('#F9D6B7');
    drawCloud(500, 400, 80, 50);
    // Diamond
    p.fill('#FFE08A');
    drawDiamond(600, 120, 60);
    // Blue square with unique corner radii
    p.fill('#8FB4D9');
    p.noStroke();
    p.square(320, 470, 120, 20, 15, 10, 5);
    // 67 degree thick line (centered at middle top of canvas, thinner and longer)
    p.push();
    p.stroke('#8FB4D9');
    p.strokeWeight(8);
    p.noFill();
    p.translate(350, 60);
    p.rotate(157);
    p.line(-160, 0, 240, 0);
    p.pop();
  }

  // --- Shape Helpers (copied from 2d-drawing.js) ---
  function drawBlobbyDrop(x, y, size) {
    p.beginShape();
    p.arc(x, y, size, size, 180, 0);
    p.bezierVertex(x + size * 0.5, y + size * 0.5, x - size * 0.5, y + size * 0.5, x - size * 0.5, y);
    p.endShape(p.CLOSE);
  }
  function drawBlobbyPill(x, y, size) {
    p.beginShape();
    p.arc(x, y, size, size, 90, 270);
    p.arc(x + size, y, size, size, 270, 90);
    p.endShape(p.CLOSE);
  }
  function drawBlobbyLeaf(x, y, size) {
    p.beginShape();
    for (let a = 135; a <= 315; a += 5) {
      let px = x + p.cos(a) * size / 2;
      let py = y + p.sin(a) * size / 2;
      p.curveVertex(px, py);
    }
    for (let a = 315; a <= 495; a += 5) {
      let px = x + p.cos(a) * size / 2;
      let py = y + p.sin(a) * size / 2;
      p.curveVertex(px, py);
    }
    p.endShape(p.CLOSE);
  }
  function drawClover(x, y, r) {
    for (let i = 0; i < 4; i++) {
      let a = i * 90;
      let px = x + p.cos(a) * r * 0.7;
      let py = y + p.sin(a) * r * 0.7;
      if (i === 0) { px += 30; py -= 30; }
      if (i === 1) { px += 30; py -= 30; }
      p.ellipse(px, py, r, r);
    }
  }
  function drawArch(x, y, w, h) {
    p.arc(x, y, w, h, 180, 0, p.OPEN);
    p.rect(x - w / 2, y, w, h / 2);
  }
  function drawCloud(x, y, w, h) {
    p.ellipse(x - w * 0.3, y, w, h);
    p.ellipse(x + w * 0.3, y, w, h);
  }
  function drawDiamond(x, y, s) {
    p.beginShape();
    p.vertex(x, y - s / 2);
    p.vertex(x + s / 2, y);
    p.vertex(x, y + s / 2);
    p.vertex(x - s / 2, y);
    p.endShape(p.CLOSE);
  }
};

var myp5_3 = new p5(sketchZoomPan, 'canvas-container-3'); 