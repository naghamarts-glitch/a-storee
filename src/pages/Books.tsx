import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Search, BookOpen, MessageCircle } from "lucide-react";
import ProductCard, { Book } from "@/components/ProductCard";
import { books, getFilteredBooks } from "@/data/books";
import heroBg from '@/assets/products/nevbar3.png';

const grades = [
  { key: "1", ar: "الصف الأول الثانوي", en: "First Secondary" },
  { key: "2", ar: "الصف الثاني الثانوي", en: "Second Secondary" },
  { key: "3", ar: "الصف الثالث الثانوي", en: "Third Secondary" },
  { key: "all", ar: "الكل", en: "All" },
];

const Books = () => {
  const { lang } = useLanguage();
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredBooks = useMemo(() => 
    getFilteredBooks(selectedGrade === "all" ? undefined : selectedGrade, search),
    [selectedGrade, search]
  );

  const SkeletonCard = () => (
    <div className="glass-card overflow-hidden animate-pulse rounded-2xl">
      <div className="aspect-square bg-muted/50 rounded-t-2xl"></div>
      <div className="p-6 space-y-3">
        <div className="h-5 bg-muted rounded w-4/5"></div>
        <div className="h-4 bg-muted/80 rounded w-2/5"></div>
        <div className="h-10 bg-gradient-to-r from-muted/60 to-muted rounded-xl"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 py-12">
        {/* Books Hero Section */}
        <motion.div
          className="relative w-full h-[70vh] md:h-[65vh] lg:h-[70vh] rounded-3xl -mx-4 lg:mx-0 mb-12 lg:mb-16 overflow-hidden shadow-2xl"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80 backdrop-blur-sm" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6 py-12">
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-black mb-4 md:mb-6 drop-shadow-2xl bg-gradient-to-r from-white via-yellow-300/90 to-orange-400/90 bg-clip-text text-transparent font-cairo leading-none tracking-tight"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {lang === 'ar' ? 'الكتب' : 'Books'}
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl lg:text-2xl max-w-xl mx-auto opacity-95 font-semibold font-cairo leading-relaxed px-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {lang === 'ar' ? 'اكتشف مجموعتنا الشاملة من الكتب التعليمية للثانوية العامة' : 'Discover our comprehensive collection of high school educational books'}
            </motion.p>
          </div>
        </motion.div>

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-center mb-12 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-naam-purple/10 to-naam-blue/10 border border-naam-purple/20 mb-6 backdrop-blur-sm">
            <BookOpen className="w-6 h-6 text-naam-purple" />
            <span className="font-semibold text-naam-purple font-cairo">{lang === "ar" ? "متجر الكتب التعليمية" : "Educational Books Store"}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-naam-purple via-naam-blue to-naam-gold bg-clip-text text-transparent mb-6 font-cairo">
            {lang === "ar" ? "كتب الثانوية العامة • مركز نغم للفنون" : "High School Books • Nagham Arts Center"}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-cairo">
            {lang === "ar" ? "تصفح مجموعة شاملة من الكتب الدراسية الاحترافية. فلاتر ذكية، بحث فوري، وطلب مباشر عبر واتساب مع رسائل جاهزة." : "Browse our comprehensive collection of professional textbooks. Smart filters, instant search, and direct WhatsApp ordering with pre-filled messages."}
          </p>
        </motion.div>

        {/* Controls */}
        <div className="max-w-4xl mx-auto mb-16 space-y-8">
          {/* Search */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground/70 w-5 h-5" />
            <input
              type="text"
              placeholder={lang === "ar" ? "ابحث عن كتاب أو مادة..." : "Search by book or subject..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-16 pr-6 py-5 rounded-3xl bg-card/70 backdrop-blur-md border-2 border-border/30 text-foreground placeholder:text-muted-foreground/80 focus:outline-none focus:ring-4 focus:ring-naam-purple/20 focus:border-naam-purple/40 transition-all duration-300 text-lg font-cairo shadow-2xl hover:shadow-3xl hover:border-naam-purple/50"
            />
          </motion.div>

          {/* Grade Filters */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="flex flex-wrap gap-4 justify-center"
          >
            {grades.map((g) => (
              <motion.button
                key={g.key}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedGrade(g.key)}
                className={`px-8 py-4 rounded-2xl text-base font-bold transition-all duration-300 shadow-xl group ${
                  selectedGrade === g.key
                    ? "bg-gradient-to-r from-naam-purple to-naam-blue text-white ring-4 ring-naam-purple/40 shadow-naam-purple-glow hover:shadow-naam-purple-glow-lg"
                    : "glass-card text-foreground/90 hover:text-foreground bg-background/60 hover:bg-background/80 hover:shadow-2xl hover:ring-2 hover:ring-naam-purple/30 border border-border/50"
                } font-cairo`}
              >
                <span className={`transition-opacity ${selectedGrade === g.key ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`}>
                  {lang === "ar" ? g.ar : g.en}
                </span>
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Books Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-7xl mx-auto"
        >
          {loading ? (
            <>
              <p className="text-2xl font-bold text-center mb-12 font-cairo text-naam-purple animate-pulse">
                {lang === "ar" ? "جاري التحميل..." : "Loading..."}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
                {Array.from({ length: 20 }, (_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            </>
          ) : filteredBooks.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              className="text-center py-32 max-w-md mx-auto"
            >
              <div className="w-28 h-28 bg-muted/30 rounded-3xl flex items-center justify-center mx-auto mb-8 backdrop-blur-sm shadow-2xl">
                <Search className="w-14 h-14 text-muted-foreground/50" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-4 font-cairo">
                {lang === "ar" ? "لا توجد نتائج" : "No results found"}
              </h3>
              <p className="text-xl text-muted-foreground mb-8 font-cairo leading-relaxed">
                {lang === "ar" ? "جرب تعديل كلمات البحث أو اختيار فلتر آخر" : "Try adjusting your search terms or selecting a different filter"}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  setSearch('');
                  setSelectedGrade('all');
                }}
                className="px-8 py-4 bg-gradient-to-r from-naam-purple to-naam-blue text-white rounded-2xl font-bold shadow-lg hover:shadow-naam-purple-glow transition-all font-cairo"
              >
                {lang === "ar" ? "مسح الفلاتر" : "Clear Filters"}
              </motion.button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
              <AnimatePresence>
                {filteredBooks.map((book: Book, i: number) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.6, delay: i * 0.04 }}
                    layout
                    className="group"
                  >
                    <ProductCard
                      {...book}
                      delay={i * 0.04}
                      whatsappMode={true}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>

        {/* Stats & CTA */}
        {!loading && filteredBooks.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="text-center mt-24 pt-16 border-t-4 border-gradient-to-r border-naam-purple/20 bg-gradient-to-b from-transparent via-background/50 to-card/50 rounded-3xl backdrop-blur-sm py-12 -mx-4 lg:-mx-8"
          >
            <div className="max-w-4xl mx-auto">
              <p className="text-4xl font-black bg-gradient-to-r from-naam-purple via-naam-blue to-naam-gold bg-clip-text text-transparent mb-4 font-cairo tracking-tight">
                {filteredBooks.length}
              </p>
              <p className="text-2xl font-bold text-foreground mb-6 font-cairo">
                {lang === "ar" ? "كتاب دراسي متاح للطلب الفوري" : "textbooks available for instant order"}
              </p>
              <motion.a
                href="https://wa.me/201121688248"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-10 py-6 bg-gradient-to-r from-naam-purple via-naam-blue to-naam-gold text-white/95 text-xl font-black rounded-3xl shadow-2xl hover:shadow-naam-purple-glow-lg hover:from-naam-purple/90 hover:to-naam-gold/90 transition-all duration-500 font-cairo tracking-wide"
              >
                <MessageCircle className="w-7 h-7" />
                {lang === "ar" ? "اطلب عبر واتساب" : "Order via WhatsApp"}
              </motion.a>
              <p className="text-lg text-muted-foreground/80 mt-6 font-cairo max-w-xl mx-auto">
                {lang === "ar" ? "توصيل سريع • دفع عند الاستلام • ضمان الجودة" : "Fast delivery • Cash on delivery • Quality guarantee"}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Books;

