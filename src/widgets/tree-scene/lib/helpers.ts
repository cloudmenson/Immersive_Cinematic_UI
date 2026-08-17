import * as THREE from "three";

export const worldBottomAtZ = (camera: THREE.PerspectiveCamera, z: number) => {
  const dist = Math.abs(camera.position.z - z);
  const halfHeight = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2) * dist;

  return camera.position.y - halfHeight;
};

export const dimMaterials = (root: THREE.Object3D, colorScale = 1) => {
  root.traverse((obj) => {
    const mesh = obj as THREE.Mesh;

    if (!mesh.isMesh) return;

    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

    materials.forEach((material) => {
      const standard = material as THREE.MeshStandardMaterial;

      standard.color?.multiplyScalar(colorScale);
      standard.emissive?.multiplyScalar(colorScale);
    });
  });
};

export const normalize = (object: THREE.Object3D, targetHeight: number) => {
  const box = new THREE.Box3().setFromObject(object);
  const center = new THREE.Vector3();
  const size = new THREE.Vector3();

  box.getCenter(center);
  box.getSize(size);

  object.position.sub(center);
  object.scale.setScalar(targetHeight / (size.y || 1));
};
