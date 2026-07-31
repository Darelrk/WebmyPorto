# Portfolio Copy Rewrite - Hybrid Recruiter and Client

## Goal

Rewrite the homepage copy so it speaks to both recruiters/hiring managers and prospective data-science clients. The page should present Darrell as a data scientist who turns complex data into actionable decisions and reliable workflows.

## Primary action

Use one CTA consistently across the page:

> Let's work together

The CTA should link to the existing contact/email flow. No new form, analytics event, or route is required.

## Messaging approach

Use an evidence-led hybrid:

1. Lead with a clear outcome instead of a generic role label.
2. Connect technical capabilities to business outcomes such as clearer decisions, reliable analysis, and less manual workflow work.
3. Support claims with existing projects, experience, research, education, and certifications.
4. Preserve factual project names, repository links, measured results, and employment details already present in the live portfolio or GitHub repositories.
5. Do not invent clients, testimonials, revenue, performance claims, or employment outcomes.

## Section copy direction

### Hero

- Headline: `I turn complex data into decisions people can act on.`
- Subheadline: `Data Science undergraduate building analysis, machine learning models, and automated workflows for teams that need clearer answers and more reliable processes.`
- Primary CTA: `Let's work together`
- Secondary CTA: `See my work`
- Role proof: `Data Science undergraduate` and `Problem Solver`

### About

Position the profile around end-to-end analysis, innovative metrics, data-driven policy support, and practical delivery. Keep the existing university and GPA facts.

### Expertise

Frame skills as outcomes:

- Data analysis and visualization: turn raw data into clear findings.
- Machine learning and research: build and evaluate models for real data problems.
- Automation and workflows: reduce repetitive work with practical data systems.

Keep the existing tools visible: Python, Pandas, NumPy, Web Scraping, SQL, Looker Studio, Microsoft Excel, SAP Analytics Cloud, n8n, and the existing soft skills.

### Education and certifications

Keep factual names, institutions, years, and GPA. Remove generic filler headings where possible.

### Research

Explain the existing synthetic-data and imputation work through problem, method, and evidence. Preserve the existing percentages and repository links. Use concise labels suitable for both technical and non-technical readers.

### Experience

Keep the three existing roles and achievements. Rewrite bullets to lead with the action and practical outcome without adding unsupported measurements.

### Projects

Keep every existing data-science project and its GitHub link. Use a consistent format: what problem it addresses, what was built or tested, and the relevant tools or evidence.

### Footer

Use the live portfolio's collaboration message and repeat `Let's work together` as the final CTA. Keep the email and live social links unchanged; remove stale placeholder links.

## Constraints

- Copy-only change; text literals and prop wiring in presentation components may change, but no layout, dependency, route, or styling changes.
- Edit `src/data/content.json` first; update component copy only where hardcoded text prevents the approved messaging from rendering.
- Use plain, professional English because the current portfolio is English-language.
- Prefer short sentences, active voice, concrete nouns, and no unsupported superlatives.
- Keep existing factual data from the live portfolio and GitHub as the source of truth.

## Acceptance criteria

- Hero immediately communicates data-science value for recruiters and clients.
- `Let's work together` is the primary CTA in hero and footer.
- Existing factual content and live project/social links remain present.
- No fabricated claims are introduced.
- `npm run build` succeeds.
- The homepage renders the revised copy at desktop and mobile widths.
