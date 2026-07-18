'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'How it works', href: '#workflow' },
  { label: 'Why Credix',   href: '#pain-points' },
  { label: 'Compare',      href: '#matrix' },
  { label: 'FAQ',          href: '#faq' },
  { label: 'Join beta',    href: '#waitlist' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? 'rgba(4,6,12,0.85)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled
          ? '1px solid rgba(26,43,74,0.6)'
          : '1px solid transparent',
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <img
            src="/logo1.png"
            alt="Credix"
            className="h-6 w-auto"
            onError={(e) => {
              const t = e.target as HTMLImageElement
              t.style.display = 'none'
              const next = t.nextElementSibling as HTMLElement | null
              if (next) next.style.display = 'block'
            }}
          />
          {/* Fallback wordmark if logo not present */}
          <span
            className="font-syne font-bold text-xl text-white hidden"
            style={{ display: 'none' }}
          >
            credi<span className="text-teal">&gt;&lt;</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-text-muted hover:text-white text-sm font-dm transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#waitlist"
          className="hidden md:inline-flex items-center gap-2 bg-teal text-void text-sm font-dm font-semibold px-5 py-2 rounded-full hover:bg-teal-dim transition-colors duration-200"
        >
          Get early access
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-text-muted hover:text-white transition-colors"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden bg-navy/95 backdrop-blur-xl border-t border-navy-mid px-6 py-6 flex flex-col gap-5"
          >
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-text-muted hover:text-white text-base font-dm transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#waitlist"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center bg-teal text-void text-sm font-dm font-semibold px-5 py-3 rounded-full"
            >
              Get early access
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
