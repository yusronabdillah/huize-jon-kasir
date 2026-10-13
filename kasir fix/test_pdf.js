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
  await new Promise(r => setTimeout(r, 2000));

  // Add dummy transaction
  await page.evaluate(async () => {
    window.transactions = [];
    let d = new Date().toISOString();
    window.transactions.push({ 
      id: '12345', 
      total: 15000, 
      date: d, 
      items: [{name: 'Kopi Susu', qty: 1, price: 15000}], 
      method: 'Tunai',
      customer_name: 'Budi' 
    });
    // navigate to Laporan to see the tx
    window.currentRoute = 'laporan';
    window.renderLaporan();
  });
  await new Promise(r => setTimeout(r, 1000));
  
  // Create a promise to wait for the new popup window
  const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));
  
  // Open Receipt Modal
  await page.evaluate(() => {
    window.showReceipt(window.transactions[0]);
  });
  await new Promise(r => setTimeout(r, 500));

  // Click Cetak Struk
  await page.evaluate(() => {
    // Override window.print so it doesn't block puppeteer with a dialog
    window.printReceipt = function(txId) {
        let printContent = document.getElementById('receipt-print-area').outerHTML;
        let printWindow = window.open('', '', 'width=400,height=600');
        printWindow.document.write('<html><head><title>Cetak Struk</title>');
        printWindow.document.write('<style>');
        printWindow.document.write('body { margin: 0; padding: 20px; background: #fff; display: flex; justify-content: center; }');
        printWindow.document.write('@media print { body { padding: 0; } button { display: none; } }');
        printWindow.document.write('</style>');
        printWindow.document.write('</head><body>');
        printWindow.document.write(printContent);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        
        // We do NOT call window.print() here to prevent native print dialog blocking Puppeteer
    };
    window.printReceipt('12345');
  });

  const popup = await newPagePromise;
  if(popup) {
     await popup.waitForFunction('document.querySelector("#receipt-print-area") !== null', {timeout: 5000});
     
     // Take a screenshot of the popup
     await popup.screenshot({ path: path.join(dir, `test_pdf_struk.png`), fullPage: true });
     console.log('✅ Captured Popup HTML successfully');
     
     // Optional: Print to actual PDF via Puppeteer
     await popup.pdf({ path: path.join(dir, `test_pdf_struk.pdf`), format: 'A4' });
     console.log('✅ Generated PDF successfully');
  } else {
     console.log('❌ Failed to intercept popup');
  }

  await browser.close();
})();
