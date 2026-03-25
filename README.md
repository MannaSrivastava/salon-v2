# 💈 Salon Website v2.0 — Product Guide

A professional, lightweight unisex salon website with WhatsApp booking,
per-service date & time slot selection, home service option, 4 themes,
photo gallery, QR code, and Google Maps. Zero frameworks. Zero build tools.

---

## 📁 File Structure

```
salon/
├── index.html                 ← Website entry point
├── css/style.css              ← All styles (themes included)
├── js/app.js                  ← All application logic
├── config/
│   ├── shop.js                ✏️  Shop info, theme, gallery, home service
│   ├── services.js            ✏️  Services, prices, time slots
│   └── creator.js             ✏️  Footer developer credits
└── images/
    ├── logo.png               ✏️  Your salon logo
    ├── [service images].jpg   ✏️  Service photos (optional)
    └── gallery/               ✏️  Gallery photos
        └── [gallery images]
```

---

## ✏️ Customization Guide

### 1. Shop Info → `config/shop.js`

| Field | What it does |
|---|---|
| `name` | Salon name shown in hero & footer |
| `tagline` | Subtitle under the name |
| `logo` | Path to logo image (`""` to hide) |
| `phone` | Displayed phone number |
| `whatsapp` | Booking destination — digits only with country code |
| `email` | Contact email (`""` to hide) |
| `website` | Used for QR code & WhatsApp message link |
| `address` | All address fields |
| `googleMapsEmbed` | Paste iframe `src` URL from Google Maps share |
| `googleMapsLink` | Direct Maps link for the Directions button |
| `hours` | Array of `{ days, time }` objects |
| `social` | Links for WhatsApp/Instagram/Facebook/YouTube (`""` to hide any) |
| `currency` | Default `"₹"` — change to `"$"`, `"€"` etc. |
| `homeService.enabled` | `true/false` — show/hide home service toggle per item |
| `homeService.extraCharge` | Extra fee added to total if home service selected |
| `gallery` | Array of `{ image, caption }` objects — empty `[]` hides gallery |
| `theme` | One of 4 theme IDs (see below) |

### 2. Services → `config/services.js`

Add/edit/remove services in `male`, `female`, `kids` arrays:

```js
{
  id: "m7",                        // unique — prefix m/f/k + number
  name: "Service Name",
  price: 299,                      // number (no currency symbol)
  desc: "Short description",
  image: "images/my-photo.jpg",   // "" for emoji fallback
  duration: 30,                    // minutes
  icon: "✂️",                      // shown when image is missing
},
```

To **remove** a service: delete its `{ }` block.
To **reorder**: drag blocks up/down in the array.

### 3. Time Slots → `config/services.js` → `timeSlots`

Edit `timeSlots.male`, `timeSlots.female`, `timeSlots.kids` arrays.
Format: `"HH:MM AM"` or `"HH:MM PM"`.
These appear as selectable chips **per item in the cart**.

### 4. Themes → `config/shop.js` → `theme`

```js
theme: "luxury-burgundy"   // classic salon — deep red + gold
theme: "emerald-spa"       // premium spa — forest green + champagne  
theme: "midnight-gold"     // modern dark — charcoal + bold gold
theme: "blush-rose"        // feminine boutique — soft pink + rose gold
```

Just change the string — the entire colour palette switches instantly.

### 5. Home Service → `config/shop.js` → `homeService`

```js
homeService: {
  enabled:     true,
  label:       "Home Service",
  desc:        "We come to your doorstep",
  extraCharge: 150,          // added once to total if selected
  chargeLabel: "Travel Charge",
},
```

Set `enabled: false` to hide the home service toggle completely.

### 6. Gallery → `config/shop.js` → `gallery`

```js
gallery: [
  { image: "images/gallery/interior.jpg", caption: "Our Salon" },
  { image: "images/gallery/styling.jpg",  caption: "Hair Styling" },
],
```

Empty array `gallery: []` hides the gallery section entirely.
Broken/missing images are automatically hidden.

### 7. Creator Credits → `config/creator.js`

Your name, website, contact and version appear in the footer only.
Set any field `""` to hide it.

---

## 🎨 4 Themes at a Glance

| Theme ID | Vibe | Best For |
|---|---|---|
| `luxury-burgundy` | Deep red · Gold | Classic, upmarket salon |
| `emerald-spa` | Forest green · Champagne | Spa, wellness, organic |
| `midnight-gold` | Dark charcoal · Gold | High-end, modern, unisex |
| `blush-rose` | Soft pink · Rose gold | Ladies' boutique salon |

---

## 📱 Booking Flow (how it works for users)

1. User browses **Men / Women / Kids** tabs
2. Taps services → added to **cart above booking form**
3. Per item in cart: picks **date + time slot** + toggles **Home Service**
4. Fills **Name + Phone** in the booking form
5. Clicks **Book via WhatsApp** → sees **editable confirmation modal**
6. Clicks **Confirm & Send** → WhatsApp opens with pre-filled message
   including service list, dates, slots, home service flag, and website link

---

## 🚀 Hosting (3 steps)

1. Edit the 3 config files with real salon data
2. Add images to `images/` and `images/gallery/`
3. Upload to any static host:

| Host | Method |
|---|---|
| **Netlify** | Drag & drop folder at netlify.com/drop |
| **GitHub Pages** | Push → Settings → Pages → Deploy from branch |
| **Vercel** | `vercel deploy` |
| **Hostinger/cPanel** | Upload to `public_html/` via File Manager |
| **Firebase** | `firebase init hosting` then `firebase deploy` |

After going live: update `SHOP.website` in `config/shop.js`
so the QR code and WhatsApp message use the correct URL.

---

## ⚡ Performance

- No JavaScript frameworks
- No CSS preprocessors or build tools
- Fonts loaded from Google CDN (async)
- QRCode.js from Cloudflare CDN (~10KB)
- All images lazy-loaded
- Gzipped total: ~22KB (excluding images)

---

## ❓ Quick Troubleshooting

| Problem | Fix |
|---|---|
| WhatsApp goes to wrong number | Check `SHOP.whatsapp` — digits only, no `+` or spaces |
| QR code wrong URL | Update `SHOP.website` with your live URL |
| Images not showing | Filenames must match exactly (case-sensitive on Linux) |
| Map not showing | Paste valid Google Maps embed URL, or set `""` to hide |
| Gallery not showing | Check `gallery` array is not empty; verify image paths |
| Theme not changing | Check `SHOP.theme` matches one of the 4 valid theme IDs exactly |
