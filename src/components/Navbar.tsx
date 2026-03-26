import { useState, useEffect, useRef } from "react";
import { useScroll } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Sun, Moon, Globe, User, LogOut, Settings, LogIn } from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

import logo from "@/assets/logo.jpg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { totalItems: cartItems } = useCart();
  const { user, isAuthenticated, logout, googleLogin } = useAuth();
  const navigate = useNavigate();

  const location = useLocation();

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/shop", label: t("nav.shop") },
    { to: "/services", label: t("nav.services") },
    { to: "/books", label: t("nav.books") },
    { to: "/contact", label: t("nav.contact") },
    { to: "/about", label: t("nav.about") },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate("/");
  };

  const { scrollY } = useScroll();

  const toggleLanguage = () => {
    setLang(lang === "ar" ? "en" : "ar");
  };

  return (
    <motion.nav 
      className="navbar-premium navbar-scrolled fixed top-0 left-0 w-full z-[9999]"
      style={{ height: scrollY ? "60px" : "70px" }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-full flex items-center container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between w-full">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Nagham Arts" className="h-9 w-9 md:h-10 md:w-10 object-contain rounded-xl" />
            <span className="text-lg md:text-xl font-bold dark:text-foreground hidden md:block">
              {lang === "ar" ? "نغم للفنون" : "Nagham Arts"}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link px-4 py-2 text-base font-medium transition-all duration-300 ${
                  location.pathname === link.to
                    ? "nav-link-active text-primary bg-card/50 dark:bg-muted backdrop-blur-sm rounded-lg"
                    : "text-muted-foreground hover:text-primary hover:dark:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="p-2.5 rounded-xl hover:bg-accent dark:hover:bg-muted transition-all w-10 h-10 flex items-center justify-center"
              aria-label="Toggle language"
            >
              <Globe className="w-5 h-5" />
            </button>

            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl hover:bg-accent dark:hover:bg-muted transition-all w-10 h-10 flex items-center justify-center"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            <Link
              to="/cart"
              className="p-2.5 rounded-xl hover:bg-accent dark:hover:bg-muted relative transition-all w-10 h-10 flex items-center justify-center"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="p-2.5 rounded-xl hover:bg-accent dark:hover:bg-muted transition-all flex items-center gap-2 w-10 h-10 justify-center"
                  aria-label="User menu"
                >
                  <User className="w-5 h-5" />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-48 bg-card backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden"
                    >
                      <div className="p-4 border-b border-border/50">
                        <p className="font-semibold text-sm text-foreground">{user?.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{user?.email}</p>
                      </div>
                      <div className="p-1">
                        <Link
                          to="/profile"
                          className="flex items-center gap-3 px-4 py-3 text-sm rounded-xl hover:bg-muted transition-colors text-foreground"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Settings className="w-4 h-4 text-muted-foreground" />
                          {t("nav.settings")}
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm rounded-xl hover:bg-destructive/10 transition-colors text-destructive hover:text-destructive-foreground"
                        >
                          <LogOut className="w-4 h-4" />
                          {t("nav.logout")}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">

                <Link
                  to="/login"
                  className="px-6 py-2.5 rounded-[12px] flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white font-medium text-sm shadow-lg hover:shadow-[0_5px_15px_rgba(139,92,246,0.4)] hover:scale-105 transition-all duration-300"
                >
                  <LogIn className="w-4 h-4" />
                  {t("nav.login")}
                </Link>
              </div>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-3 rounded-xl hover:bg-accent dark:hover:bg-muted transition-all text-black dark:text-gray-200"
              aria-label="Toggle menu"
            >
              <svg className={`w-6 h-6 transition-all ${isOpen ? 'hamburger-open' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path className="hamburger-stroke line-1" d="M3 6h18"/>
                <path className="hamburger-stroke line-2" d="M3 12h18"/>
                <path className="hamburger-stroke line-3" d="M3 18h18"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="md:hidden fixed right-0 top-[var(--navbar-height)] h-[calc(100vh-var(--navbar-height))] w-80 bg-white dark:bg-gray-900/95 backdrop-blur-xl border-l border-black/20 dark:border-gray-700 shadow-2xl z-40 text-black dark:text-gray-200"
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            <div className="p-8 space-y-6">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block p-4 rounded-2xl text-xl font-semibold text-black dark:text-gray-200 hover:text-primary dark:hover:text-white hover:bg-black/10 dark:hover:bg-gray-800/50 transition-all duration-300 ${
                    location.pathname === link.to
                      ? "bg-primary/20 dark:bg-primary/20 text-primary font-bold shadow-md"
                      : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {!isAuthenticated && (
                <Link
                  to="/login"
                  className="w-full p-4 rounded-2xl flex items-center gap-4 bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 border-2 border-transparent hover:border-black/30 dark:hover:border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 justify-center font-semibold text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  <LogIn className="w-6 h-6" />
                  {t("nav.login")}
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
