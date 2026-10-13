const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  const artifactDir = "C:\\Users\\Windows\\.gemini\\antigravity\\brain\\fbb3f0c3-32c7-43d5-a9d3-7afd92dded1f";
  
  // Test 1: Mobile view (414px) - sidebar should be fully hidden
  await page.setViewport({ width: 414, height: 896 });
  await page.goto(`file://${__dirname}/Aplikasi_Kasir_VPOS.html`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));
  await page.evaluate(() => {
    let p = document.getElementById('login-pin');
    if(p) { p.value = '1234'; window.handleLogin(); }
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(artifactDir, 'mobile_final_closed.png') });
  
  // Test 2: Mobile view with sidebar open
  await page.evaluate(() => { window.toggleMobileSidebar(); });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(artifactDir, 'mobile_final_open.png') });
  
  // Test 3: Navigate to dashboard on mobile
  await page.evaluate(() => { window.navigate('dashboard'); });
  await new Promise(r => setTimeout(r, 500));
  // sidebar should auto-close (toggleMobileSidebar called in onclick)
  await page.screenshot({ path: path.join(artifactDir, 'mobile_dashboard.png') });
  
  // Test 4: Desktop view (1280px) 
  await page.setViewport({ width: 1280, height: 800 });
  await new Promise(r => setTimeout(r, 500));
  await page.evaluate(() => { window.navigate('kasir'); });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(artifactDir, 'desktop_kasir_final.png') });

  // Test 5: Desktop Settings with USB tab
  await page.evaluate(() => { window.navigate('setelan'); });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(artifactDir, 'desktop_setelan_final.png') });

  console.log("✅ All final screenshots captured!");
  await browser.close();
})();
