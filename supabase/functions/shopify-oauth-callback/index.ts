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
    const data = await adminGraphql(`query ConnectionCheck { shop { name myshopifyDomain } }`);
    const shop = data?.shop;

    let diag = "";
    if (url.searchParams.get("selftest") === "1") {
      diag = `<pre>${JSON.stringify(await selfTest(), null, 1)}</pre>`;
    }

    return page(`
      <h1>Shopify is connected</h1>
      <p class="note"><strong>Store:</strong> ${shop?.name || "Ardori"}</p>
      <p class="note"><strong>Domain:</strong> ${shop?.myshopifyDomain || "ardori-4.myshopify.com"}</p>
      ${diag}
      <p class="note">The website can securely create Shopify orders after verified Razorpay payments. No access token needs to be copied or stored manually.</p>
    `);
  } catch (err: any) {
    return page(`<h1>Shopify connection failed</h1><pre>${err.message || err}</pre>`);
  }
});

/**
 * Creates a throwaway order with inventory bypassed, then deletes it, to prove
 * the orderCreate mutation shape is valid against the live Admin API.
 */
async function selfTest() {
  const products = await adminGraphql(`
    query { products(first: 5, query: "status:active") { edges { node { id title variants(first:1) { edges { node { id price } } } } } } }
  `);
  const node = products?.products?.edges?.[0]?.node;
  const variant = node?.variants?.edges?.[0]?.node;
  if (!variant) return { ok: false, reason: "no active variant found" };

  const created = await adminGraphql(
    `mutation CreateOrder($order: OrderCreateOrderInput!, $options: OrderCreateOptionsInput) {
      orderCreate(order: $order, options: $options) {
        order { id name displayFinancialStatus totalPriceSet { shopMoney { amount currencyCode } } }
        userErrors { field message }
      }
    }`,
    {
      order: {
        email: "selftest@ardorilabel.com",
        currency: "INR",
        financialStatus: "PAID",
        tags: ["razorpay", "website", "rzp_selftest_diagnostic"],
        note: "Automated connection self-test",
        lineItems: [{ variantId: variant.id, quantity: 1, priceSet: { shopMoney: { amount: variant.price, currencyCode: "INR" } } }],
        shippingAddress: {
          firstName: "Self", lastName: "Test", address1: "1 Test Road", city: "Mumbai",
          province: "Maharashtra", zip: "400001", countryCode: "IN", phone: "+919999999999",
        },
        shippingLines: [{ title: "Standard Shipping", priceSet: { shopMoney: { amount: "199.00", currencyCode: "INR" } } }],
        transactions: [{ kind: "SALE", status: "SUCCESS", gateway: "razorpay", amountSet: { shopMoney: { amount: variant.price, currencyCode: "INR" } } }],
      },
      options: { inventoryBehaviour: "BYPASS", sendReceipt: false },
    },
  );

  const userErrors = created?.orderCreate?.userErrors ?? [];
  const order = created?.orderCreate?.order;

  let lookup = null;
  let deleted = null;
  if (order?.id) {
    const found = await adminGraphql(
      `query($q: String!) { orders(first:1, query:$q) { edges { node { id name } } } }`,
      { q: "tag:'rzp_selftest_diagnostic'" },
    );
    lookup = found?.orders?.edges?.[0]?.node ?? null;

    const del = await adminGraphql(
      `mutation($input: OrderDeleteInput!) { orderDelete(input: $input) { deletedId userErrors { message } } }`,
      { input: { id: order.id } },
    );
    deleted = del?.orderDelete ?? null;
  }

  return { product: node?.title, userErrors, order, tagLookupWorks: Boolean(lookup), deleted };
}
