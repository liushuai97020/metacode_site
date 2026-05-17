import { Shield, Cpu, Zap, Globe, Brain, Monitor, Check, Hexagon } from 'lucide-react';
import SectionHeading from '../../components/ui/SectionHeading';
import FadeInView from '../../components/motion/FadeInView';
import Footer from '../../components/layout/Footer';
import type { FeatureSection } from '../../types';

const FEATURES: (FeatureSection & { icon: typeof Shield; color: string })[] = [
  {
    id: 'precision', icon: Shield, color: '#3b82f6', title: '精准编码系统', subtitle: '防幻觉 · 锁定行号 · 杜绝乱改',
    description: '基于源码映射与 DOM 拾取技术，精确定位到文件行号级别修改。不凭空编造函数、不删除无关代码、不修改未指定文件。每次编辑有据可查，从根源杜绝大模型幻觉。',
    points: ['文件行号精确定位修改', '源码映射 + AST 语法树校验', 'DOM 元素拾取自动关联源码', '修改范围锁定，不扩散修改', '每次编辑前置 diff 预览'],
    gradient: 'from-blue-600/[0.03] to-transparent',
  },
  {
    id: 'agent', icon: Cpu, color: '#6366f1', title: 'Agent 智能体', subtitle: '自动规划 · 自动执行 · 自主思考',
    description: '对标 Claude Code 原生 Agent，自主判断是否需要调用工具，支持多轮工具迭代。自动拆解复杂任务，逐步执行代码读写、终端命令，最终整合结果输出自然语言回答。',
    points: ['自主任务拆解与规划', '多轮工具调用迭代执行', '权限沙箱安全管控', '执行过程可视化展示', '支持中断与手动干预'],
    gradient: 'from-indigo-600/[0.03] to-transparent',
  },
  {
    id: 'skills', icon: Zap, color: '#8b5cf6', title: 'Skill 内置技能', subtitle: '重构 · 排错 · 格式化 · 一键触发',
    description: '内置数十种编码技能，覆盖代码重构、智能排错、格式化、注释优化、项目结构分析等高频场景。支持可视化编排自定义技能，第三方技能市场下载，兼容 Claude Code SKILL.md 格式。',
    points: ['内置 20+ 预设编码技能', '可视化拖拽编排工作流', '社区技能市场一键下载', 'SKILL.md 格式兼容', '串行 / 并行 / 条件分支执行'],
    gradient: 'from-purple-600/[0.03] to-transparent',
  },
  {
    id: 'mcp', icon: Globe, color: '#06b6d4', title: 'MCP 工具市场', subtitle: '联网搜索 · 浏览器 · Git · 数据库',
    description: '自研轻量 MCP 协议统一调度层，兼容 OpenAI Function Call / Anthropic Tool Use 双格式。内置文件读写、终端命令、Git 操作，第三方 MCP 服务一键接入，全生态打通。',
    points: ['双 API 格式兼容 (Anthropic / OpenAI)', 'stdio / SSE / HTTP 三种传输', '内置文件 + 终端 + Git 工具', '第三方 MCP 服务一键接入', '工具权限独立管控'],
    gradient: 'from-cyan-600/[0.03] to-transparent',
  },
  {
    id: 'rag', icon: Brain, color: '#e879f9', title: '本地向量记忆', subtitle: 'RAG · 项目记忆 · 省 Token',
    description: '基于 sqlite-vec 的纯本地向量数据库，所有聊天记录、向量数据永久仅存本地。自动检索相关历史记忆拼入上下文，Token 用量严格上限控制，显著节省 API 费用。',
    points: ['纯本地向量存储，数据不上云', '余弦相似度智能检索', '跨会话上下文持久化', 'Token 用量上限自动裁剪', '兼容全部 OpenAI 格式 Embedding'],
    gradient: 'from-pink-600/[0.03] to-transparent',
  },
  {
    id: 'ui', icon: Monitor, color: '#94a3b8', title: '暗黑极简 UI', subtitle: '桌面客户端 · 轻量化 · 流畅交互',
    description: 'Electron 原生桌面客户端，暗黑极简科技风设计。三栏可拖拽布局、Monaco 代码编辑器、内嵌 Web 预览面板、多会话标签管理。低内存占用，流畅运行，为开发者打造的沉浸式编码环境。',
    points: ['三栏拖拽布局（文件树 + 对话 + 预览）', 'Monaco Editor 代码高亮', '内嵌 Web 预览 + 元素标注', '标签页多会话管理', 'Windows / macOS / Linux 全平台'],
    gradient: 'from-slate-600/[0.03] to-transparent',
  },
];

/* 功能介绍页 — 左右交替布局 + 六边形装饰 */
export default function FeaturesPage() {
  return (
    <main className="relative pt-20">
      {/* 背景纹理 */}
      <div className="fixed inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <section className="relative max-w-7xl mx-auto px-5 sm:px-8 py-20">
        <SectionHeading
          badge="功能特性"
          title="六大核心能力"
          description="从精准编码到长期记忆，MetaCode 提供完整的本地化 AI 编码工具链"
        />
      </section>

      {FEATURES.map((feat, i) => {
        const even = i % 2 === 0;
        return (
          <section key={feat.id} className={`relative bg-gradient-to-b ${feat.gradient}`}>
            <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
              <div className={`flex flex-col ${even ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}>
                {/* 图标 */}
                <FadeInView direction={even ? 'left' : 'right'} className="flex-shrink-0">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center">
                      <feat.icon size={36} style={{ color: feat.color }} />
                    </div>
                    {/* 六边形装饰环 */}
                    <Hexagon
                      size={60}
                      className="absolute -top-4 -right-4 text-blue-400/10 animate-spin-slow"
                      style={{ strokeWidth: 1 }}
                    />
                  </div>
                </FadeInView>

                {/* 文字 */}
                <FadeInView direction={even ? 'right' : 'left'} className="flex-1">
                  <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-slate-500 mb-2 block">
                    {feat.subtitle}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">{feat.title}</h3>
                  <p className="text-slate-400 leading-relaxed mb-6 max-w-xl">{feat.description}</p>
                  <ul className="space-y-2.5">
                    {feat.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-sm text-slate-300">
                        <Check size={15} className="text-blue-400 mt-0.5 flex-shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </FadeInView>
              </div>
            </div>
          </section>
        );
      })}

      <Footer />
    </main>
  );
}
