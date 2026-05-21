# Odoo Integration Setup

Dokumen ini menjelaskan cara memasang modul Odoo dari repo ini dan
menghubungkannya ke frontend React.

## 1. Siapkan modul di server Odoo

Source addon di repo ini berada di:

```text
odoo_addons/portfolio_api
```

Jika Anda ingin memindahkannya ke server lain, salin folder tersebut ke custom
addons path Odoo Anda. Contoh target:

```text
/opt/odoo/custom-addons/portfolio_api
```

Pastikan path custom addons sudah masuk ke `addons-path` pada konfigurasi Odoo.

## 2. Restart Odoo

Restart service Odoo setelah folder modul tersedia.

Contoh umum:

```bash
sudo systemctl restart odoo
```

## 3. Install modul di Odoo

Masuk sebagai admin Odoo lalu:

1. Aktifkan developer mode.
2. Buka menu Apps.
3. Klik `Update Apps List`.
4. Cari `Portfolio API`.
5. Install modul tersebut.

Setelah terpasang, Anda akan mendapat menu baru:

- `Portfolio > Projects`
- `Portfolio > Contacts`

## 4. Isi data project di Odoo

Buka `Portfolio > Projects` lalu tambahkan data:

- `Name`
- `Description`
- `Image URL`
- `Tags`
- `Demo URL`
- `GitHub URL`
- `Published`
- `Sequence`

Catatan:

- `Tags` diisi comma-separated, misalnya `React, Odoo, TailwindCSS`
- hanya data dengan `Published = true` dan `Active = true` yang tampil ke React

## 5. Endpoint yang tersedia

Modul ini menyiapkan endpoint berikut:

- `GET /api/portfolio/projects`
- `POST /api/portfolio/contact`

Contoh response project:

```json
{
  "ok": true,
  "data": [
    {
      "id": 1,
      "name": "Portfolio Website",
      "description": "React frontend with Odoo backend",
      "image_url": "https://example.com/image.jpg",
      "tags": ["React", "Odoo"],
      "demo_url": "https://portfolio.example.com",
      "github_url": "https://github.com/example/repo",
      "sequence": 10
    }
  ]
}
```

Contoh request contact:

```json
{
  "name": "Deyo",
  "email": "deyo@example.com",
  "message": "Saya ingin kerja sama",
  "source": "portfolio-react"
}
```

## 6. Konfigurasi frontend React

Untuk development lokal dengan Vite proxy, frontend bisa memakai env kosong:

```text
VITE_API_BASE_URL=
```

Dengan konfigurasi ini, request `/api/...` dari React akan diproxy oleh Vite ke
`http://localhost:8069`, sehingga browser tidak terkena error CORS saat development.

Salin `.env.example` menjadi `.env` lalu sesuaikan nilainya bila Anda ingin memakai
URL absolut Odoo di environment lain.

Contoh:

```text
VITE_API_BASE_URL=https://erp.domainanda.com
```

## 7. Jalankan frontend

```powershell
cd C:\MyPortofolio\Portofolio
npm run dev
```

Frontend sekarang:

- mengambil project dari Odoo
- mengirim pesan contact ke Odoo

## 8. CORS

Untuk development lokal, frontend React memakai Vite proxy sehingga browser
tidak perlu memanggil Odoo secara cross-origin.

Untuk production, sebaiknya batasi origin dan/atau letakkan frontend di belakang
reverse proxy yang sama dengan Odoo.

## 9. Catatan pengembangan lanjutan

Perbaikan berikut layak dikerjakan setelah integrasi awal berhasil:

- ganti `Image URL` menjadi field image binary Odoo
- tambah validasi email dan anti-spam
- ubah `portfolio.contact` menjadi `crm.lead` bila ingin masuk pipeline sales
- tambahkan auth/admin API jika nanti butuh dashboard React internal
