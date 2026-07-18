'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, TrendingUp } from 'lucide-react'

type Status = 'Approved' | 'Pending' | 'In Review' | 'Disbursed'

interface Transaction {
  key:      string
  id:       string
  company:  string
  sector:   string
  terms:    string
  amount:   string
  status:   Status
  time:     string
}

const STATUS_STYLES: Record<Status, { bg: string; text: string; dot: string }> = {
  Approved:  { bg: 'rgba(0,200,150,0.12)',  text: '#00C896', dot: '#00C896' },
  Disbursed: { bg: 'rgba(0,212,255,0.12)',  text: '#00D4FF', dot: '#00D4FF' },
  Pending:   { bg: 'rgba(234,168,0,0.12)',  text: '#EAA800', dot: '#EAA800' },
  'In Review':{ bg: 'rgba(148,163,184,0.12)',text: '#94A3B8', dot: '#94A3B8' },
}

const BASE_TRANSACTIONS: Transaction[] = [
  { key:'base-1', id:'CRX-0847', company:'Colombo Freight Ltd',   sector:'Logistics',    terms:'Net-60', amount:'LKR 480,000', status:'Approved',   time:'2 min ago' },
  { key:'base-2', id:'CRX-0846', company:'Nexus Wholesale Pvt',   sector:'Wholesale',    terms:'Net-45', amount:'LKR 325,000', status:'Pending',    time:'8 min ago' },
  { key:'base-3', id:'CRX-0845', company:'Lanka Imports Co.',     sector:'Import/Export', terms:'Net-90', amount:'LKR 760,000', status:'In Review',  time:'15 min ago'},
  { key:'base-4', id:'CRX-0844', company:'Pearl Logistics Ltd',   sector:'Logistics',    terms:'Net-30', amount:'LKR 195,000', status:'Disbursed',  time:'34 min ago'},
  { key:'base-5', id:'CRX-0843', company:'Sunrise Manufacturers', sector:'Manufacturing', terms:'Net-60', amount:'LKR 630,000', status:'Approved',   time:'1 hr ago'  },
]

export default function LiveDashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>(BASE_TRANSACTIONS)
  const [pulseKey, setPulseKey] = useState(0)

  /* Simulate live updates every 7 seconds */
  useEffect(() => {
    const interval = setInterval(() => {
      const newTx: Transaction = {
        key:     `tx-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        id:      `CRX-0${Math.floor(800 + Math.random() * 49)}`,
        company: ['Galle Trade Co.','Kelaniya Spice Pvt','WestCoast Freight','Apex Wholesale'][Math.floor(Math.random() * 4)],
        sector:  ['Logistics','Wholesale','Manufacturing','Import/Export'][Math.floor(Math.random() * 4)],
        terms:   ['Net-30','Net-45','Net-60','Net-90'][Math.floor(Math.random() * 4)],
        amount:  `LKR ${((Math.random() * 8 + 1) * 100000).toLocaleString('en', { maximumFractionDigits: 0 })}`,
        status:  (['Approved','Pending','In Review'] as Status[])[Math.floor(Math.random() * 3)],
        time:    'just now',
      }
      setTransactions(prev => [newTx, ...prev.slice(0, 9)])
      setPulseKey(k => k + 1)
    }, 7000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-24 relative" id="dashboard">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div>
            <p className="font-mono text-xs text-teal tracking-widest mb-3 uppercase">
              Live Feed
            </p>
            <h2 className="font-syne font-bold text-white text-3xl md:text-4xl leading-tight">
              Capital unlocking<br />across Sri Lanka
            </h2>
          </div>

          {/* Total unlocked card */}
          <div className="glass rounded-2xl px-6 py-4 flex items-center gap-4 border border-navy-mid">
            <TrendingUp className="text-teal shrink-0" size={20} />
            <div>
              <p className="font-mono text-xs text-text-muted mb-1">Total Unlocked This Week</p>
              <p className="font-syne font-bold text-teal text-2xl">LKR 1.26M</p>
            </div>
          </div>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="glass rounded-2xl overflow-hidden border border-navy-mid"
        >
          {/* Table header */}
          <div className="grid grid-cols-[1fr_auto_auto_auto_auto] md:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-5 py-3 border-b border-navy-mid">
            {['Company','Sector','Terms','Amount','Status'].map(h => (
              <span
                key={h}
                className={`font-mono text-xs text-text-dim uppercase tracking-wider ${
                  h === 'Sector' || h === 'Terms' ? 'hidden md:block' : ''
                }`}
              >
                {h}
              </span>
            ))}
          </div>

          {/* Transaction rows */}
          <AnimatePresence initial={false}>
            {transactions.map((tx, i) => {
              const style = STATUS_STYLES[tx.status]
              return (
                <motion.div
                  key={tx.key}
                  layout
                  initial={{ opacity: 0, y: -16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-[1fr_auto_auto_auto_auto] md:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 items-center px-5 py-4 border-b border-navy-mid/50 hover:bg-navy-mid/20 transition-colors"
                >
                  {/* Company + ID */}
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="font-dm font-medium text-white text-sm truncate">
                      {tx.company}
                    </span>
                    <span className="font-mono text-xs text-text-muted">{tx.id} · {tx.time}</span>
                  </div>

                  <span className="font-mono text-xs text-text-muted hidden md:block">{tx.sector}</span>
                  <span className="font-mono text-xs text-text-muted hidden md:block">{tx.terms}</span>

                  <span className="font-mono text-sm text-white font-medium">{tx.amount}</span>

                  {/* Status badge */}
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full whitespace-nowrap"
                    style={{ background: style.bg, color: style.text }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{
                        background: style.dot,
                        boxShadow: i === 0 ? `0 0 6px ${style.dot}` : undefined,
                      }}
                    />
                    {tx.status}
                  </span>
                </motion.div>
              )
            })}
          </AnimatePresence>

          {/* Footer */}
          <div className="px-5 py-3 flex items-center gap-2 text-xs font-mono text-text-muted">
            <Activity size={12} className="text-teal animate-pulse" />
            <span key={pulseKey} className="text-teal">Live</span>
            <span>— updates every few seconds</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
