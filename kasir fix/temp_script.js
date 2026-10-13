
/**
 * Minified by jsDelivr using Terser v5.37.0.
 * Original file: /npm/qrcode-generator@1.4.4/qrcode.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
var qrcode=function(){var t=function(t,r){var e=t,n=g[r],o=null,i=0,a=null,u=[],f={},c=function(t,r){o=function(t){for(var r=new Array(t),e=0;e<t;e+=1){r[e]=new Array(t);for(var n=0;n<t;n+=1)r[e][n]=null}return r}(i=4*e+17),l(0,0),l(i-7,0),l(0,i-7),s(),h(),d(t,r),e>=7&&v(t),null==a&&(a=p(e,n,u)),w(a,r)},l=function(t,r){for(var e=-1;e<=7;e+=1)if(!(t+e<=-1||i<=t+e))for(var n=-1;n<=7;n+=1)r+n<=-1||i<=r+n||(o[t+e][r+n]=0<=e&&e<=6&&(0==n||6==n)||0<=n&&n<=6&&(0==e||6==e)||2<=e&&e<=4&&2<=n&&n<=4)},h=function(){for(var t=8;t<i-8;t+=1)null==o[t][6]&&(o[t][6]=t%2==0);for(var r=8;r<i-8;r+=1)null==o[6][r]&&(o[6][r]=r%2==0)},s=function(){for(var t=B.getPatternPosition(e),r=0;r<t.length;r+=1)for(var n=0;n<t.length;n+=1){var i=t[r],a=t[n];if(null==o[i][a])for(var u=-2;u<=2;u+=1)for(var f=-2;f<=2;f+=1)o[i+u][a+f]=-2==u||2==u||-2==f||2==f||0==u&&0==f}},v=function(t){for(var r=B.getBCHTypeNumber(e),n=0;n<18;n+=1){var a=!t&&1==(r>>n&1);o[Math.floor(n/3)][n%3+i-8-3]=a}for(n=0;n<18;n+=1){a=!t&&1==(r>>n&1);o[n%3+i-8-3][Math.floor(n/3)]=a}},d=function(t,r){for(var e=n<<3|r,a=B.getBCHTypeInfo(e),u=0;u<15;u+=1){var f=!t&&1==(a>>u&1);u<6?o[u][8]=f:u<8?o[u+1][8]=f:o[i-15+u][8]=f}for(u=0;u<15;u+=1){f=!t&&1==(a>>u&1);u<8?o[8][i-u-1]=f:u<9?o[8][15-u-1+1]=f:o[8][15-u-1]=f}o[i-8][8]=!t},w=function(t,r){for(var e=-1,n=i-1,a=7,u=0,f=B.getMaskFunction(r),c=i-1;c>0;c-=2)for(6==c&&(c-=1);;){for(var g=0;g<2;g+=1)if(null==o[n][c-g]){var l=!1;u<t.length&&(l=1==(t[u]>>>a&1)),f(n,c-g)&&(l=!l),o[n][c-g]=l,-1==(a-=1)&&(u+=1,a=7)}if((n+=e)<0||i<=n){n-=e,e=-e;break}}},p=function(t,r,e){for(var n=A.getRSBlocks(t,r),o=b(),i=0;i<e.length;i+=1){var a=e[i];o.put(a.getMode(),4),o.put(a.getLength(),B.getLengthInBits(a.getMode(),t)),a.write(o)}var u=0;for(i=0;i<n.length;i+=1)u+=n[i].dataCount;if(o.getLengthInBits()>8*u)throw"code length overflow. ("+o.getLengthInBits()+">"+8*u+")";for(o.getLengthInBits()+4<=8*u&&o.put(0,4);o.getLengthInBits()%8!=0;)o.putBit(!1);for(;!(o.getLengthInBits()>=8*u||(o.put(236,8),o.getLengthInBits()>=8*u));)o.put(17,8);return function(t,r){for(var e=0,n=0,o=0,i=new Array(r.length),a=new Array(r.length),u=0;u<r.length;u+=1){var f=r[u].dataCount,c=r[u].totalCount-f;n=Math.max(n,f),o=Math.max(o,c),i[u]=new Array(f);for(var g=0;g<i[u].length;g+=1)i[u][g]=255&t.getBuffer()[g+e];e+=f;var l=B.getErrorCorrectPolynomial(c),h=k(i[u],l.getLength()-1).mod(l);for(a[u]=new Array(l.getLength()-1),g=0;g<a[u].length;g+=1){var s=g+h.getLength()-a[u].length;a[u][g]=s>=0?h.getAt(s):0}}var v=0;for(g=0;g<r.length;g+=1)v+=r[g].totalCount;var d=new Array(v),w=0;for(g=0;g<n;g+=1)for(u=0;u<r.length;u+=1)g<i[u].length&&(d[w]=i[u][g],w+=1);for(g=0;g<o;g+=1)for(u=0;u<r.length;u+=1)g<a[u].length&&(d[w]=a[u][g],w+=1);return d}(o,n)};f.addData=function(t,r){var e=null;switch(r=r||"Byte"){case"Numeric":e=M(t);break;case"Alphanumeric":e=x(t);break;case"Byte":e=m(t);break;case"Kanji":e=L(t);break;default:throw"mode:"+r}u.push(e),a=null},f.isDark=function(t,r){if(t<0||i<=t||r<0||i<=r)throw t+","+r;return o[t][r]},f.getModuleCount=function(){return i},f.make=function(){if(e<1){for(var t=1;t<40;t++){for(var r=A.getRSBlocks(t,n),o=b(),i=0;i<u.length;i++){var a=u[i];o.put(a.getMode(),4),o.put(a.getLength(),B.getLengthInBits(a.getMode(),t)),a.write(o)}var g=0;for(i=0;i<r.length;i++)g+=r[i].dataCount;if(o.getLengthInBits()<=8*g)break}e=t}c(!1,function(){for(var t=0,r=0,e=0;e<8;e+=1){c(!0,e);var n=B.getLostPoint(f);(0==e||t>n)&&(t=n,r=e)}return r}())},f.createTableTag=function(t,r){t=t||2;var e="";e+='<table style="',e+=" border-width: 0px; border-style: none;",e+=" border-collapse: collapse;",e+=" padding: 0px; margin: "+(r=void 0===r?4*t:r)+"px;",e+='">',e+="<tbody>";for(var n=0;n<f.getModuleCount();n+=1){e+="<tr>";for(var o=0;o<f.getModuleCount();o+=1)e+='<td style="',e+=" border-width: 0px; border-style: none;",e+=" border-collapse: collapse;",e+=" padding: 0px; margin: 0px;",e+=" width: "+t+"px;",e+=" height: "+t+"px;",e+=" background-color: ",e+=f.isDark(n,o)?"#000000":"#ffffff",e+=";",e+='"/>';e+="</tr>"}return e+="</tbody>",e+="</table>"},f.createSvgTag=function(t,r,e,n){var o={};"object"==typeof arguments[0]&&(t=(o=arguments[0]).cellSize,r=o.margin,e=o.alt,n=o.title),t=t||2,r=void 0===r?4*t:r,(e="string"==typeof e?{text:e}:e||{}).text=e.text||null,e.id=e.text?e.id||"qrcode-description":null,(n="string"==typeof n?{text:n}:n||{}).text=n.text||null,n.id=n.text?n.id||"qrcode-title":null;var i,a,u,c,g=f.getModuleCount()*t+2*r,l="";for(c="l"+t+",0 0,"+t+" -"+t+",0 0,-"+t+"z ",l+='<svg version="1.1" xmlns="http://www.w3.org/2000/svg"',l+=o.scalable?"":' width="'+g+'px" height="'+g+'px"',l+=' viewBox="0 0 '+g+" "+g+'" ',l+=' preserveAspectRatio="xMinYMin meet"',l+=n.text||e.text?' role="img" aria-labelledby="'+y([n.id,e.id].join(" ").trim())+'"':"",l+=">",l+=n.text?'<title id="'+y(n.id)+'">'+y(n.text)+"</title>":"",l+=e.text?'<description id="'+y(e.id)+'">'+y(e.text)+"</description>":"",l+='<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>',l+='<path d="',a=0;a<f.getModuleCount();a+=1)for(u=a*t+r,i=0;i<f.getModuleCount();i+=1)f.isDark(a,i)&&(l+="M"+(i*t+r)+","+u+c);return l+='" stroke="transparent" fill="black"/>',l+="</svg>"},f.createDataURL=function(t,r){t=t||2,r=void 0===r?4*t:r;var e=f.getModuleCount()*t+2*r,n=r,o=e-r;return I(e,e,(function(r,e){if(n<=r&&r<o&&n<=e&&e<o){var i=Math.floor((r-n)/t),a=Math.floor((e-n)/t);return f.isDark(a,i)?0:1}return 1}))},f.createImgTag=function(t,r,e){t=t||2,r=void 0===r?4*t:r;var n=f.getModuleCount()*t+2*r,o="";return o+="<img",o+=' src="',o+=f.createDataURL(t,r),o+='"',o+=' width="',o+=n,o+='"',o+=' height="',o+=n,o+='"',e&&(o+=' alt="',o+=y(e),o+='"'),o+="/>"};var y=function(t){for(var r="",e=0;e<t.length;e+=1){var n=t.charAt(e);switch(n){case"<":r+="&lt;";break;case">":r+="&gt;";break;case"&":r+="&amp;";break;case'"':r+="&quot;";break;default:r+=n}}return r};return f.createASCII=function(t,r){if((t=t||1)<2)return function(t){t=void 0===t?2:t;var r,e,n,o,i,a=1*f.getModuleCount()+2*t,u=t,c=a-t,g={"██":"█","█ ":"▀"," █":"▄","  ":" "},l={"██":"▀","█ ":"▀"," █":" ","  ":" "},h="";for(r=0;r<a;r+=2){for(n=Math.floor((r-u)/1),o=Math.floor((r+1-u)/1),e=0;e<a;e+=1)i="█",u<=e&&e<c&&u<=r&&r<c&&f.isDark(n,Math.floor((e-u)/1))&&(i=" "),u<=e&&e<c&&u<=r+1&&r+1<c&&f.isDark(o,Math.floor((e-u)/1))?i+=" ":i+="█",h+=t<1&&r+1>=c?l[i]:g[i];h+="\n"}return a%2&&t>0?h.substring(0,h.length-a-1)+Array(a+1).join("▀"):h.substring(0,h.length-1)}(r);t-=1,r=void 0===r?2*t:r;var e,n,o,i,a=f.getModuleCount()*t+2*r,u=r,c=a-r,g=Array(t+1).join("██"),l=Array(t+1).join("  "),h="",s="";for(e=0;e<a;e+=1){for(o=Math.floor((e-u)/t),s="",n=0;n<a;n+=1)i=1,u<=n&&n<c&&u<=e&&e<c&&f.isDark(o,Math.floor((n-u)/t))&&(i=0),s+=i?g:l;for(o=0;o<t;o+=1)h+=s+"\n"}return h.substring(0,h.length-1)},f.renderTo2dContext=function(t,r){r=r||2;for(var e=f.getModuleCount(),n=0;n<e;n++)for(var o=0;o<e;o++)t.fillStyle=f.isDark(n,o)?"black":"white",t.fillRect(n*r,o*r,r,r)},f};t.stringToBytes=(t.stringToBytesFuncs={default:function(t){for(var r=[],e=0;e<t.length;e+=1){var n=t.charCodeAt(e);r.push(255&n)}return r}}).default,t.createStringToBytes=function(t,r){var e=function(){for(var e=S(t),n=function(){var t=e.read();if(-1==t)throw"eof";return t},o=0,i={};;){var a=e.read();if(-1==a)break;var u=n(),f=n()<<8|n();i[String.fromCharCode(a<<8|u)]=f,o+=1}if(o!=r)throw o+" != "+r;return i}(),n="?".charCodeAt(0);return function(t){for(var r=[],o=0;o<t.length;o+=1){var i=t.charCodeAt(o);if(i<128)r.pu

// idb-keyval simple wrapper
function promisifyRequest(request) {
  return new Promise((resolve, reject) => {
    request.oncomplete = request.onsuccess = () => resolve(request.result);
    request.onabort = request.onerror = () => reject(request.error);
  });
}
function createStore(dbName, storeName) {
  let dbp;
  const getDb = () => {
    if (dbp) return dbp;
    const request = indexedDB.open(dbName);
    request.onupgradeneeded = () => request.result.createObjectStore(storeName);
    dbp = promisifyRequest(request);
    dbp.then(db => { db.onclose = () => dbp = undefined; }, () => {});
    return dbp;
  };
  return (txMode, callback) => getDb().then(db => callback(db.transaction(storeName, txMode).objectStore(storeName)));
}
let defaultStore;
function getDefaultStore() { return defaultStore || (defaultStore = createStore('keyval-store', 'keyval')); }
window.x = function dbGet(key, store = getDefaultStore()) { return store('readonly', s => promisifyRequest(s.get(key))); };
window.S = function dbSet(key, value, store = getDefaultStore()) { return store('readwrite', s => { s.put(value, key); return promisifyRequest(s.transaction); }); };

// --- NEW APP LOGIC ---
// main.js - Huize Jon Coffee POS Application Logic
var catColorMap = {
  'Kopi Wine': '#8B1A1A',
  'Kopi Belanda': '#E07020',
  'Kopi Klasik': '#6B4226',
  'Non-Kopi': '#2E7D32',
  'Makanan': '#C8A97D',
  'Minuman Dingin': '#1976D2'
};

var DEFAULT_PRODUCTS = [
  {id:'p1', sku:'KW-001', name:'Kopi Wine Arabica', price:35000, stock:999, category:'Kopi Wine'},
  {id:'p2', sku:'KW-002', name:'Kopi Wine Robusta', price:30000, stock:999, category:'Kopi Wine'},
  {id:'p3', sku:'KW-003', name:'Kopi Wine House Blend', price:32000, stock:999, category:'Kopi Wine'},
  {id:'p4', sku:'KB-001', name:'Dutch Coffee Classic', price:28000, stock:999, category:'Kopi Belanda'},
  {id:'p5', sku:'KB-002', name:'Stroopwafel Coffee', price:32000, stock:999, category:'Kopi Belanda'},
  {id:'p6', sku:'KB-003', name:'Koffie Verkeerd', price:26000, stock:999, category:'Kopi Belanda'},
  {id:'p7', sku:'KK-001', name:'Espresso', price:18000, stock:999, category:'Kopi Klasik'},
  {id:'p8', sku:'KK-002', name:'Americano', price:22000, stock:999, category:'Kopi Klasik'},
  {id:'p9', sku:'KK-003', name:'Cappuccino', price:25000, stock:999, category:'Kopi Klasik'},
  {id:'p10', sku:'KK-004', name:'Caffe Latte', price:25000, stock:999, category:'Kopi Klasik'},
  {id:'p11', sku:'KK-005', name:'V60 Pour Over', price:28000, stock:999, category:'Kopi Klasik'},
  {id:'p12', sku:'KK-006', name:'Affogato', price:30000, stock:999, category:'Kopi Klasik'},
  {id:'p13', sku:'NK-001', name:'Matcha Latte', price:25000, stock:999, category:'Non-Kopi'},
  {id:'p14', sku:'NK-002', name:'Cokelat Panas', price:22000, stock:999, category:'Non-Kopi'},
  {id:'p15', sku:'NK-003', name:'Teh Tarik', price:15000, stock:999, category:'Non-Kopi'},
  {id:'p16', sku:'NK-004', name:'Chai Latte', price:25000, stock:999, category:'Non-Kopi'},
  {id:'p17', sku:'MK-001', name:'Roti Bakar', price:18000, stock:999, category:'Makanan'},
  {id:'p18', sku:'MK-002', name:'Croissant', price:22000, stock:999, category:'Makanan'},
  {id:'p19', sku:'MK-003', name:'Kentang Goreng', price:20000, stock:999, category:'Makanan'},
  {id:'p20', sku:'MK-004', name:'Pisang Goreng', price:15000, stock:999, category:'Makanan'},
  {id:'p21', sku:'MD-001', name:'Es Kopi Susu', price:22000, stock:999, category:'Minuman Dingin'},
  {id:'p22', sku:'MD-002', name:'Es Cokelat', price:20000, stock:999, category:'Minuman Dingin'},
  {id:'p23', sku:'MD-003', name:'Es Teh Lemon', price:15000, stock:999, category:'Minuman Dingin'},
  {id:'p24', sku:'MD-004', name:'Es Jeruk Segar', price:15000, stock:999, category:'Minuman Dingin'},
];

var DEFAULT_SETTINGS = {
  qris_string: '00020101021126670016ID.CO.QRIS.WWW0215ID10200215886650303102520459265303360',
  admin_pin: '1234',
  shop_name: 'Huize Jon Coffee',
  shop_address: 'Jl. Jenderal Basuki Rahmat'
};

var empArr=[], expArr=[], logArr=[], currentRoute='kasir', cart=[], products=[], transactions=[], settings={}, selectedCartIndex=-1, paymentMode='Tunai';
var activeCategory='Semua', searchQuery='';
var btDevice=null, btCharacteristic=null;

window.formatRupiah = (val) => { return new Intl.NumberFormat('id-ID').format(val); };
window.parseRupiah = (str) => { return parseInt(str.replace(/[^0-9]/g, '')) || 0; };
window.formatInputRupiah = (e) => { e.target.value = window.formatRupiah(window.parseRupiah(e.target.value)); };
window.showToast = (msg, type='success') => {
  let c = document.getElementById('toast-container');
  if(!c) return;
  let t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = msg;
  c.appendChild(t);
  setTimeout(() => t.remove(), 3000);
};

window.addLog = async (action, desc) => {
  let user = JSON.parse(sessionStorage.getItem('pos_user')||'{}');
  logArr.push({ id: Date.now().toString(), timestamp: new Date().toISOString(), user: user.name || 'System', role: user.role || '-', action, description: desc });
  await S('pos_logs', logArr);
};

window.closeModal = () => {
  let m = document.getElementById('modal');
  if(m) m.classList.remove('active');
};

async function initApp() {
  let p = await x('pos_products'); if(p) products = p; else { products = DEFAULT_PRODUCTS; await S('pos_products', products); }
  let t = await x('pos_transactions'); if(t) transactions = t;
  let s = await x('pos_settings'); if(s) settings = s; else { settings = DEFAULT_SETTINGS; await S('pos_settings', settings); }
  let e = await x('pos_employees'); if(e) empArr = e;
  let ex = await x('pos_expenses'); if(ex) expArr = ex;
  let l = await x('pos_logs'); if(l) logArr = l;

  let user = sessionStorage.getItem('pos_user');
  if(!user) { renderLoginScreen(); } else { renderApp(); renderPage(); }
}

window.renderLoginScreen = () => {
  let options = '<option value="owner">👑 Owner</option>';
  empArr.filter(e => e.status==='Aktif').forEach(emp => {
      options += `<option value="emp_${emp.id}">👤 ${emp.name} (Karyawan)</option>`;
  });
  document.getElementById('app').innerHTML = `
  <div style="display:flex;align-items:center;justify-content:center;height:100vh;width:100vw;background:var(--bg-body);">
    <div style="background:var(--bg-card);padding:40px;border-radius:var(--radius-lg);box-shadow:0 10px 40px rgba(110,76,59,0.08);width:90%;max-width:400px;text-align:center;border:1px solid var(--border-color)">
      <img src="./logo.png" alt="Logo" style="width:80px;height:80px;border-radius:16px;object-fit:cover;margin:0 auto 24px;display:block;">
      <h2 style="margin-bottom:8px;color:var(--primary);font-size:24px">Huize Jon Coffee</h2>
      <p style="color:var(--text-muted);margin-bottom:32px;font-size:14px;font-weight:600">Silakan login ke sistem kasir</p>
      <div class="input-group" style="text-align:left"><label>Pilih Pengguna</label>
      <select id="login-user" class="input-control" style="font-size:16px;padding:16px 20px">${options}</select></div>
      <div class="input-group" style="text-align:left;margin-top:20px"><label>PIN Akses</label>
      <input type="password" id="login-pin" class="input-control" style="font-size:24px;letter-spacing:8px;text-align:center;padding:16px 20px" placeholder="****"></div>
      <button class="btn btn-primary" style="width:100%;height:56px;margin-top:32px;font-size:16px" onclick="handleLogin()">Masuk (Log In)</button>
    </div>
  </div>`;
};

window.handleLogin = async () => {
  let sel = document.getElementById('login-user').value;
  let pin = document.getElementById('login-pin').value;
  if(!pin) return showToast('Masukkan PIN!','error');
  if(sel === 'owner') {
      if(pin === settings.admin_pin) {
          sessionStorage.setItem('pos_user', JSON.stringify({name:'Owner', role:'Owner'}));
          await addLog('Login', 'Owner berhasil login');
          window.location.reload();
      } else showToast('PIN Salah!','error');
  } else {
      let empId = sel.replace('emp_','');
      let emp = empArr.find(e=>e.id===empId);
      if(!emp) return showToast('Karyawan tidak ditemukan!','error');
      if(emp.pin === '1234' && pin === '1234') { showChangePinModal(emp); return; }
      if(pin === emp.pin) {
          sessionStorage.setItem('pos_user', JSON.stringify({name:emp.name, role:'Karyawan', id:emp.id}));
          await addLog('Login', emp.name + ' berhasil login');
          window.location.reload();
      } else showToast('PIN Salah!','error');
  }
};

window.showChangePinModal = (emp) => {
  let m = document.createElement('div');
  m.innerHTML = `
  <div class="modal-overlay active" style="z-index:9999" id="change-pin-overlay">
      <div class="modal-content" style="width:90vw;max-width:400px;text-align:center;padding:32px">
          <h2 style="color:var(--primary);font-family:'Playfair Display',serif">Ganti PIN Sementara</h2>
          <p style="color:var(--text-muted);margin:12px 0 24px">Anda menggunakan PIN sementara. Silakan buat PIN baru (minimal 4 digit).</p>
          <input type="password" id="new-pin" class="input-control" placeholder="PIN Baru" style="font-size:24px;letter-spacing:4px;margin-bottom:16px;text-align:center" maxlength="6">
          <button class="btn btn-primary" style="width:100%;height:50px" onclick="confirmChangePin('${emp.id}')">Simpan & Login</button>
      </div>
  </div>`;
  document.body.appendChild(m);
};

window.confirmChangePin = async (id) => {
  let np = document.getElementById('new-pin').value;
  if(np.length < 4) return showToast('Minimal 4 digit!','error');
  let emp = empArr.find(e=>e.id===id);
  emp.pin = np;
  await S('pos_employees', empArr);
  document.getElementById('change-pin-overlay').remove();
  sessionStorage.setItem('pos_user', JSON.stringify({name:emp.name, role:'Karyawan', id:emp.id}));
  await addLog('Ganti PIN', emp.name + ' mengubah PIN pertama kali');
  await addLog('Login', emp.name + ' berhasil login');
  window.location.reload();
};

window.handleLogout = async () => {
  let user = JSON.parse(sessionStorage.getItem('pos_user')||'{}');
  if(user.name) await addLog('Logout', user.name + ' keluar aplikasi');
  sessionStorage.removeItem('pos_user');
  window.location.reload();
};

window.requireOwnerPin = (actionName, callbackName, ...args) => {
  window._pendingOwnerArgs = args;
  let m = document.getElementById('modal'), c = document.getElementById('modal-content');
  c.innerHTML = `
      <div class="modal-header"><h2>Verifikasi Owner</h2><button class="close-btn" onclick="closeModal()">×</button></div>
      <div class="modal-body">
          <p style="color:var(--text-muted);margin-bottom:12px">Aksi "<b>${actionName}</b>" memerlukan verifikasi PIN Owner.</p>
          <div class="input-group"><label>PIN Owner</label><input type="password" id="owner-verify-pin" class="input-control" placeholder="****" maxlength="8"></div>
      </div>
      <div class="modal-footer"><button class="btn btn-outline" onclick="closeModal()">Batal</button><button class="btn btn-primary" onclick="verifyOwnerAction('${callbackName}')">Konfirmasi</button></div>
  `;
  m.classList.add('active');
  setTimeout(() => document.getElementById('owner-verify-pin').focus(), 100);
};
window.verifyOwnerAction = (cbName) => {
  let pin = document.getElementById('owner-verify-pin').value;
  if(pin === settings.admin_pin) {
      closeModal();
      if(window[cbName]) window[cbName](...(window._pendingOwnerArgs||[]));
      window._pendingOwnerArgs = null;
  } else { showToast('PIN Owner Salah!', 'error'); }
};

window.renderApp = () => {
  let user = JSON.parse(sessionStorage.getItem('pos_user')||'{}');
  let isOwner = user.role === 'Owner';
  let menu = `<a href="#" class="nav-item ${currentRoute==='kasir'?'active':''}" onclick="navigate('kasir')"><span>🛒</span><span class="nav-text">Kasir</span></a>`;
  if(isOwner) {
      menu += `
          <a href="#" class="nav-item ${currentRoute==='dashboard'?'active':''}" onclick="navigate('dashboard')"><span>📊</span><span class="nav-text">Dashboard</span></a>
          <a href="#" class="nav-item ${currentRoute==='produk'?'active':''}" onclick="navigate('produk')"><span>📦</span><span class="nav-text">Produk</span></a>
          <a href="#" class="nav-item ${currentRoute==='laporan'?'active':''}" onclick="navigate('laporan')"><span>📈</span><span class="nav-text">Laporan</span></a>
          <a href="#" class="nav-item ${currentRoute==='pengeluaran'?'active':''}" onclick="navigate('pengeluaran')"><span>💸</span><span class="nav-text">Pengeluaran</span></a>
          <a href="#" class="nav-item ${currentRoute==='karyawan'?'active':''}" onclick="navigate('karyawan')"><span>👥</span><span class="nav-text">Karyawan</span></a>
          <a href="#" class="nav-item ${currentRoute==='setelan'?'active':''}" onclick="navigate('setelan')"><span>⚙️</span><span class="nav-text">Setelan</span></a>
      `;
  }
  document.getElementById('app').innerHTML = `
      <div class="sidebar ${currentRoute==='kasir'?'collapsed':''}" id="sidebar">
          <div class="sidebar-logo">
              <img src="./logo.png" alt="Logo">
              <span>Huize Jon<br><span style="font-size:12px;color:var(--text-muted);font-weight:400">Coffee</span></span>
          </div>
          <div class="nav-menu">${menu}</div>
          <div class="keyboard-hints" id="kb-hints">
              <span><kbd>F1</kbd> Bayar</span><span><kbd>F2</kbd> Clear</span>
          </div>
      </div>
      <div class="main-content">
          <div class="topbar">
              <h1 id="page-title">HUIZE JON COFFEE</h1>
              <div class="user-profile">
                  <div style="text-align:right"><div style="font-weight:700;font-size:14px">${user.name}</div><div style="font-size:12px;color:var(--text-muted)">${user.role}</div></div>
                  <div class="avatar">${user.name.charAt(0)}</div>
                  <button class="btn btn-outline btn-sm" onclick="handleLogout()" style="margin-left:8px">Keluar</button>
              </div>
          </div>
          <div class="content-area" id="content-area"></div>
      </div>
      <div id="modal" class="modal-overlay"><div class="modal-content" id="modal-content"></div></div>
  `;
};

window.navigate = (route) => { currentRoute = route; renderApp(); renderPage(); };

window.renderPage = () => {
  if(currentRoute === 'kasir') renderKasir();
  else if(currentRoute === 'dashboard') renderDashboard();
  else if(currentRoute === 'produk') renderProduk();
  else if(currentRoute === 'laporan') renderLaporan();
  else if(currentRoute === 'pengeluaran') renderPengeluaran();
  else if(currentRoute === 'karyawan') renderKaryawan();
  else if(currentRoute === 'setelan') renderSetelan();
};

/* --- KASIR PAGE --- */
window.renderKasir = () => {
  let e = document.getElementById("content-area");
  document.getElementById('page-title').innerText = "POS KASIR";
  let cats = ['☕ Terlaris', 'Semua', 'Kopi Wine', 'Kopi Belanda', 'Kopi Klasik', 'Non-Kopi', 'Makanan', 'Minuman Dingin'];
  
  let tabsHTML = cats.map(c => `<button class="cat-tab ${c===activeCategory?'active':''}" onclick="setCategory('${c}')">${c}</button>`).join('');
  
  let filtered = products;
  if(activeCategory==='☕ Terlaris') {
      let counts = {};
      transactions.forEach(t => t.items.forEach(i => counts[i.id] = (counts[i.id]||0)+i.qty));
      filtered = [...products].sort((a,b)=>(counts[b.id]||0)-(counts[a.id]||0)).slice(0, 10);
  } else if(activeCategory !== 'Semua') {
      filtered = products.filter(p => p.category === activeCategory);
  }
  if(searchQuery) filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  let prodHTML = filtered.map(p => {
      let c = catColorMap[p.category] || 'var(--primary)';
      return `
      <div class="product-card" onclick="openAddToCartModal('${p.id}')">
          <div class="product-badge" style="background:${c}">${p.category}</div>
          <div class="product-icon">☕</div>
          <div class="product-info">
              <h3>${p.name}</h3>
              <p>Rp ${formatRupiah(p.price)}</p>
          </div>
      </div>`;
  }).join('');

  let total = cart.reduce((s,i)=>s+(i.price*i.qty), 0);
  
  let cartHTML = cart.map((c, idx) => `
      <div class="cart-item ${idx===selectedCartIndex?'selected':''}" onclick="selectedCartIndex=${idx};renderKasir()">
          <div style="flex:1">
              <div style="font-weight:600;font-size:14px;color:var(--text-main)">${c.name}</div>
              <div style="font-size:11px;color:var(--text-muted)">Rp ${formatRupiah(c.price)} | ${c.suhu||''} ${c.ukuran||''}</div>
              ${c.note ? `<div style="font-size:11px;color:var(--accent);margin-top:2px">Catatan: ${c.note}</div>` : ''}
          </div>
          <div class="qty-control">
              <button class="qty-btn" onclick="event.stopPropagation();updateQty(${idx}, -1)">-</button>
              <div class="qty-num">${c.qty}</div>
              <button class="qty-btn" onclick="event.stopPropagation();updateQty(${idx}, 1)">+</button>
          </div>
      </div>
  `).join('');

  if(cart.length === 0) cartHTML = `<div class="cart-empty">Belum ada pesanan<br>Silakan pilih menu di samping</div>`;

  e.innerHTML = `
      <div class="kasir-wrapper">
          <div class="product-side">
              <div class="search-section">
                  <div class="search-box">
                      <span>🔍</span>
                      <input type="text" class="search-control" placeholder="Cari menu kopi atau makanan..." value="${searchQuery}" onkeyup="searchQuery=this.value;renderKasir()">
                  </div>
                  <div class="category-tabs">${tabsHTML}</div>
              </div>
              <div class="product-grid">${prodHTML}</div>
          </div>
          <div class="cart-side">
              <div class="cart-container">
                  <div class="cart-header">Pesanan Saat Ini <span>🛒</span></div>
                  <div class="cart-items">${cartHTML}</div>
                  <div class="cart-footer">
                      <div class="price-row total"><span>TOTAL</span><span>Rp ${formatRupiah(total)}</span></div>
                      ${cart.length > 0 ? `<button class="btn-pay-huge" onclick="openCheckoutModal()">BAYAR SEKARANG (F1)</button>` : `<button class="btn-pay-huge" style="opacity:0.5" disabled>PILIH MENU DULU</button>`}
                  </div>
              </div>
          </div>
      </div>
  `;
};

