import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "@/components/ui/Card";
import Button from "@/components/common/Button";

const blogPosts = [
  {
    id: "1",
    slug: "print-quality-matters",
    title: "Why Print Quality Matters in 2024",
    excerpt: "Explore how high-quality printing can elevate your brand and leave a lasting impression on your clients.",
    content: "Print quality is the foundation of professional branding. When customers hold a well-printed business card or brochure, they form immediate judgments about your business. Premium printing demonstrates attention to detail and commitment to excellence. In today's digital world, quality print materials stand out even more, showing that you invest in tangible, meaningful customer touchpoints. Whether it's business cards with perfect color accuracy, brochures with crisp text, or packaging that feels premium, quality printing creates trust and credibility that digital alone cannot achieve.",
    date: "2024-06-15",
    category: "Printing Tips",
    author: "Raj Shrestha",
    readTime: "5 min",
    featured: true,
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=400&fit=crop",
  },
  {
    id: "2",
    slug: "branding-essentials",
    title: "Branding Essentials: A Complete Guide",
    excerpt: "Learn the fundamental elements that make a brand recognizable and memorable to your target audience.",
    content: "Strong branding goes beyond just a logo. It encompasses your visual identity, voice, values, and the entire customer experience. A comprehensive brand includes consistent typography, color palettes, imagery styles, and messaging guidelines. When all these elements work together, they create an unmistakable identity that customers recognize instantly. From business cards to billboards, every touchpoint should reinforce your brand message. Consistency across all materials—print, digital, and otherwise—builds brand recognition and trust over time.",
    date: "2024-06-10",
    category: "Branding",
    author: "Priya Patel",
    readTime: "7 min",
    featured: false,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop",
  },
  {
    id: "3",
    slug: "custom-packaging-benefits",
    title: "The Power of Custom Packaging Design",
    excerpt: "Discover how custom packaging can transform your product presentation and create memorable unboxing experiences.",
    content: "Custom packaging is a powerful marketing tool that extends far beyond protection. It's the first physical interaction customers have with your product, making it crucial for brand perception. Thoughtful packaging design tells your brand story, reflects your values, and creates emotional connections. In the age of social media, attractive packaging encourages customers to share unboxing experiences, providing free marketing for your brand. From sustainable materials to innovative designs, custom packaging demonstrates care for both your product and your customers' experience.",
    date: "2024-06-05",
    category: "Packaging",
    author: "Raj Shrestha",
    readTime: "6 min",
    featured: false,
    image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=800&h=400&fit=crop",
  },
  {
    id: "4",
    slug: "business-card-design",
    title: "Business Cards Still Matter: Design Tips",
    excerpt: "Master the art of designing business cards that leave lasting impressions and effectively communicate your professional identity.",
    content: "In a digital world, a physical business card is a tangible representation of your professionalism. The best business cards balance aesthetic appeal with practical information. Effective designs use negative space wisely, maintain readability, and choose colors and finishes that align with brand identity. Consider unique finishes like matte, embossing, or metallic accents to stand out. A well-designed business card tells a story about your business before you even speak. It's a small item with big potential to create professional connections and memorable first impressions.",
    date: "2024-05-28",
    category: "Design",
    author: "Nina Kapoor",
    readTime: "5 min",
    featured: false,
    image: "https://images.unsplash.com/photo-1614707267537-b85faf00021b?w=800&h=400&fit=crop",
  },
  {
    id: "5",
    slug: "signage-best-practices",
    title: "Signage Best Practices for Retail Spaces",
    excerpt: "Learn how strategic signage design can guide customer behavior and boost sales in retail environments.",
    content: "Effective signage is a silent salesperson that guides customers and communicates key messages without relying on spoken words. The best signage is clear, visible from a distance, and aligned with brand identity. Color psychology plays an important role—certain colors draw attention and evoke specific emotional responses. Placement matters equally; signs should be positioned where customers naturally look. From entrance signage that creates first impressions to directional signs that improve customer experience, well-designed signage increases visibility, directs traffic, and ultimately drives sales.",
    date: "2024-05-20",
    category: "Signage",
    author: "Raj Shrestha",
    readTime: "6 min",
    featured: false,
    image: "https://images.unsplash.com/photo-1489749798305-4fea3ba63d60?w=800&h=400&fit=crop",
  },
  {
    id: "6",
    slug: "sustainability-printing",
    title: "Sustainable Printing Practices",
    excerpt: "Explore eco-friendly printing options that don't compromise on quality while protecting our environment.",
    content: "Sustainable printing is becoming increasingly important to conscious consumers and responsible businesses. Eco-friendly options include recycled paper, soy-based inks, water-based finishes, and energy-efficient processes. Sustainable practices don't mean compromising on quality—modern eco-friendly printing produces vibrant, professional results. By choosing sustainable printing, you reduce your carbon footprint, appeal to environmentally conscious customers, and often save money long-term. From business cards to large format prints, sustainability can be integrated into every project without sacrificing the premium quality your brand deserves.",
    date: "2024-05-12",
    category: "Sustainability",
    author: "Priya Patel",
    readTime: "7 min",
    featured: false,
    image: "https://images.unsplash.com/photo-1559027615-cd2628902d4a?w=800&h=400&fit=crop",
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

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  const featuredPost = blogPosts.find((p) => p.featured);
  const regularPosts = filteredPosts.filter((p) => !p.featured);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pt-20 pb-16">
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-200 dark:bg-blue-900/30 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-indigo-200 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-40" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
              Insights &{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Tips
              </span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Explore our latest articles on printing, branding, design, and industry insights.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link to={`/blog/${featuredPost.slug}`}>
                <Card className="overflow-hidden lg:grid lg:grid-cols-2 lg:gap-0">
                  <div className="relative h-96 lg:h-full overflow-hidden">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full w-fit mb-4">
                      <span className="text-xs font-semibold">FEATURED</span>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                      {featuredPost.title}
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">
                          {new Date(featuredPost.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{featuredPost.readTime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
                        Read Article
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {regularPosts.map((post) => (
              <motion.div key={post.id} variants={itemVariants}>
                <Link to={`/blog/${post.slug}`}>
                  <Card className="h-full flex flex-col overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4">
                        <div className="inline-flex items-center gap-1 px-3 py-1 bg-white/90 dark:bg-slate-800/90 text-slate-900 dark:text-white rounded-full">
                          <Tag className="w-3 h-3" />
                          <span className="text-xs font-semibold">{post.category}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                        {post.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-6 flex-grow">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {regularPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center py-12"
            >
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                No posts found in this category.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8">
              Subscribe to our blog for the latest printing tips, design insights, and industry news.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-6 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <Button variant="primary" size="md">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
