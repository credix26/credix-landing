'use client'

import { motion } from 'framer-motion'
import { Check, X, Minus } from 'lucide-react'

type Cell = 'yes' | 'no' | 'partial' | string

interface Row {
  param:    string
  credix:   Cell
  banks:    Cell
  micro:    Cell
  overdraft:Cell
}

const ROWS: Row[] = [
  { param:'Collateral required',   credix:'no',      banks:'yes',     micro:'yes',     overdraft:'yes'     },
  { param:'Decision speed',        credix:'60 sec',  banks:'10–21 d', micro:'3–7 d',   overdraft:'1–5 d'   },
  { param:'Disbursement time',     credix:'24–72h',  banks:'2–4 wks', micro:'1–2 wks', overdraft:'Same day'},
  { param:'Effective annual cost', credix:'~10–13%', banks:'14–18%',  micro:'24–36%',  overdraft:'18–24%'  },
  { param:'Max invoice value',     credix:'No cap',  banks:'Capped',  micro:'< LKR 1M',overdraft:'Limit'   },
  { param:'Blockchain fraud proof',credix:'yes',     banks:'no',      micro:'no',      overdraft:'no'      },
  { param:'AI risk scoring',       credix:'yes',     banks:'no',      micro:'no',      overdraft:'no'      },
  { param:'Audited accounts needed',credix:'no',     banks:'yes',     micro:'partial', overdraft:'partial'  },
  { param:'Available to unregistered SMEs',credix:'yes', banks:'no', micro:'partial', overdraft:'partial' },
]

function CellContent({ val }: { val: Cell }) {
  if (val === 'yes')
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-teal/15 border border-teal/30">
        <Check size={12} className="text-teal" />
      </span>
    )
  if (val === 'no')
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500/10 border border-red-500/20">
        <X size={12} className="text-red-400" />
      </span>
    )
  if (val === 'partial')
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-500/10 border border-amber-500/20">
        <Minus size={12} className="text-amber-400" />
      </span>
    )
  return <span className="font-mono text-xs text-white">{val}</span>
}

const COLS: { key: keyof Omit<Row, 'param'>; label: string; highlight: boolean }[] = [
  { key: 'credix',    label: 'Credix',      highlight: true  },
  { key: 'banks',     label: 'Large Banks',  highlight: false },
  { key: 'micro',     label: 'Microfinance', highlight: false },
  { key: 'overdraft', label: 'Overdraft',    highlight: false },
]

export default function CompetitiveMatrix() {
  return (
    <section className="py-24 relative" id="matrix">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="font-mono text-xs text-teal tracking-widest mb-3 uppercase">
            Why us
          </p>
          <h2
            className="font-syne font-bold text-white leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
          >
            The honest comparison.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="overflow-x-auto rounded-2xl border border-navy-mid"
        >
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-navy-mid">
                <th className="text-left px-5 py-4 font-mono text-xs text-text-dim tracking-wider uppercase w-[35%]">
                  Parameter
                </th>
                {COLS.map(col => (
                  <th
                    key={col.key}
                    className="px-4 py-4 text-center"
                    style={{
                      background: col.highlight ? 'rgba(0,200,150,0.06)' : undefined,
                      borderLeft: col.highlight ? '1px solid rgba(0,200,150,0.25)' : '1px solid rgba(26,43,74,0.5)',
                      borderRight: col.highlight ? '1px solid rgba(0,200,150,0.25)' : undefined,
                    }}
                  >
                    <span
                      className="font-syne font-semibold text-sm"
                      style={{ color: col.highlight ? '#00C896' : '#7BA4C0' }}
                    >
                      {col.label}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr
                  key={row.param}
                  className="border-b border-navy-mid/50 hover:bg-navy-mid/20 transition-colors"
                >
                  <td className="px-5 py-3.5 font-dm text-text-muted text-sm">
                    {row.param}
                  </td>
                  {COLS.map(col => (
                    <td
                      key={col.key}
                      className="px-4 py-3.5 text-center"
                      style={{
                        background: col.highlight ? 'rgba(0,200,150,0.04)' : undefined,
                        borderLeft: col.highlight ? '1px solid rgba(0,200,150,0.15)' : '1px solid rgba(26,43,74,0.3)',
                        borderRight: col.highlight ? '1px solid rgba(0,200,150,0.15)' : undefined,
                      }}
                    >
                      <span className="flex justify-center">
                        <CellContent val={row[col.key]} />
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <p className="mt-4 font-mono text-xs text-text-dim text-center">
          *Effective annual cost is an illustrative estimate for typical usage and varies by invoice mix and repayment timing. Bank rates sourced from CBSL published lending rates, CY2024.
        </p>
      </div>
    </section>
  )
}
