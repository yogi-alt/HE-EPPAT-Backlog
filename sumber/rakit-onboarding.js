// Menyisipkan aset platform Onboarding (latar hero & logo dari dev.eppat.id) ke prototipe yang sudah dirakit rakit-idds.js.
// node rakit-onboarding.js <berkas.html>   (diubah di tempat)
const fs = require('fs'), path = require('path');
const A = n => fs.readFileSync(path.join(__dirname, 'aset', 'onboarding', n + '.txt'), 'utf8');
const f = path.resolve(process.argv[2]);
let t = fs.readFileSync(f, 'utf8');
const PETA = { __OB_HERO__:'hero', __OB_LOGO__:'logo-e-ppat', __OB_LOGO_LIGHT__:'logo-e-ppat-light', __OB_PERURI__:'logo-peruri', __OB_ATR__:'logo-atr', __OB_IPPAT__:'logo-pp-ippat' };
for (const [k, n] of Object.entries(PETA)) t = t.split(k).join(A(n));
if (/__OB_[A-Z_]+__/.test(t)) { console.error('placeholder tersisa'); process.exit(1); }
fs.writeFileSync(f, t); console.log('OK aset onboarding', f, t.length, 'byte');
