import { Link } from "@tanstack/react-router";
import { Mail, Instagram, Facebook, Youtube, Linkedin } from "lucide-react";
import { NAV_ITEMS, BRAND } from "@/data/content";

export function Footer() {
  return (
    <footer className="border-t border-border bg-navy">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="font-display text-2xl font-semibold text-foreground">
            {BRAND.name}
          </span>
          <p className="mt-3 max-w-xs font-body text-sm text-muted-ink">{BRAND.tagline}</p>
          <div className="mt-5 flex gap-3">
            {[Instagram, Facebook, Youtube, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social media link"
                className="grid h-9 w-9 place-items-center rounded-full border border-border text-platinum/80 transition-colors hover:border-gold hover:text-gold"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-ui text-sm font-semibold uppercase tracking-wider text-gold">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2.5">
            <li>
              <Link to="/" className="font-body text-sm text-platinum/80 hover:text-foreground">
                Home
              </Link>
            </li>
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="font-body text-sm text-platinum/80 hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-ui text-sm font-semibold uppercase tracking-wider text-gold">
            Get in Touch
          </h3>
          <a
            href={`mailto:${BRAND.email}`}
            className="mt-4 flex items-center gap-2 font-body text-sm text-platinum/80 hover:text-foreground"
          >
            <Mail className="h-4 w-4 shrink-0 text-cerulean" />
            {BRAND.email}
          </a>
          <p className="mt-4 font-body text-sm text-muted-ink">
            Emotional healing sessions every Saturday — 2 hours.
          </p>
        </div>
      </div>

      <div className="border-t border-border">
        <p className="mx-auto max-w-7xl px-5 py-6 text-center font-ui text-xs text-muted-ink sm:px-8">
          © {new Date().getFullYear()} {BRAND.legal}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
