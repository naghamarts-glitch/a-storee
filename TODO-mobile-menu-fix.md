# Mobile Menu Icon Fix TODO

Current Issue: Hamburger icon disappears on mobile (<768px) when menu opens.

## Implementation Steps:
- [ ] Step 1: Create this TODO.md ✅
- [ ] Step 2: Update Navbar.tsx - add mobile-specific fixed positioning, z-[10000], forced black color day mode
- [ ] Step 3: Update index.css - add .mobile-hamburger styles (fixed top-1 right-1, glass bg, high z-index, mobile-only)
- [ ] Step 4: Ensure mobile menu z-40 doesn't cover button (adjust if needed)
- [ ] Step 5: Test: npm run dev, mobile view <768px day/night, open/close menu, scroll
- [ ] Step 6: Update TODO progress + complete task ✅

**Status**: ✅ Complete - Inline hamburger in icons row with RTL/LTR flex-row-reverse/row, next to cart, visible mobile (md:hidden relative), backdrop overlay, professional layout.
