// Riwayat + baris index tab Platform untuk Monitoring, Jenis Akta, dan Sistem (IDDS-PL-11…40). node tambah-pl-menu.js
const fs = require('fs');
const j = JSON.parse(fs.readFileSync('backlog-he.json', 'utf8'));
const T = '2026-10-26';
const R = [
  { kode:'IDDS-PL-11–40', perubahan:'Prototipe penyesuaian IDDS menu Platform dibuat dari layar live (dilihat dengan akun admin platform, tanpa mengubah data) dan kode live: Monitoring (Dasbor, Daftar PPAT, Paket Langganan, Log Aktivitas), Akta (Jenis Akta beserta template, variabel, pasal dan catatan), Sistem (Setting Theme, Pengaturan Global 5 tab, Akun Saya). Sidebar, header, panel notifikasi (data admin platform), dan Bantuan seragam di keempat prototipe Platform.', berkas:'prototipe/Backlog-IDDS-PL-MONITORING-Prototype.html; Backlog-IDDS-PL-AKTA-Prototype.html; Backlog-IDDS-PL-SISTEM-Prototype.html' }
];
for (const r of R) if (!j.riwayat.some(y => y.perubahan === r.perubahan)) j.riwayat.push({ tanggal:T, ...r });
fs.writeFileSync('backlog-he.json', JSON.stringify(j, null, 2));
const f = '../prototipe/index.html'; let t = fs.readFileSync(f, 'utf8');
const baris = (href, kode, nm, isi, lenc) => `      <tr class="baris" data-tab="platform" data-href="${href}">
        <td class="kode">${kode}</td>
        <td><div class="nm">${nm}</div><div class="isi">${isi}</div><span class="lenc">${lenc}</span></td>
        <td class="tgl"><time datetime="2026-10-26">26 Okt 2026</time></td>
        <td class="chev"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></td>
      </tr>
`;
const B = [
  ['Backlog-IDDS-PL-MONITORING-Prototype.html', 'IDDS-PL-MONITORING', 'Platform · Monitoring', 'Dasbor Platform, Daftar PPAT, Paket Langganan, dan Log Aktivitas: kode mentah diganti label Indonesia, subjudul jujur untuk halaman hanya baca beserta rujukan ke aplikasi Onboarding, status sistem dengan waktu pemeriksaan, saringan log berlabel, serta Bantuan per halaman.', '10 penyesuaian · IDDS-PL-11–20'],
  ['Backlog-IDDS-PL-AKTA-Prototype.html', 'IDDS-PL-AKTA', 'Platform · Jenis Akta', 'Katalog jenis akta beserta template, variabel, serta pasal dan catatan: aksi berlabel, konfirmasi saat menonaktifkan atau menghapus, penulisan variabel {{kunci}} yang konsisten, pengecek isi yang jelas, penjaga perubahan, serta Bantuan per layar.', '10 penyesuaian · IDDS-PL-21–30'],
  ['Backlog-IDDS-PL-SISTEM-Prototype.html', 'IDDS-PL-SISTEM', 'Platform · Sistem', 'Setting Theme area platform (pola sama dengan tenant), Pengaturan Global (Umum, Email SMTP, WhatsApp OCA, Peruri CA, Gemini AI) dengan validasi, rahasia tersamar, dan konfirmasi berdampak, serta Akun Saya dengan syarat kata sandi 12 karakter + 4 jenis dan 2FA terpandu.', '10 penyesuaian · IDDS-PL-31–40']
];
for (const [h, k, n, i, l] of B) if (!t.includes(h)) t = t.replace('        </tbody>', baris(h, k, n, i, l) + '        </tbody>');
fs.writeFileSync(f, t);
console.log(j.riwayat.length, 'riwayat | index platform:', (t.match(/data-tab="platform" data-href/g) || []).length);
