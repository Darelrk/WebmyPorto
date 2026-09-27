# Site-wide Scroll Motion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `executing-plans` to implement this plan task-by-task. User selected inline execution; keep implementation in this session.

**Goal:** Add restrained velocity response, a desktop research-to-project overlap, catalog entry choreography, and case-study media parallax across the portfolio.

**Architecture:** Keep Lenis, its existing `ScrollTrigger.update` bridge, and the GSAP ticker in `src/main.jsx`. Add one pure velocity normalizer in `src/lib/motion.js`; keep each route's triggers scoped in its existing `useGSAP` component and use `gsap.matchMedia()` for desktop and reduced-motion boundaries.

**Tech Stack:** React 18, GSAP 3.12.5, `@gsap/react` 2.1.2, Lenis 1.3.25, Vite, Node built-in test runner.

---

## File map

- Modify `src/lib/motion.js`: add signed, bounded velocity normalization.
- Create `src/lib/motion.test.js`: verify normalization edges with `node:test` and `node:assert`.
- Modify `src/components/Hero.jsx`: integrate velocity into the existing hero photo parallax without sharing its entrance transform.
- Modify `src/components/FeaturedResearch.jsx` and `src/components/Projects.jsx`: layer the research panel over the section seam while preserving the Projects content's existing document position.
- Modify `src/components/ProjectCatalog.jsx`: start the repository-card stagger only after asynchronous data has rendered; do not replay the heading or move skeletons; disable this new stagger on mobile and reduced motion.
- Modify `src/components/work/WorkShell.jsx` and `src/components/work/WorkBody.jsx`: add parallax to project images and chart figures only.
- Update `docs/superpowers/specs/2026-09-27-scroll-velocity-parallax-design.md`: record implementation status and observed verification results.
- Do not modify `src/main.jsx`, add dependencies, or add an animation controller.

## Task 1: Bound velocity math with a regression test

**Files:**
- Create: `src/lib/motion.test.js`
- Modify: `src/lib/motion.js`

- [ ] **Step 1: Add the failing built-in test**

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import { normalizeScrollVelocity } from './motion.js'

test('normalizes signed velocity and clamps extreme scroll speed', () => {
  assert.equal(normalizeScrollVelocity(0), 0)
  assert.equal(normalizeScrollVelocity(900), 0.5)
  assert.equal(normalizeScrollVelocity(-900), -0.5)
  assert.equal(normalizeScrollVelocity(1800), 1)
  assert.equal(normalizeScrollVelocity(-1800), -1)
  assert.equal(normalizeScrollVelocity(3600), 1)
  assert.equal(normalizeScrollVelocity(-3600), -1)
})
```

Run: `node --test src/lib/motion.test.js`
Expected: FAIL because `normalizeScrollVelocity` is not exported yet.

- [ ] **Step 2: Add the minimal normalizer**

Add to `src/lib/motion.js`:

```js
const MAX_SCROLL_VELOCITY = 1800

export function normalizeScrollVelocity(velocity) {
  return Math.max(-1, Math.min(1, velocity / MAX_SCROLL_VELOCITY))
}
```

Run: `node --test src/lib/motion.test.js`
Expected: one passing test; values remain in `[-1, 1]` with direction preserved.

## Task 2: Add desktop velocity response to the existing hero parallax

**Files:**
- Modify: `src/components/Hero.jsx`

- [ ] **Step 1: Add the scoped velocity trigger and media gate**

Import `ScrollTrigger` from `../lib/gsap` and `normalizeScrollVelocity` from `../lib/motion`. Inside the existing `useGSAP` callback, create `gsap.matchMedia()` before the reduced-motion early return. Keep the existing `hero-image-wrap` and `hero-card-coral` scrub tweens inside this desktop, no-preference query. Add:

```js
const mm = gsap.matchMedia()
mm.add(
  {
    desktop: '(min-width: 768px)',
    reduceMotion: '(prefers-reduced-motion: reduce)',
  },
  ({ conditions }) => {
    if (!conditions.desktop || conditions.reduceMotion) return
    const layer = ref.current.querySelector('.hero-image-motion')
    if (!layer) return
    const yTo = gsap.quickTo(layer, 'y', { duration: 0.24, ease: 'power2.out' })

    ScrollTrigger.create({
      trigger: ref.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => yTo(-normalizeScrollVelocity(self.getVelocity()) * 16),
    })
  },
)
```

The reduced-motion branch must return `() => mm.revert()` after setting the existing hero stats visible. The normal path must also return `() => mm.revert()`.

- [ ] **Step 2: Isolate the velocity transform in the hero markup**

Replace the current `.hero-image-wrap` opening element with two nested wrappers. Move its existing image, gradient, and caption unchanged inside the inner element:

```jsx
<div className="hero-image-motion relative aspect-[4/3] sm:absolute sm:inset-x-8 sm:top-12 sm:bottom-0 sm:aspect-auto">
  <div className="hero-image-wrap relative h-full w-full overflow-hidden rounded-[28px] bg-mist">
