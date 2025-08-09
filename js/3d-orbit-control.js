// 3d-orbit-control.js
// Enhanced 3D Orbit Control Demo - p5.js Instance Mode
// Author: Sara Lin

var sketch3DOrbit = function(p) {
  p.setup = function() {
    // Get container dimensions
    const container = document.getElementById('canvas-container-2');
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    
    // Create canvas that fits the container
    const canvas = p.createCanvas(containerWidth, containerHeight, p.WEBGL);
    canvas.parent('canvas-container-2');
    
    // Scale factor based on container size
    const scaleFactor = Math.min(containerWidth, containerHeight) / 400;
    
    // Create enhanced 3D objects with better materials
    p.objects = [
      { 
        type: 'sphere', 
        color: [255, 100, 100], 
        size: 35 * scaleFactor, 
        x: -80 * scaleFactor, 
        y: 0, 
        z: 0,
        material: 'glass',
        rotationSpeed: { x: 0.02, y: 0.015, z: 0.01 }
      },
      { 
        type: 'box', 
        color: [100, 150, 255], 
        size: 45 * scaleFactor, 
        x: 80 * scaleFactor, 
        y: 0, 
        z: 0,
        material: 'metal',
        rotationSpeed: { x: 0.015, y: 0.02, z: 0.008 }
      },
      { 
        type: 'cylinder', 
        color: [150, 255, 150], 
        size: 30 * scaleFactor, 
        x: 0, 
        y: -70 * scaleFactor, 
        z: 0,
        material: 'plastic',
        rotationSpeed: { x: 0.01, y: 0.025, z: 0.012 }
      },
      { 
        type: 'cone', 
        color: [255, 200, 100], 
        size: 40 * scaleFactor, 
        x: 0, 
        y: 70 * scaleFactor, 
        z: 0,
        material: 'crystal',
        rotationSpeed: { x: 0.018, y: 0.01, z: 0.015 }
      }
    ];
  };

  p.draw = function() {
    // Create elegant gradient background
    p.background(245, 248, 252);
    
    // Enable orbit control
    p.orbitControl();
    
    // Enhanced lighting setup
    p.ambientLight(80, 80, 100);
    p.directionalLight(255, 255, 255, 0, 1, -1);
    p.pointLight(255, 220, 180, p.mouseX - p.width/2, p.mouseY - p.height/2, 300);
    p.pointLight(180, 220, 255, -p.mouseX + p.width/2, -p.mouseY + p.height/2, 200);
    
    // Add subtle specular lighting
    p.specularMaterial(255);
    
    // Draw each enhanced object
    p.objects.forEach(obj => {
      p.push();
      p.translate(obj.x, obj.y, obj.z);
      
      // Apply individual rotation speeds
      p.rotateX(p.frameCount * obj.rotationSpeed.x);
      p.rotateY(p.frameCount * obj.rotationSpeed.y);
      p.rotateZ(p.frameCount * obj.rotationSpeed.z);
      
      // Set material properties based on type
      switch(obj.material) {
        case 'glass':
          p.fill(obj.color[0], obj.color[1], obj.color[2], 120);
          p.specularMaterial(200);
          p.shininess(100);
          break;
        case 'metal':
          p.fill(obj.color[0], obj.color[1], obj.color[2]);
          p.specularMaterial(150);
          p.shininess(80);
          break;
        case 'plastic':
          p.fill(obj.color[0], obj.color[1], obj.color[2]);
          p.specularMaterial(100);
          p.shininess(40);
          break;
        case 'crystal':
          p.fill(obj.color[0], obj.color[1], obj.color[2], 180);
          p.specularMaterial(180);
          p.shininess(90);
          break;
      }
      
      p.noStroke();
      
      // Draw the object
      switch(obj.type) {
        case 'sphere':
          p.sphere(obj.size);
          break;
        case 'box':
          p.box(obj.size);
          break;
        case 'cylinder':
          p.cylinder(obj.size, obj.size * 2);
          break;
        case 'cone':
          p.cone(obj.size, obj.size * 2);
          break;
      }
      
      p.pop();
    });
    
    // Add floating particles for atmosphere
    for (let i = 0; i < 15; i++) {
      p.push();
      p.translate(
        (p.noise(i * 0.2, p.frameCount * 0.005) - 0.5) * p.width * 0.6,
        (p.noise(i * 0.2 + 50, p.frameCount * 0.005) - 0.5) * p.height * 0.6,
        (p.noise(i * 0.2 + 100, p.frameCount * 0.005) - 0.5) * 150
      );
      p.noStroke();
      p.fill(255, 255, 255, 80);
      p.sphere(3);
      p.pop();
    }
    
    // Add subtle glow effects around objects
    p.objects.forEach(obj => {
      p.push();
      p.translate(obj.x, obj.y, obj.z);
      p.noFill();
      p.stroke(obj.color[0], obj.color[1], obj.color[2], 30);
      p.strokeWeight(2);
      p.sphere(obj.size * 1.2);
      p.pop();
    });
  };
};

var myp5_3d_2 = new p5(sketch3DOrbit, 'canvas-container-2'); 