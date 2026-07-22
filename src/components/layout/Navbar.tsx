import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { NAV_ITEMS } from "@/data/content";
import { ButtonLink } from "@/components/ui-custom/Button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.95]);
  const blur = useTransform(scrollY, [0, 100], [0, 12]);
  const textColor = useTransform(scrollY, [0, 100], ["#ffffff", "#1a1f4b"]); // white to navy
  const logoSubColor = useTransform(scrollY, [0, 100], ["#e8c97a", "#C9A24B"]);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 py-4 transition-[padding] duration-300"
      style={{
        backgroundColor: useTransform(bgOpacity, (v) => `rgba(255, 255, 255, ${v})`),
        backdropFilter: useTransform(blur, (v) => `blur(${v}px)`),
        color: textColor,
      }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link to="/" className="flex flex-col leading-none z-50 relative">
          <motion.span className="font-display text-2xl font-semibold" style={{ color: textColor }}>
            Sunil
          </motion.span>
          <motion.span className="font-ui text-[10px] uppercase tracking-[0.28em]" style={{ color: logoSubColor }}>
            Saldanha
          </motion.span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className="group relative font-ui text-sm font-medium"
              >
                <motion.span style={{ color: active ? logoSubColor : textColor }}>{item.label}</motion.span>
                <span className={cn(
                  "absolute -bottom-1 left-0 h-[2px] w-full origin-center scale-x-0 bg-gold transition-transform duration-250 ease-out",
                  active ? "scale-x-100" : "group-hover:scale-x-100"
                )} />
              </Link>
            );
          })}
        </div>

        <div className="hidden lg:block">
          <ButtonLink to="/contact" size="md">
            Book a Session
          </ButtonLink>
        </div>

        <button
          className="z-50 relative lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <motion.div style={{ color: open ? "#1a1f4b" : textColor }}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.div>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at top right)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at top right)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at top right)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-white/95 px-6 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-6 text-center">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.4, ease: "easeOut" }}
                >
                  <Link
                    to={item.to}
                    className={cn(
                      "font-display text-3xl font-medium",
                      pathname === item.to ? "text-gold" : "text-navy hover:text-gold"
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.1 + NAV_ITEMS.length * 0.06, duration: 0.4 }}
                className="mt-8 flex justify-center"
              >
                <ButtonLink to="/contact" size="lg">
                  Contact Us
                </ButtonLink>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
