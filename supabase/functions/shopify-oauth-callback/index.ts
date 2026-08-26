import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

function page(body: string) {
  return new Response(
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Shopify Token Capture – Ardori</title>
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
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    const shop = url.searchParams.get("shop");
    const hmac = url.searchParams.get("hmac");

    const clientId = Deno.env.get("SHOPIFY_CLIENT_ID");
    const clientSecret = Deno.env.get("SHOPIFY_CLIENT_SECRET");

    if (!clientId || !clientSecret) {
      return page(`
        <h1>Missing credentials</h1>
        <p class="note">This page needs the <code>SHOPIFY_CLIENT_ID</code> and <code>SHOPIFY_CLIENT_SECRET</code> secrets to be set in the Lovable backend. Please paste them in the secure form and then install the app again.</p>
      `);
    }

    if (!code || !shop) {
      return page(`
        <h1>No authorization code received</h1>
        <p class="note">Shopify did not send a code. Please make sure the app’s <strong>App URL</strong> is set to this page, then click <strong>Install app</strong> again.</p>
      `);
    }

    // Validate HMAC to confirm the request came from Shopify.
    if (hmac) {
      const params = new URLSearchParams(url.search);
      params.delete("hmac");
      const entries = Array.from(params.entries()).sort((a, b) => a[0].localeCompare(b[0]));
      const message = entries.map(([k, v]) => `${k}=${v}`).join("&");
      const encoder = new TextEncoder();
      const key = await crypto.subtle.importKey(
        "raw",
        encoder.encode(clientSecret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
      );
      const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
      const computedHmac = Array.from(new Uint8Array(sig))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

      if (computedHmac !== hmac.toLowerCase()) {
        return page(`
          <h1>Security check failed</h1>
          <p class="note">The HMAC signature from Shopify did not match. Please try installing the app again.</p>
        `);
      }
    }

    const tokenRes = await fetch(`https://${shop}/admin/oauth/access_token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });

    const tokenText = await tokenRes.text();
    let tokenData: Record<string, any> = {};
    try {
      tokenData = JSON.parse(tokenText);
    } catch {
      // leave as text error
    }

    if (!tokenRes.ok || !tokenData.access_token) {
      return page(`
        <h1>Token exchange failed</h1>
        <p class="note">Shopify returned HTTP ${tokenRes.status}:</p>
        <pre>${tokenText}</pre>
      `);
    }

    return page(`
      <h1>Shopify access token captured</h1>
      <p class="note">Copy the token below and paste it back in the chat so I can save it securely. It should start with <code>shpat_</code>.</p>
      <div class="token">${tokenData.access_token}</div>
      <p class="note"><strong>Scopes granted:</strong> ${tokenData.scope || "unknown"}</p>
      <p class="note">Once saved, every Razorpay payment will create a real Shopify order so inventory decrements and Shiprocket can pick it up.</p>
    `);
  } catch (err: any) {
    return page(`<h1>Error</h1><pre>${err.message || err}</pre>`);
  }
});
