// Catat pembakuan teks tombol OTP (EAW PPAT) dan keterangan OTP terkirim (EAW Klien). node ejaan-eaw-catat.js
const fs = require('fs');
const j = JSON.parse(fs.readFileSync('backlog-he.json', 'utf8'));
const R = [
  ['HE-EAW-04', 'Ejaan tombol dialog OTP tanda tangan dibakukan: "Verifikasi & Tandatangani" (live) menjadi "Verifikasi & Tanda Tangani" (EYD: gabungan kata yang hanya mendapat akhiran ditulis terpisah).', 'prototipe/Backlog-HE-EAW-Prototype.html; sumber/eaw-badan.html'],
  ['HE-EAWK-01', 'Keterangan status OTP terkirim di daftar akta diganti dari "Lanjutkan validasi OTP & tanda tangan." (live) menjadi "Masukkan kode OTP untuk menandatangani."', 'prototipe/Backlog-HE-EAWK-Prototype.html; sumber/eawk-badan.html']
];
for (const [kode, perubahan, berkas] of R) if (!j.riwayat.some(x => x.perubahan === perubahan)) j.riwayat.push({ tanggal:'2026-10-26', kode, perubahan, berkas });
fs.writeFileSync('backlog-he.json', JSON.stringify(j, null, 2));
console.log(j.riwayat.length, 'riwayat');
