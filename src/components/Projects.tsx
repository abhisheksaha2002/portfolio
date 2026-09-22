import { projects } from '../data/content'
import ProjectCard from './ProjectCard'

export default function Projects() {
  return (
    <section id="projects" className="border-b border-line py-16 sm:py-[72px]">
      <div className="max-w-[920px] mx-auto px-7">
        <div className="flex items-baseline justify-between gap-5 mb-3">
          <h2 className="font-serif italic font-medium text-[28px] sm:text-[30px] m-0">Projects</h2>
          <span className="font-mono text-[13px] text-faint whitespace-nowrap">{projects.length} records</span>
        </div>
        <p className="text-faint text-sm mb-8">Click any card to flip and see details ↻</p>
        <div className="grid sm:grid-cols-2 gap-5">
          {projects.map((p) => (
            <ProjectCard key={p.name} project={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
