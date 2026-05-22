# 🎮 Javanese Game Adventure - Web Undangan Pernikahan 2D Retro

Undangan pernikahan digital interaktif berbasis **2D Side-Scrolling Game** bertema petualangan retro Jawa (*Javanese Retro Adventure*). Dibuat menggunakan HTML5, CSS3, dan Vanilla Javascript murni (tanpa framework berat), menjadikannya sangat ringan, responsif, dan mudah di-hosting di mana saja.

Template ini didesain khusus agar **mudah diedit (fully customizable)** oleh penyedia jasa undangan digital hanya dengan memperbarui satu file konfigurasi saja.

---

## 📂 Struktur Folder & Berkas

Berikut adalah tata letak berkas di dalam project ini:

```text
TemplateUndanganGame/
│
├── index.html          # Kerangka HTML utama dan struktur dasar viewport game
├── qris_mock.png       # Gambar dummy QRIS untuk kado digital (dapat diganti)
├── Requirements.txt    # Catatan kebutuhan & brief asli klien
├── README.md           # Panduan penggunaan & dokumentasi teknis ini
│
├── css/
│   └── style.css       # Pengaturan gaya visual, animasi pixel art, & modal glassmorphism
│
└── js/
    ├── config.js       # PUSAT KONTROL: Semua data & aset undangan diubah di sini
    └── app.js          # Core Engine: Logika pergerakan, scroll, audio, & render modal
```

---

## ⚙️ Panduan Kustomisasi (Cara Edit Template)

Anda **tidak perlu memahami coding Javascript rumit** untuk mengubah isi undangan ini. Semua perubahan konten, gambar, lagu, koordinat map, dan data rekening cukup dilakukan pada berkas **`js/config.js`**.

Buka file `js/config.js` menggunakan text editor pilihan Anda (seperti VS Code, Notepad++, dll.) dan edit bagian-bagian berikut:

### 1. Informasi Umum Undangan (`general`)
*   `brideNickname`: Nama panggilan pengantin wanita (Tampil di cover & dekorasi).
*   `groomNickname`: Nama panggilan pengantin pria.
*   `weddingDate`: Tanggal pernikahan dalam format teks lengkap (misal: `"Minggu, 12 Juli 2026"`).
*   `musicUrl`: Tautan link lagu latar format `.mp3`.
*   `hashtag`: Tagar sosial media pernikahan (misal: `"#BimoLarasMenikah"`).

### 2. Tampilan Layar Pembuka (`cover`)
*   `title` & `subtitle`: Judul retro pada layar awal.
*   `greetingText`: Kata sambutan untuk tamu terhormat.
*   `guestNameFallback`: Nama tamu default jika tautan undangan tidak memiliki parameter nama.
*   `buttonText`: Teks tombol pembuka undangan (misal: `"BUKA UNDANGAN"`).

### 3. Aset Gambar & Tema (`assets`)
Jika ingin mengganti tema (misal bertema Sunda, Modern, Bali, dll.), cukup ganti link gambar berikut dengan link gambar baru Anda:
*   `background`: Aset background langit parallax.
*   `floor`: Lantai tanah tempat karakter berjalan.
*   `characterIdle`: Sprite karakter saat diam berdiri.
*   `characterWalk`: GIF animasi karakter saat berjalan ke kanan.
*   `dialogPlainBg` & `dialogBg`: Ornamen balon percakapan.

### 4. Detail Profil Kedua Mempelai (`mempelai`)
Mengatur nama lengkap, nama orang tua, deskripsi biografi, link Instagram, serta foto avatar masing-masing pengantin untuk modal *Kedua Mempelai*.

### 5. Detail Acara & Google Maps (`event`)
Mengatur waktu, tempat, dan alamat untuk sesi **Akad** dan **Resepsi**, serta link embed Google Maps dan tombol penunjuk arahnya.

