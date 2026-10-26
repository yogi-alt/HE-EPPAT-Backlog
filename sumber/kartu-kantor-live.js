// Kartu kantor di sidebar disamakan dengan live: baris berikon (SK, wilayah, telepon, alamat). node kartu-kantor-live.js
const fs = require('fs');
const svg = d => `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const IK = {
  dok:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
  kartu:'<rect x="2" y="5" width="20" height="14" rx="2"/><circle cx="8" cy="12" r="2"/><path d="M14 10h4M14 14h4"/>',
  telepon:'<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
  gedung:'<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/>'
};
const lama = '<p class="ina-card__description">SK 1/KEP-CONTOH/2020<br>Wilayah Kota Contoh<br>0210000000</p>';
const baru = `<div class="ina-card__description kantor-info">
        <div class="baris-kantor">${svg(IK.dok)}<span>SK · 1/KEP-CONTOH/2020</span></div>
        <div class="baris-kantor">${svg(IK.kartu)}<span>Wilayah · Kota Contoh</span></div>
        <div class="baris-kantor">${svg(IK.telepon)}<span>0210000000</span></div>
        <div class="baris-kantor">${svg(IK.gedung)}<span>Jalan Contoh No. 10, Kota Contoh</span></div></div>`;
const css = `.kantor .kantor-info{display:flex;flex-direction:column;gap:4px;margin-top:6px}
.kantor .baris-kantor{display:flex;align-items:flex-start;gap:8px;font-size:12px;line-height:17px;color:#1f1f1f}
.kantor .baris-kantor svg{flex:none;margin-top:2px}
`;
for (const f of ['tera-idds.html', 'order-idds.html', 'minuta-badan.html', 'eaw-badan.html', 'ca-badan.html']) {
  let t = fs.readFileSync(f, 'utf8'); const n = t.split(lama).length - 1;
  t = t.split(lama).join(baru);
  /* CSS: kerangka bersama ada di order-idds.html (disalin gabung.js) dan di tera-idds.html */
  if ((f === 'order-idds.html' || f === 'tera-idds.html') && !t.includes('.baris-kantor{')) t = t.replace(/(\.kantor \.ina-card__description\{[^}]*\}\n)/, `$1${css}`);
  fs.writeFileSync(f, t); console.log(f, n, 'kartu', t.includes('.baris-kantor{') ? '+css' : '');
}
