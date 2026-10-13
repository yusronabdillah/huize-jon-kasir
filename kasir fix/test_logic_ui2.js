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
  
  // Wait for firebase to load everything
  await new Promise(r => setTimeout(r, 4000));

  await page.evaluate(async () => {
    // Override arrays
    window.transactions = [];
    window.expArr = [];
    window.empArr = [{ id: 'k1', name: 'John Doe', role: 'Kasir', startDate: '2026-07-01', pin: '1234', status: 'Aktif' }];
    
    // Add transaction 50k
    window.transactions.push({ id: 't1', total: 50000, date: new Date().toISOString(), items: [] });
    // Add Tambah Uang 100k
    window.expArr.push({ id: 'e1', category: 'Tambah Uang Kas', amount: 100000, date: new Date().toISOString(), note: 'Modal awal', source: 'Kas Penjualan' });
    // Add Pengeluaran 30k
    window.expArr.push({ id: 'e2', category: 'Listrik', amount: 30000, date: '2026-07-18T14:35:00.000Z', note: 'Bayar Listrik', source: 'Uang Pribadi' });
    
    // Render
    window.currentRoute = 'pengeluaran';
    window.renderPengeluaran();
  });
  await new Promise(r => setTimeout(r, 1000));
  
  await page.screenshot({ path: path.join(dir, `test1_uang_kas.png`) });
  console.log('✅ Captured Test 1 & 2');

  // Test 3: Karyawan UI
  await page.evaluate(() => {
    window.currentRoute = 'karyawan';
    window.renderKaryawan();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(dir, `test3_karyawan.png`) });
  
  // Open Edit Karyawan Modal
  await page.evaluate(() => {
    window.openKaryawanModal('k1');
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(dir, `test3_karyawan_modal.png`) });

  console.log('✅ Captured Test 3');

  await browser.close();
})();
