const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  await page.goto(`file://${__dirname}/Aplikasi_Kasir_VPOS.html`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  // Login
  await page.evaluate(() => {
    let p = document.getElementById('login-pin');
    if(p) { p.value = '1234'; window.handleLogin(); }
  });
  await new Promise(r => setTimeout(r, 1000));

  const artifactDir = "C:\\Users\\Windows\\.gemini\\antigravity\\brain\\fbb3f0c3-32c7-43d5-a9d3-7afd92dded1f";
  
  // 1. Screenshot Pengeluaran
  await page.evaluate(() => { window.navigate('pengeluaran'); });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(artifactDir, 'pengeluaran_no_buttons.png') });

  // 2. Screenshot Laporan
  await page.evaluate(() => { window.navigate('laporan'); });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(artifactDir, 'laporan_no_buttons.png') });

  // 3. Screenshot Setelan
  await page.evaluate(() => { window.navigate('setelan'); });
  await new Promise(r => setTimeout(r, 500));
  
  // Scroll down a bit in Setelan if needed
  await page.evaluate(() => { window.scrollBy(0, 500); });
  await new Promise(r => setTimeout(r, 200));
  
  await page.screenshot({ path: path.join(artifactDir, 'setelan_with_buttons.png') });

  console.log("✅ Screenshots for Export/Reset relocation captured!");
  await browser.close();
})();
