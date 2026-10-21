import { zoom as zoomTokens } from "@/lib/styleguide/tokens";

export const DEFAULT_ZOOM: number = zoomTokens.default;
export const MIN_ZOOM = zoomTokens.min;
export const MAX_ZOOM = zoomTokens.max;
export const SLIDER_MIN_PERCENT = zoomTokens.sliderMinPercent;
export const SLIDER_MAX_PERCENT = zoomTokens.sliderMaxPercent;

export function clampZoom(value: number): number {
  return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value));
}

export function formatZoomLevel(zoom: number): string {
  return String(Math.round(zoom * 100));
}

export function zoomFromWheelDelta(current: number, deltaY: number): number {
  const factor = Math.exp(-deltaY * 0.0015);
  return clampZoom(current * factor);
}
