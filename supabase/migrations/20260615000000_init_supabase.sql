-- Initial migration for Shrestha Services database schema

-- 1. Create Lookup tables and RBAC structures
CREATE TABLE IF NOT EXISTS public.roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.role_permissions (
    role_id UUID REFERENCES public.roles(id) ON DELETE CASCADE,
    permission_id UUID REFERENCES public.permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

-- 2. Create Public Users and Profile structures linking to auth.users
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role_id UUID REFERENCES public.roles(id) ON DELETE SET NULL,
    avatar TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.customers (
    id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
    phone TEXT,
    address TEXT,
    company_name TEXT,
    pan_vat_number TEXT,
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.admins (
    id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
    department TEXT,
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.super_admins (
    id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
    level INT DEFAULT 1,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Content and Portfolio structures
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    image TEXT,
    category TEXT NOT NULL,
    base_price NUMERIC NOT NULL,
    materials TEXT[] DEFAULT '{}',
    features TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.project_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    image TEXT,
    description TEXT,
    category_id UUID REFERENCES public.project_categories(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.gallery_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    image TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name TEXT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    review TEXT NOT NULL,
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.contact_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Notification and Logging structures
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    details JSONB,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    details JSONB,
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Business Settings
CREATE TABLE IF NOT EXISTS public.company_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    logo TEXT,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Quotes and Orders structures
CREATE TABLE IF NOT EXISTS public.quotes (
    id TEXT PRIMARY KEY, -- using matching code pattern (e.g. q-101)
    service_id TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    width NUMERIC,
    height NUMERIC,
    notes TEXT,
    status TEXT DEFAULT 'Pending',
    estimated_price NUMERIC DEFAULT 0,
    material TEXT NOT NULL,
    quantity INT DEFAULT 1,
    file_url TEXT,
    file_type TEXT,
    file_weight TEXT,
    date TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.order_status (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT UNIQUE NOT NULL,
    customer_name TEXT NOT NULL,
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    status_id UUID REFERENCES public.order_status(id) ON DELETE SET NULL,
    total_amount NUMERIC NOT NULL,
    quote_id TEXT REFERENCES public.quotes(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    service_id TEXT NOT NULL,
    quantity INT NOT NULL,
    price NUMERIC NOT NULL,
    width NUMERIC,
    height NUMERIC,
    notes TEXT,
    material TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.file_uploads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    file_name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size TEXT NOT NULL,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    quote_id TEXT REFERENCES public.quotes(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. Trigger to mirror auth.users into public.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    customer_role_id UUID;
BEGIN
    -- Resolve the customer role ID
    SELECT id INTO customer_role_id FROM public.roles WHERE name = 'customer';

    -- Insert profile mirroring data
    INSERT INTO public.users (id, name, email, role_id, avatar)
    VALUES (
        new.id,
        COALESCE(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
        new.email,
        customer_role_id,
        new.raw_user_meta_data->>'avatar'
    );

    -- Create customer profile details
    INSERT INTO public.customers (id)
    VALUES (new.id);

    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTION FUNCTION public.handle_new_user();

-- 8. Enable Row Level Security (RLS) on all tables
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.super_admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.file_uploads ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is admin/superadmin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
DECLARE
    user_role TEXT;
BEGIN
    SELECT r.name INTO user_role 
    FROM public.users u 
    JOIN public.roles r ON u.role_id = r.id
    WHERE u.id = auth.uid();
    
    RETURN (user_role = 'admin' OR user_role = 'superadmin');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 9. Row Level Security Policies

-- Roles & Permissions (Only Admin/SuperAdmin write, Everyone read)
CREATE POLICY "Allow read access to roles" ON public.roles FOR SELECT USING (true);
CREATE POLICY "Allow manage access to roles" ON public.roles FOR ALL USING (public.is_admin());

-- Users (Users read/update own profiles, Admin read/update all)
CREATE POLICY "Users view own profile" ON public.users FOR SELECT USING (auth.uid() = id OR public.is_admin());
CREATE POLICY "Users update own profile" ON public.users FOR UPDATE USING (auth.uid() = id OR public.is_admin());
CREATE POLICY "Admin delete/insert profiles" ON public.users FOR ALL USING (public.is_admin());

-- Customers
CREATE POLICY "Customers view own details" ON public.customers FOR SELECT USING (auth.uid() = id OR public.is_admin());
CREATE POLICY "Customers update own details" ON public.customers FOR UPDATE USING (auth.uid() = id OR public.is_admin());

-- Admins & SuperAdmins (Admin/SuperAdmin read all)
CREATE POLICY "View admins" ON public.admins FOR SELECT USING (public.is_admin());
CREATE POLICY "View super_admins" ON public.super_admins FOR SELECT USING (public.is_admin());

-- Services (Everyone read, Admin manage)
CREATE POLICY "Public read services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Admin manage services" ON public.services FOR ALL USING (public.is_admin());

-- Content Portfolio (Everyone reads, Admin manages)
CREATE POLICY "Public read project categories" ON public.project_categories FOR SELECT USING (true);
CREATE POLICY "Admin manage project categories" ON public.project_categories FOR ALL USING (public.is_admin());

CREATE POLICY "Public read projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Admin manage projects" ON public.projects FOR ALL USING (public.is_admin());

CREATE POLICY "Public read gallery" ON public.gallery_images FOR SELECT USING (true);
CREATE POLICY "Admin manage gallery" ON public.gallery_images FOR ALL USING (public.is_admin());

CREATE POLICY "Public read testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "User manage own testimonials" ON public.testimonials FOR ALL USING (auth.uid() = user_id OR public.is_admin());

-- Contact Inquiries (Public write, Admin read/delete)
CREATE POLICY "Public create inquiries" ON public.contact_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin manage inquiries" ON public.contact_inquiries FOR SELECT USING (public.is_admin());
CREATE POLICY "Admin delete inquiries" ON public.contact_inquiries FOR DELETE USING (public.is_admin());

-- Notifications (Users view/update own notifications)
CREATE POLICY "Users view own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Users update own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Admin manage notifications" ON public.notifications FOR INSERT WITH CHECK (true);

-- Quotes (Users view/create own quotes, Admin manages)
CREATE POLICY "Users view own quotes" ON public.quotes FOR SELECT USING (email = (SELECT email FROM public.users WHERE id = auth.uid()) OR public.is_admin());
CREATE POLICY "Users create quotes" ON public.quotes FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin manage quotes" ON public.quotes FOR ALL USING (public.is_admin());

-- Orders & Order Items
CREATE POLICY "Users view own orders" ON public.orders FOR SELECT USING (user_id = auth.uid() OR public.is_admin());
CREATE POLICY "Admin manage orders" ON public.orders FOR ALL USING (public.is_admin());

CREATE POLICY "Users view own order items" ON public.order_items FOR SELECT USING (
    order_id IN (SELECT id FROM public.orders WHERE user_id = auth.uid()) OR public.is_admin()
);
CREATE POLICY "Admin manage order items" ON public.order_items FOR ALL USING (public.is_admin());

-- Company Settings (Everyone read, Admin write)
CREATE POLICY "Public view settings" ON public.company_settings FOR SELECT USING (true);
CREATE POLICY "Admin update settings" ON public.company_settings FOR ALL USING (public.is_admin());

-- File Uploads (Users view/manage own uploads)
CREATE POLICY "Users manage own uploads" ON public.file_uploads FOR ALL USING (user_id = auth.uid() OR public.is_admin());

-- 10. Seed Core Data
INSERT INTO public.roles (name) VALUES ('customer'), ('admin'), ('superadmin') ON CONFLICT DO NOTHING;

INSERT INTO public.order_status (name) VALUES ('Pending'), ('Approved'), ('Printing'), ('Shipped'), ('Delivered') ON CONFLICT DO NOTHING;

-- Seed services from mockDb
INSERT INTO public.services (title, slug, description, image, category, base_price, materials, features) VALUES
('Flex Printing', 'flex-printing', 'High-quality, weather-resistant flex banner printing for outdoor advertisements, shop banners, and event backdrops. Excellent color reproduction.', 'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&w=800&q=80', 'Flex & Banner Printing', 15, ARRAY['Normal Flex (280 GSM)', 'Star Flex (340 GSM)', 'Blacklit Flex (440 GSM)', 'Blockout Flex (510 GSM)'], ARRAY['Weather Resistant', 'Vibrant CMYK Colors', 'Seamless Jointing', 'Grommets & Eyelets included']),
('Acrylic Sign Boards', 'acrylic-sign-boards', 'Premium laser-cut acrylic signages with custom LED lighting, 3D letter embossment, and sleek metallic finishes. Ideal for corporate lobbies and retail facades.', 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=800&q=80', 'Signage & Boards', 450, ARRAY['Cast Acrylic 3mm', 'Cast Acrylic 5mm', 'LED Moduled Acrylic', 'Titanium Board Sheet'], ARRAY['3D Embossed Letters', 'Energy-Efficient LEDs', 'Polished Edges', 'Indoor/Outdoor Grade']),
('Vinyl Printing', 'vinyl-printing', 'Vivid vinyl stickers and decals for windows, glass doors, walls, and presentation boards. Glossy, matte, or frosted finishes available.', 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80', 'Digital & Custom Decals', 40, ARRAY['Glossy White Vinyl', 'Matte White Vinyl', 'Frosted Glass Film', 'Clear Translucent Vinyl'], ARRAY['Bubble-Free Application', 'Scratch-Resistant Lamination', 'Precision Die-Cut Shape', 'Easy Clean Finish']),
('Digital & Eco-Solvent Printing', 'digital-printing', 'High-resolution digital paper printing for premium indoor marketing items, photography posters, and fine-art reproductions.', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80', 'Digital & Custom Decals', 20, ARRAY['Eco-Solvent Satin Poster Paper', 'PP Photo Paper (Non-Tearable)', 'Artist Canvas Sheet', 'Backlit Film PET'], ARRAY['Superb Photo Realism', 'Eco-Friendly Inks', 'Instant Dry Coating', 'UHD Detail Closes']),
('Vehicle Branding', 'vehicle-branding', 'Turn your company vehicles into mobile billboards with our premium cast wraps. Partial wraps, full wraps, and custom cut decals.', 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=800&q=80', 'Branding & Advertising Solutions', 85, ARRAY['3M Cast Wrap Film', 'Avery Dennison Wrap', 'Standard Vehicle Vinyl'], ARRAY['UV Laminated Shield', 'Paint-Safe Adhesive', 'Professional Installation Setup', '3-5 Years Durability']),
('Roll-Up Stands & Banners', 'roll-up-stands', 'Portable, lightweight, and durable aluminum pull-up stands. Quick to deploy, perfect for trade shows, exhibitions, and lobby branding.', 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80', 'Marketing Materials', 1800, ARRAY['Standard Aluminum Base', 'Luxury Chrome Base', 'Broad-Base Rollup Stand'], ARRAY['Includes Carrying Case', 'Heavy-Duty Spring Roller', 'PP Tear-Resistant Print', 'Easy Graphic Interchange']),
('Corporate Branding & Stationery', 'corporate-branding', 'Consistent branding suites including business cards, letterheads, flyers, brochures, envelopes, ID cards, and customized corporate gifts.', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80', 'Branding & Advertising Solutions', 5, ARRAY['350 GSM Art Card (Gloss/Matte)', 'Premium Textured Paper', 'Recycled Craft Board'], ARRAY['Spot UV Coatings', 'Gold/Silver Foil Stamp', 'Creasing & Folding Lines', 'Double-Sided Offset Print']),
('Outdoor Signs & Billboards', 'outdoor-advertising', 'Structural sign boards, unipoles, sky signs, and large-scale highway billboards with metal trusses and solar illumination.', 'https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=800&q=80', 'Signage & Boards', 350, ARRAY['Iron Frame Trussing', 'Alcore (Aluminum Composite Panels)', 'Backlit Canvas Cloth'], ARRAY['Wind-load Resistant Truss', 'Heavy Anti-Rust Painting', 'Govt Approval Assistance', 'Integrated Spotlights'])
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    image = EXCLUDED.image,
    category = EXCLUDED.category,
    base_price = EXCLUDED.base_price,
    materials = EXCLUDED.materials,
    features = EXCLUDED.features;

INSERT INTO public.project_categories (name, slug) VALUES 
('Hotel Branding', 'hotel-branding'),
('Retail Campaigns', 'retail-campaigns'),
('Corporate Fleets', 'corporate-fleets'),
('Office Signages', 'office-signages')
ON CONFLICT (slug) DO NOTHING;

-- Seed default company info
INSERT INTO public.company_settings (name, logo, email, phone, address, description) 
VALUES (
    'Shrestha Services', 
    'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&w=120&h=120&q=80',
    'info@shresthaservices.com.np',
    '+977 1 4412345, +977 9851012345',
    'Main Road, Biratnagar, Nepal',
    'Your premier destination for Flex printing, Acrylic signages, vehicle wraps, and full corporate advertising and branding assets.'
) ON CONFLICT DO NOTHING;
