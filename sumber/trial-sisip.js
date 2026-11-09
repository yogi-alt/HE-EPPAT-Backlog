/* ================= Perjalanan Trial ke Enterprise (HE-TRIAL) =================
   Disisipkan buat-trial.js ke salinan onboard-badan.html. Keadaan disimpan di localStorage eppat-trial
   agar tersambung dengan prototipe tenant (sesi-bersama.html). Alur mengikuti penelusuran live 6 Nov 2026. */
const KUNCI_TRIAL = 'eppat-trial', KUNCI_SESI = 'eppat-sesi', MNT = 6e4;
const TN_MASUK = 'Backlog-IDDS-TN-MASUK-Prototype.html', TN_DASBOR = 'Backlog-IDDS-TN-SYSTEM-Prototype.html#dasbor';
const T0 = new Date('2026-10-26T09:20').getTime();
const BLN = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
const tglPendek = w => { const d = new Date(w); return `${d.getDate()} ${BLN[d.getMonth()]} ${d.getFullYear()}`; };
const tglJam = w => { const d = new Date(w); return `${tglPendek(w)}, ${String(d.getHours()).padStart(2, '0')}.${String(d.getMinutes()).padStart(2, '0')}`; };
const url0 = () => `dev-app.eppat.id/t/${(S.data || {}).tenant || 'kantor-contoh'}`, namaAkun = () => esc((S.data || {}).nama || 'Contoh PPAT Baru'), HARGA = () => PAKET.enterprise.harga;
const emailAkun = () => esc(S.email || 'ppat.baru@contoh.id');
const hinggaEnt = () => { const d = new Date(DB.ent); d.setFullYear(d.getFullYear() + 1); return d.getTime(); };
let portal = false;

/* ---------- simpan & muat ---------- */
const bacaTrial = () => { try { return JSON.parse(localStorage.getItem(KUNCI_TRIAL)) || {}; } catch (e) { return {}; } };
function simpanTrial() { if (!DB.trial) return; try { localStorage.setItem(KUNCI_TRIAL, JSON.stringify({ ...bacaTrial(), db:DB, portal, email:S.email, nama:(S.data || {}).nama, tenant:(S.data || {}).tenant })); } catch (e) { /* peramban menolak penyimpanan: prototipe tetap berjalan */ } }
function hapusTrial() { S.balik = ''; portal = false; try { localStorage.removeItem(KUNCI_TRIAL); const s = JSON.parse(localStorage.getItem(KUNCI_SESI)); if (s && s.paket === 'trial') localStorage.removeItem(KUNCI_SESI); } catch (e) { /* lihat simpanTrial() */ } }
const trialBaru = () => ({ mulai:T0, akhir:T0 + 30 * 864e5, nyata:Date.now(), invoice:'ORD-TRIAL-2610260001' });
function muatTrial() {
  const t = bacaTrial();
  if (t.db && t.db.trial) { DB = { ...DB0(), ...t.db }; portal = !!t.portal; S.email = t.email || ''; S.data = { nama:t.nama, tenant:t.tenant }; return; }
  /* masuk tenant lewat simulasi tanpa melewati Dasbor portal: Trial dianggap sudah aktif */
  try { const s = JSON.parse(localStorage.getItem(KUNCI_SESI)); if (s && s.paket === 'trial') DB.trial = trialBaru(); } catch (e) { /* lihat simpanTrial() */ }
}

/* ---------- menyiapkan keadaan saat layar dibuka langsung ---------- */
function mulaiUpgrade() { DB.dipesan = 'enterprise'; DB.paket = 'enterprise'; if (!DB.up) DB.up = { mulai:T0 + 10 * MNT }; }
function lunaskan() { const w = T0 + 14 * MNT; DB.lunas = true; DB.ent = w; DB.up.lunas = w; DB.va = DB.va || vaContoh(); DB.bank = DB.bank || 'BRI'; DB.hasilCek = ''; }
const vaContoh = () => ({ no:'1462900000000002', ref:'REF-CONTOH-0002', habis:Date.now() + 864e5, sampai:tglJam(T0 + 12 * MNT + 864e5), invoice:'ORD-UPGRADE-2610260002' });
function siapkan(k) {
  if (['trial', 'upgrade', 'enterprise', 'perpanjang'].includes(k) && !DB.trial) { DB = { ...DB0(), paket:'trial', trial:trialBaru() }; portal = true; }
  if (k === 'trial') return 'dasbor';
  if (k === 'enterprise' || k === 'perpanjang') { if (!DB.ent) { mulaiUpgrade(); lunaskan(); } return k === 'enterprise' ? 'dasbor' : k; }
  /* setelah Enterprise, halaman Upgrade tertutup dan kembali ke Dasbor (sama dengan live) */
  if (k === 'upgrade') { if (DB.ent) return 'dasbor'; mulaiUpgrade(); }
  return k;
}
function bukaHash(h) {
  S.layar = DB.trial ? 'dasbor' : 'daftar';
  if (h === 'berlangganan') {
    siapkan('trial');
    if (!portal && !DB.ent) { S.balik = 'dasbor'; S.email = S.email || 'ppat.baru@contoh.id'; S.layar = 'masuk'; return; }
    S.layar = 'dasbor'; S.keUpgrade = !DB.ent; sorotUpgrade(); return;
  }
  if (LAYAR.some(([k]) => k === h)) S.layar = siapkan(h);
}
/* datang dari Mulai Berlangganan: kartu Upgrade langsung terlihat */
const sorotUpgrade = () => setTimeout(() => { const el = $('#kartuTrial'); if (!el) return; el.scrollIntoView({ block:'center', behavior:'smooth' }); el.classList.add('sorot'); setTimeout(() => el.classList.remove('sorot'), 2400); }, 300);
function selesaiMasukPortal() {
  portal = true; const tujuan = S.balik; S.balik = '';
  if (tujuan) { S.keUpgrade = true; ke(tujuan); sorotUpgrade(); toast('Anda sudah masuk. Lanjutkan upgrade dari Dasbor.', 'positive', 4000); return; }
  ke('dasbor'); toast('Verifikasi dua langkah aktif. Selamat datang di Portal e-PPAT.', 'positive', 4000);
}
const pesanBalik = () => `<div class="ditandai" id="pesanBalik">${alert('info', 'Sesi Anda sudah berakhir', `Masuk untuk melanjutkan upgrade. Akun: <b>${emailAkun()}</b>. Setelah masuk, Anda kembali ke Dasbor untuk melanjutkan upgrade.`)}${usulan('HE-TRIAL-06')}</div>`;

