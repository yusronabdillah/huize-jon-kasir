const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 }); // Desktop lebar
  
  await page.goto(`file://${__dirname}/Aplikasi_Kasir_VPOS.html`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));
  
  const artifactDir = "C:\\Users\\Windows\\.gemini\\antigravity\\brain\\fbb3f0c3-32c7-43d5-a9d3-7afd92dded1f";
  
  // Screenshot Login Page (1920x1080)
  await page.screenshot({ path: path.join(artifactDir, 'login_centered_desktop.png') });

  // Screenshot Login Page (1366x768) - Laptop
  await page.setViewport({ width: 1366, height: 768 });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(artifactDir, 'login_centered_laptop.png') });

  console.log("✅ Screenshots for login centering captured!");
  await browser.close();
})();
