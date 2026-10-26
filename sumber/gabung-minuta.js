// Gabungkan kepala bersama (CSS kerangka dari order-idds.html, sampai </style> order-css) + minuta-badan.html → minuta-idds.html
const fs = require('fs');
const order = fs.readFileSync('order-idds.html', 'utf8');
const akhir = order.indexOf('</style>', order.indexOf('<style id="order-css">')) + '</style>'.length;
const kepala = order.slice(0, akhir)
  .replace('<title>Backlog E-PPAT Peruri — Order AJB</title>', '<title>Backlog E-PPAT Peruri — Minuta Akta</title>')
  .replace('<style id="order-css">', '<style id="kerangka-css">');
fs.writeFileSync('minuta-idds.html', kepala + '\n' + fs.readFileSync('minuta-badan.html', 'utf8'));
console.log('OK minuta-idds.html');
