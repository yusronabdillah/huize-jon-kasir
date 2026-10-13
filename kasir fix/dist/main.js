// main.js - Huize Jon Coffee POS Application Logic
var catColorMap = {
  'Wine Coffee': '#722F37',
  'Coffee': '#5C4033',
  'Non Coffee': '#0EA5E9',
  'Djajajan': '#D97706'
};

var DEFAULT_PRODUCTS = [
  {id:'p1', sku:'NC-001', name:'Milkshake Matcha', price:18000, stock:999, category:'Non Coffee'},
  {id:'p2', sku:'NC-002', name:'Milkshake Chocolate', price:15000, stock:999, category:'Non Coffee'},
  {id:'p3', sku:'NC-003', name:'Milkshake Redvelvet', price:18000, stock:999, category:'Non Coffee'},
  {id:'p4', sku:'NC-004', name:'Milkshake Vanilla', price:18000, stock:999, category:'Non Coffee'},
  {id:'p5', sku:'NC-005', name:'Ice Choco Milky', price:12000, stock:999, category:'Non Coffee'},
  {id:'p6', sku:'NC-006', name:'Ice Regal Milk', price:15000, stock:999, category:'Non Coffee'},
  {id:'p7', sku:'NC-007', name:'Original Tea (Hot/Cold)', price:6000, stock:999, category:'Non Coffee'},
  {id:'p8', sku:'NC-008', name:'Lemon Tea (Hot/Cold)', price:14000, stock:999, category:'Non Coffee'},
  {id:'p9', sku:'NC-009', name:'Hot Chocolate Milk', price:15000, stock:999, category:'Non Coffee'},
  {id:'p10', sku:'NC-010', name:'Ginger', price:12000, stock:999, category:'Non Coffee'},
  {id:'p11', sku:'NC-011', name:'Ginger Lemon', price:15000, stock:999, category:'Non Coffee'},
  {id:'p12', sku:'DJ-001', name:'Bitterballen van Nederland', price:22000, stock:999, category:'Djajajan'},
  {id:'p13', sku:'DJ-002', name:'Indomie Single', price:8000, stock:999, category:'Djajajan'},
  {id:'p14', sku:'DJ-003', name:'Indomie Double', price:12000, stock:999, category:'Djajajan'},
  {id:'p15', sku:'DJ-004', name:'Indomie + Telur', price:13000, stock:999, category:'Djajajan'},
  {id:'p16', sku:'DJ-005', name:'Indomie Double + Telur', price:17000, stock:999, category:'Djajajan'},
  {id:'p17', sku:'DJ-006', name:'Indomie Beneran Digoreng', price:15000, stock:999, category:'Djajajan'},
  {id:'p18', sku:'DJ-007', name:'Nasi Goreng', price:15000, stock:999, category:'Djajajan'},
  {id:'p19', sku:'DJ-008', name:'Bakmi Goreng', price:15000, stock:999, category:'Djajajan'},
  {id:'p20', sku:'WC-001', name:'Huize Jon Wine Coffee (Hot)', price:20000, stock:999, category:'Wine Coffee'},
  {id:'p21', sku:'WC-002', name:'Huize Jon Wine Coffee (Cold)', price:22000, stock:999, category:'Wine Coffee'},
  {id:'p22', sku:'CF-001', name:'Huize Jon Coffee "Koffie met Slagroom" Khas Belanda', price:15000, stock:999, category:'Coffee'},
  {id:'p23', sku:'CF-002', name:'Coffee Robusta Teobroek', price:6000, stock:999, category:'Coffee'},
  {id:'p24', sku:'CF-003', name:'Arabica Coffee Teobroek', price:10000, stock:999, category:'Coffee'},
  {id:'p25', sku:'CF-004', name:'Coffee Blend Teobroek', price:10000, stock:999, category:'Coffee'},
  {id:'p26', sku:'CF-005', name:'Coffee Teobroek Susu', price:8000, stock:999, category:'Coffee'},
  {id:'p27', sku:'CF-006', name:'Ice Coffee Milk Espresso', price:15000, stock:999, category:'Coffee'},
  {id:'p28', sku:'CF-007', name:'Sweet Ice Coffee', price:13000, stock:999, category:'Coffee'},
  {id:'p29', sku:'CF-008', name:'Vietnam Drip', price:12000, stock:999, category:'Coffee'},
  {id:'p30', sku:'CF-009', name:'Americano (Ice/Hot)', price:12000, stock:999, category:'Coffee'},
  {id:'p31', sku:'CF-010', name:'V60', price:12000, stock:999, category:'Coffee'},
  {id:'p32', sku:'CF-011', name:'Espresso Bonbon (Espresso with Condensed Milk)', price:15000, stock:999, category:'Coffee'}
];

var DEFAULT_SETTINGS = {
  qris_string: '00020101021126670016ID.CO.QRIS.WWW0215ID10200215886650303102520459265303360',
  admin_pin: '1234',
  shop_name: 'Huize Jon Coffee',
  shop_address: 'Jl. Jenderal Basuki Rahmat'
};

const svgWrap = (paths) => `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;

const svgIcons = {
  milkshake: svgWrap(`<path d="M8 2l2 5h4l2-5"/><path d="M5 7h14l-2 15H7z"/>`),
  ice_drink: svgWrap(`<path d="M5 4h14l-2 16H7Z"/><path d="M9 4v16"/><path d="M15 4v16"/><path d="M5 8h13"/><path d="M6 14h12"/>`),
  tea: svgWrap(`<path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><path d="M12 2v6"/><rect x="10" y="2" width="4" height="2" rx="1"/>`),
  hot_choco: svgWrap(`<path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><path d="M8 2v3"/><path d="M12 2v3"/><path d="M16 2v3"/>`),
  ginger: svgWrap(`<path d="M4 18v-8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8Z"/><path d="M10 10s1-2 2-2 2 2 2 2"/><path d="M8 14h8"/>`),
  bitterballen: svgWrap(`<circle cx="8" cy="14" r="3"/><circle cx="16" cy="14" r="3"/><circle cx="12" cy="10" r="3"/>`),
  noodle: svgWrap(`<path d="M3 11a9 9 0 0 0 18 0H3z"/><path d="M12 3v8"/><path d="M8 5v6"/><path d="M16 5v6"/>`),
  rice_plate: svgWrap(`<path d="M4 16c0-4 4-6 8-6s8 2 8 6"/><path d="M2 16h20"/>`),
  wine_coffee: svgWrap(`<path d="M8 2v3a4 4 0 0 0 8 0V2Z"/><path d="M12 9v6"/><path d="M9 15h6"/><path d="M6 18c0-3 3-5 6-5s6 2 6 5v2H6Z"/>`),
  koffie_slagroom: svgWrap(`<path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><path d="M7 6c0-2 2-2 3-4 1 2 2 2 3 4 1-2 3-2 3-4-1 2-2 2-2 4"/>`),
  vietnam_drip: svgWrap(`<path d="M5 10h14"/><path d="M7 2h10v8H7z"/><path d="M9 12v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-6Z"/>`),
  v60: svgWrap(`<path d="M4 4h16l-4 8H8z"/><path d="M9 14l1 4h4l1-4"/><path d="M4 4c0-2 4-2 8-2s8 0 8 2"/>`),
  espresso_bonbon: svgWrap(`<path d="M5 8h12v4a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4Z"/><path d="M17 10h1a2 2 0 1 1 0 4h-1"/><path d="M6 14h10"/>`),
  coffee: svgWrap(`<path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><path d="M6 2v2"/><path d="M10 2v2"/><path d="M14 2v2"/>`),
  coffee_milk: svgWrap(`<path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><path d="M12 2v4"/><circle cx="12" cy="7" r="1"/>`)
};

window.getProductIcon = (p) => {
    let n = p.name.toLowerCase();
    
    if (n.includes('wine')) return svgIcons.wine_coffee;
    if (n.includes('slagroom')) return svgIcons.koffie_slagroom;
    if (n.includes('vietnam')) return svgIcons.vietnam_drip;
    if (n.includes('v60')) return svgIcons.v60;
    if (n.includes('bonbon')) return svgIcons.espresso_bonbon;
    if (n.includes('susu') && p.category === 'Coffee') return svgIcons.coffee_milk;
    
    if (n.includes('milkshake')) return svgIcons.milkshake;
    if (n.includes('ice') || n.includes('dingin')) {
        if(n.includes('coffee')) return svgIcons.ice_drink;
        return svgIcons.ice_drink;
    }
    if (n.includes('tea') || n.includes('teh')) return svgIcons.tea;
    if (n.includes('hot chocolate') || n.includes('coklat') || n.includes('choco')) return svgIcons.hot_choco;
    if (n.includes('ginger') || n.includes('jahe')) return svgIcons.ginger;
    
    if (n.includes('bitterballen')) return svgIcons.bitterballen;
    if (n.includes('indomie') || n.includes('bakmi') || n.includes('mie')) return svgIcons.noodle;
    if (n.includes('nasi')) return svgIcons.rice_plate;
    
    if (p.category === 'Coffee' || p.category === 'Wine Coffee') return svgIcons.coffee;
    return svgIcons.hot_choco; // default
};

var empArr=[], expArr=[], logArr=[], currentRoute='kasir', cart=[], products=[], transactions=[], settings={}, selectedCartIndex=-1, paymentMode='Tunai';
var activeCategory='Semua', searchQuery='';
var laporanFilterType = 'Harian', laporanFilterDate = new Date().toISOString().split('T')[0], laporanFilterMonth = new Date().toISOString().split('T')[0].slice(0,7);

window.createCustomSelect = (id, options, selectedValue, onchangeStr, inlineStyle = '') => {
    let selectedLabel = options.find(o => o.value == selectedValue)?.label || options[0]?.label || '';
    let realValue = selectedValue || options[0]?.value || '';
    
    let html = `
    <div class="custom-select" style="${inlineStyle}" onclick="event.stopPropagation(); window.closeAllCustomSelects(this); this.classList.toggle('open')">
        <div class="custom-select-display">
            <span id="${id}-label">${selectedLabel}</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </div>
        <div class="custom-select-dropdown">`;
        
    options.forEach(o => {
        let isSel = (o.value == realValue);
        let oc = `event.stopPropagation(); document.getElementById('${id}').value='${o.value}'; document.getElementById('${id}-label').innerText='${o.label}'; this.parentElement.parentElement.classList.remove('open'); ${onchangeStr}`;
        html += `<div class="custom-select-item ${isSel ? 'selected' : ''}" onclick="${oc.replace(/"/g, '&quot;')}">${isSel ? '✓ ' : ''}${o.label}</div>`;
    });
    
    html += `
        </div>
        <input type="hidden" id="${id}" value="${realValue}">
    </div>`;
    return html;
};

window.closeAllCustomSelects = (exceptSelect = null) => {
    document.querySelectorAll('.custom-select').forEach(el => {
        if (el !== exceptSelect) el.classList.remove('open');
    });
};