/* ---------- aksi ---------- */
function aktifkanTrial() {
  S.memuat = 'trial'; gambar();
  setTimeout(() => { S.memuat = ''; DB.dipesan = 'trial'; DB.trial = trialBaru(); portal = true; gambar(); window.scrollTo({ top:0 }); toast('Trial aktif. Aplikasi kantor Anda sudah siap.', 'positive', 4000); }, 900);
}
function keTenant() {
  let s = null; try { s = JSON.parse(localStorage.getItem(KUNCI_SESI)); } catch (e) { /* lihat simpanTrial() */ }
  simpanTrial(); location.href = s && s.paket === 'trial' ? TN_DASBOR : TN_MASUK;
}
function transferBank() {
  if (!DB.trial || !DB.va || DB.ent) { toast('Buat Virtual Account terlebih dahulu di halaman Upgrade ke Enterprise.'); return; }
  lunaskan(); S.layar = 'dasbor'; gambar(); window.scrollTo({ top:0 }); toast('Pembayaran diterima. Paket Enterprise aktif.', 'positive', 4500);
}
document.addEventListener('click', e => {
  const t = e.target;
  if (t.closest('#masukApp, [data-ke-tenant]')) { e.preventDefault(); keTenant(); return; }
  if (t.closest('#upgradeSekarang, [data-ke-upgrade]')) { ke('upgrade'); return; }
  if (t.closest('#kembaliDasbor')) { ke('dasbor'); return; }
  if (t.closest('#bukaPerpanjang')) { ke('perpanjang'); return; }
  if (t.closest('#batalPerpanjang')) { ke('riwayat'); toast('Perpanjangan dibatalkan. Tidak ada tagihan yang dibuat.'); return; }
  if (t.closest('#lanjutPerpanjang')) { toast('Langkah berikutnya sama dengan Pilih Bank dan Bayar Virtual Account. Tagihan dibuat saat Anda menekan Buat Virtual Account.', 'default', 5000); return; }
  if (t.closest('#simBank')) { transferBank(); return; }
  if (t.closest('#simPortal')) { portal = !portal; simpanTrial(); gambarBar(); toast(portal ? 'Sesi portal aktif: Mulai Berlangganan langsung membuka Dasbor.' : 'Sesi portal berakhir: Mulai Berlangganan meminta masuk lebih dulu.'); return; }
  if (t.closest('#bukaPeta')) { bukaPeta(); }
});

