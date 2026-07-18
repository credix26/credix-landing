import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void:      '#04060C',
        navy:      '#0A1628',
        'navy-mid':'#1A2B4A',
        'navy-light':'#243655',
        teal:      '#00C896',
        'teal-dim':'#00A87B',
        gold:      '#EAA800',
        cyan:      '#00D4FF',
        coral:     '#FF5470',
        'text-primary': '#F0F4F8',
        'text-muted':   '#7BA4C0',
        'text-dim':     '#334155',
      },
      fontFamily: {
        syne:  ['Syne', 'sans-serif'],
        dm:    ['DM Sans', 'sans-serif'],
        mono:  ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'teal-glow':  'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(0,200,150,0.15) 0%, transparent 70%)',
        'cyan-glow':  'radial-gradient(ellipse 80% 60% at 60% 40%, rgba(0,212,255,0.12) 0%, transparent 70%)',
        'void-fade':  'linear-gradient(to bottom, #04060C 0%, #0A1628 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float':      'float 6s ease-in-out infinite',
        'scan':       'scan 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        scan: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(400%)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
