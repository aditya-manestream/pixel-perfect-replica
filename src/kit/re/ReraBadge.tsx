// Manestream library kit, real estate: RERA registration, shown only when site.rera holds a real number.
// Renders nothing otherwise. Never put a placeholder number in site.config.ts.
import { cn } from "@/lib/utils";
import { site } from "@/site.config";

export function ReraBadge({ className }: { className?: string }) {
  const rera = site.rera;
  if (!rera?.number?.trim()) return null;
  return (
    <div className={cn("inline-flex items-center gap-3 rounded-md border border-border px-3 py-2 text-sm", className)}>
      {rera.qr ? <img src={rera.qr} alt={`${rera.authority} QR code`} width={56} height={56} className="h-14 w-14" /> : null}
      <div>
        <p className="font-medium">{rera.authority} registration</p>
        <p className="tabular text-muted-foreground">{rera.number}</p>
        {rera.url ? (
          <a href={rera.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
            Verify on {rera.authority}
          </a>
        ) : null}
      </div>
    </div>
  );
}
