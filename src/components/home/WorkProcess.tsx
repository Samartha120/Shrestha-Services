import { MessageSquare, PenTool, Printer, Truck } from "lucide-react";
import { Container, Eyebrow, Reveal } from "@/components/marketing/primitives";

const steps = [
  {
    icon: MessageSquare,
    title: "Talk it through",
    description:
      "Tell us the job — sizes, where it's going, when you need it. We quote in writing.",
  },
  {
    icon: PenTool,
    title: "Design & proof",
    description:
      "We set artwork and send a proof. Nothing prints until you sign it off.",
  },
  {
    icon: Printer,
    title: "Production",
    description:
      "Printed, laminated and finished in-house on calibrated machines.",
  },
  {
    icon: Truck,
    title: "Deliver & install",
    description:
      "Collected, delivered, or fitted on site by our own team — squared and clean.",
  },
];

export default function WorkProcess() {
  return (
    <section className="border-t border-line bg-paper py-20 lg:py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>How a job runs</Eyebrow>
          <h2 className="mt-5 font-display text-4xl leading-tight text-ink sm:text-5xl">
            Four steps, and you always know where it stands.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.title} delay={i * 0.1}>
                <div className="relative lg:pr-6">
                  {/* connector */}
                  <div className="flex items-center gap-3">
                    <span className="font-display text-5xl leading-none text-line-strong">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="hidden h-px flex-1 bg-line lg:block" />
                  </div>
                  <Icon
                    className="mt-6 h-5 w-5 text-accent"
                    strokeWidth={1.5}
                  />
                  <h3 className="mt-3 font-display text-xl text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
