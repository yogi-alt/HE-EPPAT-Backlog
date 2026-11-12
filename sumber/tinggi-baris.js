// Tinggi baris mengikuti panjang teks (ExcelJS).
// Google Sheets tidak menyesuaikan tinggi baris saat mengimpor xlsx: baris tanpa tinggi tertulis tampil setinggi satu baris
// dan teks yang dibungkus terpotong. Fungsi ini menghitung jumlah baris teks per sel dari lebar kolom dan ukuran huruf,
// lalu menulis tinggi baris secara eksplisit sehingga Excel dan Google Sheets menampilkannya sama.
// Pakai sebelum writeFile:  require('./tinggi-baris')(worksheet, { mulai: 5 })
module.exports = function tinggiBaris(ws, o = {}) {
  const mulai = o.mulai || 1, minimal = o.minimal || 15;
  const lebar = c => (ws.getColumn(c).width || 9);
  const gabung = new Set();
  for (const r of Object.values(ws._merges || {})) { const m = r.model || r; for (let y = m.top; y <= m.bottom; y++) gabung.add(y); }
  ws.eachRow({ includeEmpty: false }, (row, n) => {
    if (n < mulai || gabung.has(n)) return; // sel gabungan diatur manual oleh skrip pemanggil
    let tinggi = minimal;
    row.eachCell({ includeEmpty: false }, (cel, col) => {
      let v = cel.value; if (v == null) return;
      if (typeof v === 'object') v = v.richText ? v.richText.map(t => t.text).join('') : v.text != null ? v.text : v.result != null ? v.result : v.formula ? '' : v instanceof Date ? '00 Mmm 0000' : String(v);
      v = String(v); if (!v) return;
      const ukuran = (cel.font && cel.font.size) || 11, bungkus = cel.alignment && cel.alignment.wrapText;
      /* jumlah huruf per baris: lebar kolom Excel ≈ jumlah huruf "0" Calibri 11; huruf lebih kecil memuat lebih banyak, dikurangi sedikit agar aman */
      const muat = Math.max(1, Math.floor((lebar(col) - 1) * (11 / ukuran) * 0.95));
      const baris = bungkus ? v.split('\n').reduce((a, p) => a + Math.max(1, Math.ceil(p.length / muat)), 0) : v.split('\n').length;
      tinggi = Math.max(tinggi, Math.ceil(baris * ukuran * 1.32 + 5));
    });
    if (!row.height || row.height < tinggi) row.height = Math.min(tinggi, 409);
  });
};
