import { useEffect, useRef, useState } from 'react'
import { experience } from '../data/content'

function RelevanceBar({ score, active }: { score: number; active: boolean }) {
  return (
    <div className="pt-1 sm:w-[90px] flex sm:block items-center gap-2.5">
      <div className="font-mono text-[11px] text-faint mb-1.5 hidden sm:block">relevance</div>
      <div className="h-1 bg-line rounded-full overflow-hidden flex-1 sm:mb-1.5">
        <div
          className="h-full bg-signal rounded-full transition-all duration-[1100ms] ease-out"
          style={{ width: active ? `${score}%` : '0%' }}
        />
      </div>
      <div className="font-mono text-xs text-ink">{(score / 100).toFixed(2)}</div>
    </div>
  )
}

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setActive(true), { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="experience" className="border-b border-line py-16 sm:py-[72px]" ref={ref}>
      <div className="max-w-[920px] mx-auto px-7">
        <div className="flex items-baseline justify-between gap-5 mb-10">
          <h2 className="font-serif italic font-medium text-[28px] sm:text-[30px] m-0">Experience</h2>
          <span className="font-mono text-[13px] text-faint whitespace-nowrap">{experience.length} records</span>
        </div>

        {experience.map((job, i) => (
          <div
            key={job.org}
            className={`grid sm:grid-cols-[150px_1fr_90px] gap-3 sm:gap-6 py-6 ${i > 0 ? 'border-t border-line' : ''}`}
          >
            <div className="font-mono text-[12.5px] text-faint pt-0.5">{job.when}</div>
            <div>
              <p className="font-semibold text-base m-0 mb-0.5">{job.org}</p>
              <p className="text-dim text-sm m-0 mb-3">
                {job.role} · {job.place}
              </p>
              <ul className="m-0 pl-[18px] text-dim text-[14.5px] leading-[1.7] space-y-1.5">
                {job.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </div>
            <RelevanceBar score={job.score} active={active} />
          </div>
        ))}
      </div>
    </section>
  )
}
