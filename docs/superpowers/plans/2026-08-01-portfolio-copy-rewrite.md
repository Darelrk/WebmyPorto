# Portfolio Copy Rewrite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the portfolio homepage copy for recruiters and data-science clients using an evidence-led hybrid message and a consistent `Let's work together` CTA.

**Architecture:** Keep the existing React/TanStack Start structure and update the content model plus hardcoded presentation copy only where the current component cannot render the approved message. No layout, styling, dependency, route, or data-flow changes.

**Tech Stack:** React, JSON content data, Tailwind utility classes, Framer Motion, Vite/TanStack Start.

---

### Task 1: Update source-of-truth portfolio copy

**Files:**
- Modify: `src/data/content.json`

- [ ] Replace the hero title with `I turn complex data into decisions people can act on.`.
- [ ] Replace the hero subtitle with `Data Science undergraduate building analysis, machine learning models, and automated workflows for teams that need clearer answers and more reliable processes.`.
- [ ] Set the hero CTA to `Let's work together` and preserve every existing live project, metric, role, certification, education fact, and external URL.
- [ ] Rewrite the about text to connect end-to-end analysis, data-driven policy support, and practical delivery without adding claims.
- [ ] Rewrite expertise descriptions around data analysis, machine learning/research, and workflow automation while retaining the existing tool names.
- [ ] Rewrite research and project descriptions using problem, approach, and evidence language grounded in the live portfolio and GitHub READMEs.
- [ ] Update experience bullets to active voice while retaining the existing roles and factual achievements.
- [ ] Add footer title/description/email fields for `Let's Connect.` and `Open for collaboration in data science, analysis, and machine learning projects.` while keeping current social URLs.

### Task 2: Replace hardcoded presentation copy

**Files:**
- Modify: `src/components/Navbar.jsx`
- Modify: `src/components/Hero.jsx`
- Modify: `src/components/About.jsx`
- Modify: `src/components/Expertise.jsx`
- Modify: `src/components/Education.jsx`
- Modify: `src/components/FeaturedResearch.jsx`
- Modify: `src/components/Experience.jsx`
- Modify: `src/components/Projects.jsx`
- Modify: `src/components/Footer.jsx`

- [ ] Render the data-driven logo, email, CTA, and section labels where the components currently hardcode generic copy.
- [ ] Use `Let's work together` for the primary hero, navigation, and footer actions, and use `See my work` for the secondary hero action.
- [ ] Replace generic section headlines with clear recruiter/client-oriented copy without changing layout classes.
- [ ] Remove unsupported filler phrases and avoid adding new metrics or testimonials.

### Task 3: Verify copy and delivery

**Files:**
- Verify: `src/data/content.json`
- Verify: built homepage in a browser at desktop and mobile widths

- [ ] Run `npm run build` and confirm both client and SSR bundles build successfully.
- [ ] Start the dev server and verify the new hero headline, CTA, about copy, project descriptions, and footer CTA render.
- [ ] Check that all existing project links remain present and no new unsupported claims appear.
- [ ] Initialize Git if needed, commit the design/spec/copy changes, add `https://github.com/Darelrk/WebmyPorto` as `origin`, and push the completed branch after confirming the remote history is compatible; do not force-push over an unrelated project.
