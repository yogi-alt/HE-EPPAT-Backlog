// Lengkapi cari & saring daftar E-Akta Wizard (PPAT): HE-EAW-07. node eaw-cari.js
const fs = require('fs');
let t = fs.readFileSync('eaw-badan.html', 'utf8');
const G = [
  ['Daftar perubahan (8)', 'Daftar perubahan (9)'],
  ['      <div class="halaman"><span>Menampilkan 1–${ORDER.length} dari ${ORDER.length}</span>', '      <div class="halaman"><span>Menampilkan ${rows.length ? 1 : 0}–${rows.length} dari ${rows.length}</span>'],
  ['/* cari & saring daftar (HE-EAW-07, pola sama dengan Minuta dan Verifikasi) */',
   "/* cari & saring daftar (HE-EAW-07, pola sama dengan Minuta dan Verifikasi) */\nI.cari = '<circle cx=\"11\" cy=\"11\" r=\"7\"/><path d=\"M21 21l-4.3-4.3\"/>';"],
  ["H.addEventListener('change', e => { if (e.target.id === 'inHal') keHal(+e.target.value || 1); });",
   "H.addEventListener('change', e => { if (e.target.id === 'inHal') keHal(+e.target.value || 1); });\nH.addEventListener('input', e => { if (e.target.id !== 'cariEaw') return; S.cari = e.target.value; const p = e.target.selectionStart; gambar(); const n = $('#cariEaw'); n.focus(); n.setSelectionRange(p, p); });\nH.addEventListener('click', e => { const g = e.target.closest('[data-grup]'); if (g) { S.grup = g.dataset.grup; gambar(); return; } if (e.target.closest('[data-reset-saring]')) { S.cari = ''; S.grup = ''; gambar(); } });"],
  ["  if (u.ke === 'bantuan') { if (S.layar !== 'detail') buka('ORD-CONTOH-007'); bukaBantuan(); return; }",
   "  if (u.ke === 'bantuan') { if (S.layar !== 'detail') buka('ORD-CONTOH-007'); bukaBantuan(); return; }\n  if (u.ke === 'daftar') keDaftar();"],
  ["$('#aturUlang').addEventListener('click', () => { ORDER = contoh(); keDaftar();", "$('#aturUlang').addEventListener('click', () => { ORDER = contoh(); S.cari = ''; S.grup = ''; keDaftar();"],
  ["  { kode:'HE-UMUM-02', judul:'Bantuan untuk E-Akta Wizard',",
   "  { kode:'HE-EAW-07', judul:'Cari dan saring daftar akta',\n    isi:'Di atas daftar ada IDDS Input Search (kode, narahubung, atau nomor akta) dan saringan IDDS Button Group per langkah beserta jumlahnya: Semua, Belum mulai, Stempel TERA, Tanda tangan, E-Meterai, Selesai. Hasil kosong menampilkan tombol \"Hapus pencarian dan saringan\". Pola sama dengan daftar Minuta dan Verifikasi.',\n    lama:'Daftar E-Akta Wizard tidak memiliki pencarian atau saringan; pengguna harus menggulir untuk menemukan akta pada langkah tertentu (rekomendasi laporan HE hal. 40 no. 5: tambahkan pencarian dan filter pada daftar transaksi dan akta).', ke:'daftar', sorot:'#saringEaw' },\n  { kode:'HE-UMUM-02', judul:'Bantuan untuk E-Akta Wizard',"],
  ['.kartu-langkah{margin-top:16px;', '.saring-e{display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-top:20px}\n.saring-e .ina-input-search{flex:1;width:auto;min-width:240px}\n.kartu-langkah{margin-top:16px;']
];
let gagal = 0;
for (const [a, b] of G) { if (t.includes(a)) t = t.replace(a, b); else { console.log('TIDAK KETEMU:', a.slice(0, 80)); gagal++; } }
fs.writeFileSync('eaw-badan.html', t);
console.log(gagal ? `gagal ${gagal}` : 'OK');
