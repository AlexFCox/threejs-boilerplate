"use client";

import { SceneCanvas } from "@/components/atoms/SceneCanvas";
import { SceneCameraRig } from "@/components/molecules/SceneCameraRig";
import { SceneWorld } from "@/components/organisms/SceneWorld";
import type { CameraOrbit } from "@/lib/scene/orbit";
import { scene as sceneColors } from "@/lib/styleguide/tokens";

type TopDownSceneProps = {
  backgroundColor: string;
  planeColor: string;
  planeBorderColor?: string;
  cubeColor?: string;
  zoom: number;
  cameraOrbit: CameraOrbit;
};

export function TopDownScene({
  backgroundColor,
  planeColor,
  planeBorderColor = sceneColors.planeBorder,
  cubeColor = sceneColors.cube,
  zoom,
  cameraOrbit,
}: TopDownSceneProps) {
  return (
    <SceneCanvas
      backgroundColor={backgroundColor}
      camera={{ fov: 42, position: [0, 10, 0], near: 0.1, far: 200 }}
      gl={{ antialias: true }}
    >
      <SceneCameraRig zoom={zoom} cameraOrbit={cameraOrbit} />
      <SceneWorld
        planeColor={planeColor}
        planeBorderColor={planeBorderColor}
        cubeColor={cubeColor}
      />
    </SceneCanvas>
  );
}
