import { useEffect, useRef } from "react";
import * as THREE from "three";

interface NeuralSceneProps {
  className?: string;
  particleColor?: string;
  lineColor?: string;
}

export default function NeuralScene({
  className = "",
  particleColor = "#5B4FCF",
  lineColor = "#C9A24B",
}: NeuralSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    animId: number;
  } | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- Scene setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 80;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // --- Nodes (neurons) ---
    const NODE_COUNT = 120;
    const RADIUS = 45;
    const nodePositions: THREE.Vector3[] = [];
    const nodeSpeeds: THREE.Vector3[] = [];
    const nodeGeom = new THREE.BufferGeometry();
    const posArr = new Float32Array(NODE_COUNT * 3);
    const colArr = new Float32Array(NODE_COUNT * 3);
    const sizeArr = new Float32Array(NODE_COUNT);

    const primaryCol = new THREE.Color(particleColor);
    const accentCol = new THREE.Color(lineColor);

    for (let i = 0; i < NODE_COUNT; i++) {
      // Spherical distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = RADIUS * (0.3 + 0.7 * Math.random());
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi) * 0.5;

      nodePositions.push(new THREE.Vector3(x, y, z));
      nodeSpeeds.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.04,
          (Math.random() - 0.5) * 0.04,
          (Math.random() - 0.5) * 0.02
        )
      );

      posArr[i * 3] = x;
      posArr[i * 3 + 1] = y;
      posArr[i * 3 + 2] = z;

      // Mix colors: mostly primary with some accent
      const mix = Math.random();
      const col = mix > 0.8 ? accentCol : primaryCol;
      colArr[i * 3] = col.r;
      colArr[i * 3 + 1] = col.g;
      colArr[i * 3 + 2] = col.b;

      sizeArr[i] = 1.2 + Math.random() * 2.5;
    }

    nodeGeom.setAttribute("position", new THREE.BufferAttribute(posArr, 3));
    nodeGeom.setAttribute("color", new THREE.BufferAttribute(colArr, 3));
    nodeGeom.setAttribute("size", new THREE.BufferAttribute(sizeArr, 1));

    const nodeMat = new THREE.PointsMaterial({
      size: 1.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const nodePoints = new THREE.Points(nodeGeom, nodeMat);
    scene.add(nodePoints);

    // --- Edges (axons) ---
    const CONNECT_DIST = 22;
    const edgePositions: number[] = [];
    const edgeColors: number[] = [];

    const accentR = accentCol.r;
    const accentG = accentCol.g;
    const accentB = accentCol.b;
    const primaryR = primaryCol.r;
    const primaryG = primaryCol.g;
    const primaryB = primaryCol.b;

    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        if (dist < CONNECT_DIST) {
          const alpha = 1 - dist / CONNECT_DIST;
          edgePositions.push(
            nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
            nodePositions[j].x, nodePositions[j].y, nodePositions[j].z
          );
          const useAccent = Math.random() > 0.6;
          edgeColors.push(
            useAccent ? accentR : primaryR, useAccent ? accentG : primaryG, useAccent ? accentB : primaryB,
            useAccent ? accentR : primaryR, useAccent ? accentG : primaryG, useAccent ? accentB : primaryB
          );
        }
      }
    }

    const edgeGeom = new THREE.BufferGeometry();
    edgeGeom.setAttribute("position", new THREE.BufferAttribute(new Float32Array(edgePositions), 3));
    edgeGeom.setAttribute("color", new THREE.BufferAttribute(new Float32Array(edgeColors), 3));

    const edgeMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const edgeLines = new THREE.LineSegments(edgeGeom, edgeMat);
    scene.add(edgeLines);

    // --- Pulse rings (synaptic fires) ---
    const pulseRings: { mesh: THREE.Mesh; age: number; maxAge: number; nodeIdx: number }[] = [];
    const ringGeom = new THREE.RingGeometry(0.5, 1.5, 16);
    const ringMat = new THREE.MeshBasicMaterial({
      color: accentCol,
      transparent: true,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    let lastPulse = 0;

    // --- Mouse parallax ---
    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // --- Animation ---
    let t = 0;
    const animate = () => {
      const animId = requestAnimationFrame(animate);
      sceneRef.current!.animId = animId;
      t += 0.008;

      // Rotate slowly
      nodePoints.rotation.y = t * 0.12 + mouseX * 0.3;
      nodePoints.rotation.x = Math.sin(t * 0.07) * 0.2 + mouseY * 0.2;
      edgeLines.rotation.y = nodePoints.rotation.y;
      edgeLines.rotation.x = nodePoints.rotation.x;

      // Pulse rings
      if (t - lastPulse > 0.3) {
        lastPulse = t;
        const idx = Math.floor(Math.random() * NODE_COUNT);
        const ring = new THREE.Mesh(ringGeom, ringMat.clone());
        const pos = nodePositions[idx];
        ring.position.set(pos.x, pos.y, pos.z);
        ring.lookAt(camera.position);
        scene.add(ring);
        pulseRings.push({ mesh: ring, age: 0, maxAge: 60 });
      }

      for (let i = pulseRings.length - 1; i >= 0; i--) {
        const p = pulseRings[i];
        p.age++;
        const progress = p.age / p.maxAge;
        p.mesh.scale.setScalar(1 + progress * 5);
        (p.mesh.material as THREE.MeshBasicMaterial).opacity = 0.6 * (1 - progress);
        if (p.age >= p.maxAge) {
          scene.remove(p.mesh);
          pulseRings.splice(i, 1);
        }
      }

      // Camera breathe
      camera.position.z = 80 + Math.sin(t * 0.3) * 3;

      renderer.render(scene, camera);
    };

    sceneRef.current = { renderer, animId: 0 };
    animate();

    // --- Resize ---
    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(sceneRef.current!.animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [particleColor, lineColor]);

  return <div ref={mountRef} className={`w-full h-full ${className}`} />;
}
