import * as THREE from "three";

export const worldBottomAtZ = (camera: THREE.PerspectiveCamera, z: number) => {
  const dist = Math.abs(camera.position.z - z);
  const halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2) * dist;

  return camera.position.y - halfH;
};

export const dimMaterials = (root: THREE.Object3D, colorScale = 1, alpha = 1) => {
  root.traverse((obj: any) => {
    if (obj && obj.isMesh) {
      const mats: THREE.Material[] = Array.isArray(obj.material) ? obj.material : [obj.material];

      mats.forEach((m: any) => {
        if (m.color) m.color.multiplyScalar(colorScale);
        if (m.emissive) m.emissive.multiplyScalar(colorScale);

        m.opacity = (m.opacity ?? 1) * alpha;
      });
    }
  });
};
