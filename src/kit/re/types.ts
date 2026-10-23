// Manestream library kit, real estate: data shapes for a site's src/data/ files.
// Keep project content in data files typed with these, so the next reskin edits data, not JSX.
import type { ComponentType } from "react";

/** A ₹ amount, or a [from, to] range. */
export type PriceValue = number | [number, number];

export interface Configuration {
  /** "2 BHK", "3 BHK + study", "Plot A (1,500 sq ft)". */
  type: string;
  /** Area in sq ft (carpet area, or plot area for land), or a [min, max] range. */
  carpetSqft: number | [number, number];
  /** All-inclusive price in ₹. Leave out to show "Price on request". */
  price?: PriceValue;
  /** "Available", "Few left", "Sold out", "Ready to move"… */
  status?: string;
  /** Rate in ₹ per sq ft; adds a Rate column when any row has it (plots, commercial). */
  ratePerSqft?: number;
  /** Short extra, e.g. "Private terrace". */
  note?: string;
}

export interface Amenity {
  name: string;
  description?: string;
  /** A lucide-react icon (or any component taking className). */
  icon?: ComponentType<{ className?: string }>;
}

export interface LocationPoint {
  place: string;
  /** Groups the list: "Schools", "Hospitals", "Connectivity"… */
  category?: string;
  distanceKm?: number;
  driveMins?: number;
}
