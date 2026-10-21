"use client";

import dynamic from "next/dynamic";
import type { RefObject } from "react";
import type { CameraOrbit } from "@/lib/scene/orbit";

const TopDownScene = dynamic(
  () =>
    import("@/components/organisms/TopDownScene").then((m) => m.TopDownScene),
  { ssr: false },
);

type SceneStageProps = {
  surfaceRef: RefObject<HTMLDivElement | null>;
  backgroundColor: string;
  planeColor: string;
  zoom: number;
  cameraOrbit: CameraOrbit;
};

export function SceneStage({
  surfaceRef,
  backgroundColor,
  planeColor,
  zoom,
  cameraOrbit,
}: SceneStageProps) {
  return (
    <div
      ref={surfaceRef}
      className="absolute inset-0 h-dvh w-full cursor-crosshair touch-none bg-scene-background"
    >
      <TopDownScene
        backgroundColor={backgroundColor}
        planeColor={planeColor}
        zoom={zoom}
        cameraOrbit={cameraOrbit}
      />
    </div>
  );
}
