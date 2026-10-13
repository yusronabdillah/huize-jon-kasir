const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  const artifactDir = "C:\\Users\\Windows\\.gemini\\antigravity\\brain\\fbb3f0c3-32c7-43d5-a9d3-7afd92dded1f";
  
  // 1. Mobile Viewport (iPhone XR: 414 x 896)
  await page.setViewport({ width: 414, height: 896 });
  
  await page.goto(`file://${__dirname}/Aplikasi_Kasir_VPOS.html`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  // Login as Owner
  await page.evaluate(() => {
    let p = document.getElementById('login-pin');
    if(p) { p.value = '1234'; window.handleLogin(); }
  });
  await new Promise(r => setTimeout(r, 1000));
  
  // Screenshot 1: Mobile with sidebar hidden (hamburger visible)
  await page.screenshot({ path: path.join(artifactDir, 'mobile_sidebar_hidden.png') });

  // Open the sidebar
  await page.evaluate(() => { window.toggleMobileSidebar(); });
  await new Promise(r => setTimeout(r, 500));
  
  // Screenshot 2: Mobile with sidebar shown
  await page.screenshot({ path: path.join(artifactDir, 'mobile_sidebar_shown.png') });
  
  // Switch to desktop view for Settings
  await page.setViewport({ width: 1280, height: 800 });
  await new Promise(r => setTimeout(r, 500));

  // Navigate to Setelan
  await page.evaluate(() => { window.navigate('setelan'); });
  await new Promise(r => setTimeout(r, 500));

  // Screenshot 3: Settings UI (Bluetooth tab default)
  await page.screenshot({ path: path.join(artifactDir, 'settings_bt_tab.png') });

  // Click USB tab
  await page.evaluate(() => { 
      // Click the USB tab which is the second pay-tab in settings
      const tabs = document.querySelectorAll('.payment-tabs .pay-tab');
      if (tabs.length > 1) tabs[1].click();
  });
  await new Promise(r => setTimeout(r, 500));
  
  // Screenshot 4: Settings UI (USB tab)
  await page.screenshot({ path: path.join(artifactDir, 'settings_usb_tab.png') });

  console.log("✅ Screenshots for responsive and USB updates captured!");
  await browser.close();
})();
