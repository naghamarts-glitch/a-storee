import { Link } from "react-router-dom";
import { Phone, MessageCircle, MapPin, Clock, Facebook } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  const { t, lang } = useLanguage();

  return (
<footer className="bg-background dark:bg-card border-t dark:border-border text-foreground dark:text-foreground py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* 1. About Company */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img
                src={logo}
                alt="Nagham Arts"
                className="h-12 w-12 object-contain rounded-lg shadow-md"
              />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                نغم للفنون
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6 text-base">
              {lang === "ar"
                ? "مكتبة متخصصة في توفير خامات التربية الفنية والاقتصاد المنزلي والكتب الدراسية والخدمات الأكاديمية."
                : "Specialized store for art supplies, home economics materials, textbooks, and academic services."
              }
            </p>
            <p className="dark:text-muted-foreground-secondary text-slate-500 text-sm flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5" />
              سوهاج – الشرق – خلف الجامعة القديمة
            </p>
          </div>

          {/* 2. Services */}
          <div>
              <h3 className="text-xl font-bold text-foreground mb-6">الخدمات</h3>
            <div className="space-y-3">
              <Link to="/services" className="block text-slate-600 hover:text-primary hover:underline decoration-2 underline-offset-4 text-sm font-medium transition-all duration-200 group">
                <span>رسائل الماجستير ومشاريع التخرج</span>
              </Link>
              <Link to="/services" className="block text-slate-600 hover:text-primary hover:underline decoration-2 underline-offset-4 text-sm font-medium transition-all duration-200 group">
                <span>تصميم المواقع الإلكترونية</span>
              </Link>
              <Link to="/services" className="block text-slate-600 hover:text-primary hover:underline decoration-2 underline-offset-4 text-sm font-medium transition-all duration-200 group">
                <span>الطباعة والتصوير</span>
              </Link>
              <Link to="/books" className="block text-slate-600 hover:text-primary hover:underline decoration-2 underline-offset-4 text-sm font-medium transition-all duration-200 group">
                <span>الكتب الدراسية</span>
              </Link>
            </div>
          </div>

          {/* 3. Contact */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-6">تواصل معنا</h3>
            <div className="space-y-4">
              <a href="tel:01099817790" className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-all duration-200 group">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">الهاتف</p>
                  <p className="text-slate-600">010 9981 7790</p>
                </div>
              </a>
              
              <a href="https://wa.me/201121688248" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-all duration-200 group">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">واتساب</p>
                  <p className="text-slate-600">0112 168 8248</p>
                </div>
              </a>

              <div className="flex gap-3 pt-2">
                <a href="https://www.facebook.com/share/18dnXqgEsS/" target="_blank" rel="noreferrer" className="w-12 h-12 bg-slate-100 hover:bg-primary hover:text-white rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200 group">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61569051526622" target="_blank" rel="noreferrer" className="w-12 h-12 bg-slate-100 hover:bg-primary hover:text-white rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200 group">
                  <Facebook className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200 mt-12 mb-8"></div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© 2026 نغم للفنون. جميع الحقوق محفوظة.</p>
          <p>تصميم وتطوير: مروان محمد احمد | 01127214631</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

