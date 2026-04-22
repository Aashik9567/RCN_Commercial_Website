"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function rand01(seed: number) {
  let t = seed >>> 0;
  t = Math.imul(t ^ (t >>> 16), 0x7feb352d);
  t = Math.imul(t ^ (t >>> 15), 0x846ca68b);
  t = (t ^ (t >>> 16)) >>> 0;
  return t / 4294967296;
}

type Point = { position: THREE.Vector3; color: THREE.Color };

function Globe() {
  const globeRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  const points = useMemo<Point[]>(() => {
    return Array.from({ length: 520 }, (_, i) => {
      const u = rand01(i * 2 + 1);
      const v = rand01(i * 2 + 2);
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = 2.05;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.sin(theta);

      const color = new THREE.Color(i % 3 === 0 ? "#00e5ff" : "#a78bfa");
      return { position: new THREE.Vector3(x, y, z), color };
    });
  }, []);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(points.length * 3);
    const colors = new Float32Array(points.length * 3);

    points.forEach((p, i) => {
      positions[i * 3 + 0] = p.position.x;
      positions[i * 3 + 1] = p.position.y;
      positions[i * 3 + 2] = p.position.z;

      colors[i * 3 + 0] = p.color.r;
      colors[i * 3 + 1] = p.color.g;
      colors[i * 3 + 2] = p.color.b;
    });

    return { positions, colors };
  }, [points]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (globeRef.current) {
      globeRef.current.rotation.y = t * 0.12;
      globeRef.current.rotation.x = Math.sin(t * 0.15) * 0.08;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.14;
    }
  });

  return (
    <group>
      <mesh ref={globeRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          color={new THREE.Color("#0b1229")}
          emissive={new THREE.Color("#0b1229")}
          emissiveIntensity={0.3}
          metalness={0.6}
          roughness={0.5}
          transparent
          opacity={0.55}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[2.02, 64, 64]} />
        <meshBasicMaterial
          color={new THREE.Color("#ffffff")}
          wireframe
          opacity={0.12}
          transparent
        />
      </mesh>

      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          vertexColors
          transparent
          opacity={0.9}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export function NetworkGlobe3D({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 55 }}
        gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.35} />
        <pointLight position={[6, 3, 6]} intensity={1.6} color="#00e5ff" />
        <pointLight position={[-6, -3, -6]} intensity={1.2} color="#7c3aed" />

        <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.3}>
          <Globe />
        </Float>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.6}
        />
      </Canvas>
    </div>
  );
}
