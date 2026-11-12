# DESIGN.md — E-PPAT Peruri (INA Digital Design System)

Berkas ini berisi aturan tampilan aplikasi E-PPAT seri Peruri. Taruh berkas ini di **akar repo aplikasi**. Developer dan agen AI wajib membacanya sebelum membuat atau mengubah layar.

- **Sistem desain:** INA Digital Design System (IDDS), https://design.inadigital.go.id
- **Brand:** E-PPAT (hijau `#3D6B5E`), dipasang di atas IDDS
- **Acuan layar:** prototipe backlog HE Peruri, https://he-eppat.vercel.app (repo `yogi-alt/HE-EPPAT-Backlog`, folder `prototipe/`)
- **Rincian aturan:** Panduan IDDS Developer, https://he-eppat.vercel.app/Panduan-IDDS-Developer.html
- **Backlog:** kode usulan di "Daftar perubahan" setiap prototipe (lihat bagian 0)

> Seri Perdana Niaga punya DESIGN.md sendiri (`handover-eppat-prototipe/he-pn/prototipe/DESIGN.md`). Dasarnya sama: IDDS, brand E-PPAT, bahasa, dan aksesibilitas. Perbedaannya ada di sumber alur, menu, tahap permohonan, peran, dan kode backlog.

## 0. Aturan dasar

1. **Tampilan memakai IDDS dan mengikuti saran Heuristic Evaluation (HE).** Alur dan isi formulir mengikuti aplikasi live. Formulir Permohonan AJB mengacu ke live Perdana Niaga, dan istilahnya mengikuti seri Peruri.
2. **Jangan menambah isian, langkah, atau menu yang tidak ada di live atau di usulan.** Menu baru hanya dibuat bila sudah ada di live.
3. **Pakai komponen IDDS, jangan membuat komponen sendiri.** Bila komponen yang dibutuhkan belum ada, pakai kelas CSS IDDS (`ina-*`) lalu catat di PR.
4. **Pakai token, jangan nilai warna mentah.** Komponen tidak boleh memuat kode heksadesimal.
5. **Layar yang sama memakai markup, teks, dan ikon yang sama** di semua modul. Sebelum membuat pola baru, salin pola dari prototipe yang sudah ada.
6. **Kode backlog:**
   - `HE-<FITUR>-NN`: temuan HE, misalnya `HE-ORDER-23` atau `HE-USER-16`;
   - `IDDS-TN-NN`, `IDDS-PL-NN`, `IDDS-OB-NN`: penyesuaian IDDS untuk tenant, platform, dan onboarding;
   - usulan bertanda **bukan temuan HE** berasal dari penelusuran live atau dari MoM Workshop HE 03/11/2026.

## 1. Pemasangan

Ikuti panduan resmi IDDS untuk React: https://design.inadigital.go.id/getting-started/code/react/. Satu-satunya tambahan E-PPAT adalah berkas brand (langkah 4), karena E-PPAT tidak termasuk brand bawaan IDDS.

**Prasyarat** (sesuai panduan resmi):
- React dan React DOM ≥ 18, Node.js ≥ 16;
- Tailwind CSS v4 (disarankan) dan `@tabler/icons-react` (disarankan);
- bila memakai TypeScript, pasang juga `@types/react` dan `@types/react-dom`.

**1. Pasang paket**
```bash
npm install @idds/react
npm install @tabler/icons-react tailwindcss @tailwindcss/vite
```

**2. Impor CSS IDDS di entry point**, sebelum komponen atau CSS lain:
```js
import '@idds/react/index.css'
```

**3. Pakai komponen**
```jsx
import { Button, TextField, Card } from '@idds/react'
```

**4. Pasang brand E-PPAT**
```js
import './brand-eppat-idds/eppat.css'   // SETELAH CSS IDDS
document.documentElement.setAttribute('data-brand', 'eppat')
document.documentElement.setAttribute('lang', 'id')
```
- `setBrandTheme()` hanya menerima brand bawaan IDDS (inagov, panrb, bkn, lan, default). Jangan memanggilnya, karena fungsi itu menimpa `data-brand="eppat"`.
- Berkas brand ada di repo, folder `brand-eppat-idds/`: `eppat.css`, `eppat-theme.ts`, `tailwind/eppat.css` (Tailwind v4), `tailwind/eppat.js` (Tailwind v3), dan `README.md`.

