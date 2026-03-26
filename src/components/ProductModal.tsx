import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { X, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ProductModalProduct {
  id: string;
  name: string;
  nameEn: string;
  price: number | null;
  image?: string;
  images?: string[];
  badge?: 'hot' | 'new';
}

interface ProductModalProps {
  product?: ProductModalProduct;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  const [currentIndex, setCurrentIndex] = useState(0);
  const images = product.images?.length ? product.images : [product.image || '', '/public/placeholder.svg', '/public/placeholder.svg'];

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const goToImage = useCallback((index: number) => setCurrentIndex(index), []);

  const whatsappUrl = `https://wa.me/201121688248?text=مرحبا، أريد طلب: ${encodeURIComponent(product.name)}`;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-2xl flex items-center justify-center z-50 p-4 md:p-8" dir="rtl" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        className="bg-white/95 backdrop-blur-3xl rounded-3xl shadow-2xl border border-white/60 w-full max-w-6xl max-h-[95vh] overflow-hidden mx-auto my-8 max-md:max-w-[98vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl border-b border-slate-200/80 p-6 md:p-8 lg:p-12">
          <div className="flex items-center justify-between">
            <motion.h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
              {product.name}
              {product.badge && (
                <span className={`ml-3 px-3 py-1 rounded-full text-sm font-bold text-white ${
                  product.badge === 'hot' ? 'bg-red-500' : 'bg-blue-500'
                }`}>
                  {product.badge === 'hot' ? '🔥 الأكثر طلباً' : 'جودة عالية'}
                </span>
              )}
            </motion.h1>
            <Button variant="ghost" size="sm" onClick={onClose} className="h-12 w-12 rounded-2xl p-0 hover:bg-slate-200 shadow-lg border border-slate-200">
              <X className="w-6 h-6" />
            </Button>
          </div>
          <motion.p className="text-lg md:text-xl text-slate-700 mt-3 opacity-90" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            اتصل للسعر • جودة مضمونة • توصيل سريع
          </motion.p>
        </div>

        <div className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden bg-slate-50/50">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`${product.name} ${currentIndex + 1}`}
              className="max-h-[95%] max-w-[95%] object-cover rounded-2xl shadow-2xl border-4 border-white/70 mx-auto hover:brightness-105 transition-all duration-500 cursor-zoom-in"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, type: "spring" }}
            />
          </AnimatePresence>

          <motion.button 
            onClick={goToPrevious}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 bg-white/95 hover:bg-white shadow-2xl border-4 border-white/70 backdrop-blur-xl rounded-3xl p-0 z-40 group hover:scale-110 transition-all duration-400"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-6 h-6 text-slate-700 group-hover:text-emerald-600" />
          </motion.button>

          <motion.button 
            onClick={goToNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 bg-white/95 hover:bg-white shadow-2xl border-4 border-white/70 backdrop-blur-xl rounded-3xl p-0 z-40 group hover:scale-110 transition-all duration-400"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-6 h-6 text-slate-700 group-hover:text-emerald-600" />
          </motion.button>

          <motion.div 
            className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/95 backdrop-blur-xl px-6 py-2 rounded-2xl text-white text-lg font-bold shadow-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            {currentIndex + 1} / {images.length}
          </motion.div>
        </div>

        <div className="px-6 md:px-12 py-8 bg-slate-50/50 backdrop-blur-sm">
          <div className="flex gap-3 pb-4 overflow-x-auto snap-x snap-mandatory scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
            {images.slice(0, 3).map((imgSrc, index) => (
              <motion.button
                key={index}
                className={`flex-shrink-0 w-20 h-16 md:w-28 md:h-20 rounded-2xl overflow-hidden shadow-lg border-3 transition-all duration-500 snap-center ${index === currentIndex ? 'ring-4 ring-emerald-500/50 border-emerald-500 scale-105' : 'border-slate-200 hover:border-emerald-400 hover:scale-105'}`}
                onClick={() => goToImage(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <img src={imgSrc} alt={`Thumb ${index + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
              </motion.button>
            ))}
          </div>
        </div>

        <div className="p-6 md:p-8 border-t border-slate-200 bg-white/90 backdrop-blur-xl">
          <div className="text-center mb-6">
            <p className="text-3xl md:text-4xl font-black text-slate-900">
              {product.price ? `${product.price} جنيه` : 'اتصل للسعر'}
            </p>
            <p className="text-emerald-600 text-xl font-semibold mt-2">جودة عالية • شحن سريع</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-xl py-4 px-6 font-bold rounded-3xl shadow-2xl hover:shadow-[0_20px_40px_rgba(16,185,129,0.4)] hover:scale-[1.02] transition-all duration-500 flex items-center justify-center gap-3 text-white"
            >
              <MessageCircle className="w-6 h-6" />
              اطلب واتساب
            </a>
            <Button
              onClick={onClose}
              variant="outline"
              size="lg"
              className="text-xl py-4 px-6 font-bold rounded-3xl border-4 border-slate-300 shadow-xl hover:scale-[1.02] transition-all duration-500"
            >
              إغلاق
            </Button>
          </div>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-8 right-8 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-emerald-500 to-teal-600 shadow-2xl hover:shadow-emerald-glow border-4 border-white/60 backdrop-blur-xl rounded-3xl flex items-center justify-center z-50 hover:scale-125 transition-all duration-500"
        >
          <MessageCircle className="w-7 h-7 text-white" />
        </a>
      </motion.div>
    </div>
  );
};

export default ProductModal;

