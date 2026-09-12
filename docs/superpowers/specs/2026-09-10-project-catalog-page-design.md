# Project Catalog Page Design

**Date:** 2026-09-10
**Status:** Draft (user approved design sections; pending spec review)
**Scope:** New `/projects` route — GitHub project catalog page

## Decision Log

| Decision | Choice |
|---|---|
| Tab type | New page (route), not homepage section |
| Routing | TanStack Router (user chose B over conditional render) |
| Data source | GitHub API live, 6 curated repos, manual fallback |
| Fallback | content-style JSON fallback per-repo (allSettled semantics) |
| Style | Grid cards, SpotlightCard, existing motion system |
| Homepage | Untouched; add one "view full catalog" link to `/projects` |

## Context

- Portfolio is currently a single-page scroll: `main.jsx` renders `<App />` directly. TanStack Router scaffold (`router.jsx`, `routeTree.gen.ts`, `routes/__root.jsx`, `routes/index.jsx`) exists but is **not wired** — no `<RouterProvider>`.
- `vercel.json` already rewrites `/(.*)` → `/index.html` (SPA-safe).
- User's GitHub (`Darelrk`): 15 public non-fork repos; 6 chosen are data-science repos with descriptions.
- GitHub API anonymous limit: 60 req/hr per IP; catalog uses 6.

## Architecture

### 1. Routing & Entry

**`src/main.jsx`** — change render target:

```jsx
import { RouterProvider } from '@tanstack/react-router'
import { getRouter } from './router'
// Lenis + GSAP setup stays as-is
const router = getRouter()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
```

- `router.jsx` (existing, unchanged): `createRouter({ routeTree, scrollRestoration: true, defaultPreload: 'intent' })`.
- `routes/index.jsx` (existing, unchanged): `/` → `App`.
- **New `src/routes/projects.jsx`**: `createFileRoute('/projects')({ component: ProjectCatalog })`.
- Regenerate `routeTree.gen.ts` (TanStack Router plugin or CLI `tsr generate`).

### 2. Navbar

`src/components/Navbar.jsx`: "Projects" link changes from `{ name: 'Projects', href: '#projects' }` to route link `/projects` (data change in `content.json` + render: plain `<a href="/projects">` works — TanStack intercepts same-origin). All other links stay anchors. Mobile menu: same change.

### 3. Catalog Page — `src/components/ProjectCatalog.jsx`

Structure (reuses existing components, no new design system):

```
Navbar (existing, sticky)
<main>
  Header block (proj-header style: coral eyebrow + TextReveal title)
  Grid: SpotlightCard x N (2 cols sm, 3 cols lg)
  "Back to portfolio" link → "/"
</main>
Footer (existing)
ScrollToTop (existing)
```

Each card (`SpotlightCard as="a"`, target repo URL):
- Repo name (bold, tracking like proj-item)
- Description (text-muted)
- Meta row: language dot + name, stars, updated date (relative "Mar 2026")
- Topics as chips (border pill, like proj tags)
- ArrowUpRight icon, hover translate (existing pattern)

Motion: `gsap.fromTo` cards `{opacity:0, y:24}` → stagger 0.07, `EASE_OUT`, ScrollTrigger `top 85%`, once. `reduceMotion` → `gsap.set` visible (existing gate pattern).

Loading state: skeleton grid (6 blocks, `animate-pulse` — pattern from `SectionSkeleton`).

### 4. Data Layer — `src/lib/github.js`

```js
const GITHUB_USER = 'Darelrk'
const CATALOG_REPOS = [
  'credit-gap-forecaster',
  'Tabular-Synthesis-LLM',
  'mae-hybrid-imputation-study',
  'ContainerPort-ID',
  'Dashboard-Analisis-Universitas-LPDP',
  'Sleep-Health-and-Lifestyle-Dataset',
]
```

- `fetchRepo(name)` → `GET https://api.github.com/repos/Darelrk/{name}` → map `{name, description, language, stars, updatedAt: pushed_at, topics, url: html_url}`; timeout 8s.
- `useGitHubRepos()` hook: `Promise.all` over CATALOG_REPOS; per-repo try/catch — API fail for repo X → use fallback entry for X (never a failed catalog). State: `{loading, repos}`.
- Errors never throw to UI; fallback is silent.

### 5. Fallback Data — `src/data/github-fallback.json`

Same shape as mapped API output, 6 entries, order = CATALOG_REPOS order. Snapshot of repo state as of 2026-09-10 (descriptions from API, manual topics, `updatedAt` snapshot). Edit this file to curate; rename/remove entries here AND in CATALOG_REPOS.

### 6. Homepage Link

`src/components/Projects.jsx`: after `.proj-list`, one line — `<a href="/projects">View full catalog →</a>` styled as text link (coral, hover translate arrow). Section itself untouched.

## Error Handling

| Case | Behavior |
|---|---|
| GitHub API rate-limited / offline | Fallback JSON per-repo, silent |
| One repo 404 (renamed/deleted) | Fallback entry keeps card; user updates config |
| Route `/projects` direct hit | Vercel rewrite serves SPA; router renders catalog |
| Reduced motion | Cards visible immediately, no Lenis, no entrance |

## Testing / Verification

No test framework in repo. Verification (manual, per repo convention):

1. `npm run build` clean.
2. Dev server: `/` renders homepage all 8 sections; `/projects` renders catalog with 6 cards.
3. Network throttle → offline: cards still render (fallback), no console error thrown to UI.
4. `prefers-reduced-motion: reduce` emulation: cards visible instantly.
5. Mobile 375px: grid single column, no overflow.
6. Navbar Projects on mobile menu navigates to `/projects`.

## Non-Goals

- No filter chips, no search, no pagination (6 repos).
- No GitHub token / serverless proxy (60 req/hr anonymous is fine for a portfolio).
- No README rendering, no repo preview images.
- Homepage section Projects stays as-is (no data dedup with catalog).
