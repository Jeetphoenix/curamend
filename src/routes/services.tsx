import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SERVICES, PROCESS_STEPS, FAQS } from "@/data/content";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeader } from "@/components/ui-custom/SectionHeader";
import { CinematicVideoBg } from "@/components/animations/CinematicVideoBg";
import { AnimatedPageBg } from "@/components/animations/AnimatedPageBg";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SITE_URL = "https://www.sunilsaldanha.com";

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/services#webpage`,
  url: `${SITE_URL}/services`,
  name: "Emotional Healing Services | Curamend — Sunil Saldanha",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
    ],
  },
};

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Emotional Healing Services | Curamend — Sunil Saldanha" },
      {
        name: "description",
        content:
          "Explore emotional healing services by Sunil Saldanha at Curamend — trauma release, breathwork, energy psychology, group healing sessions and individual consultations.",
      },
      {
        name: "keywords",
        content:
          "emotional healing services, trauma release, breathwork sessions, energy psychology, group healing, individual healing consultation, Sunil Saldanha services, Curamend services, mindfulness therapy",
      },
      { property: "og:title", content: "Emotional Healing Services | Curamend — Sunil Saldanha" },
      {
        property: "og:description",
        content:
          "Evidence-based, spiritually grounded healing services for lasting emotional freedom — personally led by Sunil Saldanha.",
      },
      { property: "og:url", content: `${SITE_URL}/services` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/services` }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(servicesJsonLd) }],
  }),
  component: Services,
});

function ServicesHero() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".svc-hero-el",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.3 }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-black pt-28 pb-20">
      <CinematicVideoBg 
        src="https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-background-1610-large.mp4" 
        overlayOpacity={0.7}
        overlayGradient="bg-gradient-to-b from-black via-black/50 to-black"
      />
      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-8">
        <p className="svc-hero-el font-ui text-xs font-semibold uppercase tracking-[0.3em] text-cerulean opacity-0">
          What We Offer
        </p>
        <h1 className="svc-hero-el mt-5 font-display text-5xl font-light text-white sm:text-6xl md:text-7xl opacity-0">
          Our <span className="text-gradient-gold">Services</span>
        </h1>
        <p className="svc-hero-el mx-auto mt-6 max-w-2xl font-body text-lg text-platinum/80 opacity-0">
          A spectrum of healing modalities, each rooted in science and delivered with spiritual depth — all personally guided by Sunil Saldanha.
        </p>
      </div>
    </section>
  );
}

function ServiceGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".svc-card",
        { opacity: 0, y: 60, scale: 0.94 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.8, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%" }
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-[#f5f3ff] py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader eyebrow="Healing Modalities" title="How We Help You Heal" light />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              className="svc-card group relative flex h-full flex-col rounded-2xl border-t-2 border-violet bg-white p-7 shadow-[0_12px_40px_-26px_rgba(26,31,75,0.4)] opacity-0 cursor-default overflow-hidden"
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
              whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
            >
              {/* Glow background on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-violet/5 to-cerulean/5"
                animate={{ opacity: hovered === i ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative grid h-12 w-12 place-items-center rounded-xl bg-violet/10 text-violet transition-all duration-300 group-hover:bg-violet group-hover:text-white">
                <s.icon className="h-6 w-6" />
              </span>
              <h3 className="relative mt-5 font-display text-2xl text-navy">{s.title}</h3>
              <p className="relative mt-2 flex-1 font-body text-[15px] leading-relaxed text-navy/70">
                {s.description}
              </p>
              <div className="relative mt-6 overflow-hidden rounded-xl border border-violet/15 aspect-[3/2]">
                <img
                  src={s.imageUrl}
                  alt={s.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessTimeline() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".process-card");
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, x: i % 2 === 0 ? -60 : 60 },
          {
            opacity: 1, x: 0, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 80%" }
          }
        );
      });
      // Animated connecting line
      gsap.fromTo(".process-line",
        { scaleY: 0 },
        {
          scaleY: 1, duration: 1.5, ease: "power2.inOut",
          scrollTrigger: { trigger: ref.current, start: "top 70%", scrub: 1 }
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden bg-navy py-24">
      <AnimatedPageBg />
      <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-8">
        <SectionHeader eyebrow="The Journey" title="How Healing Works" />
        <div className="relative mt-14">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-[2px] -translate-x-1/2 bg-violet/20 md:block">
            <div className="process-line h-full w-full origin-top bg-gradient-to-b from-violet to-cerulean" style={{ scaleY: 0 }} />
          </div>
          <div className="flex flex-col gap-8">
            {PROCESS_STEPS.map((step, i) => (
              <div
                key={step.title}
                className={`process-card relative flex items-center gap-8 opacity-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Card */}
                <div className="flex-1 rounded-2xl border border-border bg-surface p-6 shadow-lg hover:border-violet/40 transition-colors duration-300">
                  <span className="font-display text-4xl text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 font-ui text-base font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-platinum/70">{step.text}</p>
                </div>
                {/* Center dot */}
                <div className="relative hidden md:flex h-8 w-8 shrink-0 items-center justify-center">
                  <motion.div
                    className="h-4 w-4 rounded-full bg-violet"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                  />
                </div>
                {/* Spacer for alternating layout */}
                <div className="hidden flex-1 md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".faq-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%" }
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-[#f5f3ff] py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeader eyebrow="Questions" title="Frequently Asked" light />
        <div className="faq-item mt-10 opacity-0">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-violet/15"
              >
                <AccordionTrigger className="text-left font-ui text-base font-semibold text-navy hover:no-underline hover:text-violet transition-colors">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="font-body text-[15px] leading-relaxed text-navy/70">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <>
      <ServicesHero />
      <ServiceGrid />
      <ProcessTimeline />
      <FAQSection />
    </>
  );
}