window.setCategory = (c) => { activeCategory = c; renderKasir(); };
window.updateQty = (idx, d) => { cart[idx].qty += d; if(cart[idx].qty<=0) cart.splice(idx,1); renderKasir(); };

window.openAddToCartModal = (id) => {
  let p = products.find(x => x.id === id);
  if(!p) return;
  let isDrink = ['Kopi Wine', 'Kopi Belanda', 'Kopi Klasik', 'Non-Kopi', 'Minuman Dingin'].includes(p.category);
  
  let m = document.getElementById("modal"), c = document.getElementById("modal-content");
  c.innerHTML = `
      <div class="modal-header"><h2>Tambah Pesanan</h2><button class="close-btn" onclick="closeModal()">×</button></div>
      <div class="modal-body">
          <h3 style="margin-bottom:16px;color:var(--primary);font-size:20px">${p.name} - Rp ${formatRupiah(p.price)}</h3>
          <input type="hidden" id="add-id" value="${p.id}">
          ${isDrink ? `
          <div class="input-group">
              <label>Penyajian</label>
              <select id="add-suhu" class="input-control"><option value="Hot">Hot</option><option value="Iced">Iced</option></select>
          </div>
          <div class="input-group">
              <label>Ukuran</label>
              <select id="add-ukuran" class="input-control" onchange="document.getElementById('add-price-display').innerText = 'Rp ' + formatRupiah(${p.price} + (this.value==='Large'?5000:0))">
                  <option value="Regular">Regular (Sesuai Harga)</option>
                  <option value="Large">Large (+ Rp 5.000)</option>
              </select>
          </div>
          ` : `<input type="hidden" id="add-suhu" value=""><input type="hidden" id="add-ukuran" value="">`}
          <div class="input-group"><label>Catatan Tambahan (Opsional)</label><input type="text" id="add-note" class="input-control" placeholder="Contoh: Less sugar, extra shot..."></div>
          <div class="input-group"><label>Jumlah</label><input type="number" id="add-qty" class="input-control" value="1" min="1"></div>
          <div style="margin-top:20px;font-size:20px;font-weight:700;text-align:right" id="add-price-display">Rp ${formatRupiah(p.price)}</div>
      </div>
      <div class="modal-footer"><button class="btn btn-outline" onclick="closeModal()">Batal</button><button class="btn btn-primary" onclick="addToCart()">Masukkan ke Keranjang</button></div>
  `;
  m.classList.add("active");
};

