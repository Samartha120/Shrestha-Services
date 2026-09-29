import {
  PenTool,
  Layers,
  Truck,
  Printer,
  ShieldCheck,
  Ruler,
} from "lucide-react";
import {
  Container,
  Eyebrow,
  Reveal,
  PrimaryCTA,
  GhostCTA,
} from "@/components/marketing/primitives";

const beliefs = [
  {
    title: "Make it right, not just fast",
    body: "A sign is up for years. We proof carefully, colour-match, and check the finish before anything leaves the shop.",
  },
  {
    title: "One shop, start to finish",
    body: "Design, printing, cutting and installation happen under one roof — so nothing gets lost in a hand-off.",
  },
  {
    title: "Straight answers, fair prices",
    body: "We quote in writing, explain the trade-offs, and don't upsell you into material you don't need.",
  },
];

const capabilities = [
  { icon: PenTool, label: "In-house design & artwork" },
  { icon: Printer, label: "Large-format flex & digital print" },
  { icon: Layers, label: "Acrylic, metal & LED sign boards" },
  { icon: Ruler, label: "Vinyl decals & vehicle wraps" },
  { icon: Truck, label: "Delivery & on-site installation" },
  { icon: ShieldCheck, label: "Finishing, lamination & mounting" },
];

const team = [
  {
    name: "Sanjeev Shrestha",
    role: "Managing Director",
    initials: "SS",
    bio: "Runs the shop and keeps every job moving from quote to install.",
  },
  {
    name: "Jeetendra Pradhan",
    role: "Operations Manager",
    initials: "JP",
    bio: "Coordinates production schedules and on-site work across town.",
  },
  {
    name: "Santosh Kumar",
    role: "Digital Print Specialist",
    initials: "SK",
    bio: "Handles the presses, colour calibration and quality checks.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-paper text-ink">
      {/* Hero */}
      <section className="border-b border-line py-20 lg:py-28">
        <Container>
          <Reveal>
            <Eyebrow>Our story</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.6rem,6vw,4.5rem)] leading-[1.02] text-balance">
              A working print shop on Main Road, Biratnagar.
            </h1>
          </Reveal>
          <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-16">
            <Reveal delay={0.1}>
              <p className="text-lg leading-relaxed text-ink-soft text-pretty">
                Shrestha Services started as a small signage counter and grew
                into a full print house — the kind of place a shopkeeper, a
                contractor or an event team can walk into and leave with the job
                sorted.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-lg leading-relaxed text-ink-soft text-pretty">
                Today we cover everything from a single name-plate to a
                storefront full of boards, banners and wrapped vehicles. The
                machines changed over the years; the habit of doing careful work
                did not.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Beliefs */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <Reveal>
              <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl text-balance">
                How we like to work.
              </h2>
            </Reveal>
            <div>
              {beliefs.map((b, i) => (
                <Reveal key={b.title} delay={i * 0.08}>
                  <div className="border-t border-line py-7">
                    <h3 className="font-display text-xl text-ink">{b.title}</h3>
                    <p className="mt-2 max-w-lg text-ink-soft text-pretty">
                      {b.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Capabilities */}
      <section className="border-t border-line bg-surface-2 py-20 lg:py-28">
        <Container>
          <Reveal>
            <Eyebrow>In the shop</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 max-w-2xl font-display text-3xl leading-tight text-ink sm:text-4xl text-balance">
              Everything under one roof.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c, i) => {
              const Icon = c.icon;
              return (
                <Reveal key={c.label} delay={(i % 3) * 0.06}>
                  <div className="flex items-start gap-4 border-t border-line pt-5">
                    <Icon
                      className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                      strokeWidth={1.5}
                    />
                    <p className="font-medium text-ink">{c.label}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="py-20 lg:py-28">
        <Container>
          <Reveal>
            <Eyebrow>The people</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 max-w-2xl font-display text-3xl leading-tight text-ink sm:text-4xl text-balance">
              A small team that sees the job through.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={(i % 3) * 0.08}>
                <div className="border-t border-line pt-6">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-line-strong font-mono text-sm text-ink-soft">
                    {m.initials}
                  </span>
                  <h3 className="mt-5 font-display text-xl text-ink">
                    {m.name}
                  </h3>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                    {m.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft text-pretty">
                    {m.bio}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-ink py-20 text-inverse lg:py-28">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="max-w-2xl font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.05] text-inverse text-balance">
                Come by, or send us the details.
              </h2>
              <p className="mt-5 max-w-md text-inverse/70 text-pretty">
                We're on Main Road, Biratnagar, Sunday to Friday. A written quote
                usually comes back the same day.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-6">
              <PrimaryCTA
                to="/quote"
                className="bg-inverse text-ink hover:bg-accent hover:text-inverse"
              >
                Get a quote
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
    </div>
  );
}
