'use client'

import { motion } from 'framer-motion'

const METRICS = [
  { value: '24–72h',  label: 'Average time to cash',       color: '#00C896', sub: 'vs 10–21 days at banks' },
  { value: '80%',     label: 'Of invoice value upfront',   color: '#00D4FF', sub: 'Same-day disbursement' },
  { value: '6–9%',    label: 'Transparent service fee',    color: '#EAA800', sub: 'No hidden interest charges' },
  { value: '0%',      label: 'Collateral required',        color: '#00C896', sub: 'Invoice is the asset' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const cardVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function MetricsDisplay() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Section divider glow */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,200,150,0.4), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {METRICS.map((m) => (
            <motion.div
              key={m.value}
              variants={cardVariants}
              className="glass teal-hover rounded-2xl p-6 flex flex-col gap-3 cursor-default"
              style={{ borderColor: 'rgba(26,43,74,0.8)' }}
            >
              {/* Value */}
              <span
                className="font-syne font-bold leading-none"
                style={{
                  fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                  color: m.color,
                }}
              >
                {m.value}
              </span>

              {/* Label */}
              <span className="font-dm font-medium text-white text-sm leading-snug">
                {m.label}
              </span>

              {/* Sub */}
              <span className="font-mono text-xs text-text-muted">
                {m.sub}
              </span>

              {/* Bottom accent line */}
              <div
                className="mt-auto h-[2px] rounded-full w-10"
                style={{ background: m.color, opacity: 0.5 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
