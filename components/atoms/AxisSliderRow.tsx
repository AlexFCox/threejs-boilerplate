"use client";

import type { ReactNode } from "react";
import { ZoomRangeInput } from "@/components/atoms/ZoomRangeInput";
import { cn } from "@/lib/utils";

type AxisSliderRowProps = {
  label?: string;
  leading?: ReactNode;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  valueDisplay?: string;
  className?: string;
  "aria-label"?: string;
};

export function AxisSliderRow({
  label,
  leading,
  value,
  min,
  max,
  onChange,
  valueDisplay,
  className,
  "aria-label": ariaLabel,
}: AxisSliderRowProps) {
  const display =
    valueDisplay ?? (label !== undefined ? String(Math.round(value)) : undefined);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="flex w-3 shrink-0 items-center justify-center text-muted-foreground">
        {leading ??
          (label !== undefined ? (
            <span className="text-xs font-medium">{label}</span>
          ) : null)}
      </span>
      <ZoomRangeInput
        value={value}
        min={min}
        max={max}
        onChange={onChange}
        aria-label={ariaLabel ?? (label ? `${label} axis` : "Control")}
      />
      <span className="w-7 shrink-0 text-right font-mono text-xs tabular-nums text-foreground">
        {display ?? Math.round(value)}
      </span>
    </div>
  );
}
