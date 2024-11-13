import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r128/examples/jsm/loaders/GLTFLoader.js';


console.log(THREE); // THREE is defined

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let isMouseDown = false; // Store the mouse state
let previousMousePosition = { x: 0, y: 0 }; // Store the previous mouse position

window.addEventListener('mousedown', (event) => {

    isMouseDown = true;

    previousMousePosition = {
        x: event.clientX,
        y: event.clientY
    };
});

let keysPressed = {};

window.addEventListener('keydown', (event) => {
    keysPressed[event.key] = true;
});

window.addEventListener('keyup', (event) => {
    keysPressed[event.key] = false;
});

function updateCameraPosition() {
    const moveDistance = 0.1; // Adjust the movement speed as needed

    if (keysPressed['w']) {
        camera.position.z -= moveDistance;
    }
    if (keysPressed['s']) {
        camera.position.z += moveDistance;
    }
    if (keysPressed['a']) {
        camera.position.x -= moveDistance;
    }
    if (keysPressed['d']) {
        camera.position.x += moveDistance;
    }
}


window.addEventListener('mousemove', (event) => {
    if (!isMouseDown) return;

    const deltaMove = {
        x: event.clientX - previousMousePosition.x,
        y: event.clientY - previousMousePosition.y
    };

    camera.rotation.y += deltaMove.x * 0.0010; // Inverted x-axis
    camera.rotation.x += deltaMove.y * 0.0010; // Inverted y-axis


    camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x));

    previousMousePosition = {x: event.clientX, y: event.clientY};
    
});

window.addEventListener("mouseup", () => {isMouseDown = false;});

camera.position.set(0, 5, 15);
camera.lookAt(0, 0, 0); // Ensure the camera is looking at the scene center

const textureLoader = new THREE.TextureLoader();
const dirtTexture = textureLoader.load('./assets/textures/TCom_Ground_Soil3_header.jpg',
() => renderer.render(scene, camera)

);

dirtTexture.wrapS = dirtTexture.wrapT = THREE.RepeatWrapping;
dirtTexture.repeat.set(10, 10);   

const loader = new GLTFLoader();
loader.load('./assets/models/tomato.glb', (gltf) => {
    const model = gltf.scene;
    model.scale.set(10, 10, 10);
    model.rotation.y = Math.PI / 2; // Rotate the model 45 degrees around the Y-axis
    model.position.set(-20, 0, 0); // Move the model to the left of 0
    scene.add(model);
    renderer.render(scene, camera);
}, undefined, (error) => {
    console.error(error);
});

const tomatoLoader = new GLTFLoader();
tomatoLoader.load('./assets/models/tomato_plant.glb', (gltf) => {
    const model = gltf.scene;
    model.scale.set(.03, .03, .03);
    model.position.set(20, 0, 0); 
    scene.add(model);
    renderer.render(scene, camera);
}, undefined, (error) => {
    console.error(error);
});


const groundMaterial = new THREE.MeshBasicMaterial({ map: dirtTexture });
const groundGeometry = new THREE.PlaneGeometry(50, 50);
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2 ;  // Rotate the ground 90 degrees
scene.add(ground);

const plantMaterial = new THREE.MeshBasicMaterial({ color: 0x004d00 }); // Dark green color
const plantGeometry = new THREE.BoxGeometry(1, 1, 1); // Width, height, depth
const plant = new THREE.Mesh(plantGeometry, plantMaterial);
plant.position.set(0, 0.5, 0); // Position the plant above the ground
scene.add(plant);


const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

renderer.render(scene, camera);

function animate() {
    requestAnimationFrame(animate);
    updateCameraPosition();
    renderer.render(scene, camera);
}

// Start the animation loop
animate();