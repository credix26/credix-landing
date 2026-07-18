'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Zap, ShieldCheck } from 'lucide-react'
import dynamic from 'next/dynamic'

/* Dynamically import 3D canvas to avoid SSR issues */
const Canvas3D  = dynamic(() => import('@/components/scene/Canvas3D'),  { ssr: false })
const Invoice3D = dynamic(() => import('@/components/models/Invoice3D'), { ssr: false })

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.13, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Aurora glow blob behind canvas */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[55vw] h-[80vh] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 80% at 60% 50%, rgba(0,212,255,0.10) 0%, rgba(0,200,150,0.08) 40%, transparent 70%)',
          filter: 'blur(28px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center py-20">
        {/* ── LEFT: Copy ── */}
        <div className="flex flex-col gap-7 lg:pr-12">
          {/* Badge */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 self-center lg:self-start bg-teal/10 border border-teal/25 text-teal text-xs font-mono px-3 py-1.5 rounded-full"
          >
            <Zap size={11} className="shrink-0" />
            <span className="text-center">Sri Lanka's first AI invoice financing platform</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-syne font-bold leading-[1.06] tracking-tight text-white"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)' }}
          >
            Your invoices<br />
            are money.<br />
            <span className="gradient-text">Stop waiting</span><br />
            to get paid.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-text-muted font-dm text-lg leading-relaxed max-w-md"
          >
            Submit an invoice. Get an AI decision in 60 seconds.
            Receive 80% of its value within 72 hours.
            No property collateral. No branch visits. No debt traps.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <a
              href="#waitlist"
              className="group inline-flex items-center gap-2 bg-teal text-void font-dm font-semibold px-7 py-3.5 rounded-full text-sm hover:bg-teal-dim transition-all duration-200 hover:shadow-[0_0_32px_rgba(0,200,150,0.35)]"
            >
              Join 35-spot beta
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="#workflow"
              className="inline-flex items-center gap-2 text-text-muted hover:text-white font-dm text-sm px-4 py-3.5 border border-navy-mid hover:border-teal/30 rounded-full transition-all duration-200"
            >
              See how it works
            </a>
          </motion.div>

          {/* Social proof strip */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-3 self-center lg:self-start glass rounded-2xl pl-3 pr-5 py-2.5 mt-1"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-teal/15 border border-teal/30 shrink-0">
              <ShieldCheck size={14} className="text-teal" />
            </span>
            <div className="flex flex-col gap-0.5 items-center text-center">
              <p className="text-xs font-dm text-white leading-snug">
                Backed by leading<br />
                <span className="text-teal font-medium">private &amp; national accelerators</span>
              </p>
              <p className="text-xs font-dm text-text-muted leading-snug">
                Powered by <span className="text-coral font-medium">angel investors</span>
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT: 3D Invoice ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full h-[520px] lg:h-[640px]"
        >
          <Canvas3D className="w-full h-full">
            <Invoice3D />
          </Canvas3D>

          {/* Click hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full text-center px-4 text-xs font-mono text-text-muted pointer-events-none"
          >
            click the invoice to reveal AI scoring ↑
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
