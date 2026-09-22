import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initial = stored ? stored === 'dark' : prefersDark
    setDark(initial)
    document.documentElement.setAttribute('data-theme', initial ? 'dark' : 'light')
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light')
    } catch {
      /* storage unavailable, ignore */
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle color theme"
      className="text-sm border border-line rounded px-3 py-1.5 text-ink hover:border-faint transition-colors"
    >
      {dark ? '☀️' : '🌙'}
    </button>
  )
}
