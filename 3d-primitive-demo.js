// 3d-primitive-demo.js
// Click and drag the mouse to view the scene from different angles.
// Author: Sara Lin

function setup() {
  let c = createCanvas(300, 300, WEBGL);
  c.parent('3d-primitive-canvas');
  describe('A white cylinder with a figure inside on a gray background.');
}

function draw() {
  background(200);
  // Enable orbiting with the mouse.
  orbitControl();
  
  // Draw large gray bounding box that fills the canvas
  push();
  fill(180); // Light gray
  noStroke();
  translate(0, 0, -150); // Move back to create background
  box(300, 300, 1); // Large flat box covering the canvas
  pop();
  
  // Draw the main cylinder.
  // Set its radius to 30 and height to 50.
  // Set its detailX to 24 and detailY to 2.
  push();
  fill(255);
  noStroke();
  cylinder(30, 50, 24, 2);
  pop();
  
  // Draw a smaller figure inside the cylinder
  push();
  translate(0, 0, 5); // Move slightly forward
  fill('#F26B2B'); // Orange color matching 2D palette
  noStroke();
  sphere(8); // Small sphere inside
  pop();
  
  // Add another small figure
  push();
  translate(0, 0, -5); // Move slightly back
  fill('#B7DDA8'); // Green color matching 2D palette
  noStroke();
  box(6); // Small box inside
  pop();
} 