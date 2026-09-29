import { useState } from "react";
import { useContactStore } from "@/store/contactStore";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Container, Eyebrow, Reveal } from "@/components/marketing/primitives";

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

const subjects = [
  "General Inquiry",
  "Quote Request",
  "Custom Project",
  "Bulk Order",
];

const contactRows = [
  {
    icon: Phone,
    label: "Call the shop",
    value: "+977-21-441234",
    href: "tel:+97721441234",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@shresthaservices.com.np",
    href: "mailto:info@shresthaservices.com.np",
  },
  {
    icon: MapPin,
    label: "Visit",
    value: "Main Road, Biratnagar, Nepal",
  },
];

const hours = [
  { day: "Sunday – Friday", time: "9:30 AM – 7:00 PM" },
  { day: "Saturday", time: "Closed" },
];

const fieldClass =
  "w-full border-b border-line bg-transparent py-3 text-ink placeholder:text-muted transition-colors focus:border-accent focus:outline-none";

export default function ContactPage() {
  const { submitInquiry, isLoading } = useContactStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: subjects[0],
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.subject) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await submitInquiry(formData);
      toast.success("Message sent — we'll get back to you shortly.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: subjects[0],
        message: "",
      });
      setErrors({});
    } catch {
      toast.error("Failed to send. Please try again.");
    }
  };

  return (
    <div className="bg-paper text-ink">
      {/* Hero */}
      <section className="border-b border-line py-20 lg:py-24">
        <Container>
          <Reveal>
            <Eyebrow>Get in touch</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.6rem,6vw,4.5rem)] leading-[1.02] text-balance">
              Tell us about the job.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft text-pretty">
              Send the details and we'll come back with a written quote —
              usually the same day. Prefer to talk it through? Call or drop by
              the shop.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Details + form */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            {/* Left — details */}
            <Reveal>
              <div className="flex flex-col gap-10">
                <ul className="divide-y divide-line border-y border-line">
                  {contactRows.map((row) => {
                    const Icon = row.icon;
                    const inner = (
                      <span className="flex items-center gap-4 py-5">
                        <Icon
                          className="h-5 w-5 shrink-0 text-accent"
                          strokeWidth={1.5}
                        />
                        <span>
                          <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                            {row.label}
                          </span>
                          <span className="mt-0.5 block font-medium text-ink">
                            {row.value}
                          </span>
                        </span>
                      </span>
                    );
                    return (
                      <li key={row.label}>
                        {row.href ? (
                          <a
                            href={row.href}
                            className="block transition-colors hover:text-accent [&_.text-ink]:hover:text-accent"
                          >
                            {inner}
                          </a>
                        ) : (
                          inner
                        )}
                      </li>
                    );
                  })}
                </ul>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                    Opening hours
                  </p>
                  <ul className="mt-4 space-y-2">
                    {hours.map((h) => (
                      <li
                        key={h.day}
                        className="flex items-center justify-between border-b border-line py-2 text-sm"
                      >
                        <span className="text-ink-soft">{h.day}</span>
                        <span
                          className={
                            h.time === "Closed"
                              ? "font-medium text-accent"
                              : "font-medium text-ink"
                          }
                        >
                          {h.time}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* Right — form */}
            <Reveal delay={0.1}>
              <form onSubmit={handleSubmit} className="flex flex-col gap-7">
                <div className="grid gap-7 sm:grid-cols-2">
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                      Full name
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className={fieldClass}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-err">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                      Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="+977 ..."
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className={fieldClass}
                    />
                    {errors.phone && (
                      <p className="mt-1.5 text-xs text-err">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={fieldClass}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-err">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                    Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className={`${fieldClass} appearance-none`}
                  >
                    {subjects.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                    Message
                  </label>
                  <textarea
                    placeholder="Tell us about your project — size, quantity, deadline…"
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className={`${fieldClass} resize-none`}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-err">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="group mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-inverse transition-colors hover:bg-accent disabled:opacity-60"
                >
                  {isLoading ? "Sending…" : "Send message"}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </form>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Map */}
      <section className="pb-20 lg:pb-28">
        <Container>
          <div className="overflow-hidden rounded-sm border border-line">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114509.3016234857!2d87.20243214901203!3d26.48375038588986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef6d267547f203%3A0x645927a9412d694d!2sBiratnagar%2C%20Nepal!5e0!3m2!1sen!2s!4v1234567890"
              width="100%"
              height="100%"
              className="h-80 w-full sm:h-[440px]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Shrestha Services location — Biratnagar"
            />
          </div>
        </Container>
      </section>
    </div>
  );
}
