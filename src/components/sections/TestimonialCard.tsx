import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@/data/content";
import { cn } from "@/lib/utils";

export function TestimonialCard({
  t,
  withMeta = false,
  className,
}: {
  t: Testimonial;
  withMeta?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-2xl border-l-2 border-violet bg-white p-6 shadow-[0_10px_40px_-24px_rgba(26,31,75,0.35)] transition-transform duration-300 hover:-translate-y-1",
        className,
      )}
    >
      <Quote className="h-8 w-8 text-gold" />
      <p className="mt-4 flex-1 font-body text-[15px] leading-relaxed text-navy/80">
        “{t.quote}”
      </p>
      <div className="mt-5 flex items-center gap-3">
        {withMeta && (
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-violet/10 font-ui text-sm font-semibold text-violet">
            {t.name.replace(/[^A-Z]/g, "").slice(0, 2)}
          </span>
        )}
        <div className="min-w-0">
          <p className="font-ui text-sm font-semibold text-navy">{t.name}</p>
          {withMeta && t.date && (
            <p className="font-ui text-xs text-navy/50">{t.date}</p>
          )}
        </div>
        <div className="ml-auto flex shrink-0 gap-0.5">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-gold text-gold" />
          ))}
        </div>
      </div>
    </div>
  );
}
