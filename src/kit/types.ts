// Manestream library kit: the one place a site's brand and contact facts live.
// Each site exports `site` from src/site.config.ts. Reskinning a template starts there.

export interface SiteConfig {
  /** Brand name as it should read in titles and copy. */
  name: string;
  /** Short phrase for the home page title: "Brand | tagline". Keep under 45 characters. */
  tagline: string;
  /** One-line description used for the default meta description. */
  description: string;
  /** Production URL without trailing slash, used for canonical and OG URLs. */
  url: string;
  /** Path to the social preview image in /public (1200x630). */
  ogImage: string;
  /** Theme colour for mobile browser chrome. */
  themeColor: string;
  locale?: string;
  contact: {
    /** 10-digit Indian mobile or any format; the kit normalises it. */
    phone: string;
    /** Defaults to `phone` when omitted. */
    whatsapp?: string;
    email: string;
    /** Prefilled WhatsApp message when no context is given. */
    whatsappMessage?: string;
    address?: string;
    city?: string;
    hours?: string;
  };
  /** Only list profiles that exist. Empty or missing entries are not rendered. */
  social?: Partial<Record<"instagram" | "facebook" | "linkedin" | "youtube" | "x", string>>;
  /** Optional Web3Forms access key (free) to also email form submissions. */
  web3formsKey?: string;
  /** Legal entity name used on the privacy and terms pages. */
  legalName?: string;
  /** Marks a demo build: legal pages and forms say so. */
  demo?: boolean;
  /** Keep the whole site out of search engines (library copies of client sites). */
  noindex?: boolean;
  /**
   * Real-estate registration. Set only with a real, verified number: the RERA badge stays hidden
   * until then. Never fill in a placeholder.
   */
  rera?: {
    /** "MahaRERA", "K-RERA", "TNRERA"… */
    authority: string;
    number: string;
    /** Link to the project's page on the authority's site. */
    url?: string;
    /** Path in /public to the authority's QR code image, if the site shows it. */
    qr?: string;
  };
}
