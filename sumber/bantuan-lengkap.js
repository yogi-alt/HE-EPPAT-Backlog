// Isi Bantuan lengkap untuk halaman Penyesuaian IDDS Tenant (System, CMS, E-PPAT Module).
// Mengganti blok `const BANTUAN = { … };` di setiap sumber. node bantuan-lengkap.js
// Prinsip isi: jawab pertanyaan nyata user (apa ini, bagaimana caranya, kenapa terjadi, apa dampaknya, apa yang belum bisa);
// kalimat singkat SPOK; tidak menjanjikan perilaku yang tidak ada di live.
const fs = require('fs');
const BANTU = `/* butir langkah & daftar istilah (dipakai semua Bantuan) */
const lgkh = a => \`<ol class="bantu-langkah">\${a.map(x => \`<li>\${x}</li>\`).join('')}</ol>\`;
const istilah = a => \`<dl class="bantu-istilah">\${a.map(([k, v]) => \`<dt>\${k}</dt><dd>\${v}</dd>\`).join('')}</dl>\`;
const fq = (p, a) => a.map(([q, j], i) => faq(p + i, q, j)).join('');`;

const SYSTEM = `const BANTUAN = {
  dasbor:() => ({ judul:'Bantuan Dasbor', isi:\`<p>Dasbor merangkum akun user dan aktivitas terbaru di kantor Anda, serta jalan pintas ke pengelolaan sistem.</p>
    <h4 class="bantu-sub">Isi halaman</h4>
    <ul class="bantu-langkah"><li><b>Total User</b>: semua akun di kantor ini, termasuk yang ditangguhkan dan nonaktif.</li><li><b>User Aktif</b>: akun yang dapat masuk saat ini.</li><li><b>Aktivitas (10 terakhir)</b>: jumlah catatan terbaru di log aktivitas.</li><li><b>Mulai dari sini</b>: jalan pintas ke Daftar User, Peran &amp; Izin, dan Pengaturan.</li><li><b>Log aksi user</b>: enam aktivitas terbaru; aktivitas gagal bertitik merah.</li></ul>
    <h4 class="bantu-sub">Pertanyaan umum</h4>
    \${fq('d', [
      ['Mengapa User Aktif lebih sedikit dari Total User?', 'Selisihnya adalah akun yang ditangguhkan atau nonaktif. Lihat statusnya di Daftar User.'],
      ['Apa itu pengingat TERA?', 'TERA adalah stempel elektronik kantor dari Peruri. Selama belum didaftarkan, akta tidak dapat distempel elektronik. Klik "Daftar TERA" untuk melengkapi datanya.'],
      ['Apakah pengingat TERA muncul lagi setelah ditutup?', 'Ya. Pengingat muncul lagi pada kunjungan berikutnya sampai TERA kantor terdaftar.'],
      ['Mengapa ada aktivitas bertanda Gagal?', 'Contohnya password salah saat masuk, atau akun yang ditangguhkan mencoba masuk. Buka Logs untuk melihat keterangan dan alamat IP-nya.'],
      ['Bagaimana menambah user baru?', 'Klik "Kelola user", lalu "Tambah User" di Daftar User. Isi nama, email, peran, dan password awal.'],
      ['Mengapa angka belum berubah?', 'Angka dimuat saat halaman dibuka. Muat ulang halaman untuk melihat data terbaru.']])}
    \${kontak()}\` }),
  peran:() => ({ judul:'Bantuan Peran & Izin', isi:\`<p>Halaman ini mengatur menu yang tampil dan tindakan yang boleh dilakukan setiap peran.</p>
    <h4 class="bantu-sub">Arti izin</h4>
    <ul class="bantu-langkah">\${IZIN.map(([, l, h]) => \`<li><b>\${l}:</b> \${h.toLowerCase()}.</li>\`).join('')}</ul>
    <h4 class="bantu-sub">Langkah menambah peran</h4>
    \${lgkh(['Klik <b>Tambah Peran</b>, isi kode, nama, dan fungsi.', 'Klik sel pada baris peran baru untuk mengatur izin setiap modul.', 'Beri peran itu ke user di <b>Daftar User</b>.'])}
    <h4 class="bantu-sub">Pertanyaan umum</h4>
    \${fq('p', [
      ['Mengapa baris Super Admin tidak bisa diubah?', 'Super Admin selalu memiliki akses penuh agar selalu ada akun yang dapat mengelola sistem.'],
      ['Apa arti angka 3/4 di sel?', 'Peran tersebut memiliki 3 dari 4 izin (Lihat, Buat, Ubah, Hapus) untuk modul itu. Arahkan kursor ke sel untuk melihat daftarnya.'],
      ['Mengapa user tidak melihat menu tertentu?', 'Peran user belum punya izin Lihat untuk modul itu. Untuk menu Order, layanan aktanya juga harus aktif di Profil Kantor › Layanan Akta.'],
      ['Kapan perubahan izin berlaku?', 'Perubahan langsung tersimpan. Bila menu user belum berubah, minta user memuat ulang halaman atau masuk ulang.'],
      ['Apa itu Fungsi peran?', 'Fungsi menentukan order yang dapat dilihat dan hak finalisasi akta. PPAT: akses penuh dan dapat memfinalisasi. Asisten: input dan draf, melihat semua order. Klien: hanya order miliknya. Tidak ada: peran umum.'],
      ['Apa itu peran publik?', 'Peran yang muncul sebagai pilihan saat calon pengguna mendaftar sendiri. Peran harus aktif dan pendaftaran mandiri harus dinyalakan di Pengaturan.'],
      ['Mengapa peran tidak bisa dihapus?', 'Peran yang masih dipakai user tidak dapat dihapus. Pindahkan user ke peran lain di Daftar User, lalu hapus perannya.'],
      ['Apa beda menonaktifkan dan menghapus peran?', 'Peran nonaktif tetap tersimpan, tetapi tidak dapat diberikan ke user baru. Peran yang dihapus hilang permanen beserta izinnya.'],
      ['Bisakah kode peran diganti?', 'Tidak. Kode dipakai sistem sebagai pengenal. Ganti nama peran bila perlu.']])}
    \${kontak()}\` }),
  pengaturan:() => ({ judul:'Bantuan Pengaturan', isi:\`<p>Pengaturan di halaman ini berlaku untuk seluruh user di kantor Anda.</p>
    <h4 class="bantu-sub">Langkah</h4>
    \${lgkh(['Ubah isian atau sakelar yang diperlukan.', 'Periksa jumlah perubahan di bagian bawah formulir.', 'Klik <b>Simpan Perubahan</b>, atau <b>Batal</b> untuk mengembalikan isian.'])}
    <h4 class="bantu-sub">Pertanyaan umum</h4>
    \${fq('s', [
      ['Di mana Nama Aplikasi dan Tagline tampil?', 'Sebagai identitas aplikasi kantor Anda, misalnya di halaman masuk dan judul aplikasi.'],
      ['Zona waktu dipakai untuk apa?', 'Untuk waktu yang tampil di order, log aktivitas, dan email. Pilih sesuai lokasi kantor: WIB, WITA, atau WIT.'],
      ['Apa akibat mematikan registrasi mandiri?', 'Calon pengguna tidak dapat mendaftar sendiri. Akun baru hanya dapat dibuat admin melalui Daftar User.'],
      ['Kapan memakai mode pemeliharaan?', 'Saat ada perbaikan atau pembaruan sistem. Selama aktif, user selain admin melihat pesan pemeliharaan dan tidak dapat memakai aplikasi.'],
      ['Apakah admin tetap bisa masuk saat pemeliharaan?', 'Ya. Admin tetap dapat masuk untuk mematikan mode pemeliharaan.'],
      ['Bagaimana jika saya pindah menu sebelum menyimpan?', 'Aplikasi meminta konfirmasi. Bila Anda memilih Tinggalkan, perubahan yang belum disimpan hilang.'],
      ['Di mana mengubah logo dan warna aplikasi?', 'Di menu CMS › Setting Theme.']])}
    \${kontak()}\` }),
  logs:() => ({ judul:'Bantuan Logs', isi:\`<p>Logs mencatat aktivitas user di kantor Anda, misalnya masuk, mengubah draf, dan mengubah izin.</p>
    <h4 class="bantu-sub">Langkah mencari</h4>
    \${lgkh(['Pilih <b>Jenis aktivitas</b>, misalnya Gagal masuk.', 'Ketik kata di <b>Cari keterangan</b>, misalnya nomor order atau "reset password".', 'Klik <b>Hapus saringan</b> bila hasilnya kosong.'])}
    <h4 class="bantu-sub">Pertanyaan umum</h4>
    \${fq('l', [
      ['Apa arti status Gagal?', 'Aktivitas tidak berhasil, misalnya password salah atau akun ditangguhkan. Beberapa kegagalan berturut-turut dari akun yang sama perlu diperiksa.'],
      ['Bagaimana melihat aktivitas satu user saja?', 'Saringan per user belum tersedia. Gunakan Jenis aktivitas dan kata di keterangan, lalu lihat kolom Pelaku.'],
      ['Apa itu kolom IP?', 'Alamat jaringan perangkat yang dipakai saat aktivitas terjadi. Gunakan untuk menelusuri akses yang mencurigakan.'],
      ['Apa itu "Buka NIK lengkap"?', 'Catatan setiap kali user menampilkan NIK para pihak secara utuh. Ini dicatat untuk perlindungan data pribadi.'],
      ['Bisakah log dihapus, diubah, atau diunduh?', 'Tidak. Log hanya dapat dibaca agar riwayat tetap utuh. Bila butuh salinan log, hubungi dukungan.'],
      ['Mengapa aktivitas lama tidak muncul?', 'Halaman menampilkan 50 aktivitas per halaman. Pindah halaman di bagian bawah tabel atau persempit saringan.']])}
    \${kontak()}\` })
};`;

