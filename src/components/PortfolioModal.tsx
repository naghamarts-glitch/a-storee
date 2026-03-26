import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { X, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from '@/components/ui/carousel';

interface PortfolioModalProps {
  project?: {
    title: { ar: string };
    desc: { ar: string };
    images: string[];
  };
  isOpen: boolean;
  onClose: () => void;
}

const PortfolioModal: React.FC<PortfolioModalProps> = ({ project, isOpen, onClose }) => {
  if (!isOpen || !project) return null;

  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? project!.images.length - 1 : prev - 1));
  }, [project!.images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === project!.images.length - 1 ? 0 : prev + 1));
  }, [project!.images.length]);

  const goToImage = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const whatsappUrl = `https://wa.me/201121688248?text=مرحبا، أود تنفيذ مشروع مشابه لـ ${encodeURIComponent(project!.title.ar)} - صورة ${currentIndex + 1} من ${project!.images.length}`;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-2xl flex items-center justify-center z-50 p-4 md:p-8" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        className="bg-white/98 backdrop-blur-3xl rounded-3xl shadow-2xl border border-white/60 w-full max-w-6xl max-h-[95vh] overflow-hidden mx-auto my-8 max-md:max-w-[98vw] max-md:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl border-b border-slate-200/80 p-8 md:p-12">
          <div className="flex items-center justify-between">
            <motion.h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 drop-shadow-xl leading-tight">
              {project!.title.ar}
            </motion.h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-14 w-14 rounded-3xl p-0 hover:bg-slate-200/50 shadow-lg backdrop-blur-sm border border-slate-200"
            >
              <X className="w-7 h-7" />
            </Button>
          </div>
        </div>

        <div className="relative h-[65vh] md:h-[75vh] lg:h-[80vh] flex items-center justify-center overflow-hidden bg-slate-50/50">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={project!.images[currentIndex]}
              alt={`${project!.title.ar} ${currentIndex + 1}`}
              className="max-h-[90%] max-w-[95%] object-contain rounded-3xl shadow-2xl border-8 border-white/60 mx-auto block hover:brightness-105 transition-all duration-500 cursor-zoom-in"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, type: "spring" }}
              onError={(e: any) => {
                e.target.src = "/public/placeholder.svg";
                e.target.alt = "Image unavailable";
              }}
            />
          </AnimatePresence>

          <motion.button 
            onClick={goToPrevious}
            className="absolute left-8 md:left-12 top-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 bg-white/95 hover:bg-white shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] border-4 border-white/70 backdrop-blur-xl rounded-3xl p-0 z-40 group hover:scale-110 transition-all duration-400 max-md:h-14 max-md:w-14 max-md:left-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 text-slate-700 group-hover:text-primary transition-colors" />
          </motion.button>

          <motion.button 
            onClick={goToNext}
            className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 bg-white/95 hover:bg-white shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] border-4 border-white/70 backdrop-blur-xl rounded-3xl p-0 z-40 group hover:scale-110 transition-all duration-400 max-md:h-14 max-md:w-14 max-md:right-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-slate-700 group-hover:text-primary transition-colors" />
          </motion.button>

          <motion.div 
            className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-slate-900/95 backdrop-blur-xl px-8 py-4 rounded-3xl text-white text-xl md:text-2xl font-bold shadow-2xl border border-white/20 z-20"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {currentIndex + 1} / {project!.images.length}
          </motion.div>
        </div>

        {/* Project Description */}
        <div className="p-10 md:p-14 lg:p-16 bg-gradient-to-b from-white/80 to-slate-50/50 backdrop-blur-sm">
          <motion.p 
            className="text-xl md:text-2xl lg:text-3xl text-slate-800 font-medium leading-relaxed text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {project.desc.ar}
          </motion.p>
        </div>

        {/* Thumbnail Navigation - Clean Row */}
        <div className="px-10 md:px-14 lg:px-16 pb-10 md:pb-14 bg-slate-50/50 backdrop-blur-sm">
          <div className="flex gap-3 md:gap-4 overflow-x-auto pb-6 -mx-3 px-3 scrollbar-thin scrollbar-track-slate-100/50 scrollbar-thumb-slate-300/70 snap-x snap-mandatory [scrollbar-width:thin]">
            {project.images.map((imgSrc, index) => (
              <motion.button
                key={index}
                className={`flex-shrink-0 w-24 h-16 md:w-32 md:h-20 lg:w-36 lg:h-24 rounded-2xl overflow-hidden shadow-lg border-3 transition-all duration-500 relative backdrop-blur-sm snap-center group hover:shadow-xl hover:scale-105 snap-always ${index === currentIndex ? 'ring-4 ring-emerald-500/50 shadow-emerald-500/25 border-emerald-500/60 scale-110 z-10' : 'border-slate-200/50 hover:border-slate-400/60'}`}
                onClick={() => goToImage(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <img 
                  src={imgSrc}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 brightness-110"
                />
                {index === currentIndex && (
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent backdrop-blur-sm" />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Dual CTAs - Prominent WhatsApp */}
        <div className="p-10 md:p-14 border-t border-slate-200/50 bg-white/80 backdrop-blur-xl">
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-2xl py-12 px-10 md:px-12 font-black rounded-3xl shadow-2xl hover:shadow-[0_25px_50px_rgba(16,185,129,0.4)] hover:scale-[1.02] transition-all duration-500 flex items-center justify-center gap-4 text-white backdrop-blur-xl"
            >
              <MessageCircle className="w-10 h-10 group-hover:scale-110 transition-transform drop-shadow-2xl" />
              <span>طلب مشروع مشابه<br className="md:hidden" /><span className="text-sm md:block">عبر واتساب</span></span>
            </a>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Button
                onClick={onClose}
                variant="outline"
                size="lg"
                className="flex-1 text-xl py-12 px-10 md:px-12 font-black rounded-3xl border-4 border-slate-300 shadow-xl hover:shadow-glow hover:scale-[1.02] transition-all duration-500 h-full"
              >
                إغلاق المشروع
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Persistent Floating WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-8 md:bottom-12 right-8 md:right-12 w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-emerald-500 to-teal-600 shadow-2xl hover:shadow-emerald-glow-xl border-4 border-white/60 backdrop-blur-2xl rounded-3xl flex items-center justify-center z-50 hover:scale-125 transition-all duration-500"
          aria-label="WhatsApp"
        >
          <MessageCircle className="w-9 h-9 md:w-10 md:h-10 text-white drop-shadow-2xl" />
        </a>
      </motion.div>
    </div>
  );
};

export default PortfolioModal;

