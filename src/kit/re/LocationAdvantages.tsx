// Manestream library kit, real estate: nearby places with distance and drive time, grouped by category.
// Pass the site's own map (Leaflet, an embed or a static image) as `map`; the list sits beside it.
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { LocationPoint } from "./types";

const reach = (p: LocationPoint) =>
  [p.distanceKm !== undefined ? `${p.distanceKm} km` : "", p.driveMins !== undefined ? `${p.driveMins} min drive` : ""].filter(Boolean).join(" · ");

export function LocationAdvantages({ items, map, className }: { items: LocationPoint[]; map?: ReactNode; className?: string }) {
  const groups = new Map<string, LocationPoint[]>();
  for (const p of items) groups.set(p.category ?? "", [...(groups.get(p.category ?? "") ?? []), p]);
  return (
    <div className={cn("grid gap-10", map && "lg:grid-cols-2", className)}>
      {map ? <div className="min-h-[18rem] overflow-hidden rounded-lg">{map}</div> : null}
      <div className="space-y-8">
        {[...groups].map(([category, points]) => (
          <div key={category || "places"}>
            {category ? <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">{category}</h3> : null}
            <ul className={cn("divide-y divide-border", category && "mt-3")}>
              {points.map((p) => (
                <li key={p.place} className="flex items-baseline justify-between gap-4 py-3">
                  <span>{p.place}</span>
                  <span className="tabular shrink-0 text-sm text-muted-foreground">{reach(p)}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
