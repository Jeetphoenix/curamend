import { cn } from "@/lib/utils";

type SacredGeometryProps = {
  className?: string;
  reverse?: boolean;
};

/**
 * Mandala built from synaptic / neural-network lines — the brand signature.
 * Pure SVG, animated via CSS (respects prefers-reduced-motion globally).
 */
export function SacredGeometry({ className, reverse }: SacredGeometryProps) {
  const nodes = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2;
    return { x: 250 + Math.cos(a) * 180, y: 250 + Math.sin(a) * 180 };
  });
  const inner = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
    return { x: 250 + Math.cos(a) * 100, y: 250 + Math.sin(a) * 100 };
  });

  return (
    <svg
      viewBox="0 0 500 500"
      className={cn(reverse ? "animate-sacred-spin-rev" : "animate-sacred-spin", className)}
      aria-hidden="true"
      fill="none"
    >
      <circle cx="250" cy="250" r="200" stroke="currentColor" strokeWidth="0.6" opacity="0.6" />
      <circle cx="250" cy="250" r="140" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
      <circle cx="250" cy="250" r="80" stroke="currentColor" strokeWidth="0.6" opacity="0.4" />
      {nodes.map((n, i) => (
        <g key={`o-${i}`}>
          <line x1="250" y1="250" x2={n.x} y2={n.y} stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
          <line
            x1={n.x}
            y1={n.y}
            x2={nodes[(i + 1) % nodes.length].x}
            y2={nodes[(i + 1) % nodes.length].y}
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.35"
          />
          <circle cx={n.x} cy={n.y} r="3" fill="currentColor" opacity="0.7" />
        </g>
      ))}
      {inner.map((n, i) => (
        <g key={`i-${i}`}>
          <line
            x1={n.x}
            y1={n.y}
            x2={inner[(i + 2) % inner.length].x}
            y2={inner[(i + 2) % inner.length].y}
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.4"
          />
          <circle cx={n.x} cy={n.y} r="2.5" fill="currentColor" opacity="0.6" />
        </g>
      ))}
      <circle cx="250" cy="250" r="6" fill="currentColor" opacity="0.9" />
    </svg>
  );
}
