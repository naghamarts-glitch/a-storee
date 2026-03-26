import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Loader2, Send } from 'lucide-react';
import { toast } from 'sonner';

interface ServiceRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: any[];
  lang: string;
}

const ServiceRequestModal: React.FC<ServiceRequestModalProps> = ({ isOpen, onClose, services, lang }) => {
  const [formData, setFormData] = React.useState({
    name: '',
    phone: '',
    service_type: '',
    details: ''
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'الاسم مطلوب';
    if (!formData.phone.trim()) newErrors.phone = 'رقم الهاتف مطلوب';
    if (!formData.service_type) newErrors.service_type = 'اختر نوع الخدمة';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
const response = await fetch('http://localhost/backend/create-service-request.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      if (data.success) {
        toast.success('تم إرسال الطلب بنجاح ✅');
        setFormData({ name: '', phone: '', service_type: '', details: '' });
        onClose();
      } else {
        toast.error(data.error || 'حدث خطأ');
      }
    } catch (error) {
      toast.error('خطأ في الاتصال بالخادم');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md sm:max-w-lg p-0 border-none shadow-2xl backdrop-blur-xl max-h-[90vh] overflow-y-auto">
        <div className="p-8 sm:p-12 bg-gradient-to-b from-white via-slate-50 to-white/80 rounded-3xl">
          <DialogHeader className="text-center mb-12">
            <DialogTitle className="text-3xl font-black bg-gradient-to-r from-slate-900 via-primary to-secondary bg-clip-text text-transparent drop-shadow-lg">
              اطلب خدمتك الآن
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label className="text-lg font-semibold mb-3 flex items-center gap-2 text-slate-800">
                👤 الاسم الكامل
              </Label>
              <Input 
                value={formData.name} 
                onChange={handleInputChange('name')} 
                className="h-14 pl-12 rounded-2xl border-2 border-slate-200 bg-white shadow-md focus-visible:border-primary focus-visible:ring-4 ring-primary/20 transition-all"
                placeholder="أدخل اسمك الكامل"
                required 
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

            <div>
              <Label className="text-lg font-semibold mb-3 flex items-center gap-2 text-slate-800">
                📱 رقم الهاتف
              </Label>
              <Input 
                value={formData.phone}
                onChange={handleInputChange('phone')}
                type="tel"
                className="h-14 pl-12 rounded-2xl border-2 border-slate-200 bg-white shadow-md focus-visible:border-primary focus-visible:ring-4 ring-primary/20 transition-all"
                placeholder="01xxxxxxxxx"
                required 
              />
              {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
            </div>

            <div>
              <Label className="text-lg font-semibold mb-3 flex items-center gap-2 text-slate-800">
                🎯 نوع الخدمة
              </Label>
              <Select value={formData.service_type} onValueChange={(value) => setFormData({...formData, service_type: value})}>
                <SelectTrigger className="h-14 rounded-2xl border-2 border-slate-200 bg-white shadow-md focus-visible:border-primary">
                  <SelectValue placeholder="اختر الخدمة" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-2 border-slate-200 bg-white shadow-lg">
                  {services.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.title.ar}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.service_type && <p className="mt-1 text-sm text-red-500">{errors.service_type}</p>}
            </div>

            <div>
              <Label className="text-lg font-semibold mb-3 flex items-center gap-2 text-slate-800">
                📝 تفاصيل إضافية (اختياري)
              </Label>
              <textarea
                value={formData.details}
                onChange={handleInputChange('details' as any)}
                rows={4}
                className="w-full p-4 rounded-2xl border-2 border-slate-200 bg-white shadow-md focus:border-primary focus:ring-4 ring-primary/20 resize-vertical min-h-[120px] text-base"
                placeholder="وصف احتياجاتك بالتفصيل..."
              />
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full h-16 text-xl font-black bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-2xl hover:shadow-emerald-400/50 text-white rounded-3xl transition-all duration-300"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin mr-2" />
                  جاري الإرسال...
                </>
              ) : (
                <>
                  <Send className="w-6 h-6 mr-2" />
                  إرسال الطلب مجانًا
                </>
              )}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceRequestModal;

