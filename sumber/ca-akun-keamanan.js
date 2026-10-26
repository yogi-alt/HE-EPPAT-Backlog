// Tab Akun & Keamanan diseragamkan dengan pola kartu Data Diri/Registrasi CA + saran HE (HE-CA-08). node ca-akun-keamanan.js
const fs = require('fs');
const f = 'ca-badan.html';
let t = fs.readFileSync(f, 'utf8'); const log = [];
const ganti = (dari, ke) => { const n = t.split(dari).length - 1; if (!n) { log.push('TIDAK ADA: ' + dari.slice(0, 70)); return; } t = t.split(dari).join(ke); log.push(`${n}× ${dari.slice(0, 50)}`); };
const potong = (awal, akhir, ke) => { const i = t.indexOf(awal), j = t.indexOf(akhir, i + 1); if (i < 0 || j < 0) { log.push('TIDAK ADA blok: ' + awal.slice(0, 40)); return; } t = t.slice(0, i) + ke + t.slice(j); log.push('blok ' + awal.slice(0, 40)); };

/* ikon tambahan */
ganti("  unggah:'<path d=\"M21 15v4a2", "  mata:'<path d=\"M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/>', mataTutup:'<path d=\"M17.9 17.9A10 10 0 0 1 12 19c-7 0-11-7-11-7a18 18 0 0 1 5.1-5.9M9.9 4.2A9 9 0 0 1 12 4c7 0 11 7 11 7a18 18 0 0 1-2.2 3.2M1 1l22 22\"/>',\n  laptop:'<rect x=\"3\" y=\"4\" width=\"18\" height=\"12\" rx=\"2\"/><path d=\"M2 20h20\"/>', ponsel:'<rect x=\"7\" y=\"2\" width=\"10\" height=\"20\" rx=\"2\"/><path d=\"M11 18h2\"/>',\n  unggah:'<path d=\"M21 15v4a2");

/* data contoh: akun & sesi */
ganti("profil:PROFIL_KOSONG(), modalAwal:true, ubahAkun:false", "profil:PROFIL_KOSONG(), modalAwal:true, ubahAkun:false, sesi:SESI()");
ganti("const PROFIL_KOSONG = () =>", `const SESI = () => [
  { id:1, jenis:'Laptop', ket:'Chrome · Windows', ip:'10.0.0.21', mulai:'26 Okt 2026, 09.15', habis:'2 Nov 2026, 09.15', ini:true },
  { id:2, jenis:'Ponsel', ket:'Chrome · Android', ip:'10.0.0.35', mulai:'24 Okt 2026, 19.02', habis:'31 Okt 2026, 19.02', ini:false }];
const PROFIL_KOSONG = () =>`);

