/**
 * JavaScript mirror of lib/styleguide/tokens.css for Three.js and runtime use.
 * Keep hex/numeric values in sync with the CSS file.
 */

export const typography = {
  sans: "var(--font-family-sans)",
  mono: "var(--font-family-mono)",
} as const;

export const scene = {
  background: "#ffffff",
  plane: "#e5e5e5",
  planeBorder: "#525252",
  cube: "#dc2626",
  maxSizePx: 800,
} as const;

export const zoom = {
  default: 0.5,
  min: 0.35,
  max: 1,
  sliderMinPercent: 35,
  sliderMaxPercent: 100,
} as const;

export const uiChrome = {
  zoomControlSliderWidthPx: 150,
  zoomControlOffsetRem: 1.25,
} as const;
