// Shopify Admin API helper. Used server-side only — the Admin token must never
// reach the browser.

const SHOPIFY_STORE_DOMAIN = 'ardori-4.myshopify.com';
const SHOPIFY_ADMIN_API_VERSION = '2025-01';

export interface ShippingAddressInput {
  firstName?: string;
  lastName?: string;
  address1?: string;
  address2?: string;
  city?: string;
  province?: string;
  zip?: string;
  country?: string;
  phone?: string;
}

export interface OrderLineInput {
  variantId: string;
  quantity: number;
  price?: number;
}

export interface CreateOrderInput {
  paymentId: string;
  razorpayOrderId?: string;
  email: string;
  phone?: string;
  currency?: string;
  lines: OrderLineInput[];
  shippingAddress: ShippingAddressInput;
  shippingAmount?: number;
  discountAmount?: number;
  discountCode?: string | null;
  totalAmount: number;
}

export function adminTokenConfigured(): boolean {
  return !!Deno.env.get('SHOPIFY_ADMIN_ACCESS_TOKEN');
}

export async function adminGraphql(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<any> {
  const token = Deno.env.get('SHOPIFY_ADMIN_ACCESS_TOKEN');
  if (!token) throw new Error('SHOPIFY_ADMIN_ACCESS_TOKEN is not configured');

  const res = await fetch(
    `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_ADMIN_API_VERSION}/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': token,
      },
      body: JSON.stringify({ query, variables }),
    },
  );

  const body = await res.text();
  if (!res.ok) {
    throw new Error(`Shopify Admin API [${res.status}]: ${body}`);
  }

  const json = JSON.parse(body);
  if (json.errors) {
    throw new Error(`Shopify Admin API error: ${JSON.stringify(json.errors)}`);
  }
  return json.data;
}

const money = (amount: number, currencyCode: string) => ({
  shopMoney: { amount: amount.toFixed(2), currencyCode },
});

const FIND_ORDER_QUERY = `
  query FindOrderByPayment($query: String!) {
    orders(first: 1, query: $query) {
      edges { node { id name } }
    }
  }
`;

const ORDER_CREATE_MUTATION = `
  mutation CreateOrder($order: OrderCreateOrderInput!, $options: OrderCreateOptionsInput) {
    orderCreate(order: $order, options: $options) {
      order {
        id
        name
      }
      userErrors {
        field
        message
      }
    }
  }
`;

/**
 * Look for an order already carrying this Razorpay payment id so a retry (or a
 * duplicated webhook/handler call) can never create a second Shopify order.
 */
export async function findExistingOrder(paymentId: string): Promise<{ id: string; name: string } | null> {
  const data = await adminGraphql(FIND_ORDER_QUERY, { query: `tag:'rzp_${paymentId}'` });
  return data?.orders?.edges?.[0]?.node ?? null;
}

/**
 * Create a paid Shopify order mirroring the Razorpay charge. Inventory is
 * decremented so stock, analytics and Shiprocket all stay in sync.
 */
export async function createShopifyOrder(input: CreateOrderInput): Promise<{ id: string; name: string }> {
  const currency = input.currency || 'INR';
  const existing = await findExistingOrder(input.paymentId);
  if (existing) return existing;

  const addr = input.shippingAddress ?? {};
  const shippingAddress = {
    firstName: addr.firstName || 'Customer',
    lastName: addr.lastName || '',
    address1: addr.address1 || '',
    address2: addr.address2 || '',
    city: addr.city || '',
    provinceCode: undefined as string | undefined,
    province: addr.province || '',
    zip: addr.zip || '',
    countryCode: 'IN',
    phone: addr.phone || input.phone || '',
  };
  delete (shippingAddress as Record<string, unknown>).provinceCode;

  const order: Record<string, unknown> = {
    email: input.email,
    phone: input.phone || undefined,
    currency,
    financialStatus: 'PAID',
    tags: ['razorpay', 'website', `rzp_${input.paymentId}`],
    note: `Paid via Razorpay. Payment ID: ${input.paymentId}${
      input.razorpayOrderId ? ` | Razorpay Order: ${input.razorpayOrderId}` : ''
    }`,
    lineItems: input.lines.map((l) => ({
      variantId: l.variantId,
      quantity: l.quantity,
      ...(l.price !== undefined ? { priceSet: money(l.price, currency) } : {}),
    })),
    shippingAddress,
    billingAddress: shippingAddress,
    transactions: [
      {
        kind: 'SALE',
        status: 'SUCCESS',
        gateway: 'razorpay',
        amountSet: money(input.totalAmount, currency),
      },
    ],
  };

  if (input.shippingAmount && input.shippingAmount > 0) {
    order.shippingLines = [
      {
        title: 'Standard Shipping',
        priceSet: money(input.shippingAmount, currency),
      },
    ];
  }

  if (input.discountAmount && input.discountAmount > 0) {
    order.discountCode = {
      itemFixedDiscountCode: {
        code: input.discountCode || 'PROMO',
        amountSet: money(input.discountAmount, currency),
      },
    };
  }

  const data = await adminGraphql(ORDER_CREATE_MUTATION, {
    order,
    options: { inventoryBehaviour: 'DECREMENT_OBLIGATORY', sendReceipt: false },
  });

  const errors = data?.orderCreate?.userErrors ?? [];
  if (errors.length > 0) {
    throw new Error(`Shopify orderCreate failed: ${JSON.stringify(errors)}`);
  }

  const created = data?.orderCreate?.order;
  if (!created) throw new Error('Shopify orderCreate returned no order');
  return created;
}
