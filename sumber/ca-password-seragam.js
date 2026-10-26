// Seragamkan syarat password dengan layar "ganti password sementara" live (12 karakter + 4 jenis). node ca-password-seragam.js
const fs = require('fs');
const f = 'ca-badan.html';
let t = fs.readFileSync(f, 'utf8'); const log = [];
const ganti = (dari, ke) => { const n = t.split(dari).length - 1; if (!n) { log.push('TIDAK ADA: ' + dari.slice(0, 70)); return; } t = t.split(dari).join(ke); log.push(`${n}× ${dari.slice(0, 50)}`); };
const potong = (awal, akhir, ke) => { const i = t.indexOf(awal), j = t.indexOf(akhir, i + 1); if (i < 0 || j < 0) { log.push('TIDAK ADA blok: ' + awal.slice(0, 40)); return; } t = t.slice(0, i) + ke + t.slice(j); log.push('blok ' + awal.slice(0, 40)); };

/* syarat sama persis dengan layar live "ganti password sementara" */
ganti("const PERAN_KET =", `const SYARAT_PW = [['Minimal 12 karakter', s => s.length >= 12], ['Mengandung huruf besar', s => /[A-Z]/.test(s)], ['Mengandung huruf kecil', s => /[a-z]/.test(s)], ['Mengandung angka', s => /[0-9]/.test(s)], ['Mengandung simbol', s => /[^A-Za-z0-9]/.test(s)]];
const PERAN_KET =`);
ganti("      \${pwIsian('pBaru', 'Password baru', 'Minimal 8 karakter', 'Minimal 8 karakter.', 'new-password')}\${pwIsian('pUlang', 'Ulangi password baru', 'Ketik ulang password baru', '', 'new-password')}</div>",
  "      ${pwIsian('pBaru', 'Password baru', 'Buat password baru', '', 'new-password')}${pwIsian('pUlang', 'Ulangi password baru', 'Ketik ulang password baru', '', 'new-password')}\n      <div class=\"lebar\"><ul class=\"syarat-pw\" id=\"syaratPw\" aria-live=\"polite\">${SYARAT_PW.map(([l], i) => `<li data-syarat=\"${i}\"><span class=\"tanda\" aria-hidden=\"true\"></span>${l}</li>`).join('')}</ul></div></div>");
potong('function cekPassword() {', 'function gantiPassword() {', `function cekPassword() {
  const lama = $('#pLama').value, baru = $('#pBaru').value, ulang = $('#pUlang').value;
  const ok = SYARAT_PW.map(([, uji]) => uji(baru));
  document.querySelectorAll('#syaratPw li').forEach((li, i) => { li.classList.toggle('ok', ok[i]); li.querySelector('.tanda').innerHTML = ok[i] ? ik('centang', 12) : ''; });
  const semua = ok.every(Boolean);
  if (baru && baru === lama) setPw('pBaru', 'Password baru harus berbeda dari password saat ini.', 'error');
  else setPw('pBaru', baru && semua ? 'Password sudah memenuhi semua syarat.' : '', baru && semua ? 'success' : '');
  if (!ulang) setPw('pUlang', '', '');
  else if (ulang !== baru) setPw('pUlang', 'Password belum sama dengan password baru.', 'error');
  else setPw('pUlang', 'Password sama.', 'success');
  setPw('pLama', '', '');
  $('#gantiPw').disabled = !(lama && semua && baru !== lama && ulang === baru);
}
`);
ganti(".mono{font-family:ui-monospace,Menlo,monospace}", `.mono{font-family:ui-monospace,Menlo,monospace}
.syarat-pw{list-style:none;margin:0;padding:12px 14px;border:1px solid var(--ina-stroke-primary);border-radius:10px;background:var(--ina-background-secondary);display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:6px 16px}
.syarat-pw li{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--ina-content-secondary)}
.syarat-pw .tanda{width:16px;height:16px;border-radius:999px;border:1.5px solid var(--ina-stroke-secondary);display:grid;place-items:center;flex:none}
.syarat-pw li.ok{color:var(--ina-content-positive)}
.syarat-pw li.ok .tanda{border-color:var(--ina-content-positive);background:var(--ina-positive-100)}`);
/* atur ulang juga mengembalikan daftar perangkat */
ganti("$('#aturUlang').addEventListener('click', () => { setKondisi('kurang'); S.banner = true;", "$('#aturUlang').addEventListener('click', () => { setKondisi('kurang'); S.sesi = SESI(); S.ddUbah = false; S.banner = true;");
/* daftar perubahan */
ganti("isian password memakai IDDS Password Input dengan tombol tampilkan/sembunyikan; panjang password dan kecocokan ulangan diperiksa saat mengetik;",
  "isian password memakai IDDS Password Input dengan tombol tampilkan/sembunyikan; syarat password diseragamkan dengan layar ganti password sementara (minimal 12 karakter, huruf besar, huruf kecil, angka, simbol) dan ditampilkan sebagai daftar centang yang terisi saat mengetik; kecocokan ulangan diperiksa;");
ganti("ID akun teknis (USR_…) ditampilkan tanpa keterangan.'", "ID akun teknis (USR_…) ditampilkan tanpa keterangan. Syarat password tidak seragam: layar ganti password sementara meminta 12 karakter + huruf besar, huruf kecil, angka, simbol, sedangkan tab Keamanan, Tambah User, dan Registrasi hanya meminta minimal 8 karakter.'");
fs.writeFileSync(f, t); console.log(log.join('\n'));
