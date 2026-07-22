import { useRef } from "react";
import { useSmoothScroll } from "../animations/SmoothScrollProvider";
import CountUpModule from "react-countup";
import gsap from "gsap";

const CountUp = (CountUpModule as any).default || CountUpModule;

type AnimatedCounterProps = {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
  startCounting?: boolean;
};

export function AnimatedCounter({
  value,
  suffix = "",
  duration = 1.8,
  className,
  startCounting = false,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const { isReducedMotion } = useSmoothScroll();

  const handleEnd = () => {
    if (ref.current && !isReducedMotion) {
      gsap.fromTo(
        ref.current,
        { scale: 1 },
        { scale: 1.08, duration: 0.15, yoyo: true, repeat: 1, ease: "power1.inOut" }
      );
    }
  };

  if (isReducedMotion) {
    return (
      <span ref={ref} className={className}>
        {value}{suffix}
      </span>
    );
  }

  return (
    <span ref={ref} className={`inline-block origin-center ${className || ""}`}>
      {startCounting ? (
        <CountUp 
          start={0} 
          end={value} 
          duration={duration} 
          suffix={suffix} 
          onEnd={handleEnd} 
          useEasing 
        />
      ) : (
        `0${suffix}`
      )}
    </span>
  );
}
