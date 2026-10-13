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

  // Inject data
  await page.evaluate(async () => {
    let now = new Date();
    let today = now.toISOString().split('T')[0];
    
    // Create a specific transaction for "2026-07-05"
    window.transactions = [
      { id:'1', date: today + 'T10:00:00Z', total: 150000, items:[] },
      { id:'2', date: '2026-07-05T14:00:00Z', total: 350000, items:[] },
      { id:'3', date: '2026-07-05T15:00:00Z', total: 50000, items:[] }
    ];
    await window.S('pos_transactions', window.transactions);
  });
  
  await page.evaluate(() => { window.navigate('dashboard'); });
  await new Promise(r => setTimeout(r, 1000));

  const artifactDir = "C:\\Users\\Windows\\.gemini\\antigravity\\brain\\fbb3f0c3-32c7-43d5-a9d3-7afd92dded1f";
  
  // Screenshot 1: Hari Ini
  await page.evaluate(() => { window.dashboardPeriodeType = 'hari ini'; window.renderDashboard(); });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(artifactDir, 'dashboard_toggle_hari_ini.png') });

  // Screenshot 2: Tanggal (2026-07-05)
  await page.evaluate(() => { 
    window.dashboardPeriodeType = 'tanggal'; 
    window.dashboardPeriodeValue = '2026-07-05'; 
    window.renderDashboard(); 
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(artifactDir, 'dashboard_toggle_tanggal.png') });

  // Screenshot 3: Bulan (2025-01, empty, to show Rp 0)
  await page.evaluate(() => { 
    window.dashboardPeriodeType = 'bulan'; 
    window.dashboardPeriodeValue = '2025-01'; 
    window.renderDashboard(); 
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(artifactDir, 'dashboard_toggle_bulan.png') });

  console.log("✅ New screenshots captured!");
  await browser.close();
})();
