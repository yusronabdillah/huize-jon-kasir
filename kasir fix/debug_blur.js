const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('requestfailed', request => console.log('PAGE REQUEST FAILED:', request.url(), request.failure().errorText));

  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(`file://${__dirname}/Aplikasi_Kasir_VPOS.html`, { waitUntil: 'networkidle0' });

  await page.evaluate(() => {
    let p = document.getElementById('login-pin');
    if(p) { p.value = '1234'; window.handleLogin(); }
  });
  
  await new Promise(r => setTimeout(r, 1000));
  
  // check if any overlay is active
  let modalActive = await page.evaluate(() => document.getElementById('modal') && document.getElementById('modal').classList.contains('active'));
  let sidebarOverlayActive = await page.evaluate(() => document.getElementById('sidebar-overlay') && document.getElementById('sidebar-overlay').classList.contains('active'));
  let activeElement = await page.evaluate(() => document.activeElement.tagName);
  
  console.log('Modal active:', modalActive);
  console.log('Sidebar Overlay active:', sidebarOverlayActive);
  console.log('Active element:', activeElement);

  await browser.close();
})();
