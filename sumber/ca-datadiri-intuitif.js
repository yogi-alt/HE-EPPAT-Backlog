// Tab Data Diri (KTP) jadi satu-satunya tempat semua data CA + dibuat intuitif (HE-CA-07). node ca-datadiri-intuitif.js
const fs = require('fs');
const f = 'ca-badan.html';
let t = fs.readFileSync(f, 'utf8'); const log = [];
const ganti = (dari, ke) => { const n = t.split(dari).length - 1; if (!n) { log.push('TIDAK ADA: ' + dari.slice(0, 70)); return; } t = t.split(dari).join(ke); log.push(`${n}× ${dari.slice(0, 50)}`); };
const potong = (awal, akhir, ke) => { const i = t.indexOf(awal), j = t.indexOf(akhir, i + 1); if (i < 0 || j < 0) { log.push('TIDAK ADA blok: ' + awal.slice(0, 40)); return; } t = t.slice(0, i) + ke + t.slice(j); log.push('blok ' + awal.slice(0, 40)); };

/* 1. formulir Data Diri berkelompok seperti KTP */
potong('function tabData() {', '/* IDDS File Upload foto KTP', `function tabData() {
  /* isian & teks live, dikelompokkan seperti urutan KTP + nomor HP (HE-CA-07). * = diperlukan untuk akta & registrasi CA */
  const p = S.profil, ws = (id, l, v, ph = '', wajib = false, bantu = '', atr = '') => \`<div class="ina-text-field" id="f-\${id}"><label class="ina-text-field__label" for="\${id}">\${l}\${wajib ? '<span class="ina-text-field__required">*</span>' : ''}</label>
    <div class="ina-text-field__wrapper ina-text-field__wrapper--size-md \${atr.includes('disabled') ? 'ina-text-field__wrapper--disabled' : ''}"><input id="\${id}" class="ina-text-field__input" value="\${esc(v)}" placeholder="\${ph}" \${atr}></div>
    <div class="ina-text-field__bottom-area"><div class="ina-text-field__helper-text" id="h-\${id}" data-bantu="\${esc(bantu)}">\${bantu}</div></div></div>\`;
  const ops = l => \`\${l} <span class="opsional">(opsional)</span>\`;
  const nikBantu = p.nik ? \`Tersimpan (\${samarNik(p.nik)}). Isi hanya jika ingin mengganti.\` : '16 digit sesuai KTP. Tanggal lahir dan jenis kelamin terisi otomatis dari NIK.';
  const grup = (judul, ket, isi) => \`<section class="grup-dd"><h4>\${judul}</h4><p class="ket-grup">\${ket}</p><div class="form-dd">\${isi}</div></section>\`;
  return \`<div class="ina-card ina-card--variant-basic kartu ditandai" id="kartuDataDiri"><div class="kartu-kepala" style="gap:10px"><span style="color:var(--ina-primary-600)">\${ik('ktp', 20)}</span><div>
      <h2 style="font-weight:500">Data Diri (KTP)</h2><p>Data ini dipakai sebagai identitas Anda di akta dan dikirim otomatis ke Peruri saat registrasi sertifikat elektronik (CA). NIK &amp; NPWP disimpan terenkripsi dan ditampilkan tersamar.\${usulan('HE-CA-07')}</p></div></div>
    \${alertKelengkapan()}
    \${grup('Identitas sesuai KTP', 'Isi sesuai yang tertulis di KTP Anda.',
      \`\${ws('dNik', 'NIK', '', p.nik ? '••••••••' : '32xxxxxxxxxxxxxx', true, nikBantu, 'inputmode="numeric" maxlength="16" autocomplete="off"')}
      <div class="ina-text-field" id="f-dJk"><label class="ina-text-field__label" for="dJk">Jenis kelamin</label><div class="ina-text-field__wrapper ina-text-field__wrapper--size-md"><select id="dJk" class="ina-text-field__input"><option value="" \${!p.jk ? 'selected' : ''}>Pilih jenis kelamin</option><option value="L" \${p.jk === 'L' ? 'selected' : ''}>Laki-laki</option><option value="P" \${p.jk === 'P' ? 'selected' : ''}>Perempuan</option></select></div><div class="ina-text-field__bottom-area"><div class="ina-text-field__helper-text" id="h-dJk" data-bantu="Terisi otomatis dari NIK.">Terisi otomatis dari NIK.</div></div></div>
      \${ws('dTempat', 'Tempat lahir', p.tempat, 'mis. Kota Bandung', true)}
      \${ws('dTgl', 'Tanggal lahir', p.tgl, '', true, 'Terisi otomatis dari NIK. Usia minimal 17 tahun.', 'type="date"')}
      \${ws('dGelar', ops('Gelar'), p.gelar, 'mis. Drs., S.H., Hj.', false, 'Gelar di depan atau belakang nama, sesuai yang ingin dicantumkan di akta.')}
      \${ws('dKerja', 'Pekerjaan', p.pekerjaan, 'mis. Wiraswasta', false, 'Sesuai KTP.')}
      \${ws('dWarga', 'Kewarganegaraan', p.warga, 'Indonesia')}
      \${ws('dNpwp', ops('NPWP'), p.npwp, '15 atau 16 digit', false, 'Diisi bila ada.', 'inputmode="numeric"')}\`)}
    \${grup('Alamat sesuai KTP', 'Alamat ini tercetak di akta sebagai tempat tinggal Anda.',
      \`<div class="lebar ina-text-area" id="f-dAlamat"><label class="ina-text-area__label" for="dAlamat">Alamat<span class="ina-text-field__required">*</span></label><div class="ina-text-area__wrapper ina-text-area__wrapper--status-neutral"><textarea id="dAlamat" class="ina-text-area__input" rows="2" placeholder="Nama jalan dan nomor rumah">\${esc(p.alamat)}</textarea></div><div class="ina-text-field__helper-text" id="h-dAlamat" data-bantu=""></div></div>
      \${ws('dRt', 'RT', p.rt, '001', false, '', 'inputmode="numeric" maxlength="3"')}\${ws('dRw', 'RW', p.rw, '002', false, '', 'inputmode="numeric" maxlength="3"')}
      \${ws('dKel', 'Kelurahan/Desa', p.kel)}\${ws('dKec', 'Kecamatan', p.kec)}
      \${ws('dProv', 'Provinsi', p.prov)}\`)}
    \${grup('Kontak dan domisili', 'Nomor HP dipakai Peruri untuk mengirim kode OTP saat registrasi CA.',
      \`\${ws('dHp', 'Nomor HP', p.hp, 'mis. 0812 3456 7890', true, 'Pastikan aktif dan dapat menerima SMS.', 'type="tel" inputmode="tel"')}
      \${ws('dEmail', 'Email', p.email, '', false, 'Hubungi admin kantor untuk mengubah email.', 'disabled')}
      \${ws('dKota', 'Kota domisili', p.kota, 'mis. Kota Jakarta Selatan', false, 'Kota tempat Anda tinggal sekarang.')}
      \${ws('dDomisili', ops('Domisili sementara'), p.domisili, 'mis. Kota Jakarta Selatan', false, "Isi bila saat penandatanganan Anda berada di kota lain. Tercetak di akta: 'Untuk sementara berada di …'")}\`)}
    <section class="grup-dd"><h4>Foto KTP</h4><p class="ket-grup">Foto ini dikirim ke Peruri agar data Anda terisi otomatis di portal Peruri.</p>\${unggahKtp(p.ktp, 'dd')}</section>
    <div class="kartu-kaki" style="align-items:center"><span class="status-simpan" id="statusDd">\${ik('centang', 14)} Semua perubahan tersimpan</span>\${tombol('Batal', 'secondary', 'md', 'id="batalDd" disabled')}\${tombol('Simpan Data Diri', 'primary', 'md', 'id="simpanDd"', ik('centang', 16))}</div></div>
    <p class="catatan-kunci">\${ik('kunci', 13)} NIK &amp; NPWP Anda dienkripsi di server. Hanya ditampilkan tersamar; data lengkap hanya dapat dilihat oleh PPAT/notaris saat diperlukan untuk akta.</p>\`;
}
`);

