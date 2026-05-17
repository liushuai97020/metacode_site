import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* 星空粒子背景 — 600粒子缓慢旋转 */
export default function ParticleField() {
  const ref = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const N = 600;
    const pos = new Float32Array(N * 3);
    const col = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 9;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 7;
      const t = Math.random();
      if (t < 0.4) { col[i * 3] = 0.23; col[i * 3 + 1] = 0.51; col[i * 3 + 2] = 0.96; }
      else if (t < 0.7) { col[i * 3] = 0.55; col[i * 3 + 1] = 0.36; col[i * 3 + 2] = 0.96; }
      else { col[i * 3] = 0.35; col[i * 3 + 1] = 0.45; col[i * 3 + 2] = 0.55; }
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.y += dt * 0.025;
      ref.current.rotation.x += dt * 0.008;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={positions.length / 3} itemSize={3} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} count={colors.length / 3} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.016} vertexColors transparent opacity={0.45} blending={THREE.AdditiveBlending} depthWrite={false} sizeAttenuation />
    </points>
  );
}
