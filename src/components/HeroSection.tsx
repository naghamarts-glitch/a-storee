import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
    const { lang, t } = useLanguage();

    const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
        },
    },
    };

    const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
      transition: { duration: 0.8 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, x: lang === "ar" ? -50 : 50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 0.8, delay: 0.2 },
    },
  };

  const buttonHoverVariants = {
    whileHover: { scale: 1.05, translateY: -4 },
    whileTap: { scale: 0.95 },
  };

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: { duration: 4, repeat: Infinity },
    },
  };

  return (
    <section className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-nagham-primary/10 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-nagham-secondary/10 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-nagham-accent/5 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="container mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            className="space-y-8"
          >
            {/* Title */}
            <motion.div variants={itemVariants} className="space-y-4">
              <motion.span
                variants={itemVariants}
                className="inline-block px-4 py-2 rounded-full bg-nagham-primary/10 text-nagham-primary font-semibold text-sm"
              >
                {lang === "ar" ? "🎨 مرحباً بك في مكتبة نغم" : "🎨 Welcome to Nagham"}
              </motion.span>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-nagham-primary via-nagham-secondary to-nagham-accent bg-clip-text text-transparent">
                  {lang === "ar"
                    ? "مكتبة نغم للفنون والخدمات الطلابية"
                    : "Nagham Art Hub & Student Services"}
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl"
            >
              {lang === "ar"
                ? "مجموعة شاملة من خامات الفنون عالية الجودة والكتب الدراسية والخدمات الأكاديمية المتميزة. نحن نساعدك لتحقيق أحلامك الأكاديمية والفنية."
                : "A comprehensive collection of high-quality art supplies, textbooks, and outstanding academic services. We help you achieve your academic and artistic dreams."}
            </motion.p>

            {/* Features List */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4 py-4"
            >
              {[
                { label: lang === "ar" ? "خامات فنية" : "Art Supplies", icon: "🎨" },
                { label: lang === "ar" ? "كتب دراسية" : "Textbooks", icon: "📚" },
                { label: lang === "ar" ? "خدمات أكاديمية" : "Academic Services", icon: "🎓" },
                { label: lang === "ar" ? "سرعة التسليم" : "Fast Delivery", icon: "🚚" },
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm font-medium">
                  <span className="text-2xl">{feature.icon}</span>
                  <span className="text-gray-700 dark:text-gray-300">{feature.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Buttons */}
            <motion.div
              variants={itemVariants}
              className={`flex flex-col sm:flex-row gap-4 pt-6 ${lang === "ar" ? "sm:flex-row-reverse" : ""}`}
            >
              {/* Primary Button */}
              <motion.div
                {...buttonHoverVariants}
                whileHover={{ boxShadow: "0 20px 40px rgba(124, 108, 242, 0.3)" }}
              >
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, #7C6CF2 0%, #9C8CF7 100%)",
                    boxShadow: "0 10px 25px rgba(124, 108, 242, 0.2)",
                  }}
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>{lang === "ar" ? "تصفح المنتجات" : "Browse Products"}</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>

              {/* Secondary Button */}
              <motion.div
                {...buttonHoverVariants}
                whileHover={{ boxShadow: "0 20px 40px rgba(124, 108, 242, 0.15)" }}
              >
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold border-2 transition-all duration-300"
                  style={{
                    borderColor: "#7C6CF2",
                    color: "#7C6CF2",
                    backgroundColor: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(124, 108, 242, 0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{lang === "ar" ? "اطلب خدمة الآن" : "Request Service"}</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust Badge */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700"
            >
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((_, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-nagham-primary to-nagham-secondary flex items-center justify-center text-white font-bold text-sm border-2 border-white dark:border-gray-800"
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <p className="font-semibold text-gray-900 dark:text-white">
                  {lang === "ar" ? "1000+ عميل سعيد" : "1000+ Happy Customers"}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {lang === "ar" ? "تم خدمتهم بنجاح" : "Served with excellence"}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Image Section */}
          <motion.div
            variants={imageVariants}
            className="relative"
          >
            {/* Floating Background Elements */}
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="absolute top-0 left-0 w-72 h-72 bg-nagham-primary/5 rounded-full blur-2xl"
            />
            <motion.div
              variants={floatingVariants}
              animate="animate"
              style={{ animationDelay: "0.5s" }}
              className="absolute bottom-0 right-0 w-72 h-72 bg-nagham-secondary/5 rounded-full blur-2xl"
            />

            {/* Hero Image Container */}
            <div className="relative z-10">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl overflow-hidden shadow-2xl"
                style={{
                  boxShadow:
                    "0 20px 60px rgba(124, 108, 242, 0.2), 0 0 0 1px rgba(124, 108, 242, 0.1)",
                }}
              >
                {/* Placeholder Image - Replace with actual Nagham image */}
                <div
                  className="w-full aspect-square rounded-3xl relative overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(124, 108, 242, 0.1) 0%, rgba(156, 140, 247, 0.1) 100%)",
                  }}
                >
                  {/* Decorated Background */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-9xl mb-4">🎨</div>
                      <p className="text-2xl font-bold bg-gradient-to-r from-nagham-primary to-nagham-secondary bg-clip-text text-transparent">
                        {lang === "ar" ? "مكتبة نغم" : "Nagham"}
                      </p>
                      <p className="text-gray-600 mt-2">
                        {lang === "ar"
                          ? "للفنون والخدمات الطلابية"
                          : "Art & Academic Services"}
                      </p>
                    </div>
                  </div>

                  {/* Replace with real image URL */}
                  <img
                    src="/hero-image.png"
                    alt="Nagham Art Hub"
                    className="w-full h-full object-cover opacity-0"
                  />
                </div>
              </motion.div>

              {/* Decorative Elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-8 right-8 w-20 h-20 bg-nagham-accent/10 rounded-full blur-lg"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-8 left-8 w-16 h-16 bg-nagham-primary/10 rounded-full blur-lg"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
