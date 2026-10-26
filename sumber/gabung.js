// Gabungkan kepala bersama (CSS kerangka dari order-idds.html) + badan halaman → sumber lengkap.
// node gabung.js <badan.html> <keluar.html> "<judul tab>"
const fs = require('fs');
const [badan, keluar, judul] = process.argv.slice(2);
const order = fs.readFileSync('order-idds.html', 'utf8');
const akhir = order.indexOf('</style>', order.indexOf('<style id="order-css">')) + '</style>'.length;
const kepala = order.slice(0, akhir)
  .replace(/<title>[^<]*<\/title>/, `<title>Backlog E-PPAT Peruri — ${judul}</title>`)
  .replace('<style id="order-css">', '<style id="kerangka-css">');
fs.writeFileSync(keluar, kepala + '\n' + fs.readFileSync(badan, 'utf8'));
console.log('OK', keluar);
