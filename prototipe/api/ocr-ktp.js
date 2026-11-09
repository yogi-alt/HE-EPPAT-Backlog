// Perantara OCR KTP untuk prototipe (Vercel Function).
// Kunci API Onelabs hanya ada di variabel lingkungan Vercel OCR_API_KEY, tidak pernah dikirim ke peramban.
// Foto diteruskan ke layanan OCR lalu dibuang: tidak disimpan dan tidak dicatat.
const galat = (res, kode, code, message) => res.status(kode).json({ status:'error', error:{ code, message } });

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return galat(res, 405, 'METHOD_NOT_ALLOWED', 'Gunakan POST.'); }
  /* hanya halaman prototipe sendiri yang boleh memakai perantara ini */
  const asal = req.headers.origin;
  if (asal && new URL(asal).host !== req.headers.host) return galat(res, 403, 'FORBIDDEN', 'Asal permintaan tidak diizinkan.');
  const kunci = process.env.OCR_API_KEY;
  if (!kunci) return galat(res, 503, 'NOT_CONFIGURED', 'Layanan OCR belum diatur.');
  const gambar = req.body && req.body.image_base64;
  if (typeof gambar !== 'string' || !gambar) return galat(res, 400, 'INVALID_FILE', 'Foto KTP tidak ditemukan.');
  try {
    const r = await fetch((process.env.OCR_BASE_URL || 'https://ocr.onelabs.my.id') + '/v1/ktp/ocr', {
      method:'POST', headers:{ 'Content-Type':'application/json', 'X-API-Key':kunci }, body:JSON.stringify({ image_base64:gambar })
    });
    const j = await r.json();
    if (r.headers.get('retry-after')) res.setHeader('Retry-After', r.headers.get('retry-after'));
    /* hanya yang dipakai prototipe yang diteruskan */
    return res.status(r.status).json(j.status === 'error' ? { status:'error', error:j.error } : { status:'success', needs_review:j.needs_review, data:j.data, fields:j.fields });
  } catch (e) {
    return galat(res, 502, 'UPSTREAM_UNREACHABLE', 'Layanan OCR tidak dapat dihubungi.');
  }
};
