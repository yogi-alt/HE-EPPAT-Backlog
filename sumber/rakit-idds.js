// Merakit prototipe versi IDDS: menyisipkan brand E-PPAT (brand-eppat-idds/eppat.css), logo, dan latar live.
// node rakit-idds.js <sumber.html> <keluaran.html>
// Aset latar & logo dibaca dari sumber/aset/ (salinan lokal Peruri; dibuat sekali dengan simpan-aset.js) —
// tidak lagi bergantung pada berkas environment Perdana Niaga.
const fs = require('fs'), path = require('path');
const [src, out] = process.argv.slice(2);
const d = __dirname;
const bg = [null, fs.readFileSync(path.join(d, 'aset', 'latar.css.txt'), 'utf8')];
const logo = [null, fs.readFileSync(path.join(d, 'aset', 'logo.txt'), 'utf8')];
if (!bg[1] || !logo[1]) { console.error('aset tidak ketemu', !!bg[1], !!logo[1]); process.exit(1); }
const css = fs.readFileSync(path.join(d, '..', 'brand-eppat-idds', 'eppat.css'), 'utf8');
let html = fs.readFileSync(path.resolve(src), 'utf8').replace('__EPPAT_CSS__', css).replace('__BG__', bg[1]).split('__LOGO__').join(logo[1]);
if (/__EPPAT_CSS__|__BG__|__LOGO__/.test(html)) { console.error('placeholder tersisa'); process.exit(1); }
// Notifikasi bersama (IDDS-TN-39): sisipkan panel lonceng bila halaman punya tombol Notifikasi dan belum disisipi.
if (html.includes('aria-label="Notifikasi"') && !html.includes('id="notif-bersama"')) {
  const notif = fs.readFileSync(path.join(d, 'notifikasi-bersama.html'), 'utf8');
  const i = html.lastIndexOf('</body>');
  html = i < 0 ? html + notif : html.slice(0, i) + notif + '\n' + html.slice(i);
}
// Perjalanan Permohonan AJB: stepper dan layar tahapnya berbagi status. Disisipkan di kepala agar tersedia untuk skrip halaman.
if (/Backlog-(HE-(VERIF|MINUTA-V2|EAW|EAWK|CA|USER|TERA|ORDER|TUGAS)|IDDS-TN-[A-Z]+)-Prototype\.html$/.test(out) && !html.includes('id="ajb-bersama-js"')) {
  const ajb = fs.readFileSync(path.join(d, 'ajb-bersama.html'), 'utf8');
  html = html.replace('<head>', () => '<head>\n' + ajb);
}
// Sesi bersama: prototipe tenant saling terhubung (masuk simulasi, menu profil, menu per peran). Disisipkan sebelum sidebar.
if (/Backlog-(HE-(VERIF|MINUTA-V2|EAW|EAWK|CA|USER|TERA|ORDER|TUGAS)|IDDS-TN-[A-Z]+)-Prototype\.html$/.test(out) && !html.includes('id="sesi-bersama-js"')) {
  const ikon = JSON.parse(fs.readFileSync(path.join(d, 'aset', 'tabler-sidebar.json'), 'utf8'));
  const se = fs.readFileSync(path.join(d, 'sesi-bersama.html'), 'utf8').replace('__TABLER__', () => JSON.stringify(ikon));
  html = html.replace('<head>', () => '<head>\n<script id="sesi-kepala-js">try { window.SESI_PROTO = JSON.parse(localStorage.getItem(\'eppat-sesi\')); var t = JSON.parse(localStorage.getItem(\'eppat-trial\')) || {}; if (window.SESI_PROTO && window.SESI_PROTO.paket === \'trial\') { if (t.nama) window.SESI_PROTO.nama = t.nama; if (t.email) window.SESI_PROTO.email = t.email; } window.PAKET_TRIAL = window.SESI_PROTO && window.SESI_PROTO.paket === \'trial\' && !(t.db && t.db.ent) ? { batas:!!t.batas, pengguna:5, transaksi:10, upgrade:\'Backlog-HE-TRIAL-Prototype.html#berlangganan\' } : null; } catch (e) { window.SESI_PROTO = null; window.PAKET_TRIAL = null; }</script>');
  const i = html.lastIndexOf('</body>');
  html = i < 0 ? html + se : html.slice(0, i) + se + '\n' + html.slice(i);
}
// Sidebar pola IDDS (struktur Expand/Collapse, kartu profil pengguna; warna brand tetap): sisipkan bila halaman bersidebar.
if (html.includes('<aside class="sidebar') && !html.includes('id="sidebar-idds-js"')) {
  const sb = fs.readFileSync(path.join(d, 'sidebar-idds.html'), 'utf8');
  const i = html.lastIndexOf('</body>');
  html = i < 0 ? html + sb : html.slice(0, i) + sb + '\n' + html.slice(i);
}
// Tooltip aman: kotak IDDS Tooltip selalu berada di dalam layar dan tidak terpotong wadah.
if (html.includes('ina-tooltip') && !html.includes('id="tooltip-aman-js"')) {
  const tt = fs.readFileSync(path.join(d, 'tooltip-aman.html'), 'utf8');
  const i = html.lastIndexOf('</body>');
  html = i < 0 ? html + tt : html.slice(0, i) + tt + '\n' + html.slice(i);
}
// Sorot bersama: lingkaran biru berkedip setiap klik "Lihat di layar".
if (html.includes('Lihat di layar') && !html.includes('id="sorot-bersama-js"')) {
  const so = fs.readFileSync(path.join(d, 'sorot-bersama.html'), 'utf8');
  const i = html.lastIndexOf('</body>');
  html = i < 0 ? html + so : html.slice(0, i) + so + '\n' + html.slice(i);
}
// Kabar bersama: pesan hasil tindakan tampil sebagai IDDS Alert di atas kartu terkait, bukan toast di kanan bawah.
if (html.includes('id="toastWadah"') && !html.includes('id="kabar-bersama-js"')) {
  const kb = fs.readFileSync(path.join(d, 'kabar-bersama.html'), 'utf8');
  const i = html.lastIndexOf('</body>');
  html = i < 0 ? html + kb : html.slice(0, i) + kb + '\n' + html.slice(i);
}
// Tur bersama: tour guide semua modul (muncul pertama kali, putar ulang dari Bantuan) untuk prototipe yang mendaftarkan TUR_ANTRE.
if (html.includes('TUR_ANTRE') && !html.includes('id="tur-bersama-js"')) {
  const tb = fs.readFileSync(path.join(d, 'tur-bersama.html'), 'utf8');
  const i = html.lastIndexOf('</body>');
  html = i < 0 ? html + tb : html.slice(0, i) + tb + '\n' + html.slice(i);
}
// Penanda versi (versi.json): label di protobar sesudah tautan "Daftar prototipe" + lencana "Baru di vN" di Daftar perubahan.
{
  const V = JSON.parse(fs.readFileSync(path.join(d, 'versi.json'), 'utf8'));
  const a = V.arsip[0];
  const label = `<span class="versi-proto" title="Versi ${V.versi}, ${V.keterangan}. ${a ? `Arsip ${a.versi} (${a.tanggal}) ada di daftar prototipe.` : ''}">${V.versi} · ${V.tanggal}</span>`;
  if (!html.includes('class="versi-proto"')) html = html.replace(/(Daftar prototipe<\/a>)/, `$1${label}`);
  if (!html.includes('id="versi-proto-css"')) html = html.replace('</head>', '<style id="versi-proto-css">.versi-proto{display:inline-block;padding:3px 10px;border-radius:999px;background:#E6EDEA;color:#0f1a17;font:600 11px/16px Inter,sans-serif}.versi-ubah{display:inline-block;margin-left:6px;padding:1px 8px;border-radius:999px;background:var(--ina-primary-100,#dcebe5);color:var(--ina-primary-700,#1b5e4a);font:600 11px/18px Inter,sans-serif;vertical-align:middle}</style>\n</head>');
}
// Pilihan tema prototipe (E-PPAT | INAgov | Default IDDS): bagian kepala tepat setelah <head> (tanpa kedip), pil protobar sebelum </body>.
if (html.includes('@idds/styles') && !html.includes('id="tema-proto-js"')) {
  const [kepala, badan] = fs.readFileSync(path.join(d, 'tema-proto.html'), 'utf8').split('<!-- ===== bagian badan ===== -->');
  const h = html.indexOf('<head>');
  if (h < 0 || !badan) { console.error('tema-proto: <head> atau penanda badan tidak ketemu'); process.exit(1); }
  html = html.slice(0, h + 6) + '\n' + kepala.trim() + '\n' + html.slice(h + 6);
  const i = html.lastIndexOf('</body>');
  html = i < 0 ? html + badan : html.slice(0, i) + badan.trim() + '\n' + html.slice(i);
}
fs.writeFileSync(path.resolve(out), html);
console.log('OK', out, html.length, 'byte');
