import { type ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface GlowBadgeProps {
  children: ReactNode;
  variant?: 'blue' | 'purple' | 'cyan';
  className?: string;
}

/* 发光标签 */
export default function GlowBadge({
  children,
  variant = 'blue',
  className,
}: GlowBadgeProps) {
  const colors = {
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full border',
        colors[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
