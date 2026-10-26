# Brand Mode E-PPAT untuk IDDS

Tema brand E-PPAT untuk **INA Digital Design System** (IDDS, https://design.inadigital.go.id).
Komponen, tipografi (Inter), spacing, warna netral, dan warna status tetap milik IDDS.
Yang diganti hanya token brand: `--ina-primary-*`, `--ina-secondary-*`, `--ina-brand-*`,
ditambah token khusus E-PPAT (`--ina-eppat-*`) untuk sidebar dan kartu kantor.

Pratinjau: `prototipe/Brand-Mode-EPPAT-IDDS.html` (memuat CSS resmi `@idds/styles@1.6.38` dari unpkg,
dengan sakelar E-PPAT / Default IDDS / INAgov dan Terang / Gelap).

## Berkas

| Berkas | Isi |
|---|---|
| `eppat.css` | Blok `[data-brand='eppat']` + penyesuaian mode gelap. Format sama dengan brand bawaan IDDS (inagov, panrb, bgn). |
| `eppat-theme.ts` | Objek untuk `setCustomTheme()` dari `@idds/react` (API resmi IDDS untuk brand di luar daftar bawaan). |
| `tailwind/eppat.css` | Token Tailwind v4 (`@theme`), format sama dengan `@idds/styles/tailwind/css/inagov.css`. |
| `tailwind/eppat.js` | Token Tailwind v3, format sama dengan `@idds/styles/tailwind/ts/inagov.js`. |

## Cara memakai

**CSS (disarankan, mendukung mode gelap)**
```js
import '@idds/react/index.css';            // atau @idds/vue/index.css / @idds/styles
import './brand-eppat-idds/eppat.css';     // setelah CSS IDDS
document.documentElement.setAttribute('data-brand', 'eppat');
```
Catatan: `setBrandTheme('eppat')` tidak bisa dipakai karena `setBrandTheme` hanya menerima
nama bawaan (`inagov`, `inaku`, `bgn`, `bkn`, `lan`, `panrb`, `default`). Jangan panggil
`setBrandTheme()` setelah atribut dipasang, karena fungsi itu akan menimpa `data-brand`.

**React tanpa berkas CSS tambahan**
```js
import { setCustomTheme } from '@idds/react';
import { eppatTheme } from './brand-eppat-idds/eppat-theme';
setCustomTheme(eppatTheme);   // mengisi --ina-* di <html>; tidak membawa penyesuaian mode gelap
```

**Tailwind v4**
```css
@import 'tailwindcss';
@import '@idds/styles/tailwind/css/idds.css';
@import './brand-eppat-idds/tailwind/eppat.css';
```

## Token

| Token | Nilai | Asal / kegunaan |
|---|---|---|
| `--ina-primary-primary` / `-500` | `#3D6B5E` | `--eppat-brand-rgb` di tema live. Tombol utama, tab aktif, fokus. Teks putih 6,06:1 (AA). |
| `--ina-primary-600` / `--ina-brand-hover` | `#345D52` | `--eppat-brand-hover-rgb`. Hover. 7,41:1. |
| `--ina-primary-400` | `#4E7C6F` | Warna utama mode gelap. Teks putih 4,73:1 (AA). |
| `--ina-primary-25` / `-50` / `-100` | `#F5F8F7` / `#EEF3F1` / `#DDE5E2` | `paper-vanilla`, `paper-cream`, `line-sand-dark` di live. |
| `--ina-secondary-300` | `#DAC999` | Warna kartu kantor di Profil Kantor. |
| `--ina-eppat-sidebar-bg` / `-hover` | `#2C3C42` / `#3A4D54` | `--eppat-sidebar-bg` / `-hover` di live. Teks putih 11,46:1. |
| `--ina-eppat-sidebar-active` | `var(--ina-primary-500)` | `--eppat-sidebar-active` di live. |
| `--ina-eppat-office-card` | `var(--ina-secondary-300)` | Kartu identitas kantor di sidebar. |
| `--ina-eppat-stroke-brand` | `#D2DDD9` | `--eppat-line-sand-rgb` di live. |

Warna status **tidak** dioverride (aturan IDDS): info `#0968F6`, positif `#288034`,
peringatan `#EEBB04`, negatif `#F02D2D` — dipakai Alert, Badge, dan Toast.

**Aksen komponen brand** (bagian bawah `eppat.css`): elemen penunjuk yang di IDDS memakai biru
"guide" atau hitam diganti hijau brand — Button `link`, langkah aktif/selesai Stepper,
Checkbox tercentang, halaman aktif Pagination, dan Breadcrumb aktif.

**Kerangka aplikasi**: struktur mengikuti pola Sidebar & Header IDDS, warnanya dari token brand —
sidebar `--ina-eppat-sidebar-bg` dengan menu aktif `--ina-eppat-sidebar-active`, kartu kantor
(Card IDDS) `--ina-eppat-office-card`, latar & watermark mengikuti aset tema live.

## Catatan untuk tim

- Aplikasi live sudah memuat CSS IDDS lengkap, tetapi `--ina-primary-*` masih abu-abu bawaan
  (tidak ada `data-brand`). Memasang brand ini membuat komponen IDDS yang sudah dipakai
  (`ina-button`, `ina-text-field`) otomatis berwarna hijau E-PPAT.
- Warna lencana status di live saat ini diatur lewat CMS › Setting Theme (warna status).
  Dengan IDDS, warna status sebaiknya mengikuti token sentimen IDDS. Keputusan ini perlu
  disepakati sebelum diterapkan.
- Di mode gelap, teks deskripsi Alert IDDS 1.6.38 tampak pudar. Perilaku ini berasal dari
  CSS IDDS (terjadi di semua brand), bukan dari tema E-PPAT.

Sumber nilai: tema aktif dev-app.eppat.id/t/default (dibaca 23 Okt 2026) dan paket resmi
`@idds/styles@1.6.38`, `@idds/react@1.6.66`.
