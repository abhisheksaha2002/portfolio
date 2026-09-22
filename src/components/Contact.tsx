import { profile } from '../data/content'

export default function Contact() {
  return (
    <footer className="py-16 sm:py-[72px]">
      <div className="max-w-[920px] mx-auto px-7">
        <h3 className="font-serif italic font-medium text-[28px] sm:text-[38px] max-w-[14ch] leading-tight m-0 mb-8">
          Let's talk about what you're building.
        </h3>
        <div className="flex flex-wrap gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="text-sm no-underline border border-line px-[18px] py-[10px] rounded text-ink hover:border-signal hover:-translate-y-px transition-all"
          >
            📧 {profile.email}
          </a>
          <a
            href={profile.phoneHref}
            className="text-sm no-underline border border-line px-[18px] py-[10px] rounded text-ink hover:border-signal hover:-translate-y-px transition-all"
          >
            📱 {profile.phone}
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener"
            className="text-sm no-underline border border-line px-[18px] py-[10px] rounded text-ink hover:border-signal hover:-translate-y-px transition-all"
          >
            💼 LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener"
            className="text-sm no-underline border border-line px-[18px] py-[10px] rounded text-ink hover:border-signal hover:-translate-y-px transition-all"
          >
            🐙 GitHub
          </a>
        </div>
        <p className="font-mono text-[11.5px] text-faint mt-12">{profile.location}</p>
      </div>
    </footer>
  )
}
