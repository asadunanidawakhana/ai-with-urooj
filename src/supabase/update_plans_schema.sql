-- Add image_url column to plans table
ALTER TABLE public.plans 
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Create storage bucket for plan images
INSERT INTO storage.buckets (id, name, public)
VALUES ('plan_images', 'plan_images', true)
ON CONFLICT (id) DO NOTHING;

-- Policies for 'plan_images'

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Public Access Plan Images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload plan images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update plan images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete plan images" ON storage.objects;

-- Allow public read access (Anyone can see plan images)
CREATE POLICY "Public Access Plan Images"
ON storage.objects FOR SELECT
USING ( bucket_id = 'plan_images' );

-- Allow admins to upload/update/delete
CREATE POLICY "Admins can upload plan images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'plan_images' 
  AND public.is_admin()
);

CREATE POLICY "Admins can update plan images"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'plan_images' AND public.is_admin() )
WITH CHECK ( bucket_id = 'plan_images' );

CREATE POLICY "Admins can delete plan images"
ON storage.objects FOR DELETE
USING ( bucket_id = 'plan_images' AND public.is_admin() );
