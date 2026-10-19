-- AVARNA PLANT STORE - Supabase Database Schema
-- Run this script in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

-- 1. Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  scientific_name TEXT,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  sale_price NUMERIC,
  description TEXT NOT NULL,
  short_description TEXT,
  long_description TEXT,
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  in_stock BOOLEAN DEFAULT true,
  stock_count INTEGER DEFAULT 10,
  sunlight TEXT DEFAULT 'Indirect Light',
  watering TEXT DEFAULT 'Moderate watering',
  difficulty TEXT DEFAULT 'Easy',
  size TEXT,
  pet_friendly BOOLEAN DEFAULT false,
  air_purifying BOOLEAN DEFAULT false,
  tags TEXT[] DEFAULT '{}',
  rating NUMERIC DEFAULT 4.5,
  review_count INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  best_seller BOOLEAN DEFAULT false,
  new_arrival BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  items JSONB NOT NULL,
  total NUMERIC NOT NULL,
  subtotal NUMERIC,
  shipping_cost NUMERIC DEFAULT 0,
  discount NUMERIC DEFAULT 0,
  tax NUMERIC DEFAULT 0,
  shipping_address JSONB NOT NULL,
  payment_method TEXT NOT NULL,
  payment_status TEXT DEFAULT 'pending',
  order_status TEXT DEFAULT 'confirmed',
  timeline JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  estimated_delivery TIMESTAMPTZ
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 4. Set Policies for Products (Everyone can view, anyone or authenticated can update)
CREATE POLICY "Public Read Access for Products"
  ON public.products FOR SELECT
  USING (true);

CREATE POLICY "Allow All Modifications for Products"
  ON public.products FOR ALL
  USING (true);

-- 5. Set Policies for Orders
CREATE POLICY "Public Read Access for Orders"
  ON public.orders FOR SELECT
  USING (true);

CREATE POLICY "Public Insert Access for Orders"
  ON public.orders FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public Update Access for Orders"
  ON public.orders FOR UPDATE
  USING (true);

-- 6. Enable Realtime Replication
ALTER PUBLICATION supabase_realtime ADD TABLE public.products;
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
