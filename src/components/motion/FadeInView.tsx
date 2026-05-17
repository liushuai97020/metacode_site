import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface Props {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
}

/* 滚动渐入动画 */
export default function FadeInView({ children, className, direction = 'up', delay = 0, duration = 0.5 }: Props) {
  const map = { up: { y: 36 }, down: { y: -36 }, left: { x: 36 }, right: { x: -36 } };
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, ...map[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
