const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  let errors = [];
  page.on('pageerror', err => errors.push(err.message));
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });

  await page.goto(`file://${__dirname}/Aplikasi_Kasir_VPOS.html`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  // Login
  await page.evaluate(() => {
    let pinInput = document.getElementById('login-pin');
    if(pinInput) { pinInput.value = '1234'; window.handleLogin(); }
  });
  await new Promise(r => setTimeout(r, 1000));
  
  // Navigate
  await page.evaluate(() => window.renderKaryawan());
  await new Promise(r => setTimeout(r, 1000));

  let uniqueName = 'Budi ' + Date.now();

  // Add Employee
  await page.evaluate(() => window.openKaryawanModal());
  await new Promise(r => setTimeout(r, 500));
  await page.evaluate((name) => {
    document.getElementById('emp-name').value = name;
    document.getElementById('emp-role').value = 'Kasir';
    document.getElementById('emp-salary').value = '2000000';
    window.saveKaryawan();
  }, uniqueName);
  await new Promise(r => setTimeout(r, 1000));

  let html = await page.evaluate(() => document.getElementById('content-area').innerHTML);
  if (!html.includes(uniqueName)) errors.push("Test failed: Employee not added.");
  if (!html.includes('Rp 2.000.000')) errors.push("Test failed: Salary format wrong.");
  if (!html.includes('Belum Dibayar')) errors.push("Test failed: Initial status should be Belum Dibayar.");

  // Pay Salary
  await page.evaluate((name) => {
    let emp = window.empArr.find(e => e.name === name);
    window.confirmPaySalary(emp.id);
  }, uniqueName);
  await new Promise(r => setTimeout(r, 500));
  await page.evaluate((name) => {
    let emp = window.empArr.find(e => e.name === name);
    window.executePaySalary(emp.id);
  }, uniqueName);
  await new Promise(r => setTimeout(r, 1000));

  html = await page.evaluate(() => document.getElementById('content-area').innerHTML);
  if (!html.includes('Sudah Dibayar')) errors.push("Test failed: Status did not change to Sudah Dibayar.");
  
  // Delete Employee
  await page.evaluate((name) => {
    let emp = window.empArr.find(e => e.name === name);
    window.confirmDeleteKaryawan(emp.id);
  }, uniqueName);
  await new Promise(r => setTimeout(r, 500));
  await page.evaluate((name) => {
    let emp = window.empArr.find(e => e.name === name);
    window.deleteKaryawan(emp.id);
  }, uniqueName);
  await new Promise(r => setTimeout(r, 1000));

  html = await page.evaluate(() => document.getElementById('content-area').innerHTML);
  if (html.includes(uniqueName)) errors.push("Test failed: Employee not deleted from table.");
  
  if (errors.length > 0) {
      console.log("❌ KARYAWAN TEST FAILED:", errors);
  } else {
      console.log("✅ KARYAWAN TEST PASSED SUCCESSFULLY.");
  }
  await browser.close();
})();
