import { OrbitControls } from 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r128/examples/jsm/controls/OrbitControls.js';

export function setupControls(camera, renderer) {
    // Create OrbitControls and pass the camera and renderer's DOM element
    const controls = new OrbitControls(camera, renderer.domElement);

    // Optional control settings
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2;
    controls.rotateSpeed = 0.5;
    controls.zoomSpeed = 0.5;
    controls.panSpeed = 0.5;

    // Add keydown events for forward/backward movement on XZ plane
    window.addEventListener('keydown', (event) => {
        const moveDistance = 1; // Adjust the movement speed as needed
        const direction = new THREE.Vector3();

        // Get current direction and restrict to XZ plane
        camera.getWorldDirection(direction);
        direction.y = 0;
        direction.normalize();
                                                                                                
        switch (event.key) {
            case 'w': // Move forward
                camera.position.add(direction.multiplyScalar(moveDistance));
                controls.target.add(direction.multiplyScalar(moveDistance)); // Adjust target
                break;
            case 's': // Move backward
                camera.position.add(direction.multiplyScalar(-moveDistance));
                controls.target.add(direction.multiplyScalar(-moveDistance));
                break;
        }

        controls.update();
    });

    // Function to update controls each frame
    function updateControls() {
        controls.update();
    }

    return updateControls;
}
