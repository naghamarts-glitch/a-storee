import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { X, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ServiceModalProps {
  service: {
    id: string;
    title: { ar: string };
    desc: { ar: string };
    images: string[];
    color: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ service, isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = useCallback(() => {
    if (!service?.images) return;
    setCurrentIndex((prev) => (prev === 0 ? service.images.length - 1 : prev - 1));
  }, [service?.images?.length]);

  const goToNext = useCallback(() => {
    if (!service?.images) return;
    setCurrentIndex((prev) => (prev === service.images.length - 1 ? 0 : prev + 1));
  }, [service?.images?.length]);

  const goToImage = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50 p-4 md:p-8 overflow-auto" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        className="bg-white/95 backdrop-blur-3xl rounded-3xl shadow-2xl border border-white/50 max-w-5xl w-full max-h-[95vh] overflow-hidden mx-auto my-4 relative max-md:max-w-[95vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-xl border-b border-slate-100 p-8 md:p-12">
          <div className="flex justify-between items-start gap-4 mb-6">
            <div className="flex-1">
              <motion.h2 
                className="text-3xl md:text-5xl font-black bg-gradient-to-r from-slate-900 via-primary to-secondary bg-clip-text text-transparent drop-shadow-2xl leading-tight"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {service.title.ar}
              </motion.h2>
              <motion.p 
                className="text-lg md:text-2xl text-slate-700 mt-4 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {service.desc.ar}
              </motion.p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="hover:bg-slate-200 h-14 w-14 rounded-3xl p-0 shadow-xl flex-shrink-0"
            >
              <X className="w-7 h-7" />
            </Button>
          </div>
        </div>

        <div className="relative h-[60vh] md:h-[70vh] lg:h-[75vh] flex items-center justify-center p-8 md:p-12 overflow-hidden bg-gradient-to-br from-slate-50 to-white/80">
          
          <motion.button
            onClick={goToPrevious}
            className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 bg-white/95 hover:bg-white shadow-2xl hover:shadow-glow hover:scale-110 border border-white/70 rounded-full p-0 z-30 flex items-center justify-center transition-all duration-300 group backdrop-blur-xl max-md:w-14 max-md:h-14"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 text-slate-700 group-hover:text-primary transition-colors" />
          </motion.button>

          <motion.button
            onClick={goToNext}
            className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 bg-white/95 hover:bg-white shadow-2xl hover:shadow-glow hover:scale-110 border border-white/70 rounded-full p-0 z-30 flex items-center justify-center transition-all duration-300 group backdrop-blur-xl max-md:w-14 max-md:h-14"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-slate-700 group-hover:text-primary transition-colors" />
          </motion.button>

          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={service.images[currentIndex]}
              alt={`${service.title.ar} - صورة ${currentIndex + 1}`}
              className="max-h-full max-w-full object-contain shadow-2xl rounded-3xl border-8 border-white/50 mx-auto block cursor-zoom-in hover:scale-105 transition-transform duration-500"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              onError={(e) => {
                const imgEl = e.target as HTMLImageElement;
                imgEl.src = "/public/placeholder.svg";
                imgEl.alt = "صورة غير متوفرة";
              }}
            />
          </AnimatePresence>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-xl px-6 py-3 rounded-2xl text-white text-lg md:text-xl font-bold z-20">
            {currentIndex + 1} / {service.images.length}
          </div>
        </div>

        <div className="p-8 md:p-12 bg-gradient-to-t from-slate-50 to-transparent relative">
          <div className="flex gap-4 overflow-x-auto pb-6 -mx-4 px-4 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100 snap-x snap-mandatory max-md:flex-wrap max-md:justify-center">
            {service.images.map((imgSrc, index) => (
              <motion.button
                key={index}
                onClick={() => goToImage(index)}
                className={`flex-shrink-0 w-24 h-20 md:w-32 md:h-24 rounded-2xl overflow-hidden shadow-xl border-4 hover:border-primary/60 transition-all duration-300 relative snap-center group backdrop-blur-sm ${index === currentIndex ? 'ring-4 ring-primary/50 shadow-primary/25 scale-110 border-primary/70' : 'border-slate-200 hover:border-slate-400 hover:shadow-2xl hover:scale-105'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <img 
                  src={imgSrc} 
                  alt={`مصغر ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/public/placeholder.svg";
                  }}
                />
                {index === currentIndex && (
                  <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm" />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="p-8 md:p-12 pt-6 border-t border-slate-200 bg-gradient-to-t from-white to-transparent backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row gap-4 max-w-2xl mx-auto">
            <a
              href={`https://wa.me/201121688248?text=مرحبا، أود طلب خدمة ${encodeURIComponent(service.title.ar)} - صورة ${currentIndex + 1}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-xl py-10 px-8 font-black rounded-3xl shadow-2xl hover:shadow-emerald-glow hover:scale-105 transition-all duration-500 flex items-center justify-center gap-4 text-white"
            >
              <MessageCircle className="w-8 h-8 drop-shadow-lg" />
              اطلب هذه الخدمة الآن
            </a>
            <Button
              onClick={onClose}
              variant="outline"
              size="lg"
              className="flex-1 text-xl py-10 px-8 font-black rounded-3xl border-4 border-slate-300 shadow-xl hover:shadow-glow hover:scale-105 transition-all duration-500"
            >
              <X className="w-7 h-7 mr-2" />
              إغلاق النافذة
            </Button>
          </div>
        </div>

        <a
          href={`https://wa.me/201121688248?text=أحتاج خدمة ${encodeURIComponent(service.title.ar)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-8 right-8 w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-emerald-500 to-green-600 shadow-2xl hover:shadow-emerald-glow-xl border-4 border-white/50 backdrop-blur-xl rounded-full flex items-center justify-center z-40 hover:scale-125 transition-all duration-400"
        >
          <MessageCircle className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-2xl" />
        </a>
      </motion.div>
    </div>
  );
};

export default ServiceModal;

