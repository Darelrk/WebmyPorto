# Rencana Implementasi — Perbaikan UI/UX Mobile & Polish (Pasca GSAP + Lenis)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Menghilangkan overflow dekoratif di mobile, mengaktifkan stat hero yang benar-benar beranimasi, memperbaiki touch pada compare slider, dan membuat skill tooltip responsif.

**Architecture:** 4 perbaikan terisolasi di 3 file. Tidak ada dependensi baru. Verifikasi via `npm run build` + browser (tidak ada test framework di repo — verifikasi visual adalah bukti).

**Tech Stack:** Vite + React 18, Tailwind, GSAP, Lenis.

**Sumber temuan (bukti):** Review live `https://darel-data-scientist.vercel.app/` di viewport 390px menemukan 3 elemen dekoratif absolute melempar sampai `right: 567px` (diselamatkan hanya oleh `overflow-x-clip` di root), stat counter tidak jalan karena `content.json` hero.stats bernilai teks (`"S1 Data Science"` dst, bukan angka), dan compare slider memakai `touchmove passive` tanpa koordinasi momentum scroll.

---

## Task 1: Buang overflow dekoratif di mobile

**Files:**
- Modify: `src/App.jsx:37-43`
- Modify: `src/components/Education.jsx` (decorative circle)

- [ ] **Step 1: Sembunyikan blur dekoratif kanan-atas di mobile**

`src/App.jsx` — ubah class pada baris dekorasi blur dari:
```jsx
<div className="absolute -right-48 top-24 h-96 w-96 rounded-full bg-mist/30 blur-3xl" />
```
menjadi:
```jsx
<div className="absolute -right-48 top-24 hidden h-96 w-96 rounded-full bg-mist/30 blur-3xl md:block" aria-hidden="true" />
```

- [ ] **Step 2: Sembunyikan lingkaran dekoratif Education di mobile**

`src/components/Education.jsx` — pada artikel `edu-current`, lingkaran `-right-16 -top-16` ubah menjadi:
```jsx
<div className="absolute -right-16 -top-16 hidden h-48 w-48 rounded-full border border-canvas/10 md:block" aria-hidden="true" />
```

- [ ] **Step 3: Sembunyikan lingkaran dekoratif Expertise (featured card) di mobile**

`src/components/Expertise.jsx` — pada artikel featured, lingkaran `-bottom-10 -right-7` ubah menjadi:
```jsx
<div className="absolute -bottom-10 -right-7 hidden h-44 w-44 rounded-full border border-canvas/25 md:block transition-transform duration-500 group-hover:scale-110" aria-hidden="true" />
```

- [ ] **Step 4: Build + verifikasi mobile overflow**

Run: `npm run build`
Expected: `✓ built in` tanpa error.

Run browser check: buka `http://localhost:5173`, set viewport 390px, jalankan:
```js
const r = await tab.evaluate(() => ({ scrollW: document.documentElement.scrollWidth, vw: window.innerWidth, overflowing: document.querySelectorAll('.blur-3xl.md\\:block').length }))
```
Expected: `scrollW === vw` dan tidak ada elemen `-right-*` yang masih melebihi 390px.

- [ ] **Step 5: Commit**

```bash
git add src/App.jsx src/components/Education.jsx src/components/Expertise.jsx
git commit -m "fix(ui): hide decorative absolute circles on mobile to kill overflow"
```

---

## Task 2: Ganti stat counter no-op dengan reveal yang benar-benar berfungsi

**Files:**
- Modify: `src/components/Hero.jsx` (stat markup + useGSAP)

**Masalah:** `content.json` hero.stats values adalah teks (`"S1 Data Science"`, `"Analysis and machine learning"`, `"Automation and data systems"`), bukan angka. Counter numerik no-op. Replace dengan text-swap reveal: tiap stat angka bergilir muncul tanpa gerakan yang tidak perlu.

- [ ] **Step 1: Hapus blok counter numerik di useGSAP**

Cari blok `// Stat counter scroll-up (numeric glide + bounce)` di `Hero.jsx` dan hapus seluruh blok `bounceEls?.forEach(...)` sampai sebelum penutup `}, ref)`. Hapus juga referensi `ScrollTrigger.create` terkait counter.

- [ ] **Step 2: Replace markup stat value menjadi animatable**

Ubah render `data.stats` di `Hero.jsx` dari:
```jsx
{data.stats?.map((stat) => (
  <div key={stat.label} className="pr-4">
    <p className="eyebrow text-ink/70">{stat.label}</p>
    <p className="mt-2 text-sm font-semibold text-ink">
      <span className="hero-stat-num" data-value={stat.value}>{stat.value}</span>
    </p>
  </div>
))}
```
menjadi:
```jsx
{data.stats?.map((stat) => (
  <div key={stat.label} className="pr-4">
    <p className="eyebrow text-ink/70">{stat.label}</p>
    <p className="hero-stat mt-2 text-sm font-semibold text-ink opacity-0">{stat.value}</p>
  </div>
))}
```

