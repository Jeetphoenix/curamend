import React, { useEffect, useState, createContext, useContext } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollContextType {
  isReducedMotion: boolean;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  isReducedMotion: false,
});

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reduced = mediaQuery.matches;
    setIsReducedMotion(reduced);

    if (reduced) {
      // Cut GSAP animation durations to almost instant
      gsap.defaults({ duration: 0.01 });
      return;
    }

    const lenis = new Lenis({
      lerp: 0.1,
      // smoothWheel: true, (default in latest lenis)
    });

    lenis.on("scroll", ScrollTrigger.update);

    // Sync GSAP's ticker with Lenis
    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ isReducedMotion }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
