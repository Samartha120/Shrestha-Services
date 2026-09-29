import { Container } from "@/components/marketing/primitives";

const partners = [
  "Tech Solutions Nepal",
  "Creative Agency",
  "Retail Chain",
  "Event Management",
  "Hotel Group",
  "Corporate Brand",
];

export default function Partners() {
  const row = [...partners, ...partners];

  return (
    <section className="border-y border-line bg-paper py-14">
      <Container className="mb-8">
        <p className="eyebrow">Trusted by teams around Biratnagar</p>
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
        <div className="ss-marquee flex w-max items-center gap-14 pr-14">
          {row.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="whitespace-nowrap font-display text-2xl text-faint transition-colors hover:text-ink sm:text-3xl"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
