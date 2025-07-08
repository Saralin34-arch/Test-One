// 3d-lighting-demo.js
// Box geometry with multiple lights demo
// Author: Sara Lin

function setup() {
  let c = createCanvas(300, 300, WEBGL);
  c.parent('3d-lighting-canvas');
  camera(0, -80, 800);
  describe('a box geometry with a number of lights affecting its appearance');
}

function draw() {
  background(220);
  orbitControl();
 
  // use comments to enable / disable lights
 
  ambientLight(20);
 
  pointLight(
    255, 0, 0, // color
    40, -40, 0 // position
  );
 
  directionalLight(
    0, 255, 0, // color
    1, 1, 0  // direction
  );
 
  let locX = (mouseX - width/2) * 2;
  let locY = (mouseY - height/2) * 2;
  spotLight(
    100, 100, 255, // color
    locX, locY, 200, // position
    -locX, -locY, -200, // direction
    PI/3 // radius of the spotlight cone
  );
 
  // noLights();
 
  rotateY(millis() * 0.001);
  box();
}