/* ---------- Dasbor Trial & Enterprise ---------- */
function heroTrial() {
  const ent = !!DB.ent;
  return `<section class="hero-db"><div><span class="ditandai" id="lencanaAkun">${badge(ent ? 'Status akun: Aktif' : 'Status akun: Trial aktif', ent ? 'success' : 'info', 'sm')}${usulan('HE-TRIAL-01')}</span><h2>Selamat Datang di Portal e-PPAT</h2><p>${ent ? 'Aplikasi e-PPAT kantor Anda sudah aktif. Paket Enterprise berlaku.' : `Paket Trial Anda aktif sampai ${tglJam(DB.trial.akhir)}. Upgrade ke Enterprise kapan saja untuk akses penuh.`}</p></div></section>`;
}
function kartuTahapTrial() {
  const ket = i => i < 4 ? TGL[i] : i === 4 ? tglJam(DB.trial.mulai).replace(/ 2026,/, ',') : i === 5 || i === 6 ? 'Tidak perlu (Trial gratis)' : tglJam(DB.trial.mulai).replace(/ 2026,/, ',');
  const B = DB.ent ? null : DB.va ? ['Selesaikan pembayaran upgrade', `Transfer ke Virtual Account sebelum batas waktu. Trial tetap berjalan sampai pembayaran diterima.<div style="margin-top:8px">${tombol('Lanjutkan upgrade', 'primary', 'sm', 'data-ke-upgrade', ik('panah', 14))}</div>`]
    : S.keUpgrade ? ['Lanjutkan upgrade ke Enterprise', `Tekan Upgrade sekarang untuk memilih pembayaran. Trial tetap berjalan sampai pembayaran diterima.<div style="margin-top:8px">${tombol('Upgrade sekarang', 'primary', 'sm', 'data-ke-upgrade', ik('panah', 14))}</div>`]
    : ['Masuk ke aplikasi kantor', 'Gunakan Trial sebagai Super Admin dengan email dan kata sandi pendaftaran. Upgrade ke Enterprise kapan saja; data dan alamat aplikasi tetap sama.'];
  return `<section class="ina-card ina-card--variant-basic kartu-db ditandai" id="kartuTahap"><div class="ina-card__content"><h3>Progres Registrasi Anda${usulan('HE-OB-05')}</h3>
    ${stepperH(TAMPIL.map(i => TAHAP[i]), TAMPIL.length, n => `<small>${ket(TAMPIL[n])}</small>`, 'Tahapan registrasi')}
    ${B ? `<div class="berikut-db ditandai" id="langkahDb">${alert('info', `Langkah berikutnya: ${B[0]}`, B[1])}</div>` : ''}</div></section>`;
}
const UP = ['Upgrade dimulai', 'Proses Pembayaran', 'Lunas', 'Enterprise aktif'];
function kartuProgresUp() {
  const u = DB.up || {}, kini = DB.ent ? UP.length : DB.va ? 1 : 0;
  const ket = i => i === 0 ? tglJam(u.mulai).replace(/ 2026,/, ',') : i === 1 ? (DB.va ? (u.va ? tglJam(u.va).replace(/ 2026,/, ',') : 'Sedang berjalan') : '—') : DB.ent ? tglJam(u.lunas).replace(/ 2026,/, ',') : '—';
  return `<section class="ina-card ina-card--variant-basic kartu-db ditandai" id="progresUpgrade"><div class="ina-card__content"><h3>Progres Upgrade ke Enterprise${usulan('HE-TRIAL-07')}</h3>
    ${stepperH(UP, kini, n => `<small>${ket(n)}</small>`, 'Tahapan upgrade')}</div></section>`;
}
function kartuSiapTrial() {
  return `<section class="ina-card ina-card--variant-basic kartu-db ditandai" id="kartuSiap" style="margin-top:0"><div class="ina-card__content"><span class="siap-ikon">${ik('centangL', 28)}</span><h3>Aplikasi e-PPAT Anda Siap!</h3><p class="ket">Akun aplikasi e-PPAT Anda telah berhasil dibuat dan siap digunakan.</p>
    <div class="akses"><small>Alamat aplikasi e-PPAT Anda</small><a href="#" class="url-kantor" data-ke-tenant>https://${url0()}</a></div>
    <div class="tombol-blok">${tombol(DB.ent ? 'Kembali ke Aplikasi e-PPAT' : 'Masuk ke aplikasi e-PPAT', 'primary', 'md', 'id="masukApp"', ik('masuk', 16))}${tombol('Lupa kata sandi?', 'link', 'md', 'data-luar="Lupa kata sandi"')}</div>
    <div style="margin-top:12px">${alert('info', '', 'Masuk dengan email dan kata sandi yang Anda buat saat pendaftaran. Demi keamanan, kata sandi tidak pernah dikirim melalui email.')}</div>${usulan('HE-TRIAL-05')}</div></section>`;
}
const sisaAngka = () => { const s = Math.max(0, Math.floor((DB.trial.akhir - DB.trial.mulai - (Date.now() - DB.trial.nyata)) / 1000)); return [Math.floor(s / 86400), Math.floor(s % 86400 / 3600), Math.floor(s % 3600 / 60), s % 60]; };
const hitungTrial = () => { const a = sisaAngka(); return ['Hari', 'Jam', 'Menit', 'Detik'].map((n, i) => `<div><b>${String(a[i]).padStart(2, '0')}</b><span>${n}</span></div>`).join(''); };
function kartuTrial() {
  return `<section class="ina-card ina-card--variant-basic kartu-db ditandai" id="kartuTrial" style="margin-top:0"><div class="ina-card__content"><div class="eb">Paket Trial aktif</div><h3>Nikmati fitur e-PPAT secara gratis</h3>
    <p class="ket" id="lblSisaTrial" style="margin-top:12px">Sisa masa Trial</p>
    <div class="sisa-trial" id="sisaTrial" role="timer" aria-live="off" aria-labelledby="lblSisaTrial" aria-describedby="akhirTrial">${hitungTrial()}</div>
    <p class="ket" id="akhirTrial" style="margin-top:8px">Berakhir: <b>${tglJam(DB.trial.akhir)} WIB</b></p>
    <h4 class="sub-kartu">Batas paket Trial</h4><ul class="fitur-ok">${PAKET.trial.fitur.slice(0, 3).map(x => `<li>${ik('centang', 14)}${x}</li>`).join('')}</ul>
    <div class="akses kartu-upgrade"><h4>Upgrade ke Enterprise</h4><p class="ket">Dapatkan akses penuh tanpa batas: e-Sign, e-Seal, analitik lengkap, dan dukungan teknis mendalam. Data dan alamat aplikasi tetap sama.</p>
      ${DB.va ? '<p class="ket" style="margin-top:6px">Tagihan upgrade sudah dibuat. Trial tetap berjalan sampai pembayaran diterima.</p>' : ''}
      <div class="tombol-blok">${tombol(DB.va ? 'Lanjutkan upgrade' : 'Upgrade sekarang', 'primary', 'md', 'id="upgradeSekarang"', ik('panah', 16))}</div></div>${usulan('HE-TRIAL-01')}</div></section>`;
}
function kartuEntAktif() {
  const p = PAKET.enterprise;
  return `<section class="ina-card ina-card--variant-basic kartu-db ditandai" id="kartuEntAktif" style="margin-top:0"><div class="ina-card__content"><div class="eb">Paket Enterprise aktif</div><h3>${p.lencana[0]}</h3>
    <ul class="fitur-ok">${p.fitur.map(x => `<li>${ik('centang', 14)}${x}</li>`).join('')}</ul>
    <div class="akses"><small>Berlaku hingga</small><b>${tglPendek(hinggaEnt())}</b></div>${usulan('HE-TRIAL-07')}</div></section>`;
}
const emailAktif = () => `<div class="email-pratinjau"><div class="kep">Dari: e-PPAT &lt;noreply@eppat.id&gt; · ${tglJam(DB.trial.mulai)} · Subjek: Akun e-PPAT Anda Sudah Aktif</div>
  <div class="isi">Yth. Bapak/Ibu ${namaAkun()},<br>Instansi e-PPAT untuk kantor Anda telah berhasil dibuat. Paket Trial aktif sampai ${tglJam(DB.trial.akhir)}.
    <div class="kotak"><small>ALAMAT APLIKASI</small>${url0()}<small style="margin-top:8px">EMAIL UNTUK MASUK</small>${emailAkun()}</div>
    <p style="margin:10px 0 0;font-size:12.5px;color:var(--ina-content-secondary)">Masuk dengan email di atas dan kata sandi yang Anda buat saat pendaftaran. Demi keamanan, kami tidak pernah mengirim kata sandi melalui email.</p></div></div>`;
