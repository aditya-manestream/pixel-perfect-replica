

## Plan: Add Pattern Overlay to Unboxing Quote Section

### Change: `src/components/UnboxingSection.tsx`

1. Import `navyPatternBg` from `@/assets/navy-pattern-bg.jpg`
2. Make section `relative` with `overflow-hidden`
3. Keep the existing white/cream background (`#F5F2ED`)
4. Add the pattern as an absolute overlay **on top** of the background but **behind** the text, using low opacity (~8-12%) so the pattern is a subtle texture while the section remains visually white/cream
5. Wrap existing content in `relative z-10` to sit above the pattern layer

Structure:
```text
<section style={{ backgroundColor: "#F5F2ED" }} className="relative overflow-hidden">
  <!-- Pattern overlay: absolute, inset-0, opacity-[0.08] -->
  <div className="absolute inset-0 opacity-[0.08]" style="backgroundImage: url(pattern)" />
  <!-- Content: relative z-10 (existing quote, unchanged) -->
</section>
```

No changes to text, typography, spacing, or any other section.

