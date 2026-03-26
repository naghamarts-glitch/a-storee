import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";
import {
  Store, Users, Award, Heart, Eye, Target, ListChecks, Star,
  BarChart, Palette, Scissors, BookOpen, Notebook, FileText,
  BarChart3, Code, GraduationCap, ShoppingCart, Send, Phone,
  BadgeCheck, CheckCircle, ArrowRight
} from "lucide-react";

const About = () => {
  const { t, lang } = useLanguage();

  const features = [
    { icon: Store, ar: "مكتبة شاملة لجميع الخامات", en: "Comprehensive store for all supplies" },
    { icon: Users, ar: "خدمة عملاء متميزة", en: "Outstanding customer service" },
    { icon: BadgeCheck, ar: "جودة عالية وأسعار مناسبة", en: "High quality & competitive prices" },
    { icon: Award, ar: "خبرة واسعة في المجال", en: "Extensive industry experience" },
  ];

  const offerings = [
    { icon: Palette, ar: "توفير جميع خامات التربية الفنية", en: "All art education supplies" },
    { icon: Scissors, ar: "توفير خامات الاقتصاد المنزلي", en: "Home economics supplies" },
    { icon: BookOpen, ar: "بيع الكتب الدراسية لجميع المراحل", en: "Textbooks for all levels" },
    { icon: BookOpen, ar: "حجز كتب الثانوية العامة أونلاين", en: "Online high school book reservation" },
    { icon: Notebook, ar: "ملخصات المرحلة الإعدادية", en: "Prep school summaries" },
    { icon: FileText, ar: "كتابة وتنسيق الرسائل العلمية", en: "Thesis writing & formatting" },
    { icon: BarChart3, ar: "تحليل البيانات SPSS", en: "SPSS data analysis" },
    { icon: Code, ar: "تصميم وتنفيذ مواقع الويب", en: "Website design & development" },
    { icon: GraduationCap, ar: "تنفيذ مشاريع التخرج للطلاب", en: "Student graduation projects" },
  ];

  const whyUs = [
    { icon: Award, ar: "خبرة واسعة في المجال", en: "Extensive industry experience" },
    { icon: Star, ar: "أسعار مناسبة لجميع الطلاب", en: "Affordable prices for all students" },
    { icon: BadgeCheck, ar: "جودة عالية في المنتجات", en: "High-quality products" },
    { icon: Users, ar: "خدمة عملاء سريعة", en: "Fast customer service" },
    { icon: CheckCircle, ar: "تنفيذ الطلبات بدقة واحترافية", en: "Precise & professional execution" },
    { icon: Store, ar: "إمكانية طلب الخدمات أونلاين", en: "Online service ordering" },
  ];

  const [counters, setCounters] = useState({ clients: 0, projects: 0, books: 0, years: 0 });
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animate counters
          const timer = setInterval(() => {
            setCounters({
              clients: counters.clients < 1000 ? counters.clients + 20 : 1000,
              projects: counters.projects < 500 ? counters.projects + 10 : 500,
              books: counters.books < 100 ? counters.books + 2 : 100,
              years: counters.years < 10 ? counters.years + 1 : 10,
            });
          }, 20);
          setTimeout(() => clearInterval(timer), 2000);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    const statsEl = document.querySelector('.stats-section');
    if (statsEl) observer.observe(statsEl);

    return () => observer.disconnect();
  }, [counters]);

  const stats = [
    { value: counters.clients, suffix: "+", ar: "عميل", en: "Clients" },
    { value: counters.projects, suffix: "+", ar: "مشروع", en: "Projects" },
    { value: counters.books, suffix: "+", ar: "منتج", en: "Products" },
    { value: counters.years, suffix: "+", ar: "سنة خبرة", en: "Years Exp" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] pt-24 pb-32 overflow-hidden hero-gradient-about">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-naam-purple to-blue-600 opacity-95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-naam-purple/20 via-transparent to-blue-500/10" />
        <div className="container mx-auto px-4 h-full relative z-10 flex items-center justify-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="max-w-4xl mx-auto space-y-8"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ delay: 0.3 }}
              className="text-5xl sm:text-6xl lg:text-7xl 2xl:text-8xl font-black tracking-tight leading-none bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent drop-shadow-2xl"
            >
              <span className="block mb-4 lg:mb-8">{lang === "ar" ? "نصنع الإبداع" : "We Create"}</span>
              <span className="block text-4xl sm:text-5xl lg:text-6xl text-white/90">{lang === "ar" ? "ونبني المستقبل" : "the Future"}</span>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.6 }}
              className="text-xl md:text-2xl lg:text-3xl font-medium text-white/90 max-w-3xl mx-auto leading-relaxed px-4"
            >
              {t("about.desc")}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.8 }}
              className={`flex flex-col sm:flex-row gap-4 justify-center ${lang === "ar" ? 'sm:flex-row-reverse' : ''}`}
            >
              <Link 
                to="/contact" 
                className="glass-hero px-8 py-6 rounded-3xl text-lg font-bold text-white shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20"
              >
                {lang === "ar" ? "تواصل معنا" : "Contact Us"}
                <Send className="w-5 h-5" />
              </Link>
              <Link 
                to="/services" 
                className="px-8 py-6 rounded-3xl text-lg font-bold border-2 border-white/30 hover:border-white/50 bg-white/5 backdrop-blur-xl text-white/90 hover:text-white transition-all duration-300 flex items-center gap-3"
              >
                {lang === "ar" ? "تصفح الخدمات" : "Browse Services"}
                <ArrowRight className={`w-5 h-5 ${lang === "ar" ? 'rotate-180' : ''}`} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-6 max-w-7xl -mt-8 lg:-mt-12 relative z-10">

        {/* Storytelling About */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          className="py-12 lg:py-16 lg:mb-12"
        >
          <div className="max-w-4xl mx-auto text-center space-y-4 lg:space-y-6 px-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2 }}
              className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-3 lg:mb-4"
            >
              {t("about.title")}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.4 }}
              className="text-lg lg:text-xl font-medium text-foreground/80 leading-[1.4] max-w-3xl mx-auto"
            >
              {lang === "ar"
                ? "بدأت رحلة **نغم للفنون** كحلم بسيط لتوفير كل ما يحتاجه **الطلاب والفنانون** في مكان واحد. اليوم، أصبحنا **وجهة شاملة** لخامات التربية الفنية، الكتب، والخدمات الأكاديمية."
                : "Nagham Arts started as a simple dream to provide **students and artists** everything they need in one place. Today, we are a **comprehensive destination** for art supplies, books, and academic services."}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.6 }}
              className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16"
            >
              <motion.div 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.2 }}
                className="glass-card p-6 rounded-2xl text-center hover:shadow-xl transition-all duration-300 gap-y-3"
              >
                <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <Store className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{lang === "ar" ? "البداية" : "The Beginning"}</h3>
                <p className="text-sm text-muted-foreground leading-tight">{lang === "ar" ? "في عام 2015، بدأنا برحلة التميز الفني" : "In 2015, we began our journey of artistic excellence"}</p>
              </motion.div>
              <div className="glass-card p-8 rounded-3xl text-center hover:shadow-2xl transition-all duration-300">
                <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                  <Users className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{lang === "ar" ? "التطور" : "Evolution"}</h3>
                <p className="text-muted-foreground leading-relaxed">{lang === "ar" ? "من مكتبة صغيرة إلى مركز فني متكامل" : "From small store to complete arts center"}</p>
              </div>
              <div className="glass-card p-8 rounded-3xl text-center hover:shadow-2xl transition-all duration-300 md:col-span-1">
                <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-secondary/20 flex items-center justify-center">
                  <Award className="w-10 h-10 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{lang === "ar" ? "المستقبل" : "Future"}</h3>
                <p className="text-muted-foreground leading-relaxed">{lang === "ar" ? "نبني معاً مستقبل الإبداع" : "Building creativity's future together"}</p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Enhanced Features */}
        <motion.section 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          viewport={{ once: true }}
          className="py-12 lg:py-16 lg:mb-12"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 lg:mb-12">
              <h2 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent mb-3 lg:mb-4">
                {lang === "ar" ? "مميزاتنا" : "Our Features"}
              </h2>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-[1.4]">
                {lang === "ar" ? "ما يميزنا عن الآخرين في سوق الفنون والتعليم" : "What sets us apart in the arts and education market"}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.03, 
                    boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.15)" 
                  }}
                  className="group glass-card p-5 lg:p-6 rounded-2xl lg:rounded-3xl text-center cursor-pointer bg-gradient-to-b from-background/80 hover:from-background backdrop-blur-xl border border-border/30 hover:border-primary/40 transition-all duration-400 overflow-hidden relative"
                >
                  <div className="w-20 h-20 mx-auto mb-6 rounded-3xl gradient-bg group-hover:scale-110 transition-transform duration-300 flex items-center justify-center shadow-2xl">
                    <f.icon className="w-9 h-9 text-primary-foreground drop-shadow-lg" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">{lang === "ar" ? f.ar : f.en}</h3>
                  <div className="h-1 w-24 mx-auto bg-gradient-to-r from-primary/30 to-transparent rounded-full group-hover:w-full group-hover:bg-primary/60 transition-all duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Enhanced Vision & Mission */}
        <motion.section 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          viewport={{ once: true }}
          className="py-24 mb-20"
        >
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent mb-6">
                {lang === "ar" ? "رؤيتنا و رسالتنا" : "Vision & Mission"}
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {lang === "ar" ? "القيم التي نؤمن بها ونعمل من أجل تحقيقها" : "The values we believe in and work to achieve"}
              </p>
            </div>
            <div className={`grid md:grid-cols-2 gap-8 lg:gap-12 ${lang === "ar" ? "lg:grid-cols-1 lg:grid-rows-2 md:[&>*:first-child]:order-2" : ""}`}>
              <motion.div 
                initial={{ opacity: 0, x: lang === "ar" ? 50 : -50 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }}
                className="glass-card p-10 lg:p-12 rounded-3xl relative overflow-hidden group hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-purple-500/5 via-blue-500/5 backdrop-blur-xl border border-purple-500/20 hover:border-purple-500/40"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity ltr:-right-0 rtl:-left-0 w-64 h-64 rounded-2xl blur-3xl -z-10" />
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shrink-0 shadow-xl">
                    <Eye className="w-8 h-8 text-white drop-shadow-lg" />
                  </div>
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-black text-foreground mb-2">{lang === "ar" ? "رؤيتنا" : "Our Vision"}</h3>
                    <div className="h-1 w-20 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full" />
                  </div>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed tracking-wide">
                  {lang === "ar"
                    ? "أن نكون **الوجهة الأولى والأخيرة** لكل فنان وطالب في مصر للفنون والتعليم، مركز إبداع يبني جسرًا بين **الحلم والواقع** الإبداعي."
                    : "To be the **first and last destination** for every artist and student in Egypt for arts & education - a creativity center bridging **dreams to reality**."}
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: lang === "ar" ? -50 : 50 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }}
                className="glass-card p-10 lg:p-12 rounded-3xl relative overflow-hidden group hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 backdrop-blur-xl border border-blue-500/20 hover:border-blue-500/40"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity ltr:-left-0 rtl:-right-0 w-64 h-64 rounded-2xl blur-3xl -z-10" />
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-xl">
                    <Target className="w-8 h-8 text-white drop-shadow-lg" />
                  </div>
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-black text-foreground mb-2">{lang === "ar" ? "رسالتنا" : "Our Mission"}</h3>
                    <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full" />
                  </div>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed tracking-wide">
                  {lang === "ar"
                    ? "تقديم **أفضل المنتجات والخدمات** بجودة عالمية وأسعار تنافسية، مع تجربة عملاء **لا تُنسى** تجعل كل زيارة لحظة إبداع."
                    : "**World-class products & services** at competitive prices, with an **unforgettable customer experience** making every visit a moment of inspiration."}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Enhanced Services Grid */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          className="py-24 mb-20"
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent mb-6 flex items-center justify-center gap-3 mx-auto">
                <Palette className="w-12 h-12 drop-shadow-lg" />
                {lang === "ar" ? "خدماتنا" : "Our Services"}
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {lang === "ar" ? "مجموعة شاملة من الخدمات الفنية والأكاديمية والتقنية بأعلى معايير الجودة" : "Comprehensive art, academic, and tech services with the highest quality standards"}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8">
              {offerings.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 6) * 0.1 }}
                  whileHover={{ 
                    y: -10, 
                    scale: 1.05,
                    boxShadow: "0 30px 60px -15px rgba(0,0,0,0.3)"
                  }}
                  className="group glass-card p-6 lg:p-8 rounded-3xl cursor-pointer overflow-hidden hover:shadow-2xl hover:border-primary/50 border border-border/50 transition-all duration-500 relative bg-gradient-to-b from-background hover:from-primary/5 backdrop-blur-xl"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 group-hover:from-primary/40 group-hover:to-accent/40 transition-all duration-400 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 shadow-xl hover:shadow-primary/25">
                    <item.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground drop-shadow-lg" />
                  </div>
                  <h3 className="text-lg lg:text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {lang === "ar" ? item.ar : item.en}
                  </h3>
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent my-4 group-hover:bg-primary/50 transition-colors" />
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {lang === "ar" ? "خدمة متكاملة بأعلى جودة" : "Complete service with highest quality"}
                  </p>
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-24 bg-gradient-to-r from-primary/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                </motion.div>
              ))}
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="text-center mt-16 p-8 lg:p-12 rounded-3xl border-2 border-primary/30 hover:border-primary/50 bg-gradient-to-r from-primary/5 to-accent/5 backdrop-blur-xl group cursor-pointer"
              whileHover={{ scale: 1.02, boxShadow: "0 20px 40px -10px rgba(59,130,246,0.3)" }}
            >
              <Link to="/services" className="inline-flex items-center gap-3 text-xl font-bold text-primary hover:text-primary-foreground group-hover:text-primary-foreground transition-colors">
                <span>{lang === "ar" ? "اكتشف جميع الخدمات" : "Discover All Services"}</span>
                <ArrowRight className={`w-6 h-6 ${lang === "ar" ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* Enhanced Why Choose Us */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          className="py-24 mb-20 bg-gradient-to-b from-slate-50/50 to-transparent"
        >
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-3 px-8 py-4 rounded-3xl bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-200/50 backdrop-blur-sm mb-8">
                <BadgeCheck className="w-8 h-8 text-emerald-500 drop-shadow-lg" />
                <span className="text-2xl font-bold text-foreground">{lang === "ar" ? "لماذا نختار نغم؟" : "Why Choose Nagham?"}</span>
              </div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {lang === "ar" ? "الأسباب التي تجعلنا الخيار الأول لآلاف الطلاب والفنانين" : "Reasons why thousands of students & artists choose us first"}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {whyUs.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ 
                    y: -8,
                    scale: 1.03,
                    boxShadow: "0 20px 40px -10px rgba(16,185,129,0.3)"
                  }}
                  className="group relative p-8 rounded-3xl bg-white/60 hover:bg-white/80 backdrop-blur-xl border border-emerald-100/50 hover:border-emerald-200 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity blur-xl -z-10" />
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shrink-0 shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="w-6 h-6 text-white drop-shadow-md" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-emerald-700 transition-colors mb-2 leading-tight">
                        {lang === "ar" ? item.ar : item.en}
                      </h3>
                    </div>
                  </div>
                  <div className="h-1 w-16 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full mx-auto group-hover:w-24 transition-all duration-300" />
                  <p className="text-sm text-muted-foreground mt-4 leading-relaxed text-center">
                    {lang === "ar" ? "مضمون 100%" : "100% Guaranteed"}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Animated Statistics */}
        <motion.section className="stats-section py-24 mb-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent mb-6">
                {lang === "ar" ? "إنجازاتنا" : "Our Achievements"}
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {lang === "ar" ? "أرقام تتحدث عن **نفسها**" : "Numbers that **speak for themselves**"}
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-4xl mx-auto">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  whileHover={{ scale: 1.1, y: -10 }}
                  className="glass-card p-8 lg:p-10 rounded-3xl text-center group cursor-default relative overflow-hidden bg-gradient-to-b from-gradient-purple/20 to-blue-500/10 backdrop-blur-xl border border-white/20 hover:border-white/40 shadow-2xl hover:shadow-gradient-purple/20 hover:shadow-2xl transition-all duration-700"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent)] opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                  <div className="relative z-10">
                    <motion.div 
                      className="text-3xl lg:text-4xl 2xl:text-5xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 bg-clip-text text-transparent drop-shadow-2xl mb-3 tracking-tight"
                      animate={{ 
                        scale: [1, 1.05, 1],
                        rotate: [0, 2, -2, 0]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                    >
                      {(s.value || 0).toLocaleString()}{s.suffix}
                    </motion.div>
                    <p className="text-sm lg:text-base font-semibold text-foreground/90 uppercase tracking-wide">
                      {lang === "ar" ? s.ar : s.en}
                    </p>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-32 bg-gradient-to-r from-yellow-400/20 to-transparent rounded-full blur-2xl opacity-0 lg:group-hover:opacity-50 transition-opacity -z-10" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Optimized CTA - متناسق مع الصفحة */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          className="py-20 lg:py-24 bg-gradient-to-b from-naam-purple/10 via-blue-500/5 to-transparent"
        >
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              whileInView={{ scale: 1, opacity: 1 }} 
              className="glass-card p-8 lg:p-12 xl:p-16 rounded-3xl relative overflow-hidden shadow-xl lg:shadow-2xl border border-naam-purple/20 backdrop-blur-xl max-w-4xl mx-auto text-center"
              whileHover={{ scale: 1.01, boxShadow: "0 25px 50px -12px rgba(120,119,198,0.3)" }}
            >
              <div className="absolute inset-0 bg-gradient-radial from-naam-purple/20 to-blue-500/10 blur-xl opacity-70" />
              <div className="relative z-10 space-y-6 lg:space-y-8">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  className="text-3xl lg:text-4xl xl:text-5xl font-black bg-gradient-to-r from-naam-purple via-blue-400 to-naam-blue bg-clip-text text-transparent drop-shadow-xl lg:drop-shadow-2xl leading-tight"
                >
                  {lang === "ar" ? "جاهز تبدأ معانا؟" : "Ready to Start with Us?"}
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  transition={{ delay: 0.2 }}
                  className="text-lg lg:text-xl xl:text-2xl text-foreground/90 leading-relaxed max-w-2xl mx-auto px-4 lg:px-0"
                >
                  {lang === "ar" 
                    ? "انضم لآلاف الطلاب والفنانين الذين اختاروا **نغم للفنون** لتحقيق أحلامهم الإبداعية"
                    : "Join thousands of students & artists who chose **Nagham Arts** to realize their creative dreams"
                  }
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  transition={{ delay: 0.4 }}
                  className={`flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center items-center ${lang === "ar" ? 'sm:flex-row-reverse' : ''}`}
                >
                  <a 
                    href="https://wa.me/201234567890" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group relative px-8 py-4 lg:px-10 lg:py-4 xl:px-12 xl:py-5 rounded-2xl lg:rounded-3xl bg-gradient-to-r from-emerald-500 via-green-600 to-emerald-600 text-white font-bold text-base lg:text-lg shadow-lg lg:shadow-xl hover:shadow-emerald-500/50 hover:scale-[1.02] hover:from-emerald-600 hover:to-green-700 transition-all duration-300 flex items-center gap-2.5 lg:gap-3 whitespace-nowrap overflow-hidden"
                  >
                    <svg className="w-5 h-5 lg:w-6 lg:h-6 shrink-0 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 01 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    <span>{lang === "ar" ? "واتساب" : "WhatsApp"}</span>
                  </a>
                  
                  <div className="flex gap-3 flex-wrap justify-center max-w-full">
                    <Link 
                      to="/services" 
                      className="px-6 py-3 lg:px-8 lg:py-3.5 rounded-2xl lg:rounded-3xl border-2 border-naam-purple/40 hover:border-naam-purple bg-naam-purple/10 hover:bg-naam-purple/20 text-naam-purple hover:text-naam-purple-foreground font-semibold text-sm lg:text-base transition-all duration-300 flex items-center gap-2 hover:scale-[1.02] whitespace-nowrap"
                    >
                      <Send className="w-4 h-4 lg:w-5 lg:h-5" />
                      <span>{lang === "ar" ? "اطلب خدمة" : "Request Service"}</span>
                    </Link>
                    <Link 
                      to="/shop" 
                      className="px-6 py-3 lg:px-8 lg:py-3.5 rounded-2xl lg:rounded-3xl border-2 border-blue-400/40 hover:border-blue-400 bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 hover:text-blue-400 font-semibold text-sm lg:text-base transition-all duration-300 flex items-center gap-2 hover:scale-[1.02] whitespace-nowrap"
                    >
                      <ShoppingCart className="w-4 h-4 lg:w-5 lg:h-5" />
                      <span>{lang === "ar" ? "تصفح المتجر" : "Browse Store"}</span>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;
