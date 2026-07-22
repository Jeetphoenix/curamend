import { type ReactNode } from "react";
import { SacredGeometry } from "@/components/ui-custom/SacredGeometry";
import { Reveal } from "@/components/ui-custom/Reveal";

type PageHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, subtitle, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-cosmic pb-20 pt-36 sm:pt-44">
      <div className="pointer-events-none absolute -right-40 -top-32 h-[600px] w-[600px] text-violet opacity-[0.09]">
        <SacredGeometry className="h-full w-full" />
      </div>
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        {eyebrow && (
          <Reveal>
            <p className="font-ui text-xs font-semibold uppercase tracking-[0.28em] text-cerulean">
              {eyebrow}
            </p>
          </Reveal>
        )}
        <Reveal delay={0.05}>
          <h1 className="mt-4 font-display text-5xl leading-[1.05] text-foreground sm:text-6xl md:text-7xl">
            {title}
          </h1>
        </Reveal>
        {subtitle && (
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-2xl font-body text-lg text-platinum/80">{subtitle}</p>
          </Reveal>
        )}
        {children && <Reveal delay={0.15}>{children}</Reveal>}
      </div>
    </section>
  );
}
