// Tambah usulan Dashboard (Onboarding) HE-OB-01…05. node tambah-dasbor-ob.js
const fs = require('fs');
const j = JSON.parse(fs.readFileSync('backlog-he.json', 'utf8'));
const T = '2026-10-26', F = 'Dashboard (Onboarding)', H = 'UX Metric Lab, Highlight #8 (skor 71,5; PDF hal. 15)';
const ACU = k => `prototipe/Backlog-HE-ONBOARDING-Prototype.html › Daftar perubahan › ${k}`;
const it = (kode, judul, saat_ini, usulan, prinsip, prioritas, layar, selesai_bila, catatan = '') =>
  ({ kode, fitur:F, judul, saat_ini, usulan, prinsip, halaman:H, prioritas, layar, acuan:ACU(kode), selesai_bila, status:'Prototipe siap', catatan, tanggal:T });
const baru = [
  it('HE-OB-01', 'Hasil cek status jelas dan dapat ditutup',
    'Setiap kali status dicek, muncul dialog besar "Status Diperbarui — Status registrasi terbaru sudah dimuat." tanpa tombol tutup, walaupun tidak ada perubahan (skor User Control: 20). Tombol berbahasa campuran "Check Status Terbaru".',
    '"Cek Status Terbaru" memberi hasil lewat IDDS Toast yang dapat ditutup, berisi jam pengecekan dan tahap saat ini (mis. "Belum ada perubahan · dicek 10.32 · Tahap saat ini: Proses Pembayaran"). Bila ada perubahan, tahap yang berubah disorot di stepper.',
    'H3 User Control and Freedom; H1 Visibility of System Status', 'Sedang', 'dev.eppat.id/dashboard',
    'Mengecek status tidak lagi membuka dialog yang menghalangi; pengguna langsung tahu ada atau tidaknya perubahan.'),
  it('HE-OB-02', 'Paket dapat diganti sebelum pembayaran',
    'Setelah "Lanjut Pembayaran", paket terkunci; Ringkasan Pesanan tidak memiliki cara mengganti paket (terkonfirmasi di live 26 Okt 2026).',
    'Tombol "Ganti Paket" di Ringkasan Pesanan selama pembayaran belum diterima. Bila Virtual Account sudah dibuat, IDDS Modal Confirmation menjelaskan bahwa tagihan lama dibatalkan dan pengguna diminta tidak mentransfer ke nomor lama.',
    'H3 User Control and Freedom', 'Sedang', 'dev.eppat.id/dashboard › Ringkasan Pesanan',
    'Pengguna dapat berpindah paket sebelum membayar tanpa bantuan admin; VA lama tidak lagi dapat dibayar.',
    'Perlu dukungan server untuk membatalkan VA lama.'),
  it('HE-OB-03', 'Langkah berikutnya, perkiraan waktu, dan bantuan di Dashboard',
    'Tidak ada panduan, tooltip, atau kontak dukungan di Dashboard maupun halaman pembayaran (skor Help & Documentation: 0). Pengguna tidak tahu berapa lama Proses Administrasi berjalan.',
    'IDDS Alert "Langkah berikutnya" di bawah stepper menyebut tindakan yang diperlukan dan perkiraan waktunya. Kartu "Butuh bantuan?" menampilkan Hotline Digital Product 1500159 dan TAMARA, serta membuka drawer Bantuan. Hasil cek pembayaran yang belum masuk dijelaskan dengan jam pengecekan dan saran menunggu beberapa menit.',
    'H10 Help and Documentation; H1 Visibility of System Status', 'Sedang', 'dev.eppat.id/dashboard',
    'Di setiap tahap, Dashboard menampilkan langkah berikutnya dan kontak bantuan.',
    'Perkiraan waktu (± 1 hari kerja) adalah angka contoh; perlu konfirmasi tim.'),
  it('HE-OB-04', 'Email aktivasi tanpa password dalam teks biasa',
    'Email "instansi e-PPAT telah berhasil dibuat" menampilkan EMAIL LOGIN, PASSWORD dalam teks biasa, dan LINK LOGIN (bukti HE; skor Privacy Dashboard: 0).',
    'Email berisi alamat aplikasi kantor, email login, dan tombol "Buat Kata Sandi" (tautan sekali pakai dengan masa berlaku), disertai kalimat bahwa E-PPAT tidak pernah mengirim kata sandi melalui email. Kata sandi dibuat pengguna sendiri dengan syarat 12 karakter + 4 jenis karakter.',
    'H11 Privacy; H5 Error Prevention', 'Tinggi', 'Email aktivasi instansi (setelah Proses Administrasi)',
    'Tidak ada kata sandi di dalam email apa pun.'),
  it('HE-OB-05', 'Stepper bernomor urut dan istilah yang konsisten',
    'Penomoran stepper melompat dari 3 ke 5 karena satu tahap tidak ditampilkan (live 26 Okt 2026). Riwayat Transaksi menampilkan nilai teknis "VIRTUAL_ACCOUNT" dan teks kapital "BELUM DIBAYAR".',
    'Kesembilan tahap ditampilkan berurutan 1–9 (termasuk Verifikasi Anggota) dengan tanggal selesai atau keterangan "Sedang berjalan". Metode di Riwayat Transaksi menjadi "Virtual Account BRI" dan status memakai lencana "Belum dibayar"/"Lunas".',
    'H4 Consistency and Standards; H2 Match Between System and the Real World', 'Rendah', 'dev.eppat.id/dashboard; /riwayat-transaksi',
    'Nomor tahap selalu urut; tidak ada nilai teknis yang tampil ke pengguna.',
    'Nama tahap ke-4 ("Verifikasi Anggota") disimpulkan dari PDF hal. 10 dan dashboard operator; perlu dikonfirmasi tim.')
];
for (const x of baru) { const i = j.item.findIndex(y => y.kode === x.kode); if (i < 0) j.item.push(x); else j.item[i] = x; }
const r = { tanggal:T, kode:'HE-OB-01–05', perubahan:'Layar Dashboard (Onboarding) ditambahkan ke prototipe Onboarding dari bukti HE (Highlight #8) dan penelusuran live atas izin pengguna: akun uji onboarding-user-eppat@yopmail.com didaftarkan dengan data dummy, email diverifikasi, MFA Email OTP diaktifkan, paket Enterprise dipilih, dan VA BRI dibuat. Pembayaran yang dilakukan pengguna lewat simulator belum terdeteksi di dev ("Pembayaran belum terdeteksi"), sehingga tahap setelah lunas dibuat dari bukti HE. Registrasi dilengkapi info otomatis NIK, halaman "Cek Email Anda" + "Kirim Ulang Email", dan "Verifikasi Berhasil!" sesuai live.', berkas:'prototipe/Backlog-HE-ONBOARDING-Prototype.html; sumber/onboard-badan.html' };
if (!j.riwayat.some(x => x.kode === r.kode)) j.riwayat.push(r);
fs.writeFileSync('backlog-he.json', JSON.stringify(j, null, 2));
console.log(j.item.length, 'usulan,', j.riwayat.length, 'riwayat');
