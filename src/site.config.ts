import type { SiteConfig } from "@/kit/types";

// Every brand and contact fact a client would change lives here.
// Library copy of a client site: contact details are demo values so enquiries never reach the client.
export const site: SiteConfig = {
  name: "Ardori",
  tagline: "Handcrafted leather handbags from India",
  description: "Ardori crafts vegetable-tanned leather handbags in India, shaped by the country's flora and fauna. Order on WhatsApp.",
  url: "https://ms-lx-02-ardori.vercel.app",
  ogImage: "/og-image.jpg",
  themeColor: "#18243E",
  contact: {
    phone: "9823012345",
    email: "hello@ardori.in",
    whatsappMessage: "Hi Ardori, I'd like to know more about your handbags.",
    city: "Mumbai",
  },
  social: { instagram: "https://www.instagram.com/ardoridesigns/" },
  legalName: "Ardori (demo)",
  demo: true,
  noindex: true,
};
