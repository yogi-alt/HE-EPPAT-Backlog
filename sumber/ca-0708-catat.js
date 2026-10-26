// Catat HE-CA-07/08 (tab Data Diri, Akun, Keamanan, syarat password seragam) + riwayat kartu kantor & kontras ke backlog-he.json. node ca-0708-catat.js
const fs = require('fs');
const j = JSON.parse(fs.readFileSync('backlog-he.json', 'utf8'));
const T = '2026-10-26', ACU = k => `prototipe/Backlog-HE-CA-Prototype.html › Daftar perubahan › ${k}`;
const baru = [
  { kode:'HE-CA-07', fitur:'Registrasi CA (Klien)', judul:'Tab Data Diri: satu tempat untuk semua data, berkelompok seperti KTP',
    saat_ini:'Tab Data Diri berisi 17 isian dalam satu daftar panjang tanpa pengelompokan dan tanpa penanda isian wajib. Nomor HP ada di tab Akun, sehingga data untuk registrasi CA tersebar di dua tab. Perubahan bisa hilang saat pindah tab tanpa peringatan. Beda "Kota Domisili" dan "Domisili Sementara" tidak dijelaskan.',
    usulan:'Semua data untuk akta dan registrasi CA diisi di tab Data Diri (KTP), termasuk nomor HP; tab Akun hanya menampilkannya. Isian dikelompokkan: Identitas sesuai KTP, Alamat sesuai KTP, Kontak dan domisili, Foto KTP (IDDS File Upload), masing-masing dengan satu kalimat penjelasan. Isian wajib bertanda *, isian lain bertanda "(opsional)". Alert di atas formulir menampilkan "n dari 6 isian wajib terisi" dan tombol "Ke isian berikutnya"; isian kosong ditandai IDDS status warning. NIK mengisi tanggal lahir dan jenis kelamin otomatis. Kaki formulir menampilkan "Belum disimpan" / "Semua perubahan tersimpan"; pindah tab sebelum disimpan memunculkan konfirmasi. Tombol "Lengkapi data" di Registrasi CA membuka tab ini dan memfokuskan isian kosong pertama (panel samping dihapus agar data tidak diisi dua kali).',
    prinsip:'H6 Recognition Rather Than Recall; H5 Error Prevention; H8 Aesthetic and Minimalist Design', halaman:'34–35', prioritas:'Tinggi',
    layar:'Akun Saya › tab Data Diri (KTP)', acuan:ACU('HE-CA-07'),
    selesai_bila:'Semua isian syarat CA (NIK, tempat lahir, tanggal lahir, alamat, foto KTP, nomor HP) dapat diisi di tab Data Diri tanpa membuka tab lain; isian wajib bertanda *; berpindah tab dengan perubahan belum disimpan memunculkan konfirmasi.',
    status:'Prototipe siap', catatan:'', tanggal:T },
  { kode:'HE-CA-08', fitur:'Registrasi CA (Klien)', judul:'Tab Akun dan Keamanan seragam, berbahasa Indonesia, dan aman dipakai',
    saat_ini:'Bahasa bercampur Inggris ("device", "di-logout", "login", "Logout Semua", "Sesi ini"). Pola kartu tiap tab berbeda. ID akun teknis ditampilkan tanpa keterangan. Syarat password tidak seragam: layar ganti password sementara meminta minimal 12 karakter + huruf besar, huruf kecil, angka, simbol, sedangkan tab Keamanan, Tambah User, dan Registrasi hanya meminta minimal 8 karakter.',
    usulan:'Keempat tab Akun Saya memakai pola kartu yang sama (ikon, judul, satu kalimat keterangan, tombol di kaki). Tab Akun: nama diubah lewat "Ubah Nama" dengan status simpan dan konfirmasi pindah tab; nomor HP ditautkan ke tab Data Diri; peran dijelaskan dengan tooltip; ID akun diberi keterangan kegunaannya. Tab Keamanan: IDDS Password Input dengan tombol tampilkan/sembunyikan; syarat password satu standar di seluruh aplikasi (minimal 12 karakter, huruf besar, huruf kecil, angka, simbol) berupa daftar centang yang terisi saat mengetik; tombol Ganti Password aktif hanya bila semua syarat dan ulangan sesuai; pesan "password saat ini tidak sesuai" di bawah isian. Bagian sesi menjadi "Perangkat yang sedang masuk" dengan label "Perangkat ini" dan konfirmasi sebelum mengeluarkan perangkat.',
    prinsip:'H4 Consistency and Standards; H2 Match Between System and the Real World; H5 Error Prevention', halaman:'34–35', prioritas:'Sedang',
    layar:'Akun Saya › tab Akun; tab Keamanan', acuan:ACU('HE-CA-08'),
    selesai_bila:'Tidak ada lagi kata Inggris di tab Akun dan Keamanan; syarat password di tab Keamanan, ganti password sementara, Tambah User (Password Awal), dan Registrasi sama persis (12 karakter + 4 jenis karakter) dan diperiksa juga di server.',
    status:'Prototipe siap', catatan:'Syarat password juga berlaku untuk Daftar User › Tambah User (Password Awal) dan halaman Registrasi; belum dibuat prototipenya.', tanggal:T }
];
for (const b of baru) { const i = j.item.findIndex(x => x.kode === b.kode); if (i < 0) { const u = j.item.findIndex(x => x.kode === 'HE-UMUM-03'); j.item.splice(u < 0 ? j.item.length : u, 0, b); } else j.item[i] = b; }
const rw = [
  { tanggal:T, kode:'HE-CA-07', perubahan:'Tab Data Diri menjadi satu-satunya tempat mengisi data CA (nomor HP dipindah dari tab Akun); isian dikelompokkan seperti KTP, penanda wajib/opsional, alert "n dari 6 isian wajib terisi", jaga perubahan belum disimpan. Panel samping "Lengkapi data" dihapus dan diganti pengalihan langsung ke tab Data Diri.', berkas:'prototipe/Backlog-HE-CA-Prototype.html; sumber/ca-badan.html' },
  { tanggal:T, kode:'HE-CA-08', perubahan:'Tab Akun dan Keamanan diseragamkan (pola kartu, bahasa Indonesia, IDDS Password Input). Syarat password diseragamkan dengan layar ganti password sementara live: minimal 12 karakter + huruf besar, huruf kecil, angka, simbol, berupa daftar centang.', berkas:'prototipe/Backlog-HE-CA-Prototype.html; sumber/ca-badan.html' },
  { tanggal:T, kode:'HE-UMUM-01', perubahan:'Kontras teks IDDS diperbaiki di mode brand (brand-eppat-idds/eppat.css): teks galat memakai negative-600, teks bantuan peringatan memakai warning-600, tanda * wajib memakai negative-600 — semua lulus WCAG 4,5:1.', berkas:'brand-eppat-idds/eppat.css; semua prototipe' },
  { tanggal:T, kode:'HE-UMUM-01', perubahan:'Kartu kantor di sidebar disamakan dengan live di semua prototipe (TERA, Order AJB, Minuta, E-Akta Wizard, Registrasi CA): tiap baris berikon (SK, wilayah, telepon) dan baris alamat ditambahkan.', berkas:'semua prototipe; sumber/kartu-kantor-live.js' }
];
for (const r of rw) if (!j.riwayat.some(x => x.perubahan === r.perubahan)) j.riwayat.push(r);
fs.writeFileSync('backlog-he.json', JSON.stringify(j, null, 2));
console.log(j.item.length, 'usulan,', j.riwayat.length, 'riwayat');