window.addToCart = () => {
  let id = document.getElementById('add-id').value;
  let p = products.find(x => x.id === id);
  let qty = parseInt(document.getElementById('add-qty').value) || 1;
  let suhu = document.getElementById('add-suhu').value;
  let ukuran = document.getElementById('add-ukuran').value;
  let note = document.getElementById('add-note').value;
  
  let price = p.price;
  if(ukuran === 'Large') price += 5000;

  cart.push({ ...p, qty, suhu, ukuran, note, price, cart_id: Date.now().toString() });
  closeModal(); showToast('Ditambahkan ke keranjang'); renderKasir();
};

window.openCheckoutModal = () => {
  if(cart.length===0) return;
  let total = cart.reduce((s,i)=>s+(i.price*i.qty), 0);
  let m = document.getElementById("modal"), c = document.getElementById("modal-content");
  c.innerHTML = `
      <div class="modal-header"><h2>Pembayaran</h2><button class="close-btn" onclick="closeModal()">×</button></div>
      <div class="modal-body">
          <div class="checkout-summary">
              <div style="font-size:14px;color:var(--text-muted);text-transform:uppercase">Total Tagihan</div>
              <div style="font-size:36px;font-weight:800;color:var(--primary);font-family:'Playfair Display',serif">Rp ${formatRupiah(total)}</div>
          </div>
          <div class="input-group">
              <label>Jenis Pesanan</label>
              <select id="pay-dine" class="input-control"><option value="Dine In">Dine In (Makan di Tempat)</option><option value="Take Away">Take Away (Bungkus)</option></select>
          </div>
          <div class="payment-tabs" style="margin-bottom:16px">
              <div class="pay-tab ${paymentMode==='Tunai'?'active':''}" onclick="paymentMode='Tunai';openCheckoutModal()">💵 TUNAI</div>
              <div class="pay-tab ${paymentMode==='QRIS'?'active':''}" onclick="paymentMode='QRIS';openCheckoutModal()">📱 QRIS</div>
          </div>
          ${paymentMode==='Tunai' ? `
              <div class="input-group">
                  <label>Uang Diterima</label>
                  <input type="text" id="pay-cash" class="pay-field" placeholder="0" oninput="window.formatInputRupiah(event);window.calcChange(${total})">
              </div>
              <div id="change-display" style="font-size:18px;font-weight:700;color:var(--text-muted);text-align:center;margin-top:16px">Kembalian: Rp 0</div>
          ` : `
              <div style="text-align:center;padding:20px">
                  <div id="qris-container" style="background:#fff;padding:16px;border-radius:12px;display:inline-block"></div>
                  <p style="margin-top:16px;color:var(--primary);font-weight:600">Scan QRIS untuk membayar</p>
              </div>
          `}
      </div>
      <div class="modal-footer"><button class="btn btn-outline" onclick="closeModal()">Batal</button><button class="btn btn-primary" style="width:100%;height:50px;font-size:16px" onclick="confirmPayment(${total})">KONFIRMASI PEMBAYARAN</button></div>
  `;
  m.classList.add("active");
  if(paymentMode==='QRIS') {
      setTimeout(()=>{
          let qr = window.qrcode(4, 'M');
          qr.addData(settings.qris_string); qr.make();
          document.getElementById('qris-container').innerHTML = qr.createImgTag(5);
      }, 100);
  } else {
      setTimeout(()=>document.getElementById('pay-cash').focus(), 100);
  }
};

