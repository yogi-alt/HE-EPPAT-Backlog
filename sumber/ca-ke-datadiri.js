// Hapus panel samping "Lengkapi data"; semua "Lengkapi" diarahkan ke tab Data Diri (KTP) (keputusan pengguna 26 Okt 2026). node ca-ke-datadiri.js
const fs = require('fs');
const f = 'ca-badan.html';
let t = fs.readFileSync(f, 'utf8'); const log = [];
const ganti = (dari, ke) => { const n = t.split(dari).length - 1; if (!n) { log.push('TIDAK ADA: ' + dari.slice(0, 70)); return; } t = t.split(dari).join(ke); log.push(`${n}× ${dari.slice(0, 50)}`); };
const potong = (awal, akhir, ke) => { const i = t.indexOf(awal), j = t.indexOf(akhir, i); if (i < 0 || j < 0) { log.push('TIDAK ADA blok: ' + awal.slice(0, 40)); return; } t = t.slice(0, i) + ke + t.slice(j); log.push('blok ' + awal.slice(0, 40)); };

/* 1. hapus panel samping, ganti dengan bukaDataDiri() */
potong('/* ---------------- drawer "Lengkapi data" (HE-CA-02)', 'function berkasKtp(', `/* ---------------- "Lengkapi data" → tab Data Diri (KTP) (HE-CA-02) ----------------
   Satu formulir saja: data diri dipakai untuk profil pihak dalam akta dan untuk registrasi CA. */
const ID_ISIAN = { nik:'dNik', tempat:'dTempat', tgl:'dTgl', alamat:'dAlamat', ktp:'f-ddKtp' };
function bukaDataDiri() {
  S.layar = 'akun'; S.tab = 'data'; S.dariCa = true; S.ubahAkun = false; gambar();
  const k = kurangSemua().filter(([x]) => x !== 'hp'), el = k.length && document.getElementById(ID_ISIAN[k[0][0]]);
  if (el) { el.scrollIntoView({ block:'center' }); (el.matches('input, textarea') ? el : el.querySelector('[data-pilih-ktp]'))?.focus({ preventScroll:true }); }
  else $('#alertKelengkapan')?.scrollIntoView({ block:'center' });
}
/* alert kelengkapan di atas formulir: isian kurang, nomor HP (tab Akun), dan jalan kembali ke Registrasi CA */
function alertKelengkapan() {
  const k = kurangSemua();
  if (!k.length) return S.dariCa ? \`<div id="alertKelengkapan" class="berikut">\${alert('success', 'Data diri sudah lengkap', 'Data yang diperlukan untuk akta dan registrasi sertifikat elektronik (CA) sudah terisi.', \`<div class="aksi">\${tombol('Kembali ke Registrasi CA', 'primary', 'sm', 'data-akun="ca"', ik('panah', 14))}</div>\`)}\${usulan('HE-CA-02')}</div>\` : '';
  const isian = k.filter(([x]) => x !== 'hp'), hp = k.some(([x]) => x === 'hp');
  const isi = [isian.length ? \`Lengkapi isian bertanda kuning di bawah: \${isian.map(([, l]) => l).join(', ')}.\` : '', hp ? 'Nomor HP diisi di tab Akun.' : ''].filter(Boolean).join(' ');
  return \`<div id="alertKelengkapan" class="berikut">\${alert('caution', \`Masih diperlukan untuk akta dan registrasi CA: \${k.length} data\`, isi, hp ? \`<div class="aksi">\${tombol('Isi nomor HP di tab Akun', 'secondary', 'sm', 'data-ke-hp', ik('user', 14))}</div>\` : '')}\${usulan('HE-CA-02')}</div>\`;
}
/* tandai isian wajib yang masih kosong dengan status warning IDDS */
function tandaiKosong() {
  if (S.layar !== 'akun' || S.tab !== 'data') return;
  const p = S.profil, T = 'Belum diisi — diperlukan untuk akta dan registrasi CA.';
  [['nik', 'dNik'], ['tempat', 'dTempat'], ['tgl', 'dTgl']].forEach(([k, id]) => { if (p[k]) return; $(\`#f-\${id} .ina-text-field__wrapper\`)?.classList.add('ina-text-field__wrapper--status-warning'); const h = $(\`#h-\${id}\`); if (h) { h.textContent = T; h.classList.add('ina-text-field__helper-text--warning'); } });
  if (!p.alamat) { $('#f-dAlamat .ina-text-area__wrapper')?.classList.replace('ina-text-area__wrapper--status-neutral', 'ina-text-area__wrapper--status-warning'); const h = $('#h-dAlamat'); if (h) { h.textContent = T; h.classList.add('ina-text-field__helper-text--warning'); } }
  if (!p.ktp && !$('#berkas-dd').innerHTML) $('#h-ddKtp').textContent = 'Belum diunggah — diperlukan untuk registrasi CA.';
}

`);

/* 2. tab Data Diri & tab Akun menampilkan alert kelengkapan */
ganti(`    <div class="form-dd">
      \${ws('dNik',`, `    \${alertKelengkapan()}
    <div class="form-dd">
      \${ws('dNik',`);
