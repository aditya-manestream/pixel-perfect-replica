// Manestream library kit, real estate: home-loan maths. Pure functions.

/** Monthly EMI for a loan at an annual rate (percent) over a tenure in years. */
export function emi(principal: number, annualRatePct: number, years: number): number {
  const n = Math.round(years * 12);
  if (principal <= 0 || n <= 0) return 0;
  const r = annualRatePct / 12 / 100;
  if (r === 0) return principal / n;
  const f = (1 + r) ** n;
  return (principal * r * f) / (f - 1);
}

/** Carpet area: "1,050 sq ft", or "1,050–1,240 sq ft". */
export function formatSqft(area: number | [number, number]): string {
  const f = (v: number) => Math.round(v).toLocaleString("en-IN");
  return Array.isArray(area) ? `${f(area[0])}–${f(area[1])} sq ft` : `${f(area)} sq ft`;
}

/** Square metres for an area in sq ft: "97.5 sq m". */
export function formatSqm(area: number | [number, number]): string {
  const f = (v: number) => (v * 0.09290304).toFixed(1).replace(/\.0$/, "");
  return Array.isArray(area) ? `${f(area[0])}–${f(area[1])} sq m` : `${f(area)} sq m`;
}

/** 1 guntha = 1,089 sq ft (Maharashtra, Karnataka, Gujarat). */
export const SQFT_PER_GUNTHA = 1089;
export const sqftToGunthas = (sqft: number) => Math.round((sqft / SQFT_PER_GUNTHA) * 100) / 100;
