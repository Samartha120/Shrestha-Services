import { Link } from "react-router-dom";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import { Container, Reveal } from "@/components/marketing/primitives";

const contactRows = [
  { icon: Phone, label: "Call the shop", value: "+977-21-441234" },
  { icon: Mail, label: "Email us", value: "info@shresthaservices.com.np" },
  { icon: MapPin, label: "Visit", value: "Main Road, Biratnagar" },
];

export default function ContactCTA() {
  return (
    <section className="bg-ink py-24 text-inverse lg:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <Reveal>
            <span className="inline-flex items-center gap-3 eyebrow text-faint">
              <span className="h-px w-6 bg-accent" aria-hidden />
              Start a project
            </span>
            <h2 className="mt-6 font-display text-[clamp(2.4rem,5vw,4rem)] leading-[1.02] text-inverse text-balance">
              Have a job in mind? Let&apos;s get it on paper.
            </h2>
            <p className="mt-6 max-w-md text-inverse/70 text-pretty">
              Send the details and we&apos;ll come back with a written quote —
              usually the same day. No obligation, no pushy follow-ups.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link
                to="/quote"
                className="group inline-flex items-center gap-2 rounded-full bg-inverse px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-accent hover:text-inverse"
              >
                Request a quote
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="text-sm font-semibold text-inverse/80 underline-offset-4 transition-colors hover:text-inverse hover:underline"
              >
                Or send a message
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col justify-center">
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {contactRows.map((row) => {
                const Icon = row.icon;
                return (
                  <li key={row.label} className="flex items-center gap-4 py-5">
                    <Icon
                      className="h-5 w-5 shrink-0 text-accent"
                      strokeWidth={1.5}
                    />
                    <div>
                      <p className="text-xs uppercase tracking-widest text-inverse/50">
                        {row.label}
                      </p>
                      <p className="mt-0.5 font-medium text-inverse">
                        {row.value}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
