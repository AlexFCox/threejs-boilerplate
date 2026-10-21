"use client";

import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { uiChrome } from "@/lib/styleguide/tokens";

type ScreenOverlayPanelProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

/**
 * Fixed-position panel on the screen overlay (not in 3D space).
 */
export function ScreenOverlayPanel({
  children,
  className,
  style,
}: ScreenOverlayPanelProps) {
  return (
    <div
      className={cn("pointer-events-auto absolute", className)}
      style={{
        bottom: `${uiChrome.zoomControlOffsetRem}rem`,
        left: `${uiChrome.zoomControlOffsetRem}rem`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
