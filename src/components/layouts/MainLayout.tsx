import { type ReactNode, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useSettingsStore } from "@/store/settingsStore";
import { Menu, X, User, LogOut, ChevronDown, Phone, Mail, MapPin, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "sonner";

export interface MainLayoutProps {
  children?: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { user, isAuthenticated, logout, checkAuth } = useAuthStore();
  const { settings, updateSettings, fetchSettings } = useSettingsStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const toggleTheme = async () => {
    if (settings) {
      await updateSettings({ ...settings, darkMode: !settings.darkMode });
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Gallery", path: "/gallery" },
    { name: "Projects", path: "/projects" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
      <Toaster position="top-right" richColors />
      
      {/* Top Banner Contact Details */}
      <div className="hidden lg:block bg-slate-900 text-slate-300 text-xs py-2 px-6 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-blue-500" /> +977-1-4412345</span>
            <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5 text-blue-500" /> info@shresthaservices.com.np</span>
            <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-blue-500" /> Main Road, Biratnagar</span>
          </div>
          <div>
            <span>Opening Hours: 9:30 AM - 7:00 PM (Sun-Fri)</span>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 dark:border-slate-900 bg-white/80 dark:bg-slate-950/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 dark:from-white dark:via-blue-400 dark:to-indigo-300 bg-clip-text text-transparent">
                Shrestha
              </span>
              <span className="block text-[9px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-semibold -mt-1">
                Services
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-all hover:text-blue-600 dark:hover:text-blue-400 relative py-1 ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-slate-600 dark:text-slate-300"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activePublicNav"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTAs and Profile dropdown */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              aria-label="Toggle theme"
            >
              {settings?.darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <Link
              to="/quote"
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 transition-all"
            >
              Get Free Quote
            </Link>

            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
                >
                  <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 flex items-center justify-center font-semibold text-sm">
                    {user.name.charAt(0)}
                  </div>
                  <ChevronDown className="h-4 w-4 text-slate-500" />
                </button>

                <AnimatePresence>
                  {isProfileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900"
                    >
                      <div className="px-3 py-2.5 border-b border-slate-100 dark:border-slate-800">
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Signed in as</p>
                        <p className="text-sm font-bold truncate text-slate-800 dark:text-slate-200">{user.name}</p>
                      </div>
                      
                      <Link
                        to={user.role === "admin" ? "/admin/dashboard" : "/dashboard"}
                        className="flex items-center gap-2.5 px-3 py-2 mt-1 text-sm font-medium rounded-xl text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
                      >
                        <User className="h-4 w-4 text-slate-500" />
                        {user.role === "admin" ? "Admin Panel" : "Customer Portal"}
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2 mt-1 text-sm font-medium rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                      >
                        <LogOut className="h-4 w-4 text-red-500" />
                        Log Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="text-sm font-semibold text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 px-4 py-2"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="border border-slate-200 hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-900 text-sm font-semibold px-4 py-2 rounded-xl transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-b border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-950 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2.5">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-3 py-2 text-base font-semibold rounded-xl transition-all ${
                    location.pathname === link.path
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-4 border-t border-slate-100 dark:border-slate-900 space-y-2">
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                >
                  {settings?.darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  <span className="font-semibold text-sm">
                    {settings?.darkMode ? "Light Mode" : "Dark Mode"}
                  </span>
                </button>
                <Link
                  to="/quote"
                  className="block w-full text-center bg-blue-600 text-white px-4 py-2.5 rounded-xl font-semibold text-sm shadow-md"
                >
                  Get Free Quote
                </Link>

                {isAuthenticated && user ? (
                  <>
                    <Link
                      to={user.role === "admin" ? "/admin/dashboard" : "/dashboard"}
                      className="block w-full text-center border border-slate-200 dark:border-slate-800 px-4 py-2.5 rounded-xl font-semibold text-sm"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-center text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-950/40 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all"
                    >
                      Log Out
                    </button>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <Link
                      to="/login"
                      className="text-center text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 px-4 py-2.5 rounded-xl font-semibold text-sm border border-slate-200 dark:border-slate-800"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="text-center bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-4 py-2.5 rounded-xl font-semibold text-sm hover:opacity-90"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Page Content Wrapper with Transitions */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="w-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Professional Footer */}
      <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Intro */}
          <div>
            <div className="mb-4">
              <span className="text-lg font-bold text-white tracking-tight">
                Shrestha Services
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Biratnagar's leading digital printing, signage manufacturing, and corporate advertising wrap solutions agency. Bringing your designs to life on premium materials.
            </p>
            <div className="flex gap-4">
              {/* Mock Social Media icons */}
              <a href="#" className="h-9 w-9 rounded-lg bg-slate-800 hover:bg-blue-600 flex items-center justify-center hover:text-white transition-colors"><Phone className="h-4 w-4" /></a>
              <a href="#" className="h-9 w-9 rounded-lg bg-slate-800 hover:bg-blue-600 flex items-center justify-center hover:text-white transition-colors"><Mail className="h-4 w-4" /></a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Our Services</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/services" className="hover:text-white transition-colors">Flex Banner Printing</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Acrylic Sign Boards</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Frosted & Glow Stickers</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Vehicle Wrap Decals</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Roll-up Pull Stands</Link></li>
            </ul>
          </div>

          {/* Column 3: Corporate Info */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">Our Machinery & Team</Link></li>
              <li><Link to="/gallery" className="hover:text-white transition-colors">Work Showcase Portfolio</Link></li>
              <li><Link to="/testimonials" className="hover:text-white transition-colors font-medium text-blue-400">Reviews & Ratings</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ & Print Guidelines</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Branding Blog Hub</Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors">We are Hiring (Careers)</Link></li>
            </ul>
          </div>

          {/* Column 4: Address Info */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Find Us</h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex gap-2.5">
                <MapPin className="h-5 w-5 text-blue-500 shrink-0" />
                <span className="text-slate-400">Main Road, Biratnagar, Nepal</span>
              </li>
              <li className="flex gap-2.5">
                <Phone className="h-5 w-5 text-blue-500 shrink-0" />
                <span className="text-slate-400">+977-1-4412345, +977 9851012345</span>
              </li>
              <li className="flex gap-2.5">
                <Mail className="h-5 w-5 text-blue-500 shrink-0" />
                <span className="text-slate-400">info@shresthaservices.com.np</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Shrestha Services Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-slate-300">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-slate-300">Terms of Conditions</Link>
            <Link to="/sitemap" className="hover:text-slate-300">Sitemap</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
