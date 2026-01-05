-- FIX DEPENDENCIES
-- This script updates the foreign key constraint to allow deleting plans even if they have orders.

-- 1. Drop the existing strict constraint
ALTER TABLE public.orders
DROP CONSTRAINT IF EXISTS orders_plan_id_fkey;

-- 2. Make plan_id nullable (so it can be set to NULL when plan is deleted)
ALTER TABLE public.orders
ALTER COLUMN plan_id DROP NOT NULL;

-- 3. Add the new constraint with ON DELETE SET NULL
ALTER TABLE public.orders
ADD CONSTRAINT orders_plan_id_fkey
FOREIGN KEY (plan_id)
REFERENCES public.plans(id)
ON DELETE SET NULL;
