import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface Props { children: ReactNode; className?: string; staggerDelay?: number; }

/* 子元素逐个渐入容器 */
export default function StaggerContainer({ children, className, staggerDelay = 0.08 }: Props) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={{ visible: { transition: { staggerChildren: staggerDelay } } }}
    >
      {children}
    </motion.div>
  );
}

/* 子元素动画变体 */
export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};
