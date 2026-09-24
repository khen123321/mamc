"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { MCMC_BRAND } from "@/constants/brand";
import { hospital } from "@/constants/hospital";

type LogoVariant = "horizontal" | "vertical" | "mark";
type LogoTone = "fullColor" | "white";

const logoDimensions: Record<LogoVariant, { width: number; height: number; className: string }> = {
  horizontal: { width: 1800, height: 1230, className: "max-h-16 w-auto max-w-[220px]" },
  vertical: { width: 1800, height: 771, className: "w-[220px] sm:w-[260px]" },
  mark: { width: 593, height: 753, className: "max-h-11 w-auto" },
};

export function MCMCLogo({
  variant = "horizontal",
  tone = "fullColor",
  className,
}: {
  variant?: LogoVariant;
  tone?: LogoTone;
  className?: string;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const asset = MCMC_BRAND.logoAssets[variant];
  const dimensions = logoDimensions[variant];

  if (asset && !imageFailed) {
    return (
      <Image
        src={asset}
        alt={`${hospital.name} logo`}
        width={dimensions.width}
        height={dimensions.height}
        sizes={variant === "mark" ? "44px" : "(max-width: 640px) 180px, 220px"}
        className={cn("h-auto shrink-0 object-contain", dimensions.className, className)}
        onError={() => setImageFailed(true)}
        priority={variant === "horizontal"}
      />
    );
  }

  return (
    <div className={cn("flex items-center gap-3", variant === "vertical" ? "flex-col text-center" : "", tone === "white" ? "text-white" : "text-[var(--brand-primary)]", className)}>
      <span
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-md border text-base font-semibold tracking-tight",
          tone === "white" ? "border-white/40 bg-white/10 text-white" : "border-[var(--brand-primary)] bg-white text-[var(--brand-primary)]",
        )}
        aria-hidden="true"
      >
        MC
      </span>
      {variant !== "mark" ? (
        <span className={variant === "vertical" ? "grid gap-0.5 text-center" : "grid gap-0.5"}>
          <span className="text-xs font-semibold uppercase tracking-[0.18em]">{hospital.shortName}</span>
          <span className={cn("max-w-[260px] text-sm font-semibold leading-5", tone === "white" ? "text-white" : "text-[var(--brand-text)]")}>
            {hospital.name}
          </span>
        </span>
      ) : null}
    </div>
  );
}
