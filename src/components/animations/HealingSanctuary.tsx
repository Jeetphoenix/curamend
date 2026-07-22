import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  SoftShadows,
  MeshReflectorMaterial,
} from "@react-three/drei";
import * as THREE from "three";

// --- Components ---

function Chair({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  const woodMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#5c4033", roughness: 0.8 }), []);
  const fabricMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#2d3748", roughness: 0.9 }), []);

  return (
    <group position={position} rotation={rotation}>
      {/* Seat */}
      <mesh position={[0, 1.2, 0]} material={fabricMaterial} castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.2, 1.4]} />
      </mesh>
      {/* Backrest */}
      <mesh position={[0, 2.2, -0.6]} material={fabricMaterial} castShadow receiveShadow>
        <boxGeometry args={[1.4, 1.8, 0.2]} />
      </mesh>
      {/* Legs */}
      {[-0.6, 0.6].map((x, i) =>
        [-0.6, 0.6].map((z, j) => (
          <mesh key={`${i}-${j}`} position={[x, 0.6, z]} material={woodMaterial} castShadow receiveShadow>
            <cylinderGeometry args={[0.08, 0.05, 1.2, 8]} />
          </mesh>
        ))
      )}
    </group>
  );
}

function PottedPlant({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Pot */}
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.6, 0.4, 1.2, 16]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.7} />
      </mesh>
      {/* Leaves (abstracted as a cluster of spheres) */}
      <mesh position={[0, 1.8, 0]} castShadow receiveShadow>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#2f855a" roughness={0.9} />
      </mesh>
      <mesh position={[0.5, 1.4, 0.5]} castShadow receiveShadow>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial color="#276749" roughness={0.9} />
      </mesh>
      <mesh position={[-0.4, 1.5, -0.6]} castShadow receiveShadow>
        <sphereGeometry args={[0.7, 16, 16]} />
        <meshStandardMaterial color="#22543d" roughness={0.9} />
      </mesh>
    </group>
  );
}

function SessionRoom() {
  const numChairs = 10;
  const radius = 5;
  const chairs = [];

  for (let i = 0; i < numChairs; i++) {
    const angle = (i / numChairs) * Math.PI * 2;
    // Position them in a circle
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    // Rotate to face the center (0,0,0). The chair naturally faces +Z, so we rotate by -angle - PI/2
    chairs.push(
      <Chair
        key={`chair-${i}`}
        position={[x, 0, z]}
        rotation={[0, -angle - Math.PI / 2, 0]}
      />
    );
  }

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <MeshReflectorMaterial
          blur={[400, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={15}
          roughness={0.6}
          depthScale={1}
          color="#3e2723" // Dark wood floor
          metalness={0.2}
          mirror={1}
        />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 12, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#f7fafc" roughness={1} />
      </mesh>

      {/* Walls */}
      {/* Back Wall */}
      <mesh position={[0, 6, -15]} receiveShadow>
        <boxGeometry args={[30, 12, 1]} />
        <meshStandardMaterial color="#edf2f7" roughness={0.9} />
      </mesh>
      {/* Front Wall */}
      <mesh position={[0, 6, 15]} receiveShadow>
        <boxGeometry args={[30, 12, 1]} />
        <meshStandardMaterial color="#edf2f7" roughness={0.9} />
      </mesh>
      {/* Left Wall */}
      <mesh position={[-15, 6, 0]} receiveShadow>
        <boxGeometry args={[1, 12, 30]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.9} />
      </mesh>
      {/* Right Wall (with Window) */}
      <group position={[15, 6, 0]}>
        {/* Wall segments around window */}
        <mesh position={[0, -3, 0]} receiveShadow>
          <boxGeometry args={[1, 6, 30]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.9} />
        </mesh>
        <mesh position={[0, 4.5, 0]} receiveShadow>
          <boxGeometry args={[1, 3, 30]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.9} />
        </mesh>
        <mesh position={[0, 1.5, -10]} receiveShadow>
          <boxGeometry args={[1, 6, 10]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.9} />
        </mesh>
        <mesh position={[0, 1.5, 10]} receiveShadow>
          <boxGeometry args={[1, 6, 10]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.9} />
        </mesh>
        
        {/* The Window pane */}
        <mesh position={[-0.4, 1.5, 0]}>
          <planeGeometry args={[10, 6]} />
          <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
        </mesh>
        {/* Window Light coming in */}
        <rectAreaLight
          width={10}
          height={6}
          color="#ffffff"
          intensity={5}
          position={[-0.5, 1.5, 0]}
          rotation={[0, -Math.PI / 2, 0]}
        />
      </group>

      {/* Center Rug */}
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <cylinderGeometry args={[6, 6, 0.05, 64]} />
        <meshStandardMaterial color="#4a5568" roughness={1} />
      </mesh>

      {/* Center Coffee Table */}
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.5, 1.5, 1.2, 32]} />
        <meshStandardMaterial color="#2d3748" roughness={0.5} />
      </mesh>
      
      {/* Candle on table */}
      <group position={[0, 1.3, 0]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.2, 0.2, 0.4, 16]} />
          <meshStandardMaterial color="#fffff0" />
        </mesh>
        <pointLight position={[0, 0.5, 0]} color="#ffaa00" intensity={2} distance={10} castShadow />
      </group>

      {/* Chairs */}
      {chairs}

      {/* Plants */}
      <PottedPlant position={[-12, 0, -12]} />
      <PottedPlant position={[-12, 0, 12]} />
      <PottedPlant position={[12, 0, -12]} />

      {/* Main Room Lighting */}
      <ambientLight intensity={0.4} />
      {/* Ceiling Light */}
      <spotLight
        position={[0, 11, 0]}
        angle={Math.PI / 3}
        penumbra={0.8}
        intensity={3}
        castShadow
        shadow-bias={-0.0001}
      />
    </group>
  );
}

export default function HealingSanctuary({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full h-full relative cursor-grab active:cursor-grabbing ${className}`}>
      {/* The canvas represents the Session Hall Simulation */}
      <Canvas shadows camera={{ position: [0, 5, 10], fov: 60 }}>
        <SoftShadows size={15} samples={16} focus={0.5} />
        <color attach="background" args={["#000000"]} />
        
        <SessionRoom />

        {/* Orbit controls restricted so user stays inside the room */}
        <OrbitControls
          makeDefault
          enablePan={false}
          enableZoom={true}
          minDistance={1}
          maxDistance={12}      // Can't zoom out past walls
          minPolarAngle={Math.PI / 6} // Don't look straight down through ceiling
          maxPolarAngle={Math.PI / 2 - 0.05} // Don't look under floor
          target={[0, 3, 0]}    // Look at center of the room
        />
      </Canvas>
      
      {/* Overlay UI to guide interaction */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none flex items-center gap-2 rounded-full bg-black/60 px-5 py-3 backdrop-blur-md border border-white/20 shadow-xl">
        <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
        <p className="font-ui text-xs uppercase tracking-widest text-white">Walkaround the Session Hall (Drag & Zoom)</p>
      </div>
    </div>
  );
}
