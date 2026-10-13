const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  let errors = [];
  page.on('console', msg => {
      console.log(`BROWSER CONSOLE: ${msg.type().toUpperCase()} - ${msg.text()}`);
      if (msg.type() === 'error') errors.push(msg.text());
  });
  
  page.on('pageerror', err => {
      console.log(`BROWSER ERROR: ${err.message}`);
      errors.push(err.message);
  });

  console.log("Opening local HTML file...");
  // Using file:// protocol
  await page.goto(`file://${__dirname}/Aplikasi_Kasir_VPOS.html`, { waitUntil: 'networkidle0' });

  // Check if login screen rendered
  const html = await page.content();
  if (html.includes('Pilih Pengguna') && html.includes('PIN Akses')) {
      console.log("✅ SUCCESS: Login screen is fully rendered.");
  } else {
      console.log("❌ FAILED: Login screen not found.");
  }
  
  // Wait a bit to ensure async db calls finish
  await new Promise(r => setTimeout(r, 1000));
  
  if (errors.length > 0) {
      console.log("❌ TEST FINISHED WITH JS ERRORS:", errors);
  } else {
      console.log("✅ TEST FINISHED WITHOUT ERRORS.");
  }

  await browser.close();
})();
