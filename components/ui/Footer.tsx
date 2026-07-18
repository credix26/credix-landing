'use client'

const LINKS = {
  Product:   ['How it works', 'Why Credix', 'Compare alternatives', 'Beta access'],
  Company:   ['About us', 'Contact'],
  Legal:     ['Privacy policy', 'Terms of service', 'Cookie policy'],
}

export default function Footer() {
  return (
    <footer className="border-t border-navy-mid">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="flex flex-col gap-5">
          <img
            src="/logo1.png"
            alt="Credix"
            className="h-6 w-auto self-start"
            onError={(e) => {
              const t = e.target as HTMLImageElement
              t.style.display = 'none'
            }}
          />
          <p className="font-dm text-text-muted text-sm leading-relaxed max-w-xs">
            Sri Lanka's first AI-powered B2B invoice financing platform.
            Converting unpaid invoices into working capital within 72 hours.
          </p>
          <div className="flex gap-4">
            <a
              href="mailto:contact@credix.lk"
              className="font-mono text-xs text-teal hover:text-white transition-colors"
            >
              contact@credix.lk
            </a>
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(LINKS).map(([heading, links]) => (
          <div key={heading} className="flex flex-col gap-4">
            <h4 className="font-mono text-xs text-text-dim uppercase tracking-wider">{heading}</h4>
            <ul className="flex flex-col gap-3">
              {links.map(link => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-dm text-sm text-text-muted hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-navy-mid">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-xs text-text-dim text-center">
            © 2026 Credix Private Limited. Registered in Sri Lanka &amp; Singapore.
          </p>
          <p className="font-mono text-xs text-text-dim">
            credix.lk
          </p>
        </div>
      </div>
    </footer>
  )
}
