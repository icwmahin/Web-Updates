// DOM Elements
const loadingOverlay = document.getElementById("loading-overlay");
const modal = document.getElementById("project-modal");
const modalCloseBtn = document.querySelector(".close-btn");
const projectItems = document.querySelectorAll(".project-item");
const modalTitle = document.getElementById("project-title");
const modalDescription = document.getElementById("project-description");
const modalImage = document.getElementById("project-images img");
const liveDemoLink = document.getElementById("live-demo");
const githubLink = document.getElementById("github-link");

// Project Data
const projects = {
  project1: {
    title: "3D Artwork",
    description:
      "A stunning 3D art piece rendered in real-time using Three.js.",
    image: "project1-detail.jpg",
    liveDemo: "#",
    github: "#",
  },
  // Add more projects here
};

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  // Initialize the 3D Scene
  initThreeJS();
});

// Show Modal on Project Click
projectItems.forEach((item) => {
  item.addEventListener("click", () => {
    const projectId = item.getAttribute("data-project");
    const project = projects[projectId];

    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;
    modalImage.src = project.image;
    liveDemoLink.href = project.liveDemo;
    githubLink.href = project.github;

    modal.style.display = "flex";
  });
});

// Close Modal
modalCloseBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close Modal on Outside Click
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Three.js 3D Scene
function initThreeJS() {
  try {
    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById("threejs-canvas"),
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Add a light source
    const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Example: Add a rotating 3D cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({ color: 0x00bfff });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    // Animation Loop
    function animate() {
      requestAnimationFrame(animate);

      // Rotate the cube
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      // Render the scene from the perspective of the camera
      renderer.render(scene, camera);
    }

    animate();

    // Hide the loading overlay after the scene is fully set up
    hideLoadingOverlay();

    // Handle Window Resize
    window.addEventListener("resize", () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });
  } catch (error) {
    console.error("Error initializing Three.js scene:", error);
    // Optionally, show an error message to the user if scene fails to load
  }
}

// Hide the loading overlay
function hideLoadingOverlay() {
  loadingOverlay.style.opacity = "0";
  setTimeout(() => {
    loadingOverlay.style.visibility = "hidden";
  }, 500); // Wait for the fade-out transition
}
