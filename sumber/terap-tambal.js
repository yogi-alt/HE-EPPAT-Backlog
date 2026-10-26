// Pasang tambalan bahasa (kolom yang tidak disinkronkan dari prototipe) ke backlog-he.json, lalu catat riwayat. node terap-tambal.js <tambal.json>...
const fs = require('fs');
const j = JSON.parse(fs.readFileSync('backlog-he.json', 'utf8'));
const T = '2026-10-26';
let n = 0;
for (const f of process.argv.slice(2)) {
  if (!fs.existsSync(f)) { console.log('lewati (tidak ada):', f); continue; }
  const t = JSON.parse(fs.readFileSync(f, 'utf8'));
  for (const [kode, kolom] of Object.entries(t)) {
    const it = j.item.find(x => x.kode === kode); if (!it) { console.log('kode tidak ada:', kode); continue; }
    const sinkron = /^(IDDS-(TN|PL|OB)|HE-EAW)-/.test(kode) && kode !== 'IDDS-TN-39';
    for (const [k, v] of Object.entries(kolom)) if ((['fitur', 'layar', 'selesai_bila', 'catatan', 'prinsip'].includes(k) || (!sinkron && ['saat_ini', 'usulan', 'judul'].includes(k))) && it[k] !== v) { it[k] = v; it.tanggal = T; n++; }
  }
}
/* catatan bawaan Setting Theme tidak berlaku untuk Pengaturan Global dan Akun Saya */
for (const it of j.item) if (/^IDDS-PL-(3[4-9]|40)$/.test(it.kode) && /^Setting Theme memakai komponen/.test(it.catatan || '')) { it.catatan = ''; it.tanggal = T; n++; }
const R = [
  { kode:'IDDS-OB-56–60', perubahan:'Simulasi Pembayaran ditambah jalur Trial lalu Upgrade ke Enterprise berdasarkan uji live akun Uji Enterprise HE (Trial aktif 23.03, upgrade lunas 23.06 lewat tombol simulasi pelanggan). Riwayat Transaksi mencatat Trial dan Upgrade dengan nama yang benar, stepper selalu urut waktu, lencana status akun mengikuti keadaan, dan email aktivasi tidak dikirim dua kali.', berkas:'prototipe/Backlog-IDDS-OB-BAYAR-Prototype.html' },
  { kode:'Spreadsheet', perubahan:'Sheet Usulan HE ditambah kolom Lingkungan (Onboarding, Tenant, Platform, Semua) yang dapat difilter dan kolom Tautan prototipe (Vercel) yang otomatis menjadi tautan setelah URL dasar Vercel diisi di baris 3. Subjudul sheet Platform dan Onboarding diperbaiki.', berkas:'Backlog-HE-EPPAT-Peruri.xlsx; sumber/buat-xlsx.js' },
  { kode:'Semua sheet', perubahan:'Bahasa seluruh isi spreadsheet dibakukan (EYD V, kalimat SPOK yang pendek): judul menyebut layar dan hasil, kondisi saat ini mengutip teks live apa adanya, usulan menyebut komponen IDDS dan perilakunya, dan Selesai bila ditulis sebagai kriteria penerimaan yang dapat diuji. Teks daftar penyesuaian di prototipe ikut diperbarui agar sama dengan spreadsheet.', berkas:'Backlog-HE-EPPAT-Peruri.xlsx; prototipe/*' }
];
for (const r of R) if (!j.riwayat.some(y => y.kode === r.kode && y.perubahan === r.perubahan)) j.riwayat.push({ tanggal:T, ...r });
fs.writeFileSync('backlog-he.json', JSON.stringify(j, null, 2));
console.log(`OK: ${n} kolom ditambal, riwayat ${j.riwayat.length}`);
