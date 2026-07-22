import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SectionHeader } from "@/components/ui-custom/SectionHeader";
import { AnimatedPageBg } from "@/components/animations/AnimatedPageBg";
import { AnimatedCounter } from "@/components/ui-custom/AnimatedCounter";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Shield, Zap, Brain, Heart, Users, BookOpen, RefreshCcw, ExternalLink } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NeuralScene = lazy(() => import("@/components/animations/NeuralScene"));

const SITE_URL = "https://www.sunilsaldanha.com";

const scienceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `${SITE_URL}/science#article`,
  url: `${SITE_URL}/science`,
  name: "The Science of Emotional Healing | Curamend — Sunil Saldanha",
  headline: "Emotional Healing: The Science Behind Recovery from Trauma",
  description:
    "A comprehensive guide to emotional healing — the neuroscience of trauma, defensive responses, childhood trauma, and four evidence-based pathways to lasting recovery.",
  author: { "@type": "Person", name: "Sunil Saldanha" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Science", item: `${SITE_URL}/science` },
    ],
  },
};

export const Route = createFileRoute("/science")({
  head: () => ({
    meta: [
      { title: "The Science of Emotional Healing | Curamend — Sunil Saldanha" },
      {
        name: "description",
        content:
          "Understand the neuroscience of emotional healing — how trauma forms, defensive responses, childhood brain development, and four evidence-based pathways to emotional freedom.",
      },
      {
        name: "keywords",
        content:
          "emotional healing science, trauma neuroscience, childhood trauma brain, sympathetic nervous system, emotional dysregulation, forgiveness healing, group healing therapy, Sunil Saldanha, Curamend",
      },
      { property: "og:title", content: "The Science of Emotional Healing | Curamend" },
      {
        property: "og:description",
        content:
          "Peer-reviewed science behind emotional healing — trauma response, nervous system defences, and four pathways to recovery guided by Sunil Saldanha.",
      },
      { property: "og:url", content: `${SITE_URL}/science` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/science` }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(scienceJsonLd) }],
  }),
  component: Science,
});

// ─── Data ───────────────────────────────────────────────────────────────────

const STRESSOR_TYPES = [
  {
    icon: Shield,
    title: "Survival Stressors",
    color: "from-[#C9A24B] to-[#e8a41e]",
    border: "border-[#C9A24B]/40",
    glow: "rgba(201,162,75,0.3)",
    items: ["Natural disasters", "Violence & abuse", "Accidents & injury", "Serious illness", "Death of loved ones"],
  },
  {
    icon: Heart,
    title: "Reproduction Stressors",
    color: "from-[#5B4FCF] to-[#7a52d6]",
    border: "border-violet/40",
    glow: "rgba(91,79,207,0.3)",
    items: ["Romantic breakup", "Divorce", "Miscarriage", "Rejection", "Betrayal by a partner"],
  },
];

const DEFENSE_RESPONSES = [
  {
    id: "fight",
    label: "Fight",
    icon: "⚔️",
    system: "Sympathetic",
    color: "bg-red-500/20 border-red-400/40",
    text: "Aggression and confrontation against the threat. Blood flows to arms and jaw.",
  },
  {
    id: "flight",
    label: "Flight",
    icon: "🏃",
    system: "Sympathetic",
    color: "bg-orange-500/20 border-orange-400/40",
    text: "Escape from the threat. Blood flows to the legs for rapid movement.",
  },
  {
    id: "freeze",
    label: "Freeze",
    icon: "🧊",
    system: "Parasympathetic",
    color: "bg-cerulean/20 border-cerulean/40",
    text: "Alert stillness — avoid detection. Detected but unable to fight or flee.",
  },
  {
    id: "collapse",
    label: "Collapse",
    icon: "😶",
    system: "Parasympathetic",
    color: "bg-violet/20 border-violet/40",
    text: "Extreme immobility or fainting. The ultimate parasympathetic response.",
  },
];

const HEALING_PATHWAYS = [
  {
    number: "01",
    icon: BookOpen,
    color: "text-[#C9A24B]",
    bg: "bg-[#C9A24B]/10 border-[#C9A24B]/30",
    title: "Emotional Expression",
    subtitle: "Give the wound a voice",
    text: `Memories and emotions from traumatic experiences are begging for the conscious mind's attention. Expressing trauma-related thoughts and emotions — through writing, art, speech, or creative endeavours — is profoundly therapeutic. Many of history's most powerful works of art were born from unresolved trauma seeking expression.`,
    detail: `Poets revisit recurring themes. Actors choose films with similar emotional undercurrents. What people create holds meaning for them — often they are trying to resolve something within themselves. Expression is the first step toward acknowledgement, and acknowledgement is the beginning of healing.`,
  },
  {
    number: "02",
    icon: Brain,
    color: "text-violet",
    bg: "bg-violet/10 border-violet/30",
    title: "Cognitive Re-Processing",
    subtitle: "Make sense of the experience",
    text: `Once trauma-related emotions have found expression, the next step is making sense of them — re-processing them so the traumatic experience integrates into the psyche. Trauma has a way of keeping people stuck in the past. Re-processing breaks that cycle.`,
    detail: `Most people who go through trauma are positively transformed. Re-processing causes major cognitive shifts — changes in how they see themselves, their relationships and the world. Realistic re-appraisal — "They did the best they could," "I am stronger than I knew" — gives trauma meaning without self-deception.`,
  },
  {
    number: "03",
    icon: RefreshCcw,
    color: "text-cerulean",
    bg: "bg-cerulean/10 border-cerulean/30",
    title: "Forgiveness & Closure",
    subtitle: "Release the grip of the past",
    text: `Forgiveness can powerfully heal trauma when realistic re-processing has first removed intent to harm from the perpetrator. Believing "they didn't know better" or "they were forced by circumstances" allows the wound to close. Forgiveness is not for the perpetrator — it is for your own freedom.`,
    detail: `Where genuine remorse is absent and forgiveness feels impossible, reclaiming your power through boundary-setting, accountability and self-assertion can provide the closure that forgiveness would otherwise offer. The innate human sense of justice, when honoured, heals.`,
  },
  {
    number: "04",
    icon: Users,
    color: "text-[#2D9CDB]",
    bg: "bg-[#2D9CDB]/10 border-[#2D9CDB]/30",
    title: "Shared Healing",
    subtitle: "Heal in the presence of others",
    text: `We are a social species. Like other social primates, we regulate negative emotions through contact with other members of our group. Interpersonal emotional regulation works through empathy, shared presence and consoling behaviours involving physical contact.`,
    detail: `Healing through group participation has long been a dominant feature of all human societies. Many psychological problems bring a sense of social exclusion — being included in a supportive group is itself deeply therapeutic. This is the foundation of Curamend's Saturday group sessions.`,
  },
];

const OUTCOMES = [
  { value: 92, suffix: "%", label: "Report reduced emotional distress" },
  { value: 87, suffix: "%", label: "Notice change within 4 sessions" },
  { value: 8, suffix: "+", label: "Years of clinical practice" },
  { value: 500, suffix: "+", label: "Healing journeys guided" },
];

// ─── Sections ───────────────────────────────────────────────────────────────

function ScienceHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".sci-hero-el",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.3 }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-black flex items-center pt-24">
      {/* Three.js Neural Network — full background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-br from-violet/10 to-navy" />}>
          <NeuralScene className="h-full w-full" particleColor="#5B4FCF" lineColor="#C9A24B" />
        </Suspense>
      </div>

      {/* Radial dark overlay so text is readable */}
      <div className="absolute inset-0 z-[1]" style={{
        background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.75) 60%, rgba(0,0,0,0.95) 100%)"
      }} />

      <motion.div style={{ y, opacity }} className="relative z-10 w-full">
        <div className="mx-auto max-w-4xl px-5 py-24 text-center sm:px-8">
          <p className="sci-hero-el font-ui text-xs font-semibold uppercase tracking-[0.35em] text-cerulean mb-6 opacity-0">
            Evidence-Informed Healing
          </p>
          <h1 className="sci-hero-el font-display text-5xl font-light text-white sm:text-6xl md:text-7xl lg:text-8xl leading-[1.02] opacity-0">
            The Science of<br />
            <span className="text-gradient-gold">Emotional Healing</span>
          </h1>
          <p className="sci-hero-el mx-auto mt-8 max-w-2xl font-body text-lg text-platinum/80 leading-relaxed opacity-0">
            Understanding why emotional wounds form, how the brain defends against them,
            and the four evidence-based pathways to lasting recovery.
          </p>

          {/* Animated neuron labels */}
          <div className="sci-hero-el mt-12 flex flex-wrap justify-center gap-3 opacity-0">
            {["Neuroscience", "Trauma Response", "Neuroplasticity", "Group Healing", "Cognitive Re-processing"].map((tag) => (
              <span key={tag} className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-ui text-xs text-white/60 backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <span className="font-ui text-[10px] uppercase tracking-widest text-white/30">Scroll to explore</span>
        <div className="h-8 w-[1px] bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>
    </section>
  );
}

function WhatIsSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".what-el",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%" } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden bg-navy py-28">
      <AnimatedPageBg />
      <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-8">
        <p className="what-el font-ui text-xs font-semibold uppercase tracking-[0.3em] text-cerulean mb-4 opacity-0">
          Foundational Understanding
        </p>
        <h2 className="what-el font-display text-4xl text-white sm:text-5xl md:text-6xl opacity-0">
          What Is Emotional Healing?
        </h2>
        <div className="what-el mt-8 h-[1px] w-24 bg-gradient-to-r from-gold to-transparent opacity-0" />
        <p className="what-el mt-8 font-body text-lg leading-relaxed text-platinum/85 opacity-0">
          Emotional healing is the process of recovering from an emotional wound or trauma. Emotional wounds
          are inflicted upon people by <strong className="text-white">negative life experiences or stressors</strong>.
          Not all negative experiences are traumatic — the root cause of trauma is <em>unresolved threat</em>,
          whether to one's survival or reproduction.
        </p>
        <p className="what-el mt-5 font-body text-lg leading-relaxed text-platinum/85 opacity-0">
          When a threat is resolved immediately — say, you express anger to a friend who wronged you — the
          incident passes without becoming traumatic. But when threat responses go <strong className="text-white">unresolved</strong>,
          the mind replays the incident over and over, searching for completion. This is the neurological
          foundation of emotional wounding.
        </p>

        {/* Pull quote */}
        <div className="what-el mt-10 rounded-2xl border border-gold/20 bg-gold/5 p-8 opacity-0">
          <p className="font-display text-2xl italic text-gold leading-relaxed">
            "The mind can't let serious matters pertaining to survival and reproduction pass by."
          </p>
          <p className="mt-3 font-ui text-sm text-platinum/50">— Principle of unresolved threat response</p>
        </div>
      </div>
    </section>
  );
}

function StressorTypesSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".stressor-card",
        { opacity: 0, y: 60, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.2, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%" } }
      );
      gsap.fromTo(".stressor-item",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.07, ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 65%" }, delay: 0.4 }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-[#f5f3ff] py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader eyebrow="Two Classes of Trauma" title="What Causes Emotional Wounds?" light />
        <p className="mx-auto mt-6 max-w-3xl text-center font-body text-[16px] leading-relaxed text-navy/70">
          Trauma can occur at any age, but childhood experiences are particularly damaging because the
          brain is still developing and the child is entirely dependent on caregivers.
        </p>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {STRESSOR_TYPES.map((type) => (
            <div
              key={type.title}
              className={`stressor-card group relative overflow-hidden rounded-2xl border ${type.border} bg-white p-8 shadow-lg opacity-0 hover:shadow-xl transition-all duration-500`}
            >
              {/* Gradient glow on hover */}
              <motion.div
                className={`absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br ${type.color} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30`}
              />
              <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${type.color}`}>
                <type.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="mt-5 font-display text-2xl text-navy">{type.title}</h3>
              <ul className="mt-5 space-y-3">
                {type.items.map((item) => (
                  <li key={item} className="stressor-item flex items-center gap-3 font-body text-[15px] text-navy/70 opacity-0">
                    <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-br ${type.color} shrink-0`} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TraumaDefensesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [activeDefense, setActiveDefense] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".defense-heading",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%" } }
      );
      gsap.fromTo(".defense-card",
        { opacity: 0, scale: 0.85, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "back.out(1.4)",
          scrollTrigger: { trigger: ref.current, start: "top 65%" } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const id = setInterval(() => setActiveDefense((v) => (v + 1) % 4), 2800);
    return () => clearInterval(id);
  }, []);

  const active = DEFENSE_RESPONSES[activeDefense];

  return (
    <section ref={ref} className="relative overflow-hidden bg-navy py-28">
      <AnimatedPageBg />
      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        <p className="defense-heading font-ui text-xs font-semibold uppercase tracking-[0.3em] text-cerulean mb-4 opacity-0">
          The Trauma Response
        </p>
        <h2 className="defense-heading font-display text-4xl text-white sm:text-5xl opacity-0">
          How the Mind Defends Itself
        </h2>
        <p className="defense-heading mt-6 max-w-3xl font-body text-[16px] leading-relaxed text-platinum/80 opacity-0">
          When survival or reproduction is threatened direly, the mind activates defensive responses.
          These evolved in predator-prey contexts and are driven by two opposing nervous systems.
        </p>

        {/* Interactive defense cards */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DEFENSE_RESPONSES.map((d, i) => (
            <motion.div
              key={d.id}
              onClick={() => setActiveDefense(i)}
              className={`defense-card cursor-pointer rounded-2xl border p-6 transition-all duration-300 opacity-0 ${
                activeDefense === i
                  ? `${d.color} shadow-[0_0_30px_rgba(255,255,255,0.1)]`
                  : "border-border bg-surface hover:border-violet/30"
              }`}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="text-3xl">{d.icon}</div>
              <h3 className="mt-4 font-display text-xl text-foreground">{d.label}</h3>
              <p className="mt-1 font-ui text-xs text-muted-ink">{d.system} N.S.</p>
            </motion.div>
          ))}
        </div>

        {/* Detail panel */}
        <motion.div
          key={activeDefense}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`mt-6 rounded-2xl border ${active.color} p-8`}
        >
          <div className="flex items-start gap-4">
            <span className="text-4xl">{active.icon}</span>
            <div>
              <h4 className="font-display text-2xl text-foreground">
                {active.label} — <span className="text-muted-ink font-ui text-base font-medium">{active.system} Nervous System</span>
              </h4>
              <p className="mt-3 font-body text-[15px] leading-relaxed text-platinum/80">{active.text}</p>
            </div>
          </div>
        </motion.div>

        {/* Two types explanation */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-red-400/20 bg-red-500/5 p-7">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="h-5 w-5 text-red-400" />
              <h4 className="font-ui text-sm font-semibold uppercase tracking-wide text-red-400">Active Responses</h4>
            </div>
            <p className="font-body text-[15px] leading-relaxed text-platinum/80">
              Fighting against or fleeing from the threat. The sympathetic nervous system prepares the body — increased blood flow to the legs for flight, to the arms and jaw for fighting.
              <strong className="text-white"> Heightened arousal</strong> means people in crisis may be unable to sleep for days.
            </p>
          </div>
          <div className="rounded-2xl border border-violet/20 bg-violet/5 p-7">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-5 w-5 text-violet" />
              <h4 className="font-ui text-sm font-semibold uppercase tracking-wide text-violet">Immobility Responses</h4>
            </div>
            <p className="font-body text-[15px] leading-relaxed text-platinum/80">
              Freeze-alert (avoiding detection) and freeze-fright (paralysis when the threat has already found you). The parasympathetic nervous system activates. Extreme forms include collapse or fainting — a
              <strong className="text-white"> 'playing dead'</strong> strategy evolved in group survival contexts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChildhoodTraumaSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the brain diagram lines
      gsap.fromTo(".brain-path",
        { strokeDashoffset: 300 },
        { strokeDashoffset: 0, duration: 2, stagger: 0.3, ease: "power2.inOut",
          scrollTrigger: { trigger: ref.current, start: "top 70%" } }
      );
      gsap.fromTo(".childhood-el",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%" } }
      );
      gsap.fromTo(".outcome-badge",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: "back.out(2)",
          scrollTrigger: { trigger: ref.current, start: "top 60%" }, delay: 0.5 }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const outcomes = [
    { label: "Aggression", desc: "Active defense", color: "bg-red-500/20 text-red-300 border-red-400/30" },
    { label: "Impulsivity", desc: "Active defense", color: "bg-orange-500/20 text-orange-300 border-orange-400/30" },
    { label: "Hypervigilance", desc: "Freeze feature", color: "bg-cerulean/20 text-cerulean border-cerulean/30" },
    { label: "Depression", desc: "Immobility response", color: "bg-violet/20 text-violet border-violet/30" },
    { label: "Social Anxiety", desc: "Threat sensitization", color: "bg-gold/20 text-gold border-gold/30" },
    { label: "Emotional dysregulation", desc: "Left hemisphere deficit", color: "bg-pink-500/20 text-pink-300 border-pink-400/30" },
  ];

  return (
    <section ref={ref} className="bg-[#f0eeff] py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: content */}
          <div>
            <p className="childhood-el font-ui text-xs font-semibold uppercase tracking-[0.3em] text-violet mb-4 opacity-0">
              The Developing Brain
            </p>
            <h2 className="childhood-el font-display text-4xl text-navy sm:text-5xl opacity-0">
              Why Childhood Trauma Runs Deepest
            </h2>
            <p className="childhood-el mt-6 font-body text-[16px] leading-relaxed text-navy/75 opacity-0">
              Childhood is a uniquely vulnerable period. The child's brain is still developing, and the child
              is entirely dependent on primary caregivers. Psychiatric research consistently shows that
              <strong> childhood abuse damages the brain</strong> — including deficient development and
              differentiation of the <strong>left hemisphere</strong>.
            </p>
            <p className="childhood-el mt-4 font-body text-[16px] leading-relaxed text-navy/75 opacity-0">
              This hemisphere handles analytical thinking — including emotional regulation. Hence, early trauma
              leads directly to <strong>emotional dysregulation</strong>.
            </p>
            <p className="childhood-el mt-4 font-body text-[16px] leading-relaxed text-navy/75 opacity-0">
              Children raised in stressful environments become <em>sensitised to future threats</em> — detecting
              danger where none exists, struggling with relationships and gratification as adults. Responses
              that protected them in childhood prevent them from being functional later in life.
            </p>
          </div>

          {/* Right: outcomes grid */}
          <div>
            <p className="childhood-el mb-6 font-ui text-sm font-semibold text-navy/50 opacity-0">
              Common adult manifestations of childhood trauma:
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {outcomes.map((o) => (
                <div
                  key={o.label}
                  className={`outcome-badge rounded-xl border px-5 py-4 ${o.color} opacity-0`}
                >
                  <p className="font-ui text-sm font-semibold">{o.label}</p>
                  <p className="mt-0.5 font-body text-xs opacity-70">{o.desc}</p>
                </div>
              ))}
            </div>
            <p className="childhood-el mt-5 font-body text-sm italic text-navy/50 opacity-0">
              Ref: Teicher (2000); Wheeler (2007)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function HealingPathwaysSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".pathway-number",
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.15, ease: "back.out(2)",
          scrollTrigger: { trigger: ref.current, start: "top 75%" } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden bg-navy py-28">
      <AnimatedPageBg />
      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader eyebrow="The Four Pathways" title="How Emotional Healing Happens" />
        <p className="mx-auto mt-6 max-w-3xl text-center font-body text-[16px] leading-relaxed text-platinum/80">
          Emotional healing is not a single event — it is a multi-dimensional process. These four pathways,
          validated by decades of research, form the core of Curamend's approach.
        </p>

        <div className="mt-16 space-y-8">
          {HEALING_PATHWAYS.map((pathway, i) => (
            <HealingPathwayCard key={pathway.number} pathway={pathway} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function HealingPathwayCard({ pathway, index }: { pathway: typeof HEALING_PATHWAYS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { opacity: 0, x: index % 2 === 0 ? -60 : 60 },
        { opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%" } }
      );
    }, ref);
    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-2xl border ${pathway.bg} p-8 cursor-pointer transition-all duration-400 hover:shadow-[0_20px_60px_-20px_rgba(91,79,207,0.3)] opacity-0`}
      onClick={() => setExpanded((v) => !v)}
    >
      <div className="flex items-start gap-6">
        {/* Number */}
        <span className={`pathway-number shrink-0 font-display text-5xl font-light ${pathway.color} leading-none opacity-0`}>
          {pathway.number}
        </span>
        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl border ${pathway.bg} ${pathway.color}`}>
              <pathway.icon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-2xl text-foreground">{pathway.title}</h3>
              <p className="font-ui text-sm text-muted-ink">{pathway.subtitle}</p>
            </div>
            <ArrowRight
              className={`ml-auto h-5 w-5 text-muted-ink transition-transform duration-300 ${expanded ? "rotate-90" : "rotate-0"}`}
            />
          </div>
          <p className="font-body text-[15px] leading-relaxed text-platinum/80">{pathway.text}</p>

          {/* Expandable detail */}
          <motion.div
            initial={false}
            animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className={`mt-4 rounded-xl border ${pathway.bg} p-5`}>
              <p className="font-body text-[15px] leading-relaxed text-platinum/75">{pathway.detail}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function OutcomesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [counting, setCounting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".outcome-stat",
        { opacity: 0, y: 50, scale: 0.88 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.12, ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current, start: "top 75%",
            onEnter: () => setCounting(true),
          } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-[#f5f3ff] py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader eyebrow="Practice Outcomes" title="Results That Speak" light />
        <div className="mt-14 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {OUTCOMES.map((o) => (
            <div
              key={o.label}
              className="outcome-stat group rounded-2xl border border-violet/10 bg-white p-8 text-center opacity-0 shadow-sm hover:border-violet/30 hover:shadow-lg transition-all duration-400"
            >
              <div className="font-display text-5xl text-gold sm:text-6xl">
                <AnimatedCounter value={o.value} suffix={o.suffix} startCounting={counting} />
              </div>
              <p className="mt-3 font-ui text-sm leading-snug text-navy/60">{o.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center font-mono text-xs text-navy/35">
          Illustrative outcomes — replace with live practice data.
        </p>
      </div>
    </section>
  );
}

function Science() {
  return (
    <>
      <ScienceHero />
      <WhatIsSection />
      <StressorTypesSection />
      <TraumaDefensesSection />
      <ChildhoodTraumaSection />
      <HealingPathwaysSection />
      <OutcomesSection />
    </>
  );
}
