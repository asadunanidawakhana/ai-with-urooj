-- Sync Profiles Script
-- Run this to restore missing profiles for existing users

-- 1. Insert profiles for any users that exist in auth.users but not in public.profiles
INSERT INTO public.profiles (id, full_name, email, role, created_at)
SELECT 
    id, 
    COALESCE(raw_user_meta_data->>'full_name', raw_user_meta_data->>'name', email) as full_name,
    email,
    'user' as role,
    created_at
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.profiles);

-- 2. (Optional) Make a specific user an admin.
-- REPLACE 'macdigitalagcncy1@gmail.com' WITH THE EXACT EMAIL YOU USE TO LOG IN.
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'macdigitalagcncy1@gmail.com'; 

-- 3. Verify the fix
SELECT * FROM public.profiles WHERE email = 'macdigitalagcncy1@gmail.com';
