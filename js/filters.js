const ALL_CATEGORIES = ["outerwear", "dresses", "knitwear", "shirts", "trousers", "accessories"];
const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "popularity", label: "Most Popular" },
];

function filterAndSortProducts(products, params) {
  let result = [...products];

  if (params.category) {
    const cats = params.category.split(",").filter(Boolean);
    if (cats.length) result = result.filter((p) => cats.includes(p.category));
  }
  if (params.gender) {
    result = result.filter((p) => p.gender === params.gender || p.gender === "unisex");
  }
  if (params.maxPrice) {
    const max = Number(params.maxPrice);
    if (!Number.isNaN(max)) result = result.filter((p) => p.price <= max);
  }
  if (params.sale === "true") {
    result = result.filter((p) => p.isOnSale);
  }
  if (params.q) {
    const q = params.q.toLowerCase();
    result = result.filter((p) => p.name.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q)));
  }

  switch (params.sort) {
    case "price-asc": result.sort((a, b) => a.price - b.price); break;
    case "price-desc": result.sort((a, b) => b.price - a.price); break;
    case "popularity": result.sort((a, b) => b.reviewCount - a.reviewCount); break;
    default: result.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }
  return result;
}

function getSearchParams() {
  return Object.fromEntries(new URLSearchParams(window.location.search));
}

/**
 * Wires up a filter/sort toolbar + product grid + result count.
 * `fixedParams` are params baked into the page (e.g. { gender: "women" }
 * on a category page) that the user cannot change via the toolbar.
 */
function initFilterablePage(gridEl, countEl, fixedParams = {}) {
  const barEl = document.getElementById("filter-bar");

  function currentParams() {
    return { ...getSearchParams() };
  }

  function render() {
    const params = { ...currentParams(), ...fixedParams };
    const filtered = filterAndSortProducts(getAllProducts(), params);
    renderProductGrid(gridEl, filtered);
    if (countEl) countEl.textContent = `${filtered.length} products`;
  }

  function setParam(key, value) {
    const params = new URLSearchParams(window.location.search);
    if (value) params.set(key, value);
    else params.delete(key);
    history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
    render();
  }

  if (barEl) {
    const activeCategories = (currentParams().category || "").split(",").filter(Boolean);
    const sort = currentParams().sort || "newest";
    const maxPrice = currentParams().maxPrice || "500";

    barEl.innerHTML = `
      <div class="mb-8 border-b border-ink/10 pb-6">
        <div class="flex items-center justify-between gap-4">
          <button id="filter-toggle" class="flex items-center gap-2 text-xs uppercase tracking-widest2 text-ink">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/><circle cx="9" cy="6" r="2" fill="white"/><circle cx="15" cy="12" r="2" fill="white"/><circle cx="9" cy="18" r="2" fill="white"/></svg>
            Filter${activeCategories.length ? ` (${activeCategories.length})` : ""}
          </button>
          <label class="flex items-center gap-2 text-xs uppercase tracking-widest2 text-ink">
            Sort
            <select id="sort-select" class="border border-ink/20 bg-ivory px-2 py-1.5 text-xs normal-case tracking-normal">
              ${SORT_OPTIONS.map((s) => `<option value="${s.value}" ${sort === s.value ? "selected" : ""}>${s.label}</option>`).join("")}
            </select>
          </label>
        </div>
        <div id="filter-panel" class="mt-5 hidden flex-col gap-6 sm:flex-row sm:items-start">
          <div>
            <p class="mb-3 text-xs uppercase tracking-widest2 text-charcoal/60">Category</p>
            <div class="flex flex-wrap gap-2" id="category-chips">
              ${ALL_CATEGORIES.map(
                (cat) => `<button data-cat="${cat}" class="cat-chip border px-3 py-1.5 text-xs capitalize transition-colors ${
                  activeCategories.includes(cat) ? "border-ink bg-ink text-ivory" : "border-ink/20 text-ink hover:border-ink"
                }">${cat}</button>`
              ).join("")}
            </div>
          </div>
          <div class="min-w-[220px]">
            <p class="mb-3 text-xs uppercase tracking-widest2 text-charcoal/60">Max price: $<span id="max-price-label">${maxPrice}</span></p>
            <input id="price-range" type="range" min="50" max="500" step="10" value="${maxPrice}" class="w-full" />
          </div>
        </div>
      </div>`;

    document.getElementById("filter-toggle").addEventListener("click", () => {
      document.getElementById("filter-panel").classList.toggle("hidden");
      document.getElementById("filter-panel").classList.toggle("flex");
    });
    document.getElementById("sort-select").addEventListener("change", (e) => setParam("sort", e.target.value));
    document.getElementById("price-range").addEventListener("input", (e) => {
      document.getElementById("max-price-label").textContent = e.target.value;
    });
    document.getElementById("price-range").addEventListener("change", (e) => setParam("maxPrice", e.target.value));
    document.querySelectorAll(".cat-chip").forEach((btn) => {
      btn.addEventListener("click", () => {
        const cat = btn.dataset.cat;
        const next = activeCategories.includes(cat)
          ? activeCategories.filter((c) => c !== cat)
          : [...activeCategories, cat];
        setParam("category", next.length ? next.join(",") : null);
      });
    });
  }

  render();
}
