/**
 * Configuration File for the Customizable 2D Game Wedding Invitation Template
 * All content, texts, images, and milestones can be edited here.
 */

window.weddingConfig = {
  // General Invitation Info
  general: {
    brideNickname: "Laras",
    groomNickname: "Bimo",
    weddingDate: "Minggu, 12 Juli 2026",
    weddingDateFormatted: "12 . 07 . 26",     // Format tanggal pendek ala retro (contoh: DD . MM . YY)
    weddingDateFormattedFull: "12 . 07 . 2026", // Format tanggal panjang ala retro (contoh: DD . MM . YYYY)
    musicUrl: "https://api.owlink.id/uploads/ce2eaab0-4d85-11f1-8e56-e3393a795bd9.mp3",
    hashtag: "#BimoLarasMenikah",
  },

  // Cover Screen Configuration
  cover: {
    title: "THE WEDDING INVITATION",
    subtitle: "A 2D Side-Scrolling Adventure",
    greetingText: "Kepada Yth. Bapak/Ibu/Saudara/i",
    guestNameFallback: "Tamu Undangan",
    buttonText: "BUKA UNDANGAN",
  },

  // Welcome Modal Quote / Verse Configuration
  welcome: {
    arabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ",
    meaning: `"Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir." (QS. Ar-Rum: 21)`
  },

  // Game Engine & Parallax Parameters
  engine: {
    mapWidth: 2175,          // Total length of the side-scroller path in pixels
    characterSpeed: 10,       // Speed of character walking (px per frame)
    desktopScale: 1.0,       // Zoom level on desktop
    mobileScale: 1.2,        // Zoom level on mobile devices

    // Parallax speed factors (lower = slower/further, 1.0 = matches floor speed)
    parallaxSpeeds: {
      sky: 0.1,
      mountains: 0.2,
      middleground: 0.5,
      floor: 1.0,
      decorations: 1.0,
      milestones: 1.0
    }
  },

  // Aesthetic Assets & Theme URLs
  assets: {
    background: "https://cdn-uploads.owlink.id/contenful/game-java/bg.png",
    floor: "https://cdn-uploads.owlink.id/contenful/game-java/landgame.png",
    characterIdle: "https://cdn-uploads.owlink.id/contenful/game-java/jawa_character.png",
    characterWalk: "https://cdn-uploads.owlink.id/contenful/game-java/jawa_character_walkanimation.gif",
    arrowLeft: "",
    arrowRight: "",
    dialogBg: "https://cdn-uploads.owlink.id/contenful/game-java/cat_dialog.png",
    dialogPlainBg: "https://cdn-uploads.owlink.id/contenful/game-java/dialog.png",
  },

  // Bride & Groom Detailed Information (Used in Bride/Groom Milestone Modal)
  mempelai: {
    title: "Kedua Mempelai",
    description: "Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri pernikahan kami:",

    bride: {
      name: "Rara Larasati, S.Ds.",
      father: "Bapak H. Joko Susilo",
      mother: "Ibu Hajah Sri Wahyuni",
      instagram: "@raralaras",
      avatar: "https://cdn-uploads.owlink.id/contenful/game-java/love.png", // Or any custom avatar/photo
      bio: "Putri bungsu yang penyayang, kreatif, dan berdedikasi tinggi di bidang seni desain grafis."
    },
    groom: {
      name: "Bimo Wicaksono, S.T.",
      father: "Bapak Ir. Hermawan Wicaksono",
      mother: "Ibu Dra. Rina Ambarwati",
      instagram: "@bimowicak",
      avatar: "https://cdn-uploads.owlink.id/contenful/game-java/love.png", // Or any custom avatar/photo
      bio: "Putra sulung yang mandiri, pekerja keras, dan memiliki passion mendalam di bidang rekayasa perangkat lunak."
    }
  },

  // Schedule & Event Details (Used in Event/Calendar Milestone Modal)
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
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.0371424694406!2d110.4005953!3d-7.7858913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a59960ffbb361%3A0xe5a3c20dbbf9c4f7!2sRoyal%20Ambarrukmo%20Yogyakarta!5e0!3m2!1sid!2sid!4v1700000000000",
    mapLink: "https://maps.app.goo.gl/YfB9hM4d76E2"
  },

  // RSVP Form / Guest Book Settings
  rsvp: {
    whatsappNumber: "628123456789", // Target WhatsApp number for RSVP forwards
    submitUrl: "", // Optional: Google Sheet App Script Web URL for saving messages
    placeholderMessage: "Tulis ucapan selamat dan doa restu terbaikmu di sini...",
  },

  // Digital Gift Settings (Used in Gift Milestone Modal)
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

  // Interactive Milestones on the Game Map
  // Pos: horizontal coordinate on the path (0 to mapWidth)
  // Element class names and custom configurations
  milestones: [
    {
      id: "welcome",
      pos: 850,
      imgUrl: "https://cdn-uploads.owlink.id/contenful/game-java/parkinfo.png",
      width: 140,
      height: 180,
      action: "openModal",
      dialogText: "",
      modalId: "modal-story"
    },
    {
      id: "wood-bird",
      pos: 400,
      imgUrl: "https://cdn-uploads.owlink.id/contenful/game-java/mailbox.png",
      width: 140,
      height: 180,
      action: "openModal",
      dialogText: "",
      modalId: "modal-welcome"
    },
    {
      id: "gallery",
      pos: 1400,
      imgUrl: "https://cdn-uploads.owlink.id/contenful/game-java/crew.png", // Stand/floating elements
      width: 170,
      height: 180,
      action: "openModal",
      dialogText: "",
      modalId: "modal-rsvp",
    },
    {
      id: "mempelai",
      pos: 2150,
      imgUrl: "https://cdn-uploads.owlink.id/contenful/game-java/couple.png",
      width: 160,
      height: 180,
      action: "openModal",
      dialogText: "",
      modalId: "modal-mempelai"
    },
    {
      id: "gift",
      pos: 1725,
      imgUrl: "https://cdn-uploads.owlink.id/contenful/game-java/gift.png",
      width: 120,
      height: 140,
      action: "openModal",
      dialogText: "",
      modalId: "modal-gift"
    },
    {
      id: "wedding-easel",
      pos: 1950,
      imgUrl: "https://cdn-uploads.owlink.id/contenful/game-java/wedding_sign.png",
      width: 160,
      height: 190,
      action: "none",
      dialogText: ""
    }
  ],

  // Extra animations & floating entities for visuals
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
