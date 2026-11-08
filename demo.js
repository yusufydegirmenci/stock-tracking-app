/* Demo mode for the stock tracking app.
 *
 * What it does: replaces the Supabase client with a small in-memory stand-in that is
 * filled with made-up sample data. Nothing is sent over the network, no keys are needed,
 * and every visitor works on a private copy that lives only in their own browser tab.
 *
 * When it runs: open index.html with ?demo=1, or leave the Supabase placeholders in
 * index.html unchanged. With real Supabase settings and no ?demo=1 this file does nothing.
 *
 * All names, products and amounts below are invented.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'stoktakip-demo-v1';
  var DEMO_PASSWORD = 'demo2026';

  function iso(daysAgo, hour) {
    var d = new Date();
    d.setDate(d.getDate() - (daysAgo || 0));
    d.setHours(hour == null ? 10 : hour, 0, 0, 0);
    return d.toISOString();
  }
  function dateOnly(daysAgo) { return iso(daysAgo).slice(0, 10); }
  function inDays(n) { return dateOnly(-n); }

  function seed() {
    var t = iso(0);
    return {
      kullanicilar: [
        { id: 1, ad: 'Demo Depo Kullanıcısı', username: 'depo1', pass: DEMO_PASSWORD, rol: 'depo_kullanici', depolar: ['Türkiye'] },
        { id: 2, ad: 'Demo Depo Müdürü', username: 'depomgr', pass: DEMO_PASSWORD, rol: 'depo_mudur', depolar: ['Türkiye'] },
        { id: 3, ad: 'Demo Stok Sorumlusu', username: 'stok', pass: DEMO_PASSWORD, rol: 'stok_sorumlu', depolar: ['Türkiye', 'Azerbaycan', 'Romanya', 'Yunanistan', 'Hindistan', 'Moğolistan', 'Afrika'] },
        { id: 4, ad: 'Demo Sistem Sorumlusu', username: 'sistem', pass: DEMO_PASSWORD, rol: 'sistem_sorumlu', depolar: ['Türkiye', 'Azerbaycan', 'Romanya', 'Yunanistan', 'Hindistan', 'Moğolistan', 'Afrika'] },
        { id: 5, ad: 'Demo Genel Müdür', username: 'gmd', pass: DEMO_PASSWORD, rol: 'genel_mudur', depolar: ['Türkiye', 'Azerbaycan', 'Romanya', 'Yunanistan', 'Hindistan', 'Moğolistan', 'Afrika'] }
      ],
      stok: [
        { id: 1001, ad: 'Samsung Galaxy S24', depo: 'Türkiye', miktar: 150, esik: 20, alis_fiyat: 38000, satis_fiyat: 45000, varyant: '256 GB', ana_urun_kodu: 'TEL-S24', raf: 'A-01', updated_at: t },
        { id: 1002, ad: 'iPhone 15 Pro', depo: 'Türkiye', miktar: 80, esik: 30, alis_fiyat: 52000, satis_fiyat: 61000, varyant: '128 GB', ana_urun_kodu: 'TEL-IP15', raf: 'A-02', updated_at: t },
        { id: 1004, ad: 'Logitech MX Keys', depo: 'Türkiye', miktar: 18, esik: 20, alis_fiyat: 2400, satis_fiyat: 3100, varyant: '', ana_urun_kodu: 'KLV-MX', raf: 'B-04', updated_at: t },
        { id: 1006, ad: 'Apple AirPods Pro', depo: 'Türkiye', miktar: 8, esik: 20, alis_fiyat: 6800, satis_fiyat: 8200, varyant: '', ana_urun_kodu: 'KLK-APP', raf: 'B-06', updated_at: t },
        { id: 1003, ad: 'Xiaomi Redmi Note 13', depo: 'Azerbaycan', miktar: 200, esik: 25, alis_fiyat: 380, satis_fiyat: 470, varyant: '128 GB', ana_urun_kodu: 'TEL-RN13', raf: 'C-01', updated_at: t },
        { id: 1005, ad: 'Sony WH-1000XM5', depo: 'Romanya', miktar: 60, esik: 15, alis_fiyat: 1200, satis_fiyat: 1500, varyant: '', ana_urun_kodu: 'KLK-SONY', raf: 'D-02', updated_at: t },
        { id: 1007, ad: 'JBL Flip 6', depo: 'Yunanistan', miktar: 175, esik: 30, alis_fiyat: 70, satis_fiyat: 95, varyant: '', ana_urun_kodu: 'HP-JBL', raf: 'E-03', updated_at: t },
        { id: 1008, ad: 'HP LaserJet Pro', depo: 'Hindistan', miktar: 40, esik: 10, alis_fiyat: 14000, satis_fiyat: 18500, varyant: '', ana_urun_kodu: 'YZC-HP', raf: 'F-01', updated_at: t },
        { id: 1009, ad: 'SanDisk 1TB SSD', depo: 'Moğolistan', miktar: 5, esik: 50, alis_fiyat: 210000, satis_fiyat: 280000, varyant: '1 TB', ana_urun_kodu: 'SSD-SD', raf: 'G-05', updated_at: t },
        { id: 1010, ad: 'ASUS ROG Gaming Mouse', depo: 'Afrika', miktar: 12, esik: 15, alis_fiyat: 45, satis_fiyat: 70, varyant: '', ana_urun_kodu: 'MSE-ROG', raf: 'H-02', updated_at: t }
      ],
      hareketler: [
        { sira_no: 1, tarih: iso(6, 9), tip: 'tedarik', urun_id: 1001, urun_ad: 'Samsung Galaxy S24', depo: 'Türkiye', delta: 100, onceki: 50, sonraki: 150, kullanici: 'Demo Stok Sorumlusu', not_metni: 'Tedarikçi:Örnek Tedarik A.Ş. Belge:FAT-2026-001' },
        { sira_no: 2, tarih: iso(5, 14), tip: 'manuel', urun_id: 1004, urun_ad: 'Logitech MX Keys', depo: 'Türkiye', delta: -7, onceki: 25, sonraki: 18, kullanici: 'Demo Depo Müdürü', not_metni: 'Manuel düzenleme' },
        { sira_no: 3, tarih: iso(4, 11), tip: 'kargo', urun_id: 1006, urun_ad: 'Apple AirPods Pro', depo: 'Türkiye', delta: -12, onceki: 20, sonraki: 8, kullanici: 'Demo Sistem Sorumlusu', not_metni: 'Onaylı kargo düşüm #1' },
        { sira_no: 4, tarih: iso(3, 16), tip: 'tedarik', urun_id: 1007, urun_ad: 'JBL Flip 6', depo: 'Yunanistan', delta: 75, onceki: 100, sonraki: 175, kullanici: 'Demo Stok Sorumlusu', not_metni: 'Tedarikçi:Örnek Tedarik A.Ş. Belge:FAT-2026-002' },
        { sira_no: 5, tarih: iso(2, 10), tip: 'manuel', urun_id: 1009, urun_ad: 'SanDisk 1TB SSD', depo: 'Moğolistan', delta: -15, onceki: 20, sonraki: 5, kullanici: 'Demo Depo Müdürü', not_metni: 'Sayım düzeltmesi' }
      ],
      onaylar: [
        { id: 1, tip: 'transfer', tarih: iso(1, 15), olusturan: 'Demo Depo Kullanıcısı', olusturan_rol: 'depo_kullanici', kaynak_depo: 'Türkiye', hedef_depo: 'Romanya', kalemler: [{ id: 1002, ad: 'iPhone 15 Pro', adet: 10, oncekiStok: 80 }], aciklama: 'Belge:SEV-2026-001 | Örnek transfer, onay bekliyor', onay_listesi: [], durum: 'bekliyor' }
      ],
      siparis_islemleri: [],
      lotlar: [
        { id: 1, urun_id: 1004, depo: 'Türkiye', adet: 25, adet_kalan: 18, tedarikci: 'Örnek Tedarik A.Ş.', skt: null, lot_no: 'LOT-DEMO01', belge: 'FAT-2026-003', birim_fiyat: 2400, giris_tarihi: iso(20, 9) },
        { id: 2, urun_id: 1006, depo: 'Türkiye', adet: 20, adet_kalan: 8, tedarikci: 'Örnek Tedarik A.Ş.', skt: inDays(25), lot_no: 'LOT-DEMO02', belge: 'FAT-2026-004', birim_fiyat: 6800, giris_tarihi: iso(18, 9) }
      ],
      sayimlar: [],
      sabit_giderler: [
        { id: 1, ad: 'Depo kirası', tutar: 45000, periyot: 'aylik', kategori: 'kira', not_metni: 'Örnek gider', ekleyen: 'Demo Genel Müdür' },
        { id: 2, ad: 'Stok yazılımı aboneliği', tutar: 1200, periyot: 'aylik', kategori: 'yazilim', not_metni: 'Örnek gider', ekleyen: 'Demo Genel Müdür' }
      ],
      degisken_giderler: [
        { id: 1, tarih: dateOnly(3), tutar: 850, kategori: 'sarf', depo: 'Türkiye', aciklama: 'Koli bandı ve etiket', ekleyen: 'Demo Depo Müdürü', created_at: iso(3, 12) }
      ],
      depo_finans: [
        { id: 1, tarih: dateOnly(7), depo: 'Türkiye', tip: 'gelir', para_birimi: 'TRY', tutar: 180000, tutar_try: 180000, kategori: 'satis', aciklama: 'Haftalık satış geliri (örnek)', giren: 'Demo Genel Müdür', created_at: iso(7, 18) },
        { id: 2, tarih: dateOnly(5), depo: 'Azerbaycan', tip: 'gelir', para_birimi: 'AZN', tutar: 9500, tutar_try: 185250, kategori: 'satis', aciklama: 'Haftalık satış geliri (örnek)', giren: 'Demo Genel Müdür', created_at: iso(5, 18) },
        { id: 3, tarih: dateOnly(4), depo: 'Yunanistan', tip: 'gider', para_birimi: 'EUR', tutar: 900, tutar_try: 33120, kategori: 'lojistik', aciklama: 'Nakliye (örnek)', giren: 'Demo Genel Müdür', created_at: iso(4, 18) }
      ],
      doviz_kurlari: [
        { id: 1, kurlar: { TRY: 1, AZN: 19.5, RON: 7.65, EUR: 36.8, INR: 0.41, MNT: 0.0099, USD: 34.2 }, guncelleme_tarihi: iso(0, 8) }
      ],
      ayarlar: [{ anahtar: 'maliyet_yontemi', deger: 'FIFO' }],
      stok_cikis_detay: [],
      vekilller: [],
      tedarikci_fiyat_gecmisi: [],
      uyeler: [],
      uye_aylik_performans: [],
      qv_cv_yansima: [],
      giris_gunlugu: []
    };
  }

  function clone(x) { return x == null ? x : JSON.parse(JSON.stringify(x)); }

  var db;
  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) { /* storage blocked: start from the sample data */ }
    return seed();
  }
  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(db)); } catch (e) { /* ignore */ }
  }

  // Column that the real database fills in on its own, per table.
  var AUTO_KEY = { hareketler: 'sira_no' };
  var CONFLICT_KEY = { ayarlar: 'anahtar' };

  function nextId(rows, key) {
    var m = 0;
    rows.forEach(function (r) { if (typeof r[key] === 'number' && r[key] > m) m = r[key]; });
    return m + 1;
  }

  function Query(table) {
    this.table = table;
    this.op = 'select';
    this.filters = [];
    this.sort = null;
    this.max = null;
    this.one = false;
    this.payload = null;
  }
  Query.prototype.select = function () { return this; };
  Query.prototype.insert = function (v) { this.op = 'insert'; this.payload = v; return this; };
  Query.prototype.update = function (v) { this.op = 'update'; this.payload = v; return this; };
  Query.prototype.upsert = function (v) { this.op = 'upsert'; this.payload = v; return this; };
  Query.prototype.delete = function () { this.op = 'delete'; return this; };
  Query.prototype.eq = function (c, v) { this.filters.push(function (r) { return r[c] === v; }); return this; };
  Query.prototype.neq = function (c, v) { this.filters.push(function (r) { return r[c] !== v; }); return this; };
  Query.prototype.order = function (c, o) { this.sort = { col: c, asc: !(o && o.ascending === false) }; return this; };
  Query.prototype.limit = function (n) { this.max = n; return this; };
  Query.prototype.single = function () { this.one = true; return this; };
  Query.prototype.then = function (ok, fail) {
    var self = this;
    return new Promise(function (resolve) { resolve(self.run()); }).then(ok, fail);
  };
  Query.prototype.match = function (r) { return this.filters.every(function (f) { return f(r); }); };
  Query.prototype.run = function () {
    var rows = db[this.table];
    if (!rows) return { data: null, error: { message: 'Demo: unknown table ' + this.table } };
    var out = [];
    var self = this;
    var key = AUTO_KEY[this.table] || 'id';

    if (this.op === 'insert' || this.op === 'upsert') {
      var list = Array.isArray(this.payload) ? this.payload : [this.payload];
      list.forEach(function (item) {
        var row = clone(item);
        var ck = CONFLICT_KEY[self.table];
        if (self.op === 'upsert' && ck) {
          var existing = rows.filter(function (r) { return r[ck] === row[ck]; })[0];
          if (existing) { Object.assign(existing, row); out.push(existing); return; }
        }
        if (row[key] == null) row[key] = nextId(rows, key);
        if (row.tarih == null && self.table !== 'stok') row.tarih = iso(0, new Date().getHours());
        if (row.created_at == null) row.created_at = new Date().toISOString();
        if (self.table === 'lotlar' && row.giris_tarihi == null) row.giris_tarihi = new Date().toISOString();
        rows.push(row);
        out.push(row);
      });
    } else if (this.op === 'update') {
      rows.forEach(function (r) {
        if (self.match(r)) { Object.assign(r, clone(self.payload)); out.push(r); }
      });
    } else if (this.op === 'delete') {
      db[this.table] = rows.filter(function (r) {
        if (self.match(r)) { out.push(r); return false; }
        return true;
      });
    } else {
      out = rows.filter(function (r) { return self.match(r); });
    }

    if (this.op !== 'select') save();

    if (this.sort) {
      var s = this.sort;
      out = out.slice().sort(function (a, b) {
        var x = a[s.col], y = b[s.col];
        if (x === y) return 0;
        if (x == null) return 1;
        if (y == null) return -1;
        return (x < y ? -1 : 1) * (s.asc ? 1 : -1);
      });
    }
    if (this.max != null) out = out.slice(0, this.max);
    out = clone(out);

    if (this.one) {
      if (!out.length) return { data: null, error: { code: 'PGRST116', message: 'Demo: no rows found' } };
      return { data: out[0], error: null };
    }
    return { data: out, error: null };
  };

  function Channel() {}
  Channel.prototype.on = function () { return this; };
  Channel.prototype.subscribe = function (cb) {
    if (cb) setTimeout(function () { cb('SUBSCRIBED'); }, 0);
    return this;
  };

  function createClient() {
    db = load();
    return {
      from: function (t) { return new Query(t); },
      channel: function () { return new Channel(); },
      removeChannel: function () {}
    };
  }

  function wantsDemo() {
    var asked = /[?&]demo(=1|=true)?(&|$)/.test(location.search);
    var placeholder = typeof SUPABASE_URL === 'string' && SUPABASE_URL.indexOf('YOUR-PROJECT-REF') !== -1;
    return asked || placeholder;
  }

  function addBanner() {
    var bar = document.createElement('div');
    bar.style.cssText = 'position:fixed;left:0;right:0;bottom:0;z-index:9999;background:#fef3c7;color:#92400e;' +
      'font:12px/1.4 system-ui,sans-serif;padding:6px 12px;text-align:center;border-top:1px solid #fcd34d';
    bar.innerHTML = 'Demo modu: örnek veri, yalnızca bu tarayıcıda saklanır. ' +
      '<button type="button" style="margin-left:8px;font:inherit;cursor:pointer">Demo verisini sıfırla</button>';
    bar.querySelector('button').onclick = function () {
      try { localStorage.removeItem(STORAGE_KEY); } catch (e) { /* ignore */ }
      location.reload();
    };
    document.body.appendChild(bar);

    var hint = document.querySelector('.ldemo');
    if (hint) {
      hint.innerHTML = '<strong>Demo hesaplar</strong> (şifre hepsi için: <code>' + DEMO_PASSWORD + '</code>)<br>' +
        'depo1 → Depo Kullanıcısı<br>depomgr → Depo Müdürü<br>stok → Stok Sorumlusu<br>' +
        'sistem → Sistem Sorumlusu<br>gmd → Genel Müdür';
    }
    var st = document.getElementById('conn-status-login');
    if (st) st.style.display = 'none';
  }

  window.__demoModu = false;
  window.demoSupabase = function () {
    window.__demoModu = true;
    return createClient();
  };
  window.demoMuMu = wantsDemo;
  window.addEventListener('DOMContentLoaded', function () { if (window.__demoModu) addBanner(); });
})();
