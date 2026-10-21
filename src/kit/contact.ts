// Manestream library kit: contact links built from the site config.
import { site } from "@/site.config";
import { formatIndianMobile, toInternational } from "./format";

export function whatsappLink(message?: string): string {
  const number = toInternational(site.contact.whatsapp ?? site.contact.phone);
  const text = message ?? site.contact.whatsappMessage ?? `Hi ${site.name}, I'd like to know more.`;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export const telLink = () => `tel:+${toInternational(site.contact.phone)}`;
export const mailLink = (subject?: string) =>
  `mailto:${site.contact.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
export const displayPhone = () => formatIndianMobile(site.contact.phone);

/** Social profiles that actually exist, in display order. */
export function socialLinks(): { label: string; href: string }[] {
  const labels = { instagram: "Instagram", facebook: "Facebook", linkedin: "LinkedIn", youtube: "YouTube", x: "X" } as const;
  return (Object.keys(labels) as (keyof typeof labels)[])
    .filter((k) => site.social?.[k])
    .map((k) => ({ label: labels[k], href: site.social![k]! }));
}
