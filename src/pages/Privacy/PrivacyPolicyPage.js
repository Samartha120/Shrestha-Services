import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
const sections = [
    {
        id: "1",
        title: "Information We Collect",
        content: `We collect information you provide directly to us, such as when you request a quote, place an order, or contact us through our website. This includes:

- Contact information (name, email address, phone number, mailing address)
- Order information (products ordered, quantities, delivery preferences)
- Payment information (processed securely through third-party providers)
- Communications you send us (emails, messages, feedback)
- Account information (username, password for registered users)

We also automatically collect certain information about your device and how you interact with our website:

- Device information (browser type, IP address, operating system)
- Browsing activity (pages visited, time spent, links clicked)
- Cookies and similar tracking technologies
- Geographic location (if permitted)`,
    },
    {
        id: "2",
        title: "How We Use Your Information",
        content: `We use the information we collect for various purposes:

- To process your orders and deliver our products and services
- To send transactional emails and updates about your orders
- To respond to your inquiries and customer service requests
- To improve our website, products, and services
- To send marketing communications (with your consent)
- To comply with legal obligations and enforce our terms
- To prevent fraudulent transactions and protect our business
- To analyze usage patterns and user preferences
- To personalize your experience on our website

We only use your information in ways you would reasonably expect and with your consent where required by law.`,
    },
    {
        id: "3",
        title: "Data Protection & Security",
        content: `We implement comprehensive security measures to protect your information:

- Secure Socket Layer (SSL) encryption for data transmission
- Password protection and access controls
- Regular security audits and vulnerability assessments
- Limited access to personal information (authorized personnel only)
- Secure data storage with appropriate safeguards

However, no method of transmission over the Internet or electronic storage is completely secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee absolute security. You acknowledge and accept this limitation.

We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy, or as required by law. When information is no longer needed, we securely delete or anonymize it.`,
    },
    {
        id: "4",
        title: "Cookies and Tracking Technologies",
        content: `Our website uses cookies and similar tracking technologies to enhance your experience:

- Session cookies: Temporary cookies that expire when you close your browser
- Persistent cookies: Remain on your device for future visits
- Analytics cookies: Track usage patterns and help us improve our services
- Marketing cookies: Enable personalized advertisements and content

Most web browsers allow you to control cookies through settings. You can:

- Accept or reject cookies
- Delete existing cookies
- Receive notifications when new cookies are set
- Disable cookies entirely

Please note that disabling cookies may affect your ability to use certain features of our website. We respect the "Do Not Track" signals and will not track your activity if such signals are enabled.`,
    },
    {
        id: "5",
        title: "Third-Party Services",
        content: `We may share information with trusted third-party service providers who assist us:

- Payment processors (for secure payment handling)
- Shipping and logistics providers (for order delivery)
- Email service providers (for communications)
- Analytics providers (for website improvement)
- Cloud storage providers (for data backup and security)

These providers are contractually obligated to:

- Use your information only as necessary to provide their services
- Maintain appropriate security standards
- Not disclose your information to unauthorized parties
- Comply with applicable data protection laws

We are not responsible for the privacy practices of third-party websites or services. We encourage you to review their privacy policies before providing any information.`,
    },
    {
        id: "6",
        title: "Your Privacy Rights",
        content: `Depending on your location, you may have certain rights regarding your personal information:

- Right to Access: You can request a copy of the personal information we hold about you
- Right to Correction: You can request that we correct inaccurate or incomplete information
- Right to Deletion: You can request deletion of your personal information (subject to certain legal requirements)
- Right to Restrict Processing: You can request that we limit how we use your information
- Right to Data Portability: You can request your information in a structured format
- Right to Opt-Out: You can opt out of marketing communications at any time
- Right to Withdraw Consent: You can withdraw previously given consent

To exercise any of these rights, please contact us at the email address provided below. We will respond to your request within 30 days or as required by applicable law.`,
    },
    {
        id: "7",
        title: "Children's Privacy",
        content: `Our website and services are not directed to children under 13 years of age. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child under 13, we will promptly delete such information and take appropriate steps to notify the parent or guardian.

If you believe we have collected information from a child under 13, please contact us immediately.`,
    },
    {
        id: "8",
        title: "Contact Us",
        content: `If you have questions about this privacy policy, your information, or our privacy practices, please contact us:

Shrestha Services
Biratnagar, Nepal
Email: privacy@shresthaservices.com
Phone: +977 9800000000

Data Protection Officer: dpo@shresthaservices.com

We will respond to all privacy inquiries within 30 days. If you believe we have violated your privacy rights, you may also file a complaint with your local data protection authority.`,
    },
];
export default function PrivacyPolicyPage() {
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
    return (_jsxs("div", { className: "min-h-screen bg-white dark:bg-slate-900", children: [_jsx("div", { className: "border-b border-slate-200 dark:border-slate-800", children: _jsx("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6", children: _jsxs(Link, { to: "/", className: "inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium", children: [_jsx(ArrowLeft, { className: "w-4 h-4" }), "Back to Home"] }) }) }), _jsxs("section", { className: "relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-16", children: [_jsx("div", { className: "absolute top-20 right-20 w-64 h-64 bg-blue-200 dark:bg-blue-900/30 rounded-full blur-3xl opacity-50" }), _jsx("div", { className: "absolute bottom-20 left-20 w-72 h-72 bg-indigo-200 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-40" }), _jsx("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, className: "max-w-3xl", children: [_jsx("h1", { className: "text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4", children: "Privacy Policy" }), _jsx("p", { className: "text-lg text-slate-600 dark:text-slate-300 mb-4", children: "Your privacy is important to us. This policy explains how we collect, use, and protect your information." }), _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: "Last updated: June 2024" })] }) })] }), _jsx("section", { className: "py-16", children: _jsx("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "grid lg:grid-cols-4 gap-8", children: [_jsx(motion.div, { variants: containerVariants, initial: "hidden", animate: "visible", className: "lg:col-span-1", children: _jsxs("div", { className: "sticky top-8 bg-slate-50 dark:bg-slate-800 rounded-2xl p-6", children: [_jsx("h3", { className: "font-semibold text-slate-900 dark:text-white mb-4", children: "Table of Contents" }), _jsx("nav", { className: "space-y-2", children: sections.map((section) => (_jsx(motion.button, { variants: itemVariants, onClick: () => setActiveSection(section.id), className: `w-full text-left px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium ${activeSection === section.id
                                                    ? "bg-blue-600 text-white"
                                                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"}`, children: section.title }, section.id))) })] }) }), _jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.6 }, className: "lg:col-span-3", children: sections.map((section) => (_jsx(motion.div, { initial: { opacity: 0 }, animate: {
                                        opacity: activeSection === section.id ? 1 : 0,
                                        display: activeSection === section.id ? "block" : "none",
                                    }, transition: { duration: 0.3 }, children: _jsxs("div", { className: "prose dark:prose-invert max-w-none", children: [_jsx("h2", { className: "text-3xl font-bold text-slate-900 dark:text-white mb-6", children: section.title }), _jsx("div", { className: "text-lg text-slate-700 dark:text-slate-300 leading-relaxed space-y-4", children: section.content.split("\n\n").map((paragraph, idx) => (_jsx("div", { children: paragraph.includes("-") ? (_jsx("div", { children: paragraph.split("\n").map((line, lineIdx) => {
                                                            if (line.startsWith("-")) {
                                                                return (_jsxs("div", { className: "flex gap-3 ml-4 mb-2", children: [_jsx("span", { className: "text-blue-600 dark:text-blue-400 font-bold", children: "\u2022" }), _jsx("span", { children: line.replace("- ", "") })] }, lineIdx));
                                                            }
                                                            return null;
                                                        }) })) : (_jsx("p", { children: paragraph })) }, idx))) })] }) }, section.id))) })] }) }) }), _jsx("section", { className: "py-16 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800", children: _jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 }, children: [_jsx("h2", { className: "text-2xl font-bold text-slate-900 dark:text-white mb-4", children: "Questions About Our Privacy Policy?" }), _jsx("p", { className: "text-slate-600 dark:text-slate-300 mb-8", children: "If you have any questions or concerns about how we handle your data, please get in touch with our privacy team." }), _jsx("a", { href: "mailto:privacy@shresthaservices.com", className: "inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors", children: "Contact Privacy Team" })] }) }) })] }));
}
