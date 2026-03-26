import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, MessageCircle } from "lucide-react";
import { toast } from "sonner";

export interface Book {
  id: string;
  name: string;
  nameEn: string;
  price: number | null;
  image?: string;
  grade: '1' | '2' | '3';
  badge?: 'hot' | 'new';
  fullName: string;
}

interface ProductCardProps {
  id: string;
  name: string;
  nameEn: string;
  price: number | null;
  image?: string;
  delay?: number;
  whatsappMode?: boolean;
  badge?: 'hot' | 'new';
  fullName?: string;
}

const ProductCard = ({ id, name, nameEn, price, image, delay = 0, whatsappMode, badge, fullName }: ProductCardProps) => {
  const { lang } = useLanguage();
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem({ id, name, nameEn, price: price || 0 });
    toast.success(lang === "ar" ? "تمت الإضافة للسلة" : "Added to cart");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className="glass-card overflow-hidden group cursor-pointer dark:dark-card-hover"
    >
      <div className="aspect-square bg-muted/50 flex items-center justify-center overflow-hidden">
        {image ? (
          <img src={image} alt={lang === "ar" ? name : nameEn} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
        ) : (
          <div className="w-20 h-20 rounded-2xl gradient-bg opacity-20" />
        )}
      </div>
      <div className="p-4">
        {badge && (
          <div className="absolute top-2 end-2 z-10">
            <span className={`px-2 py-1 rounded-full text-xs font-bold text-white shadow-lg ${
              badge === 'hot' ? 'bg-red-500' : 'bg-blue-500'
            }`}>
              {badge === 'hot' ? '🔥 الأكثر طلباً' : 'جودة عالية'}
            </span>
          </div>
        )}
        <h3 className="font-semibold text-foreground text-sm mb-1 line-clamp-2">
          {lang === "ar" ? name : nameEn}
        </h3>
        <p className="text-muted-foreground text-sm">{lang === "ar" ? "اتصل للسعر" : "Call for price"}</p>
        <div className="flex gap-2 mt-3">
          <a
            href={`https://wa.me/201121688248?text=${encodeURIComponent('مرحبا، أريد طلب: ' + (fullName || name))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#22c55e] to-green-600 text-white text-xs font-bold text-center hover:from-emerald-600 hover:to-green-600 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            اطلب واتساب
          </a>
          <button
            onClick={handleAdd}
            className="px-3 py-2.5 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-purple-600 text-primary-foreground text-xs font-bold hover:from-violet-600 hover:to-purple-700 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-1"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            سلة
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;