/* 2. alert kelengkapan & penanda kosong: nomor HP kini di tab Data Diri */
potong('const ID_ISIAN = {', 'function bukaDataDiri() {', "const ID_ISIAN = { nik:'dNik', tempat:'dTempat', tgl:'dTgl', alamat:'dAlamat', hp:'dHp', ktp:'f-ddKtp' };\n");
ganti("  const k = kurangSemua().filter(([x]) => x !== 'hp'), el = k.length && document.getElementById(ID_ISIAN[k[0][0]]);", "  const k = kurangSemua(), el = k.length && document.getElementById(ID_ISIAN[k[0][0]]);");
potong('/* alert kelengkapan di atas formulir', 'function berkasKtp(', `/* alert kelengkapan di atas formulir (HE-CA-02, HE-CA-07) */
function alertKelengkapan() {
  const k = kurangSemua(), n = DATA_SEMUA.length - k.length;
  if (!k.length) return S.dariCa ? \`<div id="alertKelengkapan" class="berikut">\${alert('success', 'Data diri sudah lengkap', 'Data yang diperlukan untuk akta dan registrasi sertifikat elektronik (CA) sudah terisi.', \`<div class="aksi">\${tombol('Kembali ke Registrasi CA', 'primary', 'sm', 'data-akun="ca"', ik('panah', 14))}</div>\`)}\${usulan('HE-CA-02')}</div>\` : '';
  return \`<div id="alertKelengkapan" class="berikut">\${alert('caution', \`\${n} dari \${DATA_SEMUA.length} isian wajib terisi\`, \`Lengkapi isian bertanda kuning: \${k.map(([, l]) => l).join(', ')}.\`, \`<div class="aksi">\${tombol('Ke isian berikutnya', 'secondary', 'sm', 'data-ke-kosong', ik('panah', 14))}</div>\`)}\${usulan('HE-CA-02')}</div>\`;
}
/* tandai isian wajib yang masih kosong dengan status warning IDDS */
function tandaiKosong() {
  if (S.layar !== 'akun' || S.tab !== 'data') return;
  const p = S.profil, T = 'Belum diisi — diperlukan untuk akta dan registrasi CA.';
  [['nik', 'dNik'], ['tempat', 'dTempat'], ['tgl', 'dTgl'], ['hp', 'dHp']].forEach(([k, id]) => { if (p[k]) return; $(\`#f-\${id} .ina-text-field__wrapper\`)?.classList.add('ina-text-field__wrapper--status-warning'); const h = $(\`#h-\${id}\`); if (h) { h.textContent = T; h.classList.add('ina-text-field__helper-text--warning'); } });
  if (!p.alamat) { $('#f-dAlamat .ina-text-area__wrapper')?.classList.replace('ina-text-area__wrapper--status-neutral', 'ina-text-area__wrapper--status-warning'); const h = $('#h-dAlamat'); if (h) { h.textContent = T; h.classList.add('ina-text-field__helper-text--warning'); } }
  if (!p.ktp && !$('#berkas-dd').innerHTML) $('#h-ddKtp').textContent = 'Belum diunggah — diperlukan untuk registrasi CA.';
}
function keKosong() { const k = kurangSemua(); const el = k.length && document.getElementById(ID_ISIAN[k[0][0]]); if (el) { el.scrollIntoView({ block:'center', behavior:'smooth' }); (el.matches('input, textarea') ? el : el.querySelector('[data-pilih-ktp]'))?.focus({ preventScroll:true }); } }

`);
ganti("const DATA_SEMUA = [...DATA, ['alamat', 'Alamat sesuai KTP', 'Untuk identitas di akta']];", "const DATA_SEMUA = [DATA[0], DATA[1], DATA[2], ['alamat', 'Alamat sesuai KTP', 'Untuk identitas di akta'], DATA[4], DATA[3]];");

