import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Credix: Invoice Financing for Sri Lankan SMEs',
    short_name: 'Credix',
    description:
      'Convert your unpaid invoices into working capital within 72 hours. No collateral. No banks. Just cash.',
    start_url: '/',
    display: 'standalone',
    background_color: '#04060C',
    theme_color: '#04060C',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
