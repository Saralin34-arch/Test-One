// 3d-primitive-demo.js
// Click and drag the mouse to view the scene from different angles.
// Author: Sara Lin

function setup() {
  let c = createCanvas(300, 300, WEBGL);
  c.parent('3d-primitive-canvas');
  describe('A green cylinder on a gray background. Its top and bottom are missing.');
}

function draw() {
  background(200); // gray background
  orbitControl();
  // Draw the cylinder with green color matching previous palette
  normalMaterial();
  ambientLight(150);
  directionalLight(180, 255, 180, 0.5, 1, -1); // soft greenish light
  push();
  fill('#B7DDA8'); // green matching previous tone
  noStroke();
  cylinder(30, 50, 24, 1, false, false);
  pop();
} 