import { Container } from "@/components/marketing/primitives";

/*
 * Instead of naming clients we can't verify, we show the kinds of work that
 * come through the shop — honest, and still communicates range.
 */
const clientTypes = [
  "Shopfronts",
  "Restaurants & cafés",
  "Events & weddings",
  "Contractors",
  "Schools & offices",
  "Hotels",
  "Political & campaigns",
  "Retail brands",
];

export default function Partners() {
  const row = [...clientTypes, ...clientTypes];

  return (
    <section className="border-y border-line bg-paper py-14">
      <Container className="mb-8">
        <p className="eyebrow">The kind of work we take on</p>
      </Container>

      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="ss-marquee flex w-max items-center gap-12 pr-12">
          {row.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="flex items-center gap-12 whitespace-nowrap font-display text-2xl text-faint transition-colors hover:text-ink sm:text-3xl"
            >
              {name}
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent/40" aria-hidden />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
