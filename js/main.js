/* ═══════════════════════════════════════
   js/main.js — App entry point
   Wires up event listeners and boots the app.
═══════════════════════════════════════ */

/* ── Wait for DOM + deferred scripts ── */
document.addEventListener('DOMContentLoaded', () => {

  /* 1. Show skeleton cards immediately */
  Products.renderSkeletons();

  /* 2. Swatch click delegation */
  UI.initSwatchDelegation();

  /* 3. Filter chips */
  document.querySelectorAll('.filter-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      Products.setFilter(btn.dataset.filter);
    });
  });

  /* 4. Sort select */
  document.getElementById('sortSelect').addEventListener('change', e => {
    Products.setSort(e.target.value);
  });

  /* 5. Boot Supabase (fetches products or loads demo data) */
  DB.init();

  /* 6. Expose product list globally so Cart.quickAdd can look up by id */
  const _origLoad = Products.load;
  // We patch load to store products in a global reference for cart use
  // This avoids circular module dependencies
  const origLoad = Products.load;
  Products.load = function(data) {
    window._allProducts = data;
    origLoad(data);
  };

  console.log('%cSatyabhama 🪷', 'font-size:16px;color:#8B2FC9;font-weight:bold');
  console.log('To connect your Supabase database, edit js/config.js and set SUPABASE_URL and SUPABASE_ANON.');
});
