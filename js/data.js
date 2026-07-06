// Mock "database" for the storefront. In production, replace PRODUCTS with
// data fetched from a real API/CMS (e.g. `const PRODUCTS = await fetch('/api/products').then(r => r.json())`).
// Every page reads through the helper functions at the bottom, never this
// array directly, so that swap only touches this one file.

const PRODUCTS = [
  {
    id: "p01", slug: "wool-cashmere-overcoat", name: "Wool-Cashmere Overcoat",
    brand: "Maison Verre", gender: "men", category: "outerwear",
    price: 495, currency: "USD",
    description: "A single-breasted overcoat cut from an Italian wool-cashmere blend. Structured shoulders, horn buttons, and a hand-finished collar built for a lifetime of winters.",
    images: [
      "https://images.unsplash.com/photo-1544923246-77307dd654cb?w=900&q=80",
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=900&q=80",
    ],
    variants: [
      { size: "S", color: "Camel", colorHex: "#C9A876", inStock: true },
      { size: "M", color: "Camel", colorHex: "#C9A876", inStock: true },
      { size: "L", color: "Camel", colorHex: "#C9A876", inStock: false },
      { size: "M", color: "Charcoal", colorHex: "#332F2C", inStock: true },
    ],
    rating: 4.8, reviewCount: 62, isNewArrival: true, isBestSeller: true, isOnSale: false,
    tags: ["outerwear", "winter", "wool"], createdAt: "2026-06-01",
  },
  {
    id: "p02", slug: "silk-slip-dress", name: "Silk Slip Dress",
    brand: "Maison Verre", gender: "women", category: "dresses",
    price: 260, compareAtPrice: 340, currency: "USD",
    description: "Cut on the bias from mulberry silk, this slip dress falls in a fluid column with adjustable straps and a cowl back.",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=900&q=80",
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=900&q=80",
    ],
    variants: [
      { size: "XS", color: "Champagne", colorHex: "#E9D9B8", inStock: true },
      { size: "S", color: "Champagne", colorHex: "#E9D9B8", inStock: true },
      { size: "M", color: "Black", colorHex: "#141414", inStock: true },
      { size: "L", color: "Black", colorHex: "#141414", inStock: true },
    ],
    rating: 4.6, reviewCount: 41, isNewArrival: false, isBestSeller: true, isOnSale: true,
    tags: ["dress", "silk", "eveningwear"], createdAt: "2026-04-12",
  },
  {
    id: "p03", slug: "merino-crewneck-sweater", name: "Merino Crewneck Sweater",
    brand: "Maison Verre", gender: "men", category: "knitwear",
    price: 165, currency: "USD",
    description: "Fine-gauge merino wool knit in a relaxed crewneck silhouette. Ribbed cuffs and hem, garment-dyed for a soft, worn-in hand feel.",
    images: [
      "https://images.unsplash.com/photo-1614251055880-ee96e4803393?w=900&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=900&q=80",
    ],
    variants: [
      { size: "S", color: "Ivory", colorHex: "#F3EEE3", inStock: true },
      { size: "M", color: "Ivory", colorHex: "#F3EEE3", inStock: true },
      { size: "L", color: "Forest", colorHex: "#33402F", inStock: true },
      { size: "XL", color: "Forest", colorHex: "#33402F", inStock: false },
    ],
    rating: 4.7, reviewCount: 88, isNewArrival: false, isBestSeller: true, isOnSale: false,
    tags: ["knitwear", "merino", "casual"], createdAt: "2026-02-20",
  },
  {
    id: "p04", slug: "tailored-linen-shirt", name: "Tailored Linen Shirt",
    brand: "Maison Verre", gender: "men", category: "shirts",
    price: 128, currency: "USD",
    description: "Breathable European linen shirt with a spread collar and mother-of-pearl buttons. Cut for a tailored, not tight, fit.",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=900&q=80",
      "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=900&q=80",
    ],
    variants: [
      { size: "S", color: "White", colorHex: "#FBFAF7", inStock: true },
      { size: "M", color: "White", colorHex: "#FBFAF7", inStock: true },
      { size: "M", color: "Sky", colorHex: "#A9C1CE", inStock: true },
      { size: "L", color: "Sky", colorHex: "#A9C1CE", inStock: true },
    ],
    rating: 4.5, reviewCount: 54, isNewArrival: true, isBestSeller: false, isOnSale: false,
    tags: ["shirt", "linen", "summer"], createdAt: "2026-05-18",
  },
  {
    id: "p05", slug: "pleated-wide-leg-trousers", name: "Pleated Wide-Leg Trousers",
    brand: "Maison Verre", gender: "women", category: "trousers",
    price: 210, currency: "USD",
    description: "High-waisted wide-leg trousers with a double pleat and a fluid drape, tailored from a wool-blend suiting fabric.",
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&q=80",
      "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=900&q=80",
    ],
    variants: [
      { size: "XS", color: "Taupe", colorHex: "#B7A794", inStock: true },
      { size: "S", color: "Taupe", colorHex: "#B7A794", inStock: true },
      { size: "M", color: "Black", colorHex: "#141414", inStock: true },
      { size: "L", color: "Black", colorHex: "#141414", inStock: true },
    ],
    rating: 4.4, reviewCount: 33, isNewArrival: true, isBestSeller: false, isOnSale: false,
    tags: ["trousers", "tailoring", "workwear"], createdAt: "2026-05-02",
  },
  {
    id: "p06", slug: "leather-belt-buckle", name: "Full-Grain Leather Belt",
    brand: "Maison Verre", gender: "unisex", category: "accessories",
    price: 95, currency: "USD",
    description: "Vegetable-tanned full-grain leather belt with a solid brass buckle. Ages beautifully with wear.",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900&q=80",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=900&q=80",
    ],
    variants: [
      { size: "S", color: "Cognac", colorHex: "#8A4B2E", inStock: true },
      { size: "M", color: "Cognac", colorHex: "#8A4B2E", inStock: true },
      { size: "L", color: "Black", colorHex: "#141414", inStock: true },
    ],
    rating: 4.9, reviewCount: 27, isNewArrival: false, isBestSeller: true, isOnSale: false,
    tags: ["accessories", "leather"], createdAt: "2026-01-15",
  },
  {
    id: "p07", slug: "cropped-blazer", name: "Cropped Wool Blazer",
    brand: "Maison Verre", gender: "women", category: "outerwear",
    price: 320, compareAtPrice: 400, currency: "USD",
    description: "A cropped blazer with a sharp shoulder line and satin lapel facing, built to layer over dresses or tailored trousers.",
    images: [
      "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=900&q=80",
      "https://images.unsplash.com/photo-1548624313-0396c75f5e4b?w=900&q=80",
    ],
    variants: [
      { size: "XS", color: "Black", colorHex: "#141414", inStock: true },
      { size: "S", color: "Black", colorHex: "#141414", inStock: true },
      { size: "M", color: "Bone", colorHex: "#EDE6D8", inStock: true },
    ],
    rating: 4.6, reviewCount: 19, isNewArrival: false, isBestSeller: false, isOnSale: true,
    tags: ["blazer", "outerwear", "tailoring"], createdAt: "2026-03-08",
  },
  {
    id: "p08", slug: "ribbed-turtleneck", name: "Ribbed Silk-Blend Turtleneck",
    brand: "Maison Verre", gender: "women", category: "knitwear",
    price: 145, currency: "USD",
    description: "A fine-ribbed turtleneck in a silk-cotton blend that layers cleanly under blazers or stands alone.",
    images: [
      "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=900&q=80",
      "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=900&q=80",
    ],
    variants: [
      { size: "XS", color: "Ecru", colorHex: "#EFE7D8", inStock: true },
      { size: "S", color: "Ecru", colorHex: "#EFE7D8", inStock: true },
      { size: "M", color: "Black", colorHex: "#141414", inStock: true },
      { size: "L", color: "Black", colorHex: "#141414", inStock: false },
    ],
    rating: 4.3, reviewCount: 22, isNewArrival: true, isBestSeller: false, isOnSale: false,
    tags: ["knitwear", "layering"], createdAt: "2026-05-28",
  },
  {
    id: "p09", slug: "oxford-dress-shirt", name: "Oxford Dress Shirt",
    brand: "Maison Verre", gender: "men", category: "shirts",
    price: 118, currency: "USD",
    description: "A crisp cotton oxford with a structured collar roll, designed to hold its shape from morning meetings into evening.",
    images: [
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=900&q=80",
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=900&q=80",
    ],
    variants: [
      { size: "S", color: "White", colorHex: "#FBFAF7", inStock: true },
      { size: "M", color: "White", colorHex: "#FBFAF7", inStock: true },
      { size: "L", color: "Navy", colorHex: "#28344A", inStock: true },
    ],
    rating: 4.5, reviewCount: 71, isNewArrival: false, isBestSeller: true, isOnSale: false,
    tags: ["shirt", "office", "cotton"], createdAt: "2026-01-30",
  },
  {
    id: "p10", slug: "tapered-chino-trouser", name: "Tapered Cotton Chino",
    brand: "Maison Verre", gender: "men", category: "trousers",
    price: 135, currency: "USD",
    description: "A tapered chino in brushed cotton twill with a clean front and a slightly cropped ankle break.",
    images: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=900&q=80",
      "https://images.unsplash.com/photo-1517438476312-10d79c077509?w=900&q=80",
    ],
    variants: [
      { size: "30", color: "Stone", colorHex: "#CBBFA6", inStock: true },
      { size: "32", color: "Stone", colorHex: "#CBBFA6", inStock: true },
      { size: "34", color: "Black", colorHex: "#141414", inStock: true },
    ],
    rating: 4.2, reviewCount: 38, isNewArrival: false, isBestSeller: false, isOnSale: false,
    tags: ["trousers", "chino", "casual"], createdAt: "2026-03-22",
  },
  {
    id: "p11", slug: "gold-hoop-earrings", name: "14k Gold Vermeil Hoops",
    brand: "Maison Verre", gender: "women", category: "accessories",
    price: 78, currency: "USD",
    description: "Lightweight gold vermeil hoops, hand-polished for a soft satin gleam. A daily-wear essential.",
    images: [
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=900&q=80",
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=900&q=80",
    ],
    variants: [
      { size: "One Size", color: "Gold", colorHex: "#B8935F", inStock: true },
    ],
    rating: 4.8, reviewCount: 46, isNewArrival: true, isBestSeller: true, isOnSale: false,
    tags: ["jewelry", "gold", "accessories"], createdAt: "2026-06-10",
  },
  {
    id: "p12", slug: "quilted-liner-jacket", name: "Quilted Liner Jacket",
    brand: "Maison Verre", gender: "unisex", category: "outerwear",
    price: 225, compareAtPrice: 280, currency: "USD",
    description: "A lightweight quilted jacket that layers under an overcoat or stands alone in transitional weather.",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=900&q=80",
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=900&q=80",
    ],
    variants: [
      { size: "S", color: "Olive", colorHex: "#5C5A45", inStock: true },
      { size: "M", color: "Olive", colorHex: "#5C5A45", inStock: true },
      { size: "L", color: "Black", colorHex: "#141414", inStock: true },
    ],
    rating: 4.4, reviewCount: 29, isNewArrival: false, isBestSeller: false, isOnSale: true,
    tags: ["outerwear", "quilted", "transitional"], createdAt: "2026-02-11",
  },
];

