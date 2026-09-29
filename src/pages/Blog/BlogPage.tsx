import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  Container,
  Eyebrow,
  Reveal,
} from "@/components/marketing/primitives";

const blogPosts = [
  {
    id: "1",
    slug: "print-quality-matters",
    title: "Why Print Quality Matters in 2024",
    excerpt:
      "Explore how high-quality printing can elevate your brand and leave a lasting impression on your clients.",
    date: "2024-06-15",
    category: "Printing Tips",
    author: "Raj Shrestha",
    readTime: "5 min",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=400&fit=crop",
  },
  {
    id: "2",
    slug: "branding-essentials",
    title: "Branding Essentials: A Complete Guide",
    excerpt:
      "Learn the fundamental elements that make a brand recognizable and memorable to your target audience.",
    date: "2024-06-10",
    category: "Branding",
    author: "Priya Patel",
    readTime: "7 min",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop",
  },
  {
    id: "3",
    slug: "custom-packaging-benefits",
    title: "The Power of Custom Packaging Design",
    excerpt:
      "Discover how custom packaging can transform your product presentation and create memorable unboxing experiences.",
    date: "2024-06-05",
    category: "Packaging",
    author: "Raj Shrestha",
    readTime: "6 min",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=800&h=400&fit=crop",
  },
  {
    id: "4",
    slug: "business-card-design",
    title: "Business Cards Still Matter: Design Tips",
    excerpt:
      "Master the art of designing business cards that leave lasting impressions and effectively communicate your professional identity.",
    date: "2024-05-28",
    category: "Design",
    author: "Nina Kapoor",
    readTime: "5 min",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1614707267537-b85faf00021b?w=800&h=400&fit=crop",
  },
  {
    id: "5",
    slug: "signage-best-practices",
    title: "Signage Best Practices for Retail Spaces",
    excerpt:
      "Learn how strategic signage design can guide customer behavior and boost sales in retail environments.",
    date: "2024-05-20",
    category: "Signage",
    author: "Raj Shrestha",
    readTime: "6 min",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1489749798305-4fea3ba63d60?w=800&h=400&fit=crop",
  },
  {
    id: "6",
    slug: "sustainability-printing",
    title: "Sustainable Printing Practices",
    excerpt:
      "Explore eco-friendly printing options that don't compromise on quality while protecting our environment.",
    date: "2024-05-12",
    category: "Sustainability",
    author: "Priya Patel",
    readTime: "7 min",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1559027615-cd2628902d4a?w=800&h=400&fit=crop",
  },
];

const categories = [
  "All",
  "Printing Tips",
  "Branding",
  "Packaging",
  "Design",
  "Signage",
  "Sustainability",
];

function formatDate(date: string) {
  return new Date(date)
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
    .toUpperCase();
}

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  const featuredPost = blogPosts.find((p) => p.featured);
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

      {/* Featured */}
      {featuredPost && (
        <section className="border-b border-line py-16 lg:py-24">
          <Container>
            <Reveal>
              <Link
                to={`/blog/${featuredPost.slug}`}
                className="group grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14"
              >
                <div className="aspect-[16/10] overflow-hidden rounded-sm border border-line">
                  <img
                    src={featuredPost.image}
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
                    <span>{formatDate(featuredPost.date)}</span>
                    <span>{featuredPost.readTime}</span>
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
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                        <span>{formatDate(post.date)}</span>
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
                        <span>{post.readTime}</span>
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
              <form className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <div className="flex-1">
                  <label className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="mt-2 w-full border-b border-line bg-transparent py-2.5 text-ink placeholder:text-muted transition-colors focus:border-accent focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-inverse transition-colors hover:bg-accent"
                >
                  Subscribe
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </Reveal>
          </div>
        </Container>
      </section>
    </div>
  );
}
