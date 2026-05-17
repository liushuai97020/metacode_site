import { Code2, Lock, Cpu, Github, ArrowRight } from 'lucide-react';
import SectionHeading from '../../components/ui/SectionHeading';
import GlassCard from '../../components/ui/GlassCard';
import GradientButton from '../../components/ui/GradientButton';
import FadeInView from '../../components/motion/FadeInView';
import Footer from '../../components/layout/Footer';
import { Link } from 'react-router-dom';

const VALUES = [
  { icon: Lock, title: '隐私优先', desc: '所有代码、聊天、向量数据仅存本地，零云端传输，满足企业级安全合规要求' },
  { icon: Cpu, title: '全模型兼容', desc: '支持 Anthropic / OpenAI 双格式，主流第三方模型一键配置，不绑定任何厂商' },
  { icon: Code2, title: '完全开源', desc: 'MIT 协议开源，代码透明可审计，社区共建插件与技能生态' },
];

const PLANS = [
  '多语言代码审查与自动修复',
  '可视化 Agent 执行流编辑器',
  '团队协作与共享技能包',
  '更丰富的 MCP 工具协议生态',
  '移动端远程连接桌面端',
  '代码库级项目索引与跨文件重构',
];

/* 关于页 — 产品理念、开源、未来规划 */
export default function AboutPage() {
  return (
    <main className="relative pt-20">
      <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <section className="relative max-w-7xl mx-auto px-5 sm:px-8 py-20 text-center">
        <SectionHeading badge="关于" title="关于 MetaCode" description="打造最懂开发者的本地化 AI 编码助手" />
      </section>

      {/* 开发初衷 */}
      <section className="relative max-w-4xl mx-auto px-5 sm:px-8 pb-20 space-y-20">
        <FadeInView>
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-4">开发初衷</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              MetaCode 诞生于一个简单的理念：开发者的代码应该100%保存在本地。市面上的云端 AI 编码工具虽然强大，但代码数据上传到第三方服务器的做法让很多团队望而却步。我们打造 MetaCode，就是希望提供一款不妥协的本地化 AI 编码体验——代码永远在本地，AI 能力不打折。
            </p>
          </div>
        </FadeInView>

        {/* 三大价值观卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {VALUES.map((v) => (
            <FadeInView key={v.title}>
              <GlassCard glow="blue" className="text-center h-full">
                <v.icon size={32} className="text-blue-400 mx-auto mb-4" />
                <h4 className="text-white font-semibold mb-2 text-sm">{v.title}</h4>
                <p className="text-slate-400 text-xs leading-relaxed">{v.desc}</p>
              </GlassCard>
            </FadeInView>
          ))}
        </div>

        {/* 未来规划 */}
        <FadeInView>
          <GlassCard glow="blue">
            <h3 className="text-xl font-bold text-white mb-6 text-center">未来规划</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {PLANS.map((plan) => (
                <div key={plan} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span className="text-sm text-slate-300">{plan}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </FadeInView>

        {/* 开源联系 */}
        <FadeInView>
          <div className="text-center space-y-5">
            <h3 className="text-xl font-bold text-white">参与共建</h3>
            <p className="text-slate-400 text-sm max-w-lg mx-auto">
              MetaCode 基于 MIT 协议开源，欢迎开发者参与共建、提交插件、分享技能工作流。
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="https://github.com/liushuai97020/Meta-CC-Hub/" target="_blank" rel="noopener noreferrer">
                <GradientButton variant="outline" size="sm">
                  <Github size={16} />GitHub 仓库
                </GradientButton>
              </a>
              <Link to="/download">
                <GradientButton size="sm">
                  立即下载 <ArrowRight size={16} />
                </GradientButton>
              </Link>
            </div>
          </div>
        </FadeInView>
      </section>

      <Footer />
    </main>
  );
}
