import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-electric-500 to-violet-500 text-white shadow-glow hover:brightness-110 active:brightness-95",
  secondary: "border border-white/15 bg-white/[0.04] text-ink-100 hover:border-white/30 hover:bg-white/[0.09]",
  ghost: "text-ink-300 hover:bg-white/[0.06] hover:text-white",
  danger: "border border-critical/40 text-ink-100 hover:bg-critical/15",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

export function buttonClasses(variant: Variant = "secondary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

export function Button({
  variant = "secondary",
  size = "md",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  return <button className={buttonClasses(variant, size, className)} {...props} />;
}

export function ButtonLink({
  href,
  variant = "secondary",
  size = "md",
  className,
  children,
  target,
  rel,
  prefetch,
}: {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
  prefetch?: boolean;
}) {
  return (
    <Link href={href} className={buttonClasses(variant, size, className)} target={target} rel={rel} prefetch={prefetch}>
      {children}
    </Link>
  );
}
