// index.html: tautan Panduan IDDS Developer + jumlah usulan terbaru (E-Akta Wizard, Masuk & Daftar). node index-26okt.js
const fs = require('fs');
const f = '../prototipe/index.html'; let t = fs.readFileSync(f, 'utf8');
const G = [
  ['cari dan saring daftar akta, serta Bantuan halaman.</div><span class="lenc">9 usulan · HE-EAW-01–07, HE-UMUM-01–02</span></td>\n        <td class="tgl"><time datetime="2026-10-23">23 Okt 2026</time></td>',
   'cari dan saring daftar akta, penjelasan saat TERA kantor belum aktif, pemeriksaan aktivasi e-Meterai dengan konfirmasi pemakaian kuota, serta Bantuan halaman.</div><span class="lenc">11 usulan · HE-EAW-01–09, HE-UMUM-01–02</span></td>\n        <td class="tgl"><time datetime="2026-10-26">26 Okt 2026</time></td>'],
  ['Ganti Password sementara', 'Ganti Kata Sandi sementara'],
  ['syarat password seragam, bahasa dibakukan, masa berlaku OTP terlihat.</div><span class="lenc">7 penyesuaian · IDDS-TN-01–07</span>',
   'syarat kata sandi seragam, bahasa dibakukan, masa berlaku OTP terlihat, serta Bantuan di setiap layar.</div><span class="lenc">8 penyesuaian · IDDS-TN-01–07, IDDS-TN-38</span>'],
  ['    <div class="tab" role="tablist" aria-label="Kelompok prototipe">',
   `    <a class="panduan-dev" href="Panduan-IDDS-Developer.html"><b>Panduan Penerapan IDDS untuk Developer</b><span>Aturan pemasangan, komponen, pola saran HE, aksesibilitas, dan bahasa beserta daftar periksa rilis. Panel notifikasi (IDDS-TN-39) tersedia di lonceng setiap prototipe kantor.</span></a>

    <div class="tab" role="tablist" aria-label="Kelompok prototipe">`],
  ['  .ket-tab{', `  .panduan-dev{display:flex;flex-direction:column;gap:2px;margin-top:16px;padding:12px 16px;border:1px solid var(--line);border-left:4px solid var(--green);border-radius:10px;background:#fff;color:inherit;text-decoration:none}
  .panduan-dev:hover,.panduan-dev:focus-visible{border-color:var(--green)}
  .panduan-dev b{color:var(--green);font-size:15px}
  .panduan-dev span{font-size:13px;line-height:19px;color:var(--muted)}
  .ket-tab{`]
];
let gagal = 0;
for (const [a, b] of G) { if (t.includes(b.split('\n')[0]) && !t.includes(a)) continue; if (!t.includes(a)) { console.log('TIDAK KETEMU:', a.slice(0, 60)); gagal++; continue; } t = t.replace(a, b); }
fs.writeFileSync(f, t); console.log(gagal ? `gagal ${gagal}` : 'OK index');
