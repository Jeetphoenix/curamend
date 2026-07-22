import { Reveal } from "@/components/ui-custom/Reveal";
import { ButtonLink } from "@/components/ui-custom/Button";
import { SacredGeometry } from "@/components/ui-custom/SacredGeometry";

type CTABannerProps = {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaTo?: string;
};

export function CTABanner({
  title = "Ready to Begin Your Healing Journey?",
  subtitle = "Sessions every Saturday.",
  ctaLabel = "Contact Us Today",
  ctaTo = "/contact",
}: CTABannerProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-spotlight">
      <div className="pointer-events-none absolute -left-32 top-1/2 h-[500px] w-[500px] -translate-y-1/2 text-white opacity-[0.08]">
        <SacredGeometry className="h-full w-full" reverse />
      </div>
      <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:px-8">
        <Reveal>
          <h2 className="font-display text-4xl text-white sm:text-5xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-lg text-platinum/90">{subtitle}</p>
          <div className="mt-8 flex justify-center">
            <ButtonLink to={ctaTo} variant="gold" size="lg">
              {ctaLabel}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
