// Membuat Backlog-HE-EPPAT-Peruri.xlsx dari backlog-he.json (sumber tunggal catatan perubahan).
// Jalankan setiap ada perubahan usulan:  NODE_PATH=<folder node_modules berisi exceljs> node buat-xlsx.js
// Urutan sheet: Panduan IDDS Developer, Usulan HE, Penyesuaian IDDS Tenant/Platform/Onboarding, lalu Ringkasan, Riwayat Perubahan, Keterangan.
const fs = require('fs'), path = require('path');
const ExcelJS = require('exceljs');
const d = __dirname;
const data = JSON.parse(fs.readFileSync(path.join(d, 'backlog-he.json'), 'utf8'));
const keluar = path.join(d, '..', 'Backlog-HE-EPPAT-Peruri.xlsx');

const FONT = 'Arial', HIJAU = 'FF3D6B5E', KREM = 'FFEEF3F1', GARIS = 'FFD2DDD9';
const STATUS = ['Usulan', 'Prototipe siap', 'Perlu konfirmasi', 'Disetujui', 'Dikerjakan developer', 'Selesai', 'Ditunda'];
const PRIORITAS = ['Tinggi', 'Sedang', 'Rendah'];
const tgl = s => { const [y, m, dd] = s.split('-').map(Number); return new Date(Date.UTC(y, m - 1, dd)); };
const tepi = { top: { style: 'thin', color: { argb: GARIS } }, left: { style: 'thin', color: { argb: GARIS } }, bottom: { style: 'thin', color: { argb: GARIS } }, right: { style: 'thin', color: { argb: GARIS } } };
const huruf = n => String.fromCharCode(64 + n);
const BATAS = 300;

const wb = new ExcelJS.Workbook();
wb.creator = 'E-PPAT Backlog Peruri'; wb.created = new Date();
wb.calcProperties = { fullCalcOnLoad: true };

function kepalaTabel(ws, baris, judul) {
  const r = ws.getRow(baris);
  judul.forEach((t, i) => { const c = r.getCell(i + 1); c.value = t; c.font = { name: FONT, bold: true, color: { argb: 'FFFFFFFF' }, size: 10 };
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: HIJAU } }; c.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true }; c.border = tepi; });
  r.height = 30;
}
function judulSheet(ws, judul, sub, lebarKolom) {
  ws.mergeCells(1, 1, 1, lebarKolom); ws.mergeCells(2, 1, 2, lebarKolom);
  ws.getCell('A1').value = judul; ws.getCell('A1').font = { name: FONT, bold: true, size: 14, color: { argb: HIJAU } };
  ws.getCell('A2').value = sub; ws.getCell('A2').font = { name: FONT, size: 9, color: { argb: 'FF525252' } };
  ws.getRow(1).height = 22;
}