const emailLunas = () => `<div class="email-pratinjau"><div class="kep">Dari: e-PPAT &lt;noreply@eppat.id&gt; · ${tglJam(DB.ent)} · Subjek: Pembayaran Berhasil Diterima</div>
  <div class="isi">Yth. Bapak/Ibu ${namaAkun()},<br>Pembayaran upgrade ke paket Enterprise sudah kami terima. Paket Enterprise aktif sampai ${tglPendek(hinggaEnt())}.
    <div class="kotak"><small>NOMOR ORDER</small>${DB.va.invoice}<small style="margin-top:8px">STATUS</small>Lunas · Virtual Account ${DB.bank} · ${HARGA()}</div>
    Silakan masuk dengan alamat aplikasi dan kata sandi yang sama.</div></div>`;
function layarDasborTrial() {
  const ent = !!DB.ent;
  const sukses = ent ? `<div class="berikut-db ditandai" id="pesanBerhasil">${alert('success', 'Pembayaran berhasil. Paket Enterprise aktif', `Tagihan ${DB.va.invoice} sebesar ${HARGA()} lunas pada ${tglJam(DB.ent)}. Paket Enterprise berlaku sampai ${tglPendek(hinggaEnt())}. Sisa masa Trial tidak berlaku lagi.`)}${usulan('HE-TRIAL-07')}</div>` : '';
  return `${heroTrial()}${sukses}${kartuTahapTrial()}${DB.va || ent ? kartuProgresUp() : ''}<div class="dua-kol" style="margin-top:16px">${kartuSiapTrial()}${ent ? kartuEntAktif() : kartuTrial()}</div>
    <section class="ina-card ina-card--variant-basic kartu-db ditandai" id="emailTrial"><div class="ina-card__content"><h3>Email yang Anda terima${usulan('HE-TRIAL-02')}</h3><p class="ket">${ent ? 'Upgrade hanya mengirim email pembayaran. Email aktivasi tidak dikirim ulang.' : 'Email ini dikirim sekali saat Trial aktif.'}</p><div>${ent ? emailLunas() : emailAktif()}</div></div></section>
    ${kartuBantuan()}`;
}
const kakiUpgrade = () => DB.lunas ? '' : `<div class="kaki-db" id="catatanUpgrade"><span class="ket">Trial tetap berjalan sampai ${tglJam(DB.trial.akhir)} selama pembayaran belum diterima. Data dan alamat aplikasi tidak berubah.</span>${tombol('Kembali ke Dasbor', 'tertiary', 'sm', 'id="kembaliDasbor"', ik('kiri', 14))}</div>`;
function layarUpgrade() {
  return `${remahApp('Upgrade ke Enterprise')}<h1>Upgrade ke Enterprise</h1><p class="sub">Bayar paket Enterprise untuk membuka akses penuh e-PPAT.</p><p class="akun-chip">Akun: <b>${emailAkun()}</b></p>
    ${kartuProgresUp()}<div class="dua-kol" style="margin-top:16px">${kartuRingkasan()}${kartuMetode()}</div>${kartuBantuan()}`;
}
const barisTrial = () => `<tr class="ina-table__row" id="barisTrial"><td class="ina-table__cell"><span class="kd" style="cursor:auto">${DB.trial.invoice}</span><div class="kc">Paket Trial 30 hari</div><div class="kc">Aktif: ${tglJam(DB.trial.mulai)}</div></td>
  <td class="ina-table__cell">Gratis<div class="kc">Tanpa pembayaran</div></td><td class="ina-table__cell">Rp0</td><td class="ina-table__cell"><span class="kc">Tidak berlaku (gratis)</span></td>
  <td class="ina-table__cell rw-status">${badge('Gratis', 'success', 'sm')}<div class="kc">${DB.ent ? `Diganti Enterprise ${tglJam(DB.ent)}` : `Berakhir ${tglJam(DB.trial.akhir)}`}</div></td><td class="ina-table__cell"></td></tr>`;
