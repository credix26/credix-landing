'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { useFrame }                from '@react-three/fiber'
import {
  RoundedBox,
  Text,
  Float,
  MeshTransmissionMaterial,
} from '@react-three/drei'
import * as THREE from 'three'

/* ── helpers ──────────────────────────────────────────────────── */
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

/* Flat rounded-rect shape — used for thin pill badges where an extruded
   RoundedBox would need a depth greater than 2x its radius (ours is thinner). */
function roundedRectShape(width: number, height: number, radius: number) {
  const w = width / 2
  const h = height / 2
  const r = Math.min(radius, w, h)
  const shape = new THREE.Shape()
  shape.moveTo(-w + r, -h)
  shape.lineTo(w - r, -h)
  shape.absarc(w - r, -h + r, r, -Math.PI / 2, 0, false)
  shape.lineTo(w, h - r)
  shape.absarc(w - r, h - r, r, 0, Math.PI / 2, false)
  shape.lineTo(-w + r, h)
  shape.absarc(-w + r, h - r, r, Math.PI / 2, Math.PI, false)
  shape.lineTo(-w, -h + r)
  shape.absarc(-w + r, -h + r, r, Math.PI, Math.PI * 1.5, false)
  return shape
}

/* ── Line items (grey bars) on invoice face ──────────────────── */
function InvoiceLines() {
  const lines = [
    { y: 0.6,  w: 1.8, label: 'Lanka Tiles PLC',   val: 'LKR 420,000' },
    { y: 0.2,  w: 1.4, label: 'Net-60 Logistics',  val: 'LKR 195,000' },
    { y: -0.2, w: 1.6, label: 'Service Fee 7.5%',  val: '−LKR 31,500' },
  ]
  return (
    <group position={[0, 0, 0.035]}>
      {lines.map((l, i) => (
        <group key={i} position={[0, l.y, 0]}>
          {/* Row background */}
          <mesh>
            <planeGeometry args={[2.6, 0.18]} />
            <meshBasicMaterial color="#0A1628" transparent opacity={0.6} />
          </mesh>
          {/* Label */}
          <Text
            position={[-1.1, 0, 0.002]}
            fontSize={0.09}
            color="#7BA4C0"
            anchorX="left"
            anchorY="middle"
          >
            {l.label}
          </Text>
          {/* Value */}
          <Text
            position={[1.1, 0, 0.002]}
            fontSize={0.09}
            color="#F0F4F8"
            anchorX="right"
            anchorY="middle"
          >
            {l.val}
          </Text>
          {/* Divider */}
          <mesh position={[0, -0.1, 0.001]}>
            <planeGeometry args={[2.6, 0.005]} />
            <meshBasicMaterial color="#1A2B4A" transparent opacity={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

/* ── Front face of the invoice ───────────────────────────────── */
function InvoiceFront() {
  return (
    <group>
      {/* Header band */}
      <mesh position={[0, 1.7, 0.034]}>
        <planeGeometry args={[3.0, 0.5]} />
        <meshBasicMaterial color="#00C896" transparent opacity={0.15} />
      </mesh>

      {/* INVOICE label */}
      <Text
        position={[-1.1, 1.72, 0.036]}
        fontSize={0.16}
        color="#00C896"
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.15}
      >
        INVOICE
      </Text>

      {/* Invoice number */}
      <Text
        position={[1.1, 1.72, 0.036]}
        fontSize={0.1}
        color="#7BA4C0"
        anchorX="right"
        anchorY="middle"
      >
        #CRX-2024-0847
      </Text>

      {/* Company name */}
      <Text
        position={[-1.1, 1.28, 0.036]}
        fontSize={0.13}
        color="#F0F4F8"
        anchorX="left"
        anchorY="middle"
      >
        Nexus Wholesale Pvt Ltd
      </Text>

      {/* Date */}
      <Text
        position={[-1.1, 1.08, 0.036]}
        fontSize={0.09}
        color="#7BA4C0"
        anchorX="left"
        anchorY="middle"
      >
        Issued: 14 Jul 2026  ·  Due: 12 Oct 2026
      </Text>

      {/* Thin divider under header */}
      <mesh position={[0, 0.95, 0.034]}>
        <planeGeometry args={[2.7, 0.006]} />
        <meshBasicMaterial color="#00C896" transparent opacity={0.5} />
      </mesh>

      {/* Line items */}
      <InvoiceLines />

      {/* Total amount */}
      <mesh position={[0, -0.58, 0.034]}>
        <planeGeometry args={[2.7, 0.006]} />
        <meshBasicMaterial color="#1A2B4A" />
      </mesh>
      <Text
        position={[-1.1, -0.78, 0.036]}
        fontSize={0.11}
        color="#7BA4C0"
        anchorX="left"
        anchorY="middle"
      >
        TOTAL DUE
      </Text>
      <Text
        position={[1.1, -0.78, 0.036]}
        fontSize={0.2}
        color="#00C896"
        anchorX="right"
        anchorY="middle"
      >
        LKR 583,500
      </Text>

      {/* Gold chip (bottom left) */}
      <group position={[-0.9, -1.5, 0.04]}>
        <RoundedBox args={[0.55, 0.38, 0.04]} radius={0.04} smoothness={4}>
          <meshStandardMaterial color="#B8860B" metalness={0.95} roughness={0.1} />
        </RoundedBox>
        {/* Chip contact lines */}
        {[-0.08, 0, 0.08].map((x, i) => (
          <mesh key={i} position={[x, 0, 0.025]}>
            <planeGeometry args={[0.02, 0.26]} />
            <meshBasicMaterial color="#EAA800" transparent opacity={0.6} />
          </mesh>
        ))}
        {[-0.06, 0.06].map((y, i) => (
          <mesh key={i} position={[0, y, 0.025]}>
            <planeGeometry args={[0.38, 0.02]} />
            <meshBasicMaterial color="#EAA800" transparent opacity={0.6} />
          </mesh>
        ))}
      </group>

      {/* APPROVED stamp — raised 3D badge, scaled down */}
      <group position={[0.7, -1.45, 0.04]} scale={0.72}>
        {/* Raised disc base — real depth so it catches scene lighting */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.018]}>
          <cylinderGeometry args={[0.48, 0.48, 0.045, 48]} />
          <meshStandardMaterial
            color="#00C896"
            transparent
            opacity={0.18}
            metalness={0.4}
            roughness={0.3}
            emissive="#00C896"
            emissiveIntensity={0.12}
          />
        </mesh>
        {/* Raised rim ring */}
        <mesh position={[0, 0, 0.043]}>
          <ringGeometry args={[0.42, 0.47, 48]} />
          <meshStandardMaterial
            color="#00C896"
            metalness={0.6}
            roughness={0.2}
            emissive="#00C896"
            emissiveIntensity={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
        <Text
          position={[0, 0.04, 0.05]}
          fontSize={0.12}
          color="#00C896"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.12}
        >
          APPROVED
        </Text>
        <Text
          position={[0, -0.12, 0.05]}
          fontSize={0.07}
          color="#7BA4C0"
          anchorX="center"
          anchorY="middle"
        >
          ✓ CREDIX AI
        </Text>
      </group>

      {/* Neon edge lines along invoice border */}
      {[
        { pos: [0,  2.05, 0.034] as [number,number,number], size: [3.0, 0.006] },
        { pos: [0, -2.05, 0.034] as [number,number,number], size: [3.0, 0.006] },
      ].map((e, i) => (
        <mesh key={i} position={e.pos}>
          <planeGeometry args={e.size as [number, number]} />
          <meshBasicMaterial color="#00C896" transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  )
}

/* ── Back face — AI score reveal ─────────────────────────────── */
function InvoiceBack() {
  return (
    <group rotation={[0, Math.PI, 0]}>
      {/* Background panel */}
      <mesh position={[0, 0, 0.034]}>
        <planeGeometry args={[2.8, 3.8]} />
        <meshBasicMaterial color="#050D1A" transparent opacity={0.9} />
      </mesh>

      <Text
        position={[0, 1.6, 0.036]}
        fontSize={0.16}
        color="#00C896"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.1}
      >
        AI RISK SCORE
      </Text>

      {/* Score number */}
      <Text
        position={[0, 0.9, 0.036]}
        fontSize={0.65}
        color="#00C896"
        anchorX="center"
        anchorY="middle"
      >
        935
      </Text>
      <Text
        position={[0, 0.42, 0.036]}
        fontSize={0.09}
        color="#7BA4C0"
        anchorX="center"
        anchorY="middle"
      >
        out of 1,200
      </Text>

      {/* Rank badge — flat rounded-rect (see roundedRectShape helper) */}
      <group position={[0, 0.2, 0.036]}>
        <mesh>
          <shapeGeometry args={[roundedRectShape(0.62, 0.22, 0.11), 12]} />
          <meshBasicMaterial color="#00C896" transparent opacity={0.18} />
        </mesh>
        <Text
          position={[0, 0, 0.01]}
          fontSize={0.1}
          color="#00C896"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.06}
        >
          GOOD
        </Text>
      </group>

      {/* Score bar */}
      <mesh position={[0, -0.02, 0.036]}>
        <planeGeometry args={[2.2, 0.08]} />
        <meshBasicMaterial color="#1A2B4A" />
      </mesh>
      <mesh position={[-0.243, -0.02, 0.037]}>
        <planeGeometry args={[1.714, 0.08]} />
        <meshBasicMaterial color="#00C896" />
      </mesh>

      {[
        ['Default Risk',       '2.1%',       '#00C896'],
        ['Buyer Score',        'A+',          '#EAA800'],
        ['Time to Disburse',   '< 24h',       '#00D4FF'],
        ['Advance Rate',       '80%',         '#F0F4F8'],
      ].map(([label, val, col], i) => (
        <group key={i} position={[0, -0.32 - i * 0.38, 0.036]}>
          <mesh position={[0, 0, -0.001]}>
            <planeGeometry args={[2.4, 0.3]} />
            <meshBasicMaterial color="#0A1628" transparent opacity={0.6} />
          </mesh>
          <Text
            position={[-1.05, 0, 0.001]}
            fontSize={0.09}
            color="#7BA4C0"
            anchorX="left"
            anchorY="middle"
          >
            {label}
          </Text>
          <Text
            position={[1.05, 0, 0.001]}
            fontSize={0.12}
            color={col}
            anchorX="right"
            anchorY="middle"
          >
            {val}
          </Text>
        </group>
      ))}

      <Text
        position={[0, -2.02, 0.036]}
        fontSize={0.09}
        color="#7BA4C0"
        anchorX="center"
        anchorY="middle"
      >
        Click to flip back
      </Text>
    </group>
  )
}

/* ── Main Invoice3D component ────────────────────────────────── */
export default function Invoice3D() {
  const groupRef = useRef<THREE.Group>(null)
  const [flipped, setFlipped]     = useState(false)
  const [hovered, setHovered]     = useState(false)
  const mouse = useRef({ x: 0, y: 0 })
  const targetRot = useRef({ x: 0, y: 0 })
  const currentRot = useRef({ x: 0, y: 0 })
  const flipTarget = useRef(0)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth  - 0.5) * 2
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'default'
    return () => { document.body.style.cursor = 'default' }
  }, [hovered])

  const handleClick = useCallback(() => {
    setFlipped(f => !f)
  }, [])

  useFrame((_, delta) => {
    if (!groupRef.current) return

    // Flip animation
    flipTarget.current = flipped ? Math.PI : 0
    currentRot.current.y = lerp(
      currentRot.current.y,
      flipTarget.current + mouse.current.x * 0.18,
      Math.min(delta * 3.5, 1)
    )

    // Parallax tilt
    targetRot.current.x = -mouse.current.y * 0.14
    currentRot.current.x = lerp(
      currentRot.current.x,
      targetRot.current.x,
      Math.min(delta * 4, 1)
    )

    groupRef.current.rotation.y = currentRot.current.y
    groupRef.current.rotation.x = currentRot.current.x
  })

  const BASE_SCALE = 0.68

  return (
    <Float
      speed={1.6}
      rotationIntensity={0}
      floatIntensity={0.4}
      floatingRange={[-0.05, 0.05]}
    >
      <group
        ref={groupRef}
        onClick={handleClick}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        scale={hovered ? BASE_SCALE * 1.02 : BASE_SCALE}
      >
        {/* Main invoice sheet — transparent glassmorphism material */}
        <RoundedBox args={[3.2, 4.4, 0.06]} radius={0.08} smoothness={6}>
          <MeshTransmissionMaterial
            backside
            backsideThickness={0.2}
            samples={4}
            thickness={0.12}
            roughness={0.1}
            transmission={0.97}
            ior={1.4}
            chromaticAberration={0.02}
            anisotropy={0.1}
            color="#0A1628"
            attenuationColor="#00C896"
            attenuationDistance={2.5}
            clearcoat={1}
            clearcoatRoughness={0.08}
          />
        </RoundedBox>

        {/* Emissive edge glow */}
        <RoundedBox args={[3.22, 4.42, 0.055]} radius={0.09} smoothness={6}>
          <meshBasicMaterial
            color="#00C896"
            transparent
            opacity={hovered ? 0.1 : 0.05}
            wireframe={false}
            side={THREE.BackSide}
          />
        </RoundedBox>

        {/* Content layers */}
        <InvoiceFront />
        <InvoiceBack />
      </group>
    </Float>
  )
}
