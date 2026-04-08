"use client";

import * as React from "react";
import * as THREE from "three";

type Colors = {
  roadColor: number;
  islandColor: number;
  background: number;
  shoulderLines: number;
  brokenLines: number;
  leftCars: number[];
  rightCars: number[];
  sticks: number;
};

export type HyperspeedOptions = {
  onSpeedUp?: (ev: MouseEvent | TouchEvent) => void;
  onSlowDown?: (ev: MouseEvent | TouchEvent) => void;
  distortion?: unknown;
  length: number;
  roadWidth: number;
  islandWidth: number;
  lanesPerRoad: number;
  fov: number;
  fovSpeedUp: number;
  speedUp: number;
  carLightsFade: number;
  totalSideLightSticks: number;
  lightPairsPerRoadWay: number;
  shoulderLinesWidthPercentage: number;
  brokenLinesWidthPercentage: number;
  brokenLinesLengthPercentage: number;
  lightStickWidth: [number, number];
  lightStickHeight: [number, number];
  movingAwaySpeed: [number, number];
  movingCloserSpeed: [number, number];
  carLightsLength: [number, number];
  carLightsRadius: [number, number];
  carWidthPercentage: [number, number];
  carShiftX: [number, number];
  carFloorSeparation: [number, number];
  carArray?: Array<{ mesh: string; material: string }>;
  colors: Colors;
  isHyper?: boolean;
  [key: string]: unknown;
};

export type HyperspeedProps = {
  effectOptions?: Partial<HyperspeedOptions>;
  className?: string;
};

type InstanceData = {
  x: number;
  y: number;
  z: number;
  speed: number;
  sx: number;
  sy: number;
  sz: number;
};

