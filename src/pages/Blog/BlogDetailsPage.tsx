import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/common/Button";

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
      <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Post Not Found
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <Link to="/blog">
            <Button variant="primary">Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = blogPostsData.filter((p) =>
    post.relatedPosts.includes(p.id)
  );

  const shareUrl = `${window.location.origin}/blog/${post.slug}`;
  const shareTitle = post.title;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Breadcrumb */}
      <div className="border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative h-96 overflow-hidden"
      >
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Article Header */}
      <section className="py-12 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full mb-6">
              <span className="text-xs font-semibold">{post.category}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-8">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-8 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full" />
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {post.author}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {post.authorBio}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-6 pt-8 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{post.readTime} read</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <User className="w-4 h-4" />
                <span className="text-sm">By {post.author}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="prose dark:prose-invert max-w-none"
          >
            <div className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed space-y-6">
              {post.content.split("\n\n").map((paragraph, idx) => {
                const isHeading = paragraph.length < 50 && paragraph.includes(" ");
                if (isHeading && idx > 0) {
                  return (
                    <h2
                      key={idx}
                      className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4"
                    >
                      {paragraph}
                    </h2>
                  );
                }
                return (
                  <p key={idx} className="leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </motion.div>

          {/* Share Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-700"
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              Share This Article
            </h3>
            <div className="flex flex-wrap gap-4">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors font-medium"
              >
                f Facebook
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors font-medium"
              >
                𝕏 Twitter
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors font-medium"
              >
                in LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-20 bg-slate-50 dark:bg-slate-800/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center">
                Related Articles
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} to={`/blog/${relatedPost.slug}`}>
                    <Card className="h-full flex flex-col overflow-hidden">
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase mb-2">
                          {relatedPost.category}
                        </p>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                          {relatedPost.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm flex-grow">
                          {relatedPost.excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                          <Clock className="w-3 h-3" />
                          {relatedPost.readTime}
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
              Ready to Transform Your Brand?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
              Let us help you bring your printing and design vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/quote">
                <Button variant="primary" size="lg">
                  Get a Quote
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
