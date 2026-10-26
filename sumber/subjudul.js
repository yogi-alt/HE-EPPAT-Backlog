// Informasi di bawah judul halaman (subjudul): satu kalimat SPOK yang menyebut apa yang dapat dilakukan user di halaman itu, diakhiri titik.
// Berlaku untuk semua prototipe kantor (tab Dari HE + Penyesuaian IDDS Tenant). node subjudul.js [berkas…]  (tanpa argumen = semua)
const fs = require('fs');
const S = (lama, baru) => [`<p class="sub">${lama}</p>`, `<p class="sub">${baru}</p>`];
const PETA = {
  'tera-idds.html':[S('Dasbor admin', 'Pantau jumlah user, aktivitas terbaru, dan pengingat penting kantor Anda.'),
    S('Kelola data diri &amp; keamanan akun Anda', 'Kelola data diri, keamanan akun, dan pendaftaran stempel elektronik (TERA) kantor.')],
  'tn-system-badan.html':[S('Dasbor admin', 'Pantau jumlah user, aktivitas terbaru, dan pengingat penting kantor Anda.'),
    S('Atur hak akses setiap peran per modul', 'Atur menu dan tindakan yang boleh dilakukan setiap peran.'),
    S('Preferensi umum aplikasi', 'Atur identitas aplikasi, zona waktu, pendaftaran mandiri, dan mode pemeliharaan.'),
    S('Riwayat aktivitas user di kantor Anda', 'Telusuri riwayat aktivitas user di kantor Anda.')],
  'user-badan.html':[S('Kelola user sistem', 'Kelola akun pegawai kantor dan klien: tambah user, ubah peran, dan atur status akun.')],
  'order-idds.html':[S('Akta Jual Beli', 'Kelola permintaan Akta Jual Beli, mulai dari pengajuan klien sampai akta selesai.')],
  'verif-badan.html':[S('Order siap diverifikasi sebelum drafting — para pihak, objek tanah, dan harga.', 'Pilih order berstatus Siap untuk memeriksa data para pihak, objek tanah, dan harga sebelum minuta disusun.'),
    S('Periksa &amp; setujui draf akta', 'Periksa data para pihak, objek tanah, dan harga, lalu tandai setiap bagian yang sudah sesuai.')],
  'minuta-badan.html':[S('Drafting &amp; naskah minuta akta', 'Susun naskah minuta akta dari order yang sudah diverifikasi.')],
  'eaw-badan.html':[S('Bubuhkan stempel TERA, tanda tangan elektronik, dan e-meterai pada akta final${usulan(\'HE-EAW-02\')}', 'Bubuhkan stempel TERA, tanda tangan elektronik, dan e-Meterai pada akta final.${usulan(\'HE-EAW-02\')}'),
    S('Bubuhkan stempel TERA, tanda tangan elektronik, dan e-meterai pada akta final', 'Bubuhkan stempel TERA, tanda tangan elektronik, dan e-Meterai pada akta final.')],
  'eawk-badan.html':[S('Tanda tangan elektronik akta Anda', 'Periksa akta Anda, lalu tanda tangani secara elektronik saat giliran Anda tiba.')],
  'ca-badan.html':[S('Tanda tangan elektronik akta Anda', 'Periksa akta Anda, lalu tanda tangani secara elektronik saat giliran Anda tiba.'),
    S('Kelola data diri &amp; keamanan akun Anda', 'Kelola data diri, keamanan akun, dan sertifikat elektronik (CA) Anda.')],
  'tn-cms-badan.html':[S('Susun tata letak halaman publik kantor', 'Susun dan tayangkan halaman publik kantor Anda.'),
    S('Penyusun tata letak${landing ? \'\' : \' halaman\'}', 'Susun blok halaman, lalu simpan tata letaknya.'),
    S('Atur warna brand, logo, dan gaya komponen aplikasi', 'Atur warna, logo, dan gaya tampilan aplikasi kantor.'),
    S('Slider, menu, dan footer untuk halaman publik', 'Kelola slider, menu, dan footer yang dipakai di halaman publik.'),
    S('Artikel, berita, dan halaman statis', 'Tulis dan terbitkan artikel, berita, serta halaman statis.'),
    S('Unggah dan kelola gambar serta dokumen', 'Unggah dan kelola gambar serta dokumen untuk situs kantor.')],
  'tn-eppat-badan.html':[S('Ringkasan order, verifikasi, dan pembuatan akta', 'Pantau jumlah order per status dan order yang perlu ditindaklanjuti.'),
    S('Identitas kantor untuk kop dan variabel akta', 'Lengkapi identitas kantor yang dipakai pada kop dan isi akta.'),
    S('Cetak dan kelola salinan akta', 'Cetak, unggah, dan kirim salinan akta yang sudah selesai.'),
    S('Daftarkan email akun e-Meterai Peruri', 'Simpan email akun e-Meterai Peruri agar meterai dapat dibubuhkan pada akta.')]
};
const pilih = process.argv.slice(2);
for (const [f, daftar] of Object.entries(PETA)) {
  if (pilih.length && !pilih.includes(f)) continue;
  let t = fs.readFileSync(f, 'utf8'), n = 0;
  for (const [a, b] of daftar) { const k = t.split(a).length - 1; if (k) { t = t.split(a).join(b); n += k; } }
  fs.writeFileSync(f, t);
  const sisa = daftar.filter(([a]) => t.includes(a)).length;
  console.log(`${n ? 'OK ' : '-- '}${f}: ${n} diganti${sisa ? `, ${sisa} pola masih ada` : ''}`);
}