document.addEventListener('click', () => window.closeAllCustomSelects());
var karyawanTab = 'data';
var btDevice=null, btCharacteristic=null;
var usbPort=null;
var printerMode='bluetooth';

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
  let p = await x('pos_products'); 
  if(p) products = p; else { products = DEFAULT_PRODUCTS; await S('pos_products', products); }
  
  // Migration for old products to new Djajajan layout
  if (products.some(prod => prod.category === 'Kopi Wine' || prod.category === 'Kopi Belanda')) {
      products = DEFAULT_PRODUCTS; 
      await S('pos_products', products);
      showToast('Katalog produk diperbarui ke menu baru!', 'success');
  }

  // Migration for new Coffee & Wine Coffee (if missing from DB)
  if (!products.some(prod => prod.category === 'Wine Coffee') && !products.some(prod => prod.category === 'Coffee')) {
      const newProducts = DEFAULT_PRODUCTS.filter(d => d.category === 'Wine Coffee' || d.category === 'Coffee');
      products = [...products, ...newProducts];
      await S('pos_products', products);
      showToast('Menu Coffee & Wine Coffee berhasil ditambahkan!', 'success');
  }
  let t = await x('pos_transactions'); if(t) transactions = t;
  let s = await x('pos_settings'); if(s) settings = s; else { settings = DEFAULT_SETTINGS; await S('pos_settings', settings); }
  let e = await x('pos_employees'); if(e) empArr = e;
  let ex = await x('pos_expenses'); if(ex) expArr = ex;
  let l = await x('pos_logs'); if(l) logArr = l;

  // Migration: If the database still holds old data from Sego Sambel, reset products and settings
  if (settings && settings.shop_name !== 'Huize Jon Coffee') {
      products = DEFAULT_PRODUCTS; await S('pos_products', products);
      settings = DEFAULT_SETTINGS; await S('pos_settings', settings);
      transactions = []; await S('pos_transactions', transactions);
      showToast('Database diperbarui ke Huize Jon Coffee', 'success');
  }

  // --- Realtime Firebase Listeners ---
  if (typeof firebase !== 'undefined') {
      const db = firebase.database();
      db.ref('pos_products').on('value', snap => { if(snap.val()) products = snap.val(); if(document.getElementById('content-area')) renderApp(); renderPage(); });
      db.ref('pos_transactions').on('value', snap => { if(snap.val()) transactions = snap.val(); if(document.getElementById('content-area')) renderApp(); renderPage(); });
      db.ref('pos_settings').on('value', snap => { if(snap.val()) settings = snap.val(); if(document.getElementById('content-area')) renderApp(); renderPage(); });
      db.ref('pos_employees').on('value', snap => { if(snap.val()) empArr = snap.val(); if(document.getElementById('content-area')) renderApp(); renderPage(); });
      db.ref('pos_expenses').on('value', snap => { if(snap.val()) expArr = snap.val(); if(document.getElementById('content-area')) renderApp(); renderPage(); });
      db.ref('pos_logs').on('value', snap => { if(snap.val()) logArr = snap.val(); if(document.getElementById('content-area')) renderApp(); renderPage(); });
  }

  let user = sessionStorage.getItem('pos_user');
  if(!user) { renderLoginScreen(); } else { renderApp(); renderPage(); }
}

