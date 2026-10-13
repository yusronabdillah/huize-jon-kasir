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
  
  // 2. Go to Pengeluaran page
  await page.evaluate(() => navigate('pengeluaran'));
  await new Promise(r => setTimeout(r, 1000));

  // 3. Test Add Expense (Kas Penjualan)
  await page.evaluate(() => openExpenseModal(null, 'Belanja Bahan'));
  await new Promise(r => setTimeout(r, 500));
  await page.evaluate(() => {
    document.getElementById('exp-amount').value = '25000';
    document.getElementById('exp-source').value = 'Kas Penjualan';
    saveExpense();
  });
  await new Promise(r => setTimeout(r, 1000));

  // 4. Check Laporan page to ensure 'Uang di Kas' deducted properly (because source is Kas Penjualan)
  await page.evaluate(() => navigate('laporan'));
  await new Promise(r => setTimeout(r, 1000));
  
  // Extract just the Uang di Kas total value text
  const uangDiKas1 = await page.evaluate(() => {
      let cards = document.querySelectorAll('.stat-card');
      if (cards.length >= 3) {
          let text = cards[2].innerHTML;
          return text.substring(text.indexOf('Uang di Kas total:'));
      }
      return '';
  });
  
  if (!uangDiKas1.includes('Rp -25.000')) errors.push("Test failed: Laporan Uang di Kas didn't deduct properly for Kas Penjualan.");

  // 5. Go back to Pengeluaran and Add Expense (Uang Pribadi)
  await page.evaluate(() => navigate('pengeluaran'));
  await new Promise(r => setTimeout(r, 1000));
  await page.evaluate(() => openExpenseModal(null, 'Lainnya'));
  await new Promise(r => setTimeout(r, 500));
  await page.evaluate(() => {
    document.getElementById('exp-amount').value = '10000';
    document.getElementById('exp-source').value = 'Uang Pribadi';
    saveExpense();
  });
  await new Promise(r => setTimeout(r, 1000));

  // 6. Check Laporan page again
  await page.evaluate(() => navigate('laporan'));
  await new Promise(r => setTimeout(r, 1000));
  
  const uangDiKas2 = await page.evaluate(() => {
      let cards = document.querySelectorAll('.stat-card');
      if (cards.length >= 3) {
          let text = cards[2].innerHTML;
          return text.substring(text.indexOf('Uang di Kas total:'));
      }
      return '';
  });
  
  if (uangDiKas2.includes('Rp -35.000')) errors.push("Test failed: Laporan Uang di Kas wrongly deducted for Uang Pribadi.");
  
  // 7. Cleanup
  await page.evaluate(() => {
     expArr = [];
     S('pos_expenses', expArr);
  });
  
  if (errors.length > 0) {
      console.log("❌ PENGELUARAN TEST FAILED:", errors);
  } else {
      console.log("✅ PENGELUARAN TEST PASSED SUCCESSFULLY.");
  }
  await browser.close();
})();
