const fs = require('fs');
const path = require('path');
const vm = require('vm');

/**
 * Script untuk sinkronisasi SEO & Meta Tags dari js/config.js ke index.html secara otomatis.
 * Sangat berguna ketika Anda membuat template undangan baru untuk klien Anda, 
 * sehingga Anda tidak perlu mengedit file index.html secara manual!
 * 
 * Cara Menjalankan:
 * Buka terminal di VS Code, lalu jalankan perintah:
 * node sync.js
 */

const CONFIG_FILE = path.join(__dirname, 'js', 'config.js');
const HTML_FILE = path.join(__dirname, 'index.html');

try {
  // 1. Baca file config.js
  if (!fs.existsSync(CONFIG_FILE)) {
    console.error(`❌ File konfigurasi tidak ditemukan di: ${CONFIG_FILE}`);
    process.exit(1);
  }
  const configContent = fs.readFileSync(CONFIG_FILE, 'utf8');

  // 2. Evaluasi config.js di sandbox Node.js untuk mengambil objek weddingConfig
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(configContent, sandbox);
  const config = sandbox.window.weddingConfig;

  if (!config || !config.seo) {
    console.error("❌ Gagal membaca properti 'seo' dari window.weddingConfig di js/config.js!");
    process.exit(1);
  }

  // 3. Baca file index.html
  if (!fs.existsSync(HTML_FILE)) {
    console.error(`❌ File index.html tidak ditemukan di: ${HTML_FILE}`);
    process.exit(1);
  }
  let htmlContent = fs.readFileSync(HTML_FILE, 'utf8');

  // 4. Lakukan penggantian tag SEO & Open Graph di index.html menggunakan Regex
  let updated = false;

  // Sync <title>
  if (config.seo.pageTitle) {
    const titleRegex = /<title>.*?<\/title>/;
    if (titleRegex.test(htmlContent)) {
      htmlContent = htmlContent.replace(titleRegex, `<title>${config.seo.pageTitle}</title>`);
      updated = true;
    }
  }

  // Sync <meta name="description">
  if (config.seo.description) {
    const descRegex = /<meta name="description"\s+content="[\s\S]*?">/;
    if (descRegex.test(htmlContent)) {
      htmlContent = htmlContent.replace(descRegex, `<meta name="description"\n    content="${config.seo.description}">`);
      updated = true;
    }
  }

  // Sync <meta property="og:title">
  if (config.seo.ogTitle) {
    const ogTitleRegex = /<meta property="og:title" content=".*?">/;
    if (ogTitleRegex.test(htmlContent)) {
      htmlContent = htmlContent.replace(ogTitleRegex, `<meta property="og:title" content="${config.seo.ogTitle}">`);
      updated = true;
    }
  }

  // Sync <meta property="og:description">
  if (config.seo.ogDescription) {
    const ogDescRegex = /<meta property="og:description" content=".*?">/;
    if (ogDescRegex.test(htmlContent)) {
      htmlContent = htmlContent.replace(ogDescRegex, `<meta property="og:description" content="${config.seo.ogDescription}">`);
      updated = true;
    }
  }

  // Sync <meta property="og:image">
  if (config.seo.ogImage) {
    const ogImageRegex = /<meta property="og:image" content=".*?">/;
    if (ogImageRegex.test(htmlContent)) {
      htmlContent = htmlContent.replace(ogImageRegex, `<meta property="og:image" content="${config.seo.ogImage}">`);
      updated = true;
    }
  }

  if (updated) {
    fs.writeFileSync(HTML_FILE, htmlContent, 'utf8');
    console.log("=========================================================================");
    console.log("✅ BERHASIL! SEO & Open Graph (WhatsApp Preview) telah disinkronkan!");
    console.log("=========================================================================");
    console.log(`📌 Title:       ${config.seo.pageTitle}`);
    console.log(`📌 Description: ${config.seo.description}`);
    console.log(`📌 WA Title:    ${config.seo.ogTitle}`);
    console.log(`📌 WA Image:    ${config.seo.ogImage}`);
    console.log("=========================================================================");
    console.log("💡 Tips: Jika sudah di-upload ke server hosting, gunakan Facebook Sharing Debugger");
    console.log("   (https://developers.facebook.com/tools/debug) untuk membersihkan cache WhatsApp.");
  } else {
    console.log("⚠️ Tidak ada perubahan yang perlu disinkronkan atau format tag HTML tidak cocok.");
  }

} catch (err) {
  console.error("❌ Terjadi kesalahan saat sinkronisasi:", err.message);
  process.exit(1);
}
