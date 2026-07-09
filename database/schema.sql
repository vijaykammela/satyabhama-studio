-- ═══════════════════════════════════════════════════════
-- database/schema.sql
-- Satyabhama — Full Supabase Database Schema
--
-- HOW TO USE:
--   1. Go to https://app.supabase.com → your project
--   2. Click "SQL Editor" in the left sidebar
--   3. Click "New query"
--   4. Paste this entire file and click "Run"
-- ═══════════════════════════════════════════════════════


-- ─────────────────────────────────────────
-- 1. PRODUCTS
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id          bigserial    PRIMARY KEY,
  name        text         NOT NULL,
  category    text         NOT NULL DEFAULT 'Ethnic',
  -- category must be one of: Ethnic | Western | Fusion | Accessories
  price       integer      NOT NULL CHECK (price > 0),
  old_price   integer      CHECK (old_price IS NULL OR old_price > price),
  badge       text         CHECK (badge IN ('New', 'Sale', 'Limited') OR badge IS NULL),
  emoji       text         NOT NULL DEFAULT '🪷',
  bg_color    text         NOT NULL DEFAULT '#6A1B9A',
  colors      jsonb        NOT NULL DEFAULT '[]',
  -- e.g. ["#6A1B9A", "#D4A017", "#C62828"]
  sizes       jsonb        NOT NULL DEFAULT '["S","M","L","XL"]',
  -- e.g. ["XS","S","M","L","XL"] or ["36","37","38"] or ["One Size"]
  description text,
  image_url   text,
  -- Optional: URL to a real product image (Supabase Storage or CDN)
  in_stock    boolean      NOT NULL DEFAULT true,
  stock_qty   integer               DEFAULT 100,
  created_at  timestamptz  NOT NULL DEFAULT now(),
  updated_at  timestamptz  NOT NULL DEFAULT now()
);

-- Auto-update updated_at on every change
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language plpgsql;

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at();


-- ─────────────────────────────────────────
-- 2. PROFILES (extends auth.users)
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id          uuid         PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name   text,
  phone       text,
  avatar_url  text,
  updated_at  timestamptz  NOT NULL DEFAULT now()
);

-- Auto-create profile when a user registers
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.raw_user_meta_data ->> 'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ language plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user();


-- ─────────────────────────────────────────
-- 3. ORDERS
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id          bigserial    PRIMARY KEY,
  user_id     uuid         NOT NULL REFERENCES auth.users(id),
  status      text         NOT NULL DEFAULT 'pending'
                           CHECK (status IN ('pending','confirmed','shipped','delivered','cancelled')),
  total       integer      NOT NULL CHECK (total >= 0),
  address     jsonb,
  -- e.g. { "line1": "12 MG Road", "city": "Bengaluru", "pincode": "560001", "state": "Karnataka" }
  payment_method text      DEFAULT 'cod',
  -- cod | upi | card | netbanking
  payment_ref text,
  -- Razorpay order id or UPI ref
  notes       text,
  created_at  timestamptz  NOT NULL DEFAULT now(),
  updated_at  timestamptz  NOT NULL DEFAULT now()
);

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at();


-- ─────────────────────────────────────────
-- 4. ORDER ITEMS
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS order_items (
  id          bigserial    PRIMARY KEY,
  order_id    bigint       NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id  bigint       NOT NULL REFERENCES products(id),
  size        text         NOT NULL,
  qty         integer      NOT NULL CHECK (qty > 0),
  price       integer      NOT NULL CHECK (price > 0)
  -- Snapshot of price at time of order
);


-- ─────────────────────────────────────────
-- 5. WISHLIST
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS wishlist (
  id          bigserial    PRIMARY KEY,
  user_id     uuid         NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id  bigint       NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at  timestamptz  NOT NULL DEFAULT now(),
  UNIQUE (user_id, product_id)
);


-- ─────────────────────────────────────────
-- 6. INDEXES (for fast queries)
-- ─────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_products_category  ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_in_stock  ON products(in_stock);
CREATE INDEX IF NOT EXISTS idx_orders_user_id     ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status      ON orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order  ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_user      ON wishlist(user_id);
