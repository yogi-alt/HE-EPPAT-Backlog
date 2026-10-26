// Pembakuan tahap 2: SPOK, kata kerja lengkap, subjek jelas, tanpa informasi ganda. node bakukan-eaw-2.js
const fs = require('fs');
const f = 'eaw-badan.html';
let t = fs.readFileSync(f, 'utf8'); const log = [];
const ganti = (dari, ke, semua = false) => { const n = t.split(dari).length - 1; if (!n) { log.push('TIDAK ADA: ' + dari.slice(0, 60)); return; } t = semua ? t.split(dari).join(ke) : t.replace(dari, ke); log.push(`${semua ? n : 1}× ${dari.slice(0, 45)}`); };
ganti('stempel <b>tidak dapat dihapus atau dipindah</b>. Bila ada kesalahan, proses harus diulang dari awal lewat Mulai Ulang.', 'stempel <b>tidak dapat dihapus atau dipindahkan</b>. Bila ada kesalahan, proses harus diulang dari awal melalui tombol Mulai Ulang.');
ganti("'Hasil yang sudah dibubuhkan tidak dapat dipindah. Gunakan Mulai Ulang (menu Lainnya) untuk menyusun ulang sesi. Karena itu, periksa posisi di PDF sebelum mengonfirmasi.'", "'Stempel atau tanda tangan yang sudah dibubuhkan tidak dapat dipindahkan. Gunakan Mulai Ulang (menu Lainnya) untuk menyusun ulang sesi. Karena itu, periksa posisi di PDF sebelum mengonfirmasi.'");
ganti("TERA:'Stempel elektronik resmi kantor PPAT yang terdaftar di Peruri. Dibubuhkan sekali, sebelum para pihak tanda tangan.'", "TERA:'Stempel elektronik resmi kantor PPAT yang terdaftar di Peruri. Stempel ini dibubuhkan satu kali, sebelum para pihak menandatangani akta.'");
ganti("Wajib aktif agar seseorang bisa membubuhkan tanda tangan elektronik.'", "Sertifikat ini wajib aktif agar penanda tangan dapat membubuhkan tanda tangan elektronik.'");
ganti("badge('Sudah tanda tangan', 'success', 'sm')", "badge('Sudah menandatangani', 'success', 'sm')");
ganti("kartuBerikut('Semua pihak sudah tanda tangan', 'Lanjutkan ke langkah 3 untuk membubuhkan e-meterai.'", "kartuBerikut('Semua pihak sudah menandatangani', 'Lanjutkan ke langkah 3 untuk membubuhkan e-meterai.'");
ganti("toast('Stempel TERA berhasil dibubuhkan. Lanjut ke Tanda Tangan Elektronik.', 'positive', 4000);", "toast('Stempel TERA berhasil dibubuhkan.', 'positive', 4000, 'Langkah berikutnya: Tanda Tangan Elektronik.');");
ganti("'Semua pihak sudah tanda tangan. Lanjut ke E-Meterai.'", "'Semua pihak sudah menandatangani. Langkah berikutnya: E-Meterai.'");
ganti("toast('Posisi dihapus. Posisi otomatis akan dipakai.');", "toast('Posisi dihapus. Sistem akan memakai posisi otomatis.');");
ganti("toast('Sesi tanda tangan disiapkan dari para pihak akta.', 'positive')", "toast('Sesi tanda tangan sudah disiapkan berdasarkan data para pihak.', 'positive')");
ganti('aktif. Anda tetap bisa membubuhkan stempel TERA, tetapi proses akan tertahan saat giliran ${belum.length > 1 ? \'mereka\' : \'penanda tangan ini\'} di langkah 2.', 'aktif. Anda tetap dapat membubuhkan stempel TERA, tetapi proses akan tertahan saat tiba giliran ${belum.length > 1 ? \'mereka\' : \'penanda tangan tersebut\'} pada langkah 2.');
ganti("'Langkah dikerjakan berurutan. Langkah berikutnya terbuka setelah langkah sebelumnya selesai.'", "'Langkah dikerjakan secara berurutan. Langkah berikutnya terbuka setelah langkah sebelumnya selesai.'");
ganti('`Langkah dikerjakan berurutan. Langkah berikutnya terbuka setelah langkah sebelumnya selesai.`', '`Langkah dikerjakan secara berurutan. Langkah berikutnya terbuka setelah langkah sebelumnya selesai.`');
ganti('<p>E-Akta Wizard mengesahkan akta final secara elektronik dalam tiga langkah berurutan.</p>', '<p>Melalui E-Akta Wizard, akta final dibubuhi stempel, tanda tangan, dan meterai elektronik dalam tiga langkah berurutan.</p>');
ganti('tentukan posisi stempel (opsional), lalu verifikasi dengan kode OTP dari email TERA kantor.', 'tentukan posisi stempel (opsional), lalu masukkan kode OTP dari email TERA kantor.');
ganti('lalu kirim OTP sesuai urutan. Penanda tangan memberikan kode dari emailnya.', 'lalu kirim OTP sesuai urutan. Setiap penanda tangan menyampaikan kode OTP dari emailnya kepada Anda.');
/* informasi ganda: alasan di kartu "Langkah berikutnya" hanya untuk tombol yang nonaktif */
ganti("    t.hal ? '' : 'Belum ada posisi: stempel akan ditempatkan otomatis di halaman terakhir.');", "    '');");
ganti(", m.hal ? '' : 'Belum ada posisi: meterai ditempatkan otomatis di halaman terakhir.');", ", '');");
ganti('</div>`}\n    </div></div>`;\n}\n\n/* ---------------- gambar & navigasi', '</div>\n        <p class="ket-kecil">Posisi bersifat opsional. Bila tidak ditentukan, meterai ditempatkan otomatis di halaman terakhir.</p>`}\n    </div></div>`;\n}\n\n/* ---------------- gambar & navigasi');
fs.writeFileSync(f, t); console.log(log.join('\n'));