window.renderLoginScreen = () => {
  let optionsList = [{value:'owner', label:'👑 Owner'}];
  empArr.filter(e => e.status==='Aktif').forEach(emp => {
      optionsList.push({value:`emp_${emp.id}`, label:`👤 ${emp.name} (Karyawan)`});
  });
  let customSelectHTML = window.createCustomSelect('login-user', optionsList, 'owner', '');
  
  document.getElementById('app').innerHTML = `
  <div style="display:flex;align-items:center;justify-content:center;min-height:100vh;width:100vw;background:var(--bg-body) url('./bg-login.png') center center / cover no-repeat;">
    <div style="background:var(--bg-card);padding:40px;border-radius:var(--radius-lg);box-shadow:0 20px 50px rgba(110,76,59,0.15);width:90%;max-width:400px;text-align:center;border:1px solid var(--border-color)">
      <img src="./logo.png" alt="Logo" style="width:80px;height:80px;border-radius:16px;object-fit:cover;margin:0 auto 24px;display:block;">
      <h2 style="margin-bottom:8px;color:var(--primary);font-size:24px">Huize Jon Coffee</h2>
      <p style="color:var(--text-muted);margin-bottom:32px;font-size:14px;font-weight:600">Silakan login ke sistem kasir</p>
      <div class="input-group" style="text-align:left"><label>Pilih Pengguna</label>
      ${customSelectHTML}</div>
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

window.toggleMobileSidebar = () => {
    if (window.innerWidth > 1199) return;
    let sb = document.getElementById('sidebar');
    let ov = document.getElementById('sidebar-overlay');
    if (!sb) return;
    let isOpening = !sb.classList.contains('mobile-open');
    if (isOpening) {
        sb.classList.add('mobile-open');
        if(ov) ov.classList.add('active');
        history.pushState({ drawerOpen: true }, "");
    } else {
        sb.classList.remove('mobile-open');
        if(ov) ov.classList.remove('active');
        if(history.state && history.state.drawerOpen) { history.back(); }
    }
};

window.addEventListener('popstate', (e) => {
    let sb = document.getElementById('sidebar');
    if (sb && sb.classList.contains('mobile-open')) {
        sb.classList.remove('mobile-open');
        let ov = document.getElementById('sidebar-overlay');
        if(ov) ov.classList.remove('active');
    }
});

window.renderApp = () => {
  if (document.getElementById('sidebar')) return; // Hanya render kerangka satu kali

  let user = JSON.parse(sessionStorage.getItem('pos_user')||'{}');
  let isOwner = user.role === 'Owner';
  let menu = `<a href="javascript:void(0)" class="nav-item ${currentRoute==='kasir'?'active':''}" onclick="navigate('kasir')"><span>🛒</span><span class="nav-text">Kasir</span></a>`;
  if(isOwner) {
      menu += `
          <a href="javascript:void(0)" class="nav-item ${currentRoute==='dashboard'?'active':''}" onclick="navigate('dashboard')"><span>📊</span><span class="nav-text">Dashboard</span></a>
          <a href="javascript:void(0)" class="nav-item ${currentRoute==='produk'?'active':''}" onclick="navigate('produk')"><span>📦</span><span class="nav-text">Produk</span></a>
          <a href="javascript:void(0)" class="nav-item ${currentRoute==='laporan'?'active':''}" onclick="navigate('laporan')"><span>📈</span><span class="nav-text">Laporan</span></a>
          <a href="javascript:void(0)" class="nav-item ${currentRoute==='pengeluaran'?'active':''}" onclick="navigate('pengeluaran')"><span>💸</span><span class="nav-text">Pengeluaran</span></a>
          <a href="javascript:void(0)" class="nav-item ${currentRoute==='karyawan'?'active':''}" onclick="navigate('karyawan')"><span>👥</span><span class="nav-text">Karyawan</span></a>
          <a href="javascript:void(0)" class="nav-item ${currentRoute==='setelan'?'active':''}" onclick="navigate('setelan')"><span>⚙️</span><span class="nav-text">Setelan</span></a>
      `;
  }
  document.getElementById('app').innerHTML = `
      <div class="sidebar-overlay" id="sidebar-overlay" onclick="toggleMobileSidebar()"></div>
      <div class="sidebar" id="sidebar">
          <div class="sidebar-logo">
              <img src="./logo.png" alt="Logo">
              <span>Huize Jon<br><span style="font-size:12px;color:var(--text-muted);font-weight:400">Coffee</span></span>
          </div>
          <div class="nav-menu">${menu}</div>
      </div>
      <div class="main-content">
          <div class="topbar">
              <div style="display:flex;align-items:center;">
                  <button class="hamburger-btn" onclick="toggleMobileSidebar()">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                  </button>
                  <h1 id="page-title">HUIZE JON COFFEE</h1>
              </div>
              <div class="user-profile">
                  <div class="header-clock" id="header-clock">
                      <div id="clock-time" class="clock-time">--:--</div>
                      <div id="clock-date" class="clock-date">-- --- ----</div>
                  </div>
                  <div class="user-info-text">
                      <div class="user-name">${user.name || 'Admin'}</div>
                      ${(user.role && user.role !== user.name) ? `<div class="user-role">${user.role}</div>` : ''}
                  </div>
                  <div class="avatar">${(user.name || 'A').charAt(0)}</div>
                  <button class="btn btn-outline btn-sm btn-logout" onclick="handleLogout()">Keluar</button>
              </div>
          </div>
          <div class="content-area" id="content-area"></div>
      </div>
      <div id="modal" class="modal-overlay"><div class="modal-content" id="modal-content"></div></div>
  `;
  
  window.updateHeaderClock = () => {
      let ct = document.getElementById('clock-time');
      let cd = document.getElementById('clock-date');
      if(!ct || !cd) return;
      let now = new Date();
      ct.innerText = now.toLocaleTimeString('id-ID', {hour:'2-digit', minute:'2-digit'}).replace(/\./g, ':') + ' WIB';
      let days = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
      let months = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
      cd.innerHTML = `<span class="clock-day">${days[now.getDay()]}, </span><span class="clock-full-date">${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}</span>`;
  };

  if(window.clockInterval) clearInterval(window.clockInterval);
  window.updateHeaderClock();
  window.clockInterval = setInterval(window.updateHeaderClock, 1000);
};

window.navigate = (route) => { 
  currentRoute = route; 
  
  // Update indicator tanpa re-render keseluruhan shell
  let navItems = document.querySelectorAll('.nav-item');
  if(navItems.length) {
      navItems.forEach(i => i.classList.remove('active'));
      let target = document.querySelector(`.nav-item[onclick*="navigate('${route}')"]`);
      if(target) target.classList.add('active');
  } else {
      renderApp();
  }

  // Auto-close sidebar
  let sb = document.getElementById('sidebar');
  if (sb && sb.classList.contains('mobile-open')) {
      sb.classList.remove('mobile-open');
      let ov = document.getElementById('sidebar-overlay');
      if(ov) ov.classList.remove('active');
      if(history.state && history.state.drawerOpen) { history.back(); }
  }

  // Fokus ke konten untuk accessibility
  document.body.focus();
  renderPage(); 
};

window.renderPage = () => {
  if(currentRoute === 'kasir') renderKasir();
  else if(currentRoute === 'dashboard') renderDashboard();
  else if(currentRoute === 'produk') renderProduk();
  else if(currentRoute === 'laporan') renderLaporan();
  else if(currentRoute === 'pengeluaran') renderPengeluaran();
  else if(currentRoute === 'karyawan') renderKaryawan();
  else if(currentRoute === 'setelan') renderSetelan();
};

window.getKasirProductsHTML = () => {
  let filtered = products;
  if(activeCategory==='🔥 Terlaris') {
      let counts = {};
      transactions.forEach(t => t.items.forEach(i => counts[i.id] = (counts[i.id]||0)+i.qty));
      filtered = [...products].sort((a,b)=>(counts[b.id]||0)-(counts[a.id]||0)).slice(0, 10);
  } else if(activeCategory !== 'Semua') {
      filtered = products.filter(p => p.category === activeCategory);
  }
  if(searchQuery) filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return filtered.map((p, idx) => {
      let delay = Math.min(idx * 30, 250); // Stagger delay (max 250ms)
      // Custom soft badge colors based on category string
      let rawCat = p.category.replace(/^(🔥|☕)\s*/, '');
      let c = catColorMap[rawCat] || 'var(--primary)';
      return `
      <div class="product-card animate-stagger" style="animation-delay: ${delay}ms" onclick="openAddToCartModal('${p.id}')">
          <div class="product-badge" style="background:${c}15;color:${c}">${p.category}</div>
          <div class="product-icon" style="color:var(--primary);">${getProductIcon(p)}</div>
          <div class="product-info">
              <h3>${p.name}</h3>
              <p>Rp ${formatRupiah(p.price)}</p>
          </div>
      </div>`;
  }).join('');
};

window.handleKasirSearch = (val) => {
  searchQuery = val;
  let grid = document.querySelector('.product-grid');
  if(grid) grid.innerHTML = window.getKasirProductsHTML();
};

/* --- KASIR PAGE --- */
window.renderKasir = () => {
  let e = document.getElementById("content-area");
  document.getElementById('page-title').innerText = "POS KASIR";
  let dynamicCats = [...new Set(products.map(p => p.category))];
  let cats = ['🔥 Terlaris', 'Semua', ...dynamicCats];
  
  let tabsHTML = cats.map(c => {
      let rawCat = c.replace(/^(🔥|☕)\s*/, '');
      let color = catColorMap[rawCat] || 'var(--primary)';
      let isActive = c === activeCategory;
      let style = isActive ? `background:${color};border-color:${color};color:#fff;` : `border-color:${color};color:${color};`;
      return `<button class="cat-tab ${isActive?'active':''}" style="${style}" onclick="setCategory('${c}')">${c}</button>`;
  }).join('');
  
  let prodHTML = window.getKasirProductsHTML();

  let total = cart.reduce((s,i)=>s+(i.price*i.qty), 0);
  
  let cartHTML = cart.map((c, idx) => `
      <div class="cart-item animate-fade-in ${idx===selectedCartIndex?'selected':''}" onclick="selectedCartIndex=${idx};renderKasir()">
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

  if(cart.length === 0) cartHTML = `
      <div class="cart-empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom:12px;opacity:0.5"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          <div style="font-weight:600;font-size:15px;color:var(--text-main);margin-bottom:4px">Belum ada pesanan</div>
          <div style="font-size:13px;color:var(--text-muted)">Pilih menu di sebelah kiri<br>untuk mulai transaksi.</div>
      </div>
  `;

  e.innerHTML = `
      <div class="kasir-wrapper">
          <div class="product-side">
              <div class="search-section">
                  <div class="search-box">
                      <span>🔍</span>
                      <input type="text" class="search-control" placeholder="Cari menu kopi atau makanan..." value="${searchQuery}" oninput="handleKasirSearch(this.value)">
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
      <button class="cart-fab" onclick="toggleCartSheet()">
          🛒${cart.length > 0 ? `<span class="fab-badge">${cart.reduce((s,i)=>s+i.qty,0)}</span>` : ''}
      </button>
      <div class="cart-sheet-backdrop" id="cart-sheet-backdrop" onclick="toggleCartSheet()"></div>
      <div class="cart-bottom-sheet" id="cart-bottom-sheet">
          <div class="cart-sheet-handle"></div>
          <div class="cart-header" onclick="toggleCartSheet()" style="cursor:pointer">Pesanan Saat Ini <span>🛒 ${cart.length > 0 ? cart.reduce((s,i)=>s+i.qty,0) + ' item' : ''}</span></div>
          <div class="cart-items" style="max-height:40vh;overflow-y:auto">${cartHTML}</div>
          <div class="cart-footer">
              <div class="price-row total"><span>TOTAL</span><span>Rp ${formatRupiah(total)}</span></div>
              ${cart.length > 0 ? `<button class="btn-pay-huge" onclick="openCheckoutModal()">BAYAR SEKARANG</button>` : `<button class="btn-pay-huge" style="opacity:0.5" disabled>PILIH MENU DULU</button>`}
          </div>
      </div>
  `;
};

window.setCategory = (c) => { activeCategory = c; renderKasir(); };
window.updateQty = (idx, d) => { cart[idx].qty += d; if(cart[idx].qty<=0) cart.splice(idx,1); renderKasir(); };

window.toggleCartSheet = () => {
    let sheet = document.getElementById('cart-bottom-sheet');
    let backdrop = document.getElementById('cart-sheet-backdrop');
    if(!sheet || !backdrop) return;
    let isOpen = sheet.classList.contains('open');
    if(isOpen) {
        sheet.classList.remove('open');
        backdrop.classList.remove('open');
        setTimeout(() => { backdrop.style.pointerEvents = 'none'; }, 300);
    } else {
        backdrop.style.pointerEvents = 'auto';
        sheet.classList.add('open');
        backdrop.classList.add('open');
    }
};

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
              ${window.createCustomSelect('add-suhu', [{value:'Hot',label:'Hot'},{value:'Iced',label:'Iced'}], 'Hot', '')}
          </div>
          <div class="input-group">
              <label>Ukuran</label>
              ${window.createCustomSelect('add-ukuran', [
                  {value:'Regular', label:'Regular (Sesuai Harga)'},
                  {value:'Large', label:'Large (+ Rp 5.000)'}
              ], 'Regular', "document.getElementById('add-price-display').innerText = 'Rp ' + formatRupiah(" + p.price + " + (this.value==='Large'?5000:0))")}
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
  
  let existingCust = document.getElementById('pay-customer');
  let savedCust = existingCust ? existingCust.value : '';
  let existingDine = document.getElementById('pay-dine');
  let savedDine = existingDine ? existingDine.value : 'Dine In';

  let total = cart.reduce((s,i)=>s+(i.price*i.qty), 0);
  let m = document.getElementById("modal"), c = document.getElementById("modal-content");
  c.innerHTML = `
      <div class="modal-header"><h2>Pembayaran</h2><button class="close-btn" onclick="closeModal()">x</button></div>
      <div class="modal-body">
          <div class="checkout-summary">
              <div style="font-size:14px;color:var(--text-muted);text-transform:uppercase">Total Tagihan</div>
              <div style="font-size:36px;font-weight:800;color:var(--primary);font-family:'Playfair Display',serif">Rp ${formatRupiah(total)}</div>
          </div>
          <div class="input-group">
              <label>Nama Pelanggan</label>
              <input type="text" id="pay-customer" class="input-control" value="${savedCust}" placeholder="Nama Pelanggan (opsional)">
          </div>
          <div class="input-group">
              <label>Jenis Pesanan</label>
              ${window.createCustomSelect('pay-dine', [
                  {value:'Dine In', label:'Dine In (Makan di Tempat)'},
                  {value:'Take Away', label:'Take Away (Bungkus)'}
              ], savedDine, '')}
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
  let customerName = document.getElementById('pay-customer').value.trim() || 'Umum';
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
      cash: cash,
      customer_name: customerName
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
      return `<div style="text-align:left">${l}</div><div style="display:flex;justify-content:space-between"><span>${it.qty} x ${formatRupiah(it.price)}</span><span>Rp ${formatRupiah(it.qty*it.price)}</span></div>`;
  }).join('');
  
  c.innerHTML = `
      <div class="modal-header"><h2>Struk Pembayaran</h2><button class="close-btn" onclick="closeModal();renderKasir()">x</button></div>
      <div class="modal-body" style="background:#f5f5f5;display:flex;justify-content:center">
          <div class="receipt-preview" id="receipt-print-area" style="font-family: 'Courier New', Courier, monospace; font-size: 14px; line-height: 1.5; padding: 20px; color: #000; width: 100%; max-width: 350px; margin: 0 auto; background: #fff; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
              <div style="text-align:center;font-weight:900;margin-bottom:5px;font-size:22px">${settings.shop_name.toUpperCase()}</div>
              <div style="text-align:center;font-size:12px;margin-bottom:15px">${settings.shop_address}</div>
              <div style="border-top: 1px dashed #000; margin: 10px 0;"></div>
              <div style="display:flex; justify-content:space-between;"><span>Tanggal:</span><span>${new Date(tx.date).toLocaleString('id-ID')}</span></div>
              <div style="display:flex; justify-content:space-between;"><span>Order ID:</span><span>#${tx.id}</span></div>
              <div style="display:flex; justify-content:space-between;"><span>Pelanggan:</span><span>${tx.customer_name || 'Umum'}</span></div>
              <div style="display:flex; justify-content:space-between;"><span>Tipe:</span><span>${tx.dine_mode}</span></div>
              <div style="border-top: 1px dashed #000; margin: 10px 0;"></div>
              ${itemsHTML}
              <div style="border-top: 1px dashed #000; margin: 10px 0;"></div>
              <div style="display:flex; justify-content:space-between; font-weight:bold; font-size:18px; margin-bottom:5px"><span>TOTAL</span><span>Rp ${formatRupiah(tx.total)}</span></div>
              <div style="display:flex; justify-content:space-between;"><span>Pembayaran:</span><span>${tx.method}</span></div>
              ${tx.method==='Tunai' ? `<div style="display:flex; justify-content:space-between;"><span>Tunai:</span><span>Rp ${formatRupiah(tx.cash)}</span></div><div style="display:flex; justify-content:space-between;"><span>Kembali:</span><span>Rp ${formatRupiah(tx.cash-tx.total)}</span></div>` : ''}
              <div style="border-top: 1px dashed #000; margin: 10px 0;"></div>
              <div style="text-align:center;margin-top:15px;font-size:13px">Terima kasih telah berkunjung!</div>
          </div>
      </div>
      <div class="modal-footer">
          <button class="btn btn-outline" onclick="closeModal();renderKasir()">Selesai</button>
          <button class="btn btn-primary" onclick="printReceipt('${tx.id}')">🖨️ Cetak Struk</button>
          <button class="btn btn-success" style="background:#25D366;color:#fff;border:none" onclick="sendReceiptWA('${tx.id}')">💬 WhatsApp</button>
      </div>
  `;
  m.classList.add("active");
};

window.sendReceiptWA = (txId) => {
    let tx = transactions.find(t => t.id === txId);
    if(!tx) return;
    
    let phone = prompt("Masukkan nomor WA Pelanggan (contoh: 08123456789):");
    if(!phone) return;
    
    phone = phone.replace(/[^0-9]/g, '');
    if(phone.startsWith('0')) phone = '62' + phone.substring(1);
    
    let itemsText = tx.items.map(i => `${i.qty}x ${i.name} = Rp ${formatRupiah(i.qty * i.price)}`).join('\\n');
    let msg = `*Struk Pembelian ${settings.shop_name}*\\n` +
              `Tgl: ${new Date(tx.date).toLocaleString('id-ID')}\\n` +
              `Pelanggan: ${tx.customer_name || 'Umum'}\\n` +
              `No: #${tx.id}\\n` +
              `------------------------\\n` +
              `${itemsText}\\n` +
              `------------------------\\n` +
              `*TOTAL: Rp ${formatRupiah(tx.total)}*\\n` +
              `Bayar: ${tx.method}\\n\\n` +
              `Terima kasih!`;
              
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
};