const CMS = `const BANTUAN = {
  landing:() => ({ judul:'Bantuan Landing Page', isi:\`<p>Landing Page berisi halaman publik kantor, misalnya Beranda dan Tentang Kami, yang dapat dibuka siapa saja.</p>
    <h4 class="bantu-sub">Langkah membuat halaman</h4>
    \${lgkh(['Klik <b>Buat Halaman</b>, isi nama dan alamatnya.', 'Susun blok di <b>Ubah Tata Letak</b>, lalu klik <b>Simpan Tata Letak</b>.', 'Nyalakan <b>Tayang di situs</b> agar halaman bisa dibuka publik.'])}
    \${istilah([['Alamat', 'Bagian akhir alamat situs, misalnya /tentang. Alamat / adalah beranda.'], ['Tayang', 'Halaman dapat dibuka publik.'], ['Tata letak', 'Susunan blok di halaman: navbar, slider, teks, kartu, gambar, artikel, footer.']])}
    <h4 class="bantu-sub">Pertanyaan umum</h4>
    \${fq('a', [
      ['Bagaimana menjadikan halaman sebagai beranda?', 'Isi alamatnya dengan / di Ubah Info Halaman, lalu tayangkan.'],
      ['Mengapa perubahan saya belum terlihat di situs?', 'Pastikan Anda sudah klik Simpan Tata Letak dan halaman dalam status Tayang. Lalu muat ulang halaman situs.'],
      ['Bisakah saya menyusun halaman tanpa terlihat publik?', 'Bisa. Biarkan sakelar Tayang di situs mati selama menyusun, lalu nyalakan setelah selesai.'],
      ['Alamat apa yang tidak boleh dipakai?', 'Alamat yang dipakai sistem, seperti admin, api, login, dan register. Aplikasi menolak alamat tersebut.'],
      ['Untuk apa Ekspor dan Impor?', 'Ekspor menyimpan tata letak dan gambarnya sebagai berkas ZIP. Berkas itu dapat diimpor sebagai cadangan atau dipakai di kantor lain. Setelah impor, pilih ulang slider, menu, dan footer.'],
      ['Apa yang terjadi bila halaman dihapus?', 'Halaman dan tata letaknya hilang permanen. Bila halaman sedang tayang, alamat publiknya tidak dapat dibuka lagi.']])}
    \${kontak()}\` }),
  builder:() => ({ judul:'Bantuan Penyusun Tata Letak', isi:\`<p>Halaman disusun dari blok. Setiap blok punya pengaturan di panel Properti.</p>
    <h4 class="bantu-sub">Langkah</h4>
    \${lgkh(['Klik komponen di panel kiri untuk menambah blok di akhir halaman.', 'Klik blok di kanvas, lalu ubah isinya di panel <b>Properti</b>.', 'Atur urutan dengan tombol panah di kepala blok; duplikat atau hapus dengan tombol di sebelahnya.', 'Klik <b>Simpan Tata Letak</b>. Bila halaman sedang tayang, perubahan langsung terlihat publik.'])}
    \${istilah([['Navbar', 'Bilah menu di atas halaman.'], ['Slider', 'Gambar besar yang berganti otomatis.'], ['Blok HTML', 'Teks bebas dengan judul, daftar, tabel, dan gambar.'], ['Grid Kartu', 'Kartu berjajar dalam baris dan kolom.'], ['Grid Artikel', 'Daftar artikel terbit dari Posts &amp; Pages.'], ['Footer', 'Bagian bawah halaman berisi kontak dan tautan.']])}
    <h4 class="bantu-sub">Pertanyaan umum</h4>
    \${fq('b', [
      ['Dari mana isi slider, menu, dan footer?', 'Dari CMS › Master Konten. Pilih slider, menu, atau widget footer yang sudah dibuat di panel Properti.'],
      ['Apa itu ID Bagian?', 'Nama bagian yang dapat dituju dari menu. Misalnya ID Bagian layanan dapat dibuka lewat tautan menu #layanan.'],
      ['Bagaimana memasang gambar?', 'Klik "Pilih" di isian gambar, lalu pilih dari Media Library atau unggah gambar baru.'],
      ['Bagaimana menyembunyikan blok di ponsel?', 'Pada Blok HTML, nyalakan "Sembunyikan di ponsel". Jangan nyalakan juga "Sembunyikan di desktop", karena blok tidak akan tampil di mana pun.'],
      ['Mengapa blok hapus belum hilang dari situs?', 'Penghapusan baru permanen setelah Anda klik Simpan Tata Letak.'],
      ['Apakah ada tombol urungkan (undo)?', 'Belum ada. Bila salah, klik Kembali lalu pilih Tinggalkan untuk membuang perubahan yang belum disimpan.'],
      ['Untuk apa CSS Kustom?', 'Untuk pengaturan tampilan lanjutan oleh orang yang memahami CSS. Kosongkan bila tidak diperlukan.']])}
    \${kontak()}\` }),
  tema:() => ({ judul:'Bantuan Setting Theme', isi:\`<p>Setting Theme mengatur warna, logo, dan gaya komponen untuk seluruh aplikasi kantor.</p>
    <h4 class="bantu-sub">Langkah</h4>
    \${lgkh(['Pilih preset atau atur warna kustom di tab <b>Brand &amp; Warna</b>.', 'Atur sidebar, latar, logo, dan komponen di tab lainnya.', 'Lihat hasilnya di <b>Pratinjau Langsung</b>.', 'Klik <b>Simpan</b> agar berlaku untuk seluruh user.'])}
    <h4 class="bantu-sub">Pertanyaan umum</h4>
    \${fq('t', [
      ['Apa beda Preset bawaan dan Kustom?', 'Preset memakai warna siap pakai. Kustom memakai warna yang Anda atur sendiri. Mengubah salah satu warna saat memakai preset memindahkan sumber warna ke Kustom.'],
      ['Apa arti lencana "Kurang kontras"?', 'Warna teks dan latar terlalu mirip sehingga sulit dibaca. Standar WCAG meminta kontras minimal 4,5 : 1 untuk teks biasa. Pilih warna yang lebih gelap atau lebih terang.'],
      ['Mengapa isian warna sidebar boleh kosong?', 'Isian kosong berarti warna mengikuti preset. Klik "Kosongkan" untuk kembali ke warna preset.'],
      ['Kapan user lain melihat perubahan?', 'Setelah Anda klik Simpan. Sebelum disimpan, perubahan hanya tampil di Pratinjau Langsung.'],
      ['Format logo apa yang disarankan?', 'PNG atau SVG berlatar transparan. Logo kecil untuk sidebar sebaiknya berbentuk persegi. Favicon sebaiknya ukuran 32 × 32 piksel.'],
      ['Bagaimana mengatur tampilan halaman masuk?', 'Buka tab Komponen › Halaman Masuk untuk mengatur gambar latar, letak kartu, teks, dan tombol.'],
      ['Bagaimana kembali ke tampilan awal?', 'Pilih Preset bawaan e-PPAT Teal dan kosongkan warna sidebar, navbar, dan status, lalu simpan.']])}
    \${kontak()}\` }),
  master:() => ({ judul:'Bantuan Master Konten', isi:\`<p>Master Konten menyimpan slider, menu, dan footer yang dipakai di halaman publik. Satu master dapat dipakai di beberapa halaman.</p>
    <h4 class="bantu-sub">Langkah</h4>
    \${lgkh(['Pilih tab Slider, Menu, atau Footer.', 'Klik <b>Tambah</b> untuk membuat master baru, lalu tambahkan item.', 'Pilih master itu di panel Properti penyusun tata letak Landing Page.'])}
    <h4 class="bantu-sub">Pertanyaan umum</h4>
    \${fq('m', [
      ['Berapa ukuran gambar slide yang disarankan?', '1920 × 800 piksel atau rasio serupa, agar tidak terpotong di layar lebar.'],
      ['Bagaimana menambah halaman ke menu?', 'Di tab Menu, pilih halaman atau artikel yang sudah terbit, lalu klik tombol tambah. Untuk alamat lain, isi Tautan kustom.'],
      ['Bagaimana membuat sub-menu?', 'Klik tombol panah kanan pada item. Item itu menjadi sub-menu dari item di atasnya. Panah kiri mengeluarkannya.'],
      ['Apa itu tautan #bagian?', 'Tautan ke bagian di halaman yang sama, sesuai ID Bagian di penyusun tata letak. Contoh: #layanan.'],
      ['Mengapa halaman atau artikel tidak muncul di pilihan menu?', 'Hanya halaman dan artikel berstatus Terbit yang dapat dipilih.'],
      ['Apa akibat menghapus slider, menu, atau footer?', 'Bagian halaman yang memakainya menjadi kosong sampai Anda memilih master lain. Dialog hapus menyebut halaman yang terdampak.']])}
    \${kontak()}\` }),
  posts:() => ({ judul:'Bantuan Posts & Pages', isi:\`<p>Posts &amp; Pages berisi artikel, berita, dan halaman statis situs publik.</p>
    <h4 class="bantu-sub">Status</h4>
    <ul class="bantu-langkah"><li><b>Draf:</b> belum tampil di situs.</li><li><b>Terbit:</b> tampil di situs publik.</li><li><b>Diarsipkan:</b> disimpan, tetapi tidak tampil.</li></ul>
    <h4 class="bantu-sub">Pertanyaan umum</h4>
    \${fq('o', [
      ['Apa beda Artikel/Berita dan Halaman?', 'Artikel/Berita tampil di daftar berita (Grid Artikel). Halaman berdiri sendiri, misalnya Kebijakan Privasi, dan dapat disusun dengan penyusun tata letak.'],
      ['Apa itu alamat (slug)?', 'Bagian akhir alamat post, dibuat otomatis dari judul. Klik "Ubah" untuk menggantinya. Alamat tidak boleh sama dengan post lain.'],
      ['Bagaimana menambah gambar di konten?', 'Klik tombol gambar di bilah alat editor, lalu pilih dari Media Library.'],
      ['Untuk apa Ringkasan dan Tag?', 'Ringkasan tampil di kartu artikel. Tag membantu pengelompokan; pisahkan dengan koma.'],
      ['Bisakah menjadwalkan terbit?', 'Belum. Tanggal terbit tercatat saat status diubah menjadi Terbit.'],
      ['Mengapa artikel tidak tampil di Grid Artikel?', 'Pastikan statusnya Terbit dan jenisnya Artikel/Berita. Grid hanya menampilkan sejumlah artikel terbaru sesuai pengaturan blok.'],
      ['Bagaimana jika formulir tertutup sebelum disimpan?', 'Aplikasi meminta konfirmasi "Buang perubahan?". Pilih Lanjut Mengisi untuk kembali ke formulir.']])}
    \${kontak()}\` }),
  media:() => ({ judul:'Bantuan Media Library', isi:\`<p>Media Library menyimpan gambar dan dokumen untuk Posts &amp; Pages dan Landing Page.</p>
    <h4 class="bantu-sub">Langkah</h4>
    \${lgkh(['Seret berkas ke kotak unggah atau klik untuk memilih. Bisa beberapa berkas sekaligus.', 'Klik <b>Salin URL</b> untuk menempelkan alamat berkas di tempat lain.', 'Atau pilih gambar langsung lewat tombol <b>Pilih</b> di isian gambar.'])}
    <h4 class="bantu-sub">Pertanyaan umum</h4>
    \${fq('e', [
      ['Berkas apa saja yang diterima?', 'Gambar (JPG, PNG, SVG, WebP), PDF, Word, dan Excel.'],
      ['Mengapa unggahan gagal?', 'Biasanya karena jenis berkas tidak diterima atau ukurannya melebihi batas. Pesan galat menyebut penyebabnya.'],
      ['Bagaimana mencari berkas?', 'Gunakan kolom cari di dialog Pilih Gambar, yang terbuka dari tombol "Pilih" di isian gambar.'],
      ['Bisakah mengganti nama berkas?', 'Belum. Unggah ulang dengan nama baru, lalu hapus berkas lama bila tidak dipakai.'],
      ['Apa akibat menghapus berkas?', 'Gambar atau tautan di post dan halaman yang memakainya tidak akan tampil lagi. Dialog hapus menyebut tempat berkas itu dipakai.']])}
    \${kontak()}\` })
};`;

