import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';
import ArchitectureLayers, { ARCH_LAYERS } from '../../components/three/ArchitectureLayers';
import ErrorBoundary from '../../components/ui/ErrorBoundary';
import SectionHeading from '../../components/ui/SectionHeading';
import GlassCard from '../../components/ui/GlassCard';
import Footer from '../../components/layout/Footer';
import { cn } from '../../lib/utils';

/* 架构页 — 3D 七层层级图 + HTML侧边图例 + 详情面板 */
export default function ArchitecturePage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeLayer = activeIndex !== null ? ARCH_LAYERS[activeIndex] : null;

  return (
    <main className="relative pt-20">
      <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <section className="relative max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <SectionHeading
          badge="技术架构"
          title="七层智能架构体系"
          description="点击 3D 层级或右侧图例查看每层详解，拖拽旋转观察立体结构"
        />
      </section>

      {/* 3D 场景 + 侧边图例 */}
      <section className="relative max-w-6xl mx-auto px-4 flex flex-col lg:flex-row gap-4">
        {/* 3D Canvas */}
        <div className="relative flex-1 h-[480px] md:h-[580px] rounded-2xl overflow-hidden border border-white/[0.04]">
          <ErrorBoundary fallback={
            <div className="h-full flex items-center justify-center text-slate-600 text-sm bg-[#050510]">3D 场景加载失败，请刷新重试</div>
          }>
            <Canvas
              camera={{ position: [4.5, 0, 6.5], fov: 40 }}
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: true }}
            >
              <Suspense fallback={null}>
                <ambientLight intensity={0.55} />
                <pointLight position={[3, 3, 5]} intensity={0.9} color="#3b82f6" />
                <pointLight position={[-3, -1, -2]} intensity={0.5} color="#8b5cf6" />
                <ArchitectureLayers
                  activeIndex={activeIndex}
                  onSelect={(i) => setActiveIndex(activeIndex === i ? null : i)}
                />
                <OrbitControls
                  enableZoom
                  enablePan={false}
                  minPolarAngle={Math.PI / 5}
                  maxPolarAngle={Math.PI * 0.75}
                  autoRotate
                  autoRotateSpeed={0.4}
                />
              </Suspense>
            </Canvas>
          </ErrorBoundary>

          {/* Canvas 内提示 */}
          <div className="absolute bottom-4 inset-x-0 text-center text-slate-600 text-[11px] flex items-center justify-center gap-1.5 pointer-events-none">
            <Info size={11} /> 拖拽旋转 · 滚轮缩放
          </div>
        </div>

        {/* 侧边HTML图例 */}
        <div className="lg:w-52 flex lg:flex-col flex-row flex-wrap gap-1.5 lg:gap-1.5 content-start">
          {ARCH_LAYERS.map((layer, i) => (
            <button
              key={layer.id}
              onClick={() => setActiveIndex(activeIndex === i ? null : i)}
              className={cn(
                'flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-left transition-all duration-200 border cursor-pointer',
                activeIndex === i
                  ? 'bg-white/[0.06] border-white/10'
                  : 'border-transparent hover:bg-white/[0.03]',
              )}
            >
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: layer.color,
                  boxShadow:
                    activeIndex === i
                      ? `0 0 10px ${layer.color}80`
                      : 'none',
                }}
              />
              <div className="min-w-0">
                <div
                  className={cn(
                    'text-xs font-medium truncate',
                    activeIndex === i ? 'text-white' : 'text-slate-400',
                  )}
                >
                  {layer.name}
                </div>
                <div className="text-[10px] text-slate-600 font-mono">
                  {layer.tag}
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 详情面板 */}
      <section className="relative max-w-3xl mx-auto px-5 sm:px-8 py-8 min-h-[180px]">
        <AnimatePresence mode="wait">
          {activeLayer ? (
            <motion.div
              key={activeLayer.id}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <GlassCard glow="blue">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor: activeLayer.color,
                      boxShadow: `0 0 12px ${activeLayer.color}80`,
                    }}
                  />
                  <h3 className="text-xl font-bold text-white">
                    {activeLayer.name}
                  </h3>
                  <span className="text-[10px] text-slate-500 bg-white/5 px-2 py-0.5 rounded font-mono">
                    {activeLayer.tag}
                  </span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {activeLayer.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {activeLayer.tags.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 text-[11px] rounded-lg bg-white/[0.03] text-slate-300 border border-white/[0.05]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-10"
            >
              <p className="text-slate-600 text-sm">
                点击 3D 层级或右侧图例查看详细说明
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 底部卡片列表 */}
      <section className="relative max-w-4xl mx-auto px-5 sm:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {ARCH_LAYERS.map((layer) => (
            <GlassCard
              key={layer.id}
              onClick={() => setActiveIndex(layer.id - 1)}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: layer.color }}
                />
                <span className="text-[10px] text-slate-600 font-mono">
                  L{layer.id}
                </span>
                <h4 className="text-sm font-semibold text-white">
                  {layer.name}
                </h4>
              </div>
              <p className="text-xs text-slate-500">{layer.tag}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
