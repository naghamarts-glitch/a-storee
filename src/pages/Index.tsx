import { useEffect, useState } from "react";
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import pigmentImg from '@/assets/products/pigment-colors.png';
import gouacheImg from '@/assets/products/gouache-colors.png';
import oilcolors from '@/assets/products/oil-colors.png';
import h1 from '@/assets/products/h1.png';
import h4 from '@/assets/products/h4.png';
import h10 from '@/assets/products/h10.png';
import e1 from '@/assets/products/e1.jpg';
import w2 from '@/assets/products/w2.png';
import w3 from '@/assets/products/w3.png';
import w4 from '@/assets/products/w4.png';
import e2 from '@/assets/products/e2.png';
import e3 from '@/assets/products/e3.png';
import b1 from '@/assets/products/b1.png';
import b2 from '@/assets/products/b2.jpg';
import b3 from '@/assets/products/b3.jpg';
import q1 from '@/assets/products/q1.png';
import q2 from '@/assets/products/q2.png';
import q3 from '@/assets/products/q3.png';
import q4 from '@/assets/products/q4.png';
import q5 from '@/assets/products/q5.png';
import q6 from '@/assets/products/q6.png';
import q8 from '@/assets/products/q8.png';
import q7 from '@/assets/products/q7.png';
import d1 from '@/assets/products/d1.png';
import d2 from '@/assets/products/d2.png';
import d3 from '@/assets/products/d3.png';
import d4 from '@/assets/products/d4.png';
import v1 from '@/assets/products/v1.png';
import v3 from '@/assets/products/v3.png';
import v4 from '@/assets/products/v4.png';
import v5 from '@/assets/products/v5.png';
import nevbar1 from '@/assets/products/nevbar1.png';
import nevbar2 from '@/assets/products/nevbar2.png';
import nevbar3 from '@/assets/products/nevbar3.png';
import glassColors from '@/assets/products/glass-colors.png';
import pigmentColors from '@/assets/products/pigment-colors.png';
import faber48Img from '@/assets/products/faber-castell-48.png';

import ProductCard, { Book } from '@/components/ProductCard';
import { books } from '@/data/books';

import ServiceModal from '@/components/ServiceModal';
import PortfolioModal from '@/components/PortfolioModal';
import ServiceRequestModal from '@/components/ServiceRequestModal';

import { 
  Zap, Palette, DollarSign, Headphones, Star, Phone, User, List, MessageCircle, Loader2,
  ChevronRight, Send, Sparkles, BookOpen
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Link } from "react-router-dom";

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { toast } from 'sonner';
const services = [
  {
    id: 'art',
    title: { ar: '🎨 مستلزمات الفنون', en: '🎨 Art Supplies' },
    desc: { ar: 'ألوان – أدوات رسم – أدوات يدوية.', en: 'Colors - Drawing tools - Handcrafts.' },
    images: [pigmentImg, gouacheImg, oilcolors],
    color: 'from-violet-500 to-pink-500'
  },
  {
    id: 'sewing',
    title: { ar: '🧵 مستلزمات الخياطة والكروشيه', en: '🧵 Sewing & Crochet Supplies' },
    desc: { ar: 'خيوط – إبر – أدوات تطريز.', en: 'Threads - Needles - Embroidery tools.' },
    images: [h1, h4, h10],
    color: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'print',
    title: { ar: '🖨 خدمات الطباعة', en: '🖨 Printing Services' },
    desc: { ar: 'طباعة – تصوير – تصميم.', en: 'Printing - Photocopy - Design.' },
    images: [w4, w2, w3],
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'web',
    title: { ar: '💻 إنشاء المواقع الإلكترونية', en: '💻 Website Creation' },
    desc: { ar: 'تصميم مواقع للشركات والمتاجر الإلكترونية.', en: 'Website design for companies & e-commerce.' },
    images: [e1, e2, e3],
    color: 'from-blue-500 to-indigo-500'
  },
  {
    id: 'news',
    title: { ar: '📰 مواقع المجلات والصحف', en: '📰 Magazines & Newspapers Sites' },
    desc: { ar: 'تصميم مواقع إخبارية احترافية مثل الأهرام والأخبار واليوم السابع.', en: 'Professional news sites like Al-Ahram, Al-Akhbar, Youm7.' },
    images: [q3, q7, q2],
    color: 'from-purple-500 to-fuchsia-500'
  },
  {
    id: 'custom',
    title: { ar: '⚙ خدمات الماجستير ومشاريع التخرج', en: '⚙ Masters/Graduation Projects' },
    desc: { ar: 'جميع خدمات رسائل الماجستير والدكتوراة ومشاريع التخرج', en: 'Masters/PhD/graduation projects' },
    images: [b1, b2, b3],
    color: 'from-amber-500 to-yellow-500'
  }
];

