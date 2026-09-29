import { Gauge, Layers, PenTool, Truck, Palette, ShieldCheck } from "lucide-react";
import { Container, Eyebrow, Reveal } from "@/components/marketing/primitives";

const capabilities = [
  {
    icon: PenTool,
    title: "Design that prints",
    description:
      "Files are checked for bleed, resolution and colour before anything reaches the press — no surprises on collection day.",
  },
  {
    icon: Palette,
    title: "Colour we stand behind",
    description:
      "Calibrated profiles and a printed proof on request, so the red on screen is the red on your board.",
  },
  {
    icon: Gauge,
    title: "Honest turnaround",
    description:
      "Most jobs move in 48 hours. Rush work is possible — we'll tell you plainly if it isn't.",
  },
  {
    icon: Layers,
    title: "Materials that last outdoors",
    description:
      "UV-stable inks and cast vinyls rated for Biratnagar heat, dust and monsoon.",
  },
  {
    icon: Truck,
    title: "Fitted, not just handed over",
    description:
      "Sign boards and wraps are installed by our own team, squared and levelled on site.",
  },
  {
    icon: ShieldCheck,
    title: "One point of contact",
    description:
      "The person who quotes your job sees it through production to delivery.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="border-t border-line bg-surface-2 py-20 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <Eyebrow>Why work with us</Eyebrow>
            <h2 className="mt-5 font-display text-4xl leading-tight text-ink sm:text-5xl text-balance">
              A print shop should be judged on the wall, not the website.
            </h2>
            <p className="mt-6 max-w-sm text-ink-soft text-pretty">
              We're a small, hands-on team. That means the details other shops
              skip — proofing, finishing, a clean install — are the ones we care
              about most.
            </p>
          </Reveal>

          <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <Reveal key={cap.title} delay={(i % 2) * 0.08}>
                  <div className="border-t border-line-strong pt-5">
                    <Icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
                    <h3 className="mt-4 font-display text-xl text-ink">
                      {cap.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {cap.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