/* --- DASHBOARD, PRODUK, DLL (Owner Only) --- */
window.dashboardPeriodeType = window.dashboardPeriodeType || 'hari ini';
window.dashboardPeriodeValue = window.dashboardPeriodeValue || new Date().toISOString().split('T')[0];

window.renderDashboard = () => {
  let e = document.getElementById("content-area");
  document.getElementById('page-title').innerText = "DASHBOARD";
  
  let now = new Date();
  let today = now.toISOString().split('T')[0];
  let thisMonth = today.slice(0, 7);

  let targetPrefix = today;
  let labelText = "Hari Ini";

  if (window.dashboardPeriodeType === 'tanggal') {
      targetPrefix = window.dashboardPeriodeValue;
      if (targetPrefix) {
          let d = new Date(targetPrefix);
          labelText = d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
      } else {
          labelText = "Tanggal Belum Dipilih";
      }
  } else if (window.dashboardPeriodeType === 'bulan') {
      targetPrefix = window.dashboardPeriodeValue;
      if (targetPrefix) {
          let [y, m] = targetPrefix.split('-');
          let d = new Date(y, m - 1, 1);
          labelText = d.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
      } else {
          labelText = "Bulan Belum Dipilih";
      }
  }

  let periodeTx = targetPrefix ? transactions.filter(t => t.date.startsWith(targetPrefix)) : [];
  let omset = periodeTx.reduce((s,t)=>s+t.total,0);
  
  let btnStyle = (active) => `flex:1; min-height:44px; font-size:16px; font-weight:bold; cursor:pointer; display:flex; align-items:center; justify-content:center; ${active ? 'background:var(--primary); color:#fff; border:2px solid var(--primary);' : 'background:transparent; color:var(--text-muted); border:2px solid var(--border-color);'}`;

  let itemsSold = 0;
  let itemCounts = {};
  periodeTx.forEach(t => {
      if(t.items) {
          t.items.forEach(i => {
              itemsSold += i.qty;
              itemCounts[i.name] = (itemCounts[i.name] || 0) + i.qty;
          });
      }
  });

  let topItems = Object.keys(itemCounts).map(name => ({name, qty: itemCounts[name]})).sort((a,b) => b.qty - a.qty).slice(0, 5);
  let topItemsHTML = topItems.length > 0 ? topItems.map((item, idx) => `
      <div style="display:flex; justify-content:space-between; align-items:center; padding:12px 0; border-bottom:1px solid var(--border-color);">
          <div style="display:flex; align-items:center; gap:12px;">
              <div style="width:28px; height:28px; border-radius:50%; background:var(--primary); color:#fff; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:bold;">${idx+1}</div>
              <div style="font-weight:600; font-size:14px; color:var(--text-color);">${item.name}</div>
          </div>
          <div style="font-weight:700; font-size:13px; color:var(--primary); background:var(--primary)22; padding:4px 8px; border-radius:4px;">${item.qty} Porsi</div>
      </div>
  `).join('') : '<div style="color:var(--text-muted); font-size:14px; padding:12px 0; text-align:center;">Belum ada penjualan.</div>';

  let recentTx = [...periodeTx].reverse().slice(0, 5);
  let recentTxHTML = recentTx.length > 0 ? recentTx.map(t => `
      <div style="display:flex; justify-content:space-between; align-items:center; padding:12px 0; border-bottom:1px solid var(--border-color);">
          <div>
              <div style="font-weight:600; font-size:14px; color:var(--text-color);">${t.id.slice(-6)} <span style="font-weight:400; color:var(--text-muted); font-size:12px;">- ${t.customer_name || 'Pelanggan'}</span></div>
              <div style="font-size:12px; color:var(--text-muted); margin-top:4px;">${new Date(t.date).toLocaleTimeString('id-ID', {hour:'2-digit', minute:'2-digit'})} • ${t.method}</div>
          </div>
          <div style="font-weight:700; color:#2E7D32;">Rp ${formatRupiah(t.total)}</div>
      </div>
  `).join('') : '<div style="color:var(--text-muted); font-size:14px; padding:12px 0; text-align:center;">Belum ada transaksi.</div>';
  
  e.innerHTML = `
      <div style="display:flex; gap:12px; margin-bottom:24px;">
          <button class="btn" style="${btnStyle(window.dashboardPeriodeType==='hari ini')}" onclick="window.dashboardPeriodeType='hari ini'; window.dashboardPeriodeValue='${today}'; renderDashboard();">Hari Ini</button>
          <button id="fp-tanggal" class="btn" style="${btnStyle(window.dashboardPeriodeType==='tanggal')}">${window.dashboardPeriodeType==='tanggal' && window.dashboardPeriodeValue ? '📅 ' + labelText : '📅 Pilih Tanggal'}</button>
          <button id="fp-bulan" class="btn" style="${btnStyle(window.dashboardPeriodeType==='bulan')}">${window.dashboardPeriodeType==='bulan' && window.dashboardPeriodeValue ? '🗓️ ' + labelText : '🗓️ Pilih Bulan'}</button>
      </div>

      <div style="margin-bottom: 24px;">
          <div class="stat-card main-stat" style="margin-bottom: 20px; border-left-color: #2E7D32; display:flex; flex-direction:row; justify-content:space-between; align-items:center;">
              <div>
                  <div class="stat-label">Omset ${labelText}</div>
                  <div class="stat-value" style="color: #2E7D32;">Rp ${formatRupiah(omset)}</div>
              </div>
              <div style="font-size:48px; opacity:0.15; line-height:1;">💰</div>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
              <div class="stat-card" style="display:flex; flex-direction:row; justify-content:space-between; align-items:center;">
                  <div>
                      <div class="stat-label">Jumlah Transaksi</div>
                      <div class="stat-value">${periodeTx.length}</div>
                  </div>
                  <div style="font-size:36px; opacity:0.15; line-height:1;">🧾</div>
              </div>
              <div class="stat-card" style="display:flex; flex-direction:row; justify-content:space-between; align-items:center;">
                  <div>
                      <div class="stat-label">Produk Terjual</div>
                      <div class="stat-value">${itemsSold}</div>
                  </div>
                  <div style="font-size:36px; opacity:0.15; line-height:1;">☕</div>
              </div>
          </div>
      </div>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; margin-bottom: 32px;">
          <div class="card" style="padding: 24px;">
              <h3 style="margin-top:0; margin-bottom:16px; font-size:16px; display:flex; align-items:center; gap:8px;">
                  <span style="font-size:20px;">🔥</span> Menu Terlaris
              </h3>
              <div>${topItemsHTML}</div>
          </div>
          <div class="card" style="padding: 24px;">
              <h3 style="margin-top:0; margin-bottom:16px; font-size:16px; display:flex; align-items:center; gap:8px;">
                  <span style="font-size:20px;">⏱️</span> Transaksi Terakhir
              </h3>
              <div>${recentTxHTML}</div>
          </div>
      </div>
  `;

  if (window.flatpickr) {
      flatpickr("#fp-tanggal", {
          locale: "id",
          defaultDate: window.dashboardPeriodeType==='tanggal' ? window.dashboardPeriodeValue : null,
          onChange: function(selectedDates, dateStr) {
              if (dateStr) {
                  window.dashboardPeriodeType = 'tanggal';
                  window.dashboardPeriodeValue = dateStr;
                  renderDashboard();
              }
          }
      });
      flatpickr("#fp-bulan", {
          locale: "id",
          plugins: [
              new monthSelectPlugin({
                  shorthand: true,
                  dateFormat: "Y-m",
                  altFormat: "F Y"
              })
          ],
          defaultDate: window.dashboardPeriodeType==='bulan' ? window.dashboardPeriodeValue : null,
          onChange: function(selectedDates, dateStr) {
              if (dateStr) {
                  window.dashboardPeriodeType = 'bulan';
                  window.dashboardPeriodeValue = dateStr;
                  renderDashboard();
              }
          }
      });
  }
};

// Implement minimal versions of other pages to save space, but functional
window.renderProduk = () => { 
  document.getElementById('page-title').innerText="MANAJEMEN PRODUK"; 
  let html = `
    <div style="margin-bottom:20px;">
        <button class="btn btn-primary" onclick="openProductModal()">+ Tambah Menu</button>
    </div>
    <div class="table-container">
        <table class="data-table">
            <thead>
                <tr><th>Nama Menu</th><th>Kategori</th><th>Harga</th><th>Stok</th><th>Aksi</th></tr>
            </thead>
            <tbody>
                ${products.map(p=>`
                <tr>
                    <td><strong>${p.name}</strong></td>
                    <td><span class="badge" style="background:${catColorMap[p.category]||'var(--primary)'};color:#fff">${p.category}</span></td>
                    <td>Rp ${formatRupiah(p.price)}</td>
                    <td>${p.stock || 0}</td>
                    <td>
                        <button class="btn btn-sm btn-primary" style="margin-right:8px" onclick="openProductModal('${p.id}')">Edit</button>
                        <button class="btn btn-sm btn-danger" onclick="confirmDeleteProduct('${p.id}')">Hapus</button>
                    </td>
                </tr>`).join('')}
            </tbody>
        </table>
    </div>
  `;
  document.getElementById('content-area').innerHTML = html;
};

window.openProductModal = (id = null) => {
    let p = id ? products.find(x => x.id === id) : null;
    let existingCats = [...new Set(products.map(x => x.category))];
    let catOptionsList = existingCats.map(c => ({value: c, label: c}));
    catOptionsList.push({value: '_NEW_', label: '+ Kategori Baru...'});
    let selectedCat = p ? p.category : existingCats[0];
    let customCatHTML = window.createCustomSelect('prod-cat', catOptionsList, selectedCat, "if(this.value==='_NEW_') document.getElementById('new-cat-group').style.display='flex'; else document.getElementById('new-cat-group').style.display='none';");
    
    let m = document.getElementById("modal"), c = document.getElementById("modal-content");
    c.innerHTML = `
        <div class="modal-header"><h2>${p ? 'Edit Menu' : 'Tambah Menu Baru'}</h2><button class="close-btn" onclick="closeModal()">×</button></div>
        <div class="modal-body">
            <input type="hidden" id="prod-id" value="${p ? p.id : ''}">
            <div class="input-group">
                <label>Nama Menu *</label>
                <input type="text" id="prod-name" class="input-control" value="${p ? p.name : ''}" placeholder="Contoh: Espresso">
            </div>
            <div class="input-group">
                <label>Kategori *</label>
                ${customCatHTML}
            </div>
            <div class="input-group" id="new-cat-group" style="display:none;">
                <label>Nama Kategori Baru</label>
                <input type="text" id="prod-new-cat" class="input-control" placeholder="Ketik kategori baru">
            </div>
            <div class="input-grid">
                <div class="input-group">
                    <label>Harga (Rp) *</label>
                    <input type="text" id="prod-price" class="input-control" value="${p ? formatRupiah(p.price) : ''}" oninput="formatInputRupiah(event)">
                </div>
                <div class="input-group">
                    <label>Stok Akhir</label>
                    <input type="number" id="prod-stock" class="input-control" value="${p ? (p.stock||0) : 0}" min="0">
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn btn-outline" onclick="closeModal()">Batal</button>
            <button class="btn btn-primary" onclick="saveProduct()">Simpan Menu</button>
        </div>
    `;
    m.classList.add("active");
};

