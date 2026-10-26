// Tab Akun / Keamanan / Data Diri (KTP) disamakan dengan live + modal "Lengkapi Data Diri" saat masuk. node ca-tab-live.js
const fs = require('fs');
const f = 'ca-badan.html';
let t = fs.readFileSync(f, 'utf8'); const log = [];
const ganti = (dari, ke) => { const n = t.split(dari).length - 1; if (!n) { log.push('TIDAK ADA: ' + dari.slice(0, 70)); return; } t = t.split(dari).join(ke); log.push(`${n}× ${dari.slice(0, 50)}`); };
const potong = (awal, akhir, ke) => { const i = t.indexOf(awal), j = t.indexOf(akhir, i); if (i < 0 || j < 0) { log.push('TIDAK ADA blok: ' + awal.slice(0, 40)); return; } t = t.slice(0, i) + ke + t.slice(j); log.push('blok ' + awal.slice(0, 40)); };

/* 1. CSS dari prototipe TERA (Identitas Akun) + formulir Data Diri */
ganti('.f-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}', `.f-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
/* sama dengan tab Akun di prototipe TERA */
.eb{font:600 11px Inter,sans-serif;letter-spacing:1.5px;text-transform:uppercase;color:var(--ina-content-secondary)}
.kartu.ina-card h3{margin:6px 0 8px;font:500 22px/30px Inter,sans-serif;color:var(--ina-primary-primary)}
.kartu .ket{margin:0;font-size:14px;line-height:21px;color:var(--ina-content-secondary)}
.atas{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}
.kv-akun{margin:16px 0 0}
.kv-akun div{display:grid;grid-template-columns:160px 1fr;gap:12px;padding:13px 0;border-top:1px solid var(--ina-stroke-primary);font-size:15px}
.kv-akun dt{font:500 11px Inter,sans-serif;letter-spacing:1.4px;text-transform:uppercase;color:var(--ina-content-secondary);align-self:center}
.kv-akun dd{margin:0}
.kv-akun dd small{font-size:11px;color:var(--ina-content-secondary);margin-left:6px}
/* formulir Data Diri (KTP) seperti live */
.form-dd{display:grid;grid-template-columns:1fr 1fr;gap:16px 16px;margin-top:16px}
.form-dd .lebar{grid-column:1/-1}
.form-dd .ina-text-field,.form-dd .ina-text-area,.form-dd .ina-select-dropdown{margin:0}
.form-dd select.ina-text-field__input{appearance:auto;background:transparent;border:0;width:100%;font:inherit;color:inherit}
.catatan-kunci{margin:12px 2px 0;font-size:13px;color:var(--ina-content-secondary)}
.kartu-kaki{display:flex;justify-content:flex-end;gap:10px;margin-top:20px;padding-top:16px;border-top:1px solid var(--ina-stroke-primary)}
.modal-daftar{margin:8px 0 0;padding:10px 14px 10px 32px;border-radius:10px;background:var(--ina-background-secondary);font-size:14px;line-height:24px}`);
ganti('  .f-grid{grid-template-columns:1fr}', '  .f-grid,.form-dd{grid-template-columns:1fr}\n  .kv-akun div{grid-template-columns:1fr;gap:2px}');