/* 3. tab Akun: nomor HP hanya ditampilkan, diubah di tab Data Diri */
ganti("\\${tfAkun('aHp', 'Telepon', p.hp, '0812 3456 7890', false, 'Peruri mengirim kode OTP ke nomor ini saat registrasi CA.')}", "");
ganti("${tfAkun('aHp', 'Telepon', p.hp, '0812 3456 7890', false, 'Peruri mengirim kode OTP ke nomor ini saat registrasi CA.')}", "");
ganti("['Telepon', esc(p.hp) || '—']]", "['Telepon', (esc(p.hp) || '—') + '<small>(diubah di tab Data Diri)</small>']]");
potong("  if (t.closest('#simpanAkun')) {", "  /* tab Data Diri: unggah KTP", `  if (t.closest('#simpanAkun')) {
    const v = id => $('#' + id).value.trim();
    if (!v('aDepan')) { galatH('aDepan', 'Nama depan wajib diisi.'); return; }
    Object.assign(S.profil, { depan:v('aDepan'), tengah:v('aTengah'), belakang:v('aBelakang'), nama:[v('aDepan'), v('aTengah'), v('aBelakang')].filter(Boolean).join(' ') });
    S.ubahAkun = false; gambar(); toast('Profil berhasil disimpan.', 'positive'); return;
  }
`);
ganti("  if (t.closest('[data-ke-hp]')) { S.tab = 'akun'; S.ubahAkun = true; gambar(); $('#aHp')?.focus(); return; }", "  if (t.closest('[data-ke-kosong]')) { keKosong(); return; }\n  if (t.closest('#batalDd')) { S.ddUbah = false; cobaKtpDd = 0; ktpDd = null; gambar(); toast('Perubahan dibatalkan.'); return; }");

