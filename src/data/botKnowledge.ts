import { certifications, education, experience, profile, projects, skillGroups } from './content'

// A small, keyword-matched FAQ bot. Runs entirely client-side against the
// same content.ts you edit for the rest of the site — no API key, no
// backend, nothing that can leak a secret on a static GitHub Pages deploy.
// If you later want real LLM-generated answers, you'd need a serverless
// proxy (e.g. a Vercel/Cloudflare function) to hold the API key — see the
// note at the bottom of this file.

type Rule = {
  id: string
  keywords: string[]
  answer: () => string
}

const rules: Rule[] = [
  {
    id: 'skills',
    keywords: ['skill', 'tech stack', 'technologies', 'know', 'good at', 'languages'],
    answer: () =>
      `His strongest areas are ${skillGroups
        .slice(0, 3)
        .map((g) => g.name)
        .join(', ')}. Standouts: ${skillGroups[0].items.slice(0, 4).join(', ')}, plus ${skillGroups[2].items
        .slice(0, 3)
        .join(', ')} on the AI/ML side.`,
  },
  {
    id: 'projects',
    keywords: ['project', 'built', 'built anything', 'klaris', 'tumor', 'portfolio', 'side project'],
    answer: () =>
      projects
        .map((p) => `${p.icon} ${p.name} — ${p.summary}`)
        .join(' '),
  },
  {
    id: 'open-to-work',
    keywords: ['open to work', 'hiring', 'available', 'looking for a job', 'recruit'],
    answer: () =>
      `Yes — ${profile.status}. He's starting his MS at UMass Amherst in Sep 2026 and is interested in AI/systems engineering roles, internships included.`,
  },
  {
    id: 'notice-start',
    keywords: ['notice period', 'start date', 'when can he start', 'availability', 'when does he start'],
    answer: () =>
      `He wrapped up at Perficient in Nov 2025 and starts his MS at UMass Amherst in Sep 2026, so he's flexible depending on the role and timeline — best to ask him directly at ${profile.email}.`,
  },
  {
    id: 'experience',
    keywords: ['experience', 'work history', 'perficient', 'abbott', 'ongc', 'job'],
    answer: () =>
      experience
        .map((e) => `${e.org} (${e.when}) — ${e.role}.`)
        .join(' '),
  },
  {
    id: 'education',
    keywords: ['education', 'degree', 'university', 'college', 'study', 'gpa', 'cgpa', 'umass', 'vit'],
    answer: () =>
      education.map((e) => `${e.school} — ${e.degree} (${e.when}).`).join(' '),
  },
  {
    id: 'certs',
    keywords: ['certification', 'certificate', 'certified'],
    answer: () =>
      certifications.length
        ? certifications.map((c) => `${c.name} — ${c.detail}.`).join(' ')
        : "No certifications listed yet.",
  },
  {
    id: 'contact',
    keywords: ['contact', 'email', 'phone', 'reach', 'linkedin', 'github'],
    answer: () =>
      `You can reach him at ${profile.email} or ${profile.phone}. LinkedIn and GitHub links are in the footer.`,
  },
  {
    id: 'location',
    keywords: ['location', 'based', 'where is he', 'relocate'],
    answer: () => `He's based in ${profile.location}.`,
  },
]

const fallback =
  "I don't have a scripted answer for that yet — the best move is to reach out directly at " +
  profile.email +
  '.'

export function answerQuestion(input: string): string {
  const q = input.toLowerCase()
  let best: { rule: Rule; score: number } | null = null

  for (const rule of rules) {
    const score = rule.keywords.reduce((acc, kw) => (q.includes(kw) ? acc + kw.length : acc), 0)
    if (score > 0 && (!best || score > best.score)) {
      best = { rule, score }
    }
  }

  return best ? best.rule.answer() : fallback
}

export const suggestedQuestions = [
  'What are his main skills?',
  'Tell me about his projects',
  'Is he open to work?',
  "When's he starting his MS?",
]