/* tab Akun & Keamanan: pola kartu seragam (ikon bulat + judul + keterangan + kaki) */
potong('function tabAkunInfo() {', 'function tabData() {', `/* kepala kartu seragam untuk semua tab Akun Saya (HE-CA-08) */
const kepala = (ikon, judul, ket, kanan = '') => \`<div class="kartu-kepala"><span class="ikon-bulat">\${ik(ikon, 20)}</span><div style="flex:1;min-width:0"><h2>\${judul}</h2><p>\${ket}</p></div>\${kanan}</div>\`;
const PERAN_KET = 'Klien adalah pihak dalam akta, misalnya penjual, pembeli, atau saksi.';
function tabAkunInfo() {
  const p = S.profil;
  const judul = \`<span>\${esc(p.nama)}</span> \${denganTip(badge('Klien', 'info', 'sm'), PERAN_KET)} \${badge('Aktif', 'success', 'sm')}\`;
  if (S.ubahAkun) return \`\${S.dariCa ? alertKelengkapan() : ''}<div class="ina-card ina-card--variant-basic kartu ditandai" id="kartuAkunUbah">
    \${kepala('user', 'Ubah nama akun', 'Tulis nama sesuai KTP agar nama Anda di akta benar.')}
    <div class="form-dd">\${tfAkun('aDepan', 'Nama depan', p.depan, '', true)}\${tfAkun('aTengah', 'Nama tengah <span class="opsional">(opsional)</span>', p.tengah, '')}\${tfAkun('aBelakang', 'Nama belakang <span class="opsional">(opsional)</span>', p.belakang, '')}</div>
    <p class="ket-grup" style="margin-top:12px">Nomor HP diubah di tab Data Diri (KTP).</p>
    <div class="kartu-kaki" style="align-items:center"><span class="status-simpan" id="statusDd">\${ik('centang', 14)} Belum ada perubahan</span>\${tombol('Batal', 'secondary', 'md', 'id="batalAkun"')}\${tombol('Simpan Perubahan', 'primary', 'md', 'id="simpanAkun"', ik('centang', 16))}\${usulan('HE-CA-08')}</div></div>\`;
  return \`\${S.dariCa ? alertKelengkapan() : ''}<div class="ina-card ina-card--variant-basic kartu ditandai" id="kartuAkun">
    \${kepala('user', judul, 'Identitas yang Anda pakai untuk masuk ke E-PPAT.', tombol('Ubah Nama', 'secondary', 'md', 'id="ubahAkun"', ik('pena', 16)))}
    <dl class="kv-akun">\${[['Nama depan', esc(p.depan)], ['Nama tengah', esc(p.tengah) || '—'], ['Nama belakang', esc(p.belakang) || '—'],
      ['Email', esc(p.email) + '<small>Hubungi admin kantor untuk mengubah email.</small>'],
      ['Nomor HP', (esc(p.hp) || '—') + \`<small>Diubah di <a href="#" data-tab="data">tab Data Diri</a>.</small>\`],
      ['Masuk terakhir', '26 Oktober 2026, 09.15'], ['Akun dibuat', '23 Oktober 2026, 08.00'],
      ['ID akun', '<span class="mono">USR-CONTOH01</span><small>Sebutkan ID ini saat menghubungi dukungan.</small>']].map(([k, v]) => \`<div><dt>\${k}</dt><dd>\${v}</dd></div>\`).join('')}</dl>\${usulan('HE-CA-08')}</div>\`;
}
const tfAkun = (id, l, v, ph, wajib, bantu = '') => \`<div class="ina-text-field" id="f-\${id}"><label class="ina-text-field__label" for="\${id}">\${l}\${wajib ? '<span class="ina-text-field__required">*</span>' : ''}</label>
  <div class="ina-text-field__wrapper ina-text-field__wrapper--size-md"><input id="\${id}" class="ina-text-field__input" value="\${esc(v)}" placeholder="\${ph}"></div>
  <div class="ina-text-field__bottom-area"><div class="ina-text-field__helper-text" id="h-\${id}" data-bantu="\${esc(bantu)}">\${bantu}</div></div></div>\`;
/* IDDS Password Input dengan tombol tampilkan/sembunyikan dan pesan status */
const pwIsian = (id, l, ph, bantu, ac) => \`<div class="ina-password-input" id="f-\${id}"><label class="ina-password-input__label" for="\${id}">\${l}<span class="ina-password-input__required">*</span></label>
  <div class="ina-password-input__wrapper ina-password-input__wrapper--size-md ina-password-input__wrapper--neutral"><input id="\${id}" type="password" class="ina-password-input__input" placeholder="\${ph}" autocomplete="\${ac}">
  <div class="ina-password-input__actions"><button type="button" class="ina-password-input__toggle-button" data-lihat-pw="\${id}" aria-label="Tampilkan password" aria-pressed="false">\${ik('mata', 18)}</button></div></div>
  <div class="ina-password-input__status-area"><span class="ina-password-input__status-message" id="h-\${id}" aria-live="polite">\${bantu}</span></div></div>\`;
function tabAman() {
  const sesiLain = S.sesi.filter(s => !s.ini).length;
  return \`<div class="ina-card ina-card--variant-basic kartu">
    \${kepala('tameng', \`<span>Verifikasi dua langkah (2FA)</span> \${badge('Belum aktif', 'neutral', 'sm')}\`, 'Saat masuk, Anda diminta kode 6 digit dari aplikasi autentikator (mis. Google Authenticator atau Authy) selain password.', tombol('Aktifkan 2FA', 'primary', 'md', 'data-luar="Aktivasi 2FA"', ik('tameng', 16)))}</div>
  <div class="ina-card ina-card--variant-basic kartu ditandai" id="kartuPassword">
    \${kepala('kunci', 'Ganti password', 'Setelah password diganti, akun Anda otomatis keluar dari perangkat lain. Anda tetap masuk di perangkat ini.')}
    <div class="form-dd"><div class="lebar">\${pwIsian('pLama', 'Password saat ini', 'Masukkan password yang Anda pakai sekarang', '', 'current-password')}</div>
      \${pwIsian('pBaru', 'Password baru', 'Minimal 8 karakter', 'Minimal 8 karakter.', 'new-password')}\${pwIsian('pUlang', 'Ulangi password baru', 'Ketik ulang password baru', '', 'new-password')}</div>
    <div class="kartu-kaki">\${tombol('Ganti Password', 'primary', 'md', 'id="gantiPw" disabled', ik('kunci', 16))}\${usulan('HE-CA-08')}</div></div>
  <div class="ina-card ina-card--variant-basic kartu ditandai" id="kartuSesi">
    \${kepala('laptop', 'Perangkat yang sedang masuk', 'Keluarkan perangkat yang tidak Anda kenali atau tidak dipakai lagi.', sesiLain ? tombol('Keluarkan Semua Perangkat Lain', 'secondary', 'sm', 'data-keluar-semua', ik('keluar', 14)) : '')}
    <ul class="daftar-sesi">\${S.sesi.map(s => \`<li><span class="ikon-bulat kecil">\${ik(s.jenis === 'Ponsel' ? 'ponsel' : 'laptop', 18)}</span>
      <div class="sesi-isi"><b>\${s.jenis} · \${s.ket}</b> \${s.ini ? badge('Perangkat ini', 'success', 'sm') : ''}<small>IP \${s.ip} · Masuk \${s.mulai} · Berlaku sampai \${s.habis}</small></div>
      \${tombol(s.ini ? 'Keluar dari Perangkat Ini' : 'Keluarkan', 'tertiary', 'sm', \`data-keluar-sesi="\${s.id}" data-merah\`, ik('keluar', 14))}</li>\`).join('')}</ul>\${usulan('HE-CA-08')}</div>\`;
}
`);

