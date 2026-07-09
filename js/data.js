// Mock "database" for the storefront. In production, replace PRODUCTS with
// data fetched from a real API/CMS (e.g. `const PRODUCTS = await fetch('/api/products').then(r => r.json())`).
// Every page reads through the helper functions at the bottom, never this
// array directly, so that swap only touches this one file.
//
// NOTE: images below are generic editorial fashion stock photography used
// as visual placeholders (Unsplash). Swap these for real product
// photography of your own pieces before launch — sarees, lehengas, and
// suits look very different from one brand to the next, and real photos
// will convert far better than generic stock.

const PRODUCTS = [
  {
    id: "p01", slug: "banarasi-silk-saree", name: "Banarasi Silk Saree",
    brand: "Satyabhama Studio", category: "sarees",
    price: 8500, currency: "INR",
    description: "A handwoven Banarasi silk saree with a rich zari border and pallu, finished with traditional motifs. Comes with an unstitched matching blouse piece.",
    images: [
      "https://images.unsplash.com/photo-1610189844697-267a4c9df9aa?w=900&q=80",
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=900&q=80",
    ],
    variants: [
      { size: "Free Size", color: "Maroon", colorHex: "#7A1F2B", inStock: true },
      { size: "Free Size", color: "Emerald", colorHex: "#1F5B41", inStock: true },
      { size: "Free Size", color: "Gold", colorHex: "#B8935F", inStock: false },
    ],
    rating: 4.8, reviewCount: 54, isNewArrival: true, isBestSeller: true, isOnSale: false,
    tags: ["saree", "silk", "wedding", "banarasi"], createdAt: "2026-06-01",
  },
  {
    id: "p02", slug: "chiffon-printed-saree", name: "Chiffon Printed Saree",
    brand: "Satyabhama Studio", category: "sarees",
    price: 4200, currency: "INR",
    description: "A lightweight chiffon saree in a hand-block floral print, ideal for daytime events and easy draping.",
    images: [
      "https://images.unsplash.com/photo-1610189000041-6c78276477e2?w=900&q=80",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=900&q=80",
    ],
    variants: [
      { size: "Free Size", color: "Blush", colorHex: "#E7C7C2", inStock: true },
      { size: "Free Size", color: "Sky", colorHex: "#A9C1CE", inStock: true },
    ],
    rating: 4.5, reviewCount: 31, isNewArrival: false, isBestSeller: false, isOnSale: false,
    tags: ["saree", "chiffon", "daywear"], createdAt: "2026-03-14",
  },
  {
    id: "p03", slug: "bridal-lehenga-set", name: "Bridal Lehenga Set",
    brand: "Satyabhama Studio", category: "lehengas",
    price: 24999, compareAtPrice: 29999, currency: "INR",
    description: "A hand-embroidered bridal lehenga in raw silk with zardozi work, paired with a matching dupatta and blouse.",
    images: [
      "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=900&q=80",
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=900&q=80",
    ],
    variants: [
      { size: "S", color: "Red", colorHex: "#9B1B30", inStock: true },
      { size: "M", color: "Red", colorHex: "#9B1B30", inStock: true },
      { size: "M", color: "Wine", colorHex: "#5C1A2E", inStock: true },
      { size: "L", color: "Wine", colorHex: "#5C1A2E", inStock: false },
    ],
    rating: 4.9, reviewCount: 22, isNewArrival: true, isBestSeller: true, isOnSale: true,
    tags: ["lehenga", "bridal", "wedding"], createdAt: "2026-05-20",
  },
  {
    id: "p04", slug: "georgette-lehenga", name: "Georgette Lehenga",
    brand: "Satyabhama Studio", category: "lehengas",
    price: 12500, currency: "INR",
    description: "A flowing georgette lehenga with sequin embroidery, light enough for sangeet nights and festive dinners.",
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=900&q=80",
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=900&q=80",
    ],
    variants: [
      { size: "XS", color: "Teal", colorHex: "#215D63", inStock: true },
      { size: "S", color: "Teal", colorHex: "#215D63", inStock: true },
      { size: "M", color: "Blush", colorHex: "#E7C7C2", inStock: true },
    ],
    rating: 4.4, reviewCount: 18, isNewArrival: false, isBestSeller: false, isOnSale: false,
    tags: ["lehenga", "festive", "georgette"], createdAt: "2026-02-25",
  },
  {
    id: "p05", slug: "embroidered-kurta-set", name: "Embroidered Kurta Set",
    brand: "Satyabhama Studio", category: "kurta-sets",
    price: 3200, currency: "INR",
    description: "A three-piece kurta set in mulmul cotton with chikankari-inspired embroidery, paired with matching palazzos and a dupatta.",
    images: [
      "https://images.unsplash.com/photo-1614251055880-ee96e4803393?w=900&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=900&q=80",
    ],
    variants: [
      { size: "S", color: "Ivory", colorHex: "#F3EEE3", inStock: true },
      { size: "M", color: "Ivory", colorHex: "#F3EEE3", inStock: true },
      { size: "L", color: "Mint", colorHex: "#B9D3C4", inStock: true },
    ],
    rating: 4.6, reviewCount: 47, isNewArrival: false, isBestSeller: true, isOnSale: false,
    tags: ["kurta", "cotton", "everyday"], createdAt: "2026-01-30",
  },
  {
    id: "p06", slug: "cotton-kurta-set", name: "Cotton Kurta Set",
    brand: "Satyabhama Studio", category: "kurta-sets",
    price: 1800, currency: "INR",
    description: "A breathable everyday kurta set in pure cotton with a simple thread-work neckline — an easy staple for the week.",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=900&q=80",
      "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=900&q=80",
    ],
    variants: [
      { size: "S", color: "White", colorHex: "#FBFAF7", inStock: true },
      { size: "M", color: "White", colorHex: "#FBFAF7", inStock: true },
      { size: "L", color: "Mustard", colorHex: "#C6952A", inStock: true },
    ],
    rating: 4.2, reviewCount: 63, isNewArrival: false, isBestSeller: false, isOnSale: false,
    tags: ["kurta", "cotton", "casual"], createdAt: "2026-04-02",
  },
  {
    id: "p07", slug: "anarkali-suit", name: "Anarkali Suit",
    brand: "Satyabhama Studio", category: "suits",
    price: 5600, currency: "INR",
    description: "A floor-length Anarkali suit in georgette with delicate embroidery along the yoke, paired with matching churidar and dupatta.",
    images: [
      "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=900&q=80",
      "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=900&q=80",
    ],
    variants: [
      { size: "S", color: "Navy", colorHex: "#28344A", inStock: true },
      { size: "M", color: "Navy", colorHex: "#28344A", inStock: true },
      { size: "M", color: "Rani Pink", colorHex: "#B23570", inStock: true },
    ],
    rating: 4.7, reviewCount: 29, isNewArrival: true, isBestSeller: false, isOnSale: false,
    tags: ["suit", "anarkali", "festive"], createdAt: "2026-05-05",
  },
  {
    id: "p08", slug: "palazzo-suit-set", name: "Palazzo Suit Set",
    brand: "Satyabhama Studio", category: "suits",
    price: 4100, currency: "INR",
    description: "A relaxed palazzo suit set in printed rayon, cut for all-day comfort with a flattering wide-leg silhouette.",
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&q=80",
      "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=900&q=80",
    ],
    variants: [
      { size: "XS", color: "Coral", colorHex: "#D97B5B", inStock: true },
      { size: "S", color: "Coral", colorHex: "#D97B5B", inStock: true },
      { size: "M", color: "Indigo", colorHex: "#2E3E6B", inStock: true },
    ],
    rating: 4.3, reviewCount: 25, isNewArrival: false, isBestSeller: false, isOnSale: false,
    tags: ["suit", "palazzo", "casual"], createdAt: "2026-03-18",
  },
  {
    id: "p09", slug: "indo-western-cape-dress", name: "Indo-Western Cape Dress",
    brand: "Satyabhama Studio", category: "indo-western",
    price: 6800, compareAtPrice: 8200, currency: "INR",
    description: "A dress-and-cape set that pairs a fitted inner dress with a flowing embroidered cape — festive with a modern silhouette.",
    images: [
      "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=900&q=80",
      "https://images.unsplash.com/photo-1548624313-0396c75f5e4b?w=900&q=80",
    ],
    variants: [
      { size: "S", color: "Black", colorHex: "#141414", inStock: true },
      { size: "M", color: "Black", colorHex: "#141414", inStock: true },
      { size: "M", color: "Bottle Green", colorHex: "#1F4038", inStock: true },
    ],
    rating: 4.6, reviewCount: 16, isNewArrival: false, isBestSeller: false, isOnSale: true,
    tags: ["indo-western", "cape", "party"], createdAt: "2026-02-10",
  },
  {
    id: "p10", slug: "draped-indo-western-gown", name: "Draped Indo-Western Gown",
    brand: "Satyabhama Studio", category: "indo-western",
    price: 9500, currency: "INR",
    description: "A pre-draped saree-gown hybrid in shimmer georgette, built for sangeet and reception nights with zero draping effort.",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=900&q=80",
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=900&q=80",
    ],
    variants: [
      { size: "S", color: "Champagne", colorHex: "#E9D9B8", inStock: true },
      { size: "M", color: "Champagne", colorHex: "#E9D9B8", inStock: true },
      { size: "L", color: "Black", colorHex: "#141414", inStock: false },
    ],
    rating: 4.5, reviewCount: 12, isNewArrival: true, isBestSeller: false, isOnSale: false,
    tags: ["indo-western", "gown", "reception"], createdAt: "2026-05-29",
  },
  {
    id: "p11", slug: "kundan-jewelry-set", name: "Kundan Jewelry Set",
    brand: "Satyabhama Studio", category: "jewelry",
    price: 2400, currency: "INR",
    description: "A statement Kundan necklace and earring set with a pearl drop finish — built to anchor a festive or bridal look.",
    images: [
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=900&q=80",
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=900&q=80",
    ],
    variants: [
      { size: "One Size", color: "Gold", colorHex: "#B8935F", inStock: true },
    ],
    rating: 4.8, reviewCount: 38, isNewArrival: true, isBestSeller: true, isOnSale: false,
    tags: ["jewelry", "kundan", "bridal"], createdAt: "2026-06-10",
  },
  {
    id: "p12", slug: "jhumka-earrings", name: "Jhumka Earrings",
    brand: "Satyabhama Studio", category: "jewelry",
    price: 950, currency: "INR",
    description: "Classic gold-toned jhumka earrings with a bell drop — an everyday-to-festive staple.",
    images: [
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=900&q=80",
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=900&q=80",
    ],
    variants: [
      { size: "One Size", color: "Gold", colorHex: "#B8935F", inStock: true },
    ],
    rating: 4.4, reviewCount: 44, isNewArrival: false, isBestSeller: false, isOnSale: false,
    tags: ["jewelry", "jhumka", "earrings"], createdAt: "2026-01-15",
  },
];

