/**
 * File Konfigurasi untuk Template Undangan Pernikahan Game 2D
 * Semua konten teks, gambar, posisi aset, dan musik dapat diatur di sini.
 * 
 * PANDUAN EDITING:
 * - Gunakan format tanda kutip dua (") atau kutip satu (') untuk teks.
 * - Untuk posisi koordinat (pos), nilainya menggunakan angka pixel (tanpa kutip).
 * - Anda dapat menguji perubahan langsung secara lokal dengan membuka index.html.
 */

window.weddingConfig = {

  // =========================================================================
  // 1. INFORMASI UMUM PERNIKAHAN
  // =========================================================================
  general: {
    brideNickname: "Laras",                     // Nama panggilan mempelai wanita
    groomNickname: "Bimo",                      // Nama panggilan mempelai pria
    weddingDate: "Minggu, 12 Juli 2026",        // Tanggal formal pernikahan
    weddingDateFormatted: "12 . 07 . 26",       // Format tanggal retro pendek untuk header/signboard (DD . MM . YY)
    weddingDateFormattedFull: "12 . 07 . 2026", // Format tanggal retro panjang untuk modal welcome (DD . MM . YYYY)
    musicUrl: "https://api.owlink.id/uploads/ce2eaab0-4d85-11f1-8e56-e3393a795bd9.mp3", // URL lagu latar (MP3)
    hashtag: "#BimoLarasMenikah",               // Hashtag pernikahan
  },

  // =========================================================================
  // 2. HALAMAN COVER (LAYAR PEMBUKA)
  // =========================================================================
  cover: {
    title: "THE WEDDING INVITATION",            // Judul utama di halaman depan
    subtitle: "A 2D Side-Scrolling Adventure",  // Subjudul halaman depan
    greetingText: "Kepada Yth. Bapak/Ibu/Saudara/i", // Teks salam penerima
    guestNameFallback: "Tamu Undangan",         // Nama default jika link tidak memakai "?to=Nama"
    buttonText: "BUKA UNDANGAN",                // Teks tombol untuk mulai bermain
  },

  // =========================================================================
  // 3. MODAL WELCOME / KUTIPAN AYAT (Dipicu oleh Mailbox / Batang Kayu Burung)
  // =========================================================================
  welcome: {
    arabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ Lَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا Lِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ Lَآيَاتٍ Lِّقَوْمٍ يَتَفَكَّرُونَ",
    meaning: `"Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir." (QS. Ar-Rum: 21)`
  },

  // =========================================================================
  // 4. MODAL CERITA CINTA (Our Love Story)
  // =========================================================================
  story: {
    title: "Our Love Story",                     // Judul modal cerita cinta
    preciousMomentTitle: "Precious moment",     // Judul bagian penutup modal
    preciousMomentText: `"Creating memories is a priceless gift. Memories last a lifetime; objects last only a short time."`, // Pesan penutup modal

    // Daftar babak cerita cinta. Anda bisa menambah, mengurangi, atau mengganti teks & fotonya.
    chapters: [
      {
        title: "The Beginning",
        description: "Hari pertama kami saling mengenal satu sama lain, membuka lembaran awal dari perjalanan panjang kami.",
        imgUrl: "https://cdn-uploads.owlink.id/acf11590-4e7f-11f1-b4e7-09dce495479a.jpg"
      },
      {
        title: "First Date",
        description: "Kencan pertama yang penuh dengan kecanggungan namun menyenangkan, di mana kami menyadari kecocokan satu sama lain.",
        imgUrl: "https://cdn-uploads.owlink.id/acf11590-4e7f-11f1-b4e7-09dce495479a.jpg"
      },
      {
        title: "The Proposal",
        description: "Momen indah saat komitmen baru diucapkan untuk melangkah ke jenjang yang lebih serius secara resmi.",
        imgUrl: "https://cdn-uploads.owlink.id/acf11590-4e7f-11f1-b4e7-09dce495479a.jpg"
      },
      {
        title: "Our Wedding",
        description: "Gerbang awal kehidupan baru kami sebagai pasangan suami istri yang siap melangkah bersama selamanya.",
        imgUrl: "https://cdn-uploads.owlink.id/acf11590-4e7f-11f1-b4e7-09dce495479a.jpg"
      }
    ]
  },

  // =========================================================================
  // 5. DETAIL ACARA PERNIKAHAN (Akad & Resepsi)
  // =========================================================================
  event: {
    akad: {
      title: "Akad Nikah",
      time: "Pukul 08.00 - 10.00 WIB",
      venue: "Masjid Raya Baiturrahman",
      address: "Jl. Pemuda No. 12, Yogyakarta"
    },
    resepsi: {
      title: "Resepsi Pernikahan",
      time: "Pukul 11.00 - 16.00 WIB",
      venue: "Pendopo Agung Royal Ambarrukmo",
      address: "Jl. Laksda Adisucipto No. 81, Yogyakarta"
    },
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.0371424694406!2d110.4005953!3d-7.7858913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a59960ffbb361%3A0xe5a3c20dbbf9c4f7!2sRoyal%20Ambarrukmo%20Yogyakarta!5e0!3m2!1sid!2sid!4v1700000000000", // Link iframe Google Maps
    mapLink: "https://maps.app.goo.gl/YfB9hM4d76E2" // Link tombol buka peta
  },

  // =========================================================================
  // 6. FORM RSVP / KONFIRMASI KEHADIRAN (WhatsApp & Buku Tamu)
  // =========================================================================
  rsvp: {
    whatsappNumber: "628123456789", // Nomor WA tujuan untuk menerima data konfirmasi (awali dengan kode negara, misal 62)
    submitUrl: "",                  // Opsional: URL Google Sheets App Script jika data RSVP ingin disimpan di spreadsheet
    placeholderMessage: "Tulis ucapan selamat dan doa restu terbaikmu di sini...",
  },

  // =========================================================================
  // 7. KADO DIGITAL / LOVE GIFT
  // =========================================================================
  gifts: {
    title: "Love Gift",
    description: "Doa restu Anda adalah karunia terindah bagi kami. Namun jika Anda ingin memberikan hadiah digital, kami menyediakan sarana berikut:",
    accounts: [
      {
        bankName: "Bank Central Asia (BCA)",
        accountNumber: "1234567890",
        accountHolder: "Bimo Wicaksono",
        logo: "💳"
      },
      {
        bankName: "Bank Mandiri",
        accountNumber: "9876543210987",
        accountHolder: "Rara Larasati",
        logo: "💳"
      },
      {
        bankName: "E-Wallet GoPay / Dana",
        accountNumber: "08123456789",
        accountHolder: "Rara Larasati",
        logo: "📱"
      }
    ]
  },

  // =========================================================================
  // 8. DETAIL MEMPELAI (Untuk Modal Informasi Lengkap Mempelai)
  // =========================================================================
  mempelai: {
    title: "Kedua Mempelai",
    description: "Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri pernikahan kami:",

    bride: {
      name: "Rara Larasati, S.Ds.",
      father: "Bapak H. Joko Susilo",
      mother: "Ibu Hajah Sri Wahyuni",
      instagram: "@raralaras",
      avatar: "https://cdn-uploads.owlink.id/contenful/game-java/love.png",
      bio: "Putri bungsu yang penyayang, kreatif, dan berdedikasi tinggi di bidang seni desain grafis."
    },
    groom: {
      name: "Bimo Wicaksono, S.T.",
      father: "Bapak Ir. Hermawan Wicaksono",
      mother: "Ibu Dra. Rina Ambarwati",
      instagram: "@bimowicak",
      avatar: "https://cdn-uploads.owlink.id/contenful/game-java/love.png",
      bio: "Putra sulung yang mandiri, pekerja keras, dan memiliki passion mendalam di bidang rekayasa perangkat lunak."
    }
  },

  // =========================================================================
  // 9. SETTING DYNAMIC ENGINE & PARALLAX
  // =========================================================================
  engine: {
    mapWidth: 1900,          // Total panjang peta/jalan game (dalam pixel)
    characterSpeed: 10,       // Kecepatan jalan karakter (semakin besar = semakin cepat scroll)
    desktopScale: 1.0,       // Skala zoom box game di desktop komputer
    mobileScale: 1.2,        // Skala zoom layar game di HP/Mobile

    // Kecepatan scroll parallax (semakin kecil angkanya = semakin lambat/efek kedalaman semakin jauh)
    parallaxSpeeds: {
      sky: 0.1,
      mountains: 0.2,
      middleground: 0.5,
      floor: 1.0,
      decorations: 1.0,
      milestones: 1.0
    }
  },

  // =========================================================================
  // 10. ASET GAMBAR UTAMA GAME
  // =========================================================================
  assets: {
    background: "img/twilight_bg.png",       // Background langit (parallax)
    floor: "https://cdn-uploads.owlink.id/contenful/game-java/landgame.png",      // Lantai / jalan berpijak
    characterIdle: "https://cdn-uploads.owlink.id/contenful/game-java/jawa_character.png", // Sprite karakter diam
    characterWalk: "https://cdn-uploads.owlink.id/contenful/game-java/jawa_character_walkanimation.gif", // GIF animasi berjalan
    arrowLeft: "",        // Tombol kontrol kiri mobile (jika kosong memakai SVG default bawaan)
    arrowRight: "",       // Tombol kontrol kanan mobile (jika kosong memakai SVG default bawaan)
    dialogBg: "https://cdn-uploads.owlink.id/contenful/game-java/cat_dialog.png", // Background dialog gelembung khusus
    dialogPlainBg: "https://cdn-uploads.owlink.id/contenful/game-java/dialog.png", // Background dialog gelembung polos
  },

  // =========================================================================
  // 11. INTERACTIVE MILESTONES (Posisi Objek di Peta & Trigger Modal)
  // =========================================================================
  // - pos: Koordinat posisi X horizontal (nilai berkisar dari 0 sampai mapWidth)
  // - dialogText: Teks balon ucapan di atas karakter saat mendekati objek (kosongkan jika tidak mau muncul balon)
  // - modalId: ID modal target yang akan terbuka ketika objek diklik/di-tap
  milestones: [
    {
      id: "wood-bird",
      pos: 400,
      bottom: "2.5%",
      imgUrl: "https://cdn-uploads.owlink.id/contenful/game-java/mailbox.png",
      width: 140,
      height: 180,
      action: "openModal",
      dialogText: "Wah, ada surat apa ini? Yuk kita baca!", // Muncul di bubble chat saat karakter mendekat
      modalId: "modal-welcome"
    },
    {
      id: "welcome",
      pos: 750,
      bottom: "4.5%",
      imgUrl: "https://cdn-uploads.owlink.id/contenful/game-java/parkinfo.png",
      width: 140,
      height: 180,
      action: "openModal",
      dialogText: "Lihat kisah perjalanan cinta kami di sini!",
      modalId: "modal-story"
    },
    {
      id: "gallery",
      pos: 1210,
      bottom: "3%",
      imgUrl: "https://cdn-uploads.owlink.id/contenful/game-java/crew.png",
      width: 170,
      height: 180,
      action: "openModal",
      dialogText: "Jangan lupa konfirmasi kehadiranmu di sini ya!",
      modalId: "modal-rsvp",
    },
    {
      id: "gift",
      pos: 1520,
      bottom: "3%",
      imgUrl: "https://cdn-uploads.owlink.id/contenful/game-java/gift.png",
      width: 120,
      height: 140,
      action: "openModal",
      dialogText: "Ingin mengirimkan kado pernikahan digital? Ketuk di sini",
      modalId: "modal-gift"
    },
    {
      id: "wedding-easel",
      pos: 1760,
      bottom: "3%",
      imgUrl: "https://cdn-uploads.owlink.id/contenful/game-java/wedding_sign.png",
      width: 160,
      height: 190,
      action: "none",
      dialogText: "Sebentar lagi sampai di pelaminan! Yuk jalan terus!"
    },
    {
      id: "mempelai",
      pos: 1945,
      bottom: "3%",
      imgUrl: "https://cdn-uploads.owlink.id/contenful/game-java/couple.png",
      width: 160,
      height: 180,
      action: "openModal",
      dialogText: "Halo! Terima kasih banyak sudah datang! Click kami untuk menyapa",
      modalId: "modal-mempelai"
    }
  ],

  // =========================================================================
  // 12. ELEMEN DEKORATIF LAINNYA (Hewan Terbang/Berjalan di Map)
  // =========================================================================
  entities: [
    {
      id: "bee",
      pos: 600,
      top: 100,
      imgUrl: "https://cdn-uploads.owlink.id/contenful/game-java/bee.png",
      width: 40,
      height: 40,
      behavior: "float"
    },
    {
      id: "chick",
      pos: 100,
      imgUrl: "https://cdn-uploads.owlink.id/contenful/game-java/chick.gif",
      width: 45,
      height: 45,
      behavior: "walk"
    },
    {
      id: "dove",
      pos: 2000,
      top: 80,
      imgUrl: "https://cdn-uploads.owlink.id/contenful/game-java/dove.gif",
      width: 50,
      height: 40,
      behavior: "float"
    }
  ]
};
