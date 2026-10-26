// Sidebar Platform seragam (Monitoring/Akta/Sistem): ikon grup dan ikon menu sama di ketiga prototipe. node sidebar-platform.js
const fs = require('fs');
const ref = fs.readFileSync('pl-monitoring-badan.html', 'utf8');
const def = k => { const m = new RegExp(`\\b${k}:'([^']*)'`).exec(ref); if (!m) throw new Error('ikon tidak ada di Monitoring: ' + k); return `${k}:'${m[1]}'`; };
const PERLU = ['monitor', 'stempel', 'gear', 'grid', 'gedung', 'bintang', 'daftar', 'palet'];
const UBAH = {
  'pl-akta-badan.html':[
    ["{ g:'Monitoring', m:[", "{ g:'Monitoring', ik:'monitor', m:["], ["{ g:'Akta', m:[", "{ g:'Akta', ik:'stempel', m:["], ["{ g:'Sistem', m:[", "{ g:'Sistem', ik:'gear', m:["],
    ['aria-expanded="${grupBuka.has(i)}"><span>${g.g}</span>', 'aria-expanded="${grupBuka.has(i)}">${ik(g.ik, 14)}<span>${g.g}</span>']],
  'pl-sistem-badan.html':[["{ g:'Monitoring', ik:'naik',", "{ g:'Monitoring', ik:'monitor',"], ["{ g:'Akta', ik:'pena',", "{ g:'Akta', ik:'stempel',"], ["['Paket Langganan', 'kilau',", "['Paket Langganan', 'bintang',"]]
};
for (const [f, R] of Object.entries(UBAH)) {
  let t = fs.readFileSync(f, 'utf8'), n = 0;
  for (const [a, b] of R) { if (t.includes(a)) { t = t.split(a).join(b); n++; } else if (!t.includes(b)) console.log('TIDAK KETEMU di', f, ':', a.slice(0, 50)); }
  const ia = t.indexOf('const I = {'), iz = t.indexOf('\n};', ia), blok = t.slice(ia, iz);
  const kurang = PERLU.filter(k => !new RegExp(`[\\s{,]${k}:'`).test(blok));
  if (kurang.length) t = t.slice(0, iz) + `,\n  ${kurang.map(def).join(', ')} /* ikon sidebar platform */` + t.slice(iz);
  /* gambar ikon disamakan dengan Monitoring (nama sama = gambar sama) */
  for (const k of [...PERLU, 'chev']) { const m = new RegExp(`\\b${k}:'([^']*)'`).exec(ref); if (m) t = t.replace(new RegExp(`(\\b${k}:)'[^']*'`, 'g'), (x, p) => `${p}'${m[1]}'`); }
  fs.writeFileSync(f, t); console.log('OK', f, n, 'ganti', kurang.length ? '+ikon ' + kurang.join(',') : '');
}
