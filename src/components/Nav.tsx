import ThemeToggle from './ThemeToggle'

const links = [
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#education', label: 'Education' },
]

export default function Nav({ onAskAI }: { onAskAI: () => void }) {
  return (
    <nav className="sticky top-0 z-20 backdrop-blur bg-bg/85 border-b border-line">
      <div className="max-w-[960px] mx-auto px-7 h-[60px] flex items-center justify-between">
        <span className="font-mono text-sm text-signal">abhishek.saha()</span>
        <ul className="hidden sm:flex gap-6 text-sm list-none m-0 p-0">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-dim hover:text-ink transition-colors no-underline">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={onAskAI}
            className="flex items-center gap-2 bg-signal text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
          >
            💬 Ask AI
          </button>
        </div>
      </div>
    </nav>
  )
}