const EPPAT = `const BANTUAN = {
  dashboard:() => ({ judul:'Bantuan Dashboard Akta', isi:\`<p>Dashboard merangkum order akta kantor Anda per status dan jenis akta.</p>
    <h4 class="bantu-sub">Arti status</h4>
    <ul class="bantu-langkah">\${Object.values(ST).map(s => \`<li><b>\${s.l}:</b> \${s.s.toLowerCase()}.</li>\`).join('')}</ul>
    <h4 class="bantu-sub">Pertanyaan umum</h4>
    \${fq('d', [
      ['Apa isi daftar "Perlu tindakan"?', 'Order berstatus Baru, Pengumpulan, dan Siap, diurutkan dari yang paling lama menunggu. Setiap baris menyebut tindakan berikutnya.'],
      ['Bagaimana membuka detail order?', 'Klik baris order. Halaman Order AJB terbuka.'],
      ['Mengapa angka belum berubah?', 'Klik "Muat ulang" di kanan atas untuk mengambil data terbaru.'],
      ['Mengapa hanya Akta Jual Beli yang tampil?', 'Grafik hanya menampilkan layanan akta yang aktif. Saat ini baru Akta Jual Beli yang tersedia.'],
      ['Ke mana order setelah Selesai?', 'Akta yang selesai dikelola salinannya di menu Akta Salinan.']])}
    \${kontak()}\` }),
  profil:() => ({ judul:'Bantuan Profil Kantor', isi:\`<p>Data kantor dipakai sebagai kop dan variabel isi akta, serta kartu identitas di sidebar.</p>
    <h4 class="bantu-sub">Langkah</h4>
    \${lgkh(['Lengkapi isian bertanda bintang.', 'Pilih PPAT penanda tangan yang sudah memiliki CA aktif.', 'Atur kartu sidebar bila perlu, lalu klik <b>Simpan Profil Kantor</b>.'])}
    \${istilah([['CA', 'Sertifikat elektronik dari Peruri untuk tanda tangan elektronik.'], ['PPAT penanda tangan', 'User berfungsi PPAT yang menandatangani akta elektronik kantor.'], ['Layanan akta', 'Jenis akta yang dilayani kantor; setiap layanan aktif punya menu Order sendiri.']])}
    <h4 class="bantu-sub">Pertanyaan umum</h4>
    \${fq('p', [
      ['Di mana data ini dipakai?', 'Pada kop dan isi akta (nama PPAT, nomor SK, wilayah kerja, alamat), serta kartu identitas di sidebar.'],
      ['Mengapa PPAT penanda tangan wajib memiliki CA aktif?', 'Akta elektronik ditandatangani dengan sertifikat elektronik dari Peruri. Tanpa CA aktif, penandatanganan gagal. PPAT mendaftar CA sendiri lewat Akun Saya.'],
      ['Mengapa daftar PPAT penanda tangan kosong?', 'Belum ada user dengan peran berfungsi PPAT. Buat user di Daftar User, lalu beri peran berfungsi PPAT di Peran &amp; Izin.'],
      ['Format telepon apa yang diterima?', 'Angka 7–15 digit, boleh diawali +. Spasi, tanda hubung, dan tanda kurung diabaikan.'],
      ['Mengapa isian tidak bisa diubah?', 'Peran Anda hanya punya izin Lihat untuk Profil Kantor. Minta Super Admin mengubahnya atau memberi izin Ubah.'],
      ['Mengapa ada lencana "Kurang kontras" di kartu sidebar?', 'Warna teks dan warna dasar kartu terlalu mirip. Pilih warna teks yang lebih gelap atau lebih terang.'],
      ['Apa akibat menonaktifkan layanan akta?', 'Menu Order untuk layanan itu hilang dari sidebar seluruh user. Order yang sudah ada tetap tersimpan.'],
      ['Mengapa APHT dan SKMHT tidak bisa diaktifkan?', 'Layanan tersebut belum tersedia. Saat ini baru Akta Jual Beli.']])}
    \${kontak()}\` }),
  salinan:() => ({ judul:'Bantuan Akta Salinan', isi:\`<p>Akta yang sudah difinalisasi di Minuta muncul di sini untuk dicetak dan dikirim salinannya ke para pihak.</p>
    <h4 class="bantu-sub">Langkah</h4>
    \${lgkh(['Buka akta, lalu klik <b>Unduh Salinan</b> untuk mencetak.', 'Tanda tangani salinan, pindai, lalu unggah scan-nya (PDF, maks. 20 MB).', 'Klik <b>Kirim Salinan</b>, pilih penerima, dan pastikan emailnya benar.'])}
    \${istilah([['Salinan akta', 'Turunan akta untuk para pihak; minuta asli tetap disimpan kantor.'], ['Renvoi', 'Catatan perbaikan (coretan, tambahan, penggantian kata) yang tercetak pada salinan.'], ['Tautan salinan', 'Alamat unduhan yang dikirim lewat email, berlaku 7 hari.']])}
    <h4 class="bantu-sub">Pertanyaan umum</h4>
    \${fq('a', [
      ['Mengapa akta saya tidak ada di daftar?', 'Hanya akta yang sudah difinalisasi di Minuta yang muncul. Periksa status order di Order AJB.'],
      ['Mengapa tombol Kirim Salinan tidak aktif?', 'Belum ada scan akta. Unggah scan akta yang sudah ditandatangani terlebih dahulu.'],
      ['Apa arti status di kolom Salinan?', 'Belum ada scan: scan belum diunggah. Siap dikirim: scan ada, belum dikirim. Terkirim ke N pihak: tautan sudah dikirim.'],
      ['Apa arti status di Riwayat?', 'Terkirim: email terkirim. Dibuka: penerima sudah membuka tautan. Gagal: email tidak terkirim. Dicabut: tautan tidak berlaku lagi.'],
      ['Penerima tidak menerima email. Apa yang harus dilakukan?', 'Periksa alamat email di Riwayat. Minta penerima memeriksa folder spam, lalu kirim ulang salinan.'],
      ['Berapa lama tautan berlaku?', 'Tujuh hari sejak dikirim. Tautan dapat dicabut lebih awal dari Riwayat. Kirim ulang bila tautan sudah habis.'],
      ['Apa beda dengan tab Salinan di E-Akta Wizard?', 'E-Akta Wizard menyiapkan salinan elektronik (stempel TERA, tanda tangan, e-Meterai) yang dikirim sebagai lampiran. Menu ini mengirim scan akta bertanda tangan sebagai tautan.']])}
    \${kontak()}\` }),
  emeterai:() => ({ judul:'Bantuan Aktivasi e-Meterai', isi:\`<p>e-Meterai dibubuhkan pada salinan akta elektronik. Kuota dibeli sendiri di portal Peruri, lalu email akunnya disimpan di sini.</p>
    <h4 class="bantu-sub">Langkah</h4>
    \${lgkh(['Daftar dan beli kuota di <b>e-meterai.co.id</b>.', 'Catat email yang Anda pakai di portal tersebut.', 'Isi email itu di halaman ini, lalu klik <b>Simpan</b>.'])}
    <h4 class="bantu-sub">Pertanyaan umum</h4>
    \${fq('e', [
      ['Berapa biaya setiap e-Meterai?', 'Bea meterai elektronik Rp 10.000 per dokumen. Setiap pembubuhan memakai satu kuota.'],
      ['Di mana e-Meterai dibubuhkan?', 'Di E-Akta Wizard › tab Salinan, langkah ketiga setelah stempel TERA dan tanda tangan PPAT.'],
      ['Mengapa pembubuhan gagal?', 'Biasanya karena email di sini tidak sama dengan email akun Peruri, atau kuota habis. Periksa keduanya di portal Peruri.'],
      ['Bagaimana mengetahui sisa kuota?', 'Sisa kuota hanya terlihat di portal e-meterai.co.id.'],
      ['Apakah kuota kembali bila proses diulang?', 'Tidak. Kuota yang sudah terpakai di Peruri tidak kembali.'],
      ['Bisakah email diganti?', 'Bisa. Simpan email baru; aplikasi meminta konfirmasi sebelum mengganti email yang sudah tersimpan.']])}
    \${kontak()}\` })
};`;

