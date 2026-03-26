import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CounterProps {
    value: number;
    suffix?: string;
    label: string;
    icon: string;
}

const AnimatedCounter = ({ value, suffix = "", label, icon }: CounterProps) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
    let timer: number;
    let currentValue = 0;
    const increment = value / 50;

    const counter = setInterval(() => {
      currentValue += increment;
      if (currentValue >= value) {
        setDisplayValue(value);
        clearInterval(counter);
      } else {
        setDisplayValue(Math.floor(currentValue));
      }
    }, 30);

    return () => clearInterval(counter);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-100px" }}
      className="flex flex-col items-center justify-center p-8 rounded-2xl bg-gradient-to-br from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-900/30 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 hover:shadow-lg transition-shadow duration-300"
      whileHover={{ scale: 1.05 }}
    >
      <div className="text-5xl mb-4">{icon}</div>
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-nagham-primary to-nagham-secondary bg-clip-text text-transparent"
      >
        {displayValue}
        {suffix}
      </motion.div>
      <p className="text-gray-600 dark:text-gray-400 text-center mt-2 font-medium">
        {label}
      </p>
    </motion.div>
  );
};

const StatisticsSection = () => {
  const { lang } = useLanguage();

  const stats = [
    {
      value: 1000,
      suffix: "+",
      label: lang === "ar" ? "عميل سعيد" : "Happy Customers",
      icon: "😊",
    },
    {
      value: 500,
      suffix: "+",
      label: lang === "ar" ? "منتج متنوع" : "Different Products",
      icon: "🛍️",
    },
    {
        value: 50,
        suffix: "+",
        label: lang === "ar" ? "خدمة أكاديمية" : "Academic Services",
        icon: "🎓",
    },
    {
        value: 200,
        suffix: "+",
        label: lang === "ar" ? "طلب شهري" : "Monthly Orders",
        icon: "📦",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-nagham-accent/5 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-nagham-primary/5 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants}>
            <span className="inline-block px-4 py-2 rounded-full bg-nagham-primary/10 text-nagham-primary font-semibold text-sm mb-4">
              {lang === "ar" ? "📊 إحصائياتنا" : "📊 Our Statistics"}
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-nagham-primary via-nagham-secondary to-nagham-accent bg-clip-text text-transparent">
              {lang === "ar"
                ? "أرقام تتحدث عن نجاحنا"
                : "Numbers That Speak For Us"}
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto"
          >
            {lang === "ar"
              ? "نفتخر بخدماتنا وبثقة عملائنا الكرام، وهذه الأرقام تعكس التزامنا برفع أعلى معايير الجودة"
              : "We take pride in our services and customer trust. These numbers reflect our commitment to excellence."}
          </motion.p>
        </motion.div>

        {/* Statistics Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {stats.map((stat, index) => (
            <AnimatedCounter
              key={index}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              icon={stat.icon}
            />
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-20 p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-nagham-primary/10 via-nagham-secondary/10 to-nagham-accent/10 border border-nagham-primary/20 dark:border-nagham-primary/30 text-center"
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            {lang === "ar"
              ? "هل أنت مستعد للانضمام إلينا؟"
              : "Ready To Join Us?"}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            {lang === "ar"
              ? "انضم إلى آلاف العملاء الراضين وتمتع بأفضل الخدمات والمنتجات"
              : "Join thousands of satisfied customers and enjoy the best services and products"}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #7C6CF2 0%, #9C8CF7 100%)",
              boxShadow: "0 10px 25px rgba(124, 108, 242, 0.3)",
            }}
          >
            {lang === "ar" ? "ابدأ الآن" : "Get Started Now"}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default StatisticsSection;
