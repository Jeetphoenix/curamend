import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { motion, useScroll } from "framer-motion";
import { SmoothScrollProvider } from "../components/animations/SmoothScrollProvider";
import { LoadingSequence } from "../components/animations/LoadingSequence";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { ContactWidget } from "../components/layout/WhatsAppButton";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-semibold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-input bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const SITE_URL = "https://www.sunilsaldanha.com";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Curamend",
      description:
        "Sunil Saldanha's emotional healing practice blending neuroscience with ancient wisdom.",
      publisher: { "@id": `${SITE_URL}/#person` },
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/?s={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Sunil Saldanha",
      url: SITE_URL,
      jobTitle: "Emotional Healing Specialist",
      worksFor: { "@id": `${SITE_URL}/#organization` },
      sameAs: [],
      description:
        "Sunil Saldanha is an emotional healing specialist with 8+ years of practice, blending cognitive neuroscience, trauma therapy, breathwork, and energy psychology.",
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#organization`,
      name: "Curamend",
      url: SITE_URL,
      email: "curamendhealthcare@gmail.com",
      telephone: "+919321931801",
      founder: { "@id": `${SITE_URL}/#person` },
      description:
        "Curamend by Sunil Saldanha offers evidence-based emotional healing sessions every Saturday, integrating neuroscience and ancient healing traditions.",
      serviceType: [
        "Emotional Healing",
        "Trauma Therapy",
        "Breathwork",
        "Energy Psychology",
        "Mindfulness",
        "Group Healing Sessions",
      ],
      openingHours: "Sa 00:00-23:59",
    },
  ],
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Sunil Saldanha — Curamend | Emotional Healing Specialist" },
      {
        name: "description",
        content:
          "Sunil Saldanha is an emotional healing specialist at Curamend, offering evidence-based healing sessions blending neuroscience with ancient wisdom. Saturday group sessions available.",
      },
      { name: "author", content: "Sunil Saldanha" },
      {
        name: "keywords",
        content:
          "Sunil Saldanha, Curamend, emotional healing, emotional healing specialist, trauma healing, breathwork, energy psychology, neuroscience healing, group healing sessions, Saturday healing, inner peace, trauma release, mindfulness, emotional freedom, holistic healing",
      },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
      // Open Graph
      { property: "og:site_name", content: "Curamend" },
      { property: "og:title", content: "Sunil Saldanha — Curamend | Emotional Healing Specialist" },
      {
        property: "og:description",
        content:
          "Evidence-based, spiritually grounded emotional healing with Sunil Saldanha. Neuroscience meets ancient wisdom. Sessions every Saturday.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:locale", content: "en_IN" },
      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Sunil Saldanha — Curamend | Emotional Healing" },
      {
        name: "twitter:description",
        content:
          "Emotional healing with Sunil Saldanha — neuroscience meets ancient wisdom. Saturday sessions.",
      },
    ],
    links: [
      { rel: "canonical", href: SITE_URL },
      { rel: "icon", href: "/doctor-portrait.jpg", type: "image/jpeg" },
      { rel: "apple-touch-icon", href: "/doctor-portrait.jpg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
      { rel: "stylesheet", href: appCss },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(jsonLd),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { scrollYProgress } = useScroll();

  return (
    <QueryClientProvider client={queryClient}>
      <SmoothScrollProvider>
          <LoadingSequence />
        <motion.div
          className="fixed top-0 left-0 right-0 h-[3px] bg-gold z-[60] origin-left"
          style={{ scaleX: scrollYProgress }}
        />
        <div className="flex min-h-screen flex-col bg-background">
          <Navbar />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
          <ContactWidget />
        </div>
      </SmoothScrollProvider>
    </QueryClientProvider>
  );
}
