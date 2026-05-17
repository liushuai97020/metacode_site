import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { ArchitectureLayerData as ArchLayer } from '../../types';

export const ARCH_LAYERS: ArchLayer[] = [
  { id: 1, name: '交互层', tag: 'UI', description: 'Electron桌面客户端，三栏布局、Monaco编辑器、Web预览、元素标注', color: '#3b82f6', tags: ['桌面客户端', '三栏布局', 'Monaco编辑', 'Web预览'] },
  { id: 2, name: 'Agent 调度层', tag: 'Agent', description: '智能推理引擎，自主判断工具调用、多轮迭代执行、权限管控、调用日志', color: '#6366f1', tags: ['自主推理', '多轮调用', '权限拦截', '日志记录'] },
  { id: 3, name: 'Skill 技能层', tag: 'Skill', description: '可编程工作流编排，内置预设技能 + 第三方技能市场 + 自定义可视化编排', color: '#8b5cf6', tags: ['内置技能', '技能市场', '可视化编排', 'SKILL.md'] },
  { id: 4, name: 'MCP 工具协议层', tag: 'MCP', description: '统一工具调度协议，兼容 OpenAI Function / Anthropic Tool / MCP 标准格式', color: '#a855f7', tags: ['工具调度', '多协议兼容', 'stdio/SSE', '权限沙箱'] },
  { id: 5, name: '本地能力层', tag: 'Local', description: '文件读写、终端命令、Git 操作、DOM 源码映射、浏览器调试能力', color: '#c084fc', tags: ['文件操作', '终端命令', 'Git集成', 'DOM映射'] },
  { id: 6, name: '向量记忆层', tag: 'RAG', description: 'sqlite-vec 本地向量库，嵌入检索、跨会话记忆、Token 节省、异步写入', color: '#e879f9', tags: ['向量检索', '长期记忆', 'Token优化', '异步写入'] },
  { id: 7, name: '运行层', tag: 'Runtime', description: 'Electron + Node.js 运行时，支持本地 Ollama 模型 + 远程 API 多网关', color: '#f472b6', tags: ['Electron', 'Node.js', 'Ollama', '多网关API'] },
];

interface Props {
  activeIndex: number | null;
  onSelect: (i: number) => void;
}

/* 七层架构 3D 层级图 — 纯几何体，无外部字体依赖 */
export default function ArchitectureLayers({ activeIndex, onSelect }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const plates = useMemo(() => ARCH_LAYERS.map((_, i) => ({ y: 2.6 - i * 0.9, w: 3.3 - i * 0.2 })), []);

  useFrame((_, dt) => {
    if (groupRef.current) groupRef.current.rotation.y += dt * 0.1;
  });

  return (
    <group ref={groupRef}>
      {ARCH_LAYERS.map((layer, i) => {
        const { y, w } = plates[i];
        const isActive = activeIndex === i;
        const isHovered = hovered === i;
        const alpha = isActive ? 0.45 : isHovered ? 0.32 : 0.16;
        const emit = isActive ? 0.8 : isHovered ? 0.5 : 0.2;
        const edgeAlpha = isActive ? 1 : isHovered ? 0.8 : 0.35;

        return (
          <group
            key={layer.id}
            position={[0, y, 0]}
            onClick={() => onSelect(i)}
            onPointerOver={(e) => { e.stopPropagation(); setHovered(i); }}
            onPointerOut={() => setHovered(null)}
          >
            {/* 板块主体 */}
            <mesh>
              <boxGeometry args={[w, 0.55, 1.5]} />
              <meshStandardMaterial
                color={layer.color}
                transparent
                opacity={alpha}
                emissive={layer.color}
                emissiveIntensity={emit}
                metalness={0.3}
                roughness={0.5}
              />
            </mesh>

            {/* 发光边框 */}
            <lineSegments>
              <edgesGeometry args={[new THREE.BoxGeometry(w, 0.55, 1.5)]} />
              <lineBasicMaterial color={layer.color} transparent opacity={edgeAlpha} />
            </lineSegments>

            {/* 左侧标记球 */}
            <mesh position={[-(w / 2 + 0.35), 0, 0]}>
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshStandardMaterial
                color={layer.color}
                emissive={layer.color}
                emissiveIntensity={isActive ? 1.2 : isHovered ? 0.8 : 0.35}
              />
            </mesh>

            {/* 右侧标记球 */}
            <mesh position={[w / 2 + 0.35, 0, 0]}>
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshStandardMaterial
                color={layer.color}
                emissive={layer.color}
                emissiveIntensity={isActive ? 0.9 : isHovered ? 0.6 : 0.25}
              />
            </mesh>

            {/* 层级间连接线 */}
            {i < ARCH_LAYERS.length - 1 && (
              <mesh position={[0, -0.48, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
                <meshBasicMaterial color={layer.color} transparent opacity={0.3} />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}
