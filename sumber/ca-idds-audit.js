// Audit IDDS + HE-CA-06 untuk Registrasi CA. node ca-idds-audit.js
const fs = require('fs');
const f = 'ca-badan.html';
let t = fs.readFileSync(f, 'utf8'); const log = [];
const ganti = (dari, ke, semua = false) => { const n = t.split(dari).length - 1; if (!n) { log.push('TIDAK ADA: ' + dari.slice(0, 70)); return; } t = semua ? t.split(dari).join(ke) : t.replace(dari, ke); log.push(`${semua ? n : 1}× ${dari.slice(0, 50)}`); };

/* 1. Card IDDS untuk semua kartu */
ganti('<div class="kartu ditandai" id="kartuCa">', '<div class="ina-card ina-card--variant-basic kartu ditandai" id="kartuCa">');
ganti('<div class="kartu">', '<div class="ina-card ina-card--variant-basic kartu">', true);
ganti('.kartu{margin-top:16px;background:var(--ina-background-primary);border:1px solid var(--ina-stroke-primary);border-radius:16px;padding:24px}',
  '.kartu.ina-card{display:block;width:100%;max-width:none;margin-top:16px;padding:24px;border-radius:16px}');

/* 2. File Upload IDDS untuk foto KTP + galat di tempatnya (HE-CA-06) */
ganti(`    \${tampil('ktp') ? \`<div class="ina-text-field" id="f-iKtp"><span class="ina-text-field__label">Foto KTP<span class="ina-text-field__required">*</span></span>
      <div class="unggah">\${tombol(p.ktp ? 'Ganti foto KTP' : 'Pilih foto KTP', 'secondary', 'sm', 'id="pilihKtp"', ik('unggah', 14))}<span id="namaKtp">\${p.ktp ? esc(p.ktp) : 'Belum ada berkas'}</span></div>
      <div class="ina-text-field__bottom-area"><div class="ina-text-field__helper-text" id="h-iKtp">JPG/PNG, maks. 1 MB, sisi terpanjang minimal 600 piksel. Seluruh bagian KTP harus terlihat jelas.</div></div></div>\` : ''}`,
  `    \${tampil('ktp') ? \`<div class="ina-file-upload" id="f-iKtp"><div class="ina-file-upload__label">Foto KTP<span class="ina-text-field__required">*</span></div>
      <div class="ina-file-upload__dropzone" role="button" tabindex="0" id="pilihKtp" aria-label="Pilih foto KTP"><div class="ina-file-upload__content"><div class="ina-file-upload__icon">\${ik('unggah', 24)}</div>
        <div class="ina-file-upload__text"><div class="ina-file-upload__title">Seret foto KTP ke sini atau klik untuk memilih</div><div class="ina-file-upload__description">JPG/PNG, maks. 1 MB, sisi terpanjang minimal 600 piksel. Seluruh bagian KTP harus terlihat jelas.</div></div>
        <span class="ina-file-upload__button">Pilih File</span></div></div>
      <div class="ina-file-upload__files" id="berkasKtp">\${p.ktp ? berkasKtp(p.ktp, '420 KB', '') : ''}</div>
      <div class="ina-file-upload__errors"><div class="ina-file-upload__error-message" id="h-iKtp"></div></div></div>\` : ''}\${usulan('HE-CA-06')}`);
ganti(`  let ktp = p.ktp;`, `  let ktp = p.ktp, coba = 0;`);
ganti(`    if (e.target.closest('#pilihKtp')) { ktp = 'ktp-contoh.jpg'; $('#namaKtp').textContent = 'ktp-contoh.jpg · 420 KB'; $('#h-iKtp').classList.remove('ina-text-field__helper-text--error'); return; }`,
  `    if (e.target.closest('#pilihKtp')) {
      /* simulasi: pilihan pertama beresolusi rendah agar pesan galat terlihat (HE-CA-06) */
      coba++; $('#h-iKtp').textContent = '';
      if (coba === 1) { ktp = ''; $('#berkasKtp').innerHTML = berkasKtp('ktp-buram.jpg', '180 KB', 'Foto terlalu kecil (511 × 511 piksel), sehingga tulisan pada KTP sulit terbaca. Pilih foto dengan sisi terpanjang minimal 600 piksel.'); return; }
      ktp = 'ktp-contoh.jpg'; $('#berkasKtp').innerHTML = berkasKtp('ktp-contoh.jpg', '420 KB', ''); return; }`);
