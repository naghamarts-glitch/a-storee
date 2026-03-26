import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  GraduationCap, Code, Printer, Layout, BarChart3, Database, FileText, Paintbrush, CheckCircle, Users, Award, MessageCircle, Phone, Server, Smartphone, Palette, TrendingUp
} from "lucide-react";

interface ServiceCardProps {
  title: string;
  desc: string;
  features: string[];
  icon: React.ElementType;
  gradientFrom: string;
  gradientTo: string;
}

const servicesData = [
  {
    title: "كتابة وتنسيق رسائل الماجستير والدكتوراه",
    desc: "خدمة شاملة لكتابة وتنسيق ومراجعة الرسائل العلمية بأعلى معايير الاحترافية.",
    features: ["كتابة علمية", "تنسيق APA/MLA", "تحليل SPSS", "PowerPoint مناقشة", "طباعة وتجليد"],
    icon: GraduationCap,
    gradientFrom: "bg-gradient-to-r",
    gradientTo: "from-[#7C3AED] to-[#2563EB]",
  },
  {
    title: "تصميم وتطوير مواقع إلكترونية",
    desc: "مواقع عصرية متجاوبة بتقنيات حديثة React و Laravel مع رفع مجاني.",
    features: ["تصميم UI/UX", "Frontend React", "Backend Laravel", "قاعدة بيانات", "رفع وصيانة"],
    icon: Code,
    gradientFrom: "bg-gradient-to-r",
    gradientTo: "from-[#7C3AED] to-[#2563EB]",
  },
  {
    title: "طباعة وتجليد احترافي",
    desc: "طباعة عالية الجودة للرسائل والكتب والمجلات بأحدث التقنيات.",
    features: ["طباعة ملونة", "تجليد فاخر", "قطع دقيق", "لمعان UV", "تسليم سريع"],
    icon: Printer,
    gradientFrom: "bg-gradient-to-r",
    gradientTo: "from-[#7C3AED] to-[#2563EB]",
  },
  {
    title: "تصميم جرافيكي وشعارات",
    desc: "تصاميم إبداعية للشعارات والهوية البصرية بأسلوب احترافي عالمي.",
    features: ["شعارات متجهة", "هوية بصرية", "بروشورات", "منشورات", "أيقونات"],
    icon: Palette,
    gradientFrom: "bg-gradient-to-r",
    gradientTo: "from-[#7C3AED] to-[#2563EB]",
  },
  {
    title: "تحليل بيانات وإحصاءات",
    desc: "تحليل إحصائي احترافي باستخدام SPSS و R و Python للبحوث العلمية.",
    features: ["SPSS كامل", "R Studio", "Python Pandas", "رسوم بيانية", "تقارير"],
    icon: BarChart3,
    gradientFrom: "bg-gradient-to-r",
    gradientTo: "from-[#7C3AED] to-[#2563EB]",
  },
  {
    title: "خدمات أكاديمية شاملة",
    desc: "ملخصات، مشاريع تخرج، ترجمة، تدقيق لغوي لجميع المراحل الدراسية.",
    features: ["ملخصات شاملة", "مشاريع تخرج", "ترجمة متخصصة", "تدقيق", "تنسيق"],
    icon: FileText,
    gradientFrom: "bg-gradient-to-r",
    gradientTo: "from-[#7C3AED] to-[#2563EB]",
  },

  {
    title: "كتابة وتنسيق رسائل الماجستير والدكتوراه",
    desc: "خدمة شاملة لكتابة وتنسيق ومراجعة الرسائل العلمية بأعلى معايير الاحترافية.",
    features: ["كتابة علمية", "تنسيق APA/MLA", "تحليل SPSS", "PowerPoint مناقشة", "طباعة وتجليد"],
    icon: GraduationCap,
    gradientFrom: "from-purple-500",
    gradientTo: "to-blue-500",
  },
  {
    title: "تصميم وتطوير مواقع إلكترونية",
    desc: "مواقع عصرية متجاوبة بتقنيات حديثة React و Laravel مع رفع مجاني.",
    features: ["تصميم UI/UX", "Frontend React", "Backend Laravel", "قاعدة بيانات", "رفع وصيانة"],
    icon: Code,
    gradientFrom: "from-blue-500",
    gradientTo: "to-indigo-500",
  },
  {
    title: "طباعة وتجليد احترافي",
    desc: "طباعة عالية الجودة للرسائل والكتب والمجلات بأحدث التقنيات.",
    features: ["طباعة ملونة", "تجليد فاخر", "قطع دقيق", "لمعان UV", "تسليم سريع"],
    icon: Printer,
    gradientFrom: "from-emerald-500",
    gradientTo: "to-teal-500",
  },
  {
    title: "تصميم جرافيكي وشعارات",
    desc: "تصاميم إبداعية للشعارات والهوية البصرية بأسلوب احترافي عالمي.",
    features: ["شعارات متجهة", "هوية بصرية", "بروشورات", "منشورات", "أيقونات"],
    icon: Palette,
    gradientFrom: "from-pink-500",
    gradientTo: "to-rose-500",
  },
  {
    title: "تحليل بيانات وإحصاءات",
    desc: "تحليل إحصائي احترافي باستخدام SPSS و R و Python للبحوث العلمية.",
    features: ["SPSS كامل", "R Studio", "Python Pandas", "رسوم بيانية", "تقارير"],
    icon: BarChart3,
    gradientFrom: "from-orange-500",
    gradientTo: "to-red-500",
  },
  {
    title: "خدمات أكاديمية شاملة",
    desc: "ملخصات، مشاريع تخرج، ترجمة، تدقيق لغوي لجميع المراحل الدراسية.",
    features: ["ملخصات شاملة", "مشاريع تخرج", "ترجمة متخصصة", "تدقيق", "تنسيق"],
    icon: FileText,
    gradientFrom: "from-violet-500",
    gradientTo: "to-purple-500",
  },
];

