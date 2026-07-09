/* ═══════════════════════════════════════
   js/cart.js — Cart state & rendering
═══════════════════════════════════════ */
const Cart = (() => {
  let items = [];   /* [{ key, product, size, qty }] */

  /* ── Add to cart ── */
  function add(product, size) {
    const key      = `${product.id}__${size}`;
    const existing = items.find(i => i.key === key);
    if (existing) {
      existing.qty++;
    } else {
      items.push({ key, product, size, qty: 1 });
    }
    updateBadge();
    UI.showToast(`${product.name} added to bag`);
  }

  /* ── Quick-add (picks second size as default) ── */
  function quickAdd(productId) {
    const p = Products.getCurrentProduct
      ? null
      : null;

    /* Look up product from all loaded products */
    const allProducts = (() => {
      try { return document.querySelector('.pcard') ? _getAllProducts() : DEMO_PRODUCTS; }
      catch { return DEMO_PRODUCTS; }
    })();

    /* We expose getAllById via Products module via window global */
    const product = window._allProducts?.find(x => x.id === productId);
    if (!product) return;
    const size = product.sizes?.[1] || product.sizes?.[0] || 'M';
    add(product, size);
  }

  /* ── Change quantity ── */
  function changeQty(key, delta) {
    const item = items.find(i => i.key === key);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      items = items.filter(i => i.key !== key);
    }
    updateBadge();
    render();
  }

  /* ── Remove item ── */
  function remove(key) {
    items = items.filter(i => i.key !== key);
    updateBadge();
    render();
  }

  /* ── Add from modal ── */
  function addFromModal() {
    const product = Products.getCurrentProduct();
    if (!product) return;

    let size = Products.getSelectedSize();
    if (!size) {
      const firstChip = document.querySelector('.sz-chip:not(.oos)');
      if (firstChip) firstChip.click();
      size = Products.getSelectedSize();
    }
    if (!size && product.sizes?.length) size = product.sizes[0];
    if (!size) size = 'M';

    add(product, size);
    UI.closeModal();
    UI.openCart();
  }

  /* ── Update nav badge ── */
  function updateBadge() {
    const total = items.reduce((s, i) => s + i.qty, 0);
    const badge = document.getElementById('cartBadge');
    badge.textContent = total;
    badge.classList.toggle('vis', total > 0);
    document.getElementById('cartCountLabel').textContent = total ? `(${total})` : '';
  }

  /* ── Render cart body ── */
  function render() {
    const body = document.getElementById('cartBody');
    const foot = document.getElementById('cartFoot');

    if (items.length === 0) {
      body.innerHTML = `
        <div class="cart-empty-state">
          <svg width="52" height="52" fill="none" stroke="currentColor" stroke-width="1.4" viewBox="0 0 24 24">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <h3 style="font-size:16px;font-weight:500">Your bag is empty</h3>
          <p>Discover our curated collection</p>
          <button class="btn-sec" style="max-width:180px;margin-top:8px" onclick="UI.closeCart()">Shop Now</button>
        </div>`;
      foot.style.display = 'none';
      return;
    }

    const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);

    body.innerHTML = items.map(item => `
      <div class="cart-item">
        <div class="ci-img" style="background:${item.product.bg}">
          ${item.product.emoji || '🪷'}
        </div>
        <div class="ci-info">
          <div class="ci-name">${item.product.name}</div>
          <div class="ci-meta">Size: ${item.size}</div>
          <div class="ci-row">
            <div class="qty-ctrl">
              <button onclick="Cart.changeQty('${item.key}', -1)">−</button>
              <span>${item.qty}</span>
              <button onclick="Cart.changeQty('${item.key}', 1)">+</button>
            </div>
            <div class="ci-price">₹${(item.product.price * item.qty).toLocaleString('en-IN')}</div>
          </div>
          <button class="ci-remove" onclick="Cart.remove('${item.key}')">Remove</button>
        </div>
      </div>`).join('');

    foot.style.display = 'block';
    document.getElementById('cartSubtotal').textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    document.getElementById('cartTotal').textContent    = `₹${subtotal.toLocaleString('en-IN')}`;
  }

  return { add, quickAdd, changeQty, remove, addFromModal, render };
})();