/* Data Diri: kepala kartu ikut pola seragam */
ganti(`<div class="kartu-kepala" style="gap:10px"><span style="color:var(--ina-primary-600)">\${ik('ktp', 20)}</span><div>
      <h2 style="font-weight:500">Data Diri (KTP)</h2>`, `<div class="kartu-kepala"><span class="ikon-bulat">\${ik('ktp', 20)}</span><div>
      <h2>Data Diri (KTP)</h2>`);

/* interaksi: simpan akun (dengan penjaga perubahan), password, sesi */
potong("  if (t.closest('#simpanAkun')) {", "  /* tab Data Diri: unggah KTP", `  if (t.closest('#simpanAkun')) { simpanAkun(); return; }
  if (t.closest('#batalAkun')) { S.ddUbah = false; S.ubahAkun = false; gambar(); return; }
  const lp = t.closest('[data-lihat-pw]'); if (lp) { const i = $('#' + lp.dataset.lihatPw), lihat = i.type === 'password'; i.type = lihat ? 'text' : 'password'; lp.setAttribute('aria-pressed', lihat); lp.setAttribute('aria-label', lihat ? 'Sembunyikan password' : 'Tampilkan password'); lp.innerHTML = ik(lihat ? 'mataTutup' : 'mata', 18); return; }
  if (t.closest('#gantiPw')) { gantiPassword(); return; }
  const ks = t.closest('[data-keluar-sesi]'); if (ks) { keluarSesi(+ks.dataset.keluarSesi); return; }
  if (t.closest('[data-keluar-semua]')) { keluarSemua(); return; }
`);
ganti("  if (t.closest('#batalAkun')) { S.ubahAkun = false; gambar(); return; }\n", "");
ganti("  if (S.layar === 'akun' && S.tab === 'data' && e.target.closest('#kartuDataDiri')) tandaiUbahDd();", "  if (S.layar === 'akun' && e.target.closest('#kartuDataDiri, #kartuAkunUbah')) tandaiUbahDd();\n  if (e.target.closest('#kartuPassword')) cekPassword();");
ganti("function tandaiUbahDd() {", `function simpanAkun(lanjut) {
  const v = id => $('#' + id).value.trim();
  if (!v('aDepan')) { galatH('aDepan', 'Nama depan wajib diisi.'); return false; }
  Object.assign(S.profil, { depan:v('aDepan'), tengah:v('aTengah'), belakang:v('aBelakang'), nama:[v('aDepan'), v('aTengah'), v('aBelakang')].filter(Boolean).join(' ') });
  S.ubahAkun = false; S.ddUbah = false;
  if (lanjut) { lanjut(); toast('Nama akun tersimpan.', 'positive'); return true; }
  gambar(); toast('Nama akun tersimpan.', 'positive'); return true;
}
/* ganti password: periksa saat mengetik (H5), pesan di bawah isian (H9) */
function setPw(id, pesan, jenis) {
  const w = $(\`#f-\${id} .ina-password-input__wrapper\`), h = $(\`#h-\${id}\`); if (!w) return;
  w.className = \`ina-password-input__wrapper ina-password-input__wrapper--size-md ina-password-input__wrapper--\${jenis || 'neutral'}\`;
  h.textContent = pesan; h.className = \`ina-password-input__status-message \${jenis ? 'ina-password-input__status-message--' + jenis : ''}\`;
}
function cekPassword() {
  const lama = $('#pLama').value, baru = $('#pBaru').value, ulang = $('#pUlang').value;
  if (!baru) setPw('pBaru', 'Minimal 8 karakter.', '');
  else if (baru.length < 8) setPw('pBaru', \`Minimal 8 karakter (\${baru.length}/8).\`, 'warning');
  else if (baru === lama) setPw('pBaru', 'Password baru harus berbeda dari password saat ini.', 'error');
  else setPw('pBaru', 'Panjang password sudah cukup.', 'success');
  if (!ulang) setPw('pUlang', '', '');
  else if (ulang !== baru) setPw('pUlang', 'Password belum sama dengan password baru.', 'error');
  else setPw('pUlang', 'Password sama.', 'success');
  setPw('pLama', '', '');
  $('#gantiPw').disabled = !(lama && baru.length >= 8 && baru !== lama && ulang === baru);
}
function gantiPassword() {
  if ($('#pLama').value === 'salah123') { setPw('pLama', 'Password saat ini tidak sesuai. Periksa kembali, perhatikan huruf besar dan kecil.', 'error'); $('#pLama').focus(); return; }
  const lain = S.sesi.filter(s => !s.ini).length; S.sesi = S.sesi.filter(s => s.ini); gambar();
  toast('Password berhasil diganti.', 'positive', 4500, lain ? \`\${lain} perangkat lain sudah dikeluarkan.\` : '');
}
function keluarSesi(id) {
  const s = S.sesi.find(x => x.id === id);
  dialog({ judul:s.ini ? 'Keluar dari perangkat ini?' : 'Keluarkan perangkat ini?', konfirmasi:true, bahaya:!s.ini,
    isi:s.ini ? '<p>Ini perangkat yang sedang Anda pakai. Anda akan keluar dan perlu masuk lagi.</p>' : \`<p><b>\${s.jenis} · \${s.ket}</b> (IP \${s.ip}) akan dikeluarkan dan perlu masuk lagi untuk memakai akun Anda.</p>\`,
    tombol:[['Batal','secondary',null],[s.ini ? 'Keluar' : 'Keluarkan','primary',() => {
      if (s.ini) { toast('Keluar tidak disimulasikan di prototipe.'); return; }
      S.sesi = S.sesi.filter(x => x.id !== id); gambar(); toast(\`\${s.jenis} sudah dikeluarkan.\`, 'positive'); }]] });
}
function keluarSemua() {
  dialog({ judul:'Keluarkan semua perangkat lain?', konfirmasi:true, isi:'<p>Semua perangkat lain akan dikeluarkan dan perlu masuk lagi. Anda tetap masuk di perangkat ini.</p>',
    tombol:[['Batal','secondary',null],['Keluarkan Semua','primary',() => { const n = S.sesi.filter(s => !s.ini).length; S.sesi = S.sesi.filter(s => s.ini); gambar(); toast(\`\${n} perangkat lain sudah dikeluarkan.\`, 'positive'); }]] });
}
function tandaiUbahDd() {`);
/* penjaga perubahan berlaku untuk tab Data Diri dan form Ubah Nama */
ganti("  if (!(S.ddUbah && S.layar === 'akun' && S.tab === 'data')) { lanjut(); return; }", "  if (!(S.ddUbah && S.layar === 'akun')) { lanjut(); return; }");
ganti("  dialog({ judul:'Simpan perubahan data diri?', konfirmasi:true, isi:'<p>Ada perubahan di tab Data Diri yang belum disimpan. Jika Anda lanjut tanpa menyimpan, perubahan tersebut akan hilang.</p>',",
  "  const dd = S.tab === 'data';\n  dialog({ judul:dd ? 'Simpan perubahan data diri?' : 'Simpan perubahan nama akun?', konfirmasi:true, isi:`<p>Ada perubahan ${dd ? 'di tab Data Diri' : 'pada nama akun'} yang belum disimpan. Jika Anda lanjut tanpa menyimpan, perubahan tersebut akan hilang.</p>`,");
