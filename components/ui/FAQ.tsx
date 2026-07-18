'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  {
    q: 'How is Credix different from a bank loan or overdraft?',
    a: 'Banks require property or machinery as collateral and take 10–21 days to decide. Credix uses your invoice itself as the asset — our AI evaluates your buyer\'s creditworthiness and gives a decision in under 60 seconds, with cash in your account within 24–72 hours.',
  },
  {
    q: 'Is Credix a licensed and legitimate financial service?',
    a: 'Yes. Credix operates through partnership models with SME-facing licensed banks, so every transaction is structured and disbursed in compliance with Central Bank of Sri Lanka (CBSL) regulations giving you the same regulatory protections as traditional invoice financing.',
  },
  {
    q: 'What does Credix actually charge?',
    a: 'A flat 6–9% service fee, deducted once at disbursement. There\'s no interest, no compounding, and no hidden charges — what you see quoted is what you pay.',
  },
  {
    q: 'How much of my invoice value do I receive, and when?',
    a: 'You receive 80% of the approved invoice value upfront, usually within 24–72 hours of submission. The remaining balance, minus our service fee, is released once your buyer settles the invoice.',
  },
  {
    q: 'What happens if my buyer pays late?',
    a: 'Our AI risk scoring evaluates buyer reliability before approval to minimize this risk. If a payment is delayed, our team works directly with you and the buyer to resolve it — the specific process is outlined in your beta agreement.',
  },
  {
    q: 'Who\'s eligible to join the beta?',
    a: 'SMEs across logistics, wholesale, manufacturing, import/export, technology, construction, and retail in Sri Lanka — registered or unregistered. Beta spots are limited, so early applicants get priority onboarding and zero platform fees on their first 3 invoices.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="py-24 relative" id="faq">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="font-mono text-xs text-teal tracking-widest mb-3 uppercase">
            FAQ
          </p>
          <h2
            className="font-syne font-bold text-white leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
          >
            Common questions.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-col gap-3"
        >
          {FAQS.map((item, i) => {
            const isOpen = open === i
            return (
              <div
                key={item.q}
                className="glass rounded-2xl border border-navy-mid overflow-hidden"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left px-6 py-5"
                  aria-expanded={isOpen}
                >
                  <span className="font-syne font-semibold text-white text-base">
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0 text-teal"
                  >
                    <ChevronDown size={18} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 font-dm text-text-muted text-sm leading-relaxed">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