window.saveProduct = async () => {
    let id = document.getElementById('prod-id').value;
    let name = document.getElementById('prod-name').value.trim();
    let cat = document.getElementById('prod-cat').value;
    if(cat === '_NEW_') cat = document.getElementById('prod-new-cat').value.trim();
    let price = parseRupiah(document.getElementById('prod-price').value);
    let stock = parseInt(document.getElementById('prod-stock').value) || 0;

    if(!name || !cat || price <= 0) return showToast('Harap isi Nama, Kategori, dan Harga valid!', 'error');

    if(id) {
        let idx = products.findIndex(x => x.id === id);
        if(idx >= 0) {
            products[idx].name = name;
            products[idx].category = cat;
            products[idx].price = price;
            products[idx].stock = stock;
        }
    } else {
        id = 'p' + Date.now();
        products.push({ id, sku: 'PROD-'+Date.now().toString().slice(-4), name, category: cat, price, stock });
    }
    
    await S('pos_products', products);
    closeModal();
    renderProduk();
    showToast('Menu berhasil disimpan!', 'success');
};

window.confirmDeleteProduct = (id) => {
    let p = products.find(x => x.id === id);
    if(!p) return;
    let m = document.getElementById("modal"), c = document.getElementById("modal-content");
    c.innerHTML = `
        <div class="modal-header"><h2>Konfirmasi Hapus</h2><button class="close-btn" onclick="closeModal()">×</button></div>
        <div class="modal-body">
            <p>Yakin ingin menghapus menu <strong>${p.name}</strong>?<br>Tindakan ini tidak bisa dibatalkan.</p>
        </div>
        <div class="modal-footer">
            <button class="btn btn-outline" onclick="closeModal()">Batal</button>
            <button class="btn btn-danger" onclick="deleteProduct('${id}')">Ya, Hapus</button>
        </div>
    `;
    m.classList.add("active");
};

window.deleteProduct = async (id) => {
    products = products.filter(x => x.id !== id);
    await S('pos_products', products);
    closeModal();
    renderProduk();
    showToast('Menu berhasil dihapus!', 'success');
};
window.renderLaporan = () => {
    document.getElementById('page-title').innerText = "Laporan & Aktivitas";
    
    let isDaily = laporanFilterType === 'Harian';
    let filteredTx = transactions.filter(t => {
        if(isDaily) return t.date.startsWith(laporanFilterDate);
        return t.date.startsWith(laporanFilterMonth);
    });
    
    let filteredExp = expArr.filter(e => {
        if(isDaily) return e.date.startsWith(laporanFilterDate);
        return e.date.startsWith(laporanFilterMonth);
    });

    let uangMasuk = filteredTx.reduce((sum, t) => sum + t.total, 0);
    let uangKeluar = filteredExp.filter(e => e.category !== 'Tambah Uang Kas').reduce((sum, e) => sum + e.amount, 0);

    // FORMULA KONSISTEN: Uang Kas Sekarang = Tambah Uang + Total Penjualan - SEMUA Pengeluaran
    let totalPenjualan = transactions.reduce((sum, t) => sum + t.total, 0);
    let tambahUang = expArr.filter(e => e.category === 'Tambah Uang Kas').reduce((sum, e) => sum + e.amount, 0);
    let semuaPengeluaran = expArr.filter(e => e.category !== 'Tambah Uang Kas').reduce((sum, e) => sum + e.amount, 0);
    let uangKasSekarang = tambahUang + totalPenjualan - semuaPengeluaran;

    let e = document.getElementById('content-area');
    let customFilterSelect = window.createCustomSelect('laporanFilterType', [
        {value: 'Harian', label: 'Harian'},
        {value: 'Bulanan', label: 'Bulanan'}
    ], laporanFilterType, "laporanFilterType=this.value;renderLaporan()", "width:180px; z-index:100;");

    e.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; flex-wrap:wrap; gap:16px;">
            <div style="display:flex; gap:12px; align-items:center; position:relative; z-index:100;">
                ${customFilterSelect}
                <div class="date-wrapper" style="width:180px;">
                ${isDaily ? 
                    `<input type="text" id="fp-laporan-tanggal" class="input-control" value="${laporanFilterDate}" style="background:#fff; cursor:pointer;" readonly placeholder="Pilih Tanggal">` : 
                    `<input type="text" id="fp-laporan-bulan" class="input-control" value="${laporanFilterMonth}" style="background:#fff; cursor:pointer;" readonly placeholder="Pilih Bulan">`
                }
                </div>
            </div>
        </div>
        </div>

        <div style="margin-bottom: 24px;">
            <div class="stat-card main-stat" style="margin-bottom: 20px; border-left-color: #2E7D32;">
                <div class="stat-label">💰 Uang Kas Sekarang</div>
                <div class="stat-value" style="color: #2E7D32;">Rp ${formatRupiah(uangKasSekarang)}</div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div class="stat-card" style="border-left: 4px solid var(--success);">
                    <div class="stat-label">Uang Masuk</div>
                    <div class="stat-value" style="color: var(--success);">Rp ${formatRupiah(uangMasuk)}</div>
                </div>
                <div class="stat-card" style="border-left: 4px solid var(--danger);">
                    <div class="stat-label">Uang Keluar</div>
                    <div class="stat-value" style="color: var(--danger);">Rp ${formatRupiah(uangKeluar)}</div>
                </div>
            </div>
        </div>

        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr><th>WAKTU</th><th>PELANGGAN</th><th>ITEM</th><th>TOTAL</th><th>METODE</th></tr>
                </thead>
                <tbody>
                    ${filteredTx.length === 0 ? 
                        `<tr><td colspan="5" style="text-align:center;padding:40px;color:var(--text-muted)">Belum ada data transaksi</td></tr>` : 
                        [...filteredTx].reverse().map(t => `
                            <tr>
                                <td>${new Date(t.date).toLocaleString('id-ID', {day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit'})}</td>
                                <td>${t.customer_name || 'Umum'}</td>
                                <td>${t.items.map(i => `${i.qty}x ${i.name}`).join('<br>')}</td>
                                <td style="font-weight:bold;color:var(--primary);font-size:16px">Rp ${formatRupiah(t.total)}</td>
                                <td><span class="badge">${t.method}</span></td>
                            </tr>
                        `).join('')
                    }
                </tbody>
            </table>
        </div>
    `;

    if (window.flatpickr) {
        if (isDaily) {
            flatpickr("#fp-laporan-tanggal", {
                locale: "id",
                defaultDate: laporanFilterDate,
                onChange: function(selectedDates, dateStr) {
                    if (dateStr) {
                        laporanFilterDate = dateStr;
                        renderLaporan();
                    }
                }
            });
        } else {
            flatpickr("#fp-laporan-bulan", {
                locale: "id",
                plugins: [
                    new monthSelectPlugin({
                        shorthand: true,
                        dateFormat: "Y-m",
                        altFormat: "F Y"
                    })
                ],
                defaultDate: laporanFilterMonth,
                onChange: function(selectedDates, dateStr) {
                    if (dateStr) {
                        laporanFilterMonth = dateStr;
                        renderLaporan();
                    }
                }
            });
        }
    }
};

window.exportLaporanCSV = () => {
    let isDaily = laporanFilterType === 'Harian';
    let filteredTx = transactions.filter(t => t.date.startsWith(isDaily ? laporanFilterDate : laporanFilterMonth));
    let filteredExp = expArr.filter(e => e.date.startsWith(isDaily ? laporanFilterDate : laporanFilterMonth));
    
    let csv = "TANGGAL,TIPE,KETERANGAN,NOMINAL,METODE\\n";
    filteredTx.forEach(t => {
        let desc = t.items.map(i => `${i.qty}x ${i.name}`).join(' | ');
        csv += `"${t.date}","Pemasukan","${desc}","${t.total}","${t.method}"\\n`;
    });
    filteredExp.forEach(e => {
        csv += `"${e.date}","Pengeluaran","${e.note || e.category}","${e.amount}","Cash"\\n`;
    });
    
    let blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    let url = URL.createObjectURL(blob);
    let link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Laporan_${isDaily ? laporanFilterDate : laporanFilterMonth}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Laporan CSV berhasil diunduh!');
};

window.confirmResetData = () => {
    let m = document.getElementById("modal"), c = document.getElementById("modal-content");
    c.innerHTML = `
        <div class="modal-header"><h2>⚠️ Reset Semua Data</h2><button class="close-btn" onclick="closeModal()">×</button></div>
        <div class="modal-body">
            <p style="color:var(--danger);font-weight:bold;font-size:16px;">Tindakan ini sangat berbahaya!</p>
            <p>Anda akan menghapus SELURUH riwayat transaksi dan pengeluaran secara permanen. Tindakan ini tidak bisa dibatalkan.</p>
            <p style="margin-top:16px">Lanjutkan?</p>
        </div>
        <div class="modal-footer">
            <button class="btn btn-outline" onclick="closeModal()">Batal</button>
            <button class="btn btn-danger" onclick="executeResetData()">Ya, Hapus Semua</button>
        </div>
    `;
    m.classList.add("active");
};

window.executeResetData = () => {
    requireOwnerPin('Reset Data', 'performHardReset');
};

window.performHardReset = async () => {
    transactions = [];
    expArr = [];
    await S('pos_transactions', transactions);
    await S('pos_expenses', expArr);
    closeModal();
    renderLaporan();
    showToast('Semua data berhasil direset!', 'success');
};
window.renderPengeluaran = () => {
    document.getElementById('page-title').innerText = "Pengeluaran";
    let today = new Date().toISOString().split('T')[0];
    let thisMonth = today.slice(0, 7);

    let pengeluaranHariIni = expArr.filter(e => e.date.startsWith(today) && e.category !== 'Tambah Uang Kas').reduce((sum, e) => sum + e.amount, 0);
    let pengeluaranBulanIni = expArr.filter(e => e.date.startsWith(thisMonth) && e.category !== 'Tambah Uang Kas').reduce((sum, e) => sum + e.amount, 0);
    
    // FORMULA KONSISTEN: Uang Kas Sekarang = Tambah Uang + Total Penjualan - SEMUA Pengeluaran
    let totalPenjualan = transactions.reduce((sum, t) => sum + t.total, 0);
    let tambahUang = expArr.filter(e => e.category === 'Tambah Uang Kas').reduce((sum, e) => sum + e.amount, 0);
    let semuaPengeluaran = expArr.filter(e => e.category !== 'Tambah Uang Kas').reduce((sum, e) => sum + e.amount, 0);
    let uangKasSekarang = tambahUang + totalPenjualan - semuaPengeluaran;

    let html = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px;">
            <h2 style="color:var(--primary);font-size:24px;margin:0">Pencatatan Pengeluaran</h2>
            <div style="display:flex;gap:10px;flex-wrap:wrap;">
                <button class="btn" onclick="addCashModal()" style="background:var(--primary);color:#fff;padding:14px 22px;font-size:16px">+ Tambah Uang</button>
                <button class="btn btn-primary" onclick="openExpenseModal()" style="background:#2E7D32;padding:14px 22px;font-size:16px">+ Catat Pengeluaran</button>
            </div>
        </div>

        <div style="margin-bottom: 24px;">
            <div class="stat-card main-stat" style="margin-bottom: 20px; border-left-color: #2E7D32;">
                <div class="stat-label">💰 Uang Kas Sekarang</div>
                <div class="stat-value" style="color: #2E7D32;">Rp ${formatRupiah(uangKasSekarang)}</div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div class="stat-card">
                    <div class="stat-label">Pengeluaran Hari Ini</div>
                    <div class="stat-value" style="color: var(--danger);">Rp ${formatRupiah(pengeluaranHariIni)}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Pengeluaran Bulan Ini</div>
                    <div class="stat-value" style="color: var(--danger);">Rp ${formatRupiah(pengeluaranBulanIni)}</div>
                </div>
            </div>
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:16px;margin-bottom:24px;overflow:hidden">
            <div onclick="this.nextElementSibling.style.display=this.nextElementSibling.style.display==='none'?'block':'none'; this.querySelector('.arrow').textContent=this.nextElementSibling.style.display==='none'?'▶':'▼'" style="padding:16px 24px;cursor:pointer;display:flex;align-items:center;gap:10px;user-select:none">
                <span class="arrow" style="font-size:12px;color:var(--text-muted)">▶</span>
                <span style="font-weight:700;color:var(--primary);font-size:15px">📊 Lihat rincian asal uang di kas</span>
            </div>
            <div style="display:none;padding:0 24px 24px;">
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px">
                    <div style="padding:16px;background:#E8F5E9;border-radius:12px">
                        <div style="font-size:13px;color:#2E7D32;font-weight:600">Tambah Uang (Manual)</div>
                        <div style="font-size:22px;font-weight:800;color:#2E7D32;margin-top:6px">Rp ${formatRupiah(tambahUang)}</div>
                    </div>
                    <div style="padding:16px;background:#FFF3E0;border-radius:12px">
                        <div style="font-size:13px;color:#E65100;font-weight:600">Hasil Penjualan</div>
                        <div style="font-size:22px;font-weight:800;color:#E65100;margin-top:6px">Rp ${formatRupiah(totalPenjualan)}</div>
                    </div>
                    <div style="padding:16px;background:#FFEBEE;border-radius:12px">
                        <div style="font-size:13px;color:#C62828;font-weight:600">Total Pengeluaran</div>
                        <div style="font-size:22px;font-weight:800;color:#C62828;margin-top:6px">Rp ${formatRupiah(semuaPengeluaran)}</div>
                    </div>
                </div>
            </div>
        </div>

        <div style="margin-bottom:24px;display:flex;align-items:center;gap:16px;flex-wrap:wrap;">
            <div style="font-size:15px;font-weight:700;color:var(--primary)">⚡ AKSI CEPAT:</div>
            <button class="cat-tab" style="color:var(--success);border-color:var(--success);padding:10px 20px;font-size:15px" onclick="openExpenseModal(null, 'Belanja Kopi')">Belanja Kopi</button>
            <button class="cat-tab" style="color:var(--success);border-color:var(--success);padding:10px 20px;font-size:15px" onclick="openExpenseModal(null, 'Belanja Susu')">Belanja Susu</button>
            <button class="cat-tab" style="color:var(--success);border-color:var(--success);padding:10px 20px;font-size:15px" onclick="openExpenseModal(null, 'Belanja Kemasan')">Belanja Kemasan</button>
            <button class="cat-tab" style="color:var(--success);border-color:var(--success);padding:10px 20px;font-size:15px" onclick="openExpenseModal(null, 'Lainnya')">Lainnya</button>
        </div>


        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>TANGGAL & JAM</th>
                        <th>KATEGORI</th>
                        <th>NOMINAL</th>
                        <th>CATATAN</th>
                        <th style="text-align:right;">AKSI</th>
                    </tr>
                </thead>
                <tbody>
                    ${expArr.filter(e => e.category !== 'Tambah Uang Kas').length === 0 ? 
                        `<tr><td colspan="5" style="text-align:center;padding:40px;color:var(--text-muted);font-size:16px">Belum ada data pengeluaran</td></tr>` : 
                        [...expArr].filter(e => e.category !== 'Tambah Uang Kas').reverse().map(e => {
                            let d = new Date(e.date);
                            let formattedDate = d.toLocaleDateString('id-ID', {day:'2-digit', month:'short', year:'numeric'}) + ' • ' + d.toLocaleTimeString('id-ID', {hour:'2-digit', minute:'2-digit'});
                            return `
                            <tr>
                                <td style="font-size:14px">${formattedDate}</td>
                                <td style="font-weight:700;color:var(--primary);font-size:15px">${e.category}</td>
                                <td style="font-weight:bold;color:var(--danger);font-size:16px">Rp ${formatRupiah(e.amount)}</td>
                                <td><div style="color:var(--text-muted);font-size:14px">${e.note || '-'}</div></td>
                                <td style="text-align:right;white-space:nowrap;">
                                    <button class="btn btn-sm" style="background:#2E7D32;color:#fff;border:none;margin-right:8px;padding:8px 16px;font-size:14px" onclick="openExpenseModal('${e.id}')">Edit</button>
                                    <button class="btn btn-sm btn-danger" style="padding:8px 16px;font-size:14px" onclick="confirmDeleteExpense('${e.id}')">Hapus</button>
                                </td>
                            </tr>
                            `;
                        }).join('')
                    }
                </tbody>
            </table>
        </div>
    `;
    document.getElementById('content-area').innerHTML = html;
};

