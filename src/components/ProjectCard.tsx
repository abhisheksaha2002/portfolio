import { useState } from 'react'
import type { projects } from '../data/content'

type Project = (typeof projects)[number]

export default function ProjectCard({ project }: { project: Project }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <button
      onClick={() => setFlipped((f) => !f)}
      aria-pressed={flipped}
      aria-label={`${project.name}. Tap to ${flipped ? 'show summary' : 'show details'}.`}
      className="text-left border border-line rounded-lg bg-raised p-0 cursor-pointer group [perspective:1400px] h-[280px] w-full"
    >
      <div
        className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d]"
        style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* front */}
        <div className="absolute inset-0 p-7 [backface-visibility:hidden] flex flex-col">
          <div className="flex justify-between items-start gap-4 mb-3">
            <span className="text-2xl">{project.icon}</span>
            <span className="font-mono text-[11px] text-signal border border-signal/40 px-2.5 py-1 rounded-full whitespace-nowrap">
              {project.tag}
            </span>
          </div>
          <h3 className="font-serif text-[22px] font-medium m-0 mb-2">{project.name}</h3>
          <p className="text-dim text-sm leading-relaxed m-0 flex-1">{project.summary}</p>
          <p className="font-mono text-[11px] text-faint mt-3 mb-0">tap to flip ↻</p>
        </div>

        {/* back */}
        <div
          className="absolute inset-0 p-7 [backface-visibility:hidden] flex flex-col"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <h3 className="font-serif text-lg font-medium m-0 mb-3">{project.name}</h3>
          <p className="text-dim text-[13.5px] leading-relaxed m-0 mb-4 overflow-y-auto flex-1">{project.detail}</p>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.stack.map((s) => (
              <span key={s} className="font-mono text-[11px] text-dim bg-bg border border-line px-2 py-1 rounded">
                {s}
              </span>
            ))}
          </div>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener"
              onClick={(e) => e.stopPropagation()}
              className="text-signal text-sm no-underline hover:underline"
            >
              ↗ View on GitHub
            </a>
          )}
        </div>
      </div>
    </button>
  )
}
