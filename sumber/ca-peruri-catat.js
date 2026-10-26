// Catat hasil penelusuran pengajuan CA (akun uji yopmail, data dummy di dev) ke backlog-he.json. node ca-peruri-catat.js
const fs = require('fs');
const j = JSON.parse(fs.readFileSync('backlog-he.json', 'utf8'));
const it = k => j.item.find(x => x.kode === k);
const c1 = it('HE-CA-01'), c2 = it('HE-CA-02'), c5 = it('HE-CA-05');
c1.usulan = c1.usulan.replace('(3) Verifikasi identitas (eKYC) — OTP dan swafoto ± 5 menit', '(3) Verifikasi di portal Peruri (eKYC) — 5 tahap ± 6 menit: setujui syarat, OTP email & SMS, periksa data pribadi, swafoto, kirim pengajuan');
c1.catatan = 'Perkiraan waktu adalah contoh — portal Peruri staging mencantumkan ±1 menit per tahap; perlu angka resmi untuk pemeriksaan Peruri. Notifikasi saat CA aktif perlu konfirmasi tim teknis. Masa berlaku tautan onboarding tidak tercantum di email maupun di E-PPAT (penelusuran 26 Okt) — perlu data dari Peruri.';
c2.usulan = c2.usulan.replace('dan kalimat "Di portal Peruri Anda hanya perlu memasukkan kode OTP dan mengambil swafoto."', 'dan kalimat "Data ini sudah terisi di portal Peruri, sehingga Anda cukup memeriksanya tanpa mengetik ulang." Langkah eKYC menjelaskan lima tahap di portal Peruri dan bahwa tautan yang sama dikirim ke email dari no-reply-digital@peruri.co.id.');
c5.catatan = 'Untuk tim/Peruri (penelusuran 26 Okt, akun uji): email "Digital Certificate Onboarding Invitation" menyebut pendaftaran "di bawah entitas organisasi PELANGGAN" — nama organisasi bawaan, sebaiknya nama kantor PPAT/E-PPAT; portal Peruri staging tampil berbahasa Inggris secara bawaan (pilihan ID tersedia) — pertimbangkan tautan dengan bahasa Indonesia.';
const r = { tanggal:'2026-10-26', kode:'HE-CA-01…05', perubahan:'Penelusuran pengajuan CA end-to-end di dev (izin pengguna: data dummy boleh): akun uji ca-user-eppat@yopmail.com diisi data dummy bertanda uji (foto "KTP CONTOH – DATA UJI"), Registrasi CA diajukan → status Sedang Diproses, portal Peruri staging terbuka (6 tahap, bahasa Inggris bawaan), email "Digital Certificate Onboarding Invitation" diterima. Berhenti sebelum OTP SMS (nomor dummy). Teks prototipe disesuaikan dengan alur nyata portal Peruri (bukan hanya OTP + swafoto); tab Akun Saya diseragamkan dengan prototipe TERA (full-width, ikon & subjudul live).', berkas:'prototipe/Backlog-HE-CA-Prototype.html; sumber/ca-idds.html' };
if (!j.riwayat.some(x => x.perubahan.startsWith('Penelusuran pengajuan CA'))) j.riwayat.push(r);
fs.writeFileSync('backlog-he.json', JSON.stringify(j, null, 2));
console.log(j.item.length, 'usulan,', j.riwayat.length, 'riwayat');
