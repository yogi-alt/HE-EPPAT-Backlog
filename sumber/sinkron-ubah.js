// Sinkronkan spreadsheet (backlog-he.json) dengan "Daftar perubahan/penyesuaian" (array UBAH) di setiap prototipe.
// judul, usulan (isi), dan saat_ini (lama) mengikuti prototipe; item baru dibuat dengan BARU di bawah. node sinkron-ubah.js
const fs = require('fs'), vm = require('vm');
const T = '2026-10-26';
const BERKAS = { 'ob-masuk-badan.html':'Backlog-IDDS-OB-MASUK-Prototype.html', 'ob-monitor-badan.html':'Backlog-IDDS-OB-MONITOR-Prototype.html', 'ob-verif-badan.html':'Backlog-IDDS-OB-VERIF-Prototype.html', 'ob-pengaturan-badan.html':'Backlog-IDDS-OB-PENGATURAN-Prototype.html', 'ob-bayar-badan.html':'Backlog-IDDS-OB-BAYAR-Prototype.html', 'pl-masuk-badan.html':'Backlog-IDDS-PL-MASUK-Prototype.html', 'pl-monitoring-badan.html':'Backlog-IDDS-PL-MONITORING-Prototype.html', 'pl-akta-badan.html':'Backlog-IDDS-PL-AKTA-Prototype.html', 'pl-sistem-badan.html':'Backlog-IDDS-PL-SISTEM-Prototype.html','tn-masuk-badan.html':'Backlog-IDDS-TN-MASUK-Prototype.html', 'tn-system-badan.html':'Backlog-IDDS-TN-SYSTEM-Prototype.html', 'tn-cms-badan.html':'Backlog-IDDS-TN-CMS-Prototype.html', 'tn-eppat-badan.html':'Backlog-IDDS-TN-EPPAT-Prototype.html', 'eaw-badan.html':'Backlog-HE-EAW-Prototype.html' };
/* atribut item baru yang tidak ada di prototipe */
const BARU = {
  'IDDS-PL-41':{ fitur:'Platform · Kerangka menu samping (penyesuaian IDDS)', prinsip:'Penyesuaian IDDS (Kesimpulan HE hal. 40 no. 1); H4 Consistency and Standards', halaman:'Tidak dinilai HE', prioritas:'Sedang', layar:'dev-app.eppat.id/platform › menu samping', selesai_bila:'Menu samping Platform memakai struktur pola Sidebar IDDS: label grup huruf biasa rata kiri, kartu profil pengguna di bawah, dan mode ciut berikon saja dengan tooltip. Warna tetap brand E-PPAT dan lulus uji kontras.', catatan:'Struktur sama dengan menu samping tenant (IDDS-TN-40) dan Onboarding (IDDS-OB-11).' },
  'IDDS-TN-40':{ fitur:'Tenant · Menu samping (penyesuaian IDDS)', prinsip:'Penyesuaian IDDS (Kesimpulan HE hal. 40 no. 1); H2 Match Between System and the Real World; H4 Consistency and Standards', halaman:'Tidak dinilai HE', prioritas:'Sedang', layar:'dev-app.eppat.id/t/<kantor> › menu samping, judul halaman, dan remah', selesai_bila:'Menu samping tampil dalam lima grup (Layanan, Akta, Pengaturan Kantor, Pengaturan Aplikasi, Konten Situs) dengan nama dan urutan baru. Judul halaman dan remah setiap layar sama dengan nama menunya.', catatan:'Hanya menu yang ada di live. Tugas Saya, Permohonan APHT, Arsip Akta, dan Template Akta belum ada di live sehingga belum ditambahkan.' },
  'IDDS-TN-38':{ fitur:'Tenant · Masuk & Daftar (penyesuaian IDDS)', prinsip:'Penyesuaian IDDS (Kesimpulan HE hal. 40 no. 1) · H10 Help and Documentation', halaman:'Tidak dinilai HE', prioritas:'Sedang', layar:'dev-app.eppat.id/t/<kantor> › Masuk; /register', selesai_bila:'Setiap layar Masuk, verifikasi, Ganti Kata Sandi, dan Daftar punya Bantuan yang isinya khusus layar tersebut.', catatan:'Kontak dukungan di prototipe adalah data contoh.' },
  'IDDS-TN-39':{ fitur:'Tenant · Semua halaman › Notifikasi (penyesuaian IDDS)', prinsip:'Penyesuaian IDDS (Kesimpulan HE hal. 40 no. 1) · H1 Visibility of System Status', halaman:'Tidak dinilai HE', prioritas:'Sedang', layar:'dev-app.eppat.id/t/<kantor> › bilah atas › Notifikasi', selesai_bila:'Panel notifikasi menampilkan jenis, status baca, keadaan memuat/galat, dapat dipakai dengan keyboard, dan membuka halaman terkait.', catatan:'' },
  'HE-EAW-08':{ fitur:'E-Akta Wizard (PPAT)', prinsip:'H5 Error Prevention · H1 Visibility of System Status', halaman:'Temuan penelusuran live (prototipe HE)', prioritas:'Tinggi', layar:'E-PPAT Module › E-Akta Wizard › langkah Stempel TERA', selesai_bila:'Tombol Stempel TERA nonaktif dengan alasan yang terlihat bila TERA kantor belum aktif, dan pengguna diarahkan ke pendaftaran TERA.', catatan:'Status TERA dari GET /admin/eppat/tera-registration (null/pending/submitted/active/rejected).' },
  'HE-EAW-09':{ fitur:'E-Akta Wizard (PPAT)', prinsip:'H5 Error Prevention · H1 Visibility of System Status', halaman:'Temuan penelusuran live (prototipe HE)', prioritas:'Tinggi', layar:'E-PPAT Module › E-Akta Wizard › langkah e-Meterai', selesai_bila:'Nomor seri e-Meterai tidak dapat dibuat sebelum aktivasi, setiap pemakaian kuota dikonfirmasi, dan kuota habis dijelaskan di layar.', catatan:'Email aktivasi dari GET /admin/eppat/emeterai-activation. Sisa kuota belum tersedia di API.' }
};
const ambilUBAH = t => {
  const a = t.indexOf('const UBAH = ['); if (a < 0) return null;
  let i = t.indexOf('[', a), d = 0, s = null;
  for (let k = i; k < t.length; k++) { const c = t[k];
    if (s) { if (c === '\\') { k++; continue; } if (c === s) s = null; continue; }
    if (c === "'" || c === '"' || c === '`') { s = c; continue; }
    if (c === '[') d++; if (c === ']' && --d === 0) { i = [i, k + 1]; break; } }
  const kode = t.slice(i[0], i[1]);
  const kotak = { usulan:k => k, est:x => x, ik:() => '', badge:x => x, esc:x => x, tombol:x => x };
  return vm.runInNewContext('(' + kode + ')', kotak);
};
const bersih = s => String(s || '').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const j = JSON.parse(fs.readFileSync('backlog-he.json', 'utf8'));
let ubah = 0, baru = 0;
for (const [f, proto] of Object.entries(BERKAS)) {
  const U = ambilUBAH(fs.readFileSync(f, 'utf8')); if (!U) { console.log('UBAH tidak ada:', f); continue; }
  for (const u of U) {
    const kode = u.kode; if (!/^(IDDS-TN|IDDS-PL|IDDS-OB|HE-EAW)-\d+$/.test(kode)) continue;
    let it = j.item.find(x => x.kode === kode);
    /* penyesuaian Platform · Masuk: atribut bawaan */
    const MENU_PL = { 'pl-masuk-badan.html':['Masuk', 'Masuk', 'Pola sama dengan penyesuaian halaman Masuk tenant (IDDS-TN-01–07, 38).'], 'pl-monitoring-badan.html':['Monitoring', 'Monitoring (Dasbor, Daftar PPAT, Paket Langganan, Log Aktivitas)', 'Halaman Daftar PPAT dan Paket Langganan hanya baca di live; pengelolaan lewat aplikasi Onboarding.'], 'pl-akta-badan.html':['Jenis Akta', 'Akta › Jenis Akta (template & variabel)', ''], 'pl-sistem-badan.html':['Sistem', 'Sistem (Setting Theme, Pengaturan Global, Akun Saya)', 'Setting Theme memakai komponen yang sama dengan tenant (pola IDDS-TN-19/20/24).'] }[f];
    const blPL = kode.startsWith('IDDS-PL-') && MENU_PL ? { fitur:`Platform · ${MENU_PL[0]} (penyesuaian IDDS)`, prinsip:'Penyesuaian IDDS (Kesimpulan HE hal. 40 no. 1)', halaman:'Tidak dinilai HE', prioritas:'Sedang', layar:`dev-app.eppat.id/platform › ${MENU_PL[1]}`, selesai_bila:`Layar live sesuai prototipe: ${bersih(u.judul).replace(/\.$/, '').toLowerCase()}.`, catatan:MENU_PL[2] } : null;
    const MENU_OB = { 'ob-masuk-badan.html':['Beranda, Kata Sandi & Profil', 'Beranda; /forgot-password; /reset-password; Profil'], 'ob-monitor-badan.html':['Monitoring', 'Dashboard; Manajemen Onboarding'], 'ob-verif-badan.html':['Verifikasi', 'Verifikasi Anggota, Produk, Pembayaran'], 'ob-bayar-badan.html':['Simulasi Pembayaran', 'Dasbor pelanggan › Pembayaran VA; Verifikasi Pembayaran; Manajemen Onboarding'], 'ob-pengaturan-badan.html':['Pengaturan', 'Pengaturan (Menu, Daftar Pengguna, Peran Pengguna, Harga Produk, Paket Langganan)'] }[f];
    const blOB = kode.startsWith('IDDS-OB-') && MENU_OB ? { fitur:`Onboarding · ${MENU_OB[0]} (penyesuaian IDDS)`, prinsip:'Penyesuaian IDDS (Kesimpulan HE hal. 40 no. 1)', halaman:'Tidak dinilai HE', prioritas:'Sedang', layar:`dev.eppat.id › ${MENU_OB[1]}`, selesai_bila:`Layar live sesuai prototipe: ${bersih(u.judul).replace(/\.$/, '').toLowerCase()}.`, catatan:'' } : null;
    if (!it) { const b = BARU[kode] || blPL || blOB; if (!b) { console.log('lewati (tanpa atribut baru):', kode); continue; }
      it = { kode, ...b, judul:'', saat_ini:'', usulan:'', acuan:`prototipe/${proto} › Daftar ${kode.startsWith('HE') ? 'perubahan' : 'penyesuaian'} › ${kode}`, status:'Prototipe siap', tanggal:T };
      const urut = j.item.findIndex(x => x.kode > kode && x.kode.split('-').slice(0, -1).join('-') === kode.split('-').slice(0, -1).join('-'));
      urut < 0 ? j.item.push(it) : j.item.splice(urut, 0, it); baru++; }
    const lama = JSON.stringify([it.judul, it.usulan, it.saat_ini]);
    it.judul = bersih(u.judul); it.usulan = bersih(u.isi); it.saat_ini = bersih(u.lama);
    if (JSON.stringify([it.judul, it.usulan, it.saat_ini]) !== lama) { it.tanggal = T; ubah++; }
  }
}
fs.writeFileSync('backlog-he.json', JSON.stringify(j, null, 2));
console.log(`OK: ${ubah} item diperbarui, ${baru} item baru, total ${j.item.length}`);
