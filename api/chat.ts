import type { VercelRequest, VercelResponse } from '@vercel/node'
import {
  certifications,
  education,
  experience,
  profile,
  projects,
  skillGroups,
} from '../src/data/content'

// Builds a compact, grounded context block from the same content.ts your
// site renders from, so the model can't drift into inventing facts about
// Abhishek that aren't on the actual resume.
function buildSystemPrompt() {
  const expText = experience
    .map((e) => `- ${e.org} (${e.when}), ${e.role}, ${e.place}: ${e.bullets.join(' ')}`)
    .join('\n')

  const projText = projects
    .map((p) => `- ${p.name} (${p.tag}): ${p.summary} ${p.detail} Stack: ${p.stack.join(', ')}.`)
    .join('\n')

  const skillsText = skillGroups.map((g) => `${g.name}: ${g.items.join(', ')}`).join('\n')

  const eduText = education.map((e) => `- ${e.school}, ${e.degree} (${e.when})`).join('\n')

  const certText = certifications.map((c) => `- ${c.name}: ${c.detail}`).join('\n')

  return `You are the AI assistant embedded on ${profile.name}'s personal portfolio site. You answer visitor questions about his background, skills, projects, and experience, speaking about him in the third person (never pretend to BE him).

Ground every answer strictly in the facts below. If something isn't covered here, say you don't have that detail and point the visitor to his email (${profile.email}) instead of guessing or inventing anything.

Keep answers conversational and short — 2 to 4 sentences unless the visitor clearly wants more detail.

PROFILE
Name: ${profile.name}
Status: ${profile.status}
Location: ${profile.location}
Summary: ${profile.blurb}
Email: ${profile.email}
Phone: ${profile.phone}
LinkedIn: ${profile.linkedin}
GitHub: ${profile.github}

EXPERIENCE
${expText}

PROJECTS
${projText}

SKILLS
${skillsText}

EDUCATION
${eduText}

CERTIFICATIONS
${certText || 'None listed.'}
`
}

type ChatMessage = { role: 'user' | 'assistant'; content: string }

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    res.status(500).json({ error: 'GROQ_API_KEY is not configured on the server' })
    return
  }

  const { messages } = req.body as { messages: ChatMessage[] }
  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: 'messages array is required' })
    return
  }

  // Cap history sent to the model to keep requests small and cheap.
  const recent = messages.slice(-12)

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        temperature: 0.4,
        max_tokens: 400,
        messages: [{ role: 'system', content: buildSystemPrompt() }, ...recent],
      }),
    })

    if (!groqRes.ok) {
      const errText = await groqRes.text()
      res.status(502).json({ error: 'Groq request failed', detail: errText })
      return
    }

    const data = await groqRes.json()
    const reply: string = data?.choices?.[0]?.message?.content ?? ''

    res.status(200).json({ reply })
  } catch (err) {
    res.status(500).json({ error: 'Unexpected server error', detail: String(err) })
  }
}
