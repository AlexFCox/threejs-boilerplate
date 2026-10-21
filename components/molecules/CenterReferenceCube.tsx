"use client";

import { SceneBox } from "@/components/atoms/SceneBox";
import { REFERENCE_CUBE_SIZE } from "@/lib/scene/objects";

type CenterReferenceCubeProps = {
  color: string;
  size?: number;
};

/** Cube centered on the ground plane origin, resting on y = 0. */
export function CenterReferenceCube({
  color,
  size = REFERENCE_CUBE_SIZE,
}: CenterReferenceCubeProps) {
  return (
    <SceneBox
      size={size}
      color={color}
      position={[0, size / 2, 0]}
    />
  );
}
