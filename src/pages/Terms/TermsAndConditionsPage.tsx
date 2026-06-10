import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const sections = [
  {
    id: "1",
    title: "Agreement to Terms",
    content: `By accessing and using this website ("Service"), you accept and agree to be bound by the terms of this agreement. If you do not agree to abide by the above, please do not use this Service.

These Terms and Conditions constitute the entire agreement between Shrestha Services and you regarding your use of this website. The failure of Shrestha Services to enforce any right or provision of these terms will not be considered a waiver of those rights.

You acknowledge and agree that these terms are non-negotiable. By using the Service, you affirm that you are at least the age of majority in your country of residence.`,
  },
  {
    id: "2",
    title: "Use License",
    content: `Permission is granted to temporarily download one copy of the materials (information or software) on Shrestha Services's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:

- Modifying or copying the materials
- Using the materials for any commercial purpose or for any public display
- Attempting to decompile or reverse engineer any software contained on the website
- Removing any copyright or other proprietary notations from the materials
- Transferring the materials to another person or "mirroring" the materials on any other server
- Using the materials for any illegal purpose or in violation of any applicable law or regulation

This license shall automatically terminate if you violate any of these restrictions and may be terminated by Shrestha Services at any time. Upon termination of your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.`,
  },
  {
    id: "3",
    title: "Disclaimer",
    content: `The materials on Shrestha Services's website are provided on an "as is" basis. Shrestha Services makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.

Further, Shrestha Services does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.`,
  },
  {
    id: "4",
    title: "Limitations",
    content: `In no event shall Shrestha Services or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Shrestha Services's website, even if Shrestha Services or an authorized representative has been notified orally or in writing of the possibility of such damage.

Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.

The maximum liability of Shrestha Services for any claim arising out of or relating to this agreement shall not exceed the total amount paid by you for services.`,
  },
  {
    id: "5",
    title: "Accuracy of Materials",
    content: `The materials appearing on Shrestha Services's website could include technical, typographical, or photographic errors. Shrestha Services does not warrant that any of the materials on its website are accurate, complete, or current. Shrestha Services may make changes to the materials contained on its website at any time without notice.

Shrestha Services does not make any commitment to update the materials. We recommend verifying all information before making any decisions based on our materials.`,
  },
  {
    id: "6",
    title: "Links",
    content: `Shrestha Services has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Shrestha Services of the site. Use of any such linked website is at the user's own risk.

If you believe that content on our website infringes your copyright or trademark, or if you believe that content linked from our website violates your rights, please contact us immediately at legal@shresthaservices.com.`,
  },
  {
    id: "7",
    title: "Modifications",
    content: `Shrestha Services may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.

We will provide notice of material changes to this agreement by posting the new terms on our website and updating the "Last Updated" date. Your continued use of the Service after any changes constitute your acceptance of the new terms.`,
  },
  {
    id: "8",
    title: "Governing Law",
    content: `These terms and conditions are governed by and construed in accordance with the laws of Nepal, and you irrevocably submit to the exclusive jurisdiction of the courts in Biratnagar, Nepal.

If any provision of these terms is found to be invalid or unenforceable, the remaining provisions will continue in full force and effect.`,
  },
  {
    id: "9",
    title: "Order and Payment Terms",
    content: `Orders placed through our website are subject to acceptance and confirmation by Shrestha Services. We reserve the right to refuse or cancel any order at our discretion, including orders that appear fraudulent or violate our policies.

All prices are in Nepalese Rupees (NPR) unless otherwise specified. Prices are subject to change without notice. We reserve the right to correct any pricing errors or omissions that may appear on the website.

Payment must be received in full before production begins, unless otherwise agreed in writing. We accept various payment methods as displayed on our website. All transactions are processed securely through third-party payment providers.

For orders requiring advance payment, a non-refundable deposit may be required to secure your order and begin production.`,
  },
  {
    id: "10",
    title: "Delivery and Shipping",
    content: `We strive to deliver orders according to the agreed timeline. However, Shrestha Services is not liable for delays caused by circumstances beyond our reasonable control, including but not limited to:

- Natural disasters or force majeure events
- Strikes or labor disputes
- Courier company delays
- Customs or government action
- Extreme weather conditions

Delivery times are estimates and not guaranteed. Shipping charges are calculated based on weight, size, and destination. International orders may be subject to additional customs duties and taxes.

Risk of loss transfers to you upon delivery. You are responsible for inspecting goods upon receipt and reporting any damage within 48 hours.`,
  },
  {
    id: "11",
    title: "Returns and Refunds",
    content: `We take pride in the quality of our work. If you are unsatisfied with your order due to our error or defect in materials, please contact us within 7 days of delivery.

We will work with you to resolve quality issues, which may include:

- Reprinting the order at no cost
- Providing a partial refund
- Full refund if reprint is not feasible

Returns must be made in original condition. Non-defective returns may be subject to a restocking fee. Custom orders are generally non-refundable unless there is an error on our part.

To initiate a return or claim a quality issue, contact our customer service at support@shresthaservices.com with photos and details of the problem.`,
  },
  {
    id: "12",
    title: "Intellectual Property Rights",
    content: `All content on our website, including text, graphics, logos, images, and software, is the property of Shrestha Services or its suppliers and is protected by international copyright laws.

Designs and artwork created by Shrestha Services remain our property unless otherwise agreed in writing. By ordering custom design services, you grant Shrestha Services a non-exclusive right to use the final design for portfolio and promotional purposes, unless you specify otherwise in writing.

You retain all rights to your original content and materials that you provide to us. You grant Shrestha Services a non-exclusive license to use your materials for the purpose of fulfilling your order.`,
  },
  {
    id: "13",
    title: "Limitation of Liability",
    content: `To the maximum extent permitted by law, in no event shall Shrestha Services be liable for any indirect, incidental, special, consequential, or punitive damages, regardless of the cause of action.

Our total liability for all claims arising from or relating to this agreement shall not exceed the amount you paid for the relevant order or service, or NPR 10,000, whichever is greater.

Some jurisdictions do not allow the limitation or exclusion of liability for incidental or consequential damages, so some of the above limitations may not apply to you.`,
  },
  {
    id: "14",
    title: "Contact Information",
    content: `For any questions, concerns, or disputes regarding these terms and conditions, please contact us:

Shrestha Services
Biratnagar, Nepal
Email: legal@shresthaservices.com
Phone: +977 9800000000
Customer Support: support@shresthaservices.com

We are committed to resolving any issues in a fair and timely manner.`,
  },
];

