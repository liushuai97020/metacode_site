import { Link } from 'react-router-dom';
import { Github } from 'lucide-react';

/* 页脚 — 版权、链接 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="text-lg font-bold gradient-text">MetaCode</span>
            <p className="text-slate-600 text-xs mt-1">
              &copy; {year} MetaCode. MIT License.
            </p>
          </div>
          <div className="flex items-center gap-6 text-xs text-slate-500">
            <Link to="/about" className="hover:text-slate-300 transition-colors">关于我们</Link>
            <a href="#" className="hover:text-slate-300 transition-colors">隐私政策</a>
            <a href="#" className="hover:text-slate-300 transition-colors">使用协议</a>
            <a href="https://github.com/liushuai97020/Meta-CC-Hub/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <Github size={18} />
            </a>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-white/[0.04] text-center">
          <p className="text-slate-700 text-[11px]">
            本地私有化 AI 编码助手 · 代码数据永不上云
          </p>
        </div>
      </div>
    </footer>
  );
}
