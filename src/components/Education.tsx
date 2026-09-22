import { certifications, education } from '../data/content'

export default function Education() {
  return (
    <section id="education" className="border-b border-line py-16 sm:py-[72px]">
      <div className="max-w-[920px] mx-auto px-7">
        <div className="flex items-baseline justify-between gap-5 mb-10">
          <h2 className="font-serif italic font-medium text-[28px] sm:text-[30px] m-0">Education</h2>
          <span className="font-mono text-[13px] text-faint whitespace-nowrap">{education.length} records</span>
        </div>

        {education.map((e, i) => (
          <div
            key={e.school}
            className={`flex justify-between gap-5 py-[18px] ${i > 0 ? 'border-t border-line' : ''}`}
          >
            <div className="flex gap-3">
              <span className="text-lg">{e.icon}</span>
              <div>
                <p className="font-semibold text-[15px] m-0 mb-0.5">{e.school}</p>
                <p className="text-dim text-sm m-0">{e.degree}</p>
              </div>
            </div>
            <div className="font-mono text-[12.5px] text-faint whitespace-nowrap pt-0.5">{e.when}</div>
          </div>
        ))}

        {certifications.length > 0 && (
          <div className="mt-10 pt-8 border-t border-line">
            <div className="font-mono text-xs text-faint mb-4">certifications</div>
            {certifications.map((c) => (
              <div key={c.name} className="flex gap-3 items-start">
                <span className="text-lg">{c.icon}</span>
                <div>
                  <p className="font-medium text-sm m-0">{c.name}</p>
                  <p className="text-dim text-[13px] m-0">{c.detail}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
