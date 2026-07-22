import { useEffect, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Calendar, Clock, CheckCircle2 } from "lucide-react";
import { SESSION_INCLUDES } from "@/data/content";
import { SectionHeader } from "@/components/ui-custom/SectionHeader";
import { AnimatedPageBg } from "@/components/animations/AnimatedPageBg";
import { lazy, Suspense } from "react";
import { ButtonLink } from "@/components/ui-custom/Button";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const HealingSanctuary = lazy(() => import("@/components/animations/HealingSanctuary"));

gsap.registerPlugin(ScrollTrigger);

const SITE_URL = "https://www.sunilsaldanha.com";

const sessionsJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  "@id": `${SITE_URL}/sessions#event`,
  name: "Saturday Emotional Healing Sessions with Sunil Saldanha",
  description:
    "Two-hour group emotional healing sessions held every Saturday, personally led by Sunil Saldanha at Curamend.",
  eventSchedule: {
    "@type": "Schedule",
    repeatFrequency: "P1W",
    byDay: "https://schema.org/Saturday",
    duration: "PT2H",
  },
  organizer: {
    "@type": "Person",
    name: "Sunil Saldanha",
    url: `${SITE_URL}/about`,
  },
  url: `${SITE_URL}/sessions`,
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Sessions", item: `${SITE_URL}/sessions` },
    ],
  },
};

