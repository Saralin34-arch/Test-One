// 3d-primitives-canvas.js
// p5.js WEBGL Torus & Cylinder Demo - Color Matched to 2D Drawing
// Author: Sara Lin
// Description: Multiple colored toruses and a white cylinder. Click and drag to orbit.

var sketch3DPrimitives = function(p) {
  let colors = ['#F7AFAF', '#8FB4D9', '#F7D850', '#F26B2B'];
  let positions = [
    [-100, 0, 0], // pink
    [100, 0, 0],  // blue
    [0, -100, 0], // yellow
    [0, 100, 0]   // orange
  ];
  let radii = [60, 60, 60, 60];
  let tubes = [20, 20, 20, 20];

  p.setup = function() {
    let c = p.createCanvas(400, 400, p.WEBGL);
    c.parent('3d-primitives-canvas');
    p.describe('Multiple colored toruses and a white cylinder.');
  };

  p.draw = function() {
    p.background(200);
    p.orbitControl();
    p.noStroke();
    // Draw colored toruses
    for (let i = 0; i < colors.length; i++) {
      p.push();
      p.fill(colors[i]);
      p.translate(positions[i][0], positions[i][1], positions[i][2]);
      p.torus(radii[i], tubes[i]);
      p.pop();
    }
    // Draw white cylinder in the center
    p.push();
    p.fill(255);
    p.cylinder(30, 50, 5);
    p.pop();
  };
};

new p5(sketch3DPrimitives, '3d-primitives-canvas'); 