'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie } from 'lucide-react'

const STORAGE_KEY = 'credix-cookie-consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = window.localStorage.getItem(STORAGE_KEY)
    if (!consent) setVisible(true)
  }, [])

  const respond = (choice: 'accepted' | 'declined') => {
    window.localStorage.setItem(STORAGE_KEY, choice)
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto z-[60] sm:max-w-md"
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent"
        >
          <div className="glass rounded-2xl p-5 border border-navy-mid shadow-[0_8px_40px_rgba(0,0,0,0.4)] flex flex-col sm:flex-row sm:items-start gap-4">
            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-teal/15 border border-teal/30 shrink-0">
              <Cookie size={16} className="text-teal" />
            </span>
            <div className="flex flex-col gap-3">
              <p className="text-sm font-dm text-text-muted leading-relaxed">
                We use cookies to improve your experience and understand site traffic.
                By continuing, you agree to our{' '}
                <a href="#" className="text-teal hover:text-white transition-colors underline underline-offset-2">
                  Cookie policy
                </a>.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => respond('accepted')}
                  className="inline-flex items-center justify-center bg-teal text-void font-dm font-semibold text-xs px-4 py-2 rounded-full hover:bg-teal-dim transition-colors duration-200"
                >
                  Accept
                </button>
                <button
                  onClick={() => respond('declined')}
                  className="inline-flex items-center justify-center text-text-muted hover:text-white font-dm text-xs px-4 py-2 border border-navy-mid hover:border-teal/30 rounded-full transition-all duration-200"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