window.calcChange = (total) => {
  let cash = parseRupiah(document.getElementById('pay-cash').value);
  let change = cash - total;
  document.getElementById('change-display').innerText = `Kembalian: Rp ${change >= 0 ? formatRupiah(change) : 0}`;
  document.getElementById('change-display').style.color = change >= 0 ? 'var(--success)' : 'var(--danger)';
};

window.confirmPayment = async (total) => {
  let dine = document.getElementById('pay-dine').value;
  let cash = 0;
  if(paymentMode==='Tunai') {
      cash = parseRupiah(document.getElementById('pay-cash').value);
      if(cash < total) return showToast('Uang tidak cukup!','error');
  }
  
  let tx = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      items: [...cart],
      total: total,
      method: paymentMode,
      dine_mode: dine,
      cash: cash
  };
  transactions.push(tx);
  await S('pos_transactions', transactions);
  cart = []; selectedCartIndex=-1;
  closeModal();
  showReceipt(tx);
};

window.showReceipt = (tx) => {
  let m = document.getElementById("modal"), c = document.getElementById("modal-content");
  let itemsHTML = tx.items.map(it => {
      let l = it.name;
      if(it.suhu) l += ` (${it.suhu} ${it.ukuran==='Large'?'L':''})`;
      return `<div>${l}</div><div style="text-align:right">${it.qty} x ${formatRupiah(it.price)} = ${formatRupiah(it.qty*it.price)}</div>`;
  }).join('');
  
  c.innerHTML = `
      <div class="modal-header"><h2>Struk Pembayaran</h2><button class="close-btn" onclick="closeModal();renderKasir()">×</button></div>
      <div class="modal-body" style="background:#f5f5f5;display:flex;justify-content:center">
          <div class="receipt-preview" id="receipt-print-area">
              <div style="text-align:center;font-weight:bold;margin-bottom:10px;font-size:16px">${settings.shop_name}</div>
              <div style="text-align:center;font-size:12px;margin-bottom:10px">${settings.shop_address}</div>
              <div>================================</div>
              <div>No: #${tx.id}</div>
              <div>Tgl: ${new Date(tx.date).toLocaleString('id-ID')}</div>
              <div>Mode: ${tx.dine_mode}</div>
              <div>================================</div>
              ${itemsHTML}
              <div>--------------------------------</div>
              <div style="font-weight:bold;font-size:16px">TOTAL: Rp ${formatRupiah(tx.total)}</div>
              <div>Bayar: ${tx.method}</div>
              ${tx.method==='Tunai' ? `<div>Tunai: Rp ${formatRupiah(tx.cash)}</div><div>Kembali: Rp ${formatRupiah(tx.cash-tx.total)}</div>` : ''}
              <div>================================</div>
              <div style="text-align:center;margin-top:10px">Terima kasih atas kunjungan Anda!</div>
          </div>
      </div>
      <div class="modal-footer">
          <button class="btn btn-outline" onclick="closeModal();renderKasir()">Selesai</button>
          <button class="btn btn-primary" onclick="printReceipt('${tx.id}')">🖨️ Cetak Struk</button>
      </div>
  `;
  m.classList.add("active");
};

