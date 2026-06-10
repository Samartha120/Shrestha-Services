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
  return (
    <Routes>
      {/* Guest-only Auth Routes */}
      <Route element={<PublicRoute />}>
        {/* Customer Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        
        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
      </Route>

      {/* Public Site Routes - Wrapped in MainLayout */}
      <Route
        path="/"
        element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        }
      />
      <Route
        path="/about"
        element={
          <MainLayout>
            <AboutPage />
          </MainLayout>
        }
      />
      <Route
        path="/services"
        element={
          <MainLayout>
            <ServicesPage />
          </MainLayout>
        }
      />
      <Route
        path="/services/:slug"
        element={
          <MainLayout>
            <ServiceDetailsPage />
          </MainLayout>
        }
      />
      <Route
        path="/gallery"
        element={
          <MainLayout>
            <GalleryPage />
          </MainLayout>
        }
      />
      <Route
        path="/gallery/:category"
        element={
          <MainLayout>
            <GalleryCategoryPage />
          </MainLayout>
        }
      />
      <Route
        path="/projects"
        element={
          <MainLayout>
            <ProjectsPage />
          </MainLayout>
        }
      />
      <Route
        path="/projects/:slug"
        element={
          <MainLayout>
            <ProjectDetailsPage />
          </MainLayout>
        }
      />
      <Route
        path="/testimonials"
        element={
          <MainLayout>
            <TestimonialsPage />
          </MainLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <MainLayout>
            <ContactPage />
          </MainLayout>
        }
      />
      <Route
        path="/quote"
        element={
          <MainLayout>
            <QuotePage />
          </MainLayout>
        }
      />
      <Route
        path="/quote/success"
        element={
          <MainLayout>
            <QuoteSuccessPage />
          </MainLayout>
        }
      />
      <Route
        path="/faq"
        element={
          <MainLayout>
            <FAQPage />
          </MainLayout>
        }
      />
      <Route
        path="/blog"
        element={
          <MainLayout>
            <BlogPage />
          </MainLayout>
        }
      />
      <Route
        path="/blog/:slug"
        element={
          <MainLayout>
            <BlogDetailsPage />
          </MainLayout>
        }
      />
      <Route
        path="/careers"
        element={
          <MainLayout>
            <CareersPage />
          </MainLayout>
        }
      />
      <Route
        path="/privacy"
        element={
          <MainLayout>
            <PrivacyPolicyPage />
          </MainLayout>
        }
      />
      <Route
        path="/terms"
        element={
          <MainLayout>
            <TermsConditionsPage />
          </MainLayout>
        }
      />
      <Route
        path="/sitemap"
        element={
          <MainLayout>
            <SitemapPage />
          </MainLayout>
        }
      />

      {/* Protected Customer Routes - Requires Customer or Admin Role */}
      <Route element={<ProtectedRoute />}>
        <Route element={<RoleBasedRoute allowedRoles={["customer", "admin"]} />}>
          <Route
            path="/dashboard"
            element={
              <MainLayout>
                <CustomerDashboard />
              </MainLayout>
            }
          />
          <Route
            path="/dashboard/quotes"
            element={
              <MainLayout>
                <CustomerQuotes />
              </MainLayout>
            }
          />
          <Route
            path="/dashboard/orders"
            element={
              <MainLayout>
                <CustomerOrders />
              </MainLayout>
            }
          />
          <Route
            path="/dashboard/profile"
            element={
              <MainLayout>
                <CustomerProfile />
              </MainLayout>
            }
          />
          <Route
            path="/dashboard/files"
            element={
              <MainLayout>
                <CustomerFiles />
              </MainLayout>
            }
          />
        </Route>

        {/* Protected Admin Routes - Requires Admin Role */}
        <Route element={<RoleBasedRoute allowedRoles={["admin"]} />}>
          <Route
            path="/admin"
            element={<Navigate to="/admin/dashboard" replace />}
          />
          <Route
            path="/admin/dashboard"
            element={
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/analytics"
            element={
              <AdminLayout>
                <AdminAnalytics />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminLayout>
                <AdminUsers />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/services"
            element={
              <AdminLayout>
                <AdminServices />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/projects"
            element={
              <AdminLayout>
                <AdminProjects />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/gallery"
            element={
              <AdminLayout>
                <AdminGallery />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/testimonials"
            element={
              <AdminLayout>
                <AdminTestimonials />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/quotes"
            element={
              <AdminLayout>
                <AdminQuotes />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/contacts"
            element={
              <AdminLayout>
                <AdminInquiries />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/reports"
            element={
              <AdminLayout>
                <AdminReports />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <AdminLayout>
                <AdminSettings />
              </AdminLayout>
            }
          />
        </Route>
      </Route>

      {/* 404 Route */}
      <Route
        path="*"
        element={
          <MainLayout>
            <NotFoundPage />
          </MainLayout>
        }
      />
    </Routes>
  );
}
