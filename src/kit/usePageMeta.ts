// Manestream library kit: per-route title, description, canonical and social tags for Vite SPAs.
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { site } from "@/site.config";

interface PageMeta {
  /** Page title without the brand; omit on the home page. */
  title?: string;
  description?: string;
  image?: string;
  /** Hide this page from search engines. site.noindex hides every page. */
  noindex?: boolean;
}

function setMeta(attr: "name" | "property", key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = value;
}

export function usePageMeta({ title, description, image, noindex }: PageMeta = {}) {
  const { pathname } = useLocation();
  useEffect(() => {
    const fullTitle = title ? `${title} | ${site.name}` : `${site.name} | ${site.tagline}`;
    const desc = description ?? site.description;
    const img = new URL(image ?? site.ogImage, site.url).toString();
    const url = `${site.url}${pathname}`;
    document.title = fullTitle;
    setMeta("name", "description", desc);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", desc);
    setMeta("property", "og:image", img);
    setMeta("property", "og:url", url);
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", desc);
    setMeta("name", "twitter:image", img);
    setMeta("name", "robots", noindex || site.noindex ? "noindex, nofollow" : "index, follow");
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [title, description, image, noindex, pathname]);
}
