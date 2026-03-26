# Homepage Bilingual Support (Arabic/English) - Progress Tracker

## Status: Planning ✅

### Information Gathered:
- LanguageContext ready with `useLanguage()` → `{ lang, t(key), dir }`
- Navbar fully bilingual using `t()`
- Index.tsx partially bilingual (hardcoded Arabic texts, services/portfolio have `{ ar, en }`)
- Existing translations in LanguageContext for hero/sections/footer

### Plan:
1. **Extend translations** in LanguageContext.tsx:
   - Add homepage keys: hero, services titles/desc, portfolio titles/desc, buttons, whyNagham
   
2. **Update Index.tsx**:
   - Replace hardcoded Arabic strings with `t("key")`
   - Make services/portfolio display `service.title[lang]`, `service.desc[lang]`
   - RTL/LTR support for text direction
   - Dynamic dir class on body/html

3. **Navbar integration** (already done):
   - Language toggle switches lang

4. **Professional touches**:
   - Smooth language switch animation
   - Persistent lang in localStorage
   - SEO meta tags for both languages

### Dependent Files:
- `src/contexts/LanguageContext.tsx` (add translations)
- `src/pages/Index.tsx` (use t() everywhere)

### Next Steps:
- Add homepage translations to LanguageContext
- Refactor Index.tsx to use translation keys

**Ready to implement? Confirm to proceed.**

