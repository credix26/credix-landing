'use client'

import Navigation       from '@/components/ui/Navigation'
import HeroSection      from '@/components/ui/HeroSection'
import MetricsDisplay   from '@/components/ui/MetricsDisplay'
import LiveDashboard    from '@/components/ui/LiveDashboard'
import PainPoints       from '@/components/ui/PainPoints'
import WorkflowTimeline from '@/components/ui/WorkflowTimeline'
import CompetitiveMatrix from '@/components/ui/CompetitiveMatrix'
import WaitlistForm     from '@/components/ui/WaitlistForm'
import FAQ               from '@/components/ui/FAQ'
import Footer           from '@/components/ui/Footer'

export default function Home() {
  return (
    <main className="relative min-h-screen bg-void overflow-x-hidden">
      {/* Ambient background glow — fixed, full page */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 70% 20%, rgba(0,212,255,0.07) 0%, transparent 60%),' +
            'radial-gradient(ellipse 50% 40% at 20% 80%, rgba(0,200,150,0.06) 0%, transparent 60%)',
        }}
      />

      <Navigation />

      <div className="relative z-10">
        <HeroSection />
        <MetricsDisplay />
        <LiveDashboard />
        <PainPoints />
        <WorkflowTimeline />
        <CompetitiveMatrix />
        <WaitlistForm />
        <FAQ />
        <Footer />
      </div>
    </main>
  )
}
