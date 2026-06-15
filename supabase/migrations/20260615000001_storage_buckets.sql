-- Migration to create Supabase storage buckets and configure RLS policies

-- 1. Insert buckets
INSERT INTO storage.buckets (id, name, public) VALUES
('gallery-images', 'gallery-images', true),
('project-images', 'project-images', true),
('company-assets', 'company-assets', true),
('customer-uploads', 'customer-uploads', true),
('testimonial-images', 'testimonial-images', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Configure Access Policies for storage.objects

-- Allow public read access to all public buckets
CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
USING (bucket_id IN ('gallery-images', 'project-images', 'company-assets', 'customer-uploads', 'testimonial-images'));

-- Allow admins to manage all assets in gallery-images, project-images, and company-assets
CREATE POLICY "Admin Manage Public Assets"
ON storage.objects FOR ALL
TO authenticated
USING (
    bucket_id IN ('gallery-images', 'project-images', 'company-assets') 
    AND public.is_admin()
)
WITH CHECK (
    bucket_id IN ('gallery-images', 'project-images', 'company-assets') 
    AND public.is_admin()
);

-- Allow authenticated users to upload their own files in customer-uploads & testimonial-images
CREATE POLICY "User Manage Own Uploads"
ON storage.objects FOR ALL
TO authenticated
USING (
    bucket_id IN ('customer-uploads', 'testimonial-images')
)
WITH CHECK (
    bucket_id IN ('customer-uploads', 'testimonial-images')
);
