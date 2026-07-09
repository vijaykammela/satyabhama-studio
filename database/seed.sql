-- ============================================================
-- Satyabhama Studio — seed data
-- Matches schema.sql EXACTLY (products + product_variants).
-- Run this AFTER schema.sql (do NOT run the old rls.sql — schema.sql
-- already creates the RLS policies you need; rls.sql references
-- `profiles` and `wishlist` tables that don't exist in this schema
-- and will error out).
-- ============================================================

-- ─────────────────────────────────────────
-- PRODUCTS
-- ─────────────────────────────────────────
insert into products (id, slug, name, brand, category, price, compare_at_price, description, images, rating, review_count, is_new_arrival, is_best_seller, is_on_sale, tags) values
('p01', 'red-dress-banarasi-silk',        'Red Dress',                    'Satyabhama Studio', 'sarees',      2499, 3200, 'Hand-woven Banarasi silk with zari border. Each piece tells a story of centuries-old craftsmanship from Varanasi.', '{}', 4.6, 18, true,  false, false, '{"banarasi","silk","zari"}'),
('p02', 'anarkali-suit-set',              'Anarkali Suit Set',            'Satyabhama Studio', 'suits',       1899, null, 'Floor-length anarkali with dupatta and churidar. Rich embroidery on the yoke and hem.', '{}', 4.4, 12, false, false, false, '{"anarkali","suit"}'),
('p03', 'embroidered-lehenga',            'Embroidered Lehenga',          'Satyabhama Studio', 'lehengas',    4999, null, 'Bridal-ready embroidered lehenga with heavy work blouse and matching dupatta. Perfect for festivities.', '{}', 4.8, 9,  false, true,  false, '{"bridal","lehenga","limited"}'),
('p04', 'rajasthani-block-print-kurti',   'Rajasthani Block Print Kurti', 'Satyabhama Studio', 'kurta-sets',  849,  1199, 'Authentic Rajasthani block print using natural dyes. Hand-stamped motifs on soft cotton.', '{}', 4.3, 27, false, false, true,  '{"block-print","cotton"}'),
('p05', 'chanderi-silk-kurta',            'Chanderi Silk Kurta',          'Satyabhama Studio', 'kurta-sets',  1299, null, 'Sheer chanderi silk with delicate floral weave. Lined with soft cotton. Perfect for festive occasions.', '{}', 4.5, 14, false, false, false, '{"chanderi","silk"}'),
('p06', 'floral-maxi-dress',              'Floral Maxi Dress',            'Satyabhama Studio', 'indo-western', 1299, 1799, 'Breezy rayon maxi with all-over floral print. V-neckline, smocked waist, flutter sleeves.', '{}', 4.2, 21, false, false, true,  '{"maxi","floral"}'),
('p07', 'palazzo-pants-set',              'Palazzo Pants Set',            'Satyabhama Studio', 'indo-western', 1099, null, 'Wide-leg palazzo set with coordinated crop top. Breathable cotton for all-day comfort.', '{}', 4.1, 16, false, false, false, '{"palazzo","co-ord"}'),
('p08', 'linen-co-ord-set',               'Linen Co-ord Set',             'Satyabhama Studio', 'indo-western', 1499, 1999, 'Relaxed linen blend co-ord in a muted palette. Shirt and wide-leg trouser. Resort-ready.', '{}', 4.4, 11, false, false, true,  '{"linen","co-ord"}'),
('p09', 'chanderi-kurta',                 'Chanderi Kurta',               'Satyabhama Studio', 'kurta-sets',  999,  null, 'Lightweight chanderi fabric with delicate block print. Pairs beautifully with jeans or palazzos.', '{}', 4.3, 19, false, false, false, '{"chanderi"}'),
('p10', 'denim-jacket-indo-western',      'Denim Jacket Indo-Western',    'Satyabhama Studio', 'indo-western', 1599, 2100, 'Classic denim jacket with hand-embroidered motifs on the back — the perfect fusion statement.', '{}', 4.6, 8,  false, false, true,  '{"denim","fusion"}'),
('p11', 'mirror-work-top',                'Mirror Work Top',              'Satyabhama Studio', 'indo-western', 1199, null, 'Intricate mirror work on a contemporary silhouette. Go from daytime casual to evening glam.', '{}', 4.5, 13, true,  false, false, '{"mirror-work"}'),
('p12', 'ikat-print-shirt-dress',         'Ikat Print Shirt Dress',       'Satyabhama Studio', 'indo-western', 1399, null, 'Traditional ikat weave in a modern shirt-dress silhouette. Belted waist, midi length.', '{}', 4.2, 10, false, false, false, '{"ikat"}'),
('p13', 'kanjivaram-silk-dupatta',        'Kanjivaram Silk Dupatta',      'Satyabhama Studio', 'jewelry',     799,  1100, 'Pure silk dupatta with temple border. A statement piece that transforms any outfit.', '{}', 4.7, 22, false, false, true,  '{"dupatta","kanjivaram"}'),
('p14', 'phulkari-dupatta',               'Phulkari Dupatta',             'Satyabhama Studio', 'jewelry',     649,  null, 'Vibrant Phulkari embroidery on cotton base. Each stitch is hand-done by artisans in Punjab.', '{}', 4.5, 17, true,  false, false, '{"dupatta","phulkari"}'),
('p15', 'silk-potli-bag',                 'Silk Potli Bag',               'Satyabhama Studio', 'jewelry',     499,  699,  'Hand-stitched silk potli with golden cord drawstring. The perfect accompaniment for ethnic wear.', '{}', 4.4, 30, false, false, true,  '{"bag","potli"}'),
('p16', 'kundan-jhumkas',                 'Kundan Jhumkas',               'Satyabhama Studio', 'jewelry',     399,  null, 'Traditional kundan-set jhumkas with gold finish. Lightweight for all-day wear.', '{}', 4.6, 35, false, true,  false, '{"jhumkas","kundan"}');