const CATEGORIES = [
  { slug: "sarees", label: "Sarees", image: "https://images.unsplash.com/photo-1610189844697-267a4c9df9aa?w=700&q=80" },
  { slug: "lehengas", label: "Lehengas", image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=700&q=80" },
  { slug: "kurta-sets", label: "Kurta Sets", image: "https://images.unsplash.com/photo-1614251055880-ee96e4803393?w=700&q=80" },
  { slug: "suits", label: "Suits", image: "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=700&q=80" },
  { slug: "indo-western", label: "Indo-Western", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=700&q=80" },
  { slug: "jewelry", label: "Jewelry", image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=700&q=80" },
];

const TESTIMONIALS = [
  { id: "t1", name: "Ananya Rao", location: "Hyderabad, IN", quote: "The Banarasi saree was even more beautiful in person — the zari work is exactly what I hoped for my sister's wedding.", rating: 5 },
  { id: "t2", name: "Meera Iyer", location: "Bengaluru, IN", quote: "Ordered the kurta set for everyday wear and it's now on repeat in my closet. Fabric feels premium, not mass-produced.", rating: 5 },
  { id: "t3", name: "Priya Nair", location: "Kochi, IN", quote: "The lehenga arrived well before my event with careful packaging. Sizing was spot on with the size guide.", rating: 4 },
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
