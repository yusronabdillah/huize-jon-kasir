const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  const dir = "C:\\Users\\Windows\\.gemini\\antigravity\\brain\\fbb3f0c3-32c7-43d5-a9d3-7afd92dded1f";
  
  const sizes = [
    { name: 'iphone_se', w: 375, h: 667 },
    { name: 'iphone_std', w: 390, h: 844 },
    { name: 'iphone_plus', w: 414, h: 896 }
  ];
  
  const pages = [
    { route: 'kasir', title: 'POS Kasir' },
    { route: 'dashboard', title: 'Dashboard' },
    { route: 'laporan', title: 'Laporan' },
    { route: 'produk', title: 'Produk' },
    { route: 'pengeluaran', title: 'Pengeluaran' },
    { route: 'setelan', title: 'Setelan' }
  ];

  for (const size of sizes) {
    await page.setViewport({ width: size.w, height: size.h });
    await page.goto(`file://${__dirname}/Aplikasi_Kasir_VPOS.html`, { waitUntil: 'networkidle0' });
    
    // Login
    await page.evaluate(() => {
      let p = document.getElementById('login-pin');
      if(p) { p.value = '1234'; window.handleLogin(); }
    });
    await new Promise(r => setTimeout(r, 1000));
    
    for (const pg of pages) {
      await page.evaluate((route) => { window.navigate(route); }, pg.route);
      await new Promise(r => setTimeout(r, 300));
      await page.screenshot({ path: path.join(dir, `mobile_${size.name}_${pg.route}.png`), fullPage: false });
      console.log(`✅ ${size.name} - ${pg.title}`);
    }
    
    // Test cart bottom sheet on Kasir page
    if (size.name === 'iphone_std') {
      await page.evaluate(() => { window.navigate('kasir'); });
      await new Promise(r => setTimeout(r, 300));
      
      // Add an item to cart
      await page.evaluate(() => {
        if(products.length > 0) {
          cart.push({ id: products[0].id, name: products[0].name, price: products[0].price, qty: 1, suhu: 'Hot', ukuran: 'Regular', note: '' });
          renderKasir();
        }
      });
      await new Promise(r => setTimeout(r, 300));
      
      // Capture with FAB visible
      await page.screenshot({ path: path.join(dir, `mobile_kasir_with_fab.png`), fullPage: false });
      console.log('✅ Kasir with FAB badge');
      
      // Open bottom sheet
      await page.evaluate(() => { window.toggleCartSheet(); });
      await new Promise(r => setTimeout(r, 400));
      await page.screenshot({ path: path.join(dir, `mobile_kasir_bottom_sheet.png`), fullPage: false });
      console.log('✅ Kasir bottom sheet open');
    }
  }
  
  // Desktop verification (make sure nothing broke)
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(`file://${__dirname}/Aplikasi_Kasir_VPOS.html`, { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    let p = document.getElementById('login-pin');
    if(p) { p.value = '1234'; window.handleLogin(); }
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(dir, `desktop_kasir_check.png`), fullPage: false });
  console.log('✅ Desktop kasir verified');

  await browser.close();
  console.log('\n🎉 All screenshots captured!');
})();