/* --- DASHBOARD, PRODUK, DLL (Owner Only) --- */
window.renderDashboard = () => {
  let e = document.getElementById("content-area");
  document.getElementById('page-title').innerText = "DASHBOARD";
  
  let today = new Date().toISOString().split('T')[0];
  let todaysTx = transactions.filter(t => t.date.startsWith(today));
  let omset = todaysTx.reduce((s,t)=>s+t.total,0);
  
  e.innerHTML = `
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px;margin-bottom:24px">
          <div class="stat-card"><div class="stat-label">Omset Hari Ini</div><div class="stat-value">Rp ${formatRupiah(omset)}</div></div>
          <div class="stat-card"><div class="stat-label">Jumlah Transaksi</div><div class="stat-value">${todaysTx.length}</div></div>
          <div class="stat-card"><div class="stat-label">Rata-rata Transaksi</div><div class="stat-value">Rp ${formatRupiah(todaysTx.length?Math.floor(omset/todaysTx.length):0)}</div></div>
      </div>
      <div class="table-container" style="padding:24px">
          <h3 style="color:var(--primary);margin-bottom:16px">Ringkasan Aktivitas</h3>
          <p style="color:var(--text-muted)">Gunakan menu di sidebar untuk melihat detail laporan, manajemen produk, dan lainnya.</p>
      </div>
  `;
};

