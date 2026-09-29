import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { Container, Eyebrow, Reveal, GhostCTA } from "@/components/marketing/primitives";

export default function FeaturedServices() {
  return (
    <section className="border-t border-line bg-paper py-20 lg:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Sticky editorial intro */}
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>What we make</Eyebrow>
            <h2 className="mt-5 font-display text-4xl leading-tight text-ink sm:text-5xl">
              A full menu, printed under one roof.
            </h2>
            <p className="mt-5 max-w-sm text-ink-soft text-pretty">
              Design, proofing and production happen in the same building — so
              colour stays true and deadlines actually hold.
            </p>
            <GhostCTA to="/services" className="mt-7">
              Browse all services
            </GhostCTA>
          </Reveal>

          {/* Numbered index of services */}
          <ul>
            {services.map((service, i) => (
              <Reveal as="li" key={service.id} delay={i * 0.05}>
                <Link
                  to={`/services/${service.slug}`}
                  className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-x-5 border-b border-line py-6 transition-colors hover:border-line-strong"
                >
                  <span className="font-mono text-xs text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="flex items-center gap-1.5 font-display text-2xl text-ink transition-colors group-hover:text-accent">
                      {service.title}
                      <ArrowUpRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                    </h3>
                    <p className="mt-1 max-w-md text-sm leading-relaxed text-muted">
                      {service.description}
                    </p>
                  </div>
                  <span className="whitespace-nowrap font-mono text-sm text-ink-soft">
                    {service.price}
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
