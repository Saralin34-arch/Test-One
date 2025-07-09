// 3d-spatial-canvas.js
// Three.js Spatial Canvas Demo
// Author: Sara Lin

let scene, camera, renderer;
let cubes = []; // array to store multiple cube objects

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, 300 / 300, 0.1, 1000);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(300, 300);
  
  // Attach to the correct container
  let container = document.getElementById('3d-spatial-canvas');
  container.appendChild(renderer.domElement);
  
  // Create cubes at different positions using 2D color palette
  let positions = [
    {x: -2, y: 0, z: 0, color: 0xF4C7B6}, // peach
    {x: 0, y: 0, z: 0, color: 0xD6C5EB},  // lavender
    {x: 2, y: 0, z: 0, color: 0xF26B2B},  // orange
    {x: -1, y: 1, z: 0, color: 0xF7D850}, // yellow
    {x: 1, y: 1, z: 0, color: 0xB7DDA8},  // green
    {x: 0, y: -1, z: 0, color: 0x8FB4D9}  // blue
  ];
  
  // Create cubes at each stored position
  for (let i = 0; i < positions.length; i++) {
    let geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    let material = new THREE.MeshBasicMaterial({color: positions[i].color});
    let cube = new THREE.Mesh(geometry, material);
    
    // Position cube using array values
    cube.position.set(positions[i].x, positions[i].y, positions[i].z);
    scene.add(cube);
    cubes.push(cube); // add to our array
  }
  
  camera.position.z = 5;
}

function animate() {
  requestAnimationFrame(animate);
  
  // Animate all cubes in the array
  for (let i = 0; i < cubes.length; i++) {
    cubes[i].rotation.x += 0.01;
    cubes[i].rotation.y += 0.01;
  }
  
  renderer.render(scene, camera);
}

// Start the application
init();
animate(); 