import { Link } from "react-router-dom";
import { Container, Eyebrow, Reveal, PrimaryCTA, GhostCTA } from "@/components/marketing/primitives";

const quickLinks = [
  { name: "Services", path: "/services" },
  { name: "Gallery", path: "/gallery" },
  { name: "Blog", path: "/blog" },
  { name: "FAQ", path: "/faq" },
];

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-paper py-20 text-ink">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow>Error 404</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-8 font-display text-[clamp(5rem,18vw,11rem)] leading-none tracking-tight text-ink">
              404
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-4 font-display text-[clamp(1.6rem,4vw,2.4rem)] leading-tight text-balance">
              This page never went to press.
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mx-auto mt-4 max-w-md text-ink-soft text-pretty">
              The page you're looking for may have moved or no longer exists.
              Let's get you back on track.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <PrimaryCTA to="/">Back to home</PrimaryCTA>
              <GhostCTA to="/contact">Contact support</GhostCTA>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mx-auto mt-14 max-w-md border-t border-line pt-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
                Or explore
              </p>
              <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm font-medium text-ink-soft underline decoration-line decoration-1 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </div>
  );
}
