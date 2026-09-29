import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Check, ArrowRight, Hop as Home, FileText, Mail } from "lucide-react";
import { Container, Eyebrow } from "@/components/marketing/primitives";
import Button from "@/components/common/Button";

const nextSteps = [
  "Our team reviews your project requirements",
  "We prepare a detailed quote with exact pricing",
  "You'll receive the quote via email and in your dashboard",
  "Accept the quote to proceed with your order",
];

const infoRows = [
  {
    icon: Mail,
    title: "Confirmation sent",
    body: "Check your email for details.",
  },
  {
    icon: FileText,
    title: "Track progress",
    body: "View the request in your dashboard.",
  },
];

export default function QuoteSuccessPage() {
  const navigate = useNavigate();
  const reduce = useReducedMotion();

  useEffect(() => {
    // Auto-redirect after 8 seconds
    const timer = setTimeout(() => {
      navigate("/dashboard/quotes");
    }, 8000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center bg-paper py-20 text-ink">
      <Container className="max-w-3xl">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Success mark */}
          <span
            className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-accent text-accent"
            aria-hidden
          >
            <Check size={26} strokeWidth={1.75} />
          </span>

          <div className="mt-8">
            <Eyebrow>Quote received</Eyebrow>
          </div>
          <h1 className="mt-6 font-display text-[clamp(2.4rem,5.5vw,4rem)] leading-[1.03] text-balance">
            Your request is in.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft text-pretty">
            Thank you for your quote request. We've received your details and
            will review them shortly — usually within 24–48 hours.
          </p>

          {/* Info rows — hairline */}
          <ul className="mt-12 divide-y divide-line border-y border-line">
            {infoRows.map((row) => {
              const Icon = row.icon;
              return (
                <li key={row.title} className="flex items-center gap-4 py-5">
                  <Icon className="h-5 w-5 shrink-0 text-accent" strokeWidth={1.5} />
                  <span>
                    <span className="block font-medium text-ink">{row.title}</span>
                    <span className="mt-0.5 block text-sm text-muted">{row.body}</span>
                  </span>
                </li>
              );
            })}
          </ul>

          {/* Next steps — numbered index list */}
          <div className="mt-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
              What happens next
            </p>
            <ol className="mt-5 space-y-4">
              {nextSteps.map((step, idx) => (
                <li key={idx} className="flex gap-4">
                  <span className="font-mono text-sm text-accent">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="text-ink-soft">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Actions */}
          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <Link to="/dashboard/quotes">
              <Button size="lg" className="w-full sm:w-auto" rightIcon={<ArrowRight size={18} />}>
                View my quotes
              </Button>
            </Link>
            <Link to="/">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
                leftIcon={<Home size={18} />}
              >
                Back to home
              </Button>
            </Link>
          </div>

          <p className="mt-10 text-sm text-faint">
            Redirecting to your quotes dashboard in a few seconds…
          </p>
        </motion.div>
      </Container>
    </div>
  );
}