const CATEGORIES = [
  { slug: "outerwear", label: "Outerwear", image: "https://images.unsplash.com/photo-1544923246-77307dd654cb?w=700&q=80" },
  { slug: "dresses", label: "Dresses", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=700&q=80" },
  { slug: "knitwear", label: "Knitwear", image: "https://images.unsplash.com/photo-1614251055880-ee96e4803393?w=700&q=80" },
  { slug: "shirts", label: "Shirts", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=700&q=80" },
  { slug: "trousers", label: "Trousers", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=700&q=80" },
  { slug: "accessories", label: "Accessories", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&q=80" },
];

const TESTIMONIALS = [
  { id: "t1", name: "Amara Okafor", location: "London, UK", quote: "The overcoat is the best thing I've bought in years — the fabric and the fit both feel like they were made for me specifically.", rating: 5 },
  { id: "t2", name: "Daniel Reyes", location: "Austin, TX", quote: "Shipping was fast and every piece has arrived exactly as photographed. Rare for online fashion at this point.", rating: 5 },
  { id: "t3", name: "Priya Nair", location: "Hyderabad, IN", quote: "Quietly luxurious. Nothing shouts for attention, but everything is clearly considered down to the stitching.", rating: 4 },
];

// --- Data access helpers ----------------------------------------------
function getAllProducts() { return PRODUCTS; }
function getProductBySlug(slug) { return PRODUCTS.find((p) => p.slug === slug); }
function getNewArrivals() { return PRODUCTS.filter((p) => p.isNewArrival); }
function getBestSellers() { return PRODUCTS.filter((p) => p.isBestSeller); }
function getSaleProducts() { return PRODUCTS.filter((p) => p.isOnSale); }
function getRelatedProducts(product) {
  return PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);
}
