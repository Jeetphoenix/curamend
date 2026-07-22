import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function LoadingSequence({ onComplete }: { onComplete?: () => void }) {
  const [shouldPlay, setShouldPlay] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fireComplete = () => {
      onComplete?.();
      window.dispatchEvent(new Event("loaderComplete"));
    };

    if (sessionStorage.getItem("curamend_loaded")) {
      setShouldPlay(false);
      fireComplete();
      return;
    }
    
    sessionStorage.setItem("curamend_loaded", "true");
    
    const tl = gsap.timeline({
      onComplete: () => {
        setShouldPlay(false);
        fireComplete();
      }
    });

    // 0.0s–0.3s: line draw
    tl.fromTo(lineRef.current, 
      { scaleX: 0 }, 
      { scaleX: 1, duration: 0.3, ease: "power1.inOut" }, 
      0
    );
    
    // 0.3s–1.2s: "CURAMEND" letters fade & track in
    tl.fromTo(".loader-letter", 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, stagger: 0.04, duration: 0.9, ease: "power3.out" }, 
      0.3
    );

    // 1.2s–1.6s: Tagline
    tl.fromTo(taglineRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.4 }, 
      1.2
    );

    // 2.0s–2.6s: scale down & wipe
    tl.to(contentRef.current, { scale: 0.96, opacity: 0, duration: 0.6, ease: "power4.inOut" }, 2.0);
    
    // For the wipe, we'll use a shrinking clip-path on the overlay to simulate a hole expanding if the background is dark,
    // or we use clip-path to shrink the overlay to 0
    tl.fromTo(containerRef.current, 
      { clipPath: "circle(150% at 50% 50%)" },
      { clipPath: "circle(0% at 50% 50%)", duration: 0.6, ease: "power4.inOut" }, 
      2.0
    );

  }, [onComplete]);

  if (!shouldPlay) return null;

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a] text-[#C9A24B]"
    >
      <div ref={contentRef} className="flex flex-col items-center">
        <div className="relative mb-6">
          <div className="flex overflow-hidden text-5xl font-display tracking-[0.2em] sm:text-7xl">
            {"CURAMEND".split("").map((char, i) => (
              <span key={i} className="loader-letter inline-block">
                {char}
              </span>
            ))}
          </div>
          {/* A thin horizontal line across the center */}
          <div className="absolute top-1/2 left-[-20%] right-[-20%] h-[2px] -translate-y-1/2 overflow-hidden">
            <div ref={lineRef} className="h-full w-full origin-left bg-[#C9A24B]" />
          </div>
        </div>
        <div ref={taglineRef} className="font-ui text-sm uppercase tracking-widest text-white/70">
          Science of the Soul. Healing of the Heart.
        </div>
      </div>
    </div>
  );
}
