// Merakit halaman pratinjau Brand Mode E-PPAT: menyisipkan brand-eppat-idds/eppat.css dan logo E-PPAT.
// node rakit-brand.js  → ../prototipe/Brand-Mode-EPPAT-IDDS.html
const fs = require('fs'), path = require('path');
const d = __dirname;
/* logo dari aset lokal Peruri (sumber/aset/logo.txt), bukan dari berkas environment Perdana Niaga */
const logo = [null, fs.readFileSync(path.join(d, 'aset', 'logo.txt'), 'utf8')];
if (!logo[1]) { console.error('logo tidak ketemu'); process.exit(1); }
const css = fs.readFileSync(path.join(d, '..', 'brand-eppat-idds', 'eppat.css'), 'utf8');
let html = fs.readFileSync(path.join(d, 'brand-body.html'), 'utf8').replace('__EPPAT_CSS__', css).split('__LOGO__').join(logo[1]);
if (/__EPPAT_CSS__|__LOGO__/.test(html)) { console.error('placeholder tersisa'); process.exit(1); }
const keluar = path.join(d, '..', 'prototipe', 'Brand-Mode-EPPAT-IDDS.html');
fs.writeFileSync(keluar, html);
console.log('OK', keluar, html.length, 'byte');
