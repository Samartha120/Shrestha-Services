import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  MapPin,
  Clock,
  ArrowRight,
  Users,
  Heart,
  Zap,
  Award,
  Briefcase,
  Plus,
  X,
} from "lucide-react";
import {
  Container,
  Eyebrow,
  Reveal,
  PrimaryCTA,
  GhostCTA,
} from "@/components/marketing/primitives";
import { contactApi } from "@/services/contactApi";
import { toast } from "sonner";

const positions = [
  {
    id: "1",
    title: "Senior Graphic Designer",
    department: "Design",
    type: "Full-time",
    location: "Biratnagar",
    salary: "NPR 60,000 - 80,000",
    description:
      "We're looking for a creative and experienced graphic designer to lead our design projects and mentor junior designers.",
    requirements: [
      "5+ years of graphic design experience",
      "Proficiency in Adobe Creative Suite",
      "Strong portfolio of print and digital work",
      "Excellent communication skills",
    ],
  },
  {
    id: "2",
    title: "Production Manager",
    department: "Operations",
    type: "Full-time",
    location: "Biratnagar",
    salary: "NPR 50,000 - 70,000",
    description:
      "Manage our printing production operations, quality control, and ensure timely delivery of all projects.",
    requirements: [
      "3+ years in production management",
      "Knowledge of printing processes",
      "Strong organizational skills",
      "Leadership experience",
    ],
  },
  {
    id: "3",
    title: "Account Executive",
    department: "Sales",
    type: "Full-time",
    location: "Biratnagar",
    salary: "NPR 40,000 - 60,000",
    description:
      "Build and maintain client relationships, identify new business opportunities, and drive sales growth.",
    requirements: [
      "2+ years in sales or account management",
      "Excellent negotiation skills",
      "CRM software experience",
      "Track record of meeting targets",
    ],
  },
  {
    id: "4",
    title: "Web Developer",
    department: "Technology",
    type: "Full-time",
    location: "Biratnagar",
    salary: "NPR 45,000 - 65,000",
    description:
      "Develop and maintain our web presence, creating responsive and user-friendly websites for our business.",
    requirements: [
      "3+ years of web development",
      "React, TypeScript, and Tailwind CSS knowledge",
      "Responsive design expertise",
      "Git and modern development practices",
    ],
  },
  {
    id: "5",
    title: "Content Marketing Specialist",
    department: "Marketing",
    type: "Part-time",
    location: "Remote",
    salary: "NPR 30,000 - 40,000",
    description:
      "Create engaging content for our blog, social media, and marketing materials that showcase our expertise.",
    requirements: [
      "2+ years in content creation",
      "SEO knowledge",
      "Strong writing skills",
      "Social media management experience",
    ],
  },
];

const benefits = [
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive health insurance and wellness programs",
  },
  {
    icon: Zap,
    title: "Professional Growth",
    description: "Training, certifications, and career development opportunities",
  },
  {
    icon: Users,
    title: "Collaborative Culture",
    description: "Work in a supportive environment with talented professionals",
  },
  {
    icon: Award,
    title: "Competitive Compensation",
    description: "Competitive salaries and performance-based bonuses",
  },
  {
    icon: Briefcase,
    title: "Flexible Work",
    description: "Flexible hours and remote work options available",
  },
  {
    icon: Clock,
    title: "Work-Life Balance",
    description: "Generous leave policies and time off",
  },
];

interface Position {
  id: string;
  title: string;
  department: string;
  type: string;
  location: string;
  salary: string;
  description: string;
  requirements: string[];
}

