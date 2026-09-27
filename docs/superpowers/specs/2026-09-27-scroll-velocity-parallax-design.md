# Koreografi Scroll Velocity, Overlap, dan Parallax

- **Tanggal:** 2026-09-27
- **Status:** Implementasi selesai; verifikasi lokal selesai
- **Cakupan:** Beranda, katalog proyek, dan halaman studi kasus
- **Stack motion:** GSAP + ScrollTrigger yang sudah terpasang

## 1. Design Read dan dials

Membaca ini sebagai portfolio data science personal untuk recruiter dan hiring manager, dengan bahasa editorial-tech yang sudah ada: palet coral, tema light/dark, dan hierarki konten yang lapang.

- **ENERGY 2:** karakter gerak cukup tegas tanpa mengubah situs menjadi demo efek.
- **RHYTHM 3:** urutan gerak dibedakan menurut bentuk konten setiap halaman.
- **MOTION 3:** velocity, parallax, dan overlap dipakai untuk mengarahkan perhatian saat scroll, bukan untuk menahan pengunjung.

## 2. Tujuan dan batasan

Tujuan: memperkaya animasi scroll di seluruh situs dengan respons velocity dan kedalaman yang terarah, sambil mempertahankan isi, urutan baca, tema, dan navigasi yang sudah ada.

Batasan:
- Pertahankan Lenis smooth-scroll yang sudah aktif di desktop. Tidak ada scroll hijack tambahan atau section pin; mobile dan reduced-motion tetap memakai native scroll seperti sekarang.
- Tidak menambahkan dependency, teks, aset, atau section baru.
- Tidak mengubah isi halaman, palet, tema, maupun tujuan tautan.
- Teks, angka metrik, tabel, dan kontrol tidak mendapat parallax.
- Motion lama yang bertabrakan dengan timeline baru diganti, tidak ditumpuk.
- Seluruh movement baru dinonaktifkan pada viewport mobile dan saat reduced motion aktif.

## 3. Koreografi per halaman

| Permukaan | Koreografi | Alasan |
|---|---|---|
| Beranda | Foto hero dan kartu coral yang sudah ada bergerak pada kedalaman berbeda dan merespons velocity secara singkat. Panel Featured Research bertumpuk hingga maksimal 24px ke ruang pembuka Projects pada desktop; judul Projects tetap bebas dari tumpang tindih. | Foto dan kartu sudah menjadi titik fokus; gerak mengarahkan mata dari profil ke riset, lalu ke karya. |
| `/projects` | Heading mempertahankan reveal yang sudah ada; kartu repositori nyata masuk bertahap menurut grid setelah data GitHub selesai dimuat pada desktop. Skeleton tetap statis; kartu tidak bergerak pada mobile atau reduced motion. | Urutan visual membantu pemindaian tanpa mengganggu data yang sedang berubah. |
| `/work/*` | Shell studi kasus mempertahankan judul, metrik, dan narasi. Media atau visualisasi data yang tersedia bergerak dengan parallax kecil; blok narasi tidak ikut bergerak. Semua URL memakai `WorkShell` dan `WorkBody` yang sama. | Visualisasi menjadi lapisan kedalaman, sementara klaim dan hasil tetap mudah dibaca. |

Setiap permukaan memakai timing yang berbeda sesuai struktur aktualnya. Katalog tidak diberi overlap antarkartu karena posisi grid berasal dari data GitHub yang dinamis.

## 4. Model implementasi

- Pertahankan `useGSAP` dan `ScrollTrigger` yang sudah dipakai komponen. Reuse bridge Lenis ke ScrollTrigger dan ticker GSAP yang sudah ada di `src/main.jsx`; jangan menambah global listener atau controller baru.
- Tambahkan motion lokal di `Hero.jsx`, `FeaturedResearch.jsx`, `ProjectCatalog.jsx`, `WorkShell.jsx`, dan `WorkBody.jsx`. `Projects.jsx` hanya mengatur spacing dan stacking seam overlap; tidak memiliki controller gerak.
- Velocity hanya menggerakkan foto hero (maks. ±16px) dan wrapper Featured Research (0–24px), lalu kembali ke nilai dasar setelah scroll berhenti. Parallax media studi kasus memakai scrub `yPercent` ±2%; tidak ada transform kumulatif.
- Semua gerak scroll memakai transform/opacity. Untuk overlap 0–24px yang benar-benar melewati batas section pada desktop, pindahkan 128px padding bawah yang sudah ada dari Featured Research ke padding atas Projects; posisi konten Projects tetap sama. Mobile mempertahankan spacing sekarang.
- Untuk katalog, pasang koreografi saat data selesai dimuat sehingga trigger tidak melewatkan kartu yang dirender sesudah mount. Kartu hanya dianimasikan pada desktop dengan `prefers-reduced-motion: no-preference`.
- Gunakan cleanup `useGSAP` agar transform, trigger, dan callback dibersihkan saat komponen atau route dilepas.

