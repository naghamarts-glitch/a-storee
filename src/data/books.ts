import s1 from "@/assets/products/s1.png";
import s2 from "@/assets/products/s2.png";
import s3 from "@/assets/products/s3.png";
import s4 from "@/assets/products/s4.png";
import s5 from "@/assets/products/s5.png";
import s6 from "@/assets/products/s6.png";
import s7 from "@/assets/products/s7.png";
import s8 from "@/assets/products/s8.png";
import s9 from "@/assets/products/s9.png";
import s10 from "@/assets/products/s10.png";
import s11 from "@/assets/products/s11.png";
import s12 from "@/assets/products/s12.png";
import s13 from "@/assets/products/s13.png";
import s14 from "@/assets/products/s14.png";
import s15 from "@/assets/products/s15.png";
import s16 from "@/assets/products/s16.png";
import s17 from "@/assets/products/s17.png";
import s18 from "@/assets/products/s18.png";
import s19 from "@/assets/products/s19.png";
import s20 from "@/assets/products/s20.png";
import s21 from "@/assets/products/s21.png";

export interface Product {
  id: string;
  name: string;
  nameEn: string;
  price: number | null;
  category: "art" | "home" | "summaries" | "books";
  image?: string;
}

export interface Book extends Product {
  grade: '1' | '2' | '3';
  badge?: 'hot' | 'new';
  fullName: string;
}

export const books: Book[] = [
  // الصف الأول الثانوي
  { id: 's1', name: 'الفيزياء - كتاب الامتحان', nameEn: 'Physics - Exam Book', price: null, category: 'books', image: s1, grade: '1', badge: 'hot', fullName: 'الفيزياء - كتاب الامتحان - الصف الأول الثانوي' },
  { id: 's2', name: 'الكيمياء - مراجعة نهائية', nameEn: 'Chemistry - Final Review', price: null, category: 'books', image: s2, grade: '1', badge: 'hot', fullName: 'الكيمياء - مراجعة نهائية - الصف الأول الثانوي' },
  { id: 's3', name: 'الأحياء - كتاب الشامل', nameEn: 'Biology - Comprehensive Book', price: null, category: 'books', image: s3, grade: '1', fullName: 'الأحياء - كتاب الشامل - الصف الأول الثانوي' },
  { id: 's4', name: 'اللغة العربية - كتاب الوزارة', nameEn: 'Arabic - Ministry Book', price: null, category: 'books', image: s4, grade: '1', fullName: 'اللغة العربية - كتاب الوزارة - الصف الأول الثانوي' },
  { id: 's5', name: 'اللغة الإنجليزية - كتاب الامتحان', nameEn: 'English - Exam Book', price: null, category: 'books', image: s5, grade: '1', badge: 'hot', fullName: 'اللغة الإنجليزية - كتاب الامتحان - الصف الأول الثانوي' },
  // الصف الثاني الثانوي
  { id: 's6', name: 'الرياضيات - كتاب الوزارة', nameEn: 'Math - Ministry Book', price: null, category: 'books', image: s6, grade: '2', badge: 'hot', fullName: 'الرياضيات - كتاب الوزارة - الصف الثاني الثانوي' },
  { id: 's7', name: 'الفيزياء - مراجعة نهائية', nameEn: 'Physics - Final Review', price: null, category: 'books', image: s7, grade: '2', fullName: 'الفيزياء - مراجعة نهائية - الصف الثاني الثانوي' },
  { id: 's8', name: 'الكيمياء - كتاب الامتحان', nameEn: 'Chemistry - Exam Book', price: null, category: 'books', image: s8, grade: '2', badge: 'hot', fullName: 'الكيمياء - كتاب الامتحان - الصف الثاني الثانوي' },
  { id: 's9', name: 'الأحياء - مراجعة نهائية', nameEn: 'Biology - Final Review', price: null, category: 'books', image: s9, grade: '2', fullName: 'الأحياء - مراجعة نهائية - الصف الثاني الثانوي' },
  { id: 's10', name: 'اللغة الفرنسية - كتاب الوزارة', nameEn: 'French - Ministry Book', price: null, category: 'books', image: s10, grade: '2', fullName: 'اللغة الفرنسية - كتاب الوزارة - الصف الثاني الثانوي' },
  // الصف الثالث الثانوي
  { id: 's11', name: 'التاريخ - كتاب شامل', nameEn: 'History - Comprehensive Book', price: null, category: 'books', image: s11, grade: '3', fullName: 'التاريخ - كتاب شامل - الصف الثالث الثانوي' },
  { id: 's12', name: 'الرياضيات - كتب الوزارة', nameEn: 'Math - Ministry Books', price: null, category: 'books', image: s12, grade: '3', badge: 'hot', fullName: 'الرياضيات - كتب الوزارة - الصف الثالث الثانوي' },
  { id: 's13', name: 'الكيمياء - مراجعة نهائية', nameEn: 'Chemistry - Final Review', price: null, category: 'books', image: s13, grade: '3', badge: 'hot', fullName: 'الكيمياء - مراجعة نهائية - الصف الثالث الثانوي' },
  { id: 's14', name: 'الأحياء - مراجعة نهائية', nameEn: 'Biology - Final Review', price: null, category: 'books', image: s14, grade: '3', fullName: 'الأحياء - مراجعة نهائية - الصف الثالث الثانوي' },
  { id: 's15', name: 'علم النفس - كتاب الامتحان', nameEn: 'Psychology - Exam Book', price: null, category: 'books', image: s15, grade: '3', fullName: 'علم النفس - كتاب الامتحان - الصف الثالث الثانوي' },
  { id: 's16', name: 'الجغرافيا - كتاب الوزارة', nameEn: 'Geography - Ministry Book', price: null, category: 'books', image: s16, grade: '3', fullName: 'الجغرافيا - كتاب الوزارة - الصف الثالث الثانوي' },
  { id: 's17', name: 'التربية الإسلامية - مراجعة نهائية', nameEn: 'Islamic Education - Final Review', price: null, category: 'books', image: s17, grade: '3', fullName: 'التربية الإسلامية - مراجعة نهائية - الصف الثالث الثانوي' },
  { id: 's18', name: 'الجغرافيا - أولى ثانوي', nameEn: 'Geography - First Secondary', price: null, category: 'books', image: s18, grade: '3', badge: 'new', fullName: 'الجغرافيا - أولى ثانوي - الصف الثالث الثانوي' },
  { id: 's19', name: 'اللغة الإنجليزية - كتاب الامتحان', nameEn: 'English - Exam Book', price: null, category: 'books', image: s19, grade: '3', fullName: 'اللغة الإنجليزية - كتاب الامتحان - الصف الثالث الثانوي' },
  { id: 's20', name: 'التاريخ - أولى ثانوي', nameEn: 'History - First Secondary', price: null, category: 'books', image: s20, grade: '3', badge: 'new', fullName: 'التاريخ - أولى ثانوي - الصف الثالث الثانوي' },
  { id: 's21', name: 'الكيمياء - مراجعة نهائية', nameEn: 'Chemistry - Final Review', price: null, category: 'books', image: s21, grade: '3', badge: 'new', fullName: 'الكيمياء - مراجعة نهائية - الصف الثالث الثانوي' },
];

export const getFilteredBooks = (grade?: string, search = ''): Book[] => {
  return books
    .filter(book => !grade || book.grade === grade)
    .filter(book => !search || book.name.includes(search) || book.fullName.includes(search))
    .sort((a, b) => a.grade.localeCompare(b.grade));
};