ganti("['Buang Perubahan','secondary',() => { S.ddUbah = false; cobaKtpDd = 0; ktpDd = null; lanjut(); }],['Simpan & Lanjutkan','primary',() => { if (S.layar === 'akun' && S.tab === 'data') { /* formulir masih di layar */ } simpanDataDiri(lanjut); }]]",
  "['Buang Perubahan','secondary',() => { S.ddUbah = false; S.ubahAkun = false; cobaKtpDd = 0; ktpDd = null; lanjut(); }],['Simpan & Lanjutkan','primary',() => { dd ? simpanDataDiri(lanjut) : simpanAkun(lanjut); }]]");
ganti("  if (st) { st.classList.add('belum'); st.innerHTML = `${ik('seru', 14)} Belum disimpan`; }", "  if (st) { st.classList.add('belum'); st.innerHTML = `${ik('seru', 14)} Belum disimpan`; }");

/* CSS */
ganti(".catatan-kunci{margin:12px 2px 0;", `.kartu-kepala h2{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.ikon-bulat.kecil{width:36px;height:36px;border-radius:10px}
.daftar-sesi{list-style:none;margin:16px 0 0;padding:0}
.daftar-sesi li{display:flex;align-items:center;gap:12px;flex-wrap:wrap;padding:12px 0;border-top:1px solid var(--ina-stroke-primary)}
.sesi-isi{flex:1;min-width:200px;display:flex;flex-direction:column;gap:2px}
.sesi-isi b{font-size:14px;display:inline-flex;align-items:center;gap:8px}
.sesi-isi small{font-size:12.5px;color:var(--ina-content-secondary)}
.kv-akun dd small{display:block;margin:2px 0 0}
.mono{font-family:ui-monospace,Menlo,monospace}
.catatan-kunci{margin:12px 2px 0;`);
ganti(".kv-akun dd small{font-size:11px;color:var(--ina-content-secondary);margin-left:6px}", ".kv-akun dd small{font-size:12.5px;color:var(--ina-content-secondary)}");

