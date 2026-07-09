let qvState = { slug: null, size: null, color: null };

function openQuickView(slug) {
  const product = getProductBySlug(slug);
  if (!product) {
    console.error(`Quick view: no product found for slug "${slug}"`);
    return;
  }
  if (!product.variants || product.variants.length === 0) {
    console.error(`Quick view: product "${product.name}" (${product.id}) has no product_variants rows in Supabase — add at least one size/color row before it can open in quick view.`);
    return;
  }
  qvState = { slug, size: product.variants[0].size, color: product.variants[0].color };
  renderQuickView(product);
  document.getElementById("quickview-root").classList.add("open");
}

function closeQuickView() {
  document.getElementById("quickview-root").classList.remove("open");
}

function renderQuickView(product) {
  const sizes = [...new Set(product.variants.map((v) => v.size))];
  const colors = [...new Set(product.variants.map((v) => v.color))];
  const variant = product.variants.find((v) => v.size === qvState.size && v.color === qvState.color);
  const imageSrc = product.images && product.images.length > 0 ? product.images[0] : "";

  document.getElementById("quickview-root").innerHTML = `
    <div class="relative grid w-full max-w-3xl grid-cols-1 gap-6 bg-ivory p-6 sm:grid-cols-2 sm:p-8" onclick="event.stopPropagation()">
      <button aria-label="Close quick view" onclick="closeQuickView()" class="absolute right-4 top-4 z-10">✕</button>
      <div class="relative aspect-[4/5] overflow-hidden bg-sand/30">
        ${imageSrc ? `<img src="${imageSrc}" alt="${product.name}" class="h-full w-full object-cover" />` : `<div class="flex h-full w-full items-center justify-center text-xs text-charcoal/40">No image</div>`}
      </div>
      <div class="flex flex-col">
        <p class="eyebrow mb-2">${product.brand}</p>
        <h3 class="font-display text-2xl italic">${product.name}</h3>
        <div class="my-3">${starRatingHTML(product.rating, product.reviewCount)}</div>
        <p class="mb-4 font-mono text-lg">${formatPrice(product.price)}</p>
        <p class="mb-6 text-sm text-charcoal/70 leading-relaxed">${product.description || ""}</p>

        <div class="mb-4">
          <p class="mb-2 text-xs uppercase tracking-widest2 text-charcoal/60">Color: ${qvState.color}</p>
          <div class="flex gap-2">
            ${colors
              .map((c) => {
                const v = product.variants.find((pv) => pv.color === c);
                return `<button onclick="qvSetColor('${c}')" style="background:${v.colorHex || '#ccc'}" class="h-7 w-7 rounded-full border-2 ${qvState.color === c ? "border-gold" : "border-transparent"}" aria-label="${c}"></button>`;
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
                  `<button onclick="qvSetSize('${s}')" class="border px-3 py-1.5 text-xs ${qvState.size === s ? "border-ink bg-ink text-ivory" : "border-ink/20"}">${s}</button>`
              )
              .join("")}
          </div>
        </div>

        <button
          onclick="qvAddToCart()"
          ${!variant || !variant.inStock ? "disabled" : ""}
          class="mt-auto w-full border border-ink bg-ink py-3 text-xs uppercase tracking-widest2 text-ivory transition-colors hover:bg-gold hover:border-gold disabled:cursor-not-allowed disabled:border-stone disabled:bg-stone"
        >${variant && variant.inStock ? "Add to cart" : "Sold out"}</button>
      </div>
    </div>`;
}

function qvSetColor(color) {
  qvState.color = color;
  renderQuickView(getProductBySlug(qvState.slug));
}
function qvSetSize(size) {
  qvState.size = size;
  renderQuickView(getProductBySlug(qvState.slug));
}
function qvAddToCart() {
  addToCart({ productId: getProductBySlug(qvState.slug).id, size: qvState.size, color: qvState.color, quantity: 1 });
  closeQuickView();
}
