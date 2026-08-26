import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { adminGraphql } from "../_shared/shopify-admin.ts";

function page(body: string) {
  return new Response(
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Shopify Connection – Ardori</title>
  <style>
    body { font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif; max-width: 640px; margin: 48px auto; padding: 0 20px; line-height: 1.5; background: #0F172A; color: #E8E4DF; }
    h1 { color: #C4A164; font-size: 1.4rem; margin-bottom: 0.5rem; }
    .token { background: #121B2D; border: 1px solid #C4A164; padding: 14px; border-radius: 8px; word-break: break-all; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; margin: 18px 0; font-size: 0.9rem; }
    .note { color: rgba(232,228,223,0.7); font-size: 0.95rem; }
    pre { white-space: pre-wrap; background: #121B2D; padding: 12px; border-radius: 6px; }
  </style>
</head>
<body>${body}</body>
</html>`,
    { headers: { "Content-Type": "text/html" } }
  );
}

serve(async (req) => {
  try {
    const data = await adminGraphql(`query ConnectionCheck { shop { name myshopifyDomain } }`);
    const shop = data?.shop;

    return page(`
      <h1>Shopify is connected</h1>
      <p class="note"><strong>Store:</strong> ${shop?.name || "Ardori"}</p>
      <p class="note"><strong>Domain:</strong> ${shop?.myshopifyDomain || "ardori-4.myshopify.com"}</p>
      <p class="note">The website can securely create Shopify orders after verified Razorpay payments. No access token needs to be copied or stored manually.</p>
    `);
  } catch (err: any) {
    return page(`<h1>Shopify connection failed</h1><pre>${err.message || err}</pre>`);
  }
});
