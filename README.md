# Huize Jon Coffee - POS & Kasir Web App ☕

Aplikasi kasir (Point of Sale) modern berbasis web yang dirancang khusus untuk **Huize Jon Coffee** dengan tema vintage European-Javanese warm coffee house. Dibangun secara lightweight dan responsif, mendukung transaksi kasir cepat, cetak struk (Bluetooth & USB printer), laporan keuangan terpadu, dan manajemen menu.

---

## ✨ Fitur Utama

- **☕ Point of Sale (POS / Kasir):**
  - Pencarian dan filter kategori menu cepat (Coffee, Non-Coffee, Makanan, dsb).
  - Pilihan varian suhu (*Hot / Iced*), ukuran (*Regular / Large*), dan catatan pesanan.
  - Pilihan mode makan (*Dine In* / *Take Away*).
  - Pembayaran fleksibel: Tunai (otomatis hitung kembalian) dan QRIS dinamis.
  - Shortcut keyboard untuk transaksi kilat kasir (F1: Bayar, F2: Bersihkan keranjang, dsb).

- **📊 Dashboard & Analitik (Khusus Owner):**
  - Ringkasan omset harian & bulanan, jumlah transaksi, dan produk terjual.
  - Pemilihan filter tanggal & bulan modern dengan tema kustom Flatpickr.
  - Daftar menu terlaris (*Top Selling Items*) dan transaksi terbaru secara realtime.

- **📑 Laporan & Aktivitas:**
  - Rekap uang kas sekarang, total uang masuk, dan pengeluaran.
  - Filter laporan harian dan bulanan.
  - Export laporan transaksi dan operasional ke format **Excel / CSV**.
  - Log riwayat aktivitas operasional.

- **💸 Pencatatan Pengeluaran & Kas:**
  - Fitur tambah modal uang kas masuk.
  - Pencatatan pengeluaran operasional kedai kopi terperinci dengan kategori dan catatan.
  - Pemilihan tanggal & waktu (*date-time picker*) modern terintegrasi.

- **👥 Manajemen Karyawan & Akses Role:**
  - Pemisahan hak akses: **Owner** (akses penuh) & **Kasir/Staff** (akses operasional kasir).
  - Pengaturan PIN kasir per karyawan.
  - Pencatatan tanggal mulai bekerja dan jabatan karyawan.

- **🖨️ Cetak Struk & Hardware Integration:**
  - Cetak struk printer thermal Bluetooth (Web Bluetooth API) & USB printer thermal (ESC/POS).
  - Pengaturan teks struk dan QRIS dinamis.

- **💾 Penyimpanan & Sinkronisasi:**
  - Dukungan database offline-first dengan IndexedDB.
  - Sinkronisasi realtime multi-device melalui Firebase Realtime Database.

---

## 🛠️ Teknologi yang Digunakan

- **Frontend:** HTML5, CSS3 (Modern Flexbox/Grid, Custom Vintage Coffee Theme), Vanilla JavaScript (ES6+)
- **Library & Plugin:**
  - [Flatpickr](https://flatpickr.js.org/) + MonthSelect Plugin (Custom Brown Theme)
  - Firebase SDK (Realtime Database)
  - QR Code Generator
- **Build / Tooling:** Node.js, `http-server`

---

## 🚀 Cara Menjalankan Secara Lokal

1. **Clone repositori ini:**
   ```bash
   git clone https://github.com/yusronabdillah/huize-jon-kasir.git
   cd huize-jon-kasir
   ```

2. **Install dependensi (jika diperlukan):**
   ```bash
   npm install
   ```

3. **Jalankan development server:**
   ```bash
   npm run dev
   ```
   Aplikasi akan terbuka otomatis di browser pada `http://127.0.0.1:5173` (atau port yang ditentukan).

---

## 🌐 Deploy ke Netlify

Aplikasi ini sudah dioptimalkan dan siap di-deploy secara instan:
1. Masuk ke [Netlify Drop](https://app.netlify.com/drop).
2. *Drag and drop* folder `kasir fix/dist` ke area upload Netlify.
3. Aplikasi web kasir langsung aktif dan online!

---

## 👤 Informasi Akun Bawaan

- **Role:** Owner
- **Default PIN:** `1234`
*(Dapat diubah melalui menu Setelan di dalam aplikasi)*

---

## 📄 Lisensi

Hak Cipta © 2026 Huize Jon Coffee. Dibuat untuk kebutuhan operasional kedai kopi Huize Jon.
