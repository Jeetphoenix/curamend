import { type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/animations/MagneticButton";

type Variant = "primary" | "gold" | "outline" | "ghost";
type Size = "md" | "lg";

const base =
  "btn-shimmer font-ui inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-violet to-[#7a52d6] text-white shadow-glow hover:scale-[1.03] hover:shadow-[0_28px_70px_-26px_rgba(91,79,207,0.7)]",
  gold: "bg-gradient-to-r from-[#e8c97a] to-gold text-navy shadow-gold hover:scale-[1.03]",
  outline:
    "border border-platinum/40 text-platinum hover:border-platinum hover:bg-platinum/10 hover:scale-[1.02]",
  ghost: "text-gold hover:text-amber",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({
  to,
  variant = "primary",
  size = "md",
  className,
  children,
}: CommonProps & { to: string }) {
  const isMagnetic = variant === "primary" || variant === "gold";
  const btn = (
    <Link to={to} className={cn(base, variants[variant], sizes[size], className)}>
      {children}
    </Link>
  );

  if (isMagnetic) {
    return <MagneticButton>{btn}</MagneticButton>;
  }
  return btn;
}

export function ButtonAnchor({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & { href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isMagnetic = variant === "primary" || variant === "gold";
  const btn = (
    <a href={href} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </a>
  );

  if (isMagnetic) {
    return <MagneticButton>{btn}</MagneticButton>;
  }
  return btn;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const isMagnetic = variant === "primary" || variant === "gold";
  const btn = (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>
  );

  if (isMagnetic) {
    return <MagneticButton>{btn}</MagneticButton>;
  }
  return btn;
}
