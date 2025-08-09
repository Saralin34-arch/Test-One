// Module 2: 3D Spatial Design Script
// Combines orbit controls, primitive geometry, lighting, and spatial canvas

// Global variables
let sketches = {};

// Initialize all sketches
function initSketches() {
  // Orbit Controls Sketch
  sketches['orbit-controls'] = new p5(function(p) {
    let angle = 0;
    let distance = 200;
    
    p.setup = function() {
      let canvas = p.createCanvas(800, 400, p.WEBGL);
      canvas.parent('orbit-controls');
    };
    
    p.draw = function() {
      p.background(255);
      p.push();
      
      // Orbit camera
      let x = p.sin(angle) * distance;
      let z = p.cos(angle) * distance;
      p.camera(x, 0, z, 0, 0, 0, 0, 1, 0);
      
      // Draw scene
      p.stroke(0);
      p.noFill();
      
      // Grid
      for (let i = -5; i <= 5; i++) {
        p.line(i * 50, 0, -250, i * 50, 0, 250);
        p.line(-250, 0, i * 50, 250, 0, i * 50);
      }
      
      // Objects
      p.push();
      p.translate(0, 0, 0);
      p.box(50);
      p.pop();
      
      p.push();
      p.translate(100, 0, 0);
      p.sphere(25);
      p.pop();
      
      p.push();
      p.translate(-100, 0, 0);
      p.cylinder(25, 50);
      p.pop();
      
      p.pop();
      
      angle += 0.01;
    };
    
    p.mouseDragged = function() {
      angle += p.mouseX - p.pmouseX;
      distance = p.constrain(distance + (p.mouseY - p.pmouseY), 50, 400);
    };
  });
  
  // Primitive Geometry Sketch
  sketches['primitive-geometry'] = new p5(function(p) {
    let rotationX = 0;
    let rotationY = 0;
    
    p.setup = function() {
      let canvas = p.createCanvas(800, 400, p.WEBGL);
      canvas.parent('primitive-geometry');
    };
    
    p.draw = function() {
      p.background(255);
      p.push();
      
      p.rotateX(rotationX);
      p.rotateY(rotationY);
      
      // Draw various primitives
      p.stroke(0);
      p.noFill();
      
      // Cube
      p.push();
      p.translate(-150, 0, 0);
      p.box(60);
      p.pop();
      
      // Sphere
      p.push();
      p.translate(-50, 0, 0);
      p.sphere(30);
      p.pop();
      
      // Cylinder
      p.push();
      p.translate(50, 0, 0);
      p.cylinder(30, 60);
      p.pop();
      
      // Cone
      p.push();
      p.translate(150, 0, 0);
      p.cone(30, 60);
      p.pop();
      
      p.pop();
      
      rotationX += 0.01;
      rotationY += 0.02;
    };
    
    p.mouseDragged = function() {
      rotationX += (p.mouseY - p.pmouseY) * 0.01;
      rotationY += (p.mouseX - p.pmouseX) * 0.01;
    };
  });
  
  // Lighting & Materials Sketch
  sketches['lighting-materials'] = new p5(function(p) {
    let angle = 0;
    
    p.setup = function() {
      let canvas = p.createCanvas(800, 400, p.WEBGL);
      canvas.parent('lighting-materials');
    };
    
    p.draw = function() {
      p.background(255);
      
      // Lighting
      p.ambientLight(60);
      p.directionalLight(255, 255, 255, 0, 1, -1);
      p.pointLight(255, 255, 255, p.sin(angle) * 200, 0, p.cos(angle) * 200);
      
      p.push();
      p.rotateY(angle);
      
      // Materials
      p.push();
      p.translate(-150, 0, 0);
      p.specularMaterial(250);
      p.sphere(40);
      p.pop();
      
      p.push();
      p.translate(0, 0, 0);
      p.normalMaterial();
      p.box(80);
      p.pop();
      
      p.push();
      p.translate(150, 0, 0);
      p.ambientMaterial(255, 0, 0);
      p.cylinder(40, 80);
      p.pop();
      
      p.pop();
      
      angle += 0.02;
    };
  });
  
  // Spatial Canvas Sketch
  sketches['spatial-canvas'] = new p5(function(p) {
    let particles = [];
    let angle = 0;
    
    p.setup = function() {
      let canvas = p.createCanvas(800, 400, p.WEBGL);
      canvas.parent('spatial-canvas');
      
      // Create particles
      for (let i = 0; i < 100; i++) {
        particles.push({
          x: p.random(-200, 200),
          y: p.random(-200, 200),
          z: p.random(-200, 200),
          size: p.random(2, 8),
          speed: p.random(0.01, 0.05)
        });
      }
    };
    
    p.draw = function() {
      p.background(255);
      p.push();
      
      p.rotateY(angle);
      
      // Draw particles
      p.stroke(0);
      p.noFill();
      
      for (let particle of particles) {
        p.push();
        p.translate(particle.x, particle.y, particle.z);
        p.sphere(particle.size);
        p.pop();
        
        // Animate particles
        particle.z += particle.speed;
        if (particle.z > 200) {
          particle.z = -200;
        }
      }
      
      p.pop();
      
      angle += 0.005;
    };
  });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
  initSketches();
}); 