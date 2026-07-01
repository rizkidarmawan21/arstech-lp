# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: landing.spec.ts >> logo and hero image render correctly
- Location: landing.spec.ts:3:5

# Error details

```
Error: apiRequestContext.get: Client network socket disconnected before secure TLS connection was established
Call log:
  - → GET https://via.placeholder.com/600x400/f8fafc/64748b?text=Manapos+Dashboard+Screenshot
    - user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/149.0.7827.55 Safari/537.36
    - accept: */*
    - accept-encoding: gzip,deflate,br

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - navigation [ref=e2]:
    - generic [ref=e3]:
      - link "Manapos Manapos" [ref=e4] [cursor=pointer]:
        - /url: "#"
        - img "Manapos" [ref=e5]
        - generic [ref=e6]: Manapos
      - generic [ref=e7]:
        - link "Fitur" [ref=e8] [cursor=pointer]:
          - /url: "#fitur"
        - link "Bedanya" [ref=e9] [cursor=pointer]:
          - /url: "#bedanya"
        - link "Harga" [ref=e10] [cursor=pointer]:
          - /url: "#harga"
      - generic [ref=e11]:
        - link "Sign In" [ref=e12] [cursor=pointer]:
          - /url: "#"
        - link "Coba Gratis" [ref=e13] [cursor=pointer]:
          - /url: "#"
  - generic [ref=e16]:
    - generic [ref=e17]:
      - generic [ref=e18]: Cloud POS with AI
      - heading "Sistem POS Modern untuk Bisnis Indonesia" [level=1] [ref=e20]
      - paragraph [ref=e21]: Platform all-in-one dengan AI Assistant, HPP Calculator, Self-Order Microsite, dan analytics real-time.
      - generic [ref=e22]:
        - link "Mulai Gratis 14 Hari" [ref=e23] [cursor=pointer]:
          - /url: "#"
        - link " Lihat Demo" [ref=e24] [cursor=pointer]:
          - /url: "#"
          - generic [ref=e25]: 
          - text: Lihat Demo
      - generic [ref=e26]:
        - generic [ref=e27]:
          - generic [ref=e28]: 500+
          - generic [ref=e29]: Pengguna
        - generic [ref=e30]:
          - generic [ref=e31]: 99.9%
          - generic [ref=e32]: Uptime
        - generic [ref=e33]:
          - generic [ref=e34]: 50M+
          - generic [ref=e35]: Transaksi
    - generic [ref=e36]:
      - generic [ref=e37]:
        - generic [ref=e38]: 
        - generic [ref=e39]: 
        - generic [ref=e40]: 
        - generic [ref=e41]: Dashboard
      - img "Manapos Dashboard" [ref=e43]
  - generic [ref=e45]:
    - generic [ref=e46]:
      - heading "Fitur Lengkap untuk Bisnis Anda" [level=2] [ref=e47]
      - paragraph [ref=e48]: 15+ fitur powerful untuk kelola bisnis retail, F&B, dan service.
    - generic [ref=e49]:
      - generic [ref=e50]:
        - generic [ref=e52]: 
        - heading "POS Checkout" [level=3] [ref=e53]
        - paragraph [ref=e54]: Checkout cepat, multiple payment, receipt otomatis, split bill, hold transaksi.
      - generic [ref=e55]:
        - generic [ref=e57]: 
        - heading "Inventory Real-time" [level=3] [ref=e58]
        - paragraph [ref=e59]: Stock tracking, barcode, low stock alert, transfer outlet, SKU management.
      - generic [ref=e60]:
        - generic [ref=e62]: 
        - heading "Analytics Dashboard" [level=3] [ref=e63]
        - paragraph [ref=e64]: Real-time sales, profit margin, trending produk, forecasting.
      - generic [ref=e65]:
        - generic [ref=e67]: 
        - heading "HPP Calculator" [level=3] [ref=e68]
        - paragraph [ref=e69]: Hitung cost produksi otomatis, track margin, optimasi harga.
      - generic [ref=e70]:
        - generic [ref=e72]: 
        - heading "AI Assistant" [level=3] [ref=e73]
        - paragraph [ref=e74]: Rekomendasi stok, predictive pricing, anomaly detection, smart suggestions.
      - generic [ref=e75]:
        - generic [ref=e77]: 
        - heading "Self-Order Microsite" [level=3] [ref=e78]
        - paragraph [ref=e79]: Customer order via QR code, mobile-friendly, real-time status.
      - generic [ref=e80]:
        - generic [ref=e82]: 
        - heading "Multi-User & Role" [level=3] [ref=e83]
        - paragraph [ref=e84]: Role-based access, permission, activity tracking, shift management.
      - generic [ref=e85]:
        - generic [ref=e87]: 
        - heading "Laporan & Audit" [level=3] [ref=e88]
        - paragraph [ref=e89]: Sales report, inventory report, audit trail, cash reconciliation.
      - generic [ref=e90]:
        - generic [ref=e92]: 
        - heading "Payment Integration" [level=3] [ref=e93]
        - paragraph [ref=e94]: Xendit, Midtrans, Duitku, QRIS, e-wallet, settlement otomatis.
  - generic [ref=e96]:
    - generic [ref=e97]:
      - heading "Kenapa Pilih Manapos?" [level=2] [ref=e98]
      - paragraph [ref=e99]: Fitur unik yang tidak dimiliki POS kompetitor.
    - generic [ref=e100]:
      - generic [ref=e102]:
        - generic [ref=e103]: 
        - generic [ref=e104]:
          - heading "AI-Powered Insights" [level=3] [ref=e105]
          - paragraph [ref=e106]: Satu-satunya POS Indonesia dengan AI Assistant untuk rekomendasi stok dan pricing optimization.
      - generic [ref=e108]:
        - generic [ref=e109]: 
        - generic [ref=e110]:
          - heading "HPP Calculator Built-in" [level=3] [ref=e111]
          - paragraph [ref=e112]: Hitung cost produksi otomatis — fitur yang tidak ada di POS kompetitor.
      - generic [ref=e114]:
        - generic [ref=e115]: 
        - generic [ref=e116]:
          - heading "Self-Order Microsite" [level=3] [ref=e117]
          - paragraph [ref=e118]: Customer order via QR code tanpa install app. Cocok untuk cafe dan resto.
      - generic [ref=e120]:
        - generic [ref=e121]: 
        - generic [ref=e122]:
          - heading "Payment Gateway Lokal" [level=3] [ref=e123]
          - paragraph [ref=e124]: Xendit, Midtrans, Duitku native. QRIS, e-wallet, settlement otomatis.
  - generic [ref=e126]:
    - generic [ref=e127]:
      - heading "Harga Simpel & Transparan" [level=2] [ref=e128]
      - paragraph [ref=e129]: Trial gratis 14 hari untuk semua paket.
    - generic [ref=e130]:
      - generic [ref=e131]:
        - heading "Starter" [level=3] [ref=e132]
        - paragraph [ref=e133]: Tim kecil
        - generic [ref=e134]: Rp 299k/bln
        - list [ref=e135]:
          - listitem [ref=e136]:
            - generic [ref=e137]: 
            - text: POS & Inventory
          - listitem [ref=e138]:
            - generic [ref=e139]: 
            - text: 2 User, 1 Outlet
        - link "Pilih Paket" [ref=e140] [cursor=pointer]:
          - /url: "#"
      - generic [ref=e141]:
        - generic [ref=e142]: Populer
        - heading "Pro" [level=3] [ref=e143]
        - paragraph [ref=e144]: Bisnis berkembang
        - generic [ref=e145]: Rp 699k/bln
        - list [ref=e146]:
          - listitem [ref=e147]:
            - generic [ref=e148]: 
            - text: AI Assistant
          - listitem [ref=e149]:
            - generic [ref=e150]: 
            - text: HPP Calculator
          - listitem [ref=e151]:
            - generic [ref=e152]: 
            - text: Self-Order Microsite
          - listitem [ref=e153]:
            - generic [ref=e154]: 
            - text: 10 User, 3 Outlet
        - link "Mulai Gratis" [ref=e155] [cursor=pointer]:
          - /url: "#"
      - generic [ref=e156]:
        - heading "Enterprise" [level=3] [ref=e157]
        - paragraph [ref=e158]: Bisnis besar
        - generic [ref=e159]: Custom
        - list [ref=e160]:
          - listitem [ref=e161]:
            - generic [ref=e162]: 
            - text: Semua fitur Pro
          - listitem [ref=e163]:
            - generic [ref=e164]: 
            - text: Unlimited Outlet
          - listitem [ref=e165]:
            - generic [ref=e166]: 
            - text: Dedicated Support
        - link "Hubungi Sales" [ref=e167] [cursor=pointer]:
          - /url: "#"
  - generic [ref=e170]:
    - heading "Siap Transformasi Bisnis Anda?" [level=2] [ref=e171]
    - paragraph [ref=e172]: Mulai gratis 14 hari. Setup dalam hitungan menit.
    - generic [ref=e173]:
      - link "Mulai Sekarang" [ref=e174] [cursor=pointer]:
        - /url: "#"
      - button "Demo" [ref=e175] [cursor=pointer]
  - contentinfo [ref=e176]:
    - generic [ref=e177]:
      - generic [ref=e178]:
        - generic [ref=e179]:
          - generic [ref=e180]:
            - img "Manapos" [ref=e181]
            - generic [ref=e182]: Manapos
          - paragraph [ref=e183]: Sistem POS modern untuk Indonesia.
        - generic [ref=e184]:
          - heading "Product" [level=4] [ref=e185]
          - list [ref=e186]:
            - listitem [ref=e187]:
              - link "Fitur" [ref=e188] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e189]:
              - link "Harga" [ref=e190] [cursor=pointer]:
                - /url: "#"
        - generic [ref=e191]:
          - heading "Perusahaan" [level=4] [ref=e192]
          - list [ref=e193]:
            - listitem [ref=e194]:
              - link "Tentang" [ref=e195] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e196]:
              - link "Kontak" [ref=e197] [cursor=pointer]:
                - /url: "#"
        - generic [ref=e198]:
          - heading "Legal" [level=4] [ref=e199]
          - list [ref=e200]:
            - listitem [ref=e201]:
              - link "Privacy" [ref=e202] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e203]:
              - link "Terms" [ref=e204] [cursor=pointer]:
                - /url: "#"
      - paragraph [ref=e206]: © 2026 Manapos. Sistem POS untuk Indonesia.
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('logo and hero image render correctly', async ({ page }) => {
  4  |   await page.goto('http://manapos.43.134.80.173.sslip.io');
  5  |   
  6  |   // Logo should be visible
  7  |   const logo = page.locator('nav img[alt="Manapos"]');
  8  |   await expect(logo).toBeVisible();
  9  |   
  10 |   // Verify logo loaded (not broken)
  11 |   const logoSrc = await logo.getAttribute('src');
  12 |   expect(logoSrc).toBeTruthy();
  13 |   const logoResp = await page.request.get(new URL(logoSrc!, page.url()).toString());
  14 |   expect(logoResp.status()).toBe(200);
  15 | 
  16 |   const hero = page.locator('img[alt="Manapos Dashboard"]');
  17 |   await expect(hero).toBeVisible();
  18 |   const heroSrc = await hero.getAttribute('src');
> 19 |   const heroResp = await page.request.get(heroSrc!);
     |                                       ^ Error: apiRequestContext.get: Client network socket disconnected before secure TLS connection was established
  20 |   expect(heroResp.status()).toBe(200);
  21 |   
  22 |   // Check page title
  23 |   await expect(page).toHaveTitle(/Manapos/);
  24 |   
  25 |   // Verify key features text is present
  26 |   await expect(page.getByText('AI Assistant')).toBeVisible();
  27 |   await expect(page.getByText('HPP Calculator')).toBeVisible();
  28 |   await expect(page.getByText('Self-Order Microsite')).toBeVisible();
  29 | });
  30 | 
```