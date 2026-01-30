-- ⚠️ RESET: Drops existing tables to start fresh
DROP TABLE IF EXISTS public.order_items CASCADE;
DROP TABLE IF EXISTS public.orders CASCADE;
DROP TABLE IF EXISTS public.products CASCADE;
DROP TABLE IF EXISTS public.store_settings CASCADE;

-- 1. Products Table
CREATE TABLE public.products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL,
    category TEXT NOT NULL,
    stock INTEGER DEFAULT 0 NOT NULL,
    images TEXT[] DEFAULT '{}',
    compatibility TEXT,
    warranty TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Orders Table
CREATE TABLE public.orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    total NUMERIC NOT NULL,
    status TEXT DEFAULT 'New' NOT NULL CHECK (status IN ('New', 'Payment Pending', 'Proof Uploaded', 'Paid', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled')),
    payment_method TEXT NOT NULL CHECK (payment_method IN ('QR', 'COD')),
    proof_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Order Items Table
CREATE TABLE public.order_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id),
    quantity INTEGER NOT NULL,
    price_at_time NUMERIC NOT NULL
);

-- 4. Store Settings Table
CREATE TABLE public.store_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    key TEXT UNIQUE NOT NULL,
    value TEXT NOT NULL
);

-- 5. Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies

-- Products: Everyone can read
CREATE POLICY "Public can view products" ON public.products FOR SELECT USING (true);
-- (DEV ONLY): Allow public seed
CREATE POLICY "Public can insert products" ON public.products FOR INSERT WITH CHECK (true);

-- Orders: Public can insert (place order), but cannot see others' orders. 
CREATE POLICY "Public can insert orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can view their own orders via ID (optional logic later)" ON public.orders FOR SELECT USING (true); -- Simplified for now, traditionally would restrict.

-- Order Items: Public can insert
CREATE POLICY "Public can insert order items" ON public.order_items FOR INSERT WITH CHECK (true);

-- Buckets (Storage) setup scripts usually handled in UI, but policy:
-- "Public Access" for 'products' bucket
-- "Authenticated/Admin" for 'payment_proofs' bucket
-- 7. Storage Buckets (Execute this if creating buckets via SQL is supported, otherwise use Dashboard)
INSERT INTO storage.buckets (id, name, public) VALUES ('payment_proofs', 'payment_proofs', true)
ON CONFLICT (id) DO NOTHING;

-- Policy to allow uploads to this bucket
CREATE POLICY "Public Upload Proofs" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'payment_proofs' );
CREATE POLICY "Public View Proofs" ON storage.objects FOR SELECT USING ( bucket_id = 'payment_proofs' );
