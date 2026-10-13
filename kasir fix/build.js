const https = require('https');
const fs = require('fs');

function fetchCDN(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

(async () => {
  try {
    const qrcodeJs = await fetchCDN('https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.js');
    const excelJs = await fetchCDN('https://cdn.jsdelivr.net/npm/exceljs@4.4.0/dist/exceljs.min.js');
    
    fs.writeFileSync('libs.js', qrcodeJs + '\n\n' + excelJs + '\n\n');
    const idbCode = `
// Firebase Config & Init
const firebaseConfig = {
  apiKey: "AIzaSyA9jq2cVOkqhnel9KcOls7hr6sgjKamBak",
  authDomain: "huize-jon-coffee.firebaseapp.com",
  projectId: "huize-jon-coffee",
  storageBucket: "huize-jon-coffee.firebasestorage.app",
  messagingSenderId: "410694863442",
  appId: "1:410694863442:web:0bba5692889dceff44ad8b",
  databaseURL: "https://huize-jon-coffee-default-rtdb.asia-southeast1.firebasedatabase.app" // Added asia-southeast1 default URL just in case
};
// Fallback if the above URL is wrong, usually it works without it if default or we can try catch
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.database();

window.x = function dbGet(key) {
  return db.ref(key).once('value').then(snap => snap.val()).catch(e => {
    console.error("Firebase read error:", e);
    return null;
  });
};
window.S = function dbSet(key, value) {
  return db.ref(key).set(value).catch(e => {
    console.error("Firebase write error:", e);
  });
};
`;
    fs.appendFileSync('libs.js', idbCode);

    const styleCss = fs.readFileSync('style.css', 'utf8');
    const mainJs = fs.readFileSync('main.js', 'utf8');
    const libsJs = fs.readFileSync('libs.js', 'utf8');

    const html = `<!doctype html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Huize Jon Coffee - POS System</title>
    <link rel="stylesheet" href="./style.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/plugins/monthSelect/style.css">
  </head>
  <body>
    <div id="app"></div>
    <div id="toast-container" class="toast-container"></div>
    
    <!-- Firebase App (the core Firebase SDK) is always required and must be listed first -->
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
    <script src="https://cdn.jsdelivr.net/npm/flatpickr/dist/plugins/monthSelect/index.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/flatpickr/dist/l10n/id.js"></script>

    <script src="./libs.js"></script>
    <script src="./main.js"></script>
  </body>
</html>`;

    fs.writeFileSync('index.html', html);
    console.log("Build successful!");
  } catch (e) {
    console.error("Build failed:", e);
  }
})();
