import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { adminGraphql } from '../_shared/shopify-admin.ts';

// Temporary diagnostic: confirms the Admin API token and scopes work.
Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  try {
    const data = await adminGraphql(`{
      shop { name currencyCode }
      orders(first: 1, query: "tag:'rzp_test'") { edges { node { id name } } }
    }`);
    return new Response(JSON.stringify({ ok: true, data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