**5. Mode gelap:** pakai `setThemeMode('dark')` dari `@idds/react`. Fungsi ini memasang `data-theme` pada `<html>`, dan brand E-PPAT ikut menyesuaikan.

**6. Tailwind v4:** impor token di CSS utama, dengan brand E-PPAT menggantikan brand bawaan:
```css
@import 'tailwindcss';
@import '@idds/styles/tailwind/css/idds.css';
@import './brand-eppat-idds/tailwind/eppat.css';
```
Pakai kelas token (`text-content-primary`, `bg-primary-50`), jangan kode heksadesimal.

**Catatan lain**
- **Versi dikunci.** Prototipe memakai `@idds/styles@1.6.38`. Naikkan versi hanya lewat PR tersendiri, lalu periksa ulang semua layar.
- **Prototipe backlog** berupa HTML statis tanpa React, jadi CSS `@idds/styles` dan `eppat.css` dimuat langsung. Tampilannya sama dengan hasil langkah di atas.
- **Ikon:** Tabler bergaya garis, 16 px di menu, warnanya mengikuti teks (`currentColor`).
- **Huruf:** Inter 400, 500, 600, dan 700. H1 prototipe: Inter 500, 28/36 px.

## 2. Token warna

E-PPAT hanya mengganti token **brand**. Warna netral, warna status, tipografi, jarak, dan komponen tetap milik IDDS.

| Token | Terang | Gelap | Dipakai untuk |
|---|---|---|---|
| `--ina-primary-500` | `#3D6B5E` | — | tombol utama, tab aktif, fokus |
| `--ina-primary-600` | `#345D52` | — | hover, breadcrumb aktif |
| `--ina-primary-400` | `#4E7C6F` | warna utama | warna utama mode gelap |
| `--ina-eppat-sidebar-bg` | `#2C3C42` | `#141C1F` | latar sidebar |
| `--ina-eppat-sidebar-hover` | `#3A4D54` | `#22302D` | hover menu sidebar |
| `--ina-eppat-office-card` | emas | — | kartu kantor di sidebar |

- **Warna sentimen tetap milik IDDS** (info, positive, warning, negative), dipakai Alert, Badge, dan Toast. Elemen penunjuk memakai hijau brand: Button link, Stepper aktif atau selesai, Checkbox tercentang, Pagination aktif, dan Breadcrumb aktif.
- **Keputusan 12 Nov 2026: warna lencana status ikut IDDS.**
  - Badge status memakai varian Badge IDDS (neutral, info, success, warning, error), mengikuti tabel status di Panduan IDDS Developer bagian 3, sama dengan seri Perdana Niaga.
  - Isian "Warna status" di Konten Situs › Tema Tampilan tidak lagi mengatur warna lencana.
  - Status yang sama memakai varian yang sama di semua layar dan di grafik Dashboard.
- **Kontras minimal WCAG 2.2 AA:** teks biasa 4,5:1; teks besar dan batas komponen 3:1. `eppat.css` sudah menggelapkan warna bawaan IDDS yang di bawah standar.
- **Celah IDDS 1.6.38 yang diketahui:** deskripsi Alert tampak pudar di mode gelap.
- Jangan menimpa gaya IDDS dengan `!important` secara luas. Batasi penyesuaian ke `[data-brand='eppat'] .ina-…` dan pakai `var(--ina-…)`.

## 3. Kerangka halaman

Setiap halaman di dalam aplikasi tersusun dari atas ke bawah:

1. **Breadcrumb** (IDDS Breadcrumb): grup menu › nama halaman. Halaman aktif berupa `<span>`, bukan tautan.
2. **Judul (H1):** satu per halaman, Title Case, sama dengan nama menu.
3. **Subjudul:** satu kalimat SPOK yang menyebut apa yang bisa dilakukan di halaman itu, diakhiri titik.
4. **Tombol Bantuan** di kanan judul (Button secondary md), bukan di header global. Tombol ini membuka IDDS Drawer:
   - di layar ≤ 760 px, Drawer muncul dari bawah;
   - isinya: "Mulai tur halaman ini" (bila halaman punya tur), langkah singkat, pertanyaan umum, dan kontak dukungan.
5. Isi halaman.

