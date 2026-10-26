// Tambahkan usulan HE-EAW-01…06 + riwayat ke backlog-he.json (aman diulang).
const fs = require('fs');
const j = JSON.parse(fs.readFileSync('backlog-he.json', 'utf8'));
const A = 'prototipe/Backlog-HE-EAW-Prototype.html › Daftar perubahan › ';
const T = '2026-10-23', F = 'E-Akta Wizard (PPAT)';
const baru = [
  { kode:'HE-EAW-01', judul:'Stepper bernomor dengan status setiap langkah',
    saat_ini:'Stepper hanya tiga ikon (Digital Stamp, E-Signature, E-Materai) tanpa nomor dan status; panel memakai nama lain ("Step 1: Digital Stamp (TERA)", "Stempel TERA"); langkah terkunci baru terlihat setelah diklik.',
    usulan:'IDDS Stepper horizontal (vertikal di ponsel) bernomor; tiap langkah menampilkan status di bawah nama: "Selesai", "Sedang berjalan", "Giliran Pembeli · 1 dari 3 selesai", "Terkunci" (ikon gembok). Langkah dapat diklik untuk melihat detail; langkah terkunci menjelaskan langkah mana yang harus diselesaikan dulu. Satu nama dipakai konsisten di stepper, panel, toast, dan Bantuan: Stempel TERA, Tanda Tangan Elektronik, E-Meterai. Di bawah stepper: "Langkah dikerjakan berurutan …".',
    prinsip:'H1 Visibility of System Status; H4 Consistency and Standards; H2 Match Between System and the Real World', halaman:'28, 29', prioritas:'Tinggi', layar:'E-Akta Wizard › detail (stepper)',
    selesai_bila:'Pada akta yang sedang tanda tangan, stepper menampilkan langkah 1 Selesai, langkah 2 "Giliran … · n dari m selesai", langkah 3 Terkunci; nama langkah sama di seluruh layar.' },
  { kode:'HE-EAW-02', judul:'Istilah dijelaskan dan satu aksi utama yang jelas',
    saat_ini:'Istilah TERA, E-Signature, CA, OTP, dan e-meterai tidak dijelaskan. Panel kanan berisi banyak tombol sejajar (Unduh PDF, Ingatkan, Mulai Ulang, Kirim OTP per pihak) tanpa penanda aksi yang harus dilakukan sekarang. Subjudul halaman "Susun akta langkah demi langkah" tidak menggambarkan fungsi wizard.',
    usulan:'Subjudul: "Bubuhkan stempel TERA, tanda tangan elektronik, dan e-meterai pada akta final". Istilah teknis diberi garis putus-putus + IDDS Tooltip penjelasan. Panel kanan dibuka dengan kartu "Langkah berikutnya" (IDDS Card berbingkai brand) berisi satu kalimat dan satu tombol utama, mis. "Kirim OTP ke Contoh Pembeli Satu"; bila tombol nonaktif, alasannya ditulis di bawahnya ("Tombol aktif setelah kotak tanda tangan ditempatkan di PDF."). Unduh PDF, Ingatkan, dan Mulai Ulang dipindah ke IDDS Action Dropdown "Lainnya".',
    prinsip:'H2 Match Between System and the Real World; H8 Aesthetic and Minimalist Design; H10 Help and Documentation', halaman:'28, 29', prioritas:'Tinggi', layar:'E-Akta Wizard › detail (judul, panel kanan)',
    selesai_bila:'Hanya ada satu tombol utama di panel kanan pada setiap langkah; mengarahkan kursor ke "CA" atau "OTP" menampilkan penjelasan; tombol nonaktif selalu disertai alasan.' },
  { kode:'HE-EAW-03', judul:'Konfirmasi sebelum stempel, tanda tangan, dan e-meterai',
    saat_ini:'Tombol "Stempel TERA" langsung membuat QR dan mengirim OTP (terbukti di order uji ORD-261023-001); "Kirim OTP" langsung mengirim; "Generate SN (kuota)" langsung memakai 1 kuota meterai. Konfirmasi hanya ada untuk Mulai Ulang.',
    usulan:'IDDS Modal Confirmation sebelum: (1) mengirim OTP TERA — ringkasan akta, posisi (atau "Otomatis, halaman terakhir"), tujuan OTP, penjelasan bahwa stempel tidak dapat dihapus/dipindah, centang wajib "Saya sudah memeriksa isi akta dan posisi stempel."; (2) mengirim OTP penanda-tangan — nama, peran, halaman, email, urutan; (3) e-meterai — biaya 1 kuota (Rp10.000) yang tidak kembali, centang wajib. Untuk e-meterai, "Generate SN" dan "Tempel" digabung dalam satu aksi "Bubuhkan E-Meterai".',
    prinsip:'H5 Error Prevention; H3 User Control and Freedom', halaman:'28, 29', prioritas:'Tinggi', layar:'E-Akta Wizard › detail (aksi tiap langkah)',
    selesai_bila:'Menekan Bubuhkan Stempel TERA membuka konfirmasi dan tombol "Kirim Kode OTP" baru aktif setelah centang; tidak ada OTP terkirim sebelum konfirmasi.',
    catatan:'Penggabungan Generate SN + Tempel perlu konfirmasi tim teknis (urutan panggilan API Peruri).' },
  { kode:'HE-EAW-04', judul:'Masa berlaku OTP terlihat di layar',
    saat_ini:'Dialog hanya berisi satu kolom angka dan "Kode OTP dikirim ke email …"; masa berlaku 15 menit hanya disebut di email; galat berupa toast umum "OTP TERA salah / gagal."; tidak ada tombol kirim ulang di dialog.',
    usulan:'Dialog memakai IDDS One-Time Password (6 kotak, tempel kode didukung) dengan email tujuan disamarkan, hitung mundur "Kode berlaku 14:59" (kuning < 2 menit, merah saat habis), "Kirim ulang kode" aktif setelah 60 detik, dan pesan galat di bawah kotak: kode salah + sisa percobaan, atau "Kode sudah kedaluwarsa. Klik Kirim ulang kode …" (tombol verifikasi nonaktif).',
    prinsip:'H1 Visibility of System Status; H9 Help Users Recognize, Diagnose, and Recover from Errors', halaman:'28, 30', prioritas:'Tinggi', layar:'E-Akta Wizard › dialog OTP (TERA & tanda tangan)',
    selesai_bila:'Dialog OTP menampilkan hitung mundur dari 15:00; kode salah menampilkan sisa percobaan; setelah waktu habis tombol verifikasi nonaktif dan Kirim ulang kode tersedia.' },
  { kode:'HE-EAW-05', judul:'Navigasi halaman otomatis ke posisi stempel dan tanda tangan',
    saat_ini:'Pengguna berpindah halaman satu per satu dengan Prev/Next untuk mencari halaman tanda tangan; posisi yang sudah ditempatkan tidak bisa dibuka langsung; setelah stempel berhasil pengguna harus berpindah langkah sendiri; toast posisi bisa muncul dua kali.',
    usulan:'Saat langkah dibuka atau giliran berganti, penampil langsung ke halaman penanda terkait (default halaman terakhir). Baris "Lompat ke" di atas PDF berisi IDDS Badge per penanda (Stempel TERA · Hal. 8, Penjual · Hal. 8, …, Halaman terakhir); lencana "Ditempatkan · Hal. 8 ›" di kartu penanda-tangan juga dapat diklik. Penempatan bisa diseret atau lewat tombol "Tempatkan di halaman ini (Hal. n)". Setelah stempel TERA berhasil wizard otomatis pindah ke Tanda Tangan Elektronik; setelah tanda tangan terakhir otomatis ke E-Meterai. Toast posisi hanya satu kali.',
    prinsip:'H7 Flexibility and Efficiency of Use; H6 Recognition rather than Recall', halaman:'28, 30', prioritas:'Sedang', layar:'E-Akta Wizard › penampil PDF',
    selesai_bila:'Membuka akta pada langkah tanda tangan langsung menampilkan halaman tanda tangan giliran; klik "Pembeli · Hal. 8" berpindah ke hal. 8; setelah OTP TERA benar, langkah 2 terbuka tanpa klik tambahan.' },
  { kode:'HE-EAW-06', judul:'Cek kesiapan penanda-tangan sejak awal',
    saat_ini:'Hasil penelusuran live (order uji ORD-261023-001): akun PPAT belum ber-CA, tetapi wizard tetap dimulai tanpa peringatan bahwa tanda tangan PPAT di langkah 2 akan tertahan; banner CA di atas halaman bersifat umum.',
    usulan:'Saat wizard dibuka, CA semua penanda-tangan diperiksa. Bila ada yang belum aktif: IDDS Alert caution di bawah stepper menyebut nama + peran, dampaknya ("proses akan tertahan saat giliran … di langkah 2"), dan tombol "Registrasi CA Saya" bila yang belum aktif adalah pengguna sendiri. Lencana penanda-tangan menjadi "CA belum aktif" dan kartu Langkah berikutnya menjelaskan mengapa Kirim OTP nonaktif.',
    prinsip:'H5 Error Prevention; H1 Visibility of System Status', halaman:'28 (+ penelusuran live)', prioritas:'Sedang', layar:'E-Akta Wizard › detail (di bawah stepper, daftar penanda-tangan)',
    selesai_bila:'Membuka akta yang salah satu penanda-tangannya belum ber-CA langsung menampilkan peringatan dengan nama dan perannya, sebelum stempel TERA dibubuhkan.' }
];
for (const b of baru) {
  const it = { kode:b.kode, fitur:F, judul:b.judul, saat_ini:b.saat_ini, usulan:b.usulan, prinsip:b.prinsip, halaman:b.halaman, prioritas:b.prioritas, layar:b.layar,
    acuan:A + b.kode, selesai_bila:b.selesai_bila, status:'Prototipe siap', catatan:b.catatan || '', tanggal:T };
  const i = j.item.findIndex(x => x.kode === b.kode);
  if (i >= 0) j.item[i] = it; else { const u = j.item.findIndex(x => x.kode === 'HE-UMUM-03'); j.item.splice(u < 0 ? j.item.length : u, 0, it); }
}
for (const k of ['HE-UMUM-01', 'HE-UMUM-02']) { const it = j.item.find(x => x.kode === k); if (it && !it.acuan.includes('HE-EAW')) it.acuan += '; prototipe/Backlog-HE-EAW-Prototype.html'; }
const r = { tanggal:T, kode:'HE-EAW-01…06', perubahan:'Prototipe E-Akta Wizard (PPAT) dibuat (laporan HE hal. 28–30, skor 36,2) dengan IDDS + brand E-PPAT: 5 usulan dari laporan + HE-EAW-06 dari penelusuran live order uji ORD-261023-001 (PPAT belum ber-CA). Bantuan halaman (HE-UMUM-02) dan IDDS (HE-UMUM-01) diterapkan juga. eppat.css: teks galat One-Time Password memakai negative-600 agar kontras.', berkas:'prototipe/Backlog-HE-EAW-Prototype.html; sumber/eaw-idds.html; brand-eppat-idds/eppat.css; prototipe/index.html' };
if (!j.riwayat.some(x => x.kode === r.kode)) j.riwayat.push(r);
fs.writeFileSync('backlog-he.json', JSON.stringify(j, null, 2));
console.log(j.item.length, 'usulan,', j.riwayat.length, 'riwayat');
