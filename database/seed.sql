-- ═══════════════════════════════════════════════════════
-- database/seed.sql
-- Satyabhama — Sample Product Data
--
-- Run this AFTER schema-fixed.sql and rls-fixed.sql
-- ═══════════════════════════════════════════════════════

INSERT INTO products
  (name, category, price, old_price, badge, emoji, bg_color, colors, sizes, description, image_url, in_stock, stock_qty)
VALUES

-- ── ETHNIC ──────────────────────────────
(
  'Red Dress', 'Ethnic',
  2499, 3200, 'New', '🥻', '#6A1B9A',
  '["#2350a2", "#697ede", "#c0cae9"]'::jsonb,
  '["XS", "S", "M", "L", "XL"]'::jsonb,
  'Hand-woven Banarasi silk with zari border. Each piece tells a story of centuries-old craftsmanship from Varanasi.',
  NULL,
  true, 25
),
(
  'Anarkali Suit Set', 'Ethnic',
  1899, NULL, NULL, '👘', '#AD1457',
  '["#AD1457", "#F9A825", "#1B5E20"]'::jsonb,
  '["S", "M", "L", "XL"]'::jsonb,
  'Floor-length anarkali with dupatta and churidar. Rich embroidery on the yoke and hem.',
  NULL,
  true, 40
),
(
  'Embroidered Lehenga', 'Ethnic',
  4999, NULL, 'Limited', '🌸', '#C62828',
  '["#C62828", "#880E4F", "#1A237E"]'::jsonb,
  '["XS", "S", "M", "L"]'::jsonb,
  'Bridal-ready embroidered lehenga with heavy work blouse and matching dupatta. Perfect for festivities.',
  NULL,
  true, 8
),
(
  'Rajasthani Block Print Kurti', 'Ethnic',
  849, 1199, 'Sale', '🟤', '#BF360C',
  '["#BF360C", "#F9A825", "#1B5E20"]'::jsonb,
  '["S", "M", "L", "XL", "XXL"]'::jsonb,
  'Authentic Rajasthani block print using natural dyes. Hand-stamped motifs on soft cotton.',
  NULL,
  true, 60
),
(
  'Chanderi Silk Kurta', 'Ethnic',
  1299, NULL, NULL, '🩱', '#4527A0',
  '["#4527A0", "#D4A017", "#1B5E20"]'::jsonb,
  '["XS", "S", "M", "L", "XL"]'::jsonb,
  'Sheer chanderi silk with delicate floral weave. Lined with soft cotton. Perfect for festive occasions.',
  NULL,
  true, 30
),

-- ── WESTERN ─────────────────────────────
(
  'Floral Maxi Dress', 'Western',
  1299, 1799, 'Sale', '👗', '#0277BD',
  '["#0277BD", "#F06292", "#FFF9C4"]'::jsonb,
  '["XS", "S", "M", "L"]'::jsonb,
  'Breezy rayon maxi with all-over floral print. V-neckline, smocked waist, flutter sleeves.',
  NULL,
  true, 35
),
(
  'Palazzo Pants Set', 'Western',
  1099, NULL, NULL, '👖', '#004D40',
  '["#004D40", "#00695C", "#BF360C"]'::jsonb,
  '["XS", "S", "M", "L", "XL"]'::jsonb,
  'Wide-leg palazzo set with coordinated crop top. Breathable cotton for all-day comfort.',
  NULL,
  true, 45
),
(
  'Linen Co-ord Set', 'Western',
  1499, 1999, 'Sale', '🩳', '#37474F',
  '["#37474F", "#546E7A", "#ECEFF1"]'::jsonb,
  '["XS", "S", "M", "L", "XL"]'::jsonb,
  'Relaxed linen blend co-ord in a muted palette. Shirt and wide-leg trouser. Resort-ready.',
  NULL,
  true, 28
),

-- ── FUSION ──────────────────────────────
(
  'Chanderi Kurta', 'Fusion',
  999, NULL, NULL, '🩱', '#00838F',
  '["#00838F", "#FF7043", "#78909C"]'::jsonb,
  '["S", "M", "L", "XL", "XXL"]'::jsonb,
  'Lightweight chanderi fabric with delicate block print. Pairs beautifully with jeans or palazzos.',
  NULL,
  true, 55
),
(
  'Denim Jacket Indo-Western', 'Fusion',
  1599, 2100, 'Sale', '🧥', '#37474F',
  '["#37474F", "#5D4037", "#1565C0"]'::jsonb,
  '["S", "M", "L", "XL"]'::jsonb,
  'Classic denim jacket with hand-embroidered motifs on the back — the perfect fusion statement.',
  NULL,
  true, 20
),
(
  'Mirror Work Top', 'Fusion',
  1199, NULL, 'New', '✨', '#880E4F',
  '["#880E4F", "#1A237E", "#004D40"]'::jsonb,
  '["XS", "S", "M", "L"]'::jsonb,
  'Intricate mirror work on a contemporary silhouette. Go from daytime casual to evening glam.',
  NULL,
  true, 38
),
(
  'Ikat Print Shirt Dress', 'Fusion',
  1399, NULL, NULL, '👘', '#1565C0',
  '["#1565C0", "#AD1457", "#2E7D32"]'::jsonb,
  '["XS", "S", "M", "L", "XL"]'::jsonb,
  'Traditional ikat weave in a modern shirt-dress silhouette. Belted waist, midi length.',
  NULL,
  true, 22
),

-- ── ACCESSORIES ─────────────────────────
(
  'Kanjivaram Silk Dupatta', 'Accessories',
  799, 1100, 'Sale', '🧣', '#558B2F',
  '["#558B2F", "#6A1B9A", "#D4A017"]'::jsonb,
  '["One Size"]'::jsonb,
  'Pure silk dupatta with temple border. A statement piece that transforms any outfit.',
  NULL,
  true, 50
),
(
  'Phulkari Dupatta', 'Accessories',
  649, NULL, 'New', '🌺', '#F57F17',
  '["#F57F17", "#B71C1C", "#1B5E20"]'::jsonb,
  '["One Size"]'::jsonb,
  'Vibrant Phulkari embroidery on cotton base. Each stitch is hand-done by artisans in Punjab.',
  NULL,
  true, 42
),
(
  'Silk Potli Bag', 'Accessories',
  499, 699, 'Sale', '👜', '#4E342E',
  '["#4E342E", "#880E4F", "#F57F17"]'::jsonb,
  '["One Size"]'::jsonb,
  'Hand-stitched silk potli with golden cord drawstring. The perfect accompaniment for ethnic wear.',
  NULL,
  true, 65
),
(
  'Kundan Jhumkas', 'Accessories',
  399, NULL, NULL, '💛', '#F9A825',
  '["#F9A825", "#C62828", "#1A237E"]'::jsonb,
  '["One Size"]'::jsonb,
  'Traditional kundan-set jhumkas with gold finish. Lightweight for all-day wear.',
  NULL,
  true, 80
);
