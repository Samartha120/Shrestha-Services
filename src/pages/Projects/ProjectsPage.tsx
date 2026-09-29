import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useProjectStore } from "@/store/projectStore";
import type { Project } from "@/types/project.types";
import {
  Container,
  Eyebrow,
  Reveal,
  PrimaryCTA,
} from "@/components/marketing/primitives";

const EASE = [0.22, 1, 0.36, 1] as const;

function ProjectCard({
  project,
  aspect,
  featured = false,
}: {
  project: Project;
  aspect: string;
  featured?: boolean;
}) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group block"
      aria-label={`View project: ${project.title}`}
    >
      <div className="relative overflow-hidden rounded-sm bg-paper-dim">
        <div className={aspect}>
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
          />
        </div>
        <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/25" />
        <span className="absolute bottom-4 left-4 inline-flex translate-y-2 items-center gap-1.5 rounded-full bg-paper/95 px-3.5 py-1.5 text-xs font-semibold text-ink opacity-0 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100">
          View project
          <ArrowUpRight className="h-3.5 w-3.5 text-accent" />
        </span>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          {project.category && (
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
              {project.category}
            </p>
          )}
          <h3
            className={`mt-1.5 font-display text-ink transition-colors duration-300 group-hover:text-accent ${
              featured ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl"
            }`}
          >
            {project.title}
          </h3>
          {featured && project.description && (
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-soft text-pretty">
              {project.description}
            </p>
          )}
        </div>
        <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 -translate-x-1 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
      </div>
    </Link>
  );
}

export default function ProjectsPage() {
  const { projects, fetchProjects, isLoading } = useProjectStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const categories = useMemo(
    () =>
      Array.from(
        new Set(
          projects
            .filter((p) => p.category)
            .map((p) => p.category as string)
        )
      ),
    [projects]
  );

  const filtered = selectedCategory
    ? projects.filter((p) => p.category === selectedCategory)
    : projects;

  const [feature, ...rest] = filtered;

  return (
    <div className="bg-paper text-ink">
      {/* Hero */}
      <section className="border-b border-line py-20 lg:py-28">
        <Container>
          <Reveal>
            <Eyebrow>Selected work</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.6rem,6vw,4.5rem)] leading-[1.02] text-ink text-balance">
              Signage, print and wraps we've put out on the street.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft text-pretty">
              A look at boards, banners, vehicle wraps and interior graphics
              produced and installed from our shop — designed to be read from a
              distance and to last through the seasons.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-9">
              <PrimaryCTA to="/quote">Start a project</PrimaryCTA>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Filter + grid */}
      <section className="py-16 lg:py-20">
        <Container>
          {/* Category filter */}
          {categories.length > 0 && (
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-line pb-6">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`text-sm font-medium transition-colors ${
                  selectedCategory === null
                    ? "text-accent"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                All work
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "text-accent"
                      : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {/* Grid */}
          {isLoading ? (
            <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
              <div className="aspect-[16/9] animate-pulse rounded-sm bg-paper-dim/70 lg:col-span-12" />
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className={`aspect-[4/3] animate-pulse rounded-sm bg-paper-dim/70 ${
                    i % 2 === 0 ? "lg:col-span-7" : "lg:col-span-5"
                  }`}
                />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="py-20 text-center text-ink-soft">
              No projects in this category yet.
            </p>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 lg:grid-cols-12">
              {/* Feature */}
              {feature && (
                <motion.div
                  className="lg:col-span-12"
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <ProjectCard
                    project={feature}
                    aspect="aspect-[16/9]"
                    featured
                  />
                </motion.div>
              )}

              {/* Rest — alternating asymmetric pairs */}
              {rest.map((project, i) => {
                const pairIndex = Math.floor(i / 2);
                const posInPair = i % 2;
                const wide =
                  pairIndex % 2 === 0 ? posInPair === 0 : posInPair === 1;
                const isLastAlone =
                  i === rest.length - 1 && rest.length % 2 === 1;
                const span = isLastAlone
                  ? "lg:col-span-12"
                  : wide
                    ? "lg:col-span-7"
                    : "lg:col-span-5";
                const aspect = isLastAlone
                  ? "aspect-[16/9]"
                  : wide
                    ? "aspect-[16/10]"
                    : "aspect-[4/3]";
                return (
                  <motion.div
                    key={project.id}
                    className={span}
                    initial={reduce ? false : { opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      duration: 0.6,
                      delay: (i % 2) * 0.06,
                      ease: EASE,
                    }}
                  >
                    <ProjectCard project={project} aspect={aspect} />
                  </motion.div>
                );
              })}
            </div>
          )}
        </Container>
      </section>

      {/* Closing CTA */}
      <section className="bg-ink py-20 text-inverse lg:py-28">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="max-w-2xl font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.05] text-inverse text-balance">
              Have a wall, a shopfront or a fleet in mind?
            </h2>
            <Link
              to="/quote"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-inverse px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-accent hover:text-inverse"
            >
              Request a quote
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