/* 2. model data: semua isian Data Diri live */
ganti("const PROFIL_LENGKAP = () => ({ nama:'Contoh Klien Satu', email:'klien1@contoh.id', hp:'081200000101', nik:'3200000000000101', tempat:'Kota Contoh', tgl:'1990-01-15', ktp:'ktp-contoh.jpg' });",
  `const PROFIL_LENGKAP = () => ({ nama:'Contoh Klien Satu', depan:'Contoh', tengah:'', belakang:'Klien Satu', email:'klien1@contoh.id', hp:'081200000101', nik:'3200001501900101', tempat:'Kota Contoh', tgl:'1990-01-15', ktp:'ktp-contoh.jpg',
  npwp:'', jk:'L', gelar:'', pekerjaan:'Karyawan Swasta', kota:'Kota Contoh', warga:'Indonesia', alamat:'Jalan Contoh No. 1', rt:'001', rw:'002', kel:'Kelurahan Contoh', kec:'Kecamatan Contoh', prov:'Provinsi Contoh', domisili:'' });
const PROFIL_KOSONG = () => ({ ...PROFIL_LENGKAP(), hp:'', nik:'', tempat:'', tgl:'', ktp:'', jk:'', pekerjaan:'', kota:'', alamat:'', rt:'', rw:'', kel:'', kec:'', prov:'' });`);
ganti("profil:{ ...PROFIL_LENGKAP(), hp:'', nik:'', tempat:'', tgl:'', ktp:'' }", "profil:PROFIL_KOSONG(), modalAwal:true, ubahAkun:false");
ganti("S.profil = k === 'kurang' ? { ...PROFIL_LENGKAP(), hp:'', nik:'', tempat:'', tgl:'', ktp:'' } : PROFIL_LENGKAP();", "S.profil = k === 'kurang' ? PROFIL_KOSONG() : PROFIL_LENGKAP();");
/* daftar data untuk akta (dialog saat masuk) = syarat CA + alamat (HE-CA-02: satu daftar) */
ganti("const kurang = () => DATA.filter(([k]) => !S.profil[k]);", "const kurang = () => DATA.filter(([k]) => !S.profil[k]);\nconst DATA_SEMUA = [...DATA, ['alamat', 'Alamat sesuai KTP', 'Untuk identitas di akta']];\nconst kurangSemua = () => DATA_SEMUA.filter(([k]) => !S.profil[k]);");