ganti(`  return \`<div class="ina-card ina-card--variant-basic kartu"><div class="atas"><div><div class="eb">Identitas Akun</div>`, `  return \`\${S.dariCa ? alertKelengkapan() : ''}<div class="ina-card ina-card--variant-basic kartu"><div class="atas"><div><div class="eb">Identitas Akun</div>`);
ganti(`  if (S.ubahAkun) return \`<div class="ina-card ina-card--variant-basic kartu"><div class="eb">Identitas Akun</div><h3>Ubah data akun</h3>`, `  if (S.ubahAkun) return \`\${S.dariCa ? alertKelengkapan() : ''}<div class="ina-card ina-card--variant-basic kartu"><div class="eb">Identitas Akun</div><h3>Ubah data akun</h3>`);
ganti("function gambar() { gambarNav(); gambarMenu(); $('#halaman').innerHTML = S.layar === 'eaw' ? layarEaw() : layarAkun(); pasangPanduan(); }",
  "function gambar() { gambarNav(); gambarMenu(); $('#halaman').innerHTML = S.layar === 'eaw' ? layarEaw() : layarAkun(); pasangPanduan(); tandaiKosong(); }");
ganti("function bukaAkun(tab) { S.layar = 'akun'; S.tab = tab;", "function bukaAkun(tab) { S.layar = 'akun'; S.tab = tab; if (tab === 'ca') S.dariCa = false;");

/* 3. semua "Lengkapi" → tab Data Diri */
ganti("  if (t.closest('[data-lengkapi]')) { bukaLengkapi(); return; }", "  if (t.closest('[data-lengkapi]')) { bukaDataDiri(); return; }\n  if (t.closest('[data-ke-hp]')) { S.tab = 'akun'; S.ubahAkun = true; gambar(); $('#aHp')?.focus(); return; }");
ganti("['Lengkapi Sekarang','primary',() => { bukaAkun('ca'); bukaLengkapi(kurangSemua()); }]", "['Lengkapi Sekarang','primary',() => { bukaDataDiri(); }]");
ganti("tombol:[['Ubah Data','secondary',() => { bukaLengkapi(); }],", "tombol:[['Ubah Data','secondary',() => { bukaDataDiri(); }],");
ganti("  if (u.ke === 'kurang-drawer') { setKondisi('kurang'); bukaAkun('ca'); bukaLengkapi(); return; }", "  if (u.ke === 'kurang-drawer') { setKondisi('kurang'); bukaDataDiri(); pilihKtpDd(); $('#f-ddKtp')?.scrollIntoView({ block:'center' }); return; }");
ganti("tombol('Lengkapi data', 'primary', 'md', 'data-lengkapi', ik('pena', 16))", "tombol('Lengkapi di tab Data Diri', 'primary', 'md', 'data-lengkapi', ik('panah', 16))");
ganti("${n ? '' : tombol('Ubah data', 'tertiary', 'sm', 'data-lengkapi', ik('pena', 14))}", "${n ? '' : tombol('Ubah di tab Data Diri', 'tertiary', 'sm', 'data-lengkapi', ik('pena', 14))}");
/* setelah simpan: ringkasan kembali ke alert, bukan toast saja */
ganti("  const sisa = kurang().map(([k, l]) => k === 'hp' ? 'Nomor HP (tab Akun)' : l);\n  toast('Data diri tersimpan.', 'positive', 4500, sisa.length ? `Masih diperlukan untuk registrasi CA: ${sisa.join(', ')}.` : 'Data untuk registrasi CA sudah lengkap.');",
  "  const sisa = kurangSemua().map(([k, l]) => k === 'hp' ? 'Nomor HP (tab Akun)' : l);\n  toast('Data diri tersimpan.', 'positive', 4500, sisa.length ? `Masih diperlukan: ${sisa.join(', ')}.` : 'Data untuk akta dan registrasi CA sudah lengkap.');\n  $('#alertKelengkapan')?.scrollIntoView({ block:'center', behavior:'smooth' });");

/* 4. daftar perubahan */
ganti("Tombol \"Lengkapi data\" membuka IDDS Drawer yang hanya berisi isian yang kurang, tanpa berpindah tab.", "Tombol \"Lengkapi di tab Data Diri\" membuka tab Data Diri (KTP) — satu-satunya formulir data diri, yang juga dipakai untuk profil pihak dalam akta — langsung ke isian pertama yang kosong; isian wajib yang kosong ditandai kuning (IDDS status warning). Alert di atas formulir menyebut data yang masih kurang, menautkan nomor HP ke tab Akun, dan setelah lengkap menampilkan tombol \"Kembali ke Registrasi CA\".");
ganti("dan membuka Drawer yang sama.", "dan membawa pengguna ke tab Data Diri dengan cara yang sama.");
ganti("Kesalahan data diri ditampilkan tepat di bawah isian atau berkas yang bermasalah", "Kesalahan data diri (tab Data Diri dan tab Akun) ditampilkan tepat di bawah isian atau berkas yang bermasalah");

/* 5. CSS sisa panel */
ganti(".ina-drawer__content .ina-text-field{margin-bottom:14px}\n", "");
fs.writeFileSync(f, t); console.log(log.join('\n'));
console.log('sisa rujukan panel:', (t.match(/bukaLengkapi|#pilihKtp|simpanData\b|iNik/g) || []).join(', ') || 'tidak ada');
