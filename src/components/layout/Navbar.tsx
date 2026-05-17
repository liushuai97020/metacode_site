import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { NavItem } from '../../types';

const NAVS: NavItem[] = [
  { label: '首页', path: '/' },
  { label: '功能', path: '/features' },
  { label: '架构', path: '/architecture' },
  { label: '下载', path: '/download' },
  { label: '日志', path: '/changelog' },
  { label: '关于', path: '/about' },
];

/* 顶部导航 — 滚动变暗、移动端抽屉菜单 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const cb = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', cb, { passive: true });
    return () => window.removeEventListener('scroll', cb);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <nav
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-400',
        scrolled ? 'glass-heavy shadow-lg shadow-black/30' : 'bg-transparent',
      )}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold gradient-text">MetaCode</span>
        </Link>

        {/* 桌面端链接 */}
        <div className="hidden md:flex items-center gap-1">
          {NAVS.map((n) => (
            <Link
              key={n.path}
              to={n.path}
              className={cn(
                'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                pathname === n.path
                  ? 'text-white bg-white/[0.08]'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]',
              )}
            >
              {n.label}
            </Link>
          ))}
        </div>

        {/* 移动端菜单按钮 */}
        <button
          className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="菜单"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* 移动端抽屉 */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden glass-heavy border-t border-white/5"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="px-5 py-3 space-y-1">
              {NAVS.map((n) => (
                <Link
                  key={n.path}
                  to={n.path}
                  className={cn(
                    'block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    pathname === n.path
                      ? 'text-white bg-blue-500/10 border border-blue-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-white/5',
                  )}
                >
                  {n.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
