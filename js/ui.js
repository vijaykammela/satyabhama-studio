/* ═══════════════════════════════════════
   js/ui.js — UI controls & interactions
═══════════════════════════════════════ */
const UI = (() => {

  /* ══ TOAST ══ */
  let toastTimer;
  function showToast(msg) {
    const t = document.getElementById('toast');
    document.getElementById('toastMsg').textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
  }

  /* ══ OVERLAY ══ */
  function showOverlay() { document.getElementById('overlay').classList.add('show'); }
  function hideOverlay() { document.getElementById('overlay').classList.remove('show'); }

  /* ══ CART SIDEBAR ══ */
  function openCart() {
    Cart.render();
    document.getElementById('cartSidebar').classList.add('open');
    showOverlay();
  }
  function closeCart() {
    document.getElementById('cartSidebar').classList.remove('open');
    hideOverlay();
  }

  /* ══ ACCOUNT SIDEBAR ══ */
  function openAccount() {
    document.getElementById('accountSidebar').classList.add('open');
    showOverlay();
  }
  function closeAccount() {
    document.getElementById('accountSidebar').classList.remove('open');
    hideOverlay();
  }

  /* ══ MOBILE DRAWER ══ */
  function openDrawer() {
    document.getElementById('drawerNav').classList.add('open');
    showOverlay();
  }
  function closeDrawer() {
    document.getElementById('drawerNav').classList.remove('open');
    hideOverlay();
  }

  /* ══ MODAL ══ */
  function closeModal() {
    document.getElementById('productModal').classList.remove('open');
    document.getElementById('modalBackdrop').style.pointerEvents = 'none';
    hideOverlay();
  }

  /* ══ CLOSE ALL ══ */
  function closeAll() {
    ['cartSidebar', 'accountSidebar', 'drawerNav'].forEach(id =>
      document.getElementById(id).classList.remove('open')
    );
    closeModal();
    hideOverlay();
  }

  /* ══ WISHLIST (card) ══ */
  let wishCount = 0;
  function toggleWish(btn) {
    btn.classList.toggle('liked');
    wishCount += btn.classList.contains('liked') ? 1 : -1;
    wishCount = Math.max(0, wishCount);
    const b = document.getElementById('wishBadge');
    b.textContent = wishCount;
    b.classList.toggle('vis', wishCount > 0);
    showToast(btn.classList.contains('liked') ? 'Added to wishlist ♡' : 'Removed from wishlist');
  }

  /* ══ WISHLIST (modal) ══ */
  function toggleModalWishlist(btn) {
    const isWished = btn.dataset.wished === 'true';
    btn.dataset.wished = isWished ? 'false' : 'true';
    btn.style.background  = isWished ? '' : '#fff0f0';
    btn.style.borderColor = isWished ? '' : '#e00';
    const svgPath = btn.querySelector('path');
    if (svgPath) {
      svgPath.style.fill   = isWished ? 'none' : '#e00';
      svgPath.style.stroke = isWished ? 'currentColor' : '#e00';
    }
    showToast(isWished ? 'Removed from wishlist' : 'Added to wishlist ♡');
  }

  /* ══ ACCORDION ══ */
  function toggleAcc(btn) {
    const body = btn.nextElementSibling;
    const isOpen = body.classList.contains('open');
    /* Close all */
    document.querySelectorAll('.acc-body.open').forEach(b => {
      b.classList.remove('open');
      b.previousElementSibling.classList.remove('open');
    });
    if (!isOpen) {
      body.classList.add('open');
      btn.classList.add('open');
    }
  }

  /* ══ SWATCH click delegation ══ */
  function initSwatchDelegation() {
    document.addEventListener('click', e => {
      if (e.target.classList.contains('swatch-dot')) {
        e.target.closest('.pcard-swatches')
          ?.querySelectorAll('.swatch-dot')
          .forEach(s => s.classList.remove('active'));
        e.target.classList.add('active');
      }
    });
  }

  return {
    showToast,
    openCart, closeCart,
    openAccount, closeAccount,
    openDrawer, closeDrawer,
    closeModal, closeAll,
    toggleWish, toggleModalWishlist,
    toggleAcc,
    initSwatchDelegation,
  };
})();