```

Close both wrappers after the existing caption. The outer wrapper owns the velocity `y`; the inner image keeps its existing entrance and `yPercent` parallax.

## Task 3: Create the research-to-project overlap without pinning

**Files:**
- Modify: `src/components/FeaturedResearch.jsx`
- Modify: `src/components/Projects.jsx`

- [ ] **Step 1: Reallocate only the existing desktop seam spacing**

In `FeaturedResearch.jsx`, change the section opening to:

```jsx
<section id="research" className="relative z-20 border-b border-line/80">
  <div className="container-shell py-12 sm:py-32 md:pb-0">
```

Wrap the current panel element, which starts with `<div ref={ref}`, in `<div className="research-overlap-layer relative">`; preserve every existing panel child.

In `Projects.jsx`, change the section and its container opening to:

```jsx
<section id="projects" ref={ref} className="relative z-10 border-b border-line/80">
  <div className="container-shell py-12 sm:py-32 md:pt-64">
```

At `min-width: 768px`, this moves the existing 128px bottom padding from the research section to the projects section top. The Projects heading remains at its prior document coordinate. Widths below 768px retain current spacing.

- [ ] **Step 2: Add bounded velocity movement to the overlap layer**

Reuse the component's `useGSAP` scope. Import `ScrollTrigger` and `normalizeScrollVelocity`. Create `gsap.matchMedia()` before the reduced-motion early return. Keep the existing reveal tween on `ref.current`; the wrapper receives a separate transform so the two effects do not compete:

```js
const mm = gsap.matchMedia()
mm.add(
  {
    desktop: '(min-width: 768px)',
    reduceMotion: '(prefers-reduced-motion: reduce)',
  },
  ({ conditions }) => {
    if (!conditions.desktop || conditions.reduceMotion) return
    const layer = ref.current.parentElement
    gsap.set(layer, { y: 12 })
    const yTo = gsap.quickTo(layer, 'y', { duration: 0.24, ease: 'power2.out' })

    ScrollTrigger.create({
      trigger: ref.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        yTo(12 + normalizeScrollVelocity(self.getVelocity()) * 12)
      },
    })
  },
)
```

The resulting layer offset stays between 0px and 24px. Return `() => mm.revert()` from both the reduced-motion and normal paths. Do not add `pin`, `scrub`, a new scroll listener, or a z-index to text that would cover the panel.

## Task 4: Animate catalog cards after GitHub data resolves

**Files:**
- Modify: `src/components/ProjectCatalog.jsx`

- [ ] **Step 1: Keep the heading entrance mount-only**

Keep the header tween in its own existing-style hook so it is not rerun on repository updates:

```js
useGSAP(() => {
  if (reduceMotion) return
  gsap.fromTo('.cat-header', { opacity: 0, y: 16 }, {
    opacity: 1, y: 0, duration: 0.6, ease: EASE_OUT,
  })
}, { scope: ref })
```

- [ ] **Step 2: Scope the card stagger to loaded desktop data**

Add a second `useGSAP` for `.cat-card`. Keep skeletons static and leave real cards immediately visible on mobile and under reduced motion. Use a media query that reverts when its condition changes; skip loading and empty data:

```js
useGSAP(() => {
  const mm = gsap.matchMedia()
  mm.add(
    {
      desktop: '(min-width: 768px)',
      reduceMotion: '(prefers-reduced-motion: reduce)',
    },
    ({ conditions }) => {
      if (!conditions.desktop || conditions.reduceMotion || loading || repos.length === 0) return
      gsap.fromTo(
        '.cat-card',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.55, ease: EASE_OUT, stagger: 0.07 },
      )
    },
  )
  return () => mm.revert()
}, {
  scope: ref,
  dependencies: [loading, repos],
  revertOnUpdate: true,
})
```

Run the browser check with the live GitHub response. Expected: skeleton cards remain still; real repository cards enter once in grid order on desktop; cards remain static on mobile/reduced motion; the header does not replay.

## Task 5: Apply parallax only to case-study media

**Files:**
- Modify: `src/components/work/WorkShell.jsx`
- Modify: `src/components/work/WorkBody.jsx`

- [ ] **Step 1: Mark image and chart targets without moving copy**

In `WorkShell.jsx`, change the current image class from `h-auto w-full` to `ws-parallax-media h-auto w-full`.

In `WorkBody.jsx`, change only these two existing opening elements:

```jsx
<figure aria-label="Fan chart of credit gap forecasts">
```

```jsx
<figure aria-label="Accuracy comparison bar chart">
```

to:

```jsx
<figure className="wb-parallax-media" aria-label="Fan chart of credit gap forecasts">
```

```jsx
<figure className="wb-parallax-media" aria-label="Accuracy comparison bar chart">
```

Do not mark captions, headings, tables, list renderers, stat tiles, or buttons.

- [ ] **Step 2: Add local desktop-only scrub tweens**

Inside each component's existing scoped `useGSAP`, create `gsap.matchMedia()` before the reduced-motion early return. Under `(min-width: 768px) and (prefers-reduced-motion: no-preference)`, animate only scoped media targets:

```js
gsap.utils.toArray('.ws-parallax-media', ref.current).forEach((media, index) => {
  gsap.to(media, {
    yPercent: index % 2 === 0 ? -2 : 2,
    ease: 'none',
    scrollTrigger: {
      trigger: media,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.35,
    },
  })
})
```

Use `.wb-parallax-media` for `WorkBody.jsx`. Return `() => mm.revert()` from both reduced-motion and normal paths. Keep existing reveal animations and reduced-motion behavior. Do not animate table or narrative blocks.

## Task 6: Verify the rendered behavior and update the spec

**Files:**
- Modify: `docs/superpowers/specs/2026-09-27-scroll-velocity-parallax-design.md`

- [ ] **Step 1: Install locked dependencies and run deterministic checks**

Run `npm ci`, then `node --test src/lib/motion.test.js` and `npm run build` from the repository root. All commands must pass.

- [ ] **Step 2: Run the app and check all page families**

Run `npm run dev -- --host 127.0.0.1`, open the app in the browser at a desktop viewport, and inspect `/`, `/projects`, and `/work/credit-gap-forecaster`. Scroll slowly and quickly in both directions, pause after a fast scroll, then revisit the hero and research-to-project seam. Confirm velocity settles, the seam overlap stays within 24px, and no heading/control is covered.

- [ ] **Step 3: Check mobile and reduced motion**

At a 390x844 viewport, repeat the routes and check `document.documentElement.scrollWidth <= window.innerWidth`; confirm there is no dynamic overlap, parallax, or catalog card stagger. Emulate `prefers-reduced-motion: reduce`, reload the desktop route, and confirm all text, cards, and controls are immediately visible with no new movement. Exercise anchor navigation and keyboard scrolling; inspect browser console for errors.

- [ ] **Step 4: Record evidence and publish**

Update the design spec status to implemented and add only observed build/browser results. Do not add performance claims. Run `git diff --check`, commit the source, test, and spec update as one feature commit, and push the branch.
