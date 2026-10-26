// Tambah usulan Verifikasi Akta HE-VERIF-01…05 ke backlog-he.json. node tambah-verif.js
const fs = require('fs');
const j = JSON.parse(fs.readFileSync('backlog-he.json', 'utf8'));
const T = '2026-10-26', F = 'Verifikasi Akta (Asisten/PPAT)', ACU = k => `prototipe/Backlog-HE-VERIF-Prototype.html › Daftar perubahan › ${k}`;
const H = 'UX Metric Lab, Highlight #5 (skor 54,5; PDF hal. 15)';
const it = (kode, judul, saat_ini, usulan, prinsip, prioritas, layar, selesai_bila, catatan = '') =>
  ({ kode, fitur:F, judul, saat_ini, usulan, prinsip, halaman:H, prioritas, layar, acuan:ACU(kode), selesai_bila, status:'Prototipe siap', catatan, tanggal:T });
const baru = [
  it('HE-VERIF-01', 'Istilah CA dijelaskan dan status ditulis dalam bahasa Indonesia',
    'Istilah "CA" muncul berulang kali tanpa penjelasan (skor H2 halaman: 40). Lencana "✓ Verified" (bahasa Inggris) dan "CA Kadaluarsa" (salah eja); status tab hanya simbol ✓, !, •. Pihak yang belum terverifikasi hanya diberi keterangan "CA belum aktif" tanpa langkah perbaikan.',
    'IDDS Tooltip untuk CA, NJOP, NIB, dan verifikasi manual. "Verified" → "Terverifikasi", "CA Kadaluarsa" → "CA Kedaluwarsa". Simbol tab diganti lencana bertulisan (Terverifikasi, Perlu dicek, Belum diverifikasi). Pihak yang belum terverifikasi diberi garis kuning dan satu kalimat solusi sesuai status CA (diproses, kedaluwarsa, dicabut, belum ada, tanpa akun).',
    'H2 Match Between System and the Real World; H4 Consistency and Standards; H9 Help Users Recognize, Diagnose, and Recover from Errors', 'Sedang', 'Verifikasi › tab Para Pihak; tab',
    'Tidak ada teks berbahasa Inggris atau simbol tanpa teks pada status; setiap pihak yang belum terverifikasi menampilkan langkah perbaikannya.'),
  it('HE-VERIF-02', 'Lama menunggu dan dampaknya terlihat',
    'Tidak ada informasi urgensi atau tenggat. Daftar hanya menampilkan tanggal order dibuat; halaman detail tidak menjelaskan akibat bila verifikasi belum selesai.',
    'Kolom "Menunggu" di daftar (lama sejak order berstatus Siap, plus tanggalnya); lencana kuning "Lewat 3 hari" untuk order yang melewati batas; urutan bawaan paling lama menunggu. IDDS Alert di detail menyebut sejak kapan order menunggu dan bahwa drafting baru dapat dimulai setelah ketiga verifikasi selesai.',
    'H1 Visibility of System Status', 'Sedang', 'Verifikasi › daftar; detail',
    'Order yang menunggu lebih dari batas hari terlihat di daftar tanpa membuka detail.',
    'Batas 3 hari adalah angka contoh; perlu ketentuan resmi kantor/tim. Perlu data tanggal order berpindah ke status Siap.'),
  it('HE-VERIF-03', 'Konfirmasi dan pemeriksaan isian sebelum verifikasi disimpan',
    'Tombol "Tandai Terverifikasi" dan "Simpan & Verifikasi" langsung mengubah status tanpa konfirmasi (skor H6 halaman: 0). NJOP kosong hanya memunculkan toast "Isi NJOP/m² dan luas tanah dulu."; harga jual di bawah NJOP hanya diberi teks kecil "⚠ … periksa" dan tetap bisa disimpan tanpa catatan.',
    'IDDS Modal Confirmation berisi ringkasan untuk objek tanah (dengan daftar periksa dan centang wajib: sertifikat asli, tidak ada blokir/sengketa, luas dan lokasi sesuai), harga tanah, dan verifikasi manual pihak tanpa akun. Isian NJOP dan luas yang kosong ditandai galat di bawah isian. Harga jual di bawah NJOP ditampilkan dengan IDDS Alert caution dan catatan alasan menjadi wajib. NJOP diberi terbilang.',
    'H6 Error Prevention; H9 Help Users Recognize, Diagnose, and Recover from Errors', 'Tinggi', 'Verifikasi › tab Objek Tanah; tab Harga Tanah; tab Para Pihak',
    'Tidak ada status verifikasi yang berubah tanpa dialog konfirmasi; harga di bawah NJOP tidak dapat diverifikasi tanpa catatan alasan.'),
  it('HE-VERIF-04', 'Cari, saring, dan urutkan daftar verifikasi',
    'Daftar hanya memiliki kolom pencarian kode/klien tanpa saringan status atau urutan.',
    'IDDS Input Search (kode, klien) + IDDS Button Group saringan kemajuan beserta jumlahnya (Semua, Belum dimulai, Sebagian, Lengkap) + IDDS Select Dropdown urutan (Paling lama menunggu, Terbaru masuk). Hasil kosong menampilkan tombol "Hapus pencarian dan saringan".',
    'H7 Flexibility and Efficiency of Use', 'Rendah', 'Verifikasi › daftar',
    'Pengguna dapat menampilkan hanya order yang belum dimulai atau yang sebagian, dan mengurutkan berdasarkan lama menunggu.'),
  it('HE-VERIF-05', 'Navigasi detail konsisten dan langkah berikutnya jelas',
    'Judul "Verifikasi Akta" muncul dua kali di daftar. Letak tombol Kembali berbeda dengan halaman lain (bukti HE). Tab buatan sendiri dengan simbol; setelah verifikasi hanya muncul toast tanpa arahan ke bagian berikutnya atau ke tahap drafting.',
    'Judul ganda dihapus. Tombol Kembali dan identitas order memakai pola yang sama dengan halaman detail lain (E-Akta Wizard). IDDS Tab Horizontal full-width dengan lencana status; detail membuka tab pertama yang belum selesai. Setelah satu bagian terverifikasi, tab berpindah otomatis dan toast menyebut bagian berikutnya. Setelah ketiganya selesai, IDDS Alert success "Ketiga verifikasi selesai" dengan tombol "Buka Order AJB" untuk memindahkan status ke Drafting (selaras HE-ORDER-08).',
    'H4 Consistency and Standards; H1 Visibility of System Status', 'Sedang', 'Verifikasi › detail',
    'Setelah verifikasi ketiga, pengguna langsung melihat bahwa order siap drafting dan dapat membuka Order AJB dari halaman itu.')
];
for (const x of baru) { const i = j.item.findIndex(y => y.kode === x.kode); if (i < 0) j.item.push(x); else j.item[i] = x; }
const r = { tanggal:T, kode:'HE-VERIF-01–05', perubahan:'Prototipe Verifikasi Akta dibuat dari laporan lengkap HE di UX Metric Lab (Highlight #5, skor 54,5) beserta gambar buktinya, serta kode dan layar live akun Asisten (daftar, tab Para Pihak/Objek Tanah/Harga Tanah, isian, tombol, dan pesan). Data contoh sama dengan prototipe Order AJB (ORD-CONTOH-003 berstatus Siap dengan verifikasi para pihak selesai). Bantuan halaman (HE-UMUM-02) dan IDDS (HE-UMUM-01) ikut diterapkan.', berkas:'prototipe/Backlog-HE-VERIF-Prototype.html; sumber/verif-badan.html' };
if (!j.riwayat.some(x => x.kode === r.kode)) j.riwayat.push(r);
fs.writeFileSync('backlog-he.json', JSON.stringify(j, null, 2));
console.log(j.item.length, 'usulan,', j.riwayat.length, 'riwayat');
