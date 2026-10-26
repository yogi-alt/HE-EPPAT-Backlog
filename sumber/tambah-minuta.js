// Tambahkan usulan HE-MINUTA-01…06 + riwayat ke backlog-he.json (sekali jalan; aman diulang).
const fs = require('fs');
const j = JSON.parse(fs.readFileSync('backlog-he.json', 'utf8'));
const A = 'prototipe/Backlog-HE-MINUTA-Prototype.html › Daftar perubahan › ';
const T = '2026-10-23', F = 'Minuta Akta';
const baru = [
  { kode:'HE-MINUTA-01', judul:'Penjelasan singkat untuk istilah dan tombol',
    saat_ini:'Tombol Preview Akta, Cek Ejaan, dan Beritahu PPAT tanpa penjelasan; beda pasal dan catatan tidak dijelaskan; pesan peran hanya "Mode editor — Anda dapat mengubah konten pasal, tetapi tidak dapat memfinalisasi."; label "Tampilkan judul di dokumen (Preview, PDF)"; tab Lampiran nonaktif tanpa keterangan.',
    usulan:'Tooltip IDDS pada tiga tombol atas (fungsi tombol dalam satu kalimat). Keterangan di panel kiri: "Pasal diberi nomor otomatis sesuai urutan. Catatan adalah bagian tanpa nomor, seperti pembukaan, para pihak, dan penutup." Setiap item diberi keterangan kecil Pasal/Catatan. Pesan peran (IDDS Alert info): "Anda dapat menyunting isi pasal. Setelah selesai, klik Beritahu PPAT agar PPAT memeriksa dan memfinalisasi akta." Label kotak centang: "Tampilkan judul pasal di akta (berlaku untuk Preview dan PDF)". Tab Lampiran diberi ikon kunci + tooltip "Segera hadir".',
    prinsip:'H2 Match Between System and the Real World; H10 Help and Documentation', halaman:'25, 26', prioritas:'Sedang', layar:'Minuta › detail (kepala, panel kiri, editor)',
    selesai_bila:'Mengarahkan kursor ke Cek Ejaan menampilkan penjelasannya; panel kiri menjelaskan beda pasal dan catatan; pesan peran Asisten menyebut langkah Beritahu PPAT.' },
  { kode:'HE-MINUTA-02', judul:'Bilah alat editor lebih lega',
    saat_ini:'Lebih dari 30 ikon kecil dalam dua baris tanpa nama alat, sehingga editor terasa padat dan sulit dipindai.',
    usulan:'Satu baris alat yang sering dipakai, dikelompokkan dengan pemisah dan berjarak lega (tombol 34 px): Tebal, Miring, Garis bawah | Daftar bernomor, Daftar berpoin | Rata kiri, tengah, kanan, kanan-kiri | Urungkan, Ulangi. Di kanan: "Sisipkan Variabel" dan menu "Lainnya" (judul besar/kecil, coret, hapus format, warna & stabilo, ukuran huruf, spasi baris, tautan, gambar, tabel, sunting kode HTML, layar penuh). Setiap ikon punya tooltip nama alat + pintasan papan ketik. Tidak ada fitur live yang dihapus.',
    prinsip:'H8 Aesthetic and Minimalist Design; H6 Recognition rather than Recall', halaman:'25, 26', prioritas:'Sedang', layar:'Minuta › detail › tab Pasal (bilah alat)',
    selesai_bila:'Bilah alat tampil satu baris di desktop 1440 px; semua alat live tetap dapat dijangkau (langsung atau lewat Lainnya); setiap ikon punya tooltip dan aria-label.' },
  { kode:'HE-MINUTA-03', judul:'Variabel tampil sebagai label yang mudah dibaca',
    saat_ini:'Naskah menampilkan kode mentah seperti {{saksi1_gelar}}{{saksi1_nama}}; daftar variabel tanpa pencarian, penjelasan, atau contoh nilai; salah ketik variabel tidak terdeteksi di editor minuta sehingga baru ketahuan di PDF.',
    usulan:'Di editor, variabel tampil sebagai label hijau tak dapat disunting (mis. "Nama Lengkap Penjual"); kode asli disimpan sama seperti sekarang ({{penjual_nama}}) dan dapat dilihat lewat centang "Tampilkan kode variabel". "Sisipkan Variabel" membuka panel: penjelasan singkat, kotak cari, daftar per kelompok (Akta, PPAT, Penjual, Pembeli, Objek, Saksi) dengan label, kode, dan contoh nilai dari order ini. Variabel yang tidak dikenal tampil sebagai label kuning + IDDS Alert caution yang menyebut nama variabel dan saran penggantinya. Kursor yang jatuh di dalam label dipindahkan ke sesudah label.',
    prinsip:'H2 Match Between System and the Real World; H5 Error Prevention; H6 Recognition rather than Recall', halaman:'25, 26', prioritas:'Tinggi', layar:'Minuta › detail › tab Pasal (isi pasal)',
    selesai_bila:'Membuka catatan Para Pihak menampilkan label, bukan kode; mengetik "saksi" di panel variabel menyaring 6 opsi; variabel salah ketik ditandai kuning dengan peringatan; isi yang disimpan tetap memakai format {{kode}}.' },
  { kode:'HE-MINUTA-04', judul:'Umpan balik setelah hapus dan saat pindah pasal',
    saat_ini:'Setelah konfirmasi hapus, pasal hilang tanpa pesan. Peringatan perubahan belum disimpan memakai kotak dialog bawaan peramban ("Ada perubahan belum disimpan. Pindah tanpa menyimpan?"). Tidak ada penanda bahwa ada perubahan yang belum disimpan.',
    usulan:'Setelah hapus: IDDS Toast sukses "Pasal 8 dihapus." dengan keterangan "Nomor pasal lain sudah disesuaikan."; dialog konfirmasi menyebut bila nomor pasal sesudahnya akan bergeser. Saat pindah pasal, pindah tab, atau Kembali dengan perubahan belum disimpan: IDDS Modal "Simpan perubahan dulu?" dengan tombol Batal, Buang Perubahan, Simpan & Lanjutkan. Kaki editor menampilkan "Belum disimpan" / "Semua perubahan tersimpan"; tombol Batal dan Simpan nonaktif bila tidak ada perubahan.',
    prinsip:'H1 Visibility of System Status; H3 User Control and Freedom; H4 Consistency and Standards', halaman:'25, 27', prioritas:'Tinggi', layar:'Minuta › detail (panel kiri, kaki editor)',
    selesai_bila:'Menghapus pasal memunculkan toast berisi nama pasal; menyunting lalu memilih pasal lain memunculkan modal IDDS (bukan dialog peramban) dan "Simpan & Lanjutkan" menyimpan isinya.' },
  { kode:'HE-MINUTA-05', judul:'Pesan jelas saat Cek Ejaan belum dapat digunakan',
    saat_ini:'Teks abu-abu "input tidak valid: Gemini API Key belum diatur / fitur tidak aktif. Atur di Pengaturan Platform" tanpa warna peringatan dan dengan istilah teknis. Hasil cek ejaan berupa daftar sederhana.',
    usulan:'Saat fitur belum aktif: IDDS Alert critical (merah, ikon peringatan, tombol tutup) berjudul "Cek Ejaan belum dapat digunakan", isi: "Fitur pemeriksaan ejaan belum diaktifkan untuk kantor ini. Anda tetap dapat menyunting dan menyimpan pasal seperti biasa. Untuk mengaktifkannya, hubungi admin sistem (menu Pengaturan Platform)." Pesan teknis dari server tidak ditampilkan ke pengguna. Hasil cek: kartu dengan jumlah temuan, keterangan bahwa saran tidak mengubah teks otomatis, lalu per temuan: bagian akta, kata salah (dicoret merah) → saran (hijau), tautan "Buka pasal ini".',
    prinsip:'H9 Help Users Recognize, Diagnose, and Recover from Errors; H2 Match Between System and the Real World', halaman:'25, 27', prioritas:'Tinggi', layar:'Minuta › detail (di bawah pesan peran)',
    selesai_bila:'Dengan fitur nonaktif, klik Cek Ejaan menampilkan Alert merah tanpa kata "Gemini API Key"/"input tidak valid"; dengan fitur aktif, tiap temuan punya tautan ke pasalnya.',
    catatan:'Simulasi di protobar: Cek Ejaan Aktif / Belum diaktifkan. Pemetaan galat server → pesan ramah dilakukan di frontend.' },
  { kode:'HE-MINUTA-06', judul:'Pengaturan Dokumen otomatis mengikuti standar kantor',
    saat_ini:'Semua isian kertas, margin, huruf, dan footer langsung tampil sebagai formulir untuk setiap akta; variabel footer ditulis sebagai kode ({page}, {{ppat_nama}}, …) tanpa arti.',
    usulan:'Tab Pengaturan Dokumen dibuka sebagai ringkasan: lencana "Mengikuti standar akta PPAT" (atau "Diubah khusus untuk akta ini"), daftar Kertas/Margin/Huruf/Footer, dan gambar halaman mini dengan area tulis. Formulir baru terbuka lewat "Ubah untuk akta ini", dikelompokkan Kertas, Margin, Huruf, Footer, dengan satuan (cm/pt) di dalam isian. Tombol "Kembalikan ke standar" mengembalikan nilai standar. Kode footer ditampilkan bersama artinya (Nomor halaman · {page}, dst.) dengan tooltip.',
    prinsip:'H7 Flexibility and Efficiency of Use; H2 Match Between System and the Real World', halaman:'26', prioritas:'Sedang', layar:'Minuta › detail › tab Pengaturan Dokumen',
    selesai_bila:'Membuka tab menampilkan ringkasan tanpa formulir; mengubah margin kiri lalu menyimpan mengganti lencana menjadi "Diubah khusus untuk akta ini"; "Kembalikan ke standar" memulihkannya.',
    catatan:'Nilai standar diambil dari standar akta PPAT/Profil Kantor (perlu konfirmasi tim sumber datanya).' }
];
for (const b of baru) {
  const it = { kode:b.kode, fitur:F, judul:b.judul, saat_ini:b.saat_ini, usulan:b.usulan, prinsip:b.prinsip, halaman:b.halaman, prioritas:b.prioritas, layar:b.layar,
    acuan:A + b.kode, selesai_bila:b.selesai_bila, status:'Prototipe siap', catatan:b.catatan || '', tanggal:T };
  const i = j.item.findIndex(x => x.kode === b.kode);
  if (i >= 0) j.item[i] = it; else { const u = j.item.findIndex(x => x.kode === 'HE-UMUM-03'); j.item.splice(u < 0 ? j.item.length : u, 0, it); }
}
for (const k of ['HE-UMUM-01', 'HE-UMUM-02']) { const it = j.item.find(x => x.kode === k); if (it && !it.acuan.includes('MINUTA')) it.acuan += '; prototipe/Backlog-HE-MINUTA-Prototype.html'; }
const r = { tanggal:T, kode:'HE-MINUTA-01…06', perubahan:'Prototipe Drafting Minuta Akta (laporan HE hal. 25–27, peran Asisten) dibuat dengan IDDS + brand E-PPAT: 6 usulan baru HE-MINUTA-01…06; Bantuan halaman (HE-UMUM-02) dan komponen IDDS (HE-UMUM-01) diterapkan juga di Minuta.', berkas:'prototipe/Backlog-HE-MINUTA-Prototype.html; sumber/minuta-idds.html; prototipe/index.html' };
if (!j.riwayat.some(x => x.kode === r.kode)) j.riwayat.push(r);
fs.writeFileSync('backlog-he.json', JSON.stringify(j, null, 2));
console.log(j.item.length, 'usulan,', j.riwayat.length, 'riwayat');