**Sidebar**
- Lebar 240 px, tetap terlihat saat halaman digulir, dan memuat kartu kantor (IDDS Card berlatar emas).
- Nama dan urutan menu tenant:

| Grup | Menu |
|---|---|
| (tanpa judul) | Tugas Saya |
| Monitoring | Dashboard Akta |
| Layanan | Permohonan AJB |
| Akta | Renvooi, Arsip Akta, Template Akta |
| Pengaturan Kantor | Profil Kantor, Daftar Pengguna, Peran & Izin, Log Aktivitas, Aktivasi e-Meterai |
| Pengaturan Aplikasi | Dashboard Sistem, Pengaturan |
| Konten Situs | Halaman Depan, Tema Tampilan, Master Konten, Artikel & Halaman, Pustaka Media |

- Klien tidak melihat grup Monitoring. Platform dan Onboarding memakai kerangka sendiri: sidebar tanpa kartu kantor, dan header tanpa tombol "Lihat landing".

**Header**
- Tinggi 64 px, tetap di atas saat halaman digulir.
- Urutan dari kiri: tombol menu (hanya di ponsel), tombol "Lihat landing", Notifikasi, lalu menu profil.

**Daftar lebih dulu**
- Setiap menu dibuka di layar daftar. Detail dibuka dengan mengeklik baris, dan layar detail punya tombol "Kembali".

**Tour guide**
- Setiap halaman memakai tur bersama.
- Tur muncul sekali per pengguna per layar dan dapat dilewati (tombol "Lewati tur" atau Esc).
- Tur dapat diputar ulang dari Bantuan.
- Tur tidak muncul saat dialog terbuka atau saat halaman tidak tersedia bagi peran itu.

**Keadaan khusus**
- **Kosong:** tajuk kolom tetap tampil, ditambah satu baris keterangan. Bedakan "belum ada data" dan "tidak ada yang cocok".
- **Memuat:** tombol nonaktif, labelnya kata kerja berelipsis, ditambah Spinner.
- **Gagal:** Alert critical dengan tombol "Coba lagi".

**Ponsel (lebar 390 px)**
- Halaman tidak boleh bergulir menyamping. Tabel lebar digulir di dalam wadahnya sendiri.
- Stepper horizontal berganti menjadi vertikal.

## 4. Pola layar yang wajib seragam

### Layar daftar
- Input Search berlabel "Cari"; placeholder menyebut kolom yang dicari. Jumlah hasil diumumkan dengan `aria-live`.
- IDDS Table di dalam wadah berbingkai, dengan kolom aksi paling kanan.
- Di bawah tabel: "Menampilkan 1–10 dari N" dan IDDS Pagination.
- Tombol aksi baris selalu terlihat. Hapus memakai tombol tertiary berteks merah dan selalu meminta konfirmasi.
- Aksi tambahan per baris dikumpulkan di Action Dropdown yang labelnya menyebut nama item.

### Layar detail Permohonan AJB
- Stepper **6 tahap**: Pengumpulan Berkas, Verifikasi Berkas, Penyusunan Akta, Finalisasi Akta, Penandatanganan Akta, Selesai. Tiap tahap menampilkan status dan waktunya.
- Pekerjaan per tahap dibuka dari **tombol tahap** di samping tombol Pindah, bukan dari menu samping. "Kembali" selalu menuju stepper permohonan itu.
- Kotak syarat dan "Langkah berikutnya" tampil di atas tombol Pindah. Tombol Pindah nonaktif sampai syarat terpenuhi, dan alasannya ditulis di dekat tombol.
- Tab memakai IDDS Tab Horizontal berwarna brand, dengan lencana kelengkapan. Pindah tab tidak boleh membuang isian.

### Dialog dan konfirmasi
- **Modal:** formulir singkat di dalam alur, misalnya Tambah Para Pihak atau Tambah Objek.
- **Modal Confirmation:** aksi berdampak (pindah tahap, hapus, kirim, stempel, tanda tangan, e-Meterai).
  - Judulnya berupa pertanyaan; isinya menyebut nama item dan akibatnya.
  - Tombol aksi berbahaya berwarna merah dan diletakkan paling akhir.
  - Setelah dialog ditutup, fokus kembali ke tombol pemicu.
- **Drawer:** khusus untuk Bantuan.

