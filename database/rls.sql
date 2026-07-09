-- ═══════════════════════════════════════════════════════
-- database/rls.sql
-- Satyabhama — Row Level Security Policies
--
-- Run this AFTER schema.sql
-- ═══════════════════════════════════════════════════════

-- ─────────────────────────────────────────
-- Enable RLS on all tables
-- ─────────────────────────────────────────
ALTER TABLE products    ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles    ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders      ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist    ENABLE ROW LEVEL SECURITY;

-- ─────────────────────────────────────────
-- PRODUCTS — anyone can read, no public write
-- ─────────────────────────────────────────
DROP POLICY IF EXISTS "Public can read products" ON products;
CREATE POLICY "Public can read products"
  ON products FOR SELECT
  USING (true);
-- Note: INSERT/UPDATE/DELETE on products should be done from Supabase dashboard
-- or a secure server/admin route using the service role key.

-- ─────────────────────────────────────────
-- PROFILES — users manage their own
-- ─────────────────────────────────────────
DROP POLICY IF EXISTS "Users read own profile" ON profiles;
CREATE POLICY "Users read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users insert own profile" ON profiles;
CREATE POLICY "Users insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users update own profile" ON profiles;
CREATE POLICY "Users update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ─────────────────────────────────────────
-- ORDERS — users see and create their own
-- ─────────────────────────────────────────
DROP POLICY IF EXISTS "Users manage own orders" ON orders;
CREATE POLICY "Users manage own orders"
  ON orders FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ─────────────────────────────────────────
-- ORDER ITEMS — accessible via parent order
-- ─────────────────────────────────────────
DROP POLICY IF EXISTS "Users manage own order items" ON order_items;
DROP POLICY IF EXISTS "Users see own order items" ON order_items;
CREATE POLICY "Users manage own order items"
  ON order_items FOR ALL
  USING (
    order_id IN (
      SELECT id
      FROM orders
      WHERE user_id = auth.uid()
    )
  )
  WITH CHECK (
    order_id IN (
      SELECT id
      FROM orders
      WHERE user_id = auth.uid()
    )
  );

-- ─────────────────────────────────────────
-- WISHLIST — users manage their own
-- ─────────────────────────────────────────
DROP POLICY IF EXISTS "Users manage own wishlist" ON wishlist;
CREATE POLICY "Users manage own wishlist"
  ON wishlist FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
