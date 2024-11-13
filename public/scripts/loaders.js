import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r128/examples/jsm/loaders/GLTFLoader.js';
import { EXRLoader } from 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r128/examples/jsm/loaders/EXRLoader.js';

export async function loadModels(scene, camera, renderer) {
    const textureLoader = new THREE.TextureLoader();
    const dirtTexture = textureLoader.load('./assets/textures/TCom_Ground_Soil3_header.jpg', () => {
        renderer.render(scene, camera);
    });

    dirtTexture.wrapS = dirtTexture.wrapT = THREE.RepeatWrapping;
    dirtTexture.repeat.set(10, 10);

    const groundMaterial = new THREE.MeshBasicMaterial({ map: dirtTexture });
    const groundGeometry = new THREE.PlaneGeometry(50, 50);
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2; // Rotate the ground 90 degrees
    scene.add(ground);

    const plantLoader = new GLTFLoader();
    const tomatoLoader = new GLTFLoader();
    

    try {
        // Load the first model (plant)
        await new Promise((resolve, reject) => {
            plantLoader.load('./assets/models/tomato.glb', (gltf) => {
                const model = gltf.scene;
                model.scale.set(10, 10, 10);
                model.rotation.y = Math.PI / 2; // Rotate the model 90 degrees
                model.position.set(-10, 0, 0); // Move the model to the left of 0
                scene.add(model);
                resolve();
            }, undefined, (error) => {
                console.error(error);
                reject(error);
            });
        });

        // Load the second model (tomato plant)
        await new Promise((resolve, reject) => {
            tomatoLoader.load('./assets/models/tomato_plant.glb', (gltf) => {
                const model = gltf.scene;
                model.scale.set(0.03, 0.03, 0.03);
                model.position.set(10, 0, 0);
                scene.add(model);
                resolve();
            }, undefined, (error) => {
                console.error(error);
                reject(error);
            });
        });
    } catch (error) {
        console.error('An error occurred while loading models:', error);
    }
}
