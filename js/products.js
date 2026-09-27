/* ═══════════════════════════════════════
   js/products.js — Product state & rendering
═══════════════════════════════════════ */
const Products = (() => {
  let all        = [];
  let filtered   = [];
  let activeFilter = 'all';
  let activeSort   = 'default';
  let currentPage  = 1;
  let currentModalProduct = null;
  let selectedSize = null;
  let currentGalleryImages = [];
  let currentImageIndex = 0;

  /* ── Load products (called by DB module) ── */
  function load(data) {
    all = data;
    applyFilterSort();
  }

  /* ── Filter + Sort ── */
  function applyFilterSort() {
    let list = [...all];

    if (activeFilter !== 'all') {
      if (activeFilter === 'sale') {
        list = list.filter(p => p.old_price || p.badge === 'Sale');
      } else {
        list = list.filter(p => p.category === activeFilter);
      }
    }

    switch (activeSort) {
      case 'price_asc':  list.sort((a, b) => a.price - b.price); break;
      case 'price_desc': list.sort((a, b) => b.price - a.price); break;
      case 'name_asc':   list.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'newest':     list.sort((a, b) => (b.id || 0) - (a.id || 0)); break;
    }

    filtered = list;
    currentPage = 1;
    render();
    renderPagination();
  }

  /* ── Render skeleton loaders ── */
  function renderSkeletons() {
    document.getElementById('productGrid').innerHTML =
      Array(8).fill(`
        <div class="skel-card">
          <div class="skeleton skel-img"></div>
          <div class="skeleton skel-line" style="margin-top:8px"></div>
          <div class="skeleton skel-line short"></div>
        </div>`).join('');
  }

  /* ── Render product cards ── */
  function render() {
    const grid  = document.getElementById('productGrid');
    const count = document.getElementById('productCount');
    const start = (currentPage - 1) * CONFIG.PAGE_SIZE;
    const page  = filtered.slice(start, start + CONFIG.PAGE_SIZE);

    count.textContent = `${filtered.length} items`;

    if (page.length === 0) {
      grid.innerHTML = `
        <div class="state-box">
          <svg width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <h3>No products found</h3>
          <p>Try a different filter or check back soon.</p>
        </div>`;
      return;
    }

    grid.innerHTML = page.map(p => {
      const colors   = Array.isArray(p.colors) ? p.colors : [];
      const badgeCls = p.badge === 'Sale' ? 'badge-sale'
                     : p.badge === 'Limited' ? 'badge-ltd'
                     : 'badge-new';
      return `
        <article class="pcard" onclick="Products.openModal(${p.id})">
          <div class="pcard-img">
            ${p.image_url
              ? `<img class="pcard-visual pcard-product-img" src="${p.image_url}" alt="${p.name}" loading="lazy" referrerpolicy="no-referrer" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="pcard-visual" style="background:${p.bg};display:none">${p.emoji || '🪷'}</div>`
              : `<div class="pcard-visual" style="background:${p.bg}">${p.emoji || '🪷'}</div>`}
            ${p.badge ? `<div class="pcard-badge ${badgeCls}">${p.badge}</div>` : ''}
            <button class="pcard-wish"
              onclick="event.stopPropagation(); UI.toggleWish(this)"
              aria-label="Add to wishlist">
              <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
            <button class="qadd"
              onclick="event.stopPropagation(); Cart.quickAdd(${p.id})">
              + Quick Add
            </button>
          </div>
          <div class="pcard-info">
            <div class="pcard-name">${p.name}</div>
            <div class="pcard-price">
              INR ${p.price.toLocaleString('en-IN')}
              ${p.old_price ? `<span class="old">INR ${p.old_price.toLocaleString('en-IN')}</span>` : ''}
            </div>
            <div class="pcard-swatches">
              ${colors.map((c, i) =>
                `<div class="swatch-dot ${i === 0 ? 'active' : ''}"
                      style="background:${c}"
                      onclick="event.stopPropagation()"></div>`
              ).join('')}
            </div>
          </div>
        </article>`;
    }).join('');
  }

  /* ── Pagination ── */
  function renderPagination() {
    const total = Math.ceil(filtered.length / CONFIG.PAGE_SIZE);
    const el    = document.getElementById('pagination');

    if (total <= 1) { el.innerHTML = ''; return; }

    let html = '';
    if (currentPage > 1) html += `<button class="pgbtn" onclick="Products.goPage(${currentPage - 1})">‹</button>`;

    for (let i = 1; i <= total; i++) {
      if (i === 1 || i === total || Math.abs(i - currentPage) <= 1) {
        html += `<button class="pgbtn ${i === currentPage ? 'active' : ''}" onclick="Products.goPage(${i})">${i}</button>`;
      } else if (Math.abs(i - currentPage) === 2) {
        html += `<span style="color:var(--mid);padding:0 4px">…</span>`;
      }
    }
    if (currentPage < total) html += `<button class="pgbtn" onclick="Products.goPage(${currentPage + 1})">›</button>`;

    el.innerHTML = html;
  }

  function goPage(n) {
    currentPage = n;
    render();
    renderPagination();
    document.querySelector('.filter-bar').scrollIntoView({ behavior: 'smooth' });
  }

  /* ── Grid column toggle ── */
  function setGrid(cols) {
    document.getElementById('productGrid').style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    document.querySelectorAll('.gtbtn').forEach((b, i) =>
      b.classList.toggle('active', (cols === 2 && i === 0) || (cols === 3 && i === 1))
    );
  }

  /* ── Product Modal ── */
  function getGalleryImages(product) {
    const gallery = Array.isArray(product.image_urls) ? product.image_urls : [];
    const cover = typeof product.image_url === 'string' ? product.image_url.trim() : '';
    return [...new Set([cover, ...gallery]
      .filter(url => typeof url === 'string' && url.trim())
      .map(url => url.trim()))];
  }

  function setModalImage(url, product = currentModalProduct) {
    const media = document.getElementById('modalEmoji');
    media.replaceChildren();

    if (!url) {
      media.textContent = product?.emoji || '🪷';
      return;
    }

    const image = document.createElement('img');
    image.src = url;
    image.alt = product?.name || 'Product';
    image.referrerPolicy = 'no-referrer';
    image.style.cssText = 'width:100%;height:100%;object-fit:contain;display:block';
    media.append(image);
  }

  function renderModalThumbs(images, product) {
    const thumbs = document.getElementById('modalThumbs');
    thumbs.replaceChildren();

    if (!images.length) {
      const fallback = document.createElement('div');
      fallback.className = 'mthumb active';
      fallback.textContent = product.emoji || '🪷';
      thumbs.append(fallback);
      return;
    }

    images.forEach((url, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `mthumb${index === 0 ? ' active' : ''}`;
      button.dataset.imageIndex = index;
      button.setAttribute('aria-label', `View image ${index + 1}`);
      button.addEventListener('click', () => selectThumb(button, url, index));

      const image = document.createElement('img');
      image.src = url;
      image.alt = '';
      image.referrerPolicy = 'no-referrer';
      image.style.cssText = 'width:100%;height:100%;object-fit:cover;border-radius:inherit';
      button.append(image);
      thumbs.append(button);
    });
  }

  function updateGalleryControls() {
    const hasMultiple = currentGalleryImages.length > 1;
    document.getElementById('modalPrevImage').hidden = !hasMultiple;
    document.getElementById('modalNextImage').hidden = !hasMultiple;
    document.getElementById('modalSwipeHint').hidden = !hasMultiple;

    const counter = document.getElementById('modalImageCounter');
    counter.hidden = !hasMultiple;
    counter.textContent = hasMultiple
      ? `${currentImageIndex + 1} / ${currentGalleryImages.length}`
      : '';
  }

  function showGalleryImage(index) {
    if (!currentGalleryImages.length) return;
    currentImageIndex = (index + currentGalleryImages.length) % currentGalleryImages.length;
    setModalImage(currentGalleryImages[currentImageIndex]);
    document.querySelectorAll('.mthumb').forEach(thumb => {
      thumb.classList.toggle('active', Number(thumb.dataset.imageIndex) === currentImageIndex);
    });
    updateGalleryControls();
  }

  function navigateModalGallery(direction) {
    if (currentGalleryImages.length < 2) return;
    showGalleryImage(currentImageIndex + direction);
  }

  function initGalleryGestures() {
    const gallery = document.getElementById('modalGallery');
    if (gallery.dataset.gesturesReady) return;
    gallery.dataset.gesturesReady = 'true';

    let startX = 0;
    let startY = 0;
    gallery.addEventListener('touchstart', event => {
      const touch = event.changedTouches[0];
      startX = touch.clientX;
      startY = touch.clientY;
    }, { passive: true });

    gallery.addEventListener('touchend', event => {
      const touch = event.changedTouches[0];
      const deltaX = touch.clientX - startX;
      const deltaY = touch.clientY - startY;
      if (Math.abs(deltaX) >= 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
        navigateModalGallery(deltaX < 0 ? 1 : -1);
      }
    }, { passive: true });
  }

  function openModal(id) {
    const p = all.find(x => x.id === id);
    if (!p) return;
    currentModalProduct = p;
    selectedSize = null;

    document.getElementById('modalGallery').style.background = p.bg;
    const images = getGalleryImages(p);
    currentGalleryImages = images;
    currentImageIndex = 0;
    setModalImage(images[0], p);
    document.getElementById('modalName').textContent   = p.name;
    document.getElementById('modalDesc').textContent   = p.description || '';

    const badgeCls = p.badge === 'Sale' ? 'badge-sale'
                   : p.badge === 'Limited' ? 'badge-ltd' : 'badge-new';
    document.getElementById('modalBadge').innerHTML = p.badge
      ? `<div class="modal-badge-pill ${badgeCls}">${p.badge}</div>` : '';

    document.getElementById('modalPrice').innerHTML =
      `INR ${p.price.toLocaleString('en-IN')}` +
      (p.old_price ? `<span class="old">INR ${p.old_price.toLocaleString('en-IN')}</span>` : '');

    const colors = Array.isArray(p.colors) ? p.colors : [];
    document.getElementById('modalColors').innerHTML = colors.map((c, i) =>
      `<div class="mc-swatch ${i === 0 ? 'active' : ''}" style="background:${c}"
            onclick="Products.selectModalColor(this)"></div>`
    ).join('');

    const sizes = Array.isArray(p.sizes) ? p.sizes : [];
    document.getElementById('modalSizes').innerHTML = sizes.map(s =>
      `<div class="sz-chip" onclick="Products.selectSize(this, '${s}')">${s}</div>`
    ).join('');

    renderModalThumbs(images, p);
    updateGalleryControls();
    initGalleryGestures();

    document.getElementById('overlay').classList.add('show');
    document.getElementById('modalBackdrop').style.pointerEvents = 'all';
    document.getElementById('productModal').classList.add('open');
  }

  function selectModalColor(el) {
    document.querySelectorAll('.mc-swatch').forEach(s => s.classList.remove('active'));
    el.classList.add('active');
  }

  function selectSize(el, size) {
    document.querySelectorAll('.sz-chip').forEach(s => s.classList.remove('active'));
    el.classList.add('active');
    selectedSize = size;
  }

  function selectThumb(el, imageUrl, index) {
    document.querySelectorAll('.mthumb').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    currentImageIndex = index;
    setModalImage(imageUrl);
    updateGalleryControls();
  }

  function getCurrentProduct() { return currentModalProduct; }
  function getSelectedSize()   { return selectedSize; }

  /* ── Filter/Sort setters (called by event listeners in main.js) ── */
  function setFilter(f) { activeFilter = f; applyFilterSort(); }
  function setSort(s)   { activeSort   = s; applyFilterSort(); }

  return {
    load, renderSkeletons, goPage, setGrid,
    openModal, selectModalColor, selectSize, selectThumb, navigateModalGallery,
    getCurrentProduct, getSelectedSize,
    setFilter, setSort,
  };
})();
