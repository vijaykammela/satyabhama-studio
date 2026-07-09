const WISHLIST_KEY = "maison-verre-wishlist";

function getWishlist() {
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
  } catch {
    return [];
  }
}

function isWishlisted(productId) {
  return getWishlist().includes(productId);
}

function toggleWishlist(productId, btnEl) {
  let list = getWishlist();
  if (list.includes(productId)) {
    list = list.filter((id) => id !== productId);
  } else {
    list.push(productId);
  }
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
  if (btnEl) {
    const icon = btnEl.querySelector("[data-heart]");
    if (icon) icon.classList.toggle("wishlisted", list.includes(productId));
  }
}
