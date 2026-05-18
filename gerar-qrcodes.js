import QRCode from 'qrcode';
import { createCanvas, loadImage } from '@napi-rs/canvas';
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const BASE_URL  = 'https://cidade-dos-enigmas.vercel.app/carta';
const OUTPUT_DIR = join(__dirname, 'qrcodes');
const SIZE      = 400;  // px do QR code
const BG_SIZE   = 90;   // px do fundo branco do emoji
const RADIUS    = 24;   // border-radius do fundo
const FONT_SIZE = 52;   // tamanho do emoji

const CARDS = [
  { id:  1, emoji: '🏫', nome: 'Escola'               },
  { id:  2, emoji: '🥖', nome: 'Padaria'              },
  { id:  3, emoji: '🏦', nome: 'Banco'                },
  { id:  4, emoji: '🏋️', nome: 'Academia'             },
  { id:  5, emoji: '🌿', nome: 'Área Verde'           },
  { id:  6, emoji: '🚔', nome: 'Delegacia'            },
  { id:  7, emoji: '🌊', nome: 'Mar'                  },
  { id:  8, emoji: '🛒', nome: 'Supermercado'         },
  { id:  9, emoji: '🛍️', nome: 'Shopping'             },
  { id: 10, emoji: '✈️', nome: 'Aeroporto'            },
  { id: 11, emoji: '🏥', nome: 'Hospital'             },
  { id: 12, emoji: '🏛️', nome: 'Museu'               },
  { id: 13, emoji: '⚽', nome: 'Campo de Futebol'     },
  { id: 14, emoji: '💧', nome: 'Córrego'              },
  { id: 15, emoji: '🪦', nome: 'Cemitério'            },
  { id: 16, emoji: '🏙️', nome: 'Praça'               },
  { id: 17, emoji: '🌳', nome: 'Parque'               },
  { id: 18, emoji: '⛪', nome: 'Igreja'               },
  { id: 19, emoji: '🌲', nome: 'Bosque'               },
  { id: 20, emoji: '🏢', nome: 'Conjunto Habitacional'},
];

function drawRoundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y,     x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x,     y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x,     y,     x + r, y);
  ctx.closePath();
}

for (const { id, emoji, nome } of CARDS) {
  const url  = `${BASE_URL}/${id}`;
  const file = join(OUTPUT_DIR, `carta-${String(id).padStart(2, '0')}.png`);

  // 1. Gerar QR como base64 PNG (errorCorrectionLevel H suporta 30% de área coberta)
  const dataUrl = await QRCode.toDataURL(url, {
    width: SIZE,
    margin: 2,
    color: { dark: '#0A1628', light: '#FFFFFF' },
    errorCorrectionLevel: 'H',
  });

  // 2. Carregar QR no canvas
  const qrImg  = await loadImage(Buffer.from(dataUrl.split(',')[1], 'base64'));
  const canvas = createCanvas(SIZE, SIZE);
  const ctx    = canvas.getContext('2d');
  ctx.drawImage(qrImg, 0, 0, SIZE, SIZE);

  // 3. Fundo branco arredondado com sombra suave
  const bx = SIZE / 2 - BG_SIZE / 2;
  const by = SIZE / 2 - BG_SIZE / 2;

  ctx.shadowColor   = 'rgba(0,0,0,0.18)';
  ctx.shadowBlur    = 10;
  ctx.shadowOffsetY = 2;
  ctx.fillStyle     = '#FFFFFF';
  drawRoundRect(ctx, bx, by, BG_SIZE, BG_SIZE, RADIUS);
  ctx.fill();

  // 4. Emoji centrado
  ctx.shadowColor   = 'transparent';
  ctx.shadowBlur    = 0;
  ctx.shadowOffsetY = 0;
  ctx.font          = `${FONT_SIZE}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", serif`;
  ctx.textAlign     = 'center';
  ctx.textBaseline  = 'middle';
  ctx.fillText(emoji, SIZE / 2, SIZE / 2 + 2);

  writeFileSync(file, canvas.toBuffer('image/png'));
  console.log(`✓ carta-${String(id).padStart(2, '0')}.png  ${emoji}  ${nome}`);
}

console.log(`\n✅ ${CARDS.length} QR codes gerados em /qrcodes`);
