import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Props { children: ReactNode; intensity?: number; duration?: number; }

/* 持续上下浮动 */
export default function FloatElement({ children, intensity = 6, duration = 3.5 }: Props) {
  return (
    <motion.div
      animate={{ y: [-intensity, intensity, -intensity] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}