window.addCashModal = () => {
    let m = document.getElementById("modal"), c = document.getElementById("modal-content");
    c.innerHTML = `
        <div class="modal-header">
            <h2 style="color:var(--success)">Tambah Uang ke Kas</h2>
            <button class="close-btn" onclick="closeModal()">×</button>
        </div>
        <div class="modal-body">
            <p style="color:var(--text-muted);font-size:13px;margin-bottom:16px">Tambahkan uang tunai ke laci kas (misal: modal awal harian, setoran tambahan). Uang ini akan menambah saldo "Uang Tersedia".</p>
            <div class="input-group">
                <label>NOMINAL (RP)</label>
                <input type="text" id="cash-amount" class="input-control" oninput="formatInputRupiah(event)" placeholder="Contoh: 500.000">
            </div>
            <div class="input-group">
                <label>CATATAN (OPSIONAL)</label>
                <input type="text" id="cash-note" class="input-control" placeholder="Contoh: Modal pagi hari">
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn btn-outline" onclick="closeModal()">Batal</button>
            <button class="btn" style="background:#2E7D32;color:#fff" onclick="saveCashInput()">Tambahkan</button>
        </div>
    `;
    m.classList.add("active");
};

window.saveCashInput = async () => {
    let amount = parseRupiah(document.getElementById('cash-amount').value);
    let note = document.getElementById('cash-note').value.trim() || 'Tambah uang kas';
    if(amount <= 0) return showToast('Masukkan nominal yang valid!', 'error');
    let id = 'e' + Date.now();
    let isoDate = new Date().toISOString();
    expArr.push({ id, category: 'Tambah Uang Kas', source: 'Kas Penjualan', amount, date: isoDate, note });
    await S('pos_expenses', expArr);
    closeModal();
    renderPengeluaran();
    showToast('Uang berhasil ditambahkan ke kas!', 'success');
};

window.exportPengeluaranCSV = () => {
    let rows = [['Tanggal', 'Kategori', 'Sumber Dana', 'Nominal', 'Catatan']];
    expArr.filter(e => e.category !== 'Tambah Uang Kas').forEach(e => {
        rows.push([
            new Date(e.date).toLocaleString('id-ID', {day:'2-digit', month:'long', year:'numeric'}),
            e.category,
            e.source || 'Kas Penjualan',
            e.amount,
            (e.note || '-').replace(/,/g, ';')
        ]);
    });
    let csvContent = rows.map(r => r.join(',')).join('\n');
    let blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Pengeluaran_HuizeJon_' + new Date().toISOString().split('T')[0] + '.csv';
    link.click();
    showToast('File CSV berhasil diunduh!', 'success');
};

window.resetPengeluaranData = () => {
    let m = document.getElementById("modal"), c = document.getElementById("modal-content");
    c.innerHTML = `
        <div class="modal-header"><h2 style="color:var(--danger)">⚠ Reset Data Pengeluaran</h2><button class="close-btn" onclick="closeModal()">×</button></div>
        <div class="modal-body">
            <p style="color:var(--danger);font-weight:700">PERINGATAN: Tindakan ini akan menghapus SELURUH data pengeluaran secara permanen!</p>
            <p style="color:var(--text-muted);margin-top:8px;font-size:13px">Data yang dihapus tidak bisa dikembalikan. Pastikan Anda sudah melakukan export CSV terlebih dahulu jika diperlukan.</p>
        </div>
        <div class="modal-footer">
            <button class="btn btn-outline" onclick="closeModal()">Batal</button>
            <button class="btn btn-danger" onclick="executeResetPengeluaran()">Ya, Hapus Semua</button>
        </div>
    `;
    m.classList.add("active");
};

window.executeResetPengeluaran = async () => {
    expArr = [];
    await S('pos_expenses', expArr);
    closeModal();
    renderPengeluaran();
    showToast('Semua data pengeluaran berhasil direset!', 'success');
};

