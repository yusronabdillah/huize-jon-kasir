const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  const dir = "C:\\Users\\Windows\\.gemini\\antigravity\\brain\\fbb3f0c3-32c7-43d5-a9d3-7afd92dded1f";
  
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(`file://${__dirname}/index.html`, { waitUntil: 'networkidle0' });
  
  // Login and Mock Firebase
  await page.evaluate(() => {
    window.S = async () => {};
    window.x = async () => [];
    let p = document.getElementById('login-pin');
    if(p) { p.value = '1234'; window.handleLogin(); }
  });
  await new Promise(r => setTimeout(r, 1000));

  // Reset data for a clean test
  await page.evaluate(async () => {
    window.transactions = [];
    window.expArr = [];
    window.empArr = [{ id: 'k1', name: 'John Doe', role: 'Kasir', startDate: '2026-07-01', pin: '1234', status: 'Aktif' }];
  });
  await new Promise(r => setTimeout(r, 500));

  // Test 1: Simulasi Keuangan
  await page.evaluate(async () => {
    // 1. Tambah Uang Rp100.000
    window.expArr.push({ id: 'e1', category: 'Tambah Uang Kas', amount: 100000, date: new Date().toISOString(), note: 'Modal awal' });
    // 2. Penjualan Rp50.000
    window.transactions.push({ id: 't1', total: 50000, date: new Date().toISOString(), items: [] });
    // 3. Pengeluaran Rp30.000 (Should NOT reduce Uang Kas Sekarang)
    
    // Switch to pengeluaran tab to test
    window.currentRoute = 'pengeluaran';
    window.renderPengeluaran();
  });
  await new Promise(r => setTimeout(r, 500));
  
  // Open modal pengeluaran and create pengeluaran
  await page.evaluate(() => {
     window.openExpenseModal();
  });
  await new Promise(r => setTimeout(r, 500));
  
  await page.evaluate(() => {
     document.getElementById('exp-cat').value = 'Listrik';
     document.getElementById('exp-amount').value = '30.000';
     document.getElementById('exp-date').value = '2026-07-18T14:35';
     document.getElementById('exp-note').value = 'Bayar Listrik';
     window.saveExpense();
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