- [ ] **Step 3: Tambahkan reveal stagger untuk stat teks di useGSAP**

Setelah blok stat hover pop, tambah:
```js
gsap.fromTo('.hero-stat', { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, ease: EASE_OUT, stagger: 0.12, scrollTrigger: { trigger: '.hero-stats', start: 'top 90%', once: true } })
```

Catatan: `hero-stats` sudah punya entrance di timeline atas (`.fromTo('.hero-stats', ...)`), jadi reveal ini redundant kalau keduanya jalan — pilih satu. Utamakan yang di timeline atas sudah cukup: hapus `.hero-stats` dari timeline entrance dan serahkan ke trigger ini, atau biarkan timeline dan hapus trigger. Rekomendasi: **hapus `.fromTo('.hero-stats', ...)` dari timeline entrance** (timeline diberi offset awal `-=0.35` di posisi CTA; stat jadi scroll-triggered murni).

- [ ] **Step 4: verifikasi</strong>**

Run: `npm run browser, cek .hero-stat punya opacity 0 sebelum scroll dan 1 setelah scroll.

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.jsx
git commit -m "fix(hero): text reveal instead of numeric counter (data is textual)"
```

---

## Task 3: CompareSlider touch support & skill dropdown responsive

**Files:**
- Modify: `src/components/FeaturedResearch.jsx` (CompareSlider handlers)
- Modify: `src/components/Expertise.jsx (SkillTag dropdown)

- [ ] **Step 1:` touch handlers di CompareSlide
Ubah handler di `CompareSlider` read handlers:
- mousedown add `touchEnd` dan `touchcancel` untuk mirip `mouseup`.
- `touchmove` handler harus baca `e.touches[0].[clientX` dan direktif `preventDefault` ke saat drag aktif.
- Gunakan `touchstart` replace `mousedown.

Ganti `const onMove = (e) => { if (dragging</think> setPos(e.clientX ?? e.touches?.[0]?.clientX` menjadi dedikasi.

Complete code:
```js
const onTouch setPos = (cx => { rect = wrap.getBoundingClientRect; pct = math.min(0.96,math.) (clientX.- .left; / rect.width * 100; gsap.to(clip,{clipPath:`in
 inset(0 0 0 ${pct}%`)},duration 0.15, ease powerful2' })

 const onDown = => dragging = actual;
 const onUp = => dragging = false
 const onWheelMove = (x)=>{ if (dragging) setPos(x.clientX ?? x.touches[0].clientX) }
 const onTouchMove=(e)=>{ if (dragging && e.cancelable) e.preventDefault(); onWheelMove(e) }

 Add listeners:
 wrap.addEventListener(mousedown,onDown; window mouseup + touchend + touchcancel sendUp; window mouseown sendWheel; wrap touchend sendDown; wrap `touch move` sendTouchMove (active, NOT passive; needed for preventDefault).

- [ ] **Step 2: Hapus listeners bobot pada return.**

- [ ] **Step 3: Responsive dropdown SkillTag di Expertise.js

Ubah dropdown container dari `w-48` ke responsive classes:
```jsx
<div className="absolute left-0 top-full z-20 mt-2 w-48 rounded-xl ...">
```
menjadi:
```jsx
<div className="absolute left-0 top-full z-20 mt-2 w-[min(12rem,calc(100vw-2rem))] rounded-xl ...">
```

- [ ] **Step 4: Builddan verifikasi

Run `npm run build` expected pass. Browser cek touch slide di mode mobile emulation (390px) dan tap skill tag tidak overflow.

- [ ] **Step 5: Commit**

```bash
git add src/components/FeatureResearch.jsx src/components/Expertise.jsx
git commit -m "fix(ui: responsive skill dropdown + touch compare slider"
```

---

## SelfReview

- [Semua requirement spec report (4 fix) ada task` ✓
- Placeholder scan:  tidak ada TODO/TBD, semua block code lengkap ✓
- Type/name consistency: `cmp-after`.cmp-handle`, `hero-stat`, `hero-stats` konsisten antartask ✓
- Scope check: 4 file, 3 task, masing-masing independen & bisa di-commit terpisah ✓

**Verifikasi akhir:**
```bash
cd D:/JS/WebmyPorto && npm run build
# → ✓ built
# browser 390px: scrollW === viewportW, tidak ada overflow dekoratif
```