window.openExpenseModal = (id = null, preCat = '') => {
    let e = id ? expArr.find(x => x.id === id) : null;
    let existingCats = [...new Set(expArr.map(x => x.category)), 'Belanja Kopi', 'Belanja Susu', 'Belanja Sirup/Bahan Minuman', 'Belanja Kemasan', 'Belanja Bahan Makanan', 'Lainnya'];
    existingCats = [...new Set(existingCats)];
    
    let currentCat = e ? e.category : preCat;
    if(!currentCat) currentCat = 'Belanja Kopi';

    let catOptionsList = existingCats.map(c => ({value: c, label: c}));
    catOptionsList.push({value: '_NEW_', label: '+ Kategori Baru...'});
    let customExpCatHTML = window.createCustomSelect('exp-cat', catOptionsList, currentCat, "if(this.value==='_NEW_') document.getElementById('new-exp-cat-group').style.display='flex'; else document.getElementById('new-exp-cat-group').style.display='none';");

    let currentSource = e ? (e.source || 'Kas Penjualan') : 'Kas Penjualan';

    let m = document.getElementById("modal"), c = document.getElementById("modal-content");
    c.innerHTML = `
        <div class="modal-header">
            <h2 style="color:var(--success)">${e ? 'Edit Pengeluaran' : 'Catat Pengeluaran'}</h2>
            <button class="close-btn" onclick="closeModal()">×</button>
        </div>
        <div class="modal-body">
            <input type="hidden" id="exp-id" value="${e ? e.id : ''}">
            
            <div class="input-group">
                <label>KATEGORI</label>
                ${customExpCatHTML}
            </div>
            <div class="input-group" id="new-exp-cat-group" style="display:none;">
                <label>Nama Kategori Baru</label>
                <input type="text" id="exp-new-cat" class="input-control" placeholder="Ketik kategori baru">
            </div>



            <div class="input-group">
                <label>NOMINAL (RP)</label>
                <input type="text" id="exp-amount" class="input-control" value="${e ? formatRupiah(e.amount) : ''}" oninput="formatInputRupiah(event)">
            </div>
            
            <div class="input-group">
                <label>TANGGAL & JAM</label>
                <input type="text" id="exp-date" class="input-control" style="background:#fff; cursor:pointer;" value="${e ? new Date(new Date(e.date).getTime() - new Date(e.date).getTimezoneOffset() * 60000).toISOString().substring(0,16) : new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substring(0,16)}">
            </div>

            <div class="input-group">
                <label>CATATAN (OPSIONAL)</label>
                <input type="text" id="exp-note" class="input-control" value="${e ? (e.note || '') : ''}" placeholder="Keterangan...">
            </div>
        </div>
        <div class="modal-footer" style="justify-content:flex-start">
            <button class="btn btn-outline" style="border-color:var(--success);color:var(--success);width:50%" onclick="closeModal()">Batal</button>
            <button class="btn" style="background:#D35400;color:#fff;width:50%" onclick="saveExpense()">Simpan Pengeluaran</button>
        </div>
    `;
    m.classList.add("active");

    if (window.flatpickr) {
        flatpickr("#exp-date", {
            enableTime: true,
            dateFormat: "Y-m-d\\TH:i",
            altInput: true,
            altFormat: "d/m/Y H:i",
            time_24hr: true,
            locale: "id"
        });
    }
};

window.saveExpense = async () => {
    let id = document.getElementById('exp-id').value;
    let cat = document.getElementById('exp-cat').value;
    if(cat === '_NEW_') cat = document.getElementById('exp-new-cat').value.trim();
    let source = 'Uang Pribadi';
    let amount = parseRupiah(document.getElementById('exp-amount').value);
    let dateStr = document.getElementById('exp-date').value;
    let note = document.getElementById('exp-note').value.trim();

    if(!cat || amount <= 0 || !dateStr) return showToast('Harap isi Kategori, Nominal valid, dan Tanggal!', 'error');

    let isoDate = new Date(dateStr).toISOString();

    if(id) {
        let idx = expArr.findIndex(x => x.id === id);
        if(idx >= 0) {
            expArr[idx].category = cat;
            expArr[idx].source = source;
            expArr[idx].amount = amount;
            expArr[idx].date = isoDate;
            expArr[idx].note = note;
        }
    } else {
        id = 'e' + Date.now();
        expArr.push({ id, category: cat, source, amount, date: isoDate, note });
    }
    
    await S('pos_expenses', expArr);
    closeModal();
    renderPengeluaran();
    showToast('Pengeluaran berhasil dicatat!', 'success');
};

window.confirmDeleteExpense = (id) => {
    let e = expArr.find(x => x.id === id);
    if(!e) return;
    let m = document.getElementById("modal"), c = document.getElementById("modal-content");
    c.innerHTML = `
        <div class="modal-header"><h2>Konfirmasi Hapus</h2><button class="close-btn" onclick="closeModal()">×</button></div>
        <div class="modal-body">
            <p>Yakin ingin menghapus pengeluaran <strong>${e.category}</strong> senilai Rp ${formatRupiah(e.amount)}?</p>
            <p>Tindakan ini tidak bisa dibatalkan.</p>
        </div>
        <div class="modal-footer">
            <button class="btn btn-outline" onclick="closeModal()">Batal</button>
            <button class="btn btn-danger" onclick="deleteExpense('${id}')">Ya, Hapus</button>
        </div>
    `;
    m.classList.add("active");
};

window.deleteExpense = async (id) => {
    expArr = expArr.filter(x => x.id !== id);
    await S('pos_expenses', expArr);
    closeModal();
    renderPengeluaran();
    showToast('Pengeluaran berhasil dihapus!', 'success');
};
window.renderKaryawan = () => {
    document.getElementById('page-title').innerText = "Karyawan";
    
    let activeEmployees = empArr.filter(e => e.status !== 'Nonaktif');
    
    let html = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px;">
            <h2 style="color:var(--primary);font-size:24px;margin:0">Karyawan</h2>
            <button class="btn btn-primary" onclick="openKaryawanModal()" style="background:#2E7D32">+ Tambah Karyawan</button>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px;margin-bottom:24px">
            <div class="stat-card">
                <div class="stat-label">Jumlah Karyawan</div>
                <div class="stat-value" style="color:var(--success)">${activeEmployees.length} Orang</div>
            </div>
        </div>
        
        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>NAMA</th>
                        <th>JABATAN</th>
                        <th>TANGGAL MULAI KERJA</th>
                        <th style="text-align:right">AKSI</th>
                    </tr>
                </thead>
                <tbody>
                    ${activeEmployees.length === 0 ? 
                        `<tr><td colspan="4" style="text-align:center;padding:40px;color:var(--text-muted)">Belum ada karyawan</td></tr>` : 
                        activeEmployees.map(emp => `
                            <tr>
                                <td style="font-weight:700;color:var(--primary)">${emp.name}</td>
                                <td>${emp.role}</td>
                                <td>${emp.startDate ? new Date(emp.startDate).toLocaleDateString('id-ID', {day:'2-digit', month:'long', year:'numeric'}) : '-'}</td>
                                <td style="text-align:right;white-space:nowrap;">
                                    <button class="btn btn-sm" style="background:#2E7D32;color:#fff;border:none;margin-right:8px" onclick="openKaryawanModal('${emp.id}')">Edit</button>
                                    <button class="btn btn-sm btn-danger" onclick="confirmDeleteKaryawan('${emp.id}')">Hapus</button>
                                </td>
                            </tr>
                        `).join('')
                    }
                </tbody>
            </table>
        </div>
    `;

    document.getElementById('content-area').innerHTML = html;
};

window.openKaryawanModal = (id = null) => {
    let emp = id ? empArr.find(x => x.id === id) : null;
    let m = document.getElementById("modal"), c = document.getElementById("modal-content");
    c.innerHTML = `
        <div class="modal-header">
            <h2 style="color:var(--success)">${emp ? 'Edit Karyawan' : 'Tambah Karyawan'}</h2>
            <button class="close-btn" onclick="closeModal()">×</button>
        </div>
        <div class="modal-body">
            <input type="hidden" id="emp-id" value="${emp ? emp.id : ''}">
            
            <div class="input-group">
                <label>NAMA KARYAWAN</label>
                <input type="text" id="emp-name" class="input-control" value="${emp ? emp.name : ''}" placeholder="Nama lengkap">
            </div>

            <div class="input-group">
                <label>JABATAN</label>
                ${window.createCustomSelect('emp-role', [
                    {value: 'Kasir', label: 'Kasir'},
                    {value: 'Barista', label: 'Barista'},
                    {value: 'Waiter', label: 'Waiter'},
                    {value: 'Staff', label: 'Staff'}
                ], emp ? emp.role : 'Kasir', '')}
            </div>

            <div class="input-group">
                <label>TANGGAL MULAI KERJA</label>
                <div class="date-wrapper">
                    <input type="text" id="emp-start-date" class="input-control" style="background:#fff; cursor:pointer;" readonly placeholder="Pilih Tanggal" value="${emp && emp.startDate ? emp.startDate : new Date().toISOString().split('T')[0]}">
                </div>
            </div>
            
            <div class="input-group">
                <label>PIN AKSES KASIR</label>
                <input type="text" id="emp-pin" class="input-control" value="${emp ? emp.pin : '1234'}" maxlength="6" placeholder="Default: 1234">
            </div>
        </div>
        <div class="modal-footer" style="justify-content:flex-end">
            <button class="btn btn-outline" style="border-color:var(--success);color:var(--success)" onclick="closeModal()">Batal</button>
            <button class="btn" style="background:#2E7D32;color:#fff" onclick="saveKaryawan()">Simpan</button>
        </div>
    `;
    m.classList.add("active");

    if (window.flatpickr) {
        flatpickr("#emp-start-date", {
            locale: "id",
            disableMobile: true,
            altInput: true,
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d"
        });
    }
};

window.saveKaryawan = async () => {
    let id = document.getElementById('emp-id').value;
    let name = document.getElementById('emp-name').value.trim();
    let role = document.getElementById('emp-role').value;
    let startDate = document.getElementById('emp-start-date').value;
    let pin = document.getElementById('emp-pin').value.trim() || '1234';

    if(!name || !startDate) return showToast('Harap isi Nama dan Tanggal Mulai Kerja!', 'error');

    if(id) {
        let idx = empArr.findIndex(x => x.id === id);
        if(idx >= 0) {
            empArr[idx].name = name;
            empArr[idx].role = role;
            empArr[idx].startDate = startDate;
            empArr[idx].pin = pin;
            empArr[idx].status = 'Aktif'; // Ensure active
        }
    } else {
        id = 'k' + Date.now();
        empArr.push({ id, name, role, startDate, pin, status: 'Aktif' });
    }
    
    await S('pos_employees', empArr);
    closeModal();
    renderKaryawan();
    showToast('Data karyawan berhasil disimpan!', 'success');
};

window.confirmDeleteKaryawan = (id) => {
    let emp = empArr.find(x => x.id === id);
    if(!emp) return;
    let m = document.getElementById("modal"), c = document.getElementById("modal-content");
    c.innerHTML = `
        <div class="modal-header"><h2>Konfirmasi Hapus Karyawan</h2><button class="close-btn" onclick="closeModal()">×</button></div>
        <div class="modal-body">
            <p>Yakin ingin menghapus <strong>${emp.name}</strong> dari daftar karyawan aktif?</p>
            <p style="color:var(--danger);font-size:13px;margin-top:8px">Riwayat pembayaran gaji masa lalu akan tetap aman dan tidak ikut terhapus.</p>
        </div>
        <div class="modal-footer">
            <button class="btn btn-outline" onclick="closeModal()">Batal</button>
            <button class="btn btn-danger" onclick="deleteKaryawan('${id}')">Ya, Hapus</button>
        </div>
    `;
    m.classList.add("active");
};

window.deleteKaryawan = async (id) => {
    let emp = empArr.find(x => x.id === id);
    if(emp) emp.status = 'Nonaktif';
    await S('pos_employees', empArr);
    closeModal();
    renderKaryawan();
    showToast('Karyawan berhasil dihapus!', 'success');
};

window.renderSetelan = () => { 
  document.getElementById('page-title').innerText="SETELAN";
  document.getElementById('content-area').innerHTML = `
      <div class="card" style="display:flex;flex-direction:column;gap:16px;margin-bottom:24px">
          <h3 style="color:var(--primary);margin:0;">Koneksi Printer (ESC/POS)</h3>
          <div class="payment-tabs" style="margin: 8px 0;">
              <div class="pay-tab ${printerMode==='bluetooth'?'active':''}" onclick="printerMode='bluetooth'; renderSetelan();">Bluetooth</div>
              <div class="pay-tab ${printerMode==='usb'?'active':''}" onclick="printerMode='usb'; renderSetelan();">USB</div>
          </div>
          <div>
              ${printerMode === 'bluetooth' ? 
                 (btDevice ? `<span style="color:var(--success)">✅ Printer Bluetooth Terhubung</span>` : `<span style="color:var(--danger)">❌ Printer Bluetooth Belum Terhubung</span>`) :
                 (usbPort ? `<span style="color:var(--success)">✅ Printer USB Terhubung</span>` : `<span style="color:var(--danger)">❌ Printer USB Belum Terhubung</span>`)
              }
          </div>
          <div style="display:flex; gap:12px;">
              ${printerMode === 'bluetooth' ?
                  `<button class="btn btn-primary" onclick="connectBluetoothPrinter()">🔌 Hubungkan Bluetooth</button>
                   <button class="btn btn-danger" onclick="disconnectBluetoothPrinter()">Putuskan Bluetooth</button>` :
                  `<button class="btn btn-primary" onclick="connectUsbPrinter()">🔌 Hubungkan USB</button>
                   <button class="btn btn-danger" onclick="disconnectUsbPrinter()">Putuskan USB</button>`
              }
          </div>
      </div>

      <div class="card" style="display:flex;flex-direction:column;gap:16px">
          <h3 style="color:var(--primary)">Data & Laporan</h3>
          <p style="color:var(--text-muted);font-size:14px;margin-top:-8px">Export data transaksi dan pengeluaran atau reset aplikasi ke pengaturan awal.</p>
          
          <div style="display:flex; gap:16px; align-items:center; flex-wrap:wrap; margin-top:8px; z-index:10; position:relative;">
              ${window.createCustomSelect('export-period', [
                  {value: 'Harian', label: 'Harian (Hari Ini)'},
                  {value: 'Bulanan', label: 'Bulanan (Bulan Ini)'},
                  {value: 'Semua', label: 'Semua Data'}
              ], 'Harian', '', 'width: 220px')}
              <button class="btn btn-outline" onclick="exportDataExcelSettings()" style="padding:10px 20px;">📥 Export Excel (.xlsx)</button>
          </div>
          <hr style="border:0;border-top:1px solid var(--border-color);margin:8px 0">
          <div>
              <button class="btn btn-danger" onclick="confirmResetDataSettings()" style="padding:10px 20px;">⚠️ Reset Data</button>
          </div>
      </div>
  `;
};

window.exportDataExcelSettings = async () => {
    let type = document.getElementById('export-period').value;
    let now = new Date();
    let today = now.toISOString().split('T')[0];
    let thisMonth = today.slice(0, 7);
    
    let filteredTx = transactions;
    let filteredExp = expArr;
    
    if (type === 'Harian') {
        filteredTx = transactions.filter(t => t.date.startsWith(today));
        filteredExp = expArr.filter(e => e.date.startsWith(today));
    } else if (type === 'Bulanan') {
        filteredTx = transactions.filter(t => t.date.startsWith(thisMonth));
        filteredExp = expArr.filter(e => e.date.startsWith(thisMonth));
    }

    // Initialize ExcelJS Workbook
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Laporan');

    sheet.columns = [
        { header: 'Tanggal', key: 'date', width: 20 },
        { header: 'Tipe', key: 'type', width: 15 },
        { header: 'Kategori', key: 'category', width: 25 },
        { header: 'Keterangan', key: 'note', width: 40 },
        { header: 'Pemasukan', key: 'income', width: 20, style: { numFmt: '#,##0' } },
        { header: 'Pengeluaran', key: 'expense', width: 20, style: { numFmt: '#,##0' } }
    ];

    // Style Header Row
    const headerRow = sheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    headerRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF6E4C3B' } }; // Cafe primary color
    headerRow.alignment = { vertical: 'middle', horizontal: 'center' };

    // Add Sales Data
    filteredTx.forEach(t => {
        sheet.addRow({
            date: new Date(t.date),
            type: 'Penjualan',
            category: '-',
            note: `Order #${t.id}`,
            income: t.total,
            expense: 0
        });
    });

    // Add Expense Data
    filteredExp.forEach(e => {
        sheet.addRow({
            date: new Date(e.date),
            type: e.category === 'Tambah Uang Kas' ? 'Tambah Modal' : 'Pengeluaran',
            category: e.category,
            note: e.note,
            income: e.category === 'Tambah Uang Kas' ? e.amount : 0,
            expense: e.category === 'Tambah Uang Kas' ? 0 : e.amount
        });
    });

    // Format Date Column (A) specifically to match requirements (DD/MM/YYYY HH:mm)
    sheet.getColumn('A').numFmt = 'dd/mm/yyyy hh:mm';

    // Generate File & Download
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = `Laporan-Transaksi-HuizeJonCoffee-${type}-${today}.xlsx`;
    a.click();
};

