# Motion System Kohesif - Design Spec

- **Tanggal:** 2026-08-18
- **Status:** Disetujui (brainstorm), menunggu implementasi
- **Pendekatan:** A - Sistem Motion Kohesif
- **Cakupan:** Seluruh portfolio (fokus motion/animation)
- **Author:** Agent (OMP) + user

## 1. Design Read & Dials

Membaca ini sebagai: portfolio data-scientist untuk recruiter/hiring manager, dengan bahasa
clean editorial-tech, menumpang sistem existing (Tailwind + token custom: coral accent,
light/dark) dengan GSAP. Tidak ada perombakan struktur visual; hanya kohesi & kualitas motion.

- `DESIGN_VARIANCE: 6` (asimetris ringan, tetap rapi)
- `MOTION_INTENSITY: 7` (hidup & terkoordinasi)
- `VISUAL_DENSITY: 3` (lapang, anti-ramai)

## 2. Goals

- Satukan bahasa motion yang sudah ada (hero typing, role morph, stat counter, skill tags,
  compare slider, cert hover stack, TextReveal, MagneticButton, dll) ke satu sistem token.
- Naikkan kesan "terkoordinasi" tanpa menambah elemen visual baru (tetap anti-ramai).
- Pastikan kebijakan reduced-motion & mobile konsisten di semua efek (satu gate, bukan
  pengecekan tersebar).
- Tambah 1-2 signature beat yang subtle dan konsisten.

## 3. Non-Goals

- Tidak mengubah layout/struktur section, copy, atau palet warna.
- Tidak menambah komponen UI dekoratif baru (kecuali penyelarasan drawer Expertise yang sudah ada).
- Tidak melakukan scroll-hijack dramatis (pin/parallax berat) di luar yang sudah ada.

## 4. Motion Token Specification

Satu sumber kebenaran di `src/lib/motion.js`. Semua komponen impor dari sini, tidak lagi
hardcode angka/ease.

```
export const EASE = {
  entrance: "power3.out",
  soft: "expo.out",
}

export const DUR = {
  enter: 0.6,
  micro: 0.25,
  drawer: 0.3,
  counter: 1.2,
}

export const STAGGER = {
  card: 0.07,
  chip: 0.05,
}

export const EASE_OUT = EASE.entrance   // kompatibilitas: gsap.js re-export ini

export function prefersReducedMotion() { ... }   // satu implementasi, konsolidasi dari useReducedMotionSafe() yang ada
export function reveal(target, opts = {}) { ... } // ScrollTrigger entrance: y + opacity, respek reduced-motion
```

Kontrak `reveal(target, opts)`:
- Default `y: 24`, `opacity: 0 -> 1`, `duration: DUR.enter`, `ease: EASE.entrance`.
- `opts.stagger` untuk list (pakai `STAGGER.card`/`STAGGER.chip`).
- Jika `prefersReducedMotion()` true: set final state tanpa transform (opacity-only / instant),
  tanpa ScrollTrigger jank.
- `once: true`, `start: "top 85%"`.

## 5. Reduced-Motion & Mobile Policy

- Satu gate `prefersReducedMotion()` dipakai di SELURUH efek. Tidak ada efek yang lupa mengecek.
- Konsolidasi: `useReducedMotionSafe()` yang saat ini ada di `Education.jsx` dipindahkan ke
  `motion.js`; `Education.jsx` mengimpor dari sana (tidak ada dua implementasi).
- Mobile (<768px): stagger dikurangi separuh, efek pin/scrub berat (jika ada) dinonaktifkan,
  drawer tetap pakai tap.
- CSS `@media (prefers-reduced-motion: reduce)` di `index.css` sudah ada; token JS melengkapinya
  untuk efek GSAP yang tidak bisa di-handle CSS murni.

## 6. Refactor Map

