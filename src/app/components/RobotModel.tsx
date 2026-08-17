"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PresentationControls } from "@react-three/drei";
import * as THREE from "three";

function Robot() {
  const headRef = useRef<THREE.Group>(null);
  const torsoRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    // Make the head look at the mouse cursor
    // state.pointer gives normalized device coordinates (-1 to +1)
    if (headRef.current) {
      // Smoothly interpolate the rotation towards the mouse pointer
      const targetX = (state.pointer.y * Math.PI) / 4;
      const targetY = (state.pointer.x * Math.PI) / 3;
      
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -targetX, 0.1);
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetY, 0.1);
    }

    if (torsoRef.current) {
      // Subtle torso movement following the mouse
      const targetY = (state.pointer.x * Math.PI) / 8;
      torsoRef.current.rotation.y = THREE.MathUtils.lerp(torsoRef.current.rotation.y, targetY, 0.05);
    }
  });

  return (
    <group position={[0, -1, 0]}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <group ref={torsoRef}>
          {/* Torso */}
          <mesh position={[0, 0.5, 0]}>
            <boxGeometry args={[1.8, 2, 1.2]} />
            <meshStandardMaterial color="#6a6a7a" roughness={0.6} metalness={0.8} />
          </mesh>
          
          {/* Shoulders */}
          <mesh position={[-1.2, 1.2, 0]}>
            <sphereGeometry args={[0.4, 32, 32]} />
            <meshStandardMaterial color="#6a6a7a" roughness={0.3} metalness={1.0} />
          </mesh>
          <mesh position={[1.2, 1.2, 0]}>
            <sphereGeometry args={[0.4, 32, 32]} />
            <meshStandardMaterial color="#6a6a7a" roughness={0.3} metalness={1.0} />
          </mesh>

          {/* Neck joint */}
          <mesh position={[0, 1.6, 0]}>
            <cylinderGeometry args={[0.2, 0.3, 0.5, 16]} />
            <meshStandardMaterial color="#2a2a35" roughness={0.2} metalness={1.0} />
          </mesh>

          {/* Head Group (rotates independently) */}
          <group ref={headRef} position={[0, 2.2, 0]}>
            {/* Main Head */}
            <mesh>
              <boxGeometry args={[1.4, 1.2, 1.4]} />
              <meshStandardMaterial color="#6a6a7a" roughness={0.6} metalness={0.8} />
            </mesh>
            
            {/* Visor (Glowing Eye) */}
            <mesh position={[0, 0.1, 0.71]}>
              <boxGeometry args={[1.0, 0.3, 0.1]} />
              <meshStandardMaterial 
                color="#a0f0c8" 
                emissive="#a0f0c8" 
                emissiveIntensity={2} 
                toneMapped={false} 
              />
            </mesh>
            
            {/* Ear Antennas */}
            <mesh position={[-0.8, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.1, 0.1, 0.4, 16]} />
              <meshStandardMaterial color="#7b6ef6" emissive="#7b6ef6" emissiveIntensity={0.5} />
            </mesh>
            <mesh position={[0.8, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.1, 0.1, 0.4, 16]} />
              <meshStandardMaterial color="#7b6ef6" emissive="#7b6ef6" emissiveIntensity={0.5} />
            </mesh>
          </group>
        </group>
      </Float>
    </group>
  );
}

export default function RobotModel() {
  return (
    <div className="w-full h-full relative cursor-crosshair">
      <Canvas
        camera={{ position: [0, 1, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1.5} />
          
          {/* Main Front Light */}
          <directionalLight 
            position={[0, 2, 5]} 
            intensity={2.5} 
            color="#ffffff" 
          />
          
          {/* Key Light (Cyan) */}
          <directionalLight 
            position={[5, 5, 2]} 
            intensity={2.0} 
            color="#a0f0c8" 
          />
          
          {/* Fill Light (Purple) */}
          <directionalLight 
            position={[-5, 2, -2]} 
            intensity={2.0} 
            color="#7b6ef6" 
          />
          
          <PresentationControls
            global
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 1500 }}
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 2]}
          >
            <Robot />
          </PresentationControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
