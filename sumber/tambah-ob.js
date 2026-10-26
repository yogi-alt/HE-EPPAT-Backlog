// Riwayat + baris index tab Onboarding untuk Beranda/Kata Sandi/Profil, Monitoring, Verifikasi, Pengaturan (IDDS-OB-01…45). node tambah-ob.js
const fs = require('fs');
const j = JSON.parse(fs.readFileSync('backlog-he.json', 'utf8'));
const T = '2026-10-26';
const R = [
  { kode:'IDDS-OB-01–45', perubahan:'Prototipe penyesuaian IDDS aplikasi Onboarding (dev.eppat.id) dibuat dari layar live (dilihat dengan akun Admin dan Operator, tanpa mengubah data): Beranda publik, Lupa dan Atur Ulang Kata Sandi, Profil Saya pelanggan, Dasbor Admin, Manajemen Onboarding beserta detail pendaftar, Verifikasi Anggota/Produk/Pembayaran, Menu, Daftar Pengguna, Peran Pengguna, Harga Produk, dan Paket Langganan. Sidebar, header, menu akun, dan Bantuan seragam di ketiga prototipe staf; data contoh pendaftar sama di semua prototipe. Prototipe HE Onboarding kini dapat dibuka langsung ke layar Login (#masuk) atau Registrasi (#daftar).', berkas:'prototipe/Backlog-IDDS-OB-MASUK-Prototype.html; Backlog-IDDS-OB-MONITOR-Prototype.html; Backlog-IDDS-OB-VERIF-Prototype.html; Backlog-IDDS-OB-PENGATURAN-Prototype.html' }
  ,{ kode:'IDDS-OB-46–60', perubahan:'Prototipe Simulasi Pembayaran Onboarding: delapan langkah dari pilih paket sampai aplikasi aktif dapat disimulasikan satu per satu dan terekam di Rekam Jejak (unduh CSV), dengan tampilan pelanggan dan operator yang tersinkron serta cabang kedaluwarsa, gagal, ganti paket/bank, dan batal perpanjang. Pembayaran lunas hanya dari konfirmasi bank (tanpa tombol sandbox di sistem admin). Isi saat ini diambil dari uji live akun Uji Onboarding HE (VA terbit 14.53, lunas 26 Okt 2026 22.45).', berkas:'prototipe/Backlog-IDDS-OB-BAYAR-Prototype.html' }
];
for (const r of R) if (!j.riwayat.some(y => y.perubahan === r.perubahan)) j.riwayat.push({ tanggal:T, ...r });
fs.writeFileSync('backlog-he.json', JSON.stringify(j, null, 2));
const f = '../prototipe/index.html'; let t = fs.readFileSync(f, 'utf8');
const baris = (href, kode, nm, isi, lenc) => `      <tr class="baris" data-tab="onboarding" data-href="${href}">
        <td class="kode">${kode}</td>
        <td><div class="nm">${nm}</div><div class="isi">${isi}</div><span class="lenc">${lenc}</span></td>
        <td class="tgl"><time datetime="2026-10-26">26 Okt 2026</time></td>
        <td class="chev"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></td>
      </tr>
`;
const B = [
  ['Backlog-IDDS-OB-MASUK-Prototype.html', 'IDDS-OB-MASUK', 'Onboarding · Beranda, Kata Sandi &amp; Profil', 'Beranda publik dengan tombol Masuk dan Daftar, Lupa dan Atur Ulang Kata Sandi dengan syarat yang sama seperti Registrasi, serta Profil Saya pelanggan (PPAT, Kantor PPAT, Kata Sandi &amp; MFA) dengan galat di bawah isian, penjaga perubahan, dan Bantuan.', '10 penyesuaian · IDDS-OB-01–10'],
  ['Backlog-IDDS-OB-MONITOR-Prototype.html', 'IDDS-OB-MONITOR', 'Onboarding · Monitoring', 'Dasbor Admin dan Manajemen Onboarding: menu berbahasa Indonesia, lencana status Indonesia, saringan tahap IDDS Chip, Detail Pendaftar dengan Stepper sembilan tahap, Provisi Manual berkonfirmasi, serta Bantuan per halaman.', '10 penyesuaian · IDDS-OB-11–20'],
  ['Backlog-IDDS-OB-VERIF-Prototype.html', 'IDDS-OB-VERIF', 'Onboarding · Verifikasi', 'Verifikasi Anggota (dengan keputusan Setujui/Tolak berkonfirmasi), Verifikasi Produk, dan Verifikasi Pembayaran beserta detail transaksi: label status Indonesia, saringan berlabel, detail sebagai halaman dengan tombol Kembali, serta Bantuan.', '10 penyesuaian · IDDS-OB-21–30'],
  ['Backlog-IDDS-OB-PENGATURAN-Prototype.html', 'IDDS-OB-PENGATURAN', 'Onboarding · Pengaturan', 'Menu, Daftar Pengguna dan Edit Pengguna, Peran Pengguna, Harga Produk, serta Paket Langganan: aksi berlabel nama item, konfirmasi merah saat menghapus atau mencabut akses, galat di bawah isian, penjaga perubahan, dan Bantuan.', '15 penyesuaian · IDDS-OB-31–45'],
  ['Backlog-IDDS-OB-BAYAR-Prototype.html', 'IDDS-OB-BAYAR', 'Onboarding · Simulasi Pembayaran', 'Simulasi pembayaran langkah demi langkah untuk dua jalur, Enterprise langsung serta Trial lalu Upgrade, dengan Rekam Jejak yang dapat diunduh: tahap pembayaran tercatat sejak VA dibuat, QRIS nonaktif dengan alasan, tagihan kedaluwarsa dan gagal ditangani, Riwayat mencatat Trial dan Upgrade dengan nama yang benar, serta email aktivasi tanpa kata sandi.', '15 penyesuaian · IDDS-OB-46–60']
];
for (const [h, k, n, i, l] of B) if (!t.includes(`data-tab="onboarding" data-href="${h}"`)) t = t.replace('        </tbody>', baris(h, k, n, i, l) + '        </tbody>');
fs.writeFileSync(f, t);
console.log(j.riwayat.length, 'riwayat | index onboarding:', (t.match(/data-tab="onboarding" data-href/g) || []).length);
