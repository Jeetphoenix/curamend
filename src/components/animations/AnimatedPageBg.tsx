import { useEffect, useRef } from "react";
import gsap from "gsap";

interface AnimatedPageBgProps {
  variant?: "navy" | "dark" | "light";
  className?: string;
}

export function AnimatedPageBg({ variant = "navy", className = "" }: AnimatedPageBgProps) {
  const orb1 = useRef<HTMLDivElement>(null);
  const orb2 = useRef<HTMLDivElement>(null);
  const orb3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t1 = gsap.to(orb1.current, { x: "30%", y: "-20%", duration: 14, ease: "sine.inOut", repeat: -1, yoyo: true });
    const t2 = gsap.to(orb2.current, { x: "-25%", y: "25%", duration: 17, ease: "sine.inOut", repeat: -1, yoyo: true });
    const t3 = gsap.to(orb3.current, { x: "15%", y: "30%", duration: 11, ease: "sine.inOut", repeat: -1, yoyo: true });
    return () => { t1.kill(); t2.kill(); t3.kill(); };
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            variant === "light"
              ? "linear-gradient(rgba(91,79,207,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(91,79,207,0.05) 1px, transparent 1px)"
              : "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div ref={orb1} className="absolute rounded-full blur-[100px] opacity-20 w-[500px] h-[500px] -top-40 -left-40 bg-violet" />
      <div ref={orb2} className="absolute rounded-full blur-[100px] opacity-15 w-[400px] h-[400px] -bottom-32 -right-32 bg-cerulean" />
      <div ref={orb3} className="absolute rounded-full blur-[120px] opacity-10 w-[350px] h-[350px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold" />
    </div>
  );
}
