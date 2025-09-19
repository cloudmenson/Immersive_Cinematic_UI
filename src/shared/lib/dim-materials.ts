import * as THREE from "three";

export const dimMaterials = (object: THREE.Object3D, factor: number) => {
  object.traverse((child: any) => {
    if (child.isMesh && child.material) {
      if (Array.isArray(child.material)) {
        child.material.forEach((m: any) => {
          if (m.color) m.color.multiplyScalar(factor);
        });
      } else {
        if (child.material.color) child.material.color.multiplyScalar(factor);
      }
    }
  });
};