const Index = () => {
  const { lang, t, dir } = useLanguage();
  const [bgIndex, setBgIndex] = useState(0);

const portfolio = [
  {
    title: { ar: "موقع الأهرام الإلكتروني", en: "Al-Ahram Electronic Site" },
    desc: { ar: "نظام نشر إخباري كامل مع لوحة تحكم متقدمة", en: "Complete news publishing system" },
    images: [q1, q2, q3, q7]
  },
  { 
    title: { ar: 'متجر إلكتروني متكامل', en: 'Complete E-commerce Store' }, 
    desc: { ar: 'منصة بيع مع دفع إلكتروني وإدارة مخزون', en: 'Full e-commerce with payment/inventory' }, 
    images: [q4, q5, q6, q8]
  },
  { 
    title: { ar: 'بورتفوليو فنان', en: 'Artist Portfolio' }, 
    desc: { ar: 'تصميم عصري تفاعلي لعرض الأعمال الفنية', en: 'Modern interactive art portfolio' }, 
    images: [d1, d2, d3, d4]
  },
  { 
    title: { ar: 'لوحة تحكم إدارية', en: 'Admin Control Panel' }, 
    desc: { ar: 'نظام إدارة المحتوى والطلبات والمستخدمين', en: 'Content/orders/users management' }, 
    images: [v1, v3, v4, v5]
  }
];

  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [selectedProject, setSelectedProject] = useState<typeof portfolio[0] | null>(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  
  console.log('Index render - showFormModal:', showFormModal);

  const handleServiceOpen = (service: typeof services[0]) => setSelectedService(service);
  const handleServiceClose = () => setSelectedService(null);
  const handleProjectOpen = (project: typeof portfolio[0]) => {
    setSelectedProject(project);
    setShowProjectModal(true);
  };
  const handleProjectClose = () => setShowProjectModal(false);
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };
  const buttonVariants = {
    hover: { scale: 1.05, y: -2 },
    tap: { scale: 0.98 }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'الاسم مطلوب';
    if (!formData.phone.trim()) newErrors.phone = 'رقم الهاتف مطلوب';
    if (!formData.service_type) newErrors.service_type = 'اختر نوع الخدمة';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch('/backend/create-service-request.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        toast.success('تم إرسال الطلب بنجاح ✅');
        setFormData({ name: '', phone: '', service_type: '', details: '' });
        setShowFormModal(false);
      } else {
        toast.error(data.error || data.message || 'حدث خطأ');
      }
    } catch (error) {
      toast.error('خطأ في الاتصال');
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { value: string }>) => {
    setFormData({ ...formData, [field]: e.target.value });
    if (errors[field as keyof typeof errors]) {
      setErrors({ ...errors, [field as keyof typeof errors]: '' });
    }
  };
  // Featured books: EXACTLY 6 only (single row, home page only)
  const featuredBooks: Book[] = books
    .filter(book => book.badge)
    .slice(0, 6)
    .concat(books.filter(book => !book.badge).slice(0, 6 - books.filter(b => b.badge).length))
    .slice(0, 6); // Guarantee exactly 6
  const bgImages = [nevbar1, nevbar2, nevbar3, glassColors, pigmentColors];
  const heroImages = [nevbar1, nevbar2, nevbar3];
  const whyNagham = [
    { icon: Zap, title: '⚡ سرعة التنفيذ', desc: 'تنفيذ سريع بجودة عالية' },
    { icon: Palette, title: '🎨 تصميم احترافي', desc: 'تصميم عصري يعكس هويتك' },
    { icon: DollarSign, title: '💰 أسعار مناسبة', desc: 'جودة بأسعار تنافسية' },
    { icon: Headphones, title: '🛠 دعم فني', desc: 'دعم مستمر بعد التسليم' },
    { icon: Star, title: '⭐ خبرة طويلة', desc: 'سنوات خبرة ناجحة' }
  ];
  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/50 ${dir === 'rtl' ? 'rtl' : 'ltr'}`} dir={dir}>
      {/* Luxury Hero Section */}
      <section id="hero" className="relative min-h-[70vh] md:min-h-[80vh] lg:min-h-[90vh] flex items-center justify-center pt-[var(--navbar-height)] md:pt-[calc(var(--navbar-height)_+_1rem)] overflow-hidden">
        {/* Subtle Floating Lights */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/5 w-72 h-72 bg-gradient-radial from-purple-400/15 via-transparent to-transparent rounded-full blur-xl animate-float opacity-20 lg:block" />
          <div className="absolute bottom-1/3 right-1/5 w-80 h-80 bg-gradient-radial from-pink-400/12 via-transparent to-blue-400/8 rounded-full blur-2xl animate-[float_14s_ease-in-out_infinite_reverse] opacity-15 lg:block" />
          <div className="absolute top-2/3 left-1/3 w-64 h-64 bg-gradient-radial from-blue-400/10 via-transparent to-purple-400/10 rounded-full blur-xl animate-float opacity-10 lg:block" />
          
          {/* Floating Background Images */}
          <img src={nevbar1} alt="" className="absolute top-20 left-20 w-32 h-32 opacity-[0.2] blur-sm rotate-12 animate-pulse lg:block" />
          <img src={nevbar2} alt="" className="absolute bottom-32 right-20 w-40 h-40 opacity-[0.15] blur-sm -rotate-6 animate-bounce lg:block" />
          <img src={nevbar3} alt="" className="absolute top-1/2 -left-10 w-24 h-24 opacity-[0.1] blur-md scale-110 animate-ping lg:block" />
          <img src={glassColors} alt="" className="absolute bottom-20 left-1/3 w-28 h-28 opacity-[0.25] blur-sm rotate-[-15deg] animate-pulse lg:block" />
          <img src={pigmentColors} alt="" className="absolute top-1/3 right-1/4 w-20 h-20 opacity-[0.2] blur-md -rotate-3 animate-bounce lg:block" />
        </div>
        {/* Dynamic Fade Background Slider */}
        <div className="absolute inset-0">
          {bgImages.map((src, i) => (
            <motion.img
              key={i}
              src={src}
              alt=""
              className="absolute inset-0 w-full h-full object-cover brightness-[0.4] contrast-125"
              initial={{ opacity: 0 }}
              animate={{ opacity: i === bgIndex ? 1 : 0 }}
              transition={{ duration: 1.5 }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/70 to-black/80" />
        {/* Background Dots - Optional, hidden for clean look */}
        {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {bgImages.map((_, i) => (
            <button key={i} className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === bgIndex ? 'w-10 bg-white scale-110 shadow-md' : 'bg-white/60 hover:bg-white hover:scale-110'}`} onClick={() => setBgIndex(i)} />
          ))}
        </div> */}
        <div className="container px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mx-auto text-center relative z-20 max-w-6xl">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 40, scale: 0.95 },
              visible: { 
                opacity: 1, 
                y: 0, 
                scale: 1, 
                transition: { duration: 0.8, staggerChildren: 0.12, delayChildren: 0.2 }
              }
            }}
            className="backdrop-blur-md bg-white/10 border-white/30 shadow-xl hover:shadow-purple-400/25 rounded-3xl p-8 md:p-12 lg:p-16 max-w-5xl mx-auto group transition-all duration-500 hover:-translate-y-1"
          >
            <motion.div variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }} className="mb-8">
              <Badge className="px-6 py-3 text-lg font-bold bg-gradient-to-r from-purple-500/90 via-pink-500/80 to-blue-500/90 text-white shadow-md backdrop-blur-sm rounded-xl">
                نغم للفنون
              </Badge>
            </motion.div>
            <motion.h1 
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-6 leading-tight bg-gradient-to-r from-white via-purple-50 to-blue-50 bg-clip-text text-transparent drop-shadow-xl lg:drop-shadow-2xl group-hover:scale-[1.01] transition-transform"
            >
              {t("index.hero.nagham")}
              <br className="hidden md:block" />
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent font-light text-2xl lg:text-3xl">
                {t("index.hero.arts")}
              </span>
            </motion.h1>
            <motion.p 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="text-xl md:text-2xl lg:text-3xl mb-12 max-w-3xl mx-auto opacity-100 font-semibold leading-relaxed text-white drop-shadow-lg"
            >
              {t("index.hero.mission")}
            </motion.p>
            <motion.div 
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto justify-center items-stretch sm:items-center"
            >
              <motion.div variants={buttonVariants}>
                <Button 
                  onClick={() => scrollToSection('services')} 
