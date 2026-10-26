// Simpan logo & latar live sebagai aset lokal Peruri (sekali jalan), diambil dari prototipe TERA yang sudah dirakit.
// Agar perakit tidak bergantung pada berkas environment Perdana Niaga.
const fs = require('fs'), path = require('path');
const d = __dirname;
const ref = fs.readFileSync(path.join(d, '..', 'prototipe', 'Backlog-HE-TERA-Prototype.html'), 'utf8');
const bg = ref.match(/\.content\{flex:1;background-color:var\(--ina-background-secondary\);(background-image:url\("data:image\/jpeg;base64,[^"]+"\);[^}]*)\}/);
const logo = ref.match(/<div class="brand"><img src="(data:image\/png;base64,[^"]+)"/);
if (!bg || !logo) { console.error('aset tidak ketemu di TERA', !!bg, !!logo); process.exit(1); }
fs.mkdirSync(path.join(d, 'aset'), { recursive: true });
fs.writeFileSync(path.join(d, 'aset', 'latar.css.txt'), bg[1]);
fs.writeFileSync(path.join(d, 'aset', 'logo.txt'), logo[1]);
console.log('OK aset/latar.css.txt', bg[1].length, '| aset/logo.txt', logo[1].length);
