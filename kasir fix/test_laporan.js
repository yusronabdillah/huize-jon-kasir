const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  let errors = [];
  page.on('pageerror', err => errors.push(err.message));
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });

  await page.goto(`file://${__dirname}/Aplikasi_Kasir_VPOS.html`, { waitUntil: 'networkidle0' });

  // 1. Login as owner
  await page.evaluate(() => {
    document.getElementById('login-pin').value = '1234';
    handleLogin();
  });
  await new Promise(r => setTimeout(r, 1000));
  
  // 2. Add dummy data manually directly to state
  await page.evaluate(async () => {
    let td = new Date().toISOString();
    transactions.push({ id: 't1', date: td, total: 50000, method: 'Tunai', items: [] });
    transactions.push({ id: 't2', date: td, total: 20000, method: 'QRIS', items: [] });
    expArr.push({ id: 'e1', date: td, amount: 15000, note: 'Beli gula', category: 'Bahan Baku' });
    await S('pos_transactions', transactions);
    await S('pos_expenses', expArr);
    navigate('laporan');
  });
  await new Promise(r => setTimeout(r, 1000));

  // 3. Verify render
  const html = await page.evaluate(() => document.getElementById('content-area').innerHTML);
  
  // Should have Uang Masuk = 70.000, Keluar = 15.000, Sisa = 55.000
  if (!html.includes('70.000')) errors.push("Test failed: Uang Masuk missing or incorrect.");
  if (!html.includes('15.000')) errors.push("Test failed: Uang Keluar missing or incorrect.");
  if (!html.includes('55.000')) errors.push("Test failed: Sisa Uang missing or incorrect.");

  if (errors.length > 0) {
      console.log("❌ LAPORAN TEST FAILED:", errors);
  } else {
      console.log("✅ LAPORAN TEST PASSED SUCCESSFULLY.");
  }
  await browser.close();
})();