className="primary-btn w-full sm:w-auto group px-10 py-7 lg:py-8 text-xl lg:text-2xl font-bold rounded-2xl bg-gradient-to-r from-purple-600 via-pink-500 to-purple-500 hover:from-purple-700 hover:via-pink-600 hover:to-purple-600 hover:scale-[1.03] hover:shadow-xl hover:shadow-purple-500/25 shadow-lg transition-all duration-300 flex items-center gap-3 justify-center backdrop-blur-sm border border-white/20 hover:border-white/40 active:scale-[0.98]"
                >
                  <span>تصفح الخدمات</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
              <motion.div variants={buttonVariants}>
                <Button 
                  variant="outline"
                  onClick={() => {
                    console.log('Button clicked! showFormModal:', !showFormModal);
                    setShowFormModal(true);
                  }}
className="primary-btn w-full sm:w-auto px-10 py-7 lg:py-8 text-xl lg:text-2xl font-bold rounded-2xl bg-gradient-to-r from-purple-600 via-pink-500 to-purple-500 hover:from-purple-700 hover:via-pink-600 hover:to-purple-600 hover:scale-[1.03] hover:shadow-xl hover:shadow-purple-500/25 shadow-lg transition-all duration-300 flex items-center gap-3 justify-center hover:-translate-y-1 group cursor-pointer relative overflow-hidden border border-transparent"
                >
                  <span>اطلب الآن</span>
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* All existing sections unchanged */}
      {/* Services */}
      <section id="services" className="py-24 md:py-32 lg:py-40 relative bg-gradient-to-b from-slate-50/80 via-white to-slate-50/50">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-24 md:mb-32 max-w-4xl mx-auto">
            <Badge className="inline-flex px-6 py-3 text-lg font-bold bg-gradient-to-r from-primary to-secondary text-primary-foreground mb-8 shadow-lg">
              {t("index.services.title")}
            </Badge>
            <motion.h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-slate-800 via-primary to-secondary bg-clip-text text-transparent drop-shadow-2xl" initial={{ scale: 0.95 }} whileInView={{ scale: 1 }}>
              {t("index.services.outstanding")}
              <br className="hidden lg:inline" />
              <span className="bg-gradient-to-r from-violet-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">{t("index.services.distinguished")}</span>
            </motion.h2>
            <motion.p className="text-xl md:text-2xl lg:text-3xl text-slate-600 max-w-2xl mx-auto leading-relaxed" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              {t("index.services.subtitle")}
            </motion.p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -16, scale: 1.03, rotateX: 2 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group cursor-pointer"
              >
                <div className="h-full p-8 md:p-10 lg:p-12 rounded-3xl bg-white shadow-xl hover:shadow-2xl hover:shadow-[0_25px_60px_rgba(0,0,0,0.15)] hover:shadow-purple-500/20 border border-slate-100 hover:border-primary/50 transition-all duration-500 overflow-hidden relative glass-card">
                  <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-700 ${service.color}`} />
                  <div className="relative z-10">
                    <div className="mx-auto mb-8 p-2 rounded-3xl bg-gradient-to-r from-white/50 to-white/80 backdrop-blur-sm border border-white/40 shadow-2xl max-w-80 group-hover:scale-105 transition-all duration-500">
                      <div className="flex gap-1 justify-center items-end -space-x-2 rtl:space-x-reverse">
                        {service.images.map((img, imgIndex) => (
                          <motion.img
                            key={imgIndex}
                            src={img}
                            alt=""
                            className={`object-cover rounded-2xl shadow-lg transition-all duration-500 border-4 border-white/50 ${imgIndex === 1 ? 'w-20 h-28 scale-110 z-10 shadow-2xl' : imgIndex === 0 ? 'w-16 h-20 z-20' : 'w-16 h-20 z-10'}`}
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            whileHover={{ scale: imgIndex === 1 ? 1.1 : 1.05 }}
                          />
                        ))}
                      </div>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black mb-6 text-center bg-gradient-to-r from-slate-800 via-primary to-secondary bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                      {service.title[lang]}
                    </h3>
                    <p className="text-lg md:text-xl text-slate-600 mb-10 text-center leading-relaxed px-4 max-w-md mx-auto">
                      {service.desc[lang]}
                    </p>
                    <Button
                      onClick={() => handleServiceOpen(service)}
className="primary-btn w-full py-6 rounded-2xl text-lg font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-purple-500 hover:from-purple-700 hover:via-pink-600 hover:to-purple-600 hover:scale-[1.03] hover:shadow-xl hover:shadow-purple-500/25 shadow-lg transition-all duration-300"
                      size="lg"
                    >
                      عرض الخدمة
                      <Sparkles className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Portfolio */}
      <section id="portfolio" className="py-24 md:py-32 lg:py-40 bg-slate-50/50">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-24 md:mb-32 max-w-4xl mx-auto">
            <Badge className="inline-flex px-6 py-3 text-lg font-bold bg-gradient-to-r from-orange-500 to-red-500 text-orange-foreground mb-8 shadow-lg">
              {t("index.portfolio.title")}
            </Badge>
            <motion.h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-slate-800 via-orange-500 to-red-600 bg-clip-text text-transparent drop-shadow-2xl" initial={{ scale: 0.95 }} whileInView={{ scale: 1 }}>
              أعمالنا
              <br className="hidden lg:inline" />
              <span className="text-transparent bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text">المميزة</span>
            </motion.h2>
            <motion.p className="text-xl md:text-2xl lg:text-3xl text-slate-600 max-w-2xl mx-auto leading-relaxed" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              {t("index.portfolio.desc")}
            </motion.p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-6 lg:gap-8 xl:gap-10">
            {portfolio.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                whileHover={{ scale: 1.04, y: -12, transition: { type: "spring", stiffness: 400, damping: 25 } }}
                className="group relative h-[22rem] lg:h-[28rem] xl:h-[30rem] overflow-hidden rounded-3xl shadow-2xl hover:shadow-[0_35px_80px_rgba(0,0,0,0.3)] hover:shadow-orange-500/20 border border-slate-100/50 backdrop-blur-sm bg-gradient-to-br from-slate-50/60 to-white/80 hover:from-slate-50 hover:to-white/90 cursor-pointer transition-all duration-700"
              >
                <motion.div className="absolute top-6 left-6 z-30 backdrop-blur-xl" initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ delay: index * 0.1 }}>
                  <Badge className="px-4 py-2 text-sm font-bold bg-white/95 text-slate-900 shadow-xl border border-slate-200/50 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition-all duration-300">
                    {t("index.portfolio.featured")}
                  </Badge>
                </motion.div>
                <div className="absolute inset-0">
                  <img src={project.images[0]} alt={project.title.ar} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-100 group-hover:brightness-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                </div>
                <motion.div className="absolute inset-0 bg-slate-900/5 backdrop-blur-xl flex flex-col justify-end p-8 md:p-10 lg:p-12 z-20 group-hover:bg-slate-900/15 transition-all duration-600" initial={{ opacity: 0, y: 40 }} whileHover={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                  <motion.div className="text-white drop-shadow-2xl" initial={{ opacity: 0, y: 30 }} whileHover={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
                    <h3 className="text-2xl lg:text-3xl xl:text-4xl font-black mb-3 lg:mb-4 leading-tight bg-gradient-to-r from-white to-slate-200/80 bg-clip-text">
                      {project.title[lang]}
                    </h3>
                    <p className="text-lg lg:text-xl xl:text-2xl text-slate-200/90 mb-6 lg:mb-8 font-medium leading-relaxed max-w-md">
                      {project.desc[lang]}
                    </p>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                      <Button onClick={(e) => { e.stopPropagation(); handleProjectOpen(project); }} className="px-8 lg:px-10 py-4 lg:py-5 text-lg lg:text-xl font-black bg-white/95 hover:bg-white text-slate-900 shadow-2xl hover:shadow-xl rounded-2xl border-2 border-white/50 backdrop-blur-xl transition-all duration-400" size="lg">
                        {t("index.portfolio.viewDetails")} <span className="ml-2 transition-transform group-hover:translate-x-1">{lang === 'ar' ? '←' : '→'}</span>
                      </Button>
                    </motion.div>
                  </motion.div>
                </motion.div>
                <motion.div className="absolute top-6 right-6 z-30" initial={{ scale: 0 }} whileInView={{ scale: 1 }}>
                  <div className="bg-slate-900/95 text-white text-xs px-3 py-1.5 rounded-full font-bold backdrop-blur-sm shadow-2xl border border-white/20">
                    {project.images.length} {t("index.portfolio.images")}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Featured Books */}
      <section id="books" className="py-24 md:py-32 lg:py-40 bg-gradient-to-b from-slate-50/70 via-white to-slate-50/30">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20 md:mb-28 lg:mb-32 max-w-4xl mx-auto">
            <Badge className="inline-flex px-6 py-3 text-lg font-bold bg-gradient-to-r from-naam-purple to-naam-gold text-primary-foreground mb-8 shadow-lg hover:shadow-naam-purple-glow">
              📚 {lang === 'ar' ? 'كتبنا' : 'Our Books'}
            </Badge>
            <motion.h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-slate-800 via-naam-purple to-naam-gold bg-clip-text text-transparent drop-shadow-2xl font-cairo" initial={{ scale: 0.95 }} whileInView={{ scale: 1 }}>
              {lang === 'ar' ? 'كتبنا' : 'Our Books'}
              <br className="hidden lg:inline" />
              <span className="text-transparent bg-gradient-to-r from-naam-purple via-naam-blue to-naam-gold bg-clip-text">المميزة</span>
            </motion.h2>
            <motion.p className="text-xl md:text-2xl lg:text-3xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-cairo" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              {lang === 'ar' ? 'اختر من مجموعتنا المدروسة بعناية لنجاحك الأكاديمي والدراسي المميز' : 'Choose from our carefully curated collection for your academic success'}
            </motion.p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {featuredBooks.map((book: Book, index: number) => (
              <motion.div key={book.id} initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: index * 0.1 }} whileHover={{ scale: 1.05, y: -8 }}>
                <ProductCard {...book} />
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="text-center mt-16 md:mt-20 lg:mt-24">
            <Link to="/books">
              <Button className="px-12 py-6 lg:py-7 text-xl lg:text-2xl font-bold rounded-2xl bg-gradient-to-r from-naam-purple via-naam-blue to-naam-gold hover:from-naam-purple/90 hover:shadow-naam-purple-glow shadow-2xl hover:shadow-2xl hover:scale-105 transition-all duration-500 font-cairo group" size="lg">
                {lang === 'ar' ? 'عرض المزيد' : 'View More'}
                <span className="ml-3 group-hover:translate-x-1.5 transition-transform">{lang === 'ar' ? '←' : '→'}</span>
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
      {/* Why Nagham */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20 md:mb-24">
            <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
              {t("index.why.title")}
            </h2>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto">
              {t("index.why.desc")}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8">
            {whyNagham.map((reason, index) => (
              <motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="p-8 rounded-3xl bg-white/70 backdrop-blur-xl border border-slate-200 hover:shadow-2xl hover:shadow-primary/25 hover:-translate-y-2 transition-all duration-500 text-center group">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                  <reason.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{reason.title}</h3>
                <p className="text-slate-600 leading-relaxed">{reason.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="py-24 md:py-32 text-center relative overflow-hidden bg-gradient-to-br from-primary via-purple-600 to-violet-700">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 container mx-auto px-4">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} className="max-w-4xl mx-auto">
            <motion.h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 drop-shadow-2xl text-white leading-tight">
              {t("index.cta.ready")}
            </motion.h2>
            <motion.p className="text-2xl md:text-3xl lg:text-4xl text-white/95 mb-12 max-w-3xl mx-auto drop-shadow-lg leading-relaxed">
              {t("index.cta.desc")}
            </motion.p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-stretch sm:items-center max-w-4xl mx-auto">
              <Button onClick={() => setShowFormModal(true)} size="lg" className="px-12 py-8 lg:py-10 text-2xl font-black bg-white shadow-2xl hover:shadow-glow hover:scale-105 rounded-3xl h-20 lg:h-auto transition-all duration-500 flex items-center gap-3 justify-center text-primary">
                {t("index.cta.order")}
                <Send className="w-7 h-7" />
              </Button>
              <Button variant="outline" size="lg" className="px-12 py-8 lg:py-10 text-2xl font-black border-4 border-white/50 bg-white/10 backdrop-blur-xl text-white hover:bg-white hover:text-primary shadow-2xl hover:shadow-glow rounded-3xl h-20 lg:h-auto transition-all duration-500 flex items-center gap-3 justify-center">
                تواصل واتساب
                <MessageCircle className="w-7 h-7" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {showFormModal && (
        <ServiceRequestModal 
          isOpen={showFormModal} 
          onClose={() => setShowFormModal(false)}
          services={services}
          lang={lang}
        />
      )}
      <ServiceModal service={selectedService} isOpen={!!selectedService} onClose={handleServiceClose} />
      <PortfolioModal project={selectedProject!} isOpen={showProjectModal} onClose={handleProjectClose} />
    </div>
  );
};

export default Index;
