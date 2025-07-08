// 3d-orbit-camera.js
// p5.js WEBGL Cylinder & Torus Demo
// Author: Sara Lin
// Description: A white cylinder and a pink torus. Click and drag to orbit.

var sketch3DOrbit = function(p) {
  p.setup = function() {
    let c = p.createCanvas(400, 400, p.WEBGL);
    c.parent('3d-orbit-camera');
    p.describe('A white cylinder and a pink torus.');
  };

  p.draw = function() {
    p.background(200);
    p.orbitControl();
    p.noStroke();
    // Draw white cylinder in the center
    p.push();
    p.fill(255);
    p.cylinder(30, 50, 5);
    p.pop();
    // Draw pink torus offset to the right
    p.push();
    p.fill('#F7AFAF');
    p.translate(100, 0, 0);
    p.torus(60, 20);
    p.pop();
  };
};

new p5(sketch3DOrbit, '3d-orbit-camera'); 