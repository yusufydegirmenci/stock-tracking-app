# Multi-Warehouse Stock Tracking System

A single-file web application for tracking stock, transfers and finances across several international warehouses, with a multi-step approval chain, multi-currency reporting and role-based access. The frontend is plain HTML/CSS/JavaScript; data and real-time sync run on **Supabase** (PostgreSQL + Realtime).

> Portfolio project. All rights reserved. The repository contains no real company, customer or employee data.

## Screenshots

The interface is in Turkish; English names are in brackets. Sign in with a user from your own Supabase `kullanicilar` table; the role decides which step of the approval chain you can act on. The data shown is demo data.

![Login screen (Giriş Yap)](docs/ekran/giris.png)

**Overview (Genel Bakış):** totals, low-stock alerts and recent movements.
![Overview](docs/ekran/genel-bakis.png)

**Stock list (Stok Listesi):** search, status and warehouse filters, edit and delete.
![Stock list](docs/ekran/stok-listesi.png)

**Warehouse status (Depo Durumu):** one tab per country warehouse.
![Warehouse status](docs/ekran/depo-durumu.png)

**Stock intake (Stok Girişi / Tedarik):** goods received are added to stock immediately and logged, no approval needed.
![Stock intake](docs/ekran/stok-giris.png)

**Transfer between warehouses (Depolar Arası Transfer):** goes through the 5-step approval chain before stock moves.
![Transfer](docs/ekran/transfer.png)

**Order / shipment comparison (Sipariş / Kargo Karşılaştır):** upload the two Excel exports and compare them.
![Order and shipment comparison](docs/ekran/siparis-karsilastirma.png)

**Thresholds (Eşik Değerleri):** per-warehouse low-stock limits.
![Thresholds](docs/ekran/esik-degerleri.png)

## Features
- **Stock:** per-warehouse stock lists, low-stock thresholds, batch (lot) tracking and expiry dates, periodic stock counts with manager approval
- **Transfers and shipments:** inter-warehouse transfers and order-based stock deduction go through a **5-step sequential approval chain**; duplicate-shipment warnings; order/shipment comparison from Excel exports
- **Proxy approver:** an approver who is away can delegate to a substitute for a date range; actions taken on someone's behalf are flagged in the audit trail
- **Finance:** fixed and variable expenses, revenue and profit per warehouse in the warehouse's **local currency** (TRY, AZN, RON, EUR, INR, MNT, USD), with manual exchange rates and automatic consolidation into TRY
- **Supplier price history:** purchase prices accumulate automatically; a jump of 20% or more raises a warning at entry time
- **KPI and forecasting:** stock turnover, dead stock, supplier performance, expiry tracking, and order suggestions from a weighted moving average with trend detection and a 0–100 confidence score
- **Audit and compliance:** date-range report of user actions, approvals and financial movements
- **Member performance module:** separate from stock and finance, tracks monthly volume, point and commission rankings
- **Real-time sync:** several users see changes instantly (Supabase Realtime)
- **Bilingual UI:** Turkish / English
- **Security hardening:** SHA-256 password hashing with automatic migration, HTML escaping against XSS, login rate limiting (5 failures = 15-minute lockout), 30-minute session timeout with warning, Content Security Policy, login activity log

## Roles
`depo_kullanici` → `depo_mudur` → `stok_sorumlu` → `sistem_sorumlu` → `genel_mudur` (the approval chain follows this order).

## Tech stack
HTML · CSS · vanilla JavaScript · Supabase (PostgreSQL, Realtime) · SheetJS (Excel import/export)

## Setup
1. Create a Supabase project.
2. In `index.html`, set `SUPABASE_URL` and `SUPABASE_KEY` to your own project's values.
3. Create the tables the app uses: `stok`, `hareketler`, `onaylar`, `lotlar`, `stok_cikis_detay`, `siparis_islemleri`, `sayimlar`, `kullanicilar`, `vekilller`, `ayarlar`, `giris_gunlugu`, `tedarikci_fiyat_gecmisi`, `sabit_giderler`, `degisken_giderler`, `depo_finans`, `doviz_kurlari`, `uyeler`, `uye_aylik_performans`, `qv_cv_yansima`.
   > The SQL schema and row-level security policies are not included in this repository yet.
4. Open `index.html` in a browser (or host it on any static host).

Never commit real keys or data.

## Author
Yusuf Yahya Değirmenci — [GitHub](https://github.com/yusufydegirmenci) · [LinkedIn](https://www.linkedin.com/in/yusufydegirmenci/)
