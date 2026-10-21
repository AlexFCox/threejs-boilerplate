"use client";

import { ScreenOverlayPanel } from "@/components/atoms/ScreenOverlayPanel";
import { ScreenOverlayRoot } from "@/components/atoms/ScreenOverlayRoot";
import { SceneControlsPanel } from "@/components/molecules/SceneControlsPanel";
import type { CameraOrbit } from "@/lib/scene/orbit";

type SceneScreenChromeProps = {
  zoom: number;
  onZoomChange: (zoom: number) => void;
  cameraOrbit: CameraOrbit;
  onCameraOrbitChange: (orbit: CameraOrbit) => void;
  onResetControls: () => void;
};

export function SceneScreenChrome({
  zoom,
  onZoomChange,
  cameraOrbit,
  onCameraOrbitChange,
  onResetControls,
}: SceneScreenChromeProps) {
  return (
    <ScreenOverlayRoot>
      <ScreenOverlayPanel>
        <SceneControlsPanel
          zoom={zoom}
          onZoomChange={onZoomChange}
          cameraOrbit={cameraOrbit}
          onCameraOrbitChange={onCameraOrbitChange}
          onReset={onResetControls}
        />
      </ScreenOverlayPanel>
    </ScreenOverlayRoot>
  );
}
