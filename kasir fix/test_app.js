const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fakeIndexedDB = require("fake-indexeddb/auto"); // automatically sets global.indexedDB

const html = fs.readFileSync('Aplikasi_Kasir_VPOS.html', 'utf8');

const virtualConsole = new jsdom.VirtualConsole();
let errors = [];

virtualConsole.on("error", (err) => {
  console.error("BROWSER_ERROR:", err.message || err);
  errors.push(err.message || err);
});

virtualConsole.on("log", (msg) => {
  console.log("BROWSER_LOG:", msg);
});

console.log("Loading page in virtual DOM with fake-indexeddb...");

const dom = new JSDOM(html, { 
  runScripts: "dangerously",
  virtualConsole,
  beforeParse(window) {
    window.indexedDB = global.indexedDB;
    window.IDBKeyRange = global.IDBKeyRange;
  }
});

// Give it time to run promises
setTimeout(() => {
  const appHtml = dom.window.document.getElementById('app').innerHTML;
  
  if (appHtml.includes('Huize Jon Coffee') && appHtml.includes('Pilih Pengguna')) {
      console.log("--- PROOF OF FIX ---");
      console.log("SUCCESS: Login screen rendered successfully!");
      console.log("Login form HTML snippet:", appHtml.substring(0, 300) + '...');
  } else {
      console.log("--- PROOF OF FAILURE ---");
      console.log("FAILED: Login screen not found in DOM.");
  }
  
  if(errors.length > 0) {
      console.log("Errors encountered:", errors);
  } else {
      console.log("No JavaScript errors occurred during load.");
  }
  process.exit(0);
}, 2000);
