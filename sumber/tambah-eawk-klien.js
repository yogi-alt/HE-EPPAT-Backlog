// Tambah usulan E-Akta Wizard (Klien) HE-EAWK-01…07 ke backlog-he.json. node tambah-eawk-klien.js
const fs = require('fs');
const j = JSON.parse(fs.readFileSync('backlog-he.json', 'utf8'));
const T = '2026-10-26', F = 'E-Akta Wizard (Klien)', ACU = k => `prototipe/Backlog-HE-EAWK-Prototype.html › Daftar perubahan › ${k}`;
const it = (kode, judul, saat_ini, usulan, prinsip, halaman, prioritas, layar, selesai_bila, catatan = '') =>
  ({ kode, fitur:F, judul, saat_ini, usulan, prinsip, halaman, prioritas, layar, acuan:ACU(kode), selesai_bila, status:'Prototipe siap', catatan, tanggal:T });
const baru = [
  it('HE-EAWK-01', 'Cari, saring, dan urutkan daftar akta',
    'Daftar akta hanya bisa digulir; tidak ada pencarian, saringan status, urutan, atau tanggal. Akta yang perlu ditandatangani bercampur dengan akta yang sudah selesai.',
    'IDDS Input Search (kode order, jenis akta, peran); IDDS Button Group untuk saringan status beserta jumlahnya (Semua, Perlu tindakan, Menunggu, Selesai); IDDS Select Dropdown untuk urutan (Perlu tindakan dulu, Terbaru, Terlama). Akta yang menunggu tindakan diberi garis tepi kuning dan tampil paling atas. Setiap akta menampilkan tanggal pembaruan terakhir. Pencarian tanpa hasil menampilkan keadaan kosong dengan tombol "Hapus pencarian & saringan".',
    'H7 Flexibility and Efficiency of Use; H6 Recognition Rather Than Recall', '37 (Temuan 3)', 'Sedang', 'E-Akta Wizard › daftar akta',
    'Pengguna dapat menemukan akta berdasarkan kode order atau status tanpa menggulir; akta "Giliran Anda" dan "OTP terkirim" tampil paling atas secara bawaan.'),
  it('HE-EAWK-02', 'Langsung ke halaman tanda tangan Anda',
    'Panel kanan menyebut "Posisi tanda tangan sudah ditentukan Kantor PPAT (halaman 7)", tetapi PDF selalu terbuka di halaman 1. Pengguna harus mengingat nomor halaman lalu menekan Next berulang kali.',
    'Saat akta dibuka, penampil PDF langsung menuju halaman posisi tanda tangan pengguna; kotak tanda tangan berkedip dengan label "Tanda tangan Anda di sini". Baris "Lompat ke" di atas PDF berisi pintasan ke posisi tanda tangan, halaman pertama, dan halaman terakhir. Bila pengguna sedang di halaman lain, kartu Langkah berikutnya menampilkan tombol "Lihat halaman N".',
    'H6 Recognition Rather Than Recall; H7 Flexibility and Efficiency of Use', '36, 38', 'Tinggi', 'E-Akta Wizard › detail akta (penampil PDF)',
    'Membuka akta berstatus Giliran Anda langsung menampilkan halaman tanda tangan pengguna tanpa menekan tombol halaman.'),
  it('HE-EAWK-03', 'Langkah berikutnya tampil paling atas dan menonjol',
    'Instruksi berupa teks kecil abu-abu di dalam kartu informasi, di bawah data peran dan email, sehingga mudah terlewat karena perhatian tertuju ke PDF di sebelah kiri.',
    'Panel kanan dibuka dengan kartu "Langkah berikutnya" bergaris tebal berisi tiga langkah bernomor beserta statusnya (periksa akta, kirim OTP, masukkan kode) dan satu tombol utama. Bila pengguna belum bisa menandatangani (menunggu stempel, menunggu giliran, posisi belum ditentukan), kartu menjelaskan alasannya dan siapa yang sedang ditunggu dengan IDDS Alert. Di layar sempit, panel ini tampil di atas PDF.',
    'H8 Aesthetic and Minimalist Design; H1 Visibility of System Status', '38', 'Tinggi', 'E-Akta Wizard › detail akta (panel kanan)',
    'Instruksi dan tombol utama terlihat tanpa menggulir di layar 1440×900 dan di ponsel; setiap status tidak-bisa-tanda-tangan menampilkan alasan yang spesifik.'),
  it('HE-EAWK-04', 'Konfirmasi sebelum tanda tangan dibubuhkan',
    'Tombol "Kirim OTP" langsung mengirim kode, dan tombol "Tanda tangani" di dialog OTP langsung membubuhkan tanda tangan tanpa konfirmasi atau ringkasan.',
    'IDDS Modal Confirmation sebelum OTP dikirim: ringkasan akta, peran dan urutan, halaman tanda tangan, email OTP tersamar, serta kalimat bahwa tanda tangan tidak dapat dibatalkan. Tombol "Kirim OTP" aktif setelah pengguna mencentang "Saya sudah membaca isi akta dan setuju menandatanganinya." Dialog OTP mengulang peringatan bahwa tanda tangan dibubuhkan saat tombol Tanda Tangani ditekan.',
    'H5 Error Prevention', '36, 38', 'Tinggi', 'E-Akta Wizard › detail akta › Kirim OTP',
    'Tidak ada OTP yang terkirim sebelum pengguna mencentang pernyataan di dialog konfirmasi.'),
  it('HE-EAWK-05', 'Masa berlaku OTP dan pesan galat terlihat di layar',
    'Dialog berisi satu kolom angka; masa berlaku kode hanya disebut di email. Kode salah muncul sebagai toast teknis di pojok kanan atas: "input tidak valid: OTP salah, mohon coba lagi". Tombol aktif sejak 4 digit walau kode 6 digit.',
    'IDDS One-Time Password (6 kotak), email tujuan tersamar, hitung mundur "Kode berlaku 14:59", tombol "Kirim ulang kode" yang aktif setelah 60 detik, dan pesan galat di bawah kotak kode (kode salah beserta sisa percobaan, kode kedaluwarsa beserta ajakan kirim ulang). Panel kanan menulis jam pengiriman dan batas berlaku kode. Pola sama dengan HE-EAW-04.',
    'H1 Visibility of System Status; H9 Help Users Recognize, Diagnose, and Recover from Errors', '36 (bukti UX Metric Lab)', 'Tinggi', 'E-Akta Wizard › dialog OTP',
    'Dialog OTP menampilkan sisa waktu yang berkurang tiap detik; kode salah ditampilkan di bawah kotak tanpa awalan teknis.'),
  it('HE-EAWK-06', 'Kontak kantor PPAT yang bisa langsung dihubungi',
    'Pesan hanya berbunyi "Kantor PPAT belum menempatkan posisi tanda tangan Anda di dokumen. Hubungi Kantor PPAT." tanpa nomor telepon, email, atau tautan.',
    'Setiap pesan yang meminta pengguna menghubungi kantor disertai nama kantor, nomor telepon (tautan tel:), dan email (tautan mailto: dengan subjek kode order). Kartu "Ada pertanyaan tentang akta ini?" tersedia di panel kanan setiap akta dan di drawer Bantuan.',
    'H10 Help and Documentation; H7 Flexibility and Efficiency of Use', '37 (Temuan 1)', 'Sedang', 'E-Akta Wizard › detail akta; Bantuan',
    'Dari status "posisi belum ditentukan", pengguna dapat menelepon atau mengirim email ke kantor dengan satu klik.',
    'Nomor telepon diambil dari profil kantor (sudah ada di kartu kantor). Email kantor perlu dipastikan tersedia di Profil Kantor.'),
  it('HE-EAWK-07', 'Panduan singkat untuk pengguna yang baru pertama kali',
    'Tidak ada tutorial atau panduan awal. Instruksi baru muncul setelah pengguna membuka akta tertentu, sehingga pengguna baru tidak mendapat gambaran menyeluruh.',
    'Kartu "Pertama kali menandatangani akta elektronik?" di atas daftar akta berisi tiga langkah singkat dan tombol "Lihat panduan lengkap" (membuka drawer Bantuan). Kartu dapat ditutup ("Mengerti, tutup panduan"); panduan tetap tersedia lewat tombol Bantuan.',
    'H10 Help and Documentation', '37 (Temuan 2)', 'Sedang', 'E-Akta Wizard › daftar akta',
    'Pengguna baru melihat ringkasan tiga langkah sebelum membuka akta; setelah ditutup, kartu tidak muncul lagi untuk pengguna tersebut.',
    'Status "sudah ditutup" disimpan per pengguna (di server atau browser).')
];
for (const b of baru) { const i = j.item.findIndex(x => x.kode === b.kode); if (i < 0) j.item.push(b); else j.item[i] = b; }
const r = { tanggal:T, kode:'HE-EAWK-01–07', perubahan:'Prototipe E-Akta Wizard (Klien) dibuat dari laporan HE hal. 36–38, gambar bukti UX Metric Lab, serta kode dan layar live akun Klien (6 status: Menunggu stempel PPAT, Menunggu giliran, Giliran Anda, OTP terkirim, Sudah Anda tanda tangani, Selesai). Kerangka disalin dari prototipe Registrasi CA; penampil PDF, konfirmasi, dan dialog OTP disalin dari prototipe E-Akta Wizard PPAT. Bantuan halaman (HE-UMUM-02) dan IDDS (HE-UMUM-01) ikut diterapkan.', berkas:'prototipe/Backlog-HE-EAWK-Prototype.html; sumber/eawk-badan.html' };
if (!j.riwayat.some(x => x.kode === r.kode)) j.riwayat.push(r);
fs.writeFileSync('backlog-he.json', JSON.stringify(j, null, 2));
console.log(j.item.length, 'usulan,', j.riwayat.length, 'riwayat');
