import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Loader2, CheckCircle2, MessageCircle } from "lucide-react";
import { BRAND, FAQS } from "@/data/content";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui-custom/Button";
import { Reveal } from "@/components/ui-custom/Reveal";
import { cn } from "@/lib/utils";

const SITE_URL = "https://www.sunilsaldanha.com";

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${SITE_URL}/contact#webpage`,
  url: `${SITE_URL}/contact`,
  name: "Book an Emotional Healing Session | Curamend — Sunil Saldanha",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Contact", item: `${SITE_URL}/contact` },
    ],
  },
};

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Book a Healing Session | Contact Sunil Saldanha — Curamend" },
      {
        name: "description",
        content:
          "Book an emotional healing session with Sunil Saldanha at Curamend. Get in touch via email, WhatsApp or the contact form to reserve your Saturday spot.",
      },
      {
        name: "keywords",
        content:
          "book emotional healing session, contact Sunil Saldanha, Curamend booking, reserve healing session, Curamend contact, emotional healing appointment, Saturday session booking",
      },
      { property: "og:title", content: "Book a Healing Session | Contact Sunil Saldanha — Curamend" },
      {
        property: "og:description",
        content:
          "Book your Saturday emotional healing session with Sunil Saldanha. Reach out via email, WhatsApp or our contact form.",
      },
      { property: "og:url", content: `${SITE_URL}/contact` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/contact` }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(contactJsonLd) }],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(20),
  service: z.string().min(1, "Please select a service"),
  source: z.string().max(100).optional(),
  message: z.string().trim().min(5, "Please tell us a little more").max(1000),
});

type FormValues = z.infer<typeof schema>;

const services = [
  "Emotional Healing Sessions",
  "Individual Consultations",
  "Trauma Release",
  "Mindfulness & Breathwork",
  "Energy Psychology",
];

const fieldCls =
  "w-full rounded-xl border border-input bg-surface px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-ink focus:border-violet focus:outline-none focus:ring-2 focus:ring-ring/40";

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    // Simulate async submission. Hook up to backend / email service when ready.
    await new Promise((r) => setTimeout(r, 900));
    console.log("Contact form submitted", data);
    setSubmitted(true);
    reset();
  };

  return (
    <>
      <PageHero
        eyebrow="We'd Love to Hear From You"
        title="Get in Touch"
        subtitle="Have a question or ready to book? Reach out and we'll guide you to your first Saturday session."
      />

      <section className="bg-navy py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1.4fr_1fr]">
          {/* Form */}
          <Reveal>
            <div className="rounded-2xl border border-border bg-surface/60 p-7 sm:p-9">
              {submitted ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="flex flex-col items-center justify-center gap-4 py-16 text-center"
                >
                  <CheckCircle2 className="h-14 w-14 text-gold" />
                  <h2 className="font-display text-3xl text-foreground">Thank you!</h2>
                  <p className="max-w-sm font-body text-platinum/80">
                    Your message has been received. Our team will be in touch shortly to confirm
                    your session.
                  </p>
                  <Button variant="outline" onClick={() => setSubmitted(false)}>
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-1.5 block font-ui text-sm text-platinum/80">
                        Full Name
                      </label>
                      <input id="name" className={fieldCls} placeholder="Your name" {...register("name")} />
                      {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-1.5 block font-ui text-sm text-platinum/80">
                        Email
                      </label>
                      <input id="email" type="email" className={fieldCls} placeholder="you@email.com" {...register("email")} />
                      {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="phone" className="mb-1.5 block font-ui text-sm text-platinum/80">
                        Phone Number
                      </label>
                      <input id="phone" type="tel" className={fieldCls} placeholder="+91 ..." {...register("phone")} />
                      {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="service" className="mb-1.5 block font-ui text-sm text-platinum/80">
                        Service Interested In
                      </label>
                      <select id="service" className={cn(fieldCls, "appearance-none")} defaultValue="" {...register("service")}>
                        <option value="" disabled>Select a service</option>
                        {services.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      {errors.service && <p className="mt-1 text-xs text-destructive">{errors.service.message}</p>}
                    </div>
                    <div>
                      <label htmlFor="source" className="mb-1.5 block font-ui text-sm text-platinum/80">
                        How did you hear about us?
                      </label>
                      <input id="source" className={fieldCls} placeholder="Optional" {...register("source")} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-1.5 block font-ui text-sm text-platinum/80">
                      Message
                    </label>
                    <textarea id="message" rows={4} className={fieldCls} placeholder="How can we help you?" {...register("message")} />
                    {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>}
                  </div>

                  <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              )}
            </div>
          </Reveal>

          {/* Contact details */}
          <Reveal delay={0.1}>
            <div className="space-y-5">
              <a
                href={`mailto:${BRAND.email}`}
                className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-gold/50"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cerulean/10 text-cerulean">
                  <Mail className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="font-ui text-xs uppercase tracking-wide text-muted-ink">General Email</p>
                  <p className="truncate font-body text-sm text-foreground">{BRAND.email}</p>
                </div>
              </a>

              <a
                href={`https://wa.me/${BRAND.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet to-[#7a52d6] p-4 font-ui text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]"
              >
                <MessageCircle className="h-5 w-5" /> Chat with us on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mini FAQ */}
      <section className="bg-light-surface py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <h2 className="text-center font-display text-4xl text-navy">Quick Questions Answered</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {FAQS.slice(0, 3).map((faq, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-violet/15 bg-white p-6">
                  <h3 className="font-ui text-base font-semibold text-navy">{faq.q}</h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-navy/70">{faq.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
