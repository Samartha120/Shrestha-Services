import { testimonials } from "@/data/testimonials";
import { Container, Eyebrow, Reveal, GhostCTA } from "@/components/marketing/primitives";

export default function TestimonialsPreview() {
  const [featured, ...rest] = testimonials;

  return (
    <section className="border-t border-line bg-paper py-20 lg:py-28">
      <Container>
        <Reveal>
          <Eyebrow>In their words</Eyebrow>
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          {/* Featured quote */}
          <Reveal>
            <figure>
              <blockquote className="font-display text-3xl leading-snug text-ink sm:text-4xl text-balance">
                <span className="text-accent">“</span>
                {featured.review}
                <span className="text-accent">”</span>
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong font-mono text-sm text-ink-soft">
                  {featured.avatar}
                </span>
                <span>
                  <span className="block font-semibold text-ink">
                    {featured.customerName}
                  </span>
                  <span className="block text-sm text-muted">
                    {featured.company}
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>

          {/* Supporting quotes */}
          <div className="flex flex-col justify-between">
            <ul className="space-y-6">
              {rest.map((t, i) => (
                <Reveal as="li" key={t.id} delay={i * 0.08}>
                  <div className="border-t border-line pt-6">
                    <p className="text-ink-soft text-pretty">“{t.review}”</p>
                    <p className="mt-3 text-sm font-semibold text-ink">
                      {t.customerName}
                      <span className="font-normal text-muted">
                        {" "}
                        · {t.company}
                      </span>
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={0.2}>
              <GhostCTA to="/testimonials" className="mt-8">
                Read more reviews
              </GhostCTA>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
