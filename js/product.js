let pdpState = { slug: null, activeImage: 0, size: null, color: null, quantity: 1 };

function initProductPage() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  const product = getProductBySlug(slug);
  const root = document.getElementById("product-root");

  if (!product) {
    root.innerHTML = `
      <div class="container-edit flex min-h-[50vh] flex-col items-center justify-center gap-5 text-center">
        <p class="eyebrow text-gold">404</p>
        <h1 class="font-display text-4xl italic">This page has been discontinued</h1>
        <a href="shop.html" class="border border-ink bg-ink px-7 py-3 text-xs uppercase tracking-widest2 text-ivory transition-colors hover:bg-gold hover:border-gold">Back to Shop</a>
      </div>`;
    return;
  }

  pdpState = { slug, activeImage: 0, size: product.variants[0].size, color: product.variants[0].color, quantity: 1 };
  document.title = `${product.name} — Maison Verre`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", product.description);

  renderProductRoot(product);
}

function renderProductRoot(product) {
  const root = document.getElementById("product-root");
  const sizes = [...new Set(product.variants.map((v) => v.size))];
  const colors = [...new Set(product.variants.map((v) => v.color))];
  const variant = product.variants.find((v) => v.size === pdpState.size && v.color === pdpState.color);
  const related = getRelatedProducts(product);

  root.innerHTML = `
    <div class="container-edit py-10 sm:py-14">
      <div class="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <div class="flex flex-col gap-3 sm:flex-row-reverse">
          <div class="relative aspect-[4/5] flex-1 overflow-hidden bg-sand/30">
            <img src="${product.images[pdpState.activeImage]}" alt="${product.name}" class="h-full w-full object-cover" />
          </div>
          ${
            product.images.length > 1
              ? `<div class="flex gap-3 sm:flex-col">
                  ${product.images
                    .map(
                      (img, i) =>
                        `<button onclick="pdpSetImage(${i})" class="relative h-20 w-16 flex-shrink-0 overflow-hidden border sm:h-24 sm:w-20 ${
                          pdpState.activeImage === i ? "border-gold" : "border-transparent"
                        }"><img src="${img}" class="h-full w-full object-cover" /></button>`
                    )
                    .join("")}
                </div>`
              : ""
          }
        </div>

        <div class="max-w-lg">
          <p class="eyebrow mb-2">${product.brand}</p>
          <h1 class="mb-3 font-display text-3xl italic sm:text-4xl">${product.name}</h1>
          <div class="mb-4">${starRatingHTML(product.rating, product.reviewCount)}</div>
          <div class="mb-6 flex items-center gap-3 font-mono text-xl">
            <span class="${product.isOnSale ? "text-gold" : "text-ink"}">${formatPrice(product.price)}</span>
            ${product.compareAtPrice ? `<span class="text-base text-charcoal/40 line-through">${formatPrice(product.compareAtPrice)}</span>` : ""}
          </div>
          <p class="mb-8 text-sm leading-relaxed text-charcoal/80">${product.description}</p>

          <div class="mb-5">
            <p class="mb-2 text-xs uppercase tracking-widest2 text-charcoal/60">Color: ${pdpState.color}</p>
            <div class="flex gap-2">
              ${colors
                .map((c) => {
                  const v = product.variants.find((pv) => pv.color === c);
                  return `<button onclick="pdpSetColor('${c}')" style="background:${v.colorHex}" class="h-8 w-8 rounded-full border-2 ${
                    pdpState.color === c ? "border-gold" : "border-transparent"
                  }" aria-label="${c}"></button>`;
                })
                .join("")}
            </div>
          </div>

          <div class="mb-6">
            <p class="mb-2 text-xs uppercase tracking-widest2 text-charcoal/60">Size</p>
            <div class="flex flex-wrap gap-2">
              ${sizes
                .map(
                  (s) =>
                    `<button onclick="pdpSetSize('${s}')" class="border px-4 py-2 text-sm transition-colors ${
                      pdpState.size === s ? "border-ink bg-ink text-ivory" : "border-ink/20 text-ink hover:border-ink"
                    }">${s}</button>`
                )
                .join("")}
            </div>
          </div>

          <div class="mb-6 flex w-fit items-center gap-3 border border-ink/15 px-3 py-2">
            <button onclick="pdpSetQty(${pdpState.quantity - 1})" aria-label="Decrease quantity">−</button>
            <span class="w-6 text-center font-mono text-sm">${pdpState.quantity}</span>
            <button onclick="pdpSetQty(${pdpState.quantity + 1})" aria-label="Increase quantity">+</button>
          </div>

          <button
            onclick="pdpAddToCart()"
            ${!variant || !variant.inStock ? "disabled" : ""}
            class="w-full border border-ink bg-ink py-3.5 text-xs uppercase tracking-widest2 text-ivory transition-colors duration-300 hover:bg-gold hover:border-gold disabled:cursor-not-allowed disabled:border-stone disabled:bg-stone"
          >${variant && variant.inStock ? (pdpState.added ? "Added ✓" : "Add to Cart") : "Sold Out"}</button>

          <dl class="mt-8 space-y-2 border-t border-ink/10 pt-6 text-xs text-charcoal/60">
            <div class="flex justify-between"><dt>Shipping</dt><dd>Free over ₹2,000 · Delivered in 4–7 days</dd></div>
            <div class="flex justify-between"><dt>Returns</dt><dd>Free returns within 30 days</dd></div>
          </dl>
        </div>
      </div>

      ${
        related.length
          ? `<div class="mt-20">
              <div class="mb-8 flex items-end justify-between border-b border-ink/10 pb-6 sm:mb-10">
                <div><p class="eyebrow mb-2">Complete the look</p><h2 class="font-display text-3xl italic text-ink sm:text-4xl">You May Also Like</h2></div>
              </div>
              <div id="related-grid"></div>
            </div>`
          : ""
      }
    </div>`;

  if (related.length) renderProductGrid(document.getElementById("related-grid"), related);
}

function pdpSetImage(i) { pdpState.activeImage = i; renderProductRoot(getProductBySlug(pdpState.slug)); }
function pdpSetColor(c) { pdpState.color = c; renderProductRoot(getProductBySlug(pdpState.slug)); }
function pdpSetSize(s) { pdpState.size = s; renderProductRoot(getProductBySlug(pdpState.slug)); }
function pdpSetQty(q) { pdpState.quantity = Math.max(1, q); renderProductRoot(getProductBySlug(pdpState.slug)); }
function pdpAddToCart() {
  const product = getProductBySlug(pdpState.slug);
  addToCart({ productId: product.id, size: pdpState.size, color: pdpState.color, quantity: pdpState.quantity });
}

document.addEventListener("DOMContentLoaded", initProductPage);
