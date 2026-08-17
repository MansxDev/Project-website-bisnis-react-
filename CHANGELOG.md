# Changelog

Semua perubahan penting pada proyek ini akan dicatat di file ini.

Format mengikuti [Keep a Changelog](https://keepachangelog.com/id-ID/1.1.0/) dan
versi mengikuti [Semantic Versioning](https://semver.org/lang/id/).

## [Unreleased]

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