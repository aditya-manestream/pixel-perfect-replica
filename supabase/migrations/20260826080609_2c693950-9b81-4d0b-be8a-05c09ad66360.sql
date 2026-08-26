CREATE TABLE public.shopify_order_sync (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  razorpay_payment_id text NOT NULL,
  razorpay_order_id text,
  shopify_order_name text,
  status text NOT NULL,
  error_message text,
  payload jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX shopify_order_sync_payment_idx ON public.shopify_order_sync (razorpay_payment_id);

GRANT ALL ON public.shopify_order_sync TO service_role;

ALTER TABLE public.shopify_order_sync ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage order sync log"
ON public.shopify_order_sync
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');