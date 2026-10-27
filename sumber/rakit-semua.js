// Rakit ulang semua prototipe kantor (Dari HE + Penyesuaian IDDS Tenant). node rakit-semua.js
const { execFileSync } = require('child_process');
const jalan = (...a) => execFileSync('node', a, { stdio:['ignore', 'pipe', 'inherit'] }).toString().trim();
const G = [ // [badan, idds, judul tab, keluaran, rakit-onboarding?]
  ['verif-badan.html', 'verif-idds.html', 'Verifikasi Berkas', 'Backlog-HE-VERIF-Prototype.html'],
  ['minuta-badan.html', 'minuta-idds.html', 'Penyusunan Akta', 'Backlog-HE-MINUTA-Prototype.html'],
  ['minuta2-badan.html', 'minuta2-idds.html', 'Penyusunan Akta v2', 'Backlog-HE-MINUTA-V2-Prototype.html'],
  ['eaw-badan.html', 'eaw-idds.html', 'Penandatanganan Akta', 'Backlog-HE-EAW-Prototype.html'],
  ['eawk-badan.html', 'eawk-idds.html', 'Penandatanganan Akta (Klien)', 'Backlog-HE-EAWK-Prototype.html'],
  ['ca-badan.html', 'ca-idds.html', 'Registrasi CA', 'Backlog-HE-CA-Prototype.html'],
  ['user-badan.html', 'user-idds.html', 'Daftar Pengguna', 'Backlog-HE-USER-Prototype.html'],
  ['tn-masuk-badan.html', 'tn-masuk-idds.html', 'Tenant · Masuk & Daftar — Penyesuaian IDDS', 'Backlog-IDDS-TN-MASUK-Prototype.html', true],
  ['tn-system-badan.html', 'tn-system-idds.html', 'Tenant · Pengaturan Aplikasi & Kantor', 'Backlog-IDDS-TN-SYSTEM-Prototype.html'],
  ['tn-cms-badan.html', 'tn-cms-idds.html', 'Tenant · Konten Situs', 'Backlog-IDDS-TN-CMS-Prototype.html'],
  ['tn-eppat-badan.html', 'tn-eppat-idds.html', 'Tenant · Akta & Pengaturan Kantor', 'Backlog-IDDS-TN-EPPAT-Prototype.html'],
  ['pl-masuk-badan.html', 'pl-masuk-idds.html', 'Platform · Masuk', 'Backlog-IDDS-PL-MASUK-Prototype.html', true],
  ['pl-monitoring-badan.html', 'pl-monitoring-idds.html', 'Platform · Monitoring', 'Backlog-IDDS-PL-MONITORING-Prototype.html'],
  ['pl-akta-badan.html', 'pl-akta-idds.html', 'Platform · Jenis Akta', 'Backlog-IDDS-PL-AKTA-Prototype.html'],
  ['pl-sistem-badan.html', 'pl-sistem-idds.html', 'Platform · Sistem', 'Backlog-IDDS-PL-SISTEM-Prototype.html'],
  ['onboard-badan.html', 'onboard-idds.html', 'Platform Onboarding', 'Backlog-HE-ONBOARDING-Prototype.html', true],
  ['ob-masuk-badan.html', 'ob-masuk-idds.html', 'Onboarding · Beranda, Kata Sandi & Profil', 'Backlog-IDDS-OB-MASUK-Prototype.html', true],
  ['ob-monitor-badan.html', 'ob-monitor-idds.html', 'Onboarding · Monitoring', 'Backlog-IDDS-OB-MONITOR-Prototype.html'],
  ['ob-verif-badan.html', 'ob-verif-idds.html', 'Onboarding · Verifikasi', 'Backlog-IDDS-OB-VERIF-Prototype.html'],
  ['ob-pengaturan-badan.html', 'ob-pengaturan-idds.html', 'Onboarding · Pengaturan', 'Backlog-IDDS-OB-PENGATURAN-Prototype.html'],
  ['ob-bayar-badan.html', 'ob-bayar-idds.html', 'Onboarding · Simulasi Pembayaran', 'Backlog-IDDS-OB-BAYAR-Prototype.html']
];
const LANGSUNG = [['tera-idds.html', 'Backlog-HE-TERA-Prototype.html'], ['order-idds.html', 'Backlog-HE-ORDER-Prototype.html']];
for (const [s, k] of LANGSUNG) console.log(jalan('rakit-idds.js', s, '../prototipe/' + k));
for (const [b, i, j, k, ob] of G) { jalan('gabung.js', b, i, j); console.log(jalan('rakit-idds.js', i, '../prototipe/' + k)); if (ob) jalan('rakit-onboarding.js', '../prototipe/' + k); }
