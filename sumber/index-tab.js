// index.html: tab Dari HE / Penyesuaian IDDS Tenant / Platform / Onboarding. node index-tab.js
const fs = require('fs');
const f = '../prototipe/index.html';
let t = fs.readFileSync(f, 'utf8');
const G = [
  /* gaya tab */
  ['  td.chev{width:40px;color:var(--muted)}',
   `  td.chev{width:40px;color:var(--muted)}
  .tab{display:flex;gap:4px;margin-top:20px;border-bottom:1px solid var(--line);overflow-x:auto}
  .tab button{flex:none;display:inline-flex;align-items:center;gap:8px;padding:10px 14px;border:0;border-bottom:2px solid transparent;background:none;font:600 14px Inter,sans-serif;color:var(--muted);cursor:pointer;white-space:nowrap}
  .tab button[aria-selected="true"]{color:var(--green);border-bottom-color:var(--green)}
  .tab button:focus-visible{outline:2px solid var(--green);outline-offset:-2px;border-radius:6px 6px 0 0}
  .tab .n{min-width:20px;padding:0 6px;border-radius:999px;background:#EEF3F1;font-size:11px;color:#4C5D58}
  .tab button[aria-selected="true"] .n{background:var(--green);color:#fff}
  .ket-tab{margin:12px 0 0;font-size:13px;line-height:20px;color:var(--muted)}
  tr.kosong td{padding:28px 16px;text-align:center;color:var(--muted);cursor:default}`],
  /* teks pengantar */
  ['dengan label <span class="lenc" style="margin:0">usulan &middot; kode</span>.</div>',
   `dengan label <span class="lenc" style="margin:0">usulan &middot; kode</span>. Tab <b>Penyesuaian IDDS</b> berisi menu yang tidak dinilai HE: tampilan disesuaikan dengan INA Digital Design System dan bahasanya dibakukan, tanpa mengubah isi live.</div>

    <div class="tab" role="tablist" aria-label="Kelompok prototipe">
      <button type="button" role="tab" id="tab-he" data-tab="he" aria-selected="true">Dari HE <span class="n"></span></button>
      <button type="button" role="tab" id="tab-tenant" data-tab="tenant" aria-selected="false">Penyesuaian IDDS Tenant <span class="n"></span></button>
      <button type="button" role="tab" id="tab-platform" data-tab="platform" aria-selected="false">Penyesuaian IDDS Platform <span class="n"></span></button>
      <button type="button" role="tab" id="tab-onboarding" data-tab="onboarding" aria-selected="false">Penyesuaian IDDS Onboarding <span class="n"></span></button>
    </div>
    <p class="ket-tab" id="ketTab"></p>`],
  /* salah ketik */
  ['cek kesiapan CA sejak awal, , cari dan saring daftar akta', 'cek kesiapan CA sejak awal, cari dan saring daftar akta'],
  /* skrip saring: tab + cari */
  [`  const B = [...document.querySelectorAll('tr.baris')];
  const jml = document.getElementById('jml');
  function saring(q) {
    q = q.trim().toLowerCase(); let n = 0;
    B.forEach(r => { const ok = !q || r.innerText.toLowerCase().includes(q); r.hidden = !ok; if (ok) n++; });
    jml.textContent = \`\${n} prototipe\`;
  }
  document.getElementById('cari').addEventListener('input', e => saring(e.target.value));
  B.forEach(r => r.addEventListener('click', () => location.href = r.dataset.href));
  saring('');`,
   `  const B = [...document.querySelectorAll('tr.baris')];
  const jml = document.getElementById('jml'), cari = document.getElementById('cari'), tbody = document.getElementById('baris');
  const KET = {
    he:'Prototipe dari temuan laporan Heuristic Evaluation, lengkap dengan usulan perbaikan berlabel kode HE.',
    tenant:'Aplikasi kantor PPAT (dev-app.eppat.id/t/…): menu yang tidak dinilai HE, disesuaikan dengan IDDS.',
    platform:'Platform operator Peruri (dev.eppat.id, akun operator): menu yang tidak dinilai HE, disesuaikan dengan IDDS.',
    onboarding:'Platform Onboarding calon PPAT (dev.eppat.id): halaman yang tidak dinilai HE, disesuaikan dengan IDDS.'
  };
  const tabAwal = (location.hash || '').slice(1);
  let tab = KET[tabAwal] ? tabAwal : 'he';
  const kosong = document.createElement('tr'); kosong.className = 'kosong'; kosong.innerHTML = '<td colspan="4"></td>'; tbody.appendChild(kosong);
  function saring() {
    const q = cari.value.trim().toLowerCase(); let n = 0;
    B.forEach(r => { const ok = r.dataset.tab === tab && (!q || r.innerText.toLowerCase().includes(q)); r.hidden = !ok; if (ok) n++; });
    document.querySelectorAll('.tab button').forEach(b => { const on = b.dataset.tab === tab; b.setAttribute('aria-selected', on); b.querySelector('.n').textContent = B.filter(r => r.dataset.tab === b.dataset.tab).length; });
    document.getElementById('ketTab').textContent = KET[tab];
    const total = B.filter(r => r.dataset.tab === tab).length;
    kosong.hidden = n > 0;
    kosong.firstChild.textContent = total ? 'Tidak ada prototipe yang cocok dengan pencarian.' : 'Prototipe untuk kelompok ini sedang disiapkan.';
    jml.textContent = \`\${n} prototipe\`;
  }
  cari.addEventListener('input', saring);
  document.querySelector('.tab').addEventListener('click', e => { const b = e.target.closest('[data-tab]'); if (!b) return; tab = b.dataset.tab; history.replaceState(null, '', '#' + tab); saring(); });
  document.querySelector('.tab').addEventListener('keydown', e => { if (!['ArrowLeft', 'ArrowRight'].includes(e.key)) return; const t = [...document.querySelectorAll('.tab button')], i = t.findIndex(b => b.dataset.tab === tab), j = (i + (e.key === 'ArrowRight' ? 1 : t.length - 1)) % t.length; t[j].focus(); t[j].click(); });
  B.forEach(r => r.addEventListener('click', () => location.href = r.dataset.href));
  saring();`]
];
let gagal = 0;
for (const [a, b] of G) { if (t.includes(a)) t = t.replace(a, b); else { console.log('TIDAK KETEMU:', a.slice(0, 70)); gagal++; } }
/* semua baris prototipe yang ada = Dari HE */
t = t.split('<tr class="baris" data-href=').join('<tr class="baris" data-tab="he" data-href=');
fs.writeFileSync(f, t);
console.log(gagal ? `gagal ${gagal}` : 'OK', '| baris HE:', (t.match(/data-tab="he" data-href/g) || []).length);
