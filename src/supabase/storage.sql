-- STORAGE BUCKET SETUP
-- Run this script to set up the storage for payment screenshots

-- 1. Create the bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('payment_proofs', 'payment_proofs', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Drop existing policies to avoid conflicts (Fixes "policy already exists" error)
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload payment proofs" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own files" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own files" ON storage.objects;

-- 3. Re-create Policies for 'payment_proofs'

-- Allow public read access to the bucket
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'payment_proofs' );

-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload payment proofs"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'payment_proofs' 
  AND auth.role() = 'authenticated'
);

-- Allow users to update/delete their own files
CREATE POLICY "Users can update own files"
ON storage.objects FOR UPDATE
USING ( auth.uid() = owner )
WITH CHECK ( bucket_id = 'payment_proofs' );

CREATE POLICY "Users can delete own files"
ON storage.objects FOR DELETE
USING ( auth.uid() = owner AND bucket_id = 'payment_proofs' );
