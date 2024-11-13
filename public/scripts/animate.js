export function animate(scene, camera, renderer, updateControls) {
    function render() {
        requestAnimationFrame(render);
        updateControls();
        renderer.render(scene, camera);
    }
    render();
}
