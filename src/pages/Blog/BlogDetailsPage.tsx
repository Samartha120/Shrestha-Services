import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import {
  Container,
  Reveal,
  PrimaryCTA,
  GhostCTA,
} from "@/components/marketing/primitives";
import { blogApi, type BlogPost } from "@/services/blogApi";

export default function BlogDetailsPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    let active = true;
    const load = async () => {
      setLoading(true);
      setNotFound(false);
      try {
        const data = await blogApi.getBySlug(slug);
        if (!active) return;
        setPost(data.post);
        setRelated(data.related);
      } catch (err) {
        if (active) setNotFound(true);
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-paper text-ink">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
          <p className="text-sm text-muted">Loading article…</p>
        </div>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-paper text-ink">
        <div className="text-center">
          <h1 className="font-display text-3xl text-ink">Post not found</h1>
          <p className="mt-3 text-ink-soft text-pretty">
            The article you're looking for doesn't exist.
          </p>
          <div className="mt-8 flex justify-center">
            <PrimaryCTA to="/blog">Back to journal</PrimaryCTA>
          </div>
        </div>
      </div>
    );
  }

  const shareUrl = `${window.location.origin}/blog/${post.slug}`;
  const shareTitle = post.title;

  const formattedDate = new Date(post.createdAt)
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
    .toUpperCase();

  return (
    <div className="bg-paper text-ink">
      {/* Breadcrumb */}
      <div className="border-b border-line">
        <Container>
          <Link
            to="/blog"
            className="group inline-flex items-center gap-2 py-4 text-sm font-medium text-ink-soft transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to journal
          </Link>
        </Container>
      </div>

      {/* Header */}
      <section className="border-b border-line py-16 lg:py-20">
        <Container>
          <Reveal>
            <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              <span className="text-accent">{post.category}</span>
              <span aria-hidden>/</span>
              <span>{formattedDate}</span>
              {post.readTime && (
                <>
                  <span aria-hidden>/</span>
                  <span>{post.readTime} read</span>
                </>
              )}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.05] text-balance">
              {post.title}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 flex items-center gap-4 border-t border-line pt-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line-strong font-mono text-xs text-ink-soft">
                {post.author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </span>
              <span>
                <span className="block font-medium text-ink">
                  {post.author}
                </span>
                {post.authorBio && (
                  <span className="mt-0.5 block text-sm text-muted text-pretty">
                    {post.authorBio}
                  </span>
                )}
              </span>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Hero image */}
      {post.image && (
        <Reveal>
          <Container className="py-12 lg:py-16">
            <div className="aspect-[16/8] overflow-hidden rounded-sm border border-line">
              <img
                src={post.image}
                alt={post.title}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Container>
        </Reveal>
      )}

      {/* Article */}
      <section className="pb-16 lg:pb-24">
        <Container>
          <div className="mx-auto max-w-2xl space-y-6">
            {post.content.split("\n\n").map((paragraph, idx) => {
              const isHeading =
                paragraph.length < 50 && paragraph.includes(" ");
              if (isHeading && idx > 0) {
                return (
                  <h2
                    key={idx}
                    className="pt-6 font-display text-2xl leading-tight text-ink text-balance"
                  >
                    {paragraph}
                  </h2>
                );
              }
              return (
                <p
                  key={idx}
                  className="text-lg leading-relaxed text-ink-soft text-pretty"
                >
                  {paragraph}
                </p>
              );
            })}

            {/* Share */}
            <div className="mt-12 border-t border-line pt-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                Share this article
              </p>
              <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-ink-soft transition-colors hover:text-accent"
                >
                  Facebook
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-ink-soft transition-colors hover:text-accent"
                >
                  Twitter
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-ink-soft transition-colors hover:text-accent"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-line py-16 lg:py-24">
          <Container>
            <Reveal>
              <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl text-balance">
                Related reading.
              </h2>
            </Reveal>
            <ul className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((relatedPost, i) => (
                <Reveal as="li" key={relatedPost.id} delay={(i % 3) * 0.06}>
                  <Link to={`/blog/${relatedPost.slug}`} className="group block">
                    <div className="aspect-[16/10] overflow-hidden rounded-sm border border-line">
                      <img
                        src={relatedPost.image || ""}
                        alt={relatedPost.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                      {relatedPost.category}
                    </p>
                    <h3 className="mt-2 font-display text-xl leading-tight text-ink transition-colors group-hover:text-accent text-balance">
                      {relatedPost.title}
                    </h3>
                    <p className="mt-2 text-sm text-ink-soft text-pretty">
                      {relatedPost.excerpt}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="bg-ink py-20 text-inverse lg:py-28">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="max-w-2xl font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.05] text-inverse text-balance">
                Have a project in mind?
              </h2>
              <p className="mt-5 max-w-md text-inverse/70 text-pretty">
                Tell us what you need printed or made, and we'll come back with a
                written quote — usually the same day.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-6">
              <PrimaryCTA
                to="/quote"
                className="bg-inverse text-ink hover:bg-accent hover:text-inverse"
              >
                Get a quote
              </PrimaryCTA>
              <GhostCTA
                to="/contact"
                className="text-inverse/80 hover:text-inverse"
              >
                Contact us
              </GhostCTA>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
