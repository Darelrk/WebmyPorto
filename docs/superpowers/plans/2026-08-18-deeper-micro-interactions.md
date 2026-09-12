# Deeper Micro-Interactions (inspired by amicro.vercel.app) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tingkatkan "feel" portfolio dengan micro-interactions ala amicro (magnetic CTA, glow cursor, tilt card, text-reveal heading, hero spotlight) — di-port ke GSAP agar tidak menambah dependency framer-motion.

**Architecture:** 4 komponen reusable baru di `src/components/ui/` (`MagneticButton`, `GlowButton`, `TiltCard`, `TextReveal`) + 1 penambahan overlay di Hero. Semua guard dengan `useReducedMotionSafe` (sudah ada di `src/lib/gsap.js`). Hero CTA sudah punya magnetic (lihat `Hero.jsx` // Magnetic CTA hover) — jadi Task 1 hanya menyamakan Navbar/Footer.

**Tech Stack:** Vite + React 18, Tailwind, GSAP (`useGSAP`, `gsap.quickTo`), Lenis. Tidak ada dependency baru.

**Sumber:** https://amicro.vercel.app/ (repo https://github.com/Subhan-code/Amicro--Micro-transitions-). Elemen yang diadopsi: magnetic-button, glow-button, tilt-card, text-reveal, mouse-follow/spotlight.

---

## Task 1: MagneticButton reusable + terapkan ke Navbar & Footer CTA

**Files:**
- Create: `src/components/ui/MagneticButton.jsx`
- Modify: `src/components/Navbar.jsx` (CTA `mailto`)
- Modify: `src/components/Footer.jsx` (CTA "Let's work together")

- [ ] **Step 1: Buat `MagneticButton.jsx`**

```jsx
import { useRef } from 'react'
import { useGSAP, gsap, useReducedMotionSafe } from '../../lib/gsap'

export default function MagneticButton({ children, href, strength = 0.35, className = '', ...rest }) {
  const ref = useRef(null)
  const reduce = useReducedMotionSafe()
  useGSAP(() => {
    if (reduce) return
    const el = ref.current
    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' })
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      xTo((e.clientX - (r.left + r.width / 2)) * strength)
      yTo((e.clientY - (r.top + r.height / 2)) * strength)
    }
    const onLeave = () => { xTo(0); yTo(0) }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave) }
  }, { scope: ref })

  const cls = `inline-flex items-center justify-center ${className}`
  if (href) return <a ref={ref} href={href} className={cls} {...rest}>{children}</a>
  return <button ref={ref} className={cls} {...rest}>{children}</button>
}
```

- [ ] **Step 2: Terapkan di Navbar CTA**

Di `Navbar.jsx`, ubah import dan ganti anchor CTA:

```jsx
import MagneticButton from './ui/MagneticButton'
// ...
// ganti:
// <a href={`mailto:${data.email}`} className="rounded-full bg-ink px-4 py-2.5 text-xs font-bold text-canvas transition hover:-translate-y-0.5 hover:bg-coral active:translate-y-0">
//   {data.cta}
// </a>
// menjadi:
<MagneticButton href={`mailto:${data.email}`} className="rounded-full bg-ink px-4 py-2.5 text-xs font-bold text-canvas transition hover:-translate-y-0.5 hover:bg-coral active:translate-y-0">
  {data.cta}
</MagneticButton>
```

- [ ] **Step 3: Terapkan di Footer CTA**

Di `Footer.jsx`:

```jsx
import MagneticButton from './ui/MagneticButton'
// ganti anchor "Let's work together" dengan:
<MagneticButton href={`mailto:${data.email ?? 'darelrafif.kz@gmail.com'}`} className="inline-flex items-center gap-2 rounded-full bg-coral px-5 py-3 text-sm font-bold text-canvas transition hover:-translate-y-0.5 hover:bg-ink active:translate-y-0">
  Let&apos;s work together <ArrowUpRight size={16} strokeWidth={1.8} />
</MagneticButton>
```

- [ ] **Step 4: Build + verifikasi**

Run: `npm run build`
Expected: `✓ built` tanpa error.

Browser (viewport 1440): hover CTA Navbar & Footer → elemen bergerak mengikuti kursor (~0.35× offset), kembali ke posisi saat leave. Dengan DevTools emulate `prefers-reduced-motion: reduce` → tidak ada pergeseran.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/MagneticButton.jsx src/components/Navbar.jsx src/components/Footer.jsx
git commit -m "feat(ui): magnetic CTA buttons (GSAP port of amicro magnetic-button)"
```

---

## Task 2: GlowButton cursor-glow + terapkan ke "View study"

**Files:**
- Create: `src/components/ui/GlowButton.jsx`
- Modify: `src/components/FeaturedResearch.jsx` (anchor "View study", sekitar baris 161-164)

- [ ] **Step 1: Buat `GlowButton.jsx`**

```jsx
import { useRef } from 'react'
import { useReducedMotionSafe } from '../../lib/gsap'

export default function GlowButton({ children, href, glow = 'rgba(232,93,74,0.30)', className = '', ...rest }) {
  const ref = useRef(null)
  const reduce = useReducedMotionSafe()
  const onMove = (e) => {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--gx', `${e.clientX - r.left}px`)
    ref.current.style.setProperty('--gy', `${e.clientY - r.top}px`)
  }
  const cls = `group relative inline-flex items-center justify-center overflow-hidden ${className}`
  const glowLayer = (
    <span aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      style={{ background: `radial-gradient(130px circle at var(--gx, 50%) var(--gy, 50%), ${glow}, transparent 80%)` }} />
  )
  const content = <span className="relative z-10">{children}</span>
  if (href) return <a ref={ref} href={href} onMouseMove={onMove} className={cls} {...rest}>{glowLayer}{content}</a>
  return <button ref={ref} onMouseMove={onMove} className={cls} {...rest}>{glowLayer}{content}</button>
}
```

- [ ] **Step 2: Terapkan di FeaturedResearch "View study"**

Di `FeaturedResearch.jsx`:

```jsx
import GlowButton from './ui/GlowButton'
// ganti <a href={data.link} ...>View study ...</a> dengan:
<GlowButton href={data.link} target="_blank" rel="noreferrer"
  className="mt-9 inline-flex items-center gap-2 rounded-full bg-coral px-5 py-3 text-sm font-bold text-canvas transition hover:-translate-y-0.5 hover:bg-canvas hover:text-ink active:translate-y-0">
  View study <ArrowUpRight size={16} strokeWidth={1.8} />
</GlowButton>
```

- [ ] **Step 3: Build + verifikasi**

Run: `npm run build` → `✓ built`.

Browser: hover tombol "View study" → cahaya radial mengikuti kursor di dalam tombol. Reduced-motion → tidak ada glow (onMove return early).

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/GlowButton.jsx src/components/FeaturedResearch.jsx
git commit -m "feat(ui): cursor-glow button on View study (amicro glow-button port)"
```

---

## Task 3: TiltCard reusable + terapkan ke project cards

**Files:**
- Create: `src/components/ui/TiltCard.jsx`
- Modify: `src/components/Projects.jsx` (bungkus root tiap kartu project)

- [ ] **Step 1: Buat `TiltCard.jsx`**

```jsx
import { useRef } from 'react'
import { useGSAP, gsap, useReducedMotionSafe } from '../../lib/gsap'

export default function TiltCard({ children, maxTilt = 12, className = '', innerClassName = '' }) {
  const ref = useRef(null)
  const reduce = useReducedMotionSafe()
  useGSAP(() => {
    if (reduce) return
    const el = ref.current
    const xTo = gsap.quickTo(el, 'rotationY', { duration: 0.5, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'rotationX', { duration: 0.5, ease: 'power3.out' })
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      xTo(px * maxTilt)
      yTo(-py * maxTilt)
    }
    const onLeave = () => { xTo(0); yTo(0) }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave) }
  }, { scope: ref })

  return (
    <div ref={ref} className={className} style={{ perspective: '900px' }}>
      <div className={`h-full w-full ${innerClassName}`} style={{ transformStyle: 'preserve-3d' }}>
        {children}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Bungkus kartu project**

Di `Projects.jsx`, import `TiltCard` dan bungkus elemen root tiap kartu (elemen yang memetakan `data.projects`):

```jsx
import TiltCard from './ui/TiltCard'
// pada .map((p) => ( <TiltCard key={p.id} maxTilt={10} className="h-full"> ...kartu asli... </TiltCard> ))
```

Pastikan kartu asli mempertahankan `h-full` agar tinggi konsisten.

- [ ] **Step 3: Build + verifikasi**

Run: `npm run build` → `✓ built`.

Browser (1440): hover kartu project → sedikit miring 3D mengikuti kursor, kembali rata saat leave. Reduced-motion → tidak miring.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/TiltCard.jsx src/components/Projects.jsx
git commit -m "feat(ui): 3D tilt project cards (amicro tilt-card port, GSAP)"
```

---

## Task 4: TextReveal reusable + terapkan ke section headings

**Files:**
- Create: `src/components/ui/TextReveal.jsx`
- Modify: `src/components/About.jsx`, `Experience.jsx`, `Projects.jsx`, `Footer.jsx` (heading utama tiap section)

- [ ] **Step 1: Buat `TextReveal.jsx`** (split manual, tanpa plugin SplitText berbayar)

```jsx
import { useRef } from 'react'
import { useGSAP, gsap, useReducedMotionSafe } from '../../lib/gsap'

export default function TextReveal({ text, as: As = 'h2', className = '', stagger = 0.03, duration = 0.6 }) {
  const ref = useRef(null)
  const reduce = useReducedMotionSafe()
  const words = text.split(' ')
  useGSAP(() => {
    if (reduce) { gsap.set('.tr-word', { opacity: 1, y: 0 }); return }
    gsap.fromTo('.tr-word',
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration, ease: 'expo.out', stagger,
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true } })
  }, { scope: ref })

  return (
    <As ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} className="tr-word inline-block mr-[0.25em] will-change-transform">{w}</span>
      ))}
    </As>
  )
}
```

- [ ] **Step 2: Ganti heading section**

Untuk tiap section, ganti `<h2 ...>{data.heading}</h2>` (atau title) dengan `<TextReveal as="h2" text={data.heading} className="...kelas sama..." />`. Contoh About:

```jsx
import TextReveal from './ui/TextReveal'
// <h2 className="mt-8 ...">{data.heading}</h2>
// menjadi:
<TextReveal as="h2" text={data.heading} className="mt-8 max-w-xl text-[clamp(2.8rem,5.4vw,5rem)] font-bold leading-[0.95] tracking-[-0.075em]" />
```

Lakukan untuk `data.heading` (About), `data.title` (Experience/Projects/Footer) — sesuaikan prop `text`.

- [ ] **Step 3: Build + verifikasi**

Run: `npm run build` → `✓ built`.

Browser (1440, scroll ke tiap section): heading muncul kata-per-kata (stagger) saat masuk viewport. Reduced-motion → heading langsung terlihat (opacity 1, tanpa animasi).

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/TextReveal.jsx src/components/About.jsx src/components/Experience.jsx src/components/Projects.jsx src/components/Footer.jsx
git commit -m "feat(ui): word-stagger text reveal on section headings (amicro text-reveal port)"
```

---

## Task 5: Hero cursor spotlight (mouse-follow radial)

**Files:**
- Modify: `src/components/Hero.jsx` (tambah overlay + wire mousemove di `useGSAP`)

- [ ] **Step 1: Tambah overlay di dalam `hero-image-wrap`**

Di dalam `<div className="hero-image-wrap ...">` (setelah `<img>` dan gradient), tambah:

```jsx
<div className="hero-spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
  style={{ background: 'radial-gradient(220px circle at var(--sx,50%) var(--sy,50%), rgba(255,255,255,0.18), transparent 70%)' }} />
```

Tambahkan `group` ke `hero-image-wrap` agar `group-hover` aktif:

```jsx
<div className="hero-image-wrap group relative h-[430px] overflow-hidden rounded-[28px] bg-mist sm:absolute sm:inset-x-8 sm:top-12 sm:bottom-0 sm:h-auto">
```

- [ ] **Step 2: Wire mousemove di `useGSAP`**

Di dalam `useGSAP` Hero (di mana ada `const wrap = ...`? tidak — pakai ref scope). Tambah:

```js
const wrap = ref.current?.querySelector('.hero-image-wrap')
if (wrap && !reduceMotion) {
  const onMove = (e) => {
    const r = wrap.getBoundingClientRect()
    wrap.style.setProperty('--sx', `${e.clientX - r.left}px`)
    wrap.style.setProperty('--sy', `${e.clientY - r.top}px`)
  }
  wrap.addEventListener('mousemove', onMove)
  // cleanup otomatis via ctx.revert() di useGSAP scope
}
```

`reduceMotion` sudah didefinisikan di Hero (`const reduceMotion = useReducedMotionSafe()`).

- [ ] **Step 3: Build + verifikasi**

Run: `npm run build` → `✓ built`.

Browser (1440): hover area foto hero → cahaya lembut mengikuti kursor di atas foto. Reduced-motion → tidak ada spotlight.

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.jsx
git commit -m "feat(ui): hero cursor spotlight (amicro mouse-follow port, GSAP)"
```

---

## Self-Review

- **Spec coverage:** 5 elemen amicro diadopsi (magnetic, glow, tilt, text-reveal, spotlight). Card-hover (layoutId) sengaja di-skip karena butuh framer-motion `layoutId` — tidak di-port agar tanpa dep baru; bisa pakai CSS hover biasa jika diinginkan nanti.
- **Placeholder scan:** semua step punya kode lengkap; tidak ada TODO/TBD.
- **Type/name consistency:** `useReducedMotionSafe` dari `src/lib/gsap.js` dipakai konsisten di semua komponen; class `tr-word`, `hero-spotlight`, `--gx/--gy/--sx/--sy` konsisten.
- **No new deps:** tidak ada `npm install` framer-motion — semua port ke GSAP `quickTo`/CSS vars.
- **Reduced motion:** setiap komponen guard `useReducedMotionSafe`; Hero pakai `reduceMotion` yang sudah ada.

**Verifikasi akhir:**
```bash
cd D:/JS/WebmyPorto && npm run build
# → ✓ built
# browser 1440px: magnetic CTA, glow View study, tilt project, stagger heading, hero spotlight semua jalan
# emulate prefers-reduced-motion: reduce → semua diam
```
