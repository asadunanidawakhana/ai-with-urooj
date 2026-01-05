-- Update the handle_new_user function to be smarter about phone number keys
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, whatsapp, role)
  VALUES (
    new.id, 
    COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', 'New User'), 
    new.email,
    COALESCE(new.raw_user_meta_data->>'whatsapp', new.raw_user_meta_data->>'phone', new.raw_user_meta_data->>'whatsapp_number'),
    'user'
  )
  ON CONFLICT (id) DO UPDATE
  SET 
    full_name = EXCLUDED.full_name,
    email = EXCLUDED.email,
    whatsapp = COALESCE(EXCLUDED.whatsapp, public.profiles.whatsapp);
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Attempt to fix existing users who have missing whatsapp but have it in metadata
-- This requires accessing auth.users which might need special privileges code block or just direct update
-- We can try to update profiles based on auth.users if we have permissions.
-- Note: direct access to auth.users is often restricted.
DO $$
DECLARE
  user_record RECORD;
BEGIN
  FOR user_record IN SELECT * FROM auth.users LOOP
    UPDATE public.profiles
    SET whatsapp = COALESCE(user_record.raw_user_meta_data->>'whatsapp', user_record.raw_user_meta_data->>'phone', user_record.raw_user_meta_data->>'whatsapp_number')
    WHERE id = user_record.id AND whatsapp IS NULL;
  END LOOP;
END;
$$;