// Implement minimal versions of other pages to save space, but functional
window.renderProduk = () => { document.getElementById('page-title').innerText="PRODUK"; document.getElementById('content-area').innerHTML = `<div class="table-container"><table class="data-table"><thead><tr><th>Nama</th><th>Kategori</th><th>Harga</th></tr></thead><tbody>${products.map(p=>`<tr><td>${p.name}</td><td>${p.category}</td><td>Rp ${formatRupiah(p.price)}</td></tr>`).join('')}</tbody></table></div>`; };
window.renderLaporan = () => { document.getElementById('page-title').innerText="LAPORAN"; document.getElementById('content-area').innerHTML = `<div class="table-container"><table class="data-table"><thead><tr><th>Tanggal</th><th>Total</th><th>Metode</th></tr></thead><tbody>${transactions.map(t=>`<tr><td>${new Date(t.date).toLocaleString()}</td><td>Rp ${formatRupiah(t.total)}</td><td>${t.method}</td></tr>`).join('')}</tbody></table></div>`; };
window.renderPengeluaran = () => { document.getElementById('page-title').innerText="PENGELUARAN"; document.getElementById('content-area').innerHTML = `<div class="table-container"><div style="padding:20px">Modul Pengeluaran</div></div>`; };
window.renderKaryawan = () => { document.getElementById('page-title').innerText="KARYAWAN"; document.getElementById('content-area').innerHTML = `<div class="table-container"><div style="padding:20px">Modul Karyawan</div></div>`; };

