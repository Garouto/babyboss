'use client'

import { useEffect, useRef } from 'react'

function usePrefersReducedMotion() {
  const prefers = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : undefined
  return !!prefers?.matches
}

export default function ClubLights() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let raf = 0
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))

    const BPM = 124
    const beat = 60 / BPM
    let strobe = 0
    let lastFlash = 0
    let nextInterval = 0
    function scheduleNext() {
      nextInterval = beat * (0.65 + Math.random() * 0.9) // variação natural de tempo
    }
    scheduleNext()

    function resize() {
      const { innerWidth: w, innerHeight: h } = window
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    // Laser setup
    type Beam = {
      x: number
      y: number
      baseAngle: number
      amp: number
      speed: number
      hue: number
      width: number
      len: number
      phase: number
    }

    const beams: Beam[] = []
    function initBeams() {
      beams.length = 0
      const { innerWidth: w, innerHeight: h } = window
      const edges = [
        { x: 0, y: h * 0.15, ang: 0 },
        { x: 0, y: h * 0.8, ang: 0 },
        { x: w, y: h * 0.25, ang: Math.PI },
        { x: w, y: h * 0.75, ang: Math.PI },
        { x: w * 0.25, y: 0, ang: Math.PI / 2 },
        { x: w * 0.75, y: 0, ang: Math.PI / 2 },
      ]
      const picks = 5
      for (let i = 0; i < picks; i++) {
        const e = edges[i % edges.length]
        beams.push({
          x: e.x,
          y: e.y,
          baseAngle: e.ang + (Math.random() * 0.6 - 0.3),
          amp: 0.8 + Math.random() * 0.8,
          speed: 0.6 + Math.random() * 0.9,
          hue: [348, 46, 200, 160, 52, 300][i % 6], // neon magenta, red, cyan, teal, gold, purple
          width: 2 + Math.random() * 3,
          len: Math.hypot(w, h) * (0.9 + Math.random() * 0.4),
          phase: Math.random() * Math.PI * 2,
        })
      }
    }
    initBeams()

    function drawBeam(b: Beam, t: number) {
      const { innerWidth: w, innerHeight: h } = window
      const angle = b.baseAngle + Math.sin(t * b.speed + b.phase) * (0.6 * b.amp)
      const dx = Math.cos(angle)
      const dy = Math.sin(angle)
      const x2 = b.x + dx * b.len
      const y2 = b.y + dy * b.len

      const grad = ctx.createLinearGradient(b.x, b.y, x2, y2)
      grad.addColorStop(0, `hsla(${b.hue} 100% 60% / 0.0)`)
      grad.addColorStop(0.1, `hsla(${b.hue} 100% 60% / 0.45)`)
      grad.addColorStop(0.5, `hsla(${b.hue} 100% 60% / 0.8)`)
      grad.addColorStop(0.9, `hsla(${b.hue} 100% 60% / 0.45)`)
      grad.addColorStop(1, `hsla(${b.hue} 100% 60% / 0.0)`)

      // Flicker rápido nos feixes e reforço durante o strobe
      const flicker = 0.9 + 0.1 * Math.sin(t * 12 + b.phase * 1.7)
      const boost = 1 + strobe * 0.85

      ctx.save()
      ctx.globalCompositeOperation = 'lighter'
      ctx.shadowColor = `hsla(${b.hue} 100% 60% / 0.9)`
      ctx.shadowBlur = 22 * boost
      ctx.lineWidth = b.width * flicker * boost
      ctx.globalAlpha = 0.95 * flicker
      ctx.beginPath()
      ctx.moveTo(b.x, b.y)
      ctx.lineTo(x2, y2)
      ctx.strokeStyle = grad
      ctx.stroke()
      ctx.restore()

      // moving dots (light particles)
      const dotCount = 2
      for (let i = 0; i < dotCount; i++) {
        const p = (t * (0.15 + i * 0.07) + i * 0.3) % 1
        const px = b.x + dx * b.len * p
        const py = b.y + dy * b.len * p
        const r = 1.2 + Math.sin((t + i) * 4) * 0.8
        ctx.save()
        ctx.globalCompositeOperation = 'lighter'
        const g = ctx.createRadialGradient(px, py, 0, px, py, 18)
        g.addColorStop(0, `hsla(${b.hue} 100% 65% / ${0.9 * (0.8 + 0.2 * strobe)})`)
        g.addColorStop(1, `hsla(${b.hue} 100% 65% / 0)`)
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(px, py, r * 18 * (1 + strobe * 0.4), 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    function drawAmbient(t: number) {
      const { innerWidth: w, innerHeight: h } = window
      ctx.save()
      ctx.globalCompositeOperation = 'lighter'

      // left glow sweep
      const cx1 = (Math.sin(t * 0.25) * 0.5 + 0.5) * (w * 0.7)
      const cy1 = h * 0.6
      const r1 = Math.max(w, h) * 0.8
      const g1 = ctx.createRadialGradient(cx1, cy1, 0, cx1, cy1, r1)
      g1.addColorStop(0, 'hsla(52 100% 60% / 0.10)') // gold
      g1.addColorStop(1, 'hsla(52 100% 60% / 0)')
      ctx.fillStyle = g1
      ctx.fillRect(0, 0, w, h)

      // right magenta sweep
      const cx2 = w - (Math.cos(t * 0.22) * 0.5 + 0.5) * (w * 0.7)
      const cy2 = h * 0.3
      const r2 = Math.max(w, h) * 0.7
      const g2 = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, r2)
      g2.addColorStop(0, 'hsla(330 100% 60% / 0.10)')
      g2.addColorStop(1, 'hsla(330 100% 60% / 0)')
      ctx.fillStyle = g2
      ctx.fillRect(0, 0, w, h)

      ctx.restore()
    }

    function drawStrobe(t: number) {
      if (strobe <= 0.001) return
      const { innerWidth: w, innerHeight: h } = window
      ctx.save()
      ctx.globalCompositeOperation = 'screen'

      // Lavagem branca rápida
      ctx.fillStyle = `rgba(255,255,255,${0.12 * strobe})`
      ctx.fillRect(0, 0, w, h)

      // Haze dourado
      const g1 = ctx.createRadialGradient(w * 0.25, h * 0.3, 0, w * 0.25, h * 0.3, Math.max(w, h) * 0.9)
      g1.addColorStop(0, `hsla(52 100% 60% / ${0.28 * strobe})`)
      g1.addColorStop(1, 'hsla(52 100% 60% / 0)')
      ctx.fillStyle = g1
      ctx.fillRect(0, 0, w, h)

      // Haze magenta
      const g2 = ctx.createRadialGradient(w * 0.8, h * 0.7, 0, w * 0.8, h * 0.7, Math.max(w, h) * 0.9)
      g2.addColorStop(0, `hsla(330 100% 60% / ${0.22 * strobe})`)
      g2.addColorStop(1, 'hsla(330 100% 60% / 0)')
      ctx.fillStyle = g2
      ctx.fillRect(0, 0, w, h)

      ctx.restore()
    }

    let last = performance.now()
    function frame(now: number) {
      const dt = Math.min(0.06, (now - last) / 1000)
      last = now
      const t = now / 1000

      // fade previous frame for motion trails
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Agenda novo flash em tempo aleatório baseado no BPM
      if (t - lastFlash >= nextInterval) {
        strobe = 1
        lastFlash = t
        scheduleNext()
      }
      // Decaimento rápido do strobe (piscar)
      strobe = Math.max(0, strobe - dt * 3.2)

      drawAmbient(t)
      for (const b of beams) drawBeam(b, t)
      drawStrobe(t)

      raf = requestAnimationFrame(frame)
    }

    if (!reduced) {
      raf = requestAnimationFrame(frame)
    } else {
      // static ambient if reduced motion
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawAmbient(0.5)
      for (const b of beams) drawBeam(b, 0.5)
    }

    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf)
      } else if (!reduced) {
        last = performance.now()
        raf = requestAnimationFrame(frame)
      }
    }
    document.addEventListener('visibilitychange', onVis)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [reduced])

  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none fixed inset-0 z-0
        mix-blend-screen
        opacity-80
      "
    >
      {/* Laser canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Scanlines overlay */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(255,255,255,0.35) 0, rgba(255,255,255,0.35) 1px, transparent 1px, transparent 3px)',
        }}
      />

      {/* Neon pulse halo corners */}
      <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full blur-3xl opacity-30"
           style={{ background: 'radial-gradient(circle, rgba(245,197,66,0.5) 0%, rgba(245,197,66,0) 70%)' }} />
      <div className="absolute -right-24 -bottom-24 h-96 w-96 rounded-full blur-3xl opacity-30"
           style={{ background: 'radial-gradient(circle, rgba(255,0,128,0.45) 0%, rgba(255,0,128,0) 70%)' }} />

      {/* Soft vignette for contrast */}
      <div className="absolute inset-0 pointer-events-none"
           style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.5) 100%)' }} />
    </div>
  )
}