const barisUpgrade = () => `<tr class="ina-table__row" id="barisUpgrade"><td class="ina-table__cell"><span class="kd" style="cursor:auto">${DB.va.invoice}</span><div class="kc">Upgrade ke Enterprise</div><div class="kc">Ref. ${DB.va.ref}</div>${DB.ent ? `<div class="kc">Dibayar: ${tglJam(DB.ent)}</div>` : ''}</td><td class="ina-table__cell">Virtual Account ${DB.bank}<div class="kc">${DB.va.no}</div></td><td class="ina-table__cell">${HARGA()}</td>
  <td class="ina-table__cell">${DB.ent ? '<span class="kc">Tidak berlaku (sudah dibayar)</span>' : DB.va.sampai}</td><td class="ina-table__cell rw-status">${DB.ent ? badge('Lunas', 'success', 'sm') : badge('Belum dibayar', 'warning', 'sm')}</td><td class="ina-table__cell" style="text-align:right">${DB.ent ? '' : tombol('Bayar sekarang', 'link', 'sm', 'data-ke-upgrade')}</td></tr>`;
function layarRiwayatTrial() {
  return `${remahApp('Riwayat Transaksi')}<h1>Riwayat Transaksi</h1><p class="sub">Lihat seluruh transaksi pembayaran layanan e-PPAT Anda.</p>
    <div style="display:flex;justify-content:flex-end;margin-top:12px">${DB.ent ? tombol('Perpanjang langganan', 'secondary', 'md', 'id="bukaPerpanjang"') : tombol(DB.va ? 'Lanjutkan upgrade' : 'Upgrade ke Enterprise', 'primary', 'md', 'data-ke-upgrade', ik('panah', 16))}</div>
    <div class="tabel-wadah ditandai" id="tabelRiwayat"><div class="tabel-gulir"><div class="ina-table"><table class="ina-table__container tb" aria-label="Riwayat transaksi">
      <thead class="ina-table__header"><tr><th class="ina-table__header-cell" scope="col">Detail Transaksi</th><th class="ina-table__header-cell" scope="col">Metode</th><th class="ina-table__header-cell" scope="col">Jumlah</th><th class="ina-table__header-cell" scope="col">Jatuh Tempo</th><th class="ina-table__header-cell" scope="col">Status</th><th class="ina-table__header-cell" scope="col"><span class="sr-only">Aksi</span></th></tr></thead>
      <tbody class="ina-table__body">${DB.va ? barisUpgrade() : ''}${barisTrial()}</tbody></table></div></div></div>${usulan('HE-TRIAL-08')}`;
}
function layarPerpanjang() {
  const p = PAKET.enterprise;
  return `${remahApp('Perpanjang langganan')}<h1>Perpanjang langganan</h1><p class="sub">Perpanjang paket Enterprise kantor Anda untuk satu tahun berikutnya.</p>
    <div class="dua-kol" style="margin-top:16px"><section class="ina-card ina-card--variant-basic kartu-db" style="margin-top:0"><div class="ina-card__content"><h3>Ringkasan Pesanan</h3><p class="ket">Paket yang akan diperpanjang.</p>
      <div class="paket" style="grid-template-columns:1fr"><label class="dipilih" style="cursor:default"><span class="atas"><h4>${p.n}</h4>${badge(...p.lencana, 'sm')}</span><div class="harga">${p.harga}</div><ul>${p.fitur.map(f => `<li>${f}</li>`).join('')}</ul></label></div></div></section>
    <section class="ina-card ina-card--variant-basic kartu-db" id="blokPerpanjang" style="margin-top:0"><div class="ina-card__content"><h3>Pilih Metode Pembayaran</h3><p class="ket">Langkahnya sama dengan pembayaran upgrade.</p>
      <div style="margin-top:14px">${alert('info', 'Belum ada tagihan', 'Order perpanjangan dibuat saat Anda menekan Buat Virtual Account. Menekan Batal tidak membuat tagihan.')}</div>
      <div class="tombol-blok">${tombol('Lanjut pilih bank', 'primary', 'md', 'id="lanjutPerpanjang"', ik('panah', 16))}${tombol('Batal', 'secondary', 'md', 'id="batalPerpanjang"')}</div></div></section></div>`;
}
let jamTrial;
function jalankanJamTrial() { clearInterval(jamTrial); if ($('#sisaTrial')) jamTrial = setInterval(() => { const e = $('#sisaTrial'); if (!e) { clearInterval(jamTrial); return; } e.innerHTML = hitungTrial(); }, 1000); if ($('#sisaVa')) jalankanJamVa(); }

