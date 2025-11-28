# 📱 BlockOut - Move to Unblock

![BlockOut Banner](https://via.placeholder.com/1200x300?text=BlockOut:+Beat+Screen+Addiction+with+Fitness)

> **"Turn your social media addiction into physical gains."**

BlockOut adalah aplikasi mobile inovatif yang mengintegrasikan **Digital Wellbeing**, **Fitness**, dan **Blockchain**. Aplikasi ini dirancang untuk mengatasi kecanduan media sosial pada remaja dengan memblokir akses ke aplikasi tertentu dan hanya membukanya kembali jika pengguna melakukan aktivitas fisik (Workout).

---

## 📖 Latar Belakang Masalah

Di era digital saat ini, banyak remaja mengalami kecanduan media sosial (Instagram, TikTok, dll) hingga lupa waktu, merusak kesehatan, dan mengalami fenomena FOMO (*Fear of Missing Out*).

**BlockOut hadir sebagai solusi:**
1.  Membatasi penggunaan aplikasi secara paksa namun positif.
2.  Mendorong gaya hidup sehat melalui gamifikasi olahraga.
3.  Memberikan reward nyata (Token/NFT) menggunakan teknologi Blockchain.

---

## 🚀 Fitur Utama

### 1. App Blocker & Unlock System
* Pengguna memilih aplikasi yang ingin diblokir (Blacklist).
* Aplikasi terkunci otomatis saat waktu habis.
* **Unique Selling Point:** Satu-satunya cara membuka kunci adalah dengan melakukan workout (Push Up, Sit Up, Squat).
* *Konversi:* 1 Repetisi = Menambah waktu akses aplikasi (misal: 2 menit).

### 2. AI Computer Vision
* Menggunakan kamera smartphone untuk mendeteksi gerakan tubuh secara real-time.
* Menghitung repetisi secara otomatis dan memvalidasi apakah gerakan benar atau curang.
* Mencegah kecurangan (*Anti-Cheat*) dengan deteksi durasi antar repetisi.

### 3. Gamification & Avatar System
* **Avatar:** Karakter pixel art yang bisa dikustomisasi (Rambut, Baju, Celana, Sepatu).
* **Shop:** Beli item kosmetik menggunakan koin hasil keringat (workout).
* **Streak:** Sistem api (🔥) untuk menjaga konsistensi latihan harian.

### 4. Blockchain & Web3 Integration
* Setiap koin yang didapat dicatat di Blockchain (Sepolia Testnet).
* Sitem `Minting` otomatis saat selesai workout.
* Transparansi kepemilikan item dan currency.

### 5. Smart Settings
* **Profile Management:** Edit data diri, foto profil, dan password.
* **Preferences:** Atur jenis workout yang diinginkan.
* **Notification:** Pengingat saat waktu layar hampir habis.
* **Wallet Connect:** Integrasi dengan MetaMask.

---

## 🛠️ Tech Stack

Project ini dibangun menggunakan teknologi modern untuk performa dan skalabilitas:

| Komponen | Teknologi |
| :--- | :--- |
| **Backend Framework** | Next.js (Node.js) |
| **Database** | PostgreSQL |
| **ORM** | Prisma |
| **Blockchain** | Ethereum (Sepolia), Ethers.js |
| **Authentication** | JWT, Google OAuth, Custom Phone Auth |
| **API Documentation** | Swagger / OpenAPI 3.0 |
| **AI / Computer Vision** | MediaPipe / ML Kit (On Mobile Side) |

---

## 📂 Struktur Database (Prisma Schema)

Sistem menggunakan relasi SQL yang kuat:
* **User:** Menyimpan profil, wallet, streak, dan konfigurasi avatar.
* **Inventory:** Menyimpan item NFT yang dimiliki user.
* **BlockedApp:** Daftar aplikasi target pemblokiran.
* **TransactionQueue:** Antrian minting ke blockchain (Handling traffic).
* **WorkoutPreference:** Pengaturan jenis latihan user.

---

## ⚙️ Instalasi & Cara Menjalankan

Ikuti langkah ini untuk menjalankan server Backend di lokal:

### 1. Clone Repository
```bash
git clone [https://github.com/username/blockout-backend.git](https://github.com/username/blockout-backend.git)
cd blockout-backend
