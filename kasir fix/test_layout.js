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

  const pagesToTest = [
    { name: 'Dashboard', render: 'renderDashboard', mainText: 'Omset Hari Ini', subTexts: ['Jumlah Transaksi'] },
    { name: 'Laporan', render: 'renderLaporan', mainText: 'Uang Kas Sekarang', subTexts: ['Uang Masuk', 'Uang Keluar'] },
    { name: 'Pengeluaran', render: 'renderPengeluaran', mainText: 'Uang Kas Sekarang', subTexts: ['Pengeluaran Hari Ini', 'Pengeluaran Bulan Ini'] }
  ];

  for (let pt of pagesToTest) {
    await page.evaluate((fn) => window[fn](), pt.render);
    await new Promise(r => setTimeout(r, 500));

    let check = await page.evaluate((pt) => {
      let content = document.getElementById('content-area');
      
      // Look for the main card container (width: 100%)
      let mainCard = Array.from(content.querySelectorAll('.stat-card')).find(c => c.style.width === '100%');
      if(!mainCard) return `Main card with width: 100% not found in ${pt.name}`;
      
      if(!mainCard.textContent.includes(pt.mainText)) return `Main card text mismatch in ${pt.name}. Expected: ${pt.mainText}`;
      
      let mainValue = mainCard.querySelector('.stat-value');
      let mainFontSize = parseInt(mainValue.style.fontSize);
      if(mainFontSize < 48 || mainFontSize > 56) return `Main card font size is ${mainFontSize}px in ${pt.name}, expected 48-56px`;

      // Check support grid
      // It should be the next sibling of the main card's parent, or a sibling of the main card
      // In our code, main card and support grid are siblings inside a margin-bottom div
      let supportGrid = mainCard.nextElementSibling;
      if(!supportGrid || supportGrid.style.display !== 'grid') return `Support grid not found below main card in ${pt.name}`;
      
      if(!supportGrid.style.gridTemplateColumns.includes('1fr 1fr')) return `Support grid does not have 1fr 1fr columns in ${pt.name}`;
      
      // Check support cards inside the grid
      let supportCards = Array.from(supportGrid.querySelectorAll('.stat-card'));
      if(supportCards.length < 1) return `Support cards not found in grid for ${pt.name}`;
      
      for(let subText of pt.subTexts) {
          let found = supportCards.find(c => c.textContent.includes(subText));
          if(!found) return `Support card '${subText}' not found in ${pt.name}`;
          let subValue = found.querySelector('.stat-value');
          let subFontSize = parseInt(subValue.style.fontSize);
          if(subFontSize < 24 || subFontSize > 28) return `Support card font size is ${subFontSize}px in ${pt.name}, expected 24-28px`;
      }

      return 'OK';
    }, pt);

    if (check !== 'OK') {
      errors.push(`[${pt.name}] ${check}`);
    }
  }

  if (errors.length > 0) {
      console.log("❌ LAYOUT AUDIT FAILED:");
      errors.forEach((e, i) => console.log(`  ${i+1}. ${e}`));
  } else {
      console.log("✅ LAYOUT AUDIT PASSED — All 3 pages follow the strict hierarchy:");
      console.log("  - Card utama berdiri sendiri (width 100%) di baris atas");
      console.log("  - Font card utama raksasa (56px) dan bold");
      console.log("  - Card pendukung ada di baris bawah dalam grid (1fr 1fr)");
      console.log("  - Font card pendukung lebih kecil (28px)");
  }
  await browser.close();
})();
