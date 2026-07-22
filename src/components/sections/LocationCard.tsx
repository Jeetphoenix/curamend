import { MapPin, Phone, ArrowUpRight } from "lucide-react";
import type { Location } from "@/data/content";

export function LocationCard({ loc }: { loc: Location }) {
  const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.mapsQuery)}`;
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-transform duration-300 hover:-translate-y-1">
      <div className="flex items-center gap-2">
        <span className="h-px w-6 bg-gold" />
        <h3 className="font-display text-2xl text-foreground">{loc.name}</h3>
      </div>
      <div className="mt-4 flex items-start gap-2.5 font-body text-sm text-platinum/80">
        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cerulean" />
        <span>{loc.address}</span>
      </div>
      <div className="mt-3 space-y-1.5">
        {loc.phones.map((p) => (
          <a
            key={p}
            href={`tel:${p.replace(/[^+\d]/g, "")}`}
            className="flex items-center gap-2.5 font-ui text-sm text-platinum/80 hover:text-foreground"
          >
            <Phone className="h-4 w-4 shrink-0 text-cerulean" />
            {p}
          </a>
        ))}
      </div>
      <a
        href={directions}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-1 font-ui text-sm font-semibold text-gold hover:text-amber"
      >
        Get Directions <ArrowUpRight className="h-4 w-4" />
      </a>
    </div>
  );
}
