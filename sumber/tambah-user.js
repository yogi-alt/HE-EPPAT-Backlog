// Tambah usulan Daftar User HE-USER-01…04, perbarui HE-UMUM-03 (kini berprototipe). node tambah-user.js
const fs = require('fs');
const j = JSON.parse(fs.readFileSync('backlog-he.json', 'utf8'));
const T = '2026-10-26', F = 'Daftar User (Super Admin)', ACU = k => `prototipe/Backlog-HE-USER-Prototype.html › Daftar perubahan › ${k}`;
const H = 'UX Metric Lab, Highlight #9 (skor 79,5; PDF hal. 15)';
const it = (kode, judul, saat_ini, usulan, prinsip, prioritas, layar, selesai_bila, catatan = '') =>
  ({ kode, fitur:F, judul, saat_ini, usulan, prinsip, halaman:H, prioritas, layar, acuan:ACU(kode), selesai_bila, status:'Prototipe siap', catatan, tanggal:T });
const baru = [
  it('HE-USER-01', 'Status CA dijelaskan',
    'Kolom "Status CA" dan lencananya (Belum registrasi, Proses eKYC, Menunggu verifikasi, CA aktif, Kedaluwarsa, Dicabut) tidak dijelaskan.',
    'IDDS Tooltip pada judul kolom Status CA (arti sertifikat elektronik dan kegunaannya) dan pada setiap lencana (arti status dan langkah berikutnya, mis. "Proses eKYC: user sedang memverifikasi identitas di portal Peruri. Belum dapat menandatangani.").',
    'H2 Match Between System and the Real World; H10 Help and Documentation', 'Rendah', 'System › Daftar User › kolom Status CA',
    'Setiap lencana Status CA memiliki penjelasan yang muncul saat diarahkan atau difokus.'),
  it('HE-USER-02', 'Pilih beberapa user dan ubah statusnya sekaligus',
    'Status user hanya bisa diubah satu per satu melalui menu aksi di setiap baris.',
    'IDDS Checkbox di setiap baris dan "pilih semua" di judul tabel. Bilah aksi menampilkan jumlah user terpilih dengan tombol Aktifkan, Tangguhkan, dan Batalkan pilihan. IDDS Modal Confirmation menyebut nama-nama yang akan diubah dan user yang dilewati karena statusnya sudah sesuai.',
    'H7 Flexibility and Efficiency of Use', 'Sedang', 'System › Daftar User',
    'Admin dapat menangguhkan atau mengaktifkan beberapa user dalam satu konfirmasi; user yang statusnya sudah sesuai tidak diubah dan disebutkan.'),
  it('HE-USER-03', 'Syarat password awal sama dengan aturan password lain',
    'Password Awal cukup "Minimal 8 karakter", padahal Reset Password membuat password acak 12 karakter dan layar ganti password sementara meminta 12 karakter + huruf besar, huruf kecil, angka, simbol.',
    'IDDS Password Input dengan tombol tampilkan/sembunyikan dan daftar centang yang sama dengan Akun Saya (HE-CA-08): minimal 12 karakter, huruf besar, huruf kecil, angka, simbol. Tombol "Buat Password Acak" mengisi password yang memenuhi semua syarat. Email yang sudah terdaftar ditolak di bawah isian.',
    'H4 Consistency and Standards; H5 Error Prevention', 'Sedang', 'System › Daftar User › Tambah User',
    'Password awal yang tidak memenuhi 12 karakter + 4 jenis karakter ditolak di formulir dan di server.',
    'Syarat yang sama juga berlaku di Registrasi (Onboarding); belum diprototipekan.'),
  it('HE-USER-04', 'Menu aksi dan pesan hasil yang jelas',
    'Tombol aksi di setiap baris hanya ikon daftar tanpa label. Pesan "User berhasil dibuat." muncul sebagai kotak di atas tabel dan hilang sendiri setelah 3 detik.',
    'IDDS Action Dropdown dengan label "Aksi untuk [nama]" untuk pembaca layar dan tooltip "Aksi". Pesan hasil memakai IDDS Toast yang dapat ditutup, disertai keterangan (mis. user dapat masuk dengan email dan password awal), dan baris yang berubah disorot sesaat.',
    'H1 Visibility of System Status; H4 Consistency and Standards', 'Rendah', 'System › Daftar User',
    'Tombol aksi terbaca oleh pembaca layar; setelah membuat atau mengubah user, baris terkait terlihat disorot.')
];
for (const x of baru) { const i = j.item.findIndex(y => y.kode === x.kode); if (i < 0) j.item.push(x); else j.item[i] = x; }
const u3 = j.item.find(x => x.kode === 'HE-UMUM-03');
Object.assign(u3, { usulan:'Tombol "Impor dari Berkas" di Daftar User membuka dialog tiga langkah: unduh templat CSV, unggah berkas (IDDS File Upload, CSV/Excel maks. 500 baris), lalu pratinjau. Baris bermasalah ditandai beserta alasannya (nama kosong, format email tidak valid, email sudah terdaftar) dan tidak ikut disimpan. User hasil impor berperan Klien dan menerima password sementara melalui email; klien hasil impor langsung dapat dipilih sebagai pihak di Order AJB.',
  acuan:ACU('HE-UMUM-03'), selesai_bila:'Berkas berisi baris valid dan bermasalah menghasilkan pratinjau per baris; hanya baris valid yang disimpan dan jumlahnya dilaporkan.', status:'Prototipe siap', tanggal:T });
const r = { tanggal:T, kode:'HE-USER-01–04, HE-UMUM-03', perubahan:'Prototipe Daftar User dibuat dari laporan lengkap HE di UX Metric Lab (Highlight #9, skor 79,5) beserta gambar buktinya dan kode live (daftar, saringan, menu aksi, Tambah/Ubah User, Reset Password, Tangguhkan/Aktifkan). Data contoh sama dengan prototipe lain. HE-UMUM-03 (impor berkas) kini berprototipe. Warna pesan galat Password Input dipertegas di eppat.css karena selektor IDDS lebih spesifik (kontras 4,1:1 → lulus). Data Verifikasi diselaraskan: pembeli ber-CA diproses kini Contoh Pembeli Tiga. Sidebar semua prototipe kantor menautkan Daftar User.', berkas:'prototipe/Backlog-HE-USER-Prototype.html; sumber/user-badan.html; brand-eppat-idds/eppat.css' };
if (!j.riwayat.some(x => x.kode === r.kode)) j.riwayat.push(r);
fs.writeFileSync('backlog-he.json', JSON.stringify(j, null, 2));
console.log(j.item.length, 'usulan,', j.riwayat.length, 'riwayat');
