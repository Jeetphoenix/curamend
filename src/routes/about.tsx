import { useEffect, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, Award, ClipboardCheck, Target, Eye, Heart } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "@/data/content";
import { SectionHeader } from "@/components/ui-custom/SectionHeader";
import { AnimatedPageBg } from "@/components/animations/AnimatedPageBg";
import { CinematicVideoBg } from "@/components/animations/CinematicVideoBg";
import { ButtonLink } from "@/components/ui-custom/Button";

gsap.registerPlugin(ScrollTrigger);

const SITE_URL = "https://www.sunilsaldanha.com";

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/about#webpage`,
  url: `${SITE_URL}/about`,
  name: "About Sunil Saldanha | Emotional Healing Specialist — Curamend",
  mainEntity: {
    "@type": "Person",
    name: "Sunil Saldanha",
    jobTitle: "Emotional Healing Specialist",
    description:
      "Sunil Saldanha has over 8 years of clinical practice in emotional healing, integrating cognitive neuroscience, trauma therapy, breathwork and energy psychology.",
    worksFor: { "@type": "Organization", name: "Curamend" },
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "About", item: `${SITE_URL}/about` },
    ],
  },
};

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Sunil Saldanha | Emotional Healing Specialist — Curamend" },
      {
        name: "description",
        content:
          "Meet Sunil Saldanha — emotional healing specialist and founder of Curamend. 8+ years blending neuroscience, trauma therapy, breathwork and ancient healing wisdom.",
      },
      {
        name: "keywords",
        content:
          "Sunil Saldanha, about Sunil Saldanha, emotional healing specialist, Curamend founder, trauma therapist, neuroscience healer, breathwork expert, energy psychology",
      },
      { property: "og:title", content: "About Sunil Saldanha | Emotional Healing Specialist — Curamend" },
      {
        property: "og:description",
        content:
          "The story, credentials and healing philosophy of Sunil Saldanha — founder of Curamend's emotional healing practice.",
      },
      { property: "og:url", content: `${SITE_URL}/about` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/about` }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(aboutJsonLd) }],
  }),
  component: About,
});

const credentials = [
  { icon: GraduationCap, label: "Educational Qualification — [Client to provide]" },
  { icon: Award, label: "Professional Certification — [Client to provide]" },
  { icon: ClipboardCheck, label: "Registration / License — [Client to provide]" },
  { icon: GraduationCap, label: "Specialised Training — [Client to provide]" },
  { icon: Award, label: "Affiliations — [Client to provide]" },
  { icon: ClipboardCheck, label: "Continuing Education — [Client to provide]" },
];

const vision = [
  {
    icon: Target,
    title: "Mission",
    text: "To make profound emotional healing accessible — grounded in science, delivered with compassion.",
  },
  {
    icon: Eye,
    title: "Vision",
    text: "A world where emotional wellbeing is treated with the same rigour and dignity as physical health.",
  },
  {
    icon: Heart,
    title: "Values",
    text: "Integrity, evidence, presence, and an unwavering respect for each person's inner journey.",
  },
];

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".about-hero-line",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.3 }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-black pt-28 pb-20">
      <AnimatedPageBg />
      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-8">
        <p className="about-hero-line font-ui text-xs font-semibold uppercase tracking-[0.3em] text-cerulean opacity-0">
          Meet Your Healer
        </p>
        <h1 className="about-hero-line mt-5 font-display text-5xl font-light text-white sm:text-6xl md:text-7xl opacity-0">
          About <span className="text-gradient-violet">{BRAND.doctor}</span>
        </h1>
        <p className="about-hero-line mx-auto mt-6 max-w-2xl font-body text-lg text-platinum/80 opacity-0">
          Emotional Healing Specialist &amp; Founder of Curamend — where ancient wisdom and modern neuroscience meet.
        </p>
      </div>
    </section>
  );
}

function StorySection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".story-img",
        { clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)", scale: 1.1 },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", scale: 1,
          duration: 1.4, ease: "power3.inOut",
          scrollTrigger: { trigger: ref.current, start: "top 70%" }
        }
      );
      gsap.fromTo(".story-text",
        { opacity: 0, x: 50 },
        {
          opacity: 1, x: 0, duration: 0.9, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 70%" }
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden bg-black py-24">
      <CinematicVideoBg 
        src="https://assets.mixkit.co/videos/preview/mixkit-abstract-background-of-a-purple-nebula-3147-large.mp4"
        overlayOpacity={0.8}
        overlayGradient="bg-gradient-to-br from-black via-navy/60 to-black"
      />
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-gold/40">
          <img
            src="/about-portrait.jpg"
            alt="Sunil Saldanha full biography photo"
            className="story-img aspect-[6/7] w-full object-cover object-[center_20%]"
            style={{ clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)" }}
          />
        </div>
        <div>
          <p className="story-text font-ui text-xs font-semibold uppercase tracking-[0.28em] text-cerulean opacity-0">
            The Story
          </p>
          <h2 className="story-text mt-3 font-display text-4xl text-foreground sm:text-5xl opacity-0">
            A Lifetime Devoted to Healing
          </h2>
          <div className="mt-6 space-y-4 font-body text-[15px] leading-relaxed text-platinum/80">
            <p className="story-text opacity-0">
              Emotional healing is the process of recovering from emotional wounds inflicted by
              negative life experiences. Stressors threatening survival — violence, accidents,
              disease — and those threatening reproduction — breakups, divorce, miscarriage —
              can all leave unresolved trauma in the body and mind.
            </p>
            <p className="story-text opacity-0">
              With over eight years of clinical practice spanning conventional psychology and
              integrative healing modalities, Sunil Saldanha has developed a methodology that
              works at the neurological root of emotional wounds. When a threat is not resolved,
              the mind re-plays it — searching for completion. His work provides that completion.
            </p>
            <p className="story-text opacity-0">
              Trauma activates defensive responses — fight, flight, freeze, collapse — that
              protected us then but can prevent us from being functional now. Sunil Saldanha's
              approach safely processes these stored responses, guiding clients through expression,
              cognitive re-processing, and interpersonal healing in a supported group environment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CredentialsSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".cred-card",
        { opacity: 0, y: 40, rotateX: -15 },
        {
          opacity: 1, y: 0, rotateX: 0,
          duration: 0.7, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%" }
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-[#f5f3ff] py-24">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeader eyebrow="Qualifications" title="Credentials & Training" light />
        <div className="mt-12 grid gap-4 sm:grid-cols-2" style={{ perspective: "1000px" }}>
          {credentials.map((c, i) => (
            <div
              key={i}
              className="cred-card flex items-center gap-4 rounded-xl border border-violet/15 bg-white p-5 shadow-sm opacity-0"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-violet/10 text-violet">
                <c.icon className="h-5 w-5" />
              </span>
              <span className="font-body text-sm text-navy/75">{c.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PhilosophySection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Rotating sacred geometry orbs
      gsap.to(".phil-orb-1", { rotation: 360, duration: 30, ease: "none", repeat: -1 });
      gsap.to(".phil-orb-2", { rotation: -360, duration: 20, ease: "none", repeat: -1 });

      gsap.fromTo(".phil-text",
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
    <section ref={ref} className="relative overflow-hidden bg-navy py-24">
      <AnimatedPageBg />
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <p className="phil-text font-ui text-xs font-semibold uppercase tracking-[0.28em] text-gold opacity-0">
            Philosophy
          </p>
          <h2 className="phil-text mt-3 font-display text-4xl text-foreground sm:text-5xl opacity-0">
            Healing the Whole Person
          </h2>
          <p className="phil-text mt-6 font-body text-[15px] leading-relaxed text-platinum/80 opacity-0">
            True healing happens when the mind, body and spirit are addressed together. Emotional
            wounds stem from unresolved threat responses stored in the nervous system. Sunil
            Saldanha's work refuses the false choice between science and soul — drawing on
            neuroplasticity research, trauma-informed care, breathwork and energy psychology to
            reach what neither could alone.
          </p>
          <p className="phil-text mt-4 font-body text-[15px] leading-relaxed text-platinum/80 opacity-0">
            Most people who go through trauma can be positively transformed. Re-processing
            traumatic experience causes major cognitive shifts — changing how people see themselves,
            their relationships and the world. That transformation is what this practice exists
            to guide.
          </p>
        </div>
        {/* Animated concentric rings */}
        <div className="relative flex h-72 w-full items-center justify-center">
          <motion.div
            className="phil-orb-1 absolute h-64 w-64 rounded-full border border-violet/30"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="phil-orb-2 absolute h-44 w-44 rounded-full border border-gold/40"
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.div
            className="absolute h-24 w-24 rounded-full border-2 border-cerulean/50 bg-cerulean/10"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          <span className="absolute font-display text-2xl text-gold">✦</span>
        </div>
      </div>
    </section>
  );
}

function VisionSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".vision-card",
        { opacity: 0, y: 60, scale: 0.92 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.8, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%" }
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-[#f5f3ff] py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader eyebrow="The Curamend Vision" title="What Drives Us" light />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {vision.map((v, i) => (
            <div
              key={v.title}
              className="vision-card group h-full rounded-2xl border-t-2 border-gold bg-white p-7 shadow-[0_12px_40px_-26px_rgba(26,31,75,0.3)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_60px_-20px_rgba(201,162,75,0.3)] opacity-0"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold/15 text-gold transition-transform duration-500 group-hover:scale-110">
                <v.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-2xl text-navy">{v.title}</h3>
              <p className="mt-2 font-body text-[15px] leading-relaxed text-navy/70">{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".gallery-img",
        { opacity: 0, scale: 0.85, y: 40 },
        {
          opacity: 1, scale: 1, y: 0,
          duration: 0.8, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%" }
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const images = [
    "https://www.curamendhealthcare.com/assets/images/award-gallery-1/influncer-gallery/influncer-img-17.jpeg",
    "https://www.curamendhealthcare.com/assets/images/award-gallery-1/influncer-gallery/influncer-img-22.jpeg",
    "https://www.curamendhealthcare.com/assets/images/award-gallery-1/influncer-gallery/influncer-img-24.jpeg",
    "https://www.curamendhealthcare.com/assets/images/award-gallery-1/influncer-gallery/influncer-img-20.jpeg",
    "https://www.curamendhealthcare.com/assets/images/award-gallery-1/influncer-gallery/influncer-img-15.jpeg",
    "https://www.curamendhealthcare.com/assets/images/award-gallery-1/influncer-gallery/influncer-img-1.jpeg",
  ];

  return (
    <section ref={ref} className="relative overflow-hidden bg-navy py-24">
      <AnimatedPageBg />
      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader eyebrow="Gallery" title="Inside Curamend" />
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
          {images.map((src, i) => (
            <div key={i} className="gallery-img group overflow-hidden rounded-2xl border border-violet/30 opacity-0">
              <img
                src={src}
                alt={`Inside Curamend Gallery ${i + 1}`}
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <>
      <HeroSection />
      <StorySection />
      <CredentialsSection />
      <PhilosophySection />
      <VisionSection />
      <GallerySection />
    </>
  );
}
