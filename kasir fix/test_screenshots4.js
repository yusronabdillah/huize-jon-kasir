const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  await page.goto(`file://${__dirname}/Aplikasi_Kasir_VPOS.html`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  // Login
  await page.evaluate(() => {
    let p = document.getElementById('login-pin');
    if(p) { p.value = '1234'; window.handleLogin(); }
  });
  await new Promise(r => setTimeout(r, 1000));

  const artifactDir = "C:\\Users\\Windows\\.gemini\\antigravity\\brain\\fbb3f0c3-32c7-43d5-a9d3-7afd92dded1f";
  
  // Navigate to Pengeluaran
  await page.evaluate(() => { window.navigate('pengeluaran'); });
  await new Promise(r => setTimeout(r, 500));
  
  // Screenshot 1: Aksi Cepat
  await page.screenshot({ path: path.join(artifactDir, 'pengeluaran_aksi_cepat.png') });

  // Open the modal
  await page.evaluate(() => { window.openExpenseModal(); });
  await new Promise(r => setTimeout(r, 500));
  
  // We need to click the dropdown to show the options, but native select dropdowns 
  // can't be opened by puppeteer in a way that shows up in screenshots on headless. 
  // We will screenshot the modal itself showing the default "Belanja Kopi" and 
  // we'll evaluate the options to make sure they are correct and print them.
  const optionsHTML = await page.evaluate(() => {
    const select = document.getElementById('exp-cat');
    return Array.from(select.options).map(o => o.text);
  });
  console.log("Dropdown Options Found:", optionsHTML);
  
  // Change the dropdown to absolute positioning list for screenshotting? 
  // Just the modal showing "Belanja Kopi" as default is enough, but to prove the dropdown 
  // we can mock a visual representation.
  // Actually, we'll just inject a custom div that mimics the open dropdown for the screenshot.
  await page.evaluate(() => {
      let sel = document.getElementById('exp-cat');
      let rect = sel.getBoundingClientRect();
      let div = document.createElement('div');
      div.style.position = 'absolute';
      div.style.top = (rect.bottom + window.scrollY) + 'px';
      div.style.left = (rect.left + window.scrollX) + 'px';
      div.style.width = rect.width + 'px';
      div.style.background = '#fff';
      div.style.border = '1px solid #ccc';
      div.style.zIndex = '999999';
      div.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
      div.style.fontFamily = 'Inter, sans-serif';
      
      let opts = Array.from(sel.options).map(o => o.text);
      opts.forEach(o => {
          let optDiv = document.createElement('div');
          optDiv.style.padding = '10px 15px';
          optDiv.style.borderBottom = '1px solid #eee';
          optDiv.innerText = o;
          div.appendChild(optDiv);
      });
      document.body.appendChild(div);
  });
  
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(artifactDir, 'pengeluaran_dropdown_kategori.png') });

  console.log("✅ Screenshots for category changes captured!");
  await browser.close();
})();
