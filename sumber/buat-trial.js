// Membuat trial-badan.html dari onboard-badan.html + trial-sisip.js agar Registrasi, Masuk, dan Pembayaran selalu sama
// dengan prototipe Onboarding HE. Dijalankan rakit-semua.js. node buat-trial.js
const fs = require('fs'), path = require('path');
const baca = n => fs.readFileSync(path.join(__dirname, n), 'utf8');
let t = baca('onboard-badan.html');
const g = (a, b) => { if (!t.includes(a)) throw new Error('tidak ketemu: ' + a.slice(0, 80)); t = t.split(a).join(b); };

/* bilah prototipe */
g('<b>Platform Onboarding</b>', '<b>Trial ke Enterprise</b>');
g('<button class="pil utama" id="bukaUbah">Daftar perubahan</button>\n  </span>\n</div>', '<button class="pil utama" id="bukaUbah">Daftar perubahan</button>\n  </span>\n</div>\n<div class="protobar protobar-sim" id="barPerjalanan"></div>');
g("dialog({ judul:'Daftar perubahan Platform Onboarding'", "dialog({ judul:'Daftar perubahan Trial ke Enterprise'");

/* CSS layar Trial (salin ob-bayar-badan) */
g('<style id="onboard-css">\n', `<style id="onboard-css">
.eb{font:600 11px Inter,sans-serif;letter-spacing:1.5px;text-transform:uppercase;color:var(--ina-content-secondary)}
.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.fitur-ok{list-style:none;margin:12px 0 0;padding:0;font-size:14px;line-height:26px;color:var(--ina-content-primary)}
.fitur-ok li{display:flex;gap:8px;align-items:center}
.fitur-ok svg{color:var(--ina-content-positive);flex:none}
.protobar-sim{border-top:1px solid rgba(255,255,255,.08)}
.sisa-trial{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin-top:6px}
.sisa-trial div{padding:10px 4px;border:1px solid var(--ina-stroke-primary);border-radius:12px;background:var(--ina-background-primary);text-align:center}
.sisa-trial b{display:block;font:700 24px/30px Inter,sans-serif;color:var(--ina-primary-primary)}
.sisa-trial span{display:block;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:var(--ina-content-secondary)}
.kartu-db h4.sub-kartu{margin:16px 0 0;font:600 14px Inter,sans-serif;color:var(--ina-content-primary)}
.kartu-upgrade h4{margin:0;font:600 15px Inter,sans-serif;color:var(--ina-content-primary)}
.akun-chip{display:inline-block;margin:10px 0 0;padding:4px 12px;border:1px solid var(--ina-stroke-primary);border-radius:999px;background:var(--ina-background-primary);font-size:13px;color:var(--ina-content-secondary);overflow-wrap:anywhere}
.akun-chip b{color:var(--ina-content-primary)}
#lencanaTrial{flex:none;white-space:nowrap}
@media (max-width:760px){ #lencanaTrial .lt-opsi{display:none} }
.peta-trial{margin:12px 0 0;padding-left:24px}
.peta-trial li{padding:6px 8px;border-radius:8px}
.peta-trial li b{display:block;font-weight:600}
.peta-trial li span{font-size:13px;color:var(--ina-content-secondary)}
.peta-trial li.kini{background:var(--ina-background-secondary)}
`);

/* keadaan & layar */
g("const S = { layar:'daftar',", "const S = { balik:'', keUpgrade:false, layar:'daftar',");
g("cek:'', hasilCek:'' });", "cek:'', hasilCek:'', trial:null, ent:null, up:null });");
t = t.replace(/const LAYAR = \[\[.*\]\];/, () => "const LAYAR = [['daftar', 'Registrasi'], ['verif', 'Cek email'], ['verifOk', 'Verifikasi berhasil'], ['masuk', 'Masuk'], ['metode', 'Verifikasi dua langkah'], ['dasbor', 'Pilih Paket'], ['trial', 'Trial aktif'], ['upgrade', 'Upgrade'], ['enterprise', 'Enterprise aktif'], ['riwayat', 'Riwayat Transaksi'], ['perpanjang', 'Perpanjang']];");
g("const APP = ['dasbor', 'bayar', 'lunas', 'selesai', 'riwayat'];", "const APP = ['dasbor', 'bayar', 'lunas', 'selesai', 'riwayat', 'upgrade', 'perpanjang'];");
g('aria-pressed="${S.layar === k}"', 'aria-pressed="${pilAktif() === k}"');
g('function gambar() {\n', 'function gambar() { gambarAsli(); simpanTrial(); gambarBar(); jalankanJamTrial(); }\nfunction gambarAsli() {\n');
g('selesai:layarSelesai, riwayat:layarRiwayat }', 'selesai:layarSelesai, riwayat:layarRiwayat, upgrade:layarUpgrade, perpanjang:layarPerpanjang }');
g('function ke(layar) { S.layar = layar;', "function ke(layar) { if (layar !== 'dasbor') S.keUpgrade = false; S.layar = siapkan(layar);");
g("function layarDasbor() {\n", "function layarDasbor() {\n  if (DB.trial) return layarDasborTrial();\n");
g("function layarRiwayat() {\n", "function layarRiwayat() {\n  if (DB.trial) return layarRiwayatTrial();\n");
g('${DB.lunas ? \'\' : `<div class="kaki-db ditandai" id="gantiPaket">', '${DB.trial ? kakiUpgrade() : DB.lunas ? \'\' : `<div class="kaki-db ditandai" id="gantiPaket">');
g("'QRIS atau Virtual Account sesuai pilihan.'", "'Pilih bank untuk membuat Virtual Account.'");

