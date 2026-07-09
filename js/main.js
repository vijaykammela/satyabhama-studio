/* ═══════════════════════════════════════
   js/main.js — App entry point
   Wires up event listeners and boots the app.
═══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  Products.renderSkeletons();

  if (window.UI && typeof UI.initSwatchDelegation === 'function') {
    UI.initSwatchDelegation();
  }

  const originalLoad = Products.load;
  Products.load = function (data) {
    window._allProducts = data;
    originalLoad(data);
  };

  document.querySelectorAll('.filter-chip').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-chip').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      Products.setFilter((btn.dataset.filter || '').toLowerCase());
    });
  });

  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      Products.setSort(e.target.value);
    });
  }

  DB.init();

  console.log('%cSatyabhama 🪷', 'font-size:16px;color:#8B2FC9;font-weight:bold');
  console.log('App initialized.');
});
