import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container, Eyebrow, Reveal, GhostCTA } from "@/components/marketing/primitives";

const sections = [
  {
    id: "1",
    title: "Information We Collect",
    content: `We collect information you provide directly to us, such as when you request a quote, place an order, or contact us through our website. This includes:

- Contact information (name, email address, phone number, mailing address)
- Order information (products ordered, quantities, delivery preferences)
- Payment information (processed securely through third-party providers)
- Communications you send us (emails, messages, feedback)
- Account information (username, password for registered users)

We also automatically collect certain information about your device and how you interact with our website:

- Device information (browser type, IP address, operating system)
- Browsing activity (pages visited, time spent, links clicked)
- Cookies and similar tracking technologies
- Geographic location (if permitted)`,
  },
  {
    id: "2",
    title: "How We Use Your Information",
    content: `We use the information we collect for various purposes:

- To process your orders and deliver our products and services
- To send transactional emails and updates about your orders
- To respond to your inquiries and customer service requests
- To improve our website, products, and services
- To send marketing communications (with your consent)
- To comply with legal obligations and enforce our terms
- To prevent fraudulent transactions and protect our business
- To analyze usage patterns and user preferences
- To personalize your experience on our website

We only use your information in ways you would reasonably expect and with your consent where required by law.`,
  },
  {
    id: "3",
    title: "Data Protection & Security",
    content: `We implement comprehensive security measures to protect your information:

- Secure Socket Layer (SSL) encryption for data transmission
- Password protection and access controls
- Regular security audits and vulnerability assessments
- Limited access to personal information (authorized personnel only)
- Secure data storage with appropriate safeguards

However, no method of transmission over the Internet or electronic storage is completely secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee absolute security. You acknowledge and accept this limitation.

We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy, or as required by law. When information is no longer needed, we securely delete or anonymize it.`,
  },
  {
    id: "4",
    title: "Cookies and Tracking Technologies",
    content: `Our website uses cookies and similar tracking technologies to enhance your experience:

- Session cookies: Temporary cookies that expire when you close your browser
- Persistent cookies: Remain on your device for future visits
- Analytics cookies: Track usage patterns and help us improve our services
- Marketing cookies: Enable personalized advertisements and content

Most web browsers allow you to control cookies through settings. You can:

- Accept or reject cookies
- Delete existing cookies
- Receive notifications when new cookies are set
- Disable cookies entirely

Please note that disabling cookies may affect your ability to use certain features of our website. We respect the "Do Not Track" signals and will not track your activity if such signals are enabled.`,
  },
  {
    id: "5",
    title: "Third-Party Services",
    content: `We may share information with trusted third-party service providers who assist us:

- Payment processors (for secure payment handling)
- Shipping and logistics providers (for order delivery)
- Email service providers (for communications)
- Analytics providers (for website improvement)
- Cloud storage providers (for data backup and security)

These providers are contractually obligated to:

- Use your information only as necessary to provide their services
- Maintain appropriate security standards
- Not disclose your information to unauthorized parties
- Comply with applicable data protection laws

We are not responsible for the privacy practices of third-party websites or services. We encourage you to review their privacy policies before providing any information.`,
  },
  {
    id: "6",
    title: "Your Privacy Rights",
    content: `Depending on your location, you may have certain rights regarding your personal information:

- Right to Access: You can request a copy of the personal information we hold about you
- Right to Correction: You can request that we correct inaccurate or incomplete information
- Right to Deletion: You can request deletion of your personal information (subject to certain legal requirements)
- Right to Restrict Processing: You can request that we limit how we use your information
- Right to Data Portability: You can request your information in a structured format
- Right to Opt-Out: You can opt out of marketing communications at any time
- Right to Withdraw Consent: You can withdraw previously given consent

To exercise any of these rights, please contact us at the email address provided below. We will respond to your request within 30 days or as required by applicable law.`,
  },
  {
    id: "7",
    title: "Children's Privacy",
    content: `Our website and services are not directed to children under 13 years of age. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child under 13, we will promptly delete such information and take appropriate steps to notify the parent or guardian.

If you believe we have collected information from a child under 13, please contact us immediately.`,
  },
  {
    id: "8",
    title: "Contact Us",
    content: `If you have questions about this privacy policy, your information, or our privacy practices, please contact us:

Shrestha Services
Biratnagar, Nepal
Email: privacy@shresthaservices.com
Phone: +977 9800000000

Data Protection Officer: dpo@shresthaservices.com

We will respond to all privacy inquiries within 30 days. If you believe we have violated your privacy rights, you may also file a complaint with your local data protection authority.`,
  },
];

function SectionBody({ content }: { content: string }) {
  return (
    <div className="mt-5 space-y-4 text-ink-soft leading-relaxed">
      {content.split("\n\n").map((paragraph, idx) => {
        if (paragraph.includes("\n-") || paragraph.startsWith("-")) {
          const lines = paragraph.split("\n");
          const intro = lines.find((l) => !l.startsWith("-") && l.trim());
          return (
            <div key={idx} className="space-y-2">
              {intro && <p>{intro}</p>}
              <ul className="space-y-2">
                {lines
                  .filter((l) => l.startsWith("-"))
                  .map((line, lineIdx) => (
                    <li key={lineIdx} className="flex gap-3">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                      <span>{line.replace(/^-\s?/, "")}</span>
                    </li>
                  ))}
              </ul>
            </div>
          );
        }
        return <p key={idx}>{paragraph}</p>;
      })}
    </div>
  );
}

export default function PrivacyPolicyPage() {
  const reduce = useReducedMotion();
  const [activeSection, setActiveSection] = useState("1");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

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
            <Eyebrow>Legal</Eyebrow>
            <h1 className="mt-6 font-display text-[clamp(2.4rem,5vw,4rem)] leading-[1.03] text-balance">
              Privacy Policy
            </h1>
            <p className="mt-5 max-w-prose text-lg text-ink-soft text-pretty">
              Your privacy is important to us. This policy explains how we
              collect, use, and protect your information.
            </p>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.14em] text-muted">
              Last updated: June 2024
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Document */}
      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.32fr_0.68fr] lg:gap-16">
            {/* Sticky TOC */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
                  Contents
                </p>
                <nav className="mt-5 space-y-1">
                  {sections.map((section, i) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className={`group flex items-baseline gap-3 py-1.5 text-sm transition-colors ${
                        activeSection === section.id
                          ? "text-accent"
                          : "text-ink-soft hover:text-ink"
                      }`}
                    >
                      <span className="font-mono text-xs text-muted">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{section.title}</span>
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Sections */}
            <div className="max-w-prose">
              {sections.map((section, i) => (
                <Reveal
                  key={section.id}
                  className="scroll-mt-24 border-t border-line py-10 first:border-t-0 first:pt-0"
                >
                  <section id={section.id}>
                    <span className="font-mono text-xs text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="mt-2 font-display text-2xl leading-tight sm:text-3xl">
                      {section.title}
                    </h2>
                    <SectionBody content={section.content} />
                  </section>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Contact */}
      <section className="border-t border-line bg-paper-dim py-16">
        <Container>
          <div className="max-w-prose">
            <h2 className="font-display text-2xl leading-tight sm:text-3xl">
              Questions about our privacy policy?
            </h2>
            <p className="mt-4 text-ink-soft text-pretty">
              If you have any questions or concerns about how we handle your
              data, please get in touch with our privacy team.
            </p>
            <div className="mt-6">
              <GhostCTA to="/contact">Contact privacy team</GhostCTA>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
