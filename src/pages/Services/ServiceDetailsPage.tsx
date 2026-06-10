import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight, Package, Zap, CircleCheck as CheckCircle, Clock } from "lucide-react";
import { useRef } from "react";
import { useServiceStore } from "@/store/serviceStore";
import Card from "@/components/ui/Card";
import Button from "@/components/common/Button";
import Badge from "@/components/ui/Badge";
import Breadcrumb from "@/components/common/Breadcrumb";

export default function ServiceDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const { selectedService, fetchServiceBySlug, isLoading } = useServiceStore();
  const { services } = useServiceStore();

  useEffect(() => {
    if (slug) {
      fetchServiceBySlug(slug);
    }
  }, [slug, fetchServiceBySlug]);

  // Get related services (same category, excluding current service)
  const relatedServices = selectedService
    ? services
        .filter(
          (s) =>
            s.category === selectedService.category && s.id !== selectedService.id
        )
        .slice(0, 3)
    : [];

  // Animation refs
  const descRef = useRef(null);
  const materialsRef = useRef(null);
  const featuresRef = useRef(null);
  const ctaRef = useRef(null);
  const relatedRef = useRef(null);

  const descInView = useInView(descRef, { once: true, margin: "-100px" });
  const materialsInView = useInView(materialsRef, { once: true, margin: "-100px" });
  const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });
  const relatedInView = useInView(relatedRef, { once: true, margin: "-100px" });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin mb-4 flex justify-center">
            <Package className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-slate-600 dark:text-slate-400">Loading service...</p>
        </div>
      </div>
    );
  }

  if (!selectedService) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <Card className="p-8 text-center max-w-sm">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Service Not Found
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Sorry, we couldn't find the service you're looking for.
          </p>
          <Link to="/services">
            <Button>Back to Services</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="px-6 sm:px-8 py-6 border-b border-slate-200 dark:border-slate-700"
      >
        <div className="max-w-6xl mx-auto">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 mb-4 transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Services
          </Link>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: selectedService.title },
            ]}
          />
        </div>
      </motion.div>

      {/* Hero Banner */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative h-96 md:h-[500px] overflow-hidden"
      >
        <motion.img
          src={selectedService.image}
          alt={selectedService.title}
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="px-6 sm:px-8 pb-12 w-full max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {selectedService.category && (
                <Badge variant="primary" className="mb-4">
                  {selectedService.category}
                </Badge>
              )}
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                {selectedService.title}
              </h1>
              {selectedService.basePrice && (
                <p className="text-lg text-blue-100 font-semibold">
                  Starting from NPR {selectedService.basePrice}/sq.ft
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Description Section */}
      <motion.section
        ref={descRef}
        initial="hidden"
        animate={descInView ? "visible" : "hidden"}
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 20 },
        }}
        transition={{ duration: 0.6 }}
        className="px-6 sm:px-8 py-16 md:py-20"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            About This Service
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            {selectedService.description}
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                  Premium Quality
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Industry-leading materials and cutting-edge printing technology
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Clock className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                  Fast Turnaround
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Quick production times without compromising on quality
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Zap className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                  Expert Support
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Professional guidance throughout your project journey
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Materials Section */}
      {selectedService.materials && selectedService.materials.length > 0 && (
        <motion.section
          ref={materialsRef}
          initial="hidden"
          animate={materialsInView ? "visible" : "hidden"}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 20 },
          }}
          transition={{ duration: 0.6 }}
          className="px-6 sm:px-8 py-16 md:py-20 bg-slate-50 dark:bg-slate-800/50"
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Available Materials
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-10 max-w-2xl">
              We offer a variety of premium materials to suit your specific needs
              and budget requirements.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedService.materials.map((material, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={materialsInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Card className="h-full p-6 dark:bg-slate-700 dark:border-slate-600 hover:shadow-xl transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                        <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                          {material}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Premium quality option for exceptional results
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* Features Section */}
      {selectedService.features && selectedService.features.length > 0 && (
        <motion.section
          ref={featuresRef}
          initial="hidden"
          animate={featuresInView ? "visible" : "hidden"}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 20 },
          }}
          transition={{ duration: 0.6 }}
          className="px-6 sm:px-8 py-16 md:py-20"
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Key Features & Benefits
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-10 max-w-2xl">
              Discover what makes this service stand out and why our clients
              choose us for their printing needs.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedService.features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={featuresInView ? { opacity: 1, x: 0 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex gap-4 p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl hover:shadow-lg transition-shadow"
                >
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                      {feature}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Carefully crafted to meet the highest industry standards
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* CTA Panel */}
      <motion.section
        ref={ctaRef}
        initial="hidden"
        animate={ctaInView ? "visible" : "hidden"}
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 20 },
        }}
        transition={{ duration: 0.6 }}
        className="px-6 sm:px-8 py-16 md:py-20 bg-slate-50 dark:bg-slate-800/50"
      >
        <div className="max-w-6xl mx-auto">
          <Card className="bg-gradient-to-r from-blue-600 to-blue-500 border-0 text-white dark:from-blue-700 dark:to-blue-600 overflow-hidden">
            <div className="relative p-12 md:p-16">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
              </div>

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Ready to Get Started?
                  </h2>
                  <p className="text-blue-50 text-lg mb-6">
                    Get a personalized quote for your {selectedService.title}{" "}
                    project. Our team will work with you to understand your needs
                    and deliver exceptional results.
                  </p>
                </div>

                <div className="flex flex-col justify-center gap-4">
                  <Link to={`/quote?serviceId=${selectedService.id}`}>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full bg-white text-blue-600 hover:bg-blue-50 font-semibold gap-2"
                    >
                      Request Quote <ArrowRight size={18} />
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full border-white text-white hover:bg-blue-400 font-semibold"
                    >
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </motion.section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <motion.section
          ref={relatedRef}
          initial="hidden"
          animate={relatedInView ? "visible" : "hidden"}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 20 },
          }}
          transition={{ duration: 0.6 }}
          className="px-6 sm:px-8 py-16 md:py-20"
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Related Services
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-10">
              Explore other services in the {selectedService.category} category
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedServices.map((service, idx) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={relatedInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Link to={`/services/${service.slug}`}>
                    <Card className="h-full overflow-hidden group dark:bg-slate-800 dark:border-slate-700 cursor-pointer">
                      <div className="h-48 overflow-hidden bg-slate-200 dark:bg-slate-700">
                        <motion.img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                          {service.description}
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
                          Learn More <ArrowRight size={16} />
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}
    </div>
  );
}
