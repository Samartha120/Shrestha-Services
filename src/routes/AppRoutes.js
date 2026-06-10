import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import RoleBasedRoute from "./RoleBasedRoute";
// Layouts
import MainLayout from "@/components/layouts/MainLayout";
import AdminLayout from "@/components/layouts/AdminLayout";
// Public Pages
import HomePage from "@/pages/Home/HomePage";
import AboutPage from "@/pages/About/AboutPage";
import ServicesPage from "@/pages/Services/ServicesPage";
import ServiceDetailsPage from "@/pages/Services/ServiceDetailsPage";
import GalleryPage from "@/pages/Gallery/GalleryPage";
import GalleryCategoryPage from "@/pages/Gallery/GalleryCategoryPage";
import ProjectsPage from "@/pages/Projects/ProjectsPage";
import ProjectDetailsPage from "@/pages/Projects/ProjectDetailsPage";
import TestimonialsPage from "@/pages/Testimonials/TestimonialsPage";
import ContactPage from "@/pages/Contact/ContactPage";
import QuotePage from "@/pages/Quote/QuotePage";
import QuoteSuccessPage from "@/pages/Quote/QuoteSuccessPage";
import FAQPage from "@/pages/FAQ/FAQPage";
import BlogPage from "@/pages/Blog/BlogPage";
import BlogDetailsPage from "@/pages/Blog/BlogDetailsPage";
import CareersPage from "@/pages/Careers/CareersPage";
import PrivacyPolicyPage from "@/pages/Privacy/PrivacyPolicyPage";
import TermsConditionsPage from "@/pages/Terms/TermsAndConditionsPage";
import SitemapPage from "@/pages/Sitemap/SitemapPage";
import NotFoundPage from "@/pages/NotFound/NotFoundPage";
// Authentication Pages
import LoginPage from "@/pages/Auth/LoginPage";
import RegisterPage from "@/pages/Auth/RegisterPage";
import ForgotPasswordPage from "@/pages/Auth/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/Auth/ResetPasswordPage";
// Admin Auth Page
import AdminLoginPage from "@/pages/Admin/Auth/LoginPage";
// Customer Portal Pages
import CustomerDashboard from "@/pages/Customer/CustomerDashboard";
import CustomerQuotes from "@/pages/Customer/CustomerQuotes";
import CustomerOrders from "@/pages/Customer/CustomerOrders";
import CustomerProfile from "@/pages/Customer/CustomerProfile";
import CustomerFiles from "@/pages/Customer/CustomerFiles";
// Admin Panel Pages
import AdminDashboard from "@/pages/Admin/AdminDashboard";
import AdminAnalytics from "@/pages/Admin/AdminAnalytics";
import AdminUsers from "@/pages/Admin/AdminUsers";
import AdminServices from "@/pages/Admin/AdminServices";
import AdminProjects from "@/pages/Admin/AdminProjects";
import AdminGallery from "@/pages/Admin/AdminGallery";
import AdminTestimonials from "@/pages/Admin/AdminTestimonials";
import AdminQuotes from "@/pages/Admin/AdminQuotes";
import AdminInquiries from "@/pages/Admin/AdminInquiries";
import AdminReports from "@/pages/Admin/AdminReports";
import AdminSettings from "@/pages/Admin/AdminSettings";
export default function AppRoutes() {
    return (_jsxs(Routes, { children: [_jsxs(Route, { element: _jsx(PublicRoute, {}), children: [_jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "/register", element: _jsx(RegisterPage, {}) }), _jsx(Route, { path: "/forgot-password", element: _jsx(ForgotPasswordPage, {}) }), _jsx(Route, { path: "/reset-password", element: _jsx(ResetPasswordPage, {}) }), _jsx(Route, { path: "/admin/login", element: _jsx(AdminLoginPage, {}) })] }), _jsx(Route, { path: "/", element: _jsx(MainLayout, { children: _jsx(HomePage, {}) }) }), _jsx(Route, { path: "/about", element: _jsx(MainLayout, { children: _jsx(AboutPage, {}) }) }), _jsx(Route, { path: "/services", element: _jsx(MainLayout, { children: _jsx(ServicesPage, {}) }) }), _jsx(Route, { path: "/services/:slug", element: _jsx(MainLayout, { children: _jsx(ServiceDetailsPage, {}) }) }), _jsx(Route, { path: "/gallery", element: _jsx(MainLayout, { children: _jsx(GalleryPage, {}) }) }), _jsx(Route, { path: "/gallery/:category", element: _jsx(MainLayout, { children: _jsx(GalleryCategoryPage, {}) }) }), _jsx(Route, { path: "/projects", element: _jsx(MainLayout, { children: _jsx(ProjectsPage, {}) }) }), _jsx(Route, { path: "/projects/:slug", element: _jsx(MainLayout, { children: _jsx(ProjectDetailsPage, {}) }) }), _jsx(Route, { path: "/testimonials", element: _jsx(MainLayout, { children: _jsx(TestimonialsPage, {}) }) }), _jsx(Route, { path: "/contact", element: _jsx(MainLayout, { children: _jsx(ContactPage, {}) }) }), _jsx(Route, { path: "/quote", element: _jsx(MainLayout, { children: _jsx(QuotePage, {}) }) }), _jsx(Route, { path: "/quote/success", element: _jsx(MainLayout, { children: _jsx(QuoteSuccessPage, {}) }) }), _jsx(Route, { path: "/faq", element: _jsx(MainLayout, { children: _jsx(FAQPage, {}) }) }), _jsx(Route, { path: "/blog", element: _jsx(MainLayout, { children: _jsx(BlogPage, {}) }) }), _jsx(Route, { path: "/blog/:slug", element: _jsx(MainLayout, { children: _jsx(BlogDetailsPage, {}) }) }), _jsx(Route, { path: "/careers", element: _jsx(MainLayout, { children: _jsx(CareersPage, {}) }) }), _jsx(Route, { path: "/privacy", element: _jsx(MainLayout, { children: _jsx(PrivacyPolicyPage, {}) }) }), _jsx(Route, { path: "/terms", element: _jsx(MainLayout, { children: _jsx(TermsConditionsPage, {}) }) }), _jsx(Route, { path: "/sitemap", element: _jsx(MainLayout, { children: _jsx(SitemapPage, {}) }) }), _jsxs(Route, { element: _jsx(ProtectedRoute, {}), children: [_jsxs(Route, { element: _jsx(RoleBasedRoute, { allowedRoles: ["customer", "admin"] }), children: [_jsx(Route, { path: "/dashboard", element: _jsx(MainLayout, { children: _jsx(CustomerDashboard, {}) }) }), _jsx(Route, { path: "/dashboard/quotes", element: _jsx(MainLayout, { children: _jsx(CustomerQuotes, {}) }) }), _jsx(Route, { path: "/dashboard/orders", element: _jsx(MainLayout, { children: _jsx(CustomerOrders, {}) }) }), _jsx(Route, { path: "/dashboard/profile", element: _jsx(MainLayout, { children: _jsx(CustomerProfile, {}) }) }), _jsx(Route, { path: "/dashboard/files", element: _jsx(MainLayout, { children: _jsx(CustomerFiles, {}) }) })] }), _jsxs(Route, { element: _jsx(RoleBasedRoute, { allowedRoles: ["admin"] }), children: [_jsx(Route, { path: "/admin", element: _jsx(Navigate, { to: "/admin/dashboard", replace: true }) }), _jsx(Route, { path: "/admin/dashboard", element: _jsx(AdminLayout, { children: _jsx(AdminDashboard, {}) }) }), _jsx(Route, { path: "/admin/analytics", element: _jsx(AdminLayout, { children: _jsx(AdminAnalytics, {}) }) }), _jsx(Route, { path: "/admin/users", element: _jsx(AdminLayout, { children: _jsx(AdminUsers, {}) }) }), _jsx(Route, { path: "/admin/services", element: _jsx(AdminLayout, { children: _jsx(AdminServices, {}) }) }), _jsx(Route, { path: "/admin/projects", element: _jsx(AdminLayout, { children: _jsx(AdminProjects, {}) }) }), _jsx(Route, { path: "/admin/gallery", element: _jsx(AdminLayout, { children: _jsx(AdminGallery, {}) }) }), _jsx(Route, { path: "/admin/testimonials", element: _jsx(AdminLayout, { children: _jsx(AdminTestimonials, {}) }) }), _jsx(Route, { path: "/admin/quotes", element: _jsx(AdminLayout, { children: _jsx(AdminQuotes, {}) }) }), _jsx(Route, { path: "/admin/contacts", element: _jsx(AdminLayout, { children: _jsx(AdminInquiries, {}) }) }), _jsx(Route, { path: "/admin/reports", element: _jsx(AdminLayout, { children: _jsx(AdminReports, {}) }) }), _jsx(Route, { path: "/admin/settings", element: _jsx(AdminLayout, { children: _jsx(AdminSettings, {}) }) })] })] }), _jsx(Route, { path: "*", element: _jsx(MainLayout, { children: _jsx(NotFoundPage, {}) }) })] }));
}
