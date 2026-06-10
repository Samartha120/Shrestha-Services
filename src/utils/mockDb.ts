import type { Service } from "@/types/service.types";
import type { Project } from "@/types/project.types";
import type { GalleryItem } from "@/types/gallery.types";
import type { Testimonial } from "@/types/testimonial.types";
import type { QuoteRequest } from "@/types/quote.types";
import type { Contact } from "@/types/contact.types";
import type { UserProfile } from "@/types/user.types";
import type { Order } from "@/types/order.types";
import type { Notification } from "@/types/notification.types";

// Helper to delay response to simulate network latency
export const delay = (ms = 800) => new Promise((resolve) => setTimeout(resolve, ms));

const DEFAULT_SERVICES: Service[] = [
  {
    id: "1",
    title: "Flex Printing",
    slug: "flex-printing",
    description: "High-quality, weather-resistant flex banner printing for outdoor advertisements, shop banners, and event backdrops. Excellent color reproduction.",
    image: "https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&w=800&q=80",
    category: "Flex & Banner Printing",
    basePrice: 15, // Price per sq. ft. in NPR
    materials: ["Normal Flex (280 GSM)", "Star Flex (340 GSM)", "Blacklit Flex (440 GSM)", "Blockout Flex (510 GSM)"],
    features: ["Weather Resistant", "Vibrant CMYK Colors", "Seamless Jointing", "Grommets & Eyelets included"]
  },
  {
    id: "2",
    title: "Acrylic Sign Boards",
    slug: "acrylic-sign-boards",
    description: "Premium laser-cut acrylic signages with custom LED lighting, 3D letter embossment, and sleek metallic finishes. Ideal for corporate lobbies and retail facades.",
    image: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=800&q=80",
    category: "Signage & Boards",
    basePrice: 450, // Price per letter or sq. ft.
    materials: ["Cast Acrylic 3mm", "Cast Acrylic 5mm", "LED Moduled Acrylic", "Titanium Board Sheet"],
    features: ["3D Embossed Letters", "Energy-Efficient LEDs", "Polished Edges", "Indoor/Outdoor Grade"]
  },
  {
    id: "3",
    title: "Vinyl Printing",
    slug: "vinyl-printing",
    description: "Vivid vinyl stickers and decals for windows, glass doors, walls, and presentation boards. Glossy, matte, or frosted finishes available.",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80",
    category: "Digital & Custom Decals",
    basePrice: 40,
    materials: ["Glossy White Vinyl", "Matte White Vinyl", "Frosted Glass Film", "Clear Translucent Vinyl"],
    features: ["Bubble-Free Application", "Scratch-Resistant Lamination", "Precision Die-Cut Shape", "Easy Clean Finish"]
  },
  {
    id: "4",
    title: "Digital & Eco-Solvent Printing",
    slug: "digital-printing",
    description: "High-resolution digital paper printing for premium indoor marketing items, photography posters, and fine-art reproductions.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    category: "Digital & Custom Decals",
    basePrice: 20,
    materials: ["Eco-Solvent Satin Poster Paper", "PP Photo Paper (Non-Tearable)", "Artist Canvas Sheet", "Backlit Film PET"],
    features: ["Superb Photo Realism", "Eco-Friendly Inks", "Instant Dry Coating", "UHD Detail Closes"]
  },
  {
    id: "5",
    title: "Vehicle Branding",
    slug: "vehicle-branding",
    description: "Turn your company vehicles into mobile billboards with our premium cast wraps. Partial wraps, full wraps, and custom cut decals.",
    image: "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=800&q=80",
    category: "Branding & Advertising Solutions",
    basePrice: 85,
    materials: ["3M Cast Wrap Film", "Avery Dennison Wrap", "经济型车贴 (Standard Vehicle Vinyl)"],
    features: ["UV Laminated Shield", "Paint-Safe Adhesive", "Professional Installation Setup", "3-5 Years Durability"]
  },
  {
    id: "6",
    title: "Roll-Up Stands & Banners",
    slug: "roll-up-stands",
    description: "Portable, lightweight, and durable aluminum pull-up stands. Quick to deploy, perfect for trade shows, exhibitions, and lobby branding.",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
    category: "Marketing Materials",
    basePrice: 1800, // Price per unit
    materials: ["Standard Aluminum Base", "Luxury Chrome Base", "Broad-Base Rollup Stand"],
    features: ["Includes Carrying Case", "Heavy-Duty Spring Roller", "PP Tear-Resistant Print", "Easy Graphic Interchange"]
  },
  {
    id: "7",
    title: "Corporate Branding & Stationery",
    slug: "corporate-branding",
    description: "Consistent branding suites including business cards, letterheads, flyers, brochures, envelopes, ID cards, and customized corporate gifts.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    category: "Branding & Advertising Solutions",
    basePrice: 5, // Per unit cost
    materials: ["350 GSM Art Card (Gloss/Matte)", "Premium Textured Paper", "Recycled Craft Board"],
    features: ["Spot UV Coatings", "Gold/Silver Foil Stamp", "Creasing & Folding Lines", "Double-Sided Offset Print"]
  },
  {
    id: "8",
    title: "Outdoor Signs & Billboards",
    slug: "outdoor-advertising",
    description: "Structural sign boards, unipoles, sky signs, and large-scale highway billboards with metal trusses and solar illumination.",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=800&q=80",
    category: "Signage & Boards",
    basePrice: 350,
    materials: ["Iron Frame Trussing", "Alcore (Aluminum Composite Panels)", "Backlit Canvas Cloth"],
    features: ["Wind-load Resistant Truss", "Heavy Anti-Rust Painting", "Govt Approval Assistance", "Integrated Spotlights"]
  }
];

