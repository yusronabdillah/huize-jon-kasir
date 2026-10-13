const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  let errors = [];
  page.on('pageerror', err => errors.push('JS_ERROR: ' + err.message));

  await page.goto(`file://${__dirname}/Aplikasi_Kasir_VPOS.html`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  // Login
  await page.evaluate(() => {
    let p = document.getElementById('login-pin');
    if(p) { p.value = '1234'; window.handleLogin(); }
  });
  await new Promise(r => setTimeout(r, 1000));

  // === SETUP: inject test data directly ===
  await page.evaluate(async () => {
    // Clear
    window.expArr = [];
    window.transactions = [];
    
    // 1. Add Tambah Uang Kas: Rp 100.000
    window.expArr.push({
      id: 'test_cash_1',
      category: 'Tambah Uang Kas',
      source: 'Kas Penjualan',
      amount: 100000,
      date: new Date().toISOString(),
      note: 'Modal pagi test'
    });
    
    // 2. Add a transaction (penjualan): Rp 50.000
    window.transactions.push({
      id: 'test_tx_1',
      date: new Date().toISOString(),
      items: [{name: 'Kopi Wine', qty: 2, price: 25000}],
      total: 50000,
      method: 'Tunai',
      paid: 50000,
      change: 0
    });
    
    // 3. Add Pengeluaran: Rp 30.000 (source: Uang Pribadi — to verify ALL expenses deduct)
    window.expArr.push({
      id: 'test_exp_1',
      category: 'Belanja Bahan',
      source: 'Uang Pribadi',
      amount: 30000,
      date: new Date().toISOString(),
      note: 'Test pengeluaran'
    });
    
    await window.S('pos_expenses', window.expArr);
    await window.S('pos_transactions', window.transactions);
  });
  await new Promise(r => setTimeout(r, 500));

  // ============================================
  // TEST 1: PENGELUARAN PAGE
  // ============================================
  await page.evaluate(() => window.renderPengeluaran());
  await new Promise(r => setTimeout(r, 1000));

  let htmlPengeluaran = await page.evaluate(() => document.getElementById('content-area').innerHTML);

  // Check 1a: "Uang Kas Sekarang" term used (NOT "Uang Tersedia Saat Ini" or "Sisa Uang")
  if (!htmlPengeluaran.includes('Uang Kas Sekarang')) errors.push('PENGELUARAN: Istilah "Uang Kas Sekarang" TIDAK ditemukan');
  if (htmlPengeluaran.includes('Uang Tersedia Saat Ini')) errors.push('PENGELUARAN: Istilah lama "Uang Tersedia Saat Ini" masih ada');
  if (htmlPengeluaran.includes('Sisa Uang')) errors.push('PENGELUARAN: Istilah lama "Sisa Uang" masih ada');

  // Check 1b: Calculation = 100000 + 50000 - 30000 = 120000
  if (!htmlPengeluaran.includes('120.000')) errors.push('PENGELUARAN: Uang Kas Sekarang BUKAN 120.000 (expected: 100rb+50rb-30rb=120rb)');

  // Check 1c: Breakdown is collapsed by default (display:none)
  let breakdownVisible = await page.evaluate(() => {
    // The breakdown content is inside a div with display:none
    // Find the collapsible container and check its second child (the content div)
    let allDivs = document.querySelectorAll('#content-area div[style*="overflow:hidden"]');
    for(let container of allDivs) {
      let contentDiv = container.children[1]; // second child = content panel
      if(contentDiv && contentDiv.textContent.includes('Tambah Uang (Manual)')) {
        return contentDiv.style.display !== 'none';
      }
    }
    return false; // container not found = effectively hidden
  });
  if (breakdownVisible) errors.push('PENGELUARAN: Panel breakdown TIDAK tersembunyi (seharusnya collapsed by default)');

  // Check 1d: "Lihat rincian" toggle exists
  if (!htmlPengeluaran.includes('Lihat rincian')) errors.push('PENGELUARAN: Toggle "Lihat rincian" TIDAK ditemukan');

  // Check 1e: Font size of Uang Kas Sekarang is 36px (biggest)
  let kasFont = await page.evaluate(() => {
    let els = document.querySelectorAll('.stat-value');
    for(let el of els) {
      if(el.textContent.includes('120.000')) return el.style.fontSize;
    }
    return '';
  });
  if (kasFont !== '36px') errors.push('PENGELUARAN: Font Uang Kas Sekarang bukan 36px, ditemukan: ' + kasFont);

  // ============================================
  // TEST 2: LAPORAN PAGE
  // ============================================
  await page.evaluate(() => window.renderLaporan());
  await new Promise(r => setTimeout(r, 1000));

  let htmlLaporan = await page.evaluate(() => document.getElementById('content-area').innerHTML);

  // Check 2a: "Uang Kas Sekarang" term used
  if (!htmlLaporan.includes('Uang Kas Sekarang')) errors.push('LAPORAN: Istilah "Uang Kas Sekarang" TIDAK ditemukan');
  if (htmlLaporan.includes('Sisa Uang')) errors.push('LAPORAN: Istilah lama "Sisa Uang" masih ada');
  if (htmlLaporan.includes('Uang di Kas total')) errors.push('LAPORAN: Istilah lama "Uang di Kas total" masih ada');

  // Check 2b: Same calculation = 120000
  if (!htmlLaporan.includes('120.000')) errors.push('LAPORAN: Uang Kas Sekarang BUKAN 120.000');

  // Check 2c: No confusing sub-text
  if (htmlLaporan.includes('belum termasuk uang tambahan')) errors.push('LAPORAN: Sub-teks membingungkan masih ada');
  if (htmlLaporan.includes('dari hasil penjualan')) errors.push('LAPORAN: Sub-teks "dari hasil penjualan" masih ada');

  // Check 2d: Font size hierarchy — Uang Kas Sekarang should be 36px
  let laporanKasFont = await page.evaluate(() => {
    let els = document.querySelectorAll('.stat-value');
    for(let el of els) {
      if(el.textContent.includes('120.000')) return el.style.fontSize;
    }
    return '';
  });
  if (laporanKasFont !== '36px') errors.push('LAPORAN: Font Uang Kas Sekarang bukan 36px, ditemukan: ' + laporanKasFont);

  // ============================================
  // CLEANUP
  // ============================================
  await page.evaluate(async () => {
    window.expArr = [];
    window.transactions = [];
    await window.S('pos_expenses', window.expArr);
    await window.S('pos_transactions', window.transactions);
  });

  if (errors.length > 0) {
      console.log("❌ SIMPLIFICATION AUDIT FAILED:");
      errors.forEach((e, i) => console.log(`  ${i+1}. ${e}`));
  } else {
      console.log("✅ SIMPLIFICATION AUDIT PASSED — All checks verified:");
      console.log("");
      console.log("  SKENARIO PERHITUNGAN KONKRET:");
      console.log("  - Tambah Uang Kas:  Rp 100.000");
      console.log("  - Penjualan:        Rp  50.000");
      console.log("  - Pengeluaran:      Rp  30.000 (sumber: Uang Pribadi)");
      console.log("  - EXPECTED:         Rp 120.000 (100rb + 50rb - 30rb)");
      console.log("  - ACTUAL:           Rp 120.000 ✅");
      console.log("");
      console.log("  ISTILAH KONSISTEN:");
      console.log('  - "Uang Kas Sekarang" ditemukan di KEDUA halaman ✅');
      console.log('  - "Sisa Uang" / "Uang Tersedia" / "Uang di Kas total" TIDAK ditemukan ✅');
      console.log("");
      console.log("  UI/UX:");
      console.log("  - Font Uang Kas Sekarang = 36px (terbesar) ✅");
      console.log("  - Breakdown panel collapsed by default ✅");
      console.log('  - Toggle "Lihat rincian" tersedia ✅');
      console.log("  - Sub-teks membingungkan dihapus ✅");
  }
  await browser.close();
})();
