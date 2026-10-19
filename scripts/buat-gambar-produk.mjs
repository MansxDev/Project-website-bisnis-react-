/**
 * Membuat gambar produk untuk folder public/produk/.
 *
 * Kenapa dibuat sendiri, bukan pakai foto:
 * - Sebelumnya semua 7 produk menunjuk ke SATU gambar yang sama di host
 *   sementara (files.catbox.moe) — gambarnya bisa hilang kapan saja dan
 *   tidak membedakan satu produk dari produk lain.
 * - Produk di sini berupa jasa digital (VPS, bot WhatsApp, website), jadi
 *   ilustrasi lebih jujur daripada foto stok.
 *
 * Jalankan: node scripts/buat-gambar-produk.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const AKAR = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const TUJUAN = resolve(AKAR, 'public/produk');

const LEBAR = 800;
const TINGGI = 450;
const HURUF = "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

/** Palet mengikuti tema daisyUI yang sudah dipakai situs (indigo/purple/cyan). */
const WARNA = {
  vps: ['#6366f1', '#3730a3'],
  'bot-wa': ['#a855f7', '#6b21a8'],
  website: ['#06b6d4', '#0e7490'],
};

const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Rak server: jumlah lampu menyala mengikuti tingkat paket. */
const motifServer = (tingkat) => {
  const baris = [0, 1, 2, 3]
    .map((i) => {
      const y = 96 + i * 66;
      const nyala = i < tingkat;
      return `
    <g>
      <rect x="470" y="${y}" width="250" height="50" rx="10" fill="#ffffff" opacity="${nyala ? 0.16 : 0.09}" />
      <circle cx="498" cy="${y + 25}" r="6" fill="#ffffff" opacity="${nyala ? 0.95 : 0.35}" />
      <rect x="520" y="${y + 19}" width="${nyala ? 150 : 96}" height="12" rx="6" fill="#ffffff" opacity="${nyala ? 0.6 : 0.28}" />
      <rect x="668" y="${y + 18}" width="30" height="14" rx="7" fill="#ffffff" opacity="${nyala ? 0.5 : 0.22}" />
    </g>`;
    })
    .join('');
  return baris;
};

/** Gelembung percakapan berisi tanda bot. */
const motifBot = () => `
    <g>
      <rect x="470" y="104" width="252" height="112" rx="26" fill="#ffffff" opacity="0.18" />
      <path d="M498 216 L498 250 L536 216 Z" fill="#ffffff" opacity="0.18" />
      <rect x="504" y="138" width="76" height="46" rx="14" fill="#ffffff" opacity="0.85" />
      <circle cx="528" cy="161" r="5" fill="#4c1d95" />
      <circle cx="556" cy="161" r="5" fill="#4c1d95" />
      <rect x="596" y="146" width="102" height="13" rx="6.5" fill="#ffffff" opacity="0.6" />
      <rect x="596" y="170" width="72" height="13" rx="6.5" fill="#ffffff" opacity="0.35" />
      <rect x="596" y="252" width="182" height="64" rx="20" fill="#ffffff" opacity="0.14" />
      <rect x="620" y="274" width="134" height="12" rx="6" fill="#ffffff" opacity="0.55" />
      <rect x="620" y="294" width="92" height="12" rx="6" fill="#ffffff" opacity="0.4" />
      <path d="M626 244 L626 268 L652 244 Z" fill="#ffffff" opacity="0.14" />
    </g>`;

/** Jendela peramban. */
const motifPeramban = () => `
    <g>
      <rect x="462" y="92" width="272" height="266" rx="20" fill="#ffffff" opacity="0.16" />
      <rect x="462" y="92" width="272" height="42" rx="20" fill="#ffffff" opacity="0.22" />
      <rect x="462" y="120" width="272" height="14" fill="#ffffff" opacity="0.22" />
      <circle cx="490" cy="113" r="6" fill="#ffffff" opacity="0.8" />
      <circle cx="510" cy="113" r="6" fill="#ffffff" opacity="0.55" />
      <circle cx="530" cy="113" r="6" fill="#ffffff" opacity="0.4" />
      <rect x="486" y="156" width="224" height="72" rx="12" fill="#ffffff" opacity="0.32" />
      <rect x="486" y="244" width="104" height="14" rx="7" fill="#ffffff" opacity="0.6" />
      <rect x="486" y="270" width="150" height="12" rx="6" fill="#ffffff" opacity="0.35" />
      <rect x="486" y="292" width="120" height="12" rx="6" fill="#ffffff" opacity="0.28" />
      <rect x="486" y="320" width="96" height="26" rx="13" fill="#ffffff" opacity="0.7" />
    </g>`;

