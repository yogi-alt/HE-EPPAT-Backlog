// Catat perbaikan tab Akun/Keamanan/Data Diri + modal saat masuk (Registrasi CA) ke backlog-he.json. node ca-tab-catat.js
const fs = require('fs');
const j = JSON.parse(fs.readFileSync('backlog-he.json', 'utf8'));
const c2 = j.item.find(x => x.kode === 'HE-CA-02');
if (!c2.usulan.includes('formulir lengkap')) c2.usulan += ' Tab Data Diri (KTP) tetap formulir lengkap seperti live (NIK, NPWP, jenis kelamin, gelar, pekerjaan, tempat & tanggal lahir, kota domisili, kewarganegaraan, alamat, RT/RW, kelurahan, kecamatan, provinsi, foto KTP, domisili sementara); hanya ditambah tanda * pada isian yang diperlukan untuk akta dan registrasi CA.';
const r = { tanggal:'2026-10-26', kode:'HE-CA-02', perubahan:'Koreksi prototipe Registrasi CA atas masukan pengguna: tab Data Diri (KTP) sebelumnya diringkas menjadi 3 baris + panel — kini formulir lengkap seperti live (17 isian, NIK mengisi tanggal lahir & jenis kelamin otomatis, IDDS File Upload untuk foto KTP, Simpan Data Diri). Tab Akun memakai pola Identitas Akun yang sama dengan prototipe TERA (+ Ubah Data dengan galat nomor HP di dekat isian); tab Keamanan mengikuti live Klien (Ganti Password, Sesi Aktif). Modal "Lengkapi Data Diri" saat masuk ditambahkan seperti live, dengan daftar yang diselaraskan dengan syarat CA (+ alamat).', berkas:'prototipe/Backlog-HE-CA-Prototype.html; sumber/ca-idds.html' };
if (!j.riwayat.some(x => x.perubahan.startsWith('Koreksi prototipe Registrasi CA'))) j.riwayat.push(r);
fs.writeFileSync('backlog-he.json', JSON.stringify(j, null, 2));
console.log(j.item.length, 'usulan,', j.riwayat.length, 'riwayat');
