import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Phone, Mail, Instagram, Facebook } from "lucide-react";
import { BRAND } from "@/data/content";
import gsap from "gsap";

const HANDLES = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: Phone,
    color: "bg-[#25D366]",
    textColor: "text-white",
    href: `https://wa.me/${BRAND.whatsapp}`,
    description: "Chat on WhatsApp",
  },
  {
    id: "instagram",
    label: "Instagram",
    icon: Instagram,
    color: "bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]",
    textColor: "text-white",
    href: "https://instagram.com/curamendhealthcare",
    description: "@curamendhealthcare",
  },
  {
    id: "facebook",
    label: "Facebook",
    icon: Facebook,
    color: "bg-[#1877F2]",
    textColor: "text-white",
    href: "https://facebook.com/curamendhealthcare",
    description: "Curamend Healthcare",
  },
  {
    id: "email",
    label: "Email",
    icon: Mail,
    color: "bg-violet",
    textColor: "text-white",
    href: `mailto:${BRAND.email ?? "contact@curamendhealthcare.com"}`,
    description: "Send us an email",
  },
];

export function ContactWidget() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Pulse ring animation
  useEffect(() => {
    const ring = btnRef.current?.querySelector(".pulse-ring");
    if (ring) {
      gsap.to(ring, {
        scale: 1.5, opacity: 0, duration: 1.5, repeat: -1, ease: "power1.out"
      });
    }
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Social handle options */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex flex-col gap-2 mb-2"
          >
            {HANDLES.map((h, i) => (
              <motion.a
                key={h.id}
                href={h.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: i * 0.06, duration: 0.2, ease: "easeOut" }}
                className={`group flex items-center gap-3 rounded-2xl ${h.color} px-4 py-3 shadow-lg transition-transform duration-200 hover:scale-105 hover:shadow-xl`}
                aria-label={h.label}
              >
                {/* Icon */}
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white/20 ${h.textColor}`}>
                  <h.icon className="h-4 w-4" />
                </span>
                {/* Label */}
                <div className={h.textColor}>
                  <p className="font-ui text-sm font-semibold leading-none">{h.label}</p>
                  <p className="mt-0.5 font-body text-xs opacity-80">{h.description}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main toggle button */}
      <button
        ref={btnRef}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close contact options" : "Open contact options"}
        className="relative grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-violet to-[#7a52d6] text-white shadow-[0_0_30px_rgba(91,79,207,0.5)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_50px_rgba(91,79,207,0.7)]"
      >
        {/* Pulse ring */}
        {!open && (
          <span className="pulse-ring absolute inset-0 rounded-full bg-violet/40" />
        )}
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
