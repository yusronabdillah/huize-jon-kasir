const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  const dir = "C:\\Users\\Windows\\.gemini\\antigravity\\brain\\fbb3f0c3-32c7-43d5-a9d3-7afd92dded1f";
  
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(`file://${__dirname}/Aplikasi_Kasir_VPOS.html`, { waitUntil: 'networkidle0' });
  
  // Login
  await page.evaluate(() => {
    let p = document.getElementById('login-pin');
    if(p) { p.value = '1234'; window.handleLogin(); }
  });
  await new Promise(r => setTimeout(r, 1500));
  
  // Create a mock transaction and open receipt
  await page.evaluate(() => {
    window.showReceipt({
        id: "1720850000123",
        date: new Date().toISOString(),
        customer_name: "Budi Santoso",
        dine_mode: "Dine In",
        method: "QRIS",
        total: 20000,
        cash: 0,
        items: [{ name: "Huize Jon Wine Coffee (Hot)", qty: 1, price: 20000 }]
    });
  });
  await new Promise(r => setTimeout(r, 500));
  
  // Emulate print media type
  await page.emulateMediaType('print');
  await new Promise(r => setTimeout(r, 500));

  await page.screenshot({ path: path.join(dir, `print_preview.png`), fullPage: false });
  console.log('✅ Captured Print Preview Screenshot');

  await browser.close();
})();
