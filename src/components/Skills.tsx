import { skillGroups } from '../data/content'

export default function Skills() {
  return (
    <section id="skills" className="border-b border-line py-16 sm:py-[72px]">
      <div className="max-w-[920px] mx-auto px-7">
        <div className="flex items-baseline justify-between gap-5 mb-10">
          <h2 className="font-serif italic font-medium text-[28px] sm:text-[30px] m-0">Skills &amp; Technologies</h2>
          <span className="font-mono text-[13px] text-faint whitespace-nowrap">{skillGroups.length} groups</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
          {skillGroups.map((g) => (
            <div key={g.name}>
              <div className="font-mono text-xs text-faint mb-3 flex items-center gap-2">
                <span>{g.icon}</span>
                <span>{g.name}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="text-[13px] text-ink bg-raised border border-line px-[11px] py-[5px] rounded"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
