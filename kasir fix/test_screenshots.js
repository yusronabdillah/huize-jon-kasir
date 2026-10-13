const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  await page.goto(`file://${__dirname}/Aplikasi_Kasir_VPOS.html`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  // Login as Owner (role that can see Dashboard)
  await page.evaluate(() => {
    let p = document.getElementById('login-pin');
    if(p) { p.value = '1234'; window.handleLogin(); }
  });
  await new Promise(r => setTimeout(r, 1000));

  // Inject some dummy data so screenshot is not empty
  await page.evaluate(async () => {
    let now = new Date();
    let today = now.toISOString().split('T')[0];
    let yesterdayDate = new Date(now);
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    let yesterday = yesterdayDate.toISOString().split('T')[0];
    
    window.transactions = [
      { id:'1', date: today + 'T10:00:00Z', total: 150000, items:[] },
      { id:'2', date: today + 'T11:00:00Z', total: 50000, items:[] },
      { id:'3', date: yesterday + 'T14:00:00Z', total: 300000, items:[] },
      { id:'4', date: yesterday + 'T15:00:00Z', total: 100000, items:[] }
    ];
    await window.S('pos_transactions', window.transactions);
  });
  
  // Render Dashboard
  await page.evaluate(() => { window.navigate('dashboard'); });
  await new Promise(r => setTimeout(r, 1000));

  const artifactDir = "C:\\Users\\Windows\\.gemini\\antigravity\\brain\\fbb3f0c3-32c7-43d5-a9d3-7afd92dded1f";
  
  // Screenshot 1: Hari Ini
  await page.evaluate(() => { window.dashboardPeriode = 'Hari Ini'; window.renderDashboard(); });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(artifactDir, 'dashboard_hari_ini.png') });

  // Screenshot 2: Kemarin
  await page.evaluate(() => { window.dashboardPeriode = 'Kemarin'; window.renderDashboard(); });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(artifactDir, 'dashboard_kemarin.png') });

  // Screenshot 3: Bulan Ini
  await page.evaluate(() => { window.dashboardPeriode = 'Bulan Ini'; window.renderDashboard(); });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(artifactDir, 'dashboard_bulan_ini.png') });

  console.log("✅ Screenshots captured!");
  await browser.close();
})();
