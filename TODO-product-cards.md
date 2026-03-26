## Product Cards Enhancement TODO

**Status: In Progress** ✅

### Approved Plan Steps:
1. [x] Create TODO-product-cards.md with steps
2. [x] Create src/components/ProductModal.tsx (new reusable modal with gallery for products)
3. [x] Update src/data/products.ts: Add `images?: string[]` to Product interface; populate 4 demo products with 3 images each (use existing assets)
4. [x] Update src/components/ProductCard.tsx: 
   - Added local state for modal
   - Card click opens modal (stops on buttons/links)
   - Enhanced hover lift/scale/shadow, overlay with "عرض الخدمة"
   - RTL ready, premium Framer Motion
5. Test: Run `bun dev`, verify responsive grid (3/2/1 col), hover lifts/shadows/zoom, modal gallery with thumbs/nav, WhatsApp
6. [ ] Update src/pages/Shop.tsx (add selectedProduct state if needed, demo grid)
7. Mark complete, attempt_completion

**Next step:** Update ProductCard.tsx with modal integration
