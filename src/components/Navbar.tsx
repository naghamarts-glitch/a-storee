import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ShoppingCart, Sun, Moon, Globe, User, LogIn, Settings, LogOut, Home, ShoppingBag, BookOpen, Phone, Info } from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

import logo from "@/assets/logo.jpg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const { lang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { totalItems: cartItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuLinks = [
    { to: "/", label: t("nav.home") || "Home", icon: Home },
    { to: "/shop", label: t("nav.shop") || "Shop", icon: ShoppingBag },
    { to: "/services", label: t("nav.services") || "Services", icon: Settings },
    { to: "/books", label: t("nav.books") || "Books", icon: BookOpen },
    { to: "/contact", label: t("nav.contact") || "Contact", icon: Phone },
    { to: "/about", label: t("nav.about") || "About", icon: Info },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate("/");
  };

  const closeMenu = () => setIsOpen(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } },
  };

  const iconVariants = {
    hover: { scale: 1.05, y: -1 },
    tap: { scale: 0.95 },
  };

  return (
    <>
      {/* Main Navbar */}
      <motion.nav 
        className={`fixed top-0 left-0 w-full z-50 backdrop-blur-xl transition-all duration-300 ${
          scrolled 
            ? "h-14 px-4 shadow-sm bg-white/90 dark:bg-slate-900/90 border-b border-slate-200/60 dark:border-slate-800/60" 
            : "h-16 px-6 bg-white/80 dark:bg-slate-900/80 border-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
      >
        <div className="h-full flex items-center justify-between max-w-7xl mx-auto">
          {/* Mobile: Left Menu Button */}
          <motion.button
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-full bg-slate-100/70 hover:bg-slate-200/80 dark:bg-slate-800/70 dark:hover:bg-slate-700/80 transition-all duration-200 shadow-sm hover:shadow-md backdrop-blur-sm"
            variants={iconVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="w-5.5 h-5.5" strokeWidth={2.5} />
          </motion.button>

          {/* Logo: Center mobile, left desktop */}
          <Link 
            to="/" 
            className="mx-auto md:ml-0 flex-shrink-0"
            aria-label="Home"
          >
            <motion.img 
              src={logo} 
              alt="Nagham Arts" 
              className="h-10 w-28 md:w-32 object-contain rounded-2xl shadow-lg ring-1 ring-slate-200/60 dark:ring-slate-700/60 hover:ring-slate-300/70 transition-all duration-200 cursor-pointer" 
              whileHover={{ scale: 1.02, rotate: 1 }}
              transition={{ duration: 0.2 }}
            />
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-1.5">
            {/* Language Toggle */}
            <motion.button
              className="p-2.5 rounded-xl bg-slate-100/50 hover:bg-slate-200/70 dark:bg-slate-800/50 dark:hover:bg-slate-700/70 transition-all duration-200 shadow-sm hover:shadow-md backdrop-blur-sm"
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => {/* toggleLanguage */ }}
              title="Language"
              aria-label="Toggle language"
            >
              <Globe className="w-4.5 h-4.5" strokeWidth={2} />
            </motion.button>

            {/* Theme Toggle */}
            <motion.button
              className="p-2.5 rounded-xl bg-slate-100/50 hover:bg-slate-200/70 dark:bg-slate-800/50 dark:hover:bg-slate-700/70 transition-all duration-200 shadow-sm hover:shadow-md backdrop-blur-sm"
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={toggleTheme}
              title={theme === "dark" ? "Light theme" : "Dark theme"}
            >
              {theme === "dark" ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </motion.button>

            {/* Cart */}
            <motion.div variants={iconVariants} whileHover="hover" whileTap="tap">
              <Link 
                to="/cart" 
                className="p-2.5 rounded-xl relative bg-slate-100/50 hover:bg-slate-200/70 dark:bg-slate-800/50 dark:hover:bg-slate-700/70 transition-all duration-200 shadow-sm hover:shadow-md backdrop-blur-sm"
                title="Cart"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="w-4.5 h-4.5 stroke-width-2.5" />
                {cartItems > 0 && (
                  <motion.span 
                    className="absolute -top-0.5 -right-0.5 min-w-5 h-5 flex items-center justify-center text-xs font-bold bg-red-500 text-white rounded-full shadow-lg ring-2 ring-white"
                    layoutId="cart-badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    {cartItems}
                  </motion.span>
                )}
              </Link>
            </motion.div>

            {/* Auth */}
            {isAuthenticated ? (
              <motion.div className="relative" ref={userMenuRef}>
                <motion.button
                  className="w-11 h-11 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 dark:from-slate-800 dark:to-slate-700 dark:hover:from-slate-700 dark:hover:to-slate-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center p-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  title="Profile"
                >
                  <User className="w-5 h-5" />
                </motion.button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      className="absolute top-full right-0 mt-2 w-56 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/50 dark:border-slate-800/50 z-50 py-2 px-1"
                    >
                      <div className="p-4 border-b border-slate-200/30 dark:border-slate-800/30">
                        <div className="font-medium text-slate-900 dark:text-slate-100 text-sm">{user?.name}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{user?.email}</div>
                      </div>
                      <div className="space-y-1">
                        <Link 
                          to="/profile"
                          className="block px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 rounded-xl transition-colors duration-200 flex items-center gap-3"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Settings className="w-4 h-4" />
                          Profile
                        </Link>
                        <button 
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-950/30 rounded-xl transition-colors duration-200 flex items-center gap-3"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/login"
                  className="px-5 py-2 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-900 hover:to-slate-900/80 dark:from-slate-100 dark:to-slate-200 dark:hover:from-slate-200 dark:hover:to-slate-100 text-slate-100 dark:text-slate-900 font-medium text-sm rounded-xl shadow-lg hover:shadow-xl border border-slate-900/20 dark:border-slate-200/30 transition-all duration-200 whitespace-nowrap"
                >
                  Sign in
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[40]"
            onClick={closeMenu}
            transition={{ duration: 0.25 }}
          />
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="md:hidden fixed inset-y-0 right-0 w-80 max-w-[85vw] bg-white/98 dark:bg-slate-900/98 backdrop-blur-2xl shadow-2xl border-l border-slate-200/50 dark:border-slate-800/50 z-[50] flex flex-col"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="p-2 border-b border-slate-200/30 dark:border-slate-800/30">
              <div className="flex items-center justify-between p-4">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Menu</span>
                <button onClick={closeMenu} className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex-1 p-6 space-y-2 overflow-y-auto"
            >
              {menuLinks.map((link, index) => (
                <motion.div variants={itemVariants} key={link.to}>
                  <Link
                    to={link.to}
                    className={`flex items-center gap-4 p-4 rounded-2xl text-lg font-medium transition-all duration-300 group hover:bg-slate-100/60 dark:hover:bg-slate-800/60 hover:shadow-sm hover:-translate-y-px ${
                      location.pathname === link.to
                        ? "bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-700/50 text-slate-900 dark:text-slate-100 shadow-sm border border-slate-200/50 dark:border-slate-700/50 font-semibold"
                        : "text-slate-700 dark:text-slate-300"
                    }`}
                    onClick={closeMenu}
                  >
                    <link.icon className="w-6 h-6 flex-shrink-0 opacity-70 group-hover:opacity-100" />
                    <span className="flex-1">{link.label}</span>
                    {location.pathname === link.to && (
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    )}
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Bottom Login */}
            {!isAuthenticated && (
              <motion.div
                variants={itemVariants}
                className="p-6 pt-0 border-t border-slate-200/30 dark:border-slate-800/30 mt-auto"
              >
                <Link
                  to="/login"
                  className="block w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 text-center ring-1 ring-blue-500/20"
                  onClick={closeMenu}
                >
                  Sign In
                </Link>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

