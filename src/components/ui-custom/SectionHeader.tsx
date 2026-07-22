import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  light?: boolean;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
  className,
}: SectionHeaderProps) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <p className="font-ui text-xs font-semibold uppercase tracking-[0.25em] text-cerulean">
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "mt-3 font-display text-4xl leading-[1.1] sm:text-5xl",
          light ? "text-navy" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 font-body text-base leading-relaxed sm:text-lg",
            light ? "text-navy/70" : "text-platinum/80",
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
