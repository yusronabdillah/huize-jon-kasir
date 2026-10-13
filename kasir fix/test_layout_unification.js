const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  await page.goto(`http://localhost:5173/`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  // Login as Owner
  await page.evaluate(() => {
    let p = document.getElementById('login-pin');
    if(p) { p.value = '1234'; window.handleLogin(); }
  });
  await new Promise(r => setTimeout(r, 1000));

  const artifactDir = "C:\\Users\\Windows\\.gemini\\antigravity\\brain\\fbb3f0c3-32c7-43d5-a9d3-7afd92dded1f";

  // Setup Dummy Session
  await page.evaluate(() => { sessionStorage.setItem('pos_user', JSON.stringify({name: 'Admin', role: 'Owner'})); });

  // Kasir Layout
  await page.evaluate(() => { window.currentRoute = 'kasir'; window.renderApp(); window.renderPage(); });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(artifactDir, 'layout_kasir.png') });

  // Dashboard Layout
  await page.evaluate(() => { window.currentRoute = 'dashboard'; window.renderApp(); window.renderPage(); });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(artifactDir, 'layout_dashboard.png') });

  // Pengeluaran Layout
  await page.evaluate(() => { window.currentRoute = 'pengeluaran'; window.renderApp(); window.renderPage(); });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(artifactDir, 'layout_pengeluaran.png') });

  // Produk Layout
  await page.evaluate(() => { window.currentRoute = 'produk'; window.renderApp(); window.renderPage(); });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(artifactDir, 'layout_produk.png') });

  console.log("Screenshots captured!");
  await browser.close();
})();
