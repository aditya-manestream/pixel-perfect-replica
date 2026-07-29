import { Helmet } from "react-helmet-async";

const SITE_URL = "https://ardorilabel.com";

interface SeoProps {
  title: string;
  description: string;
  /** Route path, e.g. "/shop". Used for the self-referencing canonical + og:url. */
  path: string;
  image?: string;
  type?: "website" | "article" | "product";
  /** Extra JSON-LD blocks for the page (Product, FAQPage, …). */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Per-route head tags. Each page owns its own title, description, canonical and
 * og:url so crawlers that execute JS see page-specific metadata instead of the
 * single site-wide set from index.html.
 */
const Seo = ({ title, description, path, image, type = "website", jsonLd }: SeoProps) => {
  const url = `${SITE_URL}${path}`;
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      {image ? <meta property="og:image" content={image} /> : null}

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image ? <meta name="twitter:image" content={image} /> : null}

      {blocks.map((block, i) => (
        <script type="application/ld+json" key={i}>
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  );
};

export default Seo;