/* ---------- peta perjalanan di bilah prototipe (catatan prototipe, bukan bagian layar) ---------- */
const PETA = [
  ['Isi Registrasi', 'Lengkapi formulir, lalu tekan Daftar sekarang.'], ['Cek email', 'Buka tautan verifikasi di email.'], ['Verifikasi berhasil', 'Tekan Masuk sekarang.'],
  ['Masuk portal', 'Masuk dengan email dan kata sandi.'], ['Verifikasi dua langkah', 'Pilih Email OTP, lalu isi kode.'], ['Pilih paket Trial', 'Pilih Trial, lalu tekan Aktifkan Trial Gratis.'],
  ['Trial aktif', 'Tekan Masuk ke aplikasi e-PPAT.'], ['Masuk aplikasi kantor', 'Pilih simulasi Super Admin Trial.'], ['Pakai aplikasi Trial', 'Coba menu dan batas paket.'],
  ['Mulai berlangganan', 'Tekan tombol di bawah menu atau di spanduk.'], ['Masuk portal lagi', 'Hanya bila sesi portal sudah berakhir.'], ['Dasbor portal', 'Tekan Upgrade sekarang.'], ['Upgrade: pilih metode', 'Pilih Virtual Account.'],
  ['Upgrade: pilih bank', 'Pilih BRI, lalu tekan Buat Virtual Account.'], ['Upgrade: bayar', 'Tekan Simulasikan Transfer dari Bank di bilah ini.'], ['Enterprise aktif', 'Lihat Riwayat Transaksi atau kembali ke aplikasi.'],
  ['Riwayat Transaksi', 'Trial dan Upgrade tercatat terpisah.'], ['Kembali ke aplikasi kantor', 'Spanduk dan tombol Mulai berlangganan sudah hilang.'], ['Perpanjang langganan', 'Dipakai sebelum masa Enterprise berakhir.']];
function posisiPeta() {
  const l = S.layar;
  if (l === 'daftar') return 1; if (l === 'verif') return 2; if (l === 'verifOk') return 3;
  if (l === 'masuk' || l === 'metode' || l === 'otp') return S.balik ? 11 : l === 'masuk' ? 4 : 5;
  if (l === 'upgrade') return DB.va ? 15 : DB.metodeBayar ? 14 : 13;
  if (l === 'riwayat') return 17; if (l === 'perpanjang') return 19;
  return DB.ent ? 16 : S.keUpgrade ? 12 : DB.trial ? 7 : 6;
}
/* lencana paket di header, sama dengan tenant (HE-TRIAL-03) */
function gambarLencana() {
  const ada = $('#lencanaTrial'), tampil = DB.trial && !DB.ent, sisa = tampil ? Math.max(0, Math.ceil((DB.trial.akhir - DB.trial.mulai - (Date.now() - DB.trial.nyata)) / 864e5)) : 0;
  if (!tampil) { if (ada) ada.remove(); return; }
  const isi = `<span><span class="lt-opsi">Paket </span>Trial<span class="lt-opsi"> · sisa ${sisa} hari</span></span>`;
  if (ada) ada.innerHTML = isi; else $('#rootApp .top .spacer')?.insertAdjacentHTML('afterend', `<span class="ina-badge ina-badge--soft ina-badge--info ina-badge--sm ina-badge--rounded-full" id="lencanaTrial">${isi}</span>`);
}
function gambarBar() {
  gambarLencana();
  const nm = (S.data || {}).nama; if (nm) { document.querySelectorAll('#rootApp .top .uname').forEach(e => { if (e.textContent !== nm) e.textContent = nm; }); document.querySelectorAll('#rootApp .top .ava').forEach(e => { e.textContent = nm.split(/\s+/).slice(0, 2).map(x => x[0]).join('').toUpperCase(); }); }
  const n = posisiPeta(), [judul, aksi] = PETA[n - 1], bayar = S.layar === 'upgrade' && DB.va && !DB.ent;
  $('#barPerjalanan').innerHTML = `<span>Perjalanan:</span><b>Langkah ${n} dari ${PETA.length} · ${judul}</b><span class="sep">&bull;</span><span>${aksi}</span>
    ${bayar ? '<button class="pil utama" id="simBank">Simulasikan Transfer dari Bank</button>' : ''}
    <span class="kanan">${DB.trial && !DB.ent ? `<button class="pil" id="simPortal" aria-pressed="${portal}" title="Mengatur apakah Mulai Berlangganan meminta masuk portal lebih dulu">Sesi portal: ${portal ? 'aktif' : 'berakhir'}</button>` : ''}<button class="pil" id="bukaPeta">Peta perjalanan</button></span>`;
}
function bukaPeta() {
  const n = posisiPeta();
  dialog({ judul:'Peta perjalanan Trial ke Enterprise', lebar:true, isi:`<p>Langkah 8 sampai 10 berada di prototipe tenant. Langkah lain berada di portal Onboarding.</p><ol class="peta-trial">${PETA.map(([j, a], i) => `<li ${i + 1 === n ? 'aria-current="step" class="kini"' : ''}><b>${j}</b><span>${a}</span></li>`).join('')}</ol>`, tombol:[['Tutup', 'secondary', null]] });
}
const pilAktif = () => S.layar === 'dasbor' ? (DB.ent ? 'enterprise' : DB.trial ? 'trial' : 'dasbor') : S.layar;

