import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { type LucideIcon } from "lucide-react";

interface SectionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  to: string;
  delay?: number;
  gradient?: string;
}

const SectionCard = ({ title, description, icon: Icon, to, delay = 0, gradient = "gradient-bg" }: SectionCardProps) => {
  const { lang } = useLanguage();
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="glass-card p-8 md:p-10 group shadow-xl hover:shadow-2xl hover:shadow-purple-500/25 dark-glow-hover transition-all duration-500"
    >
      <Link to={to} className="block">
        <div className="w-16 h-16 bg-gradient-to-r from-[#7C3AED] to-[#2563EB] rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:shadow-purple-500/50 transition-all duration-500">
          <Icon className="w-7 h-7 text-primary-foreground" />
        </div>
        <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{description}</p>
        <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
          <span>{lang === "ar" ? "اكتشف المزيد" : "Discover More"}</span>
          <Arrow className="w-4 h-4" />
        </div>
      </Link>
    </motion.div>
  );
};

export default SectionCard;
