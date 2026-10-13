const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  const dir = "C:\\Users\\Windows\\.gemini\\antigravity\\brain\\fbb3f0c3-32c7-43d5-a9d3-7afd92dded1f";
  
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(`file://${__dirname}/index.html`, { waitUntil: 'networkidle0' });
  
  // Login
  await page.waitForSelector('#login-pin', {timeout: 5000});
  await page.type('#login-pin', '1234');
  await page.click('button[onclick="handleLogin()"]');
  
  await new Promise(r => setTimeout(r, 4000));

  await page.evaluate(async () => {
    window.transactions = [];
    window.expArr = [];
    
    let d = new Date().toISOString();
    window.transactions.push({ id: 't1', total: 15000, date: d, items: [{name: 'Kopi', qty: 1}], method: 'Tunai' });
    window.expArr.push({ id: 'e1', category: 'Tambah Uang Kas', amount: 200000, date: d, note: 'Modal' });
    window.expArr.push({ id: 'e2', category: 'Listrik', amount: 20000, date: d, note: 'Token Listrik' });
    
    // Render Pengeluaran
    window.currentRoute = 'pengeluaran';
    window.renderPengeluaran();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(dir, `test_pengeluaran_revert.png`) });
  
  // Render Laporan
  await page.evaluate(async () => {
    window.currentRoute = 'laporan';
    window.renderLaporan();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(dir, `test_laporan_revert.png`) });

  console.log('✅ Captured Revert Test');
  await browser.close();
})();