window.confirmResetDataSettings = () => {
    let m = document.getElementById("modal"), c = document.getElementById("modal-content");
    c.innerHTML = `
        <div class="modal-header"><h2>⚠️ Reset Semua Data</h2><button class="close-btn" onclick="closeModal()">×</button></div>
        <div class="modal-body">
            <p style="color:var(--danger)">PERINGATAN: Semua data transaksi dan pengeluaran akan dihapus PERMANEN.</p>
            <p style="margin-top:10px">Ketik <strong>HAPUS</strong> untuk melanjutkan (tidak sensitif huruf besar/kecil):</p>
            <input type="text" id="reset-confirm-text" class="input-control" style="margin-top:10px" placeholder="Ketik HAPUS di sini" oninput="console.log('User typed:', this.value); document.getElementById('btn-reset-confirm').disabled = (this.value.trim().toUpperCase() !== 'HAPUS')">
        </div>
        <div class="modal-footer">
            <button class="btn btn-outline" onclick="closeModal()">Batal</button>
            <button id="btn-reset-confirm" class="btn btn-danger" onclick="executeResetDataSettings()" disabled>Ya, Reset Data</button>
        </div>
    `;
    m.classList.add("active");
};

window.executeResetDataSettings = async () => {
    transactions = [];
    expArr = [];
    await S('pos_transactions', transactions);
    await S('pos_expenses', expArr);
    closeModal();
    showToast('Data berhasil direset!', 'success');
};

/* --- BLUETOOTH & USB PRINTING --- */
window.connectBluetoothPrinter = async () => {
  try {
      btDevice = await navigator.bluetooth.requestDevice({ filters: [{ services: ['000018f0-0000-1000-8000-00805f9b34fb'] }], optionalServices: ['000018f0-0000-1000-8000-00805f9b34fb'] });
      const server = await btDevice.gatt.connect();
      const service = await server.getPrimaryService('000018f0-0000-1000-8000-00805f9b34fb');
      btCharacteristic = await service.getCharacteristic('00002af1-0000-1000-8000-00805f9b34fb');
      showToast('Printer Bluetooth terhubung!'); renderSetelan();
  } catch(e) { showToast('Gagal: ' + e.message, 'error'); }
};
window.disconnectBluetoothPrinter = () => { if(btDevice && btDevice.gatt.connected) btDevice.gatt.disconnect(); btDevice = null; btCharacteristic = null; showToast('Printer Bluetooth terputus'); renderSetelan(); };

window.connectUsbPrinter = async () => {
  try {
      if (!navigator.serial) throw new Error("Browser tidak mendukung Web Serial API.");
      usbPort = await navigator.serial.requestPort();
      await usbPort.open({ baudRate: 9600 });
      showToast('Printer USB terhubung!'); renderSetelan();
  } catch(e) { showToast('Gagal: ' + e.message, 'error'); }
};
window.disconnectUsbPrinter = async () => {
  if (usbPort) {
      try { await usbPort.close(); } catch(e) {}
      usbPort = null;
      showToast('Printer USB terputus'); renderSetelan();
  }
};

window.printReceipt = async (txId) => {
  let tx = transactions.find(t=>t.id===txId);
  if(!tx) return;
  
  let useFallback = false;
  if (printerMode === 'bluetooth' && !btCharacteristic) useFallback = true;
  if (printerMode === 'usb' && !usbPort) useFallback = true;
  
  if(useFallback) { 
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
      
      setTimeout(() => {
          printWindow.focus();
          printWindow.print();
          printWindow.close();
      }, 500);
      
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
      if (printerMode === 'bluetooth') {
          for(let c of cmds) { await btCharacteristic.writeValue(c); await new Promise(r => setTimeout(r, 50)); }
      } else if (printerMode === 'usb') {
          const writer = usbPort.writable.getWriter();
          for(let c of cmds) { await writer.write(c); }
          writer.releaseLock();
      }
      showToast('Struk berhasil dicetak!');
  } catch(e) { showToast('Gagal cetak: ' + e.message, 'error'); }
};

// Keydown listener
document.addEventListener('keydown', (e) => {
  if(e.key==='F1') { e.preventDefault(); if(document.getElementById('modal').classList.contains('active')) { confirmPayment(cart.reduce((s,i)=>s+(i.price*i.qty), 0)); } else openCheckoutModal(); }
  if(e.key==='F2') { e.preventDefault(); cart=[]; renderKasir(); showToast('Keranjang dikosongkan'); }
  if(e.key==='Escape') {
      let sb = document.getElementById('sidebar');
      if (sb && sb.classList.contains('mobile-open')) toggleMobileSidebar();
  }
});

// Swipe gestures for sidebar
let touchstartX = 0;
let touchendX = 0;
document.addEventListener('touchstart', e => { touchstartX = e.changedTouches[0].screenX; }, {passive: true});
document.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX;
    if (window.innerWidth > 1199) return;
    let sb = document.getElementById('sidebar');
    if (!sb) return;
    let swipeDist = touchendX - touchstartX;
    if (swipeDist > 50 && touchstartX < 30) {
        if (!sb.classList.contains('mobile-open')) toggleMobileSidebar();
    }
    if (swipeDist < -50 && sb.classList.contains('mobile-open')) {
        toggleMobileSidebar();
    }
}, {passive: true});

// Run Init
initApp();
