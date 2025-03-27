"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

// --- BoxWithEdges Component (unchanged) ---
interface BoxWithEdgesProps {
  position: [number, number, number];
}

const BoxWithEdges: React.FC<BoxWithEdgesProps> = ({ position }) => {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshPhysicalMaterial
          color="#F4E1C1"
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.9}
          transmission={0.5}
          clearcoat={1}
        />
      </mesh>
      <lineSegments>
        {/* A slightly darker sand/brown for the edges */}
        <edgesGeometry args={[new THREE.BoxGeometry(0.5, 0.5, 0.5)]} />
        <lineBasicMaterial color="#A68B6C" linewidth={2} />
      </lineSegments>
    </group>
  );
};

// --- BoxLetter Component ---
// (Updated to include "S" if needed in the allowed type)
type Letter = "N" | "E" | "X" | "T" | "C" | "A" | "V" | "I" | "U" | "R" | "S";

interface BoxLetterProps {
  letter: Letter;
  position: [number, number, number];
}

const BoxLetter: React.FC<BoxLetterProps> = ({ letter, position }) => {
  // Define the shape for each letter.
  const getLetterShape = (letter: Letter): number[][] => {
    const shapes: Record<string, number[][]> = {
      N: [
        [1, 0, 0, 0, 1],
        [1, 1, 0, 0, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 0, 1, 1],
        [1, 0, 0, 0, 1],
      ],
      E: [
        [1, 1, 1],
        [1, 0, 0],
        [1, 1, 0],
        [1, 0, 0],
        [1, 1, 1],
      ],
      X: [
        [1, 0, 0, 0, 1],
        [0, 1, 0, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 0, 1, 0],
        [1, 0, 0, 0, 1],
      ],
      T: [
        [1, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
      ],
      C: [
        [1, 1, 1],
        [1, 0, 0],
        [1, 0, 0],
        [1, 0, 0],
        [1, 1, 1],
      ],
      A: [
        [0, 1, 0],
        [1, 0, 1],
        [1, 1, 1],
        [1, 0, 1],
        [1, 0, 1],
      ],
      V: [
        [1, 0, 1],
        [1, 0, 1],
        [1, 0, 1],
        [1, 0, 1],
        [0, 1, 0],
      ],
      I: [
        [1, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 1],
      ],
      U: [
        [1, 0, 1],
        [1, 0, 1],
        [1, 0, 1],
        [1, 0, 1],
        [1, 1, 1],
      ],
      R: [
        [1, 1, 0],
        [1, 0, 1],
        [1, 1, 0],
        [1, 0, 1],
        [1, 0, 1],
      ],
      S: [
        [1, 1, 1],
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
        [1, 1, 1],
      ],
    };
    return shapes[letter] || shapes["N"];
  };

  const letterShape = getLetterShape(letter);

  return (
    <group position={position}>
      {letterShape.map((row: number[], i: number) =>
        row.map((cell, j) => {
          if (cell) {
            let xOffset = j * 0.5 - 1; // adjust offset for centering
            return (
              <BoxWithEdges
                key={`${i}-${j}`}
                position={[xOffset, (4 - i) * 0.5 - 1, 0]}
              />
            );
          }
          return null;
        })
      )}
    </group>
  );
};

// --- Scene Component ---
const Scene = () => {
  // Create a ref for OrbitControls
  const orbitControlsRef = useRef<OrbitControlsImpl | null>(null);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    setIsMobileDevice(isMobile());
  }, []);

  return (
    <>
      {/* Render "EVENTS" centered as a single row */}
      <group position={[0, 0, 0]} rotation={[0, Math.PI / 1.5, 0]}>
        <BoxLetter letter="E" position={[-7.5, 1, 0]} />
        <BoxLetter letter="V" position={[-4.5, 1, 0]} />
        <BoxLetter letter="E" position={[-1.5, 1, 0]} />
        <BoxLetter letter="N" position={[1.5, 1, 0]} />
        <BoxLetter letter="T" position={[4.5, 1, 0]} />
        <BoxLetter letter="S" position={[7.5, 1, 0]} />
      </group>
      <OrbitControls
        ref={orbitControlsRef}
        enableZoom
        enablePan
        enableRotate
        autoRotate
        autoRotateSpeed={2}
      />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
    </>
  );
};

// --- Main Component ---
export default function Component() {
  return (
    <div className="w-full h-[40vh] bg-white">
      <Canvas camera={{ position: [15, 0, -20], fov: 50 }}>
        <Scene />
      </Canvas>
    </div>
  );
}

// --- Helper function ---
function isMobile() {
  if (typeof window === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}
