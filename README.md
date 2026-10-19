# MansX.Dev — Demo Toko Online + Panel Admin

[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![daisyUI](https://img.shields.io/badge/daisyUI-3.9-5a0ef8?logo=daisyui&logoColor=white)](https://daisyui.com)
[![PWA](https://img.shields.io/badge/PWA-ready-5A0FC8)](#-progressive-web-app)

**Proyek contoh** — situs bisnis satu halaman (single-page application) untuk jasa & produk
digital: VPS, bot WhatsApp, pembuatan website, SEO, dan desain grafis. Dilengkapi **toko online**,
**keranjang belanja dengan checkout via WhatsApp**, dan **panel admin** untuk mengelola seluruh
data.

> ⚠️ **Semua data di dalamnya contoh.** Produk, harga, testimoni, dan nomor telepon adalah data
> contoh supaya tiap seksi terlihat dalam keadaan terisi — bukan penawaran yang sedang berjalan.
> Dibuat oleh [MansxDev](https://github.com/MansxDev).

Dibangun dengan **React 19** + **Tailwind CSS** + **daisyUI**, tanpa TypeScript dan tanpa
React Router — tetap cepat, ringan, dan mudah di-deploy sebagai situs statis.

---

## ✨ Fitur Utama

### Publik (Pengunjung)
- **Hero & animasi halus** — GSAP + Framer Motion, loading animasi pada navigasi.
- **Produk digital** — pencarian, urutkan (harga/nama), filter kategori, dan detail produk dalam
  drawer (gambar, deskripsi, fitur, jumlah).
- **Layanan jasa** — kartu layanan dengan harga dan CTA WhatsApp.
- **Testimoni & FAQ** — daftar dinamis dari penyimpanan lokal.
- **Form kontak** — pesan tersimpan otomatis ke panel admin.
- **Keranjang belanja (cart)** — tersimpan di `localStorage`, kode promo (persen/Rp + minimal
  belanja), dan checkout 2 langkah yang mengirim pesanan langsung ke **WhatsApp**.
- **Mode terang/gelap** — tema kustom daisyUI, tersimpan di preferensi pengguna.
- **Navigasi pill sticky** — adaptasi React Bits, posisi tetap di tengah desktop, slot aksi
  (tema + keranjang) di mobile.

### Admin (`#admin`)
- **Login aman** — password di-hash (SHA-256 berulang + salt + pepper), penguncian akun setelah
  percobaan gagal, sesi dengan idle timeout 30 menit, dan audit log semua aktivitas.
- **Dashboard** — statistik produk/layanan/testimoni/FAQ/kupon/pesan + log aktivitas terbaru.
- **Manajemen data (CRUD)** — produk, layanan, testimoni, FAQ, dan kupon promo dari satu panel.
- **Pesan masuk** — inbox dari form kontak, tandai dibaca / hapus.
- **Pengaturan** — profil bisnis (nama, tagline, kontak, sosial media), ganti password, serta
  **export/import/reset data** dengan verifikasi ulang password.

### Teknis
- **Progressive Web App (PWA)** — `manifest.json` + service worker, bisa di-install di perangkat.
- **SEO** — Open Graph, Twitter Card, dan data terstruktur JSON-LD.
- **Aksesibilitas** — focus trap pada modal/drawer, label ARIA, navigasi keyboard (Esc).
- **Performa** — panel admin di-*lazy-load*, sehingga bundle utama tetap kecil.

---

## 🚀 Mulai Cepat

```bash
# 1. Install dependensi
npm install

# 2. Jalankan mode pengembangan (http://localhost:3000)
npm start

# 3. Build produksi ke folder /build
npm run build

# 4. Jalankan tes
npm test
```

> Di Linux, tambahkan `CI=true` untuk menghentikan proses bila ada error:
> `CI=true npm run build`

---

## 🧪 Skrip

| Skrip          | Keterangan                                                        |
| -------------- | ----------------------------------------------------------------- |
| `npm start`    | Menjalankan server pengembangan dengan hot-reload.                |
| `npm run build`| Build produksi (minified + hashed) ke folder `build/`.            |
| `npm test`     | Menjalankan test runner (Jest + React Testing Library).           |
| `npm run eject`| Mengekspos konfigurasi CRA (satu arah, tidak bisa dibatalkan).    |

---

## 🛠 Teknologi

| Teknologi          | Peran                                      |
| ------------------ | ------------------------------------------ |
| **React 19**       | UI framework                               |
| **Create React App 5** | Build tool, dev server, bundler       |
| **Tailwind CSS 3.4**  | Utility CSS framework                  |
| **daisyUI 3.9**    | Komponen UI + tema kustom (gelap/terang)   |
| **Framer Motion**  | Animasi modal, drawer, transisi            |
| **GSAP**           | Animasi teks & loading navigasi            |
| **react-hot-toast**| Notifikasi toast                           |
| **react-icons**    | Ikon Font Awesome 6                        |
| **react-tooltip**  | Tooltip pada elemen                        |
| **Web Crypto API** | Hash password admin (SHA-256 iteratif)     |

---

## 📁 Struktur Proyek

```
src/
├── App.jsx                  # Entry aplikasi + routing hash #admin
├── index.js                 # Mount React + registrasi service worker
├── components/
│   ├── layout/              # PillNav, CartDrawer, Footer, ThemeToggle,
│   │   │                    # UtilityCluster, AdminPanel
│   │   └── admin/           # AdminCrud, AdminDashboard, AdminMessages,
│   │                        # AdminSettings, ReauthModal
│   ├── sections/            # Hero, Product, Service, Testimonial, Faq, Contact
│   ├── ui/                  # Modal, ProductCard, ProductDetailDrawer, dst.
│   └── animations/          # BlurText, RotatingText (GSAP)
├── data/                    # store.js (state global) + data seed
│                            # (products, services, testimonials, faqs, promos)
├── hooks/                   # useCart, useTheme, useAdminAuth, useFocusTrap,
│                            # useScrollAnimation
├── utils/                   # auth.js, format.js, scroll.js
└── ...
```

### Penyimpanan Data

Seluruh data aplikasi disimpan di `localStorage` melalui `src/data/store.js`
(`useSyncExternalStore`). Kunci penyimpanan:

| Kunci                 | Isi                                   |
| --------------------- | ------------------------------------- |
| `mansx_products`      | Daftar produk digital                 |
| `mansx_services`      | Daftar layanan jasa                   |
| `mansx_testimonials`  | Testimoni pelanggan                   |
| `mansx_faqs`          | Pertanyaan umum                       |
| `mansx_promos`        | Kupon promo                           |
| `mansx_messages`      | Pesan dari form kontak                |
| `mansx_settings`      | Profil bisnis (nama, kontak, sosial)  |
| `mansx_audit`         | Log aktivitas admin                   |
| `mansx_cart`          | Isi keranjang belanja (via `useCart`) |

---

## 🖼 Gambar Produk

Gambar produk di [`public/produk/`](public/produk) adalah **ilustrasi SVG hasil skrip**, bukan
foto. Untuk membuat ulang:

```bash
node scripts/buat-gambar-produk.mjs
```

- **Kenapa dibuat sendiri:** sebelumnya seluruh 7 produk menunjuk ke *satu* gambar yang sama di
  host sementara (`files.catbox.moe`) — tampilannya berulang dan gambarnya bisa hilang kapan saja
  karena bukan milik kita.
- Produk di sini berupa jasa digital (VPS, bot WhatsApp, website), jadi ilustrasi memang lebih
  jujur daripada foto stok.
- Warna mengikuti tema daisyUI; jumlah lampu pada motif rak server mengikuti tingkat paket
  (Basic 1, Medium 2, Pro 3).
- Tiap berkas ±3 KB, tajam di semua ukuran layar, tanpa permintaan ke server luar.

Untuk produk baru: tambahkan satu baris pada daftar `PRODUK` di dalam skrip, lalu jalankan ulang.
Kalau nanti sudah punya foto asli, cukup ganti nilai `image` di `src/data/products.js`.

---

## 🔐 Panel Admin

Akses panel admin dengan menambahkan **`#admin`** pada URL, contoh:
`https://your-domain.com/#admin`.

- **Sandi demo:** `demo-mansxdev` — **wajib diganti saat login pertama**. Di layar masuk ada
  tombol *Isi sandi demo* supaya tidak perlu diketik.
- Sesi berakhir otomatis setelah 30 menit tidak aktif.
- Lihat detail keamanan dan batasannya di [SECURITY.md](SECURITY.md).

### Kenapa sandi demo ditulis terbuka

Aplikasi ini statis — seluruh kode terkirim ke peramban pengunjung. Sandi yang "disembunyikan" di
dalam kode tetap bisa dibaca siapa pun, jadi menyembunyikannya tidak menambah keamanan sedikit
pun; yang terjadi hanya demo ini tidak bisa dicoba orang lain. Yang benar-benar melindungi:

1. Ganti sandi setelah masuk (dipaksa oleh flag `mustChange`).
2. Panel admin **bukan** tempat penyimpanan data sensitif — semua isinya ada di
   `localStorage` peramban, bukan di server.

Kalau nanti butuh panel yang sungguhan (banyak admin, data pelanggan asli), panelnya harus
dipindah ke server dengan login di sisi server.

---

## 🖥 PWA

Untuk mengaktifkan instalasi PWA, build produksi dijalankan melalui HTTPS (atau localhost).
Service worker di-registrasi otomatis saat `NODE_ENV === 'production'` (`src/index.js`).

---

## 🤝 Kontribusi

Silakan baca [CONTRIBUTING.md](CONTRIBUTING.md) sebelum berkontribusi.

## 📜 Lisensi

Proyek ini dilisensikan di bawah [Lisensi MIT](LICENSE).

---

## 📌 Kontak

- **WhatsApp:** +62 815-4654-3913
- **Email:** [mansx.develover@gmail.com](mailto:mansx.develover@gmail.com)
- **GitHub:** [@MansxDev](https://github.com/MansxDev)