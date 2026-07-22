import {
  Brain,
  Sparkles,
  HeartHandshake,
  Wind,
  Activity,
  ShieldCheck,
  Flower2,
  Microscope,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const BRAND = {
  name: "Curamend",
  legal: "Sunil Saldanha",
  doctor: "Sunil Saldanha",
  tagline: "Science of the Soul. Healing of the Heart.",
  email: "curamendhealthcare@gmail.com",
  whatsapp: "919321931801",
  primaryPhone: "+91 9321 931801",
};

export type NavItem = { label: string; to: string };

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Sessions", to: "/sessions" },
  { label: "Science", to: "/science" },
];

export type Stat = { value: number; suffix?: string; label: string; icon: LucideIcon };

export const STATS: Stat[] = [
  { value: 500, suffix: "+", label: "Clients Healed", icon: HeartHandshake },
  { value: 8, suffix: "+", label: "Years of Practice", icon: Activity },
  { value: 100, suffix: "%", label: "Science-Backed Methods", icon: Microscope },
];

export type ValueCard = {
  eyebrow: string;
  title: string;
  text: string;
  icon: LucideIcon;
  imageUrl: string;
};

export const VALUE_CARDS: ValueCard[] = [
  {
    eyebrow: "Evidence-Based",
    title: "Rooted in Neuroscience",
    text: "Emotional wounds are caused by unresolved threats to survival or reproduction. Our protocols address trauma at its neurological root — where the brain stores unprocessed experience.",
    icon: Brain,
    imageUrl: "/neuroscience.png",
  },
  {
    eyebrow: "Spiritually Grounded",
    title: "Ancient Wisdom Activated",
    text: "Healing requires more than insight — it demands expression, re-processing and integration. We draw on millennia of contemplative practice to guide what science alone cannot reach.",
    icon: Sparkles,
    imageUrl: "/spiritual.png",
  },
  {
    eyebrow: "Personally Guided",
    title: "Direct Access to Sunil Saldanha",
    text: "Every session is personally led by Sunil Saldanha — no assistants, no substitutes. Healing through shared presence is not a feature; it is the foundation of this work.",
    icon: HeartHandshake,
    imageUrl: "/guidance.png",
  },
];

export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
  imageUrl: string;
};

export const SERVICES: Service[] = [
  {
    title: "Emotional Healing Sessions",
    description:
      "Our core offering — transformative group healing sessions every Saturday. Emotional wounds from unresolved threat responses are addressed through guided expression, re-processing and integration.",
    icon: HeartHandshake,
    imageUrl: "/service-1.png",
  },
  {
    title: "Individual Consultations",
    description:
      "Private one-on-one sessions for focused, personalised healing. Ideal for those whose trauma history requires careful, individually mapped therapeutic attention.",
    icon: Sparkles,
    imageUrl: "/service-2.png",
  },
  {
    title: "Trauma Release",
    description:
      "Trauma activates survival defences — fight, flight, freeze, or collapse — that can persist long after the threat is gone. These protocols safely discharge stored defensive responses from the nervous system.",
    icon: ShieldCheck,
    imageUrl: "/service-3.png",
  },
  {
    title: "Mindfulness & Breathwork",
    description:
      "The parasympathetic nervous system holds the key to calming trauma responses. Breathwork-based practices directly regulate the autonomic nervous system, restoring inner safety.",
    icon: Wind,
    imageUrl: "/service-4.png",
  },
  {
    title: "Energy Psychology",
    description:
      "Integrative techniques that combine cognitive re-processing with somatic stimulation — discharging stored emotional charge and re-patterning the body's conditioned stress response.",
    icon: Activity,
    imageUrl: "/service-5.png",
  },
  {
    title: "Integration & Aftercare",
    description:
      "Healing requires time to consolidate. Structured follow-up practices anchor cognitive and emotional shifts into daily life so transformation holds long after the session ends.",
    icon: Flower2,
    imageUrl: "/service-6.png",
  },
];

export type Principle = {
  title: string;
  text: string;
  icon: LucideIcon;
};

export const SCIENCE_PRINCIPLES: Principle[] = [
  {
    title: "Neuroplasticity",
    text: "Childhood trauma damages brain development — particularly the left hemisphere, which handles analytical thinking and emotional regulation. Guided healing creates conditions for the brain to physically rewire, building healthier emotional pathways.",
    icon: Brain,
  },
  {
    title: "Psychosomatic Connection",
    text: "Trauma lives in the body. Unresolved threat responses — fight, flight, freeze, collapse — are stored as physical tension patterns. We work the mind–body loop to release what talk therapy cannot reach.",
    icon: Activity,
  },
  {
    title: "Trauma-Informed Care",
    text: "Every protocol keeps the nervous system safe. By understanding the sympathetic and parasympathetic responses to threat, we process stored trauma gently — without re-traumatisation.",
    icon: ShieldCheck,
  },
  {
    title: "Energy Psychology",
    text: "Evidence-informed techniques that combine cognitive re-processing with somatic stimulation. This discharges emotional intensity rapidly and re-patterns the body's conditioned stress response.",
    icon: Sparkles,
  },
];

