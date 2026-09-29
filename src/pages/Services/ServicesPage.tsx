import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useServiceStore } from "@/store/serviceStore";
import {
  Container,
  Eyebrow,
  Reveal,
  PrimaryCTA,
} from "@/components/marketing/primitives";

export default function ServicesPage() {
  const { services, fetchServices, isLoading } = useServiceStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const categories = Array.from(
    new Set(services.filter((s) => s.category).map((s) => s.category!))
  );

  const filtered = selectedCategory
    ? services.filter((s) => s.category === selectedCategory)
    : services;

  return (
    <div className="bg-paper text-ink">
      {/* Hero */}
      <section className="border-b border-line py-20 lg:py-28">
        <Container>
          <Reveal>
            <Eyebrow>What we make</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.6rem,6vw,4.5rem)] leading-[1.02] text-ink text-balance">
              Everything a sign, a wall or a shopfront could ask for.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft text-pretty">
              Flex and banners, acrylic and metal boards, vehicle wraps, decals
              and everyday print — designed, produced and installed from our
              shop on Main Road, Biratnagar.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-9">
              <PrimaryCTA to="/quote">Start a quote</PrimaryCTA>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Filter + list */}
      <section className="py-16 lg:py-20">
        <Container>
          {/* Category filter */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-line pb-6">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`text-sm font-medium transition-colors ${
                selectedCategory === null
                  ? "text-accent"
                  : "text-ink-soft hover:text-ink"
              }`}
            >
              All work
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "text-accent"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* List */}
          {isLoading ? (
            <div className="mt-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-24 animate-pulse border-b border-line bg-paper-dim/60"
                />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="py-16 text-center text-ink-soft">
              No services found in this category.
            </p>
          ) : (
            <ul className="mt-2">
              {filtered.map((service, i) => (
                <Reveal as="li" key={service.id} delay={(i % 6) * 0.05}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="group grid grid-cols-[auto_1fr] items-baseline gap-x-6 border-b border-line py-8 sm:grid-cols-[3rem_1fr_auto]"
                  >
                    <span className="font-mono text-sm text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-display text-2xl text-ink transition-colors group-hover:text-accent sm:text-3xl">
                          {service.title}
                        </h2>
                        <ArrowUpRight className="h-5 w-5 -translate-x-1 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                      </div>
                      {service.category && (
                        <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                          {service.category}
                        </p>
                      )}
                      {service.description && (
                        <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-soft text-pretty">
                          {service.description}
                        </p>
                      )}
                    </div>
                    {service.basePrice && (
                      <span className="col-start-2 mt-3 font-mono text-sm text-ink-soft sm:col-start-3 sm:mt-0 sm:text-right">
                        from NPR {service.basePrice}
                        <span className="text-muted">/sq.ft</span>
                      </span>
                    )}
                  </Link>
                </Reveal>
              ))}
            </ul>
          )}
        </Container>
      </section>

      {/* Closing CTA */}
      <section className="bg-ink py-20 text-inverse lg:py-28">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="max-w-2xl font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.05] text-inverse text-balance">
              Not sure what you need? Tell us the job.
            </h2>
            <Link
              to="/quote"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-inverse px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-accent hover:text-inverse"
            >
              Request a quote
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
