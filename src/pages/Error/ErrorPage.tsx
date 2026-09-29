import { Container, Eyebrow, Reveal, PrimaryCTA, GhostCTA } from "@/components/marketing/primitives";

export default function ErrorPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-paper py-20 text-ink">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow>Something broke</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 font-display text-[clamp(2.6rem,6vw,4.5rem)] leading-[1.02] text-balance">
              A smudge on the page.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-md text-ink-soft text-pretty">
              An unexpected error interrupted this run. You can head back to the
              homepage, or reach out if it keeps happening.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <PrimaryCTA to="/">Back to home</PrimaryCTA>
              <GhostCTA to="/contact">Contact support</GhostCTA>
            </div>
          </Reveal>
        </div>
      </Container>
    </div>
  );
}