ganti(`    if ($('#pilihKtp')) { if (!ktp) { $('#h-iKtp').textContent = 'Foto KTP wajib diunggah.'; $('#h-iKtp').classList.add('ina-text-field__helper-text--error'); ada = true; } else baru.ktp = ktp; }`,
  `    if ($('#pilihKtp')) { if (!ktp) { if (!coba) $('#h-iKtp').textContent = 'Foto KTP wajib diunggah.'; ada = true; } else baru.ktp = ktp; }`);
ganti(`    if (v('iHp') !== null) { if (!/^08\\d{8,11}$/.test(v('iHp').replace(/\\D/g, ''))) { galat('iHp', 'Nomor HP diawali 08, 10–13 digit.'); ada = true; } else baru.hp = v('iHp').replace(/\\D/g, ''); }`,
  `    if (v('iHp') !== null) { const hp = v('iHp').replace(/\\D/g, ''); if (!/^08\\d{8,11}$/.test(hp)) { galat('iHp', 'Nomor HP diawali 08, 10–13 digit.'); ada = true; } else if (hp === '081200000000') { galat('iHp', 'Nomor HP ini sudah dipakai akun lain di kantor ini. Gunakan nomor lain atau hubungi kantor PPAT.'); ada = true; } else baru.hp = hp; }`);
ganti(`/* ---------------- aksi registrasi ---------------- */`,
  `function berkasKtp(nama, ukuran, galat) {
  return \`<div class="ina-file-upload__file \${galat ? 'ina-file-upload__file--error' : 'ina-file-upload__file--success'}"><div class="ina-file-upload__file-icon-wrapper ina-file-upload__file-icon-wrapper--\${galat ? 'error' : 'success'}">\${ik(galat ? 'seru' : 'centang', 16)}</div>
    <div class="ina-file-upload__file-info"><div class="ina-file-upload__file-name">\${nama}</div><div class="ina-file-upload__file-size">\${ukuran}</div>\${galat ? \`<div class="ina-file-upload__file-error">\${galat}</div>\` : ''}</div></div>\`;
}

/* ---------------- aksi registrasi ---------------- */`);

/* 3. daftar perubahan: HE-CA-06 */
ganti(`  { kode:'HE-UMUM-02', judul:'Bantuan untuk Registrasi CA',`,
  `  { kode:'HE-CA-06', judul:'Pesan galat data diri jelas dan muncul di dekat isian',
    isi:'Kesalahan data diri ditampilkan tepat di bawah isian atau berkas yang bermasalah, dengan bahasa awam dan cara memperbaikinya. Foto KTP memakai IDDS File Upload; foto beresolusi rendah ditandai merah di daftar berkas beserta ukurannya. Nomor HP yang sudah dipakai akun lain dijelaskan tanpa awalan teknis.',
    lama:'Gambar bukti HE: pesan "update telepon: nomor HP sudah dipakai akun lain di PPAT ini" tampil di atas halaman dengan awalan teknis; pesan resolusi foto KTP muncul sebagai toast yang hilang sendiri, jauh dari tombol unggah (skor H9 Registrasi CA: 0).', ke:'kurang-drawer', sorot:null },
  { kode:'HE-UMUM-02', judul:'Bantuan untuk Registrasi CA',`);
ganti(`  if (u.ke === 'banner') {`, `  if (u.ke === 'kurang-drawer') { setKondisi('kurang'); bukaAkun('ca'); bukaLengkapi(); return; }
  if (u.ke === 'banner') {`);
ganti('Daftar perubahan (7)</button>', 'Daftar perubahan (8)</button>');
ganti(`'Tab, stepper, alert, lencana, tombol, tooltip, drawer, modal, isian, unggah berkas, Action Dropdown, toast, dan spinner memakai`, `'Tab, kartu, stepper, alert, lencana, tombol, tooltip, drawer, modal, isian, File Upload, Action Dropdown, toast, dan spinner memakai`);

fs.writeFileSync(f, t); console.log(log.join('\n'));
