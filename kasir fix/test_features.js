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
  
  // Direct modification of cart
  await page.evaluate(() => {
    let p = window.products.find(x => x.id === 'p20');
    window.cart.push({ ...p, qty: 2, price: p.price, cart_id: '123' });
    window.renderKasir();
    window.openCheckoutModal();
  });
  await new Promise(r => setTimeout(r, 500));

  // Fill in customer name
  await page.evaluate(() => {
    document.getElementById('pay-customer').value = 'Budi Santoso';
    let cashInp = document.getElementById('pay-cash');
    if (cashInp) cashInp.value = '50000';
    window.calcChange(40000); 
  });
  await new Promise(r => setTimeout(r, 500));

  await page.screenshot({ path: path.join(dir, `kasir_checkout_customer.png`), fullPage: false });
  console.log('✅ Captured Checkout Modal');

  // 3. Confirm payment to see receipt
  await page.evaluate(() => {
    window.confirmPayment(40000);
  });
  await new Promise(r => setTimeout(r, 500));
  
  await page.screenshot({ path: path.join(dir, `kasir_receipt_wa.png`), fullPage: false });
  console.log('✅ Captured Receipt Modal');

  // 4. Go to Laporan to see table
  await page.evaluate(() => {
    window.closeModal();
    window.navigate('laporan');
  });
  await new Promise(r => setTimeout(r, 1000));
  
  await page.screenshot({ path: path.join(dir, `laporan_pelanggan.png`), fullPage: false });
  console.log('✅ Captured Laporan');

  await browser.close();
})();