export default function TermsAndConditionsPage() {
  const [activeSection, setActiveSection] = useState("1");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-16">
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-200 dark:bg-blue-900/30 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-indigo-200 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-40" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Terms & Conditions
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-4">
              Please read these terms carefully before using our website and services. By using
              Shrestha Services, you agree to comply with these terms.
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Last updated: June 2024
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-1"
            >
              <div className="sticky top-8 bg-slate-50 dark:bg-slate-800 rounded-2xl p-6">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
                  Table of Contents
                </h3>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <motion.button
                      key={section.id}
                      variants={itemVariants}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium ${
                        activeSection === section.id
                          ? "bg-blue-600 text-white"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                      }`}
                    >
                      {section.title}
                    </motion.button>
                  ))}
                </nav>
              </div>
            </motion.div>

            {/* Content Area */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              {sections.map((section) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: activeSection === section.id ? 1 : 0,
                    display: activeSection === section.id ? "block" : "none",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="prose dark:prose-invert max-w-none">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                      {section.title}
                    </h2>
                    <div className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed space-y-4">
                      {section.content.split("\n\n").map((paragraph, idx) => (
                        <div key={idx}>
                          {paragraph.includes("-") ? (
                            <div>
                              {paragraph.split("\n").map((line, lineIdx) => {
                                if (line.startsWith("-")) {
                                  return (
                                    <div
                                      key={lineIdx}
                                      className="flex gap-3 ml-4 mb-2"
                                    >
                                      <span className="text-blue-600 dark:text-blue-400 font-bold">
                                        •
                                      </span>
                                      <span>{line.replace("- ", "")}</span>
                                    </div>
                                  );
                                }
                                return null;
                              })}
                            </div>
                          ) : (
                            <p>{paragraph}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Questions About Our Terms?
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8">
              If you have any questions or concerns about our terms and conditions, please contact our
              legal team.
            </p>
            <a
              href="mailto:legal@shresthaservices.com"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
            >
              Contact Legal Team
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
