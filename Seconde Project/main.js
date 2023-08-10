import * as THREE from "three";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import atmosphereVertexShader from "./shaders/atmosphereVertex.glsl";
import atmosphereFragmentShader from "./shaders/atmospehreFragment.glsl";

const scene = new THREE.Scene();
scene.background = new THREE.Color("rgb(15, 23, 42)");
const camera = new THREE.PerspectiveCamera(75, 600 / 600, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(600, 600);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);

// create a sphere

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(10, 100, 100),
  new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      globeTexture: { value: new THREE.TextureLoader().load("./img/earth.jpg") },
    },
  })
);

sphere.rotation.set(0, 0, (-Math.PI * 23) / 180);

scene.add(sphere);

// create a atmosphere

const atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(10, 100, 100),
  new THREE.ShaderMaterial({
    vertexShader: atmosphereVertexShader,
    fragmentShader: atmosphereFragmentShader,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
  })
);

atmosphere.scale.set(1.2, 1.2, 1.2);

scene.add(atmosphere);

camera.position.z = 30;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  sphere.rotateY(0.001);
}

animate();
