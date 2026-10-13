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
  
  // 2. Go to Produk page
  await page.evaluate(() => navigate('produk'));
  await new Promise(r => setTimeout(r, 1000));
  
  // 3. Test Add Product
  await page.evaluate(() => openProductModal());
  await new Promise(r => setTimeout(r, 500));
  await page.evaluate(() => {
    document.getElementById('prod-name').value = 'Kopi Test Automation';
    document.getElementById('prod-cat').value = 'Kopi Klasik';
    document.getElementById('prod-price').value = '15000';
    document.getElementById('prod-stock').value = '100';
    saveProduct();
  });
  await new Promise(r => setTimeout(r, 1000));

  // Check if added
  const tableHtml = await page.evaluate(() => document.querySelector('.data-table').innerHTML);
  if (!tableHtml.includes('Kopi Test Automation')) errors.push("Test failed: Product was not added to the table.");

  // 4. Test Edit Product
  await page.evaluate(() => {
    let p = products.find(x => x.name === 'Kopi Test Automation');
    openProductModal(p.id);
  });
  await new Promise(r => setTimeout(r, 500));
  await page.evaluate(() => {
    document.getElementById('prod-price').value = '99999';
    saveProduct();
  });
  await new Promise(r => setTimeout(r, 1000));

  // Check if edited
  const tableHtmlAfterEdit = await page.evaluate(() => document.querySelector('.data-table').innerHTML);
  if (!tableHtmlAfterEdit.includes('99.999')) errors.push("Test failed: Product price was not edited.");

  // 5. Test Delete Product
  await page.evaluate(() => {
    let p = products.find(x => x.name === 'Kopi Test Automation');
    confirmDeleteProduct(p.id);
  });
  await new Promise(r => setTimeout(r, 500));
  await page.evaluate(() => {
    let p = products.find(x => x.name === 'Kopi Test Automation');
    deleteProduct(p.id);
  });
  await new Promise(r => setTimeout(r, 1000));

  // Check if deleted
  const tableHtmlAfterDelete = await page.evaluate(() => document.querySelector('.data-table').innerHTML);
  if (tableHtmlAfterDelete.includes('Kopi Test Automation')) errors.push("Test failed: Product was not deleted.");

  if (errors.length > 0) {
      console.log("❌ CRUD TEST FAILED:", errors);
  } else {
      console.log("✅ CRUD TEST PASSED SUCCESSFULLY WITHOUT ERRORS.");
  }
  await browser.close();
})();