const GAYA = `.bantu-istilah{display:grid;grid-template-columns:max-content 1fr;gap:6px 12px;margin:8px 0 4px;padding:12px 14px;border:1px solid var(--ina-stroke-primary);border-radius:10px;background:var(--ina-background-secondary);font-size:13.5px;line-height:20px}
.bantu-istilah dt{font-weight:600}
.bantu-istilah dd{margin:0;color:var(--ina-content-secondary)}
ol.bantu-langkah{padding-left:22px}
@media (max-width:760px){ .bantu-istilah{grid-template-columns:1fr} .bantu-istilah dd{margin-bottom:6px} }`;

for (const [berkas, isi] of [['tn-system-badan.html', SYSTEM], ['tn-cms-badan.html', CMS], ['tn-eppat-badan.html', EPPAT]]) {
  let t = fs.readFileSync(berkas, 'utf8');
  const a = t.indexOf('const BANTUAN = {'), z = t.indexOf('function bukaBantuan', a);
  if (a < 0 || z < 0) { console.log('TIDAK KETEMU', berkas); process.exitCode = 1; continue; }
  const sebelum = t.slice(0, a).includes('const lgkh =') ? '' : BANTU + '\n';
  t = t.slice(0, a) + sebelum + isi + '\n' + t.slice(z);
  if (!t.includes('.bantu-istilah{')) t = t.replace('</style>', GAYA + '\n</style>');
  fs.writeFileSync(berkas, t);
  const n = (isi.match(/\['[^']+\?', '/g) || []).length;
  console.log('OK', berkas, n, 'pertanyaan');
}
