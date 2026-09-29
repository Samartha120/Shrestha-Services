import { type ReactNode, useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useSettingsStore } from "@/store/settingsStore";
import { useTheme } from "@/providers/ThemeProvider";
import {
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Sun,
  Moon,
  Check,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Toaster } from "sonner";

export interface MainLayoutProps {
  children?: ReactNode;
}

const navLinks = [
  { name: "Services", path: "/services" },
  { name: "Gallery", path: "/gallery" },
  { name: "Projects", path: "/projects" },
  { name: "Testimonials", path: "/testimonials" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const footerCols = [
  {
    heading: "Services",
    links: [
      { label: "Large-format flex", to: "/services" },
      { label: "Acrylic sign boards", to: "/services" },
      { label: "Vehicle wraps", to: "/services" },
      { label: "Digital & offset print", to: "/services" },
      { label: "Roll-up stands", to: "/services" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About the shop", to: "/about" },
      { label: "Portfolio", to: "/gallery" },
      { label: "Reviews", to: "/testimonials" },
      { label: "FAQ", to: "/faq" },
      { label: "Careers", to: "/careers" },
    ],
  },
];
/* __APPEND_1__ */

export default function MainLayout({ children }: MainLayoutProps) {
  const { user, isAuthenticated, logout, checkAuth } = useAuthStore();
  const { fetchSettings } = useSettingsStore();
  const { isDark, setTheme } = useTheme();
  const reduce = useReducedMotion();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const themeMenuRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(e.target as Node))
        setIsThemeMenuOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node))
        setIsProfileOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  const handleSelectTheme = async (mode: "light" | "dark") => {
    await setTheme(mode);
    setIsThemeMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;
/* __APPEND_2__ */

  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <Toaster position="top-right" theme={isDark ? "dark" : "light"} />

      {/* Utility bar */}
      <div className="hidden bg-ink text-inverse/70 lg:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-2 text-xs">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-accent" /> +977-21-441234
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-accent" /> info@shresthaservices.com.np
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-accent" /> Main Road, Biratnagar
            </span>
          </div>
          <span>Sun–Fri · 9:30 AM – 7:00 PM</span>
        </div>
      </div>

      {/* Header */}
      <header
        className={`sticky top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "border-b border-line bg-paper/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-6 px-5 py-3 sm:px-8">
          {/* Wordmark */}
          <Link to="/" className="group flex flex-col leading-none">
            <span className="font-display text-2xl font-semibold tracking-tight text-ink">
              Shrestha
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted">
              Services
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative py-1 text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? "text-ink"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-accent"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right controls */}
          <div className="hidden items-center gap-3 lg:flex">
            <div className="relative" ref={themeMenuRef}>
              <button
                onClick={() => setIsThemeMenuOpen((v) => !v)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-line-strong hover:text-ink"
                aria-label="Appearance"
              >
                {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </button>
              <AnimatePresence>
                {isThemeMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.16 }}
                    className="theme-dropdown-glass absolute right-0 mt-2 flex w-44 flex-col gap-0.5 rounded-xl p-1.5"
                  >
                    <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
                      Appearance
                    </p>
                    {(["light", "dark"] as const).map((mode) => {
                      const active = mode === "dark" ? isDark : !isDark;
                      const Icon = mode === "light" ? Sun : Moon;
                      return (
                        <button
                          key={mode}
                          onClick={() => handleSelectTheme(mode)}
                          className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm capitalize transition-colors ${
                            active
                              ? "bg-accent-soft text-accent"
                              : "text-ink-soft hover:bg-paper-dim"
                          }`}
                        >
                          <span className="flex items-center gap-2.5">
                            <Icon className="h-4 w-4" /> {mode}
                          </span>
                          {active && <Check className="h-3.5 w-3.5" strokeWidth={2.5} />}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {isAuthenticated && user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen((v) => !v)}
                  className="flex items-center gap-2 rounded-full border border-line py-1 pl-1 pr-2.5 transition-colors hover:border-line-strong"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-xs font-semibold text-inverse">
                    {user.name.charAt(0)}
                  </span>
                  <ChevronDown className="h-4 w-4 text-muted" />
                </button>
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.16 }}
                      className="theme-dropdown-glass absolute right-0 mt-2 w-56 rounded-xl p-1.5"
                    >
                      <div className="border-b border-line px-3 py-2">
                        <p className="text-xs text-muted">Signed in as</p>
                        <p className="truncate text-sm font-semibold text-ink">
                          {user.name}
                        </p>
                      </div>
                      <Link
                        to={user.role === "admin" ? "/admin/dashboard" : "/dashboard"}
                        className="mt-1 flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-ink-soft transition-colors hover:bg-paper-dim"
                      >
                        <User className="h-4 w-4" />
                        {user.role === "admin" ? "Admin panel" : "My dashboard"}
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-err transition-colors hover:bg-accent-soft"
                      >
                        <LogOut className="h-4 w-4" /> Log out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
              >
                Login
              </Link>
            )}

            <Link
              to="/quote"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-inverse transition-colors hover:bg-accent"
            >
              Get a quote
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink lg:hidden"
            aria-label="Menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.nav
              initial={reduce ? {} : { x: "100%" }}
              animate={reduce ? {} : { x: 0 }}
              exit={reduce ? {} : { x: "100%" }}
              transition={{ type: "tween", duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col bg-paper px-6 pb-8 pt-6"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-xl font-semibold text-ink">
                  Menu
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-8 flex flex-col">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`border-b border-line py-3.5 font-display text-2xl transition-colors ${
                      isActive(link.path) ? "text-accent" : "text-ink hover:text-accent"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="mt-auto flex flex-col gap-4 pt-8">
                <button
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                  className="flex items-center gap-2.5 text-sm font-medium text-ink-soft"
                >
                  {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  {isDark ? "Light mode" : "Dark mode"}
                </button>

                {isAuthenticated && user ? (
                  <>
                    <Link
                      to={user.role === "admin" ? "/admin/dashboard" : "/dashboard"}
                      className="flex items-center gap-2.5 text-sm font-medium text-ink"
                    >
                      <User className="h-4 w-4" />
                      {user.role === "admin" ? "Admin panel" : "My dashboard"}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2.5 text-sm font-medium text-err"
                    >
                      <LogOut className="h-4 w-4" /> Log out
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="text-sm font-medium text-ink"
                  >
                    Login
                  </Link>
                )}

                <Link
                  to="/quote"
                  className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-inverse"
                >
                  Get a quote
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={reduce ? {} : { opacity: 0, y: 8 }}
            animate={reduce ? {} : { opacity: 1, y: 0 }}
            exit={reduce ? {} : { opacity: 0 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      {/* Footer */}
      <footer className="border-t border-line bg-paper-dim">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
            {/* Brand */}
            <div>
              <Link to="/" className="flex flex-col leading-none">
                <span className="font-display text-2xl font-semibold tracking-tight text-ink">
                  Shrestha
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted">
                  Services
                </span>
              </Link>
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-soft text-pretty">
                A working print &amp; signage shop on Main Road, Biratnagar.
                Flex, acrylic, vinyl and vehicle wraps — designed, printed and
                installed in-house.
              </p>
            </div>

            {footerCols.map((col) => (
              <div key={col.heading}>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  {col.heading}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        className="text-sm text-ink-soft transition-colors hover:text-accent"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Find us */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                Find us
              </p>
              <ul className="mt-4 space-y-3 text-sm text-ink-soft">
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  Main Road, Biratnagar, Nepal
                </li>
                <li>
                  <a
                    href="tel:+97721441234"
                    className="flex items-center gap-2.5 transition-colors hover:text-accent"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-accent" />
                    +977-21-441234
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@shresthaservices.com.np"
                    className="flex items-center gap-2.5 transition-colors hover:text-accent"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-accent" />
                    info@shresthaservices.com.np
                  </a>
                </li>
                <li className="pt-1 text-muted">Sun–Fri · 9:30 AM – 7:00 PM</li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Shrestha Services. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="transition-colors hover:text-ink">
                Privacy
              </Link>
              <Link to="/terms" className="transition-colors hover:text-ink">
                Terms
              </Link>
              <Link to="/faq" className="transition-colors hover:text-ink">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}


