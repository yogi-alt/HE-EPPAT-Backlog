// Nama menu tenant baru (26 Okt 2026) di luar prototipe: backlog-he.json (HE-* & IDDS-TN-*, kecuali Kondisi saat ini),
// index.html (selain baris Platform/Onboarding), judul tab di rakit-semua.js, dan isi Panduan IDDS (selain aturan Platform).
// node nama-menu-baru.js [path isi-panduan.js]
const fs = require('fs');
const FITUR = [
  ['Tenant · System · Dasbor', 'Tenant · Pengaturan Aplikasi · Dashboard Sistem'], ['Tenant · System · Peran & Izin', 'Tenant · Pengaturan Kantor · Peran & Izin'],
  ['Tenant · System · Pengaturan', 'Tenant · Pengaturan Aplikasi · Pengaturan'], ['Tenant · System · Logs', 'Tenant · Pengaturan Kantor · Log Aktivitas'],
  ['Tenant · System · Semua halaman System', 'Tenant · Pengaturan Aplikasi dan Pengaturan Kantor · Semua halaman'],
  ['Tenant · CMS · Semua halaman CMS', 'Tenant · Konten Situs · Semua halaman'], ['Tenant · CMS ·', 'Tenant · Konten Situs ·'],
  ['Tenant · E-PPAT Module · Dashboard', 'Tenant · Akta · Dashboard Akta'], ['Tenant · E-PPAT Module · Profil Kantor', 'Tenant · Pengaturan Kantor · Profil Kantor'],
  ['Tenant · E-PPAT Module · Akta Salinan', 'Tenant · Akta · Salinan Akta'], ['Tenant · E-PPAT Module · Aktivasi E-Materai', 'Tenant · Pengaturan Kantor · Aktivasi e-Meterai'],
  ['Tenant · E-PPAT Module · Semua halaman E-PPAT Module', 'Tenant · Akta dan Pengaturan Kantor · Semua halaman'],
  ['Minuta Akta', 'Penyusunan Akta'], ['Tenant · System', 'Tenant · Pengaturan Aplikasi'], ['Tenant · CMS', 'Tenant · Konten Situs'], ['Tenant · E-PPAT Module', 'Tenant · Akta']
];
const UMUM = [
  ['System › Dasbor', 'Pengaturan Aplikasi › Dashboard Sistem'], ['Dashboard System', 'Dashboard Sistem'], ['Aktivasi E-Materai', 'Aktivasi e-Meterai'], ['E-Materai', 'e-Meterai'],
  ['Materai', 'Meterai'], ['materai', 'meterai'], ['E-Akta Wizard', 'Penandatanganan Akta'], ['Akta Repository', 'Arsip Akta'], ['Akta Salinan', 'Salinan Akta'],
  ['Verifikasi Akta', 'Verifikasi Berkas'], ['Buat Order', 'Buat Permohonan'], ['Order AJB', 'Permohonan AJB'], ['Daftar User', 'Daftar Pengguna'], ['Landing Page', 'Halaman Depan'],
  ['Setting Theme', 'Tema Tampilan'], ['Media Library', 'Pustaka Media'], ['Posts & Pages', 'Artikel & Halaman'], ['Posts &amp; Pages', 'Artikel &amp; Halaman'],
  ['E-PPAT Module', 'Akta'], ['Drafting Minuta Akta', 'Penyusunan Akta'], ['Drafting', 'Penyusunan'], ['Minuta ›', 'Penyusunan Akta ›'], [/\bLogs\b/g, 'Log Aktivitas']
];
const ganti = (s, daftar) => { let n = 0; for (const [a, b] of daftar) { const re = a instanceof RegExp ? a : new RegExp(a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'); s = s.replace(re, () => (n++, b)); } return [s, n]; };
let total = 0;
/* 1. backlog-he.json */
const j = JSON.parse(fs.readFileSync('backlog-he.json', 'utf8'));
const disinkron = k => /^(IDDS-TN|HE-EAW)-/.test(k) && k !== 'IDDS-TN-39';
for (const it of j.item) {
  if (!/^(HE|IDDS-TN)-/.test(it.kode)) continue;
  const kolom = ['fitur', 'layar', 'selesai_bila', 'catatan'].concat(disinkron(it.kode) ? [] : ['judul', 'usulan']);
  for (const c of kolom) { if (!it[c]) continue; let [s, n] = c === 'fitur' ? ganti(it[c], FITUR.concat(UMUM)) : ganti(it[c], UMUM); if (n) { it[c] = s; it.tanggal = '2026-10-26'; total += n; } }
}
fs.writeFileSync('backlog-he.json', JSON.stringify(j, null, 2));
/* 2. index.html: baris tab he & tenant saja */
let ix = fs.readFileSync('../prototipe/index.html', 'utf8');
ix = ix.replace(/<tr class="baris" data-tab="(he|tenant)"[\s\S]*?<\/tr>/g, m => { const [s, n] = ganti(m, UMUM); total += n; return s; });
fs.writeFileSync('../prototipe/index.html', ix);
/* 3. judul tab prototipe */
let rs = fs.readFileSync('rakit-semua.js', 'utf8');
for (const [a, b] of [["'Verifikasi Akta'", "'Verifikasi Berkas'"], ["'Minuta Akta'", "'Penyusunan Akta'"], ["'E-Akta Wizard'", "'Penandatanganan Akta'"], ["'E-Akta Wizard (Klien)'", "'Penandatanganan Akta (Klien)'"], ["'Daftar User'", "'Daftar Pengguna'"], ["'Tenant · System'", "'Tenant · Pengaturan Aplikasi & Kantor'"], ["'Tenant · CMS'", "'Tenant · Konten Situs'"], ["'Tenant · E-PPAT Module'", "'Tenant · Akta'"]]) if (rs.includes(a)) { rs = rs.split(a).join(b); total++; }
fs.writeFileSync('rakit-semua.js', rs);
/* 4. isi panduan (baris yang menyebut Platform/PL dibiarkan) */
const fp = process.argv[2];
if (fp && fs.existsSync(fp)) {
  const baris = fs.readFileSync(fp, 'utf8').split('\n').map(l => { if (/Platform|PLSIS|PLMON|PLAKTA|PLMASUK|IDDS-PL/.test(l)) return l; const [s, n] = ganti(l, UMUM); total += n; return s; });
  fs.writeFileSync(fp, baris.join('\n'));
}
console.log('OK penggantian:', total);
