const fs = require('fs'), vm = require('vm');
const t = fs.readFileSync('minuta2-badan.html', 'utf8');
const a = t.indexOf('const UBAH = ['); let i = t.indexOf('[', a), d = 0, s = null, z;
for (let k = i; k < t.length; k++) { const c = t[k]; if (s) { if (c === '\\') { k++; continue; } if (c === s) s = null; continue; } if (c === "'" || c === '"' || c === '`') { s = c; continue; } if (c === '[') d++; if (c === ']' && --d === 0) { z = k + 1; break; } }
const U = vm.runInNewContext('(' + t.slice(i, z) + ')', { usulan: k => k, est: x => x, ik: () => '', badge: x => x, esc: x => x, tombol: x => x, tanya: (a, b) => a });
const u = U.find(x => x.kode === 'HE-MINUTA-07'); const bersih = s => String(s || '').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const j = JSON.parse(fs.readFileSync('backlog-he.json', 'utf8'));
const it = { kode:'HE-MINUTA-07', fitur:'Penyusunan Akta', judul:bersih(u.judul), saat_ini:bersih(u.lama), usulan:bersih(u.isi), prinsip:'H8 Aesthetic and Minimalist Design; H6 Recognition Rather Than Recall; H4 Consistency and Standards', halaman:'UX Metric Lab, Highlight #4 (skor 47,1)', prioritas:'Sedang', layar:'Akta › Penyusunan Akta › editor naskah', acuan:'prototipe/Backlog-HE-MINUTA-V2-Prototype.html › Daftar perubahan › HE-MINUTA-07', selesai_bila:'Editor naskah tampil dalam tiga area (Navigasi, kertas seperti hasil cetak, panel Bagian) dengan satu bilah menu dan satu bilah alat. Kedua panel dapat ditutup, dan semua fitur tetap sama dengan live.', status:'Prototipe siap', catatan:'Usulan tampilan saja; fitur sama dengan live. Prototipe Penyusunan Akta lama tetap tersedia sebagai pembanding.', tanggal:'2026-10-27' };
const ada = j.item.findIndex(x => x.kode === 'HE-MINUTA-07'); if (ada >= 0) j.item[ada] = it; else { const p = j.item.findIndex(x => x.kode === 'HE-MINUTA-06'); j.item.splice(p + 1, 0, it); }
const r = { tanggal:'2026-10-27', kode:'HE-MINUTA-07', perubahan:'Prototipe baru Penyusunan Akta v2 (usulan tampilan): editor naskah ala pengolah kata dengan tiga area (Navigasi, kertas seperti hasil cetak, panel Bagian), bilah menu dan satu bilah alat, panel yang dapat ditutup, serta laci di ponsel. Fitur tetap sama dengan live, Bantuan memakai isi yang sama, dan prototipe Penyusunan Akta lama dipertahankan sebagai pembanding.', berkas:'prototipe/Backlog-HE-MINUTA-V2-Prototype.html' };
if (!j.riwayat.some(x => x.perubahan === r.perubahan)) j.riwayat.push(r);
fs.writeFileSync('backlog-he.json', JSON.stringify(j, null, 2)); console.log('HE-MINUTA-07:', it.judul);
let ix = fs.readFileSync('../prototipe/index.html', 'utf8');
if (!ix.includes('data-href="Backlog-HE-MINUTA-V2-Prototype.html"')) {
  const m = ix.match(/      <tr class="baris" data-tab="he" data-href="Backlog-HE-MINUTA-Prototype.html">[\s\S]*?<\/tr>\n/);
  const baru = `      <tr class="baris" data-tab="he" data-href="Backlog-HE-MINUTA-V2-Prototype.html">
        <td class="kode">HE-MINUTA-V2</td>
        <td><div class="nm">Penyusunan Akta v2 — usulan tampilan</div><div class="isi">Usulan tampilan editor naskah ala pengolah kata untuk temuan HE "editor terlalu padat" dan "kurva belajar tinggi": tiga area (Navigasi, kertas seperti hasil cetak, panel Bagian), satu bilah menu dan satu bilah alat, panel dapat ditutup, serta laci di ponsel. Fitur sama dengan live; bandingkan dengan prototipe Penyusunan Akta.</div><span class="lenc">7 perubahan · HE-MINUTA-01–07</span></td>
        <td class="tgl"><time datetime="2026-10-27">27 Okt 2026</time></td>
        <td class="chev"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></td>
      </tr>
`;
  ix = m ? ix.replace(m[0], m[0] + baru) : ix.replace('        </tbody>', baru + '        </tbody>'); fs.writeFileSync('../prototipe/index.html', ix); console.log('index: ditambah', m ? 'setelah Penyusunan Akta' : 'di akhir'); }