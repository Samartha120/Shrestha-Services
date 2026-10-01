import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import {
  Container,
  Eyebrow,
  Reveal,
} from "@/components/marketing/primitives";
import { blogApi, type BlogPost } from "@/services/blogApi";
import { contactApi } from "@/services/contactApi";

function formatDate(date: string) {
  return new Date(date)
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
    .toUpperCase();
}

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    setSubmitting(true);
    try {
      await contactApi.submit({
        name: "Newsletter subscriber",
        email: trimmed,
        phone: "",
        subject: "Newsletter subscription",
        message: `Newsletter subscription request from ${trimmed}.`,
      });
      toast.success("You're subscribed — we'll be in touch.");
      setEmail("");
    } catch (err) {
      toast.error("Could not subscribe right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 sm:flex-row sm:items-end"
    >
      <div className="flex-1">
        <label className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          Email
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="mt-2 w-full border-b border-line bg-transparent py-2.5 text-ink placeholder:text-muted transition-colors focus:border-accent focus:outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-fit items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-inverse transition-colors hover:bg-accent disabled:opacity-50"
      >
        {submitting ? "Subscribing…" : "Subscribe"}
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      setError(false);
      try {
        const data = await blogApi.getPublished();
        if (active) setPosts(data);
      } catch (err) {
        console.error("Failed to load blog posts", err);
        if (active) setError(true);
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(posts.map((p) => p.category))).sort();
    return ["All", ...unique];
  }, [posts]);

  const featuredPost = posts.find((p) => p.featured);

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  const regularPosts = filteredPosts.filter((p) => !p.featured);

  return (
    <div className="bg-paper text-ink">
      {/* Hero */}
      <section className="border-b border-line py-20 lg:py-24">
        <Container>
          <Reveal>
            <Eyebrow>Journal</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.6rem,6vw,4.5rem)] leading-[1.02] text-balance">
              Notes on print, brand and craft.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft text-pretty">
              Practical writing on printing, signage, design and the small
              decisions that make finished work look considered.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Loading / error states */}
      {loading && (
        <section className="py-24">
          <Container>
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="h-8 w-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
              <p className="text-sm text-muted">Loading articles…</p>
            </div>
          </Container>
        </section>
      )}

      {!loading && error && (
        <section className="py-24">
          <Container>
            <div className="text-center">
              <p className="text-sm font-semibold text-err">
                Could not load the journal.
              </p>
              <p className="mt-2 text-sm text-muted">
                Please check your connection and try again.
              </p>
            </div>
          </Container>
        </section>
      )}

      {!loading && !error && posts.length === 0 && (
        <section className="py-24">
          <Container>
            <div className="text-center">
              <p className="text-ink-soft text-pretty">
                No articles have been published yet. Check back soon.
              </p>
            </div>
          </Container>
        </section>
      )}

      {/* Featured */}
      {!loading && !error && featuredPost && (
        <section className="border-b border-line py-16 lg:py-24">
          <Container>
            <Reveal>
              <Link
                to={`/blog/${featuredPost.slug}`}
                className="group grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14"
              >
                <div className="aspect-[16/10] overflow-hidden rounded-sm border border-line">
                  <img
                    src={featuredPost.image || ""}
                    alt={featuredPost.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                    <span className="text-accent">Featured</span>
                    <span aria-hidden>/</span>
                    <span>{featuredPost.category}</span>
                  </div>
                  <h2 className="mt-5 font-display text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.08] text-balance">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-4 max-w-lg text-lg leading-relaxed text-ink-soft text-pretty">
                    {featuredPost.excerpt}
                  </p>
                  <div className="mt-6 flex items-center gap-6 font-mono text-xs text-muted">
                    <span>{formatDate(featuredPost.createdAt)}</span>
                    {featuredPost.readTime && <span>{featuredPost.readTime}</span>}
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors group-hover:text-accent">
                    Read article
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          </Container>
        </section>
      )}

      {/* Category filter + list */}
      {!loading && !error && posts.length > 0 && (
        <section className="py-16 lg:py-24">
          <Container>
            <Reveal>
              <ul className="flex flex-wrap gap-x-6 gap-y-3 border-b border-line pb-6">
                {categories.map((cat) => {
                  const active = selectedCategory === cat;
                  return (
                    <li key={cat}>
                      <button
                        onClick={() => setSelectedCategory(cat)}
                        className={`text-sm transition-colors ${
                          active
                            ? "font-medium text-accent"
                            : "text-ink-soft hover:text-ink"
                        }`}
                      >
                        {cat}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </Reveal>

            {regularPosts.length > 0 ? (
              <ul>
                {regularPosts.map((post, i) => (
                  <Reveal as="li" key={post.id} delay={(i % 3) * 0.06}>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="group grid gap-6 border-b border-line py-8 sm:grid-cols-[0.28fr_0.72fr] sm:gap-8"
                    >
                      <div className="aspect-[4/3] overflow-hidden rounded-sm border border-line">
                        <img
                          src={post.image || ""}
                          alt={post.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                          <span>{formatDate(post.createdAt)}</span>
                          <span aria-hidden>/</span>
                          <span className="text-accent">{post.category}</span>
                        </div>
                        <h3 className="mt-3 font-display text-2xl leading-tight text-ink transition-colors group-hover:text-accent text-balance">
                          {post.title}
                        </h3>
                        <p className="mt-3 max-w-xl text-ink-soft text-pretty">
                          {post.excerpt}
                        </p>
                        <div className="mt-4 flex items-center gap-6 font-mono text-xs text-muted">
                          {post.readTime && <span>{post.readTime}</span>}
                          <span>{post.author}</span>
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </ul>
            ) : (
              <div className="border-b border-line py-16 text-center">
                <p className="text-ink-soft text-pretty">
                  No posts found in this category.
                </p>
              </div>
            )}
          </Container>
        </section>
      )}

      {/* Newsletter */}
      <section className="border-t border-line bg-surface-2 py-20 lg:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
            <Reveal>
              <h2 className="max-w-md font-display text-3xl leading-tight text-ink sm:text-4xl text-balance">
                Get new pieces in your inbox.
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <NewsletterForm />
            </Reveal>
          </div>
        </Container>
      </section>
    </div>
  );
}
