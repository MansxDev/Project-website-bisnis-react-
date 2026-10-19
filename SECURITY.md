# Kebijakan Keamanan

## Keamanan Panel Admin

Panel admin (`#admin`) menerapkan pertahanan berlapis di sisi klien. Karena aplikasi ini
berjalan sepenuhnya di browser (situs statis tanpa backend), keamanan diarahkan untuk mencegah
akses tidak sah dan penyalahgunaan lokal.

### Yang diterapkan

- **Password ter-hash** — password tidak pernah disimpan sebagai teks biasa. Disimpan sebagai
  hash **SHA-256 berulang 5.000x** dengan **salt acak 128-bit** dan **pepper** (via Web Crypto
  API). Pada konteks non-HTTPS, digunakan fallback hash untuk menjaga fungsi tetap berjalan.
- **Migrasi otomatis** — password lama dari versi sebelumnya dipindahkan ke bentuk hash saat
  pertama login, lalu dihapus dari penyimpanan. Flag `mustChange` memaksa penggantian password
  default.
- **Sandi demo terbuka (disengaja)** — sandi awal `demo-mansxdev` ditulis di README dan di layar
  login. Ini bukan kelalaian: sebagai situs statis, seluruh kode terkirim ke peramban, jadi sandi
  itu memang tidak bisa dirahasiakan. Menyembunyikannya hanya membuat demo tidak bisa dicoba.
  Yang melindungi adalah kewajiban menggantinya setelah masuk.
- **Penguncian akun (lockout)** — 5 kali login gagal mengunci akses dengan cooldown eksponensial
  (30s → 60s → 120s → …, maks 30 menit). Status kunci persisten di `localStorage`.
- **Sesi dengan batas waktu** — token sesi di `sessionStorage` (hilang saat tab ditutup) dan
  otomatis keluar setelah **30 menit tidak aktif**.
- **Verifikasi ulang (re-authentication)** — aksi destruktif (import & reset semua data) wajib
  memasukkan password admin kembali.
- **Audit log** — seluruh aktivitas admin (login, logout, CRUD, import/export, ganti password,
  baca pesan) tercatat di `mansx_audit` (maks 100 entri) dan terlihat di Dashboard.
- **Backup bebas password** — file export JSON tidak pernah menyertakan hash/teks password;
  import menolak menyuntikkan `adminPassword`.

### Batasan yang perlu diketahui

Aplikasi ini **tidak memiliki backend**. Semua data & sesi berada di `localStorage` /
`sessionStorage` peramban, sehingga:

- Siapa pun dengan akses ke DevTools/browser pengguna dapat membaca atau mengubah data.
- Keamanan yang ada melindungi dari akses *password* dan penyalahgunaan kasual, bukan dari
  pihak yang sudah menguasai perangkat.

Untuk lingkungan yang membutuhkan keamanan sungguhan (mis. banyak admin, data sensitif),
migrasikan penyimpanan data ke **backend/server** dengan autentikasi sesi, CSRF protection,
dan rate-limiting di sisi server.

---

## Melaporkan Kerentanan

Jangan membuka *issue* publik untuk masalah keamanan. Kirim laporan ke:

- **Email:** [mansx.develover@gmail.com](mailto:mansx.develover@gmail.com)

Mohon sertakan:
- Deskripsi singkat kerentanan dan dampaknya.
- Langkah untuk mereproduksi.
- Versi/branch yang terpengaruh.

Kami akan merespons secepatnya dan menangani laporan secara privat.