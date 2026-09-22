import { useEffect, useRef } from 'react'

type Star = {
  x: number
  y: number
  size: number
  baseAlpha: number
  twinkleSpeed: number
  twinklePhase: number
  vx: number
  vy: number
  big: boolean
}

// Fixed, full-viewport canvas of slowly drifting, twinkling dots.
// A handful are drawn as small glowing squares (matching the reference),
// the rest are faint single-pixel stars. Respects prefers-reduced-motion
// by rendering one static frame instead of animating.
export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let stars: Star[] = []
    let raf = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let lastT = performance.now()

    function resize() {
      const canvas = canvasRef.current
      const ctx2 = canvas?.getContext('2d')
      if (!canvas || !ctx2) return
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      ctx2.setTransform(dpr, 0, 0, dpr, 0, 0)

      const area = window.innerWidth * window.innerHeight
      const count = Math.min(140, Math.max(50, Math.floor(area / 9000)))
      stars = Array.from({ length: count }, () => {
        const big = Math.random() < 0.06
        // speeds are now in px/second, applied via delta-time below
        const angle = Math.random() * Math.PI * 2
        const speed = big ? 6 + Math.random() * 6 : 8 + Math.random() * 14
        return {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: big ? 4 + Math.random() * 2 : Math.random() < 0.5 ? 1 : 1.6,
          baseAlpha: big ? 0.5 + Math.random() * 0.3 : 0.15 + Math.random() * 0.35,
          twinkleSpeed: 0.4 + Math.random() * 0.8,
          twinklePhase: Math.random() * Math.PI * 2,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 4, // slight upward drift bias
          big,
        }
      })
    }

    function draw(t: number) {
      const canvas = canvasRef.current
      const ctx2 = canvas?.getContext('2d')
      if (!canvas || !ctx2) return
      const w = window.innerWidth
      const h = window.innerHeight
      const dt = Math.min((t - lastT) / 1000, 0.05) // seconds, clamped
      lastT = t
      ctx2.clearRect(0, 0, w, h)

      const accent = getComputedStyle(document.documentElement).getPropertyValue('--signal').trim() || '#e8a53d'

      for (const s of stars) {
        if (!reduceMotion) {
          s.x += s.vx * dt
          s.y += s.vy * dt
          if (s.x < -5) s.x = w + 5
          if (s.x > w + 5) s.x = -5
          if (s.y < -5) s.y = h + 5
          if (s.y > h + 5) s.y = -5
        }
        const twinkle = reduceMotion ? 1 : 0.6 + 0.4 * Math.sin(t * 0.001 * s.twinkleSpeed + s.twinklePhase)
        const alpha = s.baseAlpha * twinkle

        ctx2.fillStyle = hexToRgba(accent, s.big ? alpha * 0.9 : alpha * 0.7)
        ctx2.fillRect(s.x, s.y, s.size, s.size)
      }

      if (!reduceMotion) raf = requestAnimationFrame(draw)
    }

    function hexToRgba(hex: string, a: number) {
      let h = hex.replace('#', '')
      if (h.length === 3) h = h.split('').map((c) => c + c).join('')
      const r = parseInt(h.slice(0, 2), 16)
      const g = parseInt(h.slice(2, 4), 16)
      const b = parseInt(h.slice(4, 6), 16)
      return `rgba(${r}, ${g}, ${b}, ${a})`
    }

    resize()
    lastT = performance.now()
    draw(lastT)
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none -z-10"
    />
  )
}