/* ---------- kelompok backlog ---------- */
const KOLOM_HE = [
  ['No', 5, 'no'], ['Kode', 13, 'kode'], ['Lingkungan', 13, 'env'], ['Fitur / Layar', 18, 'fitur'], ['Judul usulan', 30, 'judul'], ['Kondisi saat ini (live)', 45, 'saat_ini'], ['Usulan perubahan', 55, 'usulan'],
  ['Prinsip HE', 26, 'prinsip'], ['Hal. laporan', 11, 'halaman'], ['Prioritas', 10, 'prioritas'], ['Layar terdampak', 24, 'layar'], ['Acuan prototipe', 40, 'acuan'],
  ['Selesai bila', 45, 'selesai_bila'], ['Status', 16, 'status'], ['Catatan', 32, 'catatan'], ['Diperbarui', 12, 'tanggal']
];
/* Lingkungan aplikasi tiap usulan HE: Onboarding (dev.eppat.id), Tenant (dev-app.eppat.id/t/<kantor>), Platform (dev-app.eppat.id/platform), atau Semua */
const LINGKUNGAN = ['Onboarding', 'Tenant', 'Platform', 'Semua'];
const envDari = kode => /^HE-(REG|LOGIN|OB)-/.test(kode) ? 'Onboarding' : /^HE-UMUM-/.test(kode) ? 'Semua' : /^HE-PL-/.test(kode) ? 'Platform' : 'Tenant';
/* Tautan prototipe: rumus memakai URL dasar Vercel di sel URL_SEL (baris 3 sheet Usulan HE); kosong = "Segera tersedia" */
const URL_SEL = '$E$3';
const URL_VERCEL = 'https://he-eppat.vercel.app/'; /* situs prototipe (repo yogi-alt/HE-EPPAT-Backlog, root prototipe) */
const berkasAcuan = a => ((String(a || '').match(/prototipe\/([^\s;›]+\.html)/) || [])[1]) || '';
/* semua tautan tujuan dari teks acuan: prototipe → situs Vercel, berkas lain di repo → GitHub */
const URL_REPO = 'https://github.com/yogi-alt/HE-EPPAT-Backlog/blob/main/';
const tautanAcuan = a => [...new Set([...String(a || '').matchAll(/(prototipe\/[^\s;›]+\.html|brand-eppat-idds\/[^\s;›]+)/g)].map(m => m[1].startsWith('prototipe/') ? URL_VERCEL + m[1].slice(10) : URL_REPO + m[1]))];
/* satu tautan per baris: prototipe utama yang dibahas backlog itu */
const UTAMA = { 'HE-UMUM-01': 'Brand-Mode-EPPAT-IDDS.html' };
const selTautan = (c, a, kode) => { const u = UTAMA[kode] ? [URL_VERCEL + UTAMA[kode]] : tautanAcuan(a).filter(x => x.startsWith(URL_VERCEL)); if (!u.length) return; c.value = { formula: `HYPERLINK("${u[0]}","${u[0]}")`, result: u[0] }; c.font = { name: FONT, size: 9, underline: true, color: { argb: 'FF0968F6' } }; };
const KOLOM_IDDS = [
  ['No', 5, 'no'], ['Kode', 13, 'kode'], ['Menu / Layar', 24, 'fitur'], ['Judul penyesuaian', 30, 'judul'], ['Kondisi saat ini (live)', 45, 'saat_ini'], ['Penyesuaian', 55, 'usulan'],
  ['Prioritas', 10, 'prioritas'], ['Layar terdampak', 28, 'layar'], ['Acuan prototipe', 40, 'acuan'],
  ['Selesai bila', 45, 'selesai_bila'], ['Status', 16, 'status'], ['Catatan', 32, 'catatan'], ['Diperbarui', 12, 'tanggal']
];
const KELOMPOK = [
  { sheet:'Usulan HE', tab:'he', label:'Usulan HE', awalan:'HE-', kolom:KOLOM_HE,
    judul:data.judul, sub:`Usulan dari laporan Heuristic Evaluation INA Digital. Sumber: ${data.sumber} · Layar live: ${data.live}`, kosong:'Belum ada usulan.' },
  { sheet:'Penyesuaian IDDS Tenant', tab:'tenant', label:'IDDS Tenant', awalan:'IDDS-TN-', kolom:KOLOM_IDDS,
    judul:'Penyesuaian IDDS · Tenant (aplikasi kantor PPAT)', sub:'Menu dev-app.eppat.id/t/<kantor> yang tidak dinilai HE. Komponen disesuaikan dengan IDDS, letak pesan dan bahasa dibakukan, dan isi live tidak diubah.', kosong:'Belum ada penyesuaian.' },
  { sheet:'Penyesuaian IDDS Platform', tab:'platform', label:'IDDS Platform', awalan:'IDDS-PL-', kolom:KOLOM_IDDS,
    judul:'Penyesuaian IDDS · Platform (admin platform)', sub:'Menu dev-app.eppat.id/platform yang tidak dinilai HE. Komponen disesuaikan dengan IDDS, letak pesan dan bahasa dibakukan, dan isi live tidak diubah.', kosong:'Belum ada penyesuaian.' },
  { sheet:'Penyesuaian IDDS Onboarding', tab:'onboarding', label:'IDDS Onboarding', awalan:'IDDS-OB-', kolom:KOLOM_IDDS,
    judul:'Penyesuaian IDDS · Onboarding (calon PPAT dan staf Onboarding)', sub:'Halaman dev.eppat.id yang tidak dinilai HE (Beranda, kata sandi, profil, menu Admin/Operator, dan simulasi pembayaran). Komponen disesuaikan dengan IDDS, serta letak pesan dan bahasa dibakukan.', kosong:'Belum ada penyesuaian.' }
];
const lain = data.item.filter(x => !KELOMPOK.some(k => x.kode.startsWith(k.awalan)));
if (lain.length) { console.error('Kode tanpa kelompok:', lain.map(x => x.kode).join(', ')); process.exit(1); }

