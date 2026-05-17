import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { Shield, Zap, Cpu, Brain, Download, ArrowRight, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import CodeSphere from '../../components/three/CodeSphere';
import homePreview from '../../assets/meta_home.png';
import ParticleField from '../../components/three/ParticleField';
import GlassCard from '../../components/ui/GlassCard';
import GradientButton from '../../components/ui/GradientButton';
import SectionHeading from '../../components/ui/SectionHeading';
import ErrorBoundary from '../../components/ui/ErrorBoundary';
import FadeInView from '../../components/motion/FadeInView';
import FloatElement from '../../components/motion/FloatElement';
import Footer from '../../components/layout/Footer';
import type { HighlightCard } from '../../types';

const HIGHLIGHTS: HighlightCard[] = [
  { icon: 'Shield', title: '防幻觉编码', description: '锁定文件行号、源码映射、DOM元素拾取，精准修改杜绝乱改，每一行变更可追溯', color: 'blue' },
  { icon: 'Zap', title: 'Skill 技能系统', description: '内置几十种原生编码技能，代码重构、智能排错、格式化、注释优化一键触发', color: 'purple' },
  { icon: 'Cpu', title: 'MCP 工具生态', description: '统一工具协议调度，联网搜索、浏览器调试、文件操作、Git集成全生态打通', color: 'cyan' },
  { icon: 'Brain', title: 'RAG 长期记忆', description: '本地向量嵌入存储，跨会话永久记忆、省Token、上下文精准检索，越用越智能', color: 'purple' },
];

const iconMap: Record<string, typeof Shield> = { Shield, Zap, Cpu, Brain };

const FLOW_STEPS = ['用户层', 'Agent调度层', 'Skill技能层', 'MCP工具层', '本地资源层'];

/* 首页 — Hero大屏 + 四卡片 + 截图 + 架构流 */
export default function HomePage() {
  const flowRef = useRef<HTMLDivElement>(null);

  return (
    <main className="relative">
      {/* ========== Hero ========== */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* 网格背景纹理 */}
        <div className="absolute inset-0 bg-grid-pattern opacity-60" />

        {/* 3D 场景 */}
        <div className="absolute inset-0 z-0">
          <ErrorBoundary fallback={<div className="absolute inset-0 bg-[#050510]" />}>
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.4} />
                <pointLight position={[5, 3, 5]} intensity={0.6} color="#3b82f6" />
                <pointLight position={[-5, -2, -3]} intensity={0.4} color="#8b5cf6" />
                <ParticleField />
                <CodeSphere />
              </Suspense>
            </Canvas>
          </ErrorBoundary>
        </div>

        {/* 渐变遮罩 */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#050510]/50 via-transparent to-[#050510] pointer-events-none" />

        {/* 主体内容 */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <span className="inline-block px-3.5 py-1 text-xs font-medium tracking-wider uppercase text-blue-400 bg-blue-500/10 rounded-full border border-blue-500/20 mb-7">
              本地私有化 AI 编码助手
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="gradient-text">MetaCode</span>
            <span className="text-white/80 mx-2 font-light">·</span>
            <span className="text-white">AI 智能编码工作台</span>
          </motion.h1>

          <motion.p
            className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            本地私有化 &nbsp;·&nbsp; Agent 智能体 &nbsp;·&nbsp; MCP 工具协议 &nbsp;·&nbsp; 永久记忆
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link to="/download">
              <GradientButton size="lg"><Download size={20} />立即下载</GradientButton>
            </Link>
            <Link to="/architecture">
              <GradientButton variant="outline" size="lg"><Layers size={20} />查看架构</GradientButton>
            </Link>
          </motion.div>
        </div>

        {/* 滚动提示 */}
        <motion.div className="absolute bottom-8 z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
          <div className="w-6 h-10 rounded-full border-2 border-slate-500/20 flex items-start justify-center p-1">
            <motion.div className="w-1.5 h-1.5 rounded-full bg-blue-400" animate={{ y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity }} />
          </div>
        </motion.div>
      </section>

      {/* ========== 产品亮点 ========== */}
      <section className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-24">
        <SectionHeading
          badge="核心亮点"
          title="为什么选择 MetaCode"
          description="完全本地化的智能编码体验，保护代码隐私的同时提供顶级 AI 辅助能力"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {HIGHLIGHTS.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
              <GlassCard key={item.title} glow={item.color}>
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.04] flex items-center justify-center">
                    <Icon size={24} className={item.color === 'blue' ? 'text-blue-400' : item.color === 'cyan' ? 'text-cyan-400' : 'text-purple-400'} />
                  </div>
                  <h3 className="text-white font-semibold text-sm tracking-wide">{item.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{item.description}</p>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* ========== 产品预览 ========== */}
      <section className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-24">
        <SectionHeading
          badge="产品预览"
          title="极简暗黑桌面客户端"
          description="三栏布局 · 流式对话 · Monaco 编辑器 · Web 预览 · 全平台支持"
        />
        <FadeInView>
          <FloatElement intensity={5} duration={4}>
            <div className="mt-10 rounded-2xl overflow-hidden border border-white/[0.05] shadow-2xl shadow-black/50">
              <div className="relative">
                {/* 左右边缘轻微过渡 */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#050510]/40 via-transparent to-[#050510]/40 z-10 pointer-events-none" />
                <img
                  src={homePreview}
                  alt="MetaCode 桌面端截图"
                  className="w-full h-auto"
                  loading="lazy"
                />
                {/* 底部单侧过渡 */}
                <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-[#050510]/60 to-transparent z-10 pointer-events-none" />
              </div>
            </div>
          </FloatElement>
        </FadeInView>
      </section>

      {/* ========== 架构流程图 ========== */}
      <section className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-24" ref={flowRef}>
        <SectionHeading
          badge="技术架构"
          title="五层智能调度体系"
          description="从用户输入到代码执行，全链路自主调度，兼容 Anthropic / OpenAI 双 API 格式"
        />
        <FadeInView>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 md:gap-5">
            {FLOW_STEPS.map((step, i) => (
              <div key={step} className="flex items-center gap-3 md:gap-5">
                <motion.div
                  className="glass rounded-2xl px-6 py-5 md:px-8 md:py-6 text-center min-w-[110px]"
                  whileHover={{ scale: 1.05, y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  <span className="text-[10px] text-slate-600 mb-1.5 block font-mono tracking-wider uppercase">L{i + 1}</span>
                  <span className="text-sm md:text-base text-white font-semibold tracking-wide whitespace-nowrap">{step}</span>
                </motion.div>
                {i < FLOW_STEPS.length - 1 && (
                  <motion.span className="text-blue-400/30" animate={{ x: [0, 8, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
                    <ArrowRight size={22} />
                  </motion.span>
                )}
              </div>
            ))}
          </div>
        </FadeInView>
        <div className="mt-14 text-center">
          <Link to="/architecture">
            <GradientButton variant="outline">深入了解架构 <ArrowRight size={16} /></GradientButton>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
