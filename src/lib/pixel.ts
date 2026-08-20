// Meta (Facebook) Pixel helpers. Safe no-ops when the pixel is blocked or absent.

type Fbq = (...args: unknown[]) => void;

const getFbq = (): Fbq | null => {
  if (typeof window === "undefined") return null;
  const fbq = (window as unknown as { fbq?: Fbq }).fbq;
  return typeof fbq === "function" ? fbq : null;
};

const track = (event: string, params?: Record<string, unknown>, options?: { eventID?: string }) => {
  const fbq = getFbq();
  if (!fbq) return;
  try {
    if (options?.eventID) fbq("track", event, params ?? {}, options);
    else fbq("track", event, params ?? {});
  } catch {
    /* ignore pixel failures */
  }
};

export interface PixelLine {
  id: string;
  name?: string;
  quantity: number;
  price: number;
}

const toContents = (lines: PixelLine[]) =>
  lines.map((l) => ({ id: l.id, quantity: l.quantity, item_price: l.price }));

export const trackViewContent = (line: PixelLine) => {
  track("ViewContent", {
    content_ids: [line.id],
    content_type: "product",
    content_name: line.name,
    value: line.price,
    currency: "INR",
  });
};

export const trackAddToCart = (line: PixelLine) => {
  track("AddToCart", {
    content_ids: [line.id],
    content_type: "product",
    content_name: line.name,
    contents: toContents([line]),
    value: line.price * line.quantity,
    currency: "INR",
  });
};

export const trackInitiateCheckout = (lines: PixelLine[], value: number) => {
  track("InitiateCheckout", {
    content_ids: lines.map((l) => l.id),
    content_type: "product",
    contents: toContents(lines),
    num_items: lines.reduce((sum, l) => sum + l.quantity, 0),
    value,
    currency: "INR",
  });
};

const PURCHASE_KEY = "ardori-pixel-purchases";

const alreadyTracked = (paymentId: string) => {
  try {
    const raw = sessionStorage.getItem(PURCHASE_KEY);
    const ids: string[] = raw ? JSON.parse(raw) : [];
    if (ids.includes(paymentId)) return true;
    sessionStorage.setItem(PURCHASE_KEY, JSON.stringify([...ids, paymentId].slice(-20)));
    return false;
  } catch {
    return false;
  }
};

export const trackPurchase = (opts: {
  paymentId: string;
  value: number;
  lines?: PixelLine[];
}) => {
  if (!opts.paymentId || alreadyTracked(opts.paymentId)) return;
  track(
    "Purchase",
    {
      value: opts.value,
      currency: "INR",
      content_type: "product",
      ...(opts.lines?.length
        ? { content_ids: opts.lines.map((l) => l.id), contents: toContents(opts.lines), num_items: opts.lines.reduce((s, l) => s + l.quantity, 0) }
        : {}),
    },
    { eventID: opts.paymentId }
  );
};
