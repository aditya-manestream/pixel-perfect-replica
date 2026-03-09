

## Text-Only Content Updates Across Homepage Sections

Eight sections need text changes. No layout, styling, or structural modifications.

### Changes by File

**1. `src/pages/Index.tsx` — Hero (Section 1)**
Already correct. Headline is "Nature, shaped to fit your grip", subheadline and CTA match the spec.

**2. `src/components/CategorySection.tsx` — Collection (Section 2)**
- Line 41: `"Shapes inspired by nature."` → `"The Collection"`
- Line 47: `"Designed to move with you."` → `"Curated to move with you"`

**3. `src/components/PhilosophySection.tsx` — Brand Philosophy (Section 3)**
- Lines 51-52: Remove the two `<span>` lines ("Rooted in nature. / Crafted for life.") → single line: `"Slow craft. Uncompromising quality."`
- Lines 78-82: Replace body paragraph with the new copy about surplus cow/sheep hide and vegetable tanning.

**4. `src/components/CuratedSection.tsx` — Curated Section (Section 4)**
- Line 40: `"Curated For You"` → `"Curated for you"`
- Lines 44-46: Replace subheadline text → `"A thoughtful selection of Ardori pieces designed to complement everyday moments."`

**5. `src/components/CraftSection.tsx` — Vegetable Tanning (Section 5)**
- Headline already matches ("The Art of Vegetable Tanning")
- Lines 47-49: Replace body paragraph with the new multi-paragraph copy about fast-fashion vs Ardori's approach.

**6. `src/components/WatchShopSection.tsx` — See it Styled (Section 6)**
- Line 93: `"Watch & Shop"` → `"See it Styled"`
- Line 99: Replace subheadline → `"How Ardori complements your daily life"`

**7. `src/components/PromiseSection.tsx` — Ardori Promise (Section 7)**
- Headline already matches
- Line 62: Replace subheadline → `"We are committed to high-quality materials, ethical production, and enduring design."`

**8. `src/components/UnboxingSection.tsx` — Quote Section (Section 8)**
- Keep quote line, add a paragraph below: `"True luxury is about making the intentional choice to step away from fleeting trends and embrace purposeful signature pieces that suit your style."`

