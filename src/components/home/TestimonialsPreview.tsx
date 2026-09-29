import { Container, Eyebrow, Reveal, GhostCTA } from "@/components/marketing/primitives";

/*
 * Trust band. No fabricated reviews or ratings — the honest version is a plain
 * statement of how the shop works and what a customer can hold us to.
 */
const commitments = [
  {
    t: "A written quote, not a guess",
    d: "You get dimensions, material and price in writing before anything goes on the press — usually the same day.",
  },
  {
    t: "Proof before we print",
    d: "Artwork is checked and colour-matched, and you sign off on a proof, so the first print is the right one.",
  },
  {
    t: "Seen through to the wall",
    d: "Cutting, lamination, mounting and on-site install are handled by the same team that printed the job.",
  },
];

export default function TestimonialsPreview() {
  return (
    <section className="border-t border-line bg-paper py-20 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <Reveal>
              <Eyebrow>Why the work holds up</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-3xl leading-tight text-ink sm:text-4xl text-balance">
                What you can hold us to.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-sm text-ink-soft text-pretty">
                A sign is up for years. We'd rather get it right than get it out
                the door fast.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <GhostCTA to="/about" className="mt-7">
                How we work
              </GhostCTA>
            </Reveal>
          </div>

          <ul>
            {commitments.map((c, i) => (
              <Reveal as="li" key={c.t} delay={i * 0.08}>
                <div className="grid grid-cols-[3rem_1fr] gap-4 border-t border-line py-7 first:border-t-0 first:pt-0 sm:py-8">
                  <span className="font-mono text-sm text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-xl text-ink">{c.t}</h3>
                    <p className="mt-2 max-w-lg text-ink-soft text-pretty">
                      {c.d}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
