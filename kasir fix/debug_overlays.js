const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(`file://${__dirname}/Aplikasi_Kasir_VPOS.html`, { waitUntil: 'networkidle0' });

  await page.evaluate(() => {
    let p = document.getElementById('login-pin');
    if(p) { p.value = '1234'; window.handleLogin(); }
  });
  
  await new Promise(r => setTimeout(r, 1000));
  
  // Find all elements that cover a large portion of the screen and have blur
  let overlays = await page.evaluate(() => {
      let elements = Array.from(document.querySelectorAll('*'));
      let results = [];
      elements.forEach(el => {
          let style = window.getComputedStyle(el);
          if (style.backdropFilter.includes('blur') || style.filter.includes('blur') || style.backgroundColor.includes('rgba(0, 0, 0')) {
             if (style.opacity !== '0' && style.display !== 'none' && style.visibility !== 'hidden') {
                 let rect = el.getBoundingClientRect();
                 if (rect.width > 200 && rect.height > 200) {
                     results.push({
                         tag: el.tagName,
                         id: el.id,
                         className: el.className,
                         opacity: style.opacity,
                         display: style.display,
                         filter: style.backdropFilter || style.filter,
                         bg: style.backgroundColor,
                         zIndex: style.zIndex
                     });
                 }
             }
          }
      });
      return results;
  });
  
  console.log('Overlays found:', overlays);

  await browser.close();
})();
