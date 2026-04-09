"use client";

import {
  BloomEffect,
  EffectComposer,
  EffectPass,
  RenderPass,
  SMAAEffect,
  SMAAPreset,
} from "postprocessing";
import { useEffect, useRef } from "react";
import * as THREE from "three";

import "./Hyperspeed.css";

export const hyperspeedPresets = {
  one: {
    onSpeedUp: () => {},
    onSlowDown: () => {},
    distortion: "turbulentDistortion",
    length: 400,
    roadWidth: 10,
    islandWidth: 2,
    lanesPerRoad: 3,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 20,
    lightPairsPerRoadWay: 40,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5] as [number, number],
    lightStickHeight: [1.3, 1.7] as [number, number],
    movingAwaySpeed: [60, 80] as [number, number],
    movingCloserSpeed: [-120, -160] as [number, number],
    carLightsLength: [400 * 0.03, 400 * 0.2] as [number, number],
    carLightsRadius: [0.05, 0.14] as [number, number],
    carWidthPercentage: [0.3, 0.5] as [number, number],
    carShiftX: [-0.8, 0.8] as [number, number],
    carFloorSeparation: [0, 5] as [number, number],
    colors: {
      roadColor: 0x080808,
      islandColor: 0x0a0a0a,
      background: 0x000000,
      shoulderLines: 0x131318,
      brokenLines: 0x131318,
      leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
      rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
      sticks: 0x03b3c3,
    },
  },
  two: {
    onSpeedUp: () => {},
    onSlowDown: () => {},
    distortion: "mountainDistortion",
    length: 400,
    roadWidth: 9,
    islandWidth: 2,
    lanesPerRoad: 3,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 50,
    lightPairsPerRoadWay: 50,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5] as [number, number],
    lightStickHeight: [1.3, 1.7] as [number, number],
    movingAwaySpeed: [60, 80] as [number, number],
    movingCloserSpeed: [-120, -160] as [number, number],
    carLightsLength: [400 * 0.05, 400 * 0.15] as [number, number],
    carLightsRadius: [0.05, 0.14] as [number, number],
    carWidthPercentage: [0.3, 0.5] as [number, number],
    carShiftX: [-0.2, 0.2] as [number, number],
    carFloorSeparation: [0.05, 1] as [number, number],
    colors: {
      roadColor: 0x080808,
      islandColor: 0x0a0a0a,
      background: 0x000000,
      shoulderLines: 0x131318,
      brokenLines: 0x131318,
      leftCars: [0xff102a, 0xeb383e, 0xff102a],
      rightCars: [0xdadafa, 0xbebae3, 0x8f97e4],
      sticks: 0xdadafa,
    },
  },
  three: {
    onSpeedUp: () => {},
    onSlowDown: () => {},
    distortion: "xyDistortion",
    length: 400,
    roadWidth: 9,
    islandWidth: 2,
    lanesPerRoad: 3,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 3,
    carLightsFade: 0.4,
    totalSideLightSticks: 50,
    lightPairsPerRoadWay: 30,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.02, 0.05] as [number, number],
    lightStickHeight: [0.3, 0.7] as [number, number],
    movingAwaySpeed: [20, 50] as [number, number],
    movingCloserSpeed: [-150, -230] as [number, number],
    carLightsLength: [400 * 0.05, 400 * 0.2] as [number, number],
    carLightsRadius: [0.03, 0.08] as [number, number],
    carWidthPercentage: [0.1, 0.5] as [number, number],
    carShiftX: [-0.5, 0.5] as [number, number],
    carFloorSeparation: [0, 0.1] as [number, number],
    colors: {
      roadColor: 0x080808,
      islandColor: 0x0a0a0a,
      background: 0x000000,
      shoulderLines: 0x131318,
      brokenLines: 0x131318,
      leftCars: [0x7d0d1b, 0xa90519, 0xff102a],
      rightCars: [0xf1eece, 0xe6e2b1, 0xdfd98a],
      sticks: 0xf1eece,
    },
  },
  four: {
    onSpeedUp: () => {},
    onSlowDown: () => {},
    distortion: "LongRaceDistortion",
    length: 400,
    roadWidth: 10,
    islandWidth: 5,
    lanesPerRoad: 2,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 50,
    lightPairsPerRoadWay: 70,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5] as [number, number],
    lightStickHeight: [1.3, 1.7] as [number, number],
    movingAwaySpeed: [60, 80] as [number, number],
    movingCloserSpeed: [-120, -160] as [number, number],
    carLightsLength: [400 * 0.05, 400 * 0.15] as [number, number],
    carLightsRadius: [0.05, 0.14] as [number, number],
    carWidthPercentage: [0.3, 0.5] as [number, number],
    carShiftX: [-0.2, 0.2] as [number, number],
    carFloorSeparation: [0.05, 1] as [number, number],
    colors: {
      roadColor: 0x080808,
      islandColor: 0x0a0a0a,
      background: 0x000000,
      shoulderLines: 0x131318,
      brokenLines: 0x131318,
      leftCars: [0xff5f73, 0xe74d60, 0xff102a],
      rightCars: [0xa4e3e6, 0x80d1d4, 0x53c2c6],
      sticks: 0xa4e3e6,
    },
  },
  five: {
    onSpeedUp: () => {},
    onSlowDown: () => {},
    distortion: "turbulentDistortion",
    length: 400,
    roadWidth: 9,
    islandWidth: 2,
    lanesPerRoad: 3,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 50,
    lightPairsPerRoadWay: 50,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5] as [number, number],
    lightStickHeight: [1.3, 1.7] as [number, number],
    movingAwaySpeed: [60, 80] as [number, number],
    movingCloserSpeed: [-120, -160] as [number, number],
    carLightsLength: [400 * 0.05, 400 * 0.15] as [number, number],
    carLightsRadius: [0.05, 0.14] as [number, number],
    carWidthPercentage: [0.3, 0.5] as [number, number],
    carShiftX: [-0.2, 0.2] as [number, number],
    carFloorSeparation: [0.05, 1] as [number, number],
    colors: {
      roadColor: 0x080808,
      islandColor: 0x0a0a0a,
      background: 0x000000,
      shoulderLines: 0x131318,
      brokenLines: 0x131318,
      leftCars: [0xdc5b20, 0xdca320, 0xdc2020],
      rightCars: [0x334bf7, 0xe5e6ed, 0xbfc6f3],
      sticks: 0xc5e8eb,
    },
  },
  six: {
    onSpeedUp: () => {},
    onSlowDown: () => {},
    distortion: "deepDistortion",
    length: 400,
    roadWidth: 18,
    islandWidth: 2,
    lanesPerRoad: 3,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 50,
    lightPairsPerRoadWay: 50,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5] as [number, number],
    lightStickHeight: [1.3, 1.7] as [number, number],
    movingAwaySpeed: [60, 80] as [number, number],
    movingCloserSpeed: [-120, -160] as [number, number],
    carLightsLength: [400 * 0.05, 400 * 0.15] as [number, number],
    carLightsRadius: [0.05, 0.14] as [number, number],
    carWidthPercentage: [0.3, 0.5] as [number, number],
    carShiftX: [-0.2, 0.2] as [number, number],
    carFloorSeparation: [0.05, 1] as [number, number],
    colors: {
      roadColor: 0x080808,
      islandColor: 0x0a0a0a,
      background: 0x000000,
      shoulderLines: 0x131318,
      brokenLines: 0x131318,
      leftCars: [0xff322f, 0xa33010, 0xa81508],
      rightCars: [0xfdfdf0, 0xf3dea0, 0xe2bb88],
      sticks: 0xfdfdf0,
    },
  },
};

