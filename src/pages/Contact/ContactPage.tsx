import { useState } from "react";
import { motion } from "framer-motion";
import { useContactStore } from "@/store/contactStore";
import { companyData } from "@/data/company";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Card from "@/components/ui/Card";
import { Mail, Phone, MapPin, Clock, Globe, ArrowRight } from "lucide-react";
import { toast } from "sonner";

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
  "Technical Support",
  "Bulk Order",
];

const businessHours = [
  { day: "Sunday", hours: "9:30 AM - 7:00 PM" },
  { day: "Monday", hours: "9:30 AM - 7:00 PM" },
  { day: "Tuesday", hours: "9:30 AM - 7:00 PM" },
  { day: "Wednesday", hours: "9:30 AM - 7:00 PM" },
  { day: "Thursday", hours: "9:30 AM - 7:00 PM" },
  { day: "Friday", hours: "9:30 AM - 7:00 PM" },
  { day: "Saturday", hours: "Closed" },
];

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
      toast.success("Inquiry sent successfully! We'll contact you soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: subjects[0],
        message: "",
      });
      setErrors({});
    } catch {
      toast.error("Failed to send inquiry. Please try again.");
    }
  };

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
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-full mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
              We're Here to Help
            </span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
            Get in <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Touch</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg text-slate-600 dark:text-slate-300">
            Have questions about our printing services? We're excited to hear from you. Send us a message and we'll respond as soon as possible.
          </motion.p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2"
          >
            <Card className="p-8 sm:p-10">
              <motion.h2 variants={itemVariants} className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-8">
                Send us a Message
              </motion.h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div variants={itemVariants}>
                  <Input
                    label="Full Name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    error={errors.name}
                    className={errors.name ? "border-red-500" : ""}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    error={errors.email}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="+977 98 00000000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    error={errors.phone}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="text-sm font-medium text-slate-900 dark:text-white block mb-2">
                    Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className={`
                      w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-900
                      text-slate-900 dark:text-white transition-all duration-300
                      focus:ring-2 focus:ring-blue-500
                      ${errors.subject ? "border-red-500" : "border-slate-300 dark:border-slate-700"}
                    `}
                  >
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                  {errors.subject && <p className="text-sm text-red-500 mt-2">{errors.subject}</p>}
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="text-sm font-medium text-slate-900 dark:text-white block mb-2">
                    Message
                  </label>
                  <textarea
                    placeholder="Tell us about your project..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`
                      w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-900
                      text-slate-900 dark:text-white transition-all duration-300
                      focus:ring-2 focus:ring-blue-500 resize-none
                      ${errors.message ? "border-red-500" : "border-slate-300 dark:border-slate-700"}
                    `}
                  />
                  {errors.message && <p className="text-sm text-red-500 mt-2">{errors.message}</p>}
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Button
                    type="submit"
                    loading={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base h-12"
                    rightIcon={<ArrowRight size={18} />}
                  >
                    Send Message
                  </Button>
                </motion.div>
              </form>
            </Card>
          </motion.div>

          {/* Info Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Contact Info Cards */}
            <motion.div variants={itemVariants}>
              <Card className="p-6 h-full">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-slate-900 dark:text-white">Email</h3>
                    <a
                      href={`mailto:${companyData.email}`}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline break-all"
                    >
                      {companyData.email}
                    </a>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="p-6 h-full">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-slate-900 dark:text-white">Phone</h3>
                    <a
                      href={`tel:${companyData.phone}`}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {companyData.phone}
                    </a>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="p-6 h-full">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-slate-900 dark:text-white">Location</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {companyData.address}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants}>
              <Card className="p-6 h-full">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Connect With Us</h3>
                <div className="flex gap-3">
                  <a
                    href="#"
                    aria-label="Website"
                    className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                  >
                    <Globe size={18} />
                  </a>
                  <a
                    href={`mailto:${companyData.email}`}
                    aria-label="Email"
                    className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                  >
                    <Mail size={18} />
                  </a>
                  <a
                    href={`tel:${companyData.phone}`}
                    aria-label="Phone"
                    className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                  >
                    <Phone size={18} />
                  </a>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Business Hours Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <Card className="p-8 sm:p-10 overflow-hidden">
            <motion.h2 variants={itemVariants} className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
              <Clock className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              Business Hours
            </motion.h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {businessHours.map((item, idx) => (
                <motion.div
                  key={item.day}
                  variants={itemVariants}
                  custom={idx}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
                >
                  <p className="font-semibold text-slate-900 dark:text-white">{item.day}</p>
                  <p className={`text-sm ${item.hours === "Closed" ? "text-red-600 dark:text-red-400 font-semibold" : "text-slate-600 dark:text-slate-400"}`}>
                    {item.hours}
                  </p>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </section>

      {/* Map Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <Card className="overflow-hidden h-96 sm:h-[500px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114509.3016234857!2d87.20243214901203!3d26.48375038588986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef6d267547f203%3A0x645927a9412d694d!2sBiratnagar%2C%20Nepal!5e0!3m2!1sen!2s!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Shrestha Services Location"
            />
          </Card>
        </motion.div>
      </section>
    </div>
  );
}
