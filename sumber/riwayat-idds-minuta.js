// Catat penyelarasan IDDS Minuta ke backlog-he.json (aman diulang).
const fs = require('fs');
const j = JSON.parse(fs.readFileSync('backlog-he.json', 'utf8'));
const r = { tanggal:'2026-10-23', kode:'HE-UMUM-01',
  perubahan:'Audit IDDS Minuta Akta: bagian yang masih dibuat sendiri diganti komponen IDDS — kolom cari → Input Search; panel Sisipkan Variabel → Select Dropdown (panel, pencarian, opsi, kosong); menu Lainnya → Action Dropdown; tombol bilah alat & hapus pasal → Button tertiary/secondary sm; label variabel → Badge soft brand/warning; "Tampilkan kode variabel" → Toggle; tombol memuat → Spinner; hasil Cek Ejaan → Card; konfirmasi hapus & perubahan belum disimpan → Modal Confirmation. Markup mengikuti struktur resmi (wadah .ina-action-dropdown / .ina-select-dropdown wajib ada).',
  berkas:'sumber/minuta-badan.html; prototipe/Backlog-HE-MINUTA-Prototype.html' };
if (!j.riwayat.some(x => x.perubahan.startsWith('Audit IDDS Minuta'))) j.riwayat.push(r);
fs.writeFileSync('backlog-he.json', JSON.stringify(j, null, 2));
console.log(j.riwayat.length, 'riwayat');
