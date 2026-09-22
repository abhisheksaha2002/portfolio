# Abhishek Saha — Portfolio

React + TypeScript + Tailwind + Vite portfolio, themed around search and
retrieval: a drifting starfield background, work history shown as retrieval
records with relevance-score bars, flip-to-reveal project cards, and an
"Ask AI" chat widget backed by Groq that answers questions grounded in your
actual resume data.

## Run locally

```bash
npm install
npm run dev
```

The chat widget calls `/api/chat`, a Vercel serverless function — see
"Local development with the chat API" below to run that too.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
   Vercel auto-detects Vite — no config needed.
3. Before or after the first deploy, add an environment variable:
   **Project → Settings → Environment Variables**
   - `GROQ_API_KEY` — get a free key at [console.groq.com](https://console.groq.com)
4. Redeploy if you added the key after the first deploy. Done — you get a
   `*.vercel.app` URL, or attach a custom domain under Settings → Domains.

## Local development with the chat API

The `/api/chat` function only runs under Vercel's dev server, not plain
`vite dev`:

```bash
npm install -g vercel   # one-time
cp .env.example .env    # then fill in your real GROQ_API_KEY
vercel dev
```

Without a configured key, the chat widget still works — it silently falls
back to a local keyword-matched FAQ bot (`src/data/botKnowledge.ts`) instead
of breaking.

## Editing content

All resume content lives in `src/data/content.ts` — experience, projects,
skills, education, contact info. Both the page and the chatbot's system
prompt (`api/chat.ts`) read from this one file, so update it there and both
stay in sync.

## Stack

React 19, TypeScript, Vite, Tailwind CSS, Vercel serverless functions, Groq
(`llama-3.3-70b-versatile`).