### Peran
- Peran yang tersedia: Super Admin, PPAT, Asisten, dan Klien. Satu akun boleh merangkap beberapa peran, misalnya Super Admin + PPAT.
- Izin mengikuti peran yang sedang dipakai.
- Super Admin yang tidak merangkap PPAT tidak melihat TERA, e-Meterai, dan Registrasi CA.
- Peran tanpa akses ke suatu halaman melihat layar "Halaman tidak tersedia".

## 5. Komponen: kapan dipakai

| Kebutuhan | Komponen IDDS | Catatan |
|---|---|---|
| Aksi | Button | Satu primary per area; pendamping secondary; aksi ringan tertiary; sm di tabel, md di formulir |
| Isian teks | Text Field / Text Area | Label selalu terlihat; tanda wajib `*`; bantuan dan galat di bawah isian |
| Uang | Text Field berawalan "Rp" | `inputmode="numeric"`, pemisah ribuan otomatis, terbilang di teks bantuan |
| Kata sandi | Password Input | Tombol tampilkan/sembunyikan; syarat tampil sebagai daftar centang yang sama di semua layar |
| Pilih satu | Select Dropdown / Radio / Button Group | Radio bila opsi perlu dibaca berdampingan; Button Group untuk saringan singkat |
| Nyala/mati | Toggle | `role="switch"`; perubahan yang berdampak bagi pengguna lain meminta konfirmasi |
| Cari | Input Search | Label "Cari"; beri jeda (debounce) |
| Unggah | File Upload | Seret-lepas; sebut format dan ukuran maksimal; galat di bawah kotak |
| Kode OTP | One-Time Password | Enam kotak; Badge "Kode berlaku m:ss", kuning saat sisa < 1 menit, merah saat habis |
| Status | Badge (soft, md, rounded-full) | Status yang sama memakai varian yang sama di semua layar; selalu berisi teks |
| Keadaan halaman | Alert | info, caution, critical, success; bukan untuk hasil klik |
| Hasil aksi | Toast | Sebut nama item, bukan kode: "Narahubung tersimpan." |
| Tahapan | Stepper bernomor | Langkah selesai bercentang; langkah aktif `aria-current="step"`; sebut perkiraan waktu bila ada |
| Penjelasan istilah | Tooltip lewat ikon "?" | CA, eKYC, TERA, NJOP, renvooi; jangan untuk informasi penting |
| Aksi tambahan per baris | Action Dropdown | `role="menu"`, pemicu berlabel nama item |
| Isi panjang / tanya jawab | Accordion | Judul berupa pertanyaan pengguna |

## 6. Pola dari saran Heuristic Evaluation

- **Galat di bawah isian**, bukan di Toast. Pasang `aria-invalid` dan `aria-describedby`.
  - Periksa format saat isian ditinggalkan (focusout).
  - Saat Simpan, periksa semua isian lalu fokus ke isian pertama yang salah.
- **Galat dari server** yang tidak terkait satu isian (misalnya email atau kata sandi salah) tampil sebagai Alert critical di dalam kartu, di atas isian.
- **Cegah kesalahan:** nonaktifkan tombol bila syarat belum terpenuhi, dan tulis alasannya sebagai teks di dekat tombol (bukan hanya `title`).
- **Status sistem terlihat:** proses yang berjalan menampilkan keadaannya, misalnya memuat, menunggu instansi, atau sisa waktu OTP.
- **Perubahan belum disimpan dijaga:**
  - status simpan tampil di dekat tombol Simpan;
  - sebelum pengguna pindah halaman, muncul dialog "Tinggalkan halaman ini?".
- **Kurangi langkah berulang:** "Simpan & tambah lagi", aksi massal untuk pengguna terpilih, dan impor pengguna dari berkas.
- **Bantuan dan tur di setiap halaman** (lihat bagian 3).

## 7. Bahasa

