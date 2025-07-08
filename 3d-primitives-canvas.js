// 3d-primitives-canvas.js
// p5.js WEBGL Octahedron + Particle System Demo
// Author: Sara Lin
// Description: A spinning blue octahedron and a 3D particle system with a Reset button.

var sketch3DPrimitives = function(p) {
  let palette = ['#F7AFAF', '#8FB4D9', '#F7D850', '#F26B2B', '#F4C7B6'];
  let button;
  let particles = [];

  p.setup = function() {
    let c = p.createCanvas(400, 400, p.WEBGL);
    c.parent('3d-primitives-canvas');
    p.describe('A spinning blue octahedron and a 3D particle system.');
    button = p.createButton('Reset');
    button.parent('3d-primitives-canvas');
    button.position(10, 10);
    button.style('z-index', '10');
    button.mousePressed(resetModel);
    resetModel();
  };

  p.draw = function() {
    p.background(50);
    p.orbitControl();
    p.lights();
    p.noStroke();
    // Draw spinning blue octahedron at the center
    p.push();
    p.fill('#8FB4D9');
    p.rotateX(p.frameCount * 0.01);
    p.rotateY(p.frameCount * 0.01);
    drawOctahedron(p);
    p.pop();
    // Draw particles
    for (let i = 0; i < particles.length; i++) {
      p.push();
      p.fill(particles[i][3]);
      p.translate(particles[i][0], particles[i][1], particles[i][2]);
      p.sphere(5);
      p.pop();
    }
  };

  function resetModel() {
    particles = [];
    for (let i = 0; i < 60; i++) {
      let x = p.randomGaussian(0, 20);
      let y = p.randomGaussian(0, 20);
      let z = p.randomGaussian(0, 20);
      let c = palette[Math.floor(p.random(palette.length))];
      particles.push([x, y, z, c]);
    }
  }
};

new p5(sketch3DPrimitives, '3d-primitives-canvas');

// Draw an octahedron using vertex and face data
function drawOctahedron(p) {
  // Vertices
  const v = [
    [0, 0, 40],
    [22.5, 22.5, 0],
    [22.5, -22.5, 0],
    [-22.5, -22.5, 0],
    [-22.5, 22.5, 0],
    [0, 0, -40]
  ];
  // Faces (indices are 0-based)
  const faces = [
    [0, 1, 2],
    [0, 2, 3],
    [0, 3, 4],
    [0, 4, 1],
    [5, 4, 3],
    [5, 3, 2],
    [5, 2, 1],
    [5, 1, 4]
  ];
  p.beginShape(p.TRIANGLES);
  for (let f of faces) {
    for (let idx of f) {
      p.vertex(v[idx][0], v[idx][1], v[idx][2]);
    }
  }
  p.endShape();
} 