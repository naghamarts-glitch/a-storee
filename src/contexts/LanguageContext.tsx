import React, { createContext, useContext, useState, useEffect } from "react";

type Lang = "ar" | "en";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
  dir: "rtl" | "ltr";
}

const translations: Record<string, Record<Lang, string>> = {
  "index.hero.nagham": { ar: "مركز نغم", en: "Nagham Center" },
  "index.hero.arts": { ar: "للفنون", en: "for Arts" },
  "index.hero.mission": { ar: "رسالتنا تقديم خدمات الفنون والتعليم والخدمات الرقمية بأعلى معايير الاحترافية", en: "Our mission is to provide arts, education, and digital services with the highest professional standards" },
  "index.services.title": { ar: "خدماتنا المتميزة", en: "Our Distinguished Services" },
  "index.services.subtitle": { ar: "مجموعة شاملة من الخدمات الفنية والرقمية والأكاديمية بأعلى جودة واحترافية", en: "Comprehensive art, digital, and academic services of the highest quality and professionalism" },
  "index.portfolio.title": { ar: "أعمالنا", en: "Our Works" },
  "index.portfolio.subtitle": { ar: "أعمالنا المميزة", en: "Our Distinguished Works" },
  "index.portfolio.desc": { ar: "نماذج من مشاريعنا الناجحة التي تعكس جودة عملنا الاحترافي", en: "Samples of our successful projects that reflect our professional work quality" },
  "index.why.title": { ar: "لماذا تختار نغم", en: "Why Choose Nagham" },
  "index.why.desc": { ar: "نجمع بين الخبرة والإبداع لتقديم أفضل الحلول", en: "We combine experience and creativity to deliver the best solutions" },
  "index.cta.ready": { ar: "جاهز للبدء؟", en: "Ready to Start?" },
  "index.cta.desc": { ar: "اطلب خدمتك الآن واستمتع بتجربة احترافية لا مثيل لها", en: "Order your service now and enjoy an unmatched professional experience" },
  "index.cta.order": { ar: "اطلب الآن", en: "Order Now" },
  "index.cta.whatsapp": { ar: "تواصل واتساب", en: "WhatsApp" },
  "index.services.outstanding": { ar: "خدماتنا", en: "Our Services" },
  "index.services.distinguished": { ar: "المتميزة", en: "Distinguished" },
  "index.portfolio.distinguished": { ar: "المميزة", en: "Distinguished" },
  "index.portfolio.featured": { ar: "مشروع مميز", en: "Featured Project" },
  "index.portfolio.viewDetails": { ar: "عرض التفاصيل", en: "View Details" },
  "index.portfolio.images": { ar: "صور", en: "Images" },
  "index.why.speed": { ar: "⚡ سرعة التنفيذ", en: "⚡ Fast Execution" },
  "index.why.speed.desc": { ar: "تنفيذ سريع بجودة عالية", en: "Fast execution with high quality" },
  "index.why.design": { ar: "🎨 تصميم احترافي", en: "🎨 Professional Design" },
  "index.why.design.desc": { ar: "تصميم عصري يعكس هويتك", en: "Modern design that reflects your identity" },
  "index.why.price": { ar: "💰 أسعار مناسبة", en: "💰 Affordable Prices" },
  "index.why.price.desc": { ar: "جودة بأسعار تنافسية", en: "Quality at competitive prices" },
  "index.why.support": { ar: "🛠 دعم فني", en: "🛠 Technical Support" },
  "index.why.support.desc": { ar: "دعم مستمر بعد التسليم", en: "Ongoing support after delivery" },
  "index.why.experience": { ar: "⭐ خبرة طويلة", en: "⭐ Long Experience" },
  "index.why.experience.desc": { ar: "سنوات خبرة ناجحة", en: "Years of successful experience" },
  "index.form.title": { ar: "اطلب خدمتك الآن", en: "Request Your Service Now" },
  "index.form.name": { ar: "الاسم الكامل", en: "Full Name" },
  "index.form.phone": { ar: "رقم الواتساب", en: "WhatsApp Number" },
  "index.form.service": { ar: "نوع الخدمة", en: "Service Type" },
  "index.form.details": { ar: "تفاصيل الطلب", en: "Request Details" },
  "index.form.submit": { ar: "📤 إرسال الطلب", en: "📤 Send Request" },
  "index.form.submitting": { ar: "⏳ جاري الإرسال...", en: "⏳ Sending..." },
  "index.footer.rights": { ar: "© 2026 مركز نغم للفنون - جميع الحقوق محفوظة", en: "© 2026 Nagham Arts Center - All Rights Reserved" },
  "index.footer.store": { ar: "مكتبة متخصصة في الفنون والخدمات الرقمية", en: "Specialized library in arts and digital services" },
  "index.footer.support24": { ar: "خدمة العملاء على مدار 24 ساعة", en: "24/7 customer service" },

  "nav.home": { ar: "الرئيسية", en: "Home" },
  "nav.shop": { ar: "المتجر", en: "Shop" },
  "nav.services": { ar: "الخدمات", en: "Services" },
  "nav.books": { ar: "الكتب", en: "Books" },
  "nav.about": { ar: "من نحن", en: "About" },
  "nav.contact": { ar: "تواصل معنا", en: "Contact" },
  "nav.cart": { ar: "السلة", en: "Cart" },
  "hero.title": { ar: "نغم للفنون", en: "Nagham Arts" },
  "hero.subtitle": { ar: "وجهتك الأولى لخامات الفنون والتعليم والخدمات الاحترافية", en: "Your destination for art supplies, education & professional services" },
  "hero.browse": { ar: "تصفح المنتجات", en: "Browse Products" },
  "hero.order": { ar: "اطلب خدمة", en: "Order Service" },
  "sections.art": { ar: "خامات التربية الفنية", en: "Art Education Supplies" },
  "sections.art.desc": { ar: "ألوان، أخشاب، خيوط، أدوات رسم وأكثر", en: "Colors, wood, threads, drawing tools & more" },
  "sections.home_ec": { ar: "خامات الاقتصاد المنزلي", en: "Home Economics Supplies" },
  "sections.home_ec.desc": { ar: "خيوط، إبر، أقمشة، أدوات خياطة وتطريز", en: "Threads, needles, fabrics, sewing & embroidery tools" },
  "sections.books": { ar: "كتب الثانوية العامة", en: "High School Books" },
  "sections.books.desc": { ar: "احجز كتبك الدراسية أونلاين بسهولة", en: "Book your textbooks online easily" },
  "sections.summaries": { ar: "ملخصات المرحلة الإعدادية", en: "Prep School Summaries" },
  "sections.summaries.desc": { ar: "ملخصات شاملة لجميع المراحل الإعدادية", en: "Comprehensive summaries for all prep stages" },
  "sections.thesis": { ar: "رسائل الماجستير والدكتوراه", en: "Thesis & Dissertation Services" },
  "sections.thesis.desc": { ar: "كتابة وتنسيق ومراجعة الرسائل العلمية", en: "Writing, formatting & reviewing academic papers" },
  "sections.web": { ar: "مواقع ويب ومشاريع تخرج", en: "Websites & Graduation Projects" },
  "sections.web.desc": { ar: "تصميم وتطوير مواقع ومشاريع برمجية", en: "Design & develop websites & software projects" },
  "footer.rights": { ar: "© 2026 نغم للفنون. جميع الحقوق محفوظة", en: "© 2026 Nagham Arts. All rights reserved" },
  "footer.design": { ar: "تصميم وتطوير: مروان محمد", en: "Design & Development: Marwan Mohamed" },
  "footer.address": { ar: "شرق سوهاج، قسم ثان، محافظة سوهاج", en: "East Sohag, Second District, Sohag Governorate" },
  "footer.hours": { ar: "السبت - الخميس | الجمعة مغلق", en: "Saturday - Thursday | Friday Closed" },
  "about.title": { ar: "من نحن", en: "About Us" },
  "about.desc": { ar: "نغم للفنون هي مكتبة شاملة متخصصة في توفير خامات التربية الفنية والاقتصاد المنزلي، الكتب الدراسية، خدمات الطباعة والتنسيق الأكاديمي، وتطوير المواقع الإلكترونية.", en: "Nagham Arts is a comprehensive store specializing in art & home economics supplies, textbooks, academic printing & formatting services, and web development." },
  "contact.title": { ar: "تواصل معنا", en: "Contact Us" },
  "contact.phone": { ar: "الهاتف", en: "Phone" },
  "contact.whatsapp": { ar: "واتساب", en: "WhatsApp" },
  "contact.address": { ar: "العنوان", en: "Address" },
  "contact.hours": { ar: "مواعيد العمل", en: "Working Hours" },
  "payment.title": { ar: "طرق الدفع", en: "Payment Methods" },
  "payment.cash": { ar: "الدفع عند الاستلام", en: "Cash on Delivery" },
  "payment.vodafone": { ar: "فودافون كاش", en: "Vodafone Cash" },
  "nav.login": { ar: "تسجيل الدخول", en: "Login" },
  "nav.settings": { ar: "الإعدادات", en: "Settings" },
  "nav.logout": { ar: "تسجيل الخروج", en: "Logout" },
  "shop.addToCart": { ar: "أضف للسلة", en: "Add to Cart" },
  "shop.currency": { ar: "جنيه", en: "EGP" },
  "cart.title": { ar: "سلة التسوق", en: "Shopping Cart" },
  "cart.empty": { ar: "السلة فارغة", en: "Your cart is empty" },
  "cart.total": { ar: "الإجمالي", en: "Total" },
  "cart.checkout": { ar: "إتمام الشراء", en: "Checkout" },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>("ar");
  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [lang, dir]);

  const t = (key: string) => translations[key]?.[lang] || key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
