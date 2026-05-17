import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: 'blue' | 'purple' | 'cyan' | 'none';
  onClick?: () => void;
}

/* 磨砂玻璃卡片 — 悬浮上浮 + 发光效果 */
export default function GlassCard({ children, className, glow = 'none', onClick }: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        'glass relative rounded-2xl p-6 transition-all duration-500 group cursor-pointer',
        glow === 'blue' && 'hover:shadow-[0_0_40px_rgb(59_130_246_/_0.15)]',
        glow === 'purple' && 'hover:shadow-[0_0_40px_rgb(139_92_246_/_0.15)]',
        className,
      )}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={onClick ? { scale: 0.97 } : undefined}
      onClick={onClick}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* hover 时边框渐变 */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgb(59 130 246 / 0.2), rgb(139 92 246 / 0.2))',
          padding: '1px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
