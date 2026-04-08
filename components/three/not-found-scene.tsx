"use client";

import * as React from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";

function WifiMark() {
  const groupRef = React.useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const g = groupRef.current;
    if (!g) return;
    g.rotation.y = clock.getElapsedTime() * 0.25;
    g.rotation.x = Math.sin(clock.getElapsedTime() * 0.6) * 0.08;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.8}>
      <group ref={groupRef}>
        {/* Dot */}
        <mesh position={[0, -0.55, 0]}>
          <sphereGeometry args={[0.12, 32, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#22d3ee"
            emissiveIntensity={0.75}
            roughness={0.25}
            metalness={0.1}
          />
        </mesh>

        {/* Arcs */}
        {[0.38, 0.58, 0.78].map((radius, i) => (
          <mesh key={radius} position={[0, -0.35 + i * 0.22, 0]}>
            <torusGeometry args={[radius, 0.045, 24, 120, Math.PI]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#a78bfa"
              emissiveIntensity={0.55}
              roughness={0.28}
              metalness={0.15}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

export default function NotFoundScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0.15, 2.8], fov: 42 }}
      gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.85} />
      <directionalLight position={[3, 3, 2]} intensity={1.25} />
      <pointLight position={[-2, -1, 2]} intensity={0.8} />

      <WifiMark />
    </Canvas>
  );
}
