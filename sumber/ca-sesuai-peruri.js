// Sesuaikan teks Registrasi CA dengan alur nyata portal Peruri staging (ditelusuri 26 Okt 2026, akun uji yopmail). node ca-sesuai-peruri.js
const fs = require('fs');
const f = 'ca-badan.html';
let t = fs.readFileSync(f, 'utf8'); const log = [];
const ganti = (dari, ke) => { const n = t.split(dari).length - 1; if (!n) { log.push('TIDAK ADA: ' + dari.slice(0, 70)); return; } t = t.split(dari).join(ke); log.push(`${n}× ${dari.slice(0, 50)}`); };

ganti("EKYC:'Verifikasi identitas secara daring di portal Peruri: memasukkan kode OTP lalu mengambil swafoto untuk dicocokkan dengan foto KTP.'",
  "EKYC:'Verifikasi identitas secara daring di portal Peruri: menyetujui syarat layanan, memasukkan kode OTP dari email dan SMS, memeriksa data pribadi, lalu mengambil swafoto untuk dicocokkan dengan foto KTP.'");
ganti("['Verifikasi identitas (eKYC)', `OTP dan swafoto · ${est('± 5 menit')}`]", "['Verifikasi di portal Peruri (eKYC)', `5 tahap · ${est('± 6 menit')}`]");
ganti("`Data diri Anda sudah lengkap. Setelah diajukan, portal Peruri terbuka di tab baru untuk ${istilah('eKYC', 'EKYC')}: masukkan kode OTP, lalu ambil ${istilah('swafoto', 'SWAFOTO')}.`",
  "`Data diri Anda sudah lengkap. Setelah diajukan, portal Peruri terbuka di tab baru untuk ${istilah('eKYC', 'EKYC')}. Tautan yang sama juga dikirim ke email Anda.`");
ganti("`Masukkan kode OTP yang dikirim ke nomor HP Anda, lalu ambil ${istilah('swafoto', 'SWAFOTO')}. Proses ini memakan waktu ${est('± 5 menit')}. Tautan berlaku sampai ${est('27 Okt 2026, 09.15')}.`",
  "`Di portal Peruri Anda akan (1) menyetujui syarat layanan, (2) memasukkan kode OTP dari email dan SMS, (3) memeriksa data pribadi yang sudah terisi, (4) mengambil ${istilah('swafoto', 'SWAFOTO')}, dan (5) mengirim pengajuan. Semuanya memakan waktu ${est('± 6 menit')}. Tautan yang sama ada di email dari no-reply-digital@peruri.co.id dan berlaku sampai ${est('27 Okt 2026, 09.15')}.`");
ganti('<p class="alasan">Di portal Peruri Anda hanya perlu memasukkan kode OTP dan mengambil swafoto.</p>',
  '<p class="alasan">Data ini sudah terisi di portal Peruri, sehingga Anda cukup memeriksanya tanpa mengetik ulang.</p>');
ganti("untuk verifikasi identitas (OTP dan swafoto, ${est('± 5 menit')}).</p>", "untuk verifikasi identitas (${est('± 6 menit')}). Tautan yang sama juga dikirim ke email Anda.</p>");
ganti("<li><b>Selesaikan eKYC di portal Peruri:</b> masukkan kode OTP, lalu ambil swafoto (${est('± 5 menit')}).</li>",
  "<li><b>Selesaikan eKYC di portal Peruri</b> (${est('± 6 menit')}): setujui syarat layanan, masukkan kode OTP dari email dan SMS, periksa data pribadi, ambil swafoto, lalu kirim pengajuan. Tautannya juga dikirim ke email Anda.</li>");
ganti("'Anda hanya perlu memverifikasi identitas: memasukkan kode OTP dan mengambil swafoto. Data diri Anda sudah dikirim otomatis sehingga Anda tidak perlu mengetik ulang.'",
  "'Anda menyetujui syarat layanan, memasukkan kode OTP dari email dan SMS, memeriksa data pribadi, mengambil swafoto, lalu mengirim pengajuan. Data diri Anda sudah terisi otomatis sehingga Anda tidak perlu mengetik ulang. Bila portal tampil dalam bahasa Inggris, pilih ID di kanan atas.'");
/* daftar perubahan */
ganti("Verifikasi identitas (eKYC) ± 5 menit, dan Pemeriksaan Peruri ± 1 hari kerja.", "Verifikasi di portal Peruri (eKYC, 5 tahap ± 6 menit), dan Pemeriksaan Peruri ± 1 hari kerja.");
ganti("beserta penegasan bahwa di portal Peruri pengguna hanya perlu memasukkan OTP dan mengambil swafoto.", "beserta penegasan bahwa data itu sudah terisi di portal Peruri sehingga pengguna cukup memeriksanya. Langkah eKYC menjelaskan lima tahap di portal Peruri dan bahwa tautan yang sama dikirim ke email.");
fs.writeFileSync(f, t); console.log(log.join('\n'));
