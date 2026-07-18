'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, Cpu, Banknote } from 'lucide-react'

const STEPS = [
  {
    num:   '01',
    icon:  Upload,
    title: 'Upload invoice',
    time:  '5 minutes',
    color: '#00C896',
    detail: [
      'Log in to credix.lk or the mobile app.',
      'Upload your invoice PDF and enter the buyer company name.',
      'Our system instantly verifies the invoice format and records a unique identifier on the blockchain — preventing duplicate financing fraud.',
    ],
  },
  {
    num:   '02',
    icon:  Cpu,
    title: 'AI & blockchain score',
    time:  'Under 60 seconds',
    color: '#00D4FF',
    detail: [
      'Our AI model (0.91 AUC-ROC, trained on 100,000+ records) evaluates buyer reliability, invoice value, sector risk, and your history.',
      'You receive a decision — Approved, Pending, or Declined — with a full risk breakdown in plain language.',
      'No loan officer. No credit committee meeting. No week-long wait.',
    ],
  },
  {
    num:   '03',
    icon:  Banknote,
    title: 'Cash disbursed',
    time:  '24–72 hours',
    color: '#EAA800',
    detail: [
      '80% of your approved invoice value is transferred directly to your business bank account.',
      'A flat service fee of 6–9% is deducted at disbursement — no interest, no compounding.',
      'When your buyer pays the invoice, the remaining 20% (minus fee) is returned to you.',
    ],
  },
]

export default function WorkflowTimeline() {
  const [active, setActive] = useState(0)
  const step = STEPS[active]

  return (
    <section className="py-24 relative" id="workflow">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="font-mono text-xs text-teal tracking-widest mb-3 uppercase">
            How it works
          </p>
          <h2
            className="font-syne font-bold text-white leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
          >
            Three steps.<br />One business day.
          </h2>
        </motion.div>

        {/* Step selector tabs */}
        <div className="flex gap-3 mb-10 flex-wrap">
          {STEPS.map((s, i) => (
            <button
              key={s.num}
              onClick={() => setActive(i)}
              className="flex items-center gap-3 px-5 py-3 rounded-xl border transition-all duration-300 font-dm text-sm"
              style={{
                background: active === i ? `${s.color}14` : 'transparent',
                borderColor: active === i ? `${s.color}50` : 'rgba(26,43,74,0.8)',
                color: active === i ? s.color : '#7BA4C0',
              }}
            >
              <span className="font-mono text-xs opacity-60">{s.num}</span>
              {s.title}
            </button>
          ))}
        </div>

        {/* Active step detail */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="glass rounded-3xl p-8 md:p-12 border border-navy-mid grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
        >
          {/* Left — icon + timing */}
          <div className="flex flex-col gap-6">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: `${step.color}18`, border: `1px solid ${step.color}35` }}
            >
              <step.icon size={28} style={{ color: step.color }} />
            </div>

            <div>
              <span className="font-mono text-xs tracking-wider uppercase mb-2 block" style={{ color: step.color }}>
                Step {step.num}
              </span>
              <h3 className="font-syne font-bold text-white text-3xl mb-3">
                {step.title}
              </h3>
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono"
                style={{ background: `${step.color}12`, color: step.color }}
              >
                ⏱ {step.time}
              </div>
            </div>

            {/* Step connector dots */}
            <div className="flex gap-2">
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setActive(i)}
                  className="cursor-pointer h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: i === active ? '2.5rem' : '0.5rem',
                    background: i === active ? step.color : 'rgba(26,43,74,0.8)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right — detail points */}
          <div className="flex flex-col gap-5">
            {step.detail.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="flex gap-4"
              >
                <div
                  className="mt-1 w-5 h-5 rounded-full shrink-0 flex items-center justify-center text-xs font-mono"
                  style={{ background: `${step.color}20`, color: step.color }}
                >
                  {i + 1}
                </div>
                <p className="font-dm text-text-muted text-sm leading-relaxed">{point}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
