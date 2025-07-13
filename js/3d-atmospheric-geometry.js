// 3d-atmospheric-geometry.js
// Three.js scene: rotating primitives with dramatic lighting and blue fog
// Author: Sara Lin

(function() {
  // Scene, camera, renderer setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 800 / 400, 0.1, 50);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(800, 400);
  renderer.setClearColor(0xe6f3ff); // Background matches fog color

  document.getElementById('3d-atmospheric-geometry').appendChild(renderer.domElement);

  // Add light pastel blue fog - following Three.js manual pattern
  scene.fog = new THREE.Fog(0xe6f3ff, 3, 15); // Light pastel blue fog starting at 3, ending at 15

  // Create 3D primitives with pink color palette
  const colors = [0xff69b4, 0xff1493, 0xff007f]; // Pink palette

  // Cube - positioned close and low
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.MeshBasicMaterial({ 
      color: colors[0]
    })
  );
  cube.position.set(-4, 1, 2);
  scene.add(cube);

  // Cone - positioned medium distance and height
  const cone = new THREE.Mesh(
    new THREE.ConeGeometry(1.5, 3, 32),
    new THREE.MeshBasicMaterial({ 
      color: colors[1]
    })
  );
  cone.position.set(0, 2.5, 4);
  scene.add(cone);

  // Cylinder - positioned far and high
  const cylinder = new THREE.Mesh(
    new THREE.CylinderGeometry(1.2, 1.2, 3.6, 32),
    new THREE.MeshBasicMaterial({ 
      color: colors[2]
    })
  );
  cylinder.position.set(6, 4, 6);
  scene.add(cylinder);

  // Camera position for good view of all objects
  camera.position.set(-10, 8, 4);
  camera.lookAt(0, 2, 0);

  // OrbitControls (assumes OrbitControls is available globally)
  if (typeof THREE.OrbitControls === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.min.js';
    script.onload = setupControls;
    document.head.appendChild(script);
  } else {
    setupControls();
  }

  function setupControls() {
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.screenSpacePanning = false;
    controls.minDistance = 8;
    controls.maxDistance = 40;
    controls.target.set(0, 2, 0);

    // Animation loop with different rotation speeds
    function animate() {
      requestAnimationFrame(animate);
      // Rotate each primitive at different speeds
      cube.rotation.y += 0.02; // Slow rotation
      cube.rotation.x += 0.01;
      cone.rotation.y += 0.03; // Medium rotation
      cone.rotation.z += 0.015;
      cylinder.rotation.y += 0.04; // Fast rotation
      cylinder.rotation.x += 0.02;
      controls.update();
      renderer.render(scene, camera);
    }
    animate();
  }
})(); 