import { useEffect, useRef, useState } from 'react'
import { stats } from '../data/content'

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.2 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="impact" className="border-b border-line py-14" ref={ref}>
      <div className="max-w-[920px] mx-auto px-7">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-10">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="transition-all duration-500"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(8px)',
                transitionDelay: `${i * 70}ms`,
              }}
            >
              <div className="font-serif text-signal text-[34px] sm:text-[40px] leading-none mb-2">{s.value}</div>
              <div className="text-dim text-[13px] leading-snug max-w-[16ch]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
