function starRatingHTML(rating, reviewCount, size = 14) {
  let stars = "";
  for (let i = 0; i < 5; i++) {
    const filled = i < Math.round(rating);
    stars += `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${filled ? "#B8935F" : "none"}" stroke="${filled ? "#B8935F" : "#C9BFAE"}" stroke-width="1.5"><polygon points="12 2 15 9 22 9.5 17 14.5 18.5 22 12 18 5.5 22 7 14.5 2 9.5 9 9 12 2"/></svg>`;
  }
  return `<div class="flex items-center gap-1.5"><div class="flex items-center gap-0.5">${stars}</div>${
    reviewCount !== undefined ? `<span class="text-xs text-charcoal/60">(${reviewCount})</span>` : ""
  }</div>`;
}

function heartIconHTML(filled) {
  return `<svg data-heart width="16" height="16" viewBox="0 0 24 24" class="${filled ? "wishlisted" : ""}" stroke-width="1.8"><path d="M12 21s-7.5-4.8-10-9.3C.5 8.4 2.3 5 5.7 5c1.9 0 3.4 1 4.3 2.4C11 6 12.5 5 14.3 5c3.4 0 5.2 3.4 3.7 6.7C19.5 16.2 12 21 12 21z"/></svg>`;
}

function productCardHTML(product) {
  const secondImage = product.images[1] || product.images[0];
  const defaultVariant = product.variants.find((v) => v.inStock) || product.variants[0];
  const wishlisted = isWishlisted(product.id);

  return `
  <div class="product-card group flex flex-col">
    <a href="product.html?slug=${product.slug}" class="product-media">
      <img src="${product.images[0]}" alt="${product.name}" class="img-primary" loading="lazy" />
      <img src="${secondImage}" alt="" class="img-secondary" loading="lazy" />
      <div class="absolute left-3 top-3 flex flex-col gap-1.5">
        ${product.isNewArrival ? `<span class="bg-ink px-2 py-1 text-[10px] uppercase tracking-widest2 text-ivory">New</span>` : ""}
        ${product.isOnSale ? `<span class="bg-gold px-2 py-1 text-[10px] uppercase tracking-widest2 text-ivory">Sale</span>` : ""}
      </div>
      <button aria-label="Toggle wishlist" onclick="event.preventDefault(); event.stopPropagation(); toggleWishlist('${product.id}', this)" class="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-ivory/90 backdrop-blur hover:scale-105 transition">
        ${heartIconHTML(wishlisted)}
      </button>
      <button onclick="event.preventDefault(); event.stopPropagation(); openQuickView('${product.slug}')" class="quickview-trigger">Quick View</button>
    </a>
    <div class="mt-3 flex flex-col gap-1.5">
      <a href="product.html?slug=${product.slug}">
        <h3 class="font-body text-sm text-ink transition-colors group-hover:text-gold">${product.name}</h3>
      </a>
      ${starRatingHTML(product.rating, product.reviewCount, 12)}
      <div class="flex items-center gap-2 font-mono text-sm">
        <span class="${product.isOnSale ? "text-gold" : "text-ink"}">${formatPrice(product.price)}</span>
        ${product.compareAtPrice ? `<span class="text-charcoal/40 line-through">${formatPrice(product.compareAtPrice)}</span>` : ""}
      </div>
    </div>
    <div class="mt-3">
      <button
        onclick="addToCart({productId:'${product.id}', size:'${defaultVariant.size}', color:'${defaultVariant.color}', quantity:1})"
        ${!defaultVariant.inStock ? "disabled" : ""}
        class="w-full border border-ink bg-ink px-4 py-2.5 text-xs uppercase tracking-widest2 text-ivory transition-colors duration-300 hover:bg-gold hover:border-gold disabled:cursor-not-allowed disabled:border-stone disabled:bg-stone"
      >${defaultVariant.inStock ? "Add to cart" : "Sold out"}</button>
    </div>
  </div>`;
}

function renderProductGrid(containerEl, products) {
  if (!containerEl) return;
  if (products.length === 0) {
    containerEl.innerHTML = `<p class="col-span-full py-16 text-center text-sm text-charcoal/60">No products match these filters yet — try widening your search.</p>`;
    return;
  }
  containerEl.className = "grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4";
  containerEl.innerHTML = products.map(productCardHTML).join("");
}
