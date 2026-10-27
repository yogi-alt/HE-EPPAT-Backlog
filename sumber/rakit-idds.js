// Merakit prototipe versi IDDS: menyisipkan brand E-PPAT (brand-eppat-idds/eppat.css), logo, dan latar live.
// node rakit-idds.js <sumber.html> <keluaran.html>
// Aset latar & logo dibaca dari sumber/aset/ (salinan lokal Peruri; dibuat sekali dengan simpan-aset.js) —
// tidak lagi bergantung pada berkas environment Perdana Niaga.
const fs = require('fs'), path = require('path');
const [src, out] = process.argv.slice(2);
const d = __dirname;
const bg = [null, fs.readFileSync(path.join(d, 'aset', 'latar.css.txt'), 'utf8')];
const logo = [null, fs.readFileSync(path.join(d, 'aset', 'logo.txt'), 'utf8')];
if (!bg[1] || !logo[1]) { console.error('aset tidak ketemu', !!bg[1], !!logo[1]); process.exit(1); }
const css = fs.readFileSync(path.join(d, '..', 'brand-eppat-idds', 'eppat.css'), 'utf8');
let html = fs.readFileSync(path.resolve(src), 'utf8').replace('__EPPAT_CSS__', css).replace('__BG__', bg[1]).split('__LOGO__').join(logo[1]);
if (/__EPPAT_CSS__|__BG__|__LOGO__/.test(html)) { console.error('placeholder tersisa'); process.exit(1); }
// Notifikasi bersama (IDDS-TN-39): sisipkan panel lonceng bila halaman punya tombol Notifikasi dan belum disisipi.
if (html.includes('aria-label="Notifikasi"') && !html.includes('id="notif-bersama"')) {
  const notif = fs.readFileSync(path.join(d, 'notifikasi-bersama.html'), 'utf8');
  const i = html.lastIndexOf('</body>');
  html = i < 0 ? html + notif : html.slice(0, i) + notif + '\n' + html.slice(i);
}
// Sidebar pola IDDS (struktur Expand/Collapse, kartu profil pengguna; warna brand tetap): sisipkan bila halaman bersidebar.
if (html.includes('<aside class="sidebar') && !html.includes('id="sidebar-idds-js"')) {
  const sb = fs.readFileSync(path.join(d, 'sidebar-idds.html'), 'utf8');
  const i = html.lastIndexOf('</body>');
  html = i < 0 ? html + sb : html.slice(0, i) + sb + '\n' + html.slice(i);
}
// Tooltip aman: kotak IDDS Tooltip selalu berada di dalam layar dan tidak terpotong wadah.
if (html.includes('ina-tooltip') && !html.includes('id="tooltip-aman-js"')) {
  const tt = fs.readFileSync(path.join(d, 'tooltip-aman.html'), 'utf8');
  const i = html.lastIndexOf('</body>');
  html = i < 0 ? html + tt : html.slice(0, i) + tt + '\n' + html.slice(i);
}
fs.writeFileSync(path.resolve(out), html);
console.log('OK', out, html.length, 'byte');
