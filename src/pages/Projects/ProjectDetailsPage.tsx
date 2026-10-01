import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { useProjectStore } from "@/store/projectStore";
import {
  Container,
  Eyebrow,
  Reveal,
} from "@/components/marketing/primitives";
import { usePageMeta } from "@/components/common/RouteMeta";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ProjectDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { selectedProject, fetchProjectBySlug, isLoading, projects } =
    useProjectStore();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (slug) {
      fetchProjectBySlug(slug);
    }
  }, [slug, fetchProjectBySlug]);

  const relatedProjects = projects.filter((p) => p.slug !== slug).slice(0, 3);

  usePageMeta(selectedProject?.title, selectedProject?.description);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper text-ink">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-line border-t-accent" />
          <p className="mt-4 text-sm text-ink-soft">Loading project…</p>
        </div>
      </div>
    );
  }

  if (!selectedProject) {
    return (
      <div className="bg-paper text-ink">
        <Container className="py-28 text-center">
          <Eyebrow>Not found</Eyebrow>
          <h1 className="mt-6 font-display text-4xl text-ink text-balance">
            We couldn't find that project.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-ink-soft text-pretty">
            The project you're looking for may have moved. Browse the rest of
            our work instead.
          </p>
          <div className="mt-9">
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-ink-soft transition-colors hover:text-accent"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to all work
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-paper text-ink">
      {/* Breadcrumb */}
      <div className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md">
        <Container className="py-4">
          <nav className="flex items-center gap-2 text-xs text-muted">
            <Link to="/" className="transition-colors hover:text-accent">
              Home
            </Link>
            <span className="text-faint">/</span>
            <Link
              to="/projects"
              className="transition-colors hover:text-accent"
            >
              Work
            </Link>
            <span className="text-faint">/</span>
            <span className="font-medium text-ink-soft">
              {selectedProject.title}
            </span>
          </nav>
        </Container>
      </div>

      {/* Header */}
      <section className="py-16 lg:py-20">
        <Container>
          <Reveal>
            <Eyebrow>{selectedProject.category ?? "Project"}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.4rem,5.5vw,4rem)] leading-[1.04] text-ink text-balance">
              {selectedProject.title}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft text-pretty">
              {selectedProject.description}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Hero image */}
      <section className="pb-16 lg:pb-20">
        <Container>
          <motion.div
            className="overflow-hidden rounded-sm bg-paper-dim"
            initial={reduce ? false : { opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div className="aspect-[16/9]">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Overview + meta */}
      <section className="border-t border-line py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:gap-20">
            <div>
              <Reveal>
                <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl text-balance">
                  What we did.
                </h2>
              </Reveal>
              <Reveal delay={0.05}>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft text-pretty">
                  {selectedProject.description}
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 max-w-2xl leading-relaxed text-ink-soft text-pretty">
                  The work was handled in-house from artwork through to the
                  finished, installed piece — proofed and colour-checked before
                  anything left the shop, then fitted on site so the result sits
                  square and reads cleanly.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <dl className="space-y-6">
                {selectedProject.category && (
                  <div className="border-t border-line pt-4">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                      Category
                    </dt>
                    <dd className="mt-1.5 text-ink">
                      {selectedProject.category}
                    </dd>
                  </div>
                )}
                <div className="border-t border-line pt-4">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                    Scope
                  </dt>
                  <dd className="mt-1.5 text-ink">
                    Design, production &amp; installation
                  </dd>
                </div>
                <div className="border-t border-line pt-4">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                    Studio
                  </dt>
                  <dd className="mt-1.5 text-ink">
                    Shrestha Services, Biratnagar
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Related projects */}
      {relatedProjects.length > 0 && (
        <section className="border-t border-line bg-surface-2 py-16 lg:py-24">
          <Container>
            <Reveal>
              <Eyebrow>More work</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 max-w-2xl font-display text-3xl leading-tight text-ink sm:text-4xl text-balance">
                Other projects from the shop.
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((project, i) => (
                <Reveal key={project.id} delay={(i % 3) * 0.06}>
                  <Link
                    to={`/projects/${project.slug}`}
                    className="group block"
                    aria-label={`View project: ${project.title}`}
                  >
                    <div className="relative overflow-hidden rounded-sm bg-paper-dim">
                      <div className="aspect-[4/3]">
                        <img
                          src={project.image}
                          alt={project.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                        />
                      </div>
                      <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/25" />
                    </div>
                    <div className="mt-4 flex items-start justify-between gap-4">
                      <div>
                        {project.category && (
                          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                            {project.category}
                          </p>
                        )}
                        <h3 className="mt-1.5 font-display text-xl text-ink transition-colors duration-300 group-hover:text-accent">
                          {project.title}
                        </h3>
                      </div>
                      <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 -translate-x-1 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="bg-ink py-20 text-inverse lg:py-28">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="max-w-2xl font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.05] text-inverse text-balance">
                Planning something similar?
              </h2>
              <p className="mt-5 max-w-md text-inverse/70 text-pretty">
                Tell us the job — the size, the surface, where it's going — and
                we'll send back a written quote.
              </p>
            </div>
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

      {/* Back link */}
      <section className="py-12">
        <Container>
          <button
            onClick={() => navigate("/projects")}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-ink-soft transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to all work
          </button>
        </Container>
      </section>
    </div>
  );
}
