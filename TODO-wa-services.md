# TODO: تحسين أزرار واتساب في صفحة الخدمات

## الخطوات:
- [x] فهم المشكلة وتحليل الملفات (Services.tsx, ServicesPremium.tsx, ServiceModal.tsx)
- [x] تأكيد الرقم: +201121688248
- [x] تعديل src/pages/ServicesPremium.tsx (Services.tsx يستورد منه):
  * جعل href ديناميكي للـ featured service بـ "رسائل علمية متميزة"
  * جعل href الـ "اطلب الآن" في service cards ديناميكي بـ service.title
- [x] اختبار الروابط جاهز (اضغط F5 أو أعد تشغيل السيرفر واختبر)
- [x] تحديث TODO وإنهاء المهمة ✅

## ملاحظات:
- ServiceModal.tsx بالفعل ديناميكي ✅
- استخدم encodeURIComponent للنصوص العربية