/* 3. tab Akun, Keamanan, Data Diri */
potong('function tabAkunInfo() {', '/* ---------------- tab Registrasi CA', `function tabAkunInfo() {
  /* pola sama dengan tab Akun di prototipe TERA; isi mengikuti live (Klien) */
  const p = S.profil;
  if (S.ubahAkun) return \`<div class="ina-card ina-card--variant-basic kartu"><div class="eb">Identitas Akun</div><h3>Ubah data akun</h3>
    <div class="form-dd">\${tfAkun('aDepan', 'Nama Depan', p.depan, '', true)}\${tfAkun('aTengah', 'Nama Tengah', p.tengah, '')}\${tfAkun('aBelakang', 'Nama Belakang', p.belakang, '')}\${tfAkun('aHp', 'Telepon', p.hp, '0812 3456 7890', false, 'Peruri mengirim kode OTP ke nomor ini saat registrasi CA.')}</div>
    <div class="kartu-kaki">\${tombol('Batal', 'secondary', 'md', 'id="batalAkun"')}\${tombol('Simpan', 'primary', 'md', 'id="simpanAkun"', ik('centang', 16))}\${usulan('HE-CA-06')}</div></div>\`;
  return \`<div class="ina-card ina-card--variant-basic kartu"><div class="atas"><div><div class="eb">Identitas Akun</div><h3>\${esc(p.nama)}</h3><div style="display:flex;gap:6px">\${badge('Klien', 'info', 'sm')}\${badge('Aktif', 'success', 'sm')}</div></div>
    <div>\${tombol('Ubah Data', 'secondary', 'md', 'id="ubahAkun"', ik('pena', 16))}</div></div>
    <dl class="kv-akun">\${[['Nama Depan', esc(p.depan)], ['Nama Tengah', esc(p.tengah) || '—'], ['Nama Belakang', esc(p.belakang) || '—'], ['Email', esc(p.email) + '<small>(hubungi admin untuk mengubah)</small>'], ['Telepon', esc(p.hp) || '—']].map(([k, v]) => \`<div><dt>\${k}</dt><dd>\${v}</dd></div>\`).join('')}</dl></div>\`;
}
const tfAkun = (id, l, v, ph, wajib, bantu = '') => \`<div class="ina-text-field" id="f-\${id}"><label class="ina-text-field__label" for="\${id}">\${l}\${wajib ? '<span class="ina-text-field__required">*</span>' : ''}</label>
  <div class="ina-text-field__wrapper ina-text-field__wrapper--size-md"><input id="\${id}" class="ina-text-field__input" value="\${esc(v)}" placeholder="\${ph}"></div>
  <div class="ina-text-field__bottom-area"><div class="ina-text-field__helper-text" id="h-\${id}" data-bantu="\${esc(bantu)}">\${bantu}</div></div></div>\`;
function tabAman() {
  /* isi mengikuti live versi Klien: Ganti Password + Sesi Aktif (tidak diubah) */
  return \`<div class="ina-card ina-card--variant-basic kartu"><div class="eb">Keamanan Akun</div><h3>Ganti Password</h3>
    <p class="ket">Setelah password diubah, semua sesi aktif di perangkat lain akan otomatis keluar. Anda tetap masuk di perangkat ini.</p>
    <div class="form-dd"><div class="lebar">\${tfAkun('pLama', 'Password saat ini', '', 'Masukkan password yang Anda pakai sekarang', true)}</div>\${tfAkun('pBaru', 'Password baru', '', '', true, 'Minimal 8 karakter')}\${tfAkun('pUlang', 'Konfirmasi password baru', '', '', true)}</div>
    <div class="kartu-kaki">\${tombol('Ganti Password', 'primary', 'md', 'data-luar="Ganti password"')}</div></div>
    <div class="ina-card ina-card--variant-basic kartu"><div class="eb">Keamanan Akun</div><h3>Sesi Aktif</h3><p class="ket">Daftar perangkat yang sedang masuk dengan akun Anda. Bagian ini tidak diubah dalam prototipe.</p></div>\`;
}
function tabData() {
  /* formulir lengkap seperti live; tanda * = diperlukan untuk akta & registrasi CA (HE-CA-02) */
  const p = S.profil, ws = (id, l, v, ph = '', wajib = false, bantu = '', atr = '') => \`<div class="ina-text-field" id="f-\${id}"><label class="ina-text-field__label" for="\${id}">\${l}\${wajib ? '<span class="ina-text-field__required">*</span>' : ''}</label>
    <div class="ina-text-field__wrapper ina-text-field__wrapper--size-md"><input id="\${id}" class="ina-text-field__input" value="\${esc(v)}" placeholder="\${ph}" \${atr}></div>
    <div class="ina-text-field__bottom-area"><div class="ina-text-field__helper-text" id="h-\${id}" data-bantu="\${esc(bantu)}">\${bantu}</div></div></div>\`;
  const nikBantu = p.nik ? \`Tersimpan (\${samarNik(p.nik)}). Isi hanya jika ingin mengganti.\` : '16 digit sesuai KTP — tanggal lahir & jenis kelamin terisi otomatis dari NIK';
  return \`<div class="ina-card ina-card--variant-basic kartu"><div class="kartu-kepala" style="gap:10px"><span style="color:var(--ina-primary-600)">\${ik('ktp', 20)}</span><div>
      <h2 style="font-weight:500">Data Diri (KTP)</h2><p>Data ini dipakai saat Anda menjadi pihak dalam akta. NIK &amp; NPWP disimpan terenkripsi dan ditampilkan tersamar.</p>
      <p style="margin-top:6px">Isian bertanda <span class="ina-text-field__required">*</span> diperlukan untuk akta dan registrasi sertifikat elektronik (CA).\${usulan('HE-CA-02')}</p></div></div>
    <div class="form-dd">
      \${ws('dNik', 'NIK', '', p.nik ? '••••••••' : '32xxxxxxxxxxxxxx', true, nikBantu, 'inputmode="numeric" maxlength="16"')}
      \${ws('dNpwp', 'NPWP', p.npwp, 'Nomor NPWP', false, 'Opsional')}
      <div class="ina-text-field" id="f-dJk"><label class="ina-text-field__label" for="dJk">Jenis Kelamin</label><div class="ina-text-field__wrapper ina-text-field__wrapper--size-md"><select id="dJk" class="ina-text-field__input"><option value="" \${!p.jk ? 'selected' : ''}>—</option><option value="L" \${p.jk === 'L' ? 'selected' : ''}>Laki-laki</option><option value="P" \${p.jk === 'P' ? 'selected' : ''}>Perempuan</option></select></div></div>
      \${ws('dGelar', 'Gelar', p.gelar, 'Gelar di depan/belakang nama', false, 'mis. Drs., S.H., Hj. (opsional)')}
      \${ws('dKerja', 'Pekerjaan', p.pekerjaan, 'mis. Wiraswasta')}
      \${ws('dTempat', 'Tempat Lahir', p.tempat, '', true)}
      \${ws('dTgl', 'Tanggal Lahir', p.tgl, '', true, '', 'type="date"')}
      \${ws('dKota', 'Kota Domisili', p.kota)}
      \${ws('dWarga', 'Kewarganegaraan', p.warga)}
      <div class="lebar ina-text-area" id="f-dAlamat"><label class="ina-text-area__label" for="dAlamat">Alamat (sesuai KTP)<span class="ina-text-field__required">*</span></label><div class="ina-text-area__wrapper ina-text-area__wrapper--status-neutral"><textarea id="dAlamat" class="ina-text-area__input" rows="3" placeholder="Alamat lengkap">\${esc(p.alamat)}</textarea></div><div class="ina-text-field__helper-text" id="h-dAlamat" data-bantu=""></div></div>
      \${ws('dRt', 'RT', p.rt, '001')}\${ws('dRw', 'RW', p.rw, '002')}
      \${ws('dKel', 'Kelurahan/Desa', p.kel)}\${ws('dKec', 'Kecamatan', p.kec)}
      \${ws('dProv', 'Provinsi', p.prov)}<div></div>
      <div class="lebar">\${unggahKtp(p.ktp, 'dd')}</div>
      <div class="lebar">\${ws('dDomisili', 'Domisili Sementara', p.domisili, 'mis. Kota Jakarta Selatan', false, "Opsional — bila sedang berada di kota berbeda dari alamat KTP. Tercetak di akta: 'Untuk Sementara berada di …'")}</div>
    </div>
    <div class="kartu-kaki">\${tombol('Simpan Data Diri', 'primary', 'md', 'id="simpanDd"', ik('centang', 16))}</div></div>
    <p class="catatan-kunci">\${ik('kunci', 13)} NIK &amp; NPWP Anda dienkripsi di server. Hanya ditampilkan tersamar; data lengkap hanya dapat dilihat oleh PPAT/notaris saat diperlukan untuk akta.</p>\`;
}
/* IDDS File Upload foto KTP — dipakai di tab Data Diri dan panel Lengkapi data */
function unggahKtp(nama, id) {
  return \`<div class="ina-file-upload" id="f-\${id}Ktp"><div class="ina-file-upload__label">Foto / Scan KTP<span class="ina-text-field__required">*</span></div>
    <div class="ina-file-upload__dropzone" role="button" tabindex="0" data-pilih-ktp="\${id}" aria-label="Pilih foto KTP"><div class="ina-file-upload__content"><div class="ina-file-upload__icon">\${ik('unggah', 24)}</div>
      <div class="ina-file-upload__text"><div class="ina-file-upload__title">Seret foto KTP ke sini atau klik untuk memilih</div><div class="ina-file-upload__description">JPG/PNG maks. 1 MB, sisi terpanjang minimal 600 piksel, tajam dan tidak gelap — seluruh bagian KTP harus terlihat. Dipakai untuk registrasi sertifikat elektronik (CA) agar data Anda terisi otomatis di portal Peruri.</div></div>
      <span class="ina-file-upload__button">Pilih File</span></div></div>
    <div class="ina-file-upload__files" id="berkas-\${id}">\${nama ? berkasKtp(nama, '420 KB', '') : ''}</div>
    <div class="ina-file-upload__errors"><div class="ina-file-upload__error-message" id="h-\${id}Ktp"></div></div></div>\`;
}
/* NIK → tanggal lahir & jenis kelamin (perilaku live) */
function dariNik(nik) {
  if (!/^\\d{16}$/.test(nik)) return null;
  let d = +nik.slice(6, 8); const m = +nik.slice(8, 10), y = +nik.slice(10, 12), jk = d > 40 ? 'P' : 'L'; if (d > 40) d -= 40;
  const th = y > 30 ? 1900 + y : 2000 + y; if (!d || !m || m > 12 || d > 31) return null;
  return { tgl:\`\${th}-\${String(m).padStart(2, '0')}-\${String(d).padStart(2, '0')}\`, jk };
}

`);

