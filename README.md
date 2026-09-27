# Nuts & Chocolates — Corporate Gifting Site

A static marketing site for selling custom-branded corporate gift boxes (nuts, dry fruits, chocolates) to companies. No build step, no dependencies — open `index.html` or serve the folder with any static host (Netlify, Vercel, GitHub Pages, or plain shared hosting).

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Home — hero photo, occasions, 8-package preview with bulk-quote buttons, customization, greeting card band, add-ons with photos, process, FAQ, contact form |
| `packages.html` | Full catalog — all 8 packages with photos and contents, comparison table, customization panel, add-ons |

## Images

All product photos live in `img/`. Photography is placeholder supplier imagery — replace files with your own product shots using the same filenames:

| File | Used for |
|---|---|
| `logo.png` | Header + footer logo (2.6 MB — consider compressing to <300 KB before launch) |
| `combo-1.jpg` … `combo-8.jpg` / `.webp` | The 8 package cards on `packages.html` |
| `combo-4.webp` | Home hero |
| `greeting-card.jpg` | Greeting card section |
| `nuts.jpg` | Customize banner (home) |
| `custom-combo.webp` | Customize banner (packages page) |
| `t-shirt.jpg`, `savory.jpg`, `special-chocolate.jpg`, `brownie.jpeg` | Add-on cards |
| `chocolate.jpg` | Spare — unused for now |

## The 8 packages

| # | Name | Contents |
|---|---|---|
| 1 | Nut Classic | 100g × 4 nuts |
| 2 | Nut + Chocolate | 100g × 4 nuts + 5 chocolate types |
| 3 | Nut + Dry Fruit | 100g × 4 nuts + 100g × 5 dry fruits |
| 4 | Grand Trio *(Most gifted)* | 100g × 4 nuts + 100g × 5 dry fruits + 5 chocolate types |
| 5 | Nut Classic XL | 200g × 4 nuts |
| 6 | Nut + Chocolate XL | 200g × 4 nuts + 10 chocolate types |
| 7 | Nut + Dry Fruit XL | 200g × 4 nuts + 200g × 5 dry fruits |
| 8 | Grand Trio XL | 200g × 4 nuts + 200g × 5 dry fruits + 10 chocolate types |

## Before you launch — 10-minute checklist

| What | Where |
|---|---|
| WhatsApp number | `js/main.js` → `GIFTING_CONFIG.whatsappNumber` (digits only, with country code) |
| Email address | `js/main.js` → `GIFTING_CONFIG.email`, plus the `#emailLabel` span and `#footerEmail` link in **both** HTML pages |
| Brand name | Done — site uses "Nuts & Chocolates" from your logo. Update if you prefer a different name |
| Phone shown on page | `#waNumberLabel` span in `index.html` |
| Prices | Search for `₹—` in both pages and fill in your indicative per-box prices (cards + comparison table) |

## How enquiries work

- Every **"Get bulk quote" / "Bulk quote"** button opens WhatsApp with a message pre-filled with that package's name (`data-package` + `data-wa` attributes; the `{package}` token in the message is replaced automatically).
- **Add-on buttons** (T-shirts, Savouries, Special chocolates, Brownies) do the same with the add-on name.
- The **contact form** builds a WhatsApp message from name, company, phone, occasion, quantity, package and notes — with an **email (mailto) fallback** link that appears after submit. Nothing is stored on the site.

## Design notes

- Warm festive theme: cream, chocolate-brown and gold. Fonts: Fraunces (display) + Inter (body), loaded from Google Fonts.
- All imagery is CSS/emoji/SVG — no image files to manage. The hero gift box is pure CSS.
- Scroll reveals respect `prefers-reduced-motion`. Fully responsive with a mobile nav drawer.

## Deploy

Copy the whole folder (`index.html`, `packages.html`, `css/`, `js/`) to any static host — no build step, no environment variables, no backend.
