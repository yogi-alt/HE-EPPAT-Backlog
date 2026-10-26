# Temuan penelusuran live — Order AJB sampai E-Akta Wizard (23 Okt 2026)

Order uji: **ORD-261023-001** (narahubung "Uji Prototipe HE", dev-app.eppat.id/t/default), dibuat atas izin pengguna.
Para pihak dari user Klien yang ada: Penjual rafi (raafinug55), Pembeli Raafi Dwi (boxcleo8), Saksi Dani (dani@api-informatics) dan yogi (yogisumitra46). Objek SHM 00001, 120 m², harga Rp750.000.000. Nomor akta uji UJI-HE/1/2026.

## Order AJB (bahan tambahan backlog HE-ORDER)
1. Pindah ke Pengumpulan / Siap / Drafting langsung terjadi tanpa konfirmasi (sesuai HE-ORDER-02).
2. Kekurangan data baru muncul setelah tombol ditekan: dialog "PERHATIAN · Data belum lengkap — Lengkapi Saksi (butuh 2, baru 0), objek …" (sesuai HE-ORDER-01).
3. Tabel Para Pihak: kolom Kontak tidak konsisten (Penjual tampil email, Pembeli tampil nomor HP); NIK Pembeli "-" tanpa penanda data belum lengkap.
4. Dialog Tambah Objek: dua tab (Data Umum / Data Khusus AJB); Harga Jual Beli tersembunyi di tab kedua; tidak ada tanda isian wajib; terbilang otomatis di bawah harga (baik).
5. Setelah Siap: kartu info "Order sudah Siap dan masuk antrean Verifikasi" + tombol Verifikasi Sekarang, tetapi tombol "Pindah ke Drafting" sudah aktif sebelum verifikasi dilakukan.
6. Verifikasi (menu Verifikasi): tiga tab Para Pihak / Objek Tanah / Harga Tanah.
   - Para Pihak: "Cek CA Semua Pihak" (±10–20 detik, hanya spinner tanpa keterangan proses) → pihak ber-CA aktif otomatis Verified.
   - Objek Tanah: konfirmasi manual ("integrasi BPN menyusul") + Catatan + Tandai Terverifikasi.
   - Harga Tanah: isi NJOP per m² → hitung NJOP × luas, bandingkan dengan harga jual ("✓ Harga jual ≥ NJOP (wajar)"); sebelum NJOP diisi, "Harga Jual (dari order)" tampil "-" walau harga sudah ada di objek.
7. Setelah Drafting: tombol "Pindah ke Selesai" langsung tersedia untuk Asisten walau minuta belum difinalisasi; ada tombol "Buka Drafting".
8. Minuta: Asisten "Beritahu PPAT" → PPAT "Finalisasi Akta" (Nomor + Tanggal) → "Akta sudah difinalisasi (final)" → order muncul di E-Akta Wizard "Belum mulai".

## E-Akta Wizard (PPAT)
1. Membuka akta "Belum mulai" langsung menyiapkan sesi tanda tangan (server).
2. Tombol "Stempel TERA" langsung membuat QR + mengirim OTP tanpa konfirmasi; status → "Menunggu OTP", tombol → "Kirim Ulang OTP TERA" (sesuai temuan HE hal. 29).
3. Akun PPAT belum ber-CA ("Sertifikat elektronik (CA) Anda belum terdaftar"), padahal PPAT termasuk penanda-tangan Langkah 2 — tidak ada peringatan sejak awal bahwa proses akan tertahan di tanda tangan PPAT.
4. Langkah 2 & 3 terkunci sampai TERA dibubuhkan (pesan "Selesaikan Stempel TERA (Step 1) dulu. Peruri mensyaratkan stempel sebelum tanda tangan.").
