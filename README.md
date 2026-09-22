# Abhishek Saha — Portfolio

A React + TypeScript + Tailwind portfolio, themed around search and retrieval
(the domain the projects and experience live in): a live "query" typing
animation in the hero, work history shown as retrieval records with
relevance-score bars, and flip-to-reveal project cards.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Outputs a static site to `dist/`.

## Deploy to GitHub Pages

**Option A — GitHub Actions (recommended, auto-deploys on every push)**

1. Push this repo to GitHub.
2. In the repo, go to **Settings → Pages → Build and deployment → Source**,
   and set it to **GitHub Actions**.
3. Push to `main` — the included workflow (`.github/workflows/deploy.yml`)
   builds the site and deploys it automatically. Your site will be live at
   `https://<username>.github.io/<repo-name>/`.

If you name the repo `<username>.github.io` (e.g. `abhisheksaha2002.github.io`),
it deploys to the root domain instead: `https://<username>.github.io/`.

**Option B — `gh-pages` package (manual deploy)**

```bash
npm install -D gh-pages
npm run build
npx gh-pages -d dist
```

Then set **Settings → Pages → Source** to the `gh-pages` branch.

## Editing content

All resume content lives in one place: `src/data/content.ts`. Update your
experience, projects, skills, education, and contact info there — the
components just render it.

## Stack

React 19, TypeScript, Vite, Tailwind CSS.