const DEFAULT_PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Hotel Yak & Yeti Exterior Signage",
    slug: "hotel-yak-yeti-signage",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    description: "Premium backlit 3D acrylic signage and reception branding designed, manufactured, and installed for Biratnagar's landmark luxury hotel."
  },
  {
    id: "p2",
    title: "Standard Chartered Bank Campaign Banners",
    slug: "scb-campaign-banners",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
    description: "Nationwide retail branch flex printing, branding, and promotional standees deploy for a banking campaign with tight schedules."
  },
  {
    id: "p3",
    title: "Pathao Corporate Fleet Wrapping",
    slug: "pathao-fleet-wrapping",
    image: "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=800&q=80",
    description: "Fleet branding wraps for 100+ logistics and delivery delivery vehicles. Wrapped in high-gloss UV protected cast vinyl decals."
  },
  {
    id: "p4",
    title: "Everest Insurance Office Branding",
    slug: "everest-insurance-branding",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    description: "Frosted safety glass stickers, metal logo walls, wayfinding acrylic plaques, and entrance boards for their new corporate headquarters."
  }
];

const DEFAULT_GALLERY: GalleryItem[] = [
  { id: "g1", title: "Luxury Golden Acrylic Sign", image: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=800&q=80", category: "Signage & Boards", description: "3D golden mirror finish acrylic letters mounted with standoff bolts." },
  { id: "g2", title: "Star Flex Event Backdrop", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80", category: "Flex & Banner Printing", description: "Seamless 30x12ft high definition Star Flex banner stretched on iron frame." },
  { id: "g3", title: "Frosted Window Glass Sticker", image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80", category: "Digital & Custom Decals", description: "Corporate logo patterns cut into frosted privacy glass vinyl wrap." },
  { id: "g4", title: "Matte Black Business Cards", image: "https://images.unsplash.com/photo-1616763355548-1b606f439f86?auto=format&fit=crop&w=800&q=80", category: "Branding & Advertising Solutions", description: "350 GSM premium paper with spot UV coating on details." },
  { id: "g5", title: "Vehicle Delivery Van Wrap", image: "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=800&q=80", category: "Branding & Advertising Solutions", description: "Complete high glossy vehicle wrap with contour cuts." },
  { id: "g6", title: "Acrylic LED Letter Glow", image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80", category: "Signage & Boards", description: "Custom letter sign featuring warm white light back-glow." }
];

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  { id: "t1", customerName: "Rahul Sharma (Director, Nepal Events)", rating: 5, review: "Shrestha Services delivered event banners for our largest summit. The print resolution was crystal clear and they worked overnight to complete the setup." },
  { id: "t2", customerName: "Sita Adhikari (Brand Manager, Mega Mart)", rating: 5, review: "We upgraded all our branch outlet sign boards to their acrylic LED setups. The aesthetic look is amazing, and customer responses have been stellar!" },
  { id: "t3", customerName: "David Pradhan (CEO, Apex Tech)", rating: 4, review: "Highly professional service. They custom fabricated office wayfinding panels and glass stickers for our new workspace in Lalitpur." }
];

const DEFAULT_INQUIRIES: Contact[] = [
  { id: "c1", name: "Anil Karki", email: "anil@karkiconsulting.com", phone: "+977 9851012345", message: "Hi, I need a quotation for printing 50 brochures for a corporate expo. What are your paper options?", createdAt: "2026-06-05T12:00:00.000Z" },
  { id: "c2", name: "Priya Neupane", email: "priya@gmail.com", phone: "+977 9841122334", message: "Do you provide installation services in Pokhara for large flex billboards?", createdAt: "2026-06-07T08:30:00.000Z" }
];

const DEFAULT_USERS: UserProfile[] = [
  { id: "u1", name: "Prabin Shrestha (Admin)", email: "admin@shrestha.com", role: "admin", createdAt: "2026-01-10T10:00:00.000Z" },
  { id: "u2", name: "Suresh Thapa (Client)", email: "customer@shrestha.com", role: "customer", createdAt: "2026-03-15T10:00:00.000Z" }
];

const DEFAULT_QUOTES: (QuoteRequest & { status: string; estimatedPrice: number; material: string; quantity: number; fileUrl?: string; fileType?: string; fileWeight?: string; date: string })[] = [
  {
    id: "q-101",
    serviceId: "1",
    customerName: "Suresh Thapa (Client)",
    email: "customer@shrestha.com",
    phone: "+977 9851088888",
    width: 10,
    height: 8,
    notes: "Need brass grommets on corners. This is for an exhibition stand backdrop.",
    status: "Pending",
    estimatedPrice: 1800,
    material: "Star Flex (340 GSM)",
    quantity: 1,
    fileUrl: "backstage_banner_draft.jpg",
    fileType: "image/jpeg",
    fileWeight: "4.2 MB",
    date: "2026-06-08T09:30:00.000Z"
  },
  {
    id: "q-102",
    serviceId: "2",
    customerName: "Niranjan Shrestha",
    email: "niru@bakers.com",
    phone: "+977 9803122123",
    width: 6,
    height: 3,
    notes: "Glow sign board for sweet shop entrance. Letters in RED color acrylic.",
    status: "Approved",
    estimatedPrice: 12500,
    material: "LED Moduled Acrylic",
    quantity: 1,
    fileUrl: "bakers_logo.pdf",
    fileType: "application/pdf",
    fileWeight: "1.8 MB",
    date: "2026-06-07T11:15:00.000Z"
  }
];

const DEFAULT_ORDERS: Order[] = [
  { id: "ord-1", orderNumber: "ORD-2026-001", customerName: "Suresh Thapa (Client)", status: "Printing", totalAmount: 12500 },
  { id: "ord-2", orderNumber: "ORD-2026-002", customerName: "Rahul Sharma", status: "Delivered", totalAmount: 4800 },
  { id: "ord-3", orderNumber: "ORD-2026-003", customerName: "Priya Neupane", status: "Pending", totalAmount: 32000 }
];

const DEFAULT_NOTIFICATIONS: Notification[] = [
  { id: "n1", title: "New Quote Request", message: "Suresh Thapa submitted a quote request for Flex Printing (ID: q-101)", read: false },
  { id: "n2", title: "System Initialized", message: "Shrestha Services portal configuration has been loaded successfully.", read: true }
];

// Helper to access and initialize
export const getMockDb = () => {
  const getOrInit = <T>(key: string, defaultVal: T): T => {
    const data = localStorage.getItem(key);
    if (!data) {
      localStorage.setItem(key, JSON.stringify(defaultVal));
      return defaultVal;
    }
    return JSON.parse(data);
  };

  return {
    services: getOrInit<Service[]>("ss_services", DEFAULT_SERVICES),
    projects: getOrInit<Project[]>("ss_projects", DEFAULT_PROJECTS),
    gallery: getOrInit<GalleryItem[]>("ss_gallery", DEFAULT_GALLERY),
    testimonials: getOrInit<Testimonial[]>("ss_testimonials", DEFAULT_TESTIMONIALS),
    inquiries: getOrInit<Contact[]>("ss_inquiries", DEFAULT_INQUIRIES),
    users: getOrInit<UserProfile[]>("ss_users", DEFAULT_USERS),
    quotes: getOrInit<any[]>("ss_quotes", DEFAULT_QUOTES),
    orders: getOrInit<Order[]>("ss_orders", DEFAULT_ORDERS),
    notifications: getOrInit<Notification[]>("ss_notifications", DEFAULT_NOTIFICATIONS),
  };
};

export const updateMockDb = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};
