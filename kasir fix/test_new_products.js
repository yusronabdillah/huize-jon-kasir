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
  await new Promise(r => setTimeout(r, 1000));
  
  // Screenshot main POS page (Semua)
  await page.screenshot({ path: path.join(dir, `kasir_semua.png`), fullPage: false });
  console.log('✅ Captured Kasir Semua');
  
  // Click category Non Coffee
  await page.evaluate(() => { window.setCategory('Non Coffee'); });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(dir, `kasir_non_coffee.png`), fullPage: false });
  console.log('✅ Captured Kasir Non Coffee');
  
  // Click category Djajajan
  await page.evaluate(() => { window.setCategory('Djajajan'); });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(dir, `kasir_djajajan.png`), fullPage: false });
  console.log('✅ Captured Kasir Djajajan');
  
  await browser.close();
})();