/* Pilih paket: Trial aktif seketika */
g("'Pilih Trial atau Enterprise di bawah, lalu tekan Lanjut pembayaran. Paket masih dapat diganti sebelum pembayaran diterima.'", "'Pilih Trial atau Enterprise di bawah. Trial langsung aktif tanpa pembayaran. Enterprise dilanjutkan dengan pembayaran.'");
g("tombol('Lanjut pembayaran', 'primary', 'md', `id=\"lanjutBayar\" ${DB.paket ? '' : 'disabled'}`, ik('panah', 16))", "tombol(DB.paket === 'trial' ? 'Aktifkan Trial Gratis' : 'Lanjut pembayaran', 'primary', 'md', `id=\"lanjutBayar\" ${DB.paket && !S.memuat ? '' : 'disabled'}`, S.memuat === 'trial' ? spinner : ik('panah', 16))");
g("if (t.closest('#lanjutBayar')) { DB.dipesan = DB.paket;", "if (t.closest('#lanjutBayar')) { if (DB.paket === 'trial') { aktifkanTrial(); return; } DB.dipesan = DB.paket;");

/* Virtual Account upgrade: order baru dibuat di sini */
g("DB.va = { no:'1462900000000001', ref:'REF-CONTOH-0001', habis, sampai:'27 Okt 2026, 09.21' }; gambar(); jalankanJamVa(); toast('Virtual Account dibuat. Selesaikan pembayaran sebelum batas waktu.', 'positive'); }, 700); return; }",
  "DB.va = DB.trial ? { ...vaContoh(), habis } : { no:'1462900000000001', ref:'REF-CONTOH-0001', habis, sampai:'27 Okt 2026, 09.21' }; if (DB.trial) DB.up.va = T0 + 12 * MNT; gambar(); jalankanJamVa(); toast(DB.trial ? 'Virtual Account dibuat. Instruksi pembayaran juga dikirim ke email Anda.' : 'Virtual Account dibuat. Selesaikan pembayaran sebelum batas waktu.', 'positive'); }, 700); return; }");

/* masuk portal dari tenant: kembali ke halaman Upgrade */
g('<h2>Masuk ke e-PPAT</h2>\n', "<h2>Masuk ke e-PPAT</h2>\n    ${S.balik ? pesanBalik() : ''}\n");
g("${tombol('Aktifkan &amp; masuk', 'primary', 'lg',", "${tombol(S.balik ? 'Masuk' : 'Aktifkan &amp; masuk', 'primary', 'lg',");
g("spinner + 'Aktifkan &amp; masuk'", "spinner + (S.balik ? 'Masuk' : 'Aktifkan &amp; masuk')");
g("setTimeout(() => { OTP = null; ke('dasbor'); toast('Verifikasi dua langkah aktif. Selamat datang di Portal e-PPAT.', 'positive', 4000); }, 700);", 'setTimeout(() => { OTP = null; selesaiMasukPortal(); }, 700);');

/* menu Dasbor portal selama Trial selalu ke Dasbor */
g("data-ke=\"${k === 'dasbor' ? (DB.aktif ?", "data-ke=\"${k === 'dasbor' ? (DB.trial ? 'dasbor' : DB.aktif ?");

/* sisipan, atur ulang, hash */
g('/* ---------------- protobar & daftar perubahan ---------------- */', baca('trial-sisip.js') + '\n/* ---------------- protobar & daftar perubahan ---------------- */');
g("if (u.ke === 'bantuan') { bukaBantuan(); return; }", "if (u.ke === 'bantuan') { bukaBantuan(); return; }\n  if (u.ke === 'tr-tur') { ke('trial'); setTimeout(() => window.TurBersama && window.TurBersama.mulai(), 400); return; }\n  if (u.ke === 'tr-aktif') ke('trial');\n  if (u.ke === 'tr-ent') ke('enterprise');\n  if (u.ke === 'tr-riwayat') { siapkan('enterprise'); ke('riwayat'); }\n  if (u.ke === 'tr-masuk') { siapkan('trial'); S.balik = 'dasbor'; S.email = S.email || 'ppat.baru@contoh.id'; ke('masuk'); }");
g("DB = DB0(); ke('daftar');", "DB = DB0(); hapusTrial(); ke('daftar');");
g("{ const h = location.hash.slice(1); if (LAYAR.some(([k]) => k === h)) S.layar = h; }", "muatTrial(); bukaHash(location.hash.slice(1));");
g("window.addEventListener('hashchange', () => { const h = location.hash.slice(1); if (h !== S.layar && LAYAR.some(([k]) => k === h)) ke(h); });", "window.addEventListener('hashchange', () => { const h = location.hash.slice(1); if (h !== S.layar && (h === 'berlangganan' || LAYAR.some(([k]) => k === h))) { bukaHash(h); gambar(); } });");
fs.writeFileSync(path.join(__dirname, 'trial-badan.html'), t);
console.log('OK trial-badan.html', t.length, 'byte');
