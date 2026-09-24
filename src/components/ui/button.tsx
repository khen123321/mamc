import * as React from "react";
import { cn } from "@/lib/utils";

export function Button({ className, variant = "primary", size = "md", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "outline" | "danger"; size?: "sm" | "md" | "lg" }) {
  return <button className={cn("inline-flex items-center justify-center gap-2 rounded-md font-semibold transition disabled:cursor-not-allowed disabled:opacity-50", variants[variant], sizes[size], className)} {...props} />;
}

const variants = {
  primary: "bg-[var(--brand-primary)] text-white shadow-sm hover:bg-[var(--brand-primary-hover)]",
  secondary: "border border-[var(--brand-primary)] bg-white text-[var(--brand-primary)] hover:bg-[var(--brand-surface-soft)]",
  outline: "border border-[var(--brand-border)] bg-white text-[var(--brand-text)] hover:border-[var(--brand-secondary)] hover:bg-[var(--brand-surface-soft)]",
  danger: "bg-[var(--status-danger)] text-white hover:bg-red-800",
};

const sizes = { sm: "h-9 px-3 text-sm", md: "h-11 px-4 text-sm", lg: "h-12 px-5 text-base" };
