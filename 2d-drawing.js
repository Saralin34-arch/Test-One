// 2d-drawing.js
// Organic Grid Composition Demo - p5.js Instance Mode
// Author: Sara Lin

var sketch1 = function(p) {
  p.setup = function() {
    p.createCanvas(700, 700);
    p.noLoop();
    p.angleMode(p.DEGREES);
    p.background('#FFFFFF'); // pure white background

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
    drawBlobbyPill(100, 320, 150);

    // Giant blue half-ellipse (scaled up 5x)
    p.fill('#8FB4D9');
    drawBlobbyDroplet(350, 500, 140 * 5);

    // Green almond-shaped leaf
    p.fill('#B7DDA8');
    drawBlobbyLeaf(330, 570, 180);

    // --- ICON GEOMETRIES ---
    // Peanut (Friendly) - filled, much wider
    p.fill('#FFB84C');
    drawPeanut(540, 220, 180, 100); // 3x wider
    // Peanut (Friendly) - outline only, much wider
    p.noFill();
    p.stroke('#FFB84C');
    p.strokeWeight(8);
    drawPeanut(540, 320, 180, 100); // 3x wider, outline
    p.noStroke();
    p.fill('#F7AFAF');
    drawClover(200, 600, 120);
    p.fill('#FF6B1C');
    drawArch(600, 600, 80, 100);
    p.fill('#F9D6B7');
    drawCloud(500, 400, 80, 50);
    p.fill('#FFE08A');
    drawDiamond(600, 120, 60);
    // Blue half ellipse (smaller)
    p.fill('#8FB4D9');
    drawHalfEllipse(350, 500, 120, 60);
    // Circle (Bouncing Ball)
    p.fill('#C75B12');
    p.ellipse(350, 350, 60, 60);

    // --- 67 degree thick line (moved to upper right corner) ---
    p.push();
    p.stroke('#8FB4D9');
    p.strokeWeight(18);
    p.noFill();
    p.translate(600, 100); // move to upper right
    p.rotate(67);
    p.line(-80, 0, 120, 0);
    p.pop();
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

  // Peanut shape (two ellipses)
  function drawPeanut(x, y, w, h) {
    p.ellipse(x - w * 0.3, y, w * 0.6, h);
    p.ellipse(x + w * 0.3, y, w * 0.6, h);
  }

  // Clover shape (four circles)
  function drawClover(x, y, r) {
    for (let a = 0; a < 360; a += 90) {
      let px = x + p.cos(a) * r * 0.7;
      let py = y + p.sin(a) * r * 0.7;
      p.ellipse(px, py, r, r);
    }
  }

  // Arch shape
  function drawArch(x, y, w, h) {
    p.arc(x, y, w, h, 180, 0, p.OPEN);
    p.rect(x - w / 2, y, w, h / 2);
  }

  // Cloud shape (two ellipses)
  function drawCloud(x, y, w, h) {
    p.ellipse(x - w * 0.3, y, w, h);
    p.ellipse(x + w * 0.3, y, w, h);
  }

  // Diamond shape
  function drawDiamond(x, y, s) {
    p.beginShape();
    p.vertex(x, y - s / 2);
    p.vertex(x + s / 2, y);
    p.vertex(x, y + s / 2);
    p.vertex(x - s / 2, y);
    p.endShape(p.CLOSE);
  }

  // Half ellipse shape (top half)
  function drawHalfEllipse(x, y, w, h) {
    p.beginShape();
    for (let a = 180; a <= 360; a += 5) {
      let px = x + p.cos(a) * w / 2;
      let py = y + p.sin(a) * h / 2;
      p.vertex(px, py);
    }
    p.vertex(x, y);
    p.endShape(p.CLOSE);
  }
};

var myp5_1 = new p5(sketch1, 'canvas-container-1'); 