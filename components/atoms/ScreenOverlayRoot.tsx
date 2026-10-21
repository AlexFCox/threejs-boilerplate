"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ScreenOverlayRootProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Full-viewport layer for DOM UI that sits above the Three.js canvas.
 * Does not capture pointer events; children opt in with ScreenOverlayPanel.
 */
export function ScreenOverlayRoot({
  children,
  className,
}: ScreenOverlayRootProps) {
  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-[var(--zoom-control-z-index)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