export const METHODOLOGY_STEPS = [
  { title: "Assessment", text: "Understanding your emotional history — the unresolved threats and defences that shaped your present-day patterns." },
  { title: "Expression", text: "Creating space for trauma-related thoughts and emotions to surface through guided, safe expression." },
  { title: "Re-Processing", text: "Cognitive re-processing that integrates the traumatic experience, shifting how you see yourself and the world." },
  { title: "Integration", text: "Anchoring the shift into daily life through practices that make transformation hold." },
  { title: "Outcome", text: "Measurable, lasting emotional freedom — resilience, clarity and the capacity to move forward." },
];

export const PROCESS_STEPS = [
  { title: "Initial Consultation", text: "We listen deeply to your emotional history and the unresolved experiences that keep you stuck." },
  { title: "Assessment", text: "A clear, compassionate map of your trauma responses, defences and emotional patterns." },
  { title: "Healing Protocol", text: "Expression, re-processing and release — personalised sessions built on science and spirit." },
  { title: "Integration", text: "Cognitive and somatic tools that anchor your transformation into everyday life." },
  { title: "Transformation", text: "Resilience, emotional freedom and the ability to form deeper, healthier connections." },
];

export type FAQ = { q: string; a: string };

export const FAQS: FAQ[] = [
  {
    q: "When are sessions held?",
    a: "Group emotional healing sessions run every Saturday for two hours. Exact timings are confirmed at booking.",
  },
  {
    q: "Do I need any prior experience?",
    a: "Not at all. Sessions are designed for complete beginners as well as those continuing a longer healing journey.",
  },
  {
    q: "Is this a replacement for medical treatment?",
    a: "Curamend complements, and does not replace, medical or psychiatric care. We're happy to work alongside your existing care team.",
  },
  {
    q: "Will Sunil Saldanha personally lead my session?",
    a: "Yes. Every session is personally led by Sunil Saldanha — no assistants, no substitutes.",
  },
  {
    q: "How many sessions will I need?",
    a: "This varies by individual. Many clients report meaningful clarity within the first few sessions; deeper work unfolds over time.",
  },
  {
    q: "How do I book?",
    a: "Use the booking form on our Contact page, or call us directly. Seats per session are limited.",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  rating: number;
  date?: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "The emotional clarity I gained in just four sessions was more than years of conventional therapy provided. Sunil Saldanha's approach is unlike anything I've experienced.",
    name: "R. M.",
    rating: 5,
    date: "Mar 2025",
  },
  {
    quote:
      "I arrived carrying years of grief I couldn't name. I left lighter, clearer, and finally able to breathe. The science behind it gave me trust; the warmth gave me healing.",
    name: "A. K.",
    rating: 5,
    date: "Feb 2025",
  },
  {
    quote:
      "What sets Curamend apart is the honesty — no false promises, just careful, compassionate, evidence-based work. It changed my relationship with myself.",
    name: "S. D.",
    rating: 5,
    date: "Jan 2025",
  },
  {
    quote:
      "Every Saturday became the hour I protected most. The group setting felt safe, and Sunil Saldanha's presence was steady and deeply reassuring.",
    name: "P. V.",
    rating: 5,
    date: "Dec 2024",
  },
  {
    quote:
      "I was sceptical about anything 'spiritual'. The neuroscience grounding won me over, and then the results spoke for themselves.",
    name: "N. J.",
    rating: 5,
    date: "Nov 2024",
  },
  {
    quote:
      "After my divorce I felt numb. The breathwork and trauma release work slowly brought me back to life. I'm endlessly grateful.",
    name: "T. R.",
    rating: 5,
    date: "Oct 2024",
  },
  {
    quote:
      "Professional, calm, and genuinely transformative. This is healthcare done with heart and rigour at once.",
    name: "M. S.",
    rating: 5,
    date: "Sep 2024",
  },
  {
    quote:
      "I've recommended Curamend to my entire family. The integration practices kept the changes alive long after the sessions ended.",
    name: "K. B.",
    rating: 5,
    date: "Aug 2024",
  },
  {
    quote:
      "The most human, intelligent healing experience I've had. Sunil Saldanha sees you — really sees you.",
    name: "L. F.",
    rating: 5,
    date: "Jul 2024",
  },
];

export const SESSION_INCLUDES = [
  { title: "Guided Emotional Expression", text: "A held space for trauma-related thoughts and emotions to surface and be acknowledged." },
  { title: "Breathwork", text: "Parasympathetic nervous system regulation through guided breath — calming the body's threat response." },
  { title: "Cognitive Re-Processing", text: "Making sense of painful experiences so the mind can integrate and move forward." },
  { title: "Safe Group Container", text: "Small, confidential groups that provide the interpersonal connection essential to emotional healing." },
  { title: "Integration Tools", text: "Take-home practices that anchor shifts into daily life so transformation holds." },
  { title: "Personal Attention", text: "Direct guidance from Sunil Saldanha throughout — no assistants, no substitutes." },
];

export const SESSION_FACTS = [
  { label: "Every Saturday", icon: "calendar" },
  { label: "2 Hours", icon: "clock" },
  { label: "Online Access", icon: "pin" },
  { label: "Small Groups", icon: "users" },
];
