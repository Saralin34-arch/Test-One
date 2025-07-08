// 3d-primitive-demo.js
// Click and drag the mouse to view the scene from different angles.
// Author: Sara Lin

function setup() {
  let c = createCanvas(300, 300, WEBGL);
  c.parent('3d-primitive-canvas');
  describe('A white cylinder on a gray background.');
}

function draw() {
  background(200);
  // Enable orbiting with the mouse.
  orbitControl();
  // Draw the cylinder.
  // Set its radius to 30 and height to 50.
  // Set its detailX to 24 and detailY to 2.
  cylinder(30, 50, 24, 2);
} 