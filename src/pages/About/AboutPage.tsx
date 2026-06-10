import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "@/components/common/Button";
import Card from "@/components/ui/Card";
import { Award, Users, Zap, Target, CircleCheck as CheckCircle2 } from "lucide-react";

const stats = [
  { value: "10+", label: "Years of Experience", icon: Award },
  { value: "500+", label: "Projects Completed", icon: CheckCircle2 },
  { value: "350+", label: "Happy Clients", icon: Users },
  { value: "15", label: "Awards Won", icon: Award },
];

const missionVisionValues = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To deliver premium quality printing solutions that exceed customer expectations while maintaining the highest standards of craftsmanship and service excellence.",
  },
  {
    icon: Zap,
    title: "Our Vision",
    description:
      "To be the most trusted and innovative printing partner in Nepal, known for reliability, creativity, and unwavering commitment to customer success.",
  },
  {
    icon: Award,
    title: "Our Values",
    description:
      "Quality, integrity, innovation, and customer-centric approach guide every decision we make. We believe in building lasting relationships through trust and excellence.",
  },
];

const teamMembers = [
  {
    name: "Raj Shrestha",
    role: "Founder & CEO",
    initials: "RS",
    bio: "20+ years in printing industry",
  },
  {
    name: "Priya Sharma",
    role: "Operations Manager",
    initials: "PS",
    bio: "Expert in process optimization",
  },
  {
    name: "Amit Karki",
    role: "Design Lead",
    initials: "AK",
    bio: "Creative excellence specialist",
  },
  {
    name: "Sunita Thapa",
    role: "Quality Assurance",
    initials: "ST",
    bio: "Premium standards guardian",
  },
];

const timeline = [
  {
    year: "2014",
    title: "The Beginning",
    description: "Founded Shrestha Services with a vision to revolutionize printing in Nepal.",
  },
  {
    year: "2017",
    title: "Expansion",
    description: "Added advanced digital printing technology and expanded team to 15+ members.",
  },
  {
    year: "2020",
    title: "Innovation",
    description: "Launched eco-friendly printing solutions and won sustainability award.",
  },
  {
    year: "2024",
    title: "Excellence",
    description: "Achieved 500+ projects milestone and became industry benchmark for quality.",
  },
];

const equipmentCategories = [
  { name: "Digital Printers", count: 12, icon: "🖨️" },
  { name: "Offset Presses", count: 8, icon: "⚙️" },
  { name: "Finishing Equipment", count: 15, icon: "✂️" },
  { name: "Wide Format Printers", count: 6, icon: "📏" },
];

export default function AboutPage() {
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-40 left-20 w-96 h-96 bg-indigo-200 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-20" />

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-full mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
              Our Story
            </span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
            Crafting Excellence, <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">One Print at a Time</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg text-slate-600 dark:text-slate-300 mb-10">
            From humble beginnings to industry leadership, Shrestha Services has been committed to delivering premium printing solutions with unmatched quality and reliability.
          </motion.p>
        </motion.div>
      </section>

      {/* Mission Vision Values */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8"
        >
          {missionVisionValues.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div key={idx} variants={itemVariants}>
                <Card className="p-8 h-full">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center mb-6">
                    <Icon className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Statistics Bar */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 sm:p-12 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 border-0 shadow-lg">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="text-center text-white"
                  >
                    <Icon className="h-8 w-8 mx-auto mb-3 opacity-80" />
                    <div className="text-4xl sm:text-5xl font-bold mb-2">{stat.value}</div>
                    <div className="text-sm opacity-90">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </motion.div>
      </section>

      {/* Team Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white text-center mb-4">
            Meet Our Team
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-slate-600 dark:text-slate-400 text-center max-w-2xl mx-auto mb-12">
            Talented professionals dedicated to delivering excellence in every project
          </motion.p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <Card className="p-6 h-full text-center">
                  <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl">
                    {member.initials}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {member.bio}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Timeline */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white text-center mb-12">
            Our Journey
          </motion.h2>

          <div className="space-y-8">
            {timeline.map((item, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <div className="flex gap-6 sm:gap-8">
                  <div className="flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {idx + 1}
                    </div>
                    {idx < timeline.length - 1 && (
                      <div className="w-1 h-20 bg-gradient-to-b from-blue-600 to-transparent mt-2" />
                    )}
                  </div>
                  <Card className="p-6 sm:p-8 flex-1">
                    <div className="text-sm font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {item.year}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      {item.description}
                    </p>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Equipment Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white text-center mb-4">
            Our Equipment
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-slate-600 dark:text-slate-400 text-center max-w-2xl mx-auto mb-12">
            State-of-the-art machinery ensuring premium quality on every project
          </motion.p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {equipmentCategories.map((category, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <Card className="p-8 text-center h-full">
                  <div className="text-5xl mb-4">{category.icon}</div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {category.count}+
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-12 text-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-100 dark:border-blue-800/50">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">
              Ready to bring your vision to life?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
              Let's work together to create something extraordinary. Get started with a free consultation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/quote">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white h-12 px-8">
                  Get Free Quote
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="h-12 px-8">
                  Contact Us
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}
