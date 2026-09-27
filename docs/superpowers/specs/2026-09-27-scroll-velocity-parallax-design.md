# Koreografi Scroll Velocity, Overlap, dan Parallax

- **Tanggal:** 2026-09-27
- **Status:** Disetujui pengguna; implementasi belum dimulai
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

## 3. Koreografi per halaman

| Permukaan | Koreografi | Alasan |
|---|---|---|
| Beranda | Foto hero dan kartu coral yang sudah ada bergerak pada kedalaman berbeda dan merespons velocity secara singkat. Panel Featured Research bertumpuk hingga maksimal 24px ke ruang pembuka Projects pada desktop; judul Projects tetap bebas dari tumpang tindih. | Foto dan kartu sudah menjadi titik fokus; gerak mengarahkan mata dari profil ke riset, lalu ke karya. |
| `/projects` | Heading masuk lebih dulu, kartu repositori masuk bertahap menurut grid setelah data GitHub selesai dimuat. Skeleton tetap statis. | Urutan visual membantu pemindaian tanpa mengganggu data yang sedang berubah. |
| `/work/*` | Shell studi kasus mempertahankan judul, metrik, dan narasi. Media atau visualisasi data yang tersedia bergerak dengan parallax kecil; blok narasi tidak ikut bergerak. Semua URL memakai `WorkShell` dan `WorkBody` yang sama. | Visualisasi menjadi lapisan kedalaman, sementara klaim dan hasil tetap mudah dibaca. |

Setiap permukaan memakai timing yang berbeda sesuai struktur aktualnya. Katalog tidak diberi overlap antarkartu karena posisi grid berasal dari data GitHub yang dinamis.

## 4. Model implementasi

- Pertahankan `useGSAP` dan `ScrollTrigger` yang sudah dipakai komponen. Reuse bridge Lenis ke ScrollTrigger dan ticker GSAP yang sudah ada di `src/main.jsx`; jangan menambah global listener atau controller baru.
- Buat timeline lokal di `Hero.jsx`, `FeaturedResearch.jsx`, `Projects.jsx`, `ProjectCatalog.jsx`, `WorkShell.jsx`, dan `WorkBody.jsx`; jangan menambah pengelola scroll global.
- Baca velocity dari update ScrollTrigger yang sudah aktif pada elemen sasaran. Batasi kontribusinya ke transform kecil (maksimal 24px), lalu redakan ke posisi dasar saat scroll melambat atau berhenti. Tidak ada transform kumulatif.
- Gunakan transform/opacity, bukan perubahan ukuran atau posisi layout. Overlap desktop hanya berlaku di transisi riset ke proyek pada beranda.
- Untuk katalog, pasang koreografi saat data selesai dimuat sehingga trigger tidak melewatkan kartu yang dirender sesudah mount.
- Gunakan cleanup `useGSAP` agar transform, trigger, dan callback dibersihkan saat komponen atau route dilepas.

## 5. Mobile dan reduced motion

- Di viewport di bawah 768px, nonaktifkan velocity, parallax, dan overlap dinamis. Konten kembali ke alur vertikal biasa tanpa clipping atau perubahan urutan.
- Saat `prefers-reduced-motion: reduce`, jangan buat trigger gerak baru; semua konten langsung berada pada keadaan akhir yang terlihat. Tampilkan layout tanpa overlap dinamis.
- Desktop mempertahankan Lenis yang sudah ada. Scroll native di mobile/reduced-motion, navigasi anchor, keyboard, dan touch tetap berfungsi.
- Kedua tema tetap memakai warna dan kontras yang sudah ada; animasi tidak mengganti warna atau state tema.

## 6. Alternatif yang dipertimbangkan

1. **Kinetik terukur:** velocity dan parallax terbatas pada layer visual yang dipilih, dengan transisi overlap terpilih. Dipilih karena memenuhi permintaan tanpa menambah controller scroll atau mengganggu Lenis yang sudah ada.
2. **Koreografi per halaman:** timing dan sasaran berbeda untuk beranda, katalog, dan studi kasus. Dipilih oleh pengguna; implementasi menggunakan komponen halaman yang sudah ada, bukan duplikasi per URL studi kasus.
3. **Respons global:** seluruh isi bergerak mengikuti velocity. Ditolak karena membuat teks ikut bergeser dan menyamakan karakter seluruh section.
4. **Section pin:** menahan viewport untuk adegan sinematik. Ditolak atas pilihan pengguna karena memperpanjang scroll dan berisiko pada layar kecil.

## 7. Verifikasi dan kriteria penerimaan

- Build produksi berhasil.
- Jalankan aplikasi dan periksa `/`, `/projects`, serta satu route `/work/*` pada desktop dan viewport mobile.
- Uji scroll lambat, scroll cepat, berhenti, arah naik/turun, dan navigasi anchor. Tidak ada konten yang tertinggal pada posisi transform atau menutupi teks/kontrol.
- Periksa `prefers-reduced-motion`: konten terlihat tanpa velocity, parallax, atau overlap dinamis.
- Periksa katalog saat loading dan setelah repositori tampil; skeleton tetap diam dan kartu hasil data masuk sesuai grid.
- Periksa keyboard dan touch scroll, tema light/dark, horizontal overflow, serta console browser.

Spec disetujui pengguna; perubahan source belum dimulai.