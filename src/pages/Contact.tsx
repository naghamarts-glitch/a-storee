import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Phone, Mail, MapPin, Clock, MessageCircle, Facebook, Send, ChevronDown, ChevronUp, User, FileQuestion, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { lang } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", phone: "", type: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const whatsappUrl = `https://wa.me/201121688248?text=${encodeURIComponent("مرحبًا، أريد الاستفسار عن خدماتكم")}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setFormData({ name: "", phone: "", type: "", message: "" });
    }, 3000);
    toast({ title: "تم الإرسال بنجاح!" });
  };

  const inquiryTypes = ["طلب خدمة", "استفسار", "شكوى", "اقتراح"];

  const faqs = [
    { q: "هل يمكن طلب الخدمات أونلاين؟", a: "نعم، اطلب من الموقع أو ادفع عربون للأولوية." },
    { q: "هل يوجد توصيل للكتب؟", a: "نعم، استلام أو توصيل متاح." },
    { q: "كيف أرفع الملفات؟", a: "عبر النموذج أو WhatsApp." }
  ];

  const contactInfo = [
    { icon: Phone, title: "رقم الهاتف", value: "01099817790 • 01121688248" },
    { icon: Mail, title: "البريد", value: "info@naghamarts.com" },
    { icon: MapPin, title: "العنوان", value: "شرق سوهاج – قسم ثان سوهاج" },
    { icon: Clock, title: "المواعيد", value: "السبت - الخميس 10ص - 10م" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-secondary pt-32 pb-32 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-secondary/90" />
        <div className="container mx-auto px-4 text-center relative z-10 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="arabic-title text-5xl md:text-7xl font-black drop-shadow-2xl mb-6 leading-tight"
          >
            تواصل معنا بسهولة
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl font-medium drop-shadow-lg mb-12 max-w-2xl mx-auto"
          >
            نحن هنا لمساعدتك والإجابة على جميع استفساراتك
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto"
          >
            <motion.a 
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              className="group flex items-center gap-3 px-8 py-4 bg-green-500 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-green-500/50 transition-all duration-300 min-w-[220px] justify-center"
            >
              <MessageCircle className="w-6 h-6 group-hover:animate-bounce" />
              واتساب مباشر
            </motion.a>
            <motion.button 
              whileHover={{ scale: 1.05, y: -2 }}
              className="px-8 py-4 border-2 border-white text-white font-bold text-lg rounded-2xl shadow-2xl hover:bg-white hover:text-primary transition-all duration-300 min-w-[220px]"
            >
              إرسال رسالة
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="container mx-auto px-4 py-24 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Form Column */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card dark:bg-card rounded-3xl shadow-xl dark:shadow-2xl p-12 lg:p-16 border border-border/20"
            >
            <h3 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
              <Send className="w-10 h-10 text-primary" />
              أرسل رسالتك
            </h3>
            {formSent ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-green-100 flex items-center justify-center">
                  <Send className="w-12 h-12 text-green-600" />
                </div>
                <h4 className="text-2xl font-bold mb-2">تم الإرسال!</h4>
                <p className="text-muted-foreground">سنرد عليك قريبًا</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      required
                      placeholder="الاسم الكامل"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border bg-muted/20 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-lg"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="tel"
                      placeholder="رقم الهاتف"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border bg-muted/20 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-lg"
                      dir="ltr"
                    />
                  </div>
                  <div className="relative">
                    <FileQuestion className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border bg-muted/20 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-lg appearance-none"
                    >
                      <option value="">نوع الخدمة</option>
                      {inquiryTypes.map(type => <option key={type}>{type}</option>)}
                    </select>
                  </div>
                  <textarea
                    required
                    placeholder="رسالتك..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={5}
                    className="w-full px-12 py-4 rounded-2xl border border-border bg-muted/20 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-lg resize-vertical"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  className="w-full py-5 bg-primary text-primary-foreground font-bold text-xl rounded-2xl shadow-xl hover:shadow-primary/25 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Send className="w-6 h-6" />
                  إرسال الرسالة
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Info Cards Column */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8 lg:self-start"
          >
            <h3 className="text-3xl font-bold text-foreground mb-12 text-center lg:text-left">
              معلومات التواصل
            </h3>
            {contactInfo.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group flex items-start gap-6 p-8 bg-card dark:bg-muted rounded-2xl border border-border/50 hover:border-primary/50 hover:shadow-lg dark:hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 cursor-pointer"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center shrink-0 mt-1 group-hover:scale-110 transition-all">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-xl text-foreground group-hover:text-primary mb-1">
                    {item.title}
                  </h4>
                  <p className="text-lg text-foreground/80 group-hover:text-foreground">
                    {item.value}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Green WhatsApp CTA */}
      <section className="py-24 bg-gradient-to-r from-green-500 to-green-600 text-white mt-32">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg"
          >
            جاهز تبدأ؟
          </motion.h2>
          <p className="text-xl mb-12 opacity-95">
            تواصل معنا الآن عبر واتساب وابدأ مشروعك مع مركز نغم للفنون
          </p>
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-3 px-12 py-6 bg-white text-green-600 font-bold text-xl rounded-2xl shadow-2xl hover:shadow-white/50 hover:-translate-y-1 transition-all duration-300 group"
          >
            <MessageCircle className="w-7 h-7 group-hover:animate-bounce" />
            تواصل عبر واتساب الآن
          </motion.a>
        </div>
      </section>

      {/* Map */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center mb-16 gradient-text"
          >
            ابحث عنا
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-border/20"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3578.5!2d31.7!3d26.55!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDMzJzAwLjAiTiAzMcKwNDInMDAuMCJF!5e0!3m2!1sar!2seg!4v1"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="w-full h-[500px] md:h-[600px]"
            />
          </motion.div>
        </div>
      </section>

      {/* Social */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-16 gradient-text"
          >
            تابعنا
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-6 max-w-md mx-auto">
            <motion.a href="https://wa.me/201121688248" target="_blank" whileHover={{ scale: 1.05 }} className="flex items-center gap-3 px-8 py-4 bg-green-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-green-500/50 transition-all">
              <MessageCircle className="w-5 h-5" />
              واتساب
            </motion.a>
            <motion.a href="tel:01099817790" whileHover={{ scale: 1.05 }} className="flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-2xl shadow-lg hover:shadow-primary/50 transition-all">
              <Phone className="w-5 h-5" />
              اتصال
            </motion.a>
            <motion.a href="https://facebook.com" target="_blank" whileHover={{ scale: 1.05 }} className="flex items-center gap-3 px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-blue-500/50 transition-all">
              <Facebook className="w-5 h-5" />
              فيسبوك
            </motion.a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 py-24 max-w-4xl">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-20 gradient-text arabic-title"
        >
          الأسئلة الشائعة
        </motion.h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl shadow-md dark:shadow-xl border border-border/20 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full p-8 text-left font-bold text-xl hover:bg-muted/50 transition-colors flex items-center justify-between"
              >
                {faq.q}
                <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }}>
                  <ChevronDown className="w-6 h-6 ml-4 shrink-0" />
                </motion.div>
              </button>
              {openFaq === i && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="overflow-hidden"
                >
                  <p className="p-8 pt-0 text-lg text-muted-foreground border-t border-border/50">
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Floating WhatsApp */}
      <motion.a
        href={whatsappUrl}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-green-500 text-white rounded-full shadow-2xl hover:shadow-green-500/50 hover:scale-110 transition-all flex items-center justify-center"
        whileHover={{ y: -4 }}
        target="_blank"
      >
        <MessageCircle className="w-8 h-8" />
      </motion.a>
    </div>
  );
};

export default Contact;

