const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  
  await page.goto(`file://${__dirname}/Aplikasi_Kasir_VPOS.html`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  // Login
  await page.evaluate(() => {
    let p = document.getElementById('login-pin');
    if(p) { p.value = '1234'; window.handleLogin(); }
  });
  await new Promise(r => setTimeout(r, 1000));

  const artifactDir = "C:\\Users\\Windows\\.gemini\\antigravity\\brain\\fbb3f0c3-32c7-43d5-a9d3-7afd92dded1f";
  
  // Navigate to Setelan
  await page.evaluate(() => { window.navigate('setelan'); });
  await new Promise(r => setTimeout(r, 500));
  
  // Open Reset Modal
  await page.evaluate(() => { window.confirmResetDataSettings(); });
  await new Promise(r => setTimeout(r, 500));
  
  // Screenshot 1: Before typing
  await page.screenshot({ path: path.join(artifactDir, 'reset_modal_before.png') });

  // Type "hapus" (lowercase, with trailing space to test trim and uppercase)
  console.log("Typing 'hapus ' into the input field...");
  await page.type('#reset-confirm-text', 'hapus ');
  await new Promise(r => setTimeout(r, 500));
  
  // Actually, page.type might not trigger inline string evaluated oninputs if we rely on DOM level.
  // Wait, puppeteer page.type triggers standard InputEvent, so it should trigger `oninput`.
  // Let's also do a programmatic dispatch just in case.
  await page.evaluate(() => {
      let el = document.getElementById('reset-confirm-text');
      el.value = 'hapus ';
      el.dispatchEvent(new Event('input', {bubbles:true}));
  });
  await new Promise(r => setTimeout(r, 500));
  
  // Screenshot 2: After typing
  await page.screenshot({ path: path.join(artifactDir, 'reset_modal_after.png') });

  const isDisabled = await page.evaluate(() => document.getElementById('btn-reset-confirm').disabled);
  console.log("Button disabled state is now:", isDisabled);

  console.log("✅ Screenshots for reset modal captured!");
  await browser.close();
})();
