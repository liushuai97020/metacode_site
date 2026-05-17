import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface GradientButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
}

/* 渐变按钮 — 光晕悬浮 + 弹性缩放 */
export default function GradientButton({
  children, variant = 'primary', size = 'md', className, onClick, as = 'button', href, target, rel,
}: GradientButtonProps) {
  const base = cn(
    'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 select-none cursor-pointer',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40',
    size === 'sm' && 'px-4 py-2 text-sm',
    size === 'md' && 'px-6 py-3 text-sm',
    size === 'lg' && 'px-8 py-4 text-base',
    variant === 'primary' && 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/45',
    variant === 'outline' && 'border border-blue-400/30 text-blue-300 hover:bg-blue-500/10 hover:border-blue-400/50',
    variant === 'ghost' && 'text-slate-400 hover:text-white hover:bg-white/[0.04]',
    className,
  );

  const spring = { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, transition: { type: 'spring' as const, stiffness: 400, damping: 15 } };

  if (as === 'a' && href) {
    return <motion.a href={href} target={target} rel={rel} className={base} {...spring}>{children}</motion.a>;
  }
  return <motion.button className={base} onClick={onClick} {...spring}>{children}</motion.button>;
}