export type HyperspeedEffectOptions =
  (typeof hyperspeedPresets)[keyof typeof hyperspeedPresets];

function randomRange(range: [number, number]) {
  const [min, max] = range;
  return Math.random() * (max - min) + min;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function lerp(current: number, target: number, alpha: number) {
  return current + (target - current) * alpha;
}

type DistortionFn = (progress: number, time: number) => THREE.Vector3;

const distortions: Record<string, DistortionFn> = {
  mountainDistortion: (progress, time) => {
    const uFreq = new THREE.Vector3(3, 6, 10);
    const uAmp = new THREE.Vector3(30, 30, 20);
    const nsin = (v: number) => Math.sin(v) * 0.5 + 0.5;
    const movementProgressFix = 0.02;
    const distortion = new THREE.Vector3(
      Math.cos(progress * Math.PI * uFreq.x + time) * uAmp.x -
        Math.cos(movementProgressFix * Math.PI * uFreq.x + time) * uAmp.x,
      nsin(progress * Math.PI * uFreq.y + time) * uAmp.y -
        nsin(movementProgressFix * Math.PI * uFreq.y + time) * uAmp.y,
      nsin(progress * Math.PI * uFreq.z + time) * uAmp.z -
        nsin(movementProgressFix * Math.PI * uFreq.z + time) * uAmp.z,
    );
    return distortion.multiply(new THREE.Vector3(0.02, 0.02, 0.02));
  },
  xyDistortion: (progress, time) => {
    const uFreq = new THREE.Vector2(5, 2);
    const uAmp = new THREE.Vector2(25, 15);
    const fix = 0.02;
    const dx =
      Math.cos(progress * Math.PI * uFreq.x + time) * uAmp.x -
      Math.cos(fix * Math.PI * uFreq.x + time) * uAmp.x;
    const dy =
      Math.sin(progress * Math.PI * uFreq.y + time + Math.PI / 2) * uAmp.y -
      Math.sin(fix * Math.PI * uFreq.y + time + Math.PI / 2) * uAmp.y;
    return new THREE.Vector3(dx * 0.02, dy * 0.01, 0);
  },
  LongRaceDistortion: (progress, time) => {
    const uFreq = new THREE.Vector2(2, 3);
    const uAmp = new THREE.Vector2(35, 10);
    const fix = 0.0125;
    const dx =
      Math.sin(progress * Math.PI * uFreq.x + time) * uAmp.x -
      Math.sin(fix * Math.PI * uFreq.x + time) * uAmp.x;
    const dy =
      Math.sin(progress * Math.PI * uFreq.y + time) * uAmp.y -
      Math.sin(fix * Math.PI * uFreq.y + time) * uAmp.y;
    return new THREE.Vector3(dx * 0.02, dy * 0.02, 0);
  },
  turbulentDistortion: (progress, time) => {
    const uFreq = new THREE.Vector4(4, 8, 8, 1);
    const uAmp = new THREE.Vector4(25, 5, 10, 10);
    const nsin = (v: number) => Math.sin(v) * 0.5 + 0.5;
    const getX = (p: number) =>
      Math.cos(Math.PI * p * uFreq.x + time) * uAmp.x +
      Math.pow(
        Math.cos(Math.PI * p * uFreq.y + time * (uFreq.y / uFreq.x)),
        2,
      ) *
        uAmp.y;
    const getY = (p: number) =>
      -nsin(Math.PI * p * uFreq.z + time) * uAmp.z -
      Math.pow(nsin(Math.PI * p * uFreq.w + time / (uFreq.z / uFreq.w)), 5) *
        uAmp.w;

    const distortion = new THREE.Vector3(
      getX(progress) - getX(progress + 0.007),
      getY(progress) - getY(progress + 0.007),
      0,
    );
    return distortion.multiply(new THREE.Vector3(-0.03, -0.06, 0));
  },
  deepDistortion: (progress, time) => {
    const uFreq = new THREE.Vector2(4, 8);
    const uAmp = new THREE.Vector2(10, 20);
    const uPowY = new THREE.Vector2(20, 2);
    const getX = (p: number) => Math.sin(p * Math.PI * uFreq.x + time) * uAmp.x;
    const getY = (p: number) =>
      Math.pow(Math.abs(p * uPowY.x), uPowY.y) +
      Math.sin(p * Math.PI * uFreq.y + time) * uAmp.y;
    const distortion = new THREE.Vector3(
      getX(progress) - getX(progress + 0.01),
      getY(progress) - getY(progress + 0.01),
      0,
    );
    return distortion.multiply(new THREE.Vector3(-0.03, -0.04, 0));
  },
};

export type HyperspeedProps = {
  effectOptions?: Partial<HyperspeedEffectOptions>;
  className?: string;
};

function mergeOptions(effectOptions?: Partial<HyperspeedEffectOptions>) {
  return {
    ...hyperspeedPresets.one,
    ...(effectOptions ?? {}),
    colors: {
      ...hyperspeedPresets.one.colors,
      ...(effectOptions?.colors ?? {}),
    },
  };
}

export default function Hyperspeed({
  effectOptions,
  className,
}: HyperspeedProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const appRef = useRef<{ dispose: () => void } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (appRef.current) {
      appRef.current.dispose();
      appRef.current = null;
      while (container.firstChild) container.removeChild(container.firstChild);
    }

    const options = mergeOptions(effectOptions);

    const scene = new THREE.Scene();
    const initW = Math.max(1, container.offsetWidth);
    const initH = Math.max(1, container.offsetHeight);

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setSize(initW, initH, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearAlpha(0);

    const camera = new THREE.PerspectiveCamera(
      options.fov,
      initW / initH,
      0.1,
      10000,
    );
    camera.position.set(0, 8, -5);

    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    const bloomPass = new EffectPass(
      camera,
      new BloomEffect({
        luminanceThreshold: 0.2,
        luminanceSmoothing: 0,
        resolutionScale: 1,
      }),
    );
    const smaaPass = new EffectPass(
      camera,
      new SMAAEffect({
        preset: SMAAPreset.MEDIUM,
      }),
    );

    renderPass.renderToScreen = false;
    bloomPass.renderToScreen = false;
    smaaPass.renderToScreen = true;
    composer.addPass(renderPass);
    composer.addPass(bloomPass);
    composer.addPass(smaaPass);

    container.appendChild(renderer.domElement);

    const fog = new THREE.Fog(
      options.colors.background,
      options.length * 0.2,
      options.length * 500,
    );
    scene.fog = fog;

    const roadOffset = options.roadWidth / 2 + options.islandWidth / 2;
    const roadGeo = new THREE.PlaneGeometry(options.roadWidth, options.length);
    const roadMat = new THREE.MeshBasicMaterial({
      color: options.colors.roadColor,
    });
    const islandGeo = new THREE.PlaneGeometry(
      options.islandWidth,
      options.length,
    );
    const islandMat = new THREE.MeshBasicMaterial({
      color: options.colors.islandColor,
    });

    const leftRoad = new THREE.Mesh(roadGeo, roadMat);
    leftRoad.rotation.x = -Math.PI / 2;
    leftRoad.position.set(-roadOffset, 0, -options.length / 2);
    scene.add(leftRoad);

    const rightRoad = new THREE.Mesh(roadGeo, roadMat);
    rightRoad.rotation.x = -Math.PI / 2;
    rightRoad.position.set(roadOffset, 0, -options.length / 2);
    scene.add(rightRoad);

    const island = new THREE.Mesh(islandGeo, islandMat);
    island.rotation.x = -Math.PI / 2;
    island.position.set(0, 0.001, -options.length / 2);
    scene.add(island);

    const streakGeo = new THREE.BoxGeometry(1, 1, 1);
    const streakMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
    });

    const laneWidth = options.roadWidth / options.lanesPerRoad;

    const makeCars = (
      xCenter: number,
      palette: number[],
      count: number,
      speedRange: [number, number],
    ) => {
      const mesh = new THREE.InstancedMesh(streakGeo, streakMat, count);
      mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      mesh.frustumCulled = false;

      const data: Array<{
        x: number;
        y: number;
        z: number;
        sx: number;
        sy: number;
        sz: number;
        speed: number;
      }> = [];
      const dummy = new THREE.Object3D();

      for (let i = 0; i < count; i++) {
        const laneIndex = i % options.lanesPerRoad;
        let laneX =
          laneIndex * laneWidth - options.roadWidth / 2 + laneWidth / 2;
        laneX += randomRange(options.carShiftX) * laneWidth;

        const radius = randomRange(options.carLightsRadius);
        const len = randomRange(options.carLightsLength);
        const speed = randomRange([
          Math.abs(speedRange[0]),
          Math.abs(speedRange[1]),
        ]);
        const y = randomRange(options.carFloorSeparation) + radius * 1.3;
        const z = -Math.random() * options.length;

        const item = {
          x: xCenter + laneX,
          y,
          z,
          sx: radius * 5,
          sy: radius * 5,
          sz: len * 0.15,
          speed,
        };
        data.push(item);

        mesh.setColorAt(i, new THREE.Color(pick(palette)));
        dummy.position.set(item.x, item.y, item.z);
        dummy.scale.set(item.sx, item.sy, item.sz);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      }

      mesh.instanceMatrix.needsUpdate = true;
      scene.add(mesh);
      return { mesh, data, dummy };
    };

    const makeSticks = (side: -1 | 1) => {
      const count = options.totalSideLightSticks;
      const mesh = new THREE.InstancedMesh(streakGeo, streakMat, count);
      mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      mesh.frustumCulled = false;

      const data: Array<{
        x: number;
        y: number;
        z: number;
        sx: number;
        sy: number;
        sz: number;
        speed: number;
      }> = [];
      const dummy = new THREE.Object3D();

      for (let i = 0; i < count; i++) {
        const width = randomRange(options.lightStickWidth) * 3;
        const height = randomRange(options.lightStickHeight) * 1.2;
        const x =
          side *
          (options.roadWidth +
            options.islandWidth / 2 +
            randomRange([0.25, 1.25]));
        const y = height / 2;
        const z = -Math.random() * options.length;
        const speed = randomRange([55, 80]);

        const item = { x, y, z, sx: width, sy: height, sz: 0.7, speed };
        data.push(item);

        mesh.setColorAt(i, new THREE.Color(options.colors.sticks));
        dummy.position.set(item.x, item.y, item.z);
        dummy.scale.set(item.sx, item.sy, item.sz);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      }

      mesh.instanceMatrix.needsUpdate = true;
      scene.add(mesh);
      return { mesh, data, dummy };
    };

    const leftCars = makeCars(
      -roadOffset,
      options.colors.leftCars,
      options.lightPairsPerRoadWay,
      options.movingAwaySpeed,
    );
    const rightCars = makeCars(
      roadOffset,
      options.colors.rightCars,
      options.lightPairsPerRoadWay,
      options.movingCloserSpeed,
    );
    const leftSticks = makeSticks(-1);
    const rightSticks = makeSticks(1);

    let raf = 0;
    let last = performance.now();
    const clock = new THREE.Clock();
    let speedTarget = 0;
    let speedValue = 0;
    let fovTarget = options.fov;

    const distortionFn =
      distortions[options.distortion] ?? distortions.turbulentDistortion;

    const onSpeedUp = (ev: MouseEvent | TouchEvent) => {
      const handler = options.onSpeedUp as
        | ((event: MouseEvent | TouchEvent) => void)
        | undefined;
      handler?.(ev);
      speedTarget = options.speedUp;
      fovTarget = options.fovSpeedUp;
    };

    const onSlowDown = (ev: MouseEvent | TouchEvent) => {
      const handler = options.onSlowDown as
        | ((event: MouseEvent | TouchEvent) => void)
        | undefined;
      handler?.(ev);
      speedTarget = 0;
      fovTarget = options.fov;
    };

    const resize = () => {
      const w = Math.max(1, container.offsetWidth);
      const h = Math.max(1, container.offsetHeight);
      renderer.setSize(w, h, false);
      composer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    container.addEventListener("mousedown", onSpeedUp);
    container.addEventListener("mouseup", onSlowDown);
    container.addEventListener("mouseleave", onSlowDown);
    container.addEventListener("touchstart", onSpeedUp, { passive: true });
    container.addEventListener("touchend", onSlowDown, { passive: true });
    container.addEventListener("touchcancel", onSlowDown, { passive: true });
    container.addEventListener("contextmenu", (e) => e.preventDefault());
    window.addEventListener("resize", resize);

    const updateInstances = (
      group: {
        mesh: THREE.InstancedMesh;
        data: Array<{
          x: number;
          y: number;
          z: number;
          sx: number;
          sy: number;
          sz: number;
          speed: number;
        }>;
        dummy: THREE.Object3D;
      },
      dt: number,
      accel: number,
    ) => {
      for (let i = 0; i < group.data.length; i++) {
        const d = group.data[i];
        d.z += d.speed * dt * accel;
        if (d.z > 8)
          d.z = -options.length - Math.random() * (options.length * 0.2);

        group.dummy.position.set(d.x, d.y, d.z);
        group.dummy.scale.set(d.sx, d.sy, d.sz);
        group.dummy.updateMatrix();
        group.mesh.setMatrixAt(i, group.dummy.matrix);
      }
      group.mesh.instanceMatrix.needsUpdate = true;
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
      last = now;
      const t = clock.getElapsedTime();

      speedValue = lerp(speedValue, speedTarget, 0.08);
      camera.fov = lerp(camera.fov, fovTarget, 0.06);
      camera.updateProjectionMatrix();

      const distortion = distortionFn(0.025, t);
      camera.lookAt(
        new THREE.Vector3(
          camera.position.x + distortion.x,
          camera.position.y + distortion.y,
          camera.position.z - 10,
        ),
      );

      const accel = 1 + speedValue;
      updateInstances(leftCars, dt, accel);
      updateInstances(rightCars, dt, accel);
      updateInstances(leftSticks, dt, accel);
      updateInstances(rightSticks, dt, accel);

      composer.render(dt);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    const dispose = () => {
      cancelAnimationFrame(raf);

      window.removeEventListener("resize", resize);
      container.removeEventListener("mousedown", onSpeedUp);
      container.removeEventListener("mouseup", onSlowDown);
      container.removeEventListener("mouseleave", onSlowDown);
      container.removeEventListener("touchstart", onSpeedUp);
      container.removeEventListener("touchend", onSlowDown);
      container.removeEventListener("touchcancel", onSlowDown);

      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (!(mesh as any).isMesh) return;
        mesh.geometry?.dispose();
        if (Array.isArray(mesh.material))
          mesh.material.forEach((m) => m.dispose());
        else mesh.material?.dispose();
      });
      composer.dispose();
      renderer.dispose();
      renderer.forceContextLoss();

      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };

    appRef.current = { dispose };

    return dispose;
  }, [effectOptions]);

  return <div id="lights" ref={containerRef} className={className} />;
}
