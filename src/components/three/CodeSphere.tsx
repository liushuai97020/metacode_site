import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* 3D 代码球体 — 经纬网格 + 流动粒子 + 内核光晕（无外部依赖）*/
export default function CodeSphere() {
  const groupRef = useRef<THREE.Group>(null);

  /* 经纬线 */
  const rings = useMemo(() => {
    const res: THREE.Vector3[][] = [];
    const r = 1.35;
    const seg = 28;
    for (let i = 0; i <= seg; i++) {
      const phi = (i / seg) * Math.PI;
      const ring: THREE.Vector3[] = [];
      for (let j = 0; j <= seg * 2; j++) {
        const theta = (j / (seg * 2)) * Math.PI * 2;
        ring.push(new THREE.Vector3(r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta)));
      }
      res.push(ring);
    }
    for (let j = 0; j < seg; j++) {
      const theta = (j / seg) * Math.PI * 2;
      const ring: THREE.Vector3[] = [];
      for (let i = 0; i <= seg; i++) {
        const phi = (i / seg) * Math.PI;
        ring.push(new THREE.Vector3(r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta)));
      }
      res.push(ring);
    }
    return res;
  }, []);

  /* 粒子 */
  const dots = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < 200; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const rad = 1.38 + Math.random() * 0.18;
      pts.push(new THREE.Vector3(rad * Math.sin(phi) * Math.cos(theta), rad * Math.cos(phi), rad * Math.sin(phi) * Math.sin(theta)));
    }
    return pts;
  }, []);

  useFrame((_, dt) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += dt * 0.3;
      groupRef.current.rotation.x += dt * 0.06;
    }
  });

  return (
    <group ref={groupRef}>
      {rings.map((r, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array(r.flatMap((v) => [v.x, v.y, v.z])), 3]}
              count={r.length}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color={i < 29 ? '#3b82f6' : '#8b5cf6'}
            transparent
            opacity={0.22}
          />
        </line>
      ))}
      {dots.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.014, 4, 4]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? '#3b82f6' : i % 3 === 1 ? '#8b5cf6' : '#22d3ee'}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
      {/* 内核光晕 */}
      <mesh>
        <sphereGeometry args={[0.45, 48, 48]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.06} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.65, 48, 48]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.03} />
      </mesh>
    </group>
  );
}
