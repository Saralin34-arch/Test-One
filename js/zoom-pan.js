// zoom-pan.js
// Zoom and Pan Interactive Canvas - p5.js Instance Mode
// Author: Sara Lin

var sketchZoomPan = function(p) {
  let zoom = 1;
  let panX = 0;
  let panY = 0;
  let isDragging = false;
  let lastMouseX, lastMouseY;

  p.setup = function() {
    // Get container dimensions
    const container = document.getElementById('canvas-container-3');
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    
    // Create canvas that fits the container
    const canvas = p.createCanvas(containerWidth, containerHeight);
    canvas.parent('canvas-container-3');
    
    p.angleMode(p.DEGREES);
    p.background('#FFFFFF');
    
    // Scale factor based on container size
    const scaleFactor = Math.min(containerWidth, containerHeight) / 700;
    
    // Draw the organic composition with scaling
    drawOrganicComposition(scaleFactor);
  };

  p.draw = function() {
    p.background('#FFFFFF');
    
    p.push();
    p.translate(panX, panY);
    p.scale(zoom);
    
    // Redraw the composition
    const scaleFactor = Math.min(p.width, p.height) / 700;
    drawOrganicComposition(scaleFactor);
    
    p.pop();
    
    // Draw zoom indicator
    p.fill(0);
    p.noStroke();
    p.textSize(16);
    p.text(`Zoom: ${zoom.toFixed(2)}x`, 10, 30);
  };

  p.mousePressed = function() {
    if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
      isDragging = true;
      lastMouseX = p.mouseX;
      lastMouseY = p.mouseY;
    }
  };

  p.mouseReleased = function() {
    isDragging = false;
  };

  p.mouseDragged = function() {
    if (isDragging) {
      panX += p.mouseX - lastMouseX;
      panY += p.mouseY - lastMouseY;
      lastMouseX = p.mouseX;
      lastMouseY = p.mouseY;
    }
  };

  p.mouseWheel = function(event) {
    const zoomFactor = 0.1;
    const newZoom = zoom + (event.delta > 0 ? zoomFactor : -zoomFactor);
    zoom = p.constrain(newZoom, 0.1, 5);
  };

  function drawOrganicComposition(scaleFactor) {
    p.noStroke();
    
    // Top left quarter-circle (peach)
    p.fill('#F4C7B6');
    p.arc(120 * scaleFactor, 120 * scaleFactor, 220 * scaleFactor, 220 * scaleFactor, 180, 270, p.PIE);
    
    // Top right quarter-circle (lavender)
    p.fill('#D6C5EB');
    p.arc(530 * scaleFactor, 100 * scaleFactor, 180 * scaleFactor, 180 * scaleFactor, 270, 0, p.PIE);
    
    // Large orange rounded drop
    p.fill('#F26B2B');
    drawBlobbyDrop(300 * scaleFactor, 200 * scaleFactor, 170 * scaleFactor);
    
    // Yellow pill
    p.fill('#F7D850');
    drawBlobbyPill(100 * scaleFactor, 400 * scaleFactor, 220 * scaleFactor);
    
    // Green almond-shaped leaf
    p.fill('#B7DDA8');
    drawBlobbyLeaf(330 * scaleFactor, 650 * scaleFactor, 180 * scaleFactor);
    
    // Clover
    p.fill('#F7AFAF');
    drawClover(200 * scaleFactor, 600 * scaleFactor, 120 * scaleFactor);
    
    // Arch
    p.fill('#FF6B1C');
    drawArch(600 * scaleFactor, 600 * scaleFactor, 80 * scaleFactor, 100 * scaleFactor);
    
    // Cloud
    p.fill('#F9D6B7');
    drawCloud(500 * scaleFactor, 400 * scaleFactor, 80 * scaleFactor, 50 * scaleFactor);
    
    // Diamond
    p.fill('#FFE08A');
    drawDiamond(600 * scaleFactor, 120 * scaleFactor, 60 * scaleFactor);
    
    // Blue square with unique corner radii
    p.fill('#8FB4D9');
    p.noStroke();
    p.square(320 * scaleFactor, 470 * scaleFactor, 120 * scaleFactor, 20 * scaleFactor, 15 * scaleFactor, 10 * scaleFactor, 5 * scaleFactor);
    
    // 67 degree thick line
    p.push();
    p.stroke('#8FB4D9');
    p.strokeWeight(8 * scaleFactor);
    p.noFill();
    p.translate(350 * scaleFactor, 60 * scaleFactor);
    p.rotate(157);
    p.line(-160 * scaleFactor, 0, 240 * scaleFactor, 0);
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