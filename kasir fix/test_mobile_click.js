const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  const dir = "C:\\Users\\Windows\\.gemini\\antigravity\\brain\\fbb3f0c3-32c7-43d5-a9d3-7afd92dded1f";
  
  await page.setViewport({ width: 375, height: 812, isMobile: true });
  await page.goto(`file://${__dirname}/index.html`, { waitUntil: 'networkidle0' });
  
  // Login
  await page.evaluate(() => {
    let p = document.getElementById('login-pin');
    if(p) { p.value = '1234'; window.handleLogin(); }
  });
  await new Promise(r => setTimeout(r, 1500));

  // Tap "Semua" button
  await page.evaluate(() => {
    let btn = Array.from(document.querySelectorAll('.cat-tab')).find(el => el.textContent === 'Semua');
    if(btn) btn.click();
  });
  
  await new Promise(r => setTimeout(r, 1000));

  await page.screenshot({ path: path.join(dir, `mobile_cat_semua.png`), fullPage: false });
  console.log('✅ Captured Category Click Screenshot');

  await browser.close();
})();
