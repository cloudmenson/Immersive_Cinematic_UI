"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

import { worldBottomAtZ } from "../lib/helpers";
import { startAnimation } from "../lib/animate";
import { loadTree, loadGrass, loadPlatform } from "../lib/models";

export const TreeScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      100
    );

    camera.position.set(0, 1.4, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    containerRef.current.appendChild(renderer.domElement);

    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    const sunBeams = new THREE.Group();

    scene.add(sunBeams);

    const coneCount = 6;
    for (let i = 0; i < coneCount; i++) {
      const angle = 0.1 + Math.random() * 0.05;
      const height = 8 + Math.random() * 2;
      const geometry = new THREE.ConeGeometry(height * Math.tan(angle), height, 32, 1, true);

      geometry.translate(0, -height / 2, 0);

      const material = new THREE.MeshBasicMaterial({
        opacity: 0.05,
        color: 0xfff7da,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      });

      const cone = new THREE.Mesh(geometry, material);

      cone.position.set((Math.random() - 0.5) * 4, 9, (Math.random() - 0.5) * 4);
      cone.rotation.x = Math.PI;

      sunBeams.add(cone);
    }

    let platform: THREE.Object3D | null = null;
    let treeRoot: THREE.Object3D | null = null;
    let treeMesh: THREE.Mesh | null = null;
    let grass: THREE.Object3D | null = null;

    loadPlatform(scene, camera).then((p) => {
      platform = p;

      if (grass) {
        placeGrass();
      }
    });

    loadTree(scene, platform).then(({ treeRoot: tr, treeMesh: tm }) => {
      treeRoot = tr;
      treeMesh = tm;
      if (platform) {
        platform.updateWorldMatrix(true, true);
        treeRoot.updateWorldMatrix(true, true);

        const pBox = new THREE.Box3().setFromObject(platform);
        const tBox = new THREE.Box3().setFromObject(treeRoot);
        const delta = pBox.max.y - tBox.min.y + 0.02;

        treeRoot.position.y += delta;
      }
      if (grass) {
        placeGrass();
      }
    });

    loadGrass(scene, platform, treeRoot).then((g) => {
      grass = g;

      if (platform && treeRoot) {
        placeGrass();
      }
    });

    const placeGrass = () => {
      if (!grass || !platform) return;

      const pBox = new THREE.Box3().setFromObject(platform);
      const topY = pBox.max.y;

      let gx = 0,
        gz = 0;

      if (treeRoot) {
        gx = treeRoot.position.x;
        gz = treeRoot.position.z;
      }

      grass.position.set(gx, topY + 0.01, gz);
    };

    startAnimation(renderer, scene, camera, () => treeRoot);

    const onResize = () => {
      if (!containerRef.current) return;

      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);

      if (platform) platform.position.y = worldBottomAtZ(camera, platform.position.z) + 0.25;
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);

      renderer.dispose();

      containerRef.current?.removeChild(renderer.domElement);

      pmrem.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 z-20 pointer-events-none" />;
};
