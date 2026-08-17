# Berkontribusi ke MansX.Dev

Terima kasih sudah meluangkan waktu untuk berkontribusi! 🎉

Panduan berikut membantu menjaga proyek tetap rapi, konsisten, dan mudah dikelola.

## Daftar Isi

- [Kode Etik](#kode-etik)
- [Cara Memulai](#cara-memulai)
- [Workflow Kontribusi](#workflow-kontribusi)
- [Standar Kode](#standar-kode)
- [Menulis Komit](#menulis-komit)
- [Melaporkan Bug](#melaporkan-bug)

## Kode Etik

Dengan berkontribusi, Anda setuju untuk menjaga lingkungan yang ramah dan saling menghormati.
Hindari komentar yang kasar, diskriminatif, atau mengganggu.

## Cara Memulai

1. **Fork** repositori ini dan **clone** hasil fork Anda.
2. Install dependensi: `npm install`
3. Jalankan server pengembangan: `npm start`
4. Pastikan build & tes lolos sebelum bekerja:

   ```bash
   npm run build
   npm test -- --watchAll=false
   ```

## Workflow Kontribusi

1. Buat branch baru dari `main` dengan nama deskriptif:

   ```bash
   git checkout -b feat/nama-fitur
   # atau
   git checkout -b fix/nama-bug
   ```

2. Kerjakan perubahan Anda dengan perubahan kecil dan fokus.
3. Pastikan perubahan tidak merusak fitur yang ada (jalankan tes & build).
4. Commit dengan pesan yang jelas (lihat [Menulis Komit](#menulis-komit)).
5. Push ke fork Anda lalu buka **Pull Request** ke `main`.

### Checklist sebelum Pull Request

- [ ] `CI=true npm run build` berhasil tanpa error/warning.
- [ ] `CI=true npm test -- --watchAll=false` lolos.
- [ ] Tidak ada file tak terduga (mis. `node_modules`, `build/`) yang ikut ter-commit.
- [ ] Tidak ada rahasia/kredensial yang ter-commit.

## Standar Kode

- **JavaScript** (tanpa TypeScript) dengan sintaks modern (JSX).
- Komponen ditulis sebagai **function components** dengan hooks.
- Nama file: `PascalCase.jsx` untuk komponen, `camelCase.js` untuk utilitas/hook.
- Gunakan **Tailwind CSS + daisyUI** — hindari CSS kustom jika memungkinkan.
- Semua teks UI dalam **Bahasa Indonesia**.
- **Jangan menambahkan komentar** kecuali benar-benar diperlukan.
- Tambahkan atribut aksesibilitas (`aria-label`, dll.) pada elemen interaktif.
- Untuk fitur baru yang berkaitan dengan data, ikuti pola `src/data/store.js`.

## Menulis Komit

Gunakan pesan komit yang singkat dan deskriptif, misalnya:

```text
Tambah kupon promo di keranjang
Perbaiki bug navigasi di mode mobile
```

Jika proyek Anda menggunakan Conventional Commits, gunakan prefix opsional:
`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`.

## Melaporkan Bug

Buka *issue* baru dengan menyertakan:

1. Deskripsi singkat masalah.
2. Langkah reproduksi.
3. Perilaku yang diharapkan vs yang terjadi.
4. Informasi lingkungan (browser, OS).

> **Jangan** melaporkan masalah keamanan melalui issue publik — lihat [SECURITY.md](SECURITY.md).