/* ---------- 1. Panduan IDDS Developer (dari panduan-idds.json) ---------- */
const pd = wb.addWorksheet('Panduan IDDS Developer', { views: [{ state: 'frozen', ySplit: 5 }] });
const PD = JSON.parse(fs.readFileSync(path.join(d, 'panduan-idds.json'), 'utf8'));
const KOL_PD = [['No', 7], ['Bagian', 22], ['Topik', 28], ['Aturan', 70], ['Contoh', 60], ['Acuan prototipe', 40], ['Kode backlog', 18]];
KOL_PD.forEach(([, w], i) => pd.getColumn(i + 1).width = w);
judulSheet(pd, PD.judul, `Versi ${PD.versi} · Halaman lengkap: prototipe/Panduan-IDDS-Developer.html`, KOL_PD.length);
pd.mergeCells(3, 1, 3, KOL_PD.length); pd.getCell('A3').value = PD.ringkas; pd.getCell('A3').font = { name: FONT, size: 10 }; pd.getCell('A3').alignment = { wrapText: true, vertical: 'top' }; pd.getRow(3).height = 45;
kepalaTabel(pd, 5, KOL_PD.map(k => k[0]));
let bp = 6;
for (const bg of PD.bagian) {
  pd.mergeCells(bp, 1, bp, KOL_PD.length);
  const c = pd.getCell(`A${bp}`); c.value = `${bg.nomor}. ${bg.judul}`; c.font = { name: FONT, size: 11, bold: true, color: { argb: HIJAU } }; c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: KREM } };
  bp++;
  bg.isi.forEach((x, i) => {
    const r = pd.getRow(bp++); const ac = String(x.acuan || ''); r.values = [`${bg.nomor}.${i + 1}`, bg.judul, x.topik, x.aturan, x.contoh || '', x.acuan || '', x.kode || ''];
    r.eachCell({ includeEmpty: true }, (c, col) => { c.font = { name: col === 5 ? 'Consolas' : FONT, size: 9 }; c.alignment = { vertical: 'top', wrapText: true }; c.border = tepi; });
    selTautan(r.getCell(6), ac);
  });
}

