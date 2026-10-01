import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import RoleBasedRoute from "./RoleBasedRoute";

// Layouts (eager — present on every route)
import MainLayout from "@/components/layouts/MainLayout";
import AdminLayout from "@/components/layouts/AdminLayout";

// Public Pages (lazy-loaded for route-level code splitting)
const HomePage = lazy(() => import("@/pages/Home/HomePage"));
const AboutPage = lazy(() => import("@/pages/About/AboutPage"));
const ServicesPage = lazy(() => import("@/pages/Services/ServicesPage"));
const ServiceDetailsPage = lazy(() => import("@/pages/Services/ServiceDetailsPage"));
const GalleryPage = lazy(() => import("@/pages/Gallery/GalleryPage"));
const GalleryCategoryPage = lazy(() => import("@/pages/Gallery/GalleryCategoryPage"));
const ProjectsPage = lazy(() => import("@/pages/Projects/ProjectsPage"));
const ProjectDetailsPage = lazy(() => import("@/pages/Projects/ProjectDetailsPage"));
const TestimonialsPage = lazy(() => import("@/pages/Testimonials/TestimonialsPage"));
const ContactPage = lazy(() => import("@/pages/Contact/ContactPage"));
const QuotePage = lazy(() => import("@/pages/Quote/QuotePage"));
const QuoteSuccessPage = lazy(() => import("@/pages/Quote/QuoteSuccessPage"));
const FAQPage = lazy(() => import("@/pages/FAQ/FAQPage"));
const BlogPage = lazy(() => import("@/pages/Blog/BlogPage"));
const BlogDetailsPage = lazy(() => import("@/pages/Blog/BlogDetailsPage"));
const CareersPage = lazy(() => import("@/pages/Careers/CareersPage"));
const PrivacyPolicyPage = lazy(() => import("@/pages/Privacy/PrivacyPolicyPage"));
const TermsConditionsPage = lazy(() => import("@/pages/Terms/TermsAndConditionsPage"));
const SitemapPage = lazy(() => import("@/pages/Sitemap/SitemapPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFound/NotFoundPage"));

// Authentication Pages
const LoginPage = lazy(() => import("@/pages/Auth/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/Auth/RegisterPage"));
const VerifyOtpPage = lazy(() => import("@/pages/Auth/VerifyOtpPage"));
const ForgotPasswordPage = lazy(() => import("@/pages/Auth/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("@/pages/Auth/ResetPasswordPage"));

// Admin Auth Page
const AdminLoginPage = lazy(() => import("@/pages/Admin/Auth/LoginPage"));

// Customer Portal Pages
const CustomerDashboard = lazy(() => import("@/pages/Customer/CustomerDashboard"));
const CustomerQuotes = lazy(() => import("@/pages/Customer/CustomerQuotes"));
const CustomerOrders = lazy(() => import("@/pages/Customer/CustomerOrders"));
const CustomerProfile = lazy(() => import("@/pages/Customer/CustomerProfile"));
const CustomerFiles = lazy(() => import("@/pages/Customer/CustomerFiles"));

// Admin Panel Pages
const AdminDashboard = lazy(() => import("@/pages/Admin/AdminDashboard"));
const AdminAnalytics = lazy(() => import("@/pages/Admin/AdminAnalytics"));
const AdminUsers = lazy(() => import("@/pages/Admin/AdminUsers"));
const AdminServices = lazy(() => import("@/pages/Admin/AdminServices"));
const AdminProjects = lazy(() => import("@/pages/Admin/AdminProjects"));
const AdminGallery = lazy(() => import("@/pages/Admin/AdminGallery"));
const AdminTestimonials = lazy(() => import("@/pages/Admin/AdminTestimonials"));
const AdminQuotes = lazy(() => import("@/pages/Admin/AdminQuotes"));
const AdminInquiries = lazy(() => import("@/pages/Admin/AdminInquiries"));
const AdminBlog = lazy(() => import("@/pages/Admin/AdminBlog"));
const AdminReports = lazy(() => import("@/pages/Admin/AdminReports"));
const AdminSettings = lazy(() => import("@/pages/Admin/AdminSettings"));

function RouteFallback() {
  return (
    <div
      className="flex min-h-[60vh] items-center justify-center bg-paper"
      role="status"
      aria-label="Loading page"
    >
      <span className="h-8 w-8 rounded-full border-2 border-line border-t-accent motion-safe:animate-spin" />
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
      {/* Guest-only Auth Routes */}
      <Route element={<PublicRoute />}>
        {/* Customer Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
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
            element={<Navigate to="/my-dashboard" replace />}
          />
          <Route
            path="/my-dashboard"
            element={
              <MainLayout>
                <CustomerDashboard />
              </MainLayout>
            }
          />
          <Route
            path="/my-dashboard/quotes"
            element={
              <MainLayout>
                <CustomerQuotes />
              </MainLayout>
            }
          />
          <Route
            path="/my-dashboard/orders"
            element={
              <MainLayout>
                <CustomerOrders />
              </MainLayout>
            }
          />
          <Route
            path="/my-dashboard/profile"
            element={
              <MainLayout>
                <CustomerProfile />
              </MainLayout>
            }
          />
          <Route
            path="/my-dashboard/files"
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
            path="/admin/blog"
            element={
              <AdminLayout>
                <AdminBlog />
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
    </Suspense>
  );
}
