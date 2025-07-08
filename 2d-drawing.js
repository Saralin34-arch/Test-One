// 2d-drawing.js
// Organic Grid Composition Demo - p5.js Instance Mode
// Author: Sara Lin

var sketch1 = function(p) {
  p.setup = function() {
    p.createCanvas(700, 700);
    p.noLoop();
    p.angleMode(p.DEGREES);
    p.background('#FDF6F2');

    // Draw non-tilted grid
    drawStraightGrid();

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
    drawBlobbyPill(100, 380, 150);

    // Giant blue half-ellipse (scaled up 5x)
    p.fill('#8FB4D9');
    drawBlobbyDroplet(350, 500, 140 * 5);

    // Green almond-shaped leaf
    p.fill('#B7DDA8');
    drawBlobbyLeaf(330, 570, 180);
  };

  // 🟥 Non-tilted grid (horizontal + vertical lines)
  function drawStraightGrid() {
    p.stroke(200);
    p.strokeWeight(1);
    let gridSize = 40;
    for (let x = 0; x <= p.width; x += gridSize) {
      p.line(x, 0, x, p.height);
    }
    for (let y = 0; y <= p.height; y += gridSize) {
      p.line(0, y, p.width, y);
    }
  }

  // Orange drop shape with rounded bottom
  function drawBlobbyDrop(x, y, size) {
    p.beginShape();
    p.arc(x, y, size, size, 180, 0);
    p.bezierVertex(x + size * 0.5, y + size * 0.5, x - size * 0.5, y + size * 0.5, x - size * 0.5, y);
    p.endShape(p.CLOSE);
  }

  // Yellow rounded pill shape
  function drawBlobbyPill(x, y, size) {
    p.beginShape();
    p.arc(x, y, size, size, 90, 270);
    p.arc(x + size, y, size, size, 270, 90);
    p.endShape(p.CLOSE);
  }

  // Giant blue half-ellipse with rounded bottom
  function drawBlobbyDroplet(x, y, size) {
    p.beginShape();
    p.arc(x, y, size, size / 2, 180, 0); // top half ellipse
    p.bezierVertex(
      x + size * 0.4, y + size * 0.25,
      x - size * 0.4, y + size * 0.25,
      x - size / 2, y
    );
    p.endShape(p.CLOSE);
  }

  // Almond-shaped green leaf with full roundness
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
};

var myp5_1 = new p5(sketch1, 'canvas-container-1'); 