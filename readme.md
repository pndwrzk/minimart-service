# minimart service

Minimart Service adalah backend service untuk aplikasi minimart-app yang menyediakan data kategori, produk, keranjang belanja, dan checkout. Service ini dilengkapi seeder untuk mengisi data awal kategori dan produk, sehingga memudahkan pengembangan dan pengujian.

## Cara Menjalankan Aplikasi

Install dependencies

```bash
 npm install
```

Copy file contoh .env

```bash
  cp env.example .env
```

Update data file .env

```bash
 Buka .env dan sesuaikan dengan configuration MySQL local mu
```

Migration database
```bash
 npm run migration
```


Seeder Data Awal
*Untuk memudahkan testing, jalankan seeder untuk mengisi data awal kategori dan produk:*
- Seeder kategori (wajib pertama)
```bash
npm run seed:category 
```
- Seeder produk
```bash
npm run seed:product
```

jalankan unit test

```bash
 npm test
```

jalankan server

```bash
 npm run start
```
