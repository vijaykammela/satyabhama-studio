# Satyabhama 🪷
**Tradition Reimagined** — Indian ethnic & fusion fashion ecommerce

A fully mobile-optimised, Supabase-powered fashion store built with vanilla HTML, CSS, and JS.

---

## 📁 Project Structure

```
satyabhama/
├── index.html              ← Main page (HTML only)
├── netlify.toml            ← Netlify deployment config
│
├── css/
│   ├── reset.css           ← Box-sizing, base reset
│   ├── tokens.css          ← Design tokens (colours, spacing)
│   ├── layout.css          ← Nav, hero, filter bar, footer
│   ├── components.css      ← Cards, sidebars, modal, buttons
│   └── mobile.css          ← Responsive breakpoints
│
├── js/
│   ├── config.js           ← ⚙️ Supabase keys + demo data
│   ├── supabase.js         ← Supabase client & auth/data fetch
│   ├── products.js         ← Product state, filter, render
│   ├── cart.js             ← Cart state & render
│   ├── auth.js             ← Login, register, logout
│   ├── ui.js               ← Sidebars, modal, toast, wishlist
│   └── main.js             ← App entry point & event listeners
│
└── database/
    ├── schema.sql          ← Create all tables + triggers
    ├── rls.sql             ← Row Level Security policies
    └── seed.sql            ← 16 sample products
```

---

## 🚀 Step 1 — Supabase Setup

### 1.1 Create a project
1. Go to [app.supabase.com](https://app.supabase.com)
2. Click **New project**
3. Name: `satyabhama`, Region: **South Asia (Mumbai)**
4. Save your database password

### 1.2 Run the SQL files (in order)
Go to **SQL Editor → New query**, paste each file and click **Run**:

| Order | File | What it does |
|-------|------|--------------|
| 1st | `database/schema.sql` | Creates all tables + auto-update triggers |
| 2nd | `database/rls.sql` | Adds Row Level Security policies |
| 3rd | `database/seed.sql` | Inserts 16 sample products |

### 1.3 Get your API keys
Go to **Project Settings → API** and copy:
- **Project URL** → looks like `https://abcdefgh.supabase.co`
- **anon / public key** → long JWT string

### 1.4 Paste keys into config.js
Open `js/config.js` and replace the two placeholder values:

```js
const CONFIG = {
  SUPABASE_URL:  'https://YOUR_PROJECT_ID.supabase.co',  // ← paste here
  SUPABASE_ANON: 'YOUR_ANON_PUBLIC_KEY',                 // ← paste here
  PAGE_SIZE: 12,
};
```

### 1.5 Enable Auth providers
Go to **Authentication → Providers**:
- ✅ Toggle **Email** to enabled
- ✅ Toggle **Google** to enabled
  - Paste your **Google Client ID** and **Client Secret**
  - Add this redirect URL in Google Cloud Console:
    `https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback`

---

## 🌐 Step 2 — GitHub Setup

### 2.1 Create a new repository
1. Go to [github.com/new](https://github.com/new)
2. Repository name: `satyabhama`
3. Set to **Public** (required for free Netlify)
4. Click **Create repository**

### 2.2 Push your code
Open a terminal in your project folder and run:

```bash
git init
git add .
git commit -m "Initial commit — Satyabhama ecommerce"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/satyabhama.git
git push -u origin main
```

---

## 🟢 Step 3 — Netlify Deployment

### 3.1 Connect to Netlify
1. Go to [app.netlify.com](https://app.netlify.com)
2. Click **Add new site → Import an existing project**
3. Choose **Deploy with GitHub**
4. Authorise Netlify and select your `satyabhama` repo

### 3.2 Build settings
Netlify auto-detects the `netlify.toml`. Confirm these settings:
- **Base directory:** *(leave blank)*
- **Build command:** *(leave blank)*
- **Publish directory:** `.`

Click **Deploy site**. Your site goes live in ~30 seconds.

### 3.3 Add Supabase URL to Netlify (recommended)
Instead of committing API keys to GitHub, use Netlify environment variables:

1. Netlify Dashboard → **Site settings → Environment variables**
2. Add:
   - `SUPABASE_URL` = your project URL
   - `SUPABASE_ANON` = your anon key

Then update `js/config.js` to read them:
```js
// For a Vite/build-based setup only — for plain HTML, keep them in config.js
```
> **Note:** For a plain HTML/JS site (no build step), keep keys in `config.js`.
> They are safe — the `anon` key is designed to be public. RLS policies protect your data.

### 3.4 Set your Supabase redirect URL
In Supabase → **Authentication → URL Configuration**:
- **Site URL:** `https://your-site-name.netlify.app`
- **Redirect URLs:** `https://your-site-name.netlify.app/**`

---

## 🔄 How to update your site
After any change:
```bash
git add .
git commit -m "Your change description"
git push
```
Netlify auto-deploys within 30 seconds of every push.

---

## 🛍️ Managing Products

### Add a product via Supabase Dashboard
1. Go to **Table Editor → products → Insert row**
2. Fill in the fields:

| Field | Example |
|-------|---------|
| `name` | Banarasi Silk Saree |
| `category` | Ethnic |
| `price` | 2499 |
| `old_price` | 3200 *(or leave blank)* |
| `badge` | New / Sale / Limited *(or blank)* |
| `emoji` | 🥻 |
| `bg_color` | #6A1B9A |
| `colors` | `["#6A1B9A","#D4A017","#C62828"]` |
| `sizes` | `["XS","S","M","L","XL"]` |
| `description` | Hand-woven Banarasi silk… |

### Put items on sale
In **SQL Editor**:
```sql
-- Discount all Ethnic items by 20%
UPDATE products
SET old_price = price, price = ROUND(price * 0.80), badge = 'Sale'
WHERE category = 'Ethnic';
```

---

## 📞 Support

- Supabase docs: [supabase.com/docs](https://supabase.com/docs)
- Netlify docs: [docs.netlify.com](https://docs.netlify.com)
