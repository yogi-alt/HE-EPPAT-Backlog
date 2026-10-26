// Catat audit E-Akta Wizard (HE, IDDS, bahasa) ke backlog-he.json (aman diulang).
const fs = require('fs');
const j = JSON.parse(fs.readFileSync('backlog-he.json', 'utf8'));
const r = { tanggal:'2026-10-26', kode:'HE-EAW-01…06',
  perubahan:'Audit ulang E-Akta Wizard. (1) HE: semua temuan hal. 28–30 + catatan prinsip UX Metric Lab (istilah, batas waktu OTP di layar, pesan OTP spesifik, konfirmasi aksi tak dapat dibatalkan, perpindahan langkah otomatis, bantuan) tercakup. (2) IDDS: pil hitung mundur OTP → Badge; pesan berhasil → Alert success; nomor halaman → Text Field; kartu penanda tangan → Card. (3) Bahasa (KBBI/EYD V, SPOK): "penanda-tangan" → "penanda tangan"; "punya/dulu/bisa" → "memiliki/terlebih dahulu/dapat"; "dipindah" → "dipindahkan"; kalimat tanpa subjek diperbaiki; informasi ganda dihapus; ejaan live "E-Materai" dicatat salah eja (baku: meterai). Uji kontras kini juga memeriksa nilai di dalam kotak isian.',
  berkas:'sumber/eaw-badan.html; prototipe/Backlog-HE-EAW-Prototype.html' };
if (!j.riwayat.some(x => x.tanggal === r.tanggal && x.kode === r.kode)) j.riwayat.push(r);
const i = j.item.find(x => x.kode === 'HE-EAW-01');
if (i && !i.usulan.includes('E-Materai')) i.usulan += ' Ejaan label live "E-Materai" dibakukan menjadi "E-Meterai" (KBBI: meterai).';
fs.writeFileSync('backlog-he.json', JSON.stringify(j, null, 2));
console.log(j.item.length, 'usulan,', j.riwayat.length, 'riwayat');
