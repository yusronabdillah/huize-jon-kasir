const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  const downloadPath = path.resolve(__dirname, 'downloads');
  if (!fs.existsSync(downloadPath)) fs.mkdirSync(downloadPath);
  
  const browser = await puppeteer.launch({ 
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: true 
  });
  const page = await browser.newPage();
  
  const client = await page.target().createCDPSession();
  await client.send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: downloadPath,
  });

  await page.goto(`file://${__dirname}/Aplikasi_Kasir_VPOS.html`, { waitUntil: 'networkidle0' });

  // Login as Owner
  await page.evaluate(() => {
    let p = document.getElementById('login-pin');
    if(p) { p.value = '1234'; window.handleLogin(); }
  });
  
  await new Promise(r => setTimeout(r, 1000));
  
  // Create dummy transaction and expense data to ensure it exports something
  await page.evaluate(async () => {
     let t = { id: 1234, date: new Date().toISOString(), total: 50000, items: [{name: 'Kopi', qty: 1, price: 50000}] };
     transactions.push(t);
     await S('pos_transactions', transactions);
     
     let e = { id: Date.now(), date: new Date().toISOString(), category: 'Belanja Kopi', note: 'Beli kopi robusta', amount: 150000 };
     expArr.push(e);
     await S('pos_expenses', expArr);
  });
  
  // Navigate to Setelan
  await page.evaluate(() => {
      window.navigate('setelan');
  });
  await new Promise(r => setTimeout(r, 500));
  
  // Trigger export
  console.log("Triggering Excel export...");
  await page.evaluate(() => {
      window.exportDataExcelSettings();
  });
  
  // Wait for file to download
  await new Promise(r => setTimeout(r, 3000));
  
  let files = fs.readdirSync(downloadPath);
  console.log("Downloaded files:", files);
  
  if (files.some(f => f.endsWith('.xlsx'))) {
      let file = files.find(f => f.endsWith('.xlsx'));
      let stats = fs.statSync(path.join(downloadPath, file));
      console.log(`✅ Success! Excel file generated: ${file} (Size: ${stats.size} bytes)`);
  } else {
      console.log("❌ Failed to find .xlsx file in downloads.");
  }
  
  await browser.close();
})();
