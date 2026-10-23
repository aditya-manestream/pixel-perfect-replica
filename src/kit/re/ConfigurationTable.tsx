// Manestream library kit, real estate: configurations with carpet area, ₹ price and status.
// A table from md up, stacked cards on phones (no horizontal scroll at 390). Floor plans go to WhatsApp.
import { cn } from "@/lib/utils";
import { site } from "@/site.config";
import { whatsappLink } from "../contact";
import { formatINR, formatINRCompact } from "../format";
import { formatSqft, formatSqm, sqftToGunthas } from "./emi";
import type { Configuration, PriceValue } from "./types";

export function formatPrice(price?: PriceValue): string {
  if (price === undefined) return "Price on request";
  return Array.isArray(price) ? `${formatINRCompact(price[0])} – ${formatINRCompact(price[1])}` : formatINRCompact(price);
}

interface ConfigurationTableProps {
  rows: Configuration[];
  /** Project name for the WhatsApp message; defaults to the brand. */
  project?: string;
  /** Column heading for the area: "Carpet area" for homes, "Plot area" for land. */
  areaLabel?: string;
  /** Also show the area in square metres. */
  showSqm?: boolean;
  /** Also show the area in gunthas (plots in Maharashtra, Karnataka, Gujarat). */
  showGunthas?: boolean;
  actionLabel?: string;
  /** Small print under the table, e.g. "All-inclusive prices; stamp duty extra." */
  footnote?: string;
  className?: string;
}

const gunthas = (a: number | [number, number]) =>
  Array.isArray(a) ? `${sqftToGunthas(a[0])}–${sqftToGunthas(a[1])} gunthas` : `${sqftToGunthas(a)} gunthas`;

export function ConfigurationTable({ rows, project, areaLabel = "Carpet area", showSqm, showGunthas, actionLabel = "Request floor plan", footnote, className }: ConfigurationTableProps) {
  const name = project ?? site.name;
  const link = (c: Configuration) => whatsappLink(`Hi ${site.name}, please share the floor plan and price for the ${c.type} at ${name}.`);
  const extra = (c: Configuration) => [showSqm && formatSqm(c.carpetSqft), showGunthas && gunthas(c.carpetSqft)].filter(Boolean).join(", ");
  const area = (c: Configuration) => (extra(c) ? `${formatSqft(c.carpetSqft)} (${extra(c)})` : formatSqft(c.carpetSqft));
  const hasRate = rows.some((c) => c.ratePerSqft !== undefined);
  const rate = (c: Configuration) => (c.ratePerSqft !== undefined ? `${formatINR(c.ratePerSqft)}/sq ft` : "—");
  const action = (c: Configuration) => (
    <a
      href={link(c)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${actionLabel}: ${c.type}`}
      className="inline-flex min-h-11 items-center font-medium text-primary underline-offset-4 hover:underline"
    >
      {actionLabel}
    </a>
  );

  return (
    <div className={className}>
      <table className="hidden w-full text-left md:table">
        <thead>
          <tr className="border-b border-border text-sm text-muted-foreground">
            <th scope="col" className="py-3 pr-4 font-medium">Configuration</th>
            <th scope="col" className="py-3 pr-4 font-medium">{areaLabel}</th>
            {hasRate ? <th scope="col" className="py-3 pr-4 font-medium">Rate</th> : null}
            <th scope="col" className="py-3 pr-4 font-medium">Price</th>
            <th scope="col" className="py-3 pr-4 font-medium">Status</th>
            <th scope="col" className="py-3 font-medium"><span className="sr-only">Floor plan</span></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((c) => (
            <tr key={c.type} className="border-b border-border align-middle">
              <th scope="row" className="py-4 pr-4 font-semibold">
                {c.type}
                {c.note ? <span className="block text-sm font-normal text-muted-foreground">{c.note}</span> : null}
              </th>
              <td className="tabular py-4 pr-4">{area(c)}</td>
              {hasRate ? <td className="tabular py-4 pr-4">{rate(c)}</td> : null}
              <td className="tabular py-4 pr-4">{formatPrice(c.price)}</td>
              <td className="py-4 pr-4 text-muted-foreground">{c.status ?? "—"}</td>
              <td className="py-4 text-right">{action(c)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="space-y-3 md:hidden">
        {rows.map((c) => (
          <li key={c.type} className="rounded-lg border border-border p-4">
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-semibold">{c.type}</p>
              <p className="tabular font-semibold">{formatPrice(c.price)}</p>
            </div>
            <p className={cn("tabular mt-1 text-sm text-muted-foreground")}>
              {areaLabel}: {area(c)}
              {hasRate && c.ratePerSqft !== undefined ? ` · ${rate(c)}` : ""}
              {c.status ? ` · ${c.status}` : ""}
            </p>
            {c.note ? <p className="mt-1 text-sm text-muted-foreground">{c.note}</p> : null}
            <div className="mt-2">{action(c)}</div>
          </li>
        ))}
      </ul>
      {footnote ? <p className="mt-4 text-xs text-muted-foreground">{footnote}</p> : null}
    </div>
  );
}
