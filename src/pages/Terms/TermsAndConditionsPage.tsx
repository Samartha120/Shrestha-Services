import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container, Eyebrow, Reveal, GhostCTA } from "@/components/marketing/primitives";

const sections = [
  {
    id: "1",
    title: "Agreement to Terms",
    content: `By accessing and using this website ("Service"), you accept and agree to be bound by the terms of this agreement. If you do not agree to abide by the above, please do not use this Service.

These Terms and Conditions constitute the entire agreement between Shrestha Services and you regarding your use of this website. The failure of Shrestha Services to enforce any right or provision of these terms will not be considered a waiver of those rights.

You acknowledge and agree that these terms are non-negotiable. By using the Service, you affirm that you are at least the age of majority in your country of residence.`,
  },
  {
    id: "2",
    title: "Use License",
    content: `Permission is granted to temporarily download one copy of the materials (information or software) on Shrestha Services's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:

- Modifying or copying the materials
- Using the materials for any commercial purpose or for any public display
- Attempting to decompile or reverse engineer any software contained on the website
- Removing any copyright or other proprietary notations from the materials
- Transferring the materials to another person or "mirroring" the materials on any other server
- Using the materials for any illegal purpose or in violation of any applicable law or regulation

This license shall automatically terminate if you violate any of these restrictions and may be terminated by Shrestha Services at any time. Upon termination of your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.`,
  },
  {
    id: "3",
    title: "Disclaimer",
    content: `The materials on Shrestha Services's website are provided on an "as is" basis. Shrestha Services makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.

Further, Shrestha Services does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.`,
  },
  {
    id: "4",
    title: "Limitations",
    content: `In no event shall Shrestha Services or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Shrestha Services's website, even if Shrestha Services or an authorized representative has been notified orally or in writing of the possibility of such damage.

Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.

The maximum liability of Shrestha Services for any claim arising out of or relating to this agreement shall not exceed the total amount paid by you for services.`,
  },
  {
    id: "5",
    title: "Accuracy of Materials",
    content: `The materials appearing on Shrestha Services's website could include technical, typographical, or photographic errors. Shrestha Services does not warrant that any of the materials on its website are accurate, complete, or current. Shrestha Services may make changes to the materials contained on its website at any time without notice.

Shrestha Services does not make any commitment to update the materials. We recommend verifying all information before making any decisions based on our materials.`,
  },
  {
    id: "6",
    title: "Links",
    content: `Shrestha Services has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Shrestha Services of the site. Use of any such linked website is at the user's own risk.

If you believe that content on our website infringes your copyright or trademark, or if you believe that content linked from our website violates your rights, please contact us immediately at legal@shresthaservices.com.`,
  },
  {
    id: "7",
    title: "Modifications",
    content: `Shrestha Services may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.

We will provide notice of material changes to this agreement by posting the new terms on our website and updating the "Last Updated" date. Your continued use of the Service after any changes constitute your acceptance of the new terms.`,
  },
  {
    id: "8",
    title: "Governing Law",
    content: `These terms and conditions are governed by and construed in accordance with the laws of Nepal, and you irrevocably submit to the exclusive jurisdiction of the courts in Biratnagar, Nepal.

If any provision of these terms is found to be invalid or unenforceable, the remaining provisions will continue in full force and effect.`,
  },
  {
    id: "9",
    title: "Order and Payment Terms",
    content: `Orders placed through our website are subject to acceptance and confirmation by Shrestha Services. We reserve the right to refuse or cancel any order at our discretion, including orders that appear fraudulent or violate our policies.

All prices are in Nepalese Rupees (NPR) unless otherwise specified. Prices are subject to change without notice. We reserve the right to correct any pricing errors or omissions that may appear on the website.

Payment must be received in full before production begins, unless otherwise agreed in writing. We accept various payment methods as displayed on our website. All transactions are processed securely through third-party payment providers.

For orders requiring advance payment, a non-refundable deposit may be required to secure your order and begin production.`,
  },
  {
    id: "10",
    title: "Delivery and Shipping",
    content: `We strive to deliver orders according to the agreed timeline. However, Shrestha Services is not liable for delays caused by circumstances beyond our reasonable control, including but not limited to:

- Natural disasters or force majeure events
- Strikes or labor disputes
- Courier company delays
- Customs or government action
- Extreme weather conditions

Delivery times are estimates and not guaranteed. Shipping charges are calculated based on weight, size, and destination. International orders may be subject to additional customs duties and taxes.

Risk of loss transfers to you upon delivery. You are responsible for inspecting goods upon receipt and reporting any damage within 48 hours.`,
  },
  {
    id: "11",
    title: "Returns and Refunds",
    content: `We take pride in the quality of our work. If you are unsatisfied with your order due to our error or defect in materials, please contact us within 7 days of delivery.

We will work with you to resolve quality issues, which may include:

- Reprinting the order at no cost
- Providing a partial refund
- Full refund if reprint is not feasible

Returns must be made in original condition. Non-defective returns may be subject to a restocking fee. Custom orders are generally non-refundable unless there is an error on our part.

To initiate a return or claim a quality issue, contact our customer service at support@shresthaservices.com with photos and details of the problem.`,
  },
  {
    id: "12",
    title: "Intellectual Property Rights",
    content: `All content on our website, including text, graphics, logos, images, and software, is the property of Shrestha Services or its suppliers and is protected by international copyright laws.

Designs and artwork created by Shrestha Services remain our property unless otherwise agreed in writing. By ordering custom design services, you grant Shrestha Services a non-exclusive right to use the final design for portfolio and promotional purposes, unless you specify otherwise in writing.

You retain all rights to your original content and materials that you provide to us. You grant Shrestha Services a non-exclusive license to use your materials for the purpose of fulfilling your order.`,
  },
  {
    id: "13",
    title: "Limitation of Liability",
    content: `To the maximum extent permitted by law, in no event shall Shrestha Services be liable for any indirect, incidental, special, consequential, or punitive damages, regardless of the cause of action.

Our total liability for all claims arising from or relating to this agreement shall not exceed the amount you paid for the relevant order or service, or NPR 10,000, whichever is greater.

Some jurisdictions do not allow the limitation or exclusion of liability for incidental or consequential damages, so some of the above limitations may not apply to you.`,
  },
  {
    id: "14",
    title: "Contact Information",
    content: `For any questions, concerns, or disputes regarding these terms and conditions, please contact us:

Shrestha Services
Biratnagar, Nepal
Email: legal@shresthaservices.com
Phone: +977 9800000000
Customer Support: support@shresthaservices.com

We are committed to resolving any issues in a fair and timely manner.`,
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

export default function TermsAndConditionsPage() {
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
              Terms &amp; Conditions
            </h1>
            <p className="mt-5 max-w-prose text-lg text-ink-soft text-pretty">
              Please read these terms carefully before using our website and
              services. By using Shrestha Services, you agree to comply with
              these terms.
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
              Questions about our terms?
            </h2>
            <p className="mt-4 text-ink-soft text-pretty">
              If you have any questions or concerns about our terms and
              conditions, please contact our legal team.
            </p>
            <div className="mt-6">
              <GhostCTA to="/contact">Contact legal team</GhostCTA>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