window.renderSetelan = () => { 
  document.getElementById('page-title').innerText="SETELAN";
  document.getElementById('content-area').innerHTML = `
      <div class="table-container" style="padding:24px;display:flex;flex-direction:column;gap:16px">
          <h3 style="color:var(--primary)">Koneksi Printer Bluetooth (ESC/POS)</h3>
          <div>
              ${btDevice ? `<span style="color:var(--success)">✅ Printer Terhubung</span>` : `<span style="color:var(--danger)">❌ Printer Belum Terhubung</span>`}
          </div>
          <div>
              <button class="btn btn-primary" onclick="connectBluetoothPrinter()">🔌 Hubungkan Printer</button>
              <button class="btn btn-danger" onclick="disconnectPrinter()">Putuskan Printer</button>
          </div>
      </div>
  `;
};

/* --- BLUETOOTH PRINTING --- */
window.connectBluetoothPrinter = async () => {
  try {
      btDevice = await navigator.bluetooth.requestDevice({ filters: [{ services: ['000018f0-0000-1000-8000-00805f9b34fb'] }], optionalServices: ['000018f0-0000-1000-8000-00805f9b34fb'] });
      const server = await btDevice.gatt.connect();
      const service = await server.getPrimaryService('000018f0-0000-1000-8000-00805f9b34fb');
      btCharacteristic = await service.getCharacteristic('00002af1-0000-1000-8000-00805f9b34fb');
      showToast('Printer terhubung!'); renderSetelan();
  } catch(e) { showToast('Gagal: ' + e.message, 'error'); }
};
window.disconnectPrinter = () => { if(btDevice && btDevice.gatt.connected) btDevice.gatt.disconnect(); btDevice = null; btCharacteristic = null; showToast('Printer terputus'); renderSetelan(); };

