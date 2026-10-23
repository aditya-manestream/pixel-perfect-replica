// Manestream library kit, real estate: home-loan EMI estimate.
// Loan defaults to 80% of the price (the usual bank limit above ₹75 L). Styled with the site's tokens.
import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { formatINR, formatINRCompact } from "../format";
import { emi } from "./emi";

interface EmiCalculatorProps {
  /** Property price in ₹. Sets the default loan (80%) and the slider's top end. */
  price?: number;
  /** Starting loan amount in ₹; overrides the 80% default. */
  loan?: number;
  /** Annual interest rate in percent. */
  rate?: number;
  /** Tenure in years. */
  tenure?: number;
  title?: string;
  /** Optional action under the result, e.g. a site-visit or WhatsApp button. */
  action?: ReactNode;
  className?: string;
}

const digits = (s: string) => Number(s.replace(/\D/g, "")) || 0;

function Slider({ id, label, value, display, min, max, step, onChange }: {
  id: string; label: string; value: number; display: ReactNode; min: number; max: number; step: number; onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-sm font-medium">{label}</label>
        <span className="tabular text-sm text-muted-foreground">{display}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer accent-primary"
      />
    </div>
  );
}

export function EmiCalculator({ price, loan, rate = 8.5, tenure = 20, title = "EMI calculator", action, className }: EmiCalculatorProps) {
  const uid = useId();
  // Slider runs to the price, or comfortably past the given loan, or ₹2 Cr.
  const max = price ?? Math.max((loan ?? 0) * 1.5, 2e7);
  const [amount, setAmount] = useState(Math.round(loan ?? (price ? price * 0.8 : 5e6)));
  const [r, setR] = useState(rate);
  const [years, setYears] = useState(tenure);
  const monthly = emi(amount, r, years);
  const total = monthly * years * 12;

  return (
    <section aria-labelledby={`${uid}-t`} className={cn("rounded-lg border border-border bg-card p-6 text-card-foreground md:p-8", className)}>
      <h3 id={`${uid}-t`} className="text-xl font-semibold">{title}</h3>
      <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        <div className="min-w-0 space-y-6">
          <div className="space-y-2">
            <label htmlFor={`${uid}-amt`} className="text-sm font-medium">Loan amount</label>
            <div className="flex">
              <span className="inline-flex h-11 items-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-sm text-muted-foreground">₹</span>
              <input
                id={`${uid}-amt`}
                inputMode="numeric"
                value={amount.toLocaleString("en-IN")}
                onChange={(e) => setAmount(Math.min(digits(e.target.value), max * 2))}
                className="tabular h-11 w-full rounded-r-md border border-input bg-background px-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <input
              type="range"
              aria-label="Loan amount"
              min={0}
              max={max}
              step={50000}
              value={Math.min(amount, max)}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="h-2 w-full cursor-pointer accent-primary"
            />
            {price ? <p className="text-xs text-muted-foreground">{Math.round((amount / price) * 100)}% of {formatINRCompact(price)}</p> : null}
          </div>
          <Slider id={`${uid}-rate`} label="Interest rate" value={r} display={`${r.toFixed(2)}% a year`} min={6} max={14} step={0.05} onChange={setR} />
          <Slider id={`${uid}-yrs`} label="Tenure" value={years} display={`${years} years`} min={5} max={30} step={1} onChange={setYears} />
        </div>
        <div className="rounded-md bg-muted p-6 md:min-w-[15rem]" aria-live="polite">
          <p className="text-sm text-muted-foreground">Monthly EMI</p>
          <p className="tabular mt-1 text-3xl font-semibold">{formatINR(monthly)}</p>
          <dl className="mt-4 space-y-1 text-sm">
            <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Interest</dt><dd className="tabular">{formatINRCompact(Math.max(total - amount, 0))}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Total payable</dt><dd className="tabular">{formatINRCompact(total)}</dd></div>
          </dl>
          {action ? <div className="mt-5">{action}</div> : null}
        </div>
      </div>
      <p className="mt-6 text-xs text-muted-foreground">
        An estimate only. Your EMI depends on the lender, your eligibility and the rate on the day of sanction.
      </p>
    </section>
  );
}