export const Route = createFileRoute("/sessions")({
  head: () => ({
    meta: [
      { title: "Saturday Emotional Healing Sessions with Sunil Saldanha | Curamend" },
      {
        name: "description",
        content:
          "Join Sunil Saldanha's two-hour group emotional healing sessions every Saturday at Curamend. Limited seats — reserve your spot today.",
      },
      {
        name: "keywords",
        content:
          "Saturday healing sessions, group emotional healing, Sunil Saldanha sessions, Curamend sessions, emotional healing group, weekly healing session, trauma healing group, breathwork session",
      },
      { property: "og:title", content: "Saturday Emotional Healing Sessions — Sunil Saldanha | Curamend" },
      {
        property: "og:description",
        content:
          "Two-hour emotional healing sessions every Saturday with Sunil Saldanha. What to expect, what's included and how to reserve your spot.",
      },
      { property: "og:url", content: `${SITE_URL}/sessions` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/sessions` }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(sessionsJsonLd) }],
  }),
  component: Sessions,
});

const whatToBring = [
  "An open mind and a willingness to feel",
  "Comfortable, loose-fitting clothing",
  "A personal water bottle",
  "A journal or notebook (optional)",
  "Any questions you'd like answered",
];

function SessionsHero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".ses-hero-el",
        { y: 70, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.3 }
      );
      // Pulsing Saturday badge
      gsap.to(".sat-badge", {
        scale: 1.05,
        boxShadow: "0 0 40px rgba(91,79,207,0.6)",
        duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut"
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative flex min-h-[75vh] items-center justify-center overflow-hidden bg-black pt-28 pb-20">
      <AnimatedPageBg />

      {/* Animated calendar rings */}
      <div className="absolute left-[-5%] top-1/2 -translate-y-1/2 pointer-events-none opacity-15">
        <motion.div
          className="h-[600px] w-[600px] rounded-full border border-violet/50"
          animate={{ rotate: 360 }}
          transition={{ duration: 50, ease: "linear", repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[440px] w-[440px] rounded-full border border-gold/40"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-8">
        <div className="ses-hero-el mx-auto mb-8 opacity-0">
          <span className="sat-badge inline-block rounded-full border border-violet/50 bg-violet/20 px-6 py-2 font-ui text-sm font-semibold text-violet backdrop-blur-sm">
            Every Saturday · 2 Hours · Limited Seats
          </span>
        </div>
        <h1 className="ses-hero-el font-display text-5xl font-light text-white sm:text-6xl md:text-7xl opacity-0">
          Saturday <span className="text-gradient-violet">Healing</span> Sessions
        </h1>
        <p className="ses-hero-el mx-auto mt-6 max-w-2xl font-body text-lg text-platinum/80 opacity-0">
          A protected space, once a week, to do the deep work of emotional healing — guided personally by Sunil Saldanha.
        </p>
        <div className="ses-hero-el mt-8 flex justify-center gap-4 opacity-0">
          <ButtonLink to="/contact" size="lg">
            Reserve Your Spot
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

function SanctuaryTourSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".sanctuary-text",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 70%" }
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden bg-black py-24 border-y border-white/10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 mb-12 text-center">
        <p className="sanctuary-text font-ui text-xs font-semibold uppercase tracking-[0.3em] text-gold mb-3 opacity-0">
          Interactive Experience
        </p>
        <h2 className="sanctuary-text font-display text-4xl text-white sm:text-5xl opacity-0">
          The Session Hall
        </h2>
        <p className="sanctuary-text mx-auto mt-4 max-w-2xl font-body text-lg text-platinum/70 opacity-0">
          Step inside a 3D simulation of our physical group session hall. Take a walkaround to 
          familiarize yourself with the safe, contained space where deep healing happens.
        </p>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 w-full h-[60vh] sm:h-[70vh] rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(91,79,207,0.15)] relative">
        <Suspense fallback={
          <div className="absolute inset-0 flex items-center justify-center bg-navy">
            <p className="font-ui text-sm uppercase tracking-widest text-gold animate-pulse">Loading Hall...</p>
          </div>
        }>
          <HealingSanctuary />
        </Suspense>
      </div>
    </section>
  );
}

function FormatSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".format-text",
        { opacity: 0, x: -50 },
        {
          opacity: 1, x: 0, duration: 0.9, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 70%" }
        }
      );
      gsap.fromTo(".format-img",
        { opacity: 0, x: 50, scale: 0.9 },
        {
          opacity: 1, x: 0, scale: 1, duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 70%" }
        }
      );
      gsap.fromTo(".format-badge",
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.6, stagger: 0.15, ease: "back.out(2)",
          scrollTrigger: { trigger: ref.current, start: "top 70%" }, delay: 0.5
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden bg-navy py-24">
      <AnimatedPageBg />
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <p className="format-text font-ui text-xs font-semibold uppercase tracking-[0.28em] text-cerulean opacity-0">The Format</p>
          <h2 className="format-text mt-3 font-display text-4xl text-foreground sm:text-5xl opacity-0">
            What to Expect
          </h2>
          <p className="format-text mt-6 font-body text-[15px] leading-relaxed text-platinum/80 opacity-0">
            Each session unfolds over two unhurried hours. You'll move through grounding,
            breathwork for nervous system regulation, guided emotional expression and cognitive
            re-processing — all within a safe, confidential group container. Healing through
            shared presence is not incidental; research consistently shows that interpersonal
            connection is central to emotional recovery.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            {[
              { icon: Calendar, label: "Every Saturday" },
              { icon: Clock, label: "2 Hours" },
            ].map((f) => (
              <div
                key={f.label}
                className="format-badge rounded-xl border border-border bg-surface p-4 text-center min-w-[120px] opacity-0"
              >
                <f.icon className="mx-auto h-6 w-6 text-gold" />
                <p className="mt-2 font-ui text-sm font-semibold text-foreground">{f.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="format-img group mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-violet/40 opacity-0">
          <img
            src="https://www.curamendhealthcare.com/assets/images/award-gallery-1/influncer-gallery/influncer-img-24.jpeg"
            alt="Session environment photo"
            className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
}

function ScheduleSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".day-card",
        { opacity: 0, y: 30, scale: 0.85 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.5, stagger: 0.07, ease: "back.out(1.5)",
          scrollTrigger: { trigger: ref.current, start: "top 75%" }
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-[#f5f3ff] py-24">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <SectionHeader eyebrow="Schedule" title="Weekly Rhythm" light />
        <div className="mt-12 grid grid-cols-7 gap-2 sm:gap-3">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => {
            const isSat = d === "Sat";
            return (
              <div
                key={d}
                className={`day-card rounded-xl p-3 text-center sm:p-5 opacity-0 ${
                  isSat
                    ? "bg-gradient-to-br from-violet to-[#7a52d6] text-white shadow-[0_0_30px_rgba(91,79,207,0.5)]"
                    : "border border-violet/15 bg-white text-navy/50"
                }`}
              >
                <p className="font-ui text-xs font-semibold uppercase">{d}</p>
                {isSat && <p className="mt-2 font-display text-sm sm:text-lg">Session</p>}
              </div>
            );
          })}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-violet/15 bg-white p-5 text-center">
            <p className="font-ui text-xs uppercase tracking-wide text-navy/50">Duration</p>
            <p className="mt-1 font-display text-xl text-navy">2 Hours</p>
          </div>
          <div className="rounded-xl border border-violet/15 bg-white p-5 text-center">
            <p className="font-ui text-xs uppercase tracking-wide text-navy/50">Frequency</p>
            <p className="mt-1 font-display text-xl text-navy">Every Saturday</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function IncludedSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".include-card",
        { opacity: 0, y: 40, scale: 0.92 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.7, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%" }
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden bg-navy py-24">
      <AnimatedPageBg />
      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader eyebrow="Inclusions" title="What's Included" />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SESSION_INCLUDES.map((item, i) => (
            <motion.div
              key={item.title}
              className="include-card group flex h-full gap-4 rounded-2xl border border-border bg-surface p-6 opacity-0"
              whileHover={{ y: -6, boxShadow: "0 20px 50px -20px rgba(91,79,207,0.4)", borderColor: "rgba(91,79,207,0.4)" }}
              transition={{ duration: 0.25 }}
            >
              <CheckCircle2 className="h-6 w-6 shrink-0 text-gold mt-0.5 transition-transform duration-300 group-hover:scale-125" />
              <div>
                <h3 className="font-ui text-base font-semibold text-foreground">{item.title}</h3>
                <p className="mt-1 font-body text-sm text-platinum/70">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatToBringSection() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".bring-item",
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%" }
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-[#f5f3ff] py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeader eyebrow="Prepare" title="What to Bring" light />
        <ul className="mt-10 space-y-3">
          {whatToBring.map((item) => (
            <li
              key={item}
              className="bring-item flex items-center gap-3 rounded-xl border border-violet/15 bg-white p-4 font-body text-[15px] text-navy/75 opacity-0 hover:border-violet/40 hover:bg-violet/5 transition-all duration-300"
            >
              <CheckCircle2 className="h-5 w-5 shrink-0 text-violet" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Sessions() {
  return (
    <>
      <SessionsHero />
      <SanctuaryTourSection />
      <FormatSection />
      <ScheduleSection />
      <IncludedSection />
      <WhatToBringSection />
    </>
  );
}
