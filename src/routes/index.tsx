import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown, ArrowRight, Calendar, Clock, MapPin, Users, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import {
  BRAND,
  STATS,
  VALUE_CARDS,
  SESSION_FACTS,
} from "@/data/content";
import { ButtonLink } from "@/components/ui-custom/Button";
import { AnimatedCounter } from "@/components/ui-custom/AnimatedCounter";
import { SectionHeader } from "@/components/ui-custom/SectionHeader";
import { CinematicVideoBg } from "@/components/animations/CinematicVideoBg";

const HeroScene = lazy(() => import("@/components/animations/HeroScene"));

const SITE_URL = "https://www.sunilsaldanha.com";

const homeJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/#webpage`,
  url: SITE_URL,
  name: "Sunil Saldanha — Curamend | Emotional Healing Specialist",
  description:
    "Sunil Saldanha offers emotional healing sessions combining neuroscience and ancient wisdom at Curamend. Saturday group sessions available.",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }],
  },
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sunil Saldanha — Emotional Healing Specialist | Curamend" },
      {
        name: "description",
        content:
          "Sunil Saldanha is an emotional healing specialist at Curamend. Evidence-based sessions blending neuroscience, breathwork and ancient healing wisdom — every Saturday.",
      },
      {
        name: "keywords",
        content:
          "Sunil Saldanha, emotional healing, Curamend, trauma healing, neuroscience healing, emotional healing specialist, breathwork, Saturday healing sessions, inner peace, emotional freedom",
      },
      { property: "og:title", content: "Sunil Saldanha — Emotional Healing Specialist | Curamend" },
      {
        property: "og:description",
        content:
          "Evidence-based, spiritually grounded emotional healing with Sunil Saldanha. Neuroscience meets ancient wisdom. Sessions every Saturday.",
      },
      { property: "og:url", content: SITE_URL },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(homeJsonLd) }],
  }),
  component: Home,
});

const factIcons = { calendar: Calendar, clock: Clock, pin: MapPin, users: Users } as const;

function HeroContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let hasPlayed = false;
    const playAnim = () => {
      if (hasPlayed) return;
      hasPlayed = true;
      // Use opacity (not autoAlpha) since elements start with inline opacity:0 style
      const tl = gsap.timeline();
      tl.to(".hero-line",
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out",
          from: { y: 40, opacity: 0 } } as gsap.TweenVars
      );
      tl.to(".hero-sub", { opacity: 1, duration: 0.7 }, "-=0.3");
      tl.to(".hero-btn", { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.5)" }, "-=0.2");
    };

    const init = () => {
      // Set starting state explicitly
      gsap.set(".hero-line", { y: 40, opacity: 0 });
      gsap.set(".hero-sub", { opacity: 0 });
      gsap.set(".hero-btn", { opacity: 0, scale: 0.9 });
    };
    init();

    // If loader already completed (revisiting page), play immediately after a small delay
    if (sessionStorage.getItem("curamend_loaded")) {
      setTimeout(playAnim, 200);
    } else {
      window.addEventListener("loaderComplete", playAnim, { once: true });
    }

    return () => window.removeEventListener("loaderComplete", playAnim);
  }, []);

  const scrollToNext = () => {
    const next = document.querySelector<HTMLElement>("#stats-section");
    if (next) next.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 pb-16 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] pointer-events-none z-10">
      <div className="text-center lg:text-left">
        <div className="hero-line">
          <p className="font-ui text-xs font-semibold uppercase tracking-[0.3em] text-cerulean">
            {BRAND.legal}
          </p>
        </div>
        
        <h1 className="mt-5 font-display text-5xl font-light leading-[1.02] text-foreground sm:text-6xl md:text-7xl lg:text-[5.2rem]">
          <div className="hero-line overflow-hidden">Heal What Words</div>
          <div className="hero-line overflow-hidden">
            <span className="block text-gradient-violet">Cannot Reach.</span>
          </div>
        </h1>
        
        <div className="hero-sub">
          <p className="mx-auto mt-6 max-w-xl font-body text-lg text-platinum/80 lg:mx-0">
            {BRAND.doctor} bridges the wisdom of ancient healing traditions with the rigor of
            modern neuroscience — guiding you to emotional freedom, one Saturday at a time.
          </p>
        </div>
        
        <div className="mt-9 flex flex-wrap justify-center gap-4 lg:justify-start pointer-events-auto">
          <div className="hero-btn">
            <ButtonLink to="/sessions" size="lg">Reserve Your Spot</ButtonLink>
          </div>
          <div className="hero-btn">
            <ButtonLink to="/science" variant="outline" size="lg">Discover the Science</ButtonLink>
          </div>
          <div className="hero-btn mt-2 w-full flex justify-center lg:justify-start">
            <button
              onClick={scrollToNext}
              className="flex items-center gap-2 font-ui text-xs uppercase tracking-widest text-platinum/60 hover:text-gold transition-colors pointer-events-auto"
            >
              <span>Scroll to explore</span>
              <ChevronDown className="h-4 w-4 animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


