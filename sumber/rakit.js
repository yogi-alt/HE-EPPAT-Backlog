// Merakit prototipe Peruri: kepala.html (CSS dasar meniru live) + <badan>.html + aset latar & logo + warna status CMS.
// node rakit.js <badan.html> <keluaran.html> "<judul>"
// Aset latar & logo dibaca (hanya-baca) dari prototipe Perdana Niaga EPPATPN-19 — tampilan live Peruri sama.
const fs = require('fs'), path = require('path');
const [badan, keluaran, judul] = process.argv.slice(2);
const d = __dirname;
const ref = path.join(d, '..', '..', 'handover-eppat-prototipe', 'prototipe', 'Backlog-EPPATPN-19-Pemilihan-Para-Pihak-Prototype.html');

let html = fs.readFileSync(path.join(d, 'kepala.html'), 'utf8').replace('__JUDUL__', judul || 'Prototipe E-PPAT')
  + '\n' + fs.readFileSync(path.resolve(badan), 'utf8');

const r = fs.readFileSync(ref, 'utf8');
const bg = r.match(/\.content\{flex:1;(background-image:url\("data:image\/jpeg;base64,[^"]+"\);[^}]*)\}/);
const logo = r.match(/<div class="(?:brand|sb-logo)"><img src="(data:image\/png;base64,[^"]+)"/);
if (!bg || !logo) { console.error('aset tidak ketemu', !!bg, !!logo); process.exit(1); }
html = html.replace('__BG__', bg[1]).split('__LOGO__').join(logo[1]);
if (/__BG__|__LOGO__|__JUDUL__/.test(html)) { console.error('placeholder tersisa'); process.exit(1); }

/* lencana mengikuti CMS › Tema Tampilan › Warna status (nilai bawaan CMS, rumus campur sama dengan aplikasi) */
const JENIS = { success: '#047857', warning: '#B45309', danger: '#B91C1C', info: '#1D4ED8', neutral: '#475569', disable: '#94A3B8' };
const rgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const campur = (c, t) => c.map(v => Math.round(v * t + 255 * (1 - t))).join(' ');
const vars = Object.entries(JENIS).map(([k, h]) => `--eppat-status-${k}-rgb:${rgb(h).join(' ')};--eppat-status-${k}-bg-rgb:${campur(rgb(h), .08)};--eppat-status-${k}-border-rgb:${campur(rgb(h), .35)}`).join(';\n  ');
const PETA = {
  neutral: ['.lenc', '.lenc.abu'], success: ['.lenc.ok'], warning: ['.lenc.amber'], danger: ['.lenc.merah'], info: ['.lenc.info']
};
const aturan = ['neutral', 'success', 'warning', 'danger', 'info'].map(k => `${PETA[k].join(',')}{color:rgb(var(--eppat-status-${k}-rgb))!important;background:rgb(var(--eppat-status-${k}-bg-rgb))!important;border-color:rgb(var(--eppat-status-${k}-border-rgb))!important}`).join('\n');
const CSS = `<style id="warna-status">\n:root{\n  ${vars}}\n${aturan}\n</style>\n`;
const z = html.lastIndexOf('</head>');
html = html.slice(0, z) + CSS + html.slice(z);

fs.writeFileSync(path.resolve(keluaran), html);
console.log('OK', keluaran, html.length, 'byte');