const PRODUK = [
  { berkas: 'vps-basic', kategori: 'VPS & Hosting', judul: 'VPS Basic', spek: '1 vCPU · 1GB RAM · 20GB SSD', kategoriKunci: 'vps', motif: motifServer(1) },
  { berkas: 'vps-medium', kategori: 'VPS & Hosting', judul: 'VPS Medium', spek: '2 vCPU · 4GB RAM · 50GB SSD', kategoriKunci: 'vps', motif: motifServer(2) },
  { berkas: 'vps-pro', kategori: 'VPS & Hosting', judul: 'VPS Pro', spek: '4 vCPU · 8GB RAM · 100GB SSD', kategoriKunci: 'vps', motif: motifServer(3) },
  { berkas: 'bot-wa-marketing', kategori: 'Bot WhatsApp', judul: 'Bot Marketing', spek: 'Auto-reply & broadcast', kategoriKunci: 'bot-wa', motif: motifBot() },
  { berkas: 'bot-wa-support', kategori: 'Bot WhatsApp', judul: 'Bot Support', spek: 'Customer service otomatis', kategoriKunci: 'bot-wa', motif: motifBot() },
  { berkas: 'website-toko', kategori: 'Website', judul: 'Website Toko', spek: 'Full CMS & payment gateway', kategoriKunci: 'website', motif: motifPeramban() },
  { berkas: 'website-perusahaan', kategori: 'Website', judul: 'Website Perusahaan', spek: 'Profil perusahaan profesional', kategoriKunci: 'website', motif: motifPeramban() },
];

const buat = ({ kategori, judul, spek, kategoriKunci, motif, berkas }) => {
  const [dari, ke] = WARNA[kategoriKunci];
  // Judul panjang dikecilkan supaya tidak menabrak motif di sisi kanan
  // (kartu memotong gambar, jadi ruangnya lebih sempit dari 800px).
  const ukuranJudul = judul.length > 13 ? 46 : 58;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${LEBAR} ${TINGGI}" width="${LEBAR}" height="${TINGGI}" role="img" aria-label="${esc(judul)}">
  <defs>
    <linearGradient id="latar-${berkas}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${dari}" />
      <stop offset="1" stop-color="${ke}" />
    </linearGradient>
    <pattern id="titik-${berkas}" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.5" fill="#ffffff" opacity="0.12" />
    </pattern>
  </defs>

  <rect width="${LEBAR}" height="${TINGGI}" fill="url(#latar-${berkas})" />
  <rect width="${LEBAR}" height="${TINGGI}" fill="url(#titik-${berkas})" />

  ${motif}

  <text x="72" y="140" fill="#ffffff" opacity="0.8" font-family="${HURUF}" font-size="19" font-weight="600" letter-spacing="3.5">${esc(kategori.toUpperCase())}</text>
  <text x="72" y="216" fill="#ffffff" font-family="${HURUF}" font-size="${ukuranJudul}" font-weight="700" letter-spacing="-1">${esc(judul)}</text>
  <text x="72" y="268" fill="#ffffff" opacity="0.85" font-family="${HURUF}" font-size="25">${esc(spek)}</text>
  <rect x="72" y="310" width="120" height="6" rx="3" fill="#ffffff" opacity="0.5" />
</svg>
`;
};

mkdirSync(TUJUAN, { recursive: true });
PRODUK.forEach((p) => {
  const berkas = resolve(TUJUAN, `${p.berkas}.svg`);
  writeFileSync(berkas, buat(p), 'utf8');
  console.log('dibuat:', `public/produk/${p.berkas}.svg`);
});
console.log(`\n${PRODUK.length} gambar produk dibuat di public/produk/`);