/* daftar perubahan: HE-CA-08 */
ganti("  { kode:'HE-UMUM-02', judul:'Bantuan untuk Registrasi CA',", `  { kode:'HE-CA-08', judul:'Tab Akun dan Keamanan seragam, berbahasa Indonesia, dan aman dipakai',
    isi:'Keempat tab Akun Saya memakai pola kartu yang sama (ikon, judul, satu kalimat keterangan, tombol di kaki). Tab Akun: nama diubah lewat "Ubah Nama" dengan status "Belum disimpan" dan konfirmasi bila pindah tab sebelum disimpan; nomor HP ditautkan ke tab Data Diri; peran "Klien" dijelaskan dengan tooltip; ID akun diberi keterangan kegunaannya. Tab Keamanan: isian password memakai IDDS Password Input dengan tombol tampilkan/sembunyikan; panjang password dan kecocokan ulangan diperiksa saat mengetik; tombol Ganti Password baru aktif bila semua sesuai; pesan "password saat ini tidak sesuai" tampil di bawah isian. Bagian sesi menjadi "Perangkat yang sedang masuk" dengan jenis perangkat, label "Perangkat ini", dan konfirmasi sebelum mengeluarkan perangkat.',
    lama:'Bahasa bercampur Inggris: "device", "di-logout", "login", "Logout dari sini", "Logout Semua", "Sesi ini". Pola kartu tiap tab berbeda (judul huruf kapital kecil di atas, ikon hanya di sebagian kartu). ID akun teknis (USR_…) ditampilkan tanpa keterangan.', ke:'keamanan', sorot:'#kartuPassword' },
  { kode:'HE-UMUM-02', judul:'Bantuan untuk Registrasi CA',`);
ganti("  if (u.ke === 'datadiri') {", "  if (u.ke === 'keamanan') { bukaAkun('aman'); }\n  if (u.ke === 'datadiri') {");
ganti('Daftar perubahan (9)</button>', 'Daftar perubahan (10)</button>');
fs.writeFileSync(f, t); console.log(log.join('\n'));
