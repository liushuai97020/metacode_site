import {
  Download,
  Monitor,
  Apple,
  Terminal,
  Shield,
  Check,
} from "lucide-react";
import GradientButton from "../../components/ui/GradientButton";
import SectionHeading from "../../components/ui/SectionHeading";
import GlassCard from "../../components/ui/GlassCard";
import FadeInView from "../../components/motion/FadeInView";
import FloatElement from "../../components/motion/FloatElement";
import Footer from "../../components/layout/Footer";
import type { DownloadPlatform } from "../../types";

const PLATFORMS: (DownloadPlatform & {
  icon: typeof Monitor;
  available: boolean;
})[] = [
  {
    key: "windows",
    label: "Windows",
    icon: Monitor,
    ext: ".exe",
    size: "~160 MB",
    desc: "Windows 10 / 11 x64，NSIS 安装包 + 便携版",
    available: true,
  },
  {
    key: "mac",
    label: "macOS",
    icon: Apple,
    ext: ".dmg",
    size: "~160 MB",
    desc: "macOS 12+ (Apple Silicon / Intel)，DMG + ZIP",
    available: false,
  },
  {
    key: "linux",
    label: "Linux",
    icon: Terminal,
    ext: ".deb",
    size: "~150 MB",
    desc: "Ubuntu / Debian，AppImage + deb 格式",
    available: false,
  },
];

const VERSION = "v1.1.0";
const DATE = "2026-05-17";

/* 下载页 — 三平台卡片 + 安装说明 */
export default function DownloadPage() {
  return (
    <main className="relative pt-20">
      <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <section className="relative max-w-7xl mx-auto px-5 sm:px-8 py-20 text-center">
        <SectionHeading
          badge="下载"
          title="获取 MetaCode"
          description="免费开源，Windows 客户端已发布，macOS / Linux 即将推出"
        />
      </section>

      {/* 版本信息 */}
      <FadeInView>
        <div className="relative max-w-2xl mx-auto px-5 mb-14 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-slate-400 py-5 px-10 rounded-2xl glass">
            <span>
              当前版本{" "}
              <strong className="text-white font-semibold">{VERSION}</strong>
            </span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span>更新于 {DATE}</span>
          </div>
        </div>
      </FadeInView>

      {/* 下载卡片 */}
      <section className="relative max-w-5xl mx-auto px-5 sm:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PLATFORMS.map((p, i) => (
            <FadeInView key={p.key} delay={i * 0.1}>
              <GlassCard
                glow="blue"
                className="text-center h-full flex flex-col"
              >
                <FloatElement intensity={4} duration={3 + i}>
                  <p.icon
                    size={42}
                    className={
                      p.available
                        ? "text-blue-400 mx-auto mb-5"
                        : "text-slate-600 mx-auto mb-5"
                    }
                  />
                </FloatElement>
                <h3
                  className={`text-xl font-bold mb-1.5 ${p.available ? "text-white" : "text-slate-500"}`}
                >
                  {p.label}
                </h3>
                <p className="text-slate-500 text-xs mb-4 leading-relaxed">
                  {p.desc}
                </p>
                <div className="text-[11px] text-slate-600 mb-5 space-y-1 font-mono">
                  <p>格式 {p.ext}</p>
                  <p>大小 {p.size}</p>
                </div>
                <div className="mt-auto">
                  {p.available ? (
                    <GradientButton
                      as="a"
                      href="https://github.com/liushuai97020/Meta-CC-Hub/releases"
                      target="_blank"
                      rel="noopener noreferrer"
                      size="md"
                      className="w-full"
                    >
                      <Download size={16} />
                      下载 {p.label}
                    </GradientButton>
                  ) : (
                    <span className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-xl w-full bg-white/[0.03] text-slate-600 border border-white/[0.04] cursor-not-allowed select-none">
                      敬请期待
                    </span>
                  )}
                </div>
              </GlassCard>
            </FadeInView>
          ))}
        </div>
      </section>

      {/* 安装说明 */}
      <section className="relative max-w-4xl mx-auto px-5 sm:px-8 pb-24">
        <FadeInView>
          <GlassCard glow="blue">
            <div className="flex items-center gap-3 mb-5">
              <Shield size={20} className="text-blue-400" />
              <h3 className="text-white font-semibold text-lg">安装说明</h3>
            </div>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <Check
                  size={14}
                  className="text-blue-400 mt-0.5 flex-shrink-0"
                />
                Windows：下载 .exe 安装程序，双击运行，按向导完成安装
              </li>
              <li className="flex items-start gap-2">
                <Check
                  size={14}
                  className="text-slate-600 mt-0.5 flex-shrink-0"
                />
                <span className="text-slate-600">
                  macOS / Linux 版本即将推出，敬请期待
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check
                  size={14}
                  className="text-blue-400 mt-0.5 flex-shrink-0"
                />
                首次启动自动进入安装向导，引导配置 AI 网关
              </li>
            </ul>
          </GlassCard>
        </FadeInView>
      </section>

      <Footer />
    </main>
  );
}
