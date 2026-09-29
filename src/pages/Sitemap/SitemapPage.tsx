import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Container, Eyebrow, Reveal, PrimaryCTA, GhostCTA } from "@/components/marketing/primitives";

const siteMap = [
  {
    title: "Main Pages",
    links: [
      { name: "Home", path: "/" },
      { name: "About Us", path: "/about" },
      { name: "Contact Us", path: "/contact" },
      { name: "Gallery", path: "/gallery" },
    ],
  },
  {
    title: "Services",
    links: [
      { name: "All Services", path: "/services" },
      { name: "Business Cards", path: "/services" },
      { name: "Brochures", path: "/services" },
      { name: "Signage & Banners", path: "/services" },
      { name: "Packaging", path: "/services" },
      { name: "Custom Printing", path: "/services" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Blog", path: "/blog" },
      { name: "FAQ", path: "/faq" },
      { name: "Project Portfolio", path: "/gallery" },
      { name: "Testimonials", path: "/about" },
    ],
  },
  {
    title: "Customer",
    links: [
      { name: "Get a Quote", path: "/quote" },
      { name: "Order Tracking", path: "/quote" },
      { name: "Sample Request", path: "/contact" },
      { name: "Support", path: "/contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "Careers", path: "/careers" },
      { name: "Our Team", path: "/about" },
      { name: "Company News", path: "/blog" },
      { name: "Awards & Recognition", path: "/about" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Terms & Conditions", path: "/terms" },
      { name: "Cookie Policy", path: "/privacy" },
      { name: "Accessibility", path: "/" },
    ],
  },
];

export default function SitemapPage() {
  const reduce = useReducedMotion();

  return (
    <div className="bg-paper text-ink">
      {/* Header */}
      <section className="border-b border-line py-16 sm:py-20">
        <Container>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <Eyebrow>Index</Eyebrow>
            <h1 className="mt-6 font-display text-[clamp(2.4rem,5vw,4rem)] leading-[1.03] text-balance">
              Sitemap
            </h1>
            <p className="mt-5 max-w-prose text-lg text-ink-soft text-pretty">
              Every page and resource across the Shrestha Services website, laid
              out in one place.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Columned index */}
      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {siteMap.map((category, idx) => (
              <Reveal key={category.title} delay={idx * 0.04}>
                <div className="flex items-baseline gap-3 border-b border-line-strong pb-3">
                  <span className="font-mono text-xs text-accent">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-display text-xl leading-tight">
                    {category.title}
                  </h2>
                </div>
                <ul className="mt-4">
                  {category.links.map((link) => (
                    <li key={link.name} className="border-b border-line last:border-b-0">
                      <Link
                        to={link.path}
                        className="group flex items-center justify-between py-2.5 text-sm text-ink-soft transition-colors hover:text-accent"
                      >
                        <span>{link.name}</span>
                        <span className="font-mono text-xs text-muted transition-colors group-hover:text-accent">
                          {link.path}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Help CTA */}
      <section className="border-t border-line bg-paper-dim py-16">
        <Container>
          <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="max-w-prose">
              <h2 className="font-display text-2xl leading-tight sm:text-3xl">
                Can't find what you're looking for?
              </h2>
              <p className="mt-4 text-ink-soft text-pretty">
                Our team is here to help with any questions about navigating the
                site or our services.
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 sm:flex-row lg:justify-end">
              <PrimaryCTA to="/contact">Contact support</PrimaryCTA>
              <GhostCTA to="/faq">View FAQ</GhostCTA>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
