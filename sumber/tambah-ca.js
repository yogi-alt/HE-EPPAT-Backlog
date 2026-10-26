// Tambahkan usulan HE-CA-01…06 + riwayat ke backlog-he.json (aman diulang).
const fs = require('fs');
const j = JSON.parse(fs.readFileSync('backlog-he.json', 'utf8'));
const A = 'prototipe/Backlog-HE-CA-Prototype.html › Daftar perubahan › ';
const T = '2026-10-26', F = 'Registrasi CA (Klien)';
const baru = [
  { kode:'HE-CA-01', judul:'Tahapan registrasi dan perkiraan waktu terlihat',
    saat_ini:'Hanya lencana status ("Belum Registrasi", "Sedang Diproses") dan paragraf panjang; tidak ada estimasi waktu; tombol Lanjutkan eKYC, Buat Ulang Link, dan Cek Status CA sejajar tanpa penanda aksi yang perlu dilakukan.',
    usulan:'IDDS Stepper 4 langkah di kartu Sertifikat Elektronik: (1) Lengkapi data diri, (2) Ajukan ke Peruri, (3) Verifikasi identitas (eKYC) — OTP dan swafoto ± 5 menit, (4) Pemeriksaan Peruri ± 1 hari kerja; tiap langkah berstatus. Di bawahnya IDDS Alert "Langkah berikutnya: …" dengan satu tombol sesuai status (Lengkapi data / Ajukan Registrasi CA / Lanjutkan eKYC di Peruri / Registrasi Ulang). Saat diperiksa Peruri: perkiraan waktu dan pemberitahuan bahwa pengguna akan diberi tahu lewat notifikasi dan email.',
    prinsip:'H1 Visibility of System Status; H8 Aesthetic and Minimalist Design', halaman:'34, 35', prioritas:'Tinggi', layar:'Akun Saya › tab Registrasi CA',
    selesai_bila:'Pada status menunggu eKYC, stepper menunjukkan langkah 3 aktif dengan perkiraan waktu, dan hanya ada satu tombol utama "Lanjutkan eKYC di Peruri".',
    catatan:'Perkiraan waktu (± 5 menit, ± 1 hari kerja) adalah contoh — perlu angka resmi dari tim/Peruri. Notifikasi saat CA aktif perlu konfirmasi tim teknis.' },
  { kode:'HE-CA-02', judul:'Data diri cukup diisi sekali',
    saat_ini:'Kekurangan data tampil di kotak kuning dengan tautan ke tab Data Diri (KTP) dan tab Akun; pengguna berpindah tab lalu kembali. Pengguna tidak tahu data apa yang sudah dikirim ke Peruri. Penelusuran live (akun uji yopmail): dialog "Lengkapi Data Diri" saat masuk menyebut NIK, tempat lahir, tanggal lahir, alamat, sedangkan syarat CA adalah NIK, tempat lahir, tanggal lahir, foto KTP, nomor HP.',
    usulan:'Daftar "Kelengkapan data diri" (5 butir dengan status) dan tombol "Lengkapi data" yang membuka IDDS Drawer berisi hanya isian yang kurang — tanpa pindah tab; data tersimpan juga di tab Data Diri (KTP). Saat siap diajukan, tampil "Data yang otomatis dikirim ke Peruri" (NIK tersamar) dan kalimat "Di portal Peruri Anda hanya perlu memasukkan kode OTP dan mengambil swafoto." Konfirmasi pengajuan (IDDS Modal Confirmation) berisi ringkasan data + centang "Data di atas sesuai dengan KTP saya." Dialog pengingat saat masuk memakai daftar yang sama.',
    prinsip:'H7 Flexibility and Efficiency of Use; H2 Match Between System and the Real World; H4 Consistency and Standards', halaman:'34, 35 (+ penelusuran live)', prioritas:'Tinggi', layar:'Akun Saya › tab Registrasi CA; dialog pengingat saat masuk',
    selesai_bila:'Pengguna dengan data kurang dapat melengkapi semua syarat CA dari tab Registrasi CA tanpa membuka tab lain; daftar kekurangan di dialog pengingat sama dengan syarat CA.' },
  { kode:'HE-CA-03', judul:'Istilah CA, eKYC, dan swafoto dijelaskan',
    saat_ini:'Istilah CA dan eKYC tidak dijelaskan di tempat munculnya; penjelasan CA berupa teks kecil di bawah kartu; teks memakai "OTP & liveness".',
    usulan:'Istilah teknis bergaris putus-putus dengan IDDS Tooltip (CA, eKYC, swafoto, spesimen). "Liveness" diganti "swafoto". Penjelasan CA menjadi satu kalimat di kepala kartu: "Sertifikat ini diterbitkan Peruri dan diperlukan untuk menandatangani akta secara elektronik."',
    prinsip:'H2 Match Between System and the Real World; H10 Help and Documentation', halaman:'34', prioritas:'Sedang', layar:'Akun Saya › tab Registrasi CA',
    selesai_bila:'Mengarahkan kursor ke "eKYC" menampilkan penjelasan; tidak ada kata "liveness" di layar.' },
  { kode:'HE-CA-04', judul:'Banner pengingat langsung ke tab Registrasi CA',
    saat_ini:'Tombol "Registrasi CA" dan "Cek / Lanjutkan" pada banner membuka tab Akun; tombol "Lengkapi Sekarang" pada dialog pengingat juga membuka tab Akun, bukan Data Diri (terbukti di live 26 Okt 2026). Setelah banner ditutup, tidak ada jalan pintas yang terlihat.',
    usulan:'Tombol banner "Buka Registrasi CA" membuka Akun Saya langsung di tab Registrasi CA; teks banner mengikuti status (belum terdaftar, menunggu eKYC, diperiksa Peruri, kedaluwarsa). Saat banner ditutup muncul toast "Registrasi CA tetap dapat dibuka dari menu profil di kanan atas"; menu profil (IDDS Action Dropdown) berisi "Registrasi CA" dengan lencana status.',
    prinsip:'H7 Flexibility and Efficiency of Use; H6 Recognition rather than Recall', halaman:'34', prioritas:'Tinggi', layar:'Banner CA (E-Akta Wizard, Minuta, dll.); menu profil',
    selesai_bila:'Klik tombol banner membuka tab Registrasi CA; setelah banner ditutup, Registrasi CA dapat dibuka dari menu profil.' },
  { kode:'HE-CA-05', judul:'Satu pesan per status, bahasa baku, hasil cek status terlihat',
    saat_ini:'Akun berstatus "Sedang Diproses" masih menampilkan "Registrasi CA belum bisa dibuat — lengkapi Data Diri dulu … Masih kurang: Foto KTP, Nomor HP" (penelusuran live). Catatan Peruri berbahasa Inggris ("Success", "Waiting for Verification"). Label "Kadaluarsa", "Specimen", tombol "Buat Ulang Link".',
    usulan:'Setiap status hanya menampilkan pesan yang relevan; catatan Peruri diterjemahkan; ejaan baku (Kedaluwarsa, Spesimen, tautan — "Buat tautan baru"); masa berlaku tautan eKYC ditulis ("Tautan berlaku sampai …"); hasil "Cek Status CA" tampil di samping tombol beserta waktu ("Status belum berubah: menunggu verifikasi Peruri · dicek 10.32").',
    prinsip:'H1 Visibility of System Status; H4 Consistency and Standards; H2 Match Between System and the Real World', halaman:'34, 35 (+ penelusuran live)', prioritas:'Sedang', layar:'Akun Saya › tab Registrasi CA',
    selesai_bila:'Akun berstatus menunggu eKYC/diperiksa tidak menampilkan daftar "masih kurang"; menekan Cek Status CA menampilkan hasil dan jam pengecekan; tidak ada kata "Kadaluarsa", "Specimen", atau "link".' },
  { kode:'HE-CA-06', judul:'Pesan galat data diri jelas dan muncul di dekat isian',
    saat_ini:'Gambar bukti HE: "update telepon: nomor HP sudah dipakai akun lain di PPAT ini" tampil di atas halaman dengan awalan teknis; pesan resolusi foto KTP muncul sebagai toast yang hilang sendiri (skor H9 Registrasi CA: 0).',
    usulan:'Galat tampil di bawah isian terkait (IDDS Text Field error) dan hilang saat diperbaiki: NIK 16 digit, usia minimal 17 tahun, format nomor HP, nomor HP sudah dipakai ("Nomor HP ini sudah dipakai akun lain di kantor ini. Gunakan nomor lain atau hubungi kantor PPAT."). Foto KTP memakai IDDS File Upload; foto beresolusi rendah ditandai merah di daftar berkas: "Foto terlalu kecil (511 × 511 piksel), sehingga tulisan pada KTP sulit terbaca. Pilih foto dengan sisi terpanjang minimal 600 piksel."',
    prinsip:'H9 Help Users Recognize, Diagnose, and Recover from Errors; H5 Error Prevention', halaman:'35 (bukti UX Metric Lab)', prioritas:'Sedang', layar:'Panel Lengkapi data diri; tab Data Diri (KTP); tab Akun',
    selesai_bila:'Mengunggah foto 511 × 511 piksel menampilkan pesan di bawah berkas (bukan toast); memasukkan nomor HP yang sudah dipakai menampilkan pesan tanpa awalan teknis di bawah isian.' }
];
for (const b of baru) {
  const it = { kode:b.kode, fitur:F, judul:b.judul, saat_ini:b.saat_ini, usulan:b.usulan, prinsip:b.prinsip, halaman:b.halaman, prioritas:b.prioritas, layar:b.layar,
    acuan:A + b.kode, selesai_bila:b.selesai_bila, status:'Prototipe siap', catatan:b.catatan || '', tanggal:T };
  const i = j.item.findIndex(x => x.kode === b.kode);
  if (i >= 0) j.item[i] = it; else { const u = j.item.findIndex(x => x.kode === 'HE-UMUM-03'); j.item.splice(u < 0 ? j.item.length : u, 0, it); }
}
for (const k of ['HE-UMUM-01', 'HE-UMUM-02']) { const it = j.item.find(x => x.kode === k); if (it && !it.acuan.includes('HE-CA')) it.acuan += '; prototipe/Backlog-HE-CA-Prototype.html'; }
const rs = [
  { tanggal:T, kode:'HE-CA-01…06', perubahan:'Prototipe Registrasi CA (Klien) dibuat (laporan HE hal. 34–35, skor 54,8) dengan IDDS + brand E-PPAT, setelah menelusuri live pada tiga kondisi (belum terdaftar: PPAT; sedang diproses: Asisten; aktif: Klien) dan akun uji yopmail dari pengguna (inbox masih kosong karena belum mengajukan). Audit 3 lapis (HE, IDDS, bahasa) dijalankan sebelum lapor; HE-CA-06 ditambahkan karena skor H9 bernilai 0.', berkas:'prototipe/Backlog-HE-CA-Prototype.html; sumber/ca-idds.html; prototipe/index.html' },
  { tanggal:T, kode:'HE-UMUM-01', perubahan:'eppat.css: semua teks galat IDDS (Text Field, Text Area, Phone Input, One-Time Password, File Upload) memakai negative-600 karena warna bawaan #f02d2d hanya 4,1:1; kotak galat File Upload yang kosong disembunyikan. Uji kontras kini mencakup 31 layar di 5 prototipe.', berkas:'brand-eppat-idds/eppat.css; semua prototipe dirakit ulang' }
];
for (const r of rs) if (!j.riwayat.some(x => x.tanggal === r.tanggal && x.kode === r.kode)) j.riwayat.push(r);
fs.writeFileSync('backlog-he.json', JSON.stringify(j, null, 2));
console.log(j.item.length, 'usulan,', j.riwayat.length, 'riwayat');
