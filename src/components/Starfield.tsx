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
        return {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: big ? 4 + Math.random() * 2 : Math.random() < 0.5 ? 1 : 1.6,
          baseAlpha: big ? 0.5 + Math.random() * 0.3 : 0.15 + Math.random() * 0.35,
          twinkleSpeed: 0.4 + Math.random() * 0.8,
          twinklePhase: Math.random() * Math.PI * 2,
          vx: (Math.random() - 0.5) * 0.012,
          vy: (Math.random() - 0.5) * 0.012 - 0.006,
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
      ctx2.clearRect(0, 0, w, h)

      const accent = getComputedStyle(document.documentElement).getPropertyValue('--signal').trim() || '#f34360'

      for (const s of stars) {
        if (!reduceMotion) {
          s.x += s.vx
          s.y += s.vy
          if (s.x < -5) s.x = w + 5
          if (s.x > w + 5) s.x = -5
          if (s.y < -5) s.y = h + 5
          if (s.y > h + 5) s.y = -5
        }
        const twinkle = reduceMotion ? 1 : 0.6 + 0.4 * Math.sin(t * 0.001 * s.twinkleSpeed + s.twinklePhase)
        const alpha = s.baseAlpha * twinkle

        if (s.big) {
          ctx2.fillStyle = hexToRgba(accent, alpha * 0.9)
          ctx2.fillRect(s.x, s.y, s.size, s.size)
        } else {
          ctx2.fillStyle = hexToRgba(accent, alpha * 0.7)
          ctx2.fillRect(s.x, s.y, s.size, s.size)
        }
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
    draw(0)
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
