import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import { dimMaterials, worldBottomAtZ } from "./helpers";

const loader = new GLTFLoader();

// platform
export const loadPlatform = (scene: THREE.Scene, camera: THREE.PerspectiveCamera) => {
  return new Promise<THREE.Object3D>((resolve) => {
    loader.load("/models/platform.glb", (g) => {
      const platform = g.scene as THREE.Object3D;

      const box = new THREE.Box3().setFromObject(platform);
      const c = new THREE.Vector3();

      box.getCenter(c);
      platform.position.sub(c);

      const size = new THREE.Vector3();
      box.getSize(size);

      const scale = 0.6 / (size.y || 1);
      platform.scale.setScalar(scale);

      platform.position.y = worldBottomAtZ(camera, platform.position.z) + 0.25;
      scene.add(platform);

      dimMaterials(platform, 0.4);

      resolve(platform);
    });
  });
};

// tree
export const loadTree = (scene: THREE.Scene, platform?: THREE.Object3D | null) => {
  return new Promise<{ treeRoot: THREE.Object3D; treeMesh: THREE.Mesh | null }>((resolve) => {
    loader.load("/models/lemon-tree.glb", (g) => {
      const treeRoot = g.scene as THREE.Object3D;

      scene.add(treeRoot);
      dimMaterials(treeRoot, 0.5);

      const box = new THREE.Box3().setFromObject(treeRoot);
      const c = new THREE.Vector3();

      box.getCenter(c);
      treeRoot.position.sub(c);

      const size = new THREE.Vector3();
      box.getSize(size);

      const s = 4 / (size.y || 1);
      treeRoot.scale.setScalar(s);

      let treeMesh: THREE.Mesh | null = null;

      treeRoot.traverse((child: any) => {
        if (!treeMesh && child.isMesh) treeMesh = child as THREE.Mesh;
      });

      if (platform) {
        platform.updateWorldMatrix(true, true);
        treeRoot.updateWorldMatrix(true, true);

        const pBox = new THREE.Box3().setFromObject(platform);
        const tBox = new THREE.Box3().setFromObject(treeRoot);
        const delta = pBox.max.y - tBox.min.y + 0.02;

        treeRoot.position.y += delta;
      }

      resolve({ treeRoot, treeMesh });
    });
  });
};

// grass
export const loadGrass = (
  scene: THREE.Scene,
  platform?: THREE.Object3D | null,
  treeRoot?: THREE.Object3D | null
) => {
  return new Promise<THREE.Object3D>((resolve) => {
    loader.load("/models/grass.glb", (g) => {
      const grass = g.scene as THREE.Object3D;

      const box = new THREE.Box3().setFromObject(grass);
      const c = new THREE.Vector3();

      box.getCenter(c);
      grass.position.sub(c);

      const size = new THREE.Vector3();
      box.getSize(size);

      const targetW = 1.2;
      const s = targetW / Math.max(size.x || 1, size.z || 1);

      grass.scale.setScalar(s);
      dimMaterials(grass, 0.4);

      scene.add(grass);

      if (platform) {
        const pBox = new THREE.Box3().setFromObject(platform);
        const topY = pBox.max.y;

        let gx = 0,
          gz = 0;

        if (treeRoot) {
          gx = treeRoot.position.x;
          gz = treeRoot.position.z;
        }

        grass.position.set(gx, topY + 0.01, gz);
      }

      resolve(grass);
    });
  });
};
