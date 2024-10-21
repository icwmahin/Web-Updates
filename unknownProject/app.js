// Initialize the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("threejs-canvas"),
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Add lights to the scene
const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Create shapes for the gallery
const shapes = [];
const shapeColors = [
  0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff,
];

for (let i = 0; i < 6; i++) {
  const geometry = new THREE.BoxGeometry(1, 1, 1); // You can change this to SphereGeometry or others
  const material = new THREE.MeshStandardMaterial({ color: shapeColors[i] });
  const shape = new THREE.Mesh(geometry, material);
  shape.position.x = i * 2 - 5; // Adjust position for spacing
  shape.userData = { originalColor: shapeColors[i] }; // Store the original color
  scene.add(shape);
  shapes.push(shape);
}

// Raycaster for mouse hover effects
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Mouse move event listener
window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(shapes);

  // Reset all shapes to original color
  shapes.forEach((shape) => {
    shape.material.color.set(shape.userData.originalColor);
  });

  // Change color of the intersected shape
  if (intersects.length > 0) {
    intersects[0].object.material.color.set(0xffffff); // Change color on hover
  }
});

// Camera position
camera.position.z = 5;

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  shapes.forEach((shape, index) => {
    shape.rotation.x += 0.01 + index * 0.005; // Rotate each shape at different speeds
    shape.rotation.y += 0.01 + index * 0.005; // Rotate each shape at different speeds
  });

  renderer.render(scene, camera);
}

// Event listener for window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start animation
animate();
