import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

import { disposeObject } from "./dispose";
import { dimMaterials, normalize, worldBottomAtZ } from "./helpers";

export interface TreeSceneHandle {
  setScrollProgress: (progress: number) => void;
  setPointer: (x: number, y: number) => void;
  ready: Promise<void>;
  dispose: () => void;
}

const MODELS = {
  platform: "/models/platform.glb",
  tree: "/models/lemon-tree.glb",
  grass: "/models/grass.glb",
};

export const createTreeScene = (container: HTMLElement): TreeSceneHandle => {
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x050706, 0.035);

  const camera = new THREE.PerspectiveCamera(
    55,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 2.1, 8.4);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  container.appendChild(renderer.domElement);

  const pmrem = new THREE.PMREMGenerator(renderer);
  const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
  scene.environment = envRT.texture;

  const key = new THREE.DirectionalLight(0xfff2c4, 1.1);
  key.position.set(3, 8, 4);
  scene.add(key);

  const rim = new THREE.DirectionalLight(0x6ff2a6, 0.5);
  rim.position.set(-5, 3, -4);
  scene.add(rim);

  const sunBeams = new THREE.Group();
  scene.add(sunBeams);

  const beamMaterial = new THREE.MeshBasicMaterial({
    opacity: 0.05,
    color: 0xfff7da,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
  });

  for (let i = 0; i < 6; i++) {
    const angle = 0.1 + Math.random() * 0.05;
    const height = 8 + Math.random() * 2;
    const geometry = new THREE.ConeGeometry(height * Math.tan(angle), height, 12, 1, true);

    geometry.translate(0, -height / 2, 0);

    const cone = new THREE.Mesh(geometry, beamMaterial);

    cone.position.set((Math.random() - 0.5) * 4, 9, (Math.random() - 0.5) * 4);
    cone.rotation.x = Math.PI;

    sunBeams.add(cone);
  }

  const moteCount = 260;
  const motePositions = new Float32Array(moteCount * 3);
  const moteSpeeds = new Float32Array(moteCount);

  for (let i = 0; i < moteCount; i++) {
    motePositions[i * 3] = (Math.random() - 0.5) * 14;
    motePositions[i * 3 + 1] = Math.random() * 9;
    motePositions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    moteSpeeds[i] = 0.05 + Math.random() * 0.12;
  }

  const moteGeometry = new THREE.BufferGeometry();
  moteGeometry.setAttribute("position", new THREE.BufferAttribute(motePositions, 3));

  const moteMaterial = new THREE.PointsMaterial({
    size: 0.035,
    color: 0xd8ffe8,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const motes = new THREE.Points(moteGeometry, moteMaterial);
  scene.add(motes);

  const draco = new DRACOLoader();
  draco.setDecoderPath("/draco/");

  const loader = new GLTFLoader();
  loader.setDRACOLoader(draco);

  const load = (url: string) =>
    new Promise<THREE.Object3D | null>((resolve) => {
      loader.load(
        url,
        (gltf) => resolve(gltf.scene),
        undefined,
        () => resolve(null)
      );
    });

  let platform: THREE.Object3D | null = null;
  let treeRoot: THREE.Object3D | null = null;
  let grass: THREE.Object3D | null = null;
  let disposed = false;

  const layout = () => {
    if (!platform) return;

    platform.position.y = worldBottomAtZ(camera, platform.position.z) + 0.1;
    platform.updateWorldMatrix(true, true);

    const platformTop = new THREE.Box3().setFromObject(platform).max.y;

    if (treeRoot) {
      treeRoot.updateWorldMatrix(true, true);

      const treeBottom = new THREE.Box3().setFromObject(treeRoot).min.y;

      treeRoot.position.y += platformTop - treeBottom + 0.02;
    }

    if (grass) {
      grass.position.set(treeRoot?.position.x ?? 0, platformTop + 0.01, treeRoot?.position.z ?? 0);
    }
  };

  const ready = (async () => {
    const [platformModel, treeModel, grassModel] = await Promise.all([
      load(MODELS.platform),
      load(MODELS.tree),
      load(MODELS.grass),
    ]);

    if (disposed) {
      [platformModel, treeModel, grassModel].forEach((model) => model && disposeObject(model));

      return;
    }

    if (platformModel) {
      platform = platformModel;
      normalize(platform, 0.6);
      dimMaterials(platform, 0.4);
      scene.add(platform);
    }

    if (treeModel) {
      treeRoot = treeModel;
      normalize(treeRoot, 3.2);
      dimMaterials(treeRoot, 0.32);
      scene.add(treeRoot);
    }

    if (grassModel) {
      grass = grassModel;

      const box = new THREE.Box3().setFromObject(grass);
      const size = new THREE.Vector3();
      const center = new THREE.Vector3();

      box.getSize(size);
      box.getCenter(center);

      grass.position.sub(center);
      grass.scale.setScalar(1.2 / Math.max(size.x || 1, size.z || 1));

      dimMaterials(grass, 0.4);
      scene.add(grass);
    }

    layout();
  })();

  const clock = new THREE.Clock();

  let frame = 0;
  let scrollTarget = 0;
  let scroll = 0;
  let pointerTargetX = 0;
  let pointerTargetY = 0;
  let pointerX = 0;
  let pointerY = 0;

  const tick = () => {
    frame = requestAnimationFrame(tick);

    const time = clock.getElapsedTime();

    scroll += (scrollTarget - scroll) * 0.06;
    pointerX += (pointerTargetX - pointerX) * 0.05;
    pointerY += (pointerTargetY - pointerY) * 0.05;

    if (treeRoot) treeRoot.rotation.y = scroll * Math.PI * 1.4 + time * 0.05;

    camera.position.x = pointerX * 0.45;
    camera.position.y = 2.1 + scroll * 1.4 + pointerY * 0.22;
    camera.position.z = 8.4 - scroll * 2.2;
    camera.lookAt(0, 0.55 + scroll * 0.9, 0);

    sunBeams.rotation.y = time * 0.02;

    const positions = moteGeometry.attributes.position.array as Float32Array;

    for (let i = 0; i < moteCount; i++) {
      const y = i * 3 + 1;

      positions[y] += moteSpeeds[i] * 0.01;

      if (positions[y] > 9) positions[y] = 0;

      positions[i * 3] += Math.sin(time * 0.3 + i) * 0.0006;
    }

    moteGeometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  };

  const start = () => {
    if (frame) return;

    clock.getDelta();
    frame = requestAnimationFrame(tick);
  };

  const stop = () => {
    if (!frame) return;

    cancelAnimationFrame(frame);
    frame = 0;
  };

  start();

  const onVisibility = () => (document.hidden ? stop() : start());

  document.addEventListener("visibilitychange", onVisibility);

  const onResize = () => {
    const { clientWidth: width, clientHeight: height } = container;

    if (!width || !height) return;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);

    layout();
  };

  const resizeObserver = new ResizeObserver(onResize);
  resizeObserver.observe(container);

  return {
    setScrollProgress: (progress) => {
      scrollTarget = progress;
    },

    setPointer: (x, y) => {
      pointerTargetX = x;
      pointerTargetY = y;
    },

    ready,

    dispose: () => {
      disposed = true;

      stop();

      document.removeEventListener("visibilitychange", onVisibility);
      resizeObserver.disconnect();

      [platform, treeRoot, grass].forEach((model) => model && disposeObject(model));

      sunBeams.children.forEach((cone) => (cone as THREE.Mesh).geometry.dispose());

      beamMaterial.dispose();
      moteGeometry.dispose();
      moteMaterial.dispose();
      envRT.dispose();
      pmrem.dispose();
      draco.dispose();

      scene.clear();

      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    },
  };
};
