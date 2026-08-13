import type { Metadata, Viewport } from 'next'
import './globals.css'
import CookieBanner from '@/components/ui/CookieBanner'

export const metadata: Metadata = {
  title: 'Credix: AI Powered Invoice Financing for Sri Lankan SMEs',
  description:
    'Convert your unpaid invoices into working capital within 72 hours. No collateral. No banks. Just cash.',
  keywords: 'invoice financing, Sri Lanka, SME, working capital, fintech, credix',
  openGraph: {
    title: 'Credix: AI Powered Invoice Financing for Sri Lankan SMEs',
    description: 'Your invoices are money. Stop waiting months to get paid.',
    url: 'https://credix.lk',
    siteName: 'Credix',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#04060C',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body>
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
