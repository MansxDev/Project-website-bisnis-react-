# Changelog

Semua perubahan penting pada proyek ini akan dicatat di file ini.

Format mengikuti [Keep a Changelog](https://keepachangelog.com/id-ID/1.1.0/) dan
versi mengikuti [Semantic Versioning](https://semver.org/lang/id/).

## [Unreleased]

### Fixed
- **Gambar produk:** seluruh produk sebelumnya menunjuk ke satu URL yang sama di host sementara
  (`files.catbox.moe`) — tampilannya berulang dan gambarnya bisa hilang kapan saja. Diganti
  ilustrasi SVG lokal di `public/produk/` yang dibuat oleh `scripts/buat-gambar-produk.mjs`.
  Field `image` pada layanan yang tidak pernah dipakai komponen mana pun juga dihapus.
- **Judul hero:** H1 sebelumnya hanya berbunyi "Wujudkan" — satu kata, kalimatnya tidak selesai.
  Dilengkapi menjadi "Wujudkan usaha digitalmu".
- **Tautan mati:** ikon sosial yang tidak diisi tidak lagi dirender sebagai `href="#"`. GitHub
  diarahkan ke profil pemilik, dan tautan ke akun milik orang lain (`instagram.com/shophosting`)
  dihapus.

### Changed
- **Sandi admin demo:** `admin123` → `demo-mansxdev`, ditampilkan terbuka di layar login (dengan
  tombol *Isi sandi demo*) dan didokumentasikan di README serta SECURITY.md. Tetap wajib diganti
  setelah masuk.
- **Statistik hero:** "50+ Klien Puas" dan "100+ Proyek Selesai" — angka yang tidak pernah benar
  — diganti angka yang benar-benar diambil dari data: jumlah produk, jumlah layanan, dan janji
  balasan WhatsApp di bawah 24 jam.
- **Klaim yang tidak bisa ditepati:** "Support 24/7" pada layanan hosting diganti "Bantuan
  WhatsApp", dan masa garansi bug di FAQ diselaraskan menjadi 14 hari.
- **Label demo:** hero dan seksi testimoni menyatakan bahwa seluruh isi di halaman ini data
  contoh.

## [1.0.0] - 2026-08-17

### Added
- **Restrukturisasi menyeluruh**: kode diorganisir ke `components/layout`, `components/sections`,
  `components/ui`, `data`, `hooks`, dan `utils`.
- **Penyimpanan data global** (`src/data/store.js`): state berbasis `useSyncExternalStore` dengan
  persistensi `localStorage` untuk produk, layanan, testimoni, FAQ, promo, pesan, pengaturan,
  dan audit.
- **Keranjang belanja** (`useCart` + `CartDrawer`): persisten, kode promo (persen / nominal +
  minimal belanja), dan checkout 2 langkah yang mengirim pesanan via **WhatsApp**.
- **Detail produk** (`ProductDetailDrawer`): gambar, deskripsi, fitur, jumlah, tambah ke keranjang,
  dan beli langsung.
- **Pencarian & pengurutan produk** di `ProductSection`.
- **Section baru**: `TestimonialSection`, `FaqSection`, dan `ContactSection` dengan form yang
  tersimpan ke panel admin.
- **Panel admin** (`#admin`):
  - Dashboard statistik + log aktivitas.
  - CRUD generik untuk produk, layanan, testimoni, FAQ, dan kupon.
  - Inbox pesan dari form kontak.
  - Pengaturan profil bisnis + export/import/reset data.
- **Keamanan admin**:
  - Password ter-hash (SHA-256 iteratif + salt + pepper), migrasi dari plaintext.
  - Penguncian akun setelah percobaan login gagal (cooldown eksponensial).
  - Sesi dengan idle timeout 30 menit.
  - Verifikasi ulang password untuk aksi destruktif (import/reset).
  - Audit log seluruh aktivitas admin.
  - Backup/export tanpa menyertakan password.
- **PWA**: `manifest.json`, service worker (`public/sw.js`), dan ikon aplikasi.
- **SEO**: Open Graph, Twitter Card, dan JSON-LD di `public/index.html`.
- **Font profesional**: Sora (display) + Plus Jakarta Sans (body).
- **Tema kustom daisyUI** untuk mode terang dan gelap.
- **Test otomatis**: `src/App.test.js` (render aplikasi) dan `src/auth.test.js` (logika keamanan).

### Changed
- Navigasi diganti dengan **PillNav** (adaptasi React Bits) tanpa react-router, posisi tetap
  di tengah desktop dengan slot aksi (toggle tema + keranjang) di mobile.
- Footer & kartu layanan membaca data kontak secara dinamis dari pengaturan.
- Seluruh tombol/aksi WhatsApp menggunakan nomor dari pengaturan bisnis.
- Bundle admin di-*lazy-load* (`React.lazy`) untuk mempercepat muat halaman utama.

### Removed
- Komponen lama tanpa struktur (`src/components/Navbar.jsx`, `ContactSection.jsx`,
  `HeroSection.jsx`, `ProduckCard.jsx`, `ProductSection.jsx`, `ServiceCard.jsx`,
  `ServiceSection.jsx`) — dipindah/refactor ke struktur baru.
- `src/output.css`, `src/logo.svg`, `src/utils/utils.js`.

[1.0.0]: https://github.com/MansxDev/Project-website-bisnis-react-/releases/tag/v1.0.0