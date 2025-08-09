// 3d-primitive-demo.js
// Orbit Control Demo - p5.js Instance Mode
// Author: Sara Lin

var sketch3DPrimitive = function(p) {
  p.setup = function() {
    // Create canvas with the exact dimensions from the provided code
    const canvas = p.createCanvas(710, 400, p.WEBGL);
    canvas.parent('canvas-container-1');
    
    p.angleMode(p.DEGREES);
    p.strokeWeight(5);
    p.noFill();
    p.stroke('#4ECDC4'); // Manhattan Teal from NYC Historic Districts color palette
    
    p.describe('Users can click on the screen and drag to adjust their perspective in 3D space. The space contains a sphere of Manhattan Teal cubes on a light gray background.');
  };

  p.draw = function() {
    p.background('#F8F8F8');

    // Call every frame to adjust camera based on mouse/touch
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

// Initialize the sketch
new p5(sketch3DPrimitive); 