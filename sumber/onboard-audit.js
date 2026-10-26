// Audit IDDS & bahasa prototipe Onboarding: kartu pilihan → IDDS Card; ejaan "Anda"; label berbahasa Inggris dibakukan. node onboard-audit.js
const fs = require('fs');
let t = fs.readFileSync('onboard-badan.html', 'utf8');
const G = [
  /* kartu pilihan metode bayar & metode MFA memakai IDDS Card */
  ['<button type="button" data-metode-bayar="va">', '<button type="button" class="ina-card ina-card--variant-basic kartu-aksi" data-metode-bayar="va">'],
  ['<button type="button" disabled><span><b>QRIS</b>', '<button type="button" class="ina-card ina-card--variant-basic kartu-aksi" disabled><span><b>QRIS</b>'],
  ['<button type="button" disabled><span><b>Transfer Bank</b>', '<button type="button" class="ina-card ina-card--variant-basic kartu-aksi" disabled><span><b>Transfer Bank</b>'],
  ['<button type="button" data-metode="app">', '<button type="button" class="ina-card ina-card--variant-basic kartu-aksi" data-metode="app">'],
  ['<button type="button" data-metode="email">', '<button type="button" class="ina-card ina-card--variant-basic kartu-aksi" data-metode="email">'],
  /* ejaan: kata ganti "Anda" ditulis kapital (EYD) */
  ["'Masukkan Nama Lengkap anda'", "'Masukkan nama lengkap Anda'"],
  ["'Masukkan email anda'", "'Masukkan email Anda'"],
  ["'Masukkan ID PPAT anda'", "'Masukkan ID PPAT Anda'"],
  ["'Masukkan No Rekening anda'", "'Masukkan nomor rekening Anda'"],
  ["tf('rRek', 'No Rekening'", "tf('rRek', 'Nomor Rekening'"],
  ["tf('rTgl', 'Tanggal lahir', 'Pilih Tanggal'", "tf('rTgl', 'Tanggal Lahir', 'Pilih tanggal'"],
  ["tf('rTempat', 'Tempat Lahir', 'Tempat lahir')", "tf('rTempat', 'Tempat Lahir', 'Masukkan tempat lahir')"],
  /* label berbahasa Inggris dibakukan */
  ["tombol('Login', 'primary', 'md', 'data-ke=\"masuk\"')", "tombol('Masuk', 'primary', 'md', 'data-ke=\"masuk\"')"],
  ["tombol('Register', 'primary', 'md', 'data-ke=\"daftar\"')", "tombol('Daftar', 'primary', 'md', 'data-ke=\"daftar\"')"],
  ['<a href="#" data-ke="daftar">Register sekarang</a>', '<a href="#" data-ke="daftar">Daftar sekarang</a>'],
  ["tf('mEmail', 'Username / Email', 'Masukkan username atau email Anda'", "tf('mEmail', 'Email atau Nama Pengguna', 'Masukkan email atau nama pengguna Anda'"],
  ["galat('mEmail', 'Username/Email wajib diisi')", "galat('mEmail', 'Email atau nama pengguna wajib diisi.')"],
  ["setPw('mPw', 'Kata sandi wajib diisi', 'error')", "setPw('mPw', 'Kata sandi wajib diisi.', 'error')"],
  ["'Login Pertama', 'Verifikasi Anggota'", "'Masuk Pertama', 'Verifikasi Anggota'"],
  ['<span class="urole">Customer</span>', '<span class="urole">Pelanggan</span>'],
  ["isi:'Text Field, Password Input, Checkbox, Button, Alert, One-Time Password, Modal Confirmation, Tooltip, Toast, dan Drawer memakai komponen INA Digital Design System dengan brand E-PPAT.',\n    lama:'Isian, dialog, dan kotak pesan dibuat sendiri.'",
   "isi:'Text Field, Password Input, Checkbox, Radio Button, Stepper, Card, Button, Alert, One-Time Password, Modal Confirmation, Tooltip, Toast, Drawer, dan Table memakai komponen INA Digital Design System dengan brand E-PPAT. Label berbahasa Inggris dibakukan: Login → Masuk, Register → Daftar, Username → Nama Pengguna, Login Pertama → Masuk Pertama, Customer → Pelanggan; kata ganti \"anda\" ditulis \"Anda\".',\n    lama:'Isian, stepper, pilihan paket, dialog, dan kotak pesan dibuat sendiri. Label bercampur bahasa Inggris (Login, Register, Username, Customer) dan placeholder memakai \"anda\" huruf kecil.'"]
];
let gagal = 0;
for (const [a, b] of G) { if (t.includes(a)) t = t.split(a).join(b); else if (!t.includes(b)) { console.log('TIDAK KETEMU:', a.slice(0, 70)); gagal++; } }
fs.writeFileSync('onboard-badan.html', t);
console.log(gagal ? `selesai dengan ${gagal} yang tidak ketemu` : 'OK semua penggantian');
