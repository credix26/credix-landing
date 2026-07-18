'use client'

import { motion } from 'framer-motion'
import { X, Check } from 'lucide-react'

const PAINS = [
  {
    problem: '30–90 day payment cycles',
    detail:  'Your buyers pay on their schedule. Your staff, suppliers, and rent don\'t wait.',
    credix:  'Submit the invoice today. Cash in your account within 72 hours.',
  },
  {
    problem: 'Banks require property as collateral',
    detail:  'Invoice financing exists at banks — but only if you own land or machinery to pledge.',
    credix:  'The invoice itself is the collateral. Your buyer\'s creditworthiness is the score.',
  },
  {
    problem: 'High-interest overdraft debt traps',
    detail:  'Overdrafts at 18–24% p.a. compound. You borrow to survive, not to grow.',
    credix:  '6–9% flat fee, charged once at disbursement. No compounding. No surprises.',
  },
  {
    problem: 'Manual review taking 10–21 days',
    detail:  'Bank credit committees meet weekly. Your cash flow crisis doesn\'t schedule ahead.',
    credix:  'AI decision in under 60 seconds. No branch visit. No paper queue.',
  },
]

const cardV = {
  hidden:  { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function PainPoints() {
  return (
    <section className="py-24 relative" id="pain-points">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,200,150,1) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(0,200,150,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="font-mono text-xs text-teal tracking-widest mb-3 uppercase">
            The problem
          </p>
          <h2 className="font-syne font-bold text-white leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
            Sri Lanka's SMEs are trapped<br />
            by the system they built.
          </h2>
        </motion.div>

        <div className="flex flex-col gap-4">
          {PAINS.map((p, i) => (
            <motion.div
              key={p.problem}
              custom={i}
              variants={cardV}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="glass teal-hover rounded-2xl p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 border border-navy-mid"
            >
              {/* Left — problem */}
              <div className="flex gap-4">
                <div className="mt-1 w-8 h-8 rounded-full bg-red-500/10 border border-red-500/25 flex items-center justify-center shrink-0">
                  <X size={14} className="text-red-400" />
                </div>
                <div>
                  <h3 className="font-syne font-semibold text-white text-base mb-2">
                    {p.problem}
                  </h3>
                  <p className="font-dm text-text-muted text-sm leading-relaxed">
                    {p.detail}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden lg:block absolute left-1/2 top-6 bottom-6 w-px bg-navy-mid" />

              {/* Right — Credix solution */}
              <div className="flex gap-4">
                <div className="mt-1 w-8 h-8 rounded-full bg-teal/10 border border-teal/25 flex items-center justify-center shrink-0">
                  <Check size={14} className="text-teal" />
                </div>
                <div>
                  <p className="font-mono text-xs text-teal mb-2 uppercase tracking-wider">
                    Credix solution
                  </p>
                  <p className="font-dm text-white text-sm leading-relaxed">
                    {p.credix}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
