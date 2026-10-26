// Ukuran kartu kantor di sidebar disamakan dengan prototipe Biaya & PNBP (dan live): sidebar 240px, padding 12/16, nama 10px, baris 9px, ikon 10px. node kartu-kantor-ukuran.js
const fs = require('fs');
const LAMA = [
  '.sidebar{width:248px;',
  '.kantor.ina-card{flex:none;background:var(--ina-eppat-office-card);border:0;border-radius:12px;padding:12px 14px;margin-bottom:12px;box-shadow:none}',
  '.kantor .eyebrow{font:600 10px/15px Inter,sans-serif;letter-spacing:1.4px;text-transform:uppercase;color:#1f1f1f}',
  '.kantor .ina-card__title{margin:2px 0 4px;font:600 13px/18px Inter,sans-serif;color:var(--ina-content-primary)}',
  '.kantor .kantor-info{display:flex;flex-direction:column;gap:4px;margin-top:6px}',
  '.kantor .baris-kantor{display:flex;align-items:flex-start;gap:8px;font-size:12px;line-height:17px;color:#1f1f1f}',
  '.kantor .baris-kantor svg{flex:none;margin-top:2px}'
];
const BARU = [
  '.sidebar{width:240px;',
  '.kantor.ina-card{flex:none;background:var(--ina-eppat-office-card);border:0;border-radius:12px;padding:12px 16px;margin-bottom:12px;box-shadow:0 1px 2px rgba(0,0,0,.05)}',
  '.kantor .eyebrow{font:600 10px/15px Inter,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#1f1f1f;opacity:.7}',
  '.kantor .ina-card__title{margin:4px 0 0;font:600 10px/1.375 Inter,sans-serif;color:#1f1f1f}',
  '.kantor .kantor-info{display:flex;flex-direction:column;gap:4px;margin-top:8px;font-size:9px;line-height:13px;opacity:.8}',
  '.kantor .baris-kantor{display:flex;align-items:flex-start;gap:6px;font-size:9px;line-height:13px;font-weight:500;color:#1f1f1f}',
  '.kantor .baris-kantor svg{flex:none;width:10px;height:10px;margin-top:1px}'
];
for (const f of ['order-idds.html', 'tera-idds.html']) {
  let t = fs.readFileSync(f, 'utf8'), n = 0;
  LAMA.forEach((l, i) => { if (t.includes(l)) { t = t.split(l).join(BARU[i]); n++; } else if (!t.includes(BARU[i])) console.log('  tidak ketemu:', f, l.slice(0, 40)); });
  fs.writeFileSync(f, t); console.log('OK', f, n, 'aturan');
}
