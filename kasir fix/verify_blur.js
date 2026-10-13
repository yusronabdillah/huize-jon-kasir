const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  const artifactDir = "C:\\Users\\Windows\\.gemini\\antigravity\\brain\\fbb3f0c3-32c7-43d5-a9d3-7afd92dded1f";
  
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(`file://${__dirname}/Aplikasi_Kasir_VPOS.html`, { waitUntil: 'networkidle0' });

  // Login
  await page.evaluate(() => {
    let p = document.getElementById('login-pin');
    if(p) { p.value = '1234'; window.handleLogin(); }
  });
  
  await new Promise(r => setTimeout(r, 1000));
  
  // Click on "POS Kasir" nav-item instead of calling navigate directly
  await page.evaluate(() => {
    let navs = document.querySelectorAll('.nav-item');
    for (let nav of navs) {
       if (nav.innerText.includes('Kasir')) {
          nav.click();
       }
    }
  });
  
  await new Promise(r => setTimeout(r, 500));
  
  await page.screenshot({ path: path.join(artifactDir, 'desktop_kasir_verified.png') });
  console.log("✅ Verification screenshot captured!");

  await browser.close();
})();
