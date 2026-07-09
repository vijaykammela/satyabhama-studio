document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu
  const menuBtn = document.getElementById("mobile-menu-btn");
  const mobileNav = document.getElementById("mobile-nav");
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", () => {
      mobileNav.classList.toggle("hidden");
    });
  }

  // Header search
  const searchBtn = document.getElementById("search-toggle-btn");
  const searchPanel = document.getElementById("search-panel");
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");

  if (searchBtn && searchPanel) {
    searchBtn.addEventListener("click", () => {
      searchPanel.classList.toggle("hidden");
      if (!searchPanel.classList.contains("hidden") && searchInput) searchInput.focus();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const q = searchInput.value.trim().toLowerCase();
      if (!q) {
        searchResults.innerHTML = "";
        return;
      }
      const matches = PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      ).slice(0, 5);

      searchResults.innerHTML = matches
        .map(
          (p) => `
        <a href="product.html?slug=${p.slug}" class="flex items-center gap-3 px-4 py-3 hover:bg-sand/40">
          <div class="relative h-12 w-10 flex-shrink-0 overflow-hidden bg-sand/40">
            <img src="${p.images[0]}" alt="${p.name}" class="h-full w-full object-cover" />
          </div>
          <div>
            <p class="text-sm text-ink">${p.name}</p>
            <p class="text-xs text-charcoal/60">${formatPrice(p.price)}</p>
          </div>
        </a>`
        )
        .join("");
    });
  }
});

// Simulates a successful form submission (newsletter/contact) without a
// real backend. Replace with a fetch() to your own API route later.
function simulateFormSubmit(formEl, successMessageEl) {
  formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    formEl.classList.add("hidden");
    successMessageEl.classList.remove("hidden");
  });
}
