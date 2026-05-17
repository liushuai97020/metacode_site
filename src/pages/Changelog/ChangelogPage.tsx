import { Sparkles, Wrench, Bug } from 'lucide-react';
import SectionHeading from '../../components/ui/SectionHeading';
import FadeInView from '../../components/motion/FadeInView';
import Footer from '../../components/layout/Footer';
import type { ChangelogEntryData } from '../../types';

const CHANGELOG: ChangelogEntryData[] = [
  {
    version: 'v1.1.1', date: '2026-05-17',
    features: [],
    improvements: ['增强 initClaudeAgent 和 createMainWindow 错误处理，确保窗口创建始终执行'],
    fixes: ['修复打包后 EXE 双击无窗口问题：Agent V2 初始化异常阻断窗口创建', '修复记忆与上下文页面 sqlite-vec 报错：DLL 无法从 ASAR 虚拟路径加载', '修复 sqlite-vec 扩展加载失败后旧 vec0 虚拟表残留导致查询异常'],
  },
  {
    version: 'v1.1.0', date: '2026-05-17',
    features: [
      'Agent V2 增强系统：全新模块化 Agent 架构，MCP 协议 + 技能/插件/工具热插拔',
      'MCP 服务器管理：支持 stdio / SSE / Streamable HTTP 三种传输协议',
      '工具中心：统一管理 MCP 工具 + 内置工具 + 本地导入工具',
      '技能管理中心：支持 Claude Code 兼容的 SKILL.md 格式',
      '插件市场：本地插件管理，支持启用/禁用',
      'RAG 向量记忆系统：本地嵌入向量记忆，跨会话上下文持久化',
      '对话命令菜单：输入 / 触发命令面板',
      '安装向导：全新安装引导界面',
      '调用日志系统：SQLite 持久化，支持按来源筛选与日期范围查询',
    ],
    improvements: [
      '重构工具中心日志模块 UI，日志条目可展开查看完整输入输出',
      '下拉筛选器改为自定义组件，适配暗色/亮色主题',
      '日期筛选从客户端过滤改为后端 SQLite 时间范围查询',
    ],
    fixes: [],
  },
  {
    version: 'v1.0.4', date: '2026-05-15',
    features: [
      '重新设计设置页面 UI，布局更清晰直观',
      '新增 Token 消耗统计面板，实时追踪 API 用量',
      '新增 ResizeHandle 组件支持面板自由拖拽调整',
    ],
    improvements: [],
    fixes: ['面板拖拽卡顿与样式异常', '会话列表状态不同步', 'Agent 流式输出中断', '应用商店状态持久化异常', '窗口关闭后重建时 preload 加载失败'],
  },
  {
    version: 'v1.0.3', date: '2026-05-14',
    features: [
      '新增 12 个主流模型快捷预设（Anthropic Claude、OpenAI、Gemini、DeepSeek、Qwen、GLM、Moonshot 等）',
      '双 API 格式兼容：Anthropic Messages API / OpenAI 兼容格式一键切换',
      '网关配置编辑 / 保存 / 取消工作流',
      'GitHub Actions Windows 自动构建与发布',
    ],
    improvements: ['API 格式切换时自动切换 baseUrl', '编辑保存后自动同步 agent 配置', '移除 Linux/macOS 构建目标，专注 Windows'],
    fixes: ['网关配置编辑后 agent 仍使用旧配置', 'API 格式与 baseUrl 不联动'],
  },
  {
    version: 'v0.1.0', date: '2026-05-12',
    features: [
      '基础 Electron + React 应用框架搭建',
      '多网关 AI 配置管理，5 种模型角色分配',
      'Agent 工具链：Read / Edit / Write / Bash',
      '流式对话输出，支持中途中断',
      '多会话标签管理，按项目自动分组',
      '三栏可拖拽布局：文件树 + 对话区 + 预览面板',
      'Monaco Editor 代码高亮集成',
      'Web 预览面板 + 元素标注功能',
      '暗色 / 亮色主题一键切换',
      '用量统计与代理配置',
    ],
    improvements: [],
    fixes: [],
  },
];

/* 更新日志页 — 暗色时间轴 */
export default function ChangelogPage() {
  return (
    <main className="relative pt-20">
      <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <section className="relative max-w-7xl mx-auto px-5 sm:px-8 py-20">
        <SectionHeading badge="更新日志" title="版本迭代记录" description="持续迭代，不断打磨产品体验" />
      </section>

      <section className="relative max-w-3xl mx-auto px-5 sm:px-8 pb-24">
        <div className="relative">
          {/* 时间轴竖线 */}
          <div className="absolute left-5 md:left-7 top-2 bottom-2 w-px bg-gradient-to-b from-blue-500/50 via-purple-500/25 to-transparent" />

          <div className="space-y-14">
            {CHANGELOG.map((entry, i) => (
              <FadeInView key={entry.version} delay={i * 0.06}>
                <div className="relative pl-14 md:pl-16">
                  {/* 节点 */}
                  <div className="absolute left-3 md:left-5 top-1.5 w-4 h-4 rounded-full bg-blue-500 border-[3px] border-[#050510] shadow-lg shadow-blue-500/30" />

                  {/* 版本标题 */}
                  <div className="flex flex-wrap items-baseline gap-3 mb-4">
                    <span className="text-lg font-bold text-white font-mono">{entry.version}</span>
                    <span className="text-[11px] text-slate-600 bg-white/[0.03] px-2.5 py-0.5 rounded-full">{entry.date}</span>
                  </div>

                  {/* 变更卡片 */}
                  <div className="glass rounded-xl p-5 space-y-3.5">
                    {entry.features.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles size={14} className="text-blue-400" />
                          <span className="text-[11px] text-blue-400 font-semibold uppercase tracking-wider">新增功能</span>
                        </div>
                        <ul className="space-y-1 ml-6">
                          {entry.features.map((f) => <li key={f} className="text-sm text-slate-300">{f}</li>)}
                        </ul>
                      </div>
                    )}
                    {entry.improvements.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Wrench size={14} className="text-purple-400" />
                          <span className="text-[11px] text-purple-400 font-semibold uppercase tracking-wider">优化改进</span>
                        </div>
                        <ul className="space-y-1 ml-6">
                          {entry.improvements.map((imp) => <li key={imp} className="text-sm text-slate-300">{imp}</li>)}
                        </ul>
                      </div>
                    )}
                    {entry.fixes.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Bug size={14} className="text-amber-400" />
                          <span className="text-[11px] text-amber-400 font-semibold uppercase tracking-wider">Bug 修复</span>
                        </div>
                        <ul className="space-y-1 ml-6">
                          {entry.fixes.map((fix) => <li key={fix} className="text-sm text-slate-300">{fix}</li>)}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
