"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SceneScreenChrome } from "@/components/organisms/SceneScreenChrome";
import { SceneStage } from "@/components/organisms/SceneStage";
import { sceneTokens } from "@/lib/tokens/scene";
import {
  DEFAULT_CAMERA_ORBIT,
  clampCameraOrbit,
  type CameraOrbit,
} from "@/lib/scene/orbit";
import {
  DEFAULT_ZOOM,
  clampZoom,
  zoomFromWheelDelta,
} from "@/lib/scene/zoom";

type SceneShellProps = {
  backgroundColor?: string;
  planeColor?: string;
};

export function SceneShell({
  backgroundColor = sceneTokens.background,
  planeColor = sceneTokens.plane,
}: SceneShellProps) {
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [cameraOrbit, setCameraOrbit] = useState<CameraOrbit>(
    DEFAULT_CAMERA_ORBIT,
  );
  const sceneSurfaceRef = useRef<HTMLDivElement>(null);

  const handleZoomChange = useCallback((value: number) => {
    setZoom(clampZoom(value));
  }, []);

  const handleCameraOrbitChange = useCallback((value: CameraOrbit) => {
    setCameraOrbit(clampCameraOrbit(value));
  }, []);

  const handleResetControls = useCallback(() => {
    setZoom(DEFAULT_ZOOM);
    setCameraOrbit(DEFAULT_CAMERA_ORBIT);
  }, []);

  useEffect(() => {
    const surface = sceneSurfaceRef.current;
    if (!surface) {
      return;
    }

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      setZoom((current) => zoomFromWheelDelta(current, event.deltaY));
    };

    surface.addEventListener("wheel", onWheel, { passive: false });
    return () => surface.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div className="relative min-h-dvh w-full flex-1 overflow-hidden">
      <SceneStage
        surfaceRef={sceneSurfaceRef}
        backgroundColor={backgroundColor}
        planeColor={planeColor}
        zoom={zoom}
        cameraOrbit={cameraOrbit}
      />
      <SceneScreenChrome
        zoom={zoom}
        onZoomChange={handleZoomChange}
        cameraOrbit={cameraOrbit}
        onCameraOrbitChange={handleCameraOrbitChange}
        onResetControls={handleResetControls}
      />
    </div>
  );
}
