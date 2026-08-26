import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

// Temporary diagnostic: finds which store domain the Admin token belongs to.
Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const token = Deno.env.get('SHOPIFY_ADMIN_ACCESS_TOKEN') ?? '';
  const domains = ['ardori-4.myshopify.com', '3dhtf1-ma.myshopify.com'];
  const results: Record<string, unknown> = {
    token_present: !!token,
    token_prefix: token.slice(0, 6),
    token_length: token.length,
  };

  for (const domain of domains) {
    try {
      const res = await fetch(`https://${domain}/admin/api/2025-01/graphql.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Shopify-Access-Token': token },
        body: JSON.stringify({ query: '{ shop { name currencyCode myshopifyDomain } }' }),
      });
      results[domain] = { status: res.status, body: (await res.text()).slice(0, 400) };
    } catch (e) {
      results[domain] = { error: (e as Error).message };
    }
  }

  return new Response(JSON.stringify(results, null, 2), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});
