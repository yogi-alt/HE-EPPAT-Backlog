// Pembakuan bahasa E-Akta Wizard (KBBI/EYD V, SPOK jelas). node bakukan-eaw.js
const fs = require('fs');
const f = 'eaw-badan.html';
let t = fs.readFileSync(f, 'utf8'); const log = [];
const ganti = (dari, ke, semua = false) => { const n = t.split(dari).length - 1; if (!n) { log.push('TIDAK ADA: ' + dari.slice(0, 50)); return; } t = semua ? t.split(dari).join(ke) : t.replace(dari, ke); log.push(`${semua ? n : 1}× ${dari.slice(0, 40)}`); };
ganti('Penanda-tangan', 'Penanda tangan', true);
ganti('penanda-tangan', 'penanda tangan', true);
ganti("'Posisi rencana — seret untuk memindah'", "'Posisi rencana — seret untuk memindahkan'");
ganti("(langkah ${p + 1}) dulu. ", "(langkah ${p + 1}) terlebih dahulu. ");
ganti("'Stempel TERA wajib ada sebelum tanda tangan.'", "'Stempel TERA wajib dibubuhkan sebelum para pihak menandatangani akta.'");
ganti("`${g.hal ? `Posisi tanda tangan sudah di halaman ${g.hal}.` : 'Tempatkan kotak tanda tangan di halaman akta.'} Lalu kirim kode ${istilah('OTP', 'OTP')} ke email ${esc(g.email)} untuk membubuhkan ${istilah('tanda tangan elektronik', 'TTE')}.`",
  "`${g.hal ? `Kotak tanda tangan sudah ditempatkan di halaman ${g.hal}.` : 'Tempatkan kotak tanda tangan di halaman akta terlebih dahulu.'} Kirim kode ${istilah('OTP', 'OTP')} ke email ${esc(g.email)}. Setelah kode dimasukkan, ${istilah('tanda tangan elektronik', 'TTE')} ${esc(g.nama)} dibubuhkan pada akta.`");
ganti('Tanda tangan berjalan berurutan sesuai daftar. Setiap penanda tangan wajib punya posisi di PDF dan', 'Tanda tangan dilakukan berurutan sesuai daftar. Setiap penanda tangan wajib memiliki posisi di PDF dan');
ganti("'Penanda tangan belum punya CA aktif', 'Penanda tangan perlu menyelesaikan Registrasi CA dari menu Akun Saya. Setelah CA aktif, tombol Kirim OTP untuknya dapat dipakai.'",
  "'Penanda tangan belum memiliki CA aktif', 'Penanda tangan perlu menyelesaikan Registrasi CA melalui menu Akun Saya. Setelah CA aktif, tombol Kirim OTP untuk penanda tangan tersebut dapat digunakan.'");
ganti("toast('Buka dialog OTP dulu (mis.", "toast('Buka dialog OTP terlebih dahulu (mis.");
ganti('Nama langkah dibuat satu dan dipakai konsisten di stepper, panel, dan pesan: Stempel TERA, Tanda Tangan Elektronik, E-Meterai.',
  'Nama langkah dibuat satu dan dipakai konsisten di stepper, panel, dan pesan: Stempel TERA, Tanda Tangan Elektronik, E-Meterai. Ejaan "E-Materai" di live dibakukan menjadi "E-Meterai" (KBBI: meterai).');
ganti('lama:\'Stepper hanya berupa tiga ikon (Digital Stamp, E-Signature, E-Materai) tanpa nomor dan status;', 'lama:\'Stepper hanya berupa tiga ikon (Digital Stamp, E-Signature, E-Materai — salah eja) tanpa nomor dan status;');
fs.writeFileSync(f, t); console.log(log.join('\n'));
console.log('sisa kata tidak baku:', (t.match(/penanda-tangan| dulu\b|\bpunya\b|memindah\b|\. Lalu /gi) || []).join(', ') || 'tidak ada');