export default function CareersPage() {
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(
    null
  );
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const reduce = useReducedMotion();

  const emptyApplication = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    about: "",
  };
  const [application, setApplication] = useState(emptyApplication);
  const [submitting, setSubmitting] = useState(false);

  const setField = (key: keyof typeof emptyApplication, value: string) =>
    setApplication((prev) => ({ ...prev, [key]: value }));

  const openApplication = () => {
    setApplication(emptyApplication);
    setShowApplicationForm(true);
  };

  const roleLabel = selectedPosition
    ? selectedPosition.title
    : "Open application";

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = `${application.firstName} ${application.lastName}`.trim();
    if (!name || !application.email) {
      toast.error("Please add your name and email.");
      return;
    }
    setSubmitting(true);
    try {
      await contactApi.submit({
        name,
        email: application.email,
        phone: application.phone,
        subject: `Job Application — ${roleLabel}`,
        message:
          `Applying for: ${roleLabel}\n\n` +
          `${application.about || "No additional details provided."}`,
      });
      toast.success("Application received — we'll be in touch.");
      setShowApplicationForm(false);
      setApplication(emptyApplication);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-paper text-ink">
      {/* Hero */}
      <section className="border-b border-line py-20 lg:py-28">
        <Container>
          <Reveal>
            <Eyebrow>Careers</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.6rem,6vw,4.5rem)] leading-[1.02] text-balance">
              Come make good work with us.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft text-pretty">
              We're a working print and signage shop in Biratnagar. When we have
              room on the team, we look for people who care about the details and
              want to see a job through.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Culture / benefits */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <Reveal>
              <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl text-balance">
                What it's like here.
              </h2>
              <p className="mt-5 max-w-md text-ink-soft text-pretty">
                A supportive place where people can do their best work, keep
                learning, and take pride in what leaves the shop.
              </p>
            </Reveal>
            <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {benefits.map((benefit, i) => {
                const Icon = benefit.icon;
                return (
                  <Reveal key={benefit.title} delay={(i % 2) * 0.06}>
                    <div className="flex items-start gap-4 border-t border-line pt-5">
                      <Icon
                        className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                        strokeWidth={1.5}
                      />
                      <div>
                        <h3 className="font-display text-lg text-ink">
                          {benefit.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-ink-soft text-pretty">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </Container>
      </section>
{/* CAREERS_PLACEHOLDER */}

      {/* Open positions */}
      <section className="border-t border-line bg-surface-2 py-20 lg:py-28">
        <Container>
          <Reveal>
            <div className="flex items-end justify-between gap-6 border-b border-line pb-6">
              <div>
                <Eyebrow>Open roles</Eyebrow>
                <h2 className="mt-5 font-display text-3xl leading-tight text-ink sm:text-4xl text-balance">
                  Positions we're hiring for.
                </h2>
              </div>
              <span className="hidden shrink-0 font-mono text-[11px] uppercase tracking-[0.22em] text-muted sm:block">
                {String(positions.length).padStart(2, "0")} open
              </span>
            </div>
          </Reveal>

          <ul>
            {positions.map((position, i) => {
              const isOpen = selectedPosition?.id === position.id;
              return (
                <Reveal as="li" key={position.id} delay={(i % 3) * 0.06}>
                  <div className="border-b border-line">
                    <button
                      onClick={() =>
                        setSelectedPosition(isOpen ? null : position)
                      }
                      className="group flex w-full items-start gap-6 py-8 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="mt-1.5 font-mono text-sm text-muted">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1">
                        <h3 className="font-display text-2xl leading-tight text-ink">
                          {position.title}
                        </h3>
                        <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                          <span className="flex items-center gap-1.5">
                            <Briefcase className="h-3.5 w-3.5" strokeWidth={1.5} />
                            {position.department}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} />
                            {position.location}
                          </span>
                          <span className="text-accent">{position.type}</span>
                          <span>{position.salary}</span>
                        </div>
                      </div>
                      <Plus
                        className={`mt-1.5 h-5 w-5 shrink-0 text-accent transition-transform duration-300 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                        strokeWidth={1.5}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={reduce ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={reduce ? undefined : { height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.4,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <div className="max-w-2xl pb-8 pl-[3.25rem]">
                            <p className="text-ink-soft text-pretty">
                              {position.description}
                            </p>
                            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                              What we're looking for
                            </p>
                            <ul className="mt-4">
                              {position.requirements.map((req) => (
                                <li
                                  key={req}
                                  className="flex items-start gap-3 border-t border-line py-3 text-sm text-ink-soft"
                                >
                                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                                  {req}
                                </li>
                              ))}
                            </ul>
                            <button
                              onClick={openApplication}
                              className="group mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-inverse transition-colors hover:bg-accent"
                            >
                              Apply for this role
                              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </section>
{/* CAREERS_PLACEHOLDER_2 */}

      {/* Open application CTA */}
      <section className="bg-ink py-20 text-inverse lg:py-28">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="max-w-2xl font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.05] text-inverse text-balance">
                Don't see your role?
              </h2>
              <p className="mt-5 max-w-md text-inverse/70 text-pretty">
                Send us a note about what you do and we'll keep it on file for
                when something opens up.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-6">
              <PrimaryCTA
                to="/contact"
                className="bg-inverse text-ink hover:bg-accent hover:text-inverse"
              >
                Send a note
              </PrimaryCTA>
              <GhostCTA
                to="/quote"
                className="text-inverse/80 hover:text-inverse"
              >
                Get a quote
              </GhostCTA>
            </div>
          </div>
        </Container>
      </section>

      {/* Application form modal */}
      <AnimatePresence>
        {showApplicationForm && (
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4"
            onClick={() => setShowApplicationForm(false)}
          >
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: 16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-sm border border-line bg-paper p-8 text-ink"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between">
                <div>
                  <Eyebrow>Application</Eyebrow>
                  <h2 className="mt-4 font-display text-2xl text-ink">
                    {selectedPosition
                      ? selectedPosition.title
                      : "Apply to join"}
                  </h2>
                </div>
                <button
                  onClick={() => setShowApplicationForm(false)}
                  className="text-muted transition-colors hover:text-accent"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" strokeWidth={1.5} />
                </button>
              </div>

              <form onSubmit={handleApplicationSubmit} className="mt-8 flex flex-col gap-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                      First name
                    </label>
                    <input
                      type="text"
                      value={application.firstName}
                      onChange={(e) => setField("firstName", e.target.value)}
                      required
                      className="mt-2 w-full border-b border-line bg-transparent py-2.5 text-ink placeholder:text-muted transition-colors focus:border-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                      Last name
                    </label>
                    <input
                      type="text"
                      value={application.lastName}
                      onChange={(e) => setField("lastName", e.target.value)}
                      className="mt-2 w-full border-b border-line bg-transparent py-2.5 text-ink placeholder:text-muted transition-colors focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                    Email
                  </label>
                  <input
                    type="email"
                    value={application.email}
                    onChange={(e) => setField("email", e.target.value)}
                    required
                    className="mt-2 w-full border-b border-line bg-transparent py-2.5 text-ink placeholder:text-muted transition-colors focus:border-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={application.phone}
                    onChange={(e) => setField("phone", e.target.value)}
                    className="mt-2 w-full border-b border-line bg-transparent py-2.5 text-ink placeholder:text-muted transition-colors focus:border-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                    A little about you
                  </label>
                  <textarea
                    rows={4}
                    value={application.about}
                    onChange={(e) => setField("about", e.target.value)}
                    className="mt-2 w-full resize-none border-b border-line bg-transparent py-2.5 text-ink placeholder:text-muted transition-colors focus:border-accent focus:outline-none"
                  />
                </div>
                <div className="mt-2 flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-inverse transition-colors hover:bg-accent disabled:opacity-60"
                  >
                    {submitting ? "Submitting…" : "Submit application"}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowApplicationForm(false)}
                    className="text-sm font-semibold text-ink-soft transition-colors hover:text-accent"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

