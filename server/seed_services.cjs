const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const services = [
  {
    title: 'Flex Printing',
    slug: 'flex-printing',
    description: 'High-quality, weather-resistant flex banner printing for outdoor advertisements, shop banners, and event backdrops. Excellent color reproduction.',
    image: 'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&w=800&q=80',
    category: 'Flex & Banner Printing',
    basePrice: 15,
    materials: ['Normal Flex (280 GSM)', 'Star Flex (340 GSM)', 'Blacklit Flex (440 GSM)', 'Blockout Flex (510 GSM)'],
    features: ['Weather Resistant', 'Vibrant CMYK Colors', 'Seamless Jointing', 'Grommets & Eyelets included']
  },
  {
    title: 'Acrylic Sign Boards',
    slug: 'acrylic-sign-boards',
    description: 'Premium laser-cut acrylic signages with custom LED lighting, 3D letter embossment, and sleek metallic finishes. Ideal for corporate lobbies and retail facades.',
    image: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=800&q=80',
    category: 'Signage & Boards',
    basePrice: 450,
    materials: ['Cast Acrylic 3mm', 'Cast Acrylic 5mm', 'LED Moduled Acrylic', 'Titanium Board Sheet'],
    features: ['3D Embossed Letters', 'Energy-Efficient LEDs', 'Polished Edges', 'Indoor/Outdoor Grade']
  },
  {
    title: 'Vinyl Printing',
    slug: 'vinyl-printing',
    description: 'Vivid vinyl stickers and decals for windows, glass doors, walls, and presentation boards. Glossy, matte, or frosted finishes available.',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80',
    category: 'Digital & Custom Decals',
    basePrice: 40,
    materials: ['Glossy White Vinyl', 'Matte White Vinyl', 'Frosted Glass Film', 'Clear Translucent Vinyl'],
    features: ['Bubble-Free Application', 'Scratch-Resistant Lamination', 'Precision Die-Cut Shape', 'Easy Clean Finish']
  },
  {
    title: 'Digital & Eco-Solvent Printing',
    slug: 'digital-printing',
    description: 'High-resolution digital paper printing for premium indoor marketing items, photography posters, and fine-art reproductions.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    category: 'Digital & Custom Decals',
    basePrice: 20,
    materials: ['Eco-Solvent Satin Poster Paper', 'PP Photo Paper (Non-Tearable)', 'Artist Canvas Sheet', 'Backlit Film PET'],
    features: ['Superb Photo Realism', 'Eco-Friendly Inks', 'Instant Dry Coating', 'UHD Detail Closes']
  },
  {
    title: 'Vehicle Branding',
    slug: 'vehicle-branding',
    description: 'Turn your company vehicles into mobile billboards with our premium cast wraps. Partial wraps, full wraps, and custom cut decals.',
    image: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=800&q=80',
    category: 'Branding & Advertising Solutions',
    basePrice: 85,
    materials: ['3M Cast Wrap Film', 'Avery Dennison Wrap', 'Standard Vehicle Vinyl'],
    features: ['UV Laminated Shield', 'Paint-Safe Adhesive', 'Professional Installation Setup', '3-5 Years Durability']
  },
  {
    title: 'Roll-Up Stands & Banners',
    slug: 'roll-up-stands',
    description: 'Portable, lightweight, and durable aluminum pull-up stands. Quick to deploy, perfect for trade shows, exhibitions, and lobby branding.',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
    category: 'Marketing Materials',
    basePrice: 1800,
    materials: ['Standard Aluminum Base', 'Luxury Chrome Base', 'Broad-Base Rollup Stand'],
    features: ['Includes Carrying Case', 'Heavy-Duty Spring Roller', 'PP Tear-Resistant Print', 'Easy Graphic Interchange']
  },
  {
    title: 'Corporate Branding & Stationery',
    slug: 'corporate-branding',
    description: 'Consistent branding suites including business cards, letterheads, flyers, brochures, envelopes, ID cards, and customized corporate gifts.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    category: 'Branding & Advertising Solutions',
    basePrice: 5,
    materials: ['350 GSM Art Card (Gloss/Matte)', 'Premium Textured Paper', 'Recycled Craft Board'],
    features: ['Spot UV Coatings', 'Gold/Silver Foil Stamp', 'Creasing & Folding Lines', 'Double-Sided Offset Print']
  },
  {
    title: 'Outdoor Signs & Billboards',
    slug: 'outdoor-advertising',
    description: 'Structural sign boards, unipoles, sky signs, and large-scale highway billboards with metal trusses and solar illumination.',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=800&q=80',
    category: 'Signage & Boards',
    basePrice: 350,
    materials: ['Iron Frame Trussing', 'Alcore (Aluminum Composite Panels)', 'Backlit Canvas Cloth'],
    features: ['Wind-load Resistant Truss', 'Heavy Anti-Rust Painting', 'Govt Approval Assistance', 'Integrated Spotlights']
  }
];

async function main() {
  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service
    });
  }
  console.log("Services seeded successfully!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
