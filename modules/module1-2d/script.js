// Module 1: 2D Drawing & Animation Script
// Combines organic grid, bouncing ball, and zoom-pan functionality

// Global variables
let currentSketch = 'organic-grid';
let sketches = {};

// Initialize all sketches
function initSketches() {
  // Organic Grid Sketch
  sketches['organic-grid'] = new p5(function(p) {
    let gridSize = 20;
    let noiseOffset = 0;
    
    p.setup = function() {
      let canvas = p.createCanvas(800, 400);
      canvas.parent('organic-grid');
      p.background(255);
    };
    
    p.draw = function() {
      p.background(255);
      p.stroke(0);
      p.strokeWeight(1);
      p.noFill();
      
      for (let x = 0; x < p.width; x += gridSize) {
        for (let y = 0; y < p.height; y += gridSize) {
          let noiseVal = p.noise(x * 0.01, y * 0.01, noiseOffset);
          let size = p.map(noiseVal, 0, 1, 5, 15);
          
          p.push();
          p.translate(x, y);
          p.rotate(noiseVal * p.TWO_PI);
          p.ellipse(0, 0, size, size);
          p.pop();
        }
      }
      
      noiseOffset += 0.01;
    };
    
    p.mouseMoved = function() {
      gridSize = p.map(p.mouseX, 0, p.width, 10, 40);
    };
  });
  
  // Bouncing Ball Sketch
  sketches['bouncing-ball'] = new p5(function(p) {
    let ball = {
      x: 400,
      y: 200,
      vx: 3,
      vy: 2,
      radius: 20
    };
    
    p.setup = function() {
      let canvas = p.createCanvas(800, 400);
      canvas.parent('bouncing-ball');
      p.background(255);
    };
    
    p.draw = function() {
      p.background(255);
      
      // Update ball position
      ball.x += ball.vx;
      ball.y += ball.vy;
      
      // Bounce off walls
      if (ball.x + ball.radius > p.width || ball.x - ball.radius < 0) {
        ball.vx *= -1;
      }
      if (ball.y + ball.radius > p.height || ball.y - ball.radius < 0) {
        ball.vy *= -1;
      }
      
      // Draw ball
      p.fill(0);
      p.noStroke();
      p.ellipse(ball.x, ball.y, ball.radius * 2);
      
      // Add gravity
      ball.vy += 0.1;
    };
    
    p.mousePressed = function() {
      // Click to reset ball
      ball.x = p.mouseX;
      ball.y = p.mouseY;
      ball.vx = p.random(-5, 5);
      ball.vy = p.random(-5, 5);
    };
  });
  
  // Zoom & Pan Sketch
  sketches['zoom-pan'] = new p5(function(p) {
    let zoom = 1;
    let panX = 0;
    let panY = 0;
    let isDragging = false;
    let lastMouseX, lastMouseY;
    
    p.setup = function() {
      let canvas = p.createCanvas(800, 400);
      canvas.parent('zoom-pan');
      p.background(255);
    };
    
    p.draw = function() {
      p.background(255);
      p.push();
      p.translate(panX, panY);
      p.scale(zoom);
      
      // Draw grid
      p.stroke(200);
      p.strokeWeight(1);
      for (let x = -1000; x < 1000; x += 50) {
        p.line(x, -1000, x, 1000);
      }
      for (let y = -1000; y < 1000; y += 50) {
        p.line(-1000, y, 1000, y);
      }
      
      // Draw shapes
      p.fill(0);
      p.noStroke();
      for (let i = 0; i < 20; i++) {
        let x = p.sin(p.frameCount * 0.01 + i) * 200;
        let y = p.cos(p.frameCount * 0.01 + i) * 200;
        p.ellipse(x, y, 20, 20);
      }
      
      p.pop();
    };
    
    p.mouseWheel = function(event) {
      let zoomFactor = event.delta > 0 ? 1.1 : 0.9;
      zoom *= zoomFactor;
      zoom = p.constrain(zoom, 0.1, 5);
    };
    
    p.mousePressed = function() {
      isDragging = true;
      lastMouseX = p.mouseX;
      lastMouseY = p.mouseY;
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
  });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
  initSketches();
}); 