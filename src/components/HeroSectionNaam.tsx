import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Palette, Code, Play, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const { lang, t } = useLanguage();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const floatVariants = {
    animate: {
      y: [-20, 20, -20],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const orbVariants = {
    animate: (i: number) => ({
      y: [0, -30, 0],
      x: [0, Math.sin(i) * 20, 0],
      scale: [1, 1.1, 1],
      rotate: [0, 180, 360],
      transition: {
        duration: 8 + i * 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }),
  };

  const particles = Array.from({ length: 20 }, (_, i) => i);

  return (
    <section className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      {/* Multi-layer Background */}
      <div className="absolute inset-0 -z-10 hero-gradient animate-depth-float" />
      
      {/* Floating Orbs for Depth */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-72 h-72 rounded-full blur-3xl opacity-20 hidden lg:block ${
            i === 0 ? 'bg-naam-purple/20 top-20 left-20' :
            i === 1 ? 'bg-naam-gold/20 bottom-32 right-32' :
            i === 2 ? 'bg-naam-blue/20 top-1/2 left-1/4' :
            i === 3 ? 'bg-naam-purple/15 bottom-20 left-1/3' :
            'bg-naam-gold/15 top-1/3 right-1/4'
          }`}
          variants={orbVariants}
          animate="animate"
          custom={i}
        />
      ))}

      {/* Scanline Effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent animate-scan-line" />
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-naam-purple/30 to-transparent animate-scan-line" style={{animationDelay: '10s'}} />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 2xl:grid-cols-12 gap-12 lg:gap-24 items-center min-h-[70vh]"
        >
          {/* Content Column - Perfect Grid */}
          <motion.div className="2xl:col-span-6 lg:col-span-7 space-y-12 lg:order-1">
            <motion.div variants={itemVariants}>
              <motion.span
                className="glass-hero inline-flex px-6 py-3 rounded-full text-lg font-semibold"
                style={{background: 'hsl(var(--glass-bg))', borderColor: 'hsl(var(--primary) / 0.4)'}}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                {lang === "ar" ? "الإبداع الرقمي المستقبلي" : "Future Digital Creativity"}
              </motion.span>
            </motion.div>

            {/* Massive Arabic Title - Visual Hierarchy */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h1 className="arabic-title text-6xl sm:text-7xl lg:text-8xl 2xl:text-9xl leading-none font-black tracking-[-0.05em] opacity-95">
                <span className="gradient-naam block mb-4 lg:mb-8">
                  {lang === "ar" 
                    ? "مركز نعم"
                    : "Naam Center"
                  }
                </span>
                <span className="text-4xl sm:text-5xl lg:text-6xl 2xl:text-7xl font-normal text-white/80 block">
                  {lang === "ar" 
                    ? "للفنون"
                    : "for Arts"
                  }
                </span>
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl font-medium text-white/80 max-w-lg leading-relaxed">
                {lang === "ar" 
                  ? "الوجهة الفاخرة للفنون الرقمية والإبداع المستقبلي. حيث يلتقي التصميم بالتكنولوجيا في تجربة فنية استثنائية."
                  : "The luxurious destination for digital arts and future creativity. Where design meets technology in an exceptional artistic experience."
                }
              </p>
            </motion.div>

            {/* Interactive Glass Features */}
            <motion.div 
              variants={itemVariants} 
              className="grid grid-cols-2 gap-6 pt-8 border-t border-white/10"
            >
              {[
                { icon: Palette, label: lang === "ar" ? "تصميم إبداعي" : "Creative Design", color: "naam-purple" },
                { icon: Code, label: lang === "ar" ? "تطوير متقدم" : "Advanced Development", color: "naam-blue" },
                { icon: Sparkles, label: lang === "ar" ? "تجربة تفاعلية" : "Interactive Experience", color: "naam-gold" },
                { icon: Play, label: lang === "ar" ? "حلول رقمية" : "Digital Solutions", color: "naam-purple" },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  className="glass-hero p-6 rounded-3xl group cursor-default"
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <feature.icon className={`w-10 h-10 mb-3 text-${feature.color}`} />
                  <p className="font-semibold text-lg">{feature.label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Neon Glow Buttons */}
            <motion.div
              variants={itemVariants}
              className={`flex flex-col lg:flex-row gap-6 pt-12 ${lang === "ar" ? "lg:flex-row-reverse" : ""}`}
            >
              <motion.a
                href="#services"
                className="neon-button glass-hero group relative overflow-hidden font-bold text-xl px-12 py-8 rounded-3xl uppercase tracking-wide flex items-center justify-center gap-4 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))] text-white shadow-2xl"
                whileHover="hover"
                whileTap="tap"
              >
                <span>{lang === "ar" ? "ابدأ رحلتك الفنية" : "Start Your Art Journey"}</span>
                <ArrowRight className={`w-6 h-6 group-hover:translate-x-2 transition-transform ${lang === "ar" ? "-scale-x-100 rotate-180" : ""}`} />
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>

              <motion.button
                className="glass-hero border-2 border-[hsl(var(--primary)/0.6)] px-12 py-8 rounded-3xl font-bold text-xl uppercase tracking-wide flex items-center gap-4 text-white/90 hover:text-white neon-button"
                whileHover="hover"
                whileTap="tap"
              >
                <ChevronDown className="w-6 h-6" />
                <span>{lang === "ar" ? "اكتشف المزيد" : "Discover More"}</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Visual Hero - Depth Layers */}
          <motion.div 
            className="2xl:col-span-6 lg:col-span-5 relative lg:order-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className="glass-hero p-12 rounded-4xl relative overflow-hidden depth-layer" style={{perspective: '1200px'}}>
              {/* Mouse-follow shine */}
              <motion.div 
                className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/20 to-transparent opacity-60"
                style={{
                  transformOrigin: 'center center',
                  rotateX: 3,
                }}
                animate={{
                  x: mousePosition.x * -0.003,
                  y: mousePosition.y * -0.003,
                  rotateY: (mousePosition.x / window.innerWidth - 0.5) * 10,
                }}
                transition={{ type: "spring", stiffness: 100 }}
              />

              {/* Futuristic Art Canvas */}
              <div className="relative z-10 flex flex-col items-center text-center h-[500px] justify-center">
                <div className="w-48 h-48 bg-gradient-to-br from-naam-purple to-naam-blue rounded-3xl flex items-center justify-center mb-8 shadow-2xl animate-depth-float">
                  <Sparkles className="w-24 h-24 text-white/20 animate-pulse" />
                </div>
                <div className="space-y-4">
                  <div className="w-32 h-1 bg-gradient-to-r from-naam-gold to-naam-purple rounded-full mx-auto animate-neon-glow" />
                  <h3 className="arabic-title text-4xl font-black gradient-naam">
                    {lang === "ar" ? "الإبداع" : "CREATIVE"}
                  </h3>
                  <p className="text-lg text-white/70 font-medium">
                    {lang === "ar" ? "تصميم رقمي فاخر" : "Luxury Digital Design"}
                  </p>
                </div>
              </div>

              {/* Floating Particles */}
              <AnimatePresence>
                {particles.map((_, i) => (
                  <motion.div
                    key={`particle-${i}`}
                    className="absolute w-2 h-2 bg-naam-gold rounded-full opacity-60"
                    style={{
                      left: `${20 + i * 4}%`,
                      top: `${10 + (i % 5) * 15}%`,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.6, 1, 0.6],
                      x: [0, 20, 0],
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 3 + i * 0.2,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* Stats Glass Cards */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[1000, 50, 99].map((stat, i) => (
                <motion.div
                  key={i}
                  className="glass-card p-4 rounded-2xl text-center bg-white/5 backdrop-blur-2xl"
                  whileHover={{ scale: 1.05, y: -4 }}
                >
                  <div className="text-2xl font-black gradient-naam">{stat.toLocaleString()}</div>
                  <div className="text-sm text-white/60 capitalize">{['عميل', 'مشروع', 'تقييم'][i]}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center mt-24 opacity-80"
        >
          <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
          <ChevronDown className="w-6 h-6 text-white/60 animate-bounce mt-2" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