## 5. Mobile dan reduced motion

- Di viewport di bawah 768px, nonaktifkan velocity, parallax, overlap dinamis, dan stagger kartu katalog. Konten tetap pada alur vertikal biasa dan kartu data tampil langsung.
- Saat `prefers-reduced-motion: reduce`, jangan buat trigger atau tween gerak baru; semua konten langsung berada pada keadaan akhir yang terlihat. Kartu katalog tampil tanpa stagger.
- Desktop mempertahankan Lenis yang sudah ada. Scroll native di mobile/reduced-motion, navigasi anchor, keyboard, dan touch tetap berfungsi.
- Kedua tema tetap memakai warna dan kontras yang sudah ada; animasi tidak mengganti warna atau state tema.

## 6. Alternatif yang dipertimbangkan

1. **Kinetik terukur:** velocity dan parallax terbatas pada layer visual yang dipilih, dengan transisi overlap terpilih. Dipilih karena memenuhi permintaan tanpa menambah controller scroll atau mengganggu Lenis yang sudah ada.
2. **Koreografi per halaman:** timing dan sasaran berbeda untuk beranda, katalog, dan studi kasus. Dipilih oleh pengguna; implementasi menggunakan komponen halaman yang sudah ada, bukan duplikasi per URL studi kasus.
3. **Respons global:** seluruh isi bergerak mengikuti velocity. Ditolak karena membuat teks ikut bergeser dan menyamakan karakter seluruh section.
4. **Section pin:** menahan viewport untuk adegan sinematik. Ditolak atas pilihan pengguna karena memperpanjang scroll dan berisiko pada layar kecil.

## 7. Verifikasi dan kriteria penerimaan

- Build produksi berhasil.
- Jalankan aplikasi dan periksa `/`, `/projects`, serta route `/work/*` pada desktop dan viewport mobile.
- Uji scroll lambat, scroll cepat, berhenti, arah naik/turun, dan navigasi anchor. Tidak ada konten yang tertinggal pada posisi transform atau menutupi teks/kontrol.
- Periksa `prefers-reduced-motion`: konten terlihat tanpa velocity, parallax, overlap dinamis, atau stagger katalog.
- Periksa katalog saat loading dan setelah repositori tampil; skeleton tetap diam, kartu data masuk sesuai grid hanya pada desktop.
- Periksa keyboard dan touch scroll, tema light/dark, horizontal overflow, serta console browser.

## 8. Hasil verifikasi lokal

- `npm ci`: selesai; `node --test src/lib/motion.test.js`: lulus 1/1, termasuk velocity bertanda dan nilai di luar batas; `npm run build`: lulus. Vite mencatat warning `INEFFECTIVE_DYNAMIC_IMPORT` pada `Footer.jsx`.
- Desktop 1280px: input wheel menggerakkan layer hero, lalu kembali ke y=0 setelah berhenti. Featured Research memberi y=14.24 saat scroll turun, y=7.10 saat scroll naik, lalu kembali ke baseline 12px; seam dan judul Projects tidak bertumpuk.
- `/projects`: GitHub memuat 7 kartu. Saat throttle `slow3g`, 6 skeleton tetap `transform: none`; pada desktop GSAP menerapkan state akhir kartu opacity 1 / y=0.
- `/work/credit-gap-forecaster`: fan chart bergeser -4.24px, judul tetap; `/work/autonomous-surface-vessel`: gambar bergeser -6.05px, caption tetap; `/work/tabular-synthesis-llm`: chart bergeser -2.44px, tabel 4 baris dan judul tetap.
- Pada viewport 390×844, `/`, `/projects`, ASV, dan Tabular tidak overflow horizontal; transform baru pada hero, overlap, kartu, gambar, dan chart bernilai none. Katalog tetap menampilkan 7 kartu.
- Dengan `prefers-reduced-motion: reduce`, hero dan overlap statis, statistik hero terlihat, kartu katalog opacity 1 tanpa transform, dan gambar studi kasus statis.
- Toggle tema light/dark berubah dan dapat dipulihkan; anchor `#projects` serta tombol PageDown memindahkan halaman. Buffer `pageerror/requestfailed` kosong pada tiga route studi kasus yang diperiksa.
- Dev console menampilkan warning `ScrollRestoration` deprecated dan `validateDOMNesting` untuk `<html>` di dalam `<div>`; tidak ada uncaught page error pada route yang diperiksa.