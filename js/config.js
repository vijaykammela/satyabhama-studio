/* ═══════════════════════════════════════
   js/config.js — Configuration
   ⚠️  Replace the two values below with your
       actual Supabase project credentials.
   Dashboard → Project Settings → API
═══════════════════════════════════════ */
const CONFIG = {
  SUPABASE_URL:  'https://YOUR_PROJECT_ID.supabase.co',
  SUPABASE_ANON: 'YOUR_ANON_PUBLIC_KEY',
  PAGE_SIZE: 12,
};

/* ── DEMO PRODUCTS ──────────────────────
   Used automatically when Supabase is not
   yet configured. Structure mirrors the DB.
──────────────────────────────────────── */
const DEMO_PRODUCTS = [
  {
    id: 1, name: 'Banarasi Silk Saree', category: 'Ethnic',
    price: 2499, old_price: 3200, badge: 'New',
    emoji: '🥻', bg: '#6A1B9A',
    colors: ['#6A1B9A', '#D4A017', '#C62828'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Hand-woven Banarasi silk with zari border. Each piece tells a story of centuries-old craftsmanship from Varanasi.',
  },
  {
    id: 2, name: 'Anarkali Suit Set', category: 'Ethnic',
    price: 1899, old_price: null, badge: null,
    emoji: '👘', bg: '#AD1457',
    colors: ['#AD1457', '#F9A825', '#1B5E20'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Floor-length anarkali with dupatta and churidar. Rich embroidery on the yoke and hem.',
  },
  {
    id: 3, name: 'Floral Maxi Dress', category: 'Western',
    price: 1299, old_price: 1799, badge: 'Sale',
    emoji: '👗', bg: '#0277BD',
    colors: ['#0277BD', '#F06292', '#FFF9C4'],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Breezy rayon maxi with all-over floral print. V-neckline, smocked waist, flutter sleeves.',
  },
  {
    id: 4, name: 'Chanderi Kurta', category: 'Fusion',
    price: 999, old_price: null, badge: null,
    emoji: '🩱', bg: '#00838F',
    colors: ['#00838F', '#FF7043', '#78909C'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Lightweight chanderi fabric with delicate block print. Pairs beautifully with jeans or palazzos.',
  },
  {
    id: 5, name: 'Kanjivaram Silk Dupatta', category: 'Accessories',
    price: 799, old_price: 1100, badge: 'Sale',
    emoji: '🧣', bg: '#558B2F',
    colors: ['#558B2F', '#6A1B9A', '#D4A017'],
    sizes: ['One Size'],
    description: 'Pure silk dupatta with temple border. A statement piece that transforms any outfit.',
  },
  {
    id: 6, name: 'Embroidered Lehenga', category: 'Ethnic',
    price: 4999, old_price: null, badge: 'Limited',
    emoji: '🌸', bg: '#C62828',
    colors: ['#C62828', '#880E4F', '#1A237E'],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Bridal-ready embroidered lehenga with heavy work blouse and matching dupatta. Perfect for festivities.',
  },
  {
    id: 7, name: 'Denim Jacket (Indo-Western)', category: 'Fusion',
    price: 1599, old_price: 2100, badge: 'Sale',
    emoji: '🧥', bg: '#37474F',
    colors: ['#37474F', '#5D4037', '#1565C0'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Classic denim jacket with hand-embroidered motifs on the back — the perfect fusion statement.',
  },
  {
    id: 8, name: 'Phulkari Dupatta', category: 'Accessories',
    price: 649, old_price: null, badge: 'New',
    emoji: '🌺', bg: '#F57F17',
    colors: ['#F57F17', '#B71C1C', '#1B5E20'],
    sizes: ['One Size'],
    description: 'Vibrant Phulkari embroidery on cotton base. Each stitch is hand-done by artisans in Punjab.',
  },
  {
    id: 9, name: 'Palazzo Pants Set', category: 'Western',
    price: 1099, old_price: null, badge: null,
    emoji: '👖', bg: '#4527A0',
    colors: ['#4527A0', '#00695C', '#BF360C'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Wide-leg palazzo set with coordinated crop top. Breathable cotton for all-day comfort.',
  },
  {
    id: 10, name: 'Rajasthani Block Print Kurti', category: 'Ethnic',
    price: 849, old_price: 1199, badge: 'Sale',
    emoji: '🟤', bg: '#BF360C',
    colors: ['#BF360C', '#F9A825', '#1B5E20'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Authentic Rajasthani block print using natural dyes. Hand-stamped motifs on soft cotton.',
  },
  {
    id: 11, name: 'Mirror Work Top', category: 'Fusion',
    price: 1199, old_price: null, badge: 'New',
    emoji: '✨', bg: '#880E4F',
    colors: ['#880E4F', '#1A237E', '#004D40'],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Intricate mirror work on a contemporary silhouette. Go from daytime casual to evening glam.',
  },
  {
    id: 12, name: 'Silk Potli Bag', category: 'Accessories',
    price: 499, old_price: 699, badge: 'Sale',
    emoji: '👜', bg: '#4E342E',
    colors: ['#4E342E', '#880E4F', '#F57F17'],
    sizes: ['One Size'],
    description: 'Hand-stitched silk potli with golden cord drawstring. The perfect accompaniment for ethnic wear.',
  },
];
