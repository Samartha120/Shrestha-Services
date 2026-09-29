import { useRef, useState, useEffect } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { statistics } from "@/data/statistics";
import { Container } from "@/components/marketing/primitives";

function AnimatedCounter({ end }: { end: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;
    if (reduce) {
      setCount(end);
      return;
    }
    let raf = 0;
    const duration = 1400;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(end * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, end, reduce]);

  return (
    <span ref={ref}>
      {count}
      <span className="text-accent">+</span>
    </span>
  );
}

export default function Statistics() {
  return (
    <section className="bg-ink py-20 text-inverse lg:py-24">
      <Container>
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-3 eyebrow text-faint">
              <span className="h-px w-6 bg-accent" aria-hidden />
              By the numbers
            </span>
            <p className="mt-4 max-w-md font-display text-2xl text-inverse/90">
              A decade of work you can point at around the city.
            </p>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-y-10 border-t border-white/10 pt-10 lg:grid-cols-4">
          {statistics.map((stat) => (
            <div key={stat.label} className="border-l border-white/10 pl-5 first:border-l-0 first:pl-0 lg:border-l lg:pl-8 lg:first:border-l-0">
              <dd className="font-display text-5xl leading-none text-inverse lg:text-6xl">
                <AnimatedCounter end={stat.value} />
              </dd>
              <dt className="mt-3 text-sm text-inverse/60">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
