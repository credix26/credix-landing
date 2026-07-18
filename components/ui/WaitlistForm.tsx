'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle, Users } from 'lucide-react'

const TOTAL_SPOTS = 35

const INDUSTRIES = [
  'Logistics & Transport',
  'Wholesale Distribution',
  'Manufacturing',
  'Import / Export',
  'IT & Technology Services',
  'Construction & Real Estate',
  'Retail',
  'Other',
]

const INVOICE_RANGES = [
  'Under LKR 100,000',
  'LKR 100,000 – 500,000',
  'LKR 500,000 – 1,000,000',
  'LKR 1,000,000 – 5,000,000',
  'Above LKR 5,000,000',
]

interface FormData {
  name:         string
  businessName: string
  phone:        string
  email:        string
  industry:     string
  invoiceRange: string
}

const INIT: FormData = {
  name: '', businessName: '', phone: '', email: '', industry: '', invoiceRange: '',
}

export default function WaitlistForm() {
  const [form, setForm]       = useState<FormData>(INIT)
  const [errors, setErrors]   = useState<Partial<FormData>>({})
  const [submitted, setSubmitted] = useState(false)
  const [spotsLeft, setSpotsLeft] = useState(7)  // simulate taken spots
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const validate = (): boolean => {
    const e: Partial<FormData> = {}
    if (!form.name.trim())         e.name         = 'Required'
    if (!form.businessName.trim()) e.businessName = 'Required'
    if (!form.email.includes('@')) e.email        = 'Valid email required'
    if (!form.industry)            e.industry     = 'Select an industry'
    if (!form.invoiceRange)        e.invoiceRange = 'Select a range'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    setSubmitError(null)
    try {
      const res = await fetch('https://formspree.io/f/mlgzjnqv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name:              form.name,
          businessName:      form.businessName,
          phone:             form.phone,
          email:             form.email,
          industry:          form.industry,
          avgMonthlyInvoice: form.invoiceRange,
        }),
      })
      if (!res.ok) throw new Error('Submission failed')
      setSubmitted(true)
      setSpotsLeft(s => Math.max(0, s - 1))
    } catch {
      setSubmitError('Something went wrong sending your details. Please try again, or email us at contact@credix.lk.')
    } finally {
      setLoading(false)
    }
  }

  const set = (k: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm(f => ({ ...f, [k]: e.target.value }))
    setErrors(er => ({ ...er, [k]: undefined }))
  }

  const inputCls = (k: keyof FormData) =>
    `w-full bg-navy border rounded-xl px-4 py-3 text-white font-dm text-sm placeholder:text-text-dim focus:outline-none transition-all duration-200 ${
      errors[k]
        ? 'border-red-500/50 focus:border-red-400'
        : 'border-navy-mid focus:border-teal/60'
    }`

  return (
    <section className="py-28 relative" id="waitlist">
      {/* Gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,200,150,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-2xl mx-auto px-6 relative">
        {/* Spots counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="flex items-center gap-2 glass border border-teal/25 rounded-full px-5 py-2">
            <Users size={14} className="text-teal" />
            <span className="font-mono text-sm text-white">
              <span className="text-teal font-bold">{String(spotsLeft).padStart(2, '0')}</span>
              <span className="text-text-muted"> of {TOTAL_SPOTS} beta spots remaining</span>
            </span>
          </div>
        </motion.div>

        {/* Spots progress bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="h-1 bg-navy-mid rounded-full mb-10 overflow-hidden"
        >
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-teal to-cyan"
            initial={{ width: 0 }}
            whileInView={{ width: `${((TOTAL_SPOTS - spotsLeft) / TOTAL_SPOTS) * 100}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="font-mono text-xs text-teal tracking-widest mb-3 uppercase">
            Beta access
          </p>
          <h2
            className="font-syne font-bold text-white leading-tight mb-4"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)' }}
          >
            Get cash flowing<br />before we launch.
          </h2>
          <p className="font-dm text-text-muted text-base leading-relaxed max-w-md mx-auto">
            Beta members get priority onboarding, zero platform fees for the first 3 invoices,
            and a direct line to the founding team.
          </p>
        </motion.div>

        {/* Form */}
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-3xl p-10 border border-teal/25 text-center flex flex-col items-center gap-5"
            >
              <div className="w-16 h-16 rounded-full bg-teal/15 border border-teal/30 flex items-center justify-center">
                <CheckCircle size={30} className="text-teal" />
              </div>
              <div>
                <h3 className="font-syne font-bold text-white text-2xl mb-2">
                  You're on the list.
                </h3>
                <p className="font-dm text-text-muted">
                  We'll reach out within 48 hours to confirm your beta spot.
                  Check your inbox at <span className="text-teal">{form.email}</span>.
                </p>
              </div>
              <p className="font-mono text-xs text-text-dim">
                Questions? Email us at <span className="text-teal">contact@credix.lk</span>
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="glass rounded-3xl p-8 border border-navy-mid flex flex-col gap-5"
            >
              {/* Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-xs text-text-muted mb-1.5 block">Full name *</label>
                  <input
                    value={form.name}
                    onChange={set('name')}
                    placeholder="Vikram Sanjeeva"
                    className={inputCls('name')}
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-400 font-mono">{errors.name}</p>}
                </div>
                <div>
                  <label className="font-mono text-xs text-text-muted mb-1.5 block">Business name *</label>
                  <input
                    value={form.businessName}
                    onChange={set('businessName')}
                    placeholder="Nexus Wholesale Pvt Ltd"
                    className={inputCls('businessName')}
                  />
                  {errors.businessName && <p className="mt-1 text-xs text-red-400 font-mono">{errors.businessName}</p>}
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-xs text-text-muted mb-1.5 block">Phone / WhatsApp</label>
                  <input
                    value={form.phone}
                    onChange={set('phone')}
                    placeholder="+94 77 000 0000"
                    className={inputCls('phone')}
                  />
                </div>
                <div>
                  <label className="font-mono text-xs text-text-muted mb-1.5 block">Email *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={set('email')}
                    placeholder="you@business.lk"
                    className={inputCls('email')}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-400 font-mono">{errors.email}</p>}
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-xs text-text-muted mb-1.5 block">Industry *</label>
                  <select
                    value={form.industry}
                    onChange={set('industry')}
                    className={`${inputCls('industry')} appearance-none`}
                  >
                    <option value="" disabled>Select industry</option>
                    {INDUSTRIES.map(ind => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
                  {errors.industry && <p className="mt-1 text-xs text-red-400 font-mono">{errors.industry}</p>}
                </div>
                <div>
                  <label className="font-mono text-xs text-text-muted mb-1.5 block">Avg monthly invoice value *</label>
                  <select
                    value={form.invoiceRange}
                    onChange={set('invoiceRange')}
                    className={`${inputCls('invoiceRange')} appearance-none`}
                  >
                    <option value="" disabled>Select range</option>
                    {INVOICE_RANGES.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                  {errors.invoiceRange && <p className="mt-1 text-xs text-red-400 font-mono">{errors.invoiceRange}</p>}
                </div>
              </div>

              {submitError && (
                <p className="text-center text-xs text-red-400 font-mono">{submitError}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || spotsLeft === 0}
                className="mt-2 w-full inline-flex items-center justify-center gap-3 bg-teal text-void font-syne font-bold py-4 rounded-xl transition-all duration-200 hover:bg-teal-dim hover:shadow-[0_0_32px_rgba(0,200,150,0.3)] disabled:opacity-50 disabled:cursor-not-allowed text-base"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-void/40 border-t-void rounded-full animate-spin" />
                    Reserving your spot…
                  </>
                ) : (
                  <>
                    Claim my beta spot
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              <p className="text-center font-mono text-xs text-text-dim">
                No commitment. No card required. Just early access.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