Acuan: pedoman penulisan IDDS (https://design.inadigital.go.id/foundation/writing/), KBBI, dan EYD Edisi Kelima.

- **Kalimat SPOK, pendek, dan manusiawi.** Sapa pengguna dengan "Anda". Hindari istilah developer di layar. Catatan untuk tim tidak ditampilkan di layar aplikasi.
- **Huruf kapital** (aturan resmi IDDS):
  - judul halaman dan judul kartu memakai Title Case;
  - **label tombol, judul dialog, pesan, dan teks isi memakai sentence case**;
  - huruf besar semua hanya untuk singkatan resmi (PPAT, NIB, CA).
- **Tanda baca:**
  - kalimat pesan, subjudul, dan teks bantuan diakhiri titik;
  - label, judul kolom, dan lencana ditulis tanpa titik;
  - judul konfirmasi diakhiri tanda tanya;
  - label proses memakai elipsis: "Memverifikasi…".
- **Pola pesan galat:** "{Nama isian} wajib diisi." atau "Format {isian} tidak valid. Contoh: …"
- **Istilah baku seri Peruri:**

| Pakai | Bukan |
|---|---|
| permohonan (kode `ORD-…` tetap) | order (di layar) |
| Penyusunan Akta | Drafting |
| Finalisasi Akta | Pengesahan |
| pengguna, Daftar Pengguna | user |
| kata sandi | password |
| Log Aktivitas | Logs |
| e-Meterai | E-Materai, materai |
| minuta (dokumen hukum) | — tetap |

- **Tanggal dan uang:** di tabel "26 Okt 2026"; di kalimat "26 Oktober 2026"; waktu "09.25 WIB" (WITA/WIT sesuai Pengaturan kantor); uang "Rp750.000.000".

## 8. Aksesibilitas

- `lang="id"` pada `<html>`. Setiap isian punya `<label for>` yang terhubung. Kelompok isian tanpa label tunggal memakai `role="group"`.
- Semua aksi dapat dijalankan dengan keyboard. Esc menutup dialog, dropdown, Drawer, dan tur (yang paling atas lebih dulu), lalu fokus kembali ke pemicunya.
- Jangan menghapus garis fokus. Elemen klik buatan (baris tabel, zona unggah) wajib bisa difokus.
- Pesan yang muncul tanpa pindah halaman memakai `role="status"` atau `aria-live="polite"`. Galat yang perlu segera diketahui memakai `role="alert"`.
- Warna bukan satu-satunya tanda: setiap status juga disertai teks atau ikon.
- Tombol yang hanya berisi ikon wajib memakai `aria-label` yang menyebut aksi dan nama itemnya.

## 9. Daftar periksa sebelum PR

Salin ke deskripsi PR dan centang semuanya.

- [ ] Komponen dan kelas IDDS dipakai; tidak ada komponen buatan sendiri atau warna heksadesimal
- [ ] `data-brand="eppat"` aktif, dan warna utama hijau E-PPAT
- [ ] Breadcrumb, satu H1, subjudul SPOK, dan tombol Bantuan ada di halaman
- [ ] Tur halaman muncul sekali, bisa dilewati, dan bisa diputar ulang dari Bantuan
- [ ] Aksi berdampak memakai Modal Confirmation; alasan tombol nonaktif tertulis
- [ ] Galat tampil di bawah isian dengan `aria-invalid`
- [ ] Menu dan izin sesuai peran yang dipakai; peran tanpa akses melihat "Halaman tidak tersedia"
- [ ] Bisa dipakai dengan keyboard saja, dan fokus terlihat
- [ ] Lebar 390 px tanpa gulir menyamping
- [ ] Teks baku: sentence case untuk tombol, istilah Peruri, tanda baca benar
- [ ] Layar sudah dibandingkan dengan prototipe acuan (kode usulan dan tautan Vercel)

## 10. Rujukan

| Topik | Tautan |
|---|---|
| IDDS: memulai | https://design.inadigital.go.id/getting-started/code/react/ |
| Warna | https://design.inadigital.go.id/foundation/color/ |
| Tipografi | https://design.inadigital.go.id/foundation/typography/ |
| Penulisan | https://design.inadigital.go.id/foundation/writing/ |
| Komponen | https://design.inadigital.go.id/components/overview/ |
| Pola desain | https://design.inadigital.go.id/pattern/overview/ |
| Prototipe HE Peruri | https://he-eppat.vercel.app |
| Brand Mode E-PPAT | https://he-eppat.vercel.app/Brand-Mode-EPPAT-IDDS.html |
| Panduan IDDS Developer (rinci, dengan peta acuan prototipe) | https://he-eppat.vercel.app/Panduan-IDDS-Developer.html |