### 6. RSVP & Amplop Digital (`rsvp` & `gifts`)
*   `whatsappNumber`: Nomor WhatsApp Anda (gunakan kode negara `62` di depan) untuk menerima konfirmasi otomatis kehadiran tamu.
*   `accounts`: Daftar nomor rekening bank dan e-wallet untuk fitur kado digital beserta logo kustomnya.

### 7. Pengaturan Landmark / Objek Game (`milestones`)
Aset ikon dekoratif di sepanjang map dapat diposisikan ulang dengan mudah menggunakan koordinat horizontal (`pos` dalam piksel, rentang dari `0` sampai `mapWidth`). Anda juga bisa mengatur modal mana yang terbuka saat objek tersebut disentuh/diklik.

---

## 🚀 Panduan Hosting (Cara Online-kan Undangan)

Karena project ini adalah website statis murni, Anda bisa meng-hosting-nya dengan sangat mudah dan murah di **Shared Hosting** maupun platform gratis lainnya.

### Hosting di Shared Hosting (cPanel)

1.  **Ekstrak/ZIP file project:** Satukan berkas `index.html`, `qris_mock.png`, folder `css/`, dan folder `js/` ke dalam file `.zip`.
2.  **Upload ke File Manager:** Masuk ke cPanel, buka **File Manager**, dan masuk ke direktori **`public_html`** (atau folder subdomain Anda). Upload file `.zip` tadi dan lakukan **Extract** langsung di folder tersebut.
3.  **PENTING - Hapus `index.php`:** Jika domain Anda sebelumnya menggunakan WordPress/Elementor, biasanya terdapat sisa file kosong bernama **`index.php`** di hosting Anda. **Hapus file `index.php` tersebut** agar server hosting memprioritaskan pemuatan `index.html` game Anda.
4.  **Aktifkan SSL (HTTPS):** Aktifkan sertifikat SSL (Let's Encrypt gratis di cPanel) pada domain Anda. **Fitur Salin Nomor Rekening (Copy Clipboard)** dan **Autoplay Musik** hanya didukung pada protokol HTTPS demi keamanan browser.

### Hosting Gratis & Cepat (Vercel / Netlify)

Jika Anda ingin melakukan *preview* instan atau membagikan demo undangan ke klien Anda secara gratis:
1.  Buka situs [Vercel](https://vercel.com/) atau [Netlify](https://www.netlify.com/).
2.  Lakukan *Drag & Drop* folder project ini langsung ke platform tersebut.
3.  Dalam waktu 5 detik, undangan Anda sudah aktif online dengan tautan HTTPS gratis yang aman!

---

## 💬 Fitur Penambahan Nama Tamu Otomatis (Dynamic Guest Name)

Undangan ini mendukung pemanggilan nama tamu secara dinamis lewat link URL agar terasa lebih personal untuk masing-masing penerima. 

Format penulisan link undangan:
```text
https://nama-domain-undangan.com/?to=Nama+Tamu+Undangan
```
Contoh:
*   Jika diakses lewat: `https://undangan.my.id/?to=Bapak+Joko+Susilo`
*   Maka pada cover pembuka dan modal sambutan akan otomatis menyapa: **"Bapak Joko Susilo"**.

---

## 🎮 Kontrol Game & Navigasi

Undangan interaktif ini mendukung berbagai opsi navigasi yang ramah pengguna (*user-friendly*):
1.  **Desktop (Keyboard):** Menggunakan tombol **A** / **D** atau **Panah Kiri** / **Panah Kanan** untuk berjalan. Menekan **Spasi** atau **Enter** untuk membuka objek/buku tamu terdekat.
2.  **Mobile (Touch):** Menggunakan tombol **Panah Kiri & Kanan Virtual** yang nyaman pada layar sentuh.
3.  **Mouse/Scroll Murni:** Tamu juga cukup melakukan *scroll* biasa ke bawah/atas (menggunakan roda mouse atau usapan layar) untuk menggerakkan kamera dan karakter secara natural.
