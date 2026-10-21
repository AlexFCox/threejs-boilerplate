"use client";

import { cn } from "@/lib/utils";
import { uiChrome } from "@/lib/styleguide/tokens";

type ZoomRangeInputProps = {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  className?: string;
  "aria-label"?: string;
};

/** Presentational zoom slider (native range for reliable width and hit target). */
export function ZoomRangeInput({
  value,
  min,
  max,
  onChange,
  className,
  "aria-label": ariaLabel,
}: ZoomRangeInputProps) {
  return (
    <input
      type="range"
      aria-label={ariaLabel}
      min={min}
      max={max}
      step={1}
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
      className={cn(
        "block h-2 w-full cursor-pointer appearance-none rounded-full border-0 bg-transparent p-0 shadow-none",
        "focus:outline-none focus-visible:outline-none",
        "[&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-muted",
        "[&::-webkit-slider-thumb]:-mt-[3px] [&::-webkit-slider-thumb]:size-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-ring [&::-webkit-slider-thumb]:bg-background [&::-webkit-slider-thumb]:shadow-sm",
        "[&::-moz-range-track]:h-1.5 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-muted",
        "[&::-moz-range-thumb]:size-3.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-ring [&::-moz-range-thumb]:bg-background",
        className,
      )}
      style={{ width: uiChrome.zoomControlSliderWidthPx }}
    />
  );
}
