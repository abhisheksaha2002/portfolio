import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/content'

export default function Hero() {
  const [text, setText] = useState('')
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing')
  const [qi, setQi] = useState(0)
  const [resultLine, setResultLine] = useState('searching…')
  const [timeLine, setTimeLine] = useState('')
  const timeoutRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const full = profile.roles[qi]
    if (phase === 'typing') {
      if (text.length < full.length) {
        timeoutRef.current = window.setTimeout(() => setText(full.slice(0, text.length + 1)), 55)
      } else {
        setResultLine(`${2 + qi} results found`)
        setTimeLine(`${(0.04 + qi * 0.01).toFixed(2)}s`)
        timeoutRef.current = window.setTimeout(() => setPhase('pausing'), 300)
      }
    } else if (phase === 'pausing') {
      timeoutRef.current = window.setTimeout(() => setPhase('deleting'), 1600)
    } else {
      if (text.length > 0) {
        timeoutRef.current = window.setTimeout(() => setText(full.slice(0, text.length - 1)), 28)
      } else {
        setResultLine('searching…')
        setTimeLine('')
        setQi((qi + 1) % profile.roles.length)
        setPhase('typing')
      }
    }
    return () => window.clearTimeout(timeoutRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, phase])

  return (
    <header className="border-b border-line pt-20 sm:pt-24 pb-16">
      <div className="max-w-[920px] mx-auto px-7">
        <p className="font-mono text-[13px] text-faint mb-4">
          status: {profile.status}
          <span className="inline-block w-[7px] h-[15px] bg-signal ml-1 align-[-2px] animate-pulse" />
        </p>
        <h1 className="font-serif font-medium text-[40px] sm:text-[64px] leading-[1.05] tracking-tight mb-5 max-w-[11ch]">
          {profile.name}
        </h1>
        <p className="text-dim text-lg leading-relaxed max-w-[54ch] mb-10">{profile.blurb}</p>

        <div className="flex flex-wrap gap-3 mb-14">
          <a
            href={`mailto:${profile.email}`}
            className="text-sm font-medium bg-signal text-bg px-5 py-[11px] rounded no-underline hover:-translate-y-px transition-transform inline-flex items-center"
            style={{ color: '#ffffff' }}
          >
            Email me
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener"
            className="text-sm font-medium border border-line text-ink px-5 py-[11px] rounded no-underline hover:border-faint hover:-translate-y-px transition-all"
          >
            LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener"
            className="text-sm font-medium border border-line text-ink px-5 py-[11px] rounded no-underline hover:border-faint hover:-translate-y-px transition-all"
          >
            GitHub
          </a>
        </div>

        <div className="border border-line rounded-md bg-raised overflow-hidden">
          <div className="flex items-center gap-3 px-[18px] py-4 border-b border-line">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-faint shrink-0">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <div className="font-mono text-[15px] text-ink whitespace-nowrap overflow-hidden">
              {text}
              <span className="inline-block w-[2px] h-[15px] bg-faint ml-[2px] align-[-2px] animate-pulse" />
            </div>
          </div>
          <div className="flex justify-between px-[18px] py-[10px] font-mono text-xs text-faint">
            <span>{resultLine}</span>
            <span className="text-signal">{timeLine}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