const DEFAULT_OPTIONS: HyperspeedOptions = {
  onSpeedUp: () => {},
  onSlowDown: () => {},
  distortion: undefined,
  length: 400,
  roadWidth: 9,
  islandWidth: 2,
  lanesPerRoad: 4,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2,
  carLightsFade: 0.4,
  totalSideLightSticks: 20,
  lightPairsPerRoadWay: 40,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.5],
  lightStickHeight: [1.3, 1.7],
  movingAwaySpeed: [60, 80],
  movingCloserSpeed: [-120, -160],
  carLightsLength: [400 * 0.03, 400 * 0.2],
  carLightsRadius: [0.05, 0.14],
  carWidthPercentage: [0.3, 0.5],
  carShiftX: [-0.8, 0.8],
  carFloorSeparation: [0, 5],
  carArray: [],
  colors: {
    roadColor: 0x080808,
    islandColor: 0x0a0a0a,
    background: 0x040714,
    shoulderLines: 0x131318,
    brokenLines: 0x131318,
    leftCars: [0x00e5ff, 0xcc00ff, 0x4400ff],
    rightCars: [0xff4444, 0xff7700, 0xffaa00],
    sticks: 0x00e5ff,
  },
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function lerp(current: number, target: number, alpha: number) {
  return current + (target - current) * alpha;
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function randomRange(range: [number, number]) {
  const [a, b] = range;
  return randomBetween(Math.min(a, b), Math.max(a, b));
}

function pick<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function mergeOptions(
  effectOptions?: Partial<HyperspeedOptions>,
): HyperspeedOptions {
  return {
    ...DEFAULT_OPTIONS,
    ...effectOptions,
    colors: {
      ...DEFAULT_OPTIONS.colors,
      ...(effectOptions?.colors ?? {}),
    },
  };
}

export function Hyperspeed({ effectOptions, className }: HyperspeedProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const appRef = React.useRef<{ dispose: () => void } | null>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const options = mergeOptions(effectOptions);

    // Tear down any previous instance.
    if (appRef.current) {
      appRef.current.dispose();
      appRef.current = null;
    }

    const scene = new THREE.Scene();

    const initWidth = Math.max(1, container.clientWidth);
    const initHeight = Math.max(1, container.clientHeight);

    const camera = new THREE.PerspectiveCamera(
      options.fov,
      initWidth / initHeight,
      0.1,
      Math.max(1000, options.length * 4),
    );
    camera.position.set(0, 6.5, 10);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(initWidth, initHeight, false);
    renderer.setClearColor(new THREE.Color(options.colors.background), 1);

    container.appendChild(renderer.domElement);

    const roadOffset = options.roadWidth / 2 + options.islandWidth / 2;

    // Road planes
    const roadGeo = new THREE.PlaneGeometry(options.roadWidth, options.length);
    const roadMat = new THREE.MeshBasicMaterial({
      color: options.colors.roadColor,
    });

    const leftRoad = new THREE.Mesh(roadGeo, roadMat);
    leftRoad.rotation.x = -Math.PI / 2;
    leftRoad.position.set(-roadOffset, 0, -options.length / 2);
    scene.add(leftRoad);

    const rightRoad = new THREE.Mesh(roadGeo, roadMat);
    rightRoad.rotation.x = -Math.PI / 2;
    rightRoad.position.set(roadOffset, 0, -options.length / 2);
    scene.add(rightRoad);

    const islandGeo = new THREE.PlaneGeometry(
      options.islandWidth,
      options.length,
    );
    const islandMat = new THREE.MeshBasicMaterial({
      color: options.colors.islandColor,
    });
    const island = new THREE.Mesh(islandGeo, islandMat);
    island.rotation.x = -Math.PI / 2;
    island.position.set(0, 0.001, -options.length / 2);
    scene.add(island);

    // Additive streak material (glow-like)
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

    function makeCarLights(
      roadCenterX: number,
      palette: number[],
      count: number,
    ) {
      const mesh = new THREE.InstancedMesh(streakGeo, streakMat, count);
      mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      mesh.frustumCulled = false;

      const data: InstanceData[] = [];
      const dummy = new THREE.Object3D();

      const radiusRange = options.carLightsRadius;
      const lengthRange = options.carLightsLength;
      const speedBaseRange: [number, number] = [
        Math.abs(
          Math.min(...options.movingAwaySpeed, ...options.movingCloserSpeed),
        ),
        Math.abs(
          Math.max(...options.movingAwaySpeed, ...options.movingCloserSpeed),
        ),
      ];

      for (let i = 0; i < count; i++) {
        const laneIndex = Math.floor(Math.random() * options.lanesPerRoad);
        let laneX =
          laneIndex * laneWidth - options.roadWidth / 2 + laneWidth / 2;
        laneX += randomRange(options.carShiftX) * laneWidth;

        const radius = randomRange(radiusRange);
        const lightLen = randomRange(lengthRange);

        const x = roadCenterX + laneX;
        const y =
          0.35 +
          randomBetween(0, 1.8) +
          randomRange(options.carFloorSeparation) * 0.03;
        const z = -randomBetween(0, options.length);

        const speed = randomRange(speedBaseRange);

        const instance: InstanceData = {
          x,
          y,
          z,
          speed,
          sx: radius * 5,
          sy: radius * 5,
          sz: lightLen * 0.15,
        };
        data.push(instance);

        mesh.setColorAt(i, new THREE.Color(pick(palette)));

        dummy.position.set(instance.x, instance.y, instance.z);
        dummy.scale.set(instance.sx, instance.sy, instance.sz);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      }

      mesh.instanceMatrix.needsUpdate = true;
      mesh.instanceColor!.needsUpdate = true;
      scene.add(mesh);

      return { mesh, data, dummy };
    }

    function makeSideSticks(side: -1 | 1) {
      const count = options.totalSideLightSticks;
      const mesh = new THREE.InstancedMesh(streakGeo, streakMat, count);
      mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      mesh.frustumCulled = false;

      const data: InstanceData[] = [];
      const dummy = new THREE.Object3D();

      for (let i = 0; i < count; i++) {
        const width = randomRange(options.lightStickWidth) * 3;
        const height = randomRange(options.lightStickHeight) * 1.2;

        const x =
          side *
          (options.roadWidth +
            options.islandWidth / 2 +
            randomBetween(0.25, 1.25));
        const y = height / 2;
        const z = -randomBetween(0, options.length);

        const speed = randomBetween(55, 80);

        const instance: InstanceData = {
          x,
          y,
          z,
          speed,
          sx: width,
          sy: height,
          sz: 0.7,
        };
        data.push(instance);

        mesh.setColorAt(i, new THREE.Color(options.colors.sticks));

        dummy.position.set(instance.x, instance.y, instance.z);
        dummy.scale.set(instance.sx, instance.sy, instance.sz);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      }

      mesh.instanceMatrix.needsUpdate = true;
      mesh.instanceColor!.needsUpdate = true;
      scene.add(mesh);

      return { mesh, data, dummy };
    }

    const leftLights = makeCarLights(
      -roadOffset,
      options.colors.leftCars,
      options.lightPairsPerRoadWay,
    );
    const rightLights = makeCarLights(
      roadOffset,
      options.colors.rightCars,
      options.lightPairsPerRoadWay,
    );
    const leftSticks = makeSideSticks(-1);
    const rightSticks = makeSideSticks(1);

    // Camera target
    const lookAt = new THREE.Vector3(0, 1.2, -options.length * 0.25);

    let raf = 0;
    let last = performance.now();
    let speedTarget = 0;
    let speedValue = 0;

    const baseTravel = options.length;

    const onPointerDown = (ev: MouseEvent | TouchEvent) => {
      options.onSpeedUp?.(ev);
      speedTarget = options.speedUp;
    };

    const onPointerUp = (ev: MouseEvent | TouchEvent) => {
      options.onSlowDown?.(ev);
      speedTarget = 0;
    };

    const onContextMenu = (ev: MouseEvent) => {
      ev.preventDefault();
    };

    container.addEventListener("mousedown", onPointerDown);
    container.addEventListener("mouseup", onPointerUp);
    container.addEventListener("mouseleave", onPointerUp);
    container.addEventListener("touchstart", onPointerDown, { passive: true });
    container.addEventListener("touchend", onPointerUp, { passive: true });
    container.addEventListener("touchcancel", onPointerUp, { passive: true });
    container.addEventListener("contextmenu", onContextMenu);

    const resize = () => {
      const width = Math.max(1, container.clientWidth);
      const height = Math.max(1, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", resize);

    const tick = (now: number) => {
      const dt = clamp((now - last) / 1000, 0, 0.05);
      last = now;

      speedValue = lerp(speedValue, speedTarget, 0.08);

      const fovTarget = speedTarget > 0 ? options.fovSpeedUp : options.fov;
      camera.fov = lerp(camera.fov, fovTarget, 0.06);
      camera.updateProjectionMatrix();

      // subtle camera sway
      const t = now * 0.0002;
      camera.position.x = Math.sin(t) * 0.6;
      camera.position.y = 6.5 + Math.cos(t * 0.7) * 0.25;
      camera.lookAt(lookAt);

      const travel = baseTravel;
      const accel = 1 + speedValue;

      const updateInstanced = (group: {
        mesh: THREE.InstancedMesh;
        data: InstanceData[];
        dummy: THREE.Object3D;
      }) => {
        for (let i = 0; i < group.data.length; i++) {
          const d = group.data[i];
          d.z += d.speed * dt * accel;
          if (d.z > 12) {
            d.z = -travel - randomBetween(0, travel * 0.2);
          }
          group.dummy.position.set(d.x, d.y, d.z);
          group.dummy.scale.set(d.sx, d.sy, d.sz);
          group.dummy.updateMatrix();
          group.mesh.setMatrixAt(i, group.dummy.matrix);
        }
        group.mesh.instanceMatrix.needsUpdate = true;
      };

      updateInstanced(leftLights);
      updateInstanced(rightLights);
      updateInstanced(leftSticks);
      updateInstanced(rightSticks);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    const dispose = () => {
      cancelAnimationFrame(raf);

      window.removeEventListener("resize", resize);

      container.removeEventListener("mousedown", onPointerDown);
      container.removeEventListener("mouseup", onPointerUp);
      container.removeEventListener("mouseleave", onPointerUp);
      container.removeEventListener("touchstart", onPointerDown);
      container.removeEventListener("touchend", onPointerUp);
      container.removeEventListener("touchcancel", onPointerUp);
      container.removeEventListener("contextmenu", onContextMenu);

      scene.traverse((obj) => {
        const mesh = obj as unknown as THREE.Mesh;
        if ((mesh as any).isMesh) {
          if (mesh.geometry) mesh.geometry.dispose();
          const mat = mesh.material as unknown;
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
          else (mat as THREE.Material | undefined)?.dispose();
        }
      });

      renderer.dispose();
      renderer.forceContextLoss();
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };

    appRef.current = { dispose };

    return dispose;
  }, [effectOptions]);

  return (
    <div
      ref={containerRef}
      className={className ?? "h-full w-full"}
      style={{ touchAction: "none" }}
    />
  );
}
