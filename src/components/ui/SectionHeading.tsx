import { motion } from 'framer-motion';

interface SectionHeadingProps {
  badge: string;
  title: string;
  description?: string;
}

/* 区块标题 + 发光徽标 */
export default function SectionHeading({ badge, title, description }: SectionHeadingProps) {
  return (
    <motion.div
      className="text-center mb-14"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
    >
      <span className="inline-block px-3.5 py-1 text-xs font-medium tracking-wider uppercase text-blue-400 bg-blue-500/10 rounded-full border border-blue-500/20 mb-5">
        {badge}
      </span>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
