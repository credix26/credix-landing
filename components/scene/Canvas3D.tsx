'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Lightformer, Preload } from '@react-three/drei'

/* ── Geometric fallback loader ────────────────────────────────── */
function Loader() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border border-teal/40 rounded-sm animate-spin" />
        <div
          className="absolute inset-2 border border-cyan/30 rounded-sm animate-spin"
          style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}
        />
        <div className="absolute inset-4 bg-teal/20 rounded-sm animate-pulse" />
      </div>
    </div>
  )
}

interface Canvas3DProps {
  children: React.ReactNode
  className?: string
}

export default function Canvas3D({ children, className }: Canvas3DProps) {
  return (
    <div className={className ?? 'w-full h-full'}>
      <Suspense fallback={<Loader />}>
        <Canvas
          camera={{ position: [0, 0, 5.5], fov: 42 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          dpr={[1, 2]}
          style={{ background: 'transparent' }}
        >
          {/* Ambient and directional lights */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[4, 6, 4]}
            intensity={1.8}
            color="#ffffff"
          />
          <pointLight position={[-4, -2, 3]} intensity={1.2} color="#00C896" />
          <pointLight position={[3, 3, 2]}  intensity={0.8} color="#00D4FF" />
          <pointLight position={[0, -4, 2]} intensity={0.5} color="#EAA800" />

          {/* Synthetic brand-colored environment for PBR reflections — no photographic HDRI */}
          <Environment resolution={256}>
            <Lightformer
              form="rect"
              intensity={2.2}
              color="#0A1628"
              scale={[10, 10, 1]}
              position={[0, 0, -5]}
            />
            <Lightformer
              form="rect"
              intensity={4}
              color="#00C896"
              scale={[4, 2.5, 1]}
              position={[-4, 2, 2]}
              rotation={[0, Math.PI / 4, 0]}
            />
            <Lightformer
              form="rect"
              intensity={3.5}
              color="#00D4FF"
              scale={[3, 3, 1]}
              position={[4, -1, 3]}
              rotation={[0, -Math.PI / 4, 0]}
            />
            <Lightformer
              form="ring"
              intensity={2.5}
              color="#EAA800"
              scale={2.2}
              position={[0, 4, 1]}
            />
          </Environment>

          <Suspense fallback={null}>{children}</Suspense>
          <Preload all />
        </Canvas>
      </Suspense>
    </div>
  )
}