/* 4. modal "Lengkapi Data Diri" saat masuk (live) — isi daftar sama dengan syarat CA + alamat (HE-CA-02) */
ganti("function gambar() { gambarNav(); gambarMenu(); $('#halaman').innerHTML = S.layar === 'eaw' ? layarEaw() : layarAkun(); pasangPanduan(); }",
  `function gambar() { gambarNav(); gambarMenu(); $('#halaman').innerHTML = S.layar === 'eaw' ? layarEaw() : layarAkun(); pasangPanduan(); }
function modalAwal() {
  const k = kurangSemua(); if (!S.modalAwal || !k.length) return; S.modalAwal = false;
  dialog({ judul:\`<span style="display:inline-flex;align-items:center;gap:10px"><span style="color:var(--ina-warning-600)">\${ik('seru', 20)}</span>Lengkapi Data Diri</span>\`,
    isi:\`<p>Data diri Anda belum lengkap. Lengkapi agar dapat dipakai saat pembuatan akta dan untuk registrasi sertifikat elektronik (CA).\${usulan('HE-CA-02')}</p><ul class="modal-daftar">\${k.map(([, l]) => \`<li>\${l}</li>\`).join('')}</ul>\`,
    tombol:[['Nanti','secondary',null],['Lengkapi Sekarang','primary',() => { bukaAkun('ca'); bukaLengkapi(kurangSemua()); }]] });
}`);

/* 5. panel Lengkapi data: bisa menerima daftar (dari modal = termasuk alamat) */
ganti("function bukaLengkapi() {\n  const p = S.profil, kr = kurang().map(([k]) => k), semua = !kr.length;", "function bukaLengkapi(daftar) {\n  const p = S.profil, kr = (daftar || kurang()).map(([k]) => k), semua = !kr.length;");
ganti("    ${tampil('hp') ? isian('iHp', 'Nomor HP', p.hp, '08…', 'tel', 'Peruri mengirim kode OTP ke nomor ini.') : ''}",
  "    ${tampil('hp') ? isian('iHp', 'Nomor HP', p.hp, '08…', 'tel', 'Peruri mengirim kode OTP ke nomor ini.') : ''}\n    ${kr.includes('alamat') ? isian('iAlamat', 'Alamat sesuai KTP', p.alamat, 'Jalan, nomor, RT/RW') : ''}");
ganti("    if (v('iHp') !== null) {", "    if (v('iAlamat') !== null) { if (!v('iAlamat')) { galat('iAlamat', 'Alamat wajib diisi.'); ada = true; } else baru.alamat = v('iAlamat'); }\n    if (v('iHp') !== null) {");

fs.writeFileSync(f, t); console.log(log.join('\n'));
