// Tambahkan HE-ORDER-06…08 (hasil penelusuran live order uji ORD-261023-001) + riwayat (aman diulang).
const fs = require('fs');
const j = JSON.parse(fs.readFileSync('backlog-he.json', 'utf8'));
const A = 'prototipe/Backlog-HE-ORDER-Prototype.html › Daftar perubahan › ';
const T = '2026-10-23', F = 'Order AJB';
const baru = [
  { kode:'HE-ORDER-06', judul:'Kontak para pihak konsisten dan data kosong ditandai',
    saat_ini:'Kolom Kontak di tabel Para Pihak berisi email untuk satu pihak dan nomor HP untuk pihak lain; NIK kosong hanya tampil "-" tanpa penanda.',
    usulan:'Kolom "Kontak (email · HP)" selalu dua baris: email lalu No. HP; isian kosong ditulis "No. HP belum diisi". Kolom "Nama · NIK" menampilkan NIK tersamar; bila kosong tampil IDDS Badge warning "NIK belum diisi".',
    prinsip:'H4 Consistency and Standards; H1 Visibility of System Status', halaman:'23–24 (+ penelusuran live)', prioritas:'Rendah', layar:'Order AJB › detail › tab Para Pihak',
    selesai_bila:'Pada order dengan pembeli tanpa NIK, baris pembeli menampilkan lencana "NIK belum diisi"; semua baris menampilkan email dan No. HP pada posisi yang sama.' },
  { kode:'HE-ORDER-07', judul:'Formulir objek dalam satu tampilan dengan isian wajib',
    saat_ini:'Dialog Tambah Objek memakai dua tab (Data Umum / Data Khusus AJB); Harga Jual Beli tersembunyi di tab kedua; tidak ada tanda isian wajib; harga tidak tampil di tabel objek.',
    usulan:'Satu formulir berkelompok: Data sertifikat (Jenis hak, Nomor sertifikat*, NIB, Luas*), Lokasi (Alamat objek*), Harga (Harga jual beli* dengan awalan Rp, pemisah ribuan, terbilang di bawahnya — terbilang sudah ada di live), Data tambahan opsional (Nama pemilik terdaftar, NOP PBB, dst.). Keterangan "Isian bertanda * wajib diisi." Galat ditampilkan di bawah isian (IDDS Text Field error) dan hilang saat diperbaiki. Tabel objek menambah kolom "Harga jual beli".',
    prinsip:'H5 Error Prevention; H6 Recognition rather than Recall; H8 Aesthetic and Minimalist Design', halaman:'23–24 (+ penelusuran live)', prioritas:'Sedang', layar:'Order AJB › detail › tab Objek › dialog Tambah Objek',
    selesai_bila:'Menyimpan objek tanpa luas, alamat, atau harga menampilkan galat di bawah isian terkait; harga 750000000 tampil "750.000.000" dengan terbilang "tujuh ratus lima puluh juta rupiah"; tabel objek menampilkan Rp750.000.000.' },
  { kode:'HE-ORDER-08', judul:'Syarat Drafting dan Selesai mengikuti verifikasi dan minuta',
    saat_ini:'Setelah order Siap, tombol "Pindah ke Drafting" sudah aktif sebelum verifikasi para pihak, objek, dan harga dilakukan. Setelah Drafting, "Pindah ke Selesai" langsung tersedia walau minuta belum difinalisasi PPAT.',
    usulan:'Kartu syarat (HE-ORDER-01) diperluas: Siap → Drafting = 3 syarat (Verifikasi para pihak (CA), Verifikasi objek tanah, Verifikasi harga (NJOP)) sesuai tiga tab menu Verifikasi, masing-masing dengan tautan "Verifikasi Sekarang". Drafting → Selesai = "Minuta akta difinalisasi PPAT" dengan tautan "Buka Minuta" dan langkah berikutnya "Minta PPAT memfinalisasi minuta …". Tombol pindah nonaktif sampai syarat terpenuhi.',
    prinsip:'H5 Error Prevention; H1 Visibility of System Status', halaman:'23–24 (+ penelusuran live)', prioritas:'Tinggi', layar:'Order AJB › detail (kartu status)',
    selesai_bila:'Order Siap yang baru terverifikasi para pihaknya menampilkan "1 dari 3 terpenuhi" dan tombol Pindah ke Drafting nonaktif; order Drafting dengan minuta belum final tidak bisa dipindah ke Selesai.',
    catatan:'Juga teramati di Verifikasi (belum masuk prototipe): "Cek CA Semua Pihak" butuh ±10–20 detik hanya dengan spinner; "Harga Jual (dari order)" tampil "-" sampai NJOP diisi.' }
];
for (const b of baru) {
  const it = { kode:b.kode, fitur:F, judul:b.judul, saat_ini:b.saat_ini, usulan:b.usulan, prinsip:b.prinsip, halaman:b.halaman, prioritas:b.prioritas, layar:b.layar,
    acuan:A + b.kode, selesai_bila:b.selesai_bila, status:'Prototipe siap', catatan:b.catatan || '', tanggal:T };
  const i = j.item.findIndex(x => x.kode === b.kode);
  if (i >= 0) j.item[i] = it; else { const u = j.item.findIndex(x => x.kode === 'HE-ORDER-05'); j.item.splice(u + 1, 0, it); }
}
const r = { tanggal:T, kode:'HE-ORDER-06…08', perubahan:'Penelusuran live dengan order uji ORD-261023-001 (Asisten → Verifikasi → Minuta → E-Akta Wizard, atas izin pengguna). Tiga usulan baru Order AJB ditambahkan ke prototipe: kontak & NIK di tabel Para Pihak, formulir objek satu tampilan dengan isian wajib + harga, serta syarat Drafting (3 verifikasi) dan Selesai (minuta final). Catatan Verifikasi (Cek CA lambat, harga "-") dicatat untuk fitur Verifikasi.', berkas:'prototipe/Backlog-HE-ORDER-Prototype.html; sumber/order-idds.html; sumber/temuan-live-order-eaw.md' };
if (!j.riwayat.some(x => x.kode === r.kode)) j.riwayat.push(r);
fs.writeFileSync('backlog-he.json', JSON.stringify(j, null, 2));
console.log(j.item.length, 'usulan,', j.riwayat.length, 'riwayat');