/* 4. simpan Data Diri: validasi lengkap + HP terpakai (HE-CA-06) */
potong('function simpanDataDiri() {', '/* ---------------- tombol Bantuan di judul halaman', `function simpanDataDiri(lanjut) {
  const v = id => ($('#' + id)?.value ?? '').trim(), p = S.profil, baru = {}; let ada = false;
  if (v('dNik')) { if (!/^\\d{16}$/.test(v('dNik'))) { galatH('dNik', 'NIK harus 16 digit angka.'); ada = true; } else baru.nik = v('dNik'); }
  if (v('dTgl')) { const u = (Date.now() - new Date(v('dTgl'))) / 31557600000; if (u < 17) { galatH('dTgl', 'Usia minimal 17 tahun.'); ada = true; } else baru.tgl = v('dTgl'); }
  const hp = v('dHp').replace(/\\D/g, '');
  if (hp && !/^08\\d{8,11}$/.test(hp)) { galatH('dHp', 'Nomor HP diawali 08, 10–13 digit.'); ada = true; }
  else if (hp === '081200000000') { galatH('dHp', 'Nomor HP ini sudah dipakai akun lain di kantor ini. Gunakan nomor lain atau hubungi kantor PPAT.'); ada = true; }
  ['dRt', 'dRw'].forEach(id => { if (v(id) && !/^\\d{1,3}$/.test(v(id))) { galatH(id, 'Isi dengan angka, maks. 3 digit.'); ada = true; } });
  if (v('dNpwp') && !/^\\d{15,16}$/.test(v('dNpwp').replace(/\\D/g, ''))) { galatH('dNpwp', 'NPWP terdiri dari 15 atau 16 digit angka.'); ada = true; }
  if (ada) { $('.ina-text-field__wrapper--status-error input')?.focus(); return false; }
  Object.assign(p, baru, { hp, npwp:v('dNpwp'), jk:v('dJk'), gelar:v('dGelar'), pekerjaan:v('dKerja'), tempat:v('dTempat'), kota:v('dKota'), warga:v('dWarga'), alamat:v('dAlamat'), rt:v('dRt'), rw:v('dRw'), kel:v('dKel'), kec:v('dKec'), prov:v('dProv'), domisili:v('dDomisili') });
  if (ktpDd) p.ktp = ktpDd; cobaKtpDd = 0; ktpDd = null; S.ddUbah = false;
  perbaruiKondisi();
  if (lanjut) { lanjut(); toast('Data diri tersimpan.', 'positive'); return true; }
  gambar();
  const sisa = kurangSemua().map(([, l]) => l);
  toast('Data diri tersimpan.', 'positive', 4500, sisa.length ? \`Masih diperlukan: \${sisa.join(', ')}.\` : 'Data untuk akta dan registrasi CA sudah lengkap.');
  $('#alertKelengkapan')?.scrollIntoView({ block:'center', behavior:'smooth' });
  return true;
}
/* perubahan belum disimpan di tab Data Diri (H3, H5) */
function tandaiUbahDd() {
  if (S.ddUbah) return; S.ddUbah = true;
  const st = $('#statusDd'); if (st) { st.classList.add('belum'); st.innerHTML = \`\${ik('seru', 14)} Belum disimpan\`; }
  const b = $('#batalDd'); if (b) b.disabled = false;
}
function jagaDd(lanjut) {
  if (!(S.ddUbah && S.layar === 'akun' && S.tab === 'data')) { lanjut(); return; }
  dialog({ judul:'Simpan perubahan data diri?', konfirmasi:true, isi:'<p>Ada perubahan di tab Data Diri yang belum disimpan. Jika Anda lanjut tanpa menyimpan, perubahan tersebut akan hilang.</p>',
    tombol:[['Batal','tertiary',null],['Buang Perubahan','secondary',() => { S.ddUbah = false; cobaKtpDd = 0; ktpDd = null; lanjut(); }],['Simpan & Lanjutkan','primary',() => { if (S.layar === 'akun' && S.tab === 'data') { /* formulir masih di layar */ } simpanDataDiri(lanjut); }]] });
}

`);
/* jaga saat pindah tab / halaman */
ganti("  const tb = t.closest('[data-tab]'); if (tb) { S.tab = tb.dataset.tab; gambar(); return; }", "  const tb = t.closest('[data-tab]'); if (tb) { const k = tb.dataset.tab; jagaDd(() => { S.tab = k; gambar(); }); return; }");
ganti("  const ak = t.closest('[data-akun]'); if (ak) { bukaAkun(ak.dataset.akun); return; }", "  const ak = t.closest('[data-akun]'); if (ak) { const k = ak.dataset.akun; jagaDd(() => bukaAkun(k)); return; }");
ganti("  if (e.target.id === 'dNik') {", "  if (S.layar === 'akun' && S.tab === 'data' && e.target.closest('#kartuDataDiri')) tandaiUbahDd();\n  if (e.target.id === 'dNik') {");
ganti("  const pk = t.closest('[data-pilih-ktp=\"dd\"]'); if (pk) { pilihKtpDd(); return; }", "  const pk = t.closest('[data-pilih-ktp=\"dd\"]'); if (pk) { pilihKtpDd(); tandaiUbahDd(); return; }");
ganti("H.addEventListener('keydown', e => { if (e.target.matches('[data-pilih-ktp]')", "H.addEventListener('change', e => { if (e.target.id === 'dJk' || e.target.id === 'dTgl') tandaiUbahDd(); });\nH.addEventListener('keydown', e => { if (e.target.matches('[data-pilih-ktp]')");
ganti("  if (cobaKtpDd % 2 === 1) { ktpDd = ''; $('#berkas-dd').innerHTML = berkasKtp('ktp-buram.jpg', '180 KB',", "  if (cobaKtpDd % 2 === 1) { ktpDd = ''; $('#berkas-dd').innerHTML = berkasKtp('ktp-buram.jpg', '180 KB',");

