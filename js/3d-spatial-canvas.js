// 3d-spatial-canvas.js
// Multiple Canvases Demo - p5.js Instance Mode
// Author: Sara Lin

// NYC Historic Districts Colors
const colors = {
  manhattanTeal: '#4ECDC4',
  brooklynRed: '#FF6B6B',
  bronxBlue: '#45B7D1',
  queensGreen: '#96CEB4',
  statenIslandYellow: '#FFEAA7',
  defaultGray: '#CCCCCC'
};

// Function for first canvas
function sketch1(p) {
  p.setup = function () {
    const canvas = p.createCanvas(350, 200);
    canvas.parent('canvas-container-3');
    canvas.style('display', 'inline-block');
    canvas.style('margin-right', '10px');
    p.background(0);
  };
  p.draw = function () {
    p.background(0);
    p.noStroke();
    
    // Circle (Manhattan Teal)
    p.fill(colors.manhattanTeal);
    p.circle(p.mouseX, p.mouseY, 50);
    
    // Triangle (Brooklyn Red)
    p.push();
    p.translate(p.mouseX + 100, p.mouseY);
    p.rotate(p.frameCount * 0.02);
    p.fill(colors.brooklynRed);
    p.triangle(0, -25, -25, 25, 25, 25);
    p.pop();
    
    // Ellipse (Bronx Blue)
    p.fill(colors.bronxBlue);
    p.ellipse(p.mouseX - 100, p.mouseY, 60, 40);
    
    // Rectangle (Queens Green)
    p.fill(colors.queensGreen);
    p.rect(p.mouseX - 50, p.mouseY + 60, 40, 30);
    
    // Small circles (Staten Island Yellow)
    p.fill(colors.statenIslandYellow);
    p.circle(p.mouseX + 150, p.mouseY - 50, 20);
    p.circle(p.mouseX - 150, p.mouseY + 50, 15);
  };
}

// Function for second canvas
function sketch2(p) {
  p.setup = function () {
    const canvas = p.createCanvas(350, 200);
    canvas.parent('canvas-container-3');
    canvas.style('display', 'inline-block');
    p.background(255);
  };
  p.draw = function () {
    p.background(255);
    p.strokeWeight(2);
    
    // Square (Manhattan Teal)
    p.fill(colors.manhattanTeal);
    p.stroke(255);
    p.square(p.mouseX, p.mouseY, 50);
    
    // Rectangle (Brooklyn Red)
    p.fill(colors.brooklynRed);
    p.stroke(0);
    p.rect(p.mouseX + 80, p.mouseY - 30, 60, 40);
    
    // Triangle (Bronx Blue)
    p.push();
    p.translate(p.mouseX - 80, p.mouseY);
    p.rotate(p.frameCount * -0.03);
    p.fill(colors.bronxBlue);
    p.stroke(255);
    p.triangle(0, -20, -20, 20, 20, 20);
    p.pop();
    
    // Line (Queens Green)
    p.stroke(colors.queensGreen);
    p.strokeWeight(3);
    p.line(p.mouseX - 120, p.mouseY - 50, p.mouseX - 120, p.mouseY + 50);
    
    // Ellipse (Staten Island Yellow)
    p.fill(colors.statenIslandYellow);
    p.stroke(0);
    p.ellipse(p.mouseX + 150, p.mouseY + 60, 30, 20);
    
    // Small squares (Default Gray)
    p.fill(colors.defaultGray);
    p.stroke(0);
    p.square(p.mouseX - 150, p.mouseY - 40, 15);
    p.square(p.mouseX - 150, p.mouseY + 40, 15);
  };
}

// Run both p5 instances
new p5(sketch1);
new p5(sketch2); 