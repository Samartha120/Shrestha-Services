import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useServiceStore } from "@/store/serviceStore";
import {
  Container,
  Eyebrow,
  Reveal,
  PrimaryCTA,
  GhostCTA,
} from "@/components/marketing/primitives";

export default function ServiceDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const { selectedService, fetchServiceBySlug, isLoading, services } =
    useServiceStore();

  useEffect(() => {
    if (slug) {
      fetchServiceBySlug(slug);
    }
  }, [slug, fetchServiceBySlug]);

  const relatedServices = selectedService
    ? services
        .filter(
          (s) =>
            s.category === selectedService.category &&
            s.id !== selectedService.id
        )
        .slice(0, 3)
    : [];

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper text-ink">
        <div className="text-center">
          <div className="mx-auto mb-5 h-8 w-8 animate-spin rounded-full border-2 border-line-strong border-t-accent" />
          <p className="font-mono text-sm uppercase tracking-[0.16em] text-muted">
            Loading service
          </p>
        </div>
      </div>
    );
  }

  if (!selectedService) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper px-6 text-ink">
        <div className="max-w-md text-center">
          <Eyebrow>Not found</Eyebrow>
          <h1 className="mt-6 font-display text-3xl leading-tight text-ink text-balance sm:text-4xl">
            We couldn't find that service.
          </h1>
          <p className="mt-4 text-ink-soft text-pretty">
            The page may have moved, or the link may be out of date.
          </p>
          <div className="mt-8 flex justify-center">
            <PrimaryCTA to="/services">Back to services</PrimaryCTA>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-paper text-ink">
      {/* Back + breadcrumb */}
      <div className="border-b border-line py-5">
        <Container>
          <Link
            to="/services"
            className="group inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
            Back to services
          </Link>
          <nav className="mt-3 flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted">
            <Link to="/" className="transition-colors hover:text-accent">
              Home
            </Link>
            <span aria-hidden>/</span>
            <Link to="/services" className="transition-colors hover:text-accent">
              Services
            </Link>
            <span aria-hidden>/</span>
            <span className="text-ink-soft">{selectedService.title}</span>
          </nav>
        </Container>
      </div>

      {/* Hero */}
      <section className="border-b border-line py-12 lg:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
            <div>
              {selectedService.category && (
                <Reveal>
                  <Eyebrow>{selectedService.category}</Eyebrow>
                </Reveal>
              )}
              <Reveal delay={0.05}>
                <h1 className="mt-6 font-display text-[clamp(2.4rem,5.5vw,4rem)] leading-[1.03] text-ink text-balance">
                  {selectedService.title}
                </h1>
              </Reveal>
              {typeof selectedService.basePrice === "number" && (
                <Reveal delay={0.1}>
                  <p className="mt-6 font-mono text-sm text-ink-soft">
                    from NPR {selectedService.basePrice}
                    <span className="text-muted">/sq.ft</span>
                  </p>
                </Reveal>
              )}
              <Reveal delay={0.15}>
                <div className="mt-8">
                  <PrimaryCTA to={`/quote?serviceId=${selectedService.id}`}>
                    Request a quote
                  </PrimaryCTA>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-sm border border-line bg-surface-2">
                <div className="aspect-[4/3]">
                  <img
                    src={selectedService.image}
                    alt={selectedService.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* About */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <Reveal>
              <Eyebrow>About this service</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="max-w-2xl text-lg leading-relaxed text-ink-soft text-pretty">
                {selectedService.description}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Materials */}
      {selectedService.materials && selectedService.materials.length > 0 && (
        <section className="border-t border-line bg-surface-2 py-20 lg:py-28">
          <Container>
            <Reveal>
              <Eyebrow>Materials</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 max-w-2xl font-display text-3xl leading-tight text-ink text-balance sm:text-4xl">
                Options we produce this in.
              </h2>
            </Reveal>
            <ul className="mt-12">
              {selectedService.materials.map((material, i) => (
                <Reveal as="li" key={material} delay={(i % 6) * 0.05}>
                  <div className="grid grid-cols-[3rem_1fr] items-baseline gap-x-6 border-t border-line py-6">
                    <span className="font-mono text-sm text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-xl text-ink sm:text-2xl">
                      {material}
                    </h3>
                  </div>
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {/* Features */}
      {selectedService.features && selectedService.features.length > 0 && (
        <section className="py-20 lg:py-28">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
              <Reveal>
                <h2 className="font-display text-3xl leading-tight text-ink text-balance sm:text-4xl">
                  What's included.
                </h2>
              </Reveal>
              <div>
                {selectedService.features.map((feature, i) => (
                  <Reveal key={feature} delay={(i % 6) * 0.06}>
                    <div className="flex items-start gap-4 border-t border-line py-6">
                      <span className="mt-1 font-mono text-xs text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="font-medium text-ink">{feature}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* CTA band */}
      <section className="bg-ink py-20 text-inverse lg:py-28">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="max-w-2xl font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.05] text-inverse text-balance">
                Ready to start your {selectedService.title.toLowerCase()}?
              </h2>
              <p className="mt-5 max-w-md text-inverse/70 text-pretty">
                Tell us the details and we'll put together a written quote — from
                our shop on Main Road, Biratnagar.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-6">
              <PrimaryCTA
                to={`/quote?serviceId=${selectedService.id}`}
                className="bg-inverse text-ink hover:bg-accent hover:text-inverse"
              >
                Request a quote
              </PrimaryCTA>
              <GhostCTA
                to="/contact"
                className="text-inverse/80 hover:text-inverse"
              >
                Contact us
              </GhostCTA>
            </div>
          </div>
        </Container>
      </section>

      {/* Related services */}
      {relatedServices.length > 0 && (
        <section className="py-20 lg:py-28">
          <Container>
            <Reveal>
              <Eyebrow>More in {selectedService.category}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 max-w-2xl font-display text-3xl leading-tight text-ink text-balance sm:text-4xl">
                Related services.
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {relatedServices.map((service, i) => (
                <Reveal key={service.id} delay={(i % 3) * 0.08}>
                  <Link to={`/services/${service.slug}`} className="group block">
                    <div className="overflow-hidden rounded-sm border border-line bg-surface-2">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={service.image}
                          alt={service.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                        />
                      </div>
                    </div>
                    <div className="mt-5 flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-xl text-ink transition-colors group-hover:text-accent">
                          {service.title}
                        </h3>
                        <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-soft text-pretty line-clamp-2">
                          {service.description}
                        </p>
                      </div>
                      <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 -translate-x-1 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}