/* ---------- Bantuan ---------- */
const bantuanDasborAsli = BANTUAN.dasbor;
const FAQ_TRIAL = [['Berapa lama Paket Trial berlaku?', '30 hari sejak Trial aktif. Sisa masa dan tanggal berakhirnya tampil di kartu Paket Trial aktif di Dasbor.'],
  ['Apa batas Paket Trial?', 'Trial berisi 10 transaksi dan paling banyak 5 pengguna, termasuk akun pemilik. Semua menu dapat dibuka. Tanda tangan dan stempel elektronik belum termasuk.'],
  ['Bagaimana cara upgrade ke Enterprise?', 'Tekan Upgrade sekarang di Dasbor atau Mulai Berlangganan di aplikasi kantor. Pilih Virtual Account, pilih BRI, tekan Buat Virtual Account, lalu transfer sebelum batas waktu. Trial tetap berjalan selama pembayaran belum diterima.'],
  ['Apakah data saya hilang setelah upgrade?', 'Tidak. Pengguna, order, dan alamat aplikasi tetap sama. Anda juga tidak perlu mendaftar ulang.'],
  ['Apakah saya menerima email aktivasi lagi setelah upgrade?', 'Tidak. Setelah upgrade, Anda menerima email Pembayaran Berhasil Diterima. Gunakan alamat aplikasi dan kata sandi yang sama.']];
BANTUAN.dasbor = () => DB.trial ? { judul:DB.ent ? 'Bantuan Paket Enterprise' : 'Bantuan Paket Trial', isi:`<p>${DB.ent ? 'Paket Enterprise kantor Anda sudah aktif.' : 'Paket Trial kantor Anda sudah aktif dan aplikasi siap digunakan.'}</p><h4 class="bantu-sub">Pertanyaan umum</h4>${fq('t', FAQ_TRIAL)}${kontak()}` } : bantuanDasborAsli();
BANTUAN.upgrade = () => ({ judul:'Bantuan Upgrade ke Enterprise', isi:`<p>Bayar paket Enterprise melalui Virtual Account untuk membuka akses penuh. Tagihan dibuat saat Anda menekan Buat Virtual Account.</p><h4 class="bantu-sub">Pertanyaan umum</h4>${fq('u', FAQ_TRIAL.slice(2))}${kontak()}` });
BANTUAN.perpanjang = () => ({ judul:'Bantuan Perpanjang Langganan', isi:`<p>Perpanjang paket Enterprise sebelum masa berlakunya habis. Tagihan dibuat saat Anda menekan Buat Virtual Account.</p>${kontak()}` });

