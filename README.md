# Maison Verre — Static HTML/CSS/JS Version

Same storefront, same look, zero build step. This is a plain HTML/CSS/JS
conversion of the Next.js project — drag-and-drop deployable to Netlify,
or any static host, with no `npm install` or build command required.

## Running it locally

Just open `index.html` in a browser, or serve the folder so relative
paths and `fetch`-like behavior work exactly like production:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploying

**Netlify (drag-and-drop):** go to app.netlify.com → Sites → drag this
entire folder onto the page. Done — no build settings needed.

**Netlify (via GitHub):** push this folder to a repo, connect it in
Netlify, leave the build command blank and the publish directory as `.`
(project root).

**Vercel:** works the same way — no framework preset needed, just a
static deploy with publish directory `.`.

## File layout

```
index.html, shop.html, category.html, product.html,
cart.html, checkout.html, about.html, contact.html, wishlist.html

css/styles.css          Design tokens (colors/fonts) + hand-written styles
                         for things Tailwind's CDN build doesn't cover
                         (drawer/modal transitions, card hover-swap, etc.)

js/tailwind-config.js    Tailwind CDN config (colors, fonts) — loaded before
                         Tailwind's <script> tag so utility classes work
                         with no build step
js/data.js               Mock product catalog (12 products) + category/
                         testimonial data + getX() accessor functions
js/cart.js               Cart state, persisted to localStorage, renders
                         the header count badge + slide-over drawer
js/wishlist.js           Wishlist state, persisted to localStorage
js/render.js             Shared markup builders: product cards, star
                         ratings, wishlist heart icon
js/filters.js            Filter/sort logic + toolbar UI, shared by
                         shop.html and category.html
js/quickview.js          Quick View modal logic
js/product.js            Product detail page logic (gallery, variant
                         picker, related products) — reads ?slug= from
                         the URL
js/main.js               Mobile menu, header search, generic form-submit
                         simulation for newsletter/contact

generate.py              Optional. The script that assembled every HTML
                         page from shared header/footer/cart-drawer
                         templates. Not needed to run the site — only
                         useful if you want to change something in the
                         header/footer/cart drawer across all 9 pages at
                         once. Edit generate.py, then run
                         `python3 generate.py` to regenerate every page.
```

## What changed vs. the Next.js version

- **Tailwind via CDN**, not a compiled build — same utility classes,
  configured in `js/tailwind-config.js`. Fine for a project this size;
  for a much larger site a compiled Tailwind build loads faster.
- **Wishlist now persists** across page loads (localStorage), which is
  actually an improvement over the React version's per-session state.
- **Product and category pages are query-param driven**
  (`product.html?slug=...`, `category.html?category=outerwear` or
  `?gender=women`) rather than pretty URLs like `/product/slug`. That's
  the honest tradeoff of no server/build step: each product doesn't get
  its own crawlable URL or pre-rendered `<title>`/meta description — the
  page renders correct metadata via JavaScript after load, which search
  engines mostly handle fine today but isn't as strong as true static
  pages per product.
- **No server-side anything** — filtering, cart, checkout, and search
  all run in the browser. That means it's simpler to host but there's
  still no real payment processing or order storage, same as before.

## Known simplifications (unchanged from the Next.js version)

- Checkout is UI-only — wire up Stripe (or similar) via a serverless
  function before taking real orders.
- Newsletter/contact forms simulate success locally — connect them to
  an email provider or form backend (Netlify Forms is a one-line option
  since you're already on Netlify: add `data-netlify="true"` to the
  `<form>` tags in `contact.html` / `index.html`).
- Product data lives in `js/data.js`. Fine for ~a few dozen products;
  move to a real backend once the catalog grows past that.