/* 5. CSS kelompok */
ganti(".catatan-kunci{margin:12px 2px 0;", `.grup-dd{margin-top:22px;padding-top:18px;border-top:1px solid var(--ina-stroke-primary)}
.grup-dd h4{margin:0;font:600 15px Inter,sans-serif;color:var(--ina-content-primary)}
.ket-grup{margin:2px 0 0;font-size:13px;color:var(--ina-content-secondary)}
.grup-dd .form-dd{margin-top:12px}
.opsional{font-weight:400;color:var(--ina-content-secondary)}
.status-simpan{margin-right:auto;font-size:13px;color:var(--ina-content-secondary);display:inline-flex;align-items:center;gap:6px}
.status-simpan.belum{color:var(--ina-warning-700,#6b4c00)}
.catatan-kunci{margin:12px 2px 0;`);

/* 6. daftar perubahan: HE-CA-07 */
ganti("  { kode:'HE-UMUM-02', judul:'Bantuan untuk Registrasi CA',", `  { kode:'HE-CA-07', judul:'Tab Data Diri: satu tempat untuk semua data, berkelompok seperti KTP',
    isi:'Semua data yang diperlukan untuk akta dan registrasi CA diisi di tab Data Diri (KTP), termasuk nomor HP (sebelumnya di tab Akun; kini tab Akun hanya menampilkannya). Isian dikelompokkan seperti urutan KTP: Identitas sesuai KTP, Alamat sesuai KTP, Kontak dan domisili, Foto KTP — tiap kelompok punya satu kalimat penjelasan. Isian wajib bertanda *, isian lain bertanda "(opsional)". Alert di atas menunjukkan "n dari 6 isian wajib terisi" dan tombol "Ke isian berikutnya". Kaki formulir menunjukkan "Belum disimpan" / "Semua perubahan tersimpan"; pindah tab dengan perubahan belum disimpan memunculkan konfirmasi. Format NIK, NPWP, nomor HP, dan RT/RW diperiksa sebelum disimpan.',
    lama:'Satu daftar panjang 17 isian tanpa pengelompokan; nomor HP di tab Akun sehingga data CA tersebar di dua tab; tidak ada penanda isian wajib; perubahan bisa hilang saat pindah tab tanpa peringatan; beda "Kota Domisili" dan "Domisili Sementara" tidak jelas.', ke:'datadiri', sorot:'#kartuDataDiri' },
  { kode:'HE-UMUM-02', judul:'Bantuan untuk Registrasi CA',`);
ganti("  if (u.ke === 'kurang-drawer') {", "  if (u.ke === 'datadiri') { setKondisi('kurang'); bukaDataDiri(); return; }\n  if (u.ke === 'kurang-drawer') {");
ganti('Daftar perubahan (8)</button>', 'Daftar perubahan (9)</button>');
ganti("Tombol \"Lengkapi di tab Data Diri\" membuka tab Data Diri (KTP) — satu-satunya formulir data diri, yang juga dipakai untuk profil pihak dalam akta — langsung ke isian pertama yang kosong; isian wajib yang kosong ditandai kuning (IDDS status warning). Alert di atas formulir menyebut data yang masih kurang, menautkan nomor HP ke tab Akun, dan setelah lengkap menampilkan tombol \"Kembali ke Registrasi CA\".",
  "Tombol \"Lengkapi di tab Data Diri\" membuka tab Data Diri (KTP) — satu-satunya formulir data diri, yang juga dipakai untuk profil pihak dalam akta — langsung ke isian pertama yang kosong; isian wajib yang kosong ditandai kuning (IDDS status warning). Setelah lengkap, alert di atas formulir menampilkan tombol \"Kembali ke Registrasi CA\".");
fs.writeFileSync(f, t); console.log(log.join('\n'));
