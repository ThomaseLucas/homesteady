import { initScene } from './sceneSetup.js';
import { loadModels } from './loaders.js';
import { animate } from './animate.js';
import { setupControls } from './controls.js';

// Initialize scene, camera, renderer
const { scene, camera, renderer } = initScene();
const updateControls = setupControls(camera, renderer);

// Load models and start animation loop
loadModels(scene, camera, renderer).then(() => {
    animate(scene, camera, renderer, updateControls);
});
