const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  // Catch console logs from page
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  
  await page.goto(`file://${__dirname}/Aplikasi_Kasir_VPOS.html`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 500));

  // Login
  await page.evaluate(() => {
    let p = document.getElementById('login-pin');
    if(p) { p.value = '1234'; window.handleLogin(); }
  });
  await new Promise(r => setTimeout(r, 1000));
  
  // Navigate to Setelan
  await page.evaluate(() => { window.navigate('setelan'); });
  await new Promise(r => setTimeout(r, 500));
  
  // Click Reset Data in Setelan
  await page.evaluate(() => { window.confirmResetDataSettings(); });
  await new Promise(r => setTimeout(r, 500));

  // Check disabled status before typing
  const disabledBefore = await page.evaluate(() => {
    return document.getElementById('btn-reset-confirm').disabled;
  });
  console.log("Disabled before typing:", disabledBefore);

  // Type "HAPUS"
  await page.type('#reset-confirm-text', 'HAPUS');
  await new Promise(r => setTimeout(r, 500));
  
  const disabledAfter = await page.evaluate(() => {
    return document.getElementById('btn-reset-confirm').disabled;
  });
  console.log("Disabled after typing 'HAPUS':", disabledAfter);
  
  // If it's disabled after typing, we found the bug.
  // Wait, let's type it manually using evaluate to trigger oninput in case page.type doesn't trigger oninput
  await page.evaluate(() => {
     let input = document.getElementById('reset-confirm-text');
     input.value = 'HAPUS';
     input.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await new Promise(r => setTimeout(r, 500));
  
  const disabledAfterEvent = await page.evaluate(() => {
    return document.getElementById('btn-reset-confirm').disabled;
  });
  console.log("Disabled after dispatching event:", disabledAfterEvent);

  await browser.close();
})();
