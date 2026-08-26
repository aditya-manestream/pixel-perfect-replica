import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';
import { createHmac } from 'node:crypto';
import { createShopifyOrder, adminTokenConfigured } from '../_shared/shopify-admin.ts';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

interface IncomingLine {
  variantId?: unknown;
  quantity?: unknown;
  price?: unknown;
}

function sanitizeLines(raw: unknown): { variantId: string; quantity: number; price?: number }[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((l: IncomingLine) => {
    const variantId = typeof l?.variantId === 'string' ? l.variantId : '';
    const quantity = Number(l?.quantity);
    if (!variantId.startsWith('gid://shopify/ProductVariant/')) return [];
    if (!Number.isFinite(quantity) || quantity < 1 || quantity > 100) return [];
    const price = Number(l?.price);
    return [{
      variantId,
      quantity: Math.floor(quantity),
      ...(Number.isFinite(price) && price >= 0 ? { price } : {}),
    }];
  });
}

const str = (v: unknown, max = 200) =>
  typeof v === 'string' ? v.trim().slice(0, max) : '';

async function logSync(record: Record<string, unknown>) {
  try {
    const url = Deno.env.get('SUPABASE_URL');
    const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!url || !key) return;
    const client = createClient(url, key);
    await client.from('shopify_order_sync').insert(record);
  } catch (e) {
    console.error('Failed to write shopify_order_sync row', e);
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      customer,
      lines,
      totals,
    } = body ?? {};

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return json({ error: 'Missing fields' }, 400);
    }

    const keySecret = Deno.env.get('RAZORPAY_KEY_SECRET');
    if (!keySecret) return json({ error: 'Razorpay not configured' }, 500);

    // Signature check is the gate: nothing downstream runs for an unverified payment.
    const expected = createHmac('sha256', keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expected !== razorpay_signature) {
      return json({ verified: false, error: 'Invalid signature' }, 400);
    }

    let shopifyOrderName: string | null = null;
    let shopifySynced = false;
    let syncError: string | null = null;

    const safeLines = sanitizeLines(lines);

    if (!adminTokenConfigured()) {
      syncError = 'SHOPIFY_ADMIN_ACCESS_TOKEN not configured';
      console.error(syncError);
    } else if (safeLines.length === 0) {
      syncError = 'No valid Shopify variant lines supplied';
      console.error(syncError, JSON.stringify(lines));
    } else {
      try {
        const total = Number(totals?.total);
        const shipping = Number(totals?.shipping);
        const discount = Number(totals?.discount);

        const order = await createShopifyOrder({
          paymentId: String(razorpay_payment_id),
          razorpayOrderId: String(razorpay_order_id),
          email: str(customer?.email, 120) || 'orders@ardorilabel.com',
          phone: str(customer?.phone, 20),
          currency: 'INR',
          lines: safeLines,
          shippingAddress: {
            firstName: str(customer?.firstName, 60),
            lastName: str(customer?.lastName, 60),
            address1: str(customer?.address1, 200),
            address2: str(customer?.address2, 200),
            city: str(customer?.city, 80),
            province: str(customer?.state, 80),
            zip: str(customer?.pincode, 12),
            country: 'India',
            phone: str(customer?.phone, 20),
          },
          shippingAmount: Number.isFinite(shipping) ? shipping : 0,
          discountAmount: Number.isFinite(discount) ? discount : 0,
          discountCode: str(totals?.promoCode, 40) || null,
          totalAmount: Number.isFinite(total) && total > 0
            ? total
            : safeLines.reduce((s, l) => s + (l.price ?? 0) * l.quantity, 0),
        });

        shopifyOrderName = order.name;
        shopifySynced = true;
      } catch (e) {
        syncError = (e as Error).message;
        // The customer already paid — never fail their confirmation because
        // Shopify was unreachable. Persist everything needed to replay it.
        console.error('Shopify order sync failed', syncError);
      }
    }

    await logSync({
      razorpay_payment_id: String(razorpay_payment_id),
      razorpay_order_id: String(razorpay_order_id),
      shopify_order_name: shopifyOrderName,
      status: shopifySynced ? 'synced' : 'failed',
      error_message: syncError,
      payload: { customer, lines: safeLines, totals },
    });

    return json({
      verified: true,
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
      shopify_order_name: shopifyOrderName,
      shopify_synced: shopifySynced,
    });
  } catch (e) {
    console.error(e);
    return json({ error: (e as Error).message }, 500);
  }
});
