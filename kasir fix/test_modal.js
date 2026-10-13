const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  const dir = "C:\\Users\\Windows\\.gemini\\antigravity\\brain\\fbb3f0c3-32c7-43d5-a9d3-7afd92dded1f";
  
  // Test desktop
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(`file://${__dirname}/Aplikasi_Kasir_VPOS.html`, { waitUntil: 'networkidle0' });
  
  // Login
  await page.evaluate(() => {
    let p = document.getElementById('login-pin');
    if(p) { p.value = '1234'; window.handleLogin(); }
  });
  await new Promise(r => setTimeout(r, 1500));
  
  // Open checkout modal directly
  await page.evaluate(() => {
    let p = window.products.find(x => x.id === 'p20');
    window.cart.push({ ...p, qty: 1, price: p.price, cart_id: '101' });
    window.renderKasir();
    window.openCheckoutModal();
  });
  await new Promise(r => setTimeout(r, 500));

  await page.screenshot({ path: path.join(dir, `modal_fixed_desktop.png`), fullPage: false });
  console.log('✅ Captured Modal Desktop');

  // Test mobile (375px)
  await page.setViewport({ width: 375, height: 812, isMobile: true });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(dir, `modal_fixed_mobile.png`), fullPage: false });
  console.log('✅ Captured Modal Mobile');

  await browser.close();
})();
