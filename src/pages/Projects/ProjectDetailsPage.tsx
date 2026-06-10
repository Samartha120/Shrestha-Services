import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ArrowLeft, ChevronRight, Zap } from "lucide-react";
import { useProjectStore } from "@/store/projectStore";

export default function ProjectDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { selectedProject, fetchProjectBySlug, isLoading, projects } = useProjectStore();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (slug) {
      fetchProjectBySlug(slug);
    }
  }, [slug, fetchProjectBySlug]);

  // Get related projects (all except current)
  const relatedProjects = projects.filter((p) => p.slug !== slug).slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 dark:border-blue-900 border-t-blue-600 dark:border-t-blue-400" />
          </div>
          <p className="mt-4 text-slate-600 dark:text-slate-400 font-medium">
            Loading project details...
          </p>
        </div>
      </div>
    );
  }

  if (!selectedProject) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Project Not Found
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              Sorry, we couldn't find the project you're looking for.
            </p>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Breadcrumb Navigation */}
      <div className="sticky top-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link
              to="/"
              className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-600" />
            <Link
              to="/projects"
              className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Projects
            </Link>
            <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-600" />
            <span className="text-slate-900 dark:text-white font-semibold">
              {selectedProject.title}
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section with Full-width Image */}
      <section className="relative h-[500px] lg:h-[600px] overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={selectedProject.image}
            alt={selectedProject.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {/* Title Overlay */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="absolute inset-0 flex items-end"
        >
          <div className="w-full px-4 sm:px-6 lg:px-8 pb-12 lg:pb-20 max-w-7xl mx-auto">
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-indigo-400 rounded-full" />
              <span className="text-sm font-semibold text-blue-300 uppercase tracking-wider">
                Case Study
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
            >
              {selectedProject.title}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base lg:text-lg text-white/80 max-w-2xl"
            >
              {selectedProject.description}
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-12 lg:space-y-16"
          >
            {/* Project Overview */}
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                Project Overview
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {selectedProject.description}
              </p>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                This premium project showcases our expertise in delivering exceptional results
                that exceed client expectations. Every detail was carefully planned and executed
                to ensure the highest quality standards.
              </p>
            </motion.div>

            {/* Key Features/Highlights */}
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
                Highlights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Premium Quality",
                    description: "Highest grade materials and precision craftsmanship",
                  },
                  {
                    title: "Expert Execution",
                    description: "Professional team with years of industry experience",
                  },
                  {
                    title: "On-Time Delivery",
                    description: "Strict adherence to timelines without compromising quality",
                  },
                  {
                    title: "Client Satisfaction",
                    description: "100% dedicated to exceeding client expectations",
                  },
                ].map((highlight, idx) => (
                  <motion.div
                    key={idx}
                    variants={cardVariants}
                    className="p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-blue-600 rounded-lg shrink-0 mt-1">
                        <Zap className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                          {highlight.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300">
                          {highlight.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Project Stats */}
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
                Project Details
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Duration", value: "3-4 weeks" },
                  { label: "Team Size", value: "5+ members" },
                  { label: "Revisions", value: "Unlimited" },
                  { label: "Complexity", value: "High" },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    variants={cardVariants}
                    className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl text-center border border-slate-200 dark:border-slate-700"
                  >
                    <p className="text-2xl lg:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {stat.value}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Related Projects Section */}
      {relatedProjects.length > 0 && (
        <section className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div variants={itemVariants} className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                  More Case Studies
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  Explore other premium projects showcasing our expertise
                </p>
              </motion.div>

              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
              >
                {relatedProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    variants={cardVariants}
                    className="group relative overflow-hidden rounded-2xl h-64 md:h-72"
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:translate-y-0 transition-transform">
                        {project.title}
                      </h3>
                      <Link
                        to={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-2 w-fit px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300"
                      >
                        View
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 dark:from-blue-900 dark:via-blue-800 dark:to-indigo-900" />

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -ml-36 -mb-36" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="text-center"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
            >
              Ready for a Similar Project?
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-lg text-white/90 mb-10"
            >
              Let's discuss how we can bring your vision to life with the same excellence,
              attention to detail, and professionalism you see in our portfolio.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link
                to="/quote"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-2xl hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
              >
                Request a Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold border border-white/30 rounded-2xl hover:bg-white/30 transition-all duration-300 active:scale-95"
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Back Button */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.button
            whileHover={{ x: -4 }}
            onClick={() => navigate("/projects")}
            className="inline-flex items-center gap-2 px-6 py-3 text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to All Projects
          </motion.button>
        </div>
      </section>
    </div>
  );
}
