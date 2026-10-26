// Ejaan baku "e-Meterai" (KBBI: meterai) di teks layar E-Akta Wizard + "Rp10.000" (EYD: tanpa spasi). node ejaan-emeterai.js
// Nama menu sidebar "Aktivasi E-Materai" tidak diubah (keputusan tim, lihat IDDS-TN-37).
const fs = require('fs');
const R = [
  ["l:'E-Meterai'", "l:'e-Meterai'"], ["'Menunggu E-Meterai'", "'Menunggu e-Meterai'"], ["['meterai', 'E-Meterai']", "['meterai', 'e-Meterai']"],
  ["label:'E-Meterai'", "label:'e-Meterai'"], ["tombol('Ke E-Meterai'", "tombol('Ke e-Meterai'"], ["kartuInfo(x, 'E-Meterai')", "kartuInfo(x, 'e-Meterai')"],
  ['Langkah berikutnya: E-Meterai.', 'Langkah berikutnya: e-Meterai.'], ['<li><b>E-Meterai:</b>', '<li><b>e-Meterai:</b>'],
  ['Tanda tangan, E-Meterai, Selesai', 'Tanda tangan, e-Meterai, Selesai'], ['Tanda Tangan Elektronik, E-Meterai.', 'Tanda Tangan Elektronik, e-Meterai.'],
  ['dibakukan menjadi "E-Meterai"', 'dibakukan menjadi "e-Meterai"']
];
let t = fs.readFileSync('eaw-badan.html', 'utf8'), n = 0;
for (const [a, b] of R) { const k = t.split(a).length - 1; n += k; t = t.split(a).join(b); }
/* "e-meterai" huruf kecil di teks kalimat → "e-Meterai" (kecuali kode/nama berkas/kelas) */
t = t.replace(/(^|[\s>(“"'])e-meterai(?![-\w.]*\.(?:html|png|svg|js))/g, (m, p) => { n++; return p + 'e-Meterai'; });
fs.writeFileSync('eaw-badan.html', t);
let e = fs.readFileSync('tn-eppat-badan.html', 'utf8'); const r = e.split('Rp 10.000').length - 1; fs.writeFileSync('tn-eppat-badan.html', e.split('Rp 10.000').join('Rp10.000'));
console.log('e-Meterai:', n, 'diganti · Rp10.000:', r);
