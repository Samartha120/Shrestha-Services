import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { galleryImages } from "@/data/gallery";
import { Container, Eyebrow, Reveal, GhostCTA } from "@/components/marketing/primitives";

const categoryLabels: Record<string, string> = {
  signage: "Signage",
  "large-format": "Large format",
  "vehicle-wraps": "Vehicle wraps",
  "digital-prints": "Digital print",
};

export default function HomeGallery() {
  const items = galleryImages.slice(0, 5);

  return (
    <section className="border-t border-line bg-surface-2 py-20 lg:py-28">
      <Container>
        <Reveal className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>Recent work</Eyebrow>
            <h2 className="mt-5 font-display text-4xl leading-tight text-ink sm:text-5xl">
              Off the press, onto the street.
            </h2>
          </div>
          <GhostCTA to="/gallery">View the full portfolio</GhostCTA>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-5">
          {items.map((item, i) => (
            <Reveal
              key={item.id}
              delay={i * 0.06}
              className={i === 0 ? "col-span-2 lg:col-span-2 lg:row-span-2" : ""}
            >
              <Link
                to="/gallery"
                className="group relative flex h-full min-h-[180px] flex-col justify-end overflow-hidden rounded-sm border border-line-strong bg-ink p-5 text-inverse"
              >
                {/* specimen texture, not a glowing blob */}
                <span
                  aria-hidden
                  className="absolute inset-0 opacity-[0.12] transition-opacity duration-500 group-hover:opacity-20"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 9px)",
                  }}
                />
                <span
                  aria-hidden
                  className="absolute right-4 top-4 font-mono text-[11px] text-inverse/50"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="relative">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                    {categoryLabels[item.category] ?? item.category}
                  </p>
                  <h3 className="mt-1 flex items-center gap-1 font-display text-xl text-inverse sm:text-2xl">
                    {item.title}
                    <ArrowUpRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
