"use client";

import { Eye, RotateCcw } from "lucide-react";
import { AxisSliderRow } from "@/components/atoms/AxisSliderRow";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  CAMERA_ORBIT_LIMITS,
  type CameraOrbit,
  clampCameraOrbit,
} from "@/lib/scene/orbit";
import {
  SLIDER_MAX_PERCENT,
  SLIDER_MIN_PERCENT,
  formatZoomLevel,
} from "@/lib/scene/zoom";

type SceneControlsPanelProps = {
  zoom: number;
  onZoomChange: (zoom: number) => void;
  cameraOrbit: CameraOrbit;
  onCameraOrbitChange: (orbit: CameraOrbit) => void;
  onReset: () => void;
  className?: string;
};

export function SceneControlsPanel({
  zoom,
  onZoomChange,
  cameraOrbit,
  onCameraOrbitChange,
  onReset,
  className,
}: SceneControlsPanelProps) {
  const setOrbitField = <K extends keyof CameraOrbit>(
    field: K,
    value: CameraOrbit[K],
  ) => {
    onCameraOrbitChange(clampCameraOrbit({ ...cameraOrbit, [field]: value }));
  };

  const percent = zoom * 100;

  return (
    <div
      className={cn(
        "flex w-fit flex-col gap-2 bg-card px-3 py-2.5 text-card-foreground ring-1 ring-border",
        className,
      )}
      style={{ borderRadius: "var(--zoom-control-radius)" }}
      aria-label="Scene controls"
    >
      <AxisSliderRow
        leading={<Eye className="size-3" aria-hidden />}
        value={percent}
        min={SLIDER_MIN_PERCENT}
        max={SLIDER_MAX_PERCENT}
        onChange={(next) => onZoomChange(next / 100)}
        valueDisplay={formatZoomLevel(zoom)}
        aria-label="Camera zoom level"
      />
      <AxisSliderRow
        label="X"
        value={cameraOrbit.pitchDeg}
        min={CAMERA_ORBIT_LIMITS.pitch.min}
        max={CAMERA_ORBIT_LIMITS.pitch.max}
        onChange={(value) => setOrbitField("pitchDeg", value)}
        aria-label="Camera pitch"
      />
      <AxisSliderRow
        label="Y"
        value={cameraOrbit.yawDeg}
        min={CAMERA_ORBIT_LIMITS.yaw.min}
        max={CAMERA_ORBIT_LIMITS.yaw.max}
        onChange={(value) => setOrbitField("yawDeg", value)}
        aria-label="Camera yaw"
      />
      <AxisSliderRow
        label="Z"
        value={cameraOrbit.rollDeg}
        min={CAMERA_ORBIT_LIMITS.roll.min}
        max={CAMERA_ORBIT_LIMITS.roll.max}
        onChange={(value) => setOrbitField("rollDeg", value)}
        aria-label="Camera roll"
      />
      <Button
        type="button"
        variant="outline"
        size="xs"
        className="mt-0.5 w-full"
        onClick={onReset}
      >
        <RotateCcw data-icon="inline-start" />
        Reset
      </Button>
    </div>
  );
}
