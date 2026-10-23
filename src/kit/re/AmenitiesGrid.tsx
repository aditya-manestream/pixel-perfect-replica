// Manestream library kit, real estate: amenities as a responsive grid.
import { cn } from "@/lib/utils";
import type { Amenity } from "./types";

export function AmenitiesGrid({ items, className }: { items: Amenity[]; className?: string }) {
  return (
    <ul className={cn("grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-4", className)}>
      {items.map(({ name, description, icon: Icon }) => (
        <li key={name}>
          {Icon ? <Icon className="h-6 w-6 text-primary" aria-hidden="true" /> : null}
          <p className={cn("font-medium", Icon && "mt-3")}>{name}</p>
          {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
        </li>
      ))}
    </ul>
  );
}
