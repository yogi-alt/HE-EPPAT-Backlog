// Penanda versi prototipe. Sumber data: versi.json (versi aktif + daftar arsip) dan field `versi` pada usulan.
// node versi-pasang.js sumber   → sekali saja: tambah lencana "Baru di vN" ke template Daftar perubahan di semua sumber
// node versi-pasang.js index    → tulis blok versi di prototipe/index.html (dipanggil rakit-semua.js)
// node versi-pasang.js arsip v1 → pasang pita "Arsip" di semua berkas prototipe/<folder arsip>/ (sekali saat membekukan versi)
const fs = require('fs'), path = require('path');
const D = __dirname, P = path.join(D, '..', 'prototipe');
const V = JSON.parse(fs.readFileSync(path.join(D, 'versi.json'), 'utf8'));
const [mode, arg] = process.argv.slice(2);

if (mode === 'sumber') {
  const A = '<code>${u.kode}</code>', B = A + '${u.versi ? \'<span class="versi-ubah">Baru di \' + u.versi + \'</span>\' : \'\'}';
  const berkas = fs.readdirSync(D).filter(f => (/-badan\.html$/.test(f) || f === 'order-idds.html' || f === 'tera-idds.html') && !/arsip/.test(f));
  for (const f of berkas) {
    let t = fs.readFileSync(path.join(D, f), 'utf8');
    if (!t.includes(A) || t.includes('class="versi-ubah"')) { console.log('lewati', f); continue; }
    fs.writeFileSync(path.join(D, f), t.split(A).join(B)); console.log('OK', f);
  }
}

if (mode === 'index') {
  const J = JSON.parse(fs.readFileSync(path.join(D, 'backlog-he.json'), 'utf8'));
  const baru = J.item.filter(x => x.versi === V.versi);
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const blok = `<!--versi--><div class="versi-blok" aria-label="Versi prototipe">
      <div class="versi-baris"><span class="versi-proto">${V.versi} · ${V.tanggal}</span><span>Versi terbaru, ${esc(V.keterangan)}.</span>
        ${V.arsip.map(a => `<a class="versi-arsip" href="${a.folder}index.html">Buka ${a.versi} (${a.tanggal}, ${esc(a.keterangan)})</a>`).join('')}</div>
      ${baru.length ? `<details><summary>Perubahan sejak ${V.arsip[0].versi} (${baru.length})</summary><ul>${baru.map(x => `<li><code>${x.kode}</code> ${esc(x.judul)}</li>`).join('')}</ul></details>` : `<p class="versi-kosong">Belum ada perubahan sejak ${V.arsip[0].versi}.</p>`}
    </div><!--/versi-->`;
  const CSS = `<style id="versi-css">.versi-blok{margin:0 0 18px;padding:12px 14px;border:1px solid #d6e4de;border-radius:12px;background:#f6faf8;font-size:13px;line-height:20px}.versi-baris{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px}.versi-proto{display:inline-block;padding:2px 10px;border-radius:999px;background:#1b5e4a;color:#fff;font:600 12px/18px Inter,sans-serif}.versi-arsip{margin-left:auto;font-weight:600;color:#1b5e4a}.versi-blok details{margin-top:8px}.versi-blok summary{cursor:pointer;font-weight:600}.versi-blok ul{margin:6px 0 0;padding-left:20px}.versi-blok code{font-size:12px}.versi-kosong{margin:8px 0 0;color:#525252}@media (prefers-color-scheme:dark){.versi-blok{background:#14211d;border-color:#2a3b35}.versi-arsip{color:#8fd1b9}.versi-kosong{color:#b5c2bd}}</style>`;
  const F = path.join(P, 'index.html'); let t = fs.readFileSync(F, 'utf8');
  if (t.includes('<!--versi-->')) t = t.replace(/<!--versi-->[\s\S]*?<!--\/versi-->/, blok);
  else t = t.replace('<a class="panduan-dev"', blok + '\n\n    <a class="panduan-dev"');
  if (!t.includes('id="versi-css"')) t = t.replace('</head>', CSS + '\n</head>');
  fs.writeFileSync(F, t); console.log('OK index', V.versi, baru.length, 'perubahan');
}

if (mode === 'arsip') {
  const a = V.arsip.find(x => x.versi === arg); if (!a) { console.error('arsip tidak ada di versi.json:', arg); process.exit(1); }
  const dir = path.join(P, a.folder);
  const CSS = '<style id="pita-arsip-css">.pita-arsip{position:sticky;top:0;z-index:2147483600;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:4px 12px;padding:8px 16px;background:#7a4b00;color:#fff;font:500 13px/18px Inter,system-ui,sans-serif;text-align:center}.pita-arsip a{color:#fff;font-weight:700;text-decoration:underline}</style>';
  for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.html'))) {
    let t = fs.readFileSync(path.join(dir, f), 'utf8');
    if (t.includes('class="pita-arsip"')) continue;
    const pita = `<div class="pita-arsip" role="note">Arsip ${a.versi} · ${a.tanggal} (${a.keterangan}). Isinya tidak diubah lagi.<a href="../${f}">Buka versi terbaru</a></div>`;
    t = t.replace('</head>', CSS + '\n</head>').replace(/<body([^>]*)>/, m => m + '\n' + pita);
    fs.writeFileSync(path.join(dir, f), t); console.log('OK arsip', f);
  }
}