function StatsSection() {
  const [startCounting, setStartCounting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(".stat-card", { opacity: 0, y: 20 });

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      onEnter: () => {
        gsap.to(".stat-card", {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          onComplete: () => setStartCounting(true)
        });
      }
    });

    return () => st.kill();
  }, []);

  return (
    <section id="stats-section" ref={ref} className="border-y border-border bg-surface">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-5 py-14 sm:px-8 lg:grid-cols-4">
        {STATS.map((s, i) => {
          return (
            <div
              key={s.label}
              className="stat-card relative flex flex-col items-center text-center lg:border-r lg:border-violet/20 lg:last:border-r-0"
            >
              <s.icon className="h-6 w-6 text-cerulean" />
              <div className="mt-3 font-display text-5xl text-gold sm:text-6xl">
                <AnimatedCounter value={s.value} suffix={s.suffix} startCounting={startCounting} />
              </div>
              <p className="mt-1 font-ui text-sm uppercase tracking-wide text-muted-ink">
                {s.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function DifferenceSection() {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".diff-heading",
        { clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)", opacity: 0 },
        { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 80%" } }
      );
      gsap.fromTo(".diff-tab",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 70%" } }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Animate card on tab switch
  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        { opacity: 0, x: 30, scale: 0.96 },
        { opacity: 1, x: 0, scale: 1, duration: 0.5, ease: "power3.out" }
      );
    }
  }, [active]);

  const card = VALUE_CARDS[active];

  return (
    <section ref={containerRef} className="bg-light-surface py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="text-center">
          <p className="font-ui text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3">
            The Curamend Difference
          </p>
          <h2 className="diff-heading font-display text-4xl text-navy sm:text-5xl">
            Where Science and Spirit Converge
          </h2>
        </div>

        {/* Tab buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {VALUE_CARDS.map((c, i) => (
            <button
              key={c.title}
              onClick={() => setActive(i)}
              className={`diff-tab rounded-full px-6 py-2.5 font-ui text-sm font-semibold transition-all duration-300 ${
                active === i
                  ? "bg-violet text-white shadow-[0_0_20px_rgba(91,79,207,0.5)]"
                  : "border border-violet/20 text-navy/60 hover:border-violet hover:text-violet"
              }`}
            >
              {c.eyebrow}
            </button>
          ))}
        </div>

        {/* Animated card */}
        <div ref={cardRef} className="mt-10 mx-auto max-w-3xl">
          <div className="group flex flex-col rounded-2xl border-t-2 border-violet bg-white p-8 shadow-[0_20px_60px_-20px_rgba(91,79,207,0.25)] md:flex-row md:gap-8">
            <div className="flex-1">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-violet/10 text-violet">
                <card.icon className="h-6 w-6" />
              </span>
              <p className="mt-5 font-ui text-xs font-semibold uppercase tracking-[0.2em] text-gold">{card.eyebrow}</p>
              <h3 className="mt-2 font-display text-2xl text-navy">{card.title}</h3>
              <p className="mt-3 font-body text-[15px] leading-relaxed text-navy/70">{card.text}</p>
            </div>
            <div className="mt-6 md:mt-0 md:w-56 overflow-hidden rounded-xl border border-violet/15 aspect-[4/3] md:aspect-auto md:self-stretch shrink-0">
              <img src={card.imageUrl} alt={card.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          </div>
        </div>

        {/* Progress dots */}
        <div className="mt-6 flex justify-center gap-2">
          {VALUE_CARDS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                active === i ? "w-8 bg-violet" : "w-2 bg-violet/25 hover:bg-violet/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function BioSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    gsap.to(".bio-portrait", {
      scale: 1.06,
      duration: 20,
      ease: "none",
      repeat: -1,
      yoyo: true
    });
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      }
    });
    
    tl.fromTo(".bio-portrait-wrapper",
      { clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)" },
      { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 1.2, ease: "power3.inOut" },
      0
    );
    
    tl.fromTo(".bio-text-item",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: "power2.out" },
      0.3
    );
    
    tl.fromTo(".bio-badge",
      { rotateX: -90, opacity: 0 },
      { rotateX: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
      0.6
    );
    
    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === containerRef.current) st.kill();
      });
    };
  }, []);

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-navy py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <div className="relative mx-auto w-full max-w-md bio-portrait-wrapper" style={{ clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)" }}>
          <img
            src="/doctor-portrait.jpg"
            alt="Sunil Saldanha — Professional Photo"
            className="bio-portrait relative aspect-[6/7] w-full object-cover rounded-2xl border border-gold/40"
          />
          <div className="bio-badge origin-bottom absolute bottom-4 left-4 rounded-full bg-gradient-to-r from-violet to-[#7a52d6] px-5 py-2 font-ui text-sm font-semibold text-white shadow-glow" style={{ opacity: 0 }}>
            8+ Years · 500+ Clients
          </div>
        </div>
        <div>
          <p className="bio-text-item font-ui text-xs font-semibold uppercase tracking-[0.28em] text-cerulean opacity-0">
            Meet Your Healer
          </p>
          <h2 className="bio-text-item mt-3 font-display text-4xl text-foreground sm:text-5xl opacity-0">
            {BRAND.doctor}
          </h2>
          <p className="bio-text-item mt-2 font-ui text-sm text-gold mb-5 opacity-0">
            Emotional Healing Specialist &amp; Founder, Curamend
          </p>
          <div className="space-y-4 font-body text-[15px] leading-relaxed text-platinum/80">
            <p className="bio-text-item opacity-0">
              Emotional healing is the process of recovering from emotional wounds inflicted by
              unresolved threats — to survival or to reproduction. With over eight years of
              clinical practice, Sunil Saldanha has developed a methodology that addresses these
              wounds at their neurological root, not merely their symptoms.
            </p>
            <p className="bio-text-item opacity-0">
              Drawing on cognitive neuroscience, trauma research and contemplative practice, his
              work guides clients through the four pathways of healing: emotional expression,
              cognitive re-processing, forgiveness work, and shared healing in a supported group
              — each one validated by decades of research.
            </p>
          </div>
          <Link
            to="/about"
            className="bio-text-item mt-6 inline-flex items-center gap-1 font-ui text-sm font-semibold text-gold hover:text-amber opacity-0"
          >
            Sunil Saldanha's Full Story <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function SessionSpotlight() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(".pulse-ring",
      { scale: 1, opacity: 0.4 },
      { scale: 1.4, opacity: 0, duration: 2.5, repeat: -1, ease: "power1.out", stagger: 0.2 }
    );

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });

    tl.fromTo(".spotlight-text", 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    );

    tl.fromTo(".session-pill",
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, stagger: 0.08, ease: "back.out(2)" },
      "-=0.4"
    );
    
    tl.fromTo(".spotlight-cta",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.2"
    );

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === containerRef.current) st.kill();
      });
    };
  }, []);

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-gradient-spotlight py-24">
      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <div>
          <p className="spotlight-text font-ui text-xs font-semibold uppercase tracking-[0.28em] text-platinum opacity-0">
            Join Us Every Saturday
          </p>
          <h2 className="spotlight-text mt-3 font-display text-4xl text-white sm:text-5xl opacity-0">
            Two Hours That Can Change Everything
          </h2>
          <p className="spotlight-text mx-auto mt-4 max-w-2xl font-body text-lg text-platinum/90 opacity-0">
            Humans regulate negative emotions through contact with others. Our group emotional
            healing sessions run every Saturday — two hours of guided expression, breathwork and
            re-processing in a safe, confidential space. Limited seats. Transformative results.
          </p>
        </div>
        <div>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {SESSION_FACTS.map((f) => {
              const Icon = factIcons[f.icon as keyof typeof factIcons];
              return (
                <div
                  key={f.label}
                  className="session-pill relative rounded-2xl border border-white/15 bg-white/10 px-4 py-5 backdrop-blur-sm opacity-0"
                >
                  <div className="pulse-ring absolute inset-0 rounded-2xl border border-gold/40" />
                  <Icon className="relative mx-auto h-6 w-6 text-gold z-10" />
                  <p className="relative mt-2 font-ui text-sm font-semibold text-white z-10">{f.label}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="spotlight-cta mt-9 flex flex-col items-center gap-4 opacity-0">
          <ButtonLink to="/sessions" variant="gold" size="lg">
            Reserve Your Spot
          </ButtonLink>
          <a
            href={`tel:${BRAND.whatsapp}`}
            className="inline-flex items-center gap-2 font-ui text-sm text-platinum/90 hover:text-white"
          >
            <Phone className="h-4 w-4" /> Questions about sessions? Call {BRAND.primaryPhone}
          </a>
        </div>
      </div>
    </section>
  );
}


function ScienceTeaser() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".sci-teaser-el",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%" } }
      );
      gsap.fromTo(".sci-teaser-card",
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "back.out(1.4)",
          scrollTrigger: { trigger: ref.current, start: "top 65%" } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const teasers = [
    { icon: "🧠", title: "Trauma Forms in the Brain", desc: "Unresolved threats replay in the mind, searching for completion — rooted in neuroscience." },
    { icon: "⚡", title: "Fight, Flight, Freeze, Collapse", desc: "Four defensive responses driven by the sympathetic and parasympathetic nervous systems." },
    { icon: "🌿", title: "Four Pathways to Healing", desc: "Expression, re-processing, forgiveness, and shared healing — all evidence-based." },
  ];

  return (
    <section ref={ref} className="bg-[#f5f3ff] py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="text-center">
          <p className="sci-teaser-el font-ui text-xs font-semibold uppercase tracking-[0.3em] text-violet mb-4 opacity-0">
            The Research Foundation
          </p>
          <h2 className="sci-teaser-el font-display text-4xl text-navy sm:text-5xl opacity-0">
            Why Understanding Trauma Matters
          </h2>
          <p className="sci-teaser-el mx-auto mt-5 max-w-2xl font-body text-[16px] leading-relaxed text-navy/70 opacity-0">
            Emotional healing isn't mystical — it has a precise neurological basis. Understanding
            the science behind trauma transforms how you approach your own healing journey.
          </p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {teasers.map((t) => (
            <div
              key={t.title}
              className="sci-teaser-card rounded-2xl border border-violet/15 bg-white p-7 opacity-0 hover:border-violet/40 hover:shadow-lg transition-all duration-300"
            >
              <span className="text-4xl">{t.icon}</span>
              <h3 className="mt-4 font-display text-xl text-navy">{t.title}</h3>
              <p className="mt-2 font-body text-[14px] leading-relaxed text-navy/65">{t.desc}</p>
            </div>
          ))}
        </div>
        <div className="sci-teaser-el mt-10 text-center opacity-0">
          <ButtonLink to="/science" size="lg">
            Explore the Science
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      {/* Hero */}
      <section
        id="hero-section"
        className="relative flex min-h-screen items-center overflow-hidden bg-black pt-28 cursor-pointer"
        onClick={() => document.getElementById("stats-section")?.scrollIntoView({ behavior: "smooth" })}
      >
        <Suspense fallback={<div className="absolute inset-0 bg-gradient-cosmic" />}>
          <HeroScene />
        </Suspense>

        <HeroContent />

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold z-10 pointer-events-none"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown className="h-8 w-8" />
        </motion.div>
      </section>

      <StatsSection />
      <DifferenceSection />
      <BioSection />
      <ScienceTeaser />
      <SessionSpotlight />

      {/* Final CTA */}
      <div className="relative overflow-hidden group">
        <CinematicVideoBg 
          src="https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-23653-large.mp4"
          overlayGradient="bg-gradient-to-r from-violet/90 via-navy/80 to-cerulean/90"
          overlayOpacity={0.85}
        />
        
        {/* Subtle animated light orb over the video */}
        <motion.div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 30% 50%, rgba(201,162,75,0.8) 0%, transparent 60%)"
          }}
          animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        />
        <div className="relative z-10 mx-auto max-w-3xl px-5 py-24 text-center sm:px-8">
          <p className="font-ui text-xs font-semibold uppercase tracking-[0.3em] text-gold/80 mb-4">Begin Today</p>
          <h2 className="font-display text-4xl text-white sm:text-5xl lg:text-6xl">Ready to Begin Your Healing Journey?</h2>
          <p className="mx-auto mt-5 max-w-xl font-body text-lg text-platinum/80">Sessions every Saturday — led personally by Sunil Saldanha.</p>
        </div>
      </div>
    </>
  );
}