/* ---------- 2–5. sheet backlog per kelompok ---------- */
const POS = {};
for (const k of KELOMPOK) {
  const ws = wb.addWorksheet(k.sheet, { views: [{ state: 'frozen', xSplit: 2, ySplit: 4 }] });
  const items = data.item.filter(x => x.kode.startsWith(k.awalan));
  const idx = key => k.kolom.findIndex(c => c[2] === key) + 1;
  const cSt = idx('status'), cCat = idx('catatan'), cPr = idx('prioritas'), cTg = idx('tanggal'), cFt = idx('fitur'), cKd = idx('kode');
  POS[k.sheet] = { status:huruf(cSt), prioritas:huruf(cPr), fitur:huruf(cFt), kode:huruf(cKd), items };
  k.kolom.forEach(([, w], i) => ws.getColumn(i + 1).width = w);
  judulSheet(ws, k.judul, k.sub, k.kolom.length);
  kepalaTabel(ws, 4, k.kolom.map(c => c[0]));
  items.forEach((it, i) => {
    const r = ws.getRow(5 + i);
    r.values = k.kolom.map(([, , key]) => key === 'no' ? i + 1 : key === 'tanggal' ? tgl(it.tanggal) : key === 'env' ? envDari(it.kode) : it[key]);
    selTautan(r.getCell(idx('acuan')), it.acuan, it.kode);
    r.eachCell({ includeEmpty: true }, (c, col) => {
      c.font = { name: FONT, size: 9, bold: col === cKd, color: { argb: col === cKd ? HIJAU : 'FF1F1F1F' } };
      c.alignment = { vertical: 'top', wrapText: true }; c.border = tepi;
      if (i % 2) c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF8FAF9' } };
    });
    r.getCell(cTg).numFmt = 'dd mmm yyyy';
    // kolom yang diisi tim (Status, Catatan) diberi latar kuning muda
    [cSt, cCat].forEach(n => r.getCell(n).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFF8D5' } });
  });
  if (!items.length) {
    ws.mergeCells(5, 1, 5, k.kolom.length);
    const c = ws.getCell('A5'); c.value = k.kosong; c.font = { name: FONT, size: 10, italic: true, color: { argb: 'FF525252' } }; c.alignment = { vertical: 'middle', horizontal: 'center' };
    ws.getRow(5).height = 28;
  }
  for (let r = 5; r <= BATAS; r++) {
    if (!items.length && r === 5) continue;
    ws.getCell(`${huruf(cPr)}${r}`).dataValidation = { type: 'list', allowBlank: true, formulae: [`"${PRIORITAS.join(',')}"`] };
    ws.getCell(`${huruf(cSt)}${r}`).dataValidation = { type: 'list', allowBlank: true, formulae: [`"${STATUS.join(',')}"`] };
  }
  if (idx('env')) for (let r = 5; r <= 4 + items.length; r++) ws.getCell(`${huruf(idx('env'))}${r}`).dataValidation = { type: 'list', allowBlank: false, formulae: [`"${LINGKUNGAN.join(',')}"`] };
  {
    // baris 3: situs prototipe dan tautan ke daftar prototipe kelompok ini
    ws.mergeCells('A3:F3');
    const st = ws.getCell('A3'); st.value = { formula: `HYPERLINK("${URL_VERCEL}index.html#${k.tab}","Situs prototipe: ${URL_VERCEL}  ·  Buka daftar prototipe kelompok ini")`, result: `Situs prototipe: ${URL_VERCEL}  ·  Buka daftar prototipe kelompok ini` };
    st.font = { name: FONT, size: 9, underline: true, color: { argb: 'FF0968F6' } }; st.alignment = { vertical: 'middle' };
    ws.getRow(3).height = 18;
  }
  if (items.length) ws.autoFilter = { from: 'A4', to: `${huruf(k.kolom.length)}${4 + items.length}` };
  ws.getCell(`${huruf(cSt)}4`).note = 'Tim mengisi kolom Status dan Catatan (berlatar kuning). Arti setiap pilihan status dijelaskan di sheet Keterangan.';
}

/* ---------- Ringkasan (rumus dari keempat sheet backlog) ---------- */
const rs = wb.addWorksheet('Ringkasan');
const nK = KELOMPOK.length, kolTot = nK + 2;
rs.getColumn(1).width = 30; for (let i = 2; i <= kolTot; i++) rs.getColumn(i).width = 16;
judulSheet(rs, 'Ringkasan backlog', 'Angka dihitung otomatis dengan rumus dari sheet Usulan HE dan Penyesuaian IDDS.', kolTot);
const rg = (sh, kol) => `'${sh}'!$${kol}$5:$${kol}$${BATAS}`;
function tabelHitung(barisAwal, judulKol, nilai, kunci) {
  kepalaTabel(rs, barisAwal, [judulKol, ...KELOMPOK.map(k => k.label), 'Total']);
  nilai.forEach((v, i) => {
    const b = barisAwal + 1 + i; rs.getCell(`A${b}`).value = v;
    KELOMPOK.forEach((k, j) => { const P = POS[k.sheet];
      rs.getCell(b, j + 2).value = { formula: `COUNTIF(${rg(k.sheet, P[kunci])},$A${b})`, result: P.items.filter(x => x[kunci] === v).length }; });
    rs.getCell(b, kolTot).value = { formula: `SUM(B${b}:${huruf(nK + 1)}${b})`, result: data.item.filter(x => x[kunci] === v).length };
  });
  return barisAwal + 1 + nilai.length;
}
let b = tabelHitung(4, 'Status', STATUS, 'status');
rs.getCell(`A${b}`).value = 'Total';
KELOMPOK.forEach((k, j) => { const P = POS[k.sheet]; rs.getCell(b, j + 2).value = { formula: `COUNTIF(${rg(k.sheet, P.kode)},"?*")`, result: P.items.length }; });
rs.getCell(b, kolTot).value = { formula: `SUM(B${b}:${huruf(nK + 1)}${b})`, result: data.item.length };
const barisTotal = b;
b = tabelHitung(b + 2, 'Prioritas', PRIORITAS, 'prioritas');
/* per fitur / menu */
const rF = b + 1;
kepalaTabel(rs, rF, ['Fitur / Menu', 'Kelompok', 'Jumlah']);
let n = rF + 1;
for (const k of KELOMPOK) {
  const P = POS[k.sheet];
  for (const f of [...new Set(P.items.map(x => x.fitur))]) {
    rs.getCell(`A${n}`).value = f; rs.getCell(`B${n}`).value = k.label;
    rs.getCell(`C${n}`).value = { formula: `COUNTIF(${rg(k.sheet, P.fitur)},A${n})`, result: P.items.filter(x => x.fitur === f).length };
    n++;
  }
}
rs.eachRow(r => r.eachCell(c => { if (!c.font || !c.font.bold) c.font = { name: FONT, size: 10 }; if (r.number > 4 && c.value !== null && c.value !== '') { c.border = tepi; c.alignment = { vertical: 'top', wrapText: true }; } }));
for (let i = 1; i <= kolTot; i++) rs.getCell(barisTotal, i).font = { name: FONT, size: 10, bold: true };

/* ---------- Perkiraan Nilai HE (dari perkiraan-he.json; kenaikan & rata-rata memakai rumus) ---------- */
{
  const PH = JSON.parse(fs.readFileSync(path.join(d, 'perkiraan-he.json'), 'utf8'));
  const ph = wb.addWorksheet('Perkiraan Nilai HE', { views: [{ state: 'frozen', ySplit: 4 }] });
  const KOL = [['Halaman (laporan HE → nama menu baru)', 44], ['Skor HE sekarang', 13], ['Perkiraan batas bawah', 13], ['Perkiraan batas atas', 13], ['Kenaikan (batas bawah)', 13], ['Kenaikan (batas atas)', 13], ['Jenis penahan', 20], ['Yang menahan nilai di bawah batas atas', 60], ['Acuan prototipe', 46]];
  KOL.forEach(([, w], i) => ph.getColumn(i + 1).width = w);
  judulSheet(ph, 'Perkiraan kenaikan nilai HE bila prototipe diterapkan', PH.sumber, KOL.length);
  kepalaTabel(ph, 4, KOL.map(k => k[0]));
  const angka = (c, f) => { c.numFmt = f || '0.0'; c.alignment = { vertical: 'top', horizontal: 'right' }; };
  let r = 5; const baris = { lama: null, v2: null }, biasa = [];
  for (const h of PH.halaman) {
    const row = ph.getRow(r);
    row.values = [h.halaman, h.skor, h.bawah, h.atas, { formula: `C${r}-B${r}`, result: h.bawah - h.skor }, { formula: `D${r}-B${r}`, result: h.atas - h.skor }, h.jenis, h.penahan, null];
    selTautan(row.getCell(9), 'prototipe/' + h.acuan);
    row.eachCell({ includeEmpty: true }, (c, col) => { if (col !== 9) c.font = { name: FONT, size: 9, bold: h.kelompok === 'v2' && col === 1, color: { argb: h.kelompok === 'v2' ? HIJAU : 'FF1F1F1F' } }; c.alignment = c.alignment || { vertical: 'top', wrapText: true }; if ([1, 7, 8].includes(col)) c.alignment = { vertical: 'top', wrapText: true }; c.border = tepi; if (h.kelompok === 'v2') c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: KREM } }; });
    [2, 3, 4].forEach(n => angka(row.getCell(n))); [5, 6].forEach(n => angka(row.getCell(n), '+0.0;-0.0;0.0'));
    if (h.kelompok) baris[h.kelompok] = r; else biasa.push(r);
    r++;
  }
  // rata-rata keseluruhan: 11 halaman, sekali dengan Penyusunan Akta lama, sekali dengan v2
  const daftar = k => biasa.map(n => `{X}${n}`).concat(`{X}${baris[k]}`).join(',');
  for (const [k, label] of [['lama', 'Rata-rata keseluruhan (11 halaman, dengan Penyusunan Akta lama)'], ['v2', 'Rata-rata keseluruhan (11 halaman, dengan Penyusunan Akta v2)']]) {
    const row = ph.getRow(r);
    const isi = PH.halaman.filter(h => !h.kelompok || h.kelompok === k), rerata = key => Math.round(isi.reduce((s, h) => s + h[key], 0) / isi.length * 10) / 10;
    const rata = (X, key) => ({ formula: `AVERAGE(${daftar(k).split('{X}').join(X)})`, result: rerata(key) });
    row.values = [label, rata('B', 'skor'), rata('C', 'bawah'), rata('D', 'atas'), { formula: `C${r}-B${r}`, result: Math.round((rerata('bawah') - rerata('skor')) * 10) / 10 }, { formula: `D${r}-B${r}`, result: Math.round((rerata('atas') - rerata('skor')) * 10) / 10 }, '', k === 'lama' ? 'Skor keseluruhan HE saat ini 58,3 (kategori Perlu Perhatian).' : 'Alternatif bila Penyusunan Akta memakai tampilan v2.', ''];
    row.eachCell({ includeEmpty: true }, c => { c.font = { name: FONT, size: 9, bold: true }; c.border = tepi; c.alignment = { vertical: 'top', wrapText: true }; c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF8FAF9' } }; });
    [2, 3, 4].forEach(n => angka(row.getCell(n))); [5, 6].forEach(n => angka(row.getCell(n), '+0.0;-0.0;0.0'));
    r++;
  }
  // per prinsip
  r += 1; kepalaTabel(ph, r, ['Prinsip HE', 'Skor HE sekarang', 'Perkiraan batas bawah', 'Perkiraan batas atas', 'Kenaikan (batas bawah)', 'Kenaikan (batas atas)', '', 'Yang menutupnya di prototipe', '']); r++;
  for (const p of PH.prinsip) {
    const row = ph.getRow(r);
    row.values = [p.prinsip, p.skor, p.bawah, p.atas, { formula: `C${r}-B${r}`, result: p.bawah - p.skor }, { formula: `D${r}-B${r}`, result: p.atas - p.skor }, '', p.penutup, ''];
    row.eachCell({ includeEmpty: true }, c => { c.font = { name: FONT, size: 9 }; c.border = tepi; c.alignment = { vertical: 'top', wrapText: true }; });
    [2, 3, 4].forEach(n => angka(row.getCell(n))); [5, 6].forEach(n => angka(row.getCell(n), '+0.0;-0.0;0.0'));
    r++;
  }
  // asumsi
  r += 1; ph.getCell(`A${r}`).value = 'Asumsi dan batasan perkiraan'; ph.getCell(`A${r}`).font = { name: FONT, size: 10, bold: true, color: { argb: HIJAU } }; r++;
  for (const a of PH.asumsi) { ph.mergeCells(r, 1, r, KOL.length); const c = ph.getCell(`A${r}`); c.value = '• ' + a; c.font = { name: FONT, size: 9 }; c.alignment = { wrapText: true, vertical: 'top' }; ph.getRow(r).height = 28; r++; }
}

/* ---------- Riwayat Perubahan ---------- */
const rw = wb.addWorksheet('Riwayat Perubahan', { views: [{ state: 'frozen', ySplit: 4 }] });
[['Tanggal', 14], ['Kode', 26], ['Perubahan', 80], ['Berkas', 52]].forEach(([, w], i) => rw.getColumn(i + 1).width = w);
judulSheet(rw, 'Riwayat perubahan', 'Setiap perubahan usulan, penyesuaian, atau prototipe dicatat di sini. Catatan terbaru ada di baris paling bawah.', 4);
kepalaTabel(rw, 4, ['Tanggal', 'Kode', 'Perubahan', 'Berkas']);
data.riwayat.forEach((h, i) => {
  const r = rw.getRow(5 + i); r.values = [tgl(h.tanggal), h.kode, h.perubahan, h.berkas];
  r.eachCell(c => { c.font = { name: FONT, size: 9 }; c.alignment = { vertical: 'top', wrapText: true }; c.border = tepi; });
  r.getCell(1).numFmt = 'dd mmm yyyy';
});

/* ---------- Keterangan ---------- */
const kt = wb.addWorksheet('Keterangan');
kt.getColumn(1).width = 30; kt.getColumn(2).width = 90;
judulSheet(kt, 'Keterangan', 'Cara membaca dan memperbarui spreadsheet ini.', 2);
const KET = [
  ['Isi spreadsheet', ''],
  ['Panduan IDDS Developer', 'Panduan penerapan IDDS untuk developer yang mencakup pemasangan, kerangka halaman, komponen, pola dari saran HE, aksesibilitas, bahasa, daftar periksa rilis, dan peta acuan prototipe. Versi halaman web ada di prototipe/Panduan-IDDS-Developer.html.'],
  ['Usulan HE', 'Usulan perbaikan dari laporan Heuristic Evaluation INA Digital (kode HE-<FITUR>-NN dan HE-UMUM-NN).'],
  ['Penyesuaian IDDS Tenant', 'Menu aplikasi kantor PPAT (dev-app.eppat.id/t/<kantor>) yang tidak dinilai HE (kode IDDS-TN-NN).'],
  ['Penyesuaian IDDS Platform', 'Menu admin platform (dev-app.eppat.id/platform) yang tidak dinilai HE (kode IDDS-PL-NN).'],
  ['Penyesuaian IDDS Onboarding', 'Halaman Onboarding untuk calon PPAT dan staf Onboarding (dev.eppat.id) yang tidak dinilai HE (kode IDDS-OB-NN).'],
  ['Ringkasan', 'Jumlah usulan per status, prioritas, dan fitur/menu. Angka dihitung otomatis dengan rumus.'],
  ['Perkiraan Nilai HE', 'Perkiraan kenaikan skor HE per halaman dan per prinsip bila prototipe diterapkan, termasuk alternatif Penyusunan Akta (PPAT) v2, beserta penahan nilai dan asumsinya. Data sumber: sumber/perkiraan-he.json.'],
  ['Riwayat Perubahan', 'Catatan setiap perubahan. Catatan terbaru ada di baris paling bawah.'],
  ['', ''],
  ['Cara memperbarui', ''],
  ['Kolom yang diisi tim', 'Tim mengisi kolom Status dan Catatan (berlatar kuning) di sheet Usulan HE dan Penyesuaian IDDS. Kolom lain mengikuti prototipe dan laporan HE.'],
  ['Lingkungan (sheet Usulan HE)', 'Aplikasi tempat usulan diterapkan: Onboarding (dev.eppat.id), Tenant (dev-app.eppat.id/t/<kantor>), Platform (dev-app.eppat.id/platform), atau Semua. Gunakan filter di kepala kolom untuk menampilkan satu lingkungan saja.'],
  ['Acuan prototipe (tautan)', 'Kolom Acuan prototipe berisi alamat lengkap halaman tujuan di situs https://he-eppat.vercel.app/ dan dapat diklik. Setiap backlog berisi satu alamat, yaitu prototipe yang dibahas backlog tersebut. Di dalam prototipe, tombol Daftar perubahan atau Daftar penyesuaian lalu Lihat di layar menunjukkan bagian yang berubah. Baris 3 setiap sheet menautkan ke daftar prototipe kelompok tersebut.'],
  ['Kode', 'Kode HE-<FITUR>-NN dipakai untuk usulan HE per fitur, HE-UMUM-NN untuk usulan HE lintas layar, dan IDDS-TN/PL/OB-NN untuk penyesuaian IDDS. Nomor tidak pernah diurutkan ulang.'],
  ['Acuan prototipe', 'Buka berkas di folder prototipe/, tekan tombol "Daftar perubahan" atau "Daftar penyesuaian", lalu pilih "Lihat di layar" untuk melihat bagian yang berubah.'],
  ['', ''],
  ['Status', ''],
  ['Usulan', 'Usulan baru dicatat, dan prototipenya belum dibuat.'],
  ['Prototipe siap', 'Prototipe sudah dapat dipakai sebagai acuan developer.'],
  ['Perlu konfirmasi', 'Ada nilai atau aturan yang perlu dipastikan tim (lihat kolom Catatan).'],
  ['Disetujui', 'Usulan disepakati untuk dikerjakan.'],
  ['Dikerjakan developer', 'Usulan sedang dikerjakan di aplikasi.'],
  ['Selesai', 'Usulan sudah diterapkan dan lolos pemeriksaan "Selesai bila".'],
  ['Ditunda', 'Usulan tidak dikerjakan pada periode ini.'],
  ['', ''],
  ['Prinsip heuristik (laporan HE)', ''],
  ['H1', 'Visibility of System Status'], ['H2', 'Match Between System and the Real World'], ['H3', 'User Control and Freedom'],
  ['H4', 'Consistency and Standards'], ['H5', 'Help Users Recognize, Diagnose, and Recover from Errors'], ['H6', 'Error Prevention'],
  ['H7', 'Recognition Rather Than Recall'], ['H8', 'Flexibility and Efficiency of Use'], ['H9', 'Aesthetic and Minimalist Design'],
  ['H10', 'Help and Documentation'], ['H11', 'Privacy']
];
KET.forEach((k, i) => {
  const r = kt.getRow(4 + i); r.values = k;
  const sub = k[1] === '' && k[0] !== '';
  r.eachCell(c => { c.font = { name: FONT, size: sub ? 11 : 10, bold: sub, color: { argb: sub ? HIJAU : 'FF1F1F1F' } }; c.alignment = { vertical: 'top', wrapText: true }; });
});

wb.xlsx.writeFile(keluar).then(() => console.log('OK', keluar, data.item.length, 'usulan,', data.riwayat.length, 'riwayat |', KELOMPOK.map(k => `${k.sheet}: ${POS[k.sheet].items.length}`).join(' · ')));