| File | State sekarang | Perubahan |
|---|---|---|
| `src/lib/gsap.js` | ekspor `useGSAP, EASE_OUT, gsap` | re-export `EASE_OUT` dari `motion.js` agar import existing tidak break; delegasikan ke tokens |
| `src/components/Hero.jsx` | typing, role morph, stat counter (ease/dur beda) | align ke `EASE`/`DUR` |
| `src/components/Expertise.jsx` | pill + drawer (sudah dibuat) | animasi drawer pakai `DUR.drawer` + `EASE.soft`; pill click pakai `DUR.micro` |
| `src/components/FeaturedResearch.jsx` | compare slider, pipeline timeline, line chart | align easing/dur; chart morph trigger pindah ke scroll-into-view (lihat Beat 2) |
| `src/components/Education.jsx` | cert hover stack (`.edu-cert`) | align durasi hover ke `DUR.micro`; pindahkan `useReducedMotionSafe` ke `motion.js` |
| `src/components/Projects.jsx` | staggered portfolio motion | pakai `reveal()` + `STAGGER.card` |
| `src/components/Navbar.jsx` | nav reveal | pakai `reveal()` / `EASE` |
| `src/components/Footer.jsx` | footer reveal | pakai `reveal()` / `EASE` |
| `src/components/About.jsx`, `Experience.jsx` | section reveal | pakai `reveal()` |
| `src/components/ScrollProgress.jsx`, `ScrollToTop.jsx` | global scroll UX | pastikan konsisten easing, respek reduced-motion |
| `src/components/ui/TextReveal.jsx` | reveal teks | align easing ke `EASE.entrance` |
| `src/components/ui/MagneticButton.jsx` | magnetic hover | align durasi/spring ke konvensi; tetap pakai motion value (bukan useState) |
| `src/components/ui/GlowButton.jsx` | glow/cta | align micro duration |
| `src/components/ui/TiltCard.jsx` | tilt 3D | align duration; pastikan reduced-motion mematikan tilt |

Catatan: `ResearchChart.jsx` ada di tree tapi tidak digunakan untuk port chart (sudah diganti
`RevenueLineChart`); tidak disentuh oleh spec ini kecuali terbukti masih diimpor.

## 7. Signature Beats

**Beat 1 - Unified section-enter.**
Semua section utama (Hero, About, Expertise, FeaturedResearch, Education, Projects, Footer)
menggunakan satu primitif `reveal()`. ScrollTrigger per-component yang tersebar digabung ke
cadence sama. Ini kohesi, bukan elemen baru.

**Beat 2 - Chart hold-and-release.**
`RevenueLineChart` di `FeaturedResearch.jsx` memulai morph/dither saat section masuk viewport
(bukan langsung saat mount). Memberi momen "hidup" tepat saat dilihat. Logika morph sudah ada;
hanya pindahkan trigger dari mount ke ScrollTrigger `start: "top 80%"`.

## 8. Architecture & Files

Baru:
- `src/lib/motion.js` - tokens (`EASE`, `DUR`, `STAGGER`), `prefersReducedMotion()`, `reveal()`.

Edit:
- `src/lib/gsap.js` - re-export `EASE_OUT` (delegasi ke `motion.js`) agar tidak break.
- 12+ komponen di §6 - ganti hardcode easing/duration menjadi import token; ganti
  ScrollTrigger tersebar menjadi `reveal()`.

Tidak ada komponen UI baru. Drawer Expertise sudah ada dan hanya diselaraskan.

## 9. Verification Plan

- `node node_modules/vite/bin/vite.js build --outDir .tmp-build --config vite.local.config.js`
  harus sukses (kompilasi bersih, tidak ada undefined import).
- Dev server (`vite.local.config.js`, port 5173) cek:
  - Desktop: scroll dari Hero ke Footer, semua section reveal konsisten, Beat 2 chart morph
    saat FeaturedResearch masuk viewport.
  - Mobile (viewport <768px, devtools): layout tetap satu kolom, drawer tap berfungsi,
    tidak ada efek berat yang jank.
  - Reduced-motion: simulasikan `prefers-reduced-motion: reduce` (DevTools rendering tab),
    pastikan semua reveal jadi instant/opacity-only, chart langsung full, tidak ada loop.
- Pastikan tidak ada duplikat implementasi reduced-motion (grep `prefersReducedMotion` hanya
  di `motion.js` + import).

## 10. Anti-Tell Compliance

- Tidak ada em-dash di string maupun kode komentar.
- Tidak ada eyebrow penomoran section (`001 / Capabilities` dll).
- Tidak ada scroll-cue (`Scroll`, `↓ scroll`).
- Tidak ada decorative status dot.
- Satu aksen (coral) tetap konsisten; tidak ada gradient ungu AI.
- Tidak ada div-based fake screenshot.

## 11. Risks & Flags

- **`useReducedMotionSafe` asal:** harus diverifikasi implementasinya sebelum dikonsolidasi,
  agar gate baru setara/lebih baik.
- **ScrollTrigger tersebar:** beberapa komponen mungkin punya `ScrollTrigger` dengan `start`
  berbeda; penyatuan ke `reveal()` harus menjaga posisi trigger agar tidak mengubah feel.
- **MagneticButton:** tetap di luar React render cycle (motion value), jangan kembalikan ke
  `useState`.
- **RevenueLineChart mount vs scroll:** pastikan cleanup RAF saat komponen unmount tetap aman
  saat trigger dipindah ke scroll.

## 12. Out of Scope

- Perubahan konten `content.json` (tools, projects, research) di luar alignment motion.
- Penambahan section baru.
- Perubahan sistem warna/tema (light/dark sudah lock).
