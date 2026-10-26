// Sidebar SERAGAM untuk semua prototipe staf kantor (tab Dari HE + Penyesuaian IDDS Tenant):
// grup, menu, ikon, dan tautan sama persis; hanya menu milik prototipe itu sendiri yang dibuka di tempat (data-ke).
// node sidebar-seragam.js   (lalu rakit ulang: lihat RAKIT di bawah)
const fs = require('fs');
const F = {
  sys:'Backlog-IDDS-TN-SYSTEM-Prototype.html', cms:'Backlog-IDDS-TN-CMS-Prototype.html', ep:'Backlog-IDDS-TN-EPPAT-Prototype.html',
  user:'Backlog-HE-USER-Prototype.html', verif:'Backlog-HE-VERIF-Prototype.html', minuta:'Backlog-HE-MINUTA-Prototype.html', eaw:'Backlog-HE-EAW-Prototype.html', order:'Backlog-HE-ORDER-Prototype.html'
};
/* [label, ikon, tujuan] — tujuan dipakai bila menu bukan milik prototipe yang sedang dibuka */
const MENU = [ /* nama & urutan menu baru (26 Okt 2026); hanya menu yang ada di live; ikon Tabler (aset/tabler-sidebar.json) */
  ['Layanan', 'tb_stack_2', [['Permohonan AJB', 'tb_file_text', F.order]]],
  ['Akta', 'tb_feather', [['Dashboard Akta', 'tb_layout_dashboard', F.ep + '#dashboard'], ['Verifikasi Berkas', 'tb_circle_check', F.verif], ['Penyusunan Akta', 'tb_file_pencil', F.minuta], ['Penandatanganan Akta', 'tb_signature', F.eaw], ['Salinan Akta', 'tb_files', F.ep + '#salinan']]],
  ['Pengaturan Kantor', 'tb_adjustments_horizontal', [['Profil Kantor', 'tb_building', F.ep + '#profil'], ['Daftar Pengguna', 'tb_users', F.user], ['Peran & Izin', 'tb_shield_lock', F.sys + '#peran'], ['Log Aktivitas', 'tb_history', F.sys + '#logs'], ['Aktivasi e-Meterai', 'tb_rubber_stamp', F.ep + '#emeterai']]],
  ['Pengaturan Aplikasi', 'tb_settings', [['Dashboard Sistem', 'tb_gauge', F.sys + '#dasbor'], ['Pengaturan', 'tb_settings', F.sys + '#pengaturan']]],
  ['Konten Situs', 'tb_layout_cards', [['Halaman Depan', 'tb_home', F.cms + '#landing'], ['Tema Tampilan', 'tb_palette', F.cms + '#tema'], ['Master Konten', 'tb_database', F.cms + '#master'], ['Artikel & Halaman', 'tb_article', F.cms + '#posts'], ['Pustaka Media', 'tb_photo', F.cms + '#media']]]
];
/* berkas sumber → menu yang dibuka di tempat (label → data-ke) */
const SENDIRI = {
  'tera-idds.html':{ 'Dashboard Sistem':'dashboard' },
  'order-idds.html':{ 'Permohonan AJB':'order' },
  'verif-badan.html':{ 'Verifikasi Berkas':'verif' },
  'minuta-badan.html':{ 'Penyusunan Akta':'minuta' },
  'eaw-badan.html':{ 'Penandatanganan Akta':'eaw' },
  'user-badan.html':{ 'Daftar Pengguna':'user' },
  'tn-system-badan.html':{ 'Dashboard Sistem':'dasbor', 'Peran & Izin':'peran', 'Pengaturan':'pengaturan', 'Log Aktivitas':'logs' },
  'tn-cms-badan.html':{ 'Halaman Depan':'landing', 'Tema Tampilan':'tema', 'Master Konten':'master', 'Artikel & Halaman':'posts', 'Pustaka Media':'media' },
  'tn-eppat-badan.html':{ 'Dashboard Akta':'dashboard', 'Profil Kantor':'profil', 'Salinan Akta':'salinan', 'Aktivasi e-Meterai':'emeterai' }
};
/* ikon yang dibutuhkan sidebar (diambil dari prototipe Daftar User bila belum ada) */
const SUMBER_IKON = fs.readFileSync('user-badan.html', 'utf8');
const IKON = ['chev'];
const TB = JSON.parse(fs.readFileSync('aset/tabler-sidebar.json', 'utf8'));
const BARIS_TB = '  ' + Object.entries(TB).map(([n, p]) => `tb_${n.replace(/-/g, '_')}:'${p}'`).join(', ') + ' /* ikon Tabler sidebar */';
const defIkon = k => { const m = new RegExp(`\\b${k}:'([^']*)'`).exec(SUMBER_IKON); if (!m) throw new Error('ikon tidak ada: ' + k); return `${k}:'${m[1]}'`; };
const q = s => `'${s.replace(/'/g, "\\'")}'`;
let gagal = 0;
for (const [berkas, sendiri] of Object.entries(SENDIRI)) {
  let t = fs.readFileSync(berkas, 'utf8');
  /* 1. NAV */
  const a = t.indexOf('const NAV = ['), z = t.indexOf('\n];', a);
  if (a < 0 || z < 0) { console.log('NAV TIDAK KETEMU', berkas); gagal++; continue; }
  const nav = `const NAV = [ /* sidebar seragam semua prototipe staf (sidebar-seragam.js) */\n${MENU.map(([g, i, m]) => `  { g:${q(g)}, ik:${q(i)}, m:[${m.map(([l, ik]) => `[${q(l)},${q(ik)}${sendiri[l] ? ',' + q(sendiri[l]) : ''}]`).join(',')}] }`).join(',\n')}\n];`;
  t = t.slice(0, a) + nav + t.slice(z + 3);
  /* 2. PROTO (semua menu yang bukan milik sendiri) */
  const p = t.indexOf('const PROTO = {'), pz = t.indexOf('}; /* menu → prototipe */', p);
  if (p < 0 || pz < 0) { console.log('PROTO TIDAK KETEMU', berkas); gagal++; continue; }
  const proto = `const PROTO = { ${MENU.flatMap(([, , m]) => m).filter(([l]) => !sendiri[l]).map(([l, , u]) => `${q(l)}:${q(u)}`).join(', ')} }; /* menu → prototipe */`;
  t = t.slice(0, p) + proto + t.slice(pz + '}; /* menu → prototipe */'.length);
  /* 3. semua grup terbuka */
  t = t.replace(/const grupBuka = new Set\(\[[^\]]*\]\);/, 'const grupBuka = new Set([0, 1, 2, 3, 4]);');
  /* 4. ikon yang belum ada */
  const ia = t.indexOf('const I = {'), iz = t.indexOf('\n};', ia);
  const blokI = t.slice(ia, iz), kurang = IKON.filter(k => !new RegExp(`[\\s{,]${k}:'`).test(blokI));
  if (kurang.length) t = t.slice(0, iz) + `,\n  ${kurang.map(defIkon).join(', ')} /* ikon sidebar seragam */` + t.slice(iz);
  /* 5. ikon Tabler sidebar (diganti setiap kali skrip dijalankan) */
  t = t.replace(/,\n  tb_[^\n]*\/\* ikon Tabler sidebar \*\//, '');
  const iz2 = t.indexOf('\n};', t.indexOf('const I = {'));
  t = t.slice(0, iz2) + ',\n' + BARIS_TB + t.slice(iz2);
  fs.writeFileSync(berkas, t);
  console.log('OK', berkas, kurang.length ? '+ikon ' + kurang.join(',') : '');
}
process.exitCode = gagal ? 1 : 0;