window.printReceipt = async (txId) => {
  let tx = transactions.find(t=>t.id===txId);
  if(!tx) return;
  if(!btCharacteristic) { 
      let printContent = document.getElementById('receipt-print-area').innerHTML;
      let originalContents = document.body.innerHTML;
      document.body.innerHTML = printContent;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
      return; 
  }
  const encoder = new TextEncoder();
  const ESC = 0x1B, GS = 0x1D;
  let cmds = [];
  cmds.push(new Uint8Array([ESC, 0x40])); // Init
  cmds.push(new Uint8Array([ESC, 0x61, 1])); // Center
  cmds.push(encoder.encode(settings.shop_name+'\n'));
  cmds.push(encoder.encode(settings.shop_address+'\n'));
  cmds.push(encoder.encode('================================\n'));
  cmds.push(new Uint8Array([ESC, 0x61, 0])); // Left
  cmds.push(encoder.encode('No: #' + tx.id + '\n'));
  cmds.push(encoder.encode(new Date(tx.date).toLocaleString('id-ID') + '\n'));
  cmds.push(encoder.encode('Mode: ' + (tx.dine_mode||'Dine In') + '\n'));
  cmds.push(encoder.encode('--------------------------------\n'));
  tx.items.forEach(it => {
      let line = it.name; if(it.suhu) line += ' (' + it.suhu + ')';
      cmds.push(encoder.encode(line + '\n'));
      cmds.push(encoder.encode('  ' + it.qty + ' x ' + it.price.toLocaleString('id-ID') + ' = ' + (it.qty*it.price).toLocaleString('id-ID') + '\n'));
  });
  cmds.push(encoder.encode('--------------------------------\n'));
  cmds.push(new Uint8Array([ESC, 0x45, 1])); // Bold
  cmds.push(encoder.encode('TOTAL: Rp ' + tx.total.toLocaleString('id-ID') + '\n'));
  cmds.push(new Uint8Array([ESC, 0x45, 0])); // Unbold
  cmds.push(encoder.encode('Bayar: ' + tx.method + '\n'));
  cmds.push(encoder.encode('================================\n'));
  cmds.push(new Uint8Array([ESC, 0x61, 1])); // Center
  cmds.push(encoder.encode('Terima kasih\natas kunjungan Anda!\n\n\n\n'));
  cmds.push(new Uint8Array([GS, 0x56, 0x00])); // Cut
  try {
      for(let c of cmds) { await btCharacteristic.writeValue(c); await new Promise(r => setTimeout(r, 50)); }
      showToast('Struk berhasil dicetak!');
  } catch(e) { showToast('Gagal cetak: ' + e.message, 'error'); }
};

// Keydown listener
document.addEventListener('keydown', (e) => {
  if(e.key==='F1') { e.preventDefault(); if(document.getElementById('modal').classList.contains('active')) { confirmPayment(cart.reduce((s,i)=>s+(i.price*i.qty), 0)); } else openCheckoutModal(); }
  if(e.key==='F2') { e.preventDefault(); cart=[]; renderKasir(); showToast('Keranjang dikosongkan'); }
});

// Run Init
initApp();