const Services = () => {
  const { lang, t } = useLanguage();

  const stats = [
    { num: "500+", label: lang === "ar" ? "عميل راضي" : "Happy Clients" },
    { num: "1000+", label: lang === "ar" ? "مشروع منجز" : "Projects Done" },
    { num: "24/7", label: lang === "ar" ? "دعم فني" : "Support" },
    { num: "100%", label: lang === "ar" ? "رضا" : "Satisfaction" },
  ];

  const techStack = [
    { name: "React", icon: "⚛️" },
    { name: "Laravel", icon: "🔗" },
    { name: "Tailwind", icon: "💨" },
    { name: "MySQL", icon: "🗄️" },
  ];

  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"} className="min-h-screen bg-gradient-to-b from-background to-muted/30 pt-24 pb-20">
      {/* Hero Section */}
      <section className="container mx-auto px-6 lg:px-8 py-24 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="arabic-hero text-5xl lg:text-7xl font-black bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] bg-clip-text text-transparent mb-8 leading-tight">
            {lang === "ar" ? "مركز نغم للفنون" : "Nagham Arts Center"}
          </h1>
          <p className="text-xl lg:text-2xl text-gray-700 dark:text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
            {lang === "ar" 
              ? "خدمات فنية وأكاديمية احترافية بتصميم عصري مستوحى من أفضل الشركات العالمية"
              : "Professional arts & academic services with modern design inspired by world's best companies"
            }
          </p>
        </motion.div>
      </section>

      <div className="container mx-auto px-6 lg:px-8">
        {/* Featured Service */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-24"
        >
          <div className="featured-service mx-auto max-w-4xl service-glow group">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-20 h-20 bg-gradient-to-r from-[#7C3AED] to-[#2563EB] rounded-3xl flex items-center justify-center mb-8 shadow-2xl">
                  <GraduationCap className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-4xl lg:text-5xl font-black text-foreground mb-6 arabic-hero">
                  {lang === "ar" ? "رسائل علمية متميزة" : "Outstanding Thesis"}
                </h2>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  {lang === "ar" 
                    ? "من الكتابة إلى الطباعة، نغطي كل خطوة في رحلتك الأكاديمية باحترافية عالمية"
                    : "From writing to printing, we cover every step of your academic journey with world-class professionalism"
                  }
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href={`https://wa.me/201121688248?text=${encodeURIComponent(lang === "ar" ? "مرحبا، أريد طلب خدمة: رسائل علمية متميزة" : "Hello, I want to request the service: Outstanding Thesis")}`} target="_blank" rel="noopener noreferrer" className="btn-service-primary">
                    <MessageCircle className="w-6 h-6" />
                    {lang === "ar" ? "اطلب الآن" : "Order Now"}
                  </a>
                  <a href="tel:+201099817790" className="btn-service-secondary">
                    <Phone className="w-6 h-6" />
                    {lang === "ar" ? "تواصل معنا" : "Contact Us"}
                  </a>
                </div>
              </div>
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                className="relative"
              >
              <div className="absolute -inset-4 bg-gradient-to-r from-[#7C3AED]/20 to-[#2563EB]/20 rounded-3xl blur-xl -z-10" />
                <div className="glass-service-card p-12">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="space-y-2 p-4">
                      <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center mx-auto">
                        <FileText className="w-6 h-6 text-purple-600" />
                      </div>
                      <p className="font-semibold">APA Format</p>
                    </div>
                    {/* more features */}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Services Grid */}
        <section className="mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl lg:text-5xl font-black mb-6 arabic-hero gradient-naam">
              {lang === "ar" ? "خدماتنا" : "Our Services"}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {lang === "ar" ? "مجموعة شاملة من الخدمات الفنية والأكاديمية بجودة عالمية" : "Comprehensive arts & academic services with world-class quality"}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-service-card service-glow"
              >
                <div className={`w-16 h-16 ${service.gradientFrom} ${service.gradientTo} rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 arabic-hero">{service.title}</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">{service.desc}</p>
                <ul className="space-y-3 mb-10">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3 group-hover:translate-x-2 transition-transform">
                      <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3 pt-4 border-t border-border/50">
                  <a href={`https://wa.me/201121688248?text=${encodeURIComponent(lang === "ar" ? `مرحبا، أريد طلب خدمة: ${service.title}` : `Hello, I want to request the service: ${service.title}`)}`} target="_blank" rel="noopener noreferrer" className="btn-service-primary flex-1 justify-center">
                    {lang === "ar" ? "اطلب الآن" : "Order Now"}
                  </a>
                  <a href="https://wa.me/201121688248" className="btn-service-secondary flex-1 justify-center">
                    {lang === "ar" ? "تواصل معنا" : "Contact Us"}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-24 py-20 bg-gradient-to-r from-purple-50/30 to-blue-50/30 rounded-3xl">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center"
          >
            <h2 className="text-4xl font-black mb-6 arabic-hero gradient-naam">
              {lang === "ar" ? "التقنيات التي نستخدمها" : "Technologies We Use"}
            </h2>
            <div className="flex flex-wrap justify-center gap-8 lg:gap-12 items-center max-w-4xl mx-auto">
              {techStack.map((tech, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1, y: -8 }}
                  className="glass-card p-8 text-center min-w-[140px]"
                >
                  <div className="text-4xl mb-4">{tech.icon}</div>
                  <h3 className="font-bold text-lg">{tech.name}</h3>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Trust Stats */}
        <section className="grid md:grid-cols-4 gap-8 mb-24">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="text-center p-8 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/50 hover:bg-white group"
            >
              <div className="text-4xl lg:text-5xl font-black gradient-naam mb-4 group-hover:scale-110 transition-transform">
                {stat.num}
              </div>
              <p className="text-lg font-semibold text-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Services;

