"use client";

import { BorderedGroundPlane } from "@/components/molecules/BorderedGroundPlane";
import { CenterReferenceCube } from "@/components/molecules/CenterReferenceCube";
import { PLANE_WORLD_SIZE } from "@/lib/scene/constants";
import { scene as sceneColors } from "@/lib/styleguide/tokens";

type SceneWorldProps = {
  planeColor: string;
  planeBorderColor?: string;
  cubeColor?: string;
  planeSize?: number;
};

/**
 * Static world content at the origin. Never receives camera orbit transforms.
 */
export function SceneWorld({
  planeColor,
  planeBorderColor = sceneColors.planeBorder,
  cubeColor = sceneColors.cube,
  planeSize = PLANE_WORLD_SIZE,
}: SceneWorldProps) {
  return (
    <group name="SceneWorld">
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[4, 8, 6]}
        intensity={1.1}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <BorderedGroundPlane
        size={planeSize}
        fillColor={planeColor}
        borderColor={planeBorderColor}
      />
      <CenterReferenceCube color={cubeColor} />
    </group>
  );
}
