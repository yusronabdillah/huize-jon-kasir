const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  // Catch console logs from page
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  
  await page.goto(`file://${__dirname}/Aplikasi_Kasir_VPOS.html`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 500));

  await page.evaluate(() => {
    let p = document.getElementById('login-pin');
    if(p) { p.value = '1234'; window.handleLogin(); }
  });
  await new Promise(r => setTimeout(r, 1000));
  
  await page.evaluate(() => { window.navigate('setelan'); });
  await new Promise(r => setTimeout(r, 500));
  
  await page.evaluate(() => { window.confirmResetDataSettings(); });
  await new Promise(r => setTimeout(r, 500));

  await page.type('#reset-confirm-text', 'HAPUS');
  await new Promise(r => setTimeout(r, 500));
  
  // Click the execute reset button
  await page.click('#btn-reset-confirm');
  await new Promise(r => setTimeout(r, 500));
  
  console.log("Done clicking");

  await browser.close();
})();
