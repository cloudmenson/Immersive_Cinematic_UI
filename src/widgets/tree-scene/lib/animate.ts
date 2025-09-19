import * as THREE from "three";

export const startAnimation = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  getTreeRoot: () => THREE.Object3D | null
) => {
  const clock = new THREE.Clock();

  const loop = () => {
    requestAnimationFrame(loop);

    const t = clock.getElapsedTime();
    const tree = getTreeRoot();

    if (tree) tree.rotation.y = t * 0.12;

    renderer.render(scene, camera);
  };

  loop();
};
