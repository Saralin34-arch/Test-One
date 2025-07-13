// 3d-orbit-control.js
// p5.js WEBGL Sphere of Blue Boxes Demo
// Author: Sara Lin
// Description: A sphere of blue boxes on a white background. Click and drag to orbit.

var sketch3DOrbit = function(p) {
  p.setup = function() {
    let c = p.createCanvas(710, 400, p.WEBGL);
    c.parent('3d-orbit-control');
    p.angleMode(p.DEGREES);
    p.strokeWeight(5);
    p.noFill();
    p.stroke('#8FB4D9');
    p.describe(
      'Users can click on the screen and drag to adjust their perspective in 3D space. The space contains a sphere of blue boxes on a white background.'
    );
  };

  p.draw = function() {
    p.background(255); // white background
    p.orbitControl();
    // Rotate rings in a half circle to create a sphere of cubes
    for (let zAngle = 0; zAngle < 180; zAngle += 30) {
      // Rotate cubes in a full circle to create a ring of cubes
      for (let xAngle = 0; xAngle < 360; xAngle += 30) {
        p.push();
        // Rotate from center of sphere
        p.rotateZ(zAngle);
        p.rotateX(xAngle);
        // Then translate down 400 units
        p.translate(0, 400, 0);
        p.box();
        p.pop();
      }
    }
  };
};

new p5(sketch3DOrbit, '3d-orbit-control'); 