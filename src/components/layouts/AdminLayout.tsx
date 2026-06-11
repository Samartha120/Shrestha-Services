import { type ReactNode, useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useSettingsStore } from "@/store/settingsStore";
import { useNotificationStore } from "@/store/notificationStore";
import { useTheme } from "@/providers/ThemeProvider";
import { LayoutDashboard, ChartBar as BarChart3, Users, Grid2x2 as Grid, FolderOpen, Image, MessageSquare, FileText, Mail, Bell, Settings, LogOut, Menu, Printer, ChevronDown, Sun, Moon, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface AdminLayoutProps {
  children?: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { user, logout, checkAuth } = useAuthStore();
  const { notifications, fetchNotifications, markAsRead } = useNotificationStore();
  const { fetchSettings } = useSettingsStore();
  const { isDark, setTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const themeMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchNotifications();
    fetchSettings();
  }, [fetchNotifications, fetchSettings]);

  const handleSelectTheme = async (mode: "light" | "dark") => {
    await setTheme(mode);
    setIsThemeMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(e.target as Node)) {
        setIsThemeMenuOpen(false);
      }
    };
    if (isThemeMenuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isThemeMenuOpen]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Analytics", path: "/admin/analytics", icon: BarChart3 },
    { name: "Users Management", path: "/admin/users", icon: Users },
    { name: "Services Catalog", path: "/admin/services", icon: Grid },
    { name: "Projects Showcase", path: "/admin/projects", icon: FolderOpen },
    { name: "Image Gallery", path: "/admin/gallery", icon: Image },
    { name: "Testimonials", path: "/admin/testimonials", icon: MessageSquare },
    { name: "Quote Requests", path: "/admin/quotes", icon: FileText },
    { name: "Inquiries Logs", path: "/admin/contacts", icon: Mail },
    { name: "Reports Export", path: "/admin/reports", icon: BarChart3 },
    { name: "System Settings", path: "/admin/settings", icon: Settings },
  ];

  const unreadNotifications = notifications.filter((n) => !n.read);

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
      
      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-200 dark:border-slate-800">
          <Link to="/" className="flex items-center gap-3 overflow-hidden">
            <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
              <Printer className="h-5 w-5 text-white" />
            </div>
            {isSidebarOpen && (
              <div className="flex flex-col">
                <span className="font-bold text-slate-900 dark:text-white text-base leading-none tracking-tight">Shrestha</span>
                <span className="text-[9px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">Services</span>
              </div>
            )}
          </Link>
        </div>

        {/* Sidebar Menu Items */}
        <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/10"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                }`}
                title={item.name}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {isSidebarOpen && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer profile details */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm font-medium text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 dark:hover:text-red-300 transition-all`}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {isSidebarOpen && <span>Logout Panel</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          isSidebarOpen ? "pl-64" : "pl-20"
        }`}
      >
        {/* Header Dashboard Nav */}
        <header className="h-20 border-b border-slate-200/80 bg-white dark:border-slate-900 dark:bg-slate-900 px-6 flex justify-between items-center sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-lg font-bold hidden sm:block tracking-tight text-slate-800 dark:text-slate-100">
              Admin Control Center
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <div className="relative" ref={themeMenuRef}>
              <button
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 transition-all text-slate-600 dark:text-slate-300 flex items-center justify-center cursor-pointer hover:border-slate-300 dark:hover:border-slate-600"
                aria-label="Theme options"
              >
                <Moon className={`h-[18px] w-[18px] transition-all ${isDark ? "text-indigo-400" : "text-slate-500"}`} />
              </button>

              <AnimatePresence>
                {isThemeMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                    className="absolute right-0 mt-2.5 w-[200px] rounded-xl theme-dropdown-glass p-1.5 z-50 flex flex-col gap-0.5 origin-top-right"
                  >
                    <div className="px-3 py-2 text-[10px] uppercase font-bold tracking-[0.12em] text-slate-400 dark:text-slate-500">
                      Appearance
                    </div>

                    <button
                      onClick={() => handleSelectTheme('light')}
                      className={`flex items-center justify-between w-full px-3 py-2.5 text-[13px] font-medium rounded-lg transition-all cursor-pointer ${
                        !isDark
                          ? "bg-indigo-50/80 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300"
                          : "text-slate-600 dark:text-slate-300 hover:bg-slate-100/60 dark:hover:bg-slate-800/50"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <Sun className="h-4 w-4 text-amber-500" />
                        Light
                      </span>
                      {!isDark && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.15 }}
                        >
                          <Check size={14} className="text-indigo-600 dark:text-indigo-400 stroke-[2.5]" />
                        </motion.div>
                      )}
                    </button>

                    <button
                      onClick={() => handleSelectTheme('dark')}
                      className={`flex items-center justify-between w-full px-3 py-2.5 text-[13px] font-medium rounded-lg transition-all cursor-pointer ${
                        isDark
                          ? "bg-indigo-50/80 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300"
                          : "text-slate-600 dark:text-slate-300 hover:bg-slate-100/60 dark:hover:bg-slate-800/50"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <Moon className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
                        Dark
                      </span>
                      {isDark && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.15 }}
                        >
                          <Check size={14} className="text-indigo-600 dark:text-indigo-400 stroke-[2.5]" />
                        </motion.div>
                      )}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* Notification alert Bell */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 relative transition-colors"
              >
                <Bell className="h-5 w-5 text-slate-600 dark:text-slate-300" />
                {unreadNotifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {unreadNotifications.length}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {isNotificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-3 w-80 rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-850 dark:bg-slate-900 p-2 overflow-hidden"
                  >
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                      <span className="font-bold text-sm">Notifications</span>
                      <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold cursor-pointer">Mark all read</span>
                    </div>

                    <div className="max-h-64 overflow-y-auto py-1">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-xs text-slate-400">No alerts</div>
                      ) : (
                        notifications.map((notif) => (
                          <div
                            key={notif.id}
                            onClick={() => markAsRead(notif.id)}
                            className={`p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer border-b border-slate-100/50 dark:border-slate-800/50 transition-colors ${
                              !notif.read ? "bg-blue-50/50 dark:bg-blue-950/20" : ""
                            }`}
                          >
                            <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{notif.title}</p>
                            <p className="text-[11px] text-slate-500 leading-tight mt-0.5">{notif.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile trigger */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="h-8 w-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-md">
                  {user?.name?.charAt(0) || "A"}
                </div>
                <ChevronDown className="h-4 w-4 text-slate-500" />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-3 w-52 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-xs font-semibold text-slate-400">Account Role</p>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">{user?.name || "Administrator"}</p>
                    </div>
                    <Link
                      to="/"
                      className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-xl text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 mt-1"
                    >
                      Back to Website
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 mt-1"
                    >
                      Logout Panel
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </header>

        {/* Admin Dashboard content container */}
        <main className="flex-1 p-6 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
