// Ganti semua ikon UI prototipe dengan Tabler Icons resmi (pustaka ikon IDDS). Idempoten.
// Sumber tunggal: aset/tabler-ui.json (peta kunci -> nama Tabler + isi SVG resmi 3.19.0).
// node ikon-tabler.js [berkas tambahan ...]   (mis. templat OB di luar folder sumber)
const fs = require('fs'), path = require('path');
const D = __dirname + '/';
const T = JSON.parse(fs.readFileSync(D + 'aset/tabler-ui.json', 'utf8'));
const svgDari = nama => { const s = T.svg[nama]; if (!s) throw new Error('SVG Tabler tidak ada: ' + nama); return s; };

const BERKAS = fs.readdirSync(D).filter(f => /(-badan\.html|^order-idds\.html|^tera-idds\.html|^notifikasi-bersama\.html|^sidebar-idds\.html|^kepala\.html|^brand-body\.html)$/.test(f)).map(f => D + f)
  .concat([D + '../prototipe/index.html'], process.argv.slice(2).map(p => path.resolve(p)));

/* akhir blok {...} (hormati string ' " `) */
function akhirBlok(t, buka) {
  let dalam = 0, q = null;
  for (let i = buka; i < t.length; i++) {
    const c = t[i];
    if (q) { if (c === '\\') { i++; continue; } if (c === q) q = null; continue; }
    if (c === "'" || c === '"' || c === '`') { q = c; continue; }
    if (c === '{') dalam++; else if (c === '}' && --dalam === 0) return i;
  }
  return -1;
}

/* tanda tangan SVG inline lama -> nama Tabler */
const norm = s => s.replace(/\s+(stroke|stroke-width|stroke-linecap|stroke-linejoin)="[^"]*"/g, '').replace(/\s+fill="none"/g, '')
  .replace(/><\/(path|line|polyline|circle|rect)>/g, '/>').replace(/\s*\/>/g, '/>').replace(/\s+/g, ' ').replace(/> </g, '><').trim();
const INLINE = {
  '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>': 'upload',
  '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>': 'x',
  '<circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-6"/>': 'circle-check',
  '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>': 'file-text',
  '<rect x="2" y="5" width="20" height="14" rx="2"/><circle cx="8" cy="12" r="2"/><path d="M14 10h4M14 14h4"/>': 'id',
  '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>': 'phone',
  '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/>': 'building',
  '<path d="M3 6h18M3 12h18M3 18h18"/>': 'menu-2',
  '<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/>': 'eye',
  '<path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>': 'bell',
  '<path d="M9 6l6 6-6 6"/>': 'chevron-right',
  '<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01"/>': 'help-circle',
  '<path d="M18 6L6 18M6 6L18 18"/>': 'x',
  '<path d="M6 9L12 15L18 9"/>': 'chevron-down',
  '<path d="M6 9l6 6 6-6"/>': 'chevron-down',
  '<polyline points="6 9 12 15 18 9"/>': 'chevron-down',
  '<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.7" y2="16.7"/>': 'search',
  '<polyline points="9 18 15 12 9 6"/>': 'chevron-right'
};
const SIMPAN_ATR = ['xmlns', 'class', 'id', 'width', 'height', 'aria-hidden', 'focusable', 'role', 'aria-label'];

const lap = { berkas: 0, kunci: 0, inline: 0, tak: new Set() };
for (const f of BERKAS) {
  if (!fs.existsSync(f)) continue;
  const asal = fs.readFileSync(f, 'utf8'); let t = asal; let nK = 0, nI = 0;
  const gantiNilai = (blok) => blok.replace(/(^|[\s,{])([a-zA-Z_]\w*)(\s*:\s*)'(<[^']*)'/g, (m, a, k, s, v) => {
    if (k.startsWith('tb_') && !T.peta[k]) return m; // tb_* sidebar sudah Tabler (aset/tabler-sidebar.json)
    const nama = T.peta[k]; if (!nama) { lap.tak.add(k + ' @' + path.basename(f)); return m; }
    nK++; return `${a}${k}${s}'${svgDari(nama)}'`;
  });
  /* 1. objek ikon: const I/IK = {...} dan Object.assign(I, {...}) */
  for (const re of [/const I = \{/g, /const IK = \{/g, /Object\.assign\(I, \{/g]) {
    let m; re.lastIndex = 0;
    while ((m = re.exec(t))) {
      const buka = m.index + m[0].length - 1, tutup = akhirBlok(t, buka); if (tutup < 0) throw new Error('blok tak tertutup ' + f);
      const baru = gantiNilai(t.slice(buka, tutup + 1)); t = t.slice(0, buka) + baru + t.slice(tutup + 1); re.lastIndex = buka + baru.length;
    }
  }
  /* 2. I.kunci = '...' */
  t = t.replace(/\bI\.([a-zA-Z_]\w*)(\s*=\s*)'(<[^']*)'/g, (m, k, s) => { const nama = T.peta[k]; if (!nama) { lap.tak.add(k + ' @' + path.basename(f)); return m; } nK++; return `I.${k}${s}'${svgDari(nama)}'`; });
  /* 3. ikon kendali sidebar-idds */
  for (const [c, nama] of [['IK_CIUT', 'layout-sidebar-left-collapse'], ['IK_BENTANG', 'layout-sidebar-left-expand'], ['IK_PILIH', 'selector']])
    t = t.replace(new RegExp(`(const ${c} = )'[^']*'`), (m, a) => { nI++; return `${a}'${svgDari(nama)}'`; });
  /* 4. SVG inline statis */
  t = t.replace(/<svg\b([^>]*)>([\s\S]*?)<\/svg>/g, (m, atr, isi) => {
    if (atr.includes('${') || isi.includes('${')) return m;
    const nama = INLINE[norm(isi)]; if (!nama) return m;
    const a = {}; for (const x of atr.matchAll(/([\w:-]+)="([^"]*)"/g)) a[x[1]] = x[2];
    const sw = a['stroke-width'] || '2';
    const simpan = SIMPAN_ATR.filter(k => k in a).map(k => ` ${k}="${a[k]}"`).join('');
    nI++; return `<svg${simpan} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${svgDari(nama)}</svg>`;
  });
  /* 5. panah select (data URI CSS) */
  t = t.replace(/<polyline points='6 9 12 15 18 9'\/>/g, () => { nI++; return "<path d='M6 9l6 6l6 -6'/>"; });
  if (t !== asal) { fs.writeFileSync(f, t); lap.berkas++; }
  lap.kunci += nK; lap.inline += nI;
  if (nK || nI) console.log(`${path.basename(f)}: ikon objek ${nK}, inline ${nI}${t === asal ? ' (sudah Tabler)' : ''}`);
}
console.log(`berkas diubah: ${lap.berkas} | nilai ikon objek: ${lap.kunci} | ikon inline: ${lap.inline}`);
if (lap.tak.size) console.log('kunci tanpa peta (dibiarkan):', [...lap.tak].join(', '));
