// Tambah usulan Platform Onboarding: Registrasi HE-REG-01…04 dan Login HE-LOGIN-01…04; koreksi catatan syarat password. node tambah-onboarding.js
const fs = require('fs');
const j = JSON.parse(fs.readFileSync('backlog-he.json', 'utf8'));
const T = '2026-10-26', ACU = k => `prototipe/Backlog-HE-ONBOARDING-Prototype.html › Daftar perubahan › ${k}`;
const it = (kode, fitur, halaman, judul, saat_ini, usulan, prinsip, prioritas, layar, selesai_bila, catatan = '') =>
  ({ kode, fitur, judul, saat_ini, usulan, prinsip, halaman, prioritas, layar, acuan:ACU(kode), selesai_bila, status:'Prototipe siap', catatan, tanggal:T });
const REG = 'Registrasi (Onboarding)', HR = 'UX Metric Lab, Highlight #11 (skor 91,7; PDF hal. 15)';
const LOG = 'Login (Onboarding)', HL = 'UX Metric Lab, Highlight #7 (skor 68,6; PDF hal. 15)';
const baru = [
  it('HE-REG-01', REG, HR, 'Tombol Batal dan konfirmasi sebelum meninggalkan pendaftaran',
    'Tidak ada tombol batal atau kembali selama pendaftaran; pengguna hanya bisa memakai tombol kembali di browser dan data yang sudah diisi hilang tanpa peringatan.',
    'Tombol "Batal" di samping "Daftar Sekarang". Bila formulir sudah terisi lalu pengguna menekan Batal, Login, atau menu navigasi, muncul IDDS Modal Confirmation "Tinggalkan pendaftaran?" dengan pilihan "Lanjutkan Mengisi" dan "Tinggalkan".',
    'H3 User Control and Freedom; H5 Error Prevention', 'Sedang', 'dev.eppat.id/register',
    'Meninggalkan formulir yang sudah terisi selalu meminta konfirmasi.'),
  it('HE-REG-02', REG, HR, 'Penjelasan isian ID PPAT dan URL Tenant',
    'Isian ID PPAT dan URL Tenant tidak dijelaskan; pengguna baru tidak tahu nilai apa yang harus diisi.',
    'IDDS Tooltip dan teks bantuan untuk ID PPAT (nomor identitas PPAT yang dipakai asosiasi untuk verifikasi) dan URL Tenant (alamat aplikasi kantor; huruf kecil, angka, tanda hubung). URL Tenant menampilkan hasil cek ketersediaan beserta alamat lengkapnya.',
    'H10 Help and Documentation; H2 Match Between System and the Real World', 'Rendah', 'dev.eppat.id/register',
    'Kedua isian memiliki penjelasan yang terlihat tanpa meninggalkan formulir.',
    'Sumber resmi nomor ID PPAT perlu dikonfirmasi tim agar teks bantuannya tepat.'),
  it('HE-REG-03', REG, HR, 'Gambaran alur pendaftaran sampai aplikasi aktif',
    'Tidak ada panduan atau onboarding untuk pengguna yang baru pertama kali mendaftar; tahapan baru terlihat setelah login di Dashboard.',
    'Ringkasan lima tahap di atas formulir: Isi data pendaftaran, Verifikasi email, Masuk dan amankan akun, Pilih paket dan bayar, Aplikasi kantor aktif. Tahap yang sedang dikerjakan ditandai. Setelah mendaftar, halaman petunjuk verifikasi email menampilkan email tujuan yang disamarkan dan saran memeriksa folder spam.',
    'H10 Help and Documentation; H1 Visibility of System Status', 'Rendah', 'dev.eppat.id/register; /verify-email',
    'Calon pengguna melihat seluruh tahapan sebelum mengisi formulir.'),
  it('HE-REG-04', REG, HR, 'Syarat password tampil sebagai daftar centang',
    'Syarat password ditulis dalam satu baris kecil "Min. 12 karakter · Huruf besar, kecil, angka & simbol" dengan bilah kekuatan tanpa penjelasan syarat mana yang belum terpenuhi.',
    'Daftar centang yang sama dengan Akun Saya (HE-CA-08) dan Tambah User (HE-USER-03): minimal 12 karakter, huruf besar, huruf kecil, angka, simbol; terisi saat mengetik. Ulangi Password langsung memberi tahu apakah sudah sama.',
    'H4 Consistency and Standards; H5 Error Prevention', 'Rendah', 'dev.eppat.id/register',
    'Tampilan dan aturan syarat password sama di Registrasi, Akun Saya, Tambah User, dan ganti password sementara.'),
  it('HE-LOGIN-01', LOG, HL, 'Masa berlaku kode verifikasi terlihat di layar',
    'Batas waktu kode (5 menit) hanya disebut di email "Kode OTP Login e-PPAT"; layar hanya berisi satu kolom kode.',
    'IDDS One-Time Password (6 kotak), email tujuan disamarkan, hitung mundur "Kode berlaku 4:59", dan "Kirim ulang kode" yang aktif setelah 60 detik. Pola sama dengan HE-EAW-04 dan HE-EAWK-05.',
    'H1 Visibility of System Status', 'Tinggi', 'dev.eppat.id/login › Verifikasi Dua Langkah › Email OTP',
    'Sisa masa berlaku kode terlihat dan berkurang tiap detik; kode kedaluwarsa tidak dapat dikirim.'),
  it('HE-LOGIN-02', LOG, HL, 'Pesan galat menjelaskan penyebab dan cara memperbaiki',
    'Login gagal memunculkan dialog besar "Login Gagal — Username/email atau kata sandi salah" yang harus ditutup dengan OK. Kode OTP yang salah hanya memunculkan "Invalid input" berbahasa Inggris tanpa solusi.',
    'Login gagal ditampilkan sebagai IDDS Alert di dalam kartu, isian email tetap terisi, dan pengguna diarahkan ke "Lupa kata sandi?". Kode salah atau kedaluwarsa dijelaskan di bawah kotak kode beserta sisa percobaan dan cara mendapatkan kode baru.',
    'H9 Help Users Recognize, Diagnose, and Recover from Errors', 'Tinggi', 'dev.eppat.id/login',
    'Tidak ada lagi teks "Invalid input"; setiap galat menyebut cara memperbaikinya.',
    'Jumlah percobaan maksimal (contoh: 3) perlu disesuaikan dengan aturan server.'),
  it('HE-LOGIN-03', LOG, HL, 'Navigasi tetap tersedia saat verifikasi dua langkah',
    'Menu navigasi menghilang saat pengguna berada di tahap verifikasi dua langkah, sehingga pengguna yang tidak menerima kode tidak punya jalan keluar selain menutup halaman.',
    'Bilah navigasi atas tetap tampil di semua tahap verifikasi dua langkah, dengan tombol Keluar. Setiap tahap memiliki tautan kembali ("Kembali ke halaman masuk", "Ganti metode") dan "Butuh bantuan?".',
    'H3 User Control and Freedom; H4 Consistency and Standards', 'Sedang', 'dev.eppat.id/login › Verifikasi Dua Langkah',
    'Dari setiap tahap verifikasi dua langkah, pengguna dapat kembali ke halaman masuk atau membuka bantuan.'),
  it('HE-LOGIN-04', LOG, HL, 'Penjelasan verifikasi dua langkah dan kode cadangan',
    'Tidak ada penjelasan tentang verifikasi dua langkah bagi pengguna baru. Tombol "Saya sudah simpan, ke Dashboard" dapat ditekan tanpa benar-benar menyimpan kode cadangan.',
    'Halaman pilih metode menjelaskan dalam satu kalimat apa itu verifikasi dua langkah dan kapan memilih aplikasi authenticator atau email. Halaman kode cadangan menjelaskan kegunaannya dan cara menyimpannya; "Lanjut ke Dashboard" baru aktif setelah pengguna mencentang "Saya sudah menyimpan kode cadangan di tempat aman."',
    'H10 Help and Documentation; H5 Error Prevention', 'Sedang', 'dev.eppat.id/login › Verifikasi Dua Langkah; Kode Cadangan MFA',
    'Pengguna tidak dapat melewati halaman kode cadangan tanpa menyatakan sudah menyimpannya.')
];
for (const x of baru) { const i = j.item.findIndex(y => y.kode === x.kode); if (i < 0) j.item.push(x); else j.item[i] = x; }
/* koreksi: Registrasi live sudah memakai 12 karakter + 4 jenis (dilihat 26 Okt 2026) */
const c8 = j.item.find(x => x.kode === 'HE-CA-08');
if (c8) c8.saat_ini = c8.saat_ini.replace('sedangkan tab Keamanan, Tambah User, dan Registrasi hanya meminta minimal 8 karakter.', 'sedangkan tab Keamanan dan Tambah User hanya meminta minimal 8 karakter (Registrasi Onboarding sudah 12 karakter + 4 jenis).');
const u3 = j.item.find(x => x.kode === 'HE-USER-03'); if (u3) u3.catatan = 'Registrasi (Onboarding) live sudah memakai 12 karakter + 4 jenis; HE-REG-04 menyeragamkan tampilannya menjadi daftar centang.';
const R = [
  { tanggal:T, kode:'HE-REG-01–04, HE-LOGIN-01–04', perubahan:'Prototipe Platform Onboarding (Registrasi dan Login, termasuk verifikasi dua langkah dan kode cadangan) dibuat dari laporan lengkap HE di UX Metric Lab (Highlight #11 dan #7) beserta gambar buktinya, serta layar live dev.eppat.id/register dan /login (hanya dilihat). Aset latar dan logo diambil dari dev.eppat.id. Dashboard (Onboarding) menyusul setelah akun uji tersedia.', berkas:'prototipe/Backlog-HE-ONBOARDING-Prototype.html; sumber/onboard-badan.html; sumber/rakit-onboarding.js' },
  { tanggal:T, kode:'HE-CA-08, HE-USER-03', perubahan:'Koreksi catatan: halaman Registrasi (Onboarding) live ternyata sudah memakai syarat password 12 karakter + huruf besar, kecil, angka & simbol. Yang masih minimal 8 karakter hanya Password Awal di Tambah User (dan tab Keamanan lama).', berkas:'Backlog-HE-EPPAT-Peruri.xlsx' }
];
for (const r of R) if (!j.riwayat.some(x => x.perubahan === r.perubahan)) j.riwayat.push(r);
fs.writeFileSync('backlog-he.json', JSON.stringify(j, null, 2));
console.log(j.item.length, 'usulan,', j.riwayat.length, 'riwayat');
