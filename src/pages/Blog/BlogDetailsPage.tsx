import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import {
  Container,
  Reveal,
  PrimaryCTA,
  GhostCTA,
} from "@/components/marketing/primitives";

const blogPostsData = [
  {
    id: "1",
    slug: "print-quality-matters",
    title: "Why Print Quality Matters in 2024",
    excerpt: "Explore how high-quality printing can elevate your brand and leave a lasting impression on your clients.",
    content: `Print quality is the foundation of professional branding. When customers hold a well-printed business card or brochure, they form immediate judgments about your business. Premium printing demonstrates attention to detail and commitment to excellence. In today's digital world, quality print materials stand out even more, showing that you invest in tangible, meaningful customer touchpoints.

Whether it's business cards with perfect color accuracy, brochures with crisp text, or packaging that feels premium, quality printing creates trust and credibility that digital alone cannot achieve. Your printed materials are often the first physical touchpoint customers have with your brand, making quality paramount.

The Details That Matter
The difference between average and premium printing lies in several key areas. Paper selection affects both the feel and longevity of your materials. Premium papers with higher gsm weights feel substantial and professional. Color accuracy ensures your brand colors are represented exactly as intended, maintaining consistency across all touchpoints.

Resolution and sharpness matter tremendously. Fine details in your design—text, images, gradients—should reproduce beautifully without pixelation or banding. Professional printers use advanced technology to ensure every element is crisp and clear. Finishing options like lamination, embossing, or foil stamping add tactile qualities that elevate the perceived value.

Building Brand Trust Through Print
Quality printing isn't just about aesthetics; it's about building trust. When someone holds a beautifully printed piece, they unconsciously associate that quality with your business itself. A flimsy business card, smudged brochure, or faded packaging sends the opposite message.

Consider your marketing collateral as extensions of your brand promise. If you promise premium service, your printed materials should reflect that promise. If your industry demands professionalism and precision, your print quality should reinforce your expertise.`,
    date: "2024-06-15",
    category: "Printing Tips",
    author: "Raj Shrestha",
    authorBio: "Printing expert with 10+ years of experience in premium printing solutions.",
    readTime: "5 min",
    featured: true,
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&h=600&fit=crop",
    relatedPosts: ["2", "3", "4"],
  },
  {
    id: "2",
    slug: "branding-essentials",
    title: "Branding Essentials: A Complete Guide",
    excerpt: "Learn the fundamental elements that make a brand recognizable and memorable to your target audience.",
    content: `Strong branding goes beyond just a logo. It encompasses your visual identity, voice, values, and the entire customer experience. A comprehensive brand includes consistent typography, color palettes, imagery styles, and messaging guidelines. When all these elements work together, they create an unmistakable identity that customers recognize instantly.

From business cards to billboards, every touchpoint should reinforce your brand message. Consistency across all materials—print, digital, and otherwise—builds brand recognition and trust over time. Your brand is more than a visual identity; it's the promise you make to your customers and the experience they receive.

The Visual Foundation
Your visual identity is the first thing people notice about your brand. Color psychology plays a crucial role in how your brand is perceived. Blue conveys trust and professionalism, green suggests growth and sustainability, red evokes excitement and urgency. Choose colors that align with your brand values and stand out in your market.

Typography is equally important. The fonts you choose communicate your brand personality before anyone reads a word. Professional serif fonts suggest tradition and authority, while modern sans-serif fonts feel contemporary and clean. Consistency in typography across all materials creates visual harmony and strengthens brand recognition.

Consistency is Key
One of the biggest mistakes companies make is treating their brand as just a logo. Your brand needs consistent application across all platforms. This includes your website, social media, packaging, advertisements, and everything in between. Brand guidelines document this consistency, ensuring that whether it's a business card or a billboard, your brand looks and feels the same.

When your brand is consistent, customers develop strong associations with your visual identity and messaging. They know what to expect from you, which builds trust and loyalty over time.`,
    date: "2024-06-10",
    category: "Branding",
    author: "Priya Patel",
    authorBio: "Brand strategist specializing in creating memorable brand identities for businesses.",
    readTime: "7 min",
    featured: false,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=600&fit=crop",
    relatedPosts: ["1", "4", "5"],
  },
  {
    id: "3",
    slug: "custom-packaging-benefits",
    title: "The Power of Custom Packaging Design",
    excerpt: "Discover how custom packaging can transform your product presentation and create memorable unboxing experiences.",
    content: `Custom packaging is a powerful marketing tool that extends far beyond protection. It's the first physical interaction customers have with your product, making it crucial for brand perception. Thoughtful packaging design tells your brand story, reflects your values, and creates emotional connections.

In the age of social media, attractive packaging encourages customers to share unboxing experiences, providing free marketing for your brand. From sustainable materials to innovative designs, custom packaging demonstrates care for both your product and your customers' experience.

The Unboxing Experience
Modern consumers share their unboxing experiences on social media. This means your packaging has the potential to reach thousands of people beyond the original buyer. Beautiful packaging that's Instagram-worthy creates organic marketing opportunities. The unboxing experience should delight customers and make them feel valued.

Every element matters: the box quality, how the product is nestled inside, the tissue paper, thank-you cards, and any special touches. Premium brands like Apple and luxury cosmetics companies invest heavily in packaging because they understand its impact on customer perception and word-of-mouth marketing.

Sustainability Meets Style
Today's consumers care about the environment. Sustainable packaging isn't just good for the planet; it's also good for your brand. Recyclable and compostable materials can be beautifully designed without compromising on aesthetics. Many customers now prefer brands that align with their values, and sustainable packaging is a powerful way to communicate your commitment to the environment.`,
    date: "2024-06-05",
    category: "Packaging",
    author: "Raj Shrestha",
    authorBio: "Packaging designer and sustainability advocate.",
    readTime: "6 min",
    featured: false,
    image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=1200&h=600&fit=crop",
    relatedPosts: ["1", "2", "6"],
  },
  {
    id: "4",
    slug: "business-card-design",
    title: "Business Cards Still Matter: Design Tips",
    excerpt: "Master the art of designing business cards that leave lasting impressions and effectively communicate your professional identity.",
    content: `In a digital world, a physical business card is a tangible representation of your professionalism. The best business cards balance aesthetic appeal with practical information. Effective designs use negative space wisely, maintain readability, and choose colors and finishes that align with brand identity.

Consider unique finishes like matte, embossing, or metallic accents to stand out. A well-designed business card tells a story about your business before you even speak. It's a small item with big potential to create professional connections and memorable first impressions.

Design Best Practices
Keep the design clean and uncluttered. White space isn't wasted space; it's an important design element that makes your card easier to read and more memorable. Include only essential information: name, title, phone, email, and website. A physical address can be helpful, but social media handles should be kept minimal.

Typography should be easily readable, even at small sizes. Avoid overly decorative fonts that sacrifice legibility. The front of the card should feature your logo and key information, while the back can include a brief tagline or additional contact methods. Color psychology matters; choose colors that align with your brand identity.

Making Them Memorable
The feel of your business card matters as much as how it looks. Premium paper stocks, matte finishes, or embossing create a more sophisticated feel. A unique shape or die-cut, while more expensive, can make your card stand out. Some designers even incorporate specialty finishes like metallic inks or spot UV coating.

When someone receives your business card, they're likely to remember you and your business. Make that moment count by ensuring your card reflects the quality and professionalism of your brand.`,
    date: "2024-05-28",
    category: "Design",
    author: "Nina Kapoor",
    authorBio: "Graphic designer focused on creating memorable brand experiences.",
    readTime: "5 min",
    featured: false,
    image: "https://images.unsplash.com/photo-1614707267537-b85faf00021b?w=1200&h=600&fit=crop",
    relatedPosts: ["1", "2", "5"],
  },
  {
    id: "5",
    slug: "signage-best-practices",
    title: "Signage Best Practices for Retail Spaces",
    excerpt: "Learn how strategic signage design can guide customer behavior and boost sales in retail environments.",
    content: `Effective signage is a silent salesperson that guides customers and communicates key messages without relying on spoken words. The best signage is clear, visible from a distance, and aligned with brand identity. Color psychology plays an important role—certain colors draw attention and evoke specific emotional responses.

Placement matters equally; signs should be positioned where customers naturally look. From entrance signage that creates first impressions to directional signs that improve customer experience, well-designed signage increases visibility, directs traffic, and ultimately drives sales.

Strategic Placement and Visibility
The most beautiful sign is useless if nobody sees it. Consider sightlines, traffic patterns, and eye level when determining where signs should be placed. Window signage should communicate your value proposition at a glance. Interior signage should guide customers through your space logically.

Visibility distance is crucial. Calculate how far away potential customers need to be to read your sign comfortably. For outdoor signage, larger text, high contrast colors, and simple messaging ensure readability from a distance. Avoid cluttering signs with too much information.

Color Psychology in Signage
Colors trigger emotional responses and influence customer behavior. Red grabs attention and creates urgency—ideal for sales signs. Blue conveys trust and stability. Green suggests health and sustainability. Yellow draws attention and is ideal for warnings or promotions. Orange conveys friendliness and enthusiasm.

Choose a color scheme that aligns with your brand while standing out in your environment. High contrast between text and background ensures readability. Consider how your signage will appear under different lighting conditions.`,
    date: "2024-05-20",
    category: "Signage",
    author: "Raj Shrestha",
    authorBio: "Signage specialist with expertise in retail design.",
    readTime: "6 min",
    featured: false,
    image: "https://images.unsplash.com/photo-1489749798305-4fea3ba63d60?w=1200&h=600&fit=crop",
    relatedPosts: ["1", "3", "4"],
  },
  {
    id: "6",
    slug: "sustainability-printing",
    title: "Sustainable Printing Practices",
    excerpt: "Explore eco-friendly printing options that don't compromise on quality while protecting our environment.",
    content: `Sustainable printing is becoming increasingly important to conscious consumers and responsible businesses. Eco-friendly options include recycled paper, soy-based inks, water-based finishes, and energy-efficient processes. Sustainable practices don't mean compromising on quality—modern eco-friendly printing produces vibrant, professional results.

By choosing sustainable printing, you reduce your carbon footprint, appeal to environmentally conscious customers, and often save money long-term. From business cards to large format prints, sustainability can be integrated into every project without sacrificing the premium quality your brand deserves.

Eco-Friendly Paper Options
Recycled paper reduces the demand for virgin fiber and saves energy and water in production. Tree-free papers made from bamboo, sugarcane waste, or other renewable resources offer sustainable alternatives. Choosing FSC-certified paper ensures responsible forestry practices. Many eco-friendly papers are now available in premium finishes that rival traditional options.

The environmental impact of paper production is significant, but using recycled or sustainably sourced paper reduces your environmental footprint without compromising on quality. Modern recycled papers look and feel professional, making sustainability a win-win for both your brand and the planet.

Sustainable Inks and Finishes
Soy-based and vegetable-based inks are environmentally friendly alternatives to petroleum-based inks. Water-based finishes replace traditional chemical-heavy varnishes. These alternatives produce excellent color saturation and durability while being safer for the environment and workers.

Sustainable printing is no longer a niche practice. Many printing companies now offer eco-friendly options as standard, and the cost difference has become minimal. By choosing sustainable printing, you're making a positive environmental impact while maintaining the premium quality your brand demands.`,
    date: "2024-05-12",
    category: "Sustainability",
    author: "Priya Patel",
    authorBio: "Sustainability consultant and eco-friendly printing advocate.",
    readTime: "7 min",
    featured: false,
    image: "https://images.unsplash.com/photo-1559027615-cd2628902d4a?w=1200&h=600&fit=crop",
    relatedPosts: ["1", "2", "3"],
  },
];

export default function BlogDetailsPage() {
  const { slug } = useParams();
  const post = blogPostsData.find((p) => p.slug === slug);

  if (!post) {
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

  const relatedPosts = blogPostsData.filter((p) =>
    post.relatedPosts.includes(p.id)
  );

  const shareUrl = `${window.location.origin}/blog/${post.slug}`;
  const shareTitle = post.title;

  const formattedDate = new Date(post.date)
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
              <span aria-hidden>/</span>
              <span>{post.readTime} read</span>
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
                <span className="mt-0.5 block text-sm text-muted text-pretty">
                  {post.authorBio}
                </span>
              </span>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Hero image */}
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
      {relatedPosts.length > 0 && (
        <section className="border-t border-line py-16 lg:py-24">
          <Container>
            <Reveal>
              <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl text-balance">
                Related reading.
              </h2>
            </Reveal>
            <ul className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost, i) => (
                <Reveal as="li" key={relatedPost.id} delay={(i % 3) * 0.06}>
                  <Link to={`/blog/${relatedPost.slug}`} className="group block">
                    <div className="aspect-[16/10] overflow-hidden rounded-sm border border-line">
                      <img
                        src={relatedPost.image}
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
