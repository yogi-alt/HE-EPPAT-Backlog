// Riwayat + baris index tab Platform untuk Platform · Masuk (IDDS-PL-01…10). node tambah-pl-masuk.js
const fs = require('fs');
const j = JSON.parse(fs.readFileSync('backlog-he.json', 'utf8'));
const r = { tanggal:'2026-10-26', kode:'IDDS-PL-01–10', perubahan:'Prototipe penyesuaian IDDS halaman Masuk platform (dev-app.eppat.id/platform) dibuat dari kode live dan prototipe Masuk tenant: Masuk, galat, verifikasi 2 faktor, ganti kata sandi, akun bukan admin platform, pemeliharaan, serta Bantuan per layar.', berkas:'prototipe/Backlog-IDDS-PL-MASUK-Prototype.html; sumber/pl-masuk-badan.html' };
if (!j.riwayat.some(x => x.perubahan === r.perubahan)) j.riwayat.push(r);
fs.writeFileSync('backlog-he.json', JSON.stringify(j, null, 2));
const f = '../prototipe/index.html'; let t = fs.readFileSync(f, 'utf8');
const baris = `      <tr class="baris" data-tab="platform" data-href="Backlog-IDDS-PL-MASUK-Prototype.html">
        <td class="kode">IDDS-PL-MASUK</td>
        <td><div class="nm">Platform · Masuk</div><div class="isi">Penyesuaian IDDS halaman masuk admin platform (dev-app.eppat.id/platform): Masuk, galat di dalam kartu, verifikasi 2 faktor, ganti kata sandi, akun bukan admin platform, dan layar pemeliharaan, serta Bantuan per layar. Masuk berhasil membuka Dasbor Platform.</div><span class="lenc">10 penyesuaian · IDDS-PL-01–10</span></td>
        <td class="tgl"><time datetime="2026-10-26">26 Okt 2026</time></td>
        <td class="chev"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></td>
      </tr>
`;
if (!t.includes('Backlog-IDDS-PL-MASUK-Prototype.html')) t = t.replace('        </tbody>', baris + '        </tbody>');
fs.writeFileSync(f, t);
console.log(j.riwayat.length, 'riwayat | index platform:', (t.match(/data-tab="platform" data-href/g) || []).length);
