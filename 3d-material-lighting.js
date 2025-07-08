// 3d-lighting-demo.js
// Box geometry with multiple materials demo
// Author: Sara Lin

function setup() {
  let c = createCanvas(300, 300, WEBGL);
  c.parent('3d-lighting-canvas');
  describe('a box geometry with multiple materials applied to it');
}

function draw() {
  background(220);
  camera(200, -200, 600);
 
  noStroke();
  ambientLight(128);
  let locX = mouseX - width / 2;
  let locY = mouseY - height / 2;
  pointLight(255, 255, 255, locX, locY, 100);
  // normal material shows the geometry normals
  normalMaterial();
  // ambient materials reflect under any light
  ambientMaterial('#B7DDA8'); // green matching 2D palette
  // emissive materials show the same color regardless of light
  emissiveMaterial('#F26B2B'); // orange matching 2D palette
  // specular materials reflect the color of the light source
  // and can vary in 'shininess'
  shininess(10);
  specularMaterial('#8FB4D9'); // blue matching 2D palette
  box(50);
  // sphere();
} 