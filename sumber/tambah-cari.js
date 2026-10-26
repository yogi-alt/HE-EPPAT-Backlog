const fs = require('fs');
const j = JSON.parse(fs.readFileSync('backlog-he.json', 'utf8'));
const T = '2026-10-26';
const x = { kode:'HE-EAW-07', fitur:'E-Akta Wizard (PPAT)', judul:'Cari dan saring daftar akta',
  saat_ini:'Daftar E-Akta Wizard tidak memiliki pencarian atau saringan; pengguna harus menggulir untuk menemukan akta pada langkah tertentu.',
  usulan:'IDDS Input Search (kode, narahubung, nomor akta) dan saringan IDDS Button Group per langkah beserta jumlahnya: Semua, Belum mulai, Stempel TERA, Tanda tangan, E-Meterai, Selesai. Hasil kosong menampilkan tombol "Hapus pencarian dan saringan". Pola sama dengan daftar Minuta dan Verifikasi.',
  prinsip:'H7 Flexibility and Efficiency of Use', halaman:'40 (Kesimpulan no. 5)', prioritas:'Rendah', layar:'E-PPAT Module › E-Akta Wizard › daftar',
  acuan:'prototipe/Backlog-HE-EAW-Prototype.html › Daftar perubahan › HE-EAW-07', selesai_bila:'Akta dapat ditemukan berdasarkan kode, narahubung, atau nomor akta dan disaring per langkah tanpa menggulir.', status:'Prototipe siap', catatan:'', tanggal:T };
const i = j.item.findIndex(y => y.kode === x.kode); if (i < 0) j.item.push(x); else j.item[i] = x;
const R = [
  { tanggal:T, kode:'HE-EAW-07', perubahan:'Daftar E-Akta Wizard (PPAT) diberi IDDS Input Search dan saringan per langkah, sesuai rekomendasi umum laporan HE hal. 40 no. 5.', berkas:'prototipe/Backlog-HE-EAW-Prototype.html; sumber/eaw-badan.html; sumber/eaw-cari.js' },
  { tanggal:T, kode:'HE-UMUM-01 (Order AJB)', perubahan:'Kolom cari daftar Order AJB diganti dari Text Field berikon menjadi IDDS Input Search (placeholder "Cari kode atau narahubung…", tombol hapus bawaan), sama dengan Minuta, Verifikasi, dan E-Akta Wizard. Sebelumnya ditahan atas permintaan pengguna; kini dikerjakan atas instruksi pengguna 26 Okt 2026.', berkas:'prototipe/Backlog-HE-ORDER-Prototype.html; sumber/order-idds.html' }
];
for (const r of R) if (!j.riwayat.some(y => y.perubahan === r.perubahan)) j.riwayat.push(r);
fs.writeFileSync('backlog-he.json', JSON.stringify(j, null, 2));
console.log(j.item.length, 'usulan,', j.riwayat.length, 'riwayat');
