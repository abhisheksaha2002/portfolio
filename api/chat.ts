import type { VercelRequest, VercelResponse } from '@vercel/node'

// NOTE: this data is intentionally duplicated from src/data/content.ts
// rather than imported. Vercel's Node function builder only reliably
// bundles the file passed to it (this one) — a relative import reaching
// outside /api (e.g. `../src/data/content`) isn't always traced into the
// deployed function bundle, which causes a runtime
// "Cannot find module '/var/task/src/data/content'" crash. Keeping the
// data self-contained here avoids that entirely. If you update your
// resume in src/data/content.ts, mirror the change here too.

const profile = {
  name: 'Abhishek Dwipen Saha',
  status: 'open to opportunities',
  blurb:
    "I build the systems that sit between a question and the right answer. Incoming MS Computer Science student at UMass Amherst, previously an Associate Technical Consultant shipping search infrastructure for Abbott's global platform.",
  email: 'abhisheksaha@umass.edu',
  phone: '+1 (413) 472-6253',
  linkedin: 'https://www.linkedin.com/in/abhishek-saha-705095200/',
  github: 'https://github.com/abhisheksaha2002',
  location: 'Amherst, Massachusetts',
}

const experience = [
  {
    org: 'Perficient',
    role: "Associate Technical Consultant, embedded with Abbott's engineering team",
    place: 'Chennai',
    when: 'May 2024 – Nov 2025',
    bullets: [
      'Built Spring Boot microservices for automated data ingestion, integrating AWS S3 during a migration to Coveo and cutting search response time by 80%.',
      "Connected those services to a React-based search interface and Adobe Experience Manager, adding region-specific filtering across Abbott's platforms in 140+ countries.",
      'Tuned Coveo relevance models (ART, RGA) and query pipelines, improving search relevance by 25%.',
      'Traced a production S3 signature bug to request re-encoding, reducing API failures by 30% across distributed services.',
      'Owned deployment for 10+ releases across two-week Agile sprints.',
    ],
  },
  {
    org: 'Oil and Natural Gas Corporation (ONGC)',
    role: 'Software Engineer Intern',
    place: 'Mumbai',
    when: 'Dec 2022 – Feb 2023',
    bullets: [
      'Built a full-stack financial document portal with Spring Boot and React, cutting document retrieval time by 60% via Spring Security, JWT, and role-based access.',
      'Designed RESTful APIs with JPA/Hibernate and H2, using UUID-based filenames to prevent collisions and path-traversal issues.',
    ],
  },
]

const projects = [
  {
    name: 'Klaris',
    tag: 'agentic RAG',
    summary:
      'Multi-source RAG platform that ingests GitHub repos, web pages, and YouTube transcripts into one knowledge base.',
    detail:
      'Its defining feature is cross-source synthesis — querying each source independently, then comparing and contrasting the answers rather than just merging them. Chunking and LanceDB vector indexing cut prompt context size by roughly 90% versus full-document prompting, with a provider layer that swaps between local Ollama inference and cloud-hosted Groq models without touching application code.',
    stack: ['FastAPI', 'React', 'LangChain', 'LanceDB', 'Docker', 'Ollama / Groq'],
  },
  {
    name: 'TumorGraphNet',
    tag: 'graph learning',
    summary: 'Unsupervised dual-graph autoencoder for brain tumor segmentation on MRI scans.',
    detail:
      'Combines a spatial adjacency graph with a multi-scale feature-similarity graph through a cross-graph attention fusion module. An eight-dimensional superpixel feature pipeline feeds K-Means++ clustering to produce segmentation masks with no labeled training data — reaching competitive accuracy at 0.87M parameters, roughly a tenth the size of the 8.7M–11.4M-parameter baselines it is benchmarked against.',
    stack: ['Python', 'PyTorch', 'Keras', 'OpenCV'],
  },
]

const skillGroups = [
  { name: 'languages', items: ['C++', 'Python', 'Java', 'JavaScript', 'TypeScript', 'SQL'] },
  { name: 'systems & backend', items: ['Spring Boot', 'FastAPI', 'REST APIs', 'Microservices', 'Apache Spark', 'Linux'] },
  { name: 'AI / ML & retrieval', items: ['PyTorch', 'TensorFlow', 'LangChain', 'Graph Neural Networks', 'Information Retrieval'] },
  { name: 'frontend', items: ['React', 'HTML', 'CSS'] },
  { name: 'databases & search', items: ['LanceDB', 'Vector Databases', 'MySQL', 'Coveo'] },
  { name: 'devops & tools', items: ['AWS S3', 'Docker', 'Kubernetes', 'Git', 'Claude Code', 'Jira'] },
]

const education = [
  { school: 'University of Massachusetts Amherst', degree: 'Master of Science in Computer Science · CICS', when: 'Sep 2026 – May 2028' },
  { school: 'Vellore Institute of Technology', degree: 'B.Tech in Information Technology · CGPA 8.32/10', when: 'Sep 2020 – May 2024' },
]

const certifications = [
  { name: 'Microsoft SC-900', detail: 'Security, Compliance & Identity Fundamentals' },
]

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