const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  let errors = [];
  let jsErrors = [];
  page.on('pageerror', err => jsErrors.push(err.message));

  await page.goto(`file://${__dirname}/Aplikasi_Kasir_VPOS.html`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  // Login
  await page.evaluate(() => {
    let p = document.getElementById('login-pin');
    if(p) { p.value = '1234'; window.handleLogin(); }
  });
  await new Promise(r => setTimeout(r, 1000));

  // Navigate to Pengeluaran
  await page.evaluate(() => window.renderPengeluaran());
  await new Promise(r => setTimeout(r, 1000));

  let html = await page.evaluate(() => document.getElementById('content-area').innerHTML);

  // === CHECK 1: Panel "Asal Uang di Kas" ===
  if (!html.includes('Asal Uang di Kas')) errors.push('MISSING: Panel "Asal Uang di Kas"');
  if (!html.includes('Tambah Uang (Manual)')) errors.push('MISSING: Breakdown "Tambah Uang (Manual)"');
  if (!html.includes('Sisa Penjualan')) errors.push('MISSING: Breakdown "Sisa Penjualan"');
  if (!html.includes('Total di Kas')) errors.push('MISSING: Breakdown "Total di Kas"');

  // === CHECK 2: Tombol "+ Tambah Uang" ===
  if (!html.includes('+ Tambah Uang')) errors.push('MISSING: Tombol "+ Tambah Uang"');

  // === CHECK 3: Tombol "Export CSV" ===
  if (!html.includes('Export CSV')) errors.push('MISSING: Tombol "Export CSV"');

  // === CHECK 4: Tombol "Reset Data" ===
  if (!html.includes('Reset Data')) errors.push('MISSING: Tombol "Reset Data"');

  // === CHECK 5: Existing elements still present ===
  if (!html.includes('Pencatatan Pengeluaran')) errors.push('MISSING: Judul "Pencatatan Pengeluaran"');
  if (!html.includes('+ Catat Pengeluaran')) errors.push('MISSING: Tombol "+ Catat Pengeluaran"');
  if (!html.includes('Pengeluaran Hari Ini')) errors.push('MISSING: Kartu "Pengeluaran Hari Ini"');
  if (!html.includes('Pengeluaran Bulan Ini')) errors.push('MISSING: Kartu "Pengeluaran Bulan Ini"');
  if (!html.includes('Uang Tersedia Saat Ini')) errors.push('MISSING: Kartu "Uang Tersedia Saat Ini"');
  if (!html.includes('AKSI CEPAT')) errors.push('MISSING: Baris "Aksi Cepat"');

  // === CHECK 6: Test Tambah Uang functionality ===
  await page.evaluate(() => window.addCashModal());
  await new Promise(r => setTimeout(r, 500));
  let modalHtml = await page.evaluate(() => document.getElementById('modal-content').innerHTML);
  if (!modalHtml.includes('Tambah Uang ke Kas')) errors.push('MISSING: Modal Tambah Uang tidak muncul');
  await page.evaluate(() => {
    document.getElementById('cash-amount').value = '500000';
    document.getElementById('cash-note').value = 'Modal pagi';
    window.saveCashInput();
  });
  await new Promise(r => setTimeout(r, 1000));

  html = await page.evaluate(() => document.getElementById('content-area').innerHTML);
  if (!html.includes('500.000')) errors.push('FAIL: Tambah Uang Kas 500.000 tidak muncul di panel breakdown');

  // === CHECK 7: Test Catat Pengeluaran ===
  await page.evaluate(() => window.openExpenseModal(null, 'Belanja Bahan'));
  await new Promise(r => setTimeout(r, 500));
  await page.evaluate(() => {
    document.getElementById('exp-amount').value = '50000';
    document.getElementById('exp-source').value = 'Kas Penjualan';
    window.saveExpense();
  });
  await new Promise(r => setTimeout(r, 1000));

  html = await page.evaluate(() => document.getElementById('content-area').innerHTML);
  if (!html.includes('Belanja Bahan')) errors.push('FAIL: Pengeluaran "Belanja Bahan" tidak muncul di tabel');
  if (!html.includes('50.000')) errors.push('FAIL: Nominal 50.000 tidak muncul di tabel');

  // === CHECK 8: Test Edit ===
  let expId = await page.evaluate(() => window.expArr.find(e => e.category === 'Belanja Bahan').id);
  await page.evaluate((id) => window.openExpenseModal(id), expId);
  await new Promise(r => setTimeout(r, 500));
  let editModalHtml = await page.evaluate(() => document.getElementById('modal-content').innerHTML);
  if (!editModalHtml.includes('Edit Pengeluaran')) errors.push('FAIL: Modal Edit tidak bertuliskan "Edit Pengeluaran"');
  if (!editModalHtml.includes('50.000')) errors.push('FAIL: Modal Edit tidak menampilkan nominal sebelumnya');
  await page.evaluate(() => window.closeModal());
  await new Promise(r => setTimeout(r, 300));

  // === CHECK 9: Test Hapus ===
  await page.evaluate((id) => window.confirmDeleteExpense(id), expId);
  await new Promise(r => setTimeout(r, 500));
  let deleteModalHtml = await page.evaluate(() => document.getElementById('modal-content').innerHTML);
  if (!deleteModalHtml.includes('Konfirmasi Hapus')) errors.push('FAIL: Dialog konfirmasi hapus tidak muncul');
  if (!deleteModalHtml.includes('Belanja Bahan')) errors.push('FAIL: Dialog hapus tidak menampilkan nama kategori');
  await page.evaluate((id) => window.deleteExpense(id), expId);
  await new Promise(r => setTimeout(r, 1000));

  let tbodyAfterDelete = await page.evaluate(() => document.querySelector('.data-table tbody').innerHTML);
  if (tbodyAfterDelete.includes('Belanja Bahan')) errors.push('FAIL: Pengeluaran tidak terhapus dari tabel setelah klik Hapus');

  // === CHECK 10: Test Reset Data ===
  await page.evaluate(() => window.resetPengeluaranData());
  await new Promise(r => setTimeout(r, 500));
  let resetModalHtml = await page.evaluate(() => document.getElementById('modal-content').innerHTML);
  if (!resetModalHtml.includes('Reset Data Pengeluaran')) errors.push('FAIL: Dialog reset tidak muncul');
  await page.evaluate(() => window.closeModal());

  // Cleanup
  await page.evaluate(async () => {
    window.expArr = [];
    await window.S('pos_expenses', window.expArr);
  });

  if (jsErrors.length > 0) console.log("⚠ JS ERRORS:", jsErrors);

  if (errors.length > 0) {
      console.log("❌ PENGELUARAN UI AUDIT FAILED:");
      errors.forEach((e, i) => console.log(`  ${i+1}. ${e}`));
  } else {
      console.log("✅ PENGELUARAN UI AUDIT PASSED — All 10 checks verified:");
      console.log("  1. Panel 'Asal Uang di Kas' with 3 breakdown items");
      console.log("  2. Button '+ Tambah Uang'");
      console.log("  3. Button 'Export CSV'");
      console.log("  4. Button 'Reset Data'");
      console.log("  5. All existing elements preserved");
      console.log("  6. Tambah Uang modal + save works");
      console.log("  7. Catat Pengeluaran + save works");
      console.log("  8. Edit modal opens with pre-filled data");
      console.log("  9. Hapus dialog + delete works");
      console.log("  10. Reset Data dialog appears");
  }
  await browser.close();
})();
