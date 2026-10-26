// Menu sidebar saling terhubung antar-prototipe: klik menu → buka berkas Backlog-HE-<FITUR>-Prototype.html. node sidebar-antar-prototipe.js
const fs = require('fs');
const PETA = `const PROTO = { 'Dasbor':'Backlog-HE-TERA-Prototype.html', 'Verifikasi':'Backlog-HE-VERIF-Prototype.html', 'Minuta':'Backlog-HE-MINUTA-Prototype.html', 'E-Akta Wizard':'Backlog-HE-EAW-Prototype.html', 'Order AJB':'Backlog-HE-ORDER-Prototype.html' }; /* menu → prototipe */`;
const GANTI = `if (!a.dataset.ke) { const nm = a.textContent.trim(); if (PROTO[nm]) { location.href = PROTO[nm]; return; } toast(\`Menu \${nm} belum memiliki prototipe.\`); return; }`;
for (const f of ['tera-idds.html', 'order-idds.html', 'minuta-badan.html', 'eaw-badan.html', 'verif-badan.html']) {
  let t = fs.readFileSync(f, 'utf8');
  t = t.replace("  if (a.dataset.nama === 'Order AJB') { location.href = 'Backlog-HE-ORDER-Prototype.html'; return; }\n", '');
  const n0 = t.length;
  t = t.replace(/if \(!a\.dataset\.ke\) \{ toast\('Menu ini tidak termasuk dalam prototipe [^']+'(?:, 'default')?\); return; \}/, GANTI);
  if (t.length === n0) { console.log('LEWATI (pola tidak ketemu):', f); continue; }
  if (!t.includes('const PROTO = {')) t = t.replace(/\$\('#nav'\)\.addEventListener\('click'/, PETA + "\n$('#nav').addEventListener('click'");
  fs.writeFileSync(f, t); console.log('OK', f);
}
