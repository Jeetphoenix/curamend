import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import gsap from "gsap";
import { useSmoothScroll } from "./SmoothScrollProvider";

const PARTICLE_COUNT = 3000;
const RADIUS = 6;
const MAX_DISTANCE = 1.2;
const MAX_CONNECTIONS = 2; // Keep low for performance

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  const { isReducedMotion } = useSmoothScroll();
  const { mouse, camera } = useThree();

  const [positions, colors, originalPositions] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const origPos = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);
    
    const colorGold = new THREE.Color("#C9A24B");
    const colorViolet = new THREE.Color("#4B3F72");

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * RADIUS;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      
      origPos[i * 3] = x;
      origPos[i * 3 + 1] = y;
      origPos[i * 3 + 2] = z;

      const color = Math.random() < 0.6 ? colorGold : colorViolet;
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    return [pos, col, origPos];
  }, []);

  const linePositions = useMemo(() => new Float32Array(PARTICLE_COUNT * MAX_CONNECTIONS * 6), []);
  const lineColors = useMemo(() => new Float32Array(PARTICLE_COUNT * MAX_CONNECTIONS * 6), []);

  useEffect(() => {
    if (groupRef.current && !isReducedMotion) {
      gsap.fromTo(groupRef.current.scale, 
        { x: 0.3, y: 0.3, z: 0.3 }, 
        { x: 1, y: 1, z: 1, duration: 1.8, ease: "power3.out" }
      );
      
      const ptsMat = pointsRef.current?.material as THREE.PointsMaterial;
      const lineMat = linesRef.current?.material as THREE.LineBasicMaterial;
      
      if (ptsMat) {
        gsap.fromTo(ptsMat, { opacity: 0 }, { opacity: 1, duration: 1.8, ease: "power3.out" });
      }
      if (lineMat) {
        gsap.fromTo(lineMat, { opacity: 0 }, { opacity: 0.15, duration: 1.8, ease: "power3.out" });
      }
    }
  }, [isReducedMotion]);

  let frameCount = 0;

  useFrame((state) => {
    if (isReducedMotion) return;
    frameCount++;
    const time = state.clock.getElapsedTime();
    
    // Parallax
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 0.3, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.y * 0.3, 0.05);
    camera.lookAt(0, 0, 0);

    if (pointsRef.current) {
      const posAttr = pointsRef.current.geometry.attributes.position;
      const posArray = posAttr.array as Float32Array;

      // Drift
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const ox = originalPositions[i * 3];
        const oy = originalPositions[i * 3 + 1];
        const oz = originalPositions[i * 3 + 2];

        posArray[i * 3] = ox + Math.sin(time * 0.1 + i) * 0.4;
        posArray[i * 3 + 1] = oy + Math.sin(time * 0.1 + i + 1) * 0.4;
        posArray[i * 3 + 2] = oz + Math.sin(time * 0.1 + i + 2) * 0.4;
      }
      posAttr.needsUpdate = true;

      // Lines
      if (frameCount % 10 === 0 && linesRef.current) {
        let vertexPos = 0;
        let colorPos = 0;
        
        const checkLimit = 150;
        
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          let connections = 0;
          for (let j = i + 1; j < Math.min(i + checkLimit, PARTICLE_COUNT); j++) {
            const dx = posArray[i * 3] - posArray[j * 3];
            const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
            const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
            const distSq = dx * dx + dy * dy + dz * dz;

            if (distSq < MAX_DISTANCE * MAX_DISTANCE) {
              linePositions[vertexPos++] = posArray[i * 3];
              linePositions[vertexPos++] = posArray[i * 3 + 1];
              linePositions[vertexPos++] = posArray[i * 3 + 2];

              linePositions[vertexPos++] = posArray[j * 3];
              linePositions[vertexPos++] = posArray[j * 3 + 1];
              linePositions[vertexPos++] = posArray[j * 3 + 2];
              
              lineColors[colorPos++] = colors[i * 3];
              lineColors[colorPos++] = colors[i * 3 + 1];
              lineColors[colorPos++] = colors[i * 3 + 2];
              
              lineColors[colorPos++] = colors[j * 3];
              lineColors[colorPos++] = colors[j * 3 + 1];
              lineColors[colorPos++] = colors[j * 3 + 2];

              connections++;
              if (connections >= MAX_CONNECTIONS) break;
            }
          }
        }

        const linesGeom = linesRef.current.geometry;
        linesGeom.setDrawRange(0, vertexPos / 3);
        const lPosAttr = linesGeom.attributes.position as THREE.BufferAttribute;
        const lColAttr = linesGeom.attributes.color as THREE.BufferAttribute;
        
        for(let k=0; k < vertexPos; k++) { lPosAttr.array[k] = linePositions[k]; }
        for(let k=0; k < colorPos; k++) { lColAttr.array[k] = lineColors[k]; }
        
        lPosAttr.needsUpdate = true;
        lColAttr.needsUpdate = true;
      }
      
      // Pulse
      if (linesRef.current) {
        const mat = linesRef.current.material as THREE.LineBasicMaterial;
        mat.opacity = 0.1 + (Math.sin(time * (2 * Math.PI / 4)) + 1) * 0.1;
      }
    }
  });

  return (
    <group ref={groupRef} position={[2, 0, -5]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={PARTICLE_COUNT} array={colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.06} vertexColors transparent depthWrite={false} />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={linePositions.length / 3} array={new Float32Array(linePositions.length)} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={lineColors.length / 3} array={new Float32Array(lineColors.length)} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </lineSegments>
    </group>
  );
}

export default function HeroScene() {
  const { isReducedMotion } = useSmoothScroll();

  if (isReducedMotion) {
    return <div className="absolute inset-0 bg-gradient-cosmic" />;
  }

  return (
    <div className="absolute inset-0 z-0">
      <Canvas 
        dpr={[1, 1.5]} 
        camera={{ fov: 50, position: [0, 0, 8] }} 
        gl={{ antialias: false, alpha: true }}
      >
        <ParticleField />
        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={0.2} mipmapBlur intensity={0.4} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