/* ---------- daftar perubahan ---------- */
const SUMBER_TRIAL = 'Penelusuran live dev.eppat.id dan dev-app.eppat.id 6 Nov 2026; Panduan Trial ePPAT v3';
UBAH.push(
  { kode:'HE-TRIAL-01', bukanHE:true, versi:'v2', judul:'Trial aktif: status akun, sisa masa, dan batas paket jelas',
    isi:'Lencana menjadi "Status akun: Trial aktif" dan kalimat pembuka menyebut tanggal berakhir Trial. Kartu Paket Trial memuat hitung mundur, tanggal berakhir, batas paket, dan tombol Upgrade sekarang. Langkah berikutnya menunjuk ke aplikasi kantor.',
    lama:'Setelah Trial aktif, lencana tetap "STATUS AKUN: ONBOARDING" dan kalimat pembuka tetap meminta pengguna mengaktifkan akun PPAT Enterprise. Batas paket tidak tampil di kartu Trial.', ke:'tr-aktif', sorot:'#kartuTrial', sumber:SUMBER_TRIAL },
  { kode:'HE-TRIAL-02', bukanHE:true, versi:'v2', judul:'Email aktivasi tanpa kata sandi dan hanya sekali',
    isi:'Email Akun e-PPAT Anda Sudah Aktif dikirim sekali saat Trial aktif dan tidak memuat kata sandi. Saat upgrade, pengguna hanya menerima instruksi pembayaran dan Pembayaran Berhasil Diterima.',
    lama:'Email memuat kata sandi dalam teks biasa dan terkirim dua kali (saat Trial dan setelah upgrade). Email pembayaran menyebut konfigurasi instansi maksimal 1x24 jam, padahal aplikasi sudah aktif. Dasbor meminta "Cek email Anda untuk mendapatkan password login".', ke:'tr-aktif', sorot:'#emailTrial', sumber:SUMBER_TRIAL },
  { kode:'HE-TRIAL-03', bukanHE:true, versi:'v2', judul:'Tenant: satu istilah Trial, sisa masa terlihat, dan Mulai Berlangganan selalu ada',
    isi:'Lencana Paket Trial dengan sisa hari tampil di header portal dan tenant, lalu hilang setelah upgrade. Spanduk memakai istilah Trial dan menampilkan sisa hari. Tombol Mulai berlangganan selalu ada di bawah menu. Spanduk TERA tidak tampil untuk Super Admin karena TERA didaftarkan peran PPAT. Lihat dengan masuk sebagai Super Admin Trial.',
    lama:'Portal menyebut Trial, tenant menyebut Paket Gratis. Header tidak menunjukkan paket yang sedang dipakai, dan spanduk tidak menampilkan sisa hari. Spanduk TERA tetap meminta pendaftaran walaupun paket belum memuat tanda tangan dan stempel elektronik.', ke:'tr-aktif', sorot:null, sumber:SUMBER_TRIAL },
  { kode:'HE-TRIAL-04', bukanHE:true, versi:'v2', judul:'Batas paket dicegah sebelum mengisi formulir',
    isi:'Daftar Pengguna dan Permohonan AJB menampilkan pemakaian ("3 dari 5 pengguna", "1 dari 10 transaksi"). Saat batas tercapai, dialog muncul sebelum formulir dibuka, dengan kalimat manusiawi dan tombol Mulai berlangganan. Aturan yang sama berlaku saat menambah klien dari Permohonan AJB.',
    lama:'Pesan "batas paket langganan tercapai: paket Gratis maksimal 5 pengguna, upgrade untuk menambah" baru muncul setelah formulir diisi dan disimpan, tanpa tombol ke halaman upgrade. Akun pemilik tidak tampil tetapi ikut dihitung. Kartu menjanjikan 10 transaksi, sedangkan aplikasi menolak order kedua.', ke:'tr-aktif', sorot:null, sumber:SUMBER_TRIAL },
  { kode:'HE-TRIAL-05', bukanHE:true, versi:'v2', judul:'Masuk ke Aplikasi langsung membuka halaman Masuk',
    isi:'Tombol Masuk ke aplikasi e-PPAT membuka halaman Masuk tenant. Bila sesi tenant masih ada, tombol langsung membuka Dasbor.',
    lama:'Tombol membuka tab baru berisi Halaman Depan tenant, dan footer menampilkan pesan teknis "Master footer yang dipilih tidak ditemukan". Pengguna harus menekan Masuk lagi untuk melihat formulir.', ke:'tr-aktif', sorot:'#kartuSiap', sumber:SUMBER_TRIAL },
  { kode:'HE-TRIAL-06', bukanHE:true, versi:'v2', judul:'Mulai Berlangganan kembali ke Dasbor portal, tagihan dibuat saat Buat Virtual Account',
    isi:'Bila sesi portal masih aktif, Mulai Berlangganan langsung membuka Dasbor portal tanpa masuk ulang. Bila berakhir, pengguna masuk dulu, lalu kembali ke Dasbor yang sama. Kartu Upgrade disorot dan langkah berikutnya menunjuk ke Upgrade Sekarang. Membuka halaman Upgrade tidak membuat order.',
    lama:'Mulai Berlangganan langsung membuka halaman Upgrade. Alur masuk lalu kembali sudah ada di live dengan pesan "Silakan login terlebih dahulu untuk melanjutkan upgrade". Namun, membuka halaman Upgrade langsung memanggil renew-subscription walaupun pengguna belum memilih pembayaran.', ke:'tr-masuk', sorot:'#pesanBalik', sumber:SUMBER_TRIAL },
  { kode:'HE-TRIAL-07', bukanHE:true, versi:'v2', judul:'Progres Upgrade dan pesan berhasil setelah lunas',
    isi:'Progres Upgrade menunjukkan posisi pengguna dalam empat tahap, terpisah dari Progres Registrasi sehingga waktunya selalu urut. Setelah lunas, Dasbor menampilkan pesan berhasil, nomor order, masa berlaku, dan tombol Kembali ke Aplikasi e-PPAT.',
    lama:'Setelah bayar, halaman pindah ke Dasbor tanpa pesan berhasil. Proses Pembayaran dan Lunas (07.59) tampil sebelum Proses Administrasi dan Selesai (07.57). Lencana tetap "STATUS AKUN: ONBOARDING".', ke:'tr-ent', sorot:'#pesanBerhasil', sumber:SUMBER_TRIAL },
  { kode:'HE-TRIAL-08', bukanHE:true, versi:'v2', judul:'Riwayat Transaksi mencatat Trial dan Upgrade dengan nama yang benar',
    isi:'Riwayat memuat baris Paket Trial (Rp0, Gratis) dan baris Upgrade ke Enterprise. Metode ditulis Virtual Account BRI dan status berupa lencana. Selama Trial, tombol di atas tabel mengarah ke upgrade, bukan perpanjangan.',
    lama:'Hanya ada ORD-RENEW-…, sehingga upgrade tercatat sebagai perpanjangan dan Trial tidak tercatat. Metode tertulis VIRTUAL_ACCOUNT, dan Jatuh Tempo tetap tampil walaupun tagihan lunas.', ke:'tr-riwayat', sorot:'#tabelRiwayat', sumber:SUMBER_TRIAL },
  { kode:'HE-TRIAL-09', bukanHE:true, versi:'v2', judul:'Tenant berubah otomatis setelah upgrade',
    isi:'Tanpa masuk ulang, spanduk Trial dan tombol Mulai berlangganan hilang, batas paket terbuka, dan data masa Trial tetap ada. Tenant menampilkan pesan satu kali bahwa paket Enterprise sudah aktif.',
    lama:'Perubahan paket di tenant sudah otomatis, tetapi tidak ada pesan apa pun. Pengguna hanya melihat spanduk menghilang.', ke:'tr-ent', sorot:'#kartuSiap', sumber:SUMBER_TRIAL });