-- ─────────────────────────────────────────
-- PRODUCT VARIANTS (size / color / stock)
-- Stock split evenly across each product's original size range.
-- ─────────────────────────────────────────
insert into product_variants (product_id, size, color, color_hex, stock) values
-- p01 Red Dress — stock 25 across 5 sizes
('p01','XS','Indigo','#2350a2',5),('p01','S','Indigo','#2350a2',5),('p01','M','Indigo','#2350a2',5),('p01','L','Indigo','#2350a2',5),('p01','XL','Indigo','#2350a2',5),
-- p02 Anarkali Suit Set — stock 40 across 4 sizes
('p02','S','Rani Pink','#AD1457',10),('p02','M','Rani Pink','#AD1457',10),('p02','L','Rani Pink','#AD1457',10),('p02','XL','Rani Pink','#AD1457',10),
-- p03 Embroidered Lehenga — stock 8 across 4 sizes
('p03','XS','Crimson','#C62828',2),('p03','S','Crimson','#C62828',2),('p03','M','Crimson','#C62828',2),('p03','L','Crimson','#C62828',2),
-- p04 Rajasthani Block Print Kurti — stock 60 across 5 sizes
('p04','S','Rust','#BF360C',12),('p04','M','Rust','#BF360C',12),('p04','L','Rust','#BF360C',12),('p04','XL','Rust','#BF360C',12),('p04','XXL','Rust','#BF360C',12),
-- p05 Chanderi Silk Kurta — stock 30 across 5 sizes
('p05','XS','Deep Violet','#4527A0',6),('p05','S','Deep Violet','#4527A0',6),('p05','M','Deep Violet','#4527A0',6),('p05','L','Deep Violet','#4527A0',6),('p05','XL','Deep Violet','#4527A0',6),
-- p06 Floral Maxi Dress — stock 35 across 4 sizes
('p06','XS','Sky Blue','#0277BD',9),('p06','S','Sky Blue','#0277BD',9),('p06','M','Sky Blue','#0277BD',9),('p06','L','Sky Blue','#0277BD',8),
-- p07 Palazzo Pants Set — stock 45 across 5 sizes
('p07','XS','Teal','#004D40',9),('p07','S','Teal','#004D40',9),('p07','M','Teal','#004D40',9),('p07','L','Teal','#004D40',9),('p07','XL','Teal','#004D40',9),
-- p08 Linen Co-ord Set — stock 28 across 5 sizes
('p08','XS','Charcoal','#37474F',6),('p08','S','Charcoal','#37474F',6),('p08','M','Charcoal','#37474F',6),('p08','L','Charcoal','#37474F',5),('p08','XL','Charcoal','#37474F',5),
-- p09 Chanderi Kurta — stock 55 across 5 sizes
('p09','S','Teal Blue','#00838F',11),('p09','M','Teal Blue','#00838F',11),('p09','L','Teal Blue','#00838F',11),('p09','XL','Teal Blue','#00838F',11),('p09','XXL','Teal Blue','#00838F',11),
-- p10 Denim Jacket Indo-Western — stock 20 across 4 sizes
('p10','S','Denim Blue','#37474F',5),('p10','M','Denim Blue','#37474F',5),('p10','L','Denim Blue','#37474F',5),('p10','XL','Denim Blue','#37474F',5),
-- p11 Mirror Work Top — stock 38 across 4 sizes
('p11','XS','Magenta','#880E4F',10),('p11','S','Magenta','#880E4F',10),('p11','M','Magenta','#880E4F',9),('p11','L','Magenta','#880E4F',9),
-- p12 Ikat Print Shirt Dress — stock 22 across 5 sizes
('p12','XS','Cobalt','#1565C0',4),('p12','S','Cobalt','#1565C0',4),('p12','M','Cobalt','#1565C0',5),('p12','L','Cobalt','#1565C0',4),('p12','XL','Cobalt','#1565C0',5),
-- p13 Kanjivaram Silk Dupatta — stock 50, one size
('p13','One Size','Olive','#558B2F',50),
-- p14 Phulkari Dupatta — stock 42, one size
('p14','One Size','Marigold','#F57F17',42),
-- p15 Silk Potli Bag — stock 65, one size
('p15','One Size','Espresso','#4E342E',65),
-- p16 Kundan Jhumkas — stock 80, one size
('p16','One Size','Gold','#F9A825',80);
