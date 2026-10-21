// Manestream library kit: Indian-market formatting helpers.
// Pure functions, no dependencies. Safe to copy into any React/Vite/Next site.

const inr = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

/** ₹12,50,000 (Indian digit grouping). */
export function formatINR(value: number): string {
  return `₹${inr.format(Math.round(value))}`;
}

/** ₹12.5 L, ₹1.2 Cr, ₹45,000 — for cards, pins and stats. */
export function formatINRCompact(value: number): string {
  const abs = Math.abs(value);
  const trim = (n: number) => n.toFixed(n < 10 ? 2 : 1).replace(/\.?0+$/, "");
  if (abs >= 1e7) return `₹${trim(value / 1e7)} Cr`;
  if (abs >= 1e5) return `₹${trim(value / 1e5)} L`;
  if (abs >= 1e3 && abs < 1e5 && value % 1000 === 0) return `₹${value / 1000}K`;
  return formatINR(value);
}

/** Keep only digits; strip a leading +91 / 91 / 0 so we get the 10-digit mobile. */
export function normaliseIndianMobile(input: string): string {
  const digits = input.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
  return digits;
}

/** Indian mobile numbers are 10 digits starting 6-9. */
export function isIndianMobile(input: string): boolean {
  return /^[6-9]\d{9}$/.test(normaliseIndianMobile(input));
}

/** +91 98765 43210 */
export function formatIndianMobile(input: string): string {
  const d = normaliseIndianMobile(input);
  return d.length === 10 ? `+91 ${d.slice(0, 5)} ${d.slice(5)}` : input;
}

/** 919876543210, the form wa.me and tel: links want. */
export function toInternational(input: string): string {
  return `91${normaliseIndianMobile(input)}`;
}
