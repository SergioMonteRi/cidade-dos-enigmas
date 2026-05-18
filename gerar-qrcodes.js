import QRCode from 'qrcode';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_URL = 'https://cidade-dos-enigmas.vercel.app/carta';
const TOTAL = 20;
const OUTPUT_DIR = join(__dirname, 'qrcodes');

const promises = Array.from({ length: TOTAL }, (_, i) => {
  const n = i + 1;
  const url = `${BASE_URL}/${n}`;
  const file = join(OUTPUT_DIR, `carta-${String(n).padStart(2, '0')}.png`);
  return QRCode.toFile(file, url, {
    width: 400,
    margin: 2,
    color: { dark: '#0A1628', light: '#FFFFFF' },
    errorCorrectionLevel: 'M',
  }).then(() => console.log(`✓ carta-${String(n).padStart(2, '0')}.png → ${url}`));
});

await Promise.all(promises);
console.log(`\n✅ ${TOTAL} QR codes gerados em /qrcodes`);
