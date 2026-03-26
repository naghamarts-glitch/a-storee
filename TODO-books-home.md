# TODO: Professional Books Section on Homepage
Status: New task - Add "كتب احترافية" section to Index.tsx

## Plan:
**Information Gathered**:
- Index.tsx: Hero, Services, Portfolio, WhyNagham, CTA. Light theme bg-gradient.
- Books.tsx: Full books page with filters/grid ProductCard.
- src/data/books.ts: 21 books data (grades 1-3).
- ProductCard.tsx: Reusable book card with WA order/cart.

**1. New Section**: After Portfolio, before WhyNagham.
- Title: "كتب احترافية الثانوية العامة" gradient text.
- Featured 8 books (hot/new first, grades 1-3 mix).
- Grid 1-4 cols responsive.
- "View All" → /books button.
- Style match: glass cards, hover scale, WA primary.

**Files**:
- src/pages/Index.tsx (add section + imports).
- Reuse ProductCard/books data.

**Followup**: Test responsive, dev server live.

Proceed?

