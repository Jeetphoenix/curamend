import { useRef, useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

export function Reveal({ children, className = "", delay = 0, y = 30 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { autoAlpha: 0, y });

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      toggleActions: "play none none none",
      animation: gsap.to(el, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        delay,
        ease: "power2.out",
      }),
    });

    return () => {
      st.kill();
    };
  }, [delay, y]);

  return (
    <div ref={ref} className={className} style={{ visibility: "hidden" }}>
      {children}
    </div>
  );
}
