// Cart state, persisted to localStorage under CART_KEY. Any page that
// includes data.js + cart.js gets a working cart automatically: this file
// renders the header cart count and the slide-over drawer on load.

const CART_KEY = "maison-verre-cart";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(lines) {
  localStorage.setItem(CART_KEY, JSON.stringify(lines));
  renderHeaderCartCount();
  renderCartDrawer();
}

function addToCart({ productId, size, color, quantity }) {
  const lines = getCart();
  const existing = lines.find(
    (l) => l.productId === productId && l.size === size && l.color === color
  );
  if (existing) {
    existing.quantity += quantity;
  } else {
    lines.push({ productId, size, color, quantity });
  }
  saveCart(lines);
  openCart();
}

function updateCartQuantity(productId, size, color, quantity) {
  let lines = getCart();
  lines = lines
    .map((l) =>
      l.productId === productId && l.size === size && l.color === color
        ? { ...l, quantity }
        : l
    )
    .filter((l) => l.quantity > 0);
  saveCart(lines);
}

function removeCartLine(productId, size, color) {
  const lines = getCart().filter(
    (l) => !(l.productId === productId && l.size === size && l.color === color)
  );
  saveCart(lines);
}

function clearCart() {
  saveCart([]);
}

function cartItemCount() {
  return getCart().reduce((sum, l) => sum + l.quantity, 0);
}

function cartSubtotal() {
  return getCart().reduce((sum, l) => {
    const product = getProductBySlugById(l.productId);
    return sum + (product ? product.price * l.quantity : 0);
  }, 0);
}

// products are looked up by id in the cart, but PRODUCTS is keyed by slug
// lookups elsewhere — this small helper bridges the two.
function getProductBySlugById(productId) {
  return PRODUCTS.find((p) => p.id === productId);
}

function formatPrice(n) {
  return `$${n.toFixed(2)}`;
}

// --- Drawer open/close --------------------------------------------------
function openCart() {
  const overlay = document.getElementById("cart-overlay");
  const drawer = document.getElementById("cart-drawer");
  if (!overlay || !drawer) return;
  overlay.classList.add("open");
  drawer.classList.add("open");
}
function closeCart() {
  const overlay = document.getElementById("cart-overlay");
  const drawer = document.getElementById("cart-drawer");
  if (!overlay || !drawer) return;
  overlay.classList.remove("open");
  drawer.classList.remove("open");
}

function renderHeaderCartCount() {
  const badge = document.getElementById("cart-count-badge");
  if (!badge) return;
  const count = cartItemCount();
  badge.textContent = count;
  badge.style.display = count > 0 ? "flex" : "none";
}

function renderCartDrawer() {
  const container = document.getElementById("cart-drawer-body");
  const footer = document.getElementById("cart-drawer-footer");
  if (!container) return;
  const lines = getCart();

  if (lines.length === 0) {
    container.innerHTML = `<p class="mt-10 text-center text-sm text-charcoal/60">Your bag is empty. Time to fix that.</p>`;
    if (footer) footer.innerHTML = "";
    return;
  }

  container.innerHTML = lines
    .map((line) => {
      const product = getProductBySlugById(line.productId);
      if (!product) return "";
      return `
        <li class="flex gap-4">
          <div class="relative h-24 w-20 flex-shrink-0 overflow-hidden bg-sand/30">
            <img src="${product.images[0]}" alt="${product.name}" class="h-full w-full object-cover" />
          </div>
          <div class="flex flex-1 flex-col justify-between">
            <div>
              <p class="text-sm text-ink">${product.name}</p>
              <p class="text-xs text-charcoal/60">${line.color} · ${line.size}</p>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3 border border-ink/15 px-2 py-1">
                <button aria-label="Decrease quantity" onclick="updateCartQuantity('${line.productId}','${line.size}','${line.color}', ${line.quantity - 1})">−</button>
                <span class="w-4 text-center text-sm font-mono">${line.quantity}</span>
                <button aria-label="Increase quantity" onclick="updateCartQuantity('${line.productId}','${line.size}','${line.color}', ${line.quantity + 1})">+</button>
              </div>
              <span class="font-mono text-sm">${formatPrice(product.price * line.quantity)}</span>
            </div>
          </div>
          <button aria-label="Remove item" onclick="removeCartLine('${line.productId}','${line.size}','${line.color}')" class="self-start text-charcoal/40 hover:text-ink">✕</button>
        </li>`;
    })
    .join("");

  container.innerHTML = `<ul class="flex flex-col gap-6">${container.innerHTML}</ul>`;

  if (footer) {
    const subtotal = cartSubtotal();
    footer.innerHTML = `
      <div class="mb-4 flex items-center justify-between text-sm">
        <span class="text-charcoal/70">Subtotal</span>
        <span class="font-mono text-base">${formatPrice(subtotal)}</span>
      </div>
      <a href="checkout.html" class="block w-full bg-ink py-3 text-center text-xs uppercase tracking-widest2 text-ivory transition-colors hover:bg-gold">Checkout</a>
      <a href="cart.html" class="hover-underline mt-3 block text-center text-xs text-charcoal/60">View full cart</a>
    `;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderHeaderCartCount();
  renderCartDrawer();
  const cartBtn = document.getElementById("cart-icon-btn");
  const closeBtn = document.getElementById("cart-close-btn");
  const overlay = document.getElementById("cart-overlay");
  if (cartBtn) cartBtn.addEventListener("click", openCart);
  if (closeBtn) closeBtn.addEventListener("click", closeCart);
  if (overlay) overlay.addEventListener("click", closeCart);